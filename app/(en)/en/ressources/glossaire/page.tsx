import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getGlossaryContent, convertToStrapiTerms } from "@/lib/content/glossary";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance Glossary | Iter Advisors",
  description: "Finance glossary: corporate finance terms explained. Cash management, working capital, EBITDA, cap table, runway. Free reference guide for founders.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const glossaryContent = getGlossaryContent("en");
  const terms = convertToStrapiTerms(glossaryContent.terms);
  const cmsNavigation = await getCmsNavigation("en");

  return <GlossairePage locale="en" terms={terms} cmsNavigation={cmsNavigation} />;
}
