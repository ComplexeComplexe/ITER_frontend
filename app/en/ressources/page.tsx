import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Outsourced CFO Resources - Blog, case studies, guides | Iter Advisors",
  description: "Browse all our resources: blog, glossary, job descriptions and client testimonials.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ResourcesPage locale="en" cmsNavigation={cmsNavigation} />;
}
