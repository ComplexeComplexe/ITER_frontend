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
  // Le motif exige un contexte d'économie : « 60-70 % » désigne aussi, ailleurs
  // sur le site, une part de temps passé — le contrôler seul produisait un
  // faux positif sur l'article outils.
  { re: /(?:économi\w*|moins cher|réduction|de moins)[^.]{0,60}?(?:50|60) ?(?:à|-|–) ?(?:70|75|80|85) ?%|(?:50|60) ?(?:à|-|–) ?(?:70|75|80|85) ?%[^.]{0,40}?(?:moins cher|d'économie|de moins)/i, sujet: "économie annoncée (30 à 60 %)" },
  { re: /48 ?(?:à|-|–) ?72 ?(?:h|heures)/i, sujet: "délai de démarrage (7 à 10 jours)" },
  { re: /engagement de 3 (?:à 6 )?mois|à partir de 3 mois, renouvelable/i, sujet: "engagement (aucune durée minimale)" },
  { re: /80 000 ?(?:à|–|-) ?150 000|90 000 ?(?:à|–|-) ?150 000|120 000 ?(?:et|à|–|-) ?180 000/, sujet: "coût DAF salarié (100 000 à 213 000 €)" },
  // SEO-AUD-0824 §1 — relevées par l'audit du 24 août. Les cinq premières
  // contredisaient l'arbitrage du 10 août ; les deux dernières étaient des
  // affirmations de performance sans source, période ni base de comparaison,
  // que les règles de publication de lib/content/facts.ts interdisent.
  { re: /2 ?000 (?:et|à|–|-) ?7 ?000/, sujet: "grille tarifaire (3 000 à 8 000 € HT/mois)" },
  { re: /50\s?-\s?90\s?k|50 000 (?:à|–|-) ?90 000/i, sujet: "coût DAF salarié (100 000 à 213 000 €)" },
  { re: /\+ ?25 ?% de réduction|25 ?% de réduction des coûts/i, sujet: "réduction de coûts non sourcée" },
  { re: /\+ ?15 ?% d'amélioration|15 ?% de pre-?money/i, sujet: "amélioration non sourcée" },
  { re: /200 ?% (?:de )?ROI|ROI (?:de )?200 ?%/i, sujet: "ROI non sourcé" },
  { re: /au 1\/3 du prix|1\/3 du prix/i, sujet: "comparaison de prix non sourcée" },
  { re: /expert-comptable ou (?:un )?CFO à temps partagé/i, sujet: "DAF externalisé assimilé à un expert-comptable" },
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
  // Le coût employeur d'un DRH, d'un comptable ou d'un contrôleur de gestion
  // n'est pas celui d'un DAF : aligner ces fourchettes reviendrait à affirmer
  // que ces postes se paient au même prix. Seul le motif « coût DAF salarié »
  // est neutralisé sur ces pages ; économies, délais et engagement y sont
  // désormais contrôlés comme ailleurs.
  { path: /^\/(drh-externalise|services\/comptabilite-externalisation|services\/controle-de-gestion-externalise)/, sujet: /coût DAF salarié/ },
  { path: /^\/(es\/externalizacion-rrhh|en\/hr-outsourcing)/, sujet: /coût DAF salarié/ },
  // Délais de réponse du support (SLA), pas des promesses de démarrage.
  { path: /^\/(services\/comptabilite-externalisation|es\/services\/externalizar-contabilidad|ressources\/blog\/cout-externalisation-comptable-2026)/, sujet: /délai de démarrage/ },
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
  for (const { re, sujet } of VALEURS_INTERDITES) {
    const exclu = HORS_ARBITRAGE.some((x) => x.path.test(path) && x.sujet.test(sujet));
    if (exclu) continue;
    const m = texte.match(re);
    if (m) fail("faits/régression", `${path} — ${sujet} : « ${m[0]} »`);
  }
}

// ── 4. Liens internes rendus : aucun ne doit viser une redirection
//
// SEO-ULT §4 (2026-08-15) — ce contrôle est né d'un angle mort. Le footer
// construisait ses liens à l'exécution (`/${locale}/ressources/blog/${slug}`),
// donc aucune de ces URL n'existait en dur dans le code : l'audit de
// configuration ne pouvait pas les voir. Huit liens sur dix partaient sur une
// 3xx, sur toutes les pages du site.
//
// On suit ici chaque lien interne réellement émis dans le HTML et on vérifie
// qu'il répond 200 sans redirection. C'est plus lent qu'un grep, mais c'est le
// seul moyen d'attraper les liens assemblés dynamiquement.
console.log("\nContrôle des liens internes rendus…");
const liensVus = new Map(); // href → statut (mémoïsé)
let liensTestes = 0;
for (const abs of urls) {
  const path = abs.replace(CANONICAL_HOST, "") || "/";
  let html;
  try {
    const r = await fetch(BASE + path, { redirect: "manual" });
    if (r.status !== 200) continue;
    html = await r.text();
  } catch {
    continue;
  }
  const hrefs = new Set(
    [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("/_next")),
  );
  for (const href of hrefs) {
    if (!liensVus.has(href)) {
      try {
        const r = await fetch(BASE + href, { redirect: "manual" });
        liensVus.set(href, r.status);
      } catch {
        liensVus.set(href, 0);
      }
      liensTestes++;
    }
    const st = liensVus.get(href);
    if (st >= 300 && st < 400) fail("lien/redirection", `${path} → ${href} (${st})`);
    else if (st >= 400 || st === 0) fail("lien/cassé", `${path} → ${href} (${st})`);
  }
}
console.log(`  ${liensTestes} URL de destination distinctes testées`);

// ── 3b. /llms.txt : la fiche de contexte pour les moteurs génératifs
//
// GEO-01 (2026-08-26) — ce fichier annonçait « 2 000 à 7 000 € HT/mois » et un
// TJM, deux valeurs retirées du site le 25 août. Il vivait dans `public/`,
// écrit à la main : rien ne le rattachait à lib/content/facts.ts, et personne
// ne le relisait — puisqu'il est écrit pour des machines.
//
// Il est désormais généré depuis facts.ts, donc il ne peut plus diverger. Ce
// contrôle vérifie qu'il est bien servi, et qu'aucune valeur retirée n'y est
// revenue par un autre chemin.
{
  const r = await fetch(`${BASE}/llms.txt`, { redirect: "manual" });
  if (r.status !== 200) {
    fail("llms/absent", `/llms.txt → ${r.status}`);
  } else {
    const t = await r.text();
    for (const { re, sujet } of VALEURS_INTERDITES) {
      const m = t.match(re);
      if (m) fail("llms/régression", `${sujet} : « ${m[0]} »`);
    }
    // Un tarif journalier chiffré contredit la règle « retainer mensuel, jamais
    // à l'heure ». Le motif exige un nombre : le fichier dit précisément
    // « sans tarif journalier », et une négation ne doit pas déclencher
    // l'alerte que la phrase sert justement à écarter.
    const tarifJour = t.match(/TJM[^.]{0,40}\d|\d[\d\s ]*€[^.]{0,15}(?:\/\s?j\b|par jour)/i);
    if (tarifJour) fail("llms/régression", `tarif journalier : « ${tarifJour[0]} »`);

    // La ponctuation de fin de phrase ne fait pas partie de l'URL.
    for (const u of new Set(
      [...t.matchAll(/https:\/\/www\.iteradvisors\.com(\/[^\s)]*)/g)].map((m) => m[1].replace(/[.,;:]+$/, "")),
    )) {
      const rr = await fetch(BASE + u, { redirect: "manual" });
      if (rr.status !== 200) fail("llms/URL", `${u} → ${rr.status}`);
    }
  }
}

// ── 4b. Pages orphelines : aucune URL du sitemap sans lien entrant
//
// SEO-AUD-0824 §3 (2026-08-24) — l'audit a relevé 38 URL du sitemap qu'aucun
// lien interne ne désignait : 24 fiches d'expert, 6 fiches de glossaire, les
// pages clients et les offres d'emploi. Une page sans lien entrant ne reçoit
// aucun PageRank interne et n'existe, pour un crawler, que par le sitemap.
//
// Le comptage part des pages du sitemap, mais suit un saut de plus : le hub
// carrières est volontairement hors index et n'y figure pas, alors qu'il est
// le chemin normal vers les trois offres. S'arrêter au sitemap les aurait
// déclarées orphelines à tort.
const liensSortants = new Map(); // page → Set(href)
for (const abs of urls) {
  const path = abs.replace(CANONICAL_HOST, "") || "/";
  let html;
  try {
    const r = await fetch(BASE + path, { redirect: "manual" });
    if (r.status !== 200) continue;
    html = await r.text();
  } catch {
    continue;
  }
  liensSortants.set(
    path,
    new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("/_next"))),
  );
}
const normalise = (p) => p.replace(/\/$/, "") || "/";
const dansSitemap = new Set(urls.map((u) => normalise(u.replace(CANONICAL_HOST, "") || "/")));
const cibles = new Set();
for (const set of liensSortants.values()) for (const h of set) cibles.add(normalise(h));
// Un saut supplémentaire, à travers les pages hors sitemap déjà atteintes.
for (const cible of [...cibles]) {
  if (dansSitemap.has(cible) || liensSortants.has(cible)) continue;
  try {
    const r = await fetch(BASE + cible, { redirect: "manual" });
    if (r.status !== 200) continue;
    const html = await r.text();
    for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
      if (!m[1].startsWith("/_next")) cibles.add(normalise(m[1]));
    }
  } catch {
    /* injoignable : sans effet sur le comptage */
  }
}
const orphelines = [...dansSitemap].filter((p) => !cibles.has(p));
for (const p of orphelines) fail("orpheline", p);
console.log(`  ${orphelines.length} page(s) orpheline(s) sur ${dansSitemap.size}`);

