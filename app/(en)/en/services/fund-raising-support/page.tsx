import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { getCmsNavigation } from "@/lib/static-content";
import { getFundRaisingSupportContent } from "@/lib/content/fund-raising-support";
import Link from "next/link";
import PageByline from "@/components/PageByline";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";

export async function generateMetadata(): Promise<Metadata> {
  const content = getFundRaisingSupportContent("en");
  return buildMetadata({
    locale: "en",
    path: "/services/fund-raising-support",
    localizedPaths: {
      fr: "/services/accompagnement-levee-de-fond",
      en: "/en/services/fund-raising-support",
      es: "/es/services/soporte-financiacion",
    },
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function FundRaisingSupportPage() {
  const cmsNavigation = await getCmsNavigation("en");
  const content = getFundRaisingSupportContent("en");

  return (
    <PageLayout locale="en" cmsNavigation={cmsNavigation}>

      {/* Hero */}
      <section className="bg-iter-violet text-white pt-28 sm:pt-32 pb-14 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 [&_a]:text-white/80 [&_span]:text-white"><Breadcrumb locale="en" items={[{label: "Services", href: "/en/services"}, {label: "Fundraising support"}]} /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.hero.h1}</h1>
          <PageByline locale="en" author={FINANCE_AUTHOR} tone="dark" className="mb-6 justify-center" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                editorialWebPageSchema({
                  path: "/en/services/fund-raising-support",
                  name: content.hero.h1,
                  description: content.hero.intro,
                  locale: "en",
                  author: FINANCE_AUTHOR,
                })
              ),
            }}
          />
          <p className="text-xl text-white/85 mb-8 max-w-3xl mx-auto">{content.hero.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="bg-iter-chartreuse text-foreground font-semibold px-8 py-3 rounded-2xl hover:opacity-90 transition"
            >
              {content.cta.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {content.sections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? "mt-12" : ""}>
              <h2 className="text-3xl font-bold text-foreground mb-6">{section.heading}</h2>
              <div className="space-y-4">
                {section.content.map((item, itemIdx) => (
                  <p key={itemIdx} className="text-gray-700 text-lg leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">{content.faq.title}</h2>
          <div className="space-y-6">
            {content.faq.items.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-iter-violet text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-white/85 text-lg mb-8">{content.cta.description}</p>
          <Link
            href={content.cta.buttonHref}
            className="bg-iter-chartreuse text-foreground font-semibold px-10 py-4 rounded-2xl hover:opacity-90 transition text-lg"
          >
            {content.cta.buttonText}
          </Link>
        </div>
      </section>

    </PageLayout>
  );
}
