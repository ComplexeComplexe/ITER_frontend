/** HTTP regression checks for the October 2026 navigation and software-guide cleanup. */
import { readFileSync } from 'node:fs';

const base = (process.argv[2] ?? 'http://127.0.0.1:4043').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const toolSlugs = [...readFileSync('data/tools.ts', 'utf8').matchAll(/    slug: '([^']+)'/g)].map(match => match[1]);
const cleanedBreadcrumbs = new Set([
  '/ressources', '/ressources/fiscalite-espagne-france',
  ...toolSlugs.map(slug => `/ressources/outils/${slug}`),
  ...['logiciels-comptabilite', 'logiciels-tresorerie', 'gestion-depenses', 'logiciels-paie'].map(slug => `/ressources/outils/${slug}`),
]);
function* objects(value) {
  if (Array.isArray(value)) { for (const item of value) yield* objects(item); }
  else if (value && typeof value === 'object') {
    yield value;
    for (const item of Object.values(value)) yield* objects(item);
  }
}
const failures = [];
const pages = [];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
let cursor = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < paths.length) {
    const path = paths[cursor++];
    try {
      const response = await fetch(base + path, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
      if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
        .flatMap(match => [...objects(JSON.parse(match[1]))]);
      const breadcrumbs = schemas.filter(schema => schema['@type'] === 'BreadcrumbList');
      if (cleanedBreadcrumbs.has(path)) {
        if (breadcrumbs.length !== 1) failures.push({ path, test: 'one-matching-breadcrumb', count: breadcrumbs.length });
        const trail = breadcrumbs[0]?.itemListElement ?? [];
        if (trail.at(-1)?.item !== origin + path) failures.push({ path, test: 'breadcrumb-current-page' });
        if (trail.some((item, index) => item.position !== index + 1)) failures.push({ path, test: 'breadcrumb-sequence' });
      }
      if (toolSlugs.some(slug => path === `/ressources/outils/${slug}`)) {
        const articles = schemas.filter(schema => schema['@type'] === 'Article' && schema.about?.['@type'] === 'SoftwareApplication');
        if (articles.length !== 1 || !articles[0]?.author?.url) failures.push({ path, test: 'software-guide-authorship' });
        if (schemas.some(schema => schema['@type'] === 'Review' || schema.reviewRating || schema.aggregateRating)) failures.push({ path, test: 'undocumented-rating' });
        if (articles[0] && !html.includes(`datetime="${articles[0].dateModified}"`) && !html.includes(`dateTime="${articles[0].dateModified}"`)) failures.push({ path, test: 'visible-update-date' });
        if (schemas.some(schema => schema.totalTime && !schema.totalTime.startsWith('P'))) failures.push({ path, test: 'duration-format' });
      }
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
      const editorial = main.replace(/<header\b[\s\S]*?<\/header>|<footer\b[\s\S]*?<\/footer>/gi, '');
      if (['/services', '/services/gestion-financiere-externalisee'].includes(path) && !/href="\/daf-externalise"[^>]*>[^<]*direction financière externalisée/i.test(editorial)) failures.push({ path, test: 'commercial-context-link' });
      if (path === '/services/controle-de-gestion-externalise' && !html.includes('<title>Contrôle de gestion externalisé pour PME : budget et marges</title>')) failures.push({ path, test: 'control-title' });
      // The pillar is now a direct header entry, not a duplicated submenu item.
      const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/i)?.[1] ?? '';
      const locale = path === '/en' || path.startsWith('/en/') ? 'en' : path === '/es' || path.startsWith('/es/') ? 'es' : 'fr';
      const pillar = { fr: '/daf-externalise', en: '/en/fractional-cfo', es: '/es/externalizacion-daf' }[locale];
      const label = { fr: 'DAF externalisé', en: 'Fractional CFO', es: 'CFO externo' }[locale];
      const commercial = [...header.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
        .filter(match => match[1] === pillar)
        .map(match => match[2].replace(/<[^>]+>/g, '').trim());
      if (commercial.length !== 1 || commercial[0] !== label) failures.push({ path, test: 'single-localized-commercial-menu-destination', commercial });
      pages.push({ path, breadcrumbs: breadcrumbs.length, softwareArticles: schemas.filter(schema => schema['@type'] === 'Article' && schema.about?.['@type'] === 'SoftwareApplication').length });
    } catch (error) { failures.push({ path, test: 'fetch-or-parse', error: error.message }); }
  }
}));

const redirects = [];
for (const [path, target] of [
  ['/en/jobs/fractional-cfo-startups', '/en/fractional-cfo'],
  ['/en/ressources/blog/organiser-sa-direction-financiere', '/en/ressources/blog/organize-finance-department'],
  ['/en/en/ressources/blog/organiser-sa-direction-financiere', '/en/fractional-cfo/role'],
  ['/es/en/ressources/blog/organiser-sa-direction-financiere', '/es/externalizacion-daf/funciones'],
  ['/ressources/glossaire/daf', '/daf-externalise/metier'],
  ['/jobs/fractional-cfo-startups', '/fractional-cfo-startups'],
  ['/ressources/blog/externaliser-comptabilite-guide', '/ressources/blog/externalisation-comptable'],
  ['/notre-expertise', '/a-propos'],
  ['/en/a-propos', '/en/about'],
  ['/ressources/blog/cout-daf-externalise-2026-tarifs-par-mission', '/ressources/blog/cout-daf-externalise-tarifs-prix-2026'],
]) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const location = response.headers.get('location');
  const actual = location ? new URL(location, base).pathname : null;
  const final = await fetch(base + target, { redirect: 'manual' });
  redirects.push({ path, target: actual, status: response.status, finalStatus: final.status });
  if (![301, 308].includes(response.status) || actual !== target || final.status !== 200) failures.push({ path, test: 'permanent-one-hop-redirect', actual, status: response.status, finalStatus: final.status });
}
const jobs = [];
const jobsHub = await (await fetch(base + '/jobs')).text();
for (const path of ['/jobs/finance-analyst-junior-fr', '/jobs/senior-finance-manager', '/jobs/marketing-growth-strategy']) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const linked = jobsHub.includes(`href="${path}"`);
  jobs.push({ path, status: response.status, linkedFromHub: linked });
  if (response.status !== 200 || !linked) failures.push({ path, test: 'open-job-accessibility', status: response.status, linked });
}
console.log(JSON.stringify({ base, pages: pages.length, cleanedBreadcrumbPages: cleanedBreadcrumbs.size,
  duplicateBreadcrumbPages: pages.filter(page => page.breadcrumbs > 1), softwareGuides: pages.reduce((sum, page) => sum + page.softwareArticles, 0),
  redirects, jobs, failures }, null, 2));
if (failures.length) process.exitCode = 1;
