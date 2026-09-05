import { Metadata } from "next";
import LeyBeckhamPage from "@/components/pages/LeyBeckhamPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getLeyBeckhamContent } from "@/lib/content/ley-beckham";

export async function generateMetadata(): Promise<Metadata> {
  const t = getLeyBeckhamContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/ley-beckham",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getLeyBeckhamContent("fr");
  return <LeyBeckhamPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
