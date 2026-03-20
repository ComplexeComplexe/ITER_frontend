import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Cas Clients | Iter Advisors – Résultats concrets pour entreprises ambitieuses",
  description:
    "Découvrez comment Iter Advisors accompagne startups, scale-ups et PME : DAF externalisé, levée de fonds, trésorerie, contrôle de gestion. Études de cas détaillées avec résultats chiffrés.",
  openGraph: {
    title: "Cas Clients | Iter Advisors",
    description:
      "Des résultats concrets pour des entreprises ambitieuses. Études de cas : HappyScribe, Surfe, Ukio, Seasonly, Neat, Yego.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <CasClientsPage locale="fr" cmsNavigation={cmsNavigation} />;
}
