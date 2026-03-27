import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceSinglePage from "@/components/pages/ServiceSinglePage";
import {
  getServiceSinglePage,
  getCmsNavigation,
  SERVICE_PAGE_SLUGS,
  SERVICE_PAGE_API_MAP,
  type ServicePageSlug,
} from "@/lib/strapi";
import { buildStrapiMetadata } from "@/lib/metadata";

const basePath = "/services";

const fallbackTitles: Record<ServicePageSlug, string> = {
  "previsionnel-tresorerie": "Prévisionnel de trésorerie | Iter Advisors",
  "gestion-financiere-externalisee": "Gestion financière externalisée | Iter Advisors",
  "accompagnement-levee-de-fond": "Accompagnement levée de fonds | Iter Advisors",
  "comptabilite-externalisation": "Externaliser sa comptabilité | Iter Advisors",
  "controle-de-gestion-externalise": "Contrôle de gestion | Iter Advisors",
};

function isServicePageSlug(slug: string): slug is ServicePageSlug {
  return (SERVICE_PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function generateStaticParams() {
  return SERVICE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServicePageSlug(slug)) {
    return { title: "Services | Iter Advisors" };
  }
  const endpoint = SERVICE_PAGE_API_MAP[slug];
  return buildStrapiMetadata({
    endpoint,
    locale: "fr",
    path: `${basePath}/${slug}`,
    fallbackTitle: fallbackTitles[slug],
    fallbackDescription: "Services de direction financière et d'accompagnement par Iter Advisors.",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServicePageSlug(slug)) notFound();
  const page = await getServiceSinglePage(slug, "fr");
  if (!page) notFound();
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <ServiceSinglePage
      locale="fr"
      page={page}
      breadcrumbTitle={page.heroTitle}
      slug={slug}
      cmsNavigation={cmsNavigation}
    />
  );
}
