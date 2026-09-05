import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  getCmsNavigation,
  SERVICE_PAGE_SLUGS,
  SERVICE_PAGE_API_MAP,
  SERVICE_URL_SLUG_BY_LOCALE,
  getCanonicalServiceSlug,
  getServiceSlugsForLocale,
  type ServicePageSlug,
} from "@/lib/static-content";
// INDEX-04 — same as FR /services/[slug]: static resolver, no Strapi.
import { getStaticServicePage } from "@/lib/fallback-service-pages-localized";
import { serviceHreflangDisabled } from "@/lib/static-content";
import { buildStrapiMetadata } from "@/lib/metadata";

const basePath = "/es/services";

/* ── Fallback titles for ES services ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "Previsión de Tesorería en 2026 | Iter Advisors",
  "gestion-financiere-externalisee": "Gestión Financiera Externalizada en 2026 | Iter Advisors",
  "accompagnement-levee-de-fond": "Soporte de Financiación en 2026 | Iter Advisors",
  "comptabilite-externalisation": "Externalizar Contabilidad en 2026 | Iter Advisors",
  "controle-de-gestion-externalise": "Control de Gestión Externalizado en 2026 | Iter Advisors",
};

/* ── Fallback descriptions for ES services ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Crea una previsión de tesorería móvil de 13 semanas. Anticipa tensiones de efectivo, optimiza tu capital de trabajo y asegura tu runway. 50+ PYMEs acompañadas.",
  "gestion-financiere-externalisee":
    "CFO externalizado desde 2 días/mes. Reporting mensual, gestión presupuestaria y estrategia financiera para startups y PYMEs. Presupuesto gratuito.",
  "accompagnement-levee-de-fond":
    "Financiación integral: business plan, data room, due diligence y negociaciones con inversores. 30+ rondas acompañadas, 100M EUR+ levantados.",
  "comptabilite-externalisation":
    "Externaliza tu contabilidad: teneduría, declaraciones de IVA, nómina y cierre anual. Pennylane, Sage, QuickBooks - migración en 2 semanas.",
  "controle-de-gestion-externalise":
    "Externaliza tu control de gestión para impulsar rentabilidad. Dashboards y KPIs personalizados para PYMEs y startups en España.",
};

/** Build localizedPaths for a service page slug */
function getServiceLocalizedPaths(slug: ServicePageSlug) {
  return {
    fr: `/services/${SERVICE_URL_SLUG_BY_LOCALE.fr[slug]}`,
    en: `/en/services/${SERVICE_URL_SLUG_BY_LOCALE.en[slug]}`,
    es: `/es/services/${SERVICE_URL_SLUG_BY_LOCALE.es[slug]}`,
  };
}

export async function generateStaticParams() {
  return getServiceSlugsForLocale("es").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug("es", slug);
  if (!canonical) {
    return { title: "Servicios | Iter Advisors" };
  }
  const endpoint = SERVICE_PAGE_API_MAP[canonical];
  return buildStrapiMetadata({
    endpoint,
    locale: "es",
    path: `${basePath}/${slug}`,
    localizedPaths: getServiceLocalizedPaths(canonical),
    // SEO-AUD-0824 §2 — un slug de service par locale ne garantit pas qu'une
    // page réponde derrière : la version anglaise de la gestion financière
    // externalisée a été retirée.
    disableHreflang: serviceHreflangDisabled(canonical, "es"),
    fallbackTitle: fallbackTitles[canonical],
    fallbackDescription: fallbackDescriptions[canonical],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug("es", slug);
  if (!canonical) notFound();
  const page = getStaticServicePage(canonical, "es");
  if (!page) notFound();
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <ServiceSinglePage
      locale="es"
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={canonical}
      cmsNavigation={cmsNavigation}
    />
  );
}
