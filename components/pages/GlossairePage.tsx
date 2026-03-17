import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import GlossaryLetterIndex from "@/components/GlossaryLetterIndex";
import type { StrapiGlossaryTerm, CmsNavItem } from "@/lib/strapi";

const content: Record<
  Locale,
  {
    resourcesLabel: string;
    resourcesHref: string;
    breadcrumbLabel: string;
    h1: string;
    intro: string;
    comingSoon: string;
  }
> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Glossaire",
    h1: "Glossaire financier",
    intro:
      "Retrouvez les définitions des termes clés de la finance d'entreprise, du pilotage financier et de la gestion de trésorerie.",
    comingSoon:
      "Notre glossaire est en cours de construction. Revenez bientôt pour découvrir nos définitions financières.",
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Glossary",
    h1: "Financial glossary",
    intro:
      "Find definitions of key terms in corporate finance, financial management and cash management.",
    comingSoon:
      "Our glossary is under construction. Come back soon to discover our financial definitions.",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Glosario",
    h1: "Glosario financiero",
    intro:
      "Encuentre las definiciones de los términos clave de las finanzas corporativas, la gestión financiera y la gestión de tesorería.",
    comingSoon:
      "Nuestro glosario está en construcción. Vuelva pronto para descubrir nuestras definiciones financieras.",
  },
};

export default function GlossairePage({
  locale,
  terms = [],
  cmsNavigation,
}: {
  locale: Locale;
  terms?: StrapiGlossaryTerm[];
  cmsNavigation?: CmsNavItem[];
}) {
  const t = content[locale];
  const hasTerms = terms && terms.length > 0;

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
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      {hasTerms ? (
        <section className="bg-background py-12 lg:py-24">
          <div className="container max-w-3xl">
            <GlossaryLetterIndex terms={terms} locale={locale} />
          </div>
        </section>
      ) : (
        <section className="bg-background py-24 lg:py-16">
          <div className="container max-w-3xl text-center">
            <div className="border border-border/50 rounded-2xl p-12">
              <p className="text-muted-foreground leading-relaxed">
                {t.comingSoon}
              </p>
            </div>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
