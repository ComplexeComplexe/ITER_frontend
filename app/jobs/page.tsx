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
      // SEO-007 (2026-08-10) — pointait vers la page commerciale
      // /jobs/fractional-cfo-startups (déplacée en /fractional-cfo-startups),
      // qui vend une prestation. L'offre d'emploi réelle, avec son
      // JobPosting, vit sur /carrieres/fractional-cfo depuis le 30/05.
      { "@type": "ListItem", position: 1, url: "https://www.iteradvisors.com/carrieres/fractional-cfo" },
      { "@type": "ListItem", position: 2, url: "https://www.iteradvisors.com/jobs/marketing-growth-strategy" },
      { "@type": "ListItem", position: 3, url: "https://www.iteradvisors.com/jobs/senior-finance-manager" },
      { "@type": "ListItem", position: 4, url: "https://www.iteradvisors.com/jobs/finance-analyst-junior-fr" },
    ],
  };

  return buildMetadata({
    locale: "fr",
    title: "Recrutement DAF et finance externalisés | Iter Advisors",
    description: "Recrutement finance : rejoignez Iter Advisors. Postes ouverts : Fractional CFO, DRH, Consultant. Carrière dynamique, missions startup, impact stratégique.",
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
