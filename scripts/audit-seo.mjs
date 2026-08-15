/**
 * Recette SEO — contrôles de non-régression sur un serveur rendu.
 *
 * Créé pour le ticket de réparation SEO du 15 août 2026 (§18). Complète
 * scripts/audit-redirects.mjs, qui ne lit que la configuration : celui-ci
 * interroge un serveur réel, seul moyen de prouver qu'une URL déclarée au
 * sitemap répond bien 200 et se canonise sur elle-même.
 *
 * Usage :
 *   npm run build && npx next start -p 3100
 *   node scripts/audit-seo.mjs http://localhost:3100
 *
 * Sortie : code 0 si tout passe, 1 sinon (utilisable en CI).
 *
 * Ce que le script NE fait pas : il ne crawle pas le site en suivant les
 * liens. Il contrôle le sitemap, les valeurs commerciales interdites et les
 * titles. Le crawl de liens internes vers des 3xx est couvert par
 * audit-redirects.mjs côté configuration.
 */
const BASE = process.argv[2] ?? "http://localhost:3100";
const CANONICAL_HOST = "https://www.iteradvisors.com";

/**
 * Valeurs retirées du site lors des arbitrages du 10 août 2026.
 * Leur réapparition dans le HTML est une régression : la source de vérité est
 * lib/content/facts.ts. Chaque motif porte le sujet arbitré, pour que l'échec
 * dise quoi corriger et pas seulement qu'il a échoué.
 */
const VALEURS_INTERDITES = [
  { re: /à partir de 2 000 ?€|dès 2 000 ?€|démarre à 2 000 ?€/i, sujet: "prix d'entrée (3 000 € HT/mois)" },
  { re: /à partir de 4 500 ?€|dès 4 500 ?€/i, sujet: "prix d'entrée fractional (3 000 € HT/mois)" },
  { re: /(50|60) ?(?:à|-|–) ?(70|75|80|85) ?%/, sujet: "économie annoncée (30 à 60 %)" },
  { re: /48 ?(?:à|-|–) ?72 ?(?:h|heures)/i, sujet: "délai de démarrage (7 à 10 jours)" },
  { re: /engagement de 3 (?:à 6 )?mois|à partir de 3 mois, renouvelable/i, sujet: "engagement (aucune durée minimale)" },
  { re: /80 000 ?(?:à|–|-) ?150 000|90 000 ?(?:à|–|-) ?150 000|120 000 ?(?:et|à|–|-) ?180 000/, sujet: "coût DAF salarié (100 000 à 213 000 €)" },
];

/**
 * Offres non couvertes par l'arbitrage du 10 août 2026.
 *
 * Le questionnaire de validation ne portait que sur le DAF externalisé. Le DRH
 * externalisé, la comptabilité externalisée et le contrôle de gestion ont leurs
 * propres fourchettes, non arbitrées : les contrôler contre les valeurs DAF
 * produirait de faux échecs, et les aligner de force reviendrait à inventer
 * leurs prix.
 *
 * Elles présentent pourtant le même défaut de fond — économies non sourcées,
 * coût salarié divergent, délais sous 7 jours. À rouvrir dès que ces offres
 * sont arbitrées : il suffira de vider cette liste.
 */
const HORS_ARBITRAGE = [
  /^\/drh-externalise/,
  /^\/es\/externalizacion-rrhh/,
  /^\/en\/hr-outsourcing/,
  /^\/services\/comptabilite-externalisation/,
  /^\/services\/controle-de-gestion-externalise/,
  /^\/ressources\/blog\/cout-externalisation-comptable-2026/,
  /^\/ressources\/blog\/essentiels-outils-tech-finance/,
];

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

const echecs = [];
const fail = (test, detail) => echecs.push({ test, detail });

const res = await fetch(`${BASE}/sitemap.xml`);
if (!res.ok) {
  console.error(`sitemap.xml inaccessible (${res.status})`);
  process.exit(1);
}
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

console.log(`Recette SEO — ${urls.length} URL déclarées au sitemap\n`);

// ── 1. Le sitemap ne contient que des URL de son propre hôte, sans paramètre
for (const u of urls) {
  if (!u.startsWith(CANONICAL_HOST)) fail("sitemap/hôte", `${u} n'est pas sur ${CANONICAL_HOST}`);
  if (u.includes("?")) fail("sitemap/paramètre", u);
}
const doublons = urls.filter((u, i) => urls.indexOf(u) !== i);
if (doublons.length) fail("sitemap/doublon", [...new Set(doublons)].join(", "));

// ── 2. Chaque URL : 200, auto-canonique, indexable, un seul H1 et title
let titresLongs = 0;
for (const abs of urls) {
  const path = abs.replace(CANONICAL_HOST, "") || "/";
  let r;
  try {
    r = await fetch(BASE + path, { redirect: "manual" });
  } catch (e) {
    fail("sitemap/injoignable", `${path} — ${e.message}`);
    continue;
  }
  if (r.status !== 200) {
    fail("sitemap/statut", `${path} → ${r.status}`);
    continue;
  }
  const html = await r.text();

  const canon = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (!canon) fail("canonical/absent", path);
  else if (canon.replace(CANONICAL_HOST, "").replace(/\/$/, "") !== path.replace(/\/$/, ""))
    fail("canonical/croisé", `${path} → ${canon.replace(CANONICAL_HOST, "")}`);

  if (/name="robots"[^>]*noindex/.test(html)) fail("sitemap/noindex", path);

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail("h1", `${path} → ${h1} H1`);

  const titres = [...html.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => m[1]);
  if (titres.length !== 1) fail("title/nombre", `${path} → ${titres.length}`);
  else {
    const t = strip(titres[0]).trim();
    if (!t) fail("title/vide", path);
    if (t.includes("[object Object]")) fail("title/objet", path);
    if (t.length > 60) titresLongs++;
  }

  // ── 3. Valeurs commerciales retirées lors des arbitrages
  const texte = strip(html);
  const arbitre = !HORS_ARBITRAGE.some((r) => r.test(path));
  for (const { re, sujet } of arbitre ? VALEURS_INTERDITES : []) {
    const m = texte.match(re);
    if (m) fail("faits/régression", `${path} — ${sujet} : « ${m[0]} »`);
  }
}

// Les titles longs sont un signal, pas un blocage : la limite réelle est en
// pixels, et certaines pages assument un title long pour rester explicites.
console.log(`Titles de plus de 60 caractères : ${titresLongs}`);

if (echecs.length === 0) {
  console.log("\n✅ Aucun échec.");
  process.exit(0);
}
const parTest = echecs.reduce((acc, e) => ((acc[e.test] = (acc[e.test] ?? 0) + 1), acc), {});
console.log(`\n❌ ${echecs.length} échec(s) :`);
for (const [t, n] of Object.entries(parTest).sort((a, b) => b[1] - a[1])) console.log(`  ${n}× ${t}`);
console.log();
for (const e of echecs.slice(0, 40)) console.log(`  [${e.test}] ${e.detail}`);
if (echecs.length > 40) console.log(`  … et ${echecs.length - 40} autre(s)`);
process.exit(1);
