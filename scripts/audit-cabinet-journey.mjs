/** Rendered checks for the cabinet, operations, tax hub and stack-selection journey. */
const base = (process.argv[2] ?? 'http://127.0.0.1:4047').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const expertise = ['DAF externalisé', 'DRH externalisé', 'Contrôle de gestion', 'Levée de fonds', 'Fiscalité France-Espagne'];
const localizedExpertise = {
  fr: ['DAF externalisé', 'DRH externalisée', 'Contrôle de gestion', 'Gestion de trésorerie', 'Logiciels de gestion financière', 'Pennylane'],
  en: ['Fractional CFO', 'External HR leadership', 'Management accounting', 'Cash flow management', 'Financial management software', 'Pennylane'],
  es: ['CFO externo', 'Dirección de RRHH externa', 'Control de gestión', 'Gestión de tesorería', 'Software de gestión financiera', 'Pennylane'],
};
const paths = ['/', '/services/gestion-financiere-externalisee', '/ressources/fiscalite-espagne-france', '/ressources/blog/essentiels-outils-tech-finance', '/ressources/blog/stack-financier-saas-series-a', '/ressources/ia-finance/outils', '/en', '/es'];
const failures = [], results = [];
const flat = data => Array.isArray(data) ? data.flatMap(flat) : data?.['@graph'] ? flat(data['@graph']) : [data];
for (const path of paths) {
  const response = await fetch(base + path, { redirect: 'manual' });
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1] ?? '';
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => flat(JSON.parse(m[1])));
  const text = main.replace(/<script\b[^>]*>.*?<\/script>/gs, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const check = (ok, reason) => { if (!ok) failures.push({ path, reason }); };
  check(response.status === 200, 'retained-url');
  check(html.match(/rel="canonical" href="([^"]+)"/)?.[1]?.replace(/\/$/, '') === (origin + path).replace(/\/$/, ''), 'canonical');
  check([...main.matchAll(/<h1\b/g)].length === 1, 'one-h1');
  const organization = schemas.filter(s => s['@id'] === origin + '/#organization' && s.name === 'Iter Advisors');
  check(organization.length === 1, 'one-cabinet-entity');
  const documentLocale = html.match(/<html\b[^>]*lang="([^"]+)"/)?.[1] ?? 'fr';
  check(JSON.stringify(organization[0]?.knowsAbout) === JSON.stringify(localizedExpertise[documentLocale]), 'shared-expertise-order');
  if (['/', '/en', '/es'].includes(path)) {
    const locale = path === '/' ? 'fr' : path.slice(1);
    const expected = {
      fr: { title: 'Iter Advisors : DAF &amp; DRH à temps partagé | Paris, Barcelone', headline: 'Iter Advisors, vos DAF seniors pour piloter vos finances.', contact: '/contact#daf', fees: '/daf-externalise/tarifs', offer: '/daf-externalise', fiction: 'Données fictives' },
      en: { title: 'Iter Advisors: Fractional CFO &amp; HR | Paris, Barcelona', headline: 'Iter Advisors, your senior CFOs to manage your finances.', contact: '/en/contact#daf', fees: '/en/fractional-cfo/pricing', offer: '/en/fractional-cfo', fiction: 'Fictional data' },
      es: { title: 'Iter Advisors: CFO externo y RR. HH. | París, Barcelona', headline: 'Iter Advisors, sus CFO sénior para dirigir sus finanzas.', contact: '/es/contact#daf', fees: '/es/externalizacion-daf/precios', offer: '/es/externalizacion-daf', fiction: 'Datos ficticios' },
    }[locale];
    check(html.includes(`<title>${expected.title}</title>`), 'cabinet-title');
    const hero = main.match(/data-journey="home-hero".*?<\/section>/s)?.[0] ?? '';
    const headline = hero.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]*>/g, '') ?? '';
    check(main.includes('data-home-template="pilotage"'), 'shared-pilotage-template');
    check(headline === expected.headline, 'approved-h1');
    check(hero.includes(`href="${expected.contact}"`) && hero.includes(`href="${expected.fees}"`), 'localized-hero-journey');
    check(main.includes(`href="${expected.offer}"`), 'retained-offer-link');
    check(hero.includes(expected.fiction), 'illustrative-forecast-labelled');
  }
  if (path === '/services/gestion-financiere-externalisee') {
    check(text.includes('Gestion financière opérationnelle'), 'operations-intent');
    for (const target of ['/daf-externalise', '/services/controle-de-gestion-externalise']) check(main.includes(`href="${target}"`), `retained-link:${target}`);
    check(text.includes('les travaux confiés à Iter') && text.includes('précisés au contrat'), 'scope-not-invented');
  }
  if (path === '/ressources/fiscalite-espagne-france') {
    const businesses = main.match(/id="entrepreneurs"(.*?)(?=<hr)/s)?.[1] ?? '';
    const individuals = main.match(/id="particuliers"(.*?)(?=<hr)/s)?.[1] ?? '';
    check(businesses.includes('href="/ressources/blog/filiale-espagnole-pilotage-financier"'), 'subsidiary-in-business-group');
    check(!businesses.includes('href="/ressources/fiscalite/modelo-720"'), 'no-misplaced-personal-declaration');
    check(individuals.includes('href="/ressources/fiscalite/modelo-720"') && !individuals.includes('href="/ressources/blog/filiale-espagnole-pilotage-financier"'), 'correct-personal-tax-group');
    check(main.includes('href="/daf-externalise-barcelone"'), 'local-finance-journey');
    check(text.includes('professionnels compétents'), 'tax-validation-boundary');
  }
  if (path.endsWith('/essentiels-outils-tech-finance')) {
    for (const id of ['pourquoi-digitaliser', 'stack-essentiels', 'comptabilite-cloud', 'tresorerie-et-previsions', 'reporting-et-bi', 'securite-et-gouvernance', 'methode-selection']) check(main.includes(`id="${id}"`), `historical-anchor:${id}`);
    check(!/150\+|40\s*(?:à|-|–)\s*50\s*%|60-70\s*%|15h|€200-500/.test(text), 'unsupported-gains-removed');
    const article = schemas.filter(s => ['BlogPosting', 'Article'].includes(s['@type']));
    check(article.length === 1 && article[0].author?.['@id'] === origin + '/a-propos/benjamin-ziza#person' && article[0].datePublished === '2026-05-01', 'preserved-authorship-and-publication');
    check(article[0]?.dateModified?.startsWith('2026-10-02'), 'substantive-revision');
    for (const target of ['/ressources/outils', '/ressources/ia-finance/outils', '/ressources/blog/stack-financier-saas-series-a']) check(main.includes(`href="${target}"`), `complementary-link:${target}`);
  }
  if (path === '/ressources/blog/stack-financier-saas-series-a') check(main.includes('href="/ressources/blog/essentiels-outils-tech-finance"'), 'stack-method-link');
  if (path === '/ressources/ia-finance/outils') check(main.includes('href="/ressources/outils"'), 'ia-directory-link');
  results.push({ path, status: response.status });
}
const response = await fetch(base + '/llms.txt');
const context = await response.text();
const headings = [...context.matchAll(/^### (.*)$/gm)].map(m => m[1]);
if (response.status !== 200 || JSON.stringify(headings.slice(0, 5)) !== JSON.stringify(expertise)) failures.push({ path: '/llms.txt', reason: 'shared-expertise-order' });
console.log(JSON.stringify({ results, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
