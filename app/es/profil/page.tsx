import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnóstico Financiero Gratuito | Iter Advisors – DAF Externalizado",
  description:
    "Evalúe sus necesidades financieras en 2 minutos. Descubra cómo un DAF externalizado puede estructurar su crecimiento: previsiones, rondas de financiación, reporting, tesorería.",
  openGraph: {
    title: "Diagnóstico Financiero Gratuito | Iter Advisors",
    description:
      "Evalúe sus necesidades en 2 min y obtenga un diagnóstico personalizado. +100 empresas acompañadas, 5/5 Trustfolio.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <LeadGenPage locale="es" cmsNavigation={cmsNavigation} />;
}
