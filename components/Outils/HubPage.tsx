'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ToolCard from './ToolCard';
import { tools } from '@/data/tools';
import Link from 'next/link';

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
            {phaseDoneTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                name={tool.name}
                slug={tool.slug}
                logo={tool.logo}
                category={tool.category}
                categorySlug={tool.categorySlug}
                rating={tool.rating}
                shortDescription={tool.shortDescription}
                phase={tool.phase}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
