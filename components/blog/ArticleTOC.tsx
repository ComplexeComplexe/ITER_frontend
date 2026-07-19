"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Table of contents extracted from the rendered article body.
 *
 * The `headings` list MUST be computed server-side (see
 * `lib/blog-toc.ts#extractToc`) and passed in as a prop. The client
 * component only adds scroll-spy via IntersectionObserver — server
 * renders the full TOC HTML so Google can see it in the source.
 *
 * Two render modes:
 *   - Sticky sidebar on desktop ≥ 1280 px (xl breakpoint).
 *   - Collapsible accordion above the body on mobile / tablet.
 *
 * SEO contract:
 *   - Anchors are pure `#id` hash links — no new URLs minted.
 *   - The headings themselves stay in the DOM (this is a derived nav).
 *   - The TOC ships in the server-rendered HTML, so crawlers see it
 *     without executing JavaScript.
 */

export interface TocHeading {
  id: string;
  level: 2 | 3;
  label: string;
}

interface ArticleTOCProps {
  locale: Locale;
  /** Headings extracted server-side from the article HTML. */
  headings: TocHeading[];
}

const STRINGS: Record<
  Locale,
  { title: string; mobileToggle: string }
> = {
  fr: { title: "Sommaire", mobileToggle: "Sommaire" },
  en: { title: "Contents", mobileToggle: "Contents" },
  es: { title: "Sumario", mobileToggle: "Sumario" },
};

export default function ArticleTOC({
  locale,
  headings,
}: ArticleTOCProps) {
  const t = STRINGS[locale];
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openOnMobile, setOpenOnMobile] = useState(false);

  // Scroll-spy with IntersectionObserver. The "active" heading is the
  // one whose top is closest to (but above) the viewport's top + 96px
  // offset (matches our scroll-margin-top on headings).
  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;
    if (!("IntersectionObserver" in window)) return;

    const observed = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (observed.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently above the trigger line.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -70% 0px",
        threshold: 0,
      },
    );
    observed.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);

  const list = useMemo(
    () => (
      <ol className="space-y-2 text-sm">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li
              key={h.id}
              className={h.level === 3 ? "pl-4" : ""}
            >
              <a
                href={`#${h.id}`}
                className={`block py-1 transition-colors leading-snug ${
                  isActive
                    ? "text-iter-violet font-semibold"
                    : "text-foreground/60 hover:text-foreground"
                }`}
                onClick={() => setOpenOnMobile(false)}
              >
                {h.label}
              </a>
            </li>
          );
        })}
      </ol>
    ),
    [headings, activeId],
  );

  if (headings.length === 0) return null;

  return (
    <>
      {/* Sticky desktop sidebar (xl+) — placed by the parent in a
          relative wrapper; we just render at top-32 sticky. */}
      <aside
        className="hidden xl:block sticky top-32 self-start max-h-[calc(100vh-9rem)] overflow-y-auto"
        aria-label={t.title}
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-iter-violet mb-3">
          {t.title}
        </p>
        {list}
      </aside>

      {/* Mobile / tablet collapsible — rendered just above the body. */}
      <details
        className="xl:hidden mb-6 border border-border/60 rounded-2xl bg-muted/30 not-prose"
        open={openOnMobile}
        onToggle={(e) => setOpenOnMobile((e.target as HTMLDetailsElement).open)}
      >
        <summary className="list-none cursor-pointer flex items-center justify-between gap-2 p-4 font-semibold text-sm text-foreground">
          <span>{t.mobileToggle}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform ${openOnMobile ? "rotate-180" : ""}`}
          />
        </summary>
        <div className="px-4 pb-4">{list}</div>
      </details>
    </>
  );
}
