import { Metadata } from "next";
import DrhFrenchPage from "@/components/pages/DrhFrenchPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";


export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-temps-partage-page",
    locale: "fr",
    path: "/drh-externalise/temps-partage",
    localizedPaths: { fr: "/drh-externalise/temps-partage", en: "/hr-outsourcing/shared-time", es: "/externalizacion-rrhh/tiempo-compartido" },
    fallbackTitle: "DRH à temps partagé | Iter Advisors",
    fallbackDescription: "DRH à temps partagé : comprendre le rythme, les responsabilités, les livrables et la continuité d’une mission RH auprès de vos équipes.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DrhFrenchPage sharedTime cmsNavigation={cmsNavigation} />;
}
