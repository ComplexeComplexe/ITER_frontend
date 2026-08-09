"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, TrendingDown, Zap, Eye, Network, BarChart3, Wallet, Rocket, Settings, Compass, Clock, Users, Wrench, DollarSign, MapPin, Shield, Linkedin, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem, StrapiTeamMember } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { BOOKING_URL } from "@/lib/navigation";
import { getDafContent, type FaqRichAnswer, type LongTailQA, type SourceCitation } from "@/lib/content/daf";
import { faqPageSchema, speakableSchema } from "@/lib/schemas";
import { renderInlineMarkdownLinks } from "@/lib/render-markdown-inline-links";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import AuthorByline from "@/components/AuthorByline";
import References from "@/components/References";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

/* HowTo schema content — collaboration steps with an Iter Advisors fractional CFO.
 * Drives AI-answer surfaces (Perplexity / SearchGPT / Gemini) per audit T-7. */
const HOW_TO_COLLAB: Record<
  Locale,
  { name: string; description: string; steps: { name: string; text: string }[] }
> = {
  fr: {
    name: "Comment se passe la collaboration avec un DAF externalisé Iter Advisors",
    description:
      "Les 4 étapes clés pour démarrer une mission de DAF externalisé avec Iter Advisors, du diagnostic initial à l'intégration opérationnelle.",
    steps: [
      {
        name: "Diagnostic financier initial",
        text: "Nous réalisons un diagnostic approfondi de votre situation financière sur 1 à 2 semaines : trésorerie, reporting, outils, process et enjeux stratégiques.",
      },
      {
        name: "Cadrage de la mission",
        text: "Nous définissons ensemble le périmètre d'intervention, la fréquence (jours par mois) et les objectifs prioritaires (levée de fonds, structuration, M&A, transition).",
      },
      {
        name: "Intégration du DAF dans vos équipes",
        text: "Notre DAF rejoint votre équipe et prend en main les sujets clés : tableaux de bord financiers, budget prévisionnel, prévisionnel de trésorerie, relations investisseurs et expert-comptable.",
      },
      {
        name: "Pilotage et reporting récurrents",
        text: "Le DAF assure un reporting mensuel, anime les comités stratégiques et adapte le périmètre selon l'évolution de votre activité — sans engagement de durée.",
      },
    ],
  },
  en: {
    name: "How collaboration with an Iter Advisors fractional CFO works",
    description:
      "The 4 key steps to start a fractional CFO engagement with Iter Advisors, from initial diagnosis to operational integration.",
    steps: [
      {
        name: "Initial financial diagnosis",
        text: "We run an in-depth diagnosis of your financial situation over 1-2 weeks: cash flow, reporting, tools, processes and strategic priorities.",
      },
      {
        name: "Engagement scoping",
        text: "Together we define the scope, frequency (days per month) and priority objectives (fundraising, structuring, M&A, transition).",
      },
      {
        name: "CFO integration into your team",
        text: "Our CFO joins your team and takes ownership of key topics: dashboards, cash flow forecast, investor relations and accountant relationship.",
      },
      {
        name: "Recurring management & reporting",
        text: "The CFO delivers monthly reporting, runs strategic committees and adjusts scope as your business evolves — with no minimum commitment.",
      },
    ],
  },
  es: {
    name: "Cómo funciona la colaboración con un CFO externalizado de Iter Advisors",
    description:
      "Las 4 etapas clave para arrancar una misión de CFO externalizado con Iter Advisors, del diagnóstico inicial a la integración operativa.",
    steps: [
      {
        name: "Diagnóstico financiero inicial",
        text: "Realizamos un diagnóstico profundo de su situación financiera durante 1-2 semanas: tesorería, reporting, herramientas, procesos y prioridades estratégicas.",
      },
      {
        name: "Definición del alcance",
        text: "Definimos juntos el alcance, la frecuencia (días al mes) y los objetivos prioritarios (ronda de financiación, estructuración, M&A, transición).",
      },
      {
        name: "Integración del CFO en su equipo",
        text: "Nuestro CFO se incorpora a su equipo y asume los temas clave: cuadros de mando, previsional de tesorería, relaciones con inversores y contable.",
      },
      {
        name: "Pilotaje y reporting recurrentes",
        text: "El CFO entrega un reporting mensual, anima los comités estratégicos y ajusta el alcance según la evolución de su actividad — sin compromiso mínimo.",
      },
    ],
  },
};

