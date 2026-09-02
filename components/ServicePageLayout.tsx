import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import AuthorByline from "@/components/AuthorByline";
import ClientTestimonials from "@/components/ClientTestimonials";

export interface ServiceContent {
  meta: {
    title: string;
    description: string;
  };
  author?: {
    name: string;
    jobTitle: string;
    linkedInUrl: string;
    avatarUrl: string;
    updateDate: string;
  };
  tldr?: string;
  h1: string;
  testimonials?: Array<{
    name: string;
    company: string;
    sector: string;
    text: string;
    rating: number;
  }>;
  sources?: string[];
  sections: Array<any>;
}

interface ServicePageLayoutProps {
  locale: Locale;
  content: ServiceContent;
  cmsNavigation?: CmsNavItem[];
  breadcrumbLabel: string;
  sectionRenderer: (section: any, idx: number) => React.ReactNode;
  trustfolioUrl?: string;
}

export default function ServicePageLayout({
  locale,
  content,
  cmsNavigation,
  breadcrumbLabel,
  sectionRenderer,
  trustfolioUrl = "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
}: ServicePageLayoutProps) {
  const t = content;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: locale === "fr" ? "Services" : "Services", href: "/services" },
              { label: breadcrumbLabel },
            ]}
          />

          {/* Author Byline */}
          {t.author && (
            <div className="mt-6 sm:mt-8">
              <AuthorByline
                name={t.author.name}
                jobTitle={t.author.jobTitle}
                linkedInUrl={t.author.linkedInUrl}
                avatarUrl={t.author.avatarUrl}
                updateDate={t.author.updateDate}
                locale={locale}
              />
            </div>
          )}

          {/* Heading */}
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {t.h1}
            </h1>

            {/* TL;DR Block */}
            {t.tldr && (
              <div className="mb-8 p-6 bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg">
                <p className="text-sm font-semibold text-foreground mb-2">
                  {locale === "fr" ? "En une ligne" : "One-liner"}
                </p>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {t.tldr}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={BOOKING_URL}
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-2"
            >
              {locale === "fr" ? "Demander un devis" : "Request a quote"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {t.sections.map(sectionRenderer)}
        </div>
      </section>

      {/* Testimonials Section */}
      {t.testimonials && (
        <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/5">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-12 text-center">
              {locale === "fr" ? "Avis de nos clients" : "Client Reviews"}
            </h2>
            <ClientTestimonials
              testimonials={t.testimonials}
              trustfolioUrl={trustfolioUrl}
            />
          </div>
        </section>
      )}

      {/* Sources Section */}
      {t.sources && (
        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
              {locale === "fr"
                ? "Sources et références"
                : "Sources and References"}
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <ul className="space-y-3">
                {t.sources.map((source: string, idx: number) => (
                  <li key={idx} className="text-sm sm:text-base text-muted-foreground">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground mt-8 pt-8 border-t">
              {locale === "fr"
                ? "Les chiffres et références citées dans cet article proviennent de sources publiques officielles. Nous nous engageons à maintenir la pertinence et l'exactitude de ces informations."
                : "All figures and references mentioned in this article come from official public sources. We commit to maintaining accuracy and relevance of this information."}
            </p>
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
