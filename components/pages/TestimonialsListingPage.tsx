import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const content: Record<Locale, {
  resourcesLabel: string;
  resourcesHref: string;
  breadcrumbLabel: string;
  h1: string;
  intro: string;
}> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Cas clients",
    h1: "Nos cas clients",
    intro: "Découvrez comment Iter Advisors accompagne ses clients au quotidien. Témoignages et retours d'expérience de dirigeants qui nous font confiance.",
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Case studies",
    h1: "Our case studies",
    intro: "Discover how Iter Advisors supports its clients every day. Testimonials and feedback from business leaders who trust us.",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Casos prácticos",
    h1: "Nuestros casos prácticos",
    intro: "Descubra cómo Iter Advisors acompaña a sus clientes en el día a día. Testimonios y experiencias de directivos que confían en nosotros.",
  },
};

export default function TestimonialsListingPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = content[locale];

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.resourcesLabel, href: t.resourcesHref },
              { label: t.breadcrumbLabel },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">{t.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
