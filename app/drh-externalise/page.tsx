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
    // R4 (2026-05-17) — 70c: keyword + variante "direction RH à temps partagé", cibles PME & Startup, brand
    fallbackTitle: "DRH externalisé — Direction RH temps partagé | Iter Advisors",
    fallbackDescription: "DRH externalisé et direction RH à temps partagé pour PME et startups. Recrutement, paie, conformité et stratégie RH par des experts seniors.",
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
