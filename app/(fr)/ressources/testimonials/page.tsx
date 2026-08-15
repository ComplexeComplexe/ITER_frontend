import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Cas Clients DAF | Iter Advisors",
  description: "Cas clients DAF externalisé : témoignages PME, startups, scale-ups. 5/5 sur Trustfolio (31 avis vérifiés). Résultats réels, croissance garantie.",
  path: "/ressources/testimonials",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <TestimonialsListingPage locale="fr" cmsNavigation={cmsNavigation} />;
}
