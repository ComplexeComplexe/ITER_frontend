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
    fallbackTitle: "Outsourced CFO | Iter Advisors",
    fallbackDescription: "Outsourced CFO for SMEs and startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafPage locale="en" cmsNavigation={cmsNavigation} />;
}
