import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Casos Éxito | Iter Advisors",
  description: "Resultados concretos para empresas ambiciosas. Casos de éxito: startups y pymes. 50+ clientes, €100M+ levantados, 5/5 Trustfolio.",
  openGraph: {
    title: "Casos de Éxito | Iter Advisors",
    description:
      "Resultados concretos para empresas ambiciosas. Casos de éxito: HappyScribe, Surfe, Ukio, Seasonly, Neat, Yego.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <CasClientsPage locale="es" cmsNavigation={cmsNavigation} />;
}
