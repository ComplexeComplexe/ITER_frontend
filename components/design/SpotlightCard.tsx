"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./DafInteractions.module.css";

/** Adapted from React Bits SpotlightCard (David Haz, 2026).
 * Source: DavidHDev/react-bits, blob 2fc3ca495cf8e015c8d29d760ac1f710db8be001.
 * See licenses/react-bits-SpotlightCard.LICENSE.md.
 * Only the decorative layer is interactive; children remain server-rendered.
 */
export default function SpotlightCard({ children, className = "" }: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const enabled = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      delete card.dataset.spotlight;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // Move a fixed gradient, instead of repainting one or updating React state.
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        card.dataset.spotlight = "active";
        frame = 0;
      });
    };
    const sync = () => {
      stop();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", stop);
      if (enabled.matches) {
        card.addEventListener("pointermove", move, { passive: true });
        card.addEventListener("pointerleave", stop);
      }
    };
    sync();
    enabled.addEventListener("change", sync);
    return () => {
      stop();
      enabled.removeEventListener("change", sync);
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", stop);
    };
  }, []);

  return <article ref={cardRef} className={`${styles.card} ${className}`}>
    <span ref={glowRef} className={styles.glow} aria-hidden="true" />
    {children}
  </article>;
}
