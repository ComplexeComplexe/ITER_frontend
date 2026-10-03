import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import HRServicePage from "@/components/pages/HRServicePage";
import ExpertProfileSections from "@/components/ExpertProfileSections";
import { getLocalizedHRService } from "@/lib/content/hr-locales";
import { HR_SERVICE_SLUGS } from "@/lib/content/hr-services";
import { parityHref } from "@/lib/locale-route-map";
import { getAboutContent } from "@/lib/content/about";
import { getTeamMemberBySlug } from "@/lib/content/team";
vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
const locales = ["fr", "en", "es"] as const;
const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
function faqMatches(page: Document) {
  const scripts = [...page.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent!));
  const faq = scripts.find(s => s["@type"] === "FAQPage");
  expect(faq.mainEntity.map((q: {name: string}) => q.name)).toEqual([...page.querySelectorAll("details summary")].map(s => s.textContent!.replace(/\s*\+$/, "").trim()));
}
describe("HR and cabinet parity", () => {
  it("keeps both HR variants complete, links local services and shares visible FAQ", () => {
    for (const sharedTime of [false, true]) {
      const pages = locales.map(locale => parse(renderToStaticMarkup(<DrhFrenchPage locale={locale} sharedTime={sharedTime} />)));
      const blocks = (p: Document) => [...p.querySelectorAll("[data-page-block]")].map(s => s.getAttribute("data-page-block"));
      for (const [i, locale] of locales.entries()) {
        expect(blocks(pages[i])).toEqual(blocks(pages[0]));
        expect(pages[i].querySelectorAll("h1")).toHaveLength(1);
        faqMatches(pages[i]);
        for (const slug of HR_SERVICE_SLUGS) expect(pages[i].querySelector(`a[href="${parityHref(`/services/${slug}`, locale)}"]`)).not.toBeNull();
        if (locale !== "fr") {
          expect(pages[i].querySelectorAll('a[hreflang="fr"]')).toHaveLength(sharedTime ? 3 : 7);
          expect(pages[i].body.textContent).not.toContain("Parlons de votre besoin RH");
          expect(pages[i].body.textContent).toMatch(/not automatically|no.*automáticamente/);
        }
      }
    }
  });
  it("preserves every service deliverable, phase, example and quote-only pricing", () => {
    for (const slug of HR_SERVICE_SLUGS) {
      const source = getLocalizedHRService(slug, "fr");
      for (const locale of locales) {
        const content = getLocalizedHRService(slug, locale);
        for (const group of ["whatIs", "whyOutsource", "approach", "useCases", "pricing"] as const) expect(Object.keys(content[group])).toEqual(Object.keys(source[group]));
        expect(content.whatIs.bullets).toHaveLength(source.whatIs.bullets!.length);
        expect(content.approach.phases).toHaveLength(source.approach.phases.length);
        expect(content.useCases.cases).toHaveLength(source.useCases.cases.length);
        const page = parse(renderToStaticMarkup(<HRServicePage locale={locale} content={content} />));
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        faqMatches(page);
        expect(page.querySelectorAll("tbody tr")).toHaveLength(1);
        const service = [...page.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent!)).find(s => s["@type"] === "Service");
        expect(service.url).toBe("https://www.iteradvisors.com" + parityHref(`/services/${slug}`, locale));
        if (locale !== "fr") expect(page.body.textContent).not.toContain("Les autres briques");
      }
    }
  });
  it("removes old unsupported savings and aligns expert claims with the current reference", () => {
    for (const locale of locales) {
      const about = getAboutContent(locale);
      expect(JSON.stringify(about)).not.toMatch(/30.{0,8}60|24 hours|24 heures|24 horas|6 to 24|6 \u00e0 24|6 a 24/);
      expect(about.whenToCall.stages.every(s => s.href)).toBe(true);
      const expert = getTeamMemberBySlug("sebastien-doat", locale)!;
      expect(expert.bio + expert.bioExtended).not.toMatch(/65M|65 M|40M|40 M|Master|15 years|15 a\u00f1os/);
      const page = parse(renderToStaticMarkup(<ExpertProfileSections locale={locale} />));
      expect([...page.querySelectorAll("section")].map(s => s.id)).toEqual(["expertise", "parcours", "interventions", "ressources"]);
      expect(page.querySelector(`a[href="${parityHref('/contact#sebastien-doat', locale)}"]`)).not.toBeNull();
      expect(getTeamMemberBySlug("borith-biv", locale)!.bioExtended).not.toMatch(/20 years|20 a\u00f1os/);
    }
  });
});
