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
 * Generate Service JSON-LD schema with optional offer catalog and aggregate rating.
 */
export interface ServiceOffer {
  name: string;
  price?: string;
  priceCurrency?: string;
  description?: string;
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
  offers,
  aggregateRating,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  /** ISO 3166-1 alpha-2 country codes, e.g. ["FR", "ES"]. */
  areaServed?: string[];
  offers?: ServiceOffer[];
  aggregateRating?: { ratingValue: string; reviewCount: number };
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    provider: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: `${BASE}/`,
    },
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
        ...(o.price && { price: o.price }),
        ...(o.priceCurrency && { priceCurrency: o.priceCurrency }),
      })),
    };
  }
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
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
    ...(url && { url: url.startsWith("http") ? url : `${BASE}${url}` }),
    ...(imageUrl && { image: imageUrl.startsWith("http") ? imageUrl : `${BASE}${imageUrl}` }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
    worksFor: {
      "@type": "Organization",
      name: worksForName,
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
 * for this type, but it still feeds AI-generated answers (Perplexity,
 * SearchGPT, Gemini) — which is the GEO target for T-7.
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
 * Generate FinancialService JSON-LD schema for the organization.
 */
export function financialServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Iter Advisors",
    url: `${BASE}/`,
    description:
      "Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. Présent à Barcelone, Paris et Toulouse.",
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
        addressLocality: "Barcelone",
        addressCountry: "ES",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Toulouse",
        addressCountry: "FR",
      },
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      reviewCount: "31",
    },
    sameAs: ["https://www.linkedin.com/company/iter-advisors/"],
  };
}

/**
 * Generate Article / BlogPosting JSON-LD schema.
 */
export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Iter Advisors",
  imageSrc,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageSrc?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Organization",
      name: authorName,
      url: `${BASE}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: `${BASE}/`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/images/logos/logo-hero.png`,
      },
    },
    ...(imageSrc && {
      image: {
        "@type": "ImageObject",
        url: imageSrc.startsWith("http") ? imageSrc : `${BASE}${imageSrc}`,
      },
    }),
  };
}

/**
 * Render a JSON-LD script tag string (for use in dangerouslySetInnerHTML).
 */
export function jsonLdString(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
