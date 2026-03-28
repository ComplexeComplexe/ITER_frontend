import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import type { StrapiBlock, CmsNavItem } from "@/lib/strapi";

interface BlogPostPageProps {
  locale: Locale;
  title: string;
  cmsNavigation?: CmsNavItem[];
  breadcrumbs: {
    resourcesLabel: string;
    resourcesHref: string;
    blogLabel: string;
    blogHref: string;
  };
  /** Legacy: paragraphs as strings (when not using Strapi) */
  content?: string[];
  /** Rich HTML content (for new SEO articles) */
  htmlContent?: string;
  /** Strapi: rich text blocks (takes precedence over content) */
  blocks?: StrapiBlock[];
  /** Publication date (ISO format) */
  publishedDate?: string;
  /** Author name */
  author?: string;
  /** Category */
  category?: string;
  /** Meta description for schema */
  metaDescription?: string;
}

function formatDate(isoDate: string, locale: Locale): string {
  const date = new Date(isoDate);
  const localeMap: Record<Locale, string> = {
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES",
  };
  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const publishedLabel: Record<Locale, string> = {
  fr: "Publié le",
  en: "Published on",
  es: "Publicado el",
};

export default function BlogPostPage({
  locale,
  title,
  breadcrumbs,
  content = [],
  htmlContent,
  blocks,
  cmsNavigation,
  publishedDate,
  author,
  category,
  metaDescription,
}: BlogPostPageProps) {
  /* ── Schema.org Article structured data ── */
  const structuredData = publishedDate
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        author: {
          "@type": author ? "Person" : "Organization",
          name: author || "Iter Advisors",
          url: "https://www.iteradvisors.com/a-propos",
        },
        publisher: {
          "@type": "Organization",
          name: "Iter Advisors",
          logo: {
            "@type": "ImageObject",
            url: "https://www.iteradvisors.com/images/logo.webp",
          },
        },
        datePublished: publishedDate,
        dateModified: publishedDate,
        description: metaDescription || "",
      }
    : null;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Schema.org JSON-LD */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <section className="bg-background pt-32 pb-16">
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
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">
            {title}
          </h1>

          {/* Date, author and category */}
          {(publishedDate || author || category) && (
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              {publishedDate && (
                <time dateTime={publishedDate}>
                  {publishedLabel[locale]} {formatDate(publishedDate, locale)}
                </time>
              )}
              {author && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <a
                    href={`/${locale === "fr" ? "" : locale + "/"}a-propos`}
                    className="hover:text-iter-violet transition-colors"
                  >
                    {author}
                  </a>
                </span>
              )}
              {category && (
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet bg-iter-violet/10 px-2 py-0.5 rounded-full">
                    {category}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <article className="bg-background py-24 lg:py-16">
        <div className="container max-w-3xl">
          {blocks && blocks.length > 0 ? (
            <StrapiBlocks
              blocks={blocks}
              className="text-muted-foreground"
              prose
              contactHref={getContactPath(locale)}
            />
          ) : htmlContent ? (
            <div
              className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                prose-headings:font-heading prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-iter-violet prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold
                prose-td:p-3 prose-td:text-sm prose-td:border-t prose-td:border-border/50
                prose-li:text-muted-foreground
                prose-blockquote:border-l-iter-violet prose-blockquote:bg-muted/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            content.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
