import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import AuthorByline from "@/components/AuthorByline";
import ClientTestimonials from "@/components/ClientTestimonials";

interface DafExternalisePariEnrichedPageProps {
  locale: Locale;
  content: any;
  cmsNavigation?: CmsNavItem[];
}

export default function DafExternalisePariEnrichedPage({
  locale,
  content,
  cmsNavigation,
}: DafExternalisePariEnrichedPageProps) {
  const t = content;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: locale === "fr" ? "Services" : "Services", href: "/services" },
              { label: locale === "fr" ? "DAF externalisé Paris" : "Outsourced CFO Paris" },
            ]}
          />
          {t.author && (
            <div className="mt-6 sm:mt-8">
              <AuthorByline
                name={t.author.name}
                jobTitle={t.author.jobTitle}
                linkedInUrl={t.author.linkedInUrl}
                avatarUrl={t.author.avatarUrl}
                updateDate={t.author.updateDate}
                locale={locale}
              />
            </div>
          )}
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {t.h1}
            </h1>
            <div className="prose prose-sm sm:prose-base max-w-none space-y-4 mb-8">
              {t.intro.map((para: string, idx: number) => (
                <p key={idx} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            {t.tldr && (
              <div className="mb-8 p-6 bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg">
                <p className="text-sm font-semibold text-foreground mb-2">En une ligne</p>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {t.tldr}
                </p>
              </div>
            )}
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-2"
            >
              Demander un devis
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {t.sections.map((section: any, idx: number) => (
            <div key={idx} id={section.id} className="scroll-mt-24 mb-16 sm:mb-24">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
                {section.title}
              </h2>

              {/* Regular paragraphs */}
              {section.paragraphs && (
                <div className="prose prose-sm sm:prose-base max-w-none space-y-4 mb-6">
                  {section.paragraphs.map((para: string, pidx: number) => (
                    <p key={pidx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Comparison Cards */}
              {section.comparison && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Internal */}
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{section.comparison.internal.title}</h3>
                    <div className="text-3xl font-bold text-iter-chartreuse mb-1">{section.comparison.internal.price}</div>
                    <p className="text-sm text-muted-foreground mb-4">{section.comparison.internal.subtitle}</p>
                    <ul className="space-y-2">
                      {section.comparison.internal.cons.map((item: string, cidx: number) => (
                        <li key={cidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* External */}
                  <div className="border-2 border-iter-violet bg-iter-violet/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{section.comparison.external.title}</h3>
                    <div className="text-3xl font-bold text-iter-chartreuse mb-1">{section.comparison.external.price}</div>
                    <p className="text-sm text-muted-foreground mb-4">{section.comparison.external.subtitle}</p>
                    <ul className="space-y-2">
                      {section.comparison.external.pros.map((item: string, pidx: number) => (
                        <li key={pidx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tables */}
              {section.tables && (
                <div className="mb-6 overflow-x-auto">
                  {section.tables.map((table: any, tidx: number) => (
                    <div key={tidx}>
                      {table.caption && (
                        <p className="text-sm text-muted-foreground italic mb-3">{table.caption}</p>
                      )}
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-iter-violet text-white">
                            {table.headers.map((header: string, hidx: number) => (
                              <th key={hidx} className="border border-gray-300 px-4 py-2 text-left">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row: string[], ridx: number) => (
                            <tr key={ridx} className={ridx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                              {row.map((cell: string, cidx: number) => (
                                <td key={cidx} className="border border-gray-300 px-4 py-2">
                                  {cidx === 0 ? <strong>{cell}</strong> : cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline */}
              {section.timeline && (
                <div className="mb-6 pl-6 border-l-4 border-iter-chartreuse">
                  {section.timeline.map((item: any, tidx: number) => (
                    <div key={tidx} className="mb-6 last:mb-0">
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* KPI Cards */}
              {section.kpis && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {section.kpis.map((kpi: any, kidx: number) => (
                    <div key={kidx} className="bg-iter-violet text-white rounded-lg p-6 text-center">
                      <div className="text-4xl font-bold text-iter-chartreuse mb-2">{kpi.number}</div>
                      <p className="text-sm opacity-90 whitespace-pre-line">{kpi.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bullet points */}
              {section.bullets && (
                <div className="mb-6">
                  <ul className="space-y-4">
                    {section.bullets.map((bullet: any, bidx: number) => (
                      <li key={bidx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">{bullet.title}</strong> {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Closing text */}
              {section.closingText && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.closingText}
                </p>
              )}

              {/* FAQ Section */}
              {section.faqs && (
                <div className="space-y-6">
                  {section.faqs.map((faq: any, fidx: number) => (
                    <div key={fidx}>
                      <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {t.testimonials && (
        <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/5">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-12 text-center">
              Avis de nos clients
            </h2>
            <ClientTestimonials
              testimonials={t.testimonials}
              trustfolioUrl="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            />
          </div>
        </section>
      )}

      {/* Sources Section */}
      {t.sources && (
        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
              Sources et références
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <ul className="space-y-3">
                {t.sources.map((source: string, idx: number) => (
                  <li key={idx} className="text-sm sm:text-base text-muted-foreground">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground mt-8 pt-8 border-t">
              Les chiffres et références citées dans cet article proviennent de sources publiques officielles.
              Nous nous engageons à maintenir la pertinence et l'exactitude de ces informations.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      {/* MAILLAGE-T2 (2026-08-31) — cette page est la cible du ticket
          « daf externalisé paris » (30 rech./mois, hors top 100) et c'était
          la seule page ville sans maillage vers le cluster : son composant
          dédié ne portait que 2 liens. Les huit autres pages villes passent
          par DafLocalPage, qui a reçu les mêmes cartes. */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
            Nos services DAF externalisé à Paris
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0 mb-10">
            {[
              { href: "/daf-externalise", label: "DAF externalisé — l'offre complète" },
              { href: "/daf-externalise/tarifs", label: "Tarifs DAF externalisé" },
              { href: "/daf-externalise/temps-partage", label: "DAF à temps partagé" },
              { href: "/daf-externalise/transition", label: "DAF de transition" },
              { href: "/daf-externalise/metier", label: "Métier de DAF" },
              { href: "/daf-externalise/secteurs", label: "DAF externalisé par secteur" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl border border-border/50 bg-background px-4 py-3 text-sm font-medium text-foreground hover:border-iter-violet/40 hover:text-iter-violet transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold font-heading text-foreground mb-4">
            Nos autres implantations
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
            {[
              { href: "/daf-externalise-barcelone", label: "DAF externalisé à Barcelone" },
              { href: "/daf-externalise-toulouse", label: "DAF externalisé à Toulouse" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl border border-border/50 bg-background px-4 py-3 text-sm font-medium text-foreground hover:border-iter-violet/40 hover:text-iter-violet transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
