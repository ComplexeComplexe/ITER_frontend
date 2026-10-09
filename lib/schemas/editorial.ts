import { editorialPersonId } from "@/lib/content/finance-expert";
import type { Locale } from "@/lib/i18n";
import { aboutHref } from "@/lib/path-localization";
import { parityHref } from "@/lib/locale-route-map";

/** Keep named editorial authors distinct from contacts and cabinet commercial copy. */

export interface EditorialAuthor {
  name: string;
  type?: "Person" | "Organization";
  /** Slug de la fiche /a-propos/<slug> (localisée par aboutHref). */
  slug: string;
}

export const FINANCE_AUTHOR: EditorialAuthor = { name: "Benjamin Ziza", slug: "benjamin-ziza" };
export const HR_AUTHOR: EditorialAuthor = { name: "Borith Biv", slug: "borith-biv" };
/** Commercial copy belongs to the cabinet; named contacts are not assumed authors. */
export const ITER_AUTHOR: EditorialAuthor = { name: "Iter Advisors", slug: "", type: "Organization" };

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
  if (author.type === "Organization") return parityHref("/a-propos", locale);
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
  mainEntityId,
}: {
  /** Chemin relatif de la page, avec son préfixe de locale s'il y a lieu. */
  path: string;
  name: string;
  description: string;
  locale: Locale;
  author: EditorialAuthor;
  datePublished?: string;
  dateModified?: string;
  mainEntityId?: string;
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
    ...(mainEntityId && { mainEntity: { "@id": mainEntityId } }),
    author: author.type === "Organization" ? {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: author.name,
      url: SITE,
    } : {
      "@type": "Person",
      "@id": editorialPersonId(authorHref(locale, author)),
      name: author.name,
      url: `${SITE}${authorHref(locale, author)}`,
    },
    publisher: { "@id": `${SITE}/#organization` },
    isPartOf: { "@id": `${SITE}/#website` },
  };
}
