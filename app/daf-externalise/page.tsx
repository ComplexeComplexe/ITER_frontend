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
    fallbackDescription: "Découvrez les missions et bénéfices d'un DAF externalisé. Iter Advisors accompagne PME et startups avec une direction financière flexible, experte et opérationnelle dès le premier jour.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} />;
}
