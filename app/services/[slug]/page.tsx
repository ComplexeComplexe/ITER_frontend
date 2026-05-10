import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  getServiceSinglePage,
  getCmsNavigation,
  SERVICE_PAGE_SLUGS,
  SERVICE_PAGE_API_MAP,
  SERVICE_URL_SLUG_BY_LOCALE,
  type ServicePageSlug,
} from "@/lib/strapi";
import { buildStrapiMetadata } from "@/lib/metadata";

const basePath = "/services";

/* ── Bug 1 + 4 fix: titres fallback corriges et enrichis ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Prévisionnel de Trésorerie PME | Iter Advisors",
  "gestion-financiere-externalisee":
    "Gestion Financière Externalisée | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Levée de Fonds Startup | Iter Advisors",
  "comptabilite-externalisation":
    "Externalisation Comptabilité | Iter Advisors",
  "controle-de-gestion-externalise":
    "Contrôle de Gestion Externalisé | Iter Advisors",
};

/* ── Bug 3 fix: meta descriptions uniques par page ── */
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
    en: `/services/${SERVICE_URL_SLUG_BY_LOCALE.en[slug]}`,
    es: `/services/${SERVICE_URL_SLUG_BY_LOCALE.es[slug]}`,
  };
}

export async function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
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
  const endpoint = SERVICE_PAGE_API_MAP[slug];
  return buildStrapiMetadata({
    endpoint,
    locale: "fr",
    path: `${basePath}/${slug}`,
    localizedPaths: getServiceLocalizedPaths(slug),
    fallbackTitle: fallbackTitles[slug],
    fallbackDescription: fallbackDescriptions[slug],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServicePageSlug(slug)) notFound();
  const page = await getServiceSinglePage(slug, "fr");
  if (!page) notFound();
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <ServiceSinglePage
      locale="fr"
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={slug}
      cmsNavigation={cmsNavigation}
    />
  );
}
