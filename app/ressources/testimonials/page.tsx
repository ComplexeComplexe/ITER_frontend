import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Cas clients | Iter Advisors",
  description: "Découvrez les témoignages de nos clients : PME, startups et scale-ups accompagnées par les CFOs d'Iter Advisors.",
  path: "/ressources/testimonials",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <TestimonialsListingPage locale="fr" cmsNavigation={cmsNavigation} />;
}
