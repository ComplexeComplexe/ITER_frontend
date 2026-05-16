"use client";

/**
 * Client-side filterable grid for the blog listing.
 *
 * SEO contract (critique critique-blog.md — May 2026):
 *   - Filtering is STATE ONLY. No router push, no query string, no URL
 *     hash. Pressing a pill changes a local `useState` value; the URL
 *     stays `/[locale]/ressources/blog`.
 *   - Every article remains rendered in the DOM at all times (we only
 *     toggle CSS `hidden`). This means Google's crawler sees the full
 *     list on first paint — no faceted indexing risk, no JS-dependent
 *     content discovery.
 *   - No new internal links are generated for the filtered view.
 */

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface BlogCardData {
  title: string;
  href: string;
  image: string;
  alt: string;
  category: string | null;
  date: string | null;
  readMinutes: number | undefined;
  ctaLabel: string;
}

interface BlogFilterableGridProps {
  cards: BlogCardData[];
  /** Localised "All" pill label. */
  allLabel: string;
  /** Localised suffix for read time ("min de lecture"). */
  readTimeSuffix: string;
}

export default function BlogFilterableGrid({
  cards,
  allLabel,
  readTimeSuffix,
}: BlogFilterableGridProps) {
  // Distinct categories, ordered by their first appearance among the
  // newest articles (which is `cards`'s current order from the server).
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const c of cards) {
      if (c.category && !seen.has(c.category)) {
        seen.add(c.category);
        ordered.push(c.category);
      }
    }
    return ordered;
  }, [cards]);

  const [active, setActive] = useState<string | null>(null);

  const pillBase =
    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer";
  const pillActive = "bg-iter-violet text-white shadow-md shadow-iter-violet/30";
  const pillIdle =
    "bg-muted/40 text-foreground/70 hover:bg-muted hover:text-foreground";

  // Compute per-category counts (helps users see at-a-glance how much
  // content exists per cluster).
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of cards) {
      if (c.category) map.set(c.category, (map.get(c.category) ?? 0) + 1);
    }
    return map;
  }, [cards]);

  return (
    <>
      {/* Filter pills row. role="tablist" / role="tab" because each pill
          toggles a different view of the same list — matches WAI-ARIA
          tablist semantics. No URL change on activation. */}
      {categories.length > 1 && (
        <div
          role="tablist"
          aria-label="Filtres par catégorie"
          className="mb-10 flex flex-wrap gap-2"
        >
          <button
            role="tab"
            type="button"
            aria-selected={active === null}
            onClick={() => setActive(null)}
            className={`${pillBase} ${active === null ? pillActive : pillIdle}`}
          >
            {allLabel}{" "}
            <span className="ml-1 text-xs opacity-70">{cards.length}</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`${pillBase} ${active === cat ? pillActive : pillIdle}`}
            >
              {cat}{" "}
              <span className="ml-1 text-xs opacity-70">{counts.get(cat) ?? 0}</span>
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          // SEO note: we toggle visibility via `hidden`, not by removing
          // the node, so the full set stays in the rendered HTML and
          // Google sees every internal link regardless of the active pill.
          const isHidden = active !== null && card.category !== active;
          return (
            <Link
              key={`${card.href}-${i}`}
              href={card.href}
              hidden={isHidden}
              aria-hidden={isHidden}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-muted">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                {card.category ?? "Blog"}
              </span>
              <h3 className="text-lg font-semibold font-heading group-hover:text-iter-violet transition-colors leading-snug">
                {card.title}
              </h3>
              {(card.date || card.readMinutes) && (
                <p className="mt-2 text-xs text-foreground/55 font-medium">
                  {card.date}
                  {card.date && card.readMinutes ? " · " : ""}
                  {card.readMinutes
                    ? `${card.readMinutes} ${readTimeSuffix}`
                    : ""}
                </p>
              )}
              <span className="inline-flex items-center gap-2 mt-3 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                {card.ctaLabel}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
