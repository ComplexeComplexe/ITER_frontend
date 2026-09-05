import Link from "next/link";
import { getGlossaryPages } from "@/lib/content/glossary-entries";
import { glossaryHref } from "@/lib/path-localization";
import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import GlossaryLetterIndex from "@/components/GlossaryLetterIndex";
import type { StrapiGlossaryTerm, CmsNavItem } from "@/lib/static-content";

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
      "Find definitions of key terms in corporate finance, financial management and cash management. Our glossary covers the essential vocabulary used by CFOs, founders, and investors — from EBITDA, cash burn, and working capital to cap table, runway, SaaS metrics like MRR and ARR, and fundraising instruments such as BSPCE and SAFE notes. Each definition is written by a practising CFO and contextualised for startups and growth-stage companies.",
    comingSoon:
      "Our glossary is under construction. Come back soon to discover our financial definitions.",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/recursos",
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
  // Les fiches détaillées n'existent qu'en français et, depuis TRAFIC-01, en
  // anglais pour trois d'entre elles. L'espagnol n'en a aucune.
  const fichesDetaillees = locale === "es" ? [] : getGlossaryPages(locale);
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

      {/* SEO-AUD-0824 §3 (2026-08-24) — cinq fiches détaillées du glossaire
          n'avaient aucun lien entrant sur tout le site : le hub affichait ses
          termes avec leur définition, sans jamais mener aux fiches.

          TRAFIC-01 (2026-08-31) — trois fiches ont désormais une version
          anglaise servie ; le hub anglais les liste à son tour. L'espagnol
          n'en a toujours aucune. */}
      {fichesDetaillees.length > 0 && (
        <section className="bg-muted/20 py-12 lg:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-3">
              {locale === "fr" ? "Fiches détaillées" : "In-depth entries"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {locale === "fr"
                ? "Certaines notions méritent plus qu'une définition : mode de calcul, seuils d'alerte et leviers d'action."
                : "Some terms deserve more than a definition: how they are calculated, when they signal trouble, and what to do about them."}
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
              {fichesDetaillees.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={glossaryHref(locale, page.slug)}
                    className="block rounded-xl border border-border/50 bg-background px-4 py-3 text-sm font-medium text-foreground hover:border-iter-violet/40 hover:text-iter-violet transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
