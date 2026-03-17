import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Recrutement | Iter Advisors",
  description: "Rejoignez l'équipe Iter Advisors.",
  path: "/jobs",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <JobsPage locale="fr" cmsNavigation={cmsNavigation} />;
}
