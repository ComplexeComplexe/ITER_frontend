import Link from "next/link";
import { parityHref } from "@/lib/locale-route-map";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema } from "@/lib/schemas/editorial";

import { Locale } from "@/lib/i18n";
import { LeyBeckhamContent } from "@/lib/content/ley-beckham";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import type { CmsNavItem } from "@/lib/static-content";

const breadcrumbLabels: Record<Locale, { services: string; servicesHref: string; page: string }> = {
  fr: { services: "Services", servicesHref: "/services", page: "Loi Beckham" },
  en: { services: "Services", servicesHref: "/en/services", page: "Beckham Law" },
  es: { services: "Servicios", servicesHref: "/es/services", page: "Ley Beckham" },
};

/* Audit SEO 2026-10-15 (2.1) — cette page vise la demande (Modelo 149) ; le
 * guide complet porte la requête « ley beckham ». On relie les deux pour que
 * Google comprenne lequel fait autorité, au lieu de les mettre en concurrence. */
const relatedGuides: Record<Locale, { title: string; links: { source: string; label: string }[] }> = {
  fr: {
    title: "Pour comprendre le régime",
    links: [
      { source: "/ressources/fiscalite/beckham-law", label: "Le guide complet de la loi Beckham" },
      { source: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite", label: "Les conditions d'éligibilité en détail" },
      { source: "/ressources/blog/loi-beckham-economie-impot-simulation", label: "La méthode pour comparer avec l'IRPF classique" },
    ],
  },
  en: {
    title: "Understand the regime first",
    links: [
      { source: "/ressources/fiscalite/beckham-law", label: "The complete guide to the Beckham Law" },
      { source: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite", label: "Eligibility conditions in detail" },
      { source: "/ressources/blog/loi-beckham-economie-impot-simulation", label: "How to compare it with standard IRPF" },
    ],
  },
  es: {
    title: "Para entender el régimen",
    links: [
      { source: "/ressources/fiscalite/beckham-law", label: "La guía completa de la Ley Beckham" },
      { source: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite", label: "Los requisitos en detalle" },
      { source: "/ressources/blog/loi-beckham-economie-impot-simulation", label: "Cómo compararla con el IRPF general" },
    ],
  },
};

interface LeyBeckhamPageProps {
  locale: Locale;
  content: LeyBeckhamContent;
  cmsNavigation?: CmsNavItem[];
}

export default function LeyBeckhamPage({ locale, content: t, cmsNavigation }: LeyBeckhamPageProps) {
  const bc = breadcrumbLabels[locale];
  const author = { name: "Sébastien Doat", slug: "sebastien-doat" };
  const dateModified = "2026-09-06";
  const dateLabel = { fr: "6 septembre 2026", en: "6 September 2026", es: "6 de septiembre de 2026" }[locale];
  const pageSchema = editorialWebPageSchema({
    path: `${locale === "fr" ? "" : `/${locale}`}/services/ley-beckham`,
    name: t.hero.h1, description: t.meta.description, locale, author,
    datePublished: "2026-09-05", dateModified,
  });

  /* FAQ structured data */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* Hero */}
      <section className="site-hero bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[{ label: bc.services, href: bc.servicesHref }, { label: bc.page }]}
          />
          <h1
            className="text-3xl lg:text-5xl font-bold font-heading text-foreground max-w-3xl mb-6"
          >
            {t.hero.h1}
          </h1>
          <PageByline locale={locale} author={author} dateModified={dateModified} dateLabel={dateLabel} className="mb-6" />
          <p
            className="text-lg text-muted-foreground max-w-2xl"
          >
            {t.hero.intro}
          </p>
          <nav aria-labelledby="beckham-guides" className="site-card mt-8 max-w-2xl rounded-2xl border-l-4 border-iter-violet bg-iter-violet/5 p-6">
            <p id="beckham-guides" className="mb-3 font-semibold text-foreground">{relatedGuides[locale].title}</p>
            <ul className="space-y-2">
              {relatedGuides[locale].links.map(link => (
                <li key={link.source}>
                  <Link className="text-iter-violet underline" href={parityHref(link.source, locale)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Sections */}
      {t.sections.map((section, i) => (
        <section key={i} className="site-section bg-background py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-6">
              {section.heading}
            </h2>
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground">
              {section.content.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-background py-8">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-bold mb-4">{t.sourcesTitle}</h2>
          {locale === "es" && <p className="mb-4"><Link className="text-iter-violet underline" href={parityHref("/ressources/blog/regimes-fiscaux-france-vs-espagne", locale)}>Comparar la fiscalidad de Francia y España</Link></p>}
          <ul className="space-y-3">{t.sources.map(source => <li key={source.href}><a className="text-iter-violet underline" href={source.href}>{source.label}</a></li>)}</ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="site-section bg-muted py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-12">
            {t.faq.title}
          </h2>
          <div className="space-y-8">
            {t.faq.items.map((item, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer items-center gap-4 font-semibold text-foreground hover:text-primary">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary/10 rounded group-open:bg-primary/20 transition-colors">
                    <span className="text-primary text-lg group-open:hidden">+</span>
                    <span className="text-primary text-lg hidden group-open:block">−</span>
                  </span>
                  {item.question}
                </summary>
                <div className="mt-4 ml-10 text-muted-foreground prose max-w-none">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
