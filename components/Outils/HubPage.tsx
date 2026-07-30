'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ToolCard from './ToolCard';
import { tools } from '@/data/tools';
import Link from 'next/link';

const hubBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Ressources',
      item: 'https://www.iteradvisors.com/ressources',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Outils',
      item: 'https://www.iteradvisors.com/ressources/outils',
    },
  ],
};

const hubCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.iteradvisors.com/ressources/outils',
  name: 'Stack financier idéal pour startups et PME',
  description:
    'Guide complet des outils de finance (comptabilité, trésorerie, dépenses, paie) recommandés par nos DAF externalisés.',
  url: 'https://www.iteradvisors.com/ressources/outils',
  author: {
    '@type': 'Organization',
    name: 'Iter Advisors',
    url: 'https://www.iteradvisors.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Comptabilité',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-comptabilite',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Trésorerie',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-tresorerie',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Gestion des dépenses',
        url: 'https://www.iteradvisors.com/ressources/outils/gestion-depenses',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Paie & RH',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-paie',
      },
    ],
  },
};

export interface HubPageProps {
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: any;
}

const stageRecommendations = {
  fr: [
    {
      stage: 'Seed / Early stage',
      revenue: 'CA < 2 M€, équipe 5-15 personnes',
      description:
        'À ce stade, la priorité est la simplicité et le coût maîtrisé. Vous n\'avez pas besoin d\'un ERP.',
      tools: ['Qonto', 'Pennylane', 'Spendesk', 'Payfit'],
      budget: '250-400 €/mois',
    },
    {
      stage: 'Series A / B',
      revenue: 'CA 2-10 M€, équipe 15-50 personnes',
      description:
        'C\'est le moment où la complexité explose. Vous avez besoin de visibilité en temps réel.',
      tools: ['Qonto/Revolut', 'Pennylane', 'Agicap', 'Spendesk', 'Payfit'],
      budget: '800-1 500 €/mois',
    },
    {
      stage: 'Scale-up / PME mature',
      revenue: 'CA 10-30 M€, équipe 50-100 personnes',
      description:
        'Vous avez probablement un CFO interne. Votre stack s\'étoffe et se professionnalise.',
      tools: ['Pennylane/Sage', 'Agicap', 'Spendesk/Payhawk', 'Payfit/Silae'],
      budget: '2 000-4 000 €/mois',
    },
  ],
};

const categories = {
  fr: [
    {
      slug: 'logiciels-comptabilite',
      name: 'Comptabilité',
      description:
        'La comptabilité est le système nerveux de votre entreprise. Un bon outil vous donne votre résultat en temps réel.',
      icon: '📊',
    },
    {
      slug: 'logiciels-tresorerie',
      name: 'Trésorerie',
      description:
        '80% des défaillances d\'entreprises rentables sont liées à un problème de trésorerie, pas de rentabilité.',
      icon: '💰',
    },
    {
      slug: 'gestion-depenses',
      name: 'Gestion des dépenses',
      description:
        'Contrôlez vos flux de dépenses opérationnelles et optimisez votre cash burn en temps réel.',
      icon: '💳',
    },
    {
      slug: 'logiciels-paie',
      name: 'Paie & RH',
      description:
        'Automatisez vos déclarations DSN et vos bulletins de paie sans risque d\'erreur ni surcharge.',
      icon: '👥',
    },
  ],
};

