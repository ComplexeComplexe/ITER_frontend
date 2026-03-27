import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Casos prácticos CFO externalizado - Resultados clientes | Iter Advisors",
  description: "Descubra los testimonios de nuestros clientes: pymes, startups y scale-ups acompañadas por los CFOs de Iter Advisors.",
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
