import { Metadata } from "next";
import { Locale } from "./i18n";
import { strapiFetch, type StrapiSeo, type StrapiSingleResponse, strapiMediaUrl } from "./strapi";

const localeMap: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
};

/**
 * Build static metadata from provided strings (backward-compatible).
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  noindex,
  structuredData,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | null;
}): Metadata {
  const base = "https://www.iteradvisors.com";
  const url = locale === "fr" ? `${base}${path}` : `${base}/${locale}${path === "/" ? "" : path}`;

  const alternates: Record<string, string> = {
    "x-default": `${base}${path}`,
    fr: `${base}${path}`,
    en: `${base}/en${path === "/" ? "" : path}`,
    es: `${base}/es${path === "/" ? "" : path}`,
  };

  const meta: Metadata = {
    title,
    description,
    robots: noindex
      ? "noindex, nofollow"
      : "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
    alternates: {
      canonical: url,
      languages: alternates,
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
}: {
  endpoint: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
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
}: {
  endpoint: string;
  slug: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Promise<Metadata> {
  try {
    const res = await strapiFetch<{ data: { seo?: StrapiSeo | null }[] }>(
      endpoint,
      {
        "filters[slug][$eq]": slug,
        "populate[seo][populate]": "ogImage",
      },
      { locale }
    );

    const seo = res.data?.[0]?.seo;
    if (seo) {
      const ogImage = seo.ogImage ? strapiMediaUrl(seo.ogImage) : undefined;
      const meta = buildMetadata({
        locale,
        title: seo.metaTitle || fallbackTitle,
        description: seo.metaDescription || fallbackDescription,
        path,
        noindex: seo.noIndex || false,
        structuredData: seo.structuredData || null,
      });

      if (ogImage && meta.openGraph && typeof meta.openGraph === "object") {
        (meta.openGraph as Record<string, unknown>).images = [{ url: ogImage }];
      }

      return meta;
    }
  } catch (e) {
    console.warn(`Failed to fetch Strapi SEO for ${endpoint}/${slug}:`, e);
  }

  return buildMetadata({
    locale,
    title: fallbackTitle,
    description: fallbackDescription,
    path,
  });
}
