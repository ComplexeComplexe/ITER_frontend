import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import FicheMetierDetailPage from "@/components/pages/FicheMetierDetailPage";
import { getJobMetierBySlugOrSlugifiedTitle, getJobMetiers, getJobMetierSlugForUrl, getCmsNavigation } from "@/lib/strapi";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getLocalePath } from "@/lib/i18n";

const basePath = "/daf-externalise/metier";

const breadcrumbsByLocale = {
  fr: { resourcesLabel: "Ressources", resourcesHref: "/ressources", fichesLabel: "Fiches métiers", fichesHref: "/daf-externalise/metier" },
  en: { resourcesLabel: "Resources", resourcesHref: "/en/ressources", fichesLabel: "Job descriptions", fichesHref: "/en/fractional-cfo/role" },
  es: { resourcesLabel: "Recursos", resourcesHref: "/es/recursos", fichesLabel: "Perfiles profesionales", fichesHref: "/es/recursos/fiche-metier" },
} as const;

export async function generateStaticParams() {
  try {
    const fiches = await getJobMetiers("en");
    return fiches.map((f) => ({ slug: getJobMetierSlugForUrl(f) })).filter((x) => typeof x.slug === "string" && x.slug.length > 0);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fiche = await getJobMetierBySlugOrSlugifiedTitle(slug, "en");
  const title = fiche?.seo?.metaTitle ?? fiche?.title ?? `${slug} | Iter Advisors`;
  const description = fiche?.seo?.metaDescription ?? "";
  return buildStrapiCollectionMetadata({
    endpoint: "job-metiers",
    slug,
    locale: "en",
    path: getLocalePath("en", `${basePath}/${slug}`),
    fallbackTitle: title,
    fallbackDescription: description,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [fiche, cmsNavigation] = await Promise.all([
    getJobMetierBySlugOrSlugifiedTitle(slug, "en"),
    getCmsNavigation("en"),
  ]);
  if (!fiche) notFound();
  const canonicalSlug = getJobMetierSlugForUrl(fiche);
  if (slug !== canonicalSlug) redirect(getLocalePath("en", `${basePath}/${canonicalSlug}`));
  return <FicheMetierDetailPage locale="en" fiche={fiche} breadcrumbs={breadcrumbsByLocale.en} cmsNavigation={cmsNavigation} />;
}
