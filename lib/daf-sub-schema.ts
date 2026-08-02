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
/**
 * Parse one FAQ item into a Q/A pair.
 *
 * Deux formes coexistent dans lib/content/daf-sub.ts :
 *   1. "**Question ?** Réponse."  (métier, temps-partage)
 *   2. "Question ? Réponse."      (tarifs FR/EN/ES — sans gras)
 *
 * La forme 2 n'était reconnue NI ici NI par l'accordéon visible de
 * DafSubPage (2026-08-02) : les 3 pages /tarifs rendaient donc leur FAQ en
 * paragraphes plats et n'émettaient aucun FAQPage — sur la page la plus
 * transactionnelle du site. Le garde-fou {10,200} sur la question évite de
 * couper sur un « ? » perdu au milieu d'une réponse.
 *
 * Exporté pour que le rendu visible et le JSON-LD partagent exactement le
 * même découpage (exigence Google : schema == contenu visible).
 */
export function parseDafSubFaqItem(
  text: string,
): { question: string; answer: string } | null {
  const bold = text.match(/^\*\*(.+?)\*\*\s*([\s\S]+)$/);
  if (bold) return { question: bold[1].trim(), answer: bold[2].trim() };
  const plain = text.match(/^([^?]{10,200}\?)\s*([\s\S]+)$/);
  if (plain) return { question: plain[1].trim(), answer: plain[2].trim() };
  return null;
}

export function buildDafSubFaqSchema(content: DafSubContent) {
  const faqSection = content.sections.find((s) =>
    s.heading?.toLowerCase().startsWith("faq"),
  );
  if (!faqSection?.content) return null;

  const items = faqSection.content
    .map(parseDafSubFaqItem)
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