// ── 5. hreflang : chaque alternate doit viser une 200 canonique et réciproque
//
// SEO-AUD-0824 §2 (2026-08-24) — l'audit a relevé 59 balises sur 34 pages qui
// désignaient une URL redirigée. Deux causes : les alternates reprenaient par
// défaut le chemin de la locale courante (`/es/ressources/outils` au lieu de
// `/es/recursos/herramientas`), et les articles publiés dans une seule langue
// déclaraient malgré tout les trois. Une redirection vers une autre langue
// n'est pas une traduction.
//
// Le contrôle est ici et pas dans audit-redirects.mjs parce qu'une balise
// hreflang n'existe qu'une fois la page rendue : elle est calculée à partir du
// chemin, jamais écrite en entier dans le code.
console.log("\nContrôle des hreflang rendus…");
const altsParPage = new Map();
for (const abs of urls) {
  const path = abs.replace(CANONICAL_HOST, "") || "/";
  let html;
  try {
    const r = await fetch(BASE + path, { redirect: "manual" });
    if (r.status !== 200) continue;
    html = await r.text();
  } catch {
    continue;
  }
  const head = html.slice(0, html.indexOf("</head>") + 7 || html.length);
  // Next rend l'attribut `hrefLang` avec un L majuscule : ignorer la casse.
  const alts = [...head.matchAll(/<link rel="alternate"[^>]*?hreflang="([^"]+)"[^>]*?href="([^"]+)"/gi)].map(
    (m) => ({ lang: m[1], cible: m[2].replace(CANONICAL_HOST, "") || "/" }),
  );
  altsParPage.set(path, alts);
}
let altsTestees = 0;
for (const [path, alts] of altsParPage) {
  for (const { lang, cible } of alts) {
    if (!cible.startsWith("/")) continue;
    if (!liensVus.has(cible)) {
      try {
        const r = await fetch(BASE + cible, { redirect: "manual" });
        liensVus.set(cible, r.status);
      } catch {
        liensVus.set(cible, 0);
      }
    }
    altsTestees++;
    const st = liensVus.get(cible);
    if (st !== 200) {
      fail("hreflang/redirection", `${path} — [${lang}] ${cible} (${st})`);
      continue;
    }
    // Réciprocité : la cible doit désigner la source en retour. Non vérifiable
    // si la cible est hors sitemap — on ne conclut pas dans ce cas.
    if (cible === path) continue;
    const retour = altsParPage.get(cible);
    if (retour && !retour.some((a) => a.cible === path)) {
      fail("hreflang/réciprocité", `${path} — [${lang}] ${cible} ne renvoie pas en retour`);
    }
  }
}
console.log(`  ${altsTestees} balises hreflang contrôlées sur ${altsParPage.size} pages`);

// SEO-AUD-0824 §6 (2026-08-24) — les douze titles trop longs relevés par
// l'audit ont été réécrits, le compteur est à zéro. Il devient donc un
// contrôle : sans quoi il remonterait au premier title écrit sans y penser.
//
// La limite réelle est en pixels, pas en caractères — 60 est une approximation
// prudente. Une page qui assume un title plus long pour rester explicite reste
// possible : il suffit de l'exempter ici, en disant pourquoi.
console.log(`Titles de plus de 60 caractères : ${titresLongs}`);
if (titresLongs > 0) fail("title/longueur", `${titresLongs} title(s) de plus de 60 caractères`);

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
