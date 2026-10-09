import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { getDafPillarContent } from "@/lib/content/daf-pillar-locales";
import { getFinanceServices } from "@/lib/content/finance-service-locales";
import { getFinanceHub } from "@/lib/content/finance-hub-locales";
import { ALIGNED_PAGE_IDS, alignedPaths } from "@/lib/content/locale-publication";
import { parityHref } from "@/lib/locale-route-map";
import { getLocalizedPath } from "@/lib/path-localization";
import { FORMULES } from "@/lib/content/facts";
import sitemap from "@/app/sitemap";
import DafPillarPage from "@/components/pages/DafPillarPage";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { FINANCE_SERVICES } from "@/lib/content/finance-services";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("@/components/Breadcrumb", () => ({ default: () => null }));

const locales = ["fr", "en", "es"] as const;
const blocks = (html: string) => [...html.matchAll(/data-block-key="([^"]+)"/g)].map(item => item[1]);
const base = "https://www.iteradvisors.com";

describe("reviewed locale parity", () => {
  it("renders the same eight pillar sections and one visible H1 in each language", () => {
    const expected = ["besoin", "missions", "preuves", "methode", "tarifs", "pourquoi-iter", "faq", "contact"];
    for (const locale of locales) {
      const html = renderToStaticMarkup(<DafPillarPage locale={locale} />);
      expect(blocks(html)).toEqual(expected);
      expect(html.match(/<h1[ >]/g)).toHaveLength(1);
      expect(html.match(/<h2[ >]/g)).toHaveLength(8);
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const faq = scripts.find(item => item["@type"] === "FAQPage");
      expect(faq.mainEntity).toHaveLength(6);
      for (const question of faq.mainEntity) expect(html).toContain(question.name.replace(/&/g, "&amp;"));
      const service = scripts.find(item => item["@type"] === "Service");
      expect(service.url).toBe(`${base}${alignedPaths("/daf-externalise")![locale]}`);
      expect(service.offers["@type"]).toBe("Offer");
      expect(service.offers.priceSpecification.minPrice).toBe(FORMULES[0].prixMin);
      expect(service.offers.priceSpecification.maxPrice).toBe(FORMULES.at(-1)!.prixMax);
    }
  });
  it("keeps service sections, deliverables, questions and variant tables across all ten services", () => {
    for (const key of Object.keys(FINANCE_SERVICES)) {
      const html = locales.map(locale => renderToStaticMarkup(<FinanceServicePage locale={locale} service={getFinanceServices(locale)[key]} />));
      expect(blocks(html[1])).toEqual(blocks(html[0]));
      expect(blocks(html[2])).toEqual(blocks(html[0]));
      for (const locale of locales) {
        const source = FINANCE_SERVICES[key], item = getFinanceServices(locale)[key];
        expect(item.faq).toHaveLength(source.faq.length);
        expect(item.deliverables).toHaveLength(source.deliverables.length);
        expect(item.scope).toHaveLength(source.scope.length);
        expect(item.resources.map(row => row[1])).toEqual(source.resources.map(row => row[1]));
        expect(item.calendar?.rows.length).toBe(source.calendar?.rows.length);
        expect(item.case).toBe(source.case);
      }
    }
  });
  it("preserves the four finance hub groups and their ordering", () => {
    const fr = getFinanceHub("fr").groups.map(group => [group.id, group.keys]);
    for (const locale of locales) expect(getFinanceHub(locale).groups.map(group => [group.id, group.keys])).toEqual(fr);
  });
  it("uses published URLs in metadata, language switching and sitemap exactly once", () => {
    const entries = sitemap();
    for (const id of ALIGNED_PAGE_IDS) {
      const paths = alignedPaths(id)!;
      for (const locale of locales) {
        expect(parityHref(id, locale)).toBe(paths[locale]);
        const rows = entries.filter(row => row.url === `${base}${paths[locale]}`);
        expect(rows).toHaveLength(1);
        expect(rows[0].alternates?.languages?.["en-GB"]).toBe(`${base}${paths.en}`);
        for (const target of locales) expect(getLocalizedPath(paths[locale], target)).toBe(paths[target]);
      }
    }
    // A proposed guide is not promoted as if a translation existed.
    expect(parityHref("/ressources/fiscalite/beckham-law", "es")).toBe("/es/recursos/fiscalidad/ley-beckham");
  });
  it("keeps the accounting scope explicit and avoids untranslated CFO terminology", () => {
    const en = getFinanceServices("en"), es = getFinanceServices("es");
    expect(en.comptabilite.faq[1][1]).toContain("should not be assumed");
    expect(es.comptabilite.faq[1][1]).toContain("No debe suponerse");
    expect(JSON.stringify(en)).not.toMatch(/outsourced CFO|time.?shared DAF|FAD|Install Pilotage/i);
    expect(JSON.stringify(es)).not.toMatch(/DAF externalizador|DAFEX|DAFILOTACIÓN|no remunerada|Instalar el piloto/i);
    for (const locale of ["en", "es"] as const) {
      const content = getDafPillarContent(locale);
      expect(content.cases.quote.sourceUrl).toBe(getDafPillarContent("fr").cases.quote.sourceUrl);
      expect(content.cases.items.map(item => item.company)).toEqual(["Opti Digital", "SolarMente"]);
    }
  });
});
