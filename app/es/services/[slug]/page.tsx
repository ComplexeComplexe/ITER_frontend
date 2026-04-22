import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  getServiceSinglePage,
  getCanonicalServiceSlug,
  getServiceSlugsForLocale,
  getCmsNavigation,
  SERVICE_URL_SLUG_BY_LOCALE,
  type ServicePageSlug,
} from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

const basePath = "/services";
const locale = "es" as const;

/* ── Fallback titles ES (Strapi SEO is shared across locales for Single Types) ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Previsión de Tesorería PYME - Modelo Deslizante 13 Semanas | Iter Advisors",
  "gestion-financiere-externalisee":
    "Gestión Financiera Externalizada - CFO a Tiempo Parcial desde 2 días/mes | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Captación de Fondos - Data Room, Due Diligence y Negociación | Iter Advisors",
  "comptabilite-externalisation":
    "Externalización Contable - Gestión, Declaraciones y Cierre | Iter Advisors",
  "controle-de-gestion-externalise":
    "Control de Gestión Externalizado - Cuadros de Mando y KPIs | Iter Advisors",
};

/* ── Fallback descriptions ES (unique per page) ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Construya una previsión de tesorería deslizante a 13 semanas. Anticipe tensiones de caja, optimice su capital circulante. +50 PYME acompañadas. Consulta gratuita.",
  "gestion-financiere-externalisee":
    "CFO externalizado desde 2 días/mes. Reporting mensual, pilotaje presupuestario y estrategia financiera para startups y PYME. Barcelona, París, Toulouse.",
  "accompagnement-levee-de-fond":
    "Captación de fondos integral: business plan, data room, due diligence y negociación con inversores. +30 rondas acompañadas, 100M EUR+ levantados.",
  "comptabilite-externalisation":
    "Externalice su contabilidad: gestión contable, IVA, nóminas y cierre anual. Pennylane, Sage, QuickBooks - migración en 2 semanas. Presupuesto gratuito.",
  "controle-de-gestion-externalise":
    "Control de gestión externalizado: cuadros de mando, análisis de desviaciones, optimización de costes y seguimiento de rendimiento. Resultados desde el 1er mes.",
};

/** Build localizedPaths for a service page slug */
function getServiceLocalizedPaths(canonical: ServicePageSlug) {
  return {
    fr: `/services/${SERVICE_URL_SLUG_BY_LOCALE.fr[canonical]}`,
    en: `/services/${SERVICE_URL_SLUG_BY_LOCALE.en[canonical]}`,
    es: `/services/${SERVICE_URL_SLUG_BY_LOCALE.es[canonical]}`,
  };
}

export async function generateStaticParams() {
  return getServiceSlugsForLocale(locale).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug(locale, slug);
  if (!canonical) {
    return { title: "Servicios | Iter Advisors" };
  }
  /* Use static fallback directly because Strapi SEO component is shared
     across locales (Single Types) and always returns FR meta tags. */
  return buildMetadata({
    locale,
    title: fallbackTitles[canonical],
    description: fallbackDescriptions[canonical],
    path: `/services/${slug}`,
    localizedPaths: getServiceLocalizedPaths(canonical),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug(locale, slug);
  if (!canonical) notFound();
  const [page, cmsNavigation] = await Promise.all([
    getServiceSinglePage(canonical, locale),
    getCmsNavigation("es"),
  ]);
  if (!page) notFound();
  return (
    <ServiceSinglePage
      locale={locale}
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={slug}
      cmsNavigation={cmsNavigation}
    />
  );
}
