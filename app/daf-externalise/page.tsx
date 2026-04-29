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
    fallbackTitle: "DAF externalisé · Opérationnel J+1 · 5/5 sur 31 avis | Iter Advisors",
    fallbackDescription: "Cabinet de DAF externalisé pour PME, startups et scale-ups. CFO senior dès 2 jours/mois, opérationnel J+1. +80 M€ levés par nos clients. Devis gratuit.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} />;
}
