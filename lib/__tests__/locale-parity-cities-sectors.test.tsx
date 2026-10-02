import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import DafLocalPage from "@/components/pages/DafLocalPage";
import DafSubPage from "@/components/pages/DafSubPage";
import { getDafLocalContent } from "@/lib/content/daf-local";
import { getDafSectorContent, SECTOR_SLUGS } from "@/lib/content/daf-sector-locales";
import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";
import { alignedPaths } from "@/lib/content/locale-publication";
import { parityHref } from "@/lib/locale-route-map";
import ResourcesDecisionHub from "@/components/pages/ResourcesDecisionHub";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
const locales = ["fr", "en", "es"] as const;
const doc = (html: string) => new DOMParser().parseFromString(html, "text/html");
const blocks = (html: string) => [...doc(html).querySelectorAll("[data-block-key]")].map(item => item.getAttribute("data-block-key"));
const text = (node: Element) => node.textContent!.replace(/\s+/g, " ").trim();

describe("complete city and industry translations", () => {
  it("keeps six decision journeys and the full resources hub in all languages", () => {
    const rendered = locales.map(locale => renderToStaticMarkup(<ResourcesDecisionHub locale={locale} />));
    for (const [i, locale] of locales.entries()) {
      const page = doc(rendered[i]);
      expect(blocks(rendered[i])).toEqual(blocks(rendered[0]));
      expect(page.querySelectorAll("h1")).toHaveLength(1);
      expect(page.querySelectorAll("#blog article")).toHaveLength(6);
      expect(page.querySelectorAll("#cas-clients h3")).toHaveLength(3);
      expect(page.querySelectorAll("h2").length).toBe(doc(rendered[0]).querySelectorAll("h2").length);
      const casePaths = ["solarmente-serie-b-cleantech", "seasonly-marge-par-canal-bfr", "opti-digital-structuration-financement"];
      for (const slug of casePaths) expect(page.querySelector(`a[href="${parityHref(`/ressources/cas-clients/${slug}`, locale)}"]`)).not.toBeNull();
      if (locale !== "fr") {
        expect(page.querySelector(`a[href="${parityHref("/ressources/ia-finance", locale)}"]`)).not.toBeNull();
        expect(page.querySelector('a[href="/ressources/ia-finance"]')).toBeNull();
        expect(page.querySelector("h1")!.textContent).not.toMatch(/ressources pour piloter/);
      }
    }
  });
  it("retains all local content and the same visible FAQ answers as its schema", () => {
    for (const city of ["barcelone", "toulouse"] as const) {
      const source = getDafLocalContent(city, "fr");
      const rendered = locales.map(locale => renderToStaticMarkup(<DafLocalPage city={city} locale={locale} />));
      for (const [i, locale] of locales.entries()) {
        const content = getDafLocalContent(city, locale), page = doc(rendered[i]);
        expect(blocks(rendered[i])).toEqual(blocks(rendered[0]));
        expect(content.sections.map(s => s.content.length)).toEqual(source.sections.map(s => s.content.length));
        expect(content.sections.map(s => s.links?.length)).toEqual(source.sections.map(s => s.links?.length));
        expect(content.sections.map(s => s.id)).toEqual(source.sections.map(s => s.id));
        expect(content.faq).toHaveLength(source.faq.length);
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        expect(page.querySelectorAll("h2").length).toBe(doc(rendered[0]).querySelectorAll("h2").length);
        const schemas = [...page.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent!));
        const faq = schemas.find(s => s["@type"] === "FAQPage");
        expect([...page.querySelectorAll("details")].map(s => ({ q: text(s.querySelector("summary")!), a: text(s.querySelector("p")!) }))).toEqual(faq.mainEntity.map((s: { name: string; acceptedAnswer: { text: string } }) => ({ q: s.name.replace(/\s+/g, " "), a: s.acceptedAnswer.text.replace(/\s+/g, " ") })));
        expect(rendered[i]).not.toContain("__OFFER__");
        if (city === "toulouse") {
          expect(schemas.some(s => s["@type"] === "ProfessionalService")).toBe(false);
          expect(content.sections[4].content[0]).toMatch(/pas de consultant résident|no resident consultant|No tenemos consultor residente/);
          expect(content.faq[3].answer).toMatch(/pas encore de cas client toulousain publiable|not yet have a publishable Toulouse client case|no tenemos un caso de cliente de Toulouse publicable/);
        } else {
          expect(content.sections[1].content[0]).toMatch(/n’est pas un cabinet comptable|not an accounting firm|no es una asesoría contable/);
          expect(content.sections[2].links!.map(s => s.href)).toEqual(source.sections[2].links!.map(s => s.href));
        }
        if (locale !== "fr") {
          expect(page.querySelectorAll('blockquote[lang="fr"]')).toHaveLength(5);
          expect(page.querySelector('a[href="/daf-externalise/industrie"]')).toBeNull();
        }
      }
    }
  });
  it("preserves full industry paragraphs, illustrative tables and the documented Seasonly proof", () => {
    for (const slug of SECTOR_SLUGS) {
      const source = getDafSectorContent("fr", slug);
      const rendered = locales.map(locale => renderToStaticMarkup(<DafSubPage locale={locale} content={getDafSectorContent(locale, slug)} />));
      for (const [i, locale] of locales.entries()) {
        const content = getDafSectorContent(locale, slug), page = doc(rendered[i]);
        expect(blocks(rendered[i])).toEqual(blocks(rendered[0]));
        expect(content.sections.map(s => s.content.length)).toEqual(source.sections.map(s => s.content.length));
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        expect(page.querySelectorAll("h2").length).toBe(doc(rendered[0]).querySelectorAll("h2").length);
        expect(content.proofSlugs).toEqual(source.proofSlugs);
        const tables = content.sections.filter(s => s.table).map(s => s.table!);
        expect(tables.map(s => s.rows.map(r => r.length))).toEqual(source.sections.filter(s => s.table).map(s => s.table!.rows.map(r => r.length)));
        if (slug === "industrie" || slug === "deep-tech") {
          expect(tables).toHaveLength(1);
          expect(tables[0].rows).toHaveLength(4);
          expect(tables[0].caption).toMatch(/illustrative|ilustrativa/i);
          expect(content.sections[5].content[0]).toMatch(/sans.*données|without.*data|sin.*datos/);
        }
        const faq = buildDafSubFaqSchema(content, locale);
        if (slug === "secteurs") {
          expect(faq!.mainEntity).toHaveLength(3);
          expect([...page.querySelectorAll("details")].map(s => text(s.querySelector(".site-copy")!))).toEqual(faq!.mainEntity.map(s => s.acceptedAnswer.text));
          expect(content.sections[4].content[0]).toMatch(/CIR/);
          if (locale !== "fr") expect(content.sections[4].content[0]).toMatch(/French|francés/);
        }
        const paths = alignedPaths(`/daf-externalise/${slug}`)!;
        expect(parityHref(`/daf-externalise/${slug}`, locale)).toBe(paths[locale]);
      }
    }
  });
});
