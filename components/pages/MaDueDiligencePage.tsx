"use client";

import { Locale } from "@/lib/i18n";
import { MaDueDiligenceContent } from "@/lib/content/ma-due-diligence";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import type { CmsNavItem } from "@/lib/strapi";
import { motion } from "framer-motion";

const breadcrumbLabels: Record<Locale, { services: string; servicesHref: string; page: string }> = {
  fr: { services: "Services", servicesHref: "/services", page: "M&A et Due Diligence" },
  en: { services: "Services", servicesHref: "/en/services", page: "M&A and Due Diligence" },
  es: { services: "Servicios", servicesHref: "/es/services", page: "M&A y Due Diligence" },
};

interface MaDueDiligencePageProps {
  locale: Locale;
  content: MaDueDiligenceContent;
  cmsNavigation?: CmsNavItem[];
}

export default function MaDueDiligencePage({ locale, content: t, cmsNavigation }: MaDueDiligencePageProps) {
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
            <div
              className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                prose-headings:font-heading prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-iter-violet prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        </section>
      ))}

      {/* Services */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-12 text-center">
            {t.services.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-background p-6 rounded-xl border border-border/50"
              >
                <h3 className="text-lg font-semibold font-heading text-foreground mb-3">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background py-20">
        <div className="container max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-12 text-center">
            {t.process.title}
          </h2>
          <div className="space-y-8">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-iter-violet/10 flex items-center justify-center">
                  <span className="text-iter-violet font-bold text-sm">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20">
        <div className="container max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-12 text-center">
            {t.faq.title}
          </h2>
          <div className="space-y-6">
            {t.faq.items.map((item, i) => (
              <div key={i} className="bg-background p-6 rounded-xl border border-border/50">
                <h3 className="text-lg font-semibold font-heading text-foreground mb-3">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
