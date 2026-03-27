import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "fr",
    path: "/contact",
    fallbackTitle: "Contactez nos DAF externalisés - Barcelone, Paris, Toulouse | Iter Advisors",
    fallbackDescription: "Contactez Iter Advisors pour un premier échange gratuit avec un expert financier. Bureaux à Barcelone, Paris et Toulouse. DAF externalisé et CFO à temps partagé pour PME et startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ContactPage locale="fr" cmsNavigation={cmsNavigation} />;
}
