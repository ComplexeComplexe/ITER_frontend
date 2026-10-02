import { buildMetadata } from "@/lib/metadata";
import { alignedPaths } from "@/lib/content/locale-publication";
import { iaText } from "@/lib/content/ia-finance-interface";
import IaFinanceHub, { IA_HUB_TITLE, IA_HUB_DESCRIPTION } from "@/components/pages/IaFinanceHub";
const locale = "en";
const paths = alignedPaths("/ressources/ia-finance")!;
export const metadata = buildMetadata({ locale, path: paths[locale], title: iaText(locale, IA_HUB_TITLE), description: iaText(locale, IA_HUB_DESCRIPTION), localizedPaths: paths });
export default function Page() { return <IaFinanceHub locale={locale} />; }
