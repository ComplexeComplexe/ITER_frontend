import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ClientTestimonials from "@/components/ClientTestimonials";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";

interface ComptabiliteExternalisationPageProps {
  locale: Locale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  cmsNavigation?: CmsNavItem[];
}

/**
 * Parse `[[text|url]]` link syntax used in closingText and paragraph strings.
 * Returns a mixed array of strings and <Link> nodes.
 */
function renderLinkedText(text: string): ReactNode {
  const parts = text.split(/\[\[(.+?)\|(.+?)\]\]/g);
  return parts.map((part, i) => {
    if (i % 3 === 0) return part;
    if (i % 3 === 1) {
      const url = parts[i + 1];
      return (
        <Link
          key={i}
          href={url}
          className="text-iter-violet hover:text-iter-violet/80 underline underline-offset-2"
        >
          {part}
        </Link>
      );
    }
    return null; // URL slot — already consumed above
  });
}

export default function ComptabiliteExternalisationPage({
  locale,
  content,
  cmsNavigation,
}: ComptabiliteExternalisationPageProps) {
  const t = content;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              {
                label: locale === "fr" ? "Services" : "Services",
                href: "/services",
              },
              {
                label:
                  locale === "fr"
                    ? "Externalisation comptable"
                    : "Accounting Outsourcing",
              },
            ]}
          />

          {/* Hero illustration */}
          <div className="relative mt-6 sm:mt-8 mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/images/illustrations/accounting-handover.svg"
              alt="Remise des documents comptables au cabinet Iter Advisors : passation de la tenue comptable et transmission des pièces justificatives"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">
              {t.h1}
            </h1>
            <PageByline locale={locale} author={FINANCE_AUTHOR} className="mb-6 sm:mb-8" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  editorialWebPageSchema({
                    path:
                      locale === "es"
                        ? "/es/services/externalizar-contabilidad"
                        : locale === "en"
                          ? "/en/services/outsource-your-accounting"
                          : "/services/comptabilite-externalisation",
                    name: t.h1,
                    description: t.meta?.description ?? t.h1,
                    locale,
                    author: FINANCE_AUTHOR,
                  })
                ),
              }}
            />
            <div className="space-y-4 mb-8">
              <p className="text-base sm:text-lg text-foreground/80 font-medium leading-relaxed">
                La comptabilité reste l&apos;un des premiers points de friction pour un
                dirigeant. Entre les échéances fiscales, la gestion des factures et la
                préparation de la clôture annuelle, le temps consacré à la tenue des comptes
                s&apos;accumule vite. Pourtant, rares sont les entreprises en croissance qui
                justifient dès le départ un comptable interne à temps plein.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                L&apos;externalisation comptable permet de résoudre ce dilemme. Elle donne
                accès à une expertise de niveau professionnel, sans les contraintes d&apos;un
                recrutement. Pour une startup qui prépare une levée de fonds ou une PME qui
                veut structurer sa finance, disposer de données comptables fiables et à jour
                n&apos;est pas un luxe : c&apos;est une condition de pilotage.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Chez Iter Advisors, nous accompagnons les dirigeants sur la tenue comptable,
                les déclarations fiscales et la clôture annuelle. Notre approche s&apos;appuie
                sur les outils cloud que vous utilisez déjà, sans imposer de migration forcée
                ni de rupture dans vos processus.
              </p>
            </div>

            {/* TLDR pull-quote */}
            {t.tldr && (
              <div className="mb-8 p-5 sm:p-6 bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg">
                <p className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 uppercase tracking-widest">
                  En une ligne
                </p>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">{t.tldr}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                Demander un devis
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/daf-externalise"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                DAF externalisé
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content sections ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t.sections.map((section: any, idx: number) => (
            <div key={idx} id={section.id} className="scroll-mt-24 mb-16 sm:mb-24">

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
                {section.title}
              </h2>

              {/* Paragraphs — support [[text|url]] link syntax */}
              {section.paragraphs && (
                <div className="space-y-4 mb-6">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {section.paragraphs.map((para: string, pidx: number) => (
                    <p
                      key={pidx}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                    >
                      {renderLinkedText(para)}
                    </p>
                  ))}
                </div>
              )}

              {/* Bullets */}
              {section.bullets && (
                <ul className="space-y-4 mb-6">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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

              {/* Tables — for the comparatif section (tables: Array) */}
              {section.tables &&
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                section.tables.map((table: any, tidx: number) => (
                  <div
                    key={tidx}
                    className="mb-6 -mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60"
                  >
                    <table className="w-full text-sm border-collapse">
                      {table.caption && (
                        <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet bg-muted/30 px-4 py-3">
                          {table.caption}
                        </caption>
                      )}
                      <thead className="bg-muted/40">
                        <tr>
                          {table.headers.map((h: string, i: number) => (
                            <th
                              key={i}
                              scope="col"
                              className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60 whitespace-nowrap"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row: string[], ri: number) => (
                          <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
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
                ))}

              {/* Closing text — supports [[text|url]] link syntax */}
              {section.closingText && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  {renderLinkedText(section.closingText)}
                </p>
              )}

              {/* FAQ — native <details>/<summary> accordion */}
              {section.faqs && (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                          className="text-iter-violet shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      {t.testimonials && (
        <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/5">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-10 sm:mb-12 text-center">
              Avis de nos clients
            </h2>
            <ClientTestimonials
              testimonials={t.testimonials}
              trustfolioUrl="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            />
          </div>
        </section>
      )}

      {/* ─── Sources ─── */}
      {t.sources && (
        <section className="py-12 sm:py-16 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-6">
              Sources et références
            </h2>
            <ul className="space-y-2">
              {t.sources.map((source: string, idx: number) => (
                <li key={idx} className="text-xs sm:text-sm text-muted-foreground">
                  {source}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-8 pt-6 border-t border-border/40">
              Les chiffres et références cités dans cet article proviennent de sources
              publiques officielles. Nous nous engageons à maintenir la pertinence et
              l&apos;exactitude de ces informations.
            </p>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
