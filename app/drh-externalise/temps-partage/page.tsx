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
    fallbackDescription: "DRH à temps partagé : une direction RH flexible pour PME et startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DrhSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
