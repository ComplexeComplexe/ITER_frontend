import { TRUSTFOLIO_REVIEW_COUNT } from "@/lib/content/facts";
import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Cas Clients DAF | Iter Advisors",
  description: `Cas clients DAF externalisé : témoignages PME, startups, scale-ups. 5/5 sur Trustfolio (${TRUSTFOLIO_REVIEW_COUNT} avis vérifiés). Missions et résultats documentés.`,
  path: "/ressources/testimonials",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <TestimonialsListingPage locale="fr" cmsNavigation={cmsNavigation} />;
}
