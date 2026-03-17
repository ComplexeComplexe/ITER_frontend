import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import { DafSubContent } from "@/lib/content/daf-sub";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

interface DafSubPageProps {
  locale: Locale;
  content: DafSubContent;
  cmsNavigation?: CmsNavItem[];
}

export default function DafSubPage({ locale, content, cmsNavigation }: DafSubPageProps) {
  const contactPath = getContactPath(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: content.parentLabel, href: content.parentHref },
              { label: content.breadcrumbLabel },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {content.h1}
          </h1>
          {content.sections[0] &&
            content.sections[0].content.map((p, i) => (
              <p
                key={i}
                className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3"
              >
                {p}
              </p>
            ))}
          <Link
            href={contactPath}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
          >
            {content.ctaButton}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Body Sections */}
      {content.sections.slice(1).map((section, i) => {
        const isAlt = i % 2 === 0;
        return (
          <section
            key={i}
            className={
              isAlt
                ? "bg-muted/30 py-24 lg:py-32"
                : "bg-background py-24 lg:py-16"
            }
          >
            <div className="container max-w-3xl">
              {section.heading && (
                <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-6">
                  {section.heading}
                </h2>
              )}
              {section.content.map((p, j) => (
                <p
                  key={j}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        );
      })}

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
