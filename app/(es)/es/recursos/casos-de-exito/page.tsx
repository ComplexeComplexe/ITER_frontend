import { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";

const t = {
  es: {
    title: "Casos de Éxito DAF | Iter Advisors",
    description: "Casos de éxito DAF externalizado: testimonios de PYMEs, startups, scale-ups. 5/5 en Trustfolio (31 opiniones verificadas). Resultados reales y verificables.",
    breadcrumb: "Casos de Éxito",
  },
};

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: t.es.title,
  description: t.es.description,
  path: "/es/recursos/casos-de-exito",
  localizedPaths: {
    fr: "/ressources/cas-clients",
    en: "/en/ressources/cas-clients",
    es: "/es/recursos/casos-de-exito",
  },
});

const breadcrumbsByLocale: Record<Locale, { label: string; href: string }> = {
  es: { label: "Recursos", href: "/es/recursos" },
  fr: { label: "Ressources", href: "/ressources" },
  en: { label: "Resources", href: "/en/ressources" },
};

function CasosDeExitoPageContent({ locale }: { locale: Locale }) {
  const bc = breadcrumbsByLocale[locale];
  const content = locale === "es" ? t.es : null;

  if (!content) return null;

  return (
    <PageLayout locale={locale}>
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
              Nuestros casos de éxito
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Descubra cómo hemos apoyado a PYMEs, startups y scale-ups en su crecimiento financiero.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-background">
        <CaseStudiesPage locale="es" cmsNavigation={undefined} asSection />
      </div>

      <div className="bg-muted/30">
        <TestimonialsListingPage locale="es" cmsNavigation={undefined} asSection />
      </div>

      <CTASection locale="es" />
    </PageLayout>
  );
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <CasosDeExitoPageContent locale="es" />;
}
