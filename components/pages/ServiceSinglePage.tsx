import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import type { StrapiServiceSinglePage, CmsNavItem } from "@/lib/strapi";
import { serviceSchema, faqPageSchema } from "@/lib/schemas";

const breadcrumbsByLocale: Record<
  Locale,
  { servicesLabel: string; servicesHref: string }
> = {
  fr: { servicesLabel: "Services", servicesHref: "/services" },
  en: { servicesLabel: "Services", servicesHref: "/en/services" },
  es: { servicesLabel: "Servicios", servicesHref: "/es/services" },
};

interface ServiceSinglePageProps {
  locale: Locale;
  page: StrapiServiceSinglePage;
  breadcrumbTitle: string;
  slug?: string;
  cmsNavigation?: CmsNavItem[];
}

export default function ServiceSinglePage({
  locale,
  page,
  breadcrumbTitle,
  slug,
  cmsNavigation,
}: ServiceSinglePageProps) {
  const bc = breadcrumbsByLocale[locale];

  // Build the canonical URL for this service page
  const basePath = locale === "fr" ? `/services` : `/${locale}/services`;
  const serviceUrl = `${basePath}/${slug || ""}`;

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
      <section className="bg-background pt-32 pb-16">
        <div className="container flex flex-col items-center text-center">
          <Breadcrumb
            locale={locale}
            items={[
              { label: bc.servicesLabel, href: bc.servicesHref },
              { label: breadcrumbTitle },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {page.heroTitle}
          </h1>
          {page.heroSubtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {page.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      <article className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
          <StrapiBlocks
            blocks={page.content}
            className="text-muted-foreground"
            prose
            contactHref={getContactPath(locale)}
          />
          {page.faq && page.faq.length > 0 && (
            <div className="mt-16 border-t border-border pt-16">
              <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
                FAQ
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
                      contactHref={getContactPath(locale)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
