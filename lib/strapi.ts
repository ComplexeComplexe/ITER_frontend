/**
 * Strapi API client for fetching CMS content at build time.
 * Supports i18n locales (fr, en, es) and Strapi v5 response format.
 */

import { Locale } from "@/lib/i18n";

// ─── Config ───────────────────────────────────────────────

// API base URL: Strapi REST API is at the root, not under /admin
const rawStrapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_URL = rawStrapiUrl.replace(/\/admin\/?$/, "") || rawStrapiUrl;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const isLocalStrapi =
  typeof STRAPI_URL === "string" &&
  (STRAPI_URL.includes("localhost") || STRAPI_URL.includes("127.0.0.1"));

/** Map front-end locale to Strapi API locale. */
function toStrapiLocale(locale: string): string {
  if (isLocalStrapi) return locale;
  // Strapi Cloud uses fr-FR, es-ES; backend uses fr, es
  const cloud: Record<string, string> = { fr: "fr-FR", en: "en", es: "es" };
  return cloud[locale] ?? locale;
}

// ─── Types ────────────────────────────────────────────────

/** Strapi v5 blocks rich-text node types */
export interface StrapiTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiLinkNode {
  type: "link";
  url: string;
  children: StrapiInlineNode[];
}

export type StrapiInlineNode = StrapiTextNode | StrapiLinkNode;

export interface StrapiParagraphBlock {
  type: "paragraph";
  children: StrapiInlineNode[];
}

export interface StrapiHeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiInlineNode[];
}

export interface StrapiListBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: { type: "list-item"; children: StrapiInlineNode[] }[];
}

export interface StrapiQuoteBlock {
  type: "quote";
  children: StrapiInlineNode[];
}

export interface StrapiImageBlock {
  type: "image";
  image: StrapiMedia;
  children: StrapiInlineNode[];
}

export type StrapiBlock =
  | StrapiParagraphBlock
  | StrapiHeadingBlock
  | StrapiListBlock
  | StrapiQuoteBlock
  | StrapiImageBlock;

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: StrapiMedia | null;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface StrapiFaqItem {
  id: number;
  question: string;
  answer: StrapiBlock[];
}

// ─── Response shapes ──────────────────────────────────────

export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string; locale: string };
}

