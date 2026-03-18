import Link from "next/link";
import { ArrowRight, Briefcase, Users, Globe, Heart, Zap, Coffee } from "lucide-react";

const jobIcons = [Briefcase, Users, Globe, Heart, Zap, Coffee];
import { Locale } from "@/lib/i18n";
import { getJobsContent } from "@/lib/content/jobs";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export default function JobsPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getJobsContent(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: "Jobs" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">{t.hero.h1}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "À propos" : locale === "en" ? "About" : "Acerca de"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">{t.about.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{t.about.paragraph}</p>
        </div>
      </section>

      <div className="container"><div className="border-b border-border/50" /></div>

      {/* Job Cards */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-8 block">
            {locale === "fr" ? "Nos offres" : locale === "en" ? "Open positions" : "Ofertas"}
          </span>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {t.jobs.map((job, i) => (
              <Link
                key={i}
                href={job.href}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-iter-violet/30 transition-all duration-300"
              >
                {(() => { const Icon = jobIcons[i] || Briefcase; return <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-4"><Icon size={20} className="text-iter-violet" /></div>; })()}
                <h3 className="text-lg font-semibold font-heading mb-4 group-hover:text-iter-violet transition-colors">
                  {job.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {t.discoverLabel}
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
