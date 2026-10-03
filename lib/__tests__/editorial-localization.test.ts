import { describe, expect, it } from "vitest";
import { getDrhContent } from "../content/drh";
import nextConfig from "../../next.config";
import { getLocalizedPath, resolveBlogArticleHref } from "../path-localization";
import { editorialLinkLabel, localizeEditorialLink } from "../editorial-links";
import { getStaticBlogListing } from "../blog-listing";
import { getResourcesContent } from "../content/resources";

describe("published translations, rather than synthetic links", () => {
  it("uses a real translated article and preserves a French-only resource", () => {
    expect(localizeEditorialLink("/ressources/blog/flux-de-tresorerie", "en")).toBe("/en/ressources/blog/flux-de-tresorerie");
    expect(localizeEditorialLink("/ressources/blog/essentiels-outils-tech-finance", "en")).toBe("/en/ressources/blog/essential-finance-technology-tools");
    expect(editorialLinkLabel("Finance tools", "/ressources/blog/essentiels-outils-tech-finance", "en")).toBe("Finance tools");
    expect(localizeEditorialLink("mailto:hello@iteradvisors.com", "es")).toBe("mailto:hello@iteradvisors.com");
  });

  it.each(["en", "es"] as const)("does not promote withdrawn translations in the %s news feed", locale => {
    const articles = getStaticBlogListing(locale);
    expect(articles.length).toBeGreaterThan(0);
    for (const article of articles) expect(resolveBlogArticleHref(locale, article.slug)).toMatch(new RegExp(`^/${locale}/`));
    const resources = getResourcesContent(locale).popularSection.resources;
    expect(resources.find(item => /gloss|glosa/.test(item.href))?.href).toMatch(new RegExp(`^/${locale}/`));
  });
});

describe("Fractional CFO city URL migration", () => {
  it.each(["barcelona", "paris", "toulouse"])("preserves %s legacy signals in one redirect", async city => {
    const rules = await nextConfig.redirects!();
    const canonical = `/en/fractional-cfo-${city}`;
    expect(rules.find(rule => rule.source === `/en/outsourced-cfo-${city}`)).toMatchObject({ destination: canonical, statusCode: 301 });
    expect(rules.find(rule => rule.source === canonical)).toBeUndefined();
    expect(getLocalizedPath(city === "barcelona" ? "/daf-externalise-barcelone" : `/daf-externalise-${city}`, "en")).toBe(canonical);
    expect(getLocalizedPath(`/en/outsourced-cfo-${city}`, "es")).toBe(`/es/cfo-externalizado-${city}`);
  });
});

describe("translated HR evidence and commercial scope", () => {
  it.each(["en", "es"] as const)("does not publish undocumented %s quotes or a fixed HR commitment", locale => {
    const content = getDrhContent(locale);
    expect(content.testimonials.items).toEqual([]);
    expect(content.pricing.engagement).not.toMatch(/6.month|6 meses|60%|70%/);
    expect(content.pricing.engagement).toContain(locale === "en" ? "Finance" : "Finanzas");
    expect(JSON.stringify(content)).not.toMatch(/Marc D\.|Sophie L\.|Karim B\./);
  });
});
