import { Metadata } from "next";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCaseStudiesContent } from "@/lib/content/case-studies";

const t = getCaseStudiesContent("es");

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: t.meta.title,
  description: t.meta.description,
  path: "/es/ressources/case-studies",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <CaseStudiesPage locale="es" cmsNavigation={cmsNavigation} />;
}