export default function DafPage({
  locale,
  cmsNavigation,
  teamMembers,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
  teamMembers?: StrapiTeamMember[];
}) {
  const t = getDafContent(locale);

  // Highlighted experts for the EEAT block (audit SEO D.1):
  // Sébastien Doat (founding partner CFO) + Florent Greth (partner CFO).
  // Falls back to local team data when Strapi is unavailable.
  const teamSource =
    teamMembers && teamMembers.length > 0 ? teamMembers : getFallbackTeamMembers(locale);
  const featuredExperts = ["sebastien-doat", "florent-greth"]
    .map((slug) => teamSource.find((m) => m.slug === slug))
    .filter((m): m is StrapiTeamMember => Boolean(m));

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container">
          {/* SEO audit 16 mai 2026 — BreadcrumbList enriched from 2 to
              3 items so Google can build a proper rich-result chain
              (Iter Advisors → Services → DAF Externalisé). The middle
              `Services` segment points to the existing /services hub
              page (no orphan canonical). */}
          <Breadcrumb
            locale={locale}
            items={[
              {
                label:
                  locale === "fr"
                    ? "Services"
                    : locale === "en"
                      ? "Services"
                      : "Servicios",
                href: locale === "fr" ? "/services" : `/${locale}/services`,
              },
              { label: t.breadcrumbLabel },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start mt-4 sm:mt-6">
            <div data-speakable="true">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-2 leading-tight">
                {t.h1}
              </h1>
              {/* GAP 1 (2026-05-19) — freshness signal: visible dateModified for YMYL ranking */}
              {locale === "fr" && (
                <p className="text-xs text-muted-foreground mb-4 mt-1">
                  <time dateTime="2026-05-17">Mis à jour en mai 2026</time>
                </p>
              )}
              {/* SEO-IT-05 — E-E-A-T author block */}
              {locale === "fr" && (
                <AuthorByline
                  name="Sébastien Doat"
                  jobTitle="Co-fondateur, DAF externalisé senior"
                  linkedInUrl="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                  avatarUrl="/images/team/sebastien-doat.webp"
                  updateDate="2026-05-17"
                  locale={locale}
                />
              )}
              {t.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-muted-foreground leading-relaxed mb-4 ${
                    i === 0 ? "text-base sm:text-lg lg:text-xl text-foreground/80 font-medium" : "text-sm sm:text-base"
                  }`}
                >
                  {renderInlineMarkdownLinks(paragraph)}
                </p>
              ))}
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4 w-full sm:w-auto text-sm sm:text-base"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>

              {/* Trust badges (audit SEO D.3 / brief Bloc 1) — FR only */}
              {locale === "fr" && (
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-x-8 sm:gap-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex" aria-label="Note 5 sur 5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <svg
                          key={i}
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="text-iter-chartreuse sm:scale-110"
                          aria-hidden
                        >
                          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
                        </svg>
                      ))}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground">5/5</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">— 31 avis Trustfolio</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-5 opacity-70 overflow-x-auto">
                    {["logo-happyscribe", "logo-mitiga", "logo-surfe", "logo-ukio", "logo-yego"].map((logo) => {
                      const clientName = logo.replace("logo-", "").replace(/^./, (c) => c.toUpperCase());
                      return (
                        <div key={logo} className="relative h-5 sm:h-6 w-16 sm:w-20 grayscale shrink-0">
                          <Image
                            src={`/images/logos/${logo}.webp`}
                            alt={`Logo ${clientName} — client Iter Advisors`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 64px, 80px"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="relative hidden lg:flex items-center justify-center lg:sticky lg:top-28">
              <Image
                src="/images/stock/daf-hero.png"
                alt={
                  locale === "fr"
                    ? "DAF externalisé Iter Advisors — directeur administratif et financier analysant les tableaux de bord de performance"
                    : locale === "en"
                    ? "Iter Advisors fractional CFO reviewing financial performance dashboards"
                    : "CFO externalizado de Iter Advisors revisando cuadros de mando financieros"
                }
                width={560}
                height={400}
                className="rounded-2xl object-cover w-full max-w-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* P02 (2026-05-29) — "L'essentiel en 30 secondes": an extractable TL;DR
          rendered as the first structured block after the hero, to feed AI
          Overviews / LLM answer extraction. Rendered in every locale. */}
      {t.essential && (
        <section className="bg-background pt-2 pb-2">
          <div className="container max-w-3xl px-4 sm:px-6">
            <aside
              aria-label={t.essential.heading}
              className="rounded-3xl border border-border/60 bg-muted/30 p-5 sm:p-8"
            >
              <h2 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-4 sm:mb-5">
                {t.essential.heading}
              </h2>
              <ul className="space-y-2.5 sm:space-y-3">
                {t.essential.points.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                    <span>
                      <strong className="text-foreground font-semibold">
                        {p.label}
                        {locale === "fr" ? " :" : ":"}
                      </strong>{" "}
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}

      {/* Table of Contents — FR only (audit SEO C.1) */}
      {locale === "fr" && (
        <section className="bg-background pt-2 pb-10">
          <div className="container max-w-3xl">
            <DafTableOfContents />
          </div>
        </section>
      )}

      {/* SEO audit 16 mai 2026 — H2 order inverted: the definition
          section ("Qu'est-ce qu'un DAF externalisé ?") now comes
          first so the page answers the searcher's primary intent
          before pitching the brand. Brand H2 ("Iter Advisors, votre
          partenaire stratégique") drops to position 2. */}

      {/* What Is — primary intent answer */}
      <section id="comprendre" className="bg-muted/30 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr"
              ? "Comprendre"
              : locale === "en"
                ? "Understand"
                : "Comprender"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4 sm:mb-6 leading-tight">
            {t.whatIs.heading}
          </h2>
          {/* P07 (2026-05-29) — "Réponse rapide" extract (all locales). */}
          {t.quickAnswers?.comprendre && (
            <QuickAnswer text={t.quickAnswers.comprendre} locale={locale} />
          )}
          {/* P03 (2026-05-29) — canonical, extractable definition. The
              semantic <figure>/<dfn> isolates the one-sentence definition that
              answer engines quote, and the synonyms capture long-tail variants.
              Rendered before the prose in every locale. */}
          {t.definitionBox && (
            <figure className="my-5 sm:my-7 rounded-2xl border-l-4 border-iter-violet bg-iter-violet/5 p-5 sm:p-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                <dfn className="not-italic font-bold text-iter-violet">
                  {t.definitionBox.term}
                </dfn>
                {t.definitionBox.partOfSpeech && (
                  <span className="font-normal text-muted-foreground">
                    {" "}({t.definitionBox.partOfSpeech})
                  </span>
                )}
                {" — "}
                {t.definitionBox.definition}
              </p>
              <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {t.definitionBox.synonymsLabel}
                </span>
                {locale === "fr" ? " : " : ": "}
                {renderInlineMarkdownLinks(t.definitionBox.synonyms)}
              </figcaption>
            </figure>
          )}
          {t.whatIs.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderRichText(p)}
            </p>
          ))}
          {t.whatIs.subsections?.map((sub, i) => (
            <div key={i} className="mt-6 sm:mt-10">
              <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground mb-3 sm:mb-4">
                {sub.heading}
              </h3>
              {sub.content.map((p, j) => (
                <p
                  key={j}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4"
                >
                  {renderRichText(p)}
                </p>
              ))}
            </div>
          ))}

          {/* Comparison table (audit SEO C.2) — DAF externalisé vs interne en tableau Featured-Snippet-friendly */}
          {t.comparisonTable && (
            <div className="mt-6 sm:mt-10 -mx-4 sm:mx-0 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse bg-background border border-border/60 rounded-2xl overflow-hidden">
                {t.comparisonTable.caption && (
                  <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 px-3 sm:px-4">
                    {t.comparisonTable.caption}
                  </caption>
                )}
                <thead className="bg-iter-violet/5">
                  <tr>
                    {t.comparisonTable.headers.map((h, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="text-left font-semibold text-foreground p-2 sm:p-4 border-b border-border/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonTable.rows.map((row, ri) => (
                    <tr key={ri} className="even:bg-muted/30">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`p-2 sm:p-4 align-top border-b border-border/40 leading-relaxed ${
                            ci === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
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
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Partner — now position 2 (post-definition) per audit 16 mai 2026 */}
      <section id="partenaire" className="bg-background py-12 sm:py-16 lg:py-20 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr"
              ? "Votre partenaire"
              : locale === "en"
                ? "Your partner"
                : "Su socio"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.partnerSection.heading}
          </h2>
          {t.partnerSection.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Temps partagé (audit SEO A.1) — disposition asymétrique avec vidéo YouTube (brief Bloc 3) */}
      {t.tempsPartage && (
        <section id="temps-partage" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
              <div className="lg:col-span-7 px-4 sm:px-0">
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
                  {locale === "fr" ? "Synonymes" : locale === "en" ? "Synonyms" : "Sinónimos"}
                </span>
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
                  {t.tempsPartage.heading}
                </h2>
                {t.tempsPartage.content.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {/* Cette section rendait la chaîne brute : les **gras** et
                        les [liens](url) du contenu s'affichaient littéralement
                        (bug préexistant, visible en prod sur FR/EN/ES). */}
                    {renderRichText(p)}
                  </p>
                ))}
              </div>
              {locale === "fr" && (
                <div className="lg:col-span-5">
                  <DafYoutubeCard />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Advantages */}
      <section id="avantages" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              {locale === "fr"
                ? "Avantages"
                : locale === "en"
                  ? "Advantages"
                  : "Ventajas"}
            </span>
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
              {t.advantages.heading}
            </h2>
            {t.advantages.content.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {t.advantages.subsections?.map((sub, i) => {
              const icons = [TrendingDown, Zap, Eye, Network];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="group border border-border/50 rounded-2xl p-5 sm:p-8 hover:border-iter-violet/30 transition-all duration-300"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-iter-violet/20 transition-colors">
                    <Icon size={20} className="text-iter-violet sm:scale-110" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold font-heading mt-2 mb-2 sm:mb-3 group-hover:text-iter-violet transition-colors">
                    {sub.heading}
                  </h3>
                  {sub.content.map((p, j) => (
                    <p
                      key={j}
                      className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Inline CTA #1 (T-SEO-3pages 2026-06-07 — analyse_3_pages_html.pdf)
          Inserted after "Avantages" so visitors who scrolled past the bénéfices
          have a conversion path before the long "Pour qui / Missions / Tarifs"
          block. Distinct copy from CTAs #2 and #3 to avoid repetition fatigue. */}
      <section className="bg-background py-8 sm:py-10">
        <div className="container max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-iter-violet to-iter-dark p-6 sm:p-8 text-white text-center shadow-lg">
            <p className="text-base sm:text-lg font-semibold mb-3">
              {/* T3 (2026-06-30) — copy aligné avec ticket "Remonter sur
                  DAF externalisé". Mot-clé exact dans le H3 pour booster
                  la densité keyword sur la page (CTR 0.3 % → cible 1 %+). */}
              {locale === "fr"
                ? "Vous cherchez un DAF externalisé ?"
                : locale === "en"
                  ? "Looking for an outsourced CFO?"
                  : "¿Busca un CFO externalizado?"}
            </p>
            <p className="text-sm text-white/80 mb-5">
              {locale === "fr"
                ? "Prenez rendez-vous pour un diagnostic gratuit — 30 minutes avec un DAF senior, sans engagement."
                : locale === "en"
                  ? "Book a free diagnostic call — 30 minutes with a senior CFO, no commitment."
                  : "Reserve un diagnóstico gratuito — 30 minutos con un CFO senior, sin compromiso."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-sm hover:shadow-xl transition-all"
            >
              {locale === "fr"
                ? "Prendre rendez-vous"
                : locale === "en"
                  ? "Book a meeting"
                  : "Reservar una cita"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* For Whom (audit SEO Action 11) — long-tail capture per stade / secteur */}
      {t.forWhom && (
        <section id="pour-qui" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
          <div className="container max-w-4xl px-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              {locale === "fr" ? "Pour qui" : locale === "en" ? "For whom" : "Para quién"}
            </span>
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
              {t.forWhom.heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-10">
              {renderRichText(t.forWhom.intro)}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
              {t.forWhom.segments.map((seg, i) => (
                <div
                  key={i}
                  className="border border-border/50 rounded-2xl p-4 sm:p-6 lg:p-7 bg-card hover:border-iter-violet/30 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-semibold font-heading mb-2 sm:mb-3 text-foreground">
                    {seg.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {renderRichText(seg.content)}
                  </p>
                </div>
              ))}
            </div>
            {t.forWhom.outro && (
              <p className="text-muted-foreground leading-relaxed mt-10">
                {renderRichText(t.forWhom.outro)}
              </p>
            )}
          </div>
        </section>
      )}

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Missions */}
      <section id="missions" className="bg-muted/30 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr"
              ? "Nos missions"
              : locale === "en"
                ? "Our missions"
                : "Nuestras misiones"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4 sm:mb-6 leading-tight">
            {t.missions.heading}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">{t.missions.content[0]}</p>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {t.missions.content.slice(1).map((p, i) => {
              const missionIcons = [BarChart3, Wallet, Rocket, Settings, Compass];
              const MIcon = missionIcons[i % missionIcons.length];
              return (
                <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-border/50 bg-background">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center shrink-0">
                    <MIcon size={16} className="text-iter-dark sm:scale-110" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {locale === "fr" ? linkifyMissionText(p) : p}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      {/* P10 (2026-05-29) — visible 4-step onboarding sequence, giving humans
          and answer engines a numbered, extractable process. All locales.
          SEO-005 (2026-08-09) : le HowTo JSON-LD qui doublait ce bloc a été
          retiré (résultats enrichis HowTo supprimés par Google). Ces étapes
          restent la seule source, et elles sont visibles. */}
      <section id="deroulement" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-5xl px-4 sm:px-6">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              {locale === "fr" ? "Déroulement" : locale === "en" ? "How it works" : "Cómo funciona"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground leading-tight">
              {HOW_TO_COLLAB[locale].name}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {HOW_TO_COLLAB[locale].description}
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {HOW_TO_COLLAB[locale].steps.map((step, i) => (
              <li key={i} className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-6">
                <div className="text-xs font-bold uppercase tracking-wide text-iter-violet mb-2">
                  {(locale === "fr" ? "Étape " : locale === "en" ? "Step " : "Etapa ") + (i + 1)}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-2 leading-snug">
                  {step.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Inline CTA #2 (T-SEO-3pages 2026-06-07) — placed AFTER the "déroulement"
          steps so a visitor who's read the method has a low-friction
          conversion point before the long tarifs section. */}
      <section className="bg-muted/30 py-8 sm:py-10">
        <div className="container max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white border border-iter-violet/20 p-6 sm:p-8 text-center shadow-md">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-3">
              {locale === "fr"
                ? "Notre méthode vous parle ? Réservez votre diagnostic."
                : locale === "en"
                  ? "Method speaks to you? Book your diagnostic."
                  : "¿Le convence el método? Reserve su diagnóstico."}
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              {locale === "fr"
                ? "Un échange gratuit de 30 minutes pour cadrer vos priorités financières."
                : locale === "en"
                  ? "A free 30-minute call to scope your financial priorities."
                  : "Una llamada gratuita de 30 minutos para enmarcar sus prioridades financieras."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold text-sm hover:bg-iter-violet/90 hover:shadow-xl transition-all"
            >
              {locale === "fr"
                ? "Réserver un diagnostic gratuit"
                : locale === "en"
                  ? "Book a free diagnostic"
                  : "Reservar un diagnóstico gratuito"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section id="tarifs" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Tarifs" : locale === "en" ? "Pricing" : "Tarifas"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.pricing.heading}
          </h2>
          {/* SEO-IT-06 — Réponse directe pour AI Overviews (40-60 mots, factuel) */}
          {locale === "fr" && (
            <p className="text-sm sm:text-base bg-iter-violet/5 border-l-4 border-iter-violet rounded-r-lg px-4 py-3 mb-6 text-foreground/90 leading-relaxed">
              Un DAF externalisé coûte entre <strong>2 000 et 7 000 € HT/mois</strong> selon le volume d'intervention (2 à 8+ jours/mois). Le TJM moyen 2026 se situe entre <strong>750 et 1 250 € HT</strong>. À titre de comparaison, un DAF salarié revient à 8 300–17 750 €/mois charges comprises.
            </p>
          )}
          {t.pricing.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderRichText(p)}
            </p>
          ))}

          {/* Pricing table (audit SEO Action 5) — Featured-Snippet-friendly */}
          {t.pricingTable && (
            <div className="mt-6 sm:mt-8 -mx-4 sm:mx-0 overflow-x-auto">
              <table className="w-full text-xs sm:text-sm border-collapse bg-background border border-border/60 rounded-2xl overflow-hidden">
                <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 px-3 sm:px-4">
                  {t.pricingTable.caption}
                </caption>
                <thead className="bg-iter-violet/5">
                  <tr>
                    {[
                      locale === "fr" ? "Formule" : locale === "en" ? "Plan" : "Plan",
                      locale === "fr" ? "Volume" : locale === "en" ? "Volume" : "Volumen",
                      locale === "fr" ? "Tarif" : locale === "en" ? "Price" : "Precio",
                      locale === "fr" ? "Pour qui" : locale === "en" ? "For whom" : "Para quién",
                    ].map((h, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="text-left font-semibold text-foreground p-2 sm:p-4 border-b border-border/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.pricingTable.tiers.map((tier, ri) => (
                    <tr key={ri} className="even:bg-muted/30">
                      <th
                        scope="row"
                        className="p-2 sm:p-4 align-top border-b border-border/40 leading-relaxed font-semibold text-foreground"
                      >
                        {tier.name}
                      </th>
                      <td className="p-2 sm:p-4 align-top border-b border-border/40 leading-relaxed text-muted-foreground">
                        {tier.volume}
                      </td>
                      <td className="p-2 sm:p-4 align-top border-b border-border/40 leading-relaxed font-semibold text-foreground">
                        {tier.price}
                      </td>
                      <td className="p-2 sm:p-4 align-top border-b border-border/40 leading-relaxed text-muted-foreground">
                        {tier.audience}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {t.pricingTable.comparisonNote && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-4 sm:mt-6">
                  {renderRichText(t.pricingTable.comparisonNote)}
                </p>
              )}
            </div>
          )}

          {/* Featured client quote (audit SEO D.3) */}
          {t.featuredQuote && (
            <figure className="mt-6 sm:mt-10 p-5 sm:p-8 lg:p-10 rounded-3xl bg-iter-violet text-white relative overflow-hidden">
              <span aria-hidden className="absolute top-2 sm:top-4 left-3 sm:left-6 text-5xl sm:text-7xl leading-none font-heading text-iter-chartreuse/40 select-none">
                &ldquo;
              </span>
              <blockquote className="relative text-sm sm:text-base lg:text-lg font-medium leading-relaxed pl-4 sm:pl-6">
                {t.featuredQuote.quote}
              </blockquote>
              <figcaption className="mt-4 sm:mt-6 pl-4 sm:pl-6 flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-iter-chartreuse block">
                    {t.featuredQuote.author}
                  </span>
                  <span className="text-white/70">
                    {t.featuredQuote.role} — {t.featuredQuote.company}
                  </span>
                </div>
                {t.featuredQuote.companyLogo && (
                  <div className="relative h-7 w-28 ml-auto bg-white/10 rounded px-3 py-1 flex items-center">
                    <Image
                      src={t.featuredQuote.companyLogo}
                      alt={t.featuredQuote.company}
                      fill
                      className="object-contain p-1.5 brightness-0 invert"
                      sizes="112px"
                    />
                  </div>
                )}
              </figcaption>
              {t.featuredQuote.sourceUrl && (
                <a
                  href={t.featuredQuote.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 ml-6 inline-flex items-center gap-1.5 text-xs text-iter-chartreuse/80 hover:text-iter-chartreuse transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
                  </svg>
                  <span>{t.featuredQuote.sourceLabel ?? "Avis vérifié"}</span>
                </a>
              )}
            </figure>
          )}
        </div>
      </section>

      {/* Inline CTA #3 (T-SEO-3pages 2026-06-07) — last in-body CTA, placed
          right after the pricing grid where the visitor's question is most
          likely "OK, what does it cost for ME?". */}
      <section className="bg-background py-8 sm:py-10">
        <div className="container max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-iter-violet/10 to-iter-chartreuse/10 border border-iter-violet/20 p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-3">
              {/* T3 (2026-06-30) — copy aligné avec ticket "Remonter sur
                  DAF externalisé" : promesse explicite "sous 24h" pour
                  réduire la friction post-tarif. */}
              {locale === "fr"
                ? "Obtenez votre devis personnalisé sous 24h"
                : locale === "en"
                  ? "Get your personalised quote within 24h"
                  : "Reciba su presupuesto personalizado en 24h"}
            </p>
            <p className="text-sm text-muted-foreground mb-5">
              {locale === "fr"
                ? "Décrivez votre contexte DAF externalisé en 2 minutes — réponse d'un associé sous 24 h ouvrées."
                : locale === "en"
                  ? "Describe your outsourced CFO need in 2 minutes — partner reply within 24 business hours."
                  : "Describa su necesidad de CFO externalizado en 2 minutos — respuesta de un socio en 24 h hábiles."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-dark text-white font-semibold text-sm hover:bg-iter-violet hover:shadow-xl transition-all"
            >
              {locale === "fr"
                ? "Demander un devis"
                : locale === "en"
                  ? "Request a quote"
                  : "Solicitar un presupuesto"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* DAF vs Expert-Comptable (audit SEO A.3) */}
      {t.vsExpertComptable && (
        <section id="vs-expert-comptable" className="bg-muted/30 py-16 sm:py-24 lg:py-32 scroll-mt-24">
          <div className="container max-w-3xl px-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              {locale === "fr" ? "Complémentaire" : locale === "en" ? "Complementary" : "Complementario"}
            </span>
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
              {t.vsExpertComptable.heading}
            </h2>
            {t.vsExpertComptable.content.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* When To Hire */}
      <section id="quand" className="bg-muted/30 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Quand ?" : locale === "en" ? "When?" : "Cuando?"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.whenToHire.heading}
          </h2>
          {t.whenToHire.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderRichText(p)}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Profiles */}
      <section id="profils" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Profils" : locale === "en" ? "Profiles" : "Perfiles"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.profiles.heading}
          </h2>
          {t.profiles.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderRichText(p)}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Tools */}
      <section className="bg-muted/30 py-16 sm:py-24 lg:py-32">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Outils" : locale === "en" ? "Tools" : "Herramientas"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.tools.heading}
          </h2>
          {t.tools.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderRichText(p)}
            </p>
          ))}
          {locale === "fr" && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2">
              Découvrez notre sélection complète des{" "}
              <Link href="/ressources/blog/les-10-outils-pour-cfos-startup" className="text-iter-violet hover:underline underline-offset-2 font-medium">
                10 outils indispensables pour les CFO de startup
              </Link>
              , avec verdict d&apos;expert et benchmarks.
            </p>
          )}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Related Services */}
      <section className="bg-muted/30 py-16 sm:py-24 lg:py-32">
        <div className="container px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Nos expertises" : locale === "en" ? "Our expertise" : "Nuestras expertises"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-6 sm:mb-10 leading-tight">
            {locale === "fr" ? "Découvrez nos autres services" : locale === "en" ? "Discover our other services" : "Descubra nuestros otros servicios"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { title: locale === "fr" ? "DAF à temps partagé" : locale === "en" ? "Part-time CFO" : "CFO a tiempo compartido", href: locale === "fr" ? "/daf-externalise/temps-partage" : `/${locale}/daf-externalise/temps-partage`, icon: Network },
              { title: locale === "fr" ? "DAF de transition" : locale === "en" ? "Transition CFO" : "DAF de transición", href: locale === "fr" ? "/daf-externalise/transition" : `/${locale}/daf-externalise/transition`, icon: BarChart3 },
              { title: locale === "fr" ? "Métier de DAF" : locale === "en" ? "CFO role & skills" : "Profesión de DAF", href: locale === "fr" ? "/daf-externalise/metier" : `/${locale}/daf-externalise/metier`, icon: Shield },
              { title: locale === "fr" ? "Tarifs du DAF externalisé" : locale === "en" ? "CFO pricing" : "Tarifas DAF externalizado", href: locale === "fr" ? "/daf-externalise/tarifs" : `/${locale}/daf-externalise/tarifs`, icon: DollarSign },
              { title: locale === "fr" ? "DAF externalisé par secteur" : locale === "en" ? "CFO by industry" : "DAF externalizado por sector", href: locale === "fr" ? "/daf-externalise/secteurs" : `/${locale}/daf-externalise/secteurs`, icon: Compass },
              ...(locale === "fr" ? [{ title: "DRH externalisé", href: "/drh-externalise", icon: Users }] : []),
            ].map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group flex items-center gap-4 bg-background border border-border/50 rounded-2xl p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <service.icon size={20} className="text-iter-violet" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-iter-violet transition-colors">
                  {service.title}
                </span>
                <ArrowRight size={16} className="ml-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nos implantations */}
      <section className="bg-background py-16 sm:py-24 lg:py-32">
        <div className="container px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Nos implantations" : locale === "en" ? "Our locations" : "Nuestras sedes"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-3 sm:mb-4 leading-tight">
            {locale === "fr"
              ? "Un DAF externalis\u00e9 proche de chez vous"
              : locale === "en"
                ? "An outsourced CFO near you"
                : "Un CFO externalizado cerca de usted"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-10 max-w-2xl">
            {locale === "fr"
              ? "Iter Advisors intervient depuis ses bureaux de Barcelone, Paris et Toulouse. D\u00e9couvrez nos \u00e9quipes locales et les sp\u00e9cificit\u00e9s de chaque march\u00e9."
              : locale === "en"
                ? "Iter Advisors operates from its offices in Barcelona, Paris and Toulouse. Discover our local teams and the specificities of each market."
                : "Iter Advisors opera desde sus oficinas en Barcelona, Par\u00eds y Toulouse. Descubra nuestros equipos locales y las especificidades de cada mercado."}
          </p>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                city: "Barcelone",
                cityEn: "Barcelona",
                cityEs: "Barcelona",
                desc: locale === "fr" ? "Hub tech & startups internationales" : locale === "en" ? "Tech hub & international startups" : "Hub tech y startups internacionales",
                href: locale === "fr" ? "/daf-externalise-barcelone" : locale === "en" ? "/en/outsourced-cfo-barcelona" : "/es/cfo-externalizado-barcelona",
              },
              {
                city: "Paris",
                cityEn: "Paris",
                cityEs: "Paris",
                desc: locale === "fr" ? "Si\u00e8ges sociaux & scale-ups" : locale === "en" ? "Headquarters & scale-ups" : "Sedes sociales y scale-ups",
                href: locale === "fr" ? "/daf-externalise-paris" : locale === "en" ? "/en/outsourced-cfo-paris" : "/es/cfo-externalizado-paris",
              },
              {
                city: "Toulouse",
                cityEn: "Toulouse",
                cityEs: "Toulouse",
                desc: locale === "fr" ? "A\u00e9ronautique, sant\u00e9 & industrie" : locale === "en" ? "Aerospace, health & industry" : "Aeron\u00e1utica, salud e industria",
                href: locale === "fr" ? "/daf-externalise-toulouse" : locale === "en" ? "/en/outsourced-cfo-toulouse" : "/es/cfo-externalizado-toulouse",
              },
            ].map((loc, i) => (
              <Link
                key={i}
                href={loc.href}
                className="group flex flex-col gap-2 sm:gap-3 bg-muted/30 border border-border/50 rounded-2xl p-4 sm:p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <MapPin size={18} className="text-iter-violet sm:scale-110" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-base sm:text-lg text-foreground group-hover:text-iter-violet transition-colors">
                  {locale === "en" ? loc.cityEn : locale === "es" ? loc.cityEs : loc.city}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">{loc.desc}</span>
                <span className="text-xs sm:text-sm font-medium text-iter-violet flex items-center gap-1 mt-auto">
                  {locale === "fr" ? "D\u00e9couvrir" : locale === "en" ? "Learn more" : "Descubrir"}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />

      {/* Why Choose */}
      <section className="bg-background py-16 sm:py-24 lg:py-32">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr"
              ? "Pourquoi nous"
              : locale === "en"
                ? "Why us"
                : "Por qué nosotros"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.whyChoose.heading}
          </h2>
          {t.whyChoose.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Ressources connexes — FR only (EC-04) */}
      {locale === "fr" && (
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="container px-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              Ressources
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-8 sm:mb-10">
              En savoir plus sur le DAF externalisé
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  // SEO-DAF-03 (2026-08-09) — pointait vers l'ancienne URL
                  // fusionnée, redirigée en 301 depuis S2. La page pilier
                  // faisait donc transiter son lien le plus stratégique par
                  // une redirection. Cible finale directe.
                  href: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
                  title: "Combien coûte un DAF externalisé ? Tarifs 2026",
                  desc: "Grille tarifaire détaillée avec 3 formules et comparatif DAF salarié.",
                },
                {
                  href: "/ressources/blog/daf-externalise-vs-daf-salarie",
                  title: "DAF externalisé vs DAF salarié : le comparatif",
                  desc: "8 critères comparés pour choisir entre externalisation et recrutement.",
                },
                {
                  href: "/ressources/blog/quand-embaucher-daf-externalise-5-signes",
                  title: "5 signes que vous avez besoin d'un DAF externalisé",
                  desc: "Les signaux d'alerte qui doivent pousser à l'action.",
                },
                {
                  href: "/ressources/blog/daf-externalise-vs-expert-comptable",
                  title: "DAF externalisé vs expert-comptable : différences",
                  desc: "Comprendre la complémentarité entre les deux fonctions.",
                },
                {
                  href: "/ressources/glossaire/daf",
                  title: "Glossaire : DAF (Directeur Administratif et Financier)",
                  desc: "Définition complète, missions et compétences clés.",
                },
                {
                  href: "/ressources/cas-clients",
                  title: "Cas clients : 85 entreprises accompagnées",
                  desc: "Découvrez comment nos DAF accompagnent PME et startups.",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group flex flex-col gap-2 bg-muted/40 border border-border/50 rounded-2xl p-6 hover:border-iter-violet/30 transition-all duration-300"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-iter-violet transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  <ArrowRight size={14} className="mt-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="bg-muted/30 py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading">FAQ</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
            {t.faq.map((item, i) => (
              <FaqAccordionItem
                key={i}
                question={item.question}
                answer={item.answer}
                answerRich={item.answerRich}
              />
            ))}
          </div>
        </div>
      </section>

      {/* P15 (2026-05-29) — long-tail Q&A. Renders only once validated content
          is added to t.longTailFaq (nothing ships until fact-checked).

          SEO-003 (2026-08-09) — le bloc FR « Les questions que se posent les
          dirigeants » a été retiré : ses 15 questions reposaient toutes le
          contenu de la FAQ principale en vocabulaire « CFO fractionnel »
          (coût, missions, durée, outils, choix du prestataire, comparaison
          avec un temps plein…). La page servait 37 questions en deux blocs.
          Le mécanisme reste en place pour une future série réellement
          distincte. */}
      {t.longTailFaq && t.longTailFaq.items.length > 0 && (
        <LongTailFaqSection data={t.longTailFaq} />
      )}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(t.faq.map((item) => ({ question: item.question, answer: item.answer })))
          ),
        }}
      />

      {/* SEO-005 (2026-08-09) — schéma HowTo supprimé.

          Google a retiré les résultats enrichis HowTo de la recherche (annonce
          d'août 2023, puis suppression complète). Le balisage ne produisait
          donc plus rien, tandis que les étapes de collaboration restent
          lisibles en clair dans le corps de la page — qui est ce que lisent
          les moteurs de réponse. */}

      {/* D1 enrichi (2026-05-25) — Organization (FinancialService) avec founders,
          knowsAbout, alternateName, foundingDate, numberOfEmployees, taxID/vatID,
          contactPoint et YouTube dans sameAs. Séparé du bloc Service ci-dessous
          pour que Google identifie l'entité (KG) indépendamment de l'offre. */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // 2026-05-30: ProfessionalService is a better fit for a consulting
              // cabinet than FinancialService (which Schema.org positions for
              // banks / lenders / brokers). Merges with the site-wide
              // #organization entity declared in app/layout.tsx.
              "@type": "ProfessionalService",
              "@id": "https://www.iteradvisors.com/#organization",
              name: "Iter Advisors",
              alternateName: ["Iter Advisors S.L.", "Iter Advisors Cabinet DAF"],
              url: "https://www.iteradvisors.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.iteradvisors.com/images/logos/logo-hero.webp",
                width: 512,
                height: 512,
              },
              image: "https://www.iteradvisors.com/images/og-default.webp",
              description: "Cabinet de DAF externalisé et CFO à temps partagé pour PME, startups et scale-ups. Pilotage financier, levée de fonds, trésorerie. Présent à Barcelone, Paris et Toulouse.",
              slogan: "La meilleure version de votre direction financière",
              // SEO-002 (2026-08-09) — 2021 confirmé par la direction comme
              // année de création. Le balisage annonçait 2019 : c'est ce
              // qu'un moteur lit en priorité pour dater une entité.
              foundingDate: "2021",
              taxID: "B42960849",
              vatID: "ESB42960849",
              address: [{
                "@type": "PostalAddress",
                streetAddress: "Carrer Casp, 54, 5-1°",
                addressLocality: "Barcelona",
                postalCode: "08010",
                addressCountry: "ES",
              }],
              areaServed: [
                { "@type": "Country", name: "France" },
                { "@type": "Country", name: "Espagne" },
                { "@type": "City", name: "Paris" },
                { "@type": "City", name: "Toulouse" },
                { "@type": "City", name: "Barcelone" },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@iteradvisors.com",
                contactType: "customer service",
                areaServed: ["FR", "ES"],
                availableLanguage: ["French", "English", "Spanish"],
              },
              sameAs: [
                "https://www.linkedin.com/company/iter-advisors/",
                "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
                "https://www.youtube.com/@IterAdvisors1",
              ],
              knowsAbout: [
                "DAF externalisé",
                "Directeur financier externalisé",
                "CFO à temps partagé",
                "Fractional CFO",
                "Direction financière externalisée",
                "Levée de fonds",
                "Gestion de trésorerie",
                "M&A et due diligence financière",
                "Contrôle de gestion",
                "Pilotage financier startup",
                "DRH externalisé",
              ],
              numberOfEmployees: { "@type": "QuantitativeValue", value: 15 },
              founder: [
                {
                  "@type": "Person",
                  name: "Sébastien Doat",
                  jobTitle: "Associé fondateur - CFO & Investisseur",
                  sameAs: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
                },
                {
                  "@type": "Person",
                  name: "Benjamin Ziza",
                  jobTitle: "Associé fondateur - CFO & Investisseur",
                  sameAs: "https://www.linkedin.com/in/benjamin-ziza/",
                },
                {
                  "@type": "Person",
                  name: "Guillaume Rostand",
                  jobTitle: "Associé fondateur & CMO",
                  sameAs: "https://www.linkedin.com/in/rostand/",
                },
              ],
            }),
          }}
        />
      )}

      {/* Service schema avec AggregateOffer (2026-05-25) — affiche les fourchettes
          tarifaires 2 000-7 000 €/mois directement dans les snippets SERP.
          @type Service (pas FinancialService) pour éviter la collision avec l'entité
          Organization ci-dessus. provider → @id de l'Organization. */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://www.iteradvisors.com/daf-externalise#service-offer",
              serviceType: "DAF externalisé",
              name: "DAF Externalisé pour PME, Startups et Scale-ups",
              description: "Direction financière sur-mesure, à temps partagé ou en mission ponctuelle. Nos DAFs seniors (10+ ans d'expérience) accompagnent votre entreprise sur le pilotage financier, la levée de fonds, la trésorerie, le M&A et la due diligence. Opérationnels dès le premier jour.",
              provider: { "@id": "https://www.iteradvisors.com/#organization" },
              areaServed: [
                { "@type": "Country", name: "France" },
                { "@type": "Country", name: "Espagne" },
              ],
              url: "https://www.iteradvisors.com/daf-externalise",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "EUR",
                lowPrice: "2000",
                highPrice: "7000",
                offerCount: "3",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  priceType: "https://schema.org/MinimumPrice",
                  price: "2000",
                  priceCurrency: "EUR",
                  unitText: "MONTH",
                },
                offers: [
                  {
                    "@type": "Offer",
                    name: "Essentiel",
                    description: "2 à 3 jours par mois — pour startups early-stage (pré-seed à seed)",
                    price: "2000",
                    priceCurrency: "EUR",
                    priceSpecification: { "@type": "UnitPriceSpecification", price: "2000", priceCurrency: "EUR", unitText: "MONTH" },
                    availability: "https://schema.org/InStock",
                  },
                  {
                    "@type": "Offer",
                    name: "Croissance",
                    description: "4 à 6 jours par mois — pour PME en structuration ou scale-up Series A",
                    price: "4000",
                    priceCurrency: "EUR",
                    priceSpecification: { "@type": "UnitPriceSpecification", price: "4000", priceCurrency: "EUR", unitText: "MONTH" },
                    availability: "https://schema.org/InStock",
                  },
                  {
                    "@type": "Offer",
                    name: "Premium",
                    description: "8 jours et plus par mois — pour scale-up, levée de fonds, M&A",
                    price: "7000",
                    priceCurrency: "EUR",
                    priceSpecification: { "@type": "UnitPriceSpecification", price: "7000", priceCurrency: "EUR", unitText: "MONTH" },
                    availability: "https://schema.org/InStock",
                  },
                ],
              },
              // Review Snippet fix (2026-07-19) — aggregateRating + review[]
              // volontairement retirés de ce type Service. Google ne supporte
              // pas Review Snippets pour @type "Service" (rejet GSC "Type
              // d'objet non valide pour le champ <parent_node>", 6 éléments
              // non valides). Les avis sont désormais portés par le bloc
              // ProfessionalService (@id #organization) ci-dessus, seul type
              // supporté par Google pour cette page.
            }),
          }}
        />
      )}

      {/* SEO-005 (2026-08-09) — schéma FinancialService supprimé.

          Il décrivait une troisième fois la même activité : sans @id (donc
          nœud anonyme distinct de #organization), et avec exactement le même
          catalogue d'offres que le bloc Service ci-dessus — Essentiel 2 000 €,
          Croissance 4 000 €, Premium 7 000 €. Son propre commentaire notait
          déjà que Google ne supporte pas FinancialService pour les review
          snippets, seule raison de son ajout ; l'aggregateRating en avait été
          retiré en juillet. Il ne restait que le doublon. */}

      {/* GAP 2 (2026-05-19) — Person schemas for named CFO experts (E-E-A-T / YMYL signal).
          Sébastien Doat (founding partner) + Florent Greth (partner CFO).
          sameAs → LinkedIn profiles; knowsAbout → primary expertise signals.
          These structured entities confirm authorship & domain expertise to Google. */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.iteradvisors.com/#sebastien-doat",
                  name: "Sébastien Doat",
                  jobTitle: "Associé fondateur — DAF externalisé & CFO",
                  url: "https://www.iteradvisors.com/a-propos",
                  sameAs: [
                    "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    "@id": "https://www.iteradvisors.com/#organization",
                    name: "Iter Advisors",
                  },
                  knowsAbout: [
                    "DAF externalisé",
                    "CFO à temps partagé",
                    "direction financière externalisée",
                    "levée de fonds",
                    "reporting financier",
                    "budget prévisionnel",
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://www.iteradvisors.com/#florent-greth",
                  name: "Florent Greth",
                  jobTitle: "Partner & CFO",
                  url: "https://www.iteradvisors.com/a-propos",
                  sameAs: [
                    "https://www.linkedin.com/in/florent-greth-cfo-pennylane/",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    "@id": "https://www.iteradvisors.com/#organization",
                    name: "Iter Advisors",
                  },
                  knowsAbout: [
                    "DAF externalisé",
                    "CFO",
                    "finance startups",
                    "tableau de bord financier",
                    "contrôle de gestion",
                  ],
                },
              ],
            }),
          }}
        />
      )}

      {/* Review Schema removed (2026-05-29): self-serving Trustfolio reviews
          about Iter Advisors are ineligible for Google review rich results, so
          the page no longer emits Review structured data. The visible
          testimonial UI is unaffected. */}

      {/* Speakable Schema (content roadmap P1) — voice-search optimization.
        * Targets the hero block (H1 + intro paragraphs) for voice assistants
        * (Google Assistant, Alexa, Siri) to read aloud as a natural summary. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            speakableSchema({
              url:
                locale === "fr"
                  ? "/daf-externalise"
                  : locale === "en"
                    ? "/en/fractional-cfo"
                    : "/es/externalizacion-daf",
              cssSelectors: ["[data-speakable]"],
            }),
          ),
        }}
      />

      {/* Article schema (2026-05-25) — signal E-E-A-T avec 2 auteurs nommés
          (Sébastien Doat + Benjamin Ziza) et 5 citations de sources institutionnelles.
          @type Article (pas BlogPosting) pour une page pilier éditoriale + commerciale.
          Coexiste avec le Service schema via @id distincts dans le graph. */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "DAF Externalisé : votre direction financière sur-mesure",
              description: "Guide complet sur le DAF externalisé : définition, missions, tarifs 2026, comparaison avec DAF interne et expert-comptable. Par les experts d'Iter Advisors.",
              image: "https://www.iteradvisors.com/images/og-default.webp",
              datePublished: "2024-01-15T09:00:00+01:00",
              dateModified: "2026-05-17T09:00:00+02:00",
              author: [
                {
                  "@type": "Person",
                  name: "Sébastien Doat",
                  jobTitle: "Associé fondateur, CFO & Investisseur — Iter Advisors",
                  url: "https://www.iteradvisors.com/a-propos/sebastien-doat",
                  sameAs: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
                  knowsAbout: ["DAF externalisé", "Levée de fonds", "M&A", "Pilotage financier"],
                },
                {
                  "@type": "Person",
                  name: "Benjamin Ziza",
                  jobTitle: "Associé fondateur, CFO & Investisseur — Iter Advisors",
                  url: "https://www.iteradvisors.com/a-propos/benjamin-ziza",
                  sameAs: "https://www.linkedin.com/in/benjamin-ziza/",
                },
              ],
              publisher: { "@id": "https://www.iteradvisors.com/#organization" },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.iteradvisors.com/daf-externalise",
              },
              about: [
                { "@type": "Thing", name: "DAF externalisé" },
                { "@type": "Thing", name: "Directeur financier à temps partagé" },
                { "@type": "Thing", name: "Fractional CFO" },
              ],
              citation: [
                "https://www.dfcg.fr/",
                "https://www.insee.fr/",
                "https://www.bpifrance.fr/",
                "https://www.experts-comptables.fr/",
                "https://francedigitale.org/",
              ],
            }),
          }}
        />
      )}

      {/* Vos experts Iter Advisors (audit SEO D.1 / brief Bloc 7) — EEAT signal with named CFOs */}
      {locale === "fr" && featuredExperts.length > 0 && (
        <section id="experts" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
          <div className="container max-w-4xl px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
                Vos experts
              </span>
              <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-3 sm:mb-4 leading-tight">
                Vos experts Iter Advisors
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Nos associés DAF interviennent eux-mêmes sur les missions stratégiques et
                supervisent l&apos;ensemble des engagements.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {featuredExperts.map((expert) => {
                const photoUrl = strapiMediaUrl(expert.photo);
                const initials = `${expert.firstName?.[0] ?? ""}${
                  expert.lastName?.[0] ?? ""
                }`.toUpperCase();
                return (
                  <article
                    key={expert.slug}
                    className="border border-border/50 rounded-2xl p-4 sm:p-6 lg:p-7 bg-background hover:border-iter-violet/30 transition-colors flex items-center gap-3 sm:gap-5"
                  >
                    <div className="relative w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 shrink-0 rounded-2xl overflow-hidden bg-iter-violet/10">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          // SEO audit 16 mai 2026 — alt enriched with
                          // job title + brand so the image carries the
                          // expert's signal (was "Sébastien Doat" only).
                          alt={`${expert.firstName} ${expert.lastName} — ${expert.role}, Iter Advisors`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-iter-violet font-bold font-heading text-lg sm:text-xl">
                          {initials}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold font-heading">
                        {expert.firstName} {expert.lastName}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{expert.role}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-iter-violet bg-iter-violet/10 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 mb-2 sm:mb-3">
                        10+ ans d&apos;expérience CFO
                      </span>
                      {expert.linkedIn && (
                        <div>
                          <a
                            href={expert.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-iter-violet hover:underline"
                            aria-label={`Profil LinkedIn de ${expert.firstName} ${expert.lastName}`}
                          >
                            <Linkedin size={14} />
                            <span>LinkedIn</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* P17 (2026-05-29) — contextual internal links above the final CTA for
          visitors not ready to book. Every target was verified to resolve to a
          200 in one hop for the current locale (no redirect interception). ES
          uses the `recursos` path; EN keeps `ressources`. */}
      <section className="bg-background pb-12 sm:pb-16">
        <div className="container max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            {locale === "fr"
              ? "Pas encore prêt à échanger ?"
              : locale === "en"
                ? "Not ready to talk yet?"
                : "¿Aún no está listo para hablar?"}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {(locale === "fr"
              ? [
                  { href: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026", label: "Le guide complet des tarifs 2026" },
                  { href: "/ressources/blog/daf-externalise-vs-daf-salarie", label: "DAF externalisé vs DAF salarié" },
                  { href: "/ressources/cas-clients", label: "Voir nos cas clients" },
                ]
              : locale === "en"
                ? [
                    { href: "/en/ressources/blog/fractional-cfo-cost-services-2026", label: "The complete 2026 pricing guide" },
                    { href: "/en/ressources/blog/daf-externalise-vs-daf-salarie", label: "Fractional CFO vs in-house CFO" },
                    { href: "/en/ressources/cas-clients", label: "See our case studies" },
                  ]
                : [
                    { href: "/es/recursos/blog/cfo-externo-pymes-precio-2026", label: "La guía completa de tarifas 2026" },
                    { href: "/es/recursos/blog/daf-externalise-vs-daf-salarie", label: "CFO externalizado vs CFO interno" },
                    { href: "/es/recursos/casos-de-exito", label: "Ver nuestros casos de cliente" },
                  ]).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-iter-violet hover:underline"
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />

      {/* External references (CC-18) — EEAT signal via authoritative sources */}
      <References locale={locale} />

      {/* P06 (2026-05-29) — numbered sources for inline citations. Renders only
          once t.citations is populated during the content-validation pass. */}
      {t.citations && t.citations.length > 0 && (
        <Footnotes items={t.citations} locale={locale} />
      )}
    </PageLayout>
  );
}

/**
 * YouTube card — links to the @IterAdvisors1 channel (brief Bloc 3).
 * Uses a static visual with a play overlay, no embed (avoids cookies / heavy iframe).
 */
function DafYoutubeCard() {
  return (
    <a
      href="https://www.youtube.com/@IterAdvisors1"
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-3xl overflow-hidden border border-border/60 bg-background hover:border-iter-violet/40 hover:shadow-xl hover:shadow-iter-violet/10 transition-all"
      aria-label="Voir la chaîne YouTube Iter Advisors (nouvelle fenêtre)"
    >
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.42 0.28 275) 0%, oklch(0.58 0.22 285) 50%, oklch(0.42 0.28 275) 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, oklch(0.91 0.22 120 / 0.4), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <PlayCircle size={36} className="text-iter-violet ml-0.5" strokeWidth={1.5} />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded">
          YouTube
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-foreground group-hover:text-iter-violet transition-colors">
          Le DAF externalisé expliqué par nos associés
        </h3>
        <p className="text-sm text-muted-foreground mt-1.5">
          Découvrez en vidéo notre approche, nos méthodes et les retours de nos clients sur
          notre chaîne YouTube.
        </p>
      </div>
    </a>
  );
}

/**
 * Parse `**bold**` and `[text](url)` markdown-style markers in plain text
 * (FR prose only). Bolds semantic anchors and inlines internal links to
 * /daf-externalise/temps-partage and /daf-externalise/transition without
 * switching the content layer to HTML.
 */
function renderRichText(text: string): ReactNode {
  // Combined token: **bold** OR [link](url)
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      // **bold**
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-foreground">
          {match[1]}
        </strong>,
      );
    } else if (match[2] !== undefined && match[3] !== undefined) {
      // [text](url)
      parts.push(
        <Link
          key={`l-${key++}`}
          href={match[3]}
          className="text-iter-violet hover:underline underline-offset-2 font-medium"
        >
          {match[2]}
        </Link>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 0 ? text : parts;
}

/**
 * In-text internal-link helper for the FR missions section (audit SEO B.1).
 * First-occurrence-only matching — keeps prose readable, drives Google
 * to weight contextual links over end-of-page link blocks.
 */
function linkifyMissionText(text: string): ReactNode {
  const rules: { pattern: RegExp; href: string }[] = [
    { pattern: /gestion de trésorerie/i, href: "/services/previsionnel-tresorerie" },
    { pattern: /prévisionnel de trésorerie/i, href: "/services/previsionnel-tresorerie" },
    { pattern: /levée de fonds/i, href: "/services/accompagnement-levee-de-fond" },
    { pattern: /opérations de M&A/i, href: "/services/ma-due-diligence" },
    { pattern: /comptabilité analytique/i, href: "/services/controle-de-gestion-externalise" },
    { pattern: /dossier d['']investissement/i, href: "/ressources/blog/checklist-due-diligence-levee-de-fonds" },
  ];

  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;
  const usedHrefs = new Set<string>();

  while (remaining.length > 0) {
    const matches = rules
      .filter((r) => !usedHrefs.has(r.href))
      .map((r) => ({ rule: r, match: r.pattern.exec(remaining) }))
      .filter((x): x is { rule: { pattern: RegExp; href: string }; match: RegExpExecArray } => x.match !== null)
      .sort((a, b) => a.match.index - b.match.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0];
    const idx = first.match.index;
    const matched = first.match[0];

    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(
      <Link
        key={`link-${key++}`}
        href={first.rule.href}
        className="text-iter-violet hover:underline underline-offset-2 font-medium"
      >
        {matched}
      </Link>,
    );
    usedHrefs.add(first.rule.href);
    remaining = remaining.slice(idx + matched.length);
  }

  return parts;
}

/**
 * Table of contents — FR-only (audit SEO C.1).
 * Anchors target the section ids set on the FR DAF page. Improves dwell-time
 * and lets Google generate sitelinks under the SERP result.
 */
function DafTableOfContents() {
  const items = [
    { href: "#partenaire", label: "Iter Advisors, votre partenaire" },
    { href: "#comprendre", label: "Qu'est-ce qu'un DAF externalisé ?" },
    { href: "#temps-partage", label: "DAF externalisé ou DAF à temps partagé ?" },
    { href: "#avantages", label: "Les 5 avantages clés" },
    { href: "#pour-qui", label: "Pour qui et à quel stade ?" },
    { href: "#missions", label: "Missions principales" },
    { href: "#deroulement", label: "Déroulement d'une mission (4 étapes)" },
    { href: "#tarifs", label: "Grille tarifaire 2026" },
    { href: "#vs-expert-comptable", label: "DAF externalisé vs expert-comptable" },
    { href: "#quand", label: "Quand faire appel à un DAF externalisé ?" },
    { href: "#profils", label: "Profils de DAF externalisé" },
    { href: "#faq", label: "Questions fréquentes (FAQ)" },
  ];

  return (
    <nav
      aria-label="Sommaire de la page"
      className="border border-border/60 rounded-2xl p-6 lg:p-8 bg-muted/20"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-4 block">
        Sommaire
      </span>
      <ol className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={item.href} className="flex gap-3">
            <span className="text-iter-violet/50 font-mono text-xs w-5 shrink-0 mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={item.href}
              className="text-foreground hover:text-iter-violet transition-colors underline-offset-2 hover:underline"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* P07 — "Réponse rapide": a 40-70 word factual extract under a section H2,
   optimised for AI Overviews / LLM extraction. Data-driven via t.quickAnswers
   (keyed by section id) so it generalises the ad-hoc FR block on #tarifs. */
function QuickAnswer({ text, locale }: { text: string; locale: Locale }) {
  const label = locale === "fr" ? "Réponse rapide" : locale === "en" ? "Quick answer" : "Respuesta rápida";
  return (
    <div className="my-4 sm:my-5 rounded-r-lg border-l-4 border-iter-violet bg-iter-violet/5 px-4 py-3">
      <div className="text-xs font-bold uppercase tracking-wide text-iter-violet mb-1">{label}</div>
      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}

/* P15 — long-tail Q&A section rendered after the FAQ. Renders only when
   t.longTailFaq is populated with validated content, so nothing ships until
   the 15 answers (geo-longtail-content.md) have been fact-checked. */
function LongTailFaqSection({
  data,
}: {
  data: { heading: string; items: LongTailQA[] };
}) {
  return (
    <section id="questions-precises" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
      <div className="container max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-foreground mb-8 sm:mb-10 leading-tight">
          {data.heading}
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {data.items.map((item, i) => (
            <article key={i} className="border-t border-border/50 pt-5 sm:pt-6">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-2 sm:mb-3">
                {item.question}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* P06 — numbered sources for inline citations. Renders only when t.citations is
   populated; the inline [n] superscripts are added in the prose during the
   content-validation pass. */
function Footnotes({ items, locale }: { items: SourceCitation[]; locale: Locale }) {
  return (
    <section className="bg-background py-8 sm:py-10">
      <div className="container max-w-3xl px-4 sm:px-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
          {locale === "fr" ? "Sources" : locale === "en" ? "Sources" : "Fuentes"}
        </h2>
        <ol className="space-y-2 list-decimal pl-5 text-xs sm:text-sm text-muted-foreground">
          {items.map((c) => (
            <li key={c.id} id={`footnote-${c.id}`}>
              {c.text}{" "}
              <a href={c.url} target="_blank" rel="noopener" className="text-iter-violet hover:underline">
                ↗
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqAccordionItem({
  question,
  answer,
  answerRich,
}: {
  question: string;
  answer: string;
  answerRich?: FaqRichAnswer;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start sm:items-center justify-between p-4 sm:p-6 text-left font-semibold hover:text-iter-violet transition-colors gap-3"
      >
        <span className="text-sm sm:text-base">{question}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-foreground/30 transition-transform mt-0.5 sm:mt-0`}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {/* P12 (2026-05-29): the answer is rendered UNCONDITIONALLY in the DOM so
          it is present in the server-rendered HTML for Googlebot and answer
          engines. The collapse is pure CSS (grid-template-rows 0fr→1fr), which
          stays correct without JS and avoids the hydration flash / CLS a
          JS-gated (`{open && …}`) accordion would cause. */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {answerRich ? (
              <>
                {answerRich.intro && <p className="mb-3 sm:mb-4">{answerRich.intro}</p>}
                {answerRich.bullets && answerRich.bullets.length > 0 && (
                  <ul className="space-y-2 mb-3 sm:mb-4 list-none">
                    {answerRich.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 sm:gap-3">
                        <span aria-hidden className="mt-1.5 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                        <span>
                          <strong className="text-foreground font-semibold">{b.label} :</strong> {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {answerRich.outro && <p>{answerRich.outro}</p>}
              </>
            ) : (
              answer
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
