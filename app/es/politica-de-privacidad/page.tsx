import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";
import { getCmsNavigation } from "@/lib/strapi";

const content = getLegalContent("politica-de-privacidad");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "privacy-page",
    locale: "es",
    path: "/politica-de-privacidad",
    localizedPaths: { fr: "/politique-de-confidentialite", en: "/privacy-policy", es: "/politica-de-privacidad" },
    fallbackTitle: "Política de privacidad | Iter Advisors",
    fallbackDescription: "Política de privacidad de Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <LegalPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
