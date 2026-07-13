import type { DafSubContent } from "@/lib/content/daf-sub";

/**
 * Extract FAQ items from a DafSubContent and build a FAQPage JSON-LD payload.
 *
 * Single source of truth : the same "**Question ?** Answer text." array
 * drives the visible <details> accordion in DafSubPage and this schema.
 * Google's rich-results validator rejects any mismatch, so both come from
 * the same place.
 *
 * T#3 (2026-07-13) — extracted from app/daf-externalise/transition/page.tsx
 * to be reusable across /tarifs, /temps-partage, /metier and the future
 * /transition (also refactored to use this helper).
 */
export function buildDafSubFaqSchema(content: DafSubContent) {
  const faqSection = content.sections.find((s) =>
    s.heading?.toLowerCase().startsWith("faq"),
  );
  if (!faqSection?.content) return null;

  const items = faqSection.content
    .map((raw) => {
      // [\s\S] instead of `.` with `/s` flag — the dotAll flag requires
      // target ≥ ES2018 and tsconfig.json is on ES2017.
      const m = raw.match(/^\*\*(.+?\?)\*\*\s*([\s\S]+)$/);
      if (!m) return null;
      return { question: m[1].trim(), answer: m[2].trim() };
    })
    .filter((x): x is { question: string; answer: string } => x !== null);

  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

/**
 * Build a BreadcrumbList JSON-LD payload for a daf-sub page.
 * Chain : Accueil → DAF Externalisé → <sub page label>.
 */
export function buildDafSubBreadcrumbSchema(content: DafSubContent, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://www.iteradvisors.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.parentLabel ?? "DAF Externalisé",
        item: `https://www.iteradvisors.com${content.parentHref ?? "/daf-externalise"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.breadcrumbLabel ?? content.h1,
        item: pageUrl,
      },
    ],
  };
}
