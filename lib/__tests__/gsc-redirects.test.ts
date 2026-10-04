import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import config from "../../next.config";
import edgeConfig from "../../vercel.json";
import aliases from "../content/editorial-locales/aliases.json";
import { gscRedirects, removedEditorialPaths } from "../gsc-redirects";
import { parityHref } from "../locale-route-map";
import { proxy } from "../../proxy";

function matches(pattern: string, path: string) {
  const re = pattern.split("/").filter(Boolean).map(part =>
    /^:\\w+\\*$/.test(part) ? "(?:/[^/]+)*" :
    /^:\\w+$/.test(part) ? "/[^/]+" :
    "/" + part.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")
  ).join("");
  return new RegExp("^" + re + "$").test(path);
}

describe("verified GSC corrections", () => {
  it("reaches every exact destination before legacy Next and Vercel fallbacks", async () => {
    const nextRules = await config.redirects!();
    const edgeRules = edgeConfig.redirects.filter(rule => !("has" in rule));
    for (const correction of gscRedirects) {
      const effective = [...edgeRules, ...nextRules].find(rule => matches(rule.source, correction.source));
      expect(effective?.destination, correction.source).toBe(correction.destination);
      expect(effective?.statusCode, correction.source).toBe(301);
      expect([...edgeRules, ...nextRules].some(rule => matches(rule.source, correction.destination)), correction.destination).toBe(false);
    }
  });

  it.each(gscRedirects)("preserves query parameters and the correct locale for $source", rule => {
    const response = proxy(new NextRequest("https://www.iteradvisors.com" + rule.source + "?source=gsc"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://www.iteradvisors.com" + rule.destination + "?source=gsc");
    expect((aliases as Record<string, string>)[rule.source]).toBe(rule.destination);
  });

  it.each([...removedEditorialPaths])("returns 410 for removed content at %s, without an unrelated redirect", async path => {
    const response = proxy(new NextRequest("https://www.iteradvisors.com" + path));
    expect(response.status).toBe(410);
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
    expect(await response.text()).toContain(path.startsWith("/en/") ? 'lang="en"' : 'lang="fr"');
    expect((aliases as Record<string, string>)[path]).toBeUndefined();
    expect((await config.redirects!()).some(rule => matches(rule.source, path))).toBe(false);
  });

  it("keeps the corresponding content when switching languages from an obsolete URL", () => {
    expect(parityHref("/en/services/outsourced-financial-management", "es")).toBe("/es/services/gestion-financiera-externalizada");
    expect(parityHref("/ressources/testimonials/solarmente", "en")).toBe("/en/ressources/cas-clients/solarmente-serie-b-cleantech");
    expect(parityHref("/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif", "en")).toBe("/en/ressources/blog/fundraising-guide");
  });
});

