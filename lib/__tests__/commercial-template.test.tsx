import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import DafPillarPage from "@/components/pages/DafPillarPage";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import { getFinanceServices } from "@/lib/content/finance-service-locales";
import { navigation } from "@/lib/navigation";
import { parityHref } from "@/lib/locale-route-map";
import { getSiteInterface } from "@/lib/content/site-interface";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
const doc = (element: ReactNode) => new DOMParser().parseFromString(renderToStaticMarkup(element), "text/html");

describe("Unified commercial experience", () => {
  it("gives every destination one place in each language's header", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      const links = navigation[locale].flatMap(item => [item.href, ...(item.children?.map(child => child.href) ?? [])]);
      expect(new Set(links).size).toBe(links.length);
      expect(links.filter(href => href === parityHref("/daf-externalise", locale))).toHaveLength(1);
      const finance = navigation[locale][1].children!;
      for (const path of ["/services/accompagnement-levee-de-fond", "/services/ma-due-diligence"]) expect(finance.some(link => link.href === parityHref(path, locale))).toBe(true);
    }
  });
  it("preserves distinct service copy, local conversion routes and server-rendered FAQ answers", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      for (const service of Object.values(getFinanceServices(locale))) {
        const page = doc(<FinanceServicePage locale={locale} service={service} />);
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        expect(page.querySelector("h1")!.textContent).toBe(service.headline);
        expect(page.querySelector("#besoin")!.textContent).toContain(service.definition);
        for (const [, detail, decision] of service.deliverables) {
          expect(page.querySelector("#livrables")!.textContent).toContain(detail);
          expect(page.querySelector("#livrables")!.textContent).toContain(decision);
        }
        expect(page.querySelector(`#contact a[href="${parityHref(`/contact#${service.context}`, locale)}"]`)).not.toBeNull();
        const schemas = [...page.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent!));
        const faq = schemas.flatMap(schema => schema["@graph"] ?? [schema]).find(schema => schema["@type"] === "FAQPage");
        expect([...page.querySelectorAll("#faq details")].map(detail => ({ q: detail.querySelector("h3")!.textContent, a: detail.querySelector("p")!.textContent }))).toEqual(faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => ({ q: q.name, a: q.acceptedAnswer.text })));
        for (const link of page.querySelectorAll('a[href^="#"]')) expect(page.getElementById(link.getAttribute("href")!.slice(1))).not.toBeNull();
      }
    }
  });
  it("uses the same reading column, section nav and FAQ style for the pillar, finance and HR", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      const service = getFinanceServices(locale)["temps-partage"];
      for (const element of [<DafPillarPage key="pillar" locale={locale} />, <FinanceServicePage key="finance" locale={locale} service={service} />, <DrhFrenchPage key="hr" locale={locale} />]) {
        const page = doc(element);
        expect(page.querySelector(".site-service-hero .site-brief")!.getAttribute("aria-label")).toBe(getSiteInterface(locale).brief);
        expect(page.querySelector(".site-section-nav")).not.toBeNull();
        const sections = [...page.querySelectorAll("section[data-block-key]")].filter(section => section.id !== "contact");
        expect(sections.every(section => section.querySelector(":scope > .container.max-w-4xl"))).toBe(true);
        expect(page.querySelectorAll("details.group").length).toBeGreaterThan(0);
        expect(page.querySelector("#contact.site-contact-band")).not.toBeNull();
      }
    }
  });
});
