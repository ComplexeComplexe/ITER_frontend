import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCanonicalServiceSlug, getServiceSlugsForLocale } from "@/lib/static-content";
import { getFinanceServices } from "@/lib/content/finance-service-locales";
import { alignedPaths } from "@/lib/content/locale-publication";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
const locale = "es";
function findService(slug: string) {
  const canonical = getCanonicalServiceSlug(locale, slug);
  return Object.values(getFinanceServices(locale)).find(service => service.path === `/services/${canonical}`);
}
export function generateStaticParams() { return getServiceSlugsForLocale(locale).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = findService((await params).slug);
  if (!service) notFound();
  const paths = alignedPaths(service.path)!;
  return buildMetadata({ locale, path: paths[locale], title: service.title, description: service.description, localizedPaths: paths });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const service = findService((await params).slug);
  if (!service) notFound();
  return <FinanceServicePage locale={locale} service={service} />;
}
