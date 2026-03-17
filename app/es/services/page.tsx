import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "es",
    path: "/services",
    fallbackTitle: "Servicios | Iter Advisors",
    fallbackDescription: "Nuestros servicios de dirección financiera externalizada.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ServicesPage locale="es" cmsNavigation={cmsNavigation} />;
}
