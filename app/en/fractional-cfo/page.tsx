import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCmsNavigation } from "@/lib/strapi";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "en",
    path: "/fractional-cfo",
    localizedPaths: {
      fr: "/daf-externalise",
      en: "/fractional-cfo",
      es: "/externalizacion-daf",
    },
    title: "Fractional CFO for Startups & SMEs | Iter Advisors",
    description:
      "Hire a fractional CFO to scale your finance function without the cost of a full-time hire. Cash flow, fundraising, reporting and strategic advisory - from Barcelona, Paris and Toulouse.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fractional CFO",
      provider: {
        "@type": "Organization",
        name: "Iter Advisors",
        url: "https://www.iteradvisors.com",
      },
      description:
        "Part-time CFO services for startups and SMEs. Cash flow management, fundraising support, financial reporting and strategic advisory.",
      areaServed: ["France", "Spain", "Europe"],
      serviceType: "Fractional CFO",
    },
  });
}

export default async function FractionalCFOPage() {
  const cmsNavigation = await getCmsNavigation("en");

  const faqs = [
    {
      q: "What is a fractional CFO?",
      a: "A fractional CFO is a senior finance professional who works part-time for your company, typically 2-8 days per month. You get C-level financial expertise without the cost of a full-time hire (salary, benefits, equity). Fractional CFOs handle cash flow forecasting, fundraising, board reporting, and strategic financial planning.",
    },
    {
      q: "How much does a fractional CFO cost?",
      a: "Fractional CFO fees typically range from EUR 2,000 to EUR 8,000 per month depending on scope and seniority. This compares to EUR 120,000-180,000 per year for a full-time CFO. Most engagements start at 2 days per month and scale up as needed.",
    },
    {
      q: "When should a startup hire a fractional CFO?",
      a: "Key triggers include: preparing for a fundraising round (Seed, Series A, Series B), needing to improve cash flow visibility, scaling beyond EUR 1M ARR, onboarding institutional investors, or preparing for M&A due diligence.",
    },
    {
      q: "What is the difference between a fractional CFO and a bookkeeper?",
      a: "A bookkeeper records transactions and maintains ledgers. A fractional CFO provides strategic financial leadership: cash flow forecasting, KPI dashboards, fundraising support, investor relations, and financial modeling. They work alongside your bookkeeper or accountant.",
    },
    {
      q: "Can a fractional CFO help with fundraising?",
      a: "Yes. Fundraising support is one of the most common reasons startups hire a fractional CFO. They build financial models, prepare data rooms, create investor presentations, and support due diligence. At Iter Advisors, we have supported over 50 fundraising rounds.",
    },
    {
      q: "Do you work remotely or on-site?",
      a: "Both. Our fractional CFOs are based in Barcelona, Paris, and Toulouse. We work on-site when needed (board meetings, investor meetings) and remotely for day-to-day financial management. We use modern tools like Pennylane, Agicap, and Notion for seamless collaboration.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Header locale="en" cmsNavigation={cmsNavigation} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fractional CFO for Startups &amp; SMEs
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Scale your finance function with a senior CFO - part-time, flexible,
            and cost-effective. From cash flow to fundraising, we handle the
            numbers so you can focus on growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="bg-[#00e5a0] text-[#0a1628] font-semibold px-8 py-3 rounded-lg hover:bg-[#00c98a] transition"
            >
              Book a free consultation
            </Link>
            <Link
              href="/en/daf-outsourcing"
              className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Learn about our CFO services
            </Link>
          </div>
        </div>
      </section>

      {/* What does a fractional CFO do */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">
            What does a fractional CFO do?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            A fractional CFO provides the same strategic financial leadership as
            a full-time CFO, but on a part-time basis. This model is ideal for
            startups and SMEs that need senior finance expertise but cannot
            justify or afford a full-time hire. At Iter Advisors, our fractional
            CFOs typically work 2-8 days per month and cover:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Cash flow management",
                desc: "13-week rolling forecasts, scenario analysis, and real-time dashboards to ensure you never run out of cash.",
              },
              {
                title: "Fundraising support",
                desc: "Financial models, pitch deck support, data room preparation, and investor due diligence for Seed to Series B rounds.",
              },
              {
                title: "Financial reporting & KPIs",
                desc: "Monthly board packs, KPI dashboards, and management reporting tailored to your investors and stakeholders.",
              },
              {
                title: "Strategic advisory",
                desc: "Pricing strategy, unit economics, budget planning, and financial modeling for growth decisions.",
              },
              {
                title: "Accounting oversight",
                desc: "Supervision of bookkeeping, tax compliance, and annual closing. We work with your accountant or bring our own.",
              },
              {
                title: "M&A and due diligence",
                desc: "Financial due diligence for acquisitions, vendor due diligence for exits, and post-merger integration support.",
              },
            ].map((item, i) => (
              <div key={i} className="border-l-4 border-[#00e5a0] pl-6">
                <h3 className="text-xl font-semibold text-[#0a1628] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fractional vs full-time */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">
            Fractional CFO vs full-time CFO
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a1628] text-white">
                  <th className="p-4 font-semibold">Criteria</th>
                  <th className="p-4 font-semibold">Fractional CFO</th>
                  <th className="p-4 font-semibold">Full-time CFO</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="p-4 font-medium">Monthly cost</td>
                  <td className="p-4">EUR 2,000 - 8,000</td>
                  <td className="p-4">EUR 10,000 - 15,000+</td>
                </tr>
                <tr className="border-b bg-gray-100">
                  <td className="p-4 font-medium">Commitment</td>
                  <td className="p-4">Flexible, month-to-month</td>
                  <td className="p-4">12-24 month contract + equity</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Availability</td>
                  <td className="p-4">2-8 days/month</td>
                  <td className="p-4">Full-time, 5 days/week</td>
                </tr>
                <tr className="border-b bg-gray-100">
                  <td className="p-4 font-medium">Experience</td>
                  <td className="p-4">Multi-company, cross-sector</td>
                  <td className="p-4">Deep single-company focus</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Best for</td>
                  <td className="p-4">Startups, SMEs, pre-Series B</td>
                  <td className="p-4">Scale-ups, post-Series B</td>
                </tr>
                <tr className="border-b bg-gray-100">
                  <td className="p-4 font-medium">Ramp-up time</td>
                  <td className="p-4">1-2 weeks</td>
                  <td className="p-4">3-6 months recruitment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When to hire */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">
            When should you hire a fractional CFO?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "You are preparing a fundraising round (Seed, Series A, Series B)",
              "Your cash runway is less than 12 months and you need visibility",
              "You are scaling past EUR 1M ARR and need proper financial controls",
              "Investors or board members are asking for professional reporting",
              "You are considering an acquisition or preparing for an exit",
              "Your bookkeeper handles transactions but you lack strategic finance",
              "You need to optimize unit economics before your next growth phase",
              "You are expanding internationally and need multi-country finance",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#00e5a0] text-xl mt-1">&#10003;</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Iter Advisors */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">
            Why choose Iter Advisors as your fractional CFO?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "50+ clients served",
                desc: "We have supported startups and SMEs across SaaS, e-commerce, fintech, deeptech, and professional services.",
              },
              {
                title: "3 offices in Europe",
                desc: "Barcelona, Paris, and Toulouse. We combine local expertise with cross-border financial management.",
              },
              {
                title: "Modern tech stack",
                desc: "Pennylane, Agicap, Stripe, Power BI, Notion. We automate your finance function with the best tools.",
              },
              {
                title: "Fundraising track record",
                desc: "Over 50 fundraising rounds supported, from pre-seed to Series B, with a combined EUR 200M+ raised.",
              },
              {
                title: "Bilingual FR/EN/ES",
                desc: "Our team operates in French, English, and Spanish - ideal for international startups based in France or Spain.",
              },
              {
                title: "Flexible engagement",
                desc: "No long-term lock-in. Start with 2 days/month and scale up as your needs grow. Cancel anytime.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1628] mb-8">
            Frequently asked questions about fractional CFOs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-[#0a1628] mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0a1628] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to hire a fractional CFO?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Book a free 30-minute consultation to discuss your finance needs.
            No commitment, no sales pitch - just practical advice from a senior
            CFO.
          </p>
          <Link
            href="/en/contact"
            className="bg-[#00e5a0] text-[#0a1628] font-semibold px-10 py-4 rounded-lg hover:bg-[#00c98a] transition text-lg"
          >
            Book a free consultation
          </Link>
        </div>
      </section>

      <Footer locale="en" />
    </>
  );
}
