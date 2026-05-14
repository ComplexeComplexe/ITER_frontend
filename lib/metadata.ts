import { Metadata } from "next";
import { Locale } from "./i18n";
import { strapiFetch, type StrapiSeo, type StrapiSingleResponse, strapiMediaUrl } from "./strapi";

const localeMap: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
};

/**
 * Build static metadata from provided strings.
 *
 * `localizedPaths` (optional) allows specifying different paths per locale
 * for correct hreflang generation. When omitted, the same `path` is used
 * for all locales (backward-compatible behavior).
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  noindex,
  structuredData,
  localizedPaths,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | null;
  localizedPaths?: { fr: string; en: string; es: string };
}): Metadata {
  const base = "https://www.iteradvisors.com";

  // Strip leading locale prefix from path to prevent double-locale in canonical/URL
  // e.g. path="/en/ressources/blog/slug" with locale="en" would produce /en/en/...
  const safePath = (locale !== "fr" && path.startsWith(`/${locale}`)) ? path.replace(`/${locale}`, '') || '/' : path;

  const url = locale === "fr" ? `${base}${safePath}` : `${base}/${locale}${safePath === "/" ? "" : safePath}`;

  // Use localizedPaths if provided, otherwise fall back to safePath for all locales
  // Also strip locale prefix from localizedPaths values to prevent double-locale
  const stripLocale = (p: string, loc: string) => p.startsWith(`/${loc}`) ? (p.replace(`/${loc}`, '') || '/') : p;
  const frPath = localizedPaths?.fr ?? safePath;
  const enPath = stripLocale(localizedPaths?.en ?? safePath, 'en');
  const esPath = stripLocale(localizedPaths?.es ?? safePath, 'es');

  // SEO-P0-01: RFC 5646 language-region codes as keys so Next.js renders
  // <link rel="alternate" hreflang="fr-FR" href="..." /> in <head>.
  // SSR fallback also lives in components/HrefLangInjector.tsx.
  const frUrl = `${base}${frPath}`;
  const enUrl = `${base}/en${enPath === "/" ? "" : enPath}`;
  const esUrl = `${base}/es${esPath === "/" ? "" : esPath}`;
  const languages: Record<string, string> = {
    "x-default": frUrl,
    "fr-FR": frUrl,
    "en-GB": enUrl,
    "es-ES": esUrl,
  };

  const meta: Metadata = {
    title,
    description,
    robots: noindex
      ? "noindex, nofollow"
      : "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Iter Advisors",
      locale: localeMap[locale],
      type: "website",
      images: [
        {
          url: `${base}/images/og-default.webp`,
          width: 1200,
          height: 630,
          alt: "Iter Advisors - DAF & DRH externalis\u00e9s",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/images/og-default.webp`],
    },
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "32x32" },
        { url: "/favicon.png", sizes: "192x192" },
      ],
      apple: "/favicon.png",
    },
  };

  // Inject structured data (JSON-LD) if provided
  if (structuredData) {
    meta.other = {
      "script:ld+json": JSON.stringify(structuredData),
    };
  }

  return meta;
}

/**
 * Fetch SEO metadata from Strapi for a single-type page.
 * Falls back to the provided static values if Strapi fails or has no data.
 */
export async function buildStrapiMetadata({
  endpoint,
  locale,
  path,
  fallbackTitle,
  fallbackDescription,
  localizedPaths,
}: {
  endpoint: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  localizedPaths?: { fr: string; en: string; es: string };
}): Promise<Metadata> {
  try {
    const res = await strapiFetch<StrapiSingleResponse<{ seo: StrapiSeo | null }>>(
      endpoint,
      { "populate[seo][populate]": "ogImage" },
      { locale }
    );

    const seo = res.data?.seo;
    if (seo) {
      const ogImage = seo.ogImage ? strapiMediaUrl(seo.ogImage) : undefined;
      const meta = buildMetadata({
        locale,
        title: seo.metaTitle || fallbackTitle,
        description: seo.metaDescription || fallbackDescription,
        path,
        noindex: seo.noIndex || false,
        structuredData: seo.structuredData || null,
        localizedPaths,
      });

      // Add OG image if available
      if (ogImage && meta.openGraph && typeof meta.openGraph === "object") {
        (meta.openGraph as Record<string, unknown>).images = [{ url: ogImage }];
      }

      return meta;
    }
  } catch (e) {
    console.warn(`Failed to fetch Strapi SEO for ${endpoint}:`, e);
  }

  return buildMetadata({
    locale,
    title: fallbackTitle,
    description: fallbackDescription,
    path,
    localizedPaths,
  });
}

/**
 * Fetch SEO metadata from Strapi for a collection-type item (by slug).
 */
export async function buildStrapiCollectionMetadata({
  endpoint,
  slug,
  locale,
  path,
  fallbackTitle,
  fallbackDescription,
  localizedPaths,
}: {
  endpoint: string;
  slug: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  localizedPaths?: { fr: string; en: string; es: string };
}): Promise<Metadata> {
  try {
    // Use the same flat populate[n] syntax as getBlogArticleBySlug (the
    // populate[seo][populate]=ogImage form returned empty in Strapi v5 cloud,
    // which is why blog post <title>s were rendering "slug | Iter Advisors"
    // — TICKET SEO-01). We also pull title and excerpt as natural fallbacks.
    const res = await strapiFetch<{
      data: {
        title?: string;
        excerpt?: string;
        seo?: StrapiSeo | null;
      }[];
    }>(
      endpoint,
      {
        "filters[slug][$eq]": slug,
        "populate[0]": "seo",
      },
      { locale }
    );

    const item = res.data?.[0];
    const seo = item?.seo;

    // Smart fallbacks (SEO-01 / SEO-02):
    // - Title: prefer seo.metaTitle, else article.title with brand suffix,
    //   else the static fallback the caller passed.
    // - Description: prefer seo.metaDescription, else article.excerpt truncated
    //   to ≤ 160 chars at a word boundary, else the static fallback.
    const articleTitle = item?.title;
    const articleExcerpt = item?.excerpt;

    const truncate160 = (s: string): string => {
      const trimmed = s.trim();
      if (trimmed.length <= 160) return trimmed;
      const cut = trimmed.slice(0, 160);
      const lastSpace = cut.lastIndexOf(" ");
      return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]+$/, "") + "…";
    };

    const resolvedTitle =
      seo?.metaTitle ||
      (articleTitle ? `${articleTitle} | Iter Advisors` : fallbackTitle);
    const resolvedDescription =
      seo?.metaDescription ||
      (articleExcerpt ? truncate160(articleExcerpt) : fallbackDescription);

    const ogImage = seo?.ogImage ? strapiMediaUrl(seo.ogImage) : undefined;

    const meta = buildMetadata({
      locale,
      title: resolvedTitle,
      description: resolvedDescription,
      path,
      noindex: seo?.noIndex || false,
      structuredData: seo?.structuredData || null,
      localizedPaths,
    });

    if (ogImage && meta.openGraph && typeof meta.openGraph === "object") {
      (meta.openGraph as Record<string, unknown>).images = [{ url: ogImage }];
    }

    return meta;
  } catch (e) {
    console.warn(`Failed to fetch Strapi SEO for ${endpoint}/${slug}:`, e);
  }

  return buildMetadata({
    locale,
    title: fallbackTitle,
    description: fallbackDescription,
    path,
    localizedPaths,
  });
}
