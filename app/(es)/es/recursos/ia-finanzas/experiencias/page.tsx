import { buildMetadata } from "@/lib/metadata";
import { alignedPaths } from "@/lib/content/locale-publication";
import { getIaGuide } from "@/lib/content/ia-finance-locales";
import IaFinanceGuide from "@/components/pages/IaFinanceGuide";
const locale = "es";
const SLUG = "retours-experience";
const guide = getIaGuide(locale, SLUG);
const paths = alignedPaths("/ressources/ia-finance/retours-experience")!;
export const metadata = buildMetadata({ locale, path: paths[locale], title: guide.metaTitle ?? guide.title, description: guide.description, localizedPaths: paths });
export default function Page() { return <IaFinanceGuide locale={locale} slug={SLUG} />; }
