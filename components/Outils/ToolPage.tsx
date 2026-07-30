'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ToolHeader from './ToolHeader';
import VerbatimBlock from './VerbatimBlock';
import StackCombo from './StackCombo';
import { Tool, getToolsByCategory, tools as allTools } from '@/data/tools';
import { getVerbatimsByTool } from '@/data/verbatims';
import { getToolDetails } from '@/data/toolDetails';
import {
  generateToolReviewSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from '@/lib/schemas/toolSchemas';
import Link from 'next/link';

export interface ToolPageProps {
  slug: string;
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: any;
  tool: Tool;
}

const categoryLabels = {
  comptabilite: 'Comptabilité',
  tresorerie: 'Trésorerie',
  depenses: 'Gestion des dépenses',
  paie: 'Paie & RH',
  // Refonte outils (2026-07-17) — 4 nouvelles catégories ajoutées
  // en même temps que 7 outils (Kyriba, Power BI, Upflow, LeanPay,
  // Factorial, Carta, Equify).
  recouvrement: 'Recouvrement client',
  sirh: 'SIRH & RH',
  equity: 'Equity / Cap Table',
  reporting: 'Reporting & Dataviz',
};

// Predefined stacks for each tool
const toolStacks: Record<string, any[]> = {
  pennylane: [
    {
      combo: [
        { name: 'Pennylane', slug: 'pennylane', logo: '/images/logos/tools/pennylane.svg', role: 'Comptabilité' },
        { name: 'Agicap', slug: 'agicap', logo: '/images/logos/tools/agicap.svg', role: 'Trésorerie' },
        { name: 'Spendesk', slug: 'spendesk', logo: '/images/logos/tools/spendesk.svg', role: 'Dépenses' },
      ],
      title: 'Le combo gagnant',
      description: 'La trinité pour une SaaS Series A/B',
    },
  ],
  agicap: [
    {
      combo: [
        { name: 'Pennylane', slug: 'pennylane', logo: '/images/logos/tools/pennylane.svg', role: 'Comptabilité' },
        { name: 'Agicap', slug: 'agicap', logo: '/images/logos/tools/agicap.svg', role: 'Trésorerie' },
        { name: 'Spendesk', slug: 'spendesk', logo: '/images/logos/tools/spendesk.svg', role: 'Dépenses' },
      ],
      title: 'Le combo gagnant',
      description: 'La trinité pour une SaaS Series A/B',
    },
  ],
};

const faqItems = {
  pennylane: [
    {
      question: 'Combien coûte Pennylane ?',
      answer:
        'Pennylane propose 3 plans : Start à 39 €/mois, Pro à 99 €/mois, et Scale à 199 €/mois. Au-delà, sur devis.',
    },
    {
      question: 'Pennylane convient-il aux startups ?',
      answer:
        'Oui, Pennylane est idéal pour les startups de 5 à 80 salariés. Le plan Start à 39 €/mois suffit pour démarrer.',
    },
    {
      question: 'Combien de temps pour migrer vers Pennylane ?',
      answer:
        'La migration vers Pennylane prend 1 à 3 semaines selon la propreté de la comptabilité existante.',
    },
  ],
  agicap: [
    {
      question: 'Combien coûte Agicap ?',
      answer:
        'Agicap démarre à 49 €/mois en version Essentials et va jusqu\'à 249 €/mois pour la version Scale.',
    },
    {
      question: 'Qui devrait utiliser Agicap ?',
      answer:
        'PME et startups de 10-100 personnes ayant besoin d\'une visibilité trésorerie à 13 semaines.',
    },
  ],
  spendesk: [
    {
      question: 'Combien coûte Spendesk ?',
      answer:
        'Spendesk démarre à 99 €/mois en version Light et va jusqu\'à 199 €/mois pour les startups Series A/B.',
    },
    {
      question: 'Spendesk vs Pleo ?',
      answer:
        'Spendesk pour 15+ cartes et workflows complexes. Pleo pour moins de 10 cartes et structures simples.',
    },
  ],
  payfit: [
    {
      question: 'Combien coûte PayFit ?',
      answer:
        '27 €/mois/salarié en Essential et 49 €/mois/salarié en Performance. Pour 30 salariés en Essential : 810 €/mois.',
    },
    {
      question: 'PayFit pour les startups en seed ?',
      answer:
        'Oui, dès la première embauche. 27 €/mois pour un salarié, c\'est raisonnable et ça évite un cabinet externe.',
    },
  ],
};

export default function ToolPage({
  slug,
  locale = 'fr',
  cmsNavigation,
  tool,
}: ToolPageProps) {
  const verbatim = getVerbatimsByTool(slug);
  const toolDetails = getToolDetails(slug);
  const stacksForTool = toolDetails?.stackCombos || toolStacks[slug] || [];
  const faqForTool = toolDetails?.faqExpanded || faqItems[slug as keyof typeof faqItems] || [];
  const alternativeTools = getToolsByCategory(tool.category).filter((t) => t.slug !== slug);

  return (
    <PageLayout locale={locale}>
      {/* Hero section */}
      <section className="bg-background pt-32 pb-12">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: 'Ressources', href: '/ressources' },
              { label: 'Outils', href: '/ressources/outils' },
              {
                label: categoryLabels[tool.category as keyof typeof categoryLabels],
                href: `/ressources/outils/${tool.categorySlug}`,
              },
              { label: tool.name },
            ]}
          />

          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mt-8 mb-8">
            {tool.name} — l'avis de nos DAF externalisés
          </h1>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateToolReviewSchema(tool)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(
              tool.name,
              tool.slug,
              categoryLabels[tool.category as keyof typeof categoryLabels],
              tool.categorySlug
            )
          ),
        }}
      />
      {faqForTool.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateFAQSchema(tool.name, faqForTool, tool.slug)
            ),
          }}
        />
      )}
      {/* HowTo JSON-LD — TICKET 31 */}
      {toolDetails?.implementationGuide && toolDetails.implementationGuide.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateHowToSchema(
                tool.name,
                tool.slug,
                toolDetails.implementationGuide,
                tool.implementationTime
              )
            ),
          }}
        />
      )}

      {/* Tool Header Component */}
      <section className="bg-background py-8">
        <div className="container">
          <ToolHeader
            name={tool.name}
            logo={tool.logo}
            logoAlt={tool.logoAlt}
            category={categoryLabels[tool.category as keyof typeof categoryLabels]}
            categorySlug={tool.categorySlug}
            rating={tool.rating}
            forWho={tool.forWho}
            notForWho={tool.notForWho}
            implementationTime={tool.implementationTime}
            priceRange={tool.priceRange}
          />
        </div>
      </section>

      {/* Verdict section */}
      <section className="bg-blue-50 border-l-4 border-l-blue-900 py-8 px-6 my-12">
        <div className="container">
          <p className="font-semibold text-gray-900 mb-2">Verdict 30 secondes</p>
          <p className="text-gray-700">
            {toolDetails?.verdict30s || `${tool.name} est notre standard pour ${tool.forWho[0]}. Le rapport prix/qualité est excellent, l'implémentation rapide, et le support réactif.`}
          </p>
        </div>
      </section>

      {/* For Who / Not For Who sections */}
      <section className="bg-background py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Pour qui / Pour qui pas</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">✓ Pour qui</h3>
              <ul className="space-y-3">
                {tool.forWho.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">✗ Pour qui pas</h3>
              <ul className="space-y-3">
                {tool.notForWho.map((item, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start gap-3">
                    <span className="text-red-600 font-bold mt-0.5">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages section */}
      {toolDetails?.advantages && toolDetails.advantages.length > 0 && (
        <section className="bg-muted/20 py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Avantages clés</h2>
            <div className="space-y-6">
              {toolDetails.advantages.map((advantage, idx) => (
                <div key={idx} className="bg-background p-6 rounded-lg border border-green-200 border-l-4 border-l-green-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    {advantage.title}
                  </h3>
                  <p className="text-gray-700">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Limitations section */}
      {toolDetails?.limitations && toolDetails.limitations.length > 0 && (
        <section className="bg-background py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Limitations et solutions</h2>
            <div className="space-y-6">
              {toolDetails.limitations.map((limitation, idx) => (
                <div key={idx} className="bg-muted/20 p-6 rounded-lg border border-orange-200 border-l-4 border-l-orange-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-orange-600 text-xl">⚠</span>
                    {limitation.title}
                  </h3>
                  <p className="text-gray-700"><strong>Solution :</strong> {limitation.workaround}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Implementation guide section */}
      {toolDetails?.implementationGuide && toolDetails.implementationGuide.length > 0 && (
        <section className="bg-muted/20 py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Guide d'implémentation</h2>
            <div className="space-y-4">
              {toolDetails.implementationGuide.map((item, idx) => (
                <div key={idx} className="bg-background p-6 rounded-lg border border-gray-200">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-iter-violet text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{item.step}</h3>
                      <p className="text-gray-700 text-sm">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Retour terrain — TICKET 20 */}
      {toolDetails?.retourTerrain && (
        <section className="bg-iter-violet/5 border-y border-iter-violet/20 py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Retour terrain</h2>
            <p className="text-gray-700 leading-relaxed italic mb-8">
              « {toolDetails.retourTerrain.clientStory} »
            </p>
            <div className="bg-background p-6 rounded-lg border border-iter-violet/20">
              <p className="font-semibold text-gray-900 mb-2">Stack recommandé</p>
              <p className="text-gray-700 mb-2">
                <strong>{toolDetails.retourTerrain.recommendedStack.tools.join(' + ')}</strong>
                {' = notre stack le plus déployé pour ce besoin.'}
              </p>
              <p className="text-sm text-muted-foreground">
                Budget total : <strong>{toolDetails.retourTerrain.recommendedStack.budget}</strong>. ROI constaté : <strong>{toolDetails.retourTerrain.recommendedStack.roi}</strong>.
              </p>
              {toolDetails.retourTerrain.relatedCategoryHref && (
                <Link
                  href={toolDetails.retourTerrain.relatedCategoryHref}
                  className="inline-block mt-4 text-iter-violet font-semibold hover:underline text-sm"
                >
                  → {toolDetails.retourTerrain.relatedCategoryLabel ?? 'Voir le comparatif complet'}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Verbatim block */}
      {verbatim && (
        <section className="bg-muted/20 py-16">
          <div className="container max-w-3xl">
            <VerbatimBlock
              quote={verbatim.quote}
              author={verbatim.toolSlug === 'pennylane' ? 'Sébastien Doat' : 'Benjamin Ziza'}
              role="Founding Partner & CFO"
              company="Iter Advisors"
              variant={verbatim.expert === 'sebastien' ? 'sebastien' : 'benjamin'}
            />
          </div>
        </section>
      )}

      {/* Stack Combo sections */}
      {stacksForTool && stacksForTool.length > 0 && (
        <section className="bg-background py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-12">Stacks recommandés</h2>
            <div className="space-y-12">
              {stacksForTool.map((stack: any, idx: number) => {
                // Derive the stack tool map from the canonical tools array so
                // every tool (incl. the 9 added via TICKET 5) renders with
                // its real logo + SEO alt text in stack combos.
                const roleByCategory: Record<Tool['category'], string> = {
                  comptabilite: 'Comptabilité',
                  tresorerie: 'Trésorerie',
                  depenses: 'Dépenses',
                  paie: 'Paie',
                  // Refonte outils (2026-07-17) — nouvelles catégories.
                  recouvrement: 'Recouvrement',
                  sirh: 'SIRH',
                  equity: 'Equity',
                  reporting: 'Reporting',
                };
                const comboToRender = stack.tools && stack.tools.length > 0 ?
                  stack.tools.map((toolName: string) => {
                    const t = allTools.find((x) => x.name === toolName);
                    if (t) {
                      return {
                        name: t.name,
                        slug: t.slug,
                        logo: t.logo,
                        logoAlt: t.logoAlt,
                        role: roleByCategory[t.category],
                      };
                    }
                    // Unknown tool name (e.g. "Stripe", "SAP" referenced in
                    // a stack combo but not in our data) — render the label
                    // without a logo rather than crash.
                    return { name: toolName, slug: toolName.toLowerCase().replace(/\s+/g, '-'), logo: '', role: '' };
                  }) : (stack.combo || []);
                return (
                  <div key={idx}>
                    <StackCombo
                      combo={comboToRender}
                      title={stack.title}
                      description={stack.description}
                    />
                    <p className="text-sm text-muted-foreground mt-4">{stack.context}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Alternatives section */}
      {alternativeTools.length > 0 && (
        <section className="bg-muted/20 py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Alternatives</h2>
            <div className="space-y-4">
              {alternativeTools.map((altTool) => (
                <Link
                  key={altTool.slug}
                  href={`/ressources/outils/${altTool.slug}`}
                  className="block p-4 bg-background rounded-lg border border-gray-200 hover:border-iter-violet/50 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 text-iter-violet hover:underline">
                    {altTool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{altTool.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related tool mention — editorial cross-link, distinct from the
          automated "Alternatives" list above (2026-07-30, malibou integration) */}
      {toolDetails?.relatedMention && (
        <section className="bg-background py-8">
          <div className="container max-w-3xl">
            <p className="text-gray-700">
              {toolDetails.relatedMention.before}{' '}
              <Link href={toolDetails.relatedMention.linkHref} className="text-iter-violet font-semibold hover:underline">
                {toolDetails.relatedMention.linkText}
              </Link>
              {toolDetails.relatedMention.after ?? ''}
            </p>
          </div>
        </section>
      )}

      {/* FAQ section */}
      {faqForTool.length > 0 && (
        <section className="bg-background py-16">
          <div className="container max-w-3xl">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-8">Questions fréquentes</h2>
            <div className="space-y-6">
              {faqForTool.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
