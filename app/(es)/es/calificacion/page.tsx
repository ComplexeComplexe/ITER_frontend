import { Metadata } from "next";
import QualificationPage from "@/components/pages/QualificationPage";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata: Metadata = {
  title: "Calificación Empresas | Iter Advisors",
  description:
    "Califique su empresa en 5 minutos y reciba un análisis personalizado de su madurez financiera. Recomendaciones a medida de nuestros expertos DAF.",
  // INDEX-03: qualification funnel — no SEO value.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Calificación Empresa | Iter Advisors",
    description:
      "Califique su empresa en 5 minutos. Análisis de madurez financiera personalizado.",
    type: "website",
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <QualificationPage locale="es" cmsNavigation={cmsNavigation} />;
}
