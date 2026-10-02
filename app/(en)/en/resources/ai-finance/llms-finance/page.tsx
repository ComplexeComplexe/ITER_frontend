import { buildMetadata } from "@/lib/metadata";
import { alignedPaths } from "@/lib/content/locale-publication";
import { getIaGuide } from "@/lib/content/ia-finance-locales";
import IaFinanceGuide from "@/components/pages/IaFinanceGuide";
const locale = "en";
const SLUG = "llm-finance";
const guide = getIaGuide(locale, SLUG);
const paths = alignedPaths("/ressources/ia-finance/llm-finance")!;
export const metadata = buildMetadata({ locale, path: paths[locale], title: guide.metaTitle ?? guide.title, description: guide.description, localizedPaths: paths });
export default function Page() { return <IaFinanceGuide locale={locale} slug={SLUG} />; }
