import { Metadata } from "next";
import LeadPage from "@/components/pages/LeadPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | Iter Advisors – DAF Externalizado",
  description:
    "Evalúe sus necesidades financieras en 2 minutos y descubra cómo un DAF externalizado puede estructurar su crecimiento. Diagnóstico gratuito y sin compromiso.",
  openGraph: {
    title: "Diagnóstico Gratuito | Iter Advisors",
    description:
      "Evalúe sus necesidades financieras en 2 minutos. DAF externalizado para startups y PYMEs.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <LeadPage locale="es" cmsNavigation={cmsNavigation} />;
}
