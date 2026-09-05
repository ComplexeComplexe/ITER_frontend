import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { BlogPostLayout, type TocItem, type AuthorInfo } from "@/components/blog";
import { articleSchema, faqPageSchema } from "@/lib/schemas";
import { resolveAuthorUrl } from "@/lib/content/team";
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
  datePublished?: string;
  heroImage?: string;
  toc: TocItem[];
  tldr?: string | ReactNode;
  /** Article content (children) */
  children: ReactNode;
  relatedArticles?: Array<{
    url: string;
    category: string;
    title: string;
  }>;
  /** For schema */
  metaDescription?: string;
  /** FAQ items — when provided, emits a FAQPage JSON-LD block */
  faqItems?: Array<{ question: string; answer: string }>;
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
  datePublished,
  heroImage,
  toc,
  tldr,
  children,
  relatedArticles,
  metaDescription,
  faqItems,
}: BlogPostPageRefonteProps) {
  // Build article URL for schema
  const articleUrl = slug ? `${breadcrumbs.blogHref}/${slug}` : breadcrumbs.blogHref;

  // SEO-06 (2026-08-31) — dix articles passaient leur auteur sans `url` :
  // articleSchema retombait alors sur son repli et déclarait à Google un
  // author de @type Organization portant un nom de PERSONNE — « Benjamin
  // Ziza » balisé comme personne morale. Pire qu'une absence : une donnée
  // structurée fausse. Quand la fiche du membre existe, l'URL se déduit du
  // nom ; la fournir explicitement reste prioritaire.
  const authorUrl = author.url ?? resolveAuthorUrl(author.name);

  // SEO-13 (2026-07-13) — passe author.url à articleSchema pour émettre
  // un author de type Person (E-E-A-T fort) au lieu du fallback
  // Organization. Tous les articles avaient déjà author.url défini au
  // niveau du composant BlogPostLayout (byline), mais ce n'était pas
  // propagé au JSON-LD Article. Amélioration silencieuse mais critique
  // sur les articles YMYL finance. Cf. reco-seo-iteradvisors.md §2.1
  // "Signature auteur E-E-A-T sur tous les articles".
  const structuredData = articleSchema({
    headline: title,
    description: metaDescription || dek,
    url: articleUrl,
    datePublished: datePublished ?? dateModified,
    dateModified: dateModified,
    authorName: author.name,
    authorUrl,
    imageSrc: heroImage,
  });

  const faqJsonLd = faqItems && faqItems.length > 0 ? faqPageSchema(faqItems) : null;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Schema.org JSON-LD — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      {/* Breadcrumb */}
      <div className="bg-background pt-28 sm:pt-32 pb-4">
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
        author={{ ...author, url: authorUrl }}
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
