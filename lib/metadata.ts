import { Metadata } from "next";
import { Locale } from "./i18n";
import { getLocalizedPath } from "./path-localization";


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
 *
 * `disableHreflang` (optional, T1 / 2026-06-07) drops specific locale
 * hreflang entries so they aren't emitted in <head>. Use on FR-only
 * content (e.g. the /ressources/fiscalite-* cocoon) where the EN/ES
 * routes don't exist — Google was otherwise crawling the synthetic
 * hreflang URLs and reporting them as 404s.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  noindex,
  structuredData,
  localizedPaths,
  disableHreflang,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | null;
  localizedPaths?: { fr: string; en: string; es: string };
  disableHreflang?: Locale[];
}): Metadata {
  const base = "https://www.iteradvisors.com";

  // Strip leading locale prefix from path to prevent double-locale in canonical/URL
  // e.g. path="/en/ressources/blog/slug" with locale="en" would produce /en/en/...
  const safePath = (locale !== "fr" && path.startsWith(`/${locale}`)) ? path.replace(`/${locale}`, '') || '/' : path;

  const url = locale === "fr" ? `${base}${safePath}` : `${base}/${locale}${safePath === "/" ? "" : safePath}`;

  // Strip a locale prefix without amputating a path that merely starts with the
  // same letters (`/energie…` is not an EN path).
  const stripLocale = (p: string, loc: string) =>
    p === `/${loc}` ? "/" : p.startsWith(`/${loc}/`) ? p.slice(loc.length + 1) : p;

  /**
   * SEO-AUD-0824 §2 — sans `localizedPaths`, les trois alternates reprenaient le
   * chemin de la locale courante. `/ressources/outils` déclarait donc
   * `/es/ressources/outils`, quand la vraie page est
   * `/es/recursos/herramientas` : le hreflang partait en 308. Le crawl du
   * 24 août a relevé 59 balises de ce type sur 34 pages.
   *
   * `getLocalizedPath` connaît la traduction de chaque segment — c'est la même
   * fonction qui alimente le sélecteur de langue, et elle est couverte par
   * lib/__tests__/path-localization.test.ts. On la réutilise plutôt que de
   * redemander à chaque page de se souvenir de ses propres traductions.
   *
   * `localizedPaths` reste prioritaire : certaines pages ont un slug qui ne se
   * déduit pas (articles traduits sous un autre nom). Mais ce n'est plus le cas
   * par défaut, donc plus une source de valeurs périmées.
   */
  const currentFull = locale === "fr" ? safePath : `/${locale}${safePath === "/" ? "" : safePath}`;
  const derive = (target: Locale) => stripLocale(getLocalizedPath(currentFull, target), target);

  const frPath = localizedPaths?.fr ?? derive("fr");
  const enPath = stripLocale(localizedPaths?.en ?? derive("en"), "en");
  const esPath = stripLocale(localizedPaths?.es ?? derive("es"), "es");

  // SEO-P0-01: RFC 5646 language-region codes as keys so Next.js renders
  // <link rel="alternate" hreflang="fr-FR" href="..." /> in <head>.
  // INDEX-01 (mai 2026): this is now the SINGLE source of hreflang
  // emission — the previous client-side `HrefLangInjector` component
  // has been removed to stop Google from seeing two contradictory sets
  // (it ignored the entire group and treated FR/EN/ES as duplicates).
  const frUrl = `${base}${frPath}`;
  const enUrl = `${base}/en${enPath === "/" ? "" : enPath}`;
  const esUrl = `${base}/es${esPath === "/" ? "" : esPath}`;
  // T1 (2026-06-07): when `disableHreflang` includes a locale, we drop
  // the corresponding entry entirely. Next.js accepts undefined values
  // via `delete`; a missing key is the canonical way to tell the
  // metadata renderer "do not emit this <link rel='alternate'>".
  const languages: Record<string, string> = {
    "x-default": frUrl,
    "fr-FR": frUrl,
    "en-GB": enUrl,
    "es-ES": esUrl,
  };
  if (disableHreflang?.includes("en")) delete languages["en-GB"];
  if (disableHreflang?.includes("es")) delete languages["es-ES"];
  // SEO-AUD-0824 §2 — le français pouvait lui aussi manquer : un article publié
  // seulement en espagnol déclarait un alternate FR qui redirige vers la liste
  // des articles. On retire alors fr-FR, et x-default désigne la page courante
  // plutôt qu'une traduction française inexistante.
  if (disableHreflang?.includes("fr")) {
    delete languages["fr-FR"];
    languages["x-default"] = url;
  }

  const meta: Metadata = {
    title,
    description,
    // SEO-AUD-0824 §3 (2026-08-24) — `noindex, nofollow` coupait aussi le
    // suivi des liens. Le hub carrières, volontairement hors index, était le
    // seul chemin vers les trois offres d'emploi — lesquelles figurent au
    // sitemap, donc destinées à être indexées. Un crawler s'arrêtait là.
    // `noindex, follow` est la déclaration juste : ne référence pas cette
    // page, mais suis ce qu'elle désigne.
    robots: noindex
      ? "noindex, follow"
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
          url: `${base}/images/og-logo.png`,
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
      images: [`${base}/images/og-logo.png`],
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
  disableHreflang,
}: {
  endpoint: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  localizedPaths?: { fr: string; en: string; es: string };
  disableHreflang?: Locale[];
}): Promise<Metadata> {
  // Local titles and descriptions are the sole published SEO source.

  return buildMetadata({
    locale,
    title: fallbackTitle,
    description: fallbackDescription,
    path,
    localizedPaths,
    disableHreflang,
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
  disableHreflang,
}: {
  endpoint: string;
  slug: string;
  locale: Locale;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  localizedPaths?: { fr: string; en: string; es: string };
  disableHreflang?: Locale[];
}): Promise<Metadata> {
  // Local titles and descriptions are the sole published SEO source.

  return buildMetadata({
    locale,
    title: fallbackTitle,
    description: fallbackDescription,
    path,
    localizedPaths,
    disableHreflang,
  });
}
