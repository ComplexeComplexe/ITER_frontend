import { buildMetadata } from "@/lib/metadata";
import { IA_GUIDES } from "@/lib/content/ia-finance-guides";
import IaFinanceGuide from "@/components/pages/IaFinanceGuide";

const SLUG = "chatgpt-finance";
const guide = IA_GUIDES[SLUG];
export const metadata = buildMetadata({
  locale: "fr", title: guide.metaTitle ?? guide.title, description: guide.description,
  path: `/ressources/ia-finance/${SLUG}`, disableHreflang: ["en", "es"],
});
export default function Page() { return <IaFinanceGuide slug={SLUG} />; }
