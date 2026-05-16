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
import { getLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

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

const DEFAULT_COVER = "/images/blog/placeholder.webp";

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

  const picked = [...sameCat, ...others].slice(0, limit);

  return picked.map(({ slug, post }) => {
    const title = post.h1 ?? slug;
    const { src, alt } = coverFor(slug, title);
    return {
      slug,
      href: getLocalePath(locale, `/ressources/blog/${slug}`),
      title,
      image: src,
      alt,
      category: post.category ?? null,
      readMinutes: estimateReadMinutes(post.htmlContent),
      publishedDate: post.publishedDate ?? "",
    };
  });
}
