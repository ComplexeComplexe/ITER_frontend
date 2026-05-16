import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import MidArticleSoftCTA from "@/components/blog/MidArticleSoftCTA";
import type { StrapiBlock, CmsNavItem, StrapiTeamMember } from "@/lib/strapi";
import { articleSchema } from "@/lib/schemas";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import { splitHtmlAroundMid } from "@/lib/blog-cta-split";

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
  slug,
  featuredImageUrl,
  teamMembers,
  bodyImage,
}: BlogPostPageProps) {
  /* ── Schema.org Article structured data (CC-17) ── */
  // Build a canonical URL when we know the slug; falls back to the blog hub
  // otherwise. The schema fires whenever we have a title (always).
  const articleUrl = slug ? `${breadcrumbs.blogHref}/${slug}` : breadcrumbs.blogHref;
  const structuredData = articleSchema({
    headline: title,
    description: metaDescription || "",
    url: articleUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    authorName: author || "Iter Advisors",
    imageSrc: featuredImageUrl,
  });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Schema.org JSON-LD — Article (CC-17) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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

          {/* Author and category — publication date is intentionally
              hidden from the UI (still emitted in the JSON-LD schema
              above for SEO/freshness). */}
          {(author || category) && (
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {category && (
                  <span className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet bg-iter-violet/10 px-2 py-0.5 rounded-full">
                      {category}
                    </span>
                  </span>
                )}
              </div>

              {/* Author bio with photo — DEV-02 */}
              {author && teamMembers && (
                (() => {
                  const authorMember = teamMembers.find(m =>
                    `${m.firstName} ${m.lastName}`.toLowerCase() === author.toLowerCase() ||
                    m.slug.replace(/-/g, ' ') === author.toLowerCase().replace(/-/g, ' ')
                  );

                  if (authorMember && authorMember.photo?.url) {
                    // Handle both Strapi and fallback role formats
                    const authorRole = (authorMember.role && typeof authorMember.role === 'string')
                      ? authorMember.role
                      : ((authorMember as any)?.roles?.[locale] || (authorMember as any)?.roles?.fr || '');

                    return (
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
                              href={
                                locale === "es"
                                  ? `/es/quienes-somos/${authorMember.slug}`
                                  : `/${locale === "fr" ? "" : locale + "/"}a-propos/${authorMember.slug}`
                              }
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
                    );
                  }

                  // Fallback: just show author name if no team member found
                  return (
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <a
                        href={`/${locale === "fr" ? "" : locale + "/"}a-propos`}
                        className="hover:text-iter-violet transition-colors"
                      >
                        {author}
                      </a>
                    </span>
                  );
                })()
              )}
            </div>
          )}
        </div>
      </section>

      {/* Body illustration — shown above the article body, distinct from
          the listing cover. Source-of-truth: lib/blog-illustrations.ts. */}
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
            (() => {
              const proseClasses =
                "prose prose-lg prose-neutral dark:prose-invert max-w-none " +
                "prose-headings:font-heading prose-headings:text-foreground " +
                "prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 " +
                "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 " +
                "prose-p:text-muted-foreground prose-p:leading-relaxed " +
                "prose-a:text-iter-violet prose-a:no-underline hover:prose-a:underline " +
                "prose-strong:text-foreground " +
                "prose-table:border-collapse prose-table:w-full " +
                "prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold " +
                "prose-td:p-3 prose-td:text-sm prose-td:border-t prose-td:border-border/50 " +
                "prose-li:text-muted-foreground " +
                "prose-blockquote:border-l-iter-violet prose-blockquote:bg-muted/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg";

              // Mid-article soft CTA, but only on long reads (≥ 6 min)
              // and only when we can find an H2 in the [35 %, 65 %] band
              // of the body. Otherwise the soft CTA renders below the
              // body (still above the strong CTASection).
              const readMins = estimateReadMinutes(htmlContent);
              if (readMins >= 6) {
                const [before, after] = splitHtmlAroundMid(htmlContent);
                if (after) {
                  return (
                    <>
                      <div
                        className={proseClasses}
                        dangerouslySetInnerHTML={{ __html: before }}
                      />
                      <MidArticleSoftCTA locale={locale} />
                      <div
                        className={proseClasses}
                        dangerouslySetInnerHTML={{ __html: after }}
                      />
                    </>
                  );
                }
              }
              return (
                <>
                  <div
                    className={proseClasses}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                  {readMins >= 6 && <MidArticleSoftCTA locale={locale} />}
                </>
              );
            })()
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
