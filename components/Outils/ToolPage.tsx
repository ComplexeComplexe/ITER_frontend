'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ToolHeader from './ToolHeader';
import VerbatimBlock from './VerbatimBlock';
import StackCombo from './StackCombo';
import { Tool, getToolsByCategory } from '@/data/tools';
import { getVerbatimsByTool } from '@/data/verbatims';
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
  const stacksForTool = toolStacks[slug] || [];
  const faqForTool = faqItems[slug as keyof typeof faqItems] || [];
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

      {/* Tool Header Component */}
      <section className="bg-background py-8">
        <div className="container">
          <ToolHeader
            name={tool.name}
            logo={tool.logo}
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
            {tool.name} est notre standard pour {tool.forWho[0]}. Le rapport prix/qualité est
            excellent, l'implémentation rapide, et le support réactif.
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
      {stacksForTool.map((stack, idx) => (
        <section key={idx} className="bg-background py-16">
          <div className="container max-w-3xl">
            <StackCombo combo={stack.combo} title={stack.title} description={stack.description} />
          </div>
        </section>
      ))}

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
