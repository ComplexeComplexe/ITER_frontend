import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "es",
    path: "/contact",
    fallbackTitle: "Contacto | Iter Advisors",
    fallbackDescription: "Primera conversación gratuita sobre sus necesidades financieras o de RR. HH. Presencia en París, Barcelona y Toulouse. Contacte con Iter Advisors.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ContactPage locale="es" cmsNavigation={cmsNavigation} />;
}
