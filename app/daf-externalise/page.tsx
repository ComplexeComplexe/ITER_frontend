import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/daf-externalise",
    fallbackTitle: "DAF externalisé | Iter Advisors",
    fallbackDescription: "DAF externalisé pour PME et startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} />;
}