export default function HubPage({ locale = 'fr', cmsNavigation }: HubPageProps) {
  const stageData = locale === 'fr' ? stageRecommendations.fr : stageRecommendations.fr;
  const categoryData = locale === 'fr' ? categories.fr : categories.fr;
  const phaseDoneTools = tools.filter((t) => t.phase === 1);

  return (
    <PageLayout locale={locale}>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hubBreadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hubCollectionSchema),
        }}
      />

      {/* Hero section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: 'Ressources', href: '/ressources' },
              { label: 'Outils' },
            ]}
          />

          <div className="max-w-3xl mt-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              Le stack financier idéal pour startups et PME en croissance
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nous avons déployé des stacks financiers complets chez plus de 80 startups et PME ces
              trois dernières années. Ce guide n\'est pas un comparateur automatique qui liste 47
              logiciels avec des étoiles anonymes. C\'est le résultat de déploiements terrain, avec
              des noms, des durées d\'implémentation réelles, et des cas concrets.
            </p>
          </div>
        </div>
      </section>

      {/* Stage-based recommendations */}
      <section className="bg-muted/20 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-12">
            Notre recommandation par stade de croissance
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {stageData.map((stage) => (
              <div
                key={stage.stage}
                className="bg-background border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{stage.stage}</h3>
                <p className="text-sm text-muted-foreground mb-4">{stage.revenue}</p>
                <p className="text-sm text-gray-700 mb-6">{stage.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">OUTILS</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-block px-3 py-1 text-xs font-semibold bg-iter-violet/10 text-iter-violet rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm font-semibold text-foreground">Budget : {stage.budget}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category overview */}
      <section className="bg-background py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-12">
            Notre sélection par catégorie fonctionnelle
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryData.map((category) => (
              <Link
                key={category.slug}
                href={`/ressources/outils/${category.slug}`}
              >
                <div className="h-full p-6 bg-muted/20 rounded-lg border border-gray-200 hover:border-iter-violet/50 hover:shadow-md transition-all cursor-pointer">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-iter-violet font-semibold text-sm">
                    Voir le comparatif
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="bg-muted/20 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-12">
            Les outils de référence (Phase 1)
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phaseDoneTools
              .filter((tool) => tool.slug !== 'payfit')
              .flatMap((tool) => {
                const card = (
                  <ToolCard
                    key={tool.slug}
                    name={tool.name}
                    slug={tool.slug}
                    logo={tool.logo}
                    logoAlt={tool.logoAlt}
                    category={tool.category}
                    categorySlug={tool.categorySlug}
                    rating={tool.rating}
                    shortDescription={tool.shortDescription}
                    phase={tool.phase}
                  />
                );
                // malibou takes PayFit's slot, right after Spendesk — no
                // ToolCard reuse (its `rating` prop would force an
                // unverified star display, which the ticket forbids for
                // this new entrant with no documented methodology yet).
                if (tool.slug === 'spendesk') {
                  return [
                    card,
                    <Link
                      key="malibou"
                      href="/ressources/outils/malibou"
                      className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-iter-violet/10 rounded-lg flex items-center justify-center text-iter-violet font-bold text-xl">
                          m
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-iter-violet/10 text-iter-violet">
                          Nouveau
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">malibou</h3>
                      <p className="text-sm text-gray-600 mb-2">Paie &amp; RH</p>
                      <p className="text-sm text-gray-700 mb-4 flex-grow">
                        SIRH couplé à un gestionnaire de paie dédié qui produit les bulletins sur la technologie Silae — pour déléguer la paie sans RH senior.
                      </p>
                      <div className="inline-flex items-center gap-1 text-blue-900 font-semibold text-sm hover:gap-2 transition-all">
                        Voir la fiche
                        <span>→</span>
                      </div>
                    </Link>,
                  ];
                }
                return [card];
              })}
          </div>
        </div>
      </section>

      {/* GEO-08 (2026-07-17) — Comparison table "Notre verdict Iter Advisors"
          par catégorie. Information gain : la colonne "Avis Iter Advisors"
          contient des verdicts personnalisés issus de l'expérience réelle
          des CFO Iter Advisors, pas des descriptions marketing. Format
          preferred by LLMs (comparison tables — cf. TICKET-GEO §2). */}
      <section className="bg-background py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
            Comparatif outils CFO 2026 : notre verdict par catégorie
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Chaque colonne « Avis Iter Advisors » reflète le verdict d&apos;usage
            après déploiement chez nos 85+ clients — pas une description
            copiée du site éditeur. Prix HT/mois indicatifs, calibrés pour
            une PME de 10 à 50 salariés.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left p-3 font-semibold border border-border/60">Outil</th>
                  <th className="text-left p-3 font-semibold border border-border/60">Fonction</th>
                  <th className="text-left p-3 font-semibold border border-border/60">Prix/mois</th>
                  <th className="text-left p-3 font-semibold border border-border/60">API compta</th>
                  <th className="text-left p-3 font-semibold border border-border/60">API banque</th>
                  <th className="text-left p-3 font-semibold border border-border/60">Avis Iter Advisors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Pennylane</strong></td>
                  <td className="p-3 border border-border/60">Comptabilité + facturation</td>
                  <td className="p-3 border border-border/60">49-149 €</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">Le meilleur pour les PME françaises en 2026. Migration en 2 semaines chez nos clients.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Sage</strong></td>
                  <td className="p-3 border border-border/60">Comptabilité + ERP</td>
                  <td className="p-3 border border-border/60">30-250 €</td>
                  <td className="p-3 border border-border/60">Natif</td>
                  <td className="p-3 border border-border/60">Partiel</td>
                  <td className="p-3 border border-border/60">Robuste pour l&apos;industrie et le multi-entités. UX datée mais fiable.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Agicap</strong></td>
                  <td className="p-3 border border-border/60">Trésorerie + forecast</td>
                  <td className="p-3 border border-border/60">79-249 €</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">Forecast 12 mois précis à 95 % chez nos clients avec CA {'>'}5 M€.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Kyriba</strong></td>
                  <td className="p-3 border border-border/60">Trésorerie groupe</td>
                  <td className="p-3 border border-border/60">Sur devis (5-15 k€)</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">Overkill sous 20 M€ de CA. Notre choix ETI 50 M€+ multi-devises.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Spendesk</strong></td>
                  <td className="p-3 border border-border/60">Gestion dépenses</td>
                  <td className="p-3 border border-border/60">0-99 €/user</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">❌</td>
                  <td className="p-3 border border-border/60">Gestion notes de frais fluide. À coupler avec Pennylane pour l&apos;OCR.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Qonto</strong></td>
                  <td className="p-3 border border-border/60">Banque pro + cartes</td>
                  <td className="p-3 border border-border/60">9-99 €</td>
                  <td className="p-3 border border-border/60">✅ Pennylane</td>
                  <td className="p-3 border border-border/60">—</td>
                  <td className="p-3 border border-border/60">Best-in-class pour startups jusqu&apos;à 30 salariés. API rich.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Payfit</strong></td>
                  <td className="p-3 border border-border/60">Paie + RH</td>
                  <td className="p-3 border border-border/60">39-99 €/mois + 12 €/bulletin</td>
                  <td className="p-3 border border-border/60">✅</td>
                  <td className="p-3 border border-border/60">—</td>
                  <td className="p-3 border border-border/60">Excellent jusqu&apos;à 100 salariés en France. Silae au-delà.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><Link href="/ressources/outils/malibou" className="font-bold hover:underline">malibou</Link></td>
                  <td className="p-3 border border-border/60">Paie + RH avec gestionnaire dédié</td>
                  <td className="p-3 border border-border/60">~20-25 €/salarié</td>
                  <td className="p-3 border border-border/60">À confirmer</td>
                  <td className="p-3 border border-border/60">—</td>
                  <td className="p-3 border border-border/60">Bonne option pour déléguer la paie sans RH senior, sur la technologie Silae. Recul produit encore limité.</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border/60"><strong>Power BI</strong></td>
                  <td className="p-3 border border-border/60">Reporting / dataviz</td>
                  <td className="p-3 border border-border/60">10-20 €/user</td>
                  <td className="p-3 border border-border/60">Via connecteurs</td>
                  <td className="p-3 border border-border/60">—</td>
                  <td className="p-3 border border-border/60">Notre choix par défaut pour board reporting. Alternative : Metabase gratuit.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Verdicts basés sur le retour d&apos;expérience de nos DAF externalisés sur
            85 missions actives — pas des descriptions marketing du site éditeur.
            Dernière mise à jour : juillet 2026.
          </p>
        </div>
      </section>

      {/* CTA section */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
