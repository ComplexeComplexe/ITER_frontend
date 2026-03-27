"use client";

import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { getToolsContent, type ToolCategory } from "@/lib/content/tools";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calculator,
  Landmark,
  CreditCard,
  BarChart3,
  Layers,
  Users,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon mapping per category id                                       */
/* ------------------------------------------------------------------ */

const categoryIcons: Record<string, typeof Calculator> = {
  comptabilite: Calculator,
  accounting: Calculator,
  contabilidad: Calculator,
  tresorerie: Landmark,
  treasury: Landmark,
  tesoreria: Landmark,
  banque: CreditCard,
  banking: CreditCard,
  banca: CreditCard,
  reporting: BarChart3,
  erp: Layers,
  collaboration: Users,
  colaboracion: Users,
};

/* ------------------------------------------------------------------ */
/*  Category section                                                   */
/* ------------------------------------------------------------------ */

function CategorySection({
  category,
  index,
}: {
  category: ToolCategory;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = categoryIcons[category.id] || Layers;

  return (
    <section
      className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
    >
      <div className="container py-16 lg:py-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Category header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center">
              <Icon size={20} className="text-iter-violet" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground">
              {category.heading}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            {category.description}
          </p>

          {/* Tools grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.tools.map((tool, ti) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: ti * 0.06 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/50 bg-background hover:border-iter-violet/30 hover:shadow-lg hover:shadow-iter-violet/5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Tool initial as avatar */}
                      <div className="w-10 h-10 rounded-xl bg-iter-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {tool.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-foreground text-base group-hover:text-iter-violet transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground/40 group-hover:text-iter-violet transition-colors shrink-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function ToolsPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getToolsContent(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.resourcesLabel, href: t.resourcesHref },
              { label: t.breadcrumbLabel },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-3xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-iter-violet">23</span>
              <span className="text-sm text-muted-foreground">
                {locale === "fr" ? "outils maîtrisés" : locale === "en" ? "tools mastered" : "herramientas dominadas"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-iter-violet">6</span>
              <span className="text-sm text-muted-foreground">
                {locale === "fr" ? "catégories" : locale === "en" ? "categories" : "categorías"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-iter-violet">100%</span>
              <span className="text-sm text-muted-foreground">
                {locale === "fr" ? "cloud & SaaS" : "cloud & SaaS"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {t.categories.map((category, i) => (
        <CategorySection key={category.id} category={category} index={i} />
      ))}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