export interface StrapiCollectionResponse<T> {
  data: (T & { id: number; documentId: string; locale: string })[];
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

// ─── Content type data shapes ─────────────────────────────

export interface StrapiHomepage {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: { label: string; url: string; variant: string } | null;
  valuePropositions: { id: number; title: string; description: string; icon?: StrapiMedia }[];
  statistics: { id: number; value: string; label: string }[];
  whyChooseItems: { id: number; title: string; description: string }[];
  featuredArticles: StrapiBlogArticle[];
  seo: StrapiSeo;
}

export interface StrapiAboutPage {
  heroTitle: string;
  whoWeAre: StrapiBlock[];
  vision: StrapiBlock[];
  whenToCallUs: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export interface StrapiContactPage {
  heroTitle: string;
  introduction: string;
  offices: { id: number; city: string; address: string; phone: string; email: string }[];
  seo: StrapiSeo;
}

export interface StrapiDafPage {
  heroTitle: string;
  heroSubtitle: string;
  content: StrapiBlock[];
  subPages: { id: number; title: string; description: string; icon?: StrapiMedia; link: string }[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export interface StrapiDafSubPage {
  heroTitle: string;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

/** DRH service row for the services grid */
export interface StrapiDrhServiceRow {
  id: number;
  title: string;
  description: string;
  tier1: boolean;
  tier2: boolean;
  tier3: boolean;
  tier4: boolean;
  isAddOn: boolean;
}

/** DRH service category (repeatable on drh-externalise-page) */
export interface StrapiDrhServiceCategory {
  id: number;
  categoryName: string;
  services: StrapiDrhServiceRow[];
}

export interface StrapiDrhPage {
  heroTitle: string;
  heroSubtitle: string;
  content: StrapiBlock[];
  subPages: { id: number; title: string; description: string; icon?: StrapiMedia; link: string }[];
  serviceCategories?: StrapiDrhServiceCategory[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export interface StrapiDrhSubPage {
  heroTitle: string;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export interface StrapiServicesPage {
  heroTitle: string;
  introduction: string;
  serviceCards: StrapiServiceDetail[];
  seo: StrapiSeo;
}

export interface StrapiServiceDetail {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

/** Single-type service pages (one Strapi single type per service) */
export interface StrapiServiceSinglePage {
  heroTitle: string;
  heroSubtitle?: string;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export const SERVICE_PAGE_SLUGS = [
  "previsionnel-tresorerie",
  "gestion-financiere-externalisee",
  "accompagnement-levee-de-fond",
  "comptabilite-externalisation",
  "controle-de-gestion-externalise",
] as const;

export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

export const SERVICE_PAGE_API_MAP: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "previsionnel-tresorerie-page",
  "gestion-financiere-externalisee": "gestion-financiere-externalisee-page",
  "accompagnement-levee-de-fond": "accompagnement-levee-de-fond-page",
  "comptabilite-externalisation": "comptabilite-externalisation-page",
  "controle-de-gestion-externalise": "controle-de-gestion-externalise-page",
};

/** URL slug per locale (FR = canonical; EN/ES = localized slugs) */
export const SERVICE_URL_SLUG_BY_LOCALE: Record<Locale, Record<ServicePageSlug, string>> = {
  fr: {
    "previsionnel-tresorerie": "previsionnel-tresorerie",
    "gestion-financiere-externalisee": "gestion-financiere-externalisee",
    "accompagnement-levee-de-fond": "accompagnement-levee-de-fond",
    "comptabilite-externalisation": "comptabilite-externalisation",
    "controle-de-gestion-externalise": "controle-de-gestion-externalise",
  },
  en: {
    "previsionnel-tresorerie": "cash-flow-forecast",
    "gestion-financiere-externalisee": "outsourced-financial-management",
    "accompagnement-levee-de-fond": "fund-raising-support",
    "comptabilite-externalisation": "outsource-your-accounting",
    "controle-de-gestion-externalise": "outsourced-management-control",
  },
  es: {
    "previsionnel-tresorerie": "prevision-tesoreria",
    "gestion-financiere-externalisee": "gestion-financiera-externalizada",
    "accompagnement-levee-de-fond": "soporte-financiacion",
    "comptabilite-externalisation": "externalizar-contabilidad",
    "controle-de-gestion-externalise": "control-gestion-externalizado",
  },
};

/** Resolve URL slug (from route) to canonical slug for API. */
export function getCanonicalServiceSlug(locale: Locale, urlSlug: string): ServicePageSlug | null {
  if (locale === "fr") {
    return (SERVICE_PAGE_SLUGS as readonly string[]).includes(urlSlug) ? (urlSlug as ServicePageSlug) : null;
  }
  for (const canonical of SERVICE_PAGE_SLUGS) {
    if (SERVICE_URL_SLUG_BY_LOCALE[locale][canonical] === urlSlug) return canonical;
  }
  return null;
}

/** List of URL slugs for generateStaticParams for a given locale. */
export function getServiceSlugsForLocale(locale: Locale): string[] {
  return SERVICE_PAGE_SLUGS.map((s) => SERVICE_URL_SLUG_BY_LOCALE[locale][s]);
}

export interface StrapiBlogArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: StrapiBlock[];
  excerpt: string;
  featuredImage?: StrapiMedia | null;
  publishedDate: string;
  tableOfContents: boolean;
  category: string;
  relatedArticles?: StrapiBlogArticle[];
  seo?: StrapiSeo;
}

export interface StrapiTeamMember {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  role: string;
  slug: string;
  photo?: StrapiMedia | null;
  linkedIn?: string;
  order: number;
}

export interface StrapiTestimonial {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  clientLogo?: StrapiMedia | null;
  industry: string;
  initialRevenue: string;
  teamSize: string;
  missionStart: string;
  engagementType: string;
  challenge: StrapiBlock[];
  solution: StrapiBlock[];
  results: { id: number; metric: string; description: string }[];
  seo?: StrapiSeo;
}

export interface StrapiClientLogo {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  logo?: StrapiMedia | null;
  url: string;
  order: number;
}

export interface StrapiJobOffer {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  contractType: string;
  department: string;
  description: StrapiBlock[];
  requirements: StrapiBlock[];
  isActive: boolean;
  seo?: StrapiSeo;
}

export interface StrapiGlobal {
  siteName: string;
  logo?: StrapiMedia | null;
  defaultSeo: StrapiSeo;
  navigation: { id: number; label: string; url: string; children: { label: string; url: string }[] }[];
  footer: { description: string; copyright: string };
  socialLinks: { id: number; platform: string; url: string }[];
  aggregateRating: { score: string; count: number; platform: string } | null;
}

export interface StrapiLegalPage {
  title: string;
  content: StrapiBlock[];
  seo: StrapiSeo;
}

export interface StrapiGlossaryTerm {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  definition: string;
  content: StrapiBlock[];
  seo?: StrapiSeo;
}

export interface StrapiJobMetier {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  featuredImage?: StrapiMedia | null;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo?: StrapiSeo;
}

// ─── Fetch helper ─────────────────────────────────────────

/**
 * Generic fetch function for Strapi API.
 * Handles auth, locale, populate, and error handling.
 */
export async function strapiFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  options: { locale?: Locale; revalidate?: number } = {}
): Promise<T> {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);

  // Add locale if specified (mapped to Strapi Cloud codes)
  if (options.locale) {
    url.searchParams.set("locale", toStrapiLocale(options.locale));
  }

  // Add all additional params
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: options.revalidate !== undefined ? { revalidate: options.revalidate } : undefined,
  });

  if (!res.ok) {
    console.error(`Strapi fetch error: ${res.status} ${res.statusText} for ${url.toString()}`);
    throw new Error(`Failed to fetch from Strapi: ${res.status}`);
  }

  return res.json();
}

// ─── CMS Navigation helper ────────────────────────────────

export interface CmsNavItem {
  title: string;
  href: string;
  children?: { text: string; href: string }[];
}

export async function getCmsNavigation(locale: Locale): Promise<CmsNavItem[] | undefined> {
  try {
    const global = await getGlobal(locale);
    if (!global?.navigation || global.navigation.length === 0) return undefined;
    const items: CmsNavItem[] = global.navigation
      .map((item) => {
        const children =
          item.children
            ?.filter((child) => child.label && child.url)
            .map((child) => ({ text: child.label, href: child.url })) ?? [];
        return {
          title: item.label || "",
          href: item.url || "#",
          children: children.length > 0 ? children : undefined,
        };
      })
      .filter((item) => item.title && item.href);
    return items.length > 0 ? items : undefined;
  } catch {
    return undefined;
  }
}

// ─── Data fetching functions ──────────────────────────────

/** Get global site settings (nav, footer, etc.) */
export async function getGlobal(locale: Locale): Promise<StrapiGlobal | null> {
  const fallbackLocales: Locale[] = locale === "fr" ? ["en"] : locale === "en" ? ["fr"] : ["en", "fr"];
  try {
    const fetchGlobal = async (targetLocale: Locale) =>
      strapiFetch<StrapiSingleResponse<StrapiGlobal>>(
        "global",
        {
          "populate[navigation][populate]": "children",
          "populate[footer][populate]": "*",
          "populate[socialLinks][populate]": "*",
          "populate[aggregateRating][populate]": "*",
          "populate[logo]": "*",
          "populate[defaultSeo][populate]": "ogImage",
        },
        { locale: targetLocale, revalidate: 60 }
      );

    const primary = await fetchGlobal(locale);
    if (primary.data) return primary.data;

    for (const fallbackLocale of fallbackLocales) {
      try {
        const fallback = await fetchGlobal(fallbackLocale);
        if (fallback.data) return fallback.data;
      } catch {
        // Continue to next fallback locale.
      }
    }
  } catch {
    // Try fallback locales before giving up.
    for (const fallbackLocale of fallbackLocales) {
      try {
        const fallback = await strapiFetch<StrapiSingleResponse<StrapiGlobal>>(
          "global",
          {
            "populate[navigation][populate]": "children",
            "populate[footer][populate]": "*",
            "populate[socialLinks][populate]": "*",
            "populate[aggregateRating][populate]": "*",
            "populate[logo]": "*",
            "populate[defaultSeo][populate]": "ogImage",
          },
          { locale: fallbackLocale, revalidate: 60 }
        );
        if (fallback.data) return fallback.data;
      } catch {
        // Continue to next fallback locale.
      }
    }
  }
  return null;
}

/** Get homepage data */
export async function getHomepage(locale: Locale): Promise<StrapiHomepage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiHomepage>>(
      "homepage",
      {
        "populate[heroCta]": "*",
        "populate[valuePropositions][populate]": "icon",
        "populate[statistics]": "*",
        "populate[whyChooseItems]": "*",
        "populate[featuredArticles][populate]": "featuredImage",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get about page data */
export async function getAboutPage(locale: Locale): Promise<StrapiAboutPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiAboutPage>>(
      "about-page",
      {
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get contact page data */
export async function getContactPage(locale: Locale): Promise<StrapiContactPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiContactPage>>(
      "contact-page",
      {
        "populate[offices]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get DAF externalisé page data */
export async function getDafExternalisePage(locale: Locale): Promise<StrapiDafPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiDafPage>>(
      "daf-externalise-page",
      {
        "populate[subPages][populate]": "icon",
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get DAF sub-pages (métier, temps partagé, transition) */
export async function getDafSubPage(
  type: "daf-metier-page" | "daf-temps-partage-page" | "daf-transition-page",
  locale: Locale
): Promise<StrapiDafSubPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiDafSubPage>>(
      type,
      {
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get DRH externalisé page data */
export async function getDrhExternalisePage(locale: Locale): Promise<StrapiDrhPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiDrhPage>>(
      "drh-externalise-page",
      {
        "populate[subPages][populate]": "icon",
        "populate[serviceCategories][populate][services]": "*",
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

export type StrapiDrhSubPageType = "drh-temps-partage-page";

/** Get DRH sub-pages (temps partagé, etc.) */
export async function getDrhSubPage(
  type: StrapiDrhSubPageType,
  locale: Locale
): Promise<StrapiDrhSubPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiDrhSubPage>>(
      type,
      {
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get services page with service cards */
export async function getServicesPage(locale: Locale): Promise<StrapiServicesPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiServicesPage>>(
      "services-page",
      {
        "populate[serviceCards][populate]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get all service details */
export async function getServiceDetails(locale: Locale): Promise<StrapiServiceDetail[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiServiceDetail>>(
      "service-details",
      {
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get a single service by slug (collection type service-details) */
export async function getServiceBySlug(slug: string, locale: Locale): Promise<StrapiServiceDetail | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiServiceDetail>>(
      "service-details",
      {
        "filters[slug][$eq]": slug,
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Get a service single-type page by slug (FR, EN, ES) */
export async function getServiceSinglePage(
  slug: ServicePageSlug,
  locale: Locale
): Promise<StrapiServiceSinglePage | null> {
  const apiName = SERVICE_PAGE_API_MAP[slug];
  if (!apiName) return null;
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiServiceSinglePage>>(
      apiName,
      {
        "populate[faq]": "*",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get all blog articles (listing: no seo populate to avoid 400 on Strapi v5) */
export async function getBlogArticles(locale: Locale): Promise<StrapiBlogArticle[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiBlogArticle>>(
      "blog-articles",
      {
        "populate[0]": "featuredImage",
        "sort[0]": "publishedDate:desc",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get a single blog article by slug */
export async function getBlogArticleBySlug(slug: string, locale: Locale): Promise<StrapiBlogArticle | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiBlogArticle>>(
      "blog-articles",
      {
        "filters[slug][$eq]": slug,
        "populate[featuredImage]": "*",
        "populate[relatedArticles][populate]": "featuredImage",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Get all team members */
export async function getTeamMembers(locale: Locale): Promise<StrapiTeamMember[]> {
  const fallbackLocales: Locale[] = locale === "fr" ? ["en"] : locale === "en" ? ["fr"] : ["en", "fr"];
  try {
    const fetchMembers = async (targetLocale: Locale) =>
      strapiFetch<StrapiCollectionResponse<StrapiTeamMember>>(
        "team-members",
        {
          populate: "photo",
          "sort[0]": "order:asc",
          "pagination[pageSize]": "100",
        },
        { locale: targetLocale, revalidate: 60 }
      );

    const primary = await fetchMembers(locale);
    if (primary.data.length > 0) return primary.data;

    for (const fallbackLocale of fallbackLocales) {
      try {
        const fallback = await fetchMembers(fallbackLocale);
        if (fallback.data.length > 0) return fallback.data;
      } catch {
        // Continue to next fallback locale.
      }
    }
  } catch {
    // Try fallback locales before returning an empty list.
    for (const fallbackLocale of fallbackLocales) {
      try {
        const fallback = await strapiFetch<StrapiCollectionResponse<StrapiTeamMember>>(
          "team-members",
          {
            populate: "photo",
            "sort[0]": "order:asc",
            "pagination[pageSize]": "100",
          },
          { locale: fallbackLocale, revalidate: 60 }
        );
        if (fallback.data.length > 0) return fallback.data;
      } catch {
        // Continue to next fallback locale.
      }
    }
  }
  return [];
}

/** Get all testimonials */
export async function getTestimonials(locale: Locale): Promise<StrapiTestimonial[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiTestimonial>>(
      "testimonials",
      {
        "populate[clientLogo]": "*",
        "populate[results]": "*",
        "populate[seo][populate]": "ogImage",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get a single testimonial by slug */
export async function getTestimonialBySlug(slug: string, locale: Locale): Promise<StrapiTestimonial | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiTestimonial>>(
      "testimonials",
      {
        "filters[slug][$eq]": slug,
        "populate[clientLogo]": "*",
        "populate[results]": "*",
        "populate[relatedTestimonials][populate]": "clientLogo",
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Get all client logos */
export async function getClientLogos(locale: Locale): Promise<StrapiClientLogo[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiClientLogo>>(
      "client-logos",
      {
        "populate[logo]": "*",
        "sort": "order:asc",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get all job offers */
export async function getJobOffers(locale: Locale): Promise<StrapiJobOffer[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiJobOffer>>(
      "job-offers",
      {
        "filters[isActive][$eq]": "true",
        "populate[seo][populate]": "ogImage",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get legal page */
export async function getLegalPage(locale: Locale): Promise<StrapiLegalPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiLegalPage>>(
      "legal-page",
      { "populate[seo][populate]": "ogImage" },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get privacy page */
export async function getPrivacyPage(locale: Locale): Promise<StrapiLegalPage | null> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<StrapiLegalPage>>(
      "privacy-page",
      { "populate[seo][populate]": "ogImage" },
      { locale }
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Get glossary terms */
export async function getGlossaryTerms(locale: Locale): Promise<StrapiGlossaryTerm[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiGlossaryTerm>>(
      "glossary-terms",
      {
        "populate[seo][populate]": "ogImage",
        "sort": "title:asc",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Build a URL-friendly slug from a title (for SEO when Strapi slug is missing) */
export function slugifyFromTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Slug for fiches métier URLs: prefer Strapi slug, else slug from title (SEO), never documentId in URL */
export function getJobMetierSlugForUrl(fiche: StrapiJobMetier): string {
  const s = (fiche as { slug?: unknown }).slug;
  return typeof s === "string" && s ? s : slugifyFromTitle(fiche.title);
}

/** Get job métier fiches */
export async function getJobMetiers(locale: Locale): Promise<StrapiJobMetier[]> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiJobMetier>>(
      "job-metiers",
      {
        populate: "*",
        "pagination[pageSize]": "100",
      },
      { locale }
    );
    return res.data;
  } catch {
    return [];
  }
}

/** Get a single job métier fiche by slug */
export async function getJobMetierBySlug(
  slug: string,
  locale: Locale
): Promise<StrapiJobMetier | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiJobMetier>>(
      "job-metiers",
      {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
      { locale }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Get a single job métier fiche by documentId (fallback when slug is missing in URL) */
export async function getJobMetierByDocumentId(
  documentId: string,
  locale: Locale
): Promise<StrapiJobMetier | null> {
  try {
    const res = await strapiFetch<StrapiCollectionResponse<StrapiJobMetier>>(
      "job-metiers",
      {
        "filters[documentId][$eq]": documentId,
        populate: "*",
      },
      { locale }
    );
    return res.data[0] ?? null;
  } catch {
    return null;
  }
}

/** Get a fiche by slug (API slug, documentId, or slug derived from title for SEO URLs) */
export async function getJobMetierBySlugOrSlugifiedTitle(
  slug: string,
  locale: Locale
): Promise<StrapiJobMetier | null> {
  let fiche = await getJobMetierBySlug(slug, locale);
  if (fiche) return fiche;
  fiche = await getJobMetierByDocumentId(slug, locale);
  if (fiche) return fiche;
  const fiches = await getJobMetiers(locale);
  return fiches.find((f) => getJobMetierSlugForUrl(f) === slug) ?? null;
}

// ─── Utility: Strapi media URL ────────────────────────────

/** Resolve a Strapi media URL to a full URL */
export function strapiMediaUrl(media: StrapiMedia | null | undefined): string {
  if (!media?.url) return "";
  // If it's already absolute, return as-is
  if (media.url.startsWith("http")) return media.url;
  // Otherwise prefix with Strapi URL
  return `${STRAPI_URL}${media.url}`;
}

// ─── Utility: Blocks to plain text ────────────────────────

/** Extract plain text from Strapi blocks (useful for excerpts, meta descriptions) */
export function blocksToText(blocks: StrapiBlock[]): string {
  return blocks
    .map((block) => {
      if ("children" in block) {
        return block.children
          .map((child) => {
            if (child.type === "text") return child.text;
            if (child.type === "link") {
              return child.children.map((c) => (c.type === "text" ? c.text : "")).join("");
            }
            return "";
          })
          .join("");
      }
      return "";
    })
    .join("\n");
}

/** Split blocks into paragraphs of plain text */
export function blocksToTextArray(blocks: StrapiBlock[]): string[] {
  return blocks
    .filter((b) => b.type === "paragraph")
    .map((block) =>
      block.children
        .map((child) => {
          if (child.type === "text") return child.text;
          if (child.type === "link") {
            return child.children.map((c) => (c.type === "text" ? c.text : "")).join("");
          }
          return "";
        })
        .join("")
    )
    .filter((t) => t.trim().length > 0);
}
