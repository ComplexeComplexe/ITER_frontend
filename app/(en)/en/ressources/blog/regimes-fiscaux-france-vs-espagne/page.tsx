import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/static-content";
import { Callout, StatGrid, ProseTable, InlineCta } from "@/components/blog";

export const metadata: Metadata = {
  title: "Tax Systems: France vs Spain — Full Comparison 2026 | Iter Advisors",
  description:
    "Corporate tax, VAT, social contributions, Beckham law: the complete guide to comparing French and Spanish tax regimes. Save up to €7,500 per employee. Free audit.",
  alternates: {
    canonical: "https://www.iteradvisors.com/en/ressources/blog/regimes-fiscaux-france-vs-espagne",
    languages: {
      "fr": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
      "en": "https://www.iteradvisors.com/en/ressources/blog/regimes-fiscaux-france-vs-espagne",
      "es": "https://www.iteradvisors.com/es/recursos/blog/regimes-fiscaux-france-vs-espagne",
      "x-default": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tax Systems: France vs Spain — Full Comparison 2026",
    description:
      "Corporate tax, VAT, social contributions, Beckham law: the complete guide for businesses operating between France and Spain.",
    type: "article",
    images: [{ url: "/images/og-logo.png", alt: "Tax systems: France vs Spain — Full comparison 2026" }],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");

  return (
    <BlogPostPageRefonte
      locale="en"
      cmsNavigation={cmsNavigation}
      breadcrumbs={{
        resourcesLabel: "Resources",
        resourcesHref: "/en/ressources",
        blogLabel: "Blog",
        blogHref: "/en/ressources/blog",
      }}
      slug="regimes-fiscaux-france-vs-espagne"
      category="International Taxation"
      title="Tax Systems: France vs Spain — Full Comparison 2026"
      dek="Corporate tax, VAT, social contributions, special regimes. How to optimise your tax structure between France and Spain."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Co-founder — CFO & Investor, Iter Advisors",
      }}
      readingTime={8}
      dateModified="2026-07-25T00:00:00Z"
      heroImage="/images/blog/covers/regimes-fiscaux-france-vs-espagne.svg"
      toc={[
        { id: "corporate-tax", label: "1. Corporate Tax (IS)" },
        { id: "vat", label: "2. VAT and intra-community number" },
        { id: "social-contributions", label: "3. Social contributions and employer charges" },
        { id: "special-regimes", label: "4. Special regimes (Beckham, micro, PVN)" },
        { id: "your-profile", label: "5. Which regime suits your profile?" },
      ]}
      faqItems={[
        {
          question: "Do I need a holding company to operate between France and Spain?",
          answer:
            "Not necessarily. A holding company makes sense when your revenue exceeds €2–3M or when you manage several entities. For growing SMEs, a simple bi-national structure (SARL/SAS in France + SL in Spain) is sufficient to benefit from the social contribution differential (~15 percentage points). A structural audit with a fractional CFO will identify the optimal setup before any change.",
        },
        {
          question: "How do I avoid double taxation between France and Spain?",
          answer:
            "The France-Spain tax treaty (signed in 1995, revised in 2011) prevents double taxation on corporate income, dividends, and salaries. In practice: profits generated in Spain are taxed only in Spain if you have a permanent establishment there (office, employees). Dividends paid by the Spanish subsidiary to the French holding benefit from a reduced withholding tax (5–15%). Always consult a tax expert before any restructuring.",
        },
        {
          question: "Can a French company reclaim Spanish VAT?",
          answer:
            "Yes, under EU Directive 2008/9/EC. A VAT-registered French company can reclaim Spanish VAT (IVA) paid on professional purchases in Spain, provided a digital refund request is submitted by 30 September of the following year. Refunds typically take 4 to 6 months. The minimum claim is €50 for a quarterly request.",
        },
        {
          question: "Who qualifies for the Beckham regime in Spain?",
          answer:
            "Individuals who take up tax residence in Spain after having lived outside the country for at least 5 years. The regime applies for 6 years and caps the tax rate at 24% on Spanish-source income up to €600,000. Senior managers joining a Spanish subsidiary from abroad are the main beneficiaries. Application must be made within 6 months of the first employment contract in Spain.",
        },
      ]}
      relatedArticles={[
        {
          url: "/en/ressources/blog/fractional-cfo-cost-services-2026",
          category: "Fractional CFO",
          title: "Fractional CFO: Cost, Services and How to Choose in 2026",
        },
        {
          url: "/ressources/blog/daf-externalise-barcelone-guide-startups-espagnoles",
          category: "Fractional CFO",
          title: "Fractional CFO in Barcelona: guide for startups in Spain",
        },
        {
          url: "/ressources/fiscalite/double-imposition-france-espagne",
          category: "International Taxation",
          title: "France-Spain tax treaty: avoiding double taxation",
        },
      ]}
      metaDescription="Complete comparison of corporate tax, VAT and social contributions between France and Spain. Potential savings and optimised regimes. Expert guide Iter Advisors 2026."
      tldr={
        <>
          <p>
            <strong>France:</strong> CIT 25.83% (reduced rate 15% up to €38k), VAT 20%, high social
            contributions (~45% of gross salary)
          </p>
          <p>
            <strong>Spain:</strong> CIT 25% (19% for startups), VAT 21%, PVN and PAC for
            small structures with reduced contributions
          </p>
          <p>
            <strong>Key takeaway:</strong> The difference can reach €7,500 per employee per year.
            Consult a tax expert before changing regime.
          </p>
        </>
      }
    >
      <h2 id="corporate-tax">1. Corporate Tax (IS)</h2>

      <p>
        Corporate tax is one of the main differences between France and Spain. The rate, the
        taxable base, and special regimes vary significantly.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Criterion</th>
            <th>France</th>
            <th>Spain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard CIT rate</td>
            <td>25.83%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>Reduced rate (startups/SMEs)</td>
            <td>15% up to €38,000</td>
            <td>19% (startups, 1st year)</td>
          </tr>
          <tr>
            <td>Capital gains tax</td>
            <td>CIT + CSG levy</td>
            <td>CIT only</td>
          </tr>
          <tr>
            <td>Interest deduction</td>
            <td>Capped at EBITDA × 30%</td>
            <td>Capped at 25% of EBIT</td>
          </tr>
          <tr>
            <td>Loss carry-forward</td>
            <td>Unlimited</td>
            <td>Up to 18 years</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="info" title="Key point">
        <strong>France:</strong> The 3.3% social surtax brings the effective CIT rate to 25.83%
        for companies with taxable profits above €763k. Below that threshold, the effective rate
        is 25%.
      </Callout>

      <p>
        In Spain, the 25% CIT rate applies uniformly. Startups benefit from a reduced rate of
        19% in their first profitable year and the year after. Small SMEs (revenue under €600,000)
        may opt for the PVN special regime.
      </p>

      <h2 id="vat">2. VAT and intra-community number</h2>

      <p>
        VAT is an indirect tax levied on value added at each stage of production and distribution.
        Rates differ between France and Spain, with major implications for B2B and B2C businesses.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>VAT type</th>
            <th>France</th>
            <th>Spain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard rate</td>
            <td>20%</td>
            <td>21%</td>
          </tr>
          <tr>
            <td>Reduced rate</td>
            <td>5.5% (food, books)</td>
            <td>10% (food, books)</td>
          </tr>
          <tr>
            <td>Super-reduced rate</td>
            <td>2.1% (press, medicines)</td>
            <td>4% (basic food)</td>
          </tr>
          <tr>
            <td>Registration threshold</td>
            <td>€34,400 turnover</td>
            <td>None (mandatory from first euro)</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Important">
        In Spain, VAT registration is mandatory from the first euro of revenue, unlike France
        where a €34,400 annual threshold applies. This significantly affects small structures
        operating cross-border.
      </Callout>

      <h2 id="social-contributions">3. Social contributions and employer charges</h2>

      <p>
        Social contributions are the largest financial burden for businesses. They cover social
        security, health insurance, pensions, and other welfare benefits.
      </p>

      <StatGrid
        items={[
          {
            label: "French employer contributions",
            value: "~45%",
            sublabel: "of gross salary (social security, pension, unemployment)",
          },
          {
            label: "Spanish employer contributions",
            value: "~30%",
            sublabel: "of gross salary (CEPSS + unemployment)",
          },
          {
            label: "Annual difference",
            value: "€7,500",
            sublabel: "per employee at minimum wage (cumulative gap)",
          },
        ]}
        columns={3}
      />

      <ProseTable>
        <thead>
          <tr>
            <th>Contribution</th>
            <th>France (%)</th>
            <th>Spain (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Social security</td>
            <td>8.55%</td>
            <td>6.35%</td>
          </tr>
          <tr>
            <td>Supplementary pension</td>
            <td>3.60%</td>
            <td>Included</td>
          </tr>
          <tr>
            <td>Unemployment insurance</td>
            <td>4.05%</td>
            <td>5.50%</td>
          </tr>
          <tr>
            <td>Other (health, accident)</td>
            <td>~20%</td>
            <td>~18%</td>
          </tr>
          <tr>
            <td>Estimated total</td>
            <td>42–45%</td>
            <td>28–32%</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="success" title="Spain advantage">
        Spain's significantly lower social contribution burden explains the growing appeal of
        bi-national France-Spain structures, with operations teams based in Spain.
      </Callout>

      <h2 id="special-regimes">4. Special regimes (Beckham, micro, PVN)</h2>

      <h3>France: Micro-enterprise</h3>

      <p>
        The micro-enterprise regime applies to annual revenues up to:
      </p>
      <ul>
        <li>€176,200 for commercial activities</li>
        <li>€72,500 for service activities and liberal professions</li>
      </ul>
      <p>
        Benefits: simplified accounting, reduced social contributions (~20–24% of revenue), no
        corporate tax. Downside: no deduction of actual business expenses.
      </p>

      <h3>Spain: PVN and PAC regimes</h3>
      <p>
        <strong>PVN (Small Business Volume):</strong> Available for revenue under €600,000.
        Allows a simplified quarterly VAT regime instead of monthly filing.
      </p>
      <p>
        <strong>PAC:</strong> For self-employed individuals, with reduced social contributions in
        the first two years (up to 80% reduction).
      </p>

      <h3>Spain: Beckham Regime (impatriates)</h3>

      <p>
        Individuals who take up residence in Spain after living abroad for at least 5 years can
        benefit from the{" "}
        <a href="/ressources/fiscalite/beckham-law" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
          Beckham regime
        </a>
        : a flat tax rate of 24% on Spanish-source income up to €600,000, for 6 years. A major
        advantage for executives and senior managers joining a Spanish subsidiary from abroad.
      </p>

      <Callout type="success" title="Beckham Regime: up to 23 points saved">
        An executive taxed at 47% in France who switches to the Beckham regime pays 24% on
        Spanish income — savings can exceed €50,000/year on a €150,000 salary.{" "}
        <a href="/ressources/fiscalite/beckham-law" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
          Check eligibility conditions →
        </a>
      </Callout>

      <h2 id="your-profile">5. Which regime suits your profile?</h2>

      <p>
        The right tax regime depends on your structure, profitability, revenue, and growth
        strategy. Here are the typical cases:
      </p>

      <h3>Case 1: Tech startup (0–€500k revenue)</h3>
      <p>
        <strong>Recommendation:</strong> Spain (CIT 19%) or France (CIT 15% + reduced rate).
      </p>
      <ul>
        <li>Reduced CIT in both countries</li>
        <li>Lower social contributions in Spain</li>
        <li>France offers more startup support schemes</li>
      </ul>

      <h3>Case 2: Growing SME (€500k–€2M revenue)</h3>
      <p>
        <strong>Recommendation:</strong> Bi-national optimisation (France + Spain).
      </p>
      <ul>
        <li>France: registered office + R&D (research tax credit)</li>
        <li>Spain: operations, support teams (lower social costs)</li>
        <li>Potential savings: 10–15% of payroll</li>
      </ul>

      <h3>Case 3: Holding or multinational group</h3>
      <p>
        <strong>Recommendation:</strong> Dedicated entity structure.
      </p>
      <ul>
        <li>Optimised transfer pricing</li>
        <li>Local tax credits leveraged</li>
        <li>Centralised treasury management</li>
      </ul>

      <InlineCta
        title="Need a tailored tax optimisation?"
        body="Our expert team analyses your situation and identifies potential savings. 100% free audit, no commitment."
        ctaLabel="Request a free tax audit"
        ctaHref="/en/contact"
      />

      <ProseTable>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Best option</th>
            <th>Potential savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Freelancer (0–€100k)</td>
            <td>Micro FR or PVN ES</td>
            <td>€500–1,500/year</td>
          </tr>
          <tr>
            <td>Growing SME (€500k–€2M)</td>
            <td>Bi-national holding</td>
            <td>€10k–20k/year</td>
          </tr>
          <tr>
            <td>Startup (first year)</td>
            <td>ES (CIT 19%) or FR (CIT 15%)</td>
            <td>€5k–10k on CIT</td>
          </tr>
          <tr>
            <td>Larger team (50+ employees)</td>
            <td>FR-ES split structure</td>
            <td>€7,500/employee/year</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Important disclaimer">
        Tax optimisation carries legal risks. Always ensure genuine economic substance for your
        activities. A "paper" optimisation without real substance can be challenged by tax
        authorities.
      </Callout>

      <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Structuring your business between France and Spain?
        </h3>
        <p className="mb-5 text-slate-700">
          Iter Advisors supports bi-national SMEs and scale-ups from Barcelona, Paris and
          Toulouse. Our fractional CFOs know both tax and accounting environments — CIT/IRPF,
          intra-EU VAT, Beckham regime, tax treaties — and structure bi-national operations
          without reclassification risk.
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Discover our{" "}
              <a
                href="/en/fractional-cfo"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                fractional CFO service
              </a>
              {" "}— full financial leadership from 2 days/month.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              For fundraising preparation with French or Spanish investors, see our{" "}
              <a
                href="/en/services/fund-raising-support"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                fundraising support service
              </a>
              .
            </span>
          </li>
        </ul>
      </div>
    </BlogPostPageRefonte>
  );
}
