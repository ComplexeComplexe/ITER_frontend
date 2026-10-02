/** Rendered regression of the tool-selection and CFO-definition journeys. */
import { readFileSync } from 'node:fs';
const base = (process.argv[2] ?? 'http://127.0.0.1:4048').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const slugs = [...readFileSync('data/tools.ts', 'utf8').matchAll(/    slug: '([^']+)'/g)].map(m => m[1]);
const paths = [...slugs.map(s => '/ressources/outils/' + s), '/ressources/blog/cfo-externe-role-missions-2026', '/ressources/glossaire/cfo', '/ressources/glossaire/fractional-cfo'];
const failures = [], results = [];
const flatten = data => Array.isArray(data) ? data.flatMap(flatten) : data?.['@graph'] ? flatten(data['@graph']) : [data];
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
for (const path of paths) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  const text = decode(main.replace(/<script\b[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => flatten(JSON.parse(m[1])));
  const articles = schemas.filter(s => ['Article', 'BlogPosting'].includes(s['@type']));
  const h1 = decode(main.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1]?.replace(/<[^>]+>/g, '') ?? '');
  const check = (ok, reason) => { if (!ok) failures.push({ path, reason }); };
  check(response.status === 200, 'retained-url');
  check(html.match(/rel="canonical" href="([^"]+)"/)?.[1] === origin + path, 'canonical');
  check([...main.matchAll(/<h1\b/g)].length === 1, 'one-h1');
  check(articles.length === 1 && articles[0]?.headline === h1, 'one-article-with-matching-headline');
  check(articles[0]?.author?.['@type'] === 'Person' && articles[0]?.author?.url, 'identified-author');
  check(main.includes('href="/daf-externalise"'), 'primary-offer-link');
  if (path.startsWith('/ressources/outils/')) {
    check(main.includes('Sources et méthode') && main.includes('source officielle'), 'visible-product-source');
    check(!/ROI constaté|Cet avis vient du terrain|déployé ou exploité par nos|leader incontestable|économise des jours|6-8 heures|Aucun verrouillage|sans affiliation ni/.test(text), 'unverified-experience-withheld');
    for (let i = 1; i <= 5; i++) check(main.includes(`id="step${i}"`), 'retained-step-anchor:' + i);
    check(!schemas.some(s => s['@type'] === 'HowTo'), 'no-implementation-schema-for-selection-checks');
  }
  if (path.includes('/blog/cfo-')) {
    for (const id of ['definition', 'missions', 'profils', 'cout', 'vs-daf', 'recourir', 'faq']) check(main.includes(`id="${id}"`), 'historical-anchor:' + id);
    check(main.includes('href="/daf-externalise/tarifs"'), 'central-price-reference');
    check(!text.includes('proposition personnalisée sous 24 h') && !text.includes('2 M€'), 'universal-promises-removed');
    check(articles[0]?.datePublished === '2026-07-24', 'publication-preserved');
  }
  if (path.endsWith('/glossaire/cfo')) check(main.includes('href="/daf-externalise/metier"'), 'definition-to-profession');
  if (path.endsWith('/glossaire/fractional-cfo')) check(main.includes('href="/fractional-cfo-startups"'), 'definition-to-startup-offer');
  check(schemas.filter(s => s['@type'] === 'FAQPage').length <= 1, 'one-faq');
  results.push({ path, status: response.status, articleCount: articles.length });
}
console.log(JSON.stringify({ pages: results.length, results, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
