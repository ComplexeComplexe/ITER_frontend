/**
 * Generate editorial blog covers (1200×900 SVG) for every article on
 * /ressources/blog. Each cover follows the magazine-style design
 * mocked in `iter-advisors-blog-designs.html`:
 *
 *  - paper-white background
 *  - top masthead bar with vol/issue/kicker
 *  - category badge + huge serif title (Georgia) with letter-spacing
 *  - italic subtitle
 *  - illustration block on the right with a category-tinted backdrop
 *  - bottom rule with brand stamp + blog URL
 *
 * Output: `public/images/blog/covers/<slug>.svg`
 *
 * Companion: writes `lib/blog-covers.ts` — a slug→{cover,alt} map that
 * the listing helper and the dedicated page.tsx files import directly,
 * so we never have to repeat the path / alt text at every call site.
 *
 * Usage:
 *   npx tsx scripts/generate-blog-covers.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

// ─── Article catalogue ────────────────────────────────────────────────
// Each article has a French cover title (kept short — the design wraps
// at ~16-18 chars per line), a French subtitle (italic), the category
// it lives in, a kicker (small overline label) and the icon key used
// for the right-hand pictogram. `alt` is the accessibility-grade alt
// text rendered by `<Image>` on the blog listing and the hero of the
// dedicated page.

type Cat =
  | "Fiscalite"
  | "DAF externalise"
  | "Outils finance"
  | "Levee de fonds"
  | "Tresorerie"
  | "RH"
  | "Cas client";

interface Article {
  n: number;
  slug: string;
  title: string;
  subtitle: string;
  cat: Cat;
  kicker: string;
  iconKey: string;
  alt: string;
}

const ARTICLES: Article[] = [
  {
    n: 1,
    slug: "impot-revenu-espagne",
    title: "Impot sur le revenu en Espagne",
    subtitle: "Guide complet 2026 pour expatries et entreprises",
    cat: "Fiscalite",
    kicker: "GUIDE",
    iconKey: "tax",
    alt: "Couverture editoriale Iter Advisors — Impot sur le revenu en Espagne, guide complet 2026 pour expatries et entreprises",
  },
  {
    n: 2,
    slug: "externaliser-comptabilite-guide",
    title: "Externaliser sa comptabilite",
    subtitle: "Guide pratique pour startups et PME",
    cat: "DAF externalise",
    kicker: "GUIDE",
    iconKey: "book",
    alt: "Couverture editoriale Iter Advisors — Externaliser sa comptabilite, guide pratique pour startups et PME",
  },
  {
    n: 3,
    slug: "quand-embaucher-daf-externalise-5-signes",
    title: "Quand embaucher un DAF externalise",
    subtitle: "5 signaux qui ne trompent pas",
    cat: "DAF externalise",
    kicker: "PLAYBOOK",
    iconKey: "signs",
    alt: "Couverture editoriale Iter Advisors — Quand embaucher un DAF externalise, 5 signaux qui ne trompent pas",
  },
  {
    n: 4,
    slug: "daf-externalise-barcelone-guide-startups-espagnoles",
    title: "DAF externalise a Barcelone",
    subtitle: "Le guide pour les startups espagnoles",
    cat: "DAF externalise",
    kicker: "CITY GUIDE",
    iconKey: "city",
    alt: "Couverture editoriale Iter Advisors — DAF externalise a Barcelone, le guide pour les startups espagnoles",
  },
  {
    n: 5,
    slug: "cout-daf-externalise-2026-tarifs-par-mission",
    title: "Cout d'un DAF externalise en 2026",
    subtitle: "Tarifs detailles par mission",
    cat: "DAF externalise",
    kicker: "TARIFS",
    iconKey: "euro",
    alt: "Couverture editoriale Iter Advisors — Cout d'un DAF externalise en 2026, tarifs detailles par mission",
  },
  {
    n: 6,
    slug: "daf-externalise-vs-expert-comptable",
    title: "DAF externalise vs expert-comptable",
    subtitle: "Quelle est la vraie difference ?",
    cat: "DAF externalise",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — DAF externalise vs expert-comptable, quelle est la vraie difference",
  },
  {
    n: 7,
    slug: "pennylane-vs-sage-comparatif-40-deploiements",
    title: "Pennylane vs Sage",
    subtitle: "Notre comparatif apres 40 deploiements",
    cat: "Outils finance",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — Pennylane vs Sage, comparatif apres 40 deploiements",
  },
  {
    n: 8,
    slug: "agicap-vs-fygr-outil-tresorerie",
    title: "Agicap vs Fygr",
    subtitle: "Quel outil de tresorerie choisir ?",
    cat: "Outils finance",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — Agicap vs Fygr, quel outil de tresorerie choisir",
  },
  {
    n: 9,
    slug: "stack-financier-saas-series-a",
    title: "Le stack financier ideal SaaS Series A",
    subtitle: "De la compta a la FP&A en 5 couches",
    cat: "Outils finance",
    kicker: "STACK",
    iconKey: "stack",
    alt: "Couverture editoriale Iter Advisors — Le stack financier ideal pour une SaaS Series A en 5 couches",
  },
  {
    n: 10,
    slug: "data-room-checklist-levee-de-fonds",
    title: "La checklist data room",
    subtitle: "Tout ce que les investisseurs attendent",
    cat: "Levee de fonds",
    kicker: "CHECKLIST",
    iconKey: "folder",
    alt: "Couverture editoriale Iter Advisors — Checklist data room levee de fonds, tout ce que les investisseurs attendent",
  },
  {
    n: 11,
    slug: "term-sheet-negocier-clauses-cles",
    title: "Negocier sa term sheet",
    subtitle: "Les clauses cles a defendre",
    cat: "Levee de fonds",
    kicker: "TACTIQUE",
    iconKey: "handshake",
    alt: "Couverture editoriale Iter Advisors — Negocier sa term sheet, les clauses cles a defendre",
  },
  {
    n: 12,
    slug: "due-diligence-financiere-investisseurs",
    title: "La due diligence financiere",
    subtitle: "Ce que les investisseurs verifient vraiment",
    cat: "Levee de fonds",
    kicker: "DEEP DIVE",
    iconKey: "magnify",
    alt: "Couverture editoriale Iter Advisors — Due diligence financiere, ce que les investisseurs verifient vraiment",
  },
  {
    n: 13,
    slug: "reduire-bfr-7-leviers-actionnables",
    title: "Reduire son BFR",
    subtitle: "7 leviers actionnables qui changent tout",
    cat: "Tresorerie",
    kicker: "LEVIERS",
    iconKey: "levers",
    alt: "Couverture editoriale Iter Advisors — Reduire son BFR, 7 leviers actionnables",
  },
  {
    n: 14,
    slug: "cash-burn-calculer-runway-anticiper-levee",
    title: "Cash burn et runway",
    subtitle: "Quand lever, avant qu'il ne soit trop tard",
    cat: "Tresorerie",
    kicker: "METRIQUE",
    iconKey: "flame",
    alt: "Couverture editoriale Iter Advisors — Cash burn et runway, quand lever des fonds avant qu'il ne soit trop tard",
  },
  {
    n: 15,
    slug: "tableau-de-bord-financier-startup-12-kpis",
    title: "Le tableau de bord startup",
    subtitle: "Les 12 KPIs que tout fondateur doit suivre",
    cat: "Outils finance",
    kicker: "DASHBOARD",
    iconKey: "dashboard",
    alt: "Couverture editoriale Iter Advisors — Tableau de bord financier startup, les 12 KPIs a suivre",
  },
  {
    n: 16,
    slug: "drh-externalise-quand-et-pourquoi",
    title: "Le DRH externalise",
    subtitle: "Quand y faire appel, et pourquoi ca paye",
    cat: "RH",
    kicker: "GUIDE",
    iconKey: "people",
    alt: "Couverture editoriale Iter Advisors — Le DRH externalise, quand y faire appel et pourquoi ca paye",
  },
  {
    n: 17,
    slug: "payfit-vs-silae-comparatif-pme",
    title: "PayFit vs Silae",
    subtitle: "Le comparatif pour PME en croissance",
    cat: "RH",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — PayFit vs Silae, comparatif pour PME en croissance",
  },
  {
    n: 18,
    slug: "flux-de-tresorerie",
    title: "Flux de tresorerie",
    subtitle: "Definition, importance et indicateurs cles",
    cat: "Tresorerie",
    kicker: "FONDAMENTAUX",
    iconKey: "wave",
    alt: "Couverture editoriale Iter Advisors — Flux de tresorerie, definition, importance et indicateurs cles",
  },
  {
    n: 19,
    slug: "cas-etude-happy-scribe",
    title: "Dans les coulisses de Happy Scribe",
    subtitle: "Comment une scale-up a structure sa finance",
    cat: "Cas client",
    kicker: "CAS CLIENT",
    iconKey: "trophy",
    alt: "Couverture editoriale Iter Advisors — Cas client Happy Scribe, comment une scale-up a structure sa finance",
  },
  {
    n: 20,
    slug: "externalisation-comptable",
    title: "Externalisation comptable en pratique",
    subtitle: "Un guide pragmatique pour dirigeants",
    cat: "DAF externalise",
    kicker: "FIELD GUIDE",
    iconKey: "book",
    alt: "Couverture editoriale Iter Advisors — Externalisation comptable en pratique, guide pragmatique pour dirigeants",
  },
  {
    n: 21,
    slug: "cout-daf-externalise-tarifs-prix-2026",
    title: "Tarifs DAF externalise 2026",
    subtitle: "Grille de prix, TJM et calcul du ROI",
    cat: "DAF externalise",
    kicker: "TARIFS",
    iconKey: "euro",
    alt: "Couverture editoriale Iter Advisors — Tarifs DAF externalise 2026, grille de prix, TJM et calcul du ROI",
  },
  {
    n: 22,
    slug: "daf-externalise-vs-daf-salarie",
    title: "DAF externalise vs DAF salarie",
    subtitle: "Quel modele pour quel stade ?",
    cat: "DAF externalise",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — DAF externalise vs DAF salarie, quel modele pour quel stade",
  },
  {
    n: 23,
    slug: "checklist-due-diligence-levee-de-fonds",
    title: "Checklist due diligence financiere",
    subtitle: "Aborder sa levee parfaitement prepare",
    cat: "Levee de fonds",
    kicker: "CHECKLIST",
    iconKey: "checklist",
    alt: "Couverture editoriale Iter Advisors — Checklist due diligence financiere pour levee de fonds",
  },
  {
    n: 24,
    slug: "daf-drh-externalises-synergie",
    title: "DAF + DRH externalises",
    subtitle: "Pourquoi le duo change tout",
    cat: "DAF externalise",
    kicker: "THESE",
    iconKey: "synergy",
    alt: "Couverture editoriale Iter Advisors — DAF et DRH externalises, pourquoi le duo change tout",
  },
  {
    n: 25,
    slug: "la-modernisation-du-role-de-cfo",
    title: "Le CFO moderne",
    subtitle: "Comment le metier a ete reecrit",
    cat: "DAF externalise",
    kicker: "ESSAI",
    iconKey: "chair",
    alt: "Couverture editoriale Iter Advisors — Le CFO moderne, comment le metier a ete reecrit",
  },
  {
    n: 26,
    slug: "les-10-outils-pour-les-cfos-en-start-up",
    title: "10 outils pour les CFOs startup",
    subtitle: "La boite a outils, classee et expliquee",
    cat: "Outils finance",
    kicker: "BOITE A OUTILS",
    iconKey: "toolkit",
    alt: "Couverture editoriale Iter Advisors — 10 outils pour les CFOs startup, boite a outils classee et expliquee",
  },
  {
    n: 27,
    slug: "les-10-outils-pour-cfos-startup",
    title: "10 outils essentiels pour CFO startup",
    subtitle: "La shortlist du praticien",
    cat: "Outils finance",
    kicker: "BOITE A OUTILS",
    iconKey: "toolkit",
    alt: "Couverture editoriale Iter Advisors — 10 outils essentiels pour CFO startup, la shortlist du praticien",
  },
  // ── Dedicated page.tsx articles that also need an editorial cover ──
  {
    n: 28,
    slug: "daf-externalise-guide",
    title: "DAF externalise",
    subtitle: "Le guide complet, tarifs et cas client",
    cat: "DAF externalise",
    kicker: "GUIDE",
    iconKey: "book",
    alt: "Couverture editoriale Iter Advisors — Le guide complet du DAF externalise, tarifs et cas client",
  },
  {
    n: 29,
    slug: "essentiels-outils-tech-finance",
    title: "Outils tech essentiels pour la finance",
    subtitle: "La stack qui fait la difference en 2026",
    cat: "Outils finance",
    kicker: "STACK",
    iconKey: "stack",
    alt: "Couverture editoriale Iter Advisors — Les outils tech essentiels pour la finance, la stack 2026",
  },
  {
    n: 30,
    slug: "ia-et-automatisation-des-taches-repetitives",
    title: "IA et automatisation finance",
    subtitle: "Repenser les taches repetitives en 2026",
    cat: "Outils finance",
    kicker: "TENDANCE",
    iconKey: "dashboard",
    alt: "Couverture editoriale Iter Advisors — IA et automatisation finance, repenser les taches repetitives",
  },
  {
    n: 31,
    slug: "levee-de-fonds-guide",
    title: "Lever des fonds",
    subtitle: "Le guide complet pour fondateurs",
    cat: "Levee de fonds",
    kicker: "GUIDE",
    iconKey: "handshake",
    alt: "Couverture editoriale Iter Advisors — Lever des fonds, le guide complet pour fondateurs",
  },
  {
    n: 32,
    slug: "organiser-sa-direction-financiere",
    title: "Organiser sa direction financiere",
    subtitle: "Le manuel de structuration en 2026",
    cat: "DAF externalise",
    kicker: "MANUEL",
    iconKey: "chair",
    alt: "Couverture editoriale Iter Advisors — Organiser sa direction financiere, le manuel de structuration",
  },
  {
    n: 33,
    slug: "regimes-fiscaux-france-vs-espagne",
    title: "Regimes fiscaux France vs Espagne",
    subtitle: "Le comparatif fiscal pour dirigeants",
    cat: "Fiscalite",
    kicker: "COMPARATIF",
    iconKey: "vs",
    alt: "Couverture editoriale Iter Advisors — Regimes fiscaux France vs Espagne, le comparatif pour dirigeants",
  },
];

// ─── Brand & category palette ─────────────────────────────────────────

const BRAND = "#6C3AED";
const INK = "#0F1740";
const PAPER = "#FFFFFF";

const CAT_COLORS: Record<Cat, { bg: string; fg: string; accent: string }> = {
  "Fiscalite": { bg: "#FFE6E1", fg: "#B83228", accent: "#E94B4B" },
  "DAF externalise": { bg: "#EFE7FF", fg: "#3A1C8A", accent: "#6C3AED" },
  "Outils finance": { bg: "#E5EBFF", fg: "#1E3A8A", accent: "#3057E1" },
  "Levee de fonds": { bg: "#FFE8D4", fg: "#9A5300", accent: "#E08530" },
  "Tresorerie": { bg: "#D4F1EC", fg: "#0E5E54", accent: "#2EC4B6" },
  "RH": { bg: "#DDEEDC", fg: "#1F5A3C", accent: "#2E7D5B" },
  "Cas client": { bg: "#FAEDC9", fg: "#7A5A0E", accent: "#C9A227" },
};

// ─── Icon library — minimal pictograms drawn from primitive shapes ────

function icon(key: string, color: string, size: number): string {
  const s = size;
  const c = color;
  const sw = 2.4;
  const ic: Record<string, string> = {
    tax: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.2}" y="${s * 0.15}" width="${s * 0.6}" height="${s * 0.7}" rx="6"/>
      <line x1="${s * 0.3}" y1="${s * 0.35}" x2="${s * 0.7}" y2="${s * 0.35}"/>
      <line x1="${s * 0.3}" y1="${s * 0.5}" x2="${s * 0.7}" y2="${s * 0.5}"/>
      <line x1="${s * 0.3}" y1="${s * 0.65}" x2="${s * 0.55}" y2="${s * 0.65}"/>
    </g>
    <text x="${s * 0.78}" y="${s * 0.28}" font-family="Georgia, serif" font-size="${s * 0.18}" font-style="italic" fill="${c}">%</text>`,
    book: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.5} ${s * 0.25} C ${s * 0.3} ${s * 0.18}, ${s * 0.2} ${s * 0.22}, ${s * 0.2} ${s * 0.25} L ${s * 0.2} ${s * 0.78} C ${s * 0.2} ${s * 0.75}, ${s * 0.3} ${s * 0.71}, ${s * 0.5} ${s * 0.78}"/>
      <path d="M ${s * 0.5} ${s * 0.25} C ${s * 0.7} ${s * 0.18}, ${s * 0.8} ${s * 0.22}, ${s * 0.8} ${s * 0.25} L ${s * 0.8} ${s * 0.78} C ${s * 0.8} ${s * 0.75}, ${s * 0.7} ${s * 0.71}, ${s * 0.5} ${s * 0.78}"/>
      <line x1="${s * 0.5}" y1="${s * 0.25}" x2="${s * 0.5}" y2="${s * 0.78}"/>
    </g>`,
    signs: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <line x1="${s * 0.5}" y1="${s * 0.1}" x2="${s * 0.5}" y2="${s * 0.9}"/>
      <path d="M ${s * 0.5} ${s * 0.2} L ${s * 0.78} ${s * 0.2} L ${s * 0.85} ${s * 0.28} L ${s * 0.78} ${s * 0.36} L ${s * 0.5} ${s * 0.36} Z"/>
      <path d="M ${s * 0.5} ${s * 0.42} L ${s * 0.22} ${s * 0.42} L ${s * 0.15} ${s * 0.5} L ${s * 0.22} ${s * 0.58} L ${s * 0.5} ${s * 0.58} Z"/>
      <path d="M ${s * 0.5} ${s * 0.64} L ${s * 0.72} ${s * 0.64} L ${s * 0.79} ${s * 0.72} L ${s * 0.72} ${s * 0.8} L ${s * 0.5} ${s * 0.8} Z"/>
    </g>`,
    city: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.15}" y="${s * 0.45}" width="${s * 0.18}" height="${s * 0.4}"/>
      <rect x="${s * 0.4}" y="${s * 0.25}" width="${s * 0.2}" height="${s * 0.6}"/>
      <rect x="${s * 0.67}" y="${s * 0.35}" width="${s * 0.18}" height="${s * 0.5}"/>
      <line x1="${s * 0.5}" y1="${s * 0.15}" x2="${s * 0.5}" y2="${s * 0.25}"/>
      <circle cx="${s * 0.5}" cy="${s * 0.13}" r="${s * 0.025}" fill="${c}"/>
      <line x1="${s * 0.1}" y1="${s * 0.85}" x2="${s * 0.9}" y2="${s * 0.85}"/>
    </g>`,
    euro: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="${s * 0.5}" cy="${s * 0.5}" r="${s * 0.32}"/>
      <path d="M ${s * 0.62} ${s * 0.32} C ${s * 0.5} ${s * 0.28}, ${s * 0.36} ${s * 0.36}, ${s * 0.36} ${s * 0.5} C ${s * 0.36} ${s * 0.64}, ${s * 0.5} ${s * 0.72}, ${s * 0.62} ${s * 0.68}"/>
      <line x1="${s * 0.3}" y1="${s * 0.45}" x2="${s * 0.5}" y2="${s * 0.45}"/>
      <line x1="${s * 0.3}" y1="${s * 0.55}" x2="${s * 0.48}" y2="${s * 0.55}"/>
    </g>`,
    vs: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="${s * 0.3}" cy="${s * 0.5}" r="${s * 0.2}"/>
      <circle cx="${s * 0.7}" cy="${s * 0.5}" r="${s * 0.2}"/>
    </g>
    <text x="${s * 0.5}" y="${s * 0.58}" font-family="Georgia, serif" font-style="italic" font-size="${s * 0.22}" fill="${c}" text-anchor="middle">vs</text>`,
    stack: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.2}" y="${s * 0.2}" width="${s * 0.6}" height="${s * 0.12}" rx="3"/>
      <rect x="${s * 0.2}" y="${s * 0.37}" width="${s * 0.6}" height="${s * 0.12}" rx="3"/>
      <rect x="${s * 0.2}" y="${s * 0.54}" width="${s * 0.6}" height="${s * 0.12}" rx="3"/>
      <rect x="${s * 0.2}" y="${s * 0.71}" width="${s * 0.6}" height="${s * 0.12}" rx="3"/>
      <circle cx="${s * 0.28}" cy="${s * 0.26}" r="${s * 0.018}" fill="${c}"/>
      <circle cx="${s * 0.28}" cy="${s * 0.43}" r="${s * 0.018}" fill="${c}"/>
      <circle cx="${s * 0.28}" cy="${s * 0.6}" r="${s * 0.018}" fill="${c}"/>
      <circle cx="${s * 0.28}" cy="${s * 0.77}" r="${s * 0.018}" fill="${c}"/>
    </g>`,
    folder: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.18} ${s * 0.32} L ${s * 0.42} ${s * 0.32} L ${s * 0.48} ${s * 0.4} L ${s * 0.82} ${s * 0.4} L ${s * 0.82} ${s * 0.78} L ${s * 0.18} ${s * 0.78} Z"/>
      <line x1="${s * 0.3}" y1="${s * 0.55}" x2="${s * 0.7}" y2="${s * 0.55}"/>
      <line x1="${s * 0.3}" y1="${s * 0.66}" x2="${s * 0.6}" y2="${s * 0.66}"/>
    </g>`,
    handshake: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.18} ${s * 0.42} L ${s * 0.36} ${s * 0.32} L ${s * 0.5} ${s * 0.42} L ${s * 0.62} ${s * 0.34} L ${s * 0.82} ${s * 0.46}"/>
      <path d="M ${s * 0.32} ${s * 0.5} L ${s * 0.48} ${s * 0.62} L ${s * 0.58} ${s * 0.56} L ${s * 0.7} ${s * 0.62}"/>
      <line x1="${s * 0.18}" y1="${s * 0.42}" x2="${s * 0.12}" y2="${s * 0.64}"/>
      <line x1="${s * 0.82}" y1="${s * 0.46}" x2="${s * 0.88}" y2="${s * 0.66}"/>
    </g>`,
    magnify: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="${s * 0.42}" cy="${s * 0.42}" r="${s * 0.22}"/>
      <line x1="${s * 0.58}" y1="${s * 0.58}" x2="${s * 0.82}" y2="${s * 0.82}"/>
      <line x1="${s * 0.32}" y1="${s * 0.42}" x2="${s * 0.52}" y2="${s * 0.42}"/>
      <line x1="${s * 0.42}" y1="${s * 0.32}" x2="${s * 0.42}" y2="${s * 0.52}"/>
    </g>`,
    levers: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <line x1="${s * 0.18}" y1="${s * 0.8}" x2="${s * 0.82}" y2="${s * 0.8}"/>
      <line x1="${s * 0.28}" y1="${s * 0.8}" x2="${s * 0.28}" y2="${s * 0.5}"/>
      <line x1="${s * 0.5}" y1="${s * 0.8}" x2="${s * 0.5}" y2="${s * 0.3}"/>
      <line x1="${s * 0.72}" y1="${s * 0.8}" x2="${s * 0.72}" y2="${s * 0.6}"/>
      <circle cx="${s * 0.28}" cy="${s * 0.5}" r="${s * 0.035}" fill="${c}"/>
      <circle cx="${s * 0.5}" cy="${s * 0.3}" r="${s * 0.035}" fill="${c}"/>
      <circle cx="${s * 0.72}" cy="${s * 0.6}" r="${s * 0.035}" fill="${c}"/>
    </g>`,
    flame: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.5} ${s * 0.85} C ${s * 0.25} ${s * 0.78}, ${s * 0.25} ${s * 0.55}, ${s * 0.42} ${s * 0.42} C ${s * 0.4} ${s * 0.5}, ${s * 0.46} ${s * 0.55}, ${s * 0.5} ${s * 0.5} C ${s * 0.45} ${s * 0.32}, ${s * 0.55} ${s * 0.2}, ${s * 0.6} ${s * 0.15} C ${s * 0.58} ${s * 0.32}, ${s * 0.72} ${s * 0.4}, ${s * 0.72} ${s * 0.58} C ${s * 0.72} ${s * 0.74}, ${s * 0.62} ${s * 0.84}, ${s * 0.5} ${s * 0.85} Z"/>
    </g>`,
    dashboard: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.15}" y="${s * 0.2}" width="${s * 0.7}" height="${s * 0.5}" rx="4"/>
      <line x1="${s * 0.25}" y1="${s * 0.55}" x2="${s * 0.35}" y2="${s * 0.4}"/>
      <line x1="${s * 0.35}" y1="${s * 0.4}" x2="${s * 0.45}" y2="${s * 0.48}"/>
      <line x1="${s * 0.45}" y1="${s * 0.48}" x2="${s * 0.6}" y2="${s * 0.32}"/>
      <line x1="${s * 0.6}" y1="${s * 0.32}" x2="${s * 0.75}" y2="${s * 0.38}"/>
      <line x1="${s * 0.25}" y1="${s * 0.62}" x2="${s * 0.75}" y2="${s * 0.62}" stroke-dasharray="2 3"/>
      <line x1="${s * 0.5}" y1="${s * 0.7}" x2="${s * 0.5}" y2="${s * 0.8}"/>
      <line x1="${s * 0.4}" y1="${s * 0.8}" x2="${s * 0.6}" y2="${s * 0.8}"/>
    </g>`,
    people: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="${s * 0.32}" cy="${s * 0.35}" r="${s * 0.1}"/>
      <path d="M ${s * 0.18} ${s * 0.75} C ${s * 0.18} ${s * 0.58}, ${s * 0.46} ${s * 0.58}, ${s * 0.46} ${s * 0.75}"/>
      <circle cx="${s * 0.65}" cy="${s * 0.32}" r="${s * 0.08}"/>
      <path d="M ${s * 0.55} ${s * 0.72} C ${s * 0.55} ${s * 0.55}, ${s * 0.78} ${s * 0.55}, ${s * 0.78} ${s * 0.72}"/>
    </g>`,
    wave: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.1} ${s * 0.5} C ${s * 0.22} ${s * 0.32}, ${s * 0.32} ${s * 0.32}, ${s * 0.44} ${s * 0.5} C ${s * 0.56} ${s * 0.68}, ${s * 0.66} ${s * 0.68}, ${s * 0.78} ${s * 0.5} C ${s * 0.82} ${s * 0.44}, ${s * 0.86} ${s * 0.46}, ${s * 0.9} ${s * 0.5}"/>
      <path d="M ${s * 0.1} ${s * 0.7} C ${s * 0.22} ${s * 0.52}, ${s * 0.32} ${s * 0.52}, ${s * 0.44} ${s * 0.7} C ${s * 0.56} ${s * 0.88}, ${s * 0.66} ${s * 0.88}, ${s * 0.78} ${s * 0.7} C ${s * 0.82} ${s * 0.64}, ${s * 0.86} ${s * 0.66}, ${s * 0.9} ${s * 0.7}" opacity="0.5"/>
    </g>`,
    trophy: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M ${s * 0.3} ${s * 0.2} L ${s * 0.7} ${s * 0.2} L ${s * 0.68} ${s * 0.5} C ${s * 0.66} ${s * 0.6}, ${s * 0.55} ${s * 0.62}, ${s * 0.5} ${s * 0.62} C ${s * 0.45} ${s * 0.62}, ${s * 0.34} ${s * 0.6}, ${s * 0.32} ${s * 0.5} Z"/>
      <path d="M ${s * 0.3} ${s * 0.28} C ${s * 0.2} ${s * 0.28}, ${s * 0.18} ${s * 0.42}, ${s * 0.32} ${s * 0.45}"/>
      <path d="M ${s * 0.7} ${s * 0.28} C ${s * 0.8} ${s * 0.28}, ${s * 0.82} ${s * 0.42}, ${s * 0.68} ${s * 0.45}"/>
      <line x1="${s * 0.5}" y1="${s * 0.62}" x2="${s * 0.5}" y2="${s * 0.75}"/>
      <line x1="${s * 0.38}" y1="${s * 0.82}" x2="${s * 0.62}" y2="${s * 0.82}"/>
      <line x1="${s * 0.42}" y1="${s * 0.75}" x2="${s * 0.58}" y2="${s * 0.75}"/>
    </g>`,
    checklist: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.22}" y="${s * 0.18}" width="${s * 0.56}" height="${s * 0.66}" rx="4"/>
      <line x1="${s * 0.32}" y1="${s * 0.33}" x2="${s * 0.7}" y2="${s * 0.33}"/>
      <line x1="${s * 0.32}" y1="${s * 0.48}" x2="${s * 0.66}" y2="${s * 0.48}"/>
      <line x1="${s * 0.32}" y1="${s * 0.63}" x2="${s * 0.62}" y2="${s * 0.63}"/>
      <path d="M ${s * 0.32} ${s * 0.33} L ${s * 0.36} ${s * 0.36} L ${s * 0.42} ${s * 0.3}" stroke-width="2.8"/>
      <path d="M ${s * 0.32} ${s * 0.48} L ${s * 0.36} ${s * 0.51} L ${s * 0.42} ${s * 0.45}" stroke-width="2.8"/>
    </g>`,
    synergy: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="${s * 0.36}" cy="${s * 0.5}" r="${s * 0.18}"/>
      <circle cx="${s * 0.64}" cy="${s * 0.5}" r="${s * 0.18}"/>
      <circle cx="${s * 0.5}" cy="${s * 0.5}" r="${s * 0.04}" fill="${c}"/>
    </g>`,
    chair: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.32}" y="${s * 0.2}" width="${s * 0.36}" height="${s * 0.32}" rx="4"/>
      <rect x="${s * 0.28}" y="${s * 0.52}" width="${s * 0.44}" height="${s * 0.08}" rx="2"/>
      <line x1="${s * 0.35}" y1="${s * 0.6}" x2="${s * 0.32}" y2="${s * 0.82}"/>
      <line x1="${s * 0.65}" y1="${s * 0.6}" x2="${s * 0.68}" y2="${s * 0.82}"/>
      <line x1="${s * 0.2}" y1="${s * 0.82}" x2="${s * 0.8}" y2="${s * 0.82}"/>
    </g>`,
    toolkit: `<g stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="${s * 0.2}" y="${s * 0.4}" width="${s * 0.6}" height="${s * 0.42}" rx="4"/>
      <path d="M ${s * 0.38} ${s * 0.4} L ${s * 0.38} ${s * 0.3} L ${s * 0.62} ${s * 0.3} L ${s * 0.62} ${s * 0.4}"/>
      <line x1="${s * 0.2}" y1="${s * 0.55}" x2="${s * 0.8}" y2="${s * 0.55}"/>
      <rect x="${s * 0.46}" y="${s * 0.5}" width="${s * 0.08}" height="${s * 0.1}" rx="1"/>
    </g>`,
  };
  return ic[key] || ic.book;
}

// ─── Text wrap utility (greedy fit by char count) ─────────────────────

function splitTitle(t: string, maxPerLine = 16): string[] {
  const words = t.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxPerLine && cur.length > 0) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur += " " + w;
    }
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function escapeXml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── 4:3 cover SVG (1200×900) — the format the listing cards expect ──

function coverSvg(a: Article): string {
  const c = CAT_COLORS[a.cat];
  const titleLines = splitTitle(a.title, 17);
  const subLines = splitTitle(a.subtitle, 36);
  const titleY = 230;
  const titleLineH = 78;
  const titleEndY = titleY + (titleLines.length - 1) * titleLineH;
  const subY = titleEndY + 52;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <rect width="1200" height="900" fill="${PAPER}"/>

  <!-- masthead -->
  <line x1="60" y1="48" x2="1140" y2="48" stroke="${INK}" stroke-width="1" opacity="0.15"/>
  <text x="60" y="38" fill="${INK}" font-family="Georgia, serif" font-size="13" letter-spacing="3">ITER ADVISORS</text>
  <text x="1140" y="38" fill="${INK}" font-family="Georgia, serif" font-size="13" letter-spacing="3" text-anchor="end">VOL. 01 · 2026 · N° ${String(a.n).padStart(2, "0")}</text>
  <line x1="60" y1="68" x2="1140" y2="68" stroke="${INK}" stroke-width="3"/>

  <!-- kicker + category badge -->
  <text x="60" y="115" fill="${c.accent}" font-family="-apple-system, Inter, sans-serif" font-size="13" font-weight="600" letter-spacing="3">${escapeXml(a.kicker)}</text>
  <rect x="60" y="135" width="${a.cat.length * 9.5 + 32}" height="34" rx="17" fill="${c.bg}"/>
  <text x="${60 + (a.cat.length * 9.5 + 32) / 2}" y="157" fill="${c.fg}" font-family="-apple-system, Inter, sans-serif" font-size="12" font-weight="600" letter-spacing="1.6" text-anchor="middle">${escapeXml(a.cat.toUpperCase())}</text>

  <!-- huge serif title -->
  <g font-family="Georgia, 'Times New Roman', serif" fill="${INK}">
    ${titleLines.map((l, i) => `<text x="60" y="${titleY + i * titleLineH}" font-size="72" font-weight="500" letter-spacing="-2">${escapeXml(l)}</text>`).join("\n    ")}
  </g>

  <!-- accent rule under title -->
  <line x1="60" y1="${titleEndY + 18}" x2="120" y2="${titleEndY + 18}" stroke="${c.accent}" stroke-width="4"/>

  <!-- italic subtitle -->
  <g font-family="Georgia, serif" fill="#4B5563" font-style="italic">
    ${subLines.map((l, i) => `<text x="60" y="${subY + i * 32}" font-size="24" font-weight="400">${escapeXml(l)}</text>`).join("\n    ")}
  </g>

  <!-- illustration block, right -->
  <g transform="translate(780 220)">
    <rect x="0" y="0" width="360" height="360" rx="8" fill="${c.bg}"/>
    <g transform="translate(70 70)">
      ${icon(a.iconKey, c.fg, 220)}
    </g>
    <rect x="0" y="0" width="92" height="30" fill="${c.accent}"/>
    <text x="46" y="20" fill="white" font-family="-apple-system, Inter, sans-serif" font-size="11" font-weight="600" letter-spacing="2.4" text-anchor="middle">FIG. ${String(a.n).padStart(2, "0")}</text>
  </g>

  <!-- bottom rule + brand stamp -->
  <line x1="60" y1="820" x2="1140" y2="820" stroke="${INK}" stroke-width="1" opacity="0.15"/>
  <circle cx="78" cy="858" r="12" fill="${BRAND}"/>
  <text x="100" y="864" fill="${INK}" font-family="Georgia, serif" font-style="italic" font-size="16">Iter Advisors — DAF &amp; DRH externalisés</text>
  <text x="1140" y="864" fill="${INK}" opacity="0.55" font-family="-apple-system, Inter, sans-serif" font-size="13" text-anchor="end" letter-spacing="0.5">iteradvisors.com/ressources/blog</text>
</svg>
`;
}

// ─── Companion runtime metadata file ──────────────────────────────────

function metaTs(): string {
  const entries = ARTICLES.map(
    (a) =>
      `  "${a.slug}": { cover: "/images/blog/covers/${a.slug}.svg", alt: ${JSON.stringify(a.alt)} },`
  ).join("\n");
  return `/**
 * Auto-generated by \`scripts/generate-blog-covers.ts\` — do not edit by hand.
 * Maps each blog article slug to its editorial cover SVG and the alt
 * text consumed by <Image alt={…}>.
 *
 * Re-run \`npx tsx scripts/generate-blog-covers.ts\` after changing
 * titles / subtitles / categories in that script.
 */

export interface BlogCover {
  cover: string;
  alt: string;
}

export const BLOG_COVERS: Record<string, BlogCover> = {
${entries}
};

export function getBlogCover(slug: string): BlogCover | undefined {
  return BLOG_COVERS[slug];
}
`;
}

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
  const outDir = resolve(process.cwd(), "public", "images", "blog", "covers");
  mkdirSync(outDir, { recursive: true });

  for (const a of ARTICLES) {
    const path = resolve(outDir, `${a.slug}.svg`);
    writeFileSync(path, coverSvg(a), "utf8");
  }

  const metaPath = resolve(process.cwd(), "lib", "blog-covers.ts");
  writeFileSync(metaPath, metaTs(), "utf8");

  console.log(`Generated ${ARTICLES.length} covers in ${outDir}`);
  console.log(`Wrote runtime metadata to ${metaPath}`);
}

main();
