/**
 * Slug → body illustration map. Each entry points to a 1200×630 WebP
 * (q=82) under `public/images/blog/illustrations/` (named after the
 * slug) and carries a French-language alt for accessibility / SEO.
 * Consumed by `BlogPostPage` (catch-all `[slug]` route) via its
 * `bodyImage` prop, rendered with `priority` since it is the LCP
 * element on most blog articles.
 *
 * The original assets were 0.9–4.4 MB PNGs (~31 MB total). Re-encoding
 * to WebP q=82 dropped the average payload from ~1.1 MB to ~65 KB and
 * fixed the LCP > 2.5 s mobile alert flagged by GSC after the BLOG V3
 * rollout (PR #24).
 *
 * The editorial SVG covers under `public/images/blog/covers/` are used
 * on the listing cards; these WebPs are used inside the article body.
 */

export interface BlogIllustration {
  src: string;
  alt: string;
}

export const BLOG_ILLUSTRATIONS: Record<string, BlogIllustration> = {
  "impot-revenu-espagne": {
    src: "/images/blog/illustrations/impot-revenu-espagne.webp",
    alt: "Illustration éditoriale : Impôt sur le revenu en Espagne (IRPF) — guide pour entrepreneurs et expatriés",
  },
  "externaliser-comptabilite-guide": {
    src: "/images/blog/illustrations/externaliser-comptabilite-guide.webp",
    alt: "Illustration éditoriale : Externaliser sa comptabilité — guide pour startups et PME",
  },
  "externalisation-comptable": {
    src: "/images/blog/illustrations/externalisation-comptable.webp",
    alt: "Illustration éditoriale : Externalisation comptable en pratique — guide pour dirigeants",
  },
  "quand-embaucher-daf-externalise-5-signes": {
    src: "/images/blog/illustrations/quand-embaucher-daf-externalise-5-signes.webp",
    alt: "Illustration éditoriale : 5 signaux qui indiquent qu'il est temps d'embaucher un DAF externalisé",
  },
  "stack-financier-saas-series-a": {
    src: "/images/blog/illustrations/stack-financier-saas-series-a.webp",
    alt: "Illustration éditoriale : Stack financier idéal pour une SaaS en Series A — Pennylane, Agicap, Spendesk, PayFit",
  },
  "tableau-de-bord-financier-startup-12-kpis": {
    src: "/images/blog/illustrations/tableau-de-bord-financier-startup-12-kpis.webp",
    alt: "Illustration éditoriale : Tableau de bord financier startup — les 12 KPIs essentiels à suivre",
  },
  "term-sheet-negocier-clauses-cles": {
    src: "/images/blog/illustrations/term-sheet-negocier-clauses-cles.webp",
    alt: "Illustration éditoriale : Négocier sa term sheet — clauses clés à défendre face aux investisseurs",
  },
  "drh-externalise-quand-et-pourquoi": {
    src: "/images/blog/illustrations/drh-externalise-quand-et-pourquoi.webp",
    alt: "Illustration éditoriale : DRH externalisé — quand y faire appel et pourquoi ça paye",
  },
  "cas-etude-happy-scribe": {
    src: "/images/blog/illustrations/cas-etude-happy-scribe.webp",
    alt: "Illustration éditoriale : cas client Happy Scribe — structuration de la finance d'une scale-up",
  },
  "agicap-vs-fygr-outil-tresorerie": {
    src: "/images/blog/illustrations/agicap-vs-fygr-outil-tresorerie.webp",
    alt: "Illustration éditoriale : Agicap vs Fygr — comparatif des outils de trésorerie pour PME",
  },
  "payfit-vs-silae-comparatif-pme": {
    src: "/images/blog/illustrations/payfit-vs-silae-comparatif-pme.webp",
    alt: "Illustration éditoriale : PayFit vs Silae — comparatif des logiciels de paie pour PME",
  },
  "daf-externalise-vs-daf-salarie": {
    src: "/images/blog/illustrations/daf-externalise-vs-daf-salarie.webp",
    alt: "Illustration éditoriale : DAF externalisé vs DAF salarié — quel modèle pour quel stade ?",
  },
  "checklist-due-diligence-levee-de-fonds": {
    src: "/images/blog/illustrations/checklist-due-diligence-levee-de-fonds.webp",
    alt: "Illustration éditoriale : Checklist due diligence financière pour levée de fonds",
  },
  "cout-daf-externalise-2026-tarifs-par-mission": {
    src: "/images/blog/illustrations/cout-daf-externalise-2026-tarifs-par-mission.webp",
    alt: "Illustration éditoriale : Coût d'un DAF externalisé en 2026 — tarifs détaillés par mission",
  },
  "cout-daf-externalise-tarifs-prix-2026": {
    src: "/images/blog/illustrations/cout-daf-externalise-tarifs-prix-2026.webp",
    alt: "Illustration éditoriale : Tarifs DAF externalisé 2026 — grille de prix, TJM et calcul du ROI",
  },
  "pennylane-vs-sage-comparatif-40-deploiements": {
    src: "/images/blog/illustrations/pennylane-vs-sage-comparatif-40-deploiements.webp",
    alt: "Illustration éditoriale : Pennylane vs Sage — comparatif après 40 déploiements",
  },
  "data-room-checklist-levee-de-fonds": {
    src: "/images/blog/illustrations/data-room-checklist-levee-de-fonds.webp",
    alt: "Illustration éditoriale : Checklist data room — tout ce que les investisseurs attendent",
  },
  "reduire-bfr-7-leviers-actionnables": {
    src: "/images/blog/illustrations/reduire-bfr-7-leviers-actionnables.webp",
    alt: "Illustration éditoriale : Réduire son BFR — 7 leviers actionnables qui changent tout",
  },
  "essentiels-outils-tech-finance": {
    src: "/images/blog/illustrations/essentiels-outils-tech-finance.webp",
    alt: "Illustration éditoriale : Outils tech essentiels pour la finance — la stack 2026",
  },
  "daf-externalise-vs-expert-comptable": {
    src: "/images/blog/illustrations/daf-externalise-vs-expert-comptable.webp",
    alt: "Illustration éditoriale : DAF externalisé vs expert-comptable — quelle est la vraie différence",
  },
  "daf-drh-externalises-synergie": {
    src: "/images/blog/illustrations/daf-drh-externalises-synergie.webp",
    alt: "Illustration éditoriale : DAF + DRH externalisés — pourquoi le duo change tout",
  },
  "due-diligence-financiere-investisseurs": {
    src: "/images/blog/illustrations/due-diligence-financiere-investisseurs.webp",
    alt: "Illustration éditoriale : Due diligence financière — ce que les investisseurs vérifient vraiment",
  },
  "cash-burn-calculer-runway-anticiper-levee": {
    src: "/images/blog/illustrations/cash-burn-calculer-runway-anticiper-levee.webp",
    alt: "Illustration éditoriale : Cash burn et runway — quand lever des fonds avant qu'il ne soit trop tard",
  },
  "daf-externalise-barcelone-guide-startups-espagnoles": {
    src: "/images/blog/illustrations/daf-externalise-barcelone-guide-startups-espagnoles.webp",
    alt: "Illustration éditoriale : DAF externalisé à Barcelone — le guide pour les startups espagnoles",
  },
  "les-10-outils-pour-cfos-startup": {
    src: "/images/blog/illustrations/les-10-outils-pour-cfos-startup.webp",
    alt: "Illustration éditoriale : 10 outils essentiels pour CFO startup — la shortlist du praticien",
  },
  "la-modernisation-du-role-de-cfo": {
    src: "/images/blog/illustrations/la-modernisation-du-role-de-cfo.webp",
    alt: "Illustration éditoriale : Le CFO moderne — comment le métier a été réécrit",
  },
  "flux-de-tresorerie": {
    src: "/images/blog/illustrations/flux-de-tresorerie.webp",
    alt: "Illustration éditoriale : Flux de trésorerie — définition, importance et indicateurs clés",
  },
};

export function getBlogIllustration(slug: string): BlogIllustration | undefined {
  return BLOG_ILLUSTRATIONS[slug];
}
