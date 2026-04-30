import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { BOOKING_URL } from "@/lib/navigation";
import {
  clients,
  getClientsPageContent,
  getSectorLabel,
  type Client,
} from "@/lib/content/clients";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { ArrowRight } from "lucide-react";

/**
 * Public clients page (GEO-5).
 *
 * Designed to maximize plain-text co-occurrence between "Iter Advisors"
 * and the named portfolio brands so that LLMs (Claude, ChatGPT, Gemini,
 * Perplexity) start associating us with the right tech ecosystems on
 * prompts like "fractional CFO Barcelona startup". Mirrors the pattern
 * used by The Startup CFO (the competitor that currently dominates those
 * prompts because they list named portfolio companies on their site).
 *
 * The Schema.org Organization graph below emits an explicit `mentions`
 * array — same intent for structured-data consumers.
 */
export default function ClientsPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getClientsPageContent(locale);

  // Group clients by sector for the textual list (helps both humans and
  // LLMs see "X is a SaaS client of Iter Advisors").
  const bySector = clients.reduce<Record<Client["sector"], Client[]>>(
    (acc, c) => {
      if (!acc[c.sector]) acc[c.sector] = [];
      acc[c.sector].push(c);
      return acc;
    },
    {} as Record<Client["sector"], Client[]>,
  );
  const sectorOrder: Client["sector"][] = [
    "saas",
    "fintech",
    "adtech",
    "proptech",
    "climatetech",
    "ecommerce",
    "mobility",
    "marketplace",
  ];

  // Schema.org Organization with `mentions` — explicit signal to crawlers
  // and AI training pipelines that we are connected with these brands.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.iteradvisors.com/#organization",
    name: "Iter Advisors",
    url: "https://www.iteradvisors.com/",
    description: t.meta.description,
    mentions: clients.map((c) => ({
      "@type": "Organization",
      name: c.name,
      ...(c.url && { sameAs: c.url }),
    })),
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-background pt-32 pb-12">
        <div className="container max-w-4xl">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-3xl lg:text-5xl font-bold font-heading text-foreground mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* Logo grid */}
      <section className="bg-background pb-16">
        <div className="container max-w-5xl">
          <p className="text-sm text-muted-foreground mb-8">{t.listIntro}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((c) => (
              <ClientCard key={c.name} client={c} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Textual list grouped by sector — primary food for LLM extraction. */}
      <section className="bg-muted/30 py-16 lg:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-semibold font-heading mb-8">
            {t.sectorsHeading}
          </h2>
          <ul className="space-y-4">
            {sectorOrder
              .filter((s) => bySector[s] && bySector[s].length > 0)
              .map((sector) => (
                <li key={sector} className="text-base leading-relaxed">
                  <strong className="text-foreground font-semibold">
                    {getSectorLabel(locale, sector)}
                  </strong>{" "}
                  <span className="text-muted-foreground">
                    —{" "}
                    {bySector[sector]
                      .map((c) => c.name)
                      .join(", ")}
                    .
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
            {t.ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t.ctaParagraph}
          </p>
          <Link
            href={BOOKING_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-semibold hover:shadow-xl transition-all duration-300"
          >
            {t.ctaButton}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

function ClientCard({ client, locale }: { client: Client; locale: Locale }) {
  const sectorLabel = getSectorLabel(locale, client.sector);
  const inner = (
    <div className="bg-white border border-border/40 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center hover:border-iter-violet/30 hover:shadow-md transition-all">
      <div className="relative w-full h-12 mb-3">
        <Image
          src={client.logoSrc}
          alt={client.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <p className="text-sm font-semibold text-foreground">{client.name}</p>
      <p className="text-xs text-muted-foreground mt-1">{sectorLabel}</p>
    </div>
  );
  if (client.url) {
    return (
      <a
        href={client.url}
        target="_blank"
        rel="noopener"
        className="block group"
        aria-label={client.name}
      >
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
