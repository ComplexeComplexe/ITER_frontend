import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  getServiceSinglePage,
  getCanonicalServiceSlug,
  getServiceSlugsForLocale,
  SERVICE_PAGE_API_MAP,
  getCmsNavigation,
  type ServicePageSlug,
} from "@/lib/strapi";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLocalePath } from "@/lib/i18n";

const basePath = "/services";
const locale = "es" as const;

const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "Previsión de tesorería | Iter Advisors",
  "gestion-financiere-externalisee": "Gestión financiera externalizada | Iter Advisors",
  "accompagnement-levee-de-fond": "Soporte a la financiación | Iter Advisors",
  "comptabilite-externalisation": "Externalizar la contabilidad | Iter Advisors",
  "controle-de-gestion-externalise": "Control de gestión externalizado | Iter Advisors",
};

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
  const endpoint = SERVICE_PAGE_API_MAP[canonical];
  return buildStrapiMetadata({
    endpoint,
    locale,
    path: getLocalePath(locale, `${basePath}/${slug}`),
    fallbackTitle: fallbackTitles[canonical],
    fallbackDescription: "Servicios de dirección financiera y asesoramiento por Iter Advisors.",
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
