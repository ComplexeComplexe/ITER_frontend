import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "en",
    path: "/services",
    fallbackTitle: "Outsourced CFO services - Treasury, management control, fundraising | Iter Advisors",
    fallbackDescription: "Our outsourced financial management services.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ServicesPage locale="en" cmsNavigation={cmsNavigation} />;
}
