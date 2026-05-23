import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  SERVICE_PAGE_SLUGS,
  SERVICE_PAGE_API_MAP,
  SERVICE_URL_SLUG_BY_LOCALE,
  getServiceSlugsForLocale,
  type ServicePageSlug,
} from "@/lib/strapi";
// INDEX-04 — service pages no longer go through the Strapi fetcher
// (which threw on a disabled CMS even though the catch was caught
// internally). Switching to the synchronous static resolver removes the
// async hop entirely and guarantees a 200 even if `lib/strapi.ts` ever
// breaks again.
import { getStaticServicePage } from "@/lib/fallback-service-pages-localized";
import { buildStrapiMetadata } from "@/lib/metadata";

const basePath = "/services";

/* ── Fallback titles for FR services ── */
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
  const endpoint = SERVICE_PAGE_API_MAP[slug];

  // TICKET F3 (2026-05-17) — gestion-financiere-externalisee is a thin page
  // that overlaps with the richer controle-de-gestion-externalise. The SEO
  // canonical is set to the richer page so Google consolidates signals there.
  // No 301 redirect yet (F3 scope); only the canonical + hreflang are changed.
  if (slug === "gestion-financiere-externalisee") {
    return buildStrapiMetadata({
      endpoint,
      locale: "fr",
      path: "/services/controle-de-gestion-externalise",
      localizedPaths: {
        fr: "/services/controle-de-gestion-externalise",
        en: "/en/services/outsourced-management-control",
        es: "/es/services/control-gestion-externalizado",
      },
      fallbackTitle: fallbackTitles[slug],
      fallbackDescription: fallbackDescriptions[slug],
    });
  }

  return buildStrapiMetadata({
    endpoint,
    locale: "fr",
    path: `${basePath}/${slug}`,
    localizedPaths: getServiceLocalizedPaths(slug),
    fallbackTitle: fallbackTitles[slug],
    fallbackDescription: fallbackDescriptions[slug],
  });
}

/* Per-slug hero illustrations (lightweight SVG) */
const SLUG_HERO_IMAGES: Partial<Record<ServicePageSlug, { src: string; alt: string }>> = {
  "accompagnement-levee-de-fond": {
    src: "/images/illustrations/fundraising-growth.svg",
    alt: "Accompagnement levée de fonds Iter Advisors — graphique de croissance illustrant la progression du financement startup",
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
