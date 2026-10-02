import Link from "next/link";
import { getReviewedCase } from "@/lib/content/documented-case-locales";
import { getPublishedCases } from "@/lib/content/published-cases";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/static-content";
import { getCaseStudiesContent, type CaseStudy } from "@/lib/content/case-studies";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import {
  ArrowRight,
  Clock,
  Users,
  CheckCircle2,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Single case study card                                             */
/* ------------------------------------------------------------------ */

function CaseStudyCardWrapper({
  cs,
  t,
  locale,
}: {
  cs: CaseStudy;
  t: ReturnType<typeof getCaseStudiesContent>;
  locale: Locale;
}) {
  const detail = getReviewedCase(cs.slug, locale);

  return (
    <div
      className="border border-border/50 rounded-2xl overflow-hidden bg-background hover:shadow-lg hover:shadow-iter-violet/5 transition-all duration-300"
    >
      <div className="p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet bg-iter-violet/10 px-3 py-1 rounded-full">
            {cs.sectorTag}
          </span>
          {cs.teamSize && <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users size={12} />
            <span>{cs.teamSize}</span>
          </div>}
          {cs.duration && <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{cs.duration}</span>
          </div>}
        </div>

        <h3 className="text-xl lg:text-2xl font-bold font-heading text-foreground mb-4 leading-tight">
          {cs.title}
        </h3>

        <div className="mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-iter-violet mb-2">
            {t.challengeLabel}
          </h4>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {cs.challenge}
          </p>
        </div>

        {detail && <Link href={detail.href} className="inline-flex text-sm font-semibold text-iter-violet underline underline-offset-4 mb-4">{locale === "fr" ? `Lire le cas ${detail.company} en détail` : locale === "en" ? `Read the ${detail.company} case in detail` : `Leer el caso ${detail.company} en detalle`}</Link>}
        <details className="group mt-4">
          <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-medium text-iter-violet mb-5">
            {locale === "fr" ? "Voir le cas d'usage" : locale === "en" ? "View case study" : "Ver caso de uso"}
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-open:rotate-90" />
          </summary>
          <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-iter-violet mb-2">
                  {t.solutionLabel}
                </h4>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {cs.solution}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-iter-violet mb-3">
                  {t.resultsLabel}
                </h4>
                <ul className="space-y-2">
                  {cs.results.map((r, ri) => (
                    <li key={ri} className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-iter-chartreuse mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-foreground">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {locale === "fr" && detail && <p className="text-sm text-muted-foreground mb-5">{detail.limits}</p>}
              {cs.quote && (
                <div className="site-card bg-muted/30 rounded-xl p-5 mt-4">
                  <Quote size={20} className="text-iter-violet/30 mb-2" />
                  <p className="text-sm italic text-foreground leading-relaxed mb-3">
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {cs.quoteAuthor}
                    </span>{" "}
                    - {cs.quoteRole}
                  </div>
                </div>
              )}
          </div>
        </details>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function CaseStudiesPage({
  locale,
  cmsNavigation,
  asSection = false,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
  asSection?: boolean;
}) {
  const t = { ...getCaseStudiesContent(locale), caseStudies: getPublishedCases(locale) };

  const Heading = asSection ? "h2" : "h1";
  const content = (
    <>
      {/* Hero */}
      <section className={`bg-background ${asSection ? "pt-8" : "pt-32"} pb-16`}>
        <div className="container">
          {!asSection && <Breadcrumb
            locale={locale}
            items={[
              { label: t.resourcesLabel, href: t.resourcesHref },
              { label: t.breadcrumbLabel },
            ]}
          />}
          <Heading className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-3xl mb-6">
            {t.h1}
          </Heading>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            <Link href={locale === "fr" ? "/clients" : locale === "en" ? "/en/clients" : "/es/clientes"} className="text-iter-violet underline underline-offset-2">
              {locale === "fr" ? "Voir les entreprises accompagnées et distinguer les références des cas détaillés" : locale === "en" ? "View company references alongside the documented case studies" : "Ver las empresas acompañadas y los casos documentados"}
            </Link>
          </p>


        </div>
      </section>

      {/* Case studies grid */}
      <section className="bg-background pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6">
            {t.caseStudies.map((cs) => (
              <CaseStudyCardWrapper
                key={cs.slug}
                cs={cs}
                t={t}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      {!asSection && <CTASection locale={locale} />}
    </>
  );

  return asSection ? content : <PageLayout locale={locale} cmsNavigation={cmsNavigation}>{content}</PageLayout>;
}
