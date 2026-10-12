import { publishedPaths } from "@/lib/locale-route-map";
import BlogRelatedArticles from './BlogRelatedArticles';
import { BLOG_COVERS } from '@/lib/blog-covers';
import { getThumbnail } from '@/lib/thumbnails';
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
    const slug = (publishedPaths(article.url)?.fr ?? article.url).split('/').filter(Boolean).pop() || article.url;
    const cover = BLOG_COVERS[slug];
    const thumbnail = getThumbnail(article.url);
    return { slug, href: article.url, title: article.title, category: article.category,
      image: thumbnail?.src || cover?.cover || '/images/logos/iter-advisors-brand.png', alt: thumbnail?.alt || cover?.alt || article.title,
      readMinutes: 0, publishedDate: '' };
  })} />;
}
