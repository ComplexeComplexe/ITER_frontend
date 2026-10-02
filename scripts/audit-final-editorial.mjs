/** Public claims and navigation contracts for the final French cleanup. */
const base = (process.argv[2] ?? 'http://127.0.0.1:4049').replace(/\/$/, '');
const failures = [];
const check = (path, ok, reason) => { if (!ok) failures.push({ path, reason }); };
const xml = await (await fetch(base + '/sitemap.xml')).text();
const blogs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname).filter(p => p.startsWith('/ressources/blog/'));
for (const path of blogs) {
  const html = await (await fetch(base + path)).text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  const links = [...main.matchAll(/<a\b([^>]+)>/g)].filter(m => /rel="author"/.test(m[1]));
  check(path, links.length === 1, 'one-real-author-byline');
}
const paths = ['/ressources/outils', '/ressources/blog/la-modernisation-du-role-de-cfo', '/ressources/blog/les-10-outils-pour-cfos-startup', '/daf-externalise/transition'];
for (const path of paths) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  check(path, response.status === 200, 'retained-url');
  if (path === '/ressources/outils') {
    check(path, !/80\+ déploiements|250 à 400|800 à 1 500|2 000 à 4 000|Dans nos déploiements|à partir de 2 M€/.test(main), 'no-unsupported-adoption-budget-or-revenue-threshold');
    for (const anchor of ['seed', 'series-a-b', 'scale-up', 'categories', 'recommandation-stade']) check(path, main.includes(`id="${anchor}"`), 'retained-navigation:' + anchor);
  }
  if (path.includes('modernisation')) {
    check(path, !/70 %|50-60 %|30-40 %|30 h\/mois/.test(main), 'no-unverified-market-productivity-claims');
    check(path, main.includes('https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative') && main.includes('https://learn.microsoft.com/en-us/power-bi/connect-data/refresh-data'), 'primary-sources');
    for (const anchor of ['evolution', 'trois-piliers', 'digitalisation', 'ia-data', 'esg-reporting', 'leadership']) check(path, main.includes(`id="${anchor}"`), 'retained-navigation:' + anchor);
  }
  if (path.includes('les-10-outils')) {
    for (const slug of ['pennylane', 'cegid-loop', 'sage', 'agicap', 'fygr', 'qonto', 'power-bi', 'spendesk', 'pleo', 'carta']) check(path, main.includes(`href="/ressources/outils/${slug}"`), 'startup-test-to-tool:' + slug);
    check(path, main.includes('href="/ressources/blog/essentiels-outils-tech-finance"'), 'startup-angle-to-general-method');
  }
  if (path.includes('transition')) {
    check(path, /<h2\b[^>]*>[^<]*directeur financier de transition/i.test(main), 'financial-transition-heading');
    check(path, /<h2\b[^>]*>[^<]*directeur administratif et financier de transition/i.test(main), 'administrative-financial-transition-heading');
  }
}
const anchorPaths = ['/', '/carrieres/fractional-cfo', '/ressources/ia-finance/chatgpt-finance'];
const anchorTargets = new Map([
  ['externalisation comptable', '/ressources/blog/externalisation-comptable'],
  ['comptabilité externalisée', '/services/comptabilite-externalisation'],
  ['prévisionnel de trésorerie', '/services/previsionnel-tresorerie'],
]);
for (const path of anchorPaths) {
  const response = await fetch(base + path);
  check(path, response.ok, 'anchor-page-served');
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  for (const match of main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)) {
    const anchor = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    const target = anchorTargets.get(anchor);
    if (target) check(path, new URL(match[1], base).pathname === target, 'one-intent-one-anchor:' + anchor);
  }
}
const briefPages = ['/drh-externalise', '/daf-externalise/temps-partage', '/daf-externalise/tarifs', '/ressources/blog/externalisation-comptable'];
for (const path of briefPages) {
  const html = await (await fetch(base + path)).text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  if (path === '/drh-externalise') {
    check(path, html.includes('<title>DRH externalisé pour PME et startups | Iter Advisors</title>'), 'hr-offer-title');
    check(path, /<h1\b[^>]*>DRH externalisé pour PME et startups<\/h1>/.test(main), 'hr-offer-h1');
    check(path, /<h2\b[^>]*>Quand faire appel à un DRH externalisé/.test(main), 'hr-offer-need-heading');
  }
  if (path.endsWith('/temps-partage')) {
    check(path, /<h2\b[^>]*>DAF part time/.test(main), 'part-time-heading');
    check(path, /<h2\b[^>]*>[^<]*directeur financier à temps partagé/.test(main), 'shared-time-heading');
  }
  if (path.endsWith('/tarifs')) check(path, /href="\/ressources\/blog\/externalisation-comptable"[^>]*>tarif comptabilité externalisée/.test(main), 'accounting-pricing-referred-to-guide');
  if (path.endsWith('/externalisation-comptable')) check(path, /<title>[^<]*tarifs/.test(html), 'accounting-guide-price-intent');
}
console.log(JSON.stringify({ pages: blogs.length + paths.length + anchorPaths.length + briefPages.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
