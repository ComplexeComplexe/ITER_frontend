import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "en",
    // SEO-P0-03: canonical EN points to /en/fractional-cfo (the primary EN URL).
    // /en/daf-outsourcing is kept for backward-compat redirects but should not
    // compete with /en/fractional-cfo in the index.
    path: "/en/fractional-cfo",
    localizedPaths: { fr: "/daf-externalise", en: "/en/fractional-cfo", es: "/externalizacion-daf" },
    fallbackTitle: "Fractional CFO for Startups & SMEs | Iter Advisors",
    fallbackDescription: "Hire a part-time CFO from 2 days/month. Cash-flow forecasting, fundraising support, financial reporting - 50+ companies served across Barcelona, Paris and Toulouse. Free consultation.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <DafPage locale="en" cmsNavigation={cmsNavigation} />;
}
