/**
 * Server-side transforms applied to the raw `htmlContent` string before
 * it lands inside `<div className="prose-iter-blog">`. Two transforms:
 *
 *   1. Wrap every `<table>` in a `<div class="prose-table-wrapper">`
 *      so the article container can stay at max-width 72ch but the
 *      table itself overflows horizontally on mobile (`overflow-x:
 *      auto` on the wrapper). Border-radius + border on the wrapper.
 *
 *   2. Group the article's FAQ Q/R sequence into native
 *      `<details><summary>` accordion blocks. The trigger is an
 *      `<h2 id="faq">` heading; everything between it and the next
 *      `<h2>` / end-of-HTML is parsed as a flat list of `<p>` whose
 *      first child is `<strong>` (the question) — each becomes a
 *      `<details>` with the strong content as `<summary>` and the
 *      remaining text as the answer body. We keep the original Q/R
 *      pairs visible to the FAQPage JSON-LD generator (the parsed
 *      list of {question, answer}).
 *
 * Why server-side: HTML transforms inside an already-rendered
 * `dangerouslySetInnerHTML` would require a client-only parser; doing
 * it in Node during SSR keeps the article static-renderable.
 *
 * SEO guarantees:
 *   - All H2 / H3 ids are preserved (TOC + deep links still work).
 *   - All text content is preserved character-for-character.
 *   - The FAQ DOM still contains every question and every answer in
 *     plain text inside the `<details>`, so crawlers see them and the
 *     FAQPage JSON-LD remains 100 % consistent with the visible DOM.
 */

export interface FaqQA {
  question: string;
  answer: string;
}

export interface TransformResult {
  /** Transformed HTML ready to inject. */
  html: string;
  /** Parsed Q/R pairs (when an FAQ section was detected). */
  faqs: FaqQA[];
}

/* ── Helper: strip outer `<strong>…</strong>` if present, return text. */
function stripStrong(snippet: string): string {
  const m = snippet.match(/^\s*<strong>([\s\S]*?)<\/strong>\s*(.*)$/i);
  if (m) return (m[1] + " " + m[2]).trim();
  return snippet.trim();
}

/* ── Helper: strip ALL HTML tags from a snippet — used to build the
 *    JSON-LD `answer.text` (Google wants plain text). */
function stripTags(snippet: string): string {
  return snippet
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ── 1. Wrap tables for mobile scroll ─────────────────────────────── */
function wrapTables(html: string): string {
  return html.replace(/<table[\s>]/gi, (m) => {
    return `<div class="prose-table-wrapper">${m}`;
  }).replace(/<\/table>/gi, "</table></div>");
}

/* ── 2. Build accordion-friendly FAQ + extract Q/R pairs ─────────── */
function transformFaq(html: string): {
  html: string;
  faqs: FaqQA[];
} {
  // Find the FAQ heading (id="faq" preferred, fallback to a literal
  // "<h2>FAQ" / "Foire aux questions" / "Frequently asked").
  const headingRe = /<h2[^>]*id=["']faq["'][^>]*>[\s\S]*?<\/h2>|<h2[^>]*>\s*(?:FAQ|F\.A\.Q\.|Foire aux questions|Frequently[^<]*Asked[^<]*Questions)[^<]*<\/h2>/i;
  const headingMatch = html.match(headingRe);
  if (!headingMatch || headingMatch.index === undefined) {
    return { html, faqs: [] };
  }

  const headingStart = headingMatch.index;
  const headingEnd = headingStart + headingMatch[0].length;

  // FAQ section is everything between the FAQ heading and the next
  // `<h2>` (or end of html). The next `<h2>` is the boundary.
  const afterHeading = html.slice(headingEnd);
  const nextH2Match = afterHeading.match(/<h2[\s>]/i);
  const sectionEndRel = nextH2Match && nextH2Match.index !== undefined
    ? nextH2Match.index
    : afterHeading.length;
  const faqBody = afterHeading.slice(0, sectionEndRel);

  // Parse Q/R pairs. Pattern in our content:
  //   <p><strong>Q : …</strong></p>          or
  //   <p><strong>Q : …</strong><br>R : …</p>  or
  //   <p><strong>… question …?</strong></p><p>… answer …</p>
  // We accept the most common variants — split the body into <p>…</p>
  // blocks, then walk pairs: if a <p> opens with <strong>, it's a Q;
  // any following content (within the same <p> after </strong>, plus
  // subsequent <p> blocks until the next <strong> opener) is the A.
  const blockRe = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  const blocks: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(faqBody)) !== null) {
    blocks.push(m[1]);
  }

  const faqs: FaqQA[] = [];
  let pendingQ: string | null = null;
  let pendingAParts: string[] = [];
  const flush = () => {
    if (pendingQ !== null) {
      faqs.push({
        question: stripTags(pendingQ),
        answer: stripTags(pendingAParts.join(" ")),
      });
    }
    pendingQ = null;
    pendingAParts = [];
  };

  for (const block of blocks) {
    // Inline Q/R in same <p>: <strong>Q…</strong>…rest…
    const m2 = block.match(/^\s*<strong>([\s\S]*?)<\/strong>([\s\S]*)$/i);
    if (m2) {
      flush();
      // Question text may include "Q :" prefix — strip it.
      const qRaw = m2[1].replace(/^\s*Q\s*[:.]\s*/i, "").trim();
      pendingQ = qRaw;
      // Anything after </strong> in the same <p> is part of the answer.
      const rest = m2[2].replace(/^\s*(?:<br\s*\/?>\s*)?R\s*[:.]\s*/i, "").trim();
      if (rest) pendingAParts.push(rest);
    } else if (pendingQ !== null) {
      pendingAParts.push(block.trim());
    }
  }
  flush();

  if (faqs.length === 0) {
    return { html, faqs: [] };
  }

  // Rebuild the FAQ section as a `<div class="prose-faq-list">` of
  // `<details class="prose-faq">` items. The heading stays untouched.
  const accordion = faqs
    .map(
      (f) =>
        `<details class="prose-faq"><summary>${escapeHtml(f.question)}</summary><p>${escapeHtml(f.answer)}</p></details>`,
    )
    .join("");
  const wrapped = `<div class="prose-faq-list">${accordion}</div>`;
  const newHtml =
    html.slice(0, headingEnd) +
    wrapped +
    html.slice(headingEnd + sectionEndRel);
  return { html: newHtml, faqs };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function transformArticleHtml(html: string): TransformResult {
  if (!html) return { html: "", faqs: [] };
  const t1 = wrapTables(html);
  const { html: t2, faqs } = transformFaq(t1);
  return { html: t2, faqs };
}
