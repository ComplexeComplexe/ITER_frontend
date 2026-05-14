/**
 * Strapi → JSON exporter — MIGRATION-01 (P0).
 *
 * One-shot tool that dumps every dynamic Strapi entity used by the
 * front-end into `migration/strapi-export.json`. Designed to run once
 * with valid Strapi Cloud credentials, then the JSON is folded into the
 * static `lib/content/*.ts` files (MIGRATION-01 step 3) and the CDN
 * images are downloaded by `scripts/migrate-cdn-images.ts`
 * (MIGRATION-02).
 *
 * USAGE
 *   STRAPI_API_URL=https://… STRAPI_API_TOKEN=… npx tsx scripts/export-strapi.ts
 *
 * OUTPUT
 *   migration/strapi-export.json — one big object keyed by entity. See the
 *   `StrapiExport` shape below.
 *
 * Why not just call lib/strapi.ts? Because lib/strapi.ts mutates Next.js
 * fetch caches and ships fallback wiring we don't want at export time.
 * This script talks to the REST API directly so the export is a faithful
 * snapshot of what's in Strapi, not what the front-end ends up rendering.
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const STRAPI_URL = (process.env.STRAPI_API_URL || "").replace(/\/admin\/?$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error(
    "Missing STRAPI_API_URL or STRAPI_API_TOKEN. Set both in your shell or .env.local before running."
  );
  process.exit(1);
}

const LOCALES = ["fr", "en", "es"] as const;
type Locale = (typeof LOCALES)[number];

// Map front-end locale codes to Strapi Cloud codes (matches lib/strapi.ts).
const LOCALE_TO_STRAPI: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
  es: "es",
};

async function strapiGet<T = unknown>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`/api/${endpoint}`, STRAPI_URL);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Strapi ${res.status} ${res.statusText} — ${url.toString()}`);
  }
  return res.json() as Promise<T>;
}

async function fetchAllPages<T>(
  endpoint: string,
  baseParams: Record<string, string>
): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  // 100 per page is Strapi's max with default config; iterate until empty.
  // Cap at 100 pages to avoid infinite loops if Strapi misreports pagination.
  while (page <= 100) {
    const res = await strapiGet<{ data: T[]; meta?: { pagination?: { pageCount?: number } } }>(
      endpoint,
      { ...baseParams, "pagination[page]": String(page), "pagination[pageSize]": "100" }
    );
    if (!Array.isArray(res.data) || res.data.length === 0) break;
    all.push(...res.data);
    const pageCount = res.meta?.pagination?.pageCount ?? page;
    if (page >= pageCount) break;
    page += 1;
  }
  return all;
}

interface ExportedEntity {
  locale: Locale;
  data: unknown;
}

interface StrapiExport {
  exportedAt: string;
  source: string;
  // Single-types (one entity per locale).
  homepage: ExportedEntity[];
  global: ExportedEntity[];
  aboutPage: ExportedEntity[];
  contactPage: ExportedEntity[];
  dafPage: ExportedEntity[];
  // Collection-types.
  blogArticles: { locale: Locale; articles: unknown[] }[];
  teamMembers: { locale: Locale; members: unknown[] }[];
  testimonials: { locale: Locale; testimonials: unknown[] }[];
  clientLogos: { locale: Locale; logos: unknown[] }[];
  jobOffers: { locale: Locale; offers: unknown[] }[];
  // All media references found anywhere in the export — used by the
  // image-migration script to bulk-download from the CDN.
  mediaUrls: string[];
}

function collectMediaUrls(node: unknown, acc: Set<string>): void {
  if (!node) return;
  if (typeof node === "string") {
    if (/^https?:\/\/.+\.(jpe?g|png|webp|gif|svg|avif)/i.test(node)) acc.add(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectMediaUrls(item, acc);
    return;
  }
  if (typeof node === "object") {
    for (const value of Object.values(node as Record<string, unknown>)) {
      collectMediaUrls(value, acc);
    }
  }
}

async function fetchSingle(
  endpoint: string,
  locale: Locale,
  populate: Record<string, string>
): Promise<ExportedEntity> {
  const res = await strapiGet<{ data: unknown }>(endpoint, {
    locale: LOCALE_TO_STRAPI[locale],
    ...populate,
  });
  return { locale, data: res.data };
}

async function fetchCollection(
  endpoint: string,
  locale: Locale,
  populate: Record<string, string>
): Promise<unknown[]> {
  return fetchAllPages(endpoint, {
    locale: LOCALE_TO_STRAPI[locale],
    ...populate,
  });
}

async function main(): Promise<void> {
  console.log(`Strapi export starting…  source=${STRAPI_URL}`);

  const result: StrapiExport = {
    exportedAt: new Date().toISOString(),
    source: STRAPI_URL,
    homepage: [],
    global: [],
    aboutPage: [],
    contactPage: [],
    dafPage: [],
    blogArticles: [],
    teamMembers: [],
    testimonials: [],
    clientLogos: [],
    jobOffers: [],
    mediaUrls: [],
  };

  // Single-types — one fetch per locale.
  for (const locale of LOCALES) {
    console.log(`  · homepage [${locale}]`);
    try {
      result.homepage.push(
        await fetchSingle("homepage", locale, {
          "populate[heroCta]": "*",
          "populate[valuePropositions][populate]": "icon",
          "populate[statistics]": "*",
          "populate[whyChooseItems]": "*",
          "populate[featuredArticles][populate]": "featuredImage",
        })
      );
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    console.log(`  · global [${locale}]`);
    try {
      result.global.push(
        await fetchSingle("global", locale, {
          "populate[navigation][populate]": "children",
          "populate[footer]": "true",
          "populate[socialLinks]": "true",
          "populate[aggregateRating]": "true",
          "populate[logo]": "true",
          "populate[defaultSeo][populate]": "ogImage",
        })
      );
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    for (const [key, endpoint] of [
      ["aboutPage", "about-page"],
      ["contactPage", "contact-page"],
      ["dafPage", "daf-externalise-page"],
    ] as const) {
      console.log(`  · ${endpoint} [${locale}]`);
      try {
        (result as unknown as Record<string, ExportedEntity[]>)[key].push(
          await fetchSingle(endpoint, locale, { "populate[seo][populate]": "ogImage" })
        );
      } catch (e) {
        console.warn(`    skipped: ${(e as Error).message}`);
      }
    }
  }

  // Collection-types — paginate per locale.
  for (const locale of LOCALES) {
    console.log(`  · blog-articles [${locale}]`);
    try {
      const articles = await fetchCollection("blog-articles", locale, {
        "populate[0]": "featuredImage",
        "populate[1]": "seo",
        "populate[2]": "seo.ogImage",
      });
      result.blogArticles.push({ locale, articles });
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    console.log(`  · team-members [${locale}]`);
    try {
      const members = await fetchCollection("team-members", locale, {
        "populate[0]": "photo",
      });
      result.teamMembers.push({ locale, members });
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    console.log(`  · testimonials [${locale}]`);
    try {
      const testimonials = await fetchCollection("testimonials", locale, {
        "populate[0]": "clientLogo",
        "populate[1]": "seo",
      });
      result.testimonials.push({ locale, testimonials });
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    console.log(`  · client-logos [${locale}]`);
    try {
      const logos = await fetchCollection("client-logos", locale, {
        "populate[0]": "logo",
      });
      result.clientLogos.push({ locale, logos });
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }

    console.log(`  · job-offers [${locale}]`);
    try {
      const offers = await fetchCollection("job-offers", locale, { "populate[0]": "seo" });
      result.jobOffers.push({ locale, offers });
    } catch (e) {
      console.warn(`    skipped: ${(e as Error).message}`);
    }
  }

  // Sweep every payload for media URLs so the next migration step can
  // download them in one pass.
  const mediaSet = new Set<string>();
  collectMediaUrls(result, mediaSet);
  result.mediaUrls = [...mediaSet].sort();

  const outDir = resolve(process.cwd(), "migration");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "strapi-export.json");
  writeFileSync(outPath, JSON.stringify(result, null, 2), "utf8");

  const counts = {
    homepage: result.homepage.length,
    blogArticles: result.blogArticles.reduce((n, b) => n + b.articles.length, 0),
    teamMembers: result.teamMembers.reduce((n, b) => n + b.members.length, 0),
    testimonials: result.testimonials.reduce((n, b) => n + b.testimonials.length, 0),
    mediaUrls: result.mediaUrls.length,
  };
  console.log("Export complete.");
  console.log(`  → ${outPath}`);
  console.log(`  counts: ${JSON.stringify(counts)}`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
