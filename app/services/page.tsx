import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "fr",
    path: "/services",
    fallbackTitle: "Services DAF externalisé - Trésorerie, contrôle de gestion, levée de fonds | Iter Advisors",
    fallbackDescription: "Nos services de direction financière externalisée : prévisionnel de trésorerie, contrôle de gestion, accompagnement levée de fonds, comptabilité et gestion financière. Solutions sur mesure pour PME et startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ServicesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
