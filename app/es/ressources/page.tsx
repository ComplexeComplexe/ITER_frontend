import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Recursos | Iter Advisors",
  description: "Consulte todos nuestros recursos: blog, glosario, fichas de puestos y testimonios de clientes.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ResourcesPage locale="es" cmsNavigation={cmsNavigation} />;
}
