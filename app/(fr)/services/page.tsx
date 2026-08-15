import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "fr",
    path: "/services",
    // SEO-001 (2026-08-09) — voir la note dans lib/content/home.ts : le
    // title reprenait la requête générique du pilier. La page vend un
    // catalogue de services, pas le DAF externalisé seul — son H1 le dit
    // déjà (« Direction financière, RH et opérations externalisées »).
    title: "Services financiers externalisés pour PME | Iter Advisors",
    description: "Services de direction financière externalisée : trésorerie, contrôle de gestion, levée de fonds, comptabilité pour PME et startups.",
  });
}

export default async function Page() {
  return <ServicesPage locale="fr" cmsNavigation={undefined} />;
}
