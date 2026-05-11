import { Metadata } from "next";
import GlossaryEntryPage from "@/components/pages/GlossaryEntryPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getGlossaryEntryContent } from "@/lib/content/glossary-entries";
import { getCmsNavigation } from "@/lib/strapi";
import { Locale } from "@/lib/i18n";

const validSlugs = [
  "bfr",
  "ebitda",
  "cfo",
  // TICKET 21 — 8 nouvelles pages glossaire dédiées
  "besoin-fonds-roulement-bfr",
  "cash-burn-runway",
  "cac-ltv",
  "arr-mrr",
  "churn-rate",
  "run-rate",
  "bspce-bsa",
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    return {
      title: "Not Found",
      description: "Glossary entry not found",
    };
  }

  return buildStrapiMetadata({
    endpoint: `glossary-${slug}`,
    locale: "fr",
    path: `/ressources/glossaire/${slug}`,
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    return <div>Glossary entry not found</div>;
  }

  const cmsNavigation = await getCmsNavigation("fr");
  return <GlossaryEntryPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
