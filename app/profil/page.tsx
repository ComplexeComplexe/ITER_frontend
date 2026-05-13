import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnostic DAF | Iter Advisors",
  description: "Évaluez vos besoins financiers en 2 minutes. Diagnostic personnalisé gratuit. Découvrez comment un DAF externalisé peut aider votre entreprise.",
  robots: { index: false, follow: false },
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
