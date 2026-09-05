import { Metadata } from "next";
import QualificationPage from "@/components/pages/QualificationPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Company Assessment | Iter Advisors",
  description: "Assess your company's financial maturity in 5 minutes. Get a personalized diagnostic and recommendations from our CFO experts. Free qualification.",
  robots: { index: false, follow: false },
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
