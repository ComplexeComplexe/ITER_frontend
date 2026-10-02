import { Metadata } from "next";
import HubPage from "@/components/Outils/HubPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  // P2-03: Shortened from 74 chars to 55 chars to prevent SERP truncation
  title: "Outils finance : annuaire et critères | Iter Advisors",
  description:
    "Comparez les outils de comptabilité, trésorerie, dépenses, paie et reporting. Critères à tester, sources éditeurs et questions pour préparer vos devis.",
  path: "/ressources/outils",
  localizedPaths: {
    fr: "/ressources/outils",
    en: "/en/ressources/tools",
    es: "/es/recursos/herramientas",
  },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <HubPage locale="fr" cmsNavigation={cmsNavigation} />;
}
