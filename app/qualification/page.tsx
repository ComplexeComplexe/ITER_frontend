import { Metadata } from "next";
import QualificationPage from "@/components/pages/QualificationPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Qualification Entreprise | Iter Advisors – Analyse de Maturité Financière",
  description:
    "Qualifiez votre entreprise en 5 minutes et recevez une analyse personnalisée de votre maturité financière. Recommandations sur mesure par nos experts DAF.",
  openGraph: {
    title: "Qualification Entreprise | Iter Advisors",
    description:
      "Qualifiez votre entreprise en 5 minutes. Analyse de maturité financière personnalisée.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <QualificationPage locale="fr" cmsNavigation={cmsNavigation} />;
}
