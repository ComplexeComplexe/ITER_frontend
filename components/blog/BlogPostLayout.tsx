import React, { ReactNode } from 'react';
import BlogHero from './BlogHero';
import TableOfContents from './TableOfContents';
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
  category: string;
  title: string;
  dek: string;
  author: AuthorInfo;
  readingTime: number;
  dateModified: string;
  heroImage?: string;
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
  category,
  title,
  dek,
  author,
  readingTime,
  dateModified,
  heroImage,
  toc,
  tldr,
  children,
  relatedArticles = [],
}: BlogPostLayoutProps) {
  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <BlogHero
        image={heroImage}
        category={category}
        title={title}
        dek={dek}
        author={author}
        readingTime={readingTime}
        dateModified={dateModified}
      />

      {/* Main Content Container */}
      <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
        {/* Table of Contents */}
        {toc && toc.length > 0 && <TableOfContents items={toc} />}

        {/* TL;DR / À retenir section */}
        {tldr && <Tldr>{tldr}</Tldr>}

        {/* Article body.
            REDESIGN-03 (2026-09-01) — la classe était `prose-blog`, définie
            dans BlogPostLayout.module.css sous le nom `.prose_blog` et jamais
            importée : 26 articles JSX se rendaient sans hiérarchie de titres,
            sans puces, sans bordures de tableau. `.prose-iter-blog` est la
            typographie éditoriale du site (globals.css), déjà utilisée par
            BlogPostPage et GuideFiscalPage. */}
        <div className="prose-iter-blog mx-auto max-w-[72ch] py-8">
          {children}
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles && relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </article>
  );
}
