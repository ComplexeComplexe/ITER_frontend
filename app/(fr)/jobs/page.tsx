import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getJobOffers } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "fr",
    title: "Recrutement DAF et finance externalisés | Iter Advisors",
    description: "Recrutement finance : rejoignez Iter Advisors. Postes ouverts : Fractional CFO, DRH, Consultant. Carrière dynamique, missions startup, impact stratégique.",
    path: "/jobs",
    noindex: true,
  });
}

export default async function Page() {
  const [cmsNavigation, cmsJobs] = await Promise.all([
    getCmsNavigation("fr"),
    getJobOffers("fr"),
  ]);
  return <JobsPage locale="fr" cmsNavigation={cmsNavigation} cmsJobs={cmsJobs} />;
}
