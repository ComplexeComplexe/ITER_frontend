import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDetailPage from "@/components/pages/JobDetailPage";
import {
  getJobOffers,
  getJobOfferBySlug,
  getCmsNavigation,
} from "@/lib/strapi";

export async function generateStaticParams() {
  const jobs = await getJobOffers("fr");
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOfferBySlug(slug, "fr");
  if (!job) {
    return { title: "Jobs | Iter Advisors" };
  }
  const title = job.seo?.metaTitle || `${job.title} | Iter Advisors`;
  const description =
    job.seo?.metaDescription ||
    `Découvrez l'offre d'emploi ${job.title} chez Iter Advisors. ${job.location} - ${job.contractType}.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobOfferBySlug(slug, "fr");
  if (!job) notFound();
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <JobDetailPage locale="fr" job={job} cmsNavigation={cmsNavigation} />
  );
}
