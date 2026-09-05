import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Case Studies | Iter Advisors",
  description: "Concrete results for ambitious companies. Case studies featuring startups and SMEs. 50+ clients, €100M+ raised. Client testimonials.",
  // INDEX-03: campaign landing — duplicates /cas-clients, kept out of index.
  robots: { index: false, follow: false },
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
