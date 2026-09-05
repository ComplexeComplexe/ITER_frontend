"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Building2, Users, Briefcase, Phone, BarChart3, Wallet, Rocket, Compass, Network, Star } from "lucide-react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { getContactPath } from "@/lib/navigation";
import { dafClusterHref, serviceHref } from "@/lib/path-localization";
import { getDafLocalContent, DafLocalCity } from "@/lib/content/daf-local";
import { faqPageSchema } from "@/lib/schemas";
import { TRUSTFOLIO_REVIEWS, TRUSTFOLIO_REVIEW_COUNT } from "@/lib/content/trustfolio-reviews";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import CaseProofLinks from "@/components/CaseProofLinks";

export default function DafLocalPage({
  locale,
  city,
  cmsNavigation,
}: {
  locale: Locale;
  city: DafLocalCity;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getDafLocalContent(city, locale);
  const contactPath = getContactPath(locale);

  /* JSON-LD schemas */
  const faqSchema = faqPageSchema(t.faq);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `https://www.iteradvisors.com/${
      locale === "fr"
        ? `daf-externalise-${city}`
        : locale === "en"
          ? `outsourced-cfo-${city === "barcelone" ? "barcelona" : city}`
          : `cfo-externalizado-${city === "barcelone" ? "barcelona" : city}`
    }#localbusiness`,
    name: `Iter Advisors - ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    description: t.meta.description,
    url: `https://www.iteradvisors.com/${
      locale === "fr"
        ? `daf-externalise-${city}`
        : locale === "en"
          ? `outsourced-cfo-${city === "barcelone" ? "barcelona" : city}`
          : `cfo-externalizado-${city === "barcelone" ? "barcelona" : city}`
    }`,
    email: "contact@iteradvisors.com",
    // Iter Advisors S.L. — registered office: Carrer Casp, 54, 5-1°,
    // 08010 Barcelona (NIF B42960849). Paris and Toulouse are
    // operational offices without a public registered address.
    address:
      city === "barcelone"
        ? {
            "@type": "PostalAddress",
            streetAddress: "Carrer Casp, 54, 5-1°",
            addressLocality: "Barcelona",
            postalCode: "08010",
            addressCountry: "ES",
          }
        : {
            "@type": "PostalAddress",
            addressLocality: city === "paris" ? "Paris" : "Toulouse",
            addressCountry: "FR",
          },
    areaServed: {
      "@type": "Place",
      name:
        city === "barcelone"
          ? "Barcelona, Spain"
          : city === "paris"
            ? "Paris, Ile-de-France"
            : "Toulouse, Occitanie",
    },
    priceRange: "€€",
    openingHours: "Mo-Fr 09:00-18:00",
    image: "https://www.iteradvisors.com/images/og-logo.png",
    // Review-snippet fix (2026-05-29): self-serving aggregateRating + Review
    // nodes removed. These were Trustfolio (third-party) reviews about Iter
    // Advisors presented as the local business's own rating — ineligible for
    // Google review rich results. The visible Trustfolio cards below are UI only.
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.h1,
    description: t.meta.description,
    provider: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: "https://www.iteradvisors.com",
    },
    areaServed: {
      "@type": "Place",
      name: city === "barcelone" ? "Barcelona" : city === "paris" ? "Paris" : "Toulouse",
    },
    serviceType: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "CFO externalizado",
  };

  const dafPath = locale === "fr" ? "/daf-externalise" : locale === "en" ? "/en/fractional-cfo" : "/es/externalizacion-daf";
  const dafLabel = locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "CFO externalizado";

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {city !== "toulouse" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: dafLabel, href: dafPath },
              { label: t.breadcrumbLabel },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-iter-chartreuse" size={20} />
                <span className="text-iter-chartreuse font-medium text-sm uppercase tracking-wider">
                  {city === "barcelone" ? "Barcelona" : city === "paris" ? "Paris" : "Toulouse"}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
                {t.h1}
              </h1>
              {t.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href={locale === "fr" && city === "toulouse" ? "/contact#toulouse" : contactPath}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/daf-section.webp"
                alt={t.h1}
                width={600}
                height={400}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {t.sections.map((section, idx) => (
        <section
          key={idx}
          className={`py-16 ${idx % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
        >
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold font-heading text-foreground mb-8">
              {section.heading}
            </h2>
            {section.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {locale === "fr" && city === "toulouse" && <>
        <section className="py-12 bg-muted/30"><div className="container max-w-4xl"><h2 className="text-2xl font-bold mb-4">Choisir le périmètre adapté</h2><div className="flex flex-wrap gap-5 text-iter-violet underline"><Link href="/daf-externalise/tarifs">Comparer les formules</Link><Link href="/fractional-cfo-startups">DAF pour startups et SaaS</Link><Link href="/daf-externalise/industrie">Pilotage d'une activité industrielle</Link><Link href="/daf-externalise">DAF externalisé pour PME</Link></div><p className="mt-6 text-muted-foreground">Les cas ci-dessous décrivent des missions conduites ailleurs. Ils permettent d'examiner les livrables et la méthode, sans constituer des références locales à Toulouse.</p></div></section>
        <CaseProofLinks slugs={["opti-digital-structuration-financement", "seasonly-marge-par-canal-bfr"]} heading="Examiner notre travail sur d'autres missions" />
      </>}
      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-foreground text-center mb-12">
            {locale === "fr" ? "Questions fréquentes" : locale === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}
          </h2>
          <div className="space-y-4">
            {t.faq.map(item => (
              <details key={item.question} className="group border border-border rounded-xl p-5">
                <summary className="cursor-pointer text-lg font-semibold">{item.question}</summary>
                <p className="pt-4 text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Autres implantations - cross-linking */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
            {locale === "fr" ? "Nos autres implantations" : locale === "en" ? "Our other locations" : "Nuestras otras sedes"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { key: "barcelone", cityFr: "Barcelone", cityEn: "Barcelona", cityEs: "Barcelona", hrefFr: "/daf-externalise-barcelone", hrefEn: "/en/outsourced-cfo-barcelona", hrefEs: "/es/cfo-externalizado-barcelona" },
              { key: "paris", cityFr: "Paris", cityEn: "Paris", cityEs: "Paris", hrefFr: "/daf-externalise-paris", hrefEn: "/en/outsourced-cfo-paris", hrefEs: "/es/cfo-externalizado-paris" },
              { key: "toulouse", cityFr: "Toulouse", cityEn: "Toulouse", cityEs: "Toulouse", hrefFr: "/daf-externalise-toulouse", hrefEn: "/en/outsourced-cfo-toulouse", hrefEs: "/es/cfo-externalizado-toulouse" },
            ] as const).filter((loc) => loc.key !== city).map((loc, i) => (
              <Link
                key={i}
                href={locale === "fr" ? loc.hrefFr : locale === "en" ? loc.hrefEn : loc.hrefEs}
                className="group flex items-center gap-4 bg-background border border-border/50 rounded-2xl p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <MapPin size={20} className="text-iter-violet" />
                </div>
                <div>
                  <span className="font-semibold text-foreground group-hover:text-iter-violet transition-colors block">
                    {locale === "fr"
                      ? `DAF externalis\u00e9 ${loc.cityFr}`
                      : locale === "en"
                        ? `Outsourced CFO ${loc.cityEn}`
                        : `CFO externalizado ${loc.cityEs}`}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {locale === "fr" ? "D\u00e9couvrir" : locale === "en" ? "Learn more" : "Descubrir"}
                  </span>
                </div>
                <ArrowRight size={16} className="ml-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services associes */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
            {locale === "fr" ? "Services associ\u00e9s" : locale === "en" ? "Related services" : "Servicios asociados"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              // SEO-ULT \u00a74b (2026-08-15) \u2014 ces cinq href \u00e9taient compos\u00e9s \u00e0 la
              // main en pr\u00e9fixant le slug anglais par la locale. En espagnol,
              // /es/services/fund-raising-support & co n'existent pas : les
              // trois pages villes ES partaient en 308, et les trois pages EN
              // faisaient de m\u00eame sur le lien DAF \u00e0 temps partag\u00e9.
              { title: locale === "fr" ? "Lev\u00e9e de fonds" : locale === "en" ? "Fund-raising" : "Levantamiento de fondos", href: serviceHref("accompagnement-levee-de-fond", locale), icon: Rocket },
              { title: locale === "fr" ? "Contr\u00f4le de gestion" : locale === "en" ? "Management control" : "Control de gesti\u00f3n", href: serviceHref("controle-de-gestion-externalise", locale), icon: BarChart3 },
              { title: locale === "fr" ? "Gestion de tr\u00e9sorerie" : locale === "en" ? "Cash flow management" : "Gesti\u00f3n de tesorer\u00eda", href: serviceHref("previsionnel-tresorerie", locale), icon: Wallet },
              { title: locale === "fr" ? "M&A & Due Diligence" : "M&A & Due Diligence", href: locale === "fr" ? "/services/ma-due-diligence" : `/${locale}/services/ma-due-diligence`, icon: Compass },
              { title: locale === "fr" ? "DAF \u00e0 temps partag\u00e9" : locale === "en" ? "Part-time CFO" : "DAF a tiempo compartido", href: dafClusterHref("temps-partage", locale), icon: Network },
              // MAILLAGE-T2 (2026-08-31) — les pages villes ne liaient ni le
              // pilier ni les satellites tarifs/métier/transition : Google ne
              // pouvait pas les rattacher au cluster. Les href passent par
              // dafClusterHref, donc chaque locale reçoit ses propres URL ;
              // en EN/ES, tarifs et secteurs retombent sur le pilier — la
              // déduplication ci-dessous évite les doublons de carte.
              { title: locale === "fr" ? "DAF externalis\u00e9" : locale === "en" ? "Fractional CFO" : "CFO externalizado", href: dafClusterHref("", locale), icon: BarChart3 },
              { title: locale === "fr" ? "Tarifs DAF externalis\u00e9" : locale === "en" ? "Fractional CFO pricing" : "Tarifas CFO externalizado", href: dafClusterHref("tarifs", locale), icon: Wallet },
              { title: locale === "fr" ? "M\u00e9tier de DAF" : locale === "en" ? "The CFO role" : "Funciones del CFO", href: dafClusterHref("metier", locale), icon: Briefcase },
              { title: locale === "fr" ? "DAF de transition" : locale === "en" ? "Interim CFO" : "CFO de transici\u00f3n", href: dafClusterHref("transition", locale), icon: Users },
              { title: locale === "fr" ? "DAF externalis\u00e9 par secteur" : locale === "en" ? "Fractional CFO by industry" : "CFO externalizado por sector", href: dafClusterHref("secteurs", locale), icon: Building2 },
            ].filter((service, i, arr) => arr.findIndex((x) => x.href === service.href) === i).map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group flex items-center gap-4 bg-muted/30 border border-border/50 rounded-2xl p-6 hover:border-iter-violet/30 transition-all duration-300"
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

      {/* Testimonials / Avis clients vérifiés */}
      <section className="py-20 bg-muted/30" aria-labelledby="testimonials-heading">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4">
              {locale === "fr"
                ? "Avis clients vérifiés"
                : locale === "en"
                  ? "Verified customer reviews"
                  : "Opiniones de clientes verificadas"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === "fr" ? (
                <>
                  <strong>Note 5/5 sur {TRUSTFOLIO_REVIEW_COUNT} avis authentifiés</strong> par{" "}
                  <a
                    href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
                    rel="noopener nofollow"
                    target="_blank"
                    className="text-iter-violet hover:underline font-semibold"
                  >
                    Trustfolio
                  </a>
                </>
              ) : locale === "en" ? (
                <>
                  <strong>5/5 rating on {TRUSTFOLIO_REVIEW_COUNT} verified reviews</strong> from{" "}
                  <a
                    href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
                    rel="noopener nofollow"
                    target="_blank"
                    className="text-iter-violet hover:underline font-semibold"
                  >
                    Trustfolio
                  </a>
                </>
              ) : (
                <>
                  <strong>Calificación 5/5 en {TRUSTFOLIO_REVIEW_COUNT} opiniones verificadas</strong> de{" "}
                  <a
                    href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
                    rel="noopener nofollow"
                    target="_blank"
                    className="text-iter-violet hover:underline font-semibold"
                  >
                    Trustfolio
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="space-y-6">
            {TRUSTFOLIO_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-background border border-border rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-iter-chartreuse text-iter-chartreuse" />
                  ))}
                </div>
                <blockquote className="text-lg text-muted-foreground italic mb-4 leading-relaxed">
                  "{review.reviewBody}"
                </blockquote>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">
                      {review.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {review.jobTitle} {locale === "fr" ? "chez" : "at"} <strong>{review.company}</strong>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.datePublished).toLocaleDateString(locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
              rel="noopener nofollow"
              target="_blank"
              className="inline-flex items-center gap-2 text-iter-violet hover:text-iter-violet/80 font-semibold transition-colors"
            >
              {locale === "fr"
                ? `Voir les ${TRUSTFOLIO_REVIEW_COUNT} avis sur Trustfolio →`
                : locale === "en"
                  ? `View all ${TRUSTFOLIO_REVIEW_COUNT} reviews on Trustfolio →`
                  : `Ver las ${TRUSTFOLIO_REVIEW_COUNT} opiniones en Trustfolio →`}
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
