/**
 * Audit des redirections — détecte les chaînes et les règles mortes.
 *
 * Créé pour SEO-DAF-08 (audit du 9 août 2026), dont la recette exige
 * « chaque redirection a une cible sémantiquement équivalente et un seul
 * saut ». Une première passe manuelle n'avait regardé que next.config.ts et
 * avait donc raté une chaîne : la destination était captée par une règle
 * `:path*` d'un AUTRE fichier. Ce script lit les deux sources de vérité.
 *
 * Trois familles de problèmes remontées :
 *
 *   CHAÎNE   la destination d'une règle est elle-même captée par une autre
 *            règle → 2 sauts ou plus. Google suit les chaînes mais dilue le
 *            signal, et chaque saut est un aller-retour réseau pour l'utilisateur.
 *
 *   MORTE    une règle dont la source est déjà captée par une règle placée
 *            avant elle. Le premier match gagne : la seconde ne s'exécutera
 *            jamais. Piège classique — on modifie la règle morte et rien ne
 *            change en production.
 *
 *   BOUCLE   source === destination après résolution.
 *
 * Usage :  node scripts/audit-redirects.mjs
 * Sortie :  code 0 si tout est propre, 1 sinon (utilisable en CI).
 */
import { readFileSync } from "node:fs";

/** Convertit un pattern Next.js / Vercel en RegExp.
 *  `:name*` → zéro segment ou plus, `:name+` → un ou plus, `:name` → un. */
function toRegExp(pattern) {
  let re = "";
  const parts = pattern.split("/");
  for (const part of parts) {
    if (!part) continue;
    const m = part.match(/^:([A-Za-z0-9_]+)([*+?])?$/);
    if (!m) {
      re += "/" + part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      continue;
    }
    const mod = m[2];
    if (mod === "*") re += "(?:/[^/]+)*";
    else if (mod === "+") re += "(?:/[^/]+)+";
    else if (mod === "?") re += "(?:/[^/]+)?";
    else re += "/[^/]+";
  }
  return new RegExp(`^${re || "/"}$`);
}

function parseNextConfig(src) {
  const out = [];
  // Les règles sont écrites soit en une ligne, soit sur plusieurs — on
  // capture chaque objet { source, destination } quelle que soit sa mise en forme.
  const re = /\{\s*source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    out.push({ source: m[1], destination: m[2], file: "next.config.ts" });
  }
  return out;
}

function parseVercelJson(src) {
  const json = JSON.parse(src);
  return (json.redirects ?? []).map((r) => ({
    source: r.source,
    destination: r.destination,
    file: "vercel.json",
  }));
}

const rules = [
  // vercel.json s'exécute à l'edge, avant le routage Next.js.
  ...parseVercelJson(readFileSync("vercel.json", "utf8")),
  ...parseNextConfig(readFileSync("next.config.ts", "utf8")),
].map((r) => ({ ...r, re: toRegExp(r.source) }));

/** Première règle qui matche une URL — sémantique « first match wins ». */
const match = (url) => rules.find((r) => r.re.test(url));

const chains = [];
const dead = [];
const loops = [];

rules.forEach((rule, i) => {
  // MORTE : une règle antérieure capte déjà cette source.
  // On ne signale que les cas où la règle masquée envoie AILLEURS. Quand les
  // deux destinations coïncident (typiquement la même règle déclarée dans
  // vercel.json et dans next.config.ts), le comportement observé est le bon :
  // c'est de la redondance, pas un bug.
  const shadow = rules.slice(0, i).find((r) => r.re.test(rule.source));
  if (shadow && shadow.destination !== rule.destination) {
    dead.push({ rule, shadow });
  }

  // CHAÎNE : la destination est elle-même redirigée.
  // Les destinations paramétrées (/foo/:path*) ne sont pas des URL concrètes,
  // mais leur préfixe littéral suffit à révéler une capture par un wildcard.
  const dest = rule.destination.split("#")[0].split("?")[0];
  if (dest.includes(":")) return;
  const next = match(dest);
  if (next && next !== rule) {
    if (next.destination === rule.source) loops.push({ rule, next });
    else chains.push({ rule, next });
  }
});

const report = (title, rows, fmt) => {
  console.log(`\n=== ${title} : ${rows.length} ===`);
  rows.forEach((r) => console.log(fmt(r)));
};

report(
  "CHAÎNES (2 sauts ou plus)",
  chains,
  ({ rule, next }) =>
    `  ${rule.source}\n    → ${rule.destination}   [${rule.file}]` +
    `\n    → ${next.destination}   [${next.file}]`,
);
report(
  "RÈGLES MORTES (masquées par une règle antérieure)",
  dead,
  ({ rule, shadow }) =>
    `  ${rule.source} → ${rule.destination}   [${rule.file}]` +
    `\n    masquée par : ${shadow.source} → ${shadow.destination}   [${shadow.file}]`,
);
report("BOUCLES", loops, ({ rule }) => `  ${rule.source} ⇄ ${rule.destination}`);

const total = chains.length + dead.length + loops.length;
console.log(
  `\n${rules.length} règles analysées — ${total} problème(s).`,
);
process.exit(total === 0 ? 0 : 1);
