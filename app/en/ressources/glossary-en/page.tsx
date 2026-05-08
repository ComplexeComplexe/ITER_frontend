import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getGlossaryContent, convertToStrapiTerms } from "@/lib/content/glossary";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance Glossary | Iter Advisors",
  description: "Glossary of key corporate finance terms: cash management, fundraising, reporting, business plan and more.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const glossaryContent = getGlossaryContent("en");
  const terms = convertToStrapiTerms(glossaryContent.terms);
  const cmsNavigation = await getCmsNavigation("en");

  return <GlossairePage locale="en" terms={terms} cmsNavigation={cmsNavigation} />;
}
