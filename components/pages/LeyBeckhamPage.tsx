"use client";

import { Locale } from "@/lib/i18n";
import { LeyBeckhamContent } from "@/lib/content/ley-beckham";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import type { CmsNavItem } from "@/lib/strapi";
import { motion } from "framer-motion";

const breadcrumbLabels: Record<Locale, { services: string; servicesHref: string; page: string }> = {
  fr: { services: "Services", servicesHref: "/services", page: "Loi Beckham" },
  en: { services: "Services", servicesHref: "/en/services", page: "Beckham Law" },
  es: { services: "Servicios", servicesHref: "/es/services", page: "Ley Beckham" },
};

interface LeyBeckhamPageProps {
  locale: Locale;
  content: LeyBeckhamContent;
  cmsNavigation?: CmsNavItem[];
}

export default function LeyBeckhamPage({ locale, content: t, cmsNavigation }: LeyBeckhamPageProps) {
  const bc = breadcrumbLabels[locale];

  /* FAQ structured data */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[{ label: bc.services, href: bc.servicesHref }, { label: bc.page }]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl lg:text-5xl font-bold font-heading text-foreground max-w-3xl mb-6"
          >
            {t.hero.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            {t.hero.intro}
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      {t.sections.map((section, i) => (
        <section key={i} className="bg-background py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-6">
              {section.heading}
            </h2>
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-headings:text-foreground">
              {section.content.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="bg-muted py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-12">
            {t.faq.title}
          </h2>
          <div className="space-y-8">
            {t.faq.items.map((item, i) => (
              <details key={i} className="group">
                <summary className="flex cursor-pointer items-center gap-4 font-semibold text-foreground hover:text-primary">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary/10 rounded group-open:bg-primary/20 transition-colors">
                    <span className="text-primary text-lg group-open:hidden">+</span>
                    <span className="text-primary text-lg hidden group-open:block">−</span>
                  </span>
                  {item.question}
                </summary>
                <div className="mt-4 ml-10 text-muted-foreground prose prose-neutral dark:prose-invert max-w-none">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
