import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import type { Locale } from '@/lib/i18n';
import { parityHref } from '@/lib/locale-route-map';
import { FINANCE_EXPERT } from '@/lib/content/finance-expert';
import { getInvoiceContent, invoiceImage, INVOICE_DATE, INVOICE_TIMESTAMP, INVOICE_ROUTES, INVOICE_UI, INVOICE_SOURCES, type InvoicePageKey } from '@/lib/content/electronic-invoicing';

const linkClass = 'text-iter-violet underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4';
function ExpertQuote({ text, locale }: { text: string; locale: Locale }) {
  const ui = INVOICE_UI[locale];
  return <blockquote className="border-l-4 border-iter-violet bg-iter-violet/5 px-6 py-5 rounded-r-2xl my-8"><p className="text-lg leading-relaxed">« {text} »</p><cite className="block text-sm not-italic mt-3 text-muted-foreground">{ui.quote}{ui.translated && ` · ${ui.translated}`}</cite></blockquote>;
}
export function InvoiceResourceCard({ locale }: { locale: Locale }) {
  const ui = INVOICE_UI[locale];
  return <aside className="my-8 rounded-2xl border border-iter-violet/20 bg-iter-violet/5 p-6">
    <h2 className="font-heading text-xl font-bold mb-3">{ui.topic}</h2>
    <p className="text-muted-foreground leading-relaxed mb-4">{ui.intro}</p>
    <Link href={INVOICE_ROUTES.guide[locale]} className={linkClass}>{ui.card}</Link>
  </aside>;
}
export default function ElectronicInvoicingPage({ pageKey, locale }: { pageKey: InvoicePageKey; locale: Locale }) {
  const page = getInvoiceContent(pageKey, locale);
  const ui = INVOICE_UI[locale];
  const path = INVOICE_ROUTES[pageKey][locale];
  const sourceIds = [...new Set(page.sections.flatMap(section => section.sources))];
  const url = `https://www.iteradvisors.com${path}`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`, url,
    headline: page.title, description: page.description, inLanguage: { fr: 'fr-FR', en: 'en-GB', es: 'es-ES' }[locale], image: invoiceImage(pageKey, locale),
    datePublished: INVOICE_TIMESTAMP, dateModified: INVOICE_TIMESTAMP,
    author: { '@id': FINANCE_EXPERT.id },
    publisher: { '@type': 'Organization', '@id': 'https://www.iteradvisors.com/#organization', name: 'Iter Advisors' },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    about: { '@type': 'Thing', name: ui.topic },
    citation: sourceIds.map(id => INVOICE_SOURCES[id].url),
  };
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${url}#faq`,
    mainEntity: page.faq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
  };
  const companions = Object.keys(INVOICE_ROUTES).filter(key => key !== 'guide') as InvoicePageKey[];
  const webPageSchema = {
    '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`, url,
    name: page.title, description: page.description, inLanguage: schema.inLanguage,
    datePublished: INVOICE_TIMESTAMP, dateModified: INVOICE_TIMESTAMP,
    isPartOf: { '@id': 'https://www.iteradvisors.com/#website' },
    publisher: { '@id': 'https://www.iteradvisors.com/#organization' },
    mainEntity: { '@id': `${url}#article` },
    ...(pageKey === 'guide' ? { hasPart: companions.map(key => ({
      '@type': 'WebPage', '@id': `https://www.iteradvisors.com${INVOICE_ROUTES[key][locale]}#webpage`,
      url: `https://www.iteradvisors.com${INVOICE_ROUTES[key][locale]}`, name: getInvoiceContent(key, locale).title,
    })) } : {}),
  };
  return <PageLayout locale={locale}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
    <section className="site-hero pt-24 sm:pt-32 pb-10 bg-gradient-to-br from-background via-iter-violet/5 to-background">
      <div className="container max-w-6xl">
        <Breadcrumb locale={locale} items={[{ label: ui.resources, href: parityHref('/ressources', locale) }, ...(pageKey === 'guide' ? [] : [{ label: ui.topic, href: INVOICE_ROUTES.guide[locale] }]), { label: pageKey === 'guide' ? ui.topic : page.title }]} />
        <p className="mt-6 mb-4 text-sm font-semibold text-iter-violet">{ui.country}</p>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl max-w-4xl leading-tight">{page.title}</h1>
        <p className="site-copy text-lg text-muted-foreground leading-relaxed mt-6 max-w-4xl">{page.answer}</p>
        <div className="flex items-center gap-4 mt-7">
          <Image src={FINANCE_EXPERT.photo} alt="Sébastien Doat" width={56} height={56} className="rounded-full object-cover w-14 h-14" />
          <p className="text-sm leading-relaxed">{ui.by} <Link href={parityHref(FINANCE_EXPERT.href, locale)} className={linkClass}>Sébastien Doat</Link>, {ui.role.charAt(0).toLowerCase() + ui.role.slice(1)} <span aria-hidden="true">·</span> <time dateTime={INVOICE_DATE}>{ui.updated}</time> <span aria-hidden="true">·</span> <time dateTime={INVOICE_DATE}>{ui.date}</time></p>
        </div>
      </div>
    </section>
    <div className="container max-w-6xl py-10 grid lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-14">
      <nav aria-label={ui.toc} className="min-w-0"><div className="lg:sticky lg:top-28 rounded-2xl bg-muted/30 p-5"><p className="font-semibold mb-4">{ui.toc}</p><ol className="space-y-3 text-sm">{page.sections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-muted-foreground hover:text-iter-violet underline underline-offset-4">{section.title}</a></li>)}</ol></div></nav>
      <article className="min-w-0">
        <h2 className="font-heading text-xl font-bold mb-4">{ui.essentials}</h2>
        <ul className={`grid ${page.summary.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-3 mb-8`}>{page.summary.map((item, index) => <li key={item} className="border border-border rounded-2xl p-4"><span className="block text-iter-violet text-sm mb-2" aria-hidden="true">0{index + 1}</span><p className="font-medium text-sm leading-relaxed">{item}</p></li>)}</ul>
        {page.quote && <ExpertQuote text={page.quote} locale={locale} />}
        {page.sections.map(section => <section id={section.id} key={section.id} className="scroll-mt-28 border-b border-border py-8 first:pt-0">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-5">{section.title}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">{section.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
          {section.quote && <ExpertQuote text={section.quote} locale={locale} />}
          {section.bullets.length > 0 && <ul className="list-disc pl-5 mt-5 space-y-3 text-muted-foreground leading-relaxed">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
          {section.table && <div role="region" aria-label={section.title} tabIndex={0} className="overflow-x-auto rounded-xl border border-border mt-6 focus-visible:outline-2 focus-visible:outline-iter-violet"><table className="w-full text-sm text-left min-w-[480px]"><caption className="sr-only">{section.title}</caption><thead className="bg-iter-violet/5"><tr>{section.table.headers.map(h => <th scope="col" key={h} className="p-4 font-semibold">{h}</th>)}</tr></thead><tbody>{section.table.rows.map((row, i) => <tr key={i} className="border-t border-border">{row.map((cell, j) => j === 0 ? <th scope="row" key={j} className="p-4 font-medium align-top">{cell}</th> : <td key={j} className="p-4 text-muted-foreground align-top">{cell}</td>)}</tr>)}</tbody></table></div>}
          {section.sources.length > 0 && <ul className="mt-5 space-y-2 text-sm">{section.sources.map(id => <li key={id}><a className={linkClass} href={INVOICE_SOURCES[id].url}>{INVOICE_SOURCES[id].publisher} : {INVOICE_SOURCES[id].label[locale]}</a></li>)}</ul>}
          {section.links.length > 0 && <ul className="mt-5 space-y-3">{section.links.map(key => <li key={key}><Link className={linkClass} href={INVOICE_ROUTES[key as InvoicePageKey][locale]}>{getInvoiceContent(key as InvoicePageKey, locale).title}</Link></li>)}</ul>}
          {section.id === 'accompagnement' && <p className="mt-5"><Link className={linkClass} href={parityHref('/services/comptabilite-externalisation', locale)}>{ui.services}</Link> <span aria-hidden="true">·</span> <Link className={linkClass} href={parityHref('/daf-externalise', locale)}>{ui.cfo}</Link></p>}
          {section.id === 'france-espagne' && locale === 'fr' && <p className="mt-5"><Link className={linkClass} href="/ressources/fiscalite-espagne-france">Fiscalité France-Espagne : structurer vos décisions par entité</Link></p>}
        </section>)}
        {pageKey === 'deploiement-pme' && <p className="py-8"><a href={`/downloads/checklist-facturation-electronique-${locale}.csv`} download className={`${linkClass} font-semibold`}>{ui.checklist}</a></p>}
        {pageKey === 'choisir-plateforme-agreee' && <p className="py-6"><Link href={parityHref('/ressources/outils/pennylane', locale)} className={linkClass}>{ui.tools}</Link></p>}
        {pageKey === 'guide' && <section className="py-8"><h2 className="font-heading text-2xl font-bold mb-5">{ui.next}</h2><ul className="grid sm:grid-cols-2 gap-4">{companions.map(key => <li key={key}><Link href={INVOICE_ROUTES[key][locale]} className="block h-full rounded-2xl border border-border p-5 hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-iter-violet"><h3 className="font-semibold mb-2">{getInvoiceContent(key, locale).title}</h3><p className="text-sm text-muted-foreground">{getInvoiceContent(key, locale).summary[0]}</p></Link></li>)}</ul></section>}
        {page.faq.length > 0 && <section className="py-8"><h2 className="font-heading text-2xl font-bold mb-5">{ui.faq}</h2><div className="space-y-3">{page.faq.map(item => <details key={item.question} className="rounded-xl border border-border p-5"><summary className="font-semibold cursor-pointer">{item.question}</summary><p className="text-muted-foreground mt-4 leading-relaxed">{item.answer}</p></details>)}</div></section>}
        {sourceIds.length > 0 && <section className="py-8"><h2 className="font-heading text-xl font-bold mb-4">{ui.sources}</h2><ul className="space-y-3 text-sm">{sourceIds.map(id => <li key={id}><a href={INVOICE_SOURCES[id].url} className={linkClass}>{INVOICE_SOURCES[id].publisher} : {INVOICE_SOURCES[id].label[locale]}</a></li>)}</ul></section>}
        <aside className="bg-iter-dark text-white rounded-2xl p-7 mt-6"><h2 className="font-heading text-2xl font-bold mb-4">{ui.contact}</h2><p className="text-white/80 leading-relaxed mb-5">{ui.scope}</p><Link href={parityHref('/contact', locale)} className="inline-flex bg-white text-iter-dark px-5 py-3 rounded-full font-semibold">{ui.contact}</Link><div className="flex flex-wrap gap-4 mt-6 text-sm"><Link className="underline underline-offset-4" href={parityHref('/services/comptabilite-externalisation', locale)}>{ui.services}</Link>{pageKey === 'guide' && <Link className="underline underline-offset-4" href={parityHref('/daf-externalise', locale)}>{ui.cfo}</Link>}</div></aside>
        {pageKey !== 'guide' && <p className="mt-8"><Link href={INVOICE_ROUTES.guide[locale]} className={linkClass}>{ui.back}</Link></p>}
      </article>
    </div>
  </PageLayout>;
}
