import { Metadata } from "next";
import LeadPage from "@/components/pages/LeadPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Free Assessment | Iter Advisors – Outsourced CFO",
  description:
    "Assess your financial needs in 2 minutes and discover how an outsourced CFO can structure your growth. Free assessment, no commitment.",
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
