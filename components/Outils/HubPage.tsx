import { InvoiceResourceCard } from '@/components/pages/ElectronicInvoicingPage';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import FinanceStackSection from '@/components/FinanceStackSection';
import ToolsExplorer from './ToolsExplorer';
import { getToolDirectory, TOOL_CATEGORY_LABELS } from '@/data/toolDirectory';
import { TOOL_HUB_COPY } from '@/lib/content/tool-hub';
import { getToolsContent } from '@/lib/content/tools';
import { tools } from '@/data/tools';
import type { Locale } from '@/lib/i18n';
import type { CmsNavItem } from '@/lib/static-content';

export interface HubPageProps { locale: Locale; cmsNavigation?: CmsNavItem[]; }
export default function HubPage({ locale, cmsNavigation }: HubPageProps) {
  const t = TOOL_HUB_COPY[locale];
  const labels = getToolsContent(locale);
  const directory = getToolDirectory(locale);
  const path = { fr: '/ressources/outils', en: '/en/ressources/tools', es: '/es/recursos/herramientas' }[locale];
  const pennylane = tools.find(tool => tool.slug === 'pennylane')!;
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `https://www.iteradvisors.com${path}`, url: `https://www.iteradvisors.com${path}`, name: t.title, inLanguage: locale, mainEntity: { '@type': 'ItemList', itemListElement: directory.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: `https://www.iteradvisors.com/ressources/outils/${tool.slug}` })) } }) }} />
    <section className="site-hero pt-32 pb-14 bg-background"><div className="container">
      <Breadcrumb locale={locale} items={[{ label: labels.resourcesLabel, href: labels.resourcesHref }, { label: labels.breadcrumbLabel }]} />
      <div className="max-w-4xl mt-8"><p className="text-sm font-semibold text-iter-violet mb-4">{t.eyebrow}</p><h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6">{t.title}</h1><p className="site-copy text-lg text-muted-foreground leading-relaxed max-w-3xl">{t.intro}</p><div className="flex flex-wrap gap-3 mt-8"><Link href="#explorer" className="site-button site-button-primary bg-iter-violet text-white px-6 py-3 rounded-full font-semibold">{t.explore}</Link><Link href="#recommandation-stade" className="site-button site-button-secondary border border-border px-6 py-3 rounded-full">{t.stack}</Link></div></div>
    </div></section>
    <section className="site-section bg-iter-dark text-white py-12"><div className="container grid md:grid-cols-[180px_1fr] gap-8 items-center"><div className="bg-white rounded-2xl p-6"><Image src={pennylane.logo} alt="Logo Pennylane" width={160} height={60} className="w-full h-14 object-contain" sizes="160px" /></div><div><h2 className="text-2xl font-heading font-bold mb-4">{t.field}</h2><p className="site-copy text-white/80 max-w-3xl leading-relaxed">{t.fieldText}</p><div className="flex flex-wrap gap-5 mt-5"><Link href="/ressources/outils/pennylane" className="underline text-white font-semibold">{t.fieldLink}{t.french && ` (${t.french})`}</Link><Link href={t.profile} className="underline text-white/80">{t.profileLabel}</Link></div></div></div></section>
    <section id="explorer" className="site-section bg-muted/20 py-16 scroll-mt-28"><div className="container"><h2 className="text-3xl font-heading font-bold mb-4">{t.directory}</h2><p className="text-muted-foreground max-w-3xl mb-8">{t.directoryIntro}</p><ToolsExplorer tools={directory} categories={TOOL_CATEGORY_LABELS[locale]} locale={locale} /><p className="mt-6 text-sm"><Link href="/ressources/outils/malibou" className="text-iter-violet underline">{locale === 'fr' ? 'Également disponible : la fiche malibou, paie accompagnée' : locale === 'en' ? 'Also available: malibou, supported payroll (French guide)' : 'También disponible: malibou, nómina acompañada (ficha en francés)'}</Link></p></div></section>
    <section id="recommandation-stade" className="site-section py-16 scroll-mt-28"><div className="container"><h2 className="text-3xl font-heading font-bold mb-4">{t.maturity}</h2><p className="text-muted-foreground max-w-3xl mb-8">{t.maturityIntro}</p><div className="grid md:grid-cols-3 gap-5">{t.stages.map((stage, index) => <article id={['seed', 'series-a-b', 'scale-up'][index]} key={stage[0]} className="site-card border border-border rounded-2xl p-6 scroll-mt-28"><p className="text-xs text-iter-violet font-semibold uppercase tracking-wide mb-3">{stage[0]}</p><h3 className="font-heading text-xl font-bold mb-4">{stage[1]}</h3><p className="text-sm text-muted-foreground leading-relaxed">{stage[2]}</p><p className="mt-5 pt-5 border-t border-border text-sm"><strong>{t.signal} : </strong>{stage[3]}</p></article>)}</div></div></section>
    <div className="container"><InvoiceResourceCard locale={locale} /></div>
    <FinanceStackSection locale={locale} />
    <section id="categories" className="site-section py-14"><div className="container"><h2 className="text-2xl font-heading font-bold mb-5">{t.comparisons}{t.french && ` (${t.french})`}</h2><div className="flex flex-wrap gap-4">{[
      ['/ressources/outils/logiciels-comptabilite', 'Pennylane · Sage · Cegid'], ['/ressources/outils/logiciels-tresorerie', 'Agicap · Okimia · Kyriba'], ['/ressources/outils/gestion-depenses', 'Spendesk · Pleo · Payhawk'], ['/ressources/outils/logiciels-paie', 'PayFit · Silae · Lucca'],
    ].map(([href, label]) => <Link key={href} href={href} className="rounded-xl border border-border px-5 py-3 text-iter-violet underline">{label}</Link>)}</div></div></section>
    <section className="site-section bg-muted/20 py-14"><div className="container max-w-4xl"><h2 className="text-2xl font-heading font-bold mb-4">{t.method}</h2><p className="site-copy text-muted-foreground leading-relaxed">{t.methodText}</p><Link href={t.methodHref} className="inline-block mt-5 text-iter-violet font-semibold underline">{t.methodLink}</Link></div></section>
    <section className="site-section py-16"><div className="container"><div className="rounded-3xl bg-iter-dark text-white p-8 lg:p-12"><h2 className="text-3xl font-heading font-bold mb-4">{labels.ctaHeading}</h2><p className="site-copy text-white/80 max-w-2xl mb-6">{labels.ctaText}</p><Link href={t.contact} className="site-button site-button-primary rounded-full px-6 py-3 bg-iter-violet text-white inline-block font-semibold">{locale === 'fr' ? 'Parler de votre projet' : locale === 'en' ? 'Discuss your project' : 'Hablar de su proyecto'}</Link></div></div></section>
  </PageLayout>;
}
