import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, BarChart3, Shield, Rocket, Settings, Target, Compass, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
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
}

// Group Strapi blocks by H2 headings to create logical sections
function groupBlocksByHeading(blocks: StrapiBlock[]): Array<{
  heading?: string;
  blocks: StrapiBlock[];
}> {
  const groups: Array<{ heading?: string; blocks: StrapiBlock[] }> = [];
  let currentGroup: { heading?: string; blocks: StrapiBlock[] } = { blocks: [] };

  blocks.forEach((block) => {
    if (block.type === "heading" && "level" in block && block.level === 2) {
      // Start a new group at H2
      if (currentGroup.blocks.length > 0) {
        groups.push(currentGroup);
      }
      // Extract heading text
      const headingText = "children" in block && Array.isArray(block.children)
        ? block.children.map((child: any) => child.text || "").join("")
        : "";
      currentGroup = { heading: headingText, blocks: [] };
    } else {
      currentGroup.blocks.push(block);
    }
  });

  // Add the last group
  if (currentGroup.blocks.length > 0) {
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
}: ServiceSinglePageProps) {
  const bc = breadcrumbsByLocale[locale];
  const contactPath = getContactPath(locale);

  // Build the canonical URL for this service page
  const basePath = locale === "fr" ? `/services` : `/${locale}/services`;
  const serviceUrl = `${basePath}/${slug || ""}`;

  // Group content blocks by H2 headings for section rendering
  const sections = groupBlocksByHeading(page.content);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Service schema.org/Service JSON-LD */}
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
      {/* FAQPage schema.org JSON-LD (TICKET-15) */}
      {page.faq && page.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqPageSchema(
                page.faq.map((item) => ({
                  question: item.question,
                  answer: item.answer
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

      {/* Hero Section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: bc.servicesLabel, href: bc.servicesHref },
              { label: breadcrumbTitle },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
                {page.heroTitle}
              </h1>
              {page.heroSubtitle && (
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3">
                  {page.heroSubtitle}
                </p>
              )}
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
              >
                {locale === "fr" ? "Prendre rendez-vous" : locale === "en" ? "Book a meeting" : "Reservar una cita"}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/about-section.webp"
                alt={page.heroTitle}
                width={560}
                height={400}
                className="rounded-2xl object-contain"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body Sections */}
      {sections.map((section, i) => {
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
              <StrapiBlocks
                blocks={section.blocks}
                className="text-muted-foreground"
                prose
                contactHref={contactPath}
              />
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
            {locale === "fr" ? "Découvrez nos autres expertises" : locale === "en" ? "Discover our other services" : "Descubra nuestros otros servicios"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "DAF externalizado", href: locale === "fr" ? "/daf-externalise" : `/${locale}/daf-externalise`, icon: TrendingUp },
              { title: locale === "fr" ? "DAF à temps partagé" : locale === "en" ? "Fractional CFO" : "DAF a tiempo compartido", href: locale === "fr" ? "/daf-externalise/temps-partage" : `/${locale}/daf-externalise/temps-partage`, icon: Rocket },
              { title: locale === "fr" ? "DAF de transition" : locale === "en" ? "Transition CFO" : "DAF de transición", href: locale === "fr" ? "/daf-externalise/transition" : `/${locale}/daf-externalise/transition`, icon: BarChart3 },
              { title: locale === "fr" ? "Métier de DAF" : locale === "en" ? "CFO role & skills" : "Profesión de DAF", href: locale === "fr" ? "/daf-externalise/metier" : `/${locale}/daf-externalise/metier`, icon: Shield },
              { title: locale === "fr" ? "Tarifs du DAF externalisé" : locale === "en" ? "CFO pricing" : "Tarifas DAF externalizado", href: locale === "fr" ? "/daf-externalise/tarifs" : `/${locale}/daf-externalise/tarifs`, icon: Target },
              { title: locale === "fr" ? "DAF externalisé par secteur" : locale === "en" ? "CFO by industry" : "DAF externalizado por sector", href: locale === "fr" ? "/daf-externalise/secteurs" : `/${locale}/daf-externalise/secteurs`, icon: Compass },
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

      {/* FAQ Section */}
      {page.faq && page.faq.length > 0 && (
        <section className="bg-background py-24 lg:py-32">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-10">
              {locale === "fr" ? "Questions fréquentes" : locale === "en" ? "Frequently Asked Questions" : "Preguntas frecuentes"}
            </h2>
            <div className="space-y-8">
              {page.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.question}
                  </h3>
                  <StrapiBlocks
                    blocks={item.answer}
                    className="text-muted-foreground text-sm"
                    contactHref={contactPath}
                  />
                </div>
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
