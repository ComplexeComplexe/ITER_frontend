import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Cas clients | Iter Advisors",
  description: "Découvrez comment Iter Advisors accompagne startups et PME. Cas clients concrets, résultats mesurables, 5/5 sur Trustfolio avec 31 avis vérifiés.",
  robots: { index: false, follow: false },
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
