'use client';

import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { BlogPostLayout, type BlogPostLayoutProps, type TocItem, type AuthorInfo } from "@/components/blog";
import { articleSchema } from "@/lib/schemas";
import type { CmsNavItem } from "@/lib/strapi";
import { ReactNode } from "react";

interface BlogPostPageRefonteProps {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
  breadcrumbs: {
    resourcesLabel: string;
    resourcesHref: string;
    blogLabel: string;
    blogHref: string;
  };
  slug?: string;
  /** Article props for BlogPostLayout */
  category: string;
  title: string;
  dek: string;
  author: AuthorInfo;
  readingTime: number;
  dateModified: string;
  heroImage?: string;
  toc: TocItem[];
  tldr: string | ReactNode;
  /** Article content (children) */
  children: ReactNode;
  relatedArticles?: Array<{
    url: string;
    category: string;
    title: string;
  }>;
  /** For schema */
  metaDescription?: string;
}

/**
 * BlogPostPageRefonte — New blog template using the refactored BlogPostLayout
 * Replaces the old BlogPostPage for Phase 2+ articles
 */
export default function BlogPostPageRefonte({
  locale,
  cmsNavigation,
  breadcrumbs,
  slug,
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
  relatedArticles,
  metaDescription,
}: BlogPostPageRefonteProps) {
  // Build article URL for schema
  const articleUrl = slug ? `${breadcrumbs.blogHref}/${slug}` : breadcrumbs.blogHref;

  // Generate Article schema
  const structuredData = articleSchema({
    headline: title,
    description: metaDescription || dek,
    url: articleUrl,
    datePublished: dateModified,
    dateModified: dateModified,
    authorName: author.name,
    imageSrc: heroImage,
  });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Schema.org JSON-LD — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <div className="bg-background pt-8 pb-4">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              {
                label: breadcrumbs.resourcesLabel,
                href: breadcrumbs.resourcesHref,
              },
              { label: breadcrumbs.blogLabel, href: breadcrumbs.blogHref },
              { label: title },
            ]}
          />
        </div>
      </div>

      {/* Blog article using new layout */}
      <BlogPostLayout
        category={category}
        title={title}
        dek={dek}
        author={author}
        readingTime={readingTime}
        dateModified={dateModified}
        heroImage={heroImage}
        toc={toc}
        tldr={tldr}
        relatedArticles={relatedArticles}
      >
        {children}
      </BlogPostLayout>
    </PageLayout>
  );
}
