import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsNavigation } from "@/lib/strapi";
import { getFundRaisingSupportContent } from "@/lib/content/fund-raising-support";
import Link from "next/link";

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
    <>
      <Header locale="en" cmsNavigation={cmsNavigation} />

      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.hero.h1}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{content.hero.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="bg-[#00e5a0] text-[#0a1628] font-semibold px-8 py-3 rounded-lg hover:bg-[#00c98a] transition"
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
              <h2 className="text-3xl font-bold text-[#0a1628] mb-6">{section.heading}</h2>
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
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">{content.faq.title}</h2>
          <div className="space-y-6">
            {content.faq.items.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0a1628] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
          <p className="text-gray-300 text-lg mb-8">{content.cta.description}</p>
          <Link
            href={content.cta.buttonHref}
            className="bg-[#00e5a0] text-[#0a1628] font-semibold px-10 py-4 rounded-lg hover:bg-[#00c98a] transition text-lg"
          >
            {content.cta.buttonText}
          </Link>
        </div>
      </section>

      <Footer locale="en" />
    </>
  );
}
