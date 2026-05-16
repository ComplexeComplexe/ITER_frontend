/**
 * Server-side TOC extraction: scans an article's `htmlContent` for
 * `<h2 id="…">…</h2>` and `<h3 id="…">…</h3>` tags and returns a flat
 * list ready to feed into `<ArticleTOC>`.
 *
 * Why server-side: we want the TOC to ship in the SSR HTML so Google
 * sees the table of contents without executing JavaScript, and so the
 * sticky desktop sidebar paints on first load (no layout shift).
 *
 * Heuristics:
 *   - Only H2 + H3 are surfaced (H1 = title, H4+ = too granular).
 *   - Headings without an `id` get a derived slug from their text
 *     content (the dangerouslySetInnerHTML html will still render
 *     them without ids — that's fine; users won't deep-link to those,
 *     and the slug we generate matches the one we'd write).
 *   - Headings inside the FAQ accordion (`<details class="prose-faq">`)
 *     are excluded because they're FAQ items, not section dividers.
 */

import type { TocHeading } from "@/components/blog/ArticleTOC";

function slugify(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    // Strip combining diacritics (U+0300 .. U+036F)
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

export function extractToc(html: string | undefined): TocHeading[] {
  if (!html) return [];
  // Remove the FAQ section to avoid surfacing each Q as a TOC entry.
  const noFaq = html.replace(
    /<h2[^>]*id=["']faq["'][^>]*>[\s\S]*$/i,
    "",
  );

  const out: TocHeading[] = [];
  const re = /<(h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(noFaq)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2];
    const inner = stripTags(m[3]);
    if (!inner) continue;
    const idMatch = attrs.match(/id=["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : slugify(inner);
    if (!id) continue;
    out.push({
      id,
      level: tag === "h2" ? 2 : 3,
      label: inner,
    });
  }
  return out;
}
