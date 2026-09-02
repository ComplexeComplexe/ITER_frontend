import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";

interface ControleDeGestionExternaliseePageProps {
  locale: Locale;
  // The content object's exact shape is documented in
  // `lib/content/controle-de-gestion-externalise.ts`. We keep `any` here
  // because individual section types vary (table, testimonials, faqs…)
  // and TypeScript discriminated unions don't add value at this seam.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  cmsNavigation?: CmsNavItem[];
}

/**
 * Page rendering for /services/controle-de-gestion-externalise.
 *
 * Refonte 2026-05-17 — supports the new content shape:
 *   - Hero with lede + stats bandeau + dual CTA
 *   - 8 H2 sections with mixed types (paragraphs, bullets, pillars,
 *     table, testimonials, faqs, closingText/closingTextHtml,
 *     ctaButtons)
 *
 * SEO contract:
 *   - Exactly ONE H1 (the page title).
 *   - Every section is an `<h2 id="...">` so the deep-link / TOC
 *     anchors are stable.
 *   - Tables get header background + zebra rows + caption for AT.
 *   - FAQ section renders questions as <h3> + answer paragraphs so
 *     the schema FAQPage payload remains consistent with the visible
 *     DOM (Google rejects FAQ rich-results if the DOM and schema
 *     diverge).
 */
export default function ControleDeGestionExternalisePage({
  locale,
  content,
  cmsNavigation,
}: ControleDeGestionExternaliseePageProps) {
  const t = content;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: "Services", href: "/services" },
              { label: "Contrôle de gestion externalisé" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">
              {t.h1}
            </h1>
            <PageByline locale={locale} author={FINANCE_AUTHOR} className="mb-6" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  editorialWebPageSchema({
                    path: "/services/controle-de-gestion-externalise",
                    name: t.h1,
                    description: t.meta?.description ?? t.h1,
                    locale,
                    author: FINANCE_AUTHOR,
                  })
                ),
              }}
            />
            {t.hero?.lede && (
              <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed mb-6">
                {t.hero.lede}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {t.hero?.primaryCta && (
                <Link
                  href={t.hero.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {t.hero.primaryCta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              )}
              {t.hero?.secondaryCta && (
                <Link
                  href={t.hero.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
                >
                  {t.hero.secondaryCta.label}
                </Link>
              )}
            </div>
            {Array.isArray(t.hero?.stats) && t.hero.stats.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {t.hero.stats.map((stat: string, i: number) => (
                  <li key={i} className="inline-flex items-center gap-2">
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="text-iter-chartreuse"
                    />
                    {stat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ─── Hero illustration ─── */}
      <section className="bg-background pt-0 pb-8 sm:pb-12">
        <div className="container max-w-3xl">
          <Image
            src="/images/illustrations/management-control.svg"
            alt="Contrôle de gestion externalisé Iter Advisors — tableaux de bord financiers avec KPIs, jauges de rentabilité et suivi des marges"
            width={800}
            height={450}
            className="rounded-2xl object-cover w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* ─── Content sections ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {t.sections.map((section: any, idx: number) => (
            <div
              key={idx}
              id={section.id}
              className="scroll-mt-24 mb-16 sm:mb-24"
            >
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
                {section.title}
              </h2>

              {/* Paragraphs */}
              {section.paragraphs && (
                <div className="prose prose-sm sm:prose-base max-w-none space-y-4 mb-6">
                  {section.paragraphs.map((para: string, pidx: number) => (
                    <p
                      key={pidx}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {section.bullets && (
                <ul className="space-y-4 mb-6">
                  {section.bullets.map((bullet: any, bidx: number) => (
                    <li
                      key={bidx}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    >
                      <strong className="text-foreground">{bullet.title}</strong>{" "}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}

              {/* Pillars (Phase 1/2/3/4 in Section 4) */}
              {section.pillars && (
                <div className="space-y-6 mb-6">
                  {section.pillars.map((pillar: any, pidx: number) => (
                    <div
                      key={pidx}
                      className="border-l-4 border-iter-chartreuse pl-4"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Table (KPIs, comparison, pricing).
                  Accessibility: caption inside the table, scope="col"
                  on every th. Mobile: scroll-x wrapper so the article
                  column stays at ≤ 72ch but the table can overflow. */}
              {section.table && (
                <div className="mb-6 -mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60">
                  <table className="w-full text-sm border-collapse">
                    {section.table.caption && (
                      <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet bg-muted/30 px-4 py-3">
                        {section.table.caption}
                      </caption>
                    )}
                    <thead className="bg-muted/40">
                      <tr>
                        {section.table.headers.map((h: string, i: number) => (
                          <th
                            key={i}
                            scope="col"
                            className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row: string[], ri: number) => (
                        <tr
                          key={ri}
                          className={ri % 2 === 0 ? "" : "bg-muted/20"}
                        >
                          {row.map((cell: string, ci: number) => (
                            <td
                              key={ci}
                              className={`p-3 sm:p-4 align-top border-b border-border/40 leading-relaxed ${
                                ci === 0
                                  ? "font-semibold text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Testimonials (Section 5) */}
              {section.testimonials && (
                <div className="space-y-6 mb-6">
                  {section.testimonials.map((tst: any, tidx: number) => (
                    <figure
                      key={tidx}
                      className="border-l-4 border-iter-violet bg-iter-violet/5 rounded-r-lg p-5 sm:p-6"
                    >
                      <blockquote className="text-sm sm:text-base text-foreground/80 italic leading-relaxed mb-3">
                        « {tst.quote} »
                      </blockquote>
                      <figcaption className="text-xs sm:text-sm">
                        <span className="font-semibold text-foreground not-italic">
                          {tst.author}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}
                          — {tst.role}, {tst.location}
                        </span>
                        {tst.context && (
                          <span className="block text-muted-foreground/70 mt-1">
                            {tst.context}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* FAQ accordion items (native details/summary preserved
                  inside the FAQPage schema emitted at the route level). */}
              {section.faqs && (
                <div className="space-y-4">
                  {section.faqs.map((faq: any, fidx: number) => (
                    <details
                      key={fidx}
                      className="group rounded-lg border border-border/60 bg-background"
                    >
                      <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                        <h3 className="text-base sm:text-lg font-heading m-0">
                          {faq.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="text-iter-violet shrink-0 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answerHtml ? (
                          <p
                            dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                          />
                        ) : (
                          <p>{faq.answer}</p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              )}

              {/* Closing text — plain or HTML for sections that need
                  inline anchor links to other services (outbound
                  internal linking spec, TICKET F2.4). */}
              {section.closingText && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.closingText}
                </p>
              )}
              {section.closingTextHtml && (
                <p
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed prose-internal"
                  dangerouslySetInnerHTML={{ __html: section.closingTextHtml }}
                />
              )}

              {/* CTA buttons (Section 8) */}
              {section.ctaButtons && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                  {section.ctaButtons.map((btn: any, bidx: number) =>
                    btn.variant === "primary" ? (
                      <Link
                        key={bidx}
                        href={btn.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all"
                      >
                        {btn.label}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ) : (
                      <Link
                        key={bidx}
                        href={btn.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
                      >
                        {btn.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
