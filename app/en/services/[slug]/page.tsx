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
const locale = "en" as const;

/* ── Fallback titles EN (Strapi SEO is shared across locales for Single Types) ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Cash Flow Forecasting - Financial Planning | Iter Advisors",
  "gestion-financiere-externalisee":
    "Outsourced Financial Management - CFO Services | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Fundraising Support - Preparation and Advisory | Iter Advisors",
  "comptabilite-externalisation":
    "Accounting Outsourcing - Bookkeeping and Tax Filing | Iter Advisors",
  "controle-de-gestion-externalise":
    "Outsourced Management Control - Performance Monitoring | Iter Advisors",
};

/* ── Fallback descriptions EN (unique per page) ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Cash flow forecasting and financial planning services. Anticipate your cash flows, optimize working capital and secure your treasury with Iter Advisors.",
  "gestion-financiere-externalisee":
    "Outsource your financial management to an experienced CFO. Reporting, budget management and tailored financial optimization by Iter Advisors.",
  "accompagnement-levee-de-fond":
    "Fundraising preparation and support. Business plan, data room, due diligence and investor negotiation services by Iter Advisors.",
  "comptabilite-externalisation":
    "Outsource your accounting: bookkeeping, tax and social declarations, year-end closing. Tailored service by Iter Advisors.",
  "controle-de-gestion-externalise":
    "Outsource your management control: dashboards, variance analysis, performance monitoring and cost optimization by Iter Advisors.",
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
    return { title: "Services | Iter Advisors" };
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
    getCmsNavigation("en"),
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
