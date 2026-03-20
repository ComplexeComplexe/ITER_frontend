import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Case Studies | Iter Advisors – Concrete Results for Ambitious Companies",
  description:
    "Discover how Iter Advisors supports startups, scale-ups and SMEs: outsourced CFO, fundraising, treasury, management control. Detailed case studies with measurable results.",
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
