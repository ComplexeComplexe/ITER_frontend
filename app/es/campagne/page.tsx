import { Metadata } from "next";
import CasClientsPage from "@/components/pages/CasClientsPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Casos de Éxito | Iter Advisors – Resultados concretos para empresas ambiciosas",
  description:
    "Descubra cómo Iter Advisors acompaña a startups, scale-ups y PYMEs: DAF externalizado, levantamiento de fondos, tesorería, control de gestión. Casos de éxito detallados con resultados medibles.",
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
