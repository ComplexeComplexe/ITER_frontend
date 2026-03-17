import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import FicheMetierDetailPage from "@/components/pages/FicheMetierDetailPage";
import { getJobMetierBySlugOrSlugifiedTitle, getJobMetiers, getJobMetierSlugForUrl, getCmsNavigation } from "@/lib/strapi";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getLocalePath } from "@/lib/i18n";

const basePath = "/ressources/fiche-metier";

const breadcrumbsByLocale = {
  fr: { resourcesLabel: "Ressources", resourcesHref: "/ressources", fichesLabel: "Fiches métiers", fichesHref: "/ressources/fiche-metier" },
  en: { resourcesLabel: "Resources", resourcesHref: "/en/ressources", fichesLabel: "Job descriptions", fichesHref: "/en/ressources/fiche-metier" },
  es: { resourcesLabel: "Recursos", resourcesHref: "/es/ressources", fichesLabel: "Perfiles profesionales", fichesHref: "/es/ressources/fiche-metier" },
} as const;

export async function generateStaticParams() {
  try {
    const fiches = await getJobMetiers("es");
    const slugs = fiches.map((f) => ({ slug: getJobMetierSlugForUrl(f) }));
    if (slugs.length > 0) return slugs;
  } catch {
    // ignore
  }
  return [{ slug: "__no_fiches__" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const fiche = await getJobMetierBySlugOrSlugifiedTitle(slug, "es");
  const title = fiche?.seo?.metaTitle ?? fiche?.title ?? `${slug} | Iter Advisors`;
  const description = fiche?.seo?.metaDescription ?? "";
  return buildStrapiCollectionMetadata({
    endpoint: "job-metiers",
    slug,
    locale: "es",
    path: getLocalePath("es", `${basePath}/${slug}`),
    fallbackTitle: title,
    fallbackDescription: description,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "__no_fiches__") notFound();
  const [fiche, cmsNavigation] = await Promise.all([
    getJobMetierBySlugOrSlugifiedTitle(slug, "es"),
    getCmsNavigation("es"),
  ]);
  if (!fiche) notFound();
  const canonicalSlug = getJobMetierSlugForUrl(fiche);
  if (slug !== canonicalSlug) redirect(getLocalePath("es", `${basePath}/${canonicalSlug}`));
  return (
    <FicheMetierDetailPage
      locale="es"
      fiche={fiche}
      breadcrumbs={breadcrumbsByLocale.es}
      cmsNavigation={cmsNavigation}
    />
  );
}
