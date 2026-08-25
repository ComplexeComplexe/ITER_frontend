import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("es", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "es",
    path: "/externalizacion-daf/transicion",
    localizedPaths: {
      fr: "/daf-externalise/transition",
      en: "/fractional-cfo/transition",
      es: "/externalizacion-daf/transicion",
    },
    fallbackTitle: "CFO de transición: acompañamiento al cambio | Iter Advisors",
    fallbackDescription: "CFO de transición para vacante de puesto, crisis de tesorería o reestructuración. Intervención senior a tiempo casi completo, de 3 a 12 meses.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafSubPage locale="es" content={content} cmsNavigation={cmsNavigation} />;
}
