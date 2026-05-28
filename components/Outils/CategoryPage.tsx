'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ComparisonTable from './ComparisonTable';
import { Tool } from '@/data/tools';
import { getCategoryContent } from '@/data/categoryContent';
import Link from 'next/link';
import Image from 'next/image';

function generateCategoryBreadcrumbSchema(categoryTitle: string, slug: string) {
  return {
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
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryTitle,
        item: `https://www.iteradvisors.com/ressources/outils/${slug}`,
      },
    ],
  };
}

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
      logoAlt: tool.logoAlt,
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
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCategoryBreadcrumbSchema(categoryContent.title, slug)),
        }}
      />

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

      {/* Detailed comparison matrix — TICKET 18 */}
      {categoryContent.detailedComparison && (
        <section className="bg-muted/20 py-16">
          <div className="container max-w-5xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-3">
              Tableau comparatif détaillé
            </h2>
            <p className="text-muted-foreground mb-8">
              Comparaison critère par critère, basée sur 40+ déploiements terrain.
            </p>
            <div className="overflow-x-auto bg-background rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-iter-violet/5 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Critère</th>
                    {categoryContent.detailedComparison.tools.map((toolName) => (
                      <th key={toolName} className="text-left p-4 font-semibold text-foreground">
                        {toolName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categoryContent.detailedComparison.criteria.map((row, idx) => (
                    <tr
                      key={row.label}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}
                    >
                      <td className="p-4 font-medium text-foreground">{row.label}</td>
                      {categoryContent.detailedComparison!.tools.map((toolName) => (
                        <td key={toolName} className="p-4 text-gray-700">
                          {row.scores[toolName] ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Verdict by profile/stage — TICKET 18 */}
      {categoryContent.verdictByStage && categoryContent.verdictByStage.length > 0 && (
        <section className="bg-background py-16">
          <div className="container max-w-4xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-3">
              Notre recommandation par profil
            </h2>
            <p className="text-muted-foreground mb-8">
              Quel outil choisir selon votre stade de croissance et votre activité.
            </p>
            <div className="space-y-3">
              {categoryContent.verdictByStage.map((v) => (
                <div
                  key={v.stage}
                  className="grid sm:grid-cols-[200px_220px_1fr] gap-4 items-start p-5 rounded-2xl border border-gray-200 bg-muted/10"
                >
                  <div>
                    <p className="text-xs font-semibold text-iter-violet uppercase tracking-wider">
                      Profil
                    </p>
                    <p className="font-semibold text-foreground mt-1">{v.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-iter-violet uppercase tracking-wider">
                      Recommandation
                    </p>
                    <p className="font-semibold text-foreground mt-1">{v.tool}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-iter-violet uppercase tracking-wider">
                      Pourquoi
                    </p>
                    <p className="text-gray-700 mt-1 text-sm leading-relaxed">{v.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                      <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                        <Image
                          src={toolData.logo}
                          alt={toolData.logoAlt ?? `Logo ${selectedTool.name}`}
                          width={120}
                          height={40}
                          sizes="120px"
                          className="max-w-full max-h-full object-contain"
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
