/** Static content access. Historical type names remain to avoid changing persisted data shapes. No CMS connection or environment credentials are used at runtime. */

import { Locale } from "@/lib/i18n";

import { fallbackServicePages } from "@/lib/fallback-service-pages";

import { getFallbackServicePage } from "@/lib/fallback-service-pages-localized";

import { getStaticBlogListing } from "@/lib/blog-listing";

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

export interface StrapiSingleResponse<T> {
  data: T & { id: number; documentId: string; locale: string };
}

export interface StrapiCollectionResponse<T> {
  data: (T & { id: number; documentId: string; locale: string })[];
  meta?: {
    pagination?: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

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

export interface StrapiServiceSinglePage {
  heroTitle: string;
  heroSubtitle?: string;
  content: StrapiBlock[];
  faq: StrapiFaqItem[];
  seo: StrapiSeo;
}

export { SERVICE_PAGE_SLUGS, SERVICE_URL_SLUG_BY_LOCALE, getCanonicalServiceSlug } from "./fallback-service-pages";
import { SERVICE_PAGE_SLUGS, SERVICE_URL_SLUG_BY_LOCALE, type ServicePageSlug } from "./fallback-service-pages";
export type { ServicePageSlug } from "./fallback-service-pages";

const SERVICES_SANS_GROUPE_HREFLANG: ReadonlySet<ServicePageSlug> = new Set([
  "gestion-financiere-externalisee",
]);

export function serviceHreflangDisabled(canonical: ServicePageSlug, locale: Locale): Locale[] {
  if (!SERVICES_SANS_GROUPE_HREFLANG.has(canonical)) return [];
  return (["fr", "en", "es"] as const).filter((l) => l !== locale);
}

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
  /** Estimated reading time in minutes (computed from htmlContent for
   *  static articles; not provided for Strapi-only ones). */
  readMinutes?: number;
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
  showInHero?: boolean;
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

export interface CmsNavItem {
  title: string;
  href: string;
  children?: { text: string; href: string }[];
}

export async function getCmsNavigation(locale: Locale): Promise<CmsNavItem[] | undefined> { return undefined; }

export async function getGlobal(locale: Locale): Promise<StrapiGlobal | null> { return null; }

export async function getHomepage(locale: Locale): Promise<StrapiHomepage | null> {
return null;
}

export async function getAboutPage(locale: Locale): Promise<StrapiAboutPage | null> {
return null;
}

export async function getContactPage(locale: Locale): Promise<StrapiContactPage | null> {
return null;
}

export async function getDafExternalisePage(locale: Locale): Promise<StrapiDafPage | null> {
return null;
}

export async function getDafSubPage(
  type: "daf-metier-page" | "daf-temps-partage-page" | "daf-transition-page",
  locale: Locale
): Promise<StrapiDafSubPage | null> {
return null;
}

export async function getDrhExternalisePage(locale: Locale): Promise<StrapiDrhPage | null> {
return null;
}

export type StrapiDrhSubPageType = "drh-temps-partage-page";

export async function getDrhSubPage(
  type: StrapiDrhSubPageType,
  locale: Locale
): Promise<StrapiDrhSubPage | null> {
return null;
}

export async function getServicesPage(locale: Locale): Promise<StrapiServicesPage | null> {
return null;
}

export async function getServiceDetails(locale: Locale): Promise<StrapiServiceDetail[]> {
return [];
}

export async function getServiceBySlug(slug: string, locale: Locale): Promise<StrapiServiceDetail | null> {
return null;
}

export async function getServiceSinglePage(
  slug: ServicePageSlug,
  locale: Locale
): Promise<StrapiServiceSinglePage | null> { return locale === "fr" ? fallbackServicePages[slug] || null : getFallbackServicePage(slug, locale) || null; }

export async function getBlogArticles(locale: Locale): Promise<StrapiBlogArticle[]> { return getStaticBlogListing(locale); }

export async function getBlogArticleBySlug(slug: string, locale: Locale): Promise<StrapiBlogArticle | null> {
return null;
}

export async function getTeamMembers(locale: Locale): Promise<StrapiTeamMember[]> {
return [];
}

export async function getTestimonials(locale: Locale): Promise<StrapiTestimonial[]> {
return [];
}

export async function getTestimonialBySlug(slug: string, locale: Locale): Promise<StrapiTestimonial | null> {
return null;
}

export async function getClientLogos(locale: Locale): Promise<StrapiClientLogo[]> {
return [];
}

export async function getJobOffers(locale: Locale): Promise<StrapiJobOffer[]> {
return [];
}

export async function getJobOfferBySlug(
  slug: string,
  locale: Locale
): Promise<StrapiJobOffer | null> {
return null;
}

export async function getLegalPage(locale: Locale): Promise<StrapiLegalPage | null> {
return null;
}

export async function getPrivacyPage(locale: Locale): Promise<StrapiLegalPage | null> {
return null;
}

export async function getGlossaryTerms(locale: Locale): Promise<StrapiGlossaryTerm[]> {
const { getFallbackGlossaryTerms } = await import("./fallback-glossary");
const strapiLocale = locale === "fr" ? "fr" : locale === "en" ? "en" : "es";
return getFallbackGlossaryTerms(strapiLocale as "fr" | "en" | "es");
}

export function slugifyFromTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getJobMetierSlugForUrl(fiche: StrapiJobMetier): string {
  const s = (fiche as { slug?: unknown }).slug;
  return typeof s === "string" && s ? s : slugifyFromTitle(fiche.title);
}

export async function getJobMetiers(locale: Locale): Promise<StrapiJobMetier[]> {
return [];
}

export async function getJobMetierBySlug(
  slug: string,
  locale: Locale
): Promise<StrapiJobMetier | null> {
return null;
}

export async function getJobMetierByDocumentId(
  documentId: string,
  locale: Locale
): Promise<StrapiJobMetier | null> {
return null;
}

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

export function strapiMediaUrl(media: StrapiMedia | null | undefined): string { if (!media?.url) return ""; return /^(https?:\/\/|\/)/.test(media.url) ? media.url : "/" + media.url; }

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

// Legacy route metadata callers still pass these endpoint identifiers; no request is made.
export const SERVICE_PAGE_API_MAP: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "previsionnel-tresorerie-page",
  "gestion-financiere-externalisee": "gestion-financiere-externalisee-page",
  "accompagnement-levee-de-fond": "accompagnement-levee-de-fond-page",
  "comptabilite-externalisation": "comptabilite-externalisation-page",
  "controle-de-gestion-externalise": "controle-de-gestion-externalise-page",
};
