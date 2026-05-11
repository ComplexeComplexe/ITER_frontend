import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { type HRServiceContent } from "@/lib/content/hr-services";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Dedicated HR service page renderer (TICKET 1).
 * Renders all 7 sections from a single content blob defined in
 * lib/content/hr-services.ts. Also injects Service + FAQPage JSON-LD when
 * applicable.
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
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.meta.description,
    provider: { "@id": "https://www.iteradvisors.com/#organization" },
    areaServed: ["Barcelone", "Paris", "Toulouse"],
    url: `https://www.iteradvisors.com/services/${content.slug}`,
    serviceType: "Human Resources outsourcing",
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: "Services", href: "/services" },
              { label: content.breadcrumb },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mt-6">
            {content.h1}
          </h1>
          {content.intro.map((p, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed mt-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* What is */}
      <section className="bg-muted/30 py-20">
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
      <section className="bg-background py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.whyOutsource.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {content.whyOutsource.benefits.map((b) => (
              <div key={b.label} className="rounded-2xl border border-border/50 p-6">
                <p className="font-semibold mb-2 text-foreground">{b.label}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-muted/30 py-20">
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
      <section className="bg-background py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.useCases.heading}
          </h2>
          <div className="space-y-6">
            {content.useCases.cases.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border/50 p-6 bg-background">
                <p className="font-semibold text-foreground mb-2">{c.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {content.pricing.heading}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-2xl border border-border/50 overflow-hidden">
              <thead>
                <tr className="bg-iter-violet/5 border-b border-border/50">
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Formule</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Périmètre</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Tarif</th>
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

      {/* CTA */}
      <section className="bg-background py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
            {content.cta.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{content.cta.body}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-iter-chartreuse text-iter-dark font-semibold rounded-full hover:brightness-105 transition-all"
          >
            {content.cta.buttonLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <CTASection locale={locale} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </PageLayout>
  );
}
