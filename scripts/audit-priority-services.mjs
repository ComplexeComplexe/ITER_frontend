/** Built-HTML regression checks for the distinct Paris, startup and transition intents. */
const base = (process.argv[2] ?? 'http://127.0.0.1:4046').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const routes = [
  { path: '/daf-externalise-paris', h1: 'DAF externalisé à Paris et en Île-de-France', anchors: ['definition', 'signaux', 'comparatif', 'missions', 'parcours', 'marche-parisien', 'avantage-iter', 'conclusion'], links: ['/daf-externalise', '/daf-externalise/temps-partage', '/fractional-cfo-startups'], author: '/a-propos/sebastien-doat#person' },
  { path: '/fractional-cfo-startups', h1: 'Fractional CFO pour startups et SaaS', anchors: ['commercial-intro', 'definition', 'pour-qui', 'avantages', 'methodologie', 'tarifs', 'temoignages', 'faq-commercial', 'cta-service', 'jobs-section'], links: ['/daf-externalise', '/ressources/glossaire/arr-mrr', '/ressources/glossaire/cash-burn-runway', '/jobs'] },
  { path: '/daf-externalise/transition', h1: 'DAF de transition', anchors: ['situations', 'premiers-jours', 'feuille-de-route', 'experience', 'budget', 'preparer-echange'], links: ['/daf-externalise', '/daf-externalise/temps-partage'] },
];
const failures = [], results = [];
const schemasOf = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => { const value = JSON.parse(m[1]); return value['@graph'] ?? [value]; });
const hasAlternate = (html, language, path) => [...html.matchAll(/<link\b[^>]*>/gi)].some(([tag]) =>
  /\brel="alternate"/i.test(tag) && tag.match(/\bhreflang="([^"]+)"/i)?.[1] === language && tag.match(/\bhref="([^"]+)"/i)?.[1] === origin + path);
for (const route of routes) {
  const response = await fetch(base + route.path, { redirect: 'manual' });
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  const text = main.replace(/<script\b[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  const schemas = schemasOf(html), h1 = [...main.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)];
  const check = (ok, reason) => { if (!ok) failures.push({ path: route.path, reason }); };
  check(response.status === 200, 'retained-200');
  check(h1.length === 1 && h1[0][1] === route.h1, 'distinct-single-h1');
  check(html.includes('data-finance-template="service"'), 'shared-service-template');
  check(html.includes(`rel="canonical" href="${origin + route.path}"`), 'self-canonical');
  check(new Set(ids).size === ids.length, 'unique-dom-ids');
  for (const id of route.anchors) check(ids.includes(id), `preserved-anchor:${id}`);
  for (const link of route.links) check(main.includes(`href="${link}"`), `contextual-link:${link}`);
  check(schemas.filter(s => s['@type'] === 'FAQPage').length === 1, 'one-faq-schema');
  check(schemas.some(s => s['@type'] === 'Service' && s.url === origin + route.path), 'service-schema');
  check(!schemas.some(s => s['@type'] === 'JobPosting'), 'commercial-not-job');
  check(!/30\s*(?:à|-)\s*60\s*%|1\s*(?:à|-)\s*3\s*jours\s*\/\s*semaine|sous 5 jours|relations privilégiées/i.test(text), 'unsupported-promises-removed');
  if (route.path.includes('startups')) {
    const paths = { 'fr-FR': '/fractional-cfo-startups', 'en-GB': '/en/fractional-cfo-for-startups', 'es-ES': '/es/cfo-externo-startups' };
    for (const [language, path] of Object.entries(paths)) {
      check(hasAlternate(html, language, path), `real-startup-alternate:${language}`);
      const translatedResponse = await fetch(base + path, { redirect: 'manual' });
      const translatedHtml = await translatedResponse.text();
      check(translatedResponse.status === 200 && translatedHtml.includes(`rel="canonical" href="${origin + path}"`), `published-startup-translation:${language}`);
      check(translatedHtml.includes('data-finance-template="service"'), `shared-startup-template:${language}`);
      for (const [otherLanguage, otherPath] of Object.entries(paths)) check(hasAlternate(translatedHtml, otherLanguage, otherPath), `reciprocal-startup-alternate:${language}:${otherLanguage}`);
    }
  }
  if (route.path.includes('paris')) {
    check(/hreflang="en-GB" href="https:\/\/www\.iteradvisors\.com\/en\/fractional-cfo-paris"/i.test(html) && /hreflang="es-ES" href="https:\/\/www\.iteradvisors\.com\/es\/cfo-externalizado-paris"/i.test(html), 'real-paris-alternates');
    check(schemas.some(s => s['@type'] === 'WebPage' && s.author?.['@id'] === origin + route.author), 'preserved-paris-author');
    check(!schemas.some(s => s['@type'] === 'ProfessionalService' && s.address?.addressLocality === 'Paris'), 'no-invented-paris-business-address');
    check(text.includes('pas présentée comme une référence parisienne'), 'case-location-qualification');
  }
  if (route.path.includes('transition')) check(text.includes('management de transition finance') && text.includes('prolongation') && text.includes('passation'), 'mandate-duration-exit');
  results.push({ path: route.path, status: response.status, anchorsPreserved: route.anchors.length });
}
const legacy = await fetch(base + '/jobs/fractional-cfo-startups', { redirect: 'manual' });
if (![301, 308].includes(legacy.status) || new URL(legacy.headers.get('location') ?? '/', base).pathname !== '/fractional-cfo-startups') failures.push({ path: '/jobs/fractional-cfo-startups', reason: 'preserve-legacy-commercial-redirect' });
const hub = await (await fetch(base + '/services')).text();
if (!hub.includes('href="/fractional-cfo-startups"')) failures.push({ path: '/services', reason: 'startup-discoverability' });
console.log(JSON.stringify({ results, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
