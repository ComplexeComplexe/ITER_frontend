/** Checks the startup migration without changing or rewriting its content.
 * Usage: node scripts/audit-fractional-migration.mjs [origin] [--framework-only]
 * --framework-only skips edge-only slash variants on a local Next.js server.
 */
import { decodeHTML } from 'entities';

const base = (process.argv[2] ?? 'https://www.iteradvisors.com').replace(/\/$/, '');
const canonicalOrigin = 'https://www.iteradvisors.com';
const moves = [
  ['/jobs/fractional-cfo-startups', '/fractional-cfo-startups', 'fr-FR'],
  ['/en/jobs/fractional-cfo-startups', '/en/fractional-cfo-for-startups', 'en-GB'],
  ['/es/jobs/fractional-cfo-startups', '/es/cfo-externo-startups', 'es-ES'],
];
const failures = [], pages = [], redirects = [];
const check = (ok, path, reason) => { if (!ok) failures.push({ path, reason }); };
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1].toLowerCase(), decodeHTML(m[2])]));
const links = html => [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attributes(m[0]));

for (const [source, target, language] of moves) {
  for (const suffix of ['', '?utm_source=linkedin&utm_campaign=migration', ...(process.argv.includes('--framework-only') ? [] : ['/', '/?utm_source=linkedin'])]) {
    const response = await fetch(base + source + suffix, { redirect: 'manual' });
    const destination = new URL(response.headers.get('location') ?? '/', base);
    const query = new URL(base + source + suffix).search;
    check(response.status === 308, source + suffix, 'permanent-308');
    check(destination.pathname === target, source + suffix, 'direct-startup-target-in-same-language');
    check(destination.search === query, source + suffix, 'preserve-tracking-parameters');
    redirects.push({ source: source + suffix, status: response.status, destination: destination.pathname + destination.search });
  }
  const response = await fetch(base + target, { redirect: 'manual' });
  const html = await response.text(), annotations = links(html);
  check(response.status === 200, target, 'final-page-200');
  check(annotations.some(a => a.rel === 'canonical' && a.href === canonicalOrigin + target), target, 'self-canonical');
  check(!/<meta[^>]*name="(?:robots|googlebot)"[^>]*content="[^"]*noindex/i.test(html), target, 'indexable-html');
  for (const [, otherTarget, otherLanguage] of moves) {
    check(annotations.some(a => a.rel === 'alternate' && a.hreflang === otherLanguage && a.href === canonicalOrigin + otherTarget), target, 'reciprocal-hreflang:' + otherLanguage);
  }
  check(annotations.some(a => a.hreflang === language && a.href === canonicalOrigin + target), target, 'self-hreflang');
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => {
    const value = JSON.parse(m[1]); return value['@graph'] ?? [value];
  });
  check(schemas.some(s => s['@type'] === 'Service' && s.url === canonicalOrigin + target), target, 'retained-service-schema');
  check(!schemas.some(s => s['@type'] === 'JobPosting'), target, 'commercial-not-recruitment');
  const trackedHtml = await (await fetch(base + target + '?utm_source=linkedin')).text();
  check(links(trackedHtml).some(a => a.rel === 'canonical' && a.href === canonicalOrigin + target), target, 'clean-canonical-with-utm');
  const mobileResponse = await fetch(base + target, { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36' } });
  const mobileHtml = await mobileResponse.text();
  const h1 = html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1];
  check(mobileResponse.status === 200 && mobileHtml.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1] === h1, target, 'mobile-content-parity');
  pages.push({ path: target, status: response.status, h1, reciprocalAlternates: moves.length });
}

const sitemapResponse = await fetch(base + '/sitemap.xml');
check(sitemapResponse.status === 200, '/sitemap.xml', 'sitemap-200');
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decodeHTML(m[1]));
for (const [source, target] of moves) {
  check(urls.filter(url => url === canonicalOrigin + target).length === 1, target, 'one-sitemap-entry');
  check(!urls.includes(canonicalOrigin + source), source, 'legacy-absent-from-sitemap');
}

// Crawl every published page, not just the software section. Ignore assets,
// schema strings and navigation between real translations: audit actual links.
const legacyPaths = new Set(moves.map(([source]) => source));
const staleLinks = [], errors = [];
let cursor = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < urls.length) {
    const canonicalUrl = urls[cursor++];
    try {
      const path = new URL(canonicalUrl).pathname;
      const response = await fetch(base + path, { redirect: 'manual' });
      check(response.status === 200, path, 'published-page-200');
      const html = await response.text();
      for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
        const href = decodeHTML(match[1]), absolute = new URL(href, canonicalUrl);
        if (['iteradvisors.com', 'www.iteradvisors.com'].includes(absolute.hostname) && legacyPaths.has(absolute.pathname.replace(/\/$/, ''))) {
          staleLinks.push({ path, href });
        }
      }
    } catch (error) { errors.push({ canonicalUrl, error: error.message }); }
  }
}));
check(staleLinks.length === 0, 'site', 'no-legacy-internal-links');
check(errors.length === 0, 'site', 'complete-crawl');
console.log(JSON.stringify({ base, pages, redirects, pagesCrawled: urls.length, staleLinks, errors, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
