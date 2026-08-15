import { Metadata } from "next";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCaseStudiesContent } from "@/lib/content/case-studies";

const t = getCaseStudiesContent("fr");

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: t.meta.title,
  description: t.meta.description,
  path: "/ressources/case-studies",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <CaseStudiesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
