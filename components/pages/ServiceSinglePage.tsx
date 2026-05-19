import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StrapiBlocks from "@/components/StrapiBlocks";
import type { StrapiServiceSinglePage, StrapiBlock, CmsNavItem } from "@/lib/strapi";
import { serviceSchema, faqPageSchema } from "@/lib/schemas";

const breadcrumbsByLocale: Record<
  Locale,
  { servicesLabel: string; servicesHref: string }
> = {
  fr: { servicesLabel: "Services", servicesHref: "/services" },
  en: { servicesLabel: "Services", servicesHref: "/en/services" },
  es: { servicesLabel: "Servicios", servicesHref: "/es/services" },
};

const sectionIcons = [TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap];

interface ServiceSinglePageProps {
  locale: Locale;
  page: StrapiServiceSinglePage;
  breadcrumbTitle: string;
  slug?: string;
  cmsNavigation?: CmsNavItem[];
  heroImage?: { src: string; alt: string };
}

/** Group Strapi content blocks by H2 headings into logical sections */
function groupBlocksByHeading(blocks: StrapiBlock[]): Array<{
  heading?: string;
  blocks: StrapiBlock[];
}> {
  const groups: Array<{ heading?: string; blocks: StrapiBlock[] }> = [];
  let currentGroup: { heading?: string; blocks: StrapiBlock[] } = { blocks: [] };

  blocks.forEach((block) => {
    if (block.type === "heading" && "level" in block && block.level === 2) {
      if (currentGroup.blocks.length > 0 || currentGroup.heading) {
        groups.push(currentGroup);
      }
      const headingText =
        "children" in block && Array.isArray(block.children)
          ? block.children.map((child: any) => child.text || "").join("")
          : "";
      currentGroup = { heading: headingText, blocks: [] };
    } else {
      currentGroup.blocks.push(block);
    }
  });

  if (currentGroup.blocks.length > 0 || currentGroup.heading) {
    groups.push(currentGroup);
  }

  return groups;
}

export default function ServiceSinglePage({
  locale,
  page,
  breadcrumbTitle,
  slug,
  cmsNavigation,
  heroImage,
}: ServiceSinglePageProps) {
  const bc = breadcrumbsByLocale[locale];
  const contactPath = getContactPath(locale);

  const basePath = locale === "fr" ? `/services` : `/${locale}/services`;
  const serviceUrl = `${basePath}/${slug || ""}`;

  const sections = groupBlocksByHeading(page.content);

  const faqLabel =
    locale === "fr"
      ? "Questions fréquentes"
      : locale === "en"
        ? "Frequently Asked Questions"
        : "Preguntas frecuentes";
  const relatedLabel =
    locale === "fr"
      ? "Découvrez nos autres expertises"
      : locale === "en"
        ? "Discover our other services"
        : "Descubra nuestros otros servicios";
  const relatedTagline =
    locale === "fr"
      ? "Services liés"
      : locale === "en"
        ? "Related services"
        : "Servicios relacionados";

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: page.heroTitle || breadcrumbTitle,
              description: page.heroSubtitle || breadcrumbTitle,
              url: serviceUrl,
            })
          ),
        }}
      />

      {/* FAQPage JSON-LD */}
      {page.faq && page.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqPageSchema(
                page.faq.map((item) => ({
                  question: item.question,
                  answer:
                    item.answer
                      ?.map((block: unknown) => {
                        const b = block as { children?: { text?: string }[] };
                        return b.children?.map((c) => c.text || "").join("") || "";
                      })
                      .join(" ") || "",
                }))
              )
            ),
          }}
        />
      )}

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: bc.servicesLabel, href: bc.servicesHref },
              { label: breadcrumbTitle },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-5 sm:mb-6 leading-tight">
              {page.heroTitle}
            </h1>
            {page.heroSubtitle && (
              <p className="text-base sm:text-lg text-foreground/80 font-medium leading-relaxed mb-6 sm:mb-8">
                {page.heroSubtitle}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                {locale === "fr"
                  ? "Prendre rendez-vous"
                  : locale === "en"
                    ? "Book a meeting"
                    : "Reservar una cita"}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href={contactPath}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                {locale === "fr" ? "Nous contacter" : locale === "en" ? "Contact us" : "Contáctenos"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Hero illustration (optional) ─── */}
      {heroImage && (
        <section className="bg-background pt-0 pb-8 sm:pb-12">
          <div className="container max-w-3xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={800}
              height={450}
              className="rounded-2xl object-cover w-full"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* ─── Content sections ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {sections.map((section, i) => {
            const Icon = sectionIcons[i % sectionIcons.length];
            return (
              <div key={i} className="scroll-mt-24 mb-14 sm:mb-20">
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
                <StrapiBlocks
                  blocks={section.blocks}
                  className="text-muted-foreground text-sm sm:text-base"
                  prose
                  contactHref={contactPath}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Related Services ─── */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {relatedTagline}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-8 sm:mb-10">
            {relatedLabel}
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
                href: locale === "fr" ? "/daf-externalise" : `/${locale}/daf-externalise`,
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

      {/* ─── FAQ accordion ─── */}
      {page.faq && page.faq.length > 0 && (
        <section className="py-16 sm:py-24 bg-background">
          <div className="container max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8 sm:mb-10">
              {faqLabel}
            </h2>
            <div className="space-y-3">
              {page.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border/60 bg-background"
                >
                  <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-heading m-0">{item.question}</h3>
                    <span
                      aria-hidden="true"
                      className="text-iter-violet shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <StrapiBlocks
                      blocks={item.answer}
                      className="text-muted-foreground"
                      contactHref={contactPath}
                    />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
