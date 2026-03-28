import { Metadata } from "next";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

const htmlContent = `<p>Your startup is growing. Investors are asking harder questions. Spanish tax deadlines are piling up. And you are still managing finances on spreadsheets between product meetings.</p>
<p>You don't need a full-time CFO at 150K euros per year. You need a <strong>fractional CFO in Barcelona</strong> who understands your stage, your market, and the regulatory landscape you operate in.</p>
<p>Iter Advisors provides on-demand CFO services to startups and scale-ups across Barcelona and Spain. We plug into your team, build financial clarity, and help you make decisions backed by real numbers -- not gut feelings.</p>
<p><strong><a href="/en/contact">Book a Free 30-Minute Financial Review</a></strong></p>
<hr>
<h2 id="why-barcelona-startups-need-a-fractional-cfo">Why Barcelona Startups Need a Fractional CFO</h2>
<p>Barcelona has become one of Europe's most dynamic startup ecosystems. The 22@ innovation district, Pier01 tech hub, and the city's role as Mobile World Capital have attracted thousands of founders from around the world. In 2025 alone, Catalonia-based startups raised over 1.5 billion euros in venture funding.</p>
<p>But with growth comes complexity. And financial complexity in Spain is not something you can improvise your way through.</p>
<h3 id="the-regulatory-reality">The Regulatory Reality</h3>
<p>Spain's tax and reporting framework is one of the most demanding in Europe. As a startup operating here, you are dealing with:</p>
<ul>
<li><strong>Impuesto de Sociedades (IS)</strong> -- Corporate income tax with specific deductions for R&amp;D and innovation that most companies fail to claim properly.</li>
<li><strong>IVA (VAT)</strong> -- Quarterly filings with strict deadlines and complex rules around intra-community transactions.</li>
<li><strong>IRPF withholdings</strong> -- Payroll tax obligations that change based on contract types and employee residency.</li>
<li><strong>Modelo 347</strong> -- Annual reporting of transactions exceeding 3,005.06 euros with any single supplier or client.</li>
<li><strong>Modelo 720</strong> -- Mandatory declaration of overseas assets, with historically severe penalties for non-compliance.</li>
<li><strong>Transfer pricing rules</strong> -- If you have entities in multiple countries, you need proper documentation to avoid adjustments.</li>
</ul>
<p>Miss a deadline or misfile a return, and you are looking at penalties that can reach 150% of the unpaid amount. That is not a rounding error -- it is an existential risk for an early-stage company.</p>
<h3 id="the-hiring-gap">The Hiring Gap</h3>
<p>Here is the math most founders face: a full-time CFO in Barcelona costs between 120,000 and 180,000 euros per year in total compensation. For a seed or Series A startup burning 50K-100K per month, that hire is premature. But the financial decisions you need to make at that stage -- fundraising strategy, unit economics modeling, cash runway planning -- are CFO-level decisions.</p>
<p>A <strong>fractional CFO</strong> bridges that gap. You get 15+ years of financial expertise for a fraction of the cost, deployed exactly when and where you need it.</p>
<h3 id="international-founders-local-complexity">International Founders, Local Complexity</h3>
<p>More than 40% of startups in Barcelona are founded by non-Spanish nationals. If you moved here from the UK, France, Germany, or the US, you are navigating an unfamiliar system in an unfamiliar language. An outsourced CFO in Barcelona who speaks your language -- literally and financially -- is not a luxury. It is a survival tool.</p>
<hr>
<h2 id="what-does-a-fractional-cfo-do">What Does a Fractional CFO Do?</h2>
<p>A fractional CFO is not a bookkeeper. They are not your gestor. They are a senior financial strategist who works with your company on a part-time or project basis.</p>
<p>Here is what that looks like in practice:</p>
<h3 id="financial-strategy-and-planning">Financial Strategy and Planning</h3>
<p>Your fractional CFO builds the financial architecture of your company. That includes:</p>
<ul>
<li><strong>Financial modeling</strong> -- Revenue forecasts, expense projections, and scenario planning tied to your actual business drivers.</li>
<li><strong>Budget creation and management</strong> -- Departmental budgets that align spending with strategic priorities.</li>
<li><strong>Pricing strategy</strong> -- Unit economics analysis to ensure your pricing supports sustainable growth.</li>
<li><strong>Board-ready reporting</strong> -- Monthly or quarterly financial packages that give investors and board members the clarity they need.</li>
</ul>
<h3 id="cash-flow-management-and-forecasting">Cash Flow Management and Forecasting</h3>
<p>Cash is the oxygen of a startup. A fractional CFO builds rolling 13-week cash flow forecasts, identifies cash gaps before they become crises, and optimizes your working capital cycle. In Spain, where payment terms of 60-90 days are common, this discipline is non-negotiable.</p>
<h3 id="fundraising-support">Fundraising Support</h3>
<p>Raising capital in Spain means understanding a specific investor landscape. Your fractional CFO prepares:</p>
<ul>
<li><strong>Investor-ready financial models</strong> with assumptions that hold up under scrutiny.</li>
<li><strong>Data rooms</strong> organized to accelerate due diligence.</li>
<li><strong>Cap table management</strong> so you understand dilution at every stage.</li>
<li><strong>Pitch deck financials</strong> that tell a compelling story backed by numbers.</li>
</ul>
<p>We have worked alongside leading Spanish and European VCs including <strong>Nauta Capital</strong>, <strong>Kfund</strong>, <strong>Samaipata</strong>, and <strong>Inveready</strong>. We know what they look for, because we have sat across the table from them -- repeatedly.</p>
<h3 id="financial-reporting-and-kpis">Financial Reporting and KPIs</h3>
<p>You cannot manage what you do not measure. We implement dashboards and reporting systems that track the metrics that matter for your stage:</p>
<ul>
<li><strong>SaaS metrics</strong> -- MRR, ARR, churn, LTV, CAC, burn multiple.</li>
<li><strong>E-commerce metrics</strong> -- AOV, contribution margin, return rates, CAC payback.</li>
<li><strong>General KPIs</strong> -- Gross margin, EBITDA, runway, revenue per employee.</li>
</ul>
<p>These are not vanity dashboards. They are decision-making tools.</p>
<h3 id="due-diligence-preparation">Due Diligence Preparation</h3>
<p>Whether you are raising a round, selling the company, or entering a strategic partnership, due diligence will happen. A fractional CFO ensures your financial house is in order before the process starts -- not scrambling once it has begun.</p>
<p>This includes cleaning up historical financials, reconciling accounts, documenting revenue recognition policies, and preparing responses to standard DD questionnaires.</p>
<h3 id="tax-optimization-and-cross-border-structuring">Tax Optimization and Cross-Border Structuring</h3>
<p>Operating across borders? We help you navigate:</p>
<ul>
<li><strong>Spain-France tax treaty</strong> implications for dual-country operations.</li>
<li><strong>EU holding structures</strong> and their impact on dividend and IP flows.</li>
<li><strong>R&amp;D tax credits</strong> under the Spanish Patent Box regime and deductions for innovation.</li>
<li><strong>Stock option plans</strong> (phantom shares, stock options) and their tax treatment in Spain.</li>
<li><strong>Expatriate tax regimes</strong> such as the Beckham Law for qualifying international hires.</li>
</ul>
<hr>
<h2 id="why-choose-iter-advisors-as-your-fractional-cfo-in-barcelona">Why Choose Iter Advisors as Your Fractional CFO in Barcelona</h2>
<p>Not all outsourced CFO services are equal. Here is what sets Iter Advisors apart.</p>
<h3 id="based-in-barcelona-since-2019">Based in Barcelona Since 2019</h3>
<p>We are not a remote team parachuting into your timezone. We are here. We know the local ecosystem, the local advisors, the local investor network, and the local regulatory environment. When you need a face-to-face meeting before your board call, we are 20 minutes away.</p>
<h3 id="a-team-not-a-solo-consultant">A Team, Not a Solo Consultant</h3>
<p>When you hire Iter Advisors, you get access to a <strong>team of 15+ CFO experts</strong>, not a single freelancer. That means:</p>
<ul>
<li><strong>No single point of failure</strong> -- your financial operations do not stop if one person is on vacation.</li>
<li><strong>Specialist depth</strong> -- fundraising experts, tax specialists, and operational finance professionals working together.</li>
<li><strong>Bilingual and trilingual capabilities</strong> -- English, Spanish, French, and Catalan coverage across the team.</li>
</ul>
<h3 id="proven-track-record">Proven Track Record</h3>
<p>The numbers speak for themselves:</p>
<ul>
<li><strong>100M+ euros raised</strong> for clients across seed, Series A, Series B, and growth rounds.</li>
<li><strong>85+ companies served</strong> across SaaS, fintech, e-commerce, deeptech, and creative industries.</li>
<li><strong>Dual France-Spain expertise</strong> -- a unique positioning that serves the large community of French founders and companies operating in Barcelona.</li>
</ul>
<h3 id="the-france-spain-advantage">The France-Spain Advantage</h3>
<p>A significant portion of Barcelona's startup community has French roots or French operations. Iter Advisors was founded with this cross-border reality in mind. We understand the French fiscal system, the Spanish fiscal system, and the interaction between the two. If you have a SAS in Paris and an SL in Barcelona, we know exactly how to structure the relationship.</p>
<h3 id="modern-tech-stack">Modern Tech Stack</h3>
<p>We do not work with paper and legacy software. Our standard toolkit includes:</p>
<ul>
<li><strong>Pennylane</strong> -- Cloud accounting for real-time financial visibility.</li>
<li><strong>Agicap</strong> -- Cash flow forecasting and treasury management.</li>
<li><strong>PowerBI</strong> -- Custom dashboards and data visualization.</li>
<li><strong>Holded</strong> -- ERP and invoicing for Spanish-registered companies.</li>
</ul>
<p>We integrate with your existing tools and build workflows that save your team hours every month.</p>
<hr>
<h2 id="our-fractional-cfo-engagement-models">Our Fractional CFO Engagement Models</h2>
<p>Every startup is different. We offer flexible engagement models that scale with your needs.</p>
<h3 id="starter-for-early-stage-startups">Starter -- For Early-Stage Startups</h3>
<p><strong>2-3 days per month | 2,000 - 3,500 euros/month</strong></p>
<p>Best for: Pre-seed and seed-stage companies that need financial foundations.</p>
<p>Includes:
- Monthly financial reporting and close
- Cash flow monitoring and 13-week forecast
- Budget setup and tracking
- Basic KPI dashboard
- Ad hoc financial guidance</p>
<h3 id="growth-for-post-seed-and-series-a">Growth -- For Post-Seed and Series A</h3>
<p><strong>4-8 days per month | 3,500 - 6,000 euros/month</strong></p>
<p>Best for: Companies with 500K-5M euros in annual revenue that need strategic finance.</p>
<p>Includes:
- Everything in Starter, plus:
- Financial modeling and scenario planning
- Board reporting packages
- Fundraising preparation and support
- Investor relations and data room management
- Tax optimization review
- Hiring plan and headcount modeling</p>
<h3 id="scale-up-for-series-a-and-growth-stage">Scale-Up -- For Series A+ and Growth Stage</h3>
<p><strong>8+ days per month | 6,000 - 8,000+ euros/month</strong></p>
<p>Best for: Companies scaling past 5M euros in revenue that need near-full-time CFO support.</p>
<p>Includes:
- Everything in Growth, plus:
- Full strategic finance partnership
- M&amp;A and due diligence support
- International structuring and transfer pricing
- Treasury and debt management
- FP&amp;A process design and automation
- Preparation for full-time CFO hire (when you are ready)</p>
<h3 id="custom-project-based-engagements">Custom Project-Based Engagements</h3>
<p>Not every need fits a monthly retainer. We also take on:</p>
<ul>
<li><strong>Fundraising projects</strong> -- End-to-end support from financial model to term sheet, typically 3-6 months.</li>
<li><strong>Due diligence preparation</strong> -- Get your financials investor-ready in 4-8 weeks.</li>
<li><strong>Financial system implementation</strong> -- Set up your accounting, reporting, and forecasting infrastructure.</li>
<li><strong>CFO audit</strong> -- A one-time deep review of your financial operations with actionable recommendations.</li>
</ul>
<hr>
<h2 id="industries-we-serve-in-barcelona">Industries We Serve in Barcelona</h2>
<p>Our fractional CFO services are tailored to the sectors that define Barcelona's startup ecosystem.</p>
<h3 id="saas-and-technology">SaaS and Technology</h3>
<p>We work with B2B and B2C SaaS companies at every stage. From setting up your first MRR tracking to preparing a Series B data room, we understand the metrics, the benchmarks, and the investor expectations specific to software businesses.</p>
<h3 id="e-commerce-and-d2c">E-Commerce and D2C</h3>
<p>Barcelona is home to a growing number of direct-to-consumer and marketplace businesses. We help e-commerce companies manage inventory financing, optimize contribution margins, navigate Spanish and EU consumer regulations, and plan for international expansion.</p>
<h3 id="fintech">Fintech</h3>
<p>Fintech companies in Barcelona face additional regulatory requirements including Bank of Spain oversight and EU payment services directives. Our team understands the intersection of financial regulation and startup finance, so you can focus on building product while we handle compliance and reporting.</p>
<h3 id="deeptech-and-biotech">Deeptech and Biotech</h3>
<p>Long development cycles, grant funding, and complex IP structures make deeptech and biotech companies uniquely challenging from a financial perspective. We help these companies structure R&amp;D tax credits, manage grant reporting, and plan capital needs across multi-year development timelines.</p>
<h3 id="creative-and-digital-agencies">Creative and Digital Agencies</h3>
<p>Agency economics are different. Project-based revenue, contractor-heavy teams, and thin margins require precise financial management. We help agencies in Barcelona track project profitability, manage cash flow volatility, and build sustainable growth models.</p>
<hr>
<h2 id="success-stories">Success Stories</h2>
<h3 id="optidigital-from-startup-to-adtech-leader">OptiDigital -- From Startup to Adtech Leader</h3>
<p>OptiDigital, a Barcelona-based adtech company, partnered with Iter Advisors during a critical growth phase. With revenues reaching <strong>8 million euros</strong> and a complex international structure, they needed financial leadership that could operate across multiple jurisdictions.</p>
<p>We helped OptiDigital raise over <strong>30 million euros</strong> in total funding by building investor-ready financials, managing due diligence processes, and providing ongoing strategic CFO support. Our dual France-Spain expertise was particularly valuable given their cross-border operations.</p>
<h3 id="surfe-saving-real-money-on-day-one">Surfe -- Saving Real Money on Day One</h3>
<p>Surfe, a fast-growing SaaS company, engaged Iter Advisors to optimize their financial operations. Through a comprehensive review of their tax structure, vendor contracts, and operational expenses, we identified <strong>55,000 euros in annual savings</strong> on approximately <strong>1 million euros in ARR</strong>.</p>
<p>That is not theoretical value. Those are euros that went back to the bottom line and extended their runway by months.</p>
<h3 id="what-our-clients-say">What Our Clients Say</h3>
<blockquote>
<p>"Having Iter Advisors as our external CFO gave us the financial credibility we needed to close our Series A. They did not just prepare the numbers -- they helped us tell the story behind them."
-- CEO, Barcelona-based SaaS company</p>
<p>"We were drowning in Spanish tax obligations we did not fully understand. Iter brought clarity, structure, and peace of mind. Worth every euro."
-- Founder, French e-commerce company operating in Spain</p>
</blockquote>
<hr>
<h2 id="frequently-asked-questions">Frequently Asked Questions</h2>
<h3 id="how-much-does-a-fractional-cfo-cost-in-barcelona">How much does a fractional CFO cost in Barcelona?</h3>
<p>Fractional CFO services in Barcelona typically range from 2,000 to 8,000+ euros per month, depending on the scope of engagement and your company's stage. At Iter Advisors, our Starter plan begins at 2,000 euros per month for early-stage companies, while our Scale-Up plan for larger organizations starts at 6,000 euros per month. Compare that to a full-time CFO hire at 120,000-180,000 euros per year plus benefits, equity, and recruitment costs. A fractional model gives you senior expertise at 20-40% of the cost.</p>
<h3 id="what-is-the-difference-between-a-fractional-cfo-and-a-gestoria">What is the difference between a fractional CFO and a gestoria?</h3>
<p>A gestoria (or asesor fiscal) handles compliance: filing taxes, submitting annual accounts, managing payroll declarations. They are essential, and we work alongside them. A fractional CFO operates at the strategic level: financial planning, fundraising, cash flow forecasting, KPI management, and business decision support. Think of it this way -- your gestoria keeps you legal, your CFO keeps you growing. You need both, and they serve very different functions.</p>
<h3 id="do-you-work-with-international-startups-that-do-not-speak-spanish">Do you work with international startups that do not speak Spanish?</h3>
<p>Absolutely. More than half of our clients are international founders who operate primarily in English. Our team is fluent in English, Spanish, and French, with working knowledge of Catalan and other European languages. All of our reporting, communications, and financial models can be delivered in English. We also coordinate with your Spanish-speaking gestoria, lawyers, and auditors on your behalf, so language is never a barrier.</p>
<h3 id="can-you-help-with-fundraising-from-spanish-and-european-investors">Can you help with fundraising from Spanish and European investors?</h3>
<p>Yes, fundraising support is one of our core services. We have helped clients raise over 100 million euros from investors across Spain and Europe. We prepare financial models that meet investor expectations, build and manage data rooms, assist with due diligence responses, and provide strategic advice on term sheet negotiations. We have direct experience working with major Spanish VCs such as Nauta Capital, Kfund, Samaipata, and Inveready, as well as pan-European funds.</p>
<h3 id="how-quickly-can-you-start">How quickly can you start?</h3>
<p>We can typically begin within <strong>one to two weeks</strong> of signing an engagement letter. For urgent needs -- such as an active fundraising process or an imminent tax deadline -- we have deployed resources in as little as 48 hours. During onboarding, we conduct a financial diagnostic, review your existing systems, and establish reporting cadences. Most clients see tangible output within the first month.</p>
<h3 id="do-you-handle-spanish-tax-compliance">Do you handle Spanish tax compliance?</h3>
<p>We oversee and coordinate tax compliance, but we do not replace your gestoria. Here is how it works: we review your tax position strategically, identify optimization opportunities, ensure correct treatment of R&amp;D credits and international structures, and coordinate with your tax advisor to ensure accurate and timely filings. For clients who do not yet have a gestoria, we can recommend trusted partners from our network and manage the relationship on your behalf.</p>
<hr>
<h2 id="book-a-free-30-minute-financial-review">Book a Free 30-Minute Financial Review</h2>
<p>Stop guessing about your finances. In a 30-minute call, we will:</p>
<ul>
<li><strong>Review your current financial setup</strong> and identify immediate gaps.</li>
<li><strong>Assess your stage</strong> and recommend the right level of CFO support.</li>
<li><strong>Answer your questions</strong> about Spanish tax, fundraising, or financial strategy.</li>
</ul>
<p>No sales pitch. No obligation. Just a clear-eyed look at where you stand and what comes next.</p>
<p><strong><a href="/en/contact">Schedule Your Free Financial Review</a></strong></p>
<p>Or email us directly at <strong>hello@iteradvisors.com</strong></p>
<hr>
<h3 id="ready-to-get-started">Ready to Get Started?</h3>
<p>Whether you are a pre-seed startup setting up your first Spanish SL or a Series B company preparing for international expansion, Iter Advisors has the expertise to guide your financial strategy.</p>
<p><strong><a href="/en/services/gestion-financiere-externalisee">Explore Our Financial Management Services</a></strong> | <strong><a href="/en/services/accompagnement-levee-de-fond">Learn About Our Fundraising Support</a></strong> | <strong><a href="/en/">Visit Our Homepage</a></strong></p>
<hr>
<p><em>Iter Advisors is a financial advisory firm based in Barcelona, serving startups and scale-ups across Spain and Europe since 2019. Our team of 15+ experts provides fractional CFO, fundraising, and financial structuring services in English, Spanish, and French.</em></p>`;

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a fractional CFO cost in Barcelona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fractional CFO services in Barcelona typically range from 2,000 to 8,000+ euros per month, depending on the scope of engagement and your company's stage. Compare that to a full-time CFO hire at 120,000-180,000 euros per year.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a fractional CFO and a gestoria?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A gestoria handles compliance: filing taxes, submitting annual accounts, managing payroll declarations. A fractional CFO operates at the strategic level: financial planning, fundraising, cash flow forecasting, KPI management, and business decision support.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international startups that do not speak Spanish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "More than half of our clients are international founders who operate primarily in English. Our team is fluent in English, Spanish, and French. All reporting and financial models can be delivered in English.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help with fundraising from Spanish and European investors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, fundraising support is one of our core services. We have helped clients raise over 100 million euros from investors across Spain and Europe, including Nauta Capital, Kfund, Samaipata, and Inveready.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can you start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can typically begin within one to two weeks of signing an engagement letter. For urgent needs, we have deployed resources in as little as 48 hours.",
      },
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "en",
    path: "/fractional-cfo-barcelona",
    title: "Fractional CFO Barcelona | Startup CFO | Iter Advisors",
    description:
      "Get senior CFO expertise without the full-time cost. Iter Advisors provides fractional CFO services in Barcelona for startups and scale-ups. Book a free 30-min review.",
    structuredData: faqStructuredData,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return (
    <BlogPostPage
      locale="en"
      title="Fractional CFO in Barcelona: On-Demand Financial Leadership for Startups & Scale-ups"
      breadcrumbs={{
        resourcesLabel: "Services",
        resourcesHref: "/en/services",
        blogLabel: "Fractional CFO",
        blogHref: "/en/fractional-cfo-barcelona",
      }}
      htmlContent={htmlContent}
      cmsNavigation={cmsNavigation}
      publishedDate="2026-03-28"
      author="Iter Advisors"
      category="Fractional CFO"
      metaDescription="Get senior CFO expertise without the full-time cost. Iter Advisors provides fractional CFO services in Barcelona for startups and scale-ups."
    />
  );
}
