import { absoluteSchemaUrl, ORGANIZATION_ID, WEBSITE_ID, schemaLanguage, indicativePriceSpecification } from "@/lib/schemas/identity";
import { editorialPersonId } from "@/lib/content/finance-expert";
/**
 * JSON-LD structured data helpers for SEO.
 * Generates FAQPage, BreadcrumbList, Service, and other schemas.
 */

export interface FaqItemSchema {
  question: string;
  answer: string;
}

export interface BreadcrumbItemSchema {
  name: string;
  url: string;
}

const BASE = "https://www.iteradvisors.com";

/**
 * Generate FAQPage JSON-LD schema.
 */
export function faqPageSchema(items: FaqItemSchema[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 */
export function breadcrumbSchema(items: BreadcrumbItemSchema[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE}${item.url}`,
    })),
  };
}

/**
 * Generate Service JSON-LD schema with optional offer catalog.
 * NOTE: aggregateRating is NOT included (removed per ticket requirement).
 * Google does not offer review stars for a service or self-serving organization reviews,
 * including verified testimonials embedded by a third-party widget.
 */
export interface ServiceOffer {
  name: string;
  minPrice?: number;
  maxPrice?: number;
  unitText?: string;
  priceCurrency?: "EUR";
  description?: string;
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  /** ISO 3166-1 alpha-2 country codes, e.g. ["FR", "ES"]. */
  areaServed?: string[];
  offers?: ServiceOffer[];
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteSchemaUrl(url)}#service`,
    mainEntityOfPage: { "@id": `${absoluteSchemaUrl(url)}#webpage` },
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    provider: { "@id": ORGANIZATION_ID },
  };

  if (serviceType) schema.serviceType = serviceType;
  if (areaServed && areaServed.length > 0) schema.areaServed = areaServed;
  if (offers && offers.length > 0) {
    schema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: `${name} — formules`,
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        ...(o.description && { description: o.description }),
        ...(o.minPrice !== undefined && o.maxPrice !== undefined && o.unitText && { priceSpecification: indicativePriceSpecification(o.minPrice, o.maxPrice, o.unitText) }),
        ...(o.priceCurrency && { priceCurrency: o.priceCurrency }),
      })),
    };
  }

  return schema;
}

/**
 * Generate Person JSON-LD schema (for article author / EEAT signals).
 */
export function personSchema({
  name,
  jobTitle,
  url,
  imageUrl,
  sameAs,
  worksForName = "Iter Advisors",
  knowsAbout,
}: {
  name: string;
  jobTitle?: string;
  url?: string;
  imageUrl?: string;
  sameAs?: string[];
  worksForName?: string;
  knowsAbout?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(jobTitle && { jobTitle }),
    ...(url && { "@id": editorialPersonId(url), url: url.startsWith("http") ? url : `${BASE}${url}` }),
    ...(imageUrl && { image: imageUrl.startsWith("http") ? imageUrl : `${BASE}${imageUrl}` }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    worksFor: {
      "@type": "Organization",
      name: worksForName,
      ...(worksForName === "Iter Advisors" && { "@id": ORGANIZATION_ID }),
      url: `${BASE}/`,
    },
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout }),
  };
}

/**
 * Generate Speakable JSON-LD schema (voice-search optimization).
 *
 * Marks specific page sections (via CSS selectors) as suitable for voice
 * assistants (Google Assistant, Alexa, Siri) to read aloud. Targets long-form
 * editorial content where a Q&A or summary block makes sense for voice output.
 *
 * Per Schema.org spec: type SpeakableSpecification, can target either CSS
 * selectors or XPath. We use cssSelector since it's more portable.
 */
export function speakableSchema({
  url,
  cssSelectors,
}: {
  url: string;
  cssSelectors: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/**
 * Generate Article / BlogPosting JSON-LD schema.
 *
 * Extended (mai 2026 redesign) with `wordCount` + `articleSection` per
 * the blog-article-redesign ticket §6.6 acceptance criteria — these
 * boost rich-result eligibility on Google's BlogPosting type.
 */
export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Iter Advisors",
  authorUrl,
  imageSrc,
  wordCount,
  articleSection,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  /** Author canonical URL (e.g. /a-propos/benjamin-ziza). When provided
   *  the schema renders a Person author with a `url` instead of a
   *  generic Organization fallback. */
  authorUrl?: string;
  imageSrc?: string;
  /** Number of words in the article body; no documented ranking bonus. */
  wordCount?: number;
  /** Article section / category (e.g. "Fiscalité"). */
  articleSection?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteSchemaUrl(url)}#article`,
    inLanguage: schemaLanguage(url),
    headline,
    description,
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: authorUrl ? { "@id": editorialPersonId(authorUrl) } : authorName === "Iter Advisors" ? { "@id": ORGANIZATION_ID } : { "@type": "Person", name: authorName },
    publisher: { "@id": ORGANIZATION_ID },
    ...(imageSrc && {
      image: {
        "@type": "ImageObject",
        url: imageSrc.startsWith("http") ? imageSrc : `${BASE}${imageSrc}`,
      },
    }),
    ...(wordCount && wordCount > 0 && { wordCount }),
    ...(articleSection && { articleSection }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${absoluteSchemaUrl(url)}#webpage`,
      url: absoluteSchemaUrl(url),
      mainEntity: { "@id": `${absoluteSchemaUrl(url)}#article` },
      isPartOf: { "@id": WEBSITE_ID },
    },
  };
}

/**
 * Render a JSON-LD script tag string (for use in dangerouslySetInnerHTML).
 */
export function jsonLdString(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
