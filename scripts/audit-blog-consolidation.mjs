/** Read the built site, including old links, to verify the complete consolidation contract. */
const base = (process.argv[2] ?? 'http://127.0.0.1:4044').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const migrations = [
  { slug: 'cout-externalisation-comptable-2026', target: '/ressources/blog/externalisation-comptable', anchors: ['grille', 'modeles', 'comparatif', 'facteurs', 'roi', 'choisir', 'faq'] },
  { slug: 'drh-externalise-quand-et-pourquoi', target: '/drh-externalise', anchors: ['quand', 'alternatives', 'perimetre', 'cadrage', 'interlocuteur'] },
  { slug: 'daf-part-time-tarifs-missions-2026', target: '/daf-externalise/temps-partage', anchors: ['definition', 'rythme', 'premier-mois', 'responsabilites', 'budget', 'bilan'] },
  { slug: 'daf-externalise-barcelone-guide-startups-espagnoles', target: '/daf-externalise-barcelone', anchors: ['fiscalite', 'subventions', 'recrutement', 'erreurs', 'cout'] },
];
const failures = [], routes = [], pages = [];
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const sources = new Set(migrations.map(item => `/ressources/blog/${item.slug}`));
for (const migration of migrations) {
  const source = `/ressources/blog/${migration.slug}`;
  const response = await fetch(base + source, { redirect: 'manual' });
  const location = new URL(response.headers.get('location') ?? source, base).pathname;
  const target = await fetch(base + location, { redirect: 'manual' });
  routes.push({ source, status: response.status, location, targetStatus: target.status });
  if (response.status !== 301 || location !== migration.target || target.status !== 200) failures.push({ source, test: 'one-hop-permanent-redirect' });
  if (paths.includes(source) || !paths.includes(migration.target)) failures.push({ source, test: 'sitemap-consolidation' });
  const html = await target.text();
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  for (const id of migration.anchors) if (!ids.includes(id)) failures.push({ source, id, test: 'preserved-anchor' });
  if (new Set(ids).size !== ids.length) failures.push({ source, test: 'duplicate-dom-id' });
  if (!html.includes(`rel="canonical" href="${origin + migration.target}"`)) failures.push({ source, test: 'canonical-target' });
}
// Previously localized aliases must skip the now-redirected article too.
for (const slug of ['drh-externalise-quand-et-pourquoi', 'daf-externalise-barcelone-guide-startups-espagnoles']) {
  const target = migrations.find(item => item.slug === slug).target;
  for (const prefix of ['/en/ressources/blog/', '/es/recursos/blog/']) {
    const source = prefix + slug;
    const response = await fetch(base + source, { redirect: 'manual' });
    const location = new URL(response.headers.get('location') ?? source, base).pathname;
    routes.push({ source, status: response.status, location });
    if (![301, 308].includes(response.status) || location !== target) failures.push({ source, test: 'flattened-historical-alias' });
  }
}
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while(cursor < paths.length) {
    const path = paths[cursor++];
    const response = await fetch(base + path);
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      const href = new URL(match[1].replaceAll('&amp;', '&'), origin);
      if (href.origin === origin && sources.has(href.pathname)) failures.push({ path, href: href.pathname, test: 'internal-link-to-merged-source' });
    }
    pages.push({path, status: response.status});
  }
}));
console.log(JSON.stringify({ pagesChecked: pages.length, routes, failures }, null, 2));
process.exit(failures.length ? 1 : 0);
