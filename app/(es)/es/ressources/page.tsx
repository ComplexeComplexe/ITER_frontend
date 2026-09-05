import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Recursos CFO Externalizado | Iter Advisors",
  description: "Recursos CFO: blog finanzas, glosario, fichas de puestos, testimonios. Guías gratis sobre CFO externalizado, levantamiento de fondos, contabilidad.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ResourcesPage locale="es" cmsNavigation={cmsNavigation} />;
}
