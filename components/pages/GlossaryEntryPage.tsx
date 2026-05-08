import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import { GlossaryEntryContent } from "@/lib/content/glossary-entries";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

interface GlossaryEntryPageProps {
  locale: Locale;
  content: GlossaryEntryContent;
  cmsNavigation?: CmsNavItem[];
}

export default function GlossaryEntryPage({ locale, content, cmsNavigation }: GlossaryEntryPageProps) {
  const contactPath = getContactPath(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: locale === "fr" ? "Glossaire" : locale === "en" ? "Glossary" : "Glosario", href: `/ressources/glossaire` },
              { label: content.h1 },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              {content.h1}
            </h1>
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
            >
              {locale === "fr" ? "Prendre rendez-vous" : locale === "en" ? "Make an appointment" : "Concierte una cita"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Body Sections */}
      {content.sections.map((section, i) => {
        const isAlt = i % 2 === 1;
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
                <div
                  key={j}
                  className="text-muted-foreground leading-relaxed mb-4 prose prose-sm max-w-none [&>p]:m-0 [&>strong]:font-bold [&>em]:italic [&>a]:text-iter-violet [&>a]:underline hover:[&>a]:no-underline"
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <span {...props} />,
                      a: ({ node, href, children, ...props }) => (
                        <Link href={href || "#"} {...props}>
                          {children}
                        </Link>
                      ),
                    }}
                  >
                    {p}
                  </ReactMarkdown>
                </div>
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
