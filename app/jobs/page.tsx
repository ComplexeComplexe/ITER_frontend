import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getJobOffers } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Postes ouverts chez Iter Advisors",
    itemListElement: [
      { "@type": "ListItem", position: 1, url: "https://www.iteradvisors.com/jobs/fractional-cfo-startups" },
      { "@type": "ListItem", position: 2, url: "https://www.iteradvisors.com/jobs/marketing-growth-strategy" },
      { "@type": "ListItem", position: 3, url: "https://www.iteradvisors.com/jobs/senior-finance-manager" },
      { "@type": "ListItem", position: 4, url: "https://www.iteradvisors.com/jobs/finance-analyst-junior-fr" },
    ],
  };

  return buildMetadata({
    locale: "fr",
    title: "Recrutement DAF et finance externalisés | Iter Advisors",
    description: "Rejoignez l'équipe Iter Advisors. 4 postes ouverts : Fractional CFO, Manager Finance, Analyste Junior, Growth Marketing.",
    path: "/jobs",
    noindex: true,
    structuredData,
  });
}

export default async function Page() {
  const [cmsNavigation, cmsJobs] = await Promise.all([
    getCmsNavigation("fr"),
    getJobOffers("fr"),
  ]);
  return <JobsPage locale="fr" cmsNavigation={cmsNavigation} cmsJobs={cmsJobs} />;
}
