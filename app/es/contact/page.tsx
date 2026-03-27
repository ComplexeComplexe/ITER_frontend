import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "es",
    path: "/contact",
    fallbackTitle: "Contacte con nuestros CFOs externalizados - Barcelona, París, Toulouse | Iter Advisors",
    fallbackDescription: "Contacte con Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ContactPage locale="es" cmsNavigation={cmsNavigation} />;
}
