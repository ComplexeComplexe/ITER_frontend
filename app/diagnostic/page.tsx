import { Metadata } from "next";
import LeadPage from "@/components/pages/LeadPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnostic Gratuit | Iter Advisors – DAF Externalisé",
  description:
    "Évaluez vos besoins financiers en 2 minutes et découvrez comment un DAF externalisé peut structurer votre croissance. Diagnostic gratuit et sans engagement.",
  openGraph: {
    title: "Diagnostic Gratuit | Iter Advisors",
    description:
      "Évaluez vos besoins financiers en 2 minutes. DAF externalisé pour startups et PME.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <LeadPage locale="fr" cmsNavigation={cmsNavigation} />;
}
