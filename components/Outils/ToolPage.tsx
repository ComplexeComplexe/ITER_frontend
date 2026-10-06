import { InvoiceResourceCard } from '@/components/pages/ElectronicInvoicingPage';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import type { CmsNavItem } from '@/lib/static-content';
import { type Tool, getToolBySlug, CATEGORIES_WITH_PAGE } from '@/data/tools';
import { toolSelection, TOOL_SELECTION_REVIEW_DATE } from '@/data/toolSelection';
import { toolReviews, PENNYLANE_EXPERIENCE, getToolReviewTitle } from '@/data/toolReviews';
import { TOOL_PRICING } from '@/data/toolPricing';
import { generateToolArticleSchema, generateFAQSchema, getToolAuthor } from '@/lib/schemas/toolSchemas';
import { PAGE_REVISIONS } from '@/lib/content/page-revisions';

export interface ToolPageProps { slug: string; locale: 'fr' | 'en' | 'es'; cmsNavigation?: CmsNavItem[]; tool: Tool; }
const categoryLabels: Record<Tool['category'], string> = { comptabilite: 'Comptabilité', tresorerie: 'Trésorerie', depenses: 'Dépenses et paiements', paie: 'Paie et RH', recouvrement: 'Recouvrement client', sirh: 'SIRH et RH', equity: 'Actionnariat et cap table', reporting: 'Reporting et BI' };
const sectionClass = 'scroll-mt-28 border-b border-border py-10';
const headingClass = 'text-2xl font-bold font-heading mb-5';
const paragraphClass = 'site-copy text-muted-foreground leading-relaxed';

