import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhExternalisePage, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "fr",
    path: "/drh-externalise",
    localizedPaths: { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
    fallbackTitle: "DRH externalisé | Iter Advisors",
    fallbackDescription: "DRH externalisé et direction RH à temps partagé pour PME et startups. Recrutement, gestion sociale, conformité et stratégie RH par des experts dédiés. Contactez Iter Advisors.",
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
