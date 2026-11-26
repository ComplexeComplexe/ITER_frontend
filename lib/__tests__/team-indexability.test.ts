import { describe, expect, it } from "vitest";
import { generateMetadata as frenchMetadata } from "@/app/(fr)/a-propos/[slug]/page";
import { generateMetadata as englishMetadata } from "@/app/(en)/en/about/[slug]/page";
import { generateMetadata as spanishMetadata } from "@/app/(es)/es/quienes-somos/[slug]/page";
import { buildMetadata } from "@/lib/metadata";
import sitemap from "@/app/sitemap";

const routes = [
  { metadata: frenchMetadata, prefix: "/a-propos", language: "fr-FR" },
  { metadata: englishMetadata, prefix: "/en/about", language: "en-GB" },
  { metadata: spanishMetadata, prefix: "/es/quienes-somos", language: "es-ES" },
];

describe("Searchable team profiles", () => {
  it("allows discovery of Hugo and Gonzalo in each language with reciprocal canonical translations", async () => {
    const entries = sitemap();
    for (const slug of ["hugo-lepresle", "gonzalo-serratosa-de-caralt"]) {
      const translations = [];
      for (const route of routes) {
        const metadata = await route.metadata({ params: Promise.resolve({ slug }) });
        const canonical = `https://www.iteradvisors.com${route.prefix}/${slug}`;
        expect(metadata.robots).not.toContain("noindex");
        expect(metadata.alternates?.canonical).toBe(canonical);
        expect(metadata.alternates?.languages?.[route.language]).toBe(canonical);
        expect(entries.find(entry => entry.url === canonical)?.alternates?.languages).toEqual(metadata.alternates?.languages);
        translations.push(metadata.alternates?.languages);
      }
      expect(translations[1]).toEqual(translations[0]);
      expect(translations[2]).toEqual(translations[0]);
    }
  });
  it("uses distinct translated titles while retaining each person's name and the brand", async () => {
    for (const slug of ["christophe-hoarau", "benjamin-carlot", "sebastien-preel", "jessica-barnicaud", "tom-jaufre"]) {
      const titles = [];
      for (const route of routes) {
        const metadata = await route.metadata({ params: Promise.resolve({ slug }) });
        const title = metadata.title as string;
        expect(title).toContain(" | Iter Advisors");
        expect(title.length).toBeLessThanOrEqual(60);
        titles.push(title);
      }
      expect(new Set(titles).size).toBe(3);
    }
  });
  it("does not advertise excluded careers hubs as hreflang translations", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      const metadata = buildMetadata({ locale, path: "/jobs", title: "Jobs", description: "Open roles", noindex: true });
      expect(metadata.robots).toBe("noindex, follow");
      expect(metadata.alternates?.canonical).toBeTruthy();
      expect(metadata.alternates?.languages).toBeUndefined();
    }
  });
});
