import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Rocket,
  BarChart3,
  Briefcase,
  Wallet,
  Handshake,
  Users,
  UserPlus,
  CreditCard,
  GraduationCap,
  Scale,
} from "lucide-react";

const financeIcons = [Rocket, BarChart3, Wallet, Briefcase, Handshake];
const rhIcons = [Users, UserPlus, CreditCard, GraduationCap, Scale];

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
  const financeServices = t.services.filter((s) => s.category === "finance");
  const rhServices = t.services.filter((s) => s.category === "rh");

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.hero.h1 }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl">
                {t.hero.h1}
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mt-6">
                {t.intro.paragraph}
              </p>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/bg-hero-3d.webp"
                alt={locale === "fr" ? "Services Iter Advisors" : "Iter Advisors Services"}
                width={560}
                height={400}
                className="rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-3xl">
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            {t.intro.paragraph}
          </p>
          <ul className="space-y-3 mb-12">
            {t.intro.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 bg-iter-violet rounded-full flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-6">
            {t.body.heading}
          </h2>
          {t.body.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Finance Services */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <span className="px-4 py-1.5 rounded-full bg-iter-violet text-white text-sm font-semibold">
              Finance
            </span>
            <div className="h-px flex-1 bg-iter-violet/20" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {financeServices.map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-iter-violet/30 transition-all duration-300"
              >
                {(() => {
                  const SIcon = financeIcons[i % financeIcons.length];
                  return (
                    <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-4 group-hover:bg-iter-violet/20 transition-colors">
                      <SIcon size={22} className="text-iter-violet" />
                    </div>
                  );
                })()}
                <h3 className="text-lg font-semibold font-heading mt-2 mb-4 group-hover:text-iter-violet transition-colors">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {locale === "fr"
                    ? "Decouvrir"
                    : locale === "en"
                      ? "Discover"
                      : "Descubra"}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* RH Services */}
          <div className="flex items-center gap-3 mb-10 mt-20">
            <span className="px-4 py-1.5 rounded-full bg-iter-chartreuse text-iter-dark text-sm font-semibold">
              {locale === "fr"
                ? "Ressources humaines"
                : locale === "en"
                  ? "Human Resources"
                  : "Recursos humanos"}
            </span>
            <div className="h-px flex-1 bg-iter-chartreuse/30" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rhServices.map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group bg-background border border-border/50 rounded-2xl p-8 hover:border-iter-chartreuse/40 transition-all duration-300"
              >
                {(() => {
                  const SIcon = rhIcons[i % rhIcons.length];
                  return (
                    <div className="w-12 h-12 rounded-xl bg-iter-chartreuse/15 flex items-center justify-center mb-4 group-hover:bg-iter-chartreuse/25 transition-colors">
                      <SIcon size={22} className="text-iter-dark" />
                    </div>
                  );
                })()}
                <h3 className="text-lg font-semibold font-heading mt-2 mb-4 group-hover:text-iter-dark transition-colors">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/40 group-hover:text-iter-dark transition-colors">
                  {locale === "fr"
                    ? "Decouvrir"
                    : locale === "en"
                      ? "Discover"
                      : "Descubra"}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
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
