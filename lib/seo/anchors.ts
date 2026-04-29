/**
 * SEO anchor-text dictionary for contextual internal links (CC-02).
 *
 * Each target URL has a list of weighted anchor variants. The
 * `<ContextualInternalLink target="/daf-externalise" seed={slug} />`
 * component picks one variant deterministically per (target, seed) pair so
 * that the same article always renders the same anchor (idempotent build)
 * but the distribution across articles matches the weights below.
 *
 * Weights are decimals summing to 1.0 per target. Variants are ordered by
 * decreasing weight for readability.
 */

export interface AnchorVariant {
  text: string;
  weight: number;
}

export type AnchorTarget = keyof typeof ANCHORS;

export const ANCHORS = {
  "/daf-externalise": [
    { text: "DAF externalisé", weight: 0.5 },
    { text: "cabinet de DAF externalisé", weight: 0.2 },
    { text: "notre offre de DAF externalisé", weight: 0.15 },
    { text: "service de DAF externalisé", weight: 0.1 },
    { text: "DAF externalisé pour PME et startups", weight: 0.05 },
  ],
  "/daf-externalise/temps-partage": [
    { text: "DAF à temps partagé", weight: 0.5 },
    { text: "DAF à temps partagé pour PME", weight: 0.25 },
    { text: "CFO à temps partagé", weight: 0.15 },
    { text: "DAF en mode shared-time", weight: 0.1 },
  ],
  "/daf-externalise/transition": [
    { text: "DAF de transition", weight: 0.5 },
    { text: "mission de DAF de transition", weight: 0.25 },
    { text: "interim CFO", weight: 0.15 },
    { text: "DAF intérimaire", weight: 0.1 },
  ],
  "/services/accompagnement-levee-de-fond": [
    { text: "accompagnement levée de fonds", weight: 0.4 },
    { text: "préparer une levée de fonds", weight: 0.3 },
    { text: "lever des fonds avec un DAF expert", weight: 0.15 },
    { text: "structurer sa levée de fonds", weight: 0.15 },
  ],
  "/services/previsionnel-tresorerie": [
    { text: "prévisionnel de trésorerie", weight: 0.4 },
    { text: "gestion de trésorerie externalisée", weight: 0.3 },
    { text: "construire un cash flow forecast", weight: 0.2 },
    { text: "piloter sa trésorerie", weight: 0.1 },
  ],
  "/services/controle-de-gestion-externalise": [
    { text: "contrôle de gestion externalisé", weight: 0.5 },
    { text: "mettre en place un contrôle de gestion", weight: 0.3 },
    { text: "reporting et contrôle de gestion", weight: 0.2 },
  ],
  "/services/ma-due-diligence": [
    { text: "due diligence financière", weight: 0.4 },
    { text: "M&A et due diligence", weight: 0.3 },
    { text: "fusion-acquisition pour PME", weight: 0.2 },
    { text: "préparer une opération M&A", weight: 0.1 },
  ],
  "/en/fractional-cfo": [
    { text: "fractional CFO", weight: 0.5 },
    { text: "fractional CFO services", weight: 0.25 },
    { text: "hire a fractional CFO", weight: 0.15 },
    { text: "part-time CFO", weight: 0.1 },
  ],
} as const;

/**
 * Deterministic 32-bit hash of a string. Used to pick an anchor variant
 * stably from the slug of the article that will render the link.
 */
function hash32(input: string): number {
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return h >>> 0;
}

/**
 * Pick an anchor variant for `target` deterministically from `seed`. The
 * weighted distribution across the universe of seeds matches the configured
 * weights up to discretization noise.
 *
 * Falls back to a sensible default if `target` isn't registered.
 */
export function pickAnchor(target: string, seed: string): string {
  const variants = (ANCHORS as Record<string, readonly AnchorVariant[]>)[target];
  if (!variants || variants.length === 0) return target;

  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  // Bucket the seed into [0, totalWeight) deterministically.
  const bucket = (hash32(seed) / 0xffffffff) * totalWeight;

  let cumulative = 0;
  for (const v of variants) {
    cumulative += v.weight;
    if (bucket < cumulative) return v.text;
  }
  return variants[variants.length - 1].text;
}
