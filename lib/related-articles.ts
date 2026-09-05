/**
 * Pick 3 related articles for a given slug.
 *
 *  Strategy:
 *    1. Same-category articles in the same locale, newest first.
 *    2. If fewer than 3, top-up with the newest articles regardless
 *       of category.
 *    3. Always exclude the article itself.
 *    4. Articles only need to exist in `blog-posts.ts` for the
 *       requested locale; we don't render dead URLs.
 *
 * Output is ready to feed into a `<RelatedArticles>` card grid.
 */
import { blogPosts } from "@/lib/content/blog-posts";
import { BLOG_COVERS } from "@/lib/blog-covers";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import type { Locale } from "@/lib/i18n";
import { resolveBlogArticleHref } from "@/lib/path-localization";

export interface RelatedArticleCard {
  slug: string;
  href: string;
  title: string;
  image: string;
  alt: string;
  category: string | null;
  readMinutes: number;
  publishedDate: string;
}

// Ahrefs T-404 (2026-06-08): same fix as lib/blog-listing.ts — the
// placeholder.webp file doesn't exist in /public. Falling back to og-default.
const DEFAULT_COVER = "/images/og-logo.png";

function coverFor(slug: string, fallbackTitle: string): { src: string; alt: string } {
  const c = BLOG_COVERS[slug];
  return {
    src: c?.cover ?? DEFAULT_COVER,
    alt: c?.alt ?? fallbackTitle,
  };
}

export function getRelatedArticles(
  locale: Locale,
  currentSlug: string,
  currentCategory: string | undefined,
  limit = 3,
): RelatedArticleCard[] {
  const entries = Object.entries(blogPosts[locale] ?? {});
  if (entries.length === 0) return [];

  const byNewest = entries
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, post]) => ({ slug, post }))
    .sort((a, b) => {
      const da = a.post.publishedDate ?? "";
      const db = b.post.publishedDate ?? "";
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db.localeCompare(da);
    });

  // 1. Same category first.
  const sameCat: typeof byNewest = [];
  const others: typeof byNewest = [];
  for (const e of byNewest) {
    if (currentCategory && e.post.category === currentCategory) {
      sameCat.push(e);
    } else {
      others.push(e);
    }
  }

  // SEO-ULT §4b (2026-08-15) — deux défauts se cumulaient ici. `getLocalePath`
  // ne fait que préfixer la locale : en ES il produisait
  // `/es/ressources/blog/...`, qui redirige vers `/es/recursos/blog/...`.
  // Et certains articles n'ont pas d'URL propre dans leur locale — proposés
  // en « articles liés », ils envoyaient le lecteur sur une redirection.
  // Ceux-là sont écartés avant le découpage, pour que le bloc reste plein.
  const picked = [...sameCat, ...others]
    .filter(({ slug }) => resolveBlogArticleHref(locale, slug) !== null)
    .slice(0, limit);

  return picked.map(({ slug, post }) => {
    const title = post.h1 ?? slug;
    const { src, alt } = coverFor(slug, title);
    return {
      slug,
      href: resolveBlogArticleHref(locale, slug) as string,
      title,
      image: src,
      alt,
      category: post.category ?? null,
      readMinutes: post.readingMinutes ?? estimateReadMinutes(post.htmlContent),
      publishedDate: post.publishedDate ?? "",
    };
  });
}