/** Server-rendered editorial analysis, with no fabricated score or reviewer. */
export default function ToolPage({ slug, locale = 'fr', cmsNavigation, tool }: ToolPageProps) {
  const selection = toolSelection[slug];
  const review = toolReviews[slug];
  const author = getToolAuthor(tool);
  const pricing = TOOL_PRICING[slug];
  const modified = PAGE_REVISIONS[`/ressources/outils/${slug}`] ?? TOOL_SELECTION_REVIEW_DATE;
  const date = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${modified}T12:00:00Z`));
  const alternatives = review.alternatives.map(getToolBySlug).filter((item): item is Tool => !!item);
  const faq = [
    { question: `À qui s’adresse ${tool.name} ?`, answer: review.fit },
    { question: `Quelles limites examiner avant de choisir ${tool.name} ?`, answer: review.avoid },
    { question: `Quel budget prévoir pour ${tool.name} ?`, answer: selection.cost },
    { question: selection.question, answer: selection.answer },
    { question: `Quel test demander pour évaluer ${tool.name} ?`, answer: selection.scenario },
  ];
  const sections = [['verdict', 'L’essentiel'], ['profils', 'Pour qui ?'], ['limites', 'Points forts et limites'], ['prix', 'Prix et coût total'], ['integration', 'Intégration'], ['alternatives', 'Alternatives'], ['faq', 'Questions fréquentes'], ['sources', 'Sources']];
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolArticleSchema(tool)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(tool.name, faq, slug)) }} />
    <section className="site-hero pt-32 pb-12 bg-background">
      <div className="container">
        <Breadcrumb locale={locale} items={[{ label: 'Ressources', href: '/ressources' }, { label: 'Outils', href: '/ressources/outils' }, { label: categoryLabels[tool.category], href: CATEGORIES_WITH_PAGE.has(tool.categorySlug) ? `/ressources/outils/${tool.categorySlug}` : undefined }, { label: tool.name }]} />
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 mt-8 items-start">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-iter-violet mb-3">{categoryLabels[tool.category]} · {slug === 'pennylane' ? 'Retour d’usage Iter confirmé' : 'Analyse documentaire et critères de DAF'}</p>
            <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-5">{getToolReviewTitle(tool)}</h1>
            <p className="text-sm text-muted-foreground mb-6">Repères éditoriaux par <Link href={author.url} rel="author" className="text-iter-violet underline">{author.name}</Link> · mis à jour le <time dateTime={modified}>{date}</time></p>
            <p className="site-copy text-lg leading-relaxed">{review.verdict}</p>
            <div className="flex flex-wrap gap-3 mt-6"><Link href="#profils" className="site-button site-button-primary rounded-full bg-iter-violet text-white px-5 py-3 font-semibold">Est-ce adapté à mon entreprise ?</Link><Link href="#prix" className="site-button site-button-secondary rounded-full border border-border px-5 py-3">Examiner le budget</Link></div>
          </div>
          <aside className="site-card rounded-2xl border border-border bg-white p-7">
            <div className={`h-20 flex items-center mb-6 ${["kyriba", "upflow"].includes(slug) ? "bg-iter-dark rounded-xl px-4" : ""}`}>{tool.logo && <Image src={tool.logo} alt={`Logo ${tool.name}`} width={220} height={80} className="h-20 w-55 max-w-full object-contain object-left" sizes="220px" priority />}</div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Tarification éditeur</p><p className="font-semibold mt-2 mb-4">{pricing.label}</p>
            <a href={pricing.url} className="text-sm text-iter-violet underline">Consulter les conditions tarifaires</a>
            <p className="text-xs text-muted-foreground mt-5">{slug === 'pennylane' ? '4 ans d’usage · environ 50 % des clients Iter. Données du cabinet confirmées le 3 octobre 2026.' : 'Critères de sélection fondés sur la documentation. Sources et critères détaillés dans la fiche.'}</p>
          </aside>
        </div>
      </div>
    </section>
    <div className="container grid lg:grid-cols-[210px_minmax(0,1fr)] gap-10 pb-16">
      <aside className="lg:pt-10"><nav aria-label={`Sommaire ${tool.name}`} className="lg:sticky lg:top-28 rounded-2xl bg-muted/30 p-5"><p className="font-semibold mb-3">Dans cette fiche</p><ul className="flex flex-wrap lg:flex-col gap-x-4 gap-y-3 text-sm">{sections.map(([id, label]) => <li key={id}><a href={`#${id}`} className="text-muted-foreground hover:text-iter-violet underline underline-offset-4">{label}</a></li>)}</ul></nav></aside>
      <div className="min-w-0 max-w-4xl">
        <section id="verdict" className={sectionClass}><h2 className={headingClass}>{tool.name} : l’essentiel pour décider</h2><p className={paragraphClass}>{selection.intro}</p>
          {slug === 'pennylane' && <div className="site-card bg-iter-violet/5 border border-iter-violet/20 rounded-2xl p-6 mt-6"><h3 className="font-bold text-lg mb-4">Ce que notre pratique de Pennylane confirme</h3><dl className="grid sm:grid-cols-2 gap-5"><div><dt className="font-semibold">Usage du cabinet</dt><dd className="text-muted-foreground mt-2">{PENNYLANE_EXPERIENCE.years} ans d’utilisation et environ {PENNYLANE_EXPERIENCE.clientSharePercent} % de nos clients. Ce pourcentage décrit l’usage chez Iter, pas une part de marché.</dd></div><div><dt className="font-semibold">Notre point fort retenu</dt><dd className="text-muted-foreground mt-2">{PENNYLANE_EXPERIENCE.strength}</dd></div></dl><p className="text-sm mt-5">Florent Greth intervient sur l’intégration de Pennylane. <Link href={PENNYLANE_EXPERIENCE.specialist.href} className="text-iter-violet underline">Voir son parcours et ses domaines d’intervention</Link>.</p></div>}
        </section>
        <section id="profils" className={sectionClass}><h2 className={headingClass}>Pour quelles entreprises choisir {tool.name} ?</h2><p className={paragraphClass}>{review.fit}</p><div className="grid md:grid-cols-2 gap-5 mt-6"><div className="rounded-2xl bg-muted/30 p-5"><h3 className="font-semibold mb-3">Usages à examiner</h3><ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">{selection.uses.map(use => <li key={use}>{use}</li>)}</ul></div><div className="rounded-2xl border border-border p-5"><h3 className="font-semibold mb-3">Prérequis du projet</h3><ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">{selection.warnings.map(warning => <li key={warning}>{warning}</li>)}</ul></div></div></section>
        <section id="limites" className={sectionClass}><h2 className={headingClass}>Points forts, limites et cas à écarter</h2><p className={paragraphClass}>{review.avoid}</p><p className={`${paragraphClass} mt-5`}>{selection.limit}</p></section>
        <section id="prix" className={sectionClass}><h2 className={headingClass}>Prix de {tool.name} : raisonner en coût total</h2><p className={paragraphClass}>{pricing.note}</p><p className={`${paragraphClass} mt-4`}>{selection.cost}</p><p className="text-sm mt-4"><a href={pricing.url} className="text-iter-violet underline">Source de tarification {tool.name}</a> · dernière vérification tarifaire : <time dateTime={pricing.checkedAt}>{pricing.checkedAt}</time>. Demandez un devis actuel à périmètre identique.</p></section>
        {slug === 'pennylane' && <InvoiceResourceCard locale={locale} />}
        <section id="integration" className={sectionClass}><h2 className={headingClass}>Intégration et déploiement : les tests à préparer</h2><p className={paragraphClass}>{review.decision}</p><p className={`${paragraphClass} mt-5`}>{selection.scenario} Protocole proposé, sans résultat client mesuré.</p><ol className="space-y-4 mt-6">{selection.checks.map((check, index) => <li key={check.title} id={`step${index + 1}`} className="scroll-mt-28 site-card rounded-2xl border border-border p-5"><h3 className="font-semibold mb-2">{index + 1}. {check.title}</h3><p className={paragraphClass}>{check.text}</p></li>)}</ol>{Array.from({ length: 5 - selection.checks.length }, (_, i) => <span key={i} id={`step${selection.checks.length + i + 1}`} className="block scroll-mt-28" />)}</section>
        <section id="alternatives" className={sectionClass}><h2 className={headingClass}>Quelles alternatives ou compléments à {tool.name} ?</h2><p className={paragraphClass}>Comparez les solutions sur le besoin couvert et le scénario de votre entreprise.</p><ul className="grid sm:grid-cols-2 gap-4 mt-5">{alternatives.map(item => <li key={item.slug} className="site-card rounded-2xl border border-border p-5"><Link href={`/ressources/outils/${item.slug}`} className="font-semibold text-iter-violet underline">{item.name}</Link><p className="text-sm text-muted-foreground mt-2">{item.shortDescription}</p></li>)}</ul><p className="mt-5"><Link href={selection.comparison.href} className="text-iter-violet underline">{selection.comparison.label}</Link></p></section>
        <section id="faq" className={sectionClass}><h2 className={headingClass}>Questions fréquentes sur {tool.name}</h2><div className="space-y-3">{faq.map(item => <details key={item.question} className="rounded-2xl border border-border p-5"><summary className="font-semibold cursor-pointer">{item.question}</summary><p className={`${paragraphClass} mt-4`}>{item.answer}</p></details>)}</div></section>
        <section id="sources" className={sectionClass}><h2 className={headingClass}>Sources et méthode</h2><p className="text-sm text-muted-foreground leading-relaxed">Documentation : <a href={selection.source} className="text-iter-violet underline">source officielle {tool.name}</a>, dernière revue documentaire le <time dateTime={TOOL_SELECTION_REVIEW_DATE}>2 octobre 2026</time>. Les critères de choix constituent une analyse éditoriale ; ils ne sont pas une certification de l’éditeur.</p><p className="text-sm mt-4"><Link href="/ressources/outils/methodologie" className="text-iter-violet underline">Comment nous construisons et vérifions ces analyses</Link></p></section>
        <section className="mt-10 rounded-2xl bg-iter-dark text-white p-7"><h2 className="font-heading font-bold text-2xl mb-3">Relier les outils à votre organisation finance</h2><p className="text-white/80 mb-5">Un choix de logiciel doit aboutir à des données fiables et à des responsabilités claires.</p><div className="flex flex-wrap gap-4"><Link href={selection.service.href} className="underline text-white">{selection.service.label}</Link><Link href="/daf-externalise" className="underline text-white">Le rôle de votre DAF externalisé</Link><Link href="/contact" className="underline text-white">Parler de votre projet</Link></div></section>
      </div>
    </div>
  </PageLayout>;
}
