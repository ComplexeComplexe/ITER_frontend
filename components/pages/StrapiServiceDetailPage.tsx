import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import { StrapiServiceDetail } from "@/lib/static-content";

const labels: Record<Locale, { services: string; servicesHref: string }> = {
  fr: { services: "Services", servicesHref: "/services" },
  en: { services: "Services", servicesHref: "/en/services" },
  es: { services: "Servicios", servicesHref: "/es/services" },
};

export default function StrapiServiceDetailPage({ locale, service }: { locale: Locale; service: StrapiServiceDetail }) {
  const t = labels[locale];

  return (
    <PageLayout locale={locale}>
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.services, href: t.servicesHref },
              { label: service.title },
            ]}
          />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">{service.title}</h1>
        </div>
      </section>

      <article className="bg-background py-16 lg:py-24">
        <div className="container max-w-3xl">
          <StrapiBlocks blocks={service.content || []} />
        </div>
      </article>

      {service.faq && service.faq.length > 0 && (
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">FAQ</h2>
            <div className="space-y-6">
              {service.faq.map((item) => (
                <details key={item.id} className="group bg-background border border-border/50 rounded-2xl p-6">
                  <summary className="font-semibold font-heading text-foreground cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-iter-violet transition-transform group-open:rotate-45 text-xl ml-4">+</span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <StrapiBlocks blocks={item.answer || []} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
