import { Metadata } from "next";
import LeadGenPage from "@/components/pages/LeadGenPage";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Diagnóstico Financiero | Iter Advisors",
  description: "Evalúe sus necesidades financieras en 2 minutos. Diagnóstico personalizado gratis. Descubra cómo un CFO externalizado puede ayudar.",
  // INDEX-03: lead-gen funnel — no SEO value, dilutes crawl budget.
  robots: { index: false, follow: false },
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
