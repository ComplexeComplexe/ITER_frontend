"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { parityHref } from '@/lib/locale-route-map';
import type { Locale } from '@/lib/i18n';
import { currentConsent } from '@/lib/analytics/consent';

export interface ExplorerTool { slug: string; name: string; logo: string; category: string; description: string; searchTerms: string; }
const copy = {
  fr: { search: 'Rechercher un outil ou un besoin', placeholder: 'Pennylane, cash, paie, notes de frais…', need: 'Besoin', all: 'Tous les besoins', clear: 'Réinitialiser', count: 'fiches disponibles', empty: 'Aucun outil ne correspond. Essayez un autre terme ou réinitialisez les filtres.', read: 'Lire l’analyse', language: '', experience: 'Retour Iter confirmé', docs: 'Analyse documentaire' },
  en: { search: 'Search for a tool or a need', placeholder: 'Pennylane, cash, payroll, expenses…', need: 'Need', all: 'All needs', clear: 'Reset', count: 'guides available', empty: 'No matching tools. Try another term or reset the filters.', read: 'Read the analysis', language: '', experience: 'Confirmed Iter experience', docs: 'Documentation-based analysis' },
  es: { search: 'Buscar una herramienta o necesidad', placeholder: 'Pennylane, caja, nómina, gastos…', need: 'Necesidad', all: 'Todas las necesidades', clear: 'Restablecer', count: 'fichas disponibles', empty: 'Ninguna herramienta coincide. Pruebe otro término o restablezca los filtros.', read: 'Leer el análisis', language: '', experience: 'Experiencia Iter confirmada', docs: 'Análisis documental' },
};
const normalise = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/** No URL parameters or free-text analytics: filters do not create crawlable variants. */
function measure(action: string, value: string) {
  if (!currentConsent()?.analytics) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'tools_explorer', action, value });
}
export default function ToolsExplorer({ tools, categories, locale }: { tools: ExplorerTool[]; categories: Record<string, string>; locale: Locale }) {
  const t = copy[locale];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const visible = tools.filter(tool => (!category || tool.category === category) && normalise(`${tool.name} ${tool.searchTerms} ${tool.description}`).includes(normalise(query.trim())));
  return <div data-tools-explorer>
    <div className="rounded-2xl border border-border bg-background p-5 grid gap-4 md:grid-cols-[2fr_1fr_auto] items-end">
      <div><label htmlFor="tools-search" className="block text-sm font-semibold mb-2">{t.search}</label><input id="tools-search" type="search" value={query} onChange={event => setQuery(event.target.value)} onBlur={() => { if (query.trim()) measure('search', 'non-empty'); }} placeholder={t.placeholder} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus-visible:outline-2 focus-visible:outline-iter-violet" /></div>
      <div><label htmlFor="tools-category" className="block text-sm font-semibold mb-2">{t.need}</label><select id="tools-category" value={category} onChange={event => { setCategory(event.target.value); measure('filter', event.target.value || 'all'); }} className="w-full border border-border rounded-xl px-4 py-3 bg-background focus-visible:outline-2 focus-visible:outline-iter-violet"><option value="">{t.all}</option>{Object.entries(categories).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div>
      <button type="button" onClick={() => { setQuery(''); setCategory(''); }} className="text-iter-violet underline px-2 py-3">{t.clear}</button>
    </div>
    <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground my-5">{visible.length} {t.count}</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {visible.map(tool => <Link key={tool.slug} href={parityHref(`/ressources/outils/${tool.slug}`, locale)} onClick={() => measure('tool_click', tool.slug)} className="site-card group rounded-2xl border border-border bg-background p-6 flex flex-col hover:border-iter-violet/50 transition-colors focus-visible:outline-2 focus-visible:outline-iter-violet">
        <div className={`h-12 flex items-center mb-5 ${["kyriba", "upflow"].includes(tool.slug) ? "bg-iter-dark rounded-lg px-3 w-fit" : ""}`}>{tool.logo && <Image src={tool.logo} alt={`Logo ${tool.name}`} width={144} height={48} className="h-12 w-36 object-contain object-left" sizes="144px" />}</div>
        <p className="text-xs text-iter-violet font-semibold mb-3">{tool.slug === 'pennylane' ? t.experience : t.docs}</p>
        <h3 className="font-heading font-bold text-xl mb-2">{tool.name}</h3>
        <p className="text-xs text-muted-foreground mb-3">{categories[tool.category]}</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.description}</p>
        <span className="mt-5 pt-4 border-t border-border text-sm font-semibold text-iter-violet">{t.read} <span aria-hidden="true">→</span></span>
      </Link>)}
    </div>
    {!visible.length && <p className="py-12 text-center text-muted-foreground">{t.empty}</p>}
  </div>;
}
