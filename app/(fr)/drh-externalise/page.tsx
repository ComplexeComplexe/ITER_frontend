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
    // Keep the primary commercial query concise; specific scope and fees live in the description.
    fallbackTitle: "DRH externalisé pour PME et startups | Iter Advisors",
    fallbackDescription: "DRH externalisé pour PME et startups avec Borith Biv : recrutement, management et organisation RH. Fourchettes indicatives et devis selon le périmètre.",
  });
}

export default async function Page() { return <DrhFrenchPage cmsNavigation={await getCmsNavigation("fr")} />; }
