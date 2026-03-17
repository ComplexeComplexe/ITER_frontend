import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Careers | Iter Advisors",
  description: "Join the Iter Advisors team.",
  path: "/jobs",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <JobsPage locale="en" cmsNavigation={cmsNavigation} />;
}
