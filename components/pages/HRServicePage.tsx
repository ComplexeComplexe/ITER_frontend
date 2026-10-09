import HrCatalogue from "@/components/HrCatalogue";
import { getLocalizedHRService, hrServiceInterface } from "@/lib/content/hr-locales";
import { parityHref } from "@/lib/locale-route-map";
import HRExpert from "@/components/HRExpert";
import ServiceHero from "@/components/design/ServiceHero";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/static-content";
import { type HRServiceContent, HR_SERVICE_SLUGS } from "@/lib/content/hr-services";
import { faqPageSchema } from "@/lib/schemas";
import { editorialWebPageSchema, ITER_AUTHOR } from "@/lib/schemas/editorial";
import PageByline from "@/components/PageByline";
import PageLayout from "@/components/PageLayout";

/**
 * Dedicated HR service page renderer (TICKET 1).
 * Renders all 7 sections from a single content blob defined in
 * lib/content/hr-services.ts. Also injects Service + FAQPage JSON-LD when
 * applicable.
 *
 * REDESIGN-P4 (2026-09-01) — quatre ajouts : byline et schéma WebPage
 * (auteur, dates), FAQ visible + FAQPage (ces quatre pages n'en avaient pas),
 * et un encadré « Direction RH externalisée » qui relie chaque service au
 * pilier DRH, à sa sous-page temps partagé et aux trois autres services :
 * le cluster DRH n'avait jamais été maillé, la sous-page recevait un lien.
 */
export default function HRServicePage({
  locale,
  content,
  cmsNavigation,
}: {
  locale: Locale;
  content: HRServiceContent;
  cmsNavigation?: CmsNavItem[];
}) {
  const ui = hrServiceInterface(locale);
  const href = (source: string) => parityHref(source, locale);
  const path = href(`/services/${content.slug}`);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.iteradvisors.com${path}#service`,
    mainEntityOfPage: { "@id": `https://www.iteradvisors.com${path}#webpage` },
    name: content.h1,
    description: content.meta.description,
    provider: { "@id": "https://www.iteradvisors.com/#organization" },
    url: `https://www.iteradvisors.com${path}`,
    serviceType: ui.cluster,
  };
  const siblings = HR_SERVICE_SLUGS.filter((s) => s !== content.slug).map((s) => getLocalizedHRService(s, locale));

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <ServiceHero locale={locale} family="rh" title={content.h1} label={content.breadcrumb} eyebrow={ui.eyebrow} lead={content.intro[0]} intro={content.intro[1]}
        primary={{ href: href(`/contact#${content.slug}`), label: ui.primary }} secondary={{ href: "#methode", label: ui.method }}
        summary={[{ label: ui.need, value: content.breadcrumb }, { label: ui.work, value: ui.scope }, { label: ui.budget, value: ui.quote }]}
        proof={<PageByline locale={locale} author={ITER_AUTHOR} dateModified={"2026-10-05"} className="mt-4" />}
        navigation={[{ id: "perimetre", label: ui.perimeter }, { id: "methode", label: ui.navMethod }, { id: "budget", label: ui.budget }]} />

      <HrCatalogue locale={locale} service={content.slug} />
      {/* What is */}
      <section data-page-block="scope" id="perimetre" className="site-section bg-muted/30 py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">
            {content.whatIs.heading}
          </h2>
          {content.whatIs.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
          {content.whatIs.bullets && (
            <ul className="space-y-3 mt-6">
              {content.whatIs.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 size={20} className="text-iter-violet flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Why outsource */}
      <section className="site-section bg-background py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.whyOutsource.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {content.whyOutsource.benefits.map((b) => (
              <div key={b.label} className="site-card rounded-2xl border border-border/50 p-6">
                <p className="font-semibold mb-2 text-foreground">{b.label}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section data-page-block="method" id="methode" className="site-section bg-muted/30 py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.approach.heading}
          </h2>
          <ol className="space-y-6">
            {content.approach.phases.map((s, i) => (
              <li key={s.step} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-iter-chartreuse text-iter-dark font-semibold flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{s.step}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use cases */}
      <section className="site-section bg-background py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.useCases.heading}
          </h2>
          <div className="space-y-6">
            {content.useCases.cases.map((c) => (
              <div key={c.title} className="site-card rounded-2xl border border-border/50 p-6 bg-background">
                <p className="font-semibold text-foreground mb-2">{c.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section data-page-block="budget" id="budget" className="site-section bg-muted/30 py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.pricing.heading}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-2xl border border-border/50 overflow-hidden">
              <thead>
                <tr className="bg-iter-violet/5 border-b border-border/50">
                  <th className="text-left p-4 font-semibold text-foreground text-sm">{ui.formula}</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">{ui.tableScope}</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">{ui.fee}</th>
                </tr>
              </thead>
              <tbody>
                {content.pricing.rows.map((row, i) => (
                  <tr
                    key={row.formula}
                    className={i < content.pricing.rows.length - 1 ? "border-b border-border/30" : ""}
                  >
                    <td className="p-4 font-semibold text-foreground">{row.formula}</td>
                    <td className="p-4 text-muted-foreground text-sm">{row.scope}</td>
                    <td className="p-4 text-iter-violet font-semibold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {content.pricing.note && (
            <p className="text-muted-foreground text-sm mt-4">{content.pricing.note}</p>
          )}
        </div>
      </section>

      {/* FAQ — visible et JSON-LD depuis le même tableau */}
      {content.faq && content.faq.length > 0 && (
        <section className="site-section bg-background py-20">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-8">{ui.faq}</h2>
            <div className="space-y-3">
              {content.faq.map((q) => (
                <details key={q.question} className="group rounded-lg border border-border/60 bg-background">
                  <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-heading m-0">{q.question}</h3>
                    <span aria-hidden className="text-iter-violet shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="site-copy px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>{q.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cluster DRH */}
      <section className="site-section bg-muted/30 py-16">
        <div className="container max-w-4xl">
          <div className="site-card rounded-3xl border border-border/60 bg-background p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-iter-violet mb-2">{ui.cluster}</p>
            <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4">
              {ui.clusterIntro}{" "}
              <Link href={href("/drh-externalise")} className="text-iter-violet font-semibold hover:underline">
                {ui.hr}
              </Link>
              {ui.available}{" "}
              <Link href={href("/drh-externalise/temps-partage")} className="text-iter-violet font-semibold hover:underline">
                {ui.partTime}
              </Link>
              {ui.siblings}
            </p>
            <ul className="grid sm:grid-cols-3 gap-3 list-none pl-0">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={href(`/services/${s.slug}`)}
                    className="site-card block rounded-xl border border-border/60 p-4 text-sm font-medium text-foreground hover:border-iter-violet/50 hover:text-iter-violet transition-colors"
                  >
                    {s.breadcrumb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="site-section bg-background py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
            {content.cta.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{content.cta.body}</p>
          <Link
            href={href(`/contact#${content.slug}`)}
            className="site-button site-button-primary inline-flex items-center gap-2 px-8 py-3 bg-iter-chartreuse text-iter-dark font-semibold rounded-full hover:brightness-105 transition-all"
          >
            {content.cta.buttonLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="site-section"><div className="site-container max-w-4xl"><HRExpert locale={locale} /></div></section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            { ...editorialWebPageSchema({
              path,
              name: content.h1,
              description: content.meta.description,
              locale,
              author: ITER_AUTHOR,
              dateModified: "2026-10-05",
            }), mainEntity: { "@id": `https://www.iteradvisors.com${path}#service` } }
          ),
        }}
      />
      {content.faq && content.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(content.faq)) }}
        />
      )}
    </PageLayout>
  );
}
