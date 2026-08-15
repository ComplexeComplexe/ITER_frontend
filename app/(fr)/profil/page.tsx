import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";
import {
  CLIENTS_ACCOMPAGNES,
  TRUSTFOLIO_RATING,
} from "@/lib/content/facts";

export const metadata: Metadata = {
  title: "Diagnostic DAF | Iter Advisors",
  description: "Évaluez vos besoins financiers en 2 minutes. Diagnostic personnalisé gratuit. Découvrez comment un DAF externalisé peut aider votre entreprise.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Diagnostic Financier Gratuit | Iter Advisors",
    description:
      // SEO-DAF-02 (2026-08-09) — annonçait « +100 entreprises accompagnées »
      // quand le reste du site en annonce 85.
      `Évaluez vos besoins en 2 min et obtenez un diagnostic personnalisé. ${CLIENTS_ACCOMPAGNES} entreprises accompagnées, ${TRUSTFOLIO_RATING}/5 Trustfolio.`,
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <LeadGenPage locale="fr" cmsNavigation={cmsNavigation} />;
}
