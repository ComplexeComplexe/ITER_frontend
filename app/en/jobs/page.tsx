import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getJobOffers } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance and CFO careers - Join our team | Iter Advisors",
  description: "Join the Iter Advisors team.",
  path: "/jobs",
  noindex: true,
});

export default async function Page() {
  const [cmsNavigation, cmsJobs] = await Promise.all([
    getCmsNavigation("en"),
    getJobOffers("en"),
  ]);
  return <JobsPage locale="en" cmsNavigation={cmsNavigation} cmsJobs={cmsJobs} />;
}
