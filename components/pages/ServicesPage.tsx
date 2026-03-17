import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getServicesContent } from "@/lib/content/services";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export default function ServicesPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getServicesContent(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.hero.h1 }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl">{t.hero.h1}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-3xl">
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">{t.intro.paragraph}</p>
          <ul className="space-y-3 mb-12">
            {t.intro.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 bg-iter-violet rounded-full flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">{t.body.heading}</h2>
          {t.body.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}
        </div>
      </section>

      <div className="container"><div className="border-b border-border/50" /></div>

      {/* Service Cards */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.services.map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-iter-violet/30 transition-all duration-300"
              >
                <span className="text-[11px] font-bold text-iter-violet/40 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold font-heading mt-2 mb-4 group-hover:text-iter-violet transition-colors">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {locale === "fr" ? "Découvrir" : locale === "en" ? "Discover" : "Descubra"}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
