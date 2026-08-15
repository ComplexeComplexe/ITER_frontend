import { Metadata } from "next";
import DafLocalPage from "@/components/pages/DafLocalPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafLocalContent } from "@/lib/content/daf-local";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafLocalContent("toulouse", "es");
  return buildMetadata({
    locale: "es",
    path: "/cfo-externalizado-toulouse",
    localizedPaths: { fr: "/daf-externalise-toulouse", en: "/outsourced-cfo-toulouse", es: "/cfo-externalizado-toulouse" },
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafLocalPage locale="es" city="toulouse" cmsNavigation={cmsNavigation} />;
}
