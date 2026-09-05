import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import { aboutHref } from "@/lib/path-localization";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import MidArticleSoftCTA from "@/components/blog/MidArticleSoftCTA";
import BlogHero from "@/components/blog/BlogHero";
import ArticleBodyLayout from "@/components/blog/ArticleBodyLayout";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import type { StrapiBlock, CmsNavItem, StrapiTeamMember } from "@/lib/static-content";
import { articleSchema, faqPageSchema } from "@/lib/schemas";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import { splitHtmlAroundMid } from "@/lib/blog-cta-split";
import { transformArticleHtml } from "@/lib/blog-html-transform";
import { linkGlossaryTerms } from "@/lib/glossary-links";
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
  /** Last substantive update date (ISO format). Drives the visible
   *  "Mis à jour le" label and dateModified in the Article schema.
   *  Falls back to publishedDate when omitted. */
  updatedDate?: string;
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
  updatedDate,
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
  // SEO-ULT §4b (2026-08-15) — l'espagnol était traité à part, mais l'anglais
  // recevait `/en/a-propos/<slug>`, qui redirige vers `/en/about/<slug>`. La
  // signature de chaque article EN portait donc un lien vers une 308.
  const authorUrl = authorMember ? aboutHref(locale, authorMember.slug) : undefined;

  /* ── Schema.org Article structured data ────────────────────────── */
  const articleUrl = slug ? `${breadcrumbs.blogHref}/${slug}` : breadcrumbs.blogHref;
  const structuredData = articleSchema({
    headline: title,
    description: metaDescription || "",
    url: articleUrl,
    datePublished: publishedDate,
    dateModified: updatedDate || publishedDate,
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
  // REDESIGN-P3 (2026-09-01) — première occurrence de chaque terme du
  // glossaire liée à sa fiche (hors titres, liens, code) : neuf fiches
  // n'avaient qu'un lien entrant alors que seize articles les citent.
  const transformedHtml = linkGlossaryTerms(transformed.html, locale);
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      {/* Schema.org JSON-LD — FAQPage (only when an FAQ section was
          detected in the body and converted to an accordion). */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}

      <div className="bg-background pt-28 sm:pt-32 pb-4">
        <div className="container"><Breadcrumb locale={locale} items={[
          { label: breadcrumbs.resourcesLabel, href: breadcrumbs.resourcesHref },
          { label: breadcrumbs.blogLabel, href: breadcrumbs.blogHref },
          { label: title },
        ]} /></div>
      </div>
      <BlogHero locale={locale} title={title} category={category} dek={metaDescription}
        author={{ name: author || "Iter Advisors", avatar: authorMember?.photo?.url, jobTitle: authorRole, url: authorUrl || aboutHref(locale) }}
        readingTime={readMinutes || undefined} dateModified={updatedDate || publishedDate} articleUrl={articleUrl}
        image={bodyImage?.src} imageAlt={bodyImage?.alt} />
      <ArticleBodyLayout locale={locale} headings={tocHeadings}>
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
      </ArticleBodyLayout>

      <CTASection locale={locale} />

      <BlogRelatedArticles locale={locale} items={relatedItems} />
    </PageLayout>
  );
}
