'use client';

import Link from 'next/link';

interface RelatedArticle {
  url: string;
  category: string;
  title: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

/**
 * RelatedArticles — "À lire ensuite" section with 2-3 semantically-linked articles
 * Important: these should be TARGETED based on content cluster, not generic "latest 3"
 */
export default function RelatedArticles({
  articles,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-8 text-2xl font-semibold text-slate-900">
          À lire ensuite
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 inline-block">
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {article.category}
                </span>
              </div>

              <h3 className="mb-4 flex-grow text-lg font-medium text-slate-900 group-hover:text-blue-600">
                <Link href={article.url}>
                  {article.title}
                </Link>
              </h3>

              <Link
                href={article.url}
                className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-800"
              >
                Lire l'article
                <span className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
