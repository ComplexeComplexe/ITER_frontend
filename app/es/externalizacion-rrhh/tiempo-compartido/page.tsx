import { Metadata } from "next";
import DrhSubPage from "@/components/pages/DrhSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhSubContent } from "@/lib/content/drh-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDrhSubContent("es", "tiempo-compartido")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-temps-partage-page",
    locale: "es",
    path: "/externalizacion-rrhh/tiempo-compartido",
    fallbackTitle: "RRHH a tiempo compartido | Iter Advisors",
    fallbackDescription: "RRHH a tiempo compartido: dirección de personas flexible para pymes y startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <DrhSubPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
