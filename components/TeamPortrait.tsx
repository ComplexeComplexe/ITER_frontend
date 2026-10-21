import Image from "next/image";
import type { CSSProperties } from "react";
import { strapiMediaUrl, type StrapiTeamMember } from "@/lib/static-content";
import styles from "./TeamPortrait.module.css";

// Square crops in original-image pixels, set by visual inspection. The source
// photographs stay intact; every viewport uses the same head-and-shoulders crop.
const PORTRAITS: Record<string, { source: [number, number]; crop: [number, number, number]; light?: number; color?: number }> = {
  "sebastien-doat": { source: [2048, 3072], crop: [440, 330, 1250], light: 1.08 },
  "benjamin-ziza": { source: [2048, 1908], crop: [70, 0, 1908], light: 1 },
  "florent-greth": { source: [400, 400], crop: [45, 40, 300], light: 1.08 },
  "borith-biv": { source: [400, 400], crop: [60, 0, 310], light: 1.12, color: 0.65 },
  "guillaume-rostand": { source: [400, 400], crop: [0, 0, 400], light: 1.08 },
  "hugo-lepresle": { source: [600, 800], crop: [15, 120, 380], light: 1.12 },
  "gonzalo-serratosa-de-caralt": { source: [600, 800], crop: [0, 75, 390], light: 1.1, color: 0.7 },
  "tom-jaufre": { source: [400, 400], crop: [0, 0, 400] },
  "jessica-barnicaud": { source: [400, 400], crop: [50, 25, 330], light: 1.02 },
  "benjamin-carlot": { source: [800, 800], crop: [0, 0, 800], light: 1.1 },
  "christophe-hoarau": { source: [400, 400], crop: [90, 60, 220], light: 1.12 },
  "sebastien-preel": { source: [400, 400], crop: [0, 0, 400], light: 1.02, color: 0.55 },
  "ornella-salgado": { source: [800, 800], crop: [60, 115, 650], light: 1.1 },
  "pauline-mathieu": { source: [400, 400], crop: [0, 0, 400], light: 1.12, color: 0.6 },
  "alice-fumeron": { source: [800, 800], crop: [145, 0, 630], light: 1.1, color: 0.65 },
  "carole-casse": { source: [400, 400], crop: [0, 0, 400], light: 1.06 },
  "andress-ayme": { source: [400, 400], crop: [0, 0, 400], light: 1.08 },
};

export default function TeamPortrait({ member, variant = "card" }: { member: StrapiTeamMember; variant?: "card" | "lead" }) {
  const name = `${member.firstName} ${member.lastName}`.trim();
  const photo = strapiMediaUrl(member.photo);
  const treatment = photo === `/images/team/${member.slug}.webp` ? PORTRAITS[member.slug] : undefined;
  const cropStyle: CSSProperties | undefined = treatment && {
    width: `${treatment.source[0] / treatment.crop[2] * 100}%`,
    height: `${treatment.source[1] / treatment.crop[2] * 100}%`,
    left: `${-treatment.crop[0] / treatment.crop[2] * 100}%`,
    top: `${-treatment.crop[1] / treatment.crop[2] * 100}%`,
    filter: `brightness(${treatment.light ?? 1.04}) contrast(0.98) saturate(${treatment.color ?? 0.78})`,
  };
  return (
    <span className={`${styles.frame} ${styles[variant]}`} data-team-portrait={member.slug}>
      {photo ? <Image src={photo} alt={name} width={640} height={640} sizes={variant === "lead" ? "(max-width: 600px) 70vw, 450px" : "180px"} className={styles.image} style={cropStyle} /> : <span className={styles.initials}>{`${member.firstName?.[0] ?? ""}${member.lastName?.[0] ?? ""}`.toUpperCase()}</span>}
    </span>
  );
}
