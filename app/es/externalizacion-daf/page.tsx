import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "es",
    path: "/externalizacion-daf",
    localizedPaths: { fr: "/daf-externalise", en: "/daf-outsourcing", es: "/externalizacion-daf" },
    fallbackTitle: "Externalización DAF | Iter Advisors",
    fallbackDescription: "CFO externalizado para pymes y startups.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafPage locale="es" cmsNavigation={cmsNavigation} />;
}
