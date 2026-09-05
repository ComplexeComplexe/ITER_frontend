import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Outsourced CFO Resources | Iter Advisors",
  description: "Outsourced CFO resources: finance blog, glossary, job descriptions, client case studies. Free guides on fractional CFO, fundraising, financial management.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ResourcesPage locale="en" cmsNavigation={cmsNavigation} />;
}
