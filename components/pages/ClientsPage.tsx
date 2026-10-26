import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/static-content";
import { getContactPath } from "@/lib/navigation";
import {
  clients,
  getClientsPageContent,
  getSectorLabel,
  type Client,
} from "@/lib/content/clients";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { ArrowRight } from "lucide-react";
import { getReviewedCases } from "@/lib/content/documented-case-locales";
import { parityHref } from "@/lib/locale-route-map";
import { absoluteSchemaUrl, ORGANIZATION_ID, schemaLanguage } from "@/lib/schemas/identity";

/** Client references and documented engagements, localized for each market. */
export default function ClientsPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getClientsPageContent(locale);
  const cases = getReviewedCases(locale);
  const evidence = {
    fr: { title: "Des missions documentées", intro: "Découvrez le contexte, les livrables et les résultats de trois accompagnements. Chaque cas précise le périmètre de l’intervention d’Iter.", read: "Lire le cas", offer: "Découvrir notre accompagnement de DAF externalisé" },
    en: { title: "Documented client engagements", intro: "Explore the context, deliverables and results of three engagements. Each case explains the scope of Iter’s work.", read: "Read the case study", offer: "Explore our fractional CFO service" },
    es: { title: "Casos de clientes documentados", intro: "Conozca el contexto, los entregables y los resultados de tres encargos. Cada caso precisa el alcance del trabajo de Iter.", read: "Leer el caso", offer: "Conocer nuestro servicio de CFO externo" },
  }[locale];

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

  // Mentions belong to the page (a CreativeWork), not to Iter's Organization.
  // The shared layout owns the single definition of Iter's organization.
  const pageUrl = absoluteSchemaUrl(parityHref("/clients", locale));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: t.h1,
    description: t.meta.description,
    inLanguage: schemaLanguage(pageUrl),
    about: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mentions: clients.map((c) => ({
      "@type": "Organization",
      name: c.name,
      ...(c.url && { url: c.url }),
    })),
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="site-hero bg-background pt-32 pb-12">
        <div className="container max-w-4xl">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-3xl lg:text-5xl font-bold font-heading text-foreground mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="site-section bg-background pb-12" aria-labelledby="client-evidence">
        <div className="container max-w-5xl">
          <h2 id="client-evidence" className="text-2xl font-semibold font-heading mb-4">{evidence.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{evidence.intro}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map(item => <article key={item.slug} className="site-card border border-border/40 rounded-2xl p-6 flex flex-col">
              <h3 className="text-lg font-semibold">{item.company}</h3>
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">{item.summary}</p>
              <Link href={item.href} className="inline-flex min-h-11 items-center text-iter-violet underline underline-offset-4 mt-auto">{evidence.read} {item.company}</Link>
            </article>)}
          </div>
          <Link href={parityHref("/daf-externalise", locale)} className="inline-flex min-h-11 items-center text-iter-violet underline underline-offset-4 mt-6">{evidence.offer}</Link>
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
      <section className="site-section bg-muted/30 py-16 lg:py-20">
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
      <section className="site-section bg-background py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">
            {t.ctaHeading}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t.ctaParagraph}
          </p>
          <Link
            href={getContactPath(locale)}
            className="site-button site-button-primary inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-semibold hover:shadow-xl transition-all duration-300"
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
    <div className="site-card bg-white border border-border/40 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center hover:border-iter-violet/30 hover:shadow-md transition-all">
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
