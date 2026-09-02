import type { Locale } from "@/lib/i18n";
import { getGlossaryPages } from "@/lib/content/glossary-entries";

/**
 * Glossaire : attribution, termes liés et auto-lien depuis les articles.
 *
 * REDESIGN-P3 (2026-09-01) — neuf fiches du glossaire n'avaient qu'un lien
 * entrant, celui du hub, alors que seize articles emploient leurs termes sans
 * jamais les lier. Plutôt que de poser ces liens à la main (et de les
 * oublier au prochain article), `linkGlossaryTerms` pose, dans le HTML rendu
 * d'un article, un lien sur la première occurrence de chaque terme — jamais
 * dans un titre, jamais dans un lien existant, six termes au plus par
 * article. Les termes trop génériques (DAF, CFO, DRH, contrôle de gestion)
 * sont exclus : les lier partout serait du bruit.
 */

export const GLOSSARY_AUTHOR = {
  // Attribution à valider (2026-09-01) — les définitions relèvent du métier
  // de CFO ; Sébastien Doat signe déjà les pages métier et fiscalité.
  name: "Sébastien Doat",
  url: "/a-propos/sebastien-doat",
} as const;

/** Fiches construites en avril 2026 ; revues (définition en tête, termes
 *  liés, attribution) le 1er septembre 2026. */
export const GLOSSARY_PUBLISHED = "2026-04-15";
export const GLOSSARY_MODIFIED = "2026-09-01";
export const GLOSSARY_MODIFIED_LABEL: Record<Locale, string> = {
  fr: "1er septembre 2026",
  en: "1 September 2026",
  es: "1 de septiembre de 2026",
};

/** Termes liés, par fiche — curation éditoriale, pas de similarité automatique. */
const RELATED: Record<string, string[]> = {
  ebitda: ["run-rate", "cash-burn-runway", "besoin-fonds-roulement-bfr", "controle-de-gestion"],
  bfr: ["cash-burn-runway", "ebitda", "controle-de-gestion"],
  "besoin-fonds-roulement-bfr": ["cash-burn-runway", "ebitda", "controle-de-gestion"],
  "cash-burn-runway": ["besoin-fonds-roulement-bfr", "arr-mrr", "churn-rate", "cfo"],
  "cac-ltv": ["arr-mrr", "churn-rate", "run-rate"],
  "arr-mrr": ["run-rate", "churn-rate", "cac-ltv"],
  "churn-rate": ["arr-mrr", "cac-ltv", "cash-burn-runway"],
  "run-rate": ["arr-mrr", "ebitda", "cash-burn-runway"],
  "bspce-bsa": ["cfo", "daf", "fractional-cfo"],
  cfo: ["daf", "fractional-cfo", "controle-de-gestion", "bspce-bsa"],
  daf: ["cfo", "fractional-cfo", "drh-externalise", "controle-de-gestion"],
  "drh-externalise": ["daf", "cfo"],
  "controle-de-gestion": ["daf", "ebitda", "besoin-fonds-roulement-bfr", "run-rate"],
  "fractional-cfo": ["cfo", "daf", "cash-burn-runway"],
};

export function getRelatedGlossary(locale: Locale, slug: string): { slug: string; title: string }[] {
  const served = new Map(getGlossaryPages(locale).map((p) => [p.slug, p.title]));
  return (RELATED[slug] ?? [])
    .map((s) => {
      // Cas croisé EN : la fiche BFR anglaise vit sous le slug court `bfr`.
      const key = locale === "en" && s === "besoin-fonds-roulement-bfr" ? "bfr" : s;
      const title = served.get(key);
      return title ? { slug: key, title } : null;
    })
    .filter((x): x is { slug: string; title: string } => x !== null)
    .slice(0, 4);
}

/**
 * Motifs d'auto-lien. L'ordre compte : un article qui parle de « burn rate »
 * et de « runway » n'obtient qu'un lien vers la fiche cash-burn-runway.
 */
export const GLOSSARY_TERM_PATTERNS: { slug: string; re: RegExp }[] = [
  { slug: "ebitda", re: /\bEBITDA\b/ },
  { slug: "besoin-fonds-roulement-bfr", re: /\bBFR\b/ },
  { slug: "cash-burn-runway", re: /\b(?:cash[- ]burn|burn[- ]rate|runway)\b/i },
  { slug: "cac-ltv", re: /\b(?:CAC|LTV)\b/ },
  { slug: "arr-mrr", re: /\b(?:ARR|MRR)\b/ },
  { slug: "churn-rate", re: /\bchurn(?: rate)?\b/i },
  { slug: "run-rate", re: /\brun[- ]rate\b/i },
  { slug: "bspce-bsa", re: /\bBSPCE\b/ },
];

const MAX_LINKS_PER_ARTICLE = 6;
const NO_LINK_TAGS = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "script", "style", "summary", "code", "pre"]);

/** Termes de la fiche `slug` présents dans un HTML — pour « où ce terme apparaît ». */
export function htmlMentionsGlossary(html: string, slug: string): boolean {
  const p = GLOSSARY_TERM_PATTERNS.find((t) => t.slug === slug);
  if (!p) return false;
  const text = html.replace(/<[^>]+>/g, " ");
  return p.re.test(text);
}

export function linkGlossaryTerms(html: string, locale: Locale = "fr"): string {
  if (!html || locale !== "fr") return html;
  const pending = new Map(GLOSSARY_TERM_PATTERNS.map((t) => [t.slug, t.re]));
  let placed = 0;
  // Pile des balises ouvertes interdites : on ne lie que dans du texte nu,
  // hors titres, liens, code et scripts.
  const blocked: string[] = [];
  const tokens = html.split(/(<[^>]+>)/g);
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.startsWith("<")) {
      const m = tok.match(/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/);
      if (!m) continue;
      const tag = m[2].toLowerCase();
      if (!NO_LINK_TAGS.has(tag)) continue;
      if (m[1] === "/") {
        const idx = blocked.lastIndexOf(tag);
        if (idx >= 0) blocked.splice(idx, 1);
      } else if (!tok.endsWith("/>")) {
        blocked.push(tag);
      }
      continue;
    }
    if (blocked.length > 0 || placed >= MAX_LINKS_PER_ARTICLE || !tok.trim()) continue;
    for (const [slug, re] of pending) {
      const found = re.exec(tok);
      if (!found) continue;
      const before = tok.slice(0, found.index);
      const after = tok.slice(found.index + found[0].length);
      tokens[i] = `${before}<a href="/ressources/glossaire/${slug}" class="glossary-link">${found[0]}</a>${after}`;
      pending.delete(slug);
      placed++;
      break; // un seul lien par segment de texte, pour ne pas imbriquer
    }
  }
  return tokens.join("");
}
