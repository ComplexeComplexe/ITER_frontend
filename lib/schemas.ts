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
 * Generate HowTo JSON-LD schema (e.g. "How does the collaboration work?").
 *
 * Use for ordered, step-by-step procedures where each step has a name and
 * short description. Google's HowTo guidelines deprecate rich-result display
 * for this type, and there is no guaranteed AI citation benefit from this markup.
 */
export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

export function howToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description?: string;
  steps: HowToStep[];
  /** ISO 8601 duration, e.g. "P14D" for 14 days. */
  totalTime?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description && { description }),
    ...(totalTime && { totalTime }),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url.startsWith("http") ? s.url : `${BASE}${s.url}` }),
    })),
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
 * Generate ProfessionalService JSON-LD schema for the organization.
 *
 * The function name (`financialServiceSchema`) is kept for backward
 * compatibility with existing imports, but the emitted @type is
 * Organization — Schema.org positions FinancialService for
 * banks / insurance / lenders, which isn't what Iter Advisors is.
 * (T4 / 2026-06-07: docstring sync.)
 */
export function financialServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Iter Advisors",
    // Spanish SL — keep the legal identifiers in sync with the
    // canonical Organization graph emitted from app/layout.tsx.
    legalName: "Iter Advisors S.L.",
    taxID: "B42960849",
    vatID: "ESB42960849",
    url: `${BASE}/`,
    description:
      "Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. Équipes à Barcelone et Paris ; accompagnement à distance ou sur accord à Toulouse.",
    email: "contact@iteradvisors.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@iteradvisors.com",
      availableLanguage: ["French", "English", "Spanish"],
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Carrer Casp, 54, 5-1°",
        addressLocality: "Barcelona",
        postalCode: "08010",
        addressCountry: "ES",
      },
    ],
    // Review-snippet fix (2026-05-29): no self-serving aggregateRating here
    // either (this helper is currently unused, but kept consistent with the
    // policy applied across the live pages).
    sameAs: ["https://www.linkedin.com/company/iter-advisors/"],
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
 * Legacy review serializer. Do not use for Iter testimonials: self-serving reviews
 * on Organization are not eligible for Google review snippets.
 * Implements Corrections 2-4 from the ticket:
 * - Correction 2: author type is "Person" (not "Thing")
 * - Correction 3: Rating uses ratingValue (not name)
 * - Correction 4: itemReviewed is included in each review
 */
export interface ReviewData {
  author: string;
  datePublished: string; // ISO date YYYY-MM-DD
  reviewBody: string;
  rating: number; // 1-5
  url?: string; // Link to source (e.g. Trustfolio)
}

export function reviewsSchema(reviews: ReviewData[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.datePublished,
      reviewBody: review.reviewBody,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(review.rating),
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: {
        "@type": "Organization",
        "@id": "https://www.iteradvisors.com/#organization",
      },
      ...(review.url && { url: review.url }),
    })),
  };
}

/**
 * Render a JSON-LD script tag string (for use in dangerouslySetInnerHTML).
 */
export function jsonLdString(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
