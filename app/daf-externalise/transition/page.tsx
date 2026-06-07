import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "fr",
    path: "/daf-externalise/transition",
    localizedPaths: { fr: "/daf-externalise/transition", en: "/en/fractional-cfo/transition", es: "/es/externalizacion-daf/transition" },
    fallbackTitle: "DAF de transition — Continuité financière | Iter Advisors",
    fallbackDescription: "DAF de transition pour accompagner vos changements stratégiques : restructuration, levée de fonds, M&A ou remplacement temporaire. Intervention rapide et expertise immédiate avec Iter Advisors.",
  });
}

/**
 * Extract FAQ items from the daf-sub content (single source of truth — same
 * array drives the visible accordion in DafSubPage). Each item is stored as
 * "**Question ?** Answer text." in plain text; we split on the first "?**"
 * to get a clean Q/A pair for the JSON-LD payload.
 */
function buildFaqSchema() {
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

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  // T-SEO-3pages (2026-06-07) — FAQPage schema sourced from the visible
  // "FAQ - DAF de Transition" section in lib/content/daf-sub.ts. Same
  // questions, same answers — keeps schema/UI 1:1 so Google's rich-
  // results validator doesn't reject the markup.
  const faqSchema = buildFaqSchema();

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <DafSubPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        heroImage={{
          src: "/images/illustrations/daf-transition.svg",
          alt: "DAF de transition Iter Advisors — passage de relais entre deux directeurs financiers, continuité opérationnelle garantie",
        }}
      />
    </>
  );
}
