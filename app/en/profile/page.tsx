import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Free Financial Diagnostic | Iter Advisors – Outsourced CFO",
  description:
    "Assess your financial needs in 2 minutes. Discover how an outsourced CFO can structure your growth: forecasting, fundraising, reporting, cash-flow management.",
  openGraph: {
    title: "Free Financial Diagnostic | Iter Advisors",
    description:
      "Assess your needs in 2 min and get a personalized diagnostic. 100+ companies supported, 5/5 Trustfolio.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <LeadGenPage locale="en" cmsNavigation={cmsNavigation} />;
}
