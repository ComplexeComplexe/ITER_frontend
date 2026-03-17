"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import { getDrhContent } from "@/lib/content/drh";
import type { StrapiDrhServiceCategory, CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import DrhServicesGrid from "@/components/DrhServicesGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

function mapStrapiCategories(
  categories: StrapiDrhServiceCategory[] | undefined | null
): { categoryName: string; services: { title: string; description: string; tier1: boolean; tier2: boolean; tier3: boolean; tier4: boolean; isAddOn: boolean }[] }[] | null {
  if (!categories?.length) return null;
  return categories.map((cat) => ({
    categoryName: cat.categoryName,
    services: (cat.services ?? []).map((s) => ({
      title: s.title,
      description: s.description,
      tier1: !!s.tier1,
      tier2: !!s.tier2,
      tier3: !!s.tier3,
      tier4: !!s.tier4,
      isAddOn: !!s.isAddOn,
    })),
  }));
}

export default function DrhPage({
  locale,
  strapiCategories,
  cmsNavigation,
}: {
  locale: Locale;
  strapiCategories?: StrapiDrhServiceCategory[] | null;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getDrhContent(locale);
  const contactPath = getContactPath(locale);
  const gridCategories = mapStrapiCategories(strapiCategories ?? null);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          {t.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={contactPath}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
          >
            {t.ctaButton}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Partner */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Votre partenaire"
              : locale === "en"
                ? "Your partner"
                : "Su socio"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">
            {t.partnerSection.heading}
          </h2>
          {t.partnerSection.content.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* What Is */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Comprendre"
              : locale === "en"
                ? "Understand"
                : "Comprender"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-6">
            {t.whatIs.heading}
          </h2>
          {t.whatIs.content.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-background py-24 lg:py-32">
        <div className="container">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-10">
            {t.servicesGridHeading}
          </h2>
          <div className="rounded-2xl border border-border/50 overflow-hidden bg-card">
            <DrhServicesGrid
              categories={gridCategories}
              tierLabels={t.tierLabels}
              addOnLabel={t.addOnLabel}
            />
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />

      {/* FAQ */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">FAQ</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {t.faq.map((item, i) => (
              <FaqAccordionItem
                key={i}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}

function FaqAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left font-semibold hover:text-iter-violet transition-colors"
      >
        <span>{question}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 ml-4 text-foreground/30 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
