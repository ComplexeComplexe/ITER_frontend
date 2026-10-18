import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "fr",
    path: "/contact",
    fallbackTitle: "Contact — DAF externalisé & DRH | Iter Advisors",
    fallbackDescription: "Premier échange gratuit sur votre direction financière ou RH. Présence à Paris, Barcelone et Toulouse. Décrivez votre besoin à Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ContactPage locale="fr" cmsNavigation={cmsNavigation} />;
}
