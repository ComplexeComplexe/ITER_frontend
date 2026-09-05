import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Case Studies | Iter Advisors",
  description: "Case studies: How Iter Advisors supports startups, scale-ups and SMEs. Real results: 50+ companies, €100M+ raised. Client testimonials.",
  openGraph: {
    title: "Case Studies | Iter Advisors",
    description:
      "Concrete results for ambitious companies. Case studies: HappyScribe, Surfe, Ukio, Seasonly, Neat, Yego.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <CasClientsPage locale="en" cmsNavigation={cmsNavigation} />;
}
