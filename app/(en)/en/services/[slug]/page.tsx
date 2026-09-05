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

const basePath = "/en/services";

/* ── Fallback titles for EN services ── */
const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "Cash Flow Forecast in 2026 | Iter Advisors",
  "gestion-financiere-externalisee": "Outsourced Financial Management in 2026 | Iter Advisors",
  "accompagnement-levee-de-fond": "Fundraising Support in 2026 | Iter Advisors",
  "comptabilite-externalisation": "Outsource Your Accounting in 2026 | Iter Advisors",
  "controle-de-gestion-externalise": "Outsourced Management Control in 2026 | Iter Advisors",
};

/* ── Fallback descriptions for EN services ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Build a 13-week rolling cash flow forecast. Anticipate cash tensions, optimize working capital and secure your runway. 50+ SMEs supported.",
  "gestion-financiere-externalisee":
    "Outsourced CFO from 2 days/month. Monthly reporting, budget management and financial strategy for startups and SMEs. Free quote.",
  "accompagnement-levee-de-fond":
    "End-to-end fundraising: business plan, data room, due diligence and investor negotiations. 30+ rounds supported, 100M EUR+ raised.",
  "comptabilite-externalisation":
    "Outsource your accounting: bookkeeping, VAT filings, payroll and year-end close. Pennylane, Sage, QuickBooks - migration in 2 weeks.",
  "controle-de-gestion-externalise":
    "Outsource your management control to drive profitability. Custom dashboards and KPIs for SMEs and startups across France.",
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
  return getServiceSlugsForLocale("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug("en", slug);
  if (!canonical) {
    return { title: "Services | Iter Advisors" };
  }
  const endpoint = SERVICE_PAGE_API_MAP[canonical];
  return buildStrapiMetadata({
    endpoint,
    locale: "en",
    path: `${basePath}/${slug}`,
    localizedPaths: getServiceLocalizedPaths(canonical),
    // SEO-AUD-0824 §2 — un slug de service par locale ne garantit pas qu'une
    // page réponde derrière : la version anglaise de la gestion financière
    // externalisée a été retirée.
    disableHreflang: serviceHreflangDisabled(canonical, "en"),
    fallbackTitle: fallbackTitles[canonical],
    fallbackDescription: fallbackDescriptions[canonical],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const canonical = getCanonicalServiceSlug("en", slug);
  if (!canonical) notFound();
  const page = getStaticServicePage(canonical, "en");
  if (!page) notFound();
  const cmsNavigation = await getCmsNavigation("en");
  return (
    <ServiceSinglePage
      locale="en"
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={canonical}
      cmsNavigation={cmsNavigation}
    />
  );
}
