import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getJobOffers } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Recrutement DAF et finance externalisés | Iter Advisors",
  description: "Rejoignez l'équipe Iter Advisors.",
  path: "/jobs",
});

export default async function Page() {
  const [cmsNavigation, cmsJobs] = await Promise.all([
    getCmsNavigation("fr"),
    getJobOffers("fr"),
  ]);
  return <JobsPage locale="fr" cmsNavigation={cmsNavigation} cmsJobs={cmsJobs} />;
}
