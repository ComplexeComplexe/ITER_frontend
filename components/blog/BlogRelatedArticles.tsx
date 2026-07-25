import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { RelatedArticleCard } from "@/lib/related-articles";

/**
 * Three-card grid rendered at the bottom of every htmlContent-backed
 * blog article. Picked by `lib/related-articles.ts` (same-category
 * first, newest fallback). Distinct from the legacy `RelatedArticles`
 * used by `BlogPostPageRefonte` which only ships title + URL.
 *
 * SEO contract:
 *   - Hrefs are canonical article URLs (same as the sitemap entries).
 *   - No new URL surface — purely an internal-linking lift.
 */

interface BlogRelatedArticlesProps {
  locale: Locale;
  items: RelatedArticleCard[];
}

const STRINGS: Record<
  Locale,
  { heading: string; minRead: string }
> = {
  fr: {
    heading: "Pour aller plus loin",
    minRead: "min de lecture",
  },
  en: {
    heading: "Read next",
    minRead: "min read",
  },
  es: {
    heading: "Para profundizar",
    minRead: "min de lectura",
  },
};

export default function BlogRelatedArticles({
  locale,
  items,
}: BlogRelatedArticlesProps) {
  if (!items || items.length === 0) return null;
  const t = STRINGS[locale];
  return (
    <section
      aria-labelledby="related-articles-heading"
      className="bg-muted/30 py-16 lg:py-20"
    >
      <div className="container">
        <h2
          id="related-articles-heading"
          className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8"
        >
          {t.heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <Link key={c.slug} href={c.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-muted">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {c.category && (
                <span className="text-[11px] font-semibold uppercase tracking-widest text-iter-violet mb-1.5 block">
                  {c.category}
                </span>
              )}
              <h3 className="text-base lg:text-lg font-semibold font-heading leading-snug group-hover:text-iter-violet transition-colors mb-2">
                {c.title}
              </h3>
              {c.readMinutes > 0 && (
                <p className="text-xs text-foreground/55 font-medium">
                  {c.readMinutes} {t.minRead}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
