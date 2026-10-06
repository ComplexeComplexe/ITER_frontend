/** Audit the rendered content, so new French copy cannot silently leak into EN/ES. */
import fs from 'node:fs';
import { decodeHTML } from 'entities';
const registry = JSON.parse(fs.readFileSync('lib/content/editorial-locales/registry.json', 'utf8'));
const invoiceRoutes = JSON.parse(fs.readFileSync('lib/content/electronic-invoicing-routes.json', 'utf8'));
for (const paths of Object.values(invoiceRoutes)) registry[paths.fr] = { paths, noindex: false };
const origin = 'https://www.iteradvisors.com';
const errors = [];
const attr = (tag, key) => tag.match(new RegExp(`\\b${key}=["']([^"']*)["']`, 'i'))?.[1];
const normalise = text => decodeHTML(text).replace(/\s+/g, ' ').trim();
function schemaStrings(value) {
  if (Array.isArray(value)) return value.flatMap(schemaStrings);
  if (value && typeof value === 'object') {
    // Preserve the original title of a cited French-language external episode.
    if (value['@type'] === 'PodcastEpisode' && value.inLanguage === 'fr-FR') return [];
    return Object.values(value).flatMap(schemaStrings);
  }
  return typeof value === 'string' && !value.startsWith('http') ? [normalise(value)] : [];
}
function inspect(path) {
  const filename = `.next/server/app${path === '/' ? '/index' : path}.html`;
  if (!fs.existsSync(filename)) return undefined; // Dynamic pages are checked by the HTTP audit.
  const raw = fs.readFileSync(filename, 'utf8');
  const html = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const strings = [...main.split(/<[^>]+>/).map(normalise), ...[...html.matchAll(/\b(?:alt|aria-label|placeholder)="([^"]*)"/g)].map(m => normalise(m[1]))].filter(Boolean);
  for (const script of raw.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { strings.push(...schemaStrings(JSON.parse(script[1]))); }
    catch { errors.push(`Invalid JSON-LD: ${path}`); }
  }
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => m[0]).find(tag => attr(tag, 'rel') === 'canonical');
  return { strings, canonical: canonical && attr(canonical, 'href'), lang: attr(html.match(/<html\b[^>]*>/)?.[0] ?? '', 'lang'), signature: [...main.matchAll(/<(h2|h3|table|details|form)\b/gi)].map(m => m[1].toLowerCase()), alternates: [...html.matchAll(/<link\b[^>]*>/g)].map(m => m[0]).filter(tag => attr(tag, 'rel') === 'alternate' && attr(tag, 'hreflang')).map(tag => attr(tag, 'href')) };
}
let checked = 0;
for (const [source, page] of Object.entries(registry)) {
  const fr = inspect(page.paths.fr);
  if (!fr) continue;
  if (!page.noindex && Object.values(page.paths).some(path => !fr.alternates.some(url => url?.replace(/\/$/, '') === (origin + path).replace(/\/$/, '')))) errors.push(`Incomplete French alternates: ${source}`);
  for (const locale of ['en', 'es']) {
    const path = page.paths[locale]; const target = inspect(path);
    if (!target) { errors.push(`Missing static translation: ${source} -> ${path}`); continue; }
    checked++;
    if (target.lang !== locale) errors.push(`Wrong document language: ${path}`);
    if (!page.noindex && target.canonical?.replace(/\/$/, '') !== (origin + path).replace(/\/$/, '')) errors.push(`Wrong canonical: ${path}`);
    if (!page.noindex && Object.values(page.paths).some(path => !target.alternates.some(url => url?.replace(/\/$/, '') === (origin + path).replace(/\/$/, '')))) errors.push(`Incomplete alternates: ${path}`);
    if (JSON.stringify(target.signature) !== JSON.stringify(fr.signature)) errors.push(`Section mismatch: ${path}`);
    const french = new Set(fr.strings.filter(text => (text.split(' ').length >= 4 && /\b(le|les|du|des|une|votre|vous|vos|notre|nous|avec|dans|pour|est)\b/i.test(text)) || /^(Découvrir|En savoir plus|Voir les ressources|Trésorerie|Comptabilité|Recrutement|Prénom|Nom|Société|Clôture|Prévisionnel)$/i.test(text)));
    for (const text of target.strings) if (french.has(text)) errors.push(`Untranslated content: ${path}: ${text.slice(0, 160)}`);
  }
}
if (checked < 280) errors.push('Incomplete rendered locale audit: expected at least 280 translated static pages');
if (errors.length) { console.error([...new Set(errors)].join('\n')); process.exit(1); }
console.log(`Locale parity OK: ${checked} static translations, equivalent sections, canonical URLs, alternates and no shared French sentences.`);
