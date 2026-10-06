"use client";

import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import styles from "./client-logos.module.css";

const logos = [
  { name: "Ukio", file: "clients/ukio.webp" },
  { name: "HappyScribe", file: "clients/happyscribe.png" },
  { name: "Near Space Labs", file: "clients/near-space-labs.png" },
  { name: "Storefront", file: "clients/storefront.png" },
  { name: "Stannah", file: "clients/stannah.png", variant: "square" },
  { name: "Neat", file: "clients/neat.png" },
  { name: "Mitiga", file: "clients/mitiga.png", variant: "symbol" },
  { name: "AI Summit Barcelona", file: "logo-ai-summit-bcn.svg", variant: "vector" },
  { name: "Talent-R", file: "clients/talent-r.png" },
  { name: "MFL", file: "clients/mfl.png", variant: "inverse" },
  { name: "Yego", file: "clients/yego.png", variant: "symbol" },
  { name: "Aviquali", file: "clients/aviquali.png" },
];

export default function ClientLogoMarquee({ locale, label }: { locale: Locale; label: string }) {
  const [paused, setPaused] = useState(false);
  const text = {
    fr: { pause: "Mettre en pause", play: "Reprendre le défilement" },
    en: { pause: "Pause scrolling", play: "Resume scrolling" },
    es: { pause: "Pausar", play: "Reanudar el desplazamiento" },
  }[locale];
  return (
    <section className={styles.section} aria-label={label}>
      <svg width="0" height="0" aria-hidden="true" className={styles.filters}>
        <defs>
          <filter id="iter-logo-dark" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -.2126 -.7152 -.0722 0 1" />
            <feComposite in2="SourceAlpha" operator="in" result="logoMask" />
            <feFlood floodColor="#343b43" />
            <feComposite in2="logoMask" operator="in" />
          </filter>
          <filter id="iter-logo-light" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2126 .7152 .0722 0 0" />
            <feComponentTransfer><feFuncA type="table" tableValues="0 0 0 0 0 0 .5 1 1 1" /></feComponentTransfer>
            <feComposite in2="SourceAlpha" operator="in" result="logoMask" />
            <feFlood floodColor="#343b43" />
            <feComposite in2="logoMask" operator="in" />
          </filter>
        </defs>
      </svg>
      <div className={styles.heading}>
        <p>{label}</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? text.play : text.pause}
        </button>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track} style={{ animationPlayState: paused ? "paused" : undefined }}>
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {logos.map((logo) => (
                <div className={`${styles.item} ${logo.variant ? styles[logo.variant] : ""}`} key={logo.name}>
                  <Image src={`/images/logos/${logo.file}`} alt={copy === 0 ? `Logo ${logo.name}` : ""}
                    loading="eager" width={210} height={80} sizes="(max-width: 760px) 160px, 210px" unoptimized={logo.file.endsWith(".svg")} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
