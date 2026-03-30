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
    "Prévisionnel de trésorerie : pilotez votre cash flow | Iter Advisors",
  "gestion-financiere-externalisee":
    "Gestion financière externalisée pour PME et startups | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Accompagnement levée de fonds startup et PME | Iter Advisors",
  "comptabilite-externalisation":
    "Externaliser sa comptabilité : gestion fiable et optimisée | Iter Advisors",
  "controle-de-gestion-externalise":
    "Contrôle de gestion externalisé : pilotez votre performance | Iter Advisors",
};

/* ── Bug 3 fix: meta descriptions uniques par page ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Prévision de trésorerie et pilotage de cash flow pour startups et PME. Anticipez vos besoins, sécurisez votre runway. Outils : Agicap, Pennylane.",
  "gestion-financiere-externalisee":
    "Externalisez votre direction financière avec Iter Advisors. Pilotage de trésorerie, reporting et stratégie pour PME et startups. Experts opérationnels dès J1.",
  "accompagnement-levee-de-fond":
    "Accompagnement levée de fonds de la préparation au closing. 100M+ EUR levés pour nos clients. Due diligence, business plan et négociation.",
  "comptabilite-externalisation":
    "Externalisez votre comptabilité avec Iter Advisors. Tenue comptable, déclarations fiscales et clôtures mensuelles pour PME et startups.",
  "controle-de-gestion-externalise":
    "Contrôle de gestion externalisé pour PME et startups. Tableaux de bord, analyse des écarts et KPIs financiers. Économisez jusqu'à 55K EUR/an.",
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
