import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ToolHeader from './ToolHeader';
import type { CmsNavItem } from '@/lib/static-content';
import { type Tool, getToolsByCategory, CATEGORIES_WITH_PAGE } from '@/data/tools';
import { toolSelection, TOOL_SELECTION_REVIEW_DATE } from '@/data/toolSelection';
import { TOOL_PRICING } from '@/data/toolPricing';
import { generateToolArticleSchema, generateFAQSchema, getToolAuthor } from '@/lib/schemas/toolSchemas';
import { PAGE_REVISIONS } from '@/lib/content/page-revisions';

export interface ToolPageProps {
  slug: string;
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: CmsNavItem[];
  tool: Tool;
}
const categoryLabels: Record<Tool['category'], string> = {
  comptabilite: 'Comptabilité', tresorerie: 'Trésorerie', depenses: 'Gestion des dépenses',
  paie: 'Paie et RH', recouvrement: 'Recouvrement client', sirh: 'SIRH et RH',
  equity: 'Actionnariat et cap table', reporting: 'Reporting et BI',
};

/** Static editorial content remains on the server; interactive navigation keeps its own boundary. */
export default function ToolPage({ slug, locale = 'fr', cmsNavigation, tool }: ToolPageProps) {
  const selection = toolSelection[slug];
  const pricing = TOOL_PRICING[slug];
  const alternatives = getToolsByCategory(tool.category).filter(t => t.slug !== slug);
  const author = getToolAuthor(tool);
  const modified = PAGE_REVISIONS[`/ressources/outils/${slug}`] ?? TOOL_SELECTION_REVIEW_DATE;
  const label = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${modified}T12:00:00Z`));
  const faq = [
    { question: selection.question, answer: selection.answer },
    { question: `Quel budget prévoir pour ${tool.name} ?`, answer: `${pricing.note} ${selection.cost}` },
  ];
  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="site-hero bg-background pt-32 pb-8">
        <div className="container max-w-4xl">
          <Breadcrumb locale={locale} items={[
            { label: 'Ressources', href: '/ressources' }, { label: 'Outils', href: '/ressources/outils' },
            { label: categoryLabels[tool.category], href: CATEGORIES_WITH_PAGE.has(tool.categorySlug) ? `/ressources/outils/${tool.categorySlug}` : undefined },
            { label: tool.name },
          ]} />
          <h1 className="mt-8 mb-4 text-3xl lg:text-4xl font-bold font-heading text-foreground">Avis {tool.name} : usages et critères de choix</h1>
          <p className="text-sm text-muted-foreground mb-6">Repères éditoriaux par <Link href={author.url} rel="author" className="text-iter-violet underline">{author.name}</Link> · mis à jour le <time dateTime={modified}>{label}</time></p>
          <p className="site-copy text-lg text-foreground/85 leading-relaxed">{selection.intro}</p>
          <p className="mt-4"><Link href={selection.comparison.href} className="text-iter-violet font-semibold underline">{selection.comparison.label}</Link></p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolArticleSchema(tool)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(tool.name, faq, tool.slug)) }} />
      <section className="bg-background py-8">
        <div className="container max-w-4xl"><ToolHeader name={tool.name} logo={tool.logo} logoAlt={tool.logoAlt} category={categoryLabels[tool.category]} categorySlug={tool.categorySlug} forWho={selection.uses} notForWho={selection.warnings} implementationTime={tool.implementationTime} priceRange={tool.priceRange} pricingKey={slug} /></div>
      </section>
      <section className="site-section bg-muted/20 py-12">
        <div className="container max-w-3xl">
          <h2 className="mb-5 text-2xl font-bold font-heading">Un parcours à tester avec {tool.name}</h2>
          <p className="site-copy text-muted-foreground leading-relaxed mb-6">{selection.scenario} Ce parcours est une proposition de test, sans résultat client attribué.</p>
          <ol className="space-y-5">
            {selection.checks.map((check, index) => <li id={`step${index + 1}`} key={check.title} className="site-card p-5 border border-border rounded-2xl bg-background scroll-mt-28"><h3 className="font-semibold mb-2">{index + 1}. {check.title}</h3><p className="site-copy text-muted-foreground leading-relaxed">{check.text}</p></li>)}
          </ol>
          {/* Previously published implementation links still land at the relevant verification section. */}
          {Array.from({ length: 5 - selection.checks.length }, (_, i) => <span key={i} id={`step${selection.checks.length + i + 1}`} className="block scroll-mt-28" />)}
          <p className="site-copy mt-6 text-muted-foreground leading-relaxed">{selection.limit}</p>
        </div>
      </section>
      <section className="bg-background py-12">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold font-heading mb-6">Questions fréquentes sur {tool.name}</h2>
          <div className="space-y-4">{faq.map(item => <details key={item.question} className="site-card rounded-2xl border border-border p-5"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="site-copy mt-4 text-muted-foreground leading-relaxed">{item.answer}</p></details>)}</div>
          <p className="mt-8"><Link href={selection.service.href} className="font-semibold text-iter-violet underline">{selection.service.label}</Link> : convenez du périmètre, du responsable des contrôles et des livrables attendus. Le <Link href="/daf-externalise" className="text-iter-violet underline">DAF externalisé</Link> peut cadrer ce pilotage avec vos équipes et prestataires.</p>
          {alternatives.length > 0 && <details className="site-card mt-6 p-5 border border-border rounded-2xl"><summary className="cursor-pointer font-semibold">Autres fiches du même besoin</summary><ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">{alternatives.map(t => <li key={t.slug}><Link href={`/ressources/outils/${t.slug}`} className="text-iter-violet underline">{t.name}</Link></li>)}</ul></details>}
          <h2 className="text-xl font-bold mt-10 mb-3">Sources et méthode</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Présentation et documentation : <a href={selection.source} className="text-iter-violet underline">source officielle {tool.name}</a>, consultée le <time dateTime={TOOL_SELECTION_REVIEW_DATE}>2 octobre 2026</time>. Les questions ci-dessus constituent une grille éditoriale de sélection, pas un benchmark chronométré. Les fonctions incluses et le délai sont à confirmer sur votre dossier.</p>
          <p className="mt-3 text-sm"><Link href="/ressources/blog/essentiels-outils-tech-finance" className="text-iter-violet underline">Méthode complète pour choisir et intégrer les outils finance</Link></p>
        </div>
      </section>
      <CTASection locale={locale} />
    </PageLayout>
  );
}
