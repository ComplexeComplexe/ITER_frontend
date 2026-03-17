import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "fr",
    path: "/contact",
    fallbackTitle: "Contact | Iter Advisors",
    fallbackDescription: "Contactez Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ContactPage locale="fr" cmsNavigation={cmsNavigation} />;
}
