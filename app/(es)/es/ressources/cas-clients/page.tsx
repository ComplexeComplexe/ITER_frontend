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
  es: {
    title: "Casos de Estudio DAF | Iter Advisors",
    description: "Casos de estudio DAF externalizado: testimonios de PYMEs, startups, scale-ups. 5/5 en Trustfolio (31 opiniones verificadas). Resultados reales y verificables.",
    breadcrumb: "Casos de Estudio",
  },
};

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: t.es.title,
  description: t.es.description,
  path: "/ressources/cas-clients",
});

const breadcrumbsByLocale: Record<Locale, { label: string; href: string }> = {
  es: { label: "Recursos", href: "/es/recursos" },
  fr: { label: "Ressources", href: "/ressources" },
  en: { label: "Resources", href: "/en/ressources" },
};

function CasClientsPageContent({ locale }: { locale: Locale }) {
  const bc = breadcrumbsByLocale[locale];
  const content = locale === "es" ? t.es : null;

  if (!content) return null;

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
              Nuestros casos de estudio
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Descubra cómo hemos apoyado a PYMEs, startups y scale-ups en su crecimiento financiero.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <div className="bg-background">
        <CaseStudiesPage locale="es" cmsNavigation={undefined} />
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted/30">
        <TestimonialsListingPage locale="es" cmsNavigation={undefined} asSection />
      </div>

      <CTASection locale="es" />
    </PageLayout>
  );
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <CasClientsPageContent locale="es" />;
}
