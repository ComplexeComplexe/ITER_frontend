import { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";

const t = {
  fr: {
    title: "Cas Clients DAF | Iter Advisors",
    description: "Cas clients DAF externalisé : témoignages PME, startups, scale-ups. 5/5 sur Trustfolio (31 avis vérifiés). Résultats réels, croissance garantie.",
    breadcrumb: "Cas clients",
  },
  en: {
    title: "Case Studies CFO | Iter Advisors",
    description: "CFO outsourcing case studies: testimonials from SMEs, startups, scale-ups. 5/5 on Trustfolio (31 verified reviews). Real results, growth guaranteed.",
    breadcrumb: "Case Studies",
  },
  es: {
    title: "Casos de Estudio DAF | Iter Advisors",
    description: "Casos de estudio DAF externalizado: testimonios de PYMEs, startups, scale-ups. 5/5 en Trustfolio (31 opiniones verificadas). Resultados reales y verificables.",
    breadcrumb: "Casos de Estudio",
  },
};

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: t.fr.title,
  description: t.fr.description,
  path: "/ressources/cas-clients",
});

const breadcrumbsByLocale: Record<Locale, { label: string; href: string }> = {
  fr: { label: "Ressources", href: "/ressources" },
  en: { label: "Resources", href: "/en/ressources" },
  es: { label: "Recursos", href: "/es/recursos" },
};

function CasClientsPageContent({ locale }: { locale: Locale }) {
  const bc = breadcrumbsByLocale[locale];
  const content = t[locale];

  return (
    <PageLayout locale={locale}>
      {/* Hero Section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: bc.label, href: bc.href },
              { label: content.breadcrumb },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              {locale === "fr"
                ? "Nos cas clients"
                : locale === "en"
                ? "Our case studies"
                : "Nuestros casos de estudio"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "fr"
                ? "Découvrez comment nous avons accompagné PME, startups et scale-ups dans leur croissance financière."
                : locale === "en"
                ? "Discover how we have supported SMEs, startups and scale-ups in their financial growth."
                : "Descubra cómo hemos apoyado a PYMEs, startups y scale-ups en su crecimiento financiero."}
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <div className="bg-background">
        <CaseStudiesPage locale={locale} cmsNavigation={undefined} />
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted/30">
        <TestimonialsListingPage locale={locale} cmsNavigation={undefined} asSection />
      </div>

      <CTASection locale={locale} />
    </PageLayout>
  );
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <CasClientsPageContent locale="fr" />;
}
