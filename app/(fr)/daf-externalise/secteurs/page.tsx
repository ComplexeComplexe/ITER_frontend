import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "secteurs")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-secteurs-page",
    locale: "fr",
    path: "/daf-externalise/secteurs",
    localizedPaths: { fr: "/daf-externalise/secteurs", en: "/en/fractional-cfo", es: "/externalizacion-daf" },
    fallbackTitle: "DAF Externalisé par Secteur d'Activité | Iter Advisors",
    fallbackDescription: "Iter Advisors propose des DAF externalisés spécialisés par secteur : SaaS, e-commerce, industrie, fintech, santé. Découvrez notre expertise sectorielle.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
