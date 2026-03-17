import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("politique-de-confidentialite");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "privacy-page",
    locale: "fr",
    path: "/politique-de-confidentialite",
    fallbackTitle: "Politique de confidentialité | Iter Advisors",
    fallbackDescription: "Politique de confidentialité d'Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <LegalPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
