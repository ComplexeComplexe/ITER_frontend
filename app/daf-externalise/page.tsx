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
    fallbackTitle: "DAF externalisé : guide, tarifs & cabinet 2026 | Iter Advisors",
    fallbackDescription: "DAF externalisé : guide complet 2026. Tarifs (dès 2 000 €/mois), missions, profils, secteurs. +85 entreprises et +100 M€ levés. Note 5/5 (31 avis). Devis gratuit.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} />;
}
