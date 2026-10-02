import type { Locale } from "@/lib/i18n";
import { getDafSubContent, type DafSubContent } from "./daf-sub";
import sectorsEn from "./locales/daf-sectors.en.json";
import sectorsEs from "./locales/daf-sectors.es.json";
import { parityHref } from "@/lib/locale-route-map";

export const SECTOR_SLUGS = ["secteurs", "ecommerce", "industrie", "deep-tech"] as const;
export type SectorSlug = typeof SECTOR_SLUGS[number];

/** Complete translations reviewed against the FR sections, tables and limits. */
export function getDafSectorContent(locale: Locale, slug: SectorSlug): DafSubContent {
  if (locale === "fr") return getDafSubContent("fr", slug)!;
  const content = (locale === "en" ? sectorsEn : sectorsEs)[slug];
  return { ...content, parentHref: parityHref(content.parentHref, locale) };
}
