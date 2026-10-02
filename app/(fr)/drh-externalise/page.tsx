import { Metadata } from "next";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "fr",
    path: "/drh-externalise",
    localizedPaths: { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
    // R4 (2026-05-17) — 70c: keyword + variante "direction RH à temps partagé", cibles PME & Startup, brand
    fallbackTitle: "DRH externalisé pour PME et startups | Iter Advisors",
    fallbackDescription: "DRH externalisé pour PME et startups : organisation, recrutement et accompagnement des managers. Périmètre et rythme définis ensemble.",
  });
}

export default async function Page() { return <DrhFrenchPage cmsNavigation={await getCmsNavigation("fr")} />; }
