import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnostic Financier Gratuit | Iter Advisors – DAF Externalisé",
  description:
    "Évaluez vos besoins financiers en 2 minutes. Découvrez comment un DAF externalisé peut structurer votre croissance : prévisionnel, levée de fonds, reporting, trésorerie.",
  openGraph: {
    title: "Diagnostic Financier Gratuit | Iter Advisors",
    description:
      "Évaluez vos besoins en 2 min et obtenez un diagnostic personnalisé. +100 entreprises accompagnées, 5/5 Trustfolio.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <LeadGenPage locale="fr" cmsNavigation={cmsNavigation} />;
}
