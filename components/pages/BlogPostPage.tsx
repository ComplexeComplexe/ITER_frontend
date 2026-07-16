import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import MidArticleSoftCTA from "@/components/blog/MidArticleSoftCTA";
import ArticleMeta from "@/components/blog/ArticleMeta";
import ArticleTOC from "@/components/blog/ArticleTOC";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import type { StrapiBlock, CmsNavItem, StrapiTeamMember } from "@/lib/strapi";
import { articleSchema, faqPageSchema } from "@/lib/schemas";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import { splitHtmlAroundMid } from "@/lib/blog-cta-split";
import { transformArticleHtml } from "@/lib/blog-html-transform";
import { getRelatedArticles } from "@/lib/related-articles";
import { extractToc } from "@/lib/blog-toc";

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
  /** Article slug — used to build the canonical URL for Article schema (CC-17) */
  slug?: string;
  /** Featured image URL — used for Article schema (CC-17) */
  featuredImageUrl?: string;
  /** Team members — used to display author photo and bio (DEV-02) */
  teamMembers?: StrapiTeamMember[];
  /** Body illustration rendered between the H1 block and the article
   *  body (separate from the listing cover). Wired from
   *  `lib/blog-illustrations.ts`. */
  bodyImage?: { src: string; alt: string };
}

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
  slug,
  featuredImageUrl,
  teamMembers,
  bodyImage,
}: BlogPostPageProps) {
  /* ── Compute reading time + word count from htmlContent (drives both
   *    ArticleMeta and the Article JSON-LD's wordCount property). */
  const readMinutes = estimateReadMinutes(htmlContent);
  const wordCount = htmlContent
    ? htmlContent
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/&[a-z]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim()
        .split(/\s+/).length
    : 0;

  /* ── Resolve author URL (links the BlogPosting JSON-LD `author` to
   *    the canonical author page when we know the team-member slug).
   *    Falls back to a generic Organization author otherwise. */
  const authorMember = author && teamMembers
    ? teamMembers.find(
        (m) =>
          `${m.firstName} ${m.lastName}`.toLowerCase() === author.toLowerCase() ||
          m.slug.replace(/-/g, " ") === author.toLowerCase().replace(/-/g, " "),
      )
    : undefined;
  const authorRole = authorMember
    ? (authorMember.role && typeof authorMember.role === "string"
        ? authorMember.role
        : (authorMember as unknown as { roles?: Record<string, string> })
            ?.roles?.[locale] ??
          (authorMember as unknown as { roles?: Record<string, string> })
            ?.roles?.fr ??
          "")
    : "";
  const authorUrl = authorMember
    ? locale === "es"
      ? `/es/quienes-somos/${authorMember.slug}`
      : `/${locale === "fr" ? "" : locale + "/"}a-propos/${authorMember.slug}`
    : undefined;

  /* ── Schema.org Article structured data ────────────────────────── */
  const articleUrl = slug ? `${breadcrumbs.blogHref}/${slug}` : breadcrumbs.blogHref;
  const structuredData = articleSchema({
    headline: title,
    description: metaDescription || "",
    url: articleUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    authorName: author || "Iter Advisors",
    authorUrl,
    imageSrc: featuredImageUrl,
    wordCount: wordCount > 0 ? wordCount : undefined,
    articleSection: category,
  });

  /* ── Server-side HTML transforms (tables + FAQ accordion) ──────── */
  const transformed = htmlContent
    ? transformArticleHtml(htmlContent)
    : { html: "", faqs: [] };
  const faqJsonLd =
    transformed.faqs.length > 0
      ? faqPageSchema(
          transformed.faqs.map((f) => ({ question: f.question, answer: f.answer })),
        )
      : null;

  /* ── Mid-article soft CTA injection (uses the TRANSFORMED html so
   *    table wrappers / FAQ accordion already applied when we split). */
  const transformedHtml = transformed.html;
  const splitForCta =
    readMinutes >= 6 && transformedHtml
      ? splitHtmlAroundMid(transformedHtml)
      : null;

  /* ── Related articles for the bottom of the page. */
  const relatedItems = slug
    ? getRelatedArticles(locale, slug, category, 3)
    : [];

  /* ── TOC headings (server-extracted from the original htmlContent so
   *    the TOC ships in the SSR markup). */
  const tocHeadings = extractToc(htmlContent);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Schema.org JSON-LD — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Schema.org JSON-LD — FAQPage (only when an FAQ section was
          detected in the body and converted to an accordion). */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <section className="bg-background pt-32 pb-12 lg:pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: breadcrumbs.resourcesLabel, href: breadcrumbs.resourcesHref },
              { label: breadcrumbs.blogLabel, href: breadcrumbs.blogHref },
              { label: title },
            ]}
          />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl mt-4 mb-4">
            {title}
          </h1>

          {/* Article meta — read time + last update + share buttons.
              SEO contract: values mirror the Article JSON-LD. */}
          <ArticleMeta
            locale={locale}
            date={publishedDate}
            readMinutes={readMinutes > 0 ? readMinutes : undefined}
            shareUrl={articleUrl}
            shareTitle={title}
          />

          {(author || category) && (
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {category && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet bg-iter-violet/10 px-2 py-0.5 rounded-full">
                      {category}
                    </span>
                  </span>
                )}
              </div>

              {/* Author bio with photo */}
              {authorMember && authorMember.photo?.url && (
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={authorMember.photo.url}
                      alt={`${authorMember.firstName} ${authorMember.lastName}`}
                      fill
                      className="rounded-full object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={authorUrl}
                        className="font-semibold text-foreground hover:text-iter-violet transition-colors"
                        rel="author"
                      >
                        {authorMember.firstName} {authorMember.lastName}
                      </a>
                      {authorMember.linkedIn && (
                        <a
                          href={authorMember.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-iter-violet transition-colors"
                          aria-label="LinkedIn profile"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    {authorRole && (
                      <p className="text-xs text-muted-foreground font-medium">{authorRole}</p>
                    )}
                  </div>
                </div>
              )}
              {author && !authorMember && (
                <span className="flex items-center gap-1.5 text-sm">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <a
                    href={`/${locale === "fr" ? "" : locale + "/"}a-propos`}
                    className="hover:text-iter-violet transition-colors"
                    rel="author"
                  >
                    {author}
                  </a>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Body illustration */}
      {bodyImage && (
        <section className="bg-background pt-2 pb-8">
          <div className="container max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
              <Image
                src={bodyImage.src}
                alt={bodyImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Article body — two-column on xl screens (sticky TOC right).
          One <ArticleTOC> instance: its internal markup renders both
          a mobile accordion (`xl:hidden`) and a desktop sticky aside
          (`hidden xl:block`). Flex order swaps the TOC above the body
          on mobile and into the right column on xl. */}
      <article className="bg-background py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-col xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12 max-w-6xl mx-auto">
            {htmlContent && tocHeadings.length > 0 && (
              <div className="order-1 xl:order-none xl:col-start-2 xl:row-start-1">
                <ArticleTOC locale={locale} headings={tocHeadings} />
              </div>
            )}

            <div
              data-article-body
              className="prose-iter-blog max-w-[72ch] mx-auto xl:mx-0 order-2 xl:order-none xl:col-start-1 xl:row-start-1"
            >
              {blocks && blocks.length > 0 ? (
                <StrapiBlocks
                  blocks={blocks}
                  className="text-muted-foreground"
                  prose
                  contactHref={getContactPath(locale)}
                />
              ) : htmlContent ? (
                splitForCta && splitForCta[1] ? (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: splitForCta[0] }} />
                    <MidArticleSoftCTA locale={locale} />
                    <div dangerouslySetInnerHTML={{ __html: splitForCta[1] }} />
                  </>
                ) : (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: transformedHtml }} />
                    {readMinutes >= 6 && <MidArticleSoftCTA locale={locale} />}
                  </>
                )
              ) : (
                content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </article>

      <CTASection locale={locale} />

      <BlogRelatedArticles locale={locale} items={relatedItems} />
    </PageLayout>
  );
}
