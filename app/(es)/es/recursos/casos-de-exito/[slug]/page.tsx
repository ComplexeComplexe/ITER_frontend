import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getReviewedCases, getReviewedCase } from "@/lib/content/documented-case-locales";
import { getCmsNavigation } from "@/lib/static-content";
import { alignedPaths } from "@/lib/content/locale-publication";
import DocumentedCasePage from "@/components/pages/DocumentedCasePage";

export const dynamicParams = false;
const locale = "es";
export function generateStaticParams() { return getReviewedCases(locale).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const item = getReviewedCase((await params).slug, locale);
  if (!item) notFound();
  return buildMetadata({ locale, path: item.href, title: item.metaTitle, description: item.summary, localizedPaths: alignedPaths(`/ressources/cas-clients/${item.slug}`) });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const item = getReviewedCase((await params).slug, locale);
  if (!item) notFound();
  return <DocumentedCasePage locale={locale} item={item} cmsNavigation={await getCmsNavigation(locale)} />;
}
