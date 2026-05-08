import { Metadata } from "next";
import QualificationPage from "@/components/pages/QualificationPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Company Qualification | Iter Advisors",
  description: "Qualify your company's financial needs in 5 minutes. Receive a personalized assessment and expert recommendations for outsourced CFO services.",
  openGraph: {
    title: "Company Qualification | Iter Advisors",
    description:
      "Qualify your company in 5 minutes. Personalized financial maturity analysis.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <QualificationPage locale="en" cmsNavigation={cmsNavigation} />;
}
