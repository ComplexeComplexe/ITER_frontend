'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ComparisonTable from './ComparisonTable';
import { Tool } from '@/data/tools';
import Link from 'next/link';

export interface CategoryPageProps {
  slug: string;
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: any;
  tools: Tool[];
}

const categoryInfo = {
  'logiciels-comptabilite': {
    title: 'Comptabilité',
    intro:
      'La comptabilité n\'est pas une contrainte légale. C\'est le système nerveux de votre entreprise. Un bon outil comptable vous donne votre résultat en temps réel, alerte sur les dérives, et alimente vos prévisions.',
  },
  'logiciels-tresorerie': {
    title: 'Trésorerie',
    intro:
      '80% des défaillances d\'entreprises rentables sont liées à un problème de trésorerie, pas de rentabilité. C\'est pourquoi nous imposons un outil de prévision de trésorerie dès la Series A.',
  },
  'gestion-depenses': {
    title: 'Gestion des dépenses et notes de frais',
    intro:
      'Gérez vos dépenses opérationnelles en temps réel avec les outils modernes. Cartes virtuelles, workflows d\'approbation, et intégration comptable automatique.',
  },
  'logiciels-paie': {
    title: 'Paie & RH',
    intro:
      'Automatisez votre paie et vos déclarations sociales sans erreur ni surcharge administrative. De la DSN aux bulletins, tout doit être fluide et traçable.',
  },
};

export default function CategoryPage({
  slug,
  locale = 'fr',
  cmsNavigation,
  tools,
}: CategoryPageProps) {
  const info = categoryInfo[slug as keyof typeof categoryInfo];

  if (!info) {
    return null;
  }

  // Prepare comparison table data
  const comparison = {
    tools: tools.map((tool) => ({
      name: tool.name,
      slug: tool.slug,
      logo: tool.logo,
      rating: tool.rating,
      features: {
        'Taille cible': tool.forWho[0] || '—',
        'Implémentation': tool.implementationTime,
        'Tarif': tool.priceRange,
        'Avis Iter': '4.5/5',
      },
    })),
    criteria: ['Taille cible', 'Implémentation', 'Tarif', 'Avis Iter'],
  };

  return (
    <PageLayout locale={locale}>
      {/* Hero section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: 'Ressources', href: '/ressources' },
              { label: 'Outils', href: '/ressources/outils' },
              { label: info.title },
            ]}
          />

          <div className="max-w-3xl mt-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              {info.title} pour PME : le comparatif de nos DAF externalisés
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{info.intro}</p>
          </div>
        </div>
      </section>

      {/* Quick verdict */}
      <section className="bg-blue-50 border-l-4 border-l-blue-900 py-6 px-6 my-12">
        <div className="container">
          <p className="font-semibold text-gray-900 mb-2">Verdict rapide (30 secondes)</p>
          <p className="text-gray-700">
            {tools[0]?.name} est notre standard pour les startups et PME modernes. L'expérience
            utilisateur est nettement supérieure, l'API est solide, et les intégrations bancaires
            sont fluides.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-background py-16">
        <div className="container">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-8">
            Comparatif des outils
          </h2>
          <ComparisonTable tools={comparison.tools} criteria={comparison.criteria} />
        </div>
      </section>

      {/* Tools detail sections */}
      <section className="bg-muted/20 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-12">
            Analyse détaillée par outil
          </h2>

          <div className="space-y-12">
            {tools.map((tool) => (
              <div key={tool.slug} className="bg-background p-8 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                    {/* Logo would go here */}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                    <p className="text-muted-foreground">{tool.category}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Pour
                    </p>
                    <ul className="space-y-1 text-sm">
                      {tool.forWho.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-gray-700">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Implémentation
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{tool.implementationTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Tarif
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{tool.priceRange}</p>
                  </div>
                </div>

                <Link
                  href={`/ressources/outils/${tool.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-iter-violet font-semibold hover:gap-3 transition-all"
                >
                  Lire l'avis complet
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
