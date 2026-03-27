import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getGlossaryTerms, getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Glosario finanzas y contabilidad - Definiciones | Iter Advisors",
  description: "Glosario de términos clave de las finanzas corporativas: tesorería, rondas de financiación, reporting, plan de negocio y mucho más.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const [terms, cmsNavigation] = await Promise.all([
    getGlossaryTerms("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <GlossairePage
      locale="es"
      terms={terms}
      cmsNavigation={cmsNavigation}
    />
  );
}
