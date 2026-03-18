import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDetailPage from "@/components/pages/JobDetailPage";
import {
  getJobOffers,
  getJobOfferBySlug,
  getCmsNavigation,
} from "@/lib/strapi";

export async function generateStaticParams() {
  const jobs = await getJobOffers("en");
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobOfferBySlug(slug, "en");
  if (!job) {
    return { title: "Jobs | Iter Advisors" };
  }
  const title = job.seo?.metaTitle || `${job.title} | Iter Advisors`;
  const description =
    job.seo?.metaDescription ||
    `Discover the ${job.title} position at Iter Advisors. ${job.location} - ${job.contractType}.`;
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
  const job = await getJobOfferBySlug(slug, "en");
  if (!job) notFound();
  const cmsNavigation = await getCmsNavigation("en");
  return (
    <JobDetailPage locale="en" job={job} cmsNavigation={cmsNavigation} />
  );
}
