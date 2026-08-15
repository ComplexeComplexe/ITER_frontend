import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getGlossaryContent, convertToStrapiTerms } from "@/lib/content/glossary";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Glosario Finanzas | Iter Advisors",
  description: "Glosario financiero completo: tesorería, cash flow, EBITDA, BFR, cap table. Definiciones claras de términos clave de finanzas corporativas.",
  path: "/es/recursos/glossaire", // SEO-07: self-canonical (was /ressources/glossaire → wrong FR canonical)
});

export default async function Page() {
  const glossaryContent = getGlossaryContent("es");
  const terms = convertToStrapiTerms(glossaryContent.terms);
  const cmsNavigation = await getCmsNavigation("es");

  return (
    <GlossairePage
      locale="es"
      terms={terms}
      cmsNavigation={cmsNavigation}
    />
  );
}
