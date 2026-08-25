import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("mentions-legales");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "fr",
    path: "/mentions-legales",
    localizedPaths: { fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" },
    fallbackTitle: "Mentions légales | Iter Advisors",
    fallbackDescription: "Mentions légales d'Iter Advisors S.L. (NIF B42960849) : raison sociale, siège à Barcelone, directeur de la publication et hébergeur du site.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <LegalPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
