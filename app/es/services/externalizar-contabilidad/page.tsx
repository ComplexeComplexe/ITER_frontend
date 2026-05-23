import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "es",
    path: "/services/externalizar-contabilidad",
    fallbackTitle: "Externalización contable startups y PYMES | Iter Advisors",
    fallbackDescription:
      "Externaliza tu contabilidad con Iter Advisors: teneduría de libros, declaraciones fiscales, nómina y cierre anual. Integración con Pennylane, Sage, QuickBooks.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ServicesPage locale="es" cmsNavigation={cmsNavigation} h1Override="Externalización Contable" />;
}
