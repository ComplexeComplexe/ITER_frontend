import React, { ReactNode } from 'react';
import BlogHero from './BlogHero';
import ArticleBodyLayout from './ArticleBodyLayout';
import type { Locale } from '@/lib/i18n';
import Tldr from './Tldr';
import RelatedArticles from './RelatedArticles';

export interface AuthorInfo {
  name: string;
  avatar?: string;
  jobTitle?: string;
  /** Optional URL of the author's dedicated bio page. When present,
   *  the byline links to it with rel="author" (E-E-A-T signal). */
  url?: string;
}

export interface TocItem {
  id: string;
  label: string;
}

export interface BlogPostLayoutProps {
  locale: Locale;
  articleUrl: string;
  category: string;
  title: string;
  dek: string;
  author: AuthorInfo;
  readingTime: number;
  dateModified: string;
  bodyImage?: { src: string; alt: string };
  toc: TocItem[];
  tldr: string | ReactNode;
  children: ReactNode;
  relatedArticles?: Array<{
    url: string;
    category: string;
    title: string;
  }>;
}

/**
 * BlogPostLayout — Main container for blog articles with refactored UX
 * Implements: proper typography, table of contents, TL;DR, structured sections,
 * inline CTAs, and related articles recommendation.
 */
export default function BlogPostLayout({
  locale,
  articleUrl,
  category,
  title,
  dek,
  author,
  readingTime,
  dateModified,
  bodyImage,
  toc,
  tldr,
  children,
  relatedArticles = [],
}: BlogPostLayoutProps) {
  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <BlogHero
        locale={locale}
        articleUrl={articleUrl}
        image={bodyImage?.src}
        imageAlt={bodyImage?.alt}
        category={category}
        title={title}
        dek={dek}
        author={author}
        readingTime={readingTime}
        dateModified={dateModified}
      />

      <ArticleBodyLayout locale={locale} headings={toc.map(item => ({ ...item, level: 2 as const }))}>
        {tldr && <Tldr>{tldr}</Tldr>}
        {children}
      </ArticleBodyLayout>

      {/* Related Articles Section */}
      {relatedArticles && relatedArticles.length > 0 && (
        <RelatedArticles locale={locale} articles={relatedArticles} />
      )}
    </article>
  );
}
