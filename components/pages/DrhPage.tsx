import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { ArrowRight, TrendingUp, BarChart3, Wallet, Rocket, Compass, Users } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import { getDrhContent } from "@/lib/content/drh";
import type { StrapiDrhServiceCategory, CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import DrhServicesGrid from "@/components/DrhServicesGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

/**
 * Parse `[[text|url]]` link syntax in content strings.
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

function mapStrapiCategories(
  categories: StrapiDrhServiceCategory[] | undefined | null
): {
  categoryName: string;
  services: {
    title: string;
    description: string;
    tier1: boolean;
    tier2: boolean;
    tier3: boolean;
    tier4: boolean;
    isAddOn: boolean;
  }[];
}[] | null {
  if (!categories?.length) return null;
  return categories.map((cat) => ({
    categoryName: cat.categoryName,
    services: (cat.services ?? []).map((s) => ({
      title: s.title,
      description: s.description,
      tier1: !!s.tier1,
      tier2: !!s.tier2,
      tier3: !!s.tier3,
      tier4: !!s.tier4,
      isAddOn: !!s.isAddOn,
    })),
  }));
}

export default function DrhPage({
  locale,
  strapiCategories,
  cmsNavigation,
}: {
  locale: Locale;
  strapiCategories?: StrapiDrhServiceCategory[] | null;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getDrhContent(locale);
  const contactPath = getContactPath(locale);
  const gridCategories = mapStrapiCategories(strapiCategories ?? null);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>

      {/* ─── R3: @graph JSON-LD — ProfessionalService + FAQPage + BreadcrumbList ─── */}
      {locale === "fr" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://www.iteradvisors.com/drh-externalise#service",
                  name: "DRH Externalisé — Iter Advisors",
                  provider: {
                    "@type": "Organization",
                    "@id": "https://www.iteradvisors.com/#organization",
                    name: "Iter Advisors",
                    url: "https://www.iteradvisors.com",
                    logo: "https://www.iteradvisors.com/images/logos/logo-hero.png",
                    sameAs: [
                      "https://www.linkedin.com/company/iter-advisors/",
                      "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
                    ],
                  },
                  description:
                    "Cabinet de DRH externalisé pour PME et startups. Direction RH à temps partagé dès 2 500 €/mois. Recrutement, conformité, gestion des talents. Paris, Toulouse, Barcelone.",
                  url: "https://www.iteradvisors.com/drh-externalise",
                  areaServed: [
                    { "@type": "City", name: "Paris" },
                    { "@type": "City", name: "Toulouse" },
                    { "@type": "City", name: "Barcelone" },
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Formules DRH Externalisé",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        name: "Essentiel",
                        description: "2 jours/mois — Audit, recrutement, conformité",
                        price: "2500",
                        priceCurrency: "EUR",
                      },
                      {
                        "@type": "Offer",
                        name: "Croissance",
                        description: "4 jours/mois — + Onboarding, talents, rémunération",
                        price: "4500",
                        priceCurrency: "EUR",
                      },
                      {
                        "@type": "Offer",
                        name: "Premium",
                        description: "8+ jours/mois — + SIRH, culture, formation",
                        price: "8000",
                        priceCurrency: "EUR",
                      },
                    ],
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5",
                    reviewCount: "31",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: t.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      // Strip [[text|url]] markers for plain-text schema value
                      text: item.answer.replace(/\[\[(.+?)\|.+?\]\]/g, "$1"),
                    },
                  })),
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Accueil",
                      item: "https://www.iteradvisors.com/",
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Services",
                      item: "https://www.iteradvisors.com/services",
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: "DRH Externalisé",
                      item: "https://www.iteradvisors.com/drh-externalise",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      )}

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {t.h1}
            </h1>
            {t.intro.map((paragraph, i) => (
              <p
                key={i}
                className={`leading-relaxed mb-3 ${
                  i === 0
                    ? "text-base sm:text-lg text-foreground/80 font-medium"
                    : "text-sm sm:text-base text-muted-foreground"
                }`}
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t.ctaButton}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={contactPath}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                {locale === "fr" ? "Nous contacter" : locale === "en" ? "Contact us" : "Contáctenos"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Hero illustration ─── */}
      <section className="bg-background pt-0 pb-8 sm:pb-12">
        <div className="container max-w-3xl">
          <Image
            src="/images/stock/drh-hero.png"
            alt={
              locale === "fr"
                ? "DRH externalisé Iter Advisors — responsable RH en visioconférence avec son équipe pour piloter les ressources humaines"
                : locale === "en"
                  ? "Iter Advisors outsourced HR Director — HR manager on video call managing people operations"
                  : "Director de RRHH externalizado Iter Advisors — responsable de RRHH en videoconferencia gestionando el equipo"
            }
            width={800}
            height={450}
            className="rounded-2xl object-cover w-full"
            loading="lazy"
          />
        </div>
      </section>

      {/* ─── Partner section ─── */}
      <section className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Votre partenaire" : locale === "en" ? "Your partner" : "Su socio"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6">
            {t.partnerSection.heading}
          </h2>
          {t.partnerSection.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderLinkedText(p)}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* ─── What Is ─── */}
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Comprendre" : locale === "en" ? "Understand" : "Comprender"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6">
            {t.whatIs.heading}
          </h2>
          {t.whatIs.content.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {renderLinkedText(p)}
            </p>
          ))}
        </div>
      </section>

      {/* ─── R1.1 — 5 avantages clés ─── */}
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Avantages" : locale === "en" ? "Benefits" : "Ventajas"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8 sm:mb-10">
            {t.advantages.heading}
          </h2>
          <ol className="space-y-6">
            {t.advantages.items.map((item, i) => (
              <li key={i} className="flex gap-4 sm:gap-5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-iter-chartreuse/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-iter-dark">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {renderLinkedText(item.text)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── R1.2 — Pour qui et à quel stade ? ─── */}
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Pour qui ?" : locale === "en" ? "Who is it for?" : "¿Para quién?"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
            {t.forWho.heading}
          </h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted/40">
                <tr>
                  {t.forWho.table.headers.map((h, i) => (
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
                {t.forWho.table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                    {row.map((cell, ci) => (
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
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-3 block">
              {locale === "fr"
                ? "Nos expertises"
                : locale === "en"
                  ? "Our expertise"
                  : "Nuestras expertises"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4">
              {t.servicesGridHeading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {locale === "fr"
                ? "Cliquez sur une catégorie pour découvrir le détail des services inclus dans chaque offre."
                : locale === "en"
                  ? "Click on a category to discover the services included in each offer."
                  : "Haga clic en una categoría para descubrir los servicios incluidos en cada oferta."}
            </p>
          </div>
          <DrhServicesGrid
            categories={gridCategories}
            tierLabels={t.tierLabels}
            addOnLabel={t.addOnLabel}
          />
        </div>
      </section>

      {/* ─── R1.3 — Grille tarifaire ─── */}
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Tarifs" : locale === "en" ? "Pricing" : "Tarifas"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
            {t.pricing.heading}
          </h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60 mb-6">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted/40">
                <tr>
                  {t.pricing.table.headers.map((h, i) => (
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
                {t.pricing.table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`p-3 sm:p-4 align-top border-b border-border/40 leading-relaxed ${
                          ci === 0
                            ? "font-semibold text-foreground"
                            : ci === row.length - 1
                              ? "font-semibold text-iter-violet whitespace-nowrap"
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
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 italic">
            {t.pricing.footnote}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2">
            {t.pricing.comparison}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
            {t.pricing.engagement}
          </p>
          {t.pricing.closingText && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {renderLinkedText(t.pricing.closingText)}
            </p>
          )}
        </div>
      </section>

      {/* ─── R1.4 — DRH externalisé vs DRH interne ─── */}
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Comparatif" : locale === "en" ? "Comparison" : "Comparativa"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
            {t.vsInternal.heading}
          </h2>
          <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60 mb-6">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted/40">
                <tr>
                  {t.vsInternal.table.headers.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60 ${
                        i === 0 ? "whitespace-nowrap" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.vsInternal.table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`p-3 sm:p-4 align-top border-b border-border/40 leading-relaxed ${
                          ci === 0
                            ? "font-semibold text-foreground whitespace-nowrap"
                            : ci === 1
                              ? "text-iter-violet font-medium"
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
          {t.vsInternal.closingText && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {renderLinkedText(t.vsInternal.closingText)}
            </p>
          )}
        </div>
      </section>

      {/* ─── R1.5 — Témoignages RH ─── */}
      <section className="bg-iter-violet/5 py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Ils parlent de nous"
              : locale === "en"
                ? "Client stories"
                : "Nuestros clientes"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8 sm:mb-10">
            {t.testimonials.heading}
          </h2>
          <div className="space-y-5 sm:space-y-6 mb-8">
            {t.testimonials.items.map((item, i) => (
              <figure
                key={i}
                className="bg-background rounded-2xl p-5 sm:p-6 border border-border/50"
              >
                <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    — {item.author}, {item.role}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.company}, {item.city}
                    {item.formula ? ` · ${item.formula}` : ""}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          {t.testimonials.ctaText && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {renderLinkedText(t.testimonials.ctaText)}
            </p>
          )}
        </div>
      </section>

      {/* ─── Related Services ─── */}
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-24">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-3 block">
            {locale === "fr"
              ? "Nos expertises"
              : locale === "en"
                ? "Our expertise"
                : "Nuestras expertises"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-8 sm:mb-10">
            {locale === "fr"
              ? "Découvrez nos autres services"
              : locale === "en"
                ? "Discover our other services"
                : "Descubra nuestros otros servicios"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                title:
                  locale === "fr"
                    ? "DAF externalisé"
                    : locale === "en"
                      ? "Outsourced CFO"
                      : "DAF externalizado",
                href:
                  locale === "fr" ? "/daf-externalise" : `/${locale}/daf-externalise`,
                icon: TrendingUp,
              },
              {
                title:
                  locale === "fr"
                    ? "Accompagnement levée de fonds"
                    : locale === "en"
                      ? "Fund-raising support"
                      : "Acompañamiento captación de fondos",
                href:
                  locale === "fr"
                    ? "/services/accompagnement-levee-de-fond"
                    : `/${locale}/services/fund-raising-support`,
                icon: Rocket,
              },
              {
                title:
                  locale === "fr"
                    ? "Contrôle de gestion externalisé"
                    : locale === "en"
                      ? "Outsourced management control"
                      : "Control de gestión externalizado",
                href:
                  locale === "fr"
                    ? "/services/controle-de-gestion-externalise"
                    : `/${locale}/services/outsourced-management-control`,
                icon: BarChart3,
              },
              {
                title:
                  locale === "fr"
                    ? "Prévisionnel de trésorerie"
                    : locale === "en"
                      ? "Cash flow forecast"
                      : "Previsión de tesorería",
                href:
                  locale === "fr"
                    ? "/services/previsionnel-tresorerie"
                    : `/${locale}/services/cash-flow-forecast`,
                icon: Wallet,
              },
              {
                title: "M&A & Due Diligence",
                href:
                  locale === "fr"
                    ? "/services/ma-due-diligence"
                    : `/${locale}/services/ma-due-diligence`,
                icon: Compass,
              },
              {
                title:
                  locale === "fr"
                    ? "DRH à temps partagé"
                    : locale === "en"
                      ? "Part-time HR Director"
                      : "DRH a tiempo compartido",
                href:
                  locale === "fr"
                    ? "/drh-externalise/temps-partage"
                    : `/${locale}/drh-externalise/temps-partage`,
                icon: Users,
              },
            ].map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group flex items-center gap-4 bg-background border border-border/50 rounded-2xl p-5 sm:p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <service.icon size={20} className="text-iter-violet" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-foreground group-hover:text-iter-violet transition-colors text-sm sm:text-base">
                  {service.title}
                </span>
                <ArrowRight
                  size={16}
                  className="ml-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />

      {/* ─── R2: FAQ — 10 questions, native <details>/<summary> ─── */}
      <section className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8 sm:mb-10">
            {locale === "fr"
              ? "Questions fréquentes"
              : locale === "en"
                ? "Frequently Asked Questions"
                : "Preguntas frecuentes"}
          </h2>
          <div className="space-y-3">
            {t.faq.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border/60 bg-background"
              >
                <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                  <h3 className="text-base sm:text-lg font-heading m-0">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="text-iter-violet shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>{renderLinkedText(item.answer)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
