import { Metadata } from "next";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCaseStudiesContent } from "@/lib/content/case-studies";

const t = getCaseStudiesContent("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: t.meta.title,
  description: t.meta.description,
  path: "/en/ressources/case-studies",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <CaseStudiesPage locale="en" cmsNavigation={cmsNavigation} />;
}
