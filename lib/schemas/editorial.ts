import type { Locale } from "@/lib/i18n";
import { aboutHref } from "@/lib/path-localization";

/**
 * Attribution éditoriale des pages de services.
 *
 * REDESIGN-P4 (2026-09-01) — 23 pages de services n'avaient ni auteur, ni
 * date, ni schéma qui les porte : la garde E-E-A-T de la recette ne les
 * couvrait pas, et un moteur n'avait aucun moyen de savoir qui parle. Le
 * schéma `WebPage` porte l'auteur (Person reliée à sa fiche) et les dates ;
 * le composant PageByline les rend visibles, avec rel="author".
 *
 * Attributions à valider par Guillaume : finance → Benjamin Ziza (associé
 * fondateur, CFO), RH → Borith Biv (Partner Capital Humain).
 */

export interface EditorialAuthor {
  name: string;
  /** Slug de la fiche /a-propos/<slug> (localisée par aboutHref). */
  slug: string;
}

export const FINANCE_AUTHOR: EditorialAuthor = { name: "Benjamin Ziza", slug: "benjamin-ziza" };
export const HR_AUTHOR: EditorialAuthor = { name: "Borith Biv", slug: "borith-biv" };

/** Pages de services : dernière refonte de fond en mai, attribution et FAQ en septembre. */
export const SERVICE_PUBLISHED = "2026-05-17";
export const SERVICE_MODIFIED = "2026-09-01";
export const SERVICE_MODIFIED_LABEL: Record<Locale, string> = {
  fr: "1er septembre 2026",
  en: "1 September 2026",
  es: "1 de septiembre de 2026",
};

const SITE = "https://www.iteradvisors.com";

export function authorHref(locale: Locale, author: EditorialAuthor): string {
  return aboutHref(locale, author.slug);
}

export function editorialWebPageSchema({
  path,
  name,
  description,
  locale,
  author,
  datePublished = SERVICE_PUBLISHED,
  dateModified = SERVICE_MODIFIED,
}: {
  /** Chemin relatif de la page, avec son préfixe de locale s'il y a lieu. */
  path: string;
  name: string;
  description: string;
  locale: Locale;
  author: EditorialAuthor;
  datePublished?: string;
  dateModified?: string;
}): Record<string, unknown> {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale === "fr" ? "fr-FR" : locale === "en" ? "en-GB" : "es-ES",
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE}${authorHref(locale, author)}`,
    },
    publisher: { "@id": `${SITE}/#organization` },
    isPartOf: { "@id": `${SITE}/#website` },
  };
}
