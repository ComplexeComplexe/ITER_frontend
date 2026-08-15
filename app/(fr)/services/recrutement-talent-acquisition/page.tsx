import { Metadata } from "next";
import { notFound } from "next/navigation";
import HRServicePage from "@/components/pages/HRServicePage";
import { buildMetadata } from "@/lib/metadata";
import { getHRServiceContent } from "@/lib/content/hr-services";

const SLUG = "recrutement-talent-acquisition";

export async function generateMetadata(): Promise<Metadata> {
  const content = getHRServiceContent(SLUG);
  if (!content) return { title: "Service | Iter Advisors" };
  return buildMetadata({
    locale: "fr",
    title: content.meta.title,
    description: content.meta.description,
    path: `/services/${SLUG}`,
    // GSC-03 (2026-07-30): FR-only service, no /en or /es route exists.
    disableHreflang: ["en", "es"],
  });
}

export default async function Page() {
  const content = getHRServiceContent(SLUG);
  if (!content) return notFound();
  const cmsNavigation = undefined;
  return <HRServicePage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
