import DafSubPage from "@/components/pages/DafSubPage";
import { buildMetadata } from "@/lib/metadata";
import { getDafSectorContent } from "@/lib/content/daf-sector-locales";
import { getCmsNavigation } from "@/lib/static-content";
import { buildDafSubFaqSchema } from "@/lib/daf-sub-schema";
import { alignedPaths } from "@/lib/content/locale-publication";

const locale = "es";
const content = getDafSectorContent(locale, "secteurs");
const paths = alignedPaths("/daf-externalise/secteurs")!;
export const metadata = buildMetadata({ locale, path: paths[locale], title: content.meta.title, description: content.meta.description, localizedPaths: paths });
export default async function Page() {
  const schema = buildDafSubFaqSchema(content, locale);
  return <>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
    <DafSubPage locale={locale} content={content} cmsNavigation={await getCmsNavigation(locale)} contactContext="daf" />
  </>;
}
