import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getGlossaryTerms, getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance and accounting glossary - Definitions | Iter Advisors",
  description: "Glossary of key corporate finance terms: cash management, fundraising, reporting, business plan and more.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const [terms, cmsNavigation] = await Promise.all([
    getGlossaryTerms("en"),
    getCmsNavigation("en"),
  ]);
  return <GlossairePage locale="en" terms={terms} cmsNavigation={cmsNavigation} />;
}
