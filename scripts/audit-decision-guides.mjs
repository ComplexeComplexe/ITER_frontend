/** Verify the rendered decision guides, contextual cash links and factual boundaries. */
const base = (process.argv[2] ?? 'http://127.0.0.1:4046').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const targets = [
  { path: '/ressources/blog/daf-externalise-vs-daf-salarie', modified: '2026-10-09', anchors: ['contexte', 'cout-total', 'daf-salarie', 'daf-externalise', 'comparaison-directe', 'matrice-decision'], links: ['/daf-externalise', '/daf-externalise/tarifs', '/daf-externalise/transition'], author: 'Benjamin Ziza' },
  { path: '/ressources/blog/daf-externalise-vs-daf-interimaire', anchors: ['differences-fondamentales', 'tableau-comparatif', 'cout-tjm', 'quand-choisir', 'cas-usage', 'conclusion', 'faq'], links: ['/daf-externalise', '/daf-externalise/tarifs', '/daf-externalise/transition', '/daf-externalise/temps-partage'], author: 'Benjamin Ziza' },
  { path: '/ressources/blog/quand-embaucher-daf-externalise-5-signes', anchors: ['signe-1-burn-rate', 'signe-2-compta-retard', 'signe-3-levee-engagee', 'signe-4-controle-gestion', 'signe-5-fondateurs-finance', 'section-6-daf-externalise-vs-salarie', 'faq'], links: ['/daf-externalise', '/services/controle-de-gestion-externalise', '/services/previsionnel-tresorerie'], author: 'Sébastien Doat' },
  { path: '/ressources/blog/cash-burn-calculer-runway-anticiper-levee', anchors: ['methode', 'exemple', 'runway', 'seuils', 'regle-or', 'forecast', 'reduire-burn'], links: ['/daf-externalise', '/ressources/blog/flux-de-tresorerie', '/services/previsionnel-tresorerie'], author: 'Benjamin Ziza' },
  { path: '/services/previsionnel-tresorerie', anchors: ['mission', 'exemple-tresorerie', 'rythme'], links: ['/ressources/blog/flux-de-tresorerie'] },
  { path: '/ressources/blog/agicap-vs-fygr-outil-tresorerie', links: ['/ressources/blog/flux-de-tresorerie'] },
  { path: '/ressources/outils/logiciels-tresorerie', links: ['/ressources/blog/flux-de-tresorerie'] },
  { path: '/ressources/blog/choisir-cabinet-daf-externalise', links: ['/daf-externalise'] },
];
const results = [], failures = [];
const flat = data => Array.isArray(data) ? data.flatMap(flat) : data?.['@graph'] ? flat(data['@graph']) : [data];
for (const target of targets) {
  const response = await fetch(base + target.path, { redirect: 'manual' });
  const html = await response.text(), main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  const text = main.replace(/<script\b[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => flat(JSON.parse(m[1])));
  const check = (ok, reason) => { if (!ok) failures.push({ path: target.path, reason }); };
  check(response.status === 200, 'retained-url');
  check(html.includes(`rel="canonical" href="${origin + target.path}"`), 'self-canonical');
  check([...main.matchAll(/<h1\b/g)].length === 1, 'one-h1');
  check(new Set(ids).size === ids.length, 'unique-ids');
  for (const id of target.anchors ?? []) check(ids.includes(id), `preserved-anchor:${id}`);
  for (const link of target.links) check(main.includes(`href="${link}"`), `contextual-link:${link}`);
  if (target.author) {
    const articles = schemas.filter(s => ['Article', 'BlogPosting'].includes(s['@type']));
    check(articles.length === 1, 'one-article-schema');
    const slug = { 'Benjamin Ziza': 'benjamin-ziza', 'Sébastien Doat': 'sebastien-doat' }[target.author];
    check(articles[0]?.author?.['@id'] === `${origin}/a-propos/${slug}#person`, 'preserved-author');
    check(articles[0]?.dateModified?.startsWith(target.modified ?? '2026-10-02'), 'substantive-revision-date');
  }
  if (target.path.endsWith('interimaire')) {
    check(schemas.filter(s => s['@type'] === 'FAQPage').length === 1, 'one-faq-schema');
    check(!/80\s*%|30\s*à\s*60\s*%|2\s*500\s*(?:et|–|-)\s*6\s*000|scénarios réels|exclusivement ses DAFs/i.test(text), 'unsupported-statistics-retired');
    check(text.includes('situations suivantes sont fictives'), 'fictional-scenarios-labelled');
  }
  if (target.path.endsWith('5-signes')) check(!/80\s*%|30\s*à\s*40\s*%|Seuil de criticité|une dizaine de levées|65\s*000\s*€\s*à\s*130/i.test(text), 'no-threshold-or-attributed-quote-fiction');
  if (target.path.includes('cash-burn-calculer')) {
    check(!/40\s*% des fondateurs|décoter votre valorisation|Jamais avec moins de 9 mois|Revenus \(MRR\)/i.test(text), 'no-universal-financing-or-mrr-cash-confusion');
    check(text.includes('125 875') && text.includes('80 875') && text.includes('8,04') && text.includes('fictif'), 'labelled-burn-example');
  }
  if (target.path === '/services/previsionnel-tresorerie') check(text.includes('20 000') && text.includes('−5 000') && text.includes('15 000') && text.includes('fictifs'), 'labelled-weekly-example');
  results.push({ path: target.path, status: response.status });
}
console.log(JSON.stringify({ results, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
