import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getGlossaryContent, convertToStrapiTerms } from "@/lib/content/glossary";

// SEO-14 (2026-07-13) — localizedPaths ajouté (voir /ressources/blog).
export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Glossaire Finance | Iter Advisors",
  description: "Glossaire finance : termes clés de la finance d'entreprise. Trésorerie, BFR, EBITDA, cap table, runway. Définitions claires pour entrepreneurs.",
  path: "/ressources/glossaire",
  localizedPaths: {
    fr: "/ressources/glossaire",
    en: "/ressources/glossaire",
    es: "/recursos/glosario",
  },
});

export default async function Page() {
  const glossaryContent = getGlossaryContent("fr");
  const terms = convertToStrapiTerms(glossaryContent.terms);
  const cmsNavigation = await getCmsNavigation("fr");
  return <GlossairePage locale="fr" terms={terms} cmsNavigation={cmsNavigation} />;
}
