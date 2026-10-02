import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import HomePage from "@/components/pages/HomePage";
import DafSubPage from "@/components/pages/DafSubPage";
import DocumentedCasePage from "@/components/pages/DocumentedCasePage";
import { getDafReferenceContent } from "@/lib/content/daf-reference-locales";
import { getReviewedCases } from "@/lib/content/documented-case-locales";
import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";
import { getDafOffer } from "@/lib/content/daf-offer";
import { getHomeJourney } from "@/lib/content/home-journey";
import { navigation, footerContent } from "@/lib/navigation";
import { parityHref } from "@/lib/locale-route-map";
import Footer from "@/components/Footer";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("@/components/Breadcrumb", () => ({ default: () => null }));
const locales = ["fr", "en", "es"] as const;
const doc = (html: string) => new DOMParser().parseFromString(html, "text/html");
const blocks = (html: string) => [...doc(html).querySelectorAll("[data-block-key]")].map(item => item.getAttribute("data-block-key"));
const text = (item: Element) => item.textContent!.replace(/\s+/g, " ").trim();

describe("reference and case translation parity", () => {
  it("keeps both pricing tables, tier amounts and the same reference sections", () => {
    for (const slug of ["tarifs", "metier"] as const) {
      const contents = locales.map(locale => getDafReferenceContent(locale, slug));
      const rendered = locales.map((locale, i) => renderToStaticMarkup(<DafSubPage locale={locale} content={contents[i]} />));
      expect(blocks(rendered[1])).toEqual(blocks(rendered[0]));
      expect(blocks(rendered[2])).toEqual(blocks(rendered[0]));
      for (const [i, locale] of locales.entries()) {
        const page = doc(rendered[i]), source = contents[0], content = contents[i];
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        expect(content.sections).toHaveLength(source.sections.length);
        expect(page.querySelectorAll("table")).toHaveLength(slug === "tarifs" ? 2 : 0);
        const faq = buildDafSubFaqSchema(content, locale)!;
        const answers = [...page.querySelectorAll("details")].map(item => ({ question: text(item.querySelector("h3")!), answer: text(item.querySelector(".site-copy")!) }));
        expect(answers).toEqual(faq.mainEntity.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })));
        expect(content.sections.some(section => section.content.some(value => /48 (heures|hours|horas)/.test(value)))).toBe(false);
        if (slug === "tarifs") {
          expect(content.sections[1].table!.rows.map(row => row[1])).toEqual(getDafOffer(locale).tiers.map(item => item.price));
          expect(content.proofSlugs).toHaveLength(3);
        }
      }
    }
  });
  it("retains the evidence, measurement periods and limitations in all three cases", () => {
    const source = getReviewedCases("fr");
    for (const locale of locales) {
      const cases = getReviewedCases(locale);
      expect(cases.map(item => item.slug)).toEqual(source.map(item => item.slug));
      for (const [i, item] of cases.entries()) {
        expect(item.deliverables).toHaveLength(source[i].deliverables.length);
        const html = renderToStaticMarkup(<DocumentedCasePage locale={locale} item={item} />);
        const original = renderToStaticMarkup(<DocumentedCasePage locale="fr" item={source[i]} />);
        expect(blocks(html)).toEqual(blocks(original));
        expect(doc(html).querySelectorAll("h1")).toHaveLength(1);
      }
      expect(cases[0].limits).toContain("2022–2024");
      expect(cases[1].results[0]).toMatch(/8 (points|percentage points|puntos porcentuales)/);
      expect(cases[1].limits).toMatch(/douze mois|twelve-month|doce meses/);
      expect(cases[2].limits).toContain("2025");
      expect(cases[2].limits).toMatch(/qualitatifs|qualitative|cualitativos/);
    }
  });
  it("renders the same homepage journey, RH entry point and decision resources", () => {
    const rendered = locales.map(locale => renderToStaticMarkup(<HomePage locale={locale} />));
    const shape = (html: string) => [...doc(html).querySelectorAll("main section")].map(section => ({ journey: section.getAttribute("data-journey"), id: section.id, h2: section.querySelectorAll("h2").length, h3: section.querySelectorAll("h3").length }));
    expect(shape(rendered[1])).toEqual(shape(rendered[0]));
    expect(shape(rendered[2])).toEqual(shape(rendered[0]));
    for (const [i, locale] of locales.entries()) {
      expect(doc(rendered[i]).querySelectorAll("h1")).toHaveLength(1);
      expect(getHomeJourney(locale).choices).toHaveLength(3);
      expect(getHomeJourney(locale).hr.paragraphs).toHaveLength(3);
      expect(getHomeJourney(locale).resources.cards).toHaveLength(3);
      expect(doc(rendered[i]).querySelector('[data-journey="home-rh-section"]')).not.toBeNull();
    }
  });
  it("keeps six navigation groups, child ordering and footer entry points", () => {
    const original = navigation.fr;
    const footer = doc(renderToStaticMarkup(<Footer locale="fr" />));
    for (const locale of locales) {
      expect(navigation[locale]).toHaveLength(6);
      for (const [i, item] of navigation[locale].entries()) {
        expect(item.title).toBeTruthy();
        expect(item.href).toBe(parityHref(original[i].href, locale));
        expect(item.children?.map(child => child.href)).toEqual(original[i].children?.map(child => parityHref(child.href, locale)));
        expect(item.children?.every(child => !!child.text) ?? true).toBe(true);
      }
      expect(footerContent[locale].editorialLinks.map(item => item.href)).toEqual(footerContent.fr.editorialLinks.map(item => parityHref(item.href, locale)));
      const rendered = doc(renderToStaticMarkup(<Footer locale={locale} />));
      expect(rendered.querySelectorAll("a")).toHaveLength(footer.querySelectorAll("a").length);
      expect(rendered.querySelectorAll("address")).toHaveLength(1);
    }
  });
});
