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
    "Previsi\u00f3n de tesorer\u00eda - Pilotaje de flujos | Iter Advisors",
  "gestion-financiere-externalisee":
    "Gesti\u00f3n financiera externalizada | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Acompa\u00f1amiento en captaci\u00f3n de fondos | Iter Advisors",
  "comptabilite-externalisation":
    "Externalizaci\u00f3n de contabilidad | Iter Advisors",
  "controle-de-gestion-externalise":
    "Control de gesti\u00f3n externalizado | Iter Advisors",
};

/* ── Fallback descriptions ES (unique per page) ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Elaboraci\u00f3n y seguimiento de su previsional de tesorer\u00eda. Anticipe sus flujos financieros y optimice su tesorer\u00eda con Iter Advisors.",
  "gestion-financiere-externalisee":
    "Externalice su gesti\u00f3n financiera con un CFO experimentado. Reporting y optimizaci\u00f3n financiera a medida por Iter Advisors.",
  "accompagnement-levee-de-fond":
    "Preparaci\u00f3n y acompa\u00f1amiento en su captaci\u00f3n de fondos. Business plan, data room y due diligence por Iter Advisors.",
  "comptabilite-externalisation":
    "Externalice su contabilidad: gesti\u00f3n contable, declaraciones fiscales y sociales. Servicio a medida por Iter Advisors.",
  "controle-de-gestion-externalise":
    "Externalice su control de gesti\u00f3n: cuadros de mando, an\u00e1lisis de desviaciones y optimizaci\u00f3n de costes por Iter Advisors.",
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
