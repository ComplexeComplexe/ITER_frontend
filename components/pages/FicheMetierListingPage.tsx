import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getLocalePath } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { getJobMetierSlugForUrl, type StrapiJobMetier, CmsNavItem } from "@/lib/strapi";

const content: Record<
  Locale,
  {
    resourcesLabel: string;
    resourcesHref: string;
    breadcrumbLabel: string;
    h1: string;
    intro: string;
    dafLabel: string;
    dafHref: string;
    discoverLabel: string;
  }
> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Fiches métiers",
    h1: "Fiches métiers",
    intro:
      "Découvrez nos fiches métiers détaillées sur les métiers de la finance d'entreprise. Rôles, compétences et parcours des professionnels de la direction financière.",
    dafLabel: "Fiche métier : Directeur Administratif et Financier",
    dafHref: "/daf-externalise/metier",
    discoverLabel: "Découvrir",
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Job descriptions",
    h1: "Job descriptions",
    intro:
      "Discover our detailed job descriptions for corporate finance professionals. Roles, skills and career paths in financial management.",
    dafLabel: "Job description: Chief Financial Officer",
    dafHref: "/en/daf-outsourcing/metier",
    discoverLabel: "Discover",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Perfiles profesionales",
    h1: "Perfiles profesionales",
    intro:
      "Descubra nuestras fichas detalladas sobre los perfiles profesionales de las finanzas corporativas. Roles, competencias y trayectorias de los profesionales de la dirección financiera.",
    dafLabel: "Perfil profesional: Director Financiero",
    dafHref: "/es/externalizacion-daf/metier",
    discoverLabel: "Descubra",
  },
};

const fichesBasePath = "/ressources/fiche-metier";

function getFicheHref(locale: Locale, slug: string): string {
  return getLocalePath(locale, `${fichesBasePath}/${slug}`);
}

export default function FicheMetierListingPage({
  locale,
  fiches,
  cmsNavigation,
}: {
  locale: Locale;
  fiches?: StrapiJobMetier[] | null;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = content[locale];
  const hasFiches = fiches && fiches.length > 0;
  const cards = hasFiches
    ? fiches.map((f, i) => ({
        href: getFicheHref(locale, getJobMetierSlugForUrl(f)),
        title: f.title,
        index: String(i + 1).padStart(2, "0"),
      }))
    : [{ href: t.dafHref, title: t.dafLabel, index: "01" }];

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
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

      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-iter-violet/30 transition-all duration-300"
              >
                <span className="text-[11px] font-bold text-iter-violet/40 tracking-widest">
                  {card.index}
                </span>
                <h3 className="text-lg font-semibold font-heading mt-2 mb-4 group-hover:text-iter-violet transition-colors">
                  {card.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {t.discoverLabel}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
