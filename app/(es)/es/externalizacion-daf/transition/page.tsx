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
    path: "/externalizacion-daf/transition",
    localizedPaths: { fr: "/daf-externalise/transition", en: "/daf-outsourcing/transition", es: "/externalizacion-daf/transition" },
    fallbackTitle: "CFO de transición | Iter Advisors",
    fallbackDescription: "CFO de transición para acompañar sus cambios.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <DafSubPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
