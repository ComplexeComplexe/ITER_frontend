import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "en",
    path: "/daf-outsourcing",
    localizedPaths: { fr: "/daf-externalise", en: "/daf-outsourcing", es: "/externalizacion-daf" },
    fallbackTitle: "Outsourced CFO for Startups & SMEs | Iter Advisors - Barcelona, Paris",
    fallbackDescription: "Hire a part-time CFO from 2 days/month. Cash-flow forecasting, fundraising support, financial reporting - 50+ companies served across Barcelona, Paris and Toulouse. Free consultation.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafPage locale="en" cmsNavigation={cmsNavigation} />;
}
