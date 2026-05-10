'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ComparisonTable from './ComparisonTable';
import { Tool } from '@/data/tools';
import { getCategoryContent } from '@/data/categoryContent';
import Link from 'next/link';
import Image from 'next/image';

export interface CategoryPageProps {
  slug: string;
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: any;
  tools: Tool[];
}

export default function CategoryPage({
  slug,
  locale = 'fr',
  cmsNavigation,
  tools,
}: CategoryPageProps) {
  const categoryContent = getCategoryContent(slug);

  if (!categoryContent) {
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
              { label: categoryContent.title },
            ]}
          />

          <div className="max-w-3xl mt-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              {categoryContent.title} pour PME : le comparatif de nos DAF externalisés
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{categoryContent.intro}</p>
          </div>
        </div>
      </section>

      {/* Quick verdict */}
      <section className="bg-blue-50 border-l-4 border-l-blue-900 py-6 px-6 my-12">
        <div className="container">
          <p className="font-semibold text-gray-900 mb-2">Verdict rapide (30 secondes)</p>
          <p className="text-gray-700">
            {categoryContent.verdict}
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
            {categoryContent.selectedTools.map((selectedTool) => {
              const toolData = tools.find((t) => t.name === selectedTool.name);
              return (
                <div key={selectedTool.name} className="bg-background p-8 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-4 mb-6">
                    {toolData?.logo && (
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={toolData.logo}
                          alt={selectedTool.name}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedTool.name}</h3>
                      <p className="text-muted-foreground">{selectedTool.forWho}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-green-700 uppercase mb-3">✓ Avantages</p>
                      <ul className="space-y-2">
                        {selectedTool.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-green-600 flex-shrink-0">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 uppercase mb-3">✗ Limitations</p>
                      <ul className="space-y-2">
                        {selectedTool.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-red-600 flex-shrink-0">−</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {toolData && (
                    <Link
                      href={`/ressources/outils/${toolData.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 text-iter-violet font-semibold hover:gap-3 transition-all"
                    >
                      Lire l'avis complet
                      <span>→</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Decision criteria */}
      <section className="bg-background py-16">
        <div className="container">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-8">
            Critères de décision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categoryContent.decisionCriteria.map((criterion, idx) => (
              <div key={idx} className="p-6 bg-muted/20 rounded-lg border border-gray-200">
                <p className="text-gray-700">{criterion}</p>
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
