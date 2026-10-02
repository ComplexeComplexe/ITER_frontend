import { Metadata } from "next";
import DafLocalPage from "@/components/pages/DafLocalPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getDafLocalContent } from "@/lib/content/daf-local";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafLocalContent("toulouse", "en");
  return buildMetadata({
    locale: "en",
    path: "/fractional-cfo-toulouse",
    localizedPaths: { fr: "/daf-externalise-toulouse", en: "/fractional-cfo-toulouse", es: "/cfo-externalizado-toulouse" },
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafLocalPage locale="en" city="toulouse" cmsNavigation={cmsNavigation} />;
}
