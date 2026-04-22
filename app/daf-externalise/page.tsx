import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/daf-externalise",
    localizedPaths: { fr: "/daf-externalise", en: "/daf-outsourcing", es: "/externalizacion-daf" },
    fallbackTitle: "DAF Externalisé pour PME et Startups | Iter Advisors - Barcelona, Paris",
    fallbackDescription: "Recrutez un DAF externalisé dès 2 jours/mois. Trésorerie, reporting, levée de fonds : +50 PME et startups accompagnées depuis Barcelone, Paris et Toulouse. Devis gratuit.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} />;
}
