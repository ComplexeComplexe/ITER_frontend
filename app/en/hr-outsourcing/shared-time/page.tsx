import { Metadata } from "next";
import DrhSubPage from "@/components/pages/DrhSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhSubContent } from "@/lib/content/drh-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDrhSubContent("en", "shared-time")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-temps-partage-page",
    locale: "en",
    path: "/hr-outsourcing/shared-time",
    fallbackTitle: "Shared-time HR | Iter Advisors",
    fallbackDescription: "Shared-time HR director: flexible people leadership for SMEs and startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DrhSubPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
