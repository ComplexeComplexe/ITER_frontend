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
    "Cash Flow Forecasting for SMEs - 13-Week Rolling Model | Iter Advisors",
  "gestion-financiere-externalisee":
    "Outsourced Financial Management - Part-Time CFO from 2 Days/Month | Iter Advisors",
  "accompagnement-levee-de-fond":
    "Fundraising Support - Data Room, Due Diligence & Investor Prep | Iter Advisors",
  "comptabilite-externalisation":
    "Outsourced Accounting - Bookkeeping, Tax & Year-End Closing | Iter Advisors",
  "controle-de-gestion-externalise":
    "Outsourced Management Control - KPI Dashboards & Cost Analysis | Iter Advisors",
};

/* ── Fallback descriptions EN (unique per page) ── */
const fallbackDescriptions: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie":
    "Build a 13-week rolling cash-flow forecast. Anticipate shortfalls, optimise working capital and secure your runway. 50+ SMEs served - free consultation.",
  "gestion-financiere-externalisee":
    "Hire an outsourced CFO from 2 days/month. Monthly reporting, budget management and financial strategy for startups and SMEs. Barcelona, Paris, Toulouse.",
  "accompagnement-levee-de-fond":
    "End-to-end fundraising support: business plan, data room, due diligence prep and investor negotiation. 30+ rounds accompanied - get a free assessment.",
  "comptabilite-externalisation":
    "Outsource your accounting to certified experts: bookkeeping, VAT returns, payroll, year-end closing. Pennylane, Sage, QuickBooks - switch in 2 weeks.",
  "controle-de-gestion-externalise":
    "Outsourced management control: KPI dashboards, variance analysis, cost optimisation and performance monitoring. Actionable insights from day one.",
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
