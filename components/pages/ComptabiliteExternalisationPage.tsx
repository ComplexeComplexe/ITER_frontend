import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import { Locale } from "@/lib/i18n";
import { dafClusterHref } from "@/lib/path-localization";
import { getContactPath } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ClientTestimonials from "@/components/ClientTestimonials";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";
import { faqPageSchema } from "@/lib/schemas";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";

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
  const pagePath = locale === "es" ? "/es/services/externalizar-contabilidad" : locale === "en" ? "/en/services/outsource-your-accounting" : "/services/comptabilite-externalisation";
  const modified = PAGE_REVISIONS[pagePath];
  const faqItems = t.sections.flatMap((section: { faqs?: Array<{ question: string; answer: string }> }) => section.faqs ?? []);
  const copy = {
    fr: { service: "Externalisation comptable", summary: "En une ligne", cta: "Décrire mon besoin", cfo: "DAF externalisé", reviews: "Avis de nos clients", sources: "Sources et références", note: "Le périmètre de production et de validation dépend du pays et des professionnels mandatés.", intro: ["La fiabilité des pièces, le suivi des échéances et la préparation de la clôture demandent une organisation claire entre le dirigeant, son équipe et son cabinet comptable.", "Iter Advisors aide à structurer ces échanges et à rendre les données comptables utilisables pour le pilotage. Le périmètre, les livrables et les responsabilités sont définis au démarrage.", "La tenue, les déclarations et les actes réservés relèvent des professionnels compétents selon le pays et le mandat. Les outils et un éventuel calendrier de migration sont convenus après analyse de vos données."] },
    en: { service: "Accounting operations", summary: "In brief", cta: "Describe my needs", cfo: "Fractional CFO", reviews: "Client reviews", sources: "Sources and references", note: "Production and sign-off responsibilities depend on the country and the professionals appointed.", intro: ["Reliable records, clear deadlines and an organised close require coordination between management, the internal team and the accounting firm.", "Iter Advisors helps organise these exchanges and make accounting data useful for decision-making. Scope, deliverables and responsibilities are agreed at the start.", "Bookkeeping, filings and reserved activities remain with the appropriately qualified professionals under the applicable mandate. Tools and any migration timetable are agreed after reviewing your data."] },
    es: { service: "Organización contable", summary: "En breve", cta: "Describir mi necesidad", cfo: "CFO externalizado", reviews: "Opiniones de clientes", sources: "Fuentes y referencias", note: "Las responsabilidades de producción y validación dependen del país y de los profesionales designados.", intro: ["La fiabilidad de los documentos, el seguimiento de los plazos y la preparación del cierre requieren una organización clara entre la dirección, su equipo y la asesoría contable.", "Iter Advisors ayuda a estructurar estos intercambios y a convertir los datos contables en información útil para la gestión. El alcance, los entregables y las responsabilidades se definen al inicio.", "La contabilidad, las declaraciones y las actividades reservadas corresponden a los profesionales competentes según el país y el mandato. Las herramientas y el calendario de una posible migración se acuerdan después de analizar sus datos."] },
  }[locale];

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {faqItems.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faqItems)).replace(/</g, "\\u003c") }} />}

      {/* ─── Hero ─── */}
      <section className="site-hero bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              {
                label: locale === "es" ? "Servicios" : "Services",
                href: locale === "fr" ? "/services" : `/${locale}/services`,
              },
              {
                label: copy.service,
              },
            ]}
          />

          <div className="mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4 leading-tight">
              {t.h1}
            </h1>
            <PageByline locale={locale} author={FINANCE_AUTHOR} dateModified={modified} className="mb-6 sm:mb-8" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  editorialWebPageSchema({
                    path: pagePath,
                    name: t.h1,
                    description: t.meta?.description ?? t.h1,
                    locale,
                    author: FINANCE_AUTHOR,
                    dateModified: modified,
                  })
                ),
              }}
            />
            <div className="space-y-4 mb-8">
              {copy.intro.map((paragraph) => <p key={paragraph} className="text-base text-muted-foreground leading-relaxed">{paragraph}</p>)}
            </div>

            {/* TLDR pull-quote */}
            {t.tldr && (
              <div className="mb-8 p-5 sm:p-6 bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg">
                <p className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 uppercase tracking-widest">
                  {copy.summary}
                </p>
                <p className="site-copy text-sm sm:text-base text-foreground leading-relaxed">{t.tldr}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={getContactPath(locale)}
                className="site-button site-button-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                {copy.cta}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href={dafClusterHref("", locale)}
                className="site-button site-button-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                {copy.cfo}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content sections ─── */}
      <section className="site-section py-16 sm:py-24 lg:py-32 bg-background">
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
                      className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed"
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
                      className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed"
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
                <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
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
                      <div className="site-copy px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
        <section className="site-section py-16 sm:py-24 lg:py-32 bg-iter-violet/5">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-10 sm:mb-12 text-center">
              {copy.reviews}
            </h2>
            <ClientTestimonials
              testimonials={t.testimonials}
              locale={locale}
              trustfolioUrl="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            />
          </div>
        </section>
      )}

      {/* ─── Sources ─── */}
      {t.sources && (
        <section className="site-section py-12 sm:py-16 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-6">
              {copy.sources}
            </h2>
            <ul className="space-y-2">
              {t.sources.map((source: string, idx: number) => (
                <li key={idx} className="text-xs sm:text-sm text-muted-foreground">
                  {source}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-8 pt-6 border-t border-border/40">
              {copy.note}
            </p>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
