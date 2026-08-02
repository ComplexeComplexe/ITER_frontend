import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import { DafSubContent } from "@/lib/content/daf-sub";
import { parseDafSubFaqItem } from "@/lib/daf-sub-schema";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

interface DafSubPageProps {
  locale: Locale;
  content: DafSubContent;
  cmsNavigation?: CmsNavItem[];
  /** Per-route hero illustration. Displayed below the hero text when provided. */
  heroImage?: { src: string; alt: string };
}

const sectionIcons = [TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap];

/** Detect whether a section heading marks a FAQ block */
function isFaqHeading(heading?: string): boolean {
  if (!heading) return false;
  const h = heading.toLowerCase();
  return (
    h.startsWith("faq") ||
    h.includes("questions fréquentes") ||
    h.includes("questions frequentes")
  );
}

/**
 * Découpage Q/R des items de FAQ. Partagé avec buildDafSubFaqSchema pour que
 * l'accordéon visible et le JSON-LD FAQPage soient identiques au caractère
 * près (exigence Google).
 */
const parseFaqItem = parseDafSubFaqItem;

/** ReactMarkdown component overrides: inline elements only (no block <p>). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdComponents: any = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  p: ({ node, ...props }: any) => <span {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  a: ({ node, href, children, ...props }: any) => (
    <Link
      href={href || "#"}
      className="text-iter-violet underline underline-offset-2 hover:no-underline"
      {...props}
    >
      {children}
    </Link>
  ),
};

export default function DafSubPage({ locale, content, cmsNavigation, heroImage }: DafSubPageProps) {
  const firstSection = content.sections[0];
  const bodySections = content.sections.slice(1);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: content.parentLabel, href: content.parentHref },
              { label: content.breadcrumbLabel },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {content.h1}
            </h1>

            {/* Intro paragraphs from section 0 */}
            {firstSection?.content.map((p, i) => (
              <div
                key={i}
                className={`mb-4 leading-relaxed prose prose-sm max-w-none [&>p]:m-0 [&>strong]:font-semibold [&>strong]:text-foreground [&>a]:text-iter-violet [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:no-underline ${
                  i === 0
                    ? "text-base sm:text-lg text-foreground/80 font-medium"
                    : "text-sm sm:text-base text-muted-foreground"
                }`}
              >
                <ReactMarkdown components={mdComponents}>{p}</ReactMarkdown>
              </div>
            ))}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                {content.ctaButton}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={content.parentHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                {content.parentLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Optional hero illustration ─── */}
      {heroImage && (
        <section className="bg-background pt-0 pb-8 sm:pb-12">
          <div className="container max-w-3xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={800}
              height={450}
              className="rounded-2xl object-cover w-full"
              priority={false}
            />
          </div>
        </section>
      )}

      {/* ─── Body sections ─── */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container max-w-3xl">
          {bodySections.map((section, i) => {
            const isFaq = isFaqHeading(section.heading);
            const Icon = sectionIcons[i % sectionIcons.length];

            return (
              <div key={i} className="scroll-mt-24 mb-12 sm:mb-16 lg:mb-20">

                {/* Section heading */}
                {section.heading && (
                  <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                    <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-iter-violet" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground leading-tight">
                      {section.heading}
                    </h2>
                  </div>
                )}

                {/* FAQ accordion */}
                {isFaq ? (
                  <div className="space-y-3">
                    {section.content.map((item, j) => {
                      const faqItem = parseFaqItem(item);
                      if (faqItem) {
                        return (
                          <details
                            key={j}
                            className="group rounded-lg border border-border/60 bg-background"
                          >
                            <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                              <h3 className="text-base sm:text-lg font-heading m-0">
                                {faqItem.question}
                              </h3>
                              <span
                                aria-hidden="true"
                                className="text-iter-violet shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                              >
                                +
                              </span>
                            </summary>
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                              <p>{faqItem.answer}</p>
                            </div>
                          </details>
                        );
                      }
                      // Non-FAQ item inside a FAQ section — render as paragraph
                      return (
                        <div
                          key={j}
                          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 prose prose-sm max-w-none [&>p]:m-0 [&>strong]:font-semibold [&>strong]:text-foreground [&>a]:text-iter-violet [&>a]:underline [&>a]:underline-offset-2"
                        >
                          <ReactMarkdown components={mdComponents}>{item}</ReactMarkdown>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Regular prose paragraphs */
                  section.content.map((p, j) => (
                    <div
                      key={j}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 prose prose-sm max-w-none [&>p]:m-0 [&>strong]:font-semibold [&>strong]:text-foreground [&>a]:text-iter-violet [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:no-underline"
                    >
                      <ReactMarkdown components={mdComponents}>{p}</ReactMarkdown>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Related Services ─── */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Services liés" : locale === "en" ? "Related services" : "Servicios relacionados"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-8 sm:mb-10">
            {locale === "fr"
              ? "Découvrez nos autres expertises"
              : locale === "en"
                ? "Discover our other services"
                : "Descubra nuestros otros servicios"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                title:
                  locale === "fr"
                    ? "DAF externalisé"
                    : locale === "en"
                      ? "Outsourced CFO"
                      : "DAF externalizado",
                href:
                  locale === "fr" ? "/daf-externalise" : `/${locale}/daf-externalise`,
                icon: TrendingUp,
              },
              {
                title:
                  locale === "fr"
                    ? "DAF à temps partagé"
                    : locale === "en"
                      ? "Fractional CFO"
                      : "DAF a tiempo compartido",
                href:
                  locale === "fr"
                    ? "/daf-externalise/temps-partage"
                    : `/${locale}/daf-externalise/temps-partage`,
                icon: Rocket,
              },
              {
                title:
                  locale === "fr"
                    ? "DAF de transition"
                    : locale === "en"
                      ? "Transition CFO"
                      : "DAF de transición",
                href:
                  locale === "fr"
                    ? "/daf-externalise/transition"
                    : `/${locale}/daf-externalise/transition`,
                icon: BarChart3,
              },
              {
                title:
                  locale === "fr"
                    ? "Métier de DAF"
                    : locale === "en"
                      ? "CFO role & skills"
                      : "Profesión de DAF",
                href:
                  locale === "fr"
                    ? "/daf-externalise/metier"
                    : `/${locale}/daf-externalise/metier`,
                icon: Shield,
              },
              {
                title:
                  locale === "fr"
                    ? "Tarifs du DAF externalisé"
                    : locale === "en"
                      ? "CFO pricing"
                      : "Tarifas DAF externalizado",
                href:
                  locale === "fr"
                    ? "/daf-externalise/tarifs"
                    : `/${locale}/daf-externalise/tarifs`,
                icon: Target,
              },
              {
                title:
                  locale === "fr"
                    ? "DAF externalisé par secteur"
                    : locale === "en"
                      ? "CFO by industry"
                      : "DAF externalizado por sector",
                href:
                  locale === "fr"
                    ? "/daf-externalise/secteurs"
                    : `/${locale}/daf-externalise/secteurs`,
                icon: Compass,
              },
            ].map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="group flex items-center gap-4 bg-background border border-border/50 rounded-2xl p-5 sm:p-6 hover:border-iter-violet/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <service.icon size={20} className="text-iter-violet" strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-foreground group-hover:text-iter-violet transition-colors text-sm sm:text-base">
                  {service.title}
                </span>
                <ArrowRight
                  size={16}
                  className="ml-auto text-foreground/30 group-hover:text-iter-violet transition-all group-hover:translate-x-1"
                />
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
