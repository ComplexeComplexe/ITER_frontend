import { Metadata } from "next";
import DrhSubPage from "@/components/pages/DrhSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhSubContent } from "@/lib/content/drh-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDrhSubContent("fr", "temps-partage")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-temps-partage-page",
    locale: "fr",
    path: "/drh-externalise/temps-partage",
    fallbackTitle: "DRH à temps partagé | Iter Advisors",
    fallbackDescription: "DRH à temps partagé pour PME et startups : une direction des ressources humaines flexible et expérimentée, quelques jours par semaine, sans les coûts d'un poste à temps plein. Découvrez l'offre Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DrhSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
