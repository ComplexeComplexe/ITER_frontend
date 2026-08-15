import { Metadata } from "next";
import LeyBeckhamPage from "@/components/pages/LeyBeckhamPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getLeyBeckhamContent } from "@/lib/content/ley-beckham";

export async function generateMetadata(): Promise<Metadata> {
  const t = getLeyBeckhamContent("en");
  return buildMetadata({
    locale: "en",
    path: "/services/ley-beckham",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  const content = getLeyBeckhamContent("en");
  return <LeyBeckhamPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
