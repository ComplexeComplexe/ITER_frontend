import BlogRelatedArticles from './BlogRelatedArticles';
import { BLOG_COVERS } from '@/lib/blog-covers';
import type { Locale } from '@/lib/i18n';

interface RelatedArticle {
  url: string;
  category: string;
  title: string;
}

interface RelatedArticlesProps {
  locale: Locale;
  articles: RelatedArticle[];
}

/** Keep hand-picked destinations while sharing the site-wide card treatment. */
export default function RelatedArticles({ locale, articles }: RelatedArticlesProps) {
  return <BlogRelatedArticles locale={locale} items={articles.map(article => {
    const slug = article.url.split('/').filter(Boolean).pop() || article.url;
    const cover = BLOG_COVERS[slug];
    return { slug, href: article.url, title: article.title, category: article.category,
      image: cover?.cover || '/images/og-logo.png', alt: cover?.alt || article.title,
      readMinutes: 0, publishedDate: '' };
  })} />;
}
