"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown, TrendingDown, Zap, Eye, Network, BarChart3, Wallet, Rocket, Settings, Compass } from "lucide-react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import { getDafContent } from "@/lib/content/daf";
import { faqPageSchema } from "@/lib/schemas";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

export default function DafPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getDafContent(locale);
  const contactPath = getContactPath(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/daf-section.webp"
                alt={locale === "fr" ? "DAF externalise - pilotage financier" : locale === "en" ? "Outsourced CFO - financial management" : "CFO externalizado - gestion financiera"}
                width={560}
                height={400}
                className="rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
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
          {t.whatIs.subsections?.map((sub, i) => (
            <div key={i} className="mt-10">
              <h3 className="text-lg font-semibold font-heading text-foreground mb-4">
                {sub.heading}
              </h3>
              {sub.content.map((p, j) => (
                <p
                  key={j}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              {locale === "fr"
                ? "Avantages"
                : locale === "en"
                  ? "Advantages"
                  : "Ventajas"}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">
              {t.advantages.heading}
            </h2>
            {t.advantages.content.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {t.advantages.subsections?.map((sub, i) => {
              const icons = [TrendingDown, Zap, Eye, Network];
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="group border border-border/50 rounded-2xl p-8 hover:border-iter-violet/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-4 group-hover:bg-iter-violet/20 transition-colors">
                    <Icon size={22} className="text-iter-violet" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading mt-2 mb-3 group-hover:text-iter-violet transition-colors">
                    {sub.heading}
                  </h3>
                  {sub.content.map((p, j) => (
                    <p
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Missions */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Nos missions"
              : locale === "en"
                ? "Our missions"
                : "Nuestras misiones"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-6">
            {t.missions.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{t.missions.content[0]}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.missions.content.slice(1).map((p, i) => {
              const missionIcons = [BarChart3, Wallet, Rocket, Settings, Compass];
              const MIcon = missionIcons[i % missionIcons.length];
              return (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-background">
                  <div className="w-10 h-10 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center shrink-0">
                    <MIcon size={18} className="text-iter-dark" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />

      {/* Why Choose */}
      <section className="bg-background py-24 lg:py-16">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Pourquoi nous"
              : locale === "en"
                ? "Why us"
                : "Por qué nosotros"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">
            {t.whyChoose.heading}
          </h2>
          {t.whyChoose.content.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(t.faq.map((item) => ({ question: item.question, answer: item.answer })))
          ),
        }}
      />

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
