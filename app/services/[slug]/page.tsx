import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  SERVICE_PAGE_SLUGS,
  SERVICE_URL_SLUG_BY_LOCALE,
  getServiceSlugsForLocale,
  type ServicePageSlug,
} from "@/lib/fallback-service-pages";
import { getStaticServicePage } from "@/lib/fallback-service-pages-localized";
import { buildMetadata } from "@/lib/metadata";

const basePath = "/services";

/* ── Fallback titles for FR services ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Prévisionnel de Trésorerie PME | Iter Advisors",
  "gestion-financiere-externalisee":
    "Gestion Financière Externalisée | Iter Advisors",
  "accompagnement-levee-de-fond":
    // T#11 (2026-07-13) — title enrichi pour ranker sur "accompagnement
    // levée de fonds" (pos 18,4 GSC, 99 impr, 0 clic) et
    // "préparation levée de fonds" — intent transactionnel service.
    "Accompagnement levée de fonds startup — Data room & pitch | Iter Advisors",
  "comptabilite-externalisation":
    "Externalisation Comptabilité | Iter Advisors",
  "controle-de-gestion-externalise":
    "Contrôle de Gestion Externalisé | Iter Advisors",
};

/* ── Fallback descriptions for FR services ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Construisez un prévisionnel de trésorerie glissant sur 13 semaines. Anticipez les tensions de cash, optimisez votre BFR et sécurisez votre runway. +50 PME accompagnées.",
  "gestion-financiere-externalisee":
    "DAF externalisé dès 2 jours/mois. Reporting mensuel, pilotage budgétaire et stratégie financière pour startups et PME. Barcelone, Paris, Toulouse. Devis gratuit.",
  "accompagnement-levee-de-fond":
    "Levée de fonds clé en main : business plan, data room, due diligence et négociation investisseurs. +30 tours accompagnés, 100M EUR+ levés. Diagnostic gratuit.",
  "comptabilite-externalisation":
    "Externalisez votre comptabilité : tenue, déclarations TVA, paie et clôture annuelle. Pennylane, Sage, QuickBooks - migration en 2 semaines. Devis gratuit.",
  "controle-de-gestion-externalise":
    "Externalisez votre contrôle de gestion pour piloter votre rentabilité. Tableaux de bord et KPIs sur-mesure pour PME et startups à Paris, IDF et partout en France.",
};

function isServicePageSlug(slug: string): slug is ServicePageSlug {
  return (SERVICE_PAGE_SLUGS as readonly string[]).includes(slug);
}

/** Build localizedPaths for a service page slug */
function getServiceLocalizedPaths(slug: ServicePageSlug) {
  return {
    fr: `/services/${SERVICE_URL_SLUG_BY_LOCALE.fr[slug]}`,
    en: `/en/services/${SERVICE_URL_SLUG_BY_LOCALE.en[slug]}`,
    es: `/es/services/${SERVICE_URL_SLUG_BY_LOCALE.es[slug]}`,
  };
}

export async function generateStaticParams() {
  return getServiceSlugsForLocale("fr").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServicePageSlug(slug)) {
    return { title: "Services | Iter Advisors" };
  }

  // TICKET F3 (2026-05-17) — gestion-financiere-externalisee is a thin page
  // that overlaps with the richer controle-de-gestion-externalise. The SEO
  // canonical is set to the richer page so Google consolidates signals there.
  if (slug === "gestion-financiere-externalisee") {
    return buildMetadata({
      locale: "fr",
      path: "/services/controle-de-gestion-externalise",
      localizedPaths: {
        fr: "/services/controle-de-gestion-externalise",
        en: "/en/services/outsourced-management-control",
        es: "/es/services/control-gestion-externalizado",
      },
      title: fallbackTitles[slug],
      description: fallbackDescriptions[slug],
    });
  }

  return buildMetadata({
    locale: "fr",
    path: `${basePath}/${slug}`,
    localizedPaths: getServiceLocalizedPaths(slug),
    title: fallbackTitles[slug],
    description: fallbackDescriptions[slug],
  });
}

/* Per-slug hero images */
const SLUG_HERO_IMAGES: Partial<Record<ServicePageSlug, { src: string; alt: string }>> = {
  "accompagnement-levee-de-fond": {
    src: "/images/stock/levee-de-fonds.png",
    alt: "Accompagnement levée de fonds Iter Advisors — équipe en train d'analyser les documents de data room pour préparer un tour de financement",
  },
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServicePageSlug(slug)) notFound();
  const page = getStaticServicePage(slug, "fr");
  if (!page) notFound();
  const cmsNavigation = undefined;
  return (
    <ServiceSinglePage
      locale="fr"
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={slug}
      cmsNavigation={cmsNavigation}
      heroImage={SLUG_HERO_IMAGES[slug as ServicePageSlug]}
    />
  );
}
