import { Metadata } from "next";
import LeadPage from "@/components/pages/LeadPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Free Assessment | Iter Advisors – Outsourced CFO",
  description: "Assess your financial needs in 2 minutes. Discover how a fractional CFO can help your startup or SME. Get a free personalized diagnostic report.",
  // INDEX-03: diagnostic funnel — conversion page, no SEO value.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free Assessment | Iter Advisors",
    description:
      "Assess your financial needs in 2 minutes. Outsourced CFO for startups and SMEs.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <LeadPage locale="en" cmsNavigation={cmsNavigation} />;
}
