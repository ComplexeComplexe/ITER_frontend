import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { getCmsNavigation } from "@/lib/static-content";
import { getOutsourcedManagementControlContent } from "@/lib/content/outsourced-management-control";
import Link from "next/link";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";

export async function generateMetadata(): Promise<Metadata> {
  const content = getOutsourcedManagementControlContent("en");
  return buildMetadata({
    locale: "en",
    path: "/services/outsourced-management-control",
    localizedPaths: {
      fr: "/services/controle-de-gestion-externalise",
      en: "/en/services/outsourced-management-control",
      es: "/es/services/control-gestion-externalizado",
    },
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function OutsourcedManagementControlPage() {
  const cmsNavigation = await getCmsNavigation("en");
  const content = getOutsourcedManagementControlContent("en");

  return (
    <PageLayout locale="en" cmsNavigation={cmsNavigation}>

      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-24 sm:pt-32 pb-12 sm:pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb locale="en" items={[{ label: "Services", href: "/en/services" }, { label: content.hero.h1 }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight mt-6 mb-4">{content.hero.h1}</h1>
          <PageByline locale="en" author={FINANCE_AUTHOR} className="mb-6" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                editorialWebPageSchema({
                  path: "/en/services/outsourced-management-control",
                  name: content.hero.h1,
                  description: content.hero.intro,
                  locale: "en",
                  author: FINANCE_AUTHOR,
                })
              ),
            }}
          />
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">{content.hero.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center bg-iter-chartreuse text-iter-dark font-semibold px-8 py-3 rounded-full hover:shadow-lg transition"
            >
              {content.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {content.sections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "mt-12" : ""}>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6">{section.heading}</h2>
              <div className="space-y-4">
                {section.content.map((item, itemIdx) => (
                  <p key={itemIdx} className="text-muted-foreground text-base leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">{content.faq.title}</h2>
          <div className="space-y-6">
            {content.faq.items.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-iter-violet text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4">{content.cta.title}</h2>
          <p className="text-white/85 text-base sm:text-lg mb-8">{content.cta.description}</p>
          <Link
            href={content.cta.buttonHref}
            className="inline-flex items-center justify-center bg-iter-chartreuse text-iter-dark font-semibold px-10 py-4 rounded-full hover:shadow-lg transition text-lg"
          >
            {content.cta.buttonText}
          </Link>
        </div>
      </section>

    </PageLayout>
  );
}
