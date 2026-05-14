/**
 * Helper that assembles the blog listing from the static
 * `lib/content/blog-posts.ts` source (instead of Strapi). It returns
 * pseudo-`StrapiBlogArticle` objects so `BlogListingPage` can keep its
 * existing rendering path.
 *
 * Resolves the cover image by best-effort filename matching against
 * `public/images/blog/` — if no specific image exists for a slug we
 * fall back to a generic placeholder.
 */

import { blogPosts } from "@/lib/content/blog-posts";
import type { Locale } from "@/lib/i18n";
import type { StrapiBlogArticle, StrapiMedia } from "@/lib/strapi";

/**
 * Static map slug → cover image. Only entries that genuinely exist in
 * `public/images/blog/` are listed here; everything else uses the
 * generic placeholder.
 */
const COVER_BY_SLUG: Record<string, string> = {
  "10-outils-cfos-startup": "/images/blog/10-outils-cfos-startup.webp",
  "les-10-outils-pour-cfos-startup": "/images/blog/les-10-outils-pour-cfos-startup.webp",
  "les-10-outils-pour-les-cfos-en-start-up": "/images/blog/10-outils-cfos-startup.webp",
  "checklist-due-diligence-levee-de-fonds":
    "/images/blog/checklist-due-diligence-levee-de-fonds.webp",
  "cout-daf-externalise-tarifs-prix-2026":
    "/images/blog/cout-daf-externalise-tarifs-prix-2026.webp",
  "daf-drh-externalises-synergie": "/images/blog/daf-drh-externalises-synergie.webp",
  "daf-externalise-vs-daf-salarie": "/images/blog/daf-externalise-vs-daf-salarie.webp",
  "daf-externalise-guide": "/images/blog/daf-externalise.webp",
  "essentiels-outils-tech-finance": "/images/blog/essentiels-outils-tech-finance.webp",
  "flux-de-tresorerie": "/images/blog/flux-de-tresorerie.webp",
  "ia-et-automatisation-des-taches-repetitives":
    "/images/blog/ia-et-automatisation-des-taches-repetitives.webp",
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance":
    "/images/blog/ia-automatisation-finance.webp",
  "la-modernisation-du-role-de-cfo": "/images/blog/la-modernisation-du-role-de-cfo.webp",
  "levee-de-fonds-guide": "/images/blog/levee-de-fonds.webp",
  "organiser-sa-direction-financiere": "/images/blog/organiser-sa-direction-financiere.webp",
  "regimes-fiscaux-france-vs-espagne": "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
};

const DEFAULT_COVER = "/images/blog/placeholder.webp";

function coverFor(slug: string): string {
  return COVER_BY_SLUG[slug] ?? DEFAULT_COVER;
}

function buildMedia(slug: string): StrapiMedia {
  return {
    id: 0,
    url: coverFor(slug),
    alternativeText: "",
  } as unknown as StrapiMedia;
}

/**
 * Returns every static article available for `locale`, sorted newest
 * first. Shape matches `StrapiBlogArticle[]` so callers can feed it to
 * `BlogListingPage` as the `articles` prop with no other changes.
 */
export function getStaticBlogListing(locale: Locale): StrapiBlogArticle[] {
  const entries = Object.entries(blogPosts[locale] ?? {});
  const articles: StrapiBlogArticle[] = entries.map(([slug, post]) => {
    const description = post.meta?.description ?? "";
    const publishedDate = post.publishedDate ?? "";
    return {
      id: 0,
      documentId: slug,
      slug,
      title: post.h1 ?? slug,
      // BlogListingPage doesn't use these, but the type requires them.
      content: [],
      excerpt: description,
      featuredImage: buildMedia(slug),
      publishedDate,
      tableOfContents: false,
      category: post.category ?? "",
    } as StrapiBlogArticle;
  });

  // Newest first when a publishedDate is present; otherwise stable order.
  articles.sort((a, b) => {
    if (!a.publishedDate && !b.publishedDate) return 0;
    if (!a.publishedDate) return 1;
    if (!b.publishedDate) return -1;
    return b.publishedDate.localeCompare(a.publishedDate);
  });

  return articles;
}
