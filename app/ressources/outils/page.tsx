import { Metadata } from "next";
import HubPage from "@/components/Outils/HubPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Stack financier idéal pour startups et PME — Le guide 2026 | Iter Advisors",
  description:
    "Quels outils pour piloter sa finance entre 10 et 100 employés ? Le stack recommandé par nos DAF externalisés : compta, trésorerie, dépenses, paie.",
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
