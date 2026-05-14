/**
 * One-shot generator for 5 hero-illustration placeholder SVGs.
 *
 * Each slot is a 1200×630 brand-coloured gradient with no text. They
 * are intentionally generic so the pages look clean until the real
 * photo is dropped in over them (just rename the photo file to match
 * the slot's filename and replace; or commit the photo at the listed
 * path).
 *
 * Run once with: `npx tsx scripts/generate-illustration-placeholders.ts`
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

interface Slot {
  /** Filename under public/images/illustrations/ */
  file: string;
  /** Hue stops for the gradient (top-left → bottom-right). */
  colors: [string, string];
}

const SLOTS: Slot[] = [
  // 1 — Hero `/daf-externalise` : "le CFO devant ses tableaux de bord".
  { file: "cfo-data-dashboards.svg", colors: ["#6C3AED", "#3A1C8A"] },
  // 2 — Hero `/contact` ou homepage : "poignée de main, contrat signé".
  { file: "business-handshake.svg", colors: ["#3057E1", "#1E3A8A"] },
  // 3 — Hero `/services/comptabilite-externalisation` : "remise de
  //     documents devant un tableur".
  { file: "accounting-handover.svg", colors: ["#2EC4B6", "#0E5E54"] },
  // 4 — Hero `/daf-externalise/temps-partage` : "réunion d'équipe en
  //     visioconférence".
  { file: "team-video-call.svg", colors: ["#FF6B6B", "#B83228"] },
  // 5 — Hero `/daf-externalise/tarifs` : "analyse ROI sur tablette,
  //     forfaits Basic / Pro / Enterprise".
  { file: "pricing-roi-tablet.svg", colors: ["#C9A227", "#7A5A0E"] },
];

function placeholderSvg(colors: [string, string], id: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors[0]}"/>
      <stop offset="100%" stop-color="${colors[1]}"/>
    </linearGradient>
    <pattern id="${id}-grid" patternUnits="userSpaceOnUse" width="60" height="60">
      <path d="M 60 0 L 0 0 L 0 60" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#${id})"/>
  <rect width="1200" height="630" fill="url(#${id}-grid)"/>
  <circle cx="980" cy="120" r="140" fill="rgba(255,255,255,0.05)"/>
  <circle cx="160" cy="510" r="180" fill="rgba(255,255,255,0.04)"/>
</svg>
`;
}

function main(): void {
  const outDir = resolve(process.cwd(), "public", "images", "illustrations");
  mkdirSync(outDir, { recursive: true });

  for (const slot of SLOTS) {
    const id = slot.file.replace(/\.svg$/, "");
    writeFileSync(resolve(outDir, slot.file), placeholderSvg(slot.colors, id), "utf8");
  }

  console.log(`Wrote ${SLOTS.length} placeholders to ${outDir}`);
}

main();
