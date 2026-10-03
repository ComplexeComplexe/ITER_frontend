import { CLIENTS_ACCOMPAGNES } from "@/lib/content/facts";
import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Free Financial Diagnostic | Iter Advisors – Fractional CFO",
  description:
    "Assess your financial needs in 2 minutes. Discover how a Fractional CFO can structure your growth: forecasting, fundraising, reporting, cash-flow management.",
  // INDEX-03: lead-gen funnel — no SEO value, dilutes crawl budget.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free Financial Diagnostic | Iter Advisors",
    description:
      `Assess your needs in 2 min and get a personalized diagnostic. ${CLIENTS_ACCOMPAGNES} companies supported, 5/5 Trustfolio.`,
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <LeadGenPage locale="en" cmsNavigation={cmsNavigation} />;
}
