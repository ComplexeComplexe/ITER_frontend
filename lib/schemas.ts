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
 * Generate Service JSON-LD schema.
 */
export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
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
    telephone: "",
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
      ratingCount: "31",
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
