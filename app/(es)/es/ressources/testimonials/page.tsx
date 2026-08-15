import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Casos Clientes CFO | Iter Advisors",
  description: "Casos clientes CFO: pymes, startups que crecieron con externalización financiera. Testimonios verificados, 5/5 en Trustfolio. Soluciones reales.",
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
