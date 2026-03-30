import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "fr",
    path: "/a-propos",
    localizedPaths: { fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" },
    fallbackTitle: "À propos - Cabinet DAF externalisé depuis 2019 | Iter Advisors",
    fallbackDescription: "Découvrez Iter Advisors, cabinet de DAF externalisé fondé à Barcelone. 15 experts financiers, +85 entreprises accompagnées et +80M€ de levées de fonds réalisées. Noté 5/5 sur Trustfolio.",
  });
}

export default async function Page() {
  const teamMembers = await getTeamMembers("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <AboutPage locale="fr" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
