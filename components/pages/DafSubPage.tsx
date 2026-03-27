import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
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

const sectionIcons = [TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap];

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
              >
                {content.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/about-section.webp"
                alt={content.h1}
                width={560}
                height={400}
                className="rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body Sections */}
      {content.sections.slice(1).map((section, i) => {
        const isAlt = i % 2 === 0;
        const Icon = sectionIcons[i % sectionIcons.length];
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-iter-violet" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground">
                    {section.heading}
                  </h2>
                </div>
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

      {/* Related Services */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Services lies" : locale === "en" ? "Related services" : "Servicios relacionados"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {locale === "fr" ? "Decouvrez nos autres expertises" : locale === "en" ? "Discover our other services" : "Descubra nuestros otros servicios"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "DAF externalizado", href: locale === "fr" ? "/daf-externalise" : `/${locale}/daf-externalise`, icon: TrendingUp },
              { title: locale === "fr" ? "Levee de fonds" : locale === "en" ? "Fund-raising" : "Levantamiento de fondos", href: locale === "fr" ? "/services/accompagnement-levee-de-fond" : `/${locale}/services/fund-raising-support`, icon: Rocket },
              { title: locale === "fr" ? "Controle de gestion" : locale === "en" ? "Management control" : "Control de gestion", href: locale === "fr" ? "/services/controle-de-gestion-externalise" : `/${locale}/services/outsourced-management-control`, icon: BarChart3 },
              { title: locale === "fr" ? "Gestion de tresorerie" : locale === "en" ? "Cash flow management" : "Gestion de tesoreria", href: locale === "fr" ? "/services/previsionnel-tresorerie" : `/${locale}/services/cash-flow-forecast`, icon: Shield },
              { title: locale === "fr" ? "DRH externalisé" : locale === "en" ? "Outsourced HR Director" : "DRH externalizado", href: locale === "fr" ? "/drh-externalise" : `/${locale}/drh-externalise`, icon: Target },
              { title: locale === "fr" ? "M&A & Due Diligence" : "M&A & Due Diligence", href: locale === "fr" ? "/services/ma-due-diligence" : `/${locale}/services/ma-due-diligence`, icon: Compass },
            ].map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group flex items-center gap-4 bg-background border border-border/50 rounded-2xl p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <service.icon size={20} className="text-iter-violet" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-iter-violet transition-colors">
                  {service.title}
                </span>
                <ArrowRight size={16} className="ml-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
