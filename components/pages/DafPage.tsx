"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, TrendingDown, Zap, Eye, Network, BarChart3, Wallet, Rocket, Settings, Compass, Clock, Users, Wrench, DollarSign, MapPin, Linkedin, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem, StrapiTeamMember } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { BOOKING_URL } from "@/lib/navigation";
import { getDafContent, type FaqRichAnswer } from "@/lib/content/daf";
import { faqPageSchema, serviceSchema, howToSchema, articleSchema, speakableSchema } from "@/lib/schemas";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
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
        text: "Notre DAF rejoint votre équipe et prend en main les sujets clés : tableaux de bord, prévisionnel de trésorerie, relations investisseurs et expert-comptable.",
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
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start mt-4 sm:mt-6">
            <div data-speakable="true">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4 sm:mb-6 leading-tight">
                {t.h1}
              </h1>
              {t.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-muted-foreground leading-relaxed mb-4 ${
                    i === 0 ? "text-base sm:text-lg lg:text-xl text-foreground/80 font-medium" : "text-sm sm:text-base"
                  }`}
                >
                  {paragraph}
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
                    {["logo-happyscribe", "logo-mitiga", "logo-surfe", "logo-ukio", "logo-yego"].map((logo) => (
                      <div key={logo} className="relative h-5 sm:h-6 w-16 sm:w-20 grayscale shrink-0">
                        <Image
                          src={`/images/logos/${logo}.webp`}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative hidden lg:flex items-center justify-center lg:sticky lg:top-28">
              <Image
                src="/images/bg/daf-section.webp"
                alt={locale === "fr" ? "DAF externalisé - pilotage financier" : locale === "en" ? "Outsourced CFO - financial management" : "CFO externalizado - gestion financiera"}
                width={560}
                height={400}
                className="rounded-2xl object-contain w-full max-w-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents — FR only (audit SEO C.1) */}
      {locale === "fr" && (
        <section className="bg-background pt-2 pb-10">
          <div className="container max-w-3xl">
            <DafTableOfContents />
          </div>
        </section>
      )}

      {/* Partner */}
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

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* What Is */}
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
          {t.whatIs.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {locale === "fr" ? renderRichText(p) : p}
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
                  {locale === "fr" ? renderRichText(p) : p}
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
                    {p}
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
              {locale === "fr" ? renderRichText(t.forWhom.intro) : t.forWhom.intro}
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
                    {locale === "fr" ? renderRichText(seg.content) : seg.content}
                  </p>
                </div>
              ))}
            </div>
            {t.forWhom.outro && (
              <p className="text-muted-foreground leading-relaxed mt-10">
                {locale === "fr" ? renderRichText(t.forWhom.outro) : t.forWhom.outro}
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
      <section id="tarifs" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
            {locale === "fr" ? "Tarifs" : locale === "en" ? "Pricing" : "Tarifas"}
          </span>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold font-heading mb-4 sm:mb-6 leading-tight">
            {t.pricing.heading}
          </h2>
          {t.pricing.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {locale === "fr" ? renderRichText(p) : p}
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
                  {locale === "fr"
                    ? renderRichText(t.pricingTable.comparisonNote)
                    : t.pricingTable.comparisonNote}
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
              {locale === "fr" ? renderRichText(p) : p}
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
              {locale === "fr" ? renderRichText(p) : p}
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
              {p}
            </p>
          ))}
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
              { title: locale === "fr" ? "Accompagnement levée de fonds" : locale === "en" ? "Fund-raising support" : "Acompañamiento captación de fondos", href: locale === "fr" ? "/services/accompagnement-levee-de-fond" : `/${locale}/services/fund-raising-support`, icon: Rocket },
              { title: locale === "fr" ? "Contrôle de gestion externalisé" : locale === "en" ? "Outsourced management control" : "Control de gestión externalizado", href: locale === "fr" ? "/services/controle-de-gestion-externalise" : `/${locale}/services/outsourced-management-control`, icon: BarChart3 },
              { title: locale === "fr" ? "Prévisionnel de trésorerie" : locale === "en" ? "Cash flow forecast" : "Previsión de tesorería", href: locale === "fr" ? "/services/previsionnel-tresorerie" : `/${locale}/services/cash-flow-forecast`, icon: Wallet },
              { title: locale === "fr" ? "M&A & Due Diligence" : "M&A & Due Diligence", href: locale === "fr" ? "/services/ma-due-diligence" : `/${locale}/services/ma-due-diligence`, icon: Compass },
              { title: locale === "fr" ? "Comptabilité externalisée" : locale === "en" ? "Outsourced accounting" : "Externalización contable", href: locale === "fr" ? "/services/comptabilite-externalisation" : `/${locale}/services/outsource-your-accounting`, icon: DollarSign },
              { title: locale === "fr" ? "DRH externalisé" : locale === "en" ? "Outsourced HR Director" : "DRH externalizado", href: locale === "fr" ? "/drh-externalise" : `/${locale}/drh-externalise`, icon: Settings },
              { title: locale === "fr" ? "DAF à temps partagé" : locale === "en" ? "Part-time CFO" : "CFO a tiempo compartido", href: locale === "fr" ? "/daf-externalise/temps-partage" : `/${locale}/daf-externalise/temps-partage`, icon: Network },
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

      {/* Trustfolio Reviews (audit P0 — visible HTML reviews for ProfessionalService schema) */}
      {locale === "fr" && t.trustfolioReviews && t.trustfolioReviews.length > 0 && (
        <section id="avis-clients" className="bg-background py-16 sm:py-24 lg:py-32 scroll-mt-24">
          <div className="container max-w-4xl px-4 sm:px-6">
            <div className="mb-8 sm:mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 sm:mb-3 block">
                Avis clients
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-3 sm:mb-4 leading-tight">
                Témoignages de nos clients
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Découvrez les retours d'expérience de PME et startups ayant travaillé avec Iter Advisors.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {t.trustfolioReviews.map((review, i) => (
                <article
                  key={i}
                  className="border border-border/50 rounded-2xl p-4 sm:p-7 bg-muted/30 hover:border-iter-violet/30 transition-colors"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  {/* Rating stars */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((j) => (
                        <svg
                          key={j}
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill={j < review.rating ? "currentColor" : "none"}
                          className="text-iter-chartreuse sm:scale-110"
                          aria-hidden
                        >
                          <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L10 14.9l-5.25 2.76 1-5.86L1.5 7.66l5.9-.86L10 1.5z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground ml-2">{review.rating}/5</span>
                  </div>

                  {/* Review quote */}
                  <blockquote className="text-xs sm:text-sm text-foreground leading-relaxed mb-4 sm:mb-6 italic">
                    "{review.quote}"
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {review.author}
                      <meta itemProp="author" content={review.author} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.role} — {review.company}
                    </p>
                    <meta itemProp="reviewRating" content={String(review.rating)} />
                    <meta itemProp="datePublished" content={review.date} />
                    <meta itemProp="reviewBody" content={review.quote} />
                  </div>

                  {/* Link to Trustfolio */}
                  {review.url && (
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-iter-violet hover:underline mt-4"
                      aria-label={`Voir l'avis complet de ${review.author} sur Trustfolio`}
                    >
                      Voir sur Trustfolio
                      <ArrowRight size={12} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(t.faq.map((item) => ({ question: item.question, answer: item.answer })))
          ),
        }}
      />

      {/* HowTo Schema (T-7) — collaboration steps for AI answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToSchema({
              name: HOW_TO_COLLAB[locale].name,
              description: HOW_TO_COLLAB[locale].description,
              steps: HOW_TO_COLLAB[locale].steps,
              totalTime: "P14D",
            }),
          ),
        }}
      />

      {/* Service + AggregateRating Schema (CC-05) */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceSchema({
                name: "DAF externalisé",
                description:
                  "Cabinet de DAF externalisé pour PME, startups et scale-ups. CFO senior dès 2 jours/mois, opérationnel J+1. Trésorerie, reporting, contrôle de gestion, levée de fonds et M&A.",
                url: "/daf-externalise",
                serviceType: "Direction financière externalisée",
                areaServed: ["FR", "ES"],
                offers: [
                  {
                    name: "Essentiel",
                    description: "2-3 jours par mois — pilotage trésorerie + reporting mensuel",
                    price: "2000",
                    priceCurrency: "EUR",
                  },
                  {
                    name: "Croissance",
                    description: "4-6 jours par mois — DAF opérationnel multi-missions",
                    price: "4000",
                    priceCurrency: "EUR",
                  },
                  {
                    name: "Premium",
                    description: "8 jours et plus par mois — DAF sponsor levée / M&A",
                    price: "7000",
                    priceCurrency: "EUR",
                  },
                ],
              }),
            ),
          }}
        />
      )}

      {/* ProfessionalService + AggregateRating + Review Schema (audit P0 — Trustfolio 5/5 31 reviews for SERP rich snippets) */}
      {locale === "fr" && t.trustfolioReviews && t.trustfolioReviews.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Iter Advisors — DAF externalisé",
              description:
                "Cabinet de DAF externalisé pour PME, startups et scale-ups. CFO senior dès 2 jours/mois, opérationnel J+1. Spécialiste de la levée de fonds, trésorerie et reporting financier.",
              url: "https://www.iteradvisors.com/daf-externalise",
              image: "https://www.iteradvisors.com/images/bg/daf-section.webp",
              priceRange: "EUR 2000-8000",
              areaServed: [
                { "@type": "Country", name: "FR" },
                { "@type": "Country", name: "ES" }
              ],
              provider: {
                "@type": "Organization",
                name: "Iter Advisors",
                url: "https://www.iteradvisors.com",
              },
              review: t.trustfolioReviews.map((review) => ({
                "@type": "Review",
                author: {
                  "@type": "Person",
                  name: review.author
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: String(review.rating),
                  bestRating: "5",
                  worstRating: "1"
                },
                datePublished: review.date,
                reviewBody: review.quote,
                url: review.url,
                itemReviewed: {
                  "@type": "Service",
                  name: "DAF externalisé",
                  provider: {
                    "@type": "Organization",
                    name: "Iter Advisors"
                  }
                }
              }))
            }),
          }}
        />
      )}

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

      {/* Article Schema (audit V2 R-9) — pillar is also a long-form guide.
        * Helps Google + AI engines understand the dual nature: a Service page
        * (commercial intent) AND an editorial guide (informational intent). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: t.h1,
              description: t.intro[0] ?? t.meta.description,
              url:
                locale === "fr"
                  ? "/daf-externalise"
                  : locale === "en"
                    ? "/en/fractional-cfo"
                    : "/es/externalizacion-daf",
              datePublished: "2024-09-01",
              dateModified: new Date().toISOString().split("T")[0],
              authorName: "Iter Advisors",
              imageSrc: "/images/bg/daf-section.webp",
            }),
          ),
        }}
      />

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
                          alt={`${expert.firstName} ${expert.lastName}`}
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

      <CTASection locale={locale} />

      {/* External references (CC-18) — EEAT signal via authoritative sources */}
      <References locale={locale} />
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
        className="w-full flex items-start sm:items-center justify-between p-4 sm:p-6 text-left font-semibold hover:text-iter-violet transition-colors gap-3"
      >
        <span className="text-sm sm:text-base">{question}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-foreground/30 transition-transform mt-0.5 sm:mt-0`}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
