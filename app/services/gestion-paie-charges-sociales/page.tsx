import { Metadata } from "next";
import { notFound } from "next/navigation";
import HRServicePage from "@/components/pages/HRServicePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getHRServiceContent } from "@/lib/content/hr-services";

const SLUG = "gestion-paie-charges-sociales";

export async function generateMetadata(): Promise<Metadata> {
  const content = getHRServiceContent(SLUG);
  if (!content) return { title: "Service | Iter Advisors" };
  return buildMetadata({
    locale: "fr",
    title: content.meta.title,
    description: content.meta.description,
    path: `/services/${SLUG}`,
  });
}

export default async function Page() {
  const content = getHRServiceContent(SLUG);
  if (!content) return notFound();
  const cmsNavigation = await getCmsNavigation("fr");
  return <HRServicePage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
