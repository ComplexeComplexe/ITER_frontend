import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "fr",
    path: "/services",
    title: "Services DAF externalisé | Iter Advisors",
    description: "Services de direction financière externalisée : trésorerie, contrôle de gestion, levée de fonds, comptabilité pour PME et startups.",
  });
}

export default async function Page() {
  return <ServicesPage locale="fr" cmsNavigation={undefined} />;
}
