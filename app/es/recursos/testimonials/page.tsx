import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Casos Clientes CFO | Iter Advisors",
  description: "Testimonios CFO externalizado: pymes, startups que crecieron con Iter Advisors. Casos de éxito verificados. 5/5 rated en Trustfolio, 31 avis reales.",
  path: "/ressources/testimonials",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <TestimonialsListingPage
      locale="es"
      cmsNavigation={cmsNavigation}
    />
  );
}
