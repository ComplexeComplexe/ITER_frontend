import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhExternalisePage, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "fr",
    path: "/drh-externalise",
    fallbackTitle: "DRH externalisé | Iter Advisors",
    fallbackDescription: "DRH externalisé et direction RH à temps partagé pour PME et startups.",
  });
}

export default async function Page() {
  const strapiData = await getDrhExternalisePage("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <DrhPage
      locale="fr"
      strapiCategories={strapiData?.serviceCategories ?? null}
      cmsNavigation={cmsNavigation}
    />
  );
}
