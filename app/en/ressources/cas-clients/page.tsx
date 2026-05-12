import { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import CaseStudiesPage from "@/components/pages/CaseStudiesPage";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";

const t = {
  en: {
    title: "Case Studies CFO | Iter Advisors",
    description: "CFO outsourcing case studies: testimonials from SMEs, startups, scale-ups. 5/5 on Trustfolio (31 verified reviews). Real results, growth guaranteed.",
    breadcrumb: "Case Studies",
  },
};

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: t.en.title,
  description: t.en.description,
  path: "/ressources/cas-clients",
});

const breadcrumbsByLocale: Record<Locale, { label: string; href: string }> = {
  en: { label: "Resources", href: "/en/ressources" },
  fr: { label: "Ressources", href: "/ressources" },
  es: { label: "Recursos", href: "/es/ressources" },
};

function CasClientsPageContent({ locale }: { locale: Locale }) {
  const bc = breadcrumbsByLocale[locale];
  const content = locale === "en" ? t.en : null;

  if (!content) return null;

  return (
    <PageLayout locale={locale}>
      {/* Hero Section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: bc.label, href: bc.href },
              { label: content.breadcrumb },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              Our case studies
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover how we have supported SMEs, startups and scale-ups in their financial growth.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <div className="bg-background">
        <CaseStudiesPage locale="en" cmsNavigation={undefined} />
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted/30">
        <TestimonialsListingPage locale="en" cmsNavigation={undefined} asSection />
      </div>

      <CTASection locale="en" />
    </PageLayout>
  );
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <CasClientsPageContent locale="en" />;
}
