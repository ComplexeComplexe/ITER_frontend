import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getResourcesContent } from "@/lib/content/resources";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export default function ResourcesPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getResourcesContent(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Categories */}
      {t.categories.map((category, ci) => (
        <section
          key={ci}
          className={
            ci % 2 === 0
              ? "bg-background py-24 lg:py-16"
              : "bg-muted/30 py-24 lg:py-32"
          }
        >
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                  {category.heading}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold font-heading">
                  {category.heading}
                </h2>
              </div>
              <Link
                href={category.seeAllHref}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
              >
                {category.seeAllLabel}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.cards.map((card, i) => (
                <Link
                  key={i}
                  href={card.href}
                  className="group block relative aspect-[3/4] overflow-hidden rounded-2xl bg-iter-dark"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-iter-dark/90 via-iter-dark/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    {card.tag && (
                      <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-2">
                        {card.tag}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-white mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-iter-violet group-hover:text-white transition-colors">
                      {t.discover}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 sm:hidden">
              <Link
                href={category.seeAllHref}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
              >
                {category.seeAllLabel}
              </Link>
            </div>
          </div>
        </section>
      ))}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
