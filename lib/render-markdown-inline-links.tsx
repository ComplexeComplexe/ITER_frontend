import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/**
 * Tiny inline-link renderer used to turn plain strings carrying Markdown
 * `[text](/url)` syntax into a React node tree with real `<Link>` tags.
 *
 * Why this exists (SEO audit, 16 mai 2026):
 *   Three strategic internal links on /daf-externalise were authored in
 *   `lib/content/daf.ts` as Markdown but rendered through `{paragraph}`
 *   in a `<p>` — Google saw raw `[text](url)` and the user saw the
 *   brackets. The fix is to parse the inline syntax and emit `<Link>`
 *   for relative URLs (or `<a>` for absolute ones).
 *
 * Scope:
 *   - Inline links `[label](url)` and bold `**text**` are parsed.
 *     No italic/code.
 *   - Relative URLs (`/foo`) render via Next.js `<Link>` (client-side
 *     navigation + prefetch).
 *   - Absolute URLs render via `<a target="_blank" rel="noopener
 *     noreferrer">`.
 *   - HTML in `label` is NOT supported — it's plain text.
 *
 * Bold support added 2026-08-02: the ES and EN `intro` blocks of
 * lib/content/daf.ts carry `**gras**` that was rendering as literal
 * asterisks in production (the FR copy happened to carry none, so the
 * bug was invisible on the page most people looked at).
 */
const TOKEN_RE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Version texte brut d'une chaîne portant le même Markdown inline : les
 * liens gardent leur libellé, le gras perd ses astérisques. À utiliser pour
 * tout ce qui part dans un JSON-LD ou une meta — un lien Markdown y fuyait
 * (FAQPage du pilier DAF, 3 septembre 2026).
 */
export function stripInlineMarkdown(text: string): string {
  if (!text) return text;
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

export function renderInlineMarkdownLinks(text: string): ReactNode {
  if (!text) return text;
  // Fast-path: no Markdown token → return as-is.
  TOKEN_RE.lastIndex = 0;
  if (!TOKEN_RE.test(text)) return text;
  TOKEN_RE.lastIndex = 0;

  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN_RE)) {
    const [full, boldText, label, url] = m;
    const start = m.index ?? 0;
    if (start > cursor) {
      parts.push(
        <Fragment key={`t-${key++}`}>{text.slice(cursor, start)}</Fragment>,
      );
    }

    if (boldText !== undefined) {
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-foreground">
          {boldText}
        </strong>,
      );
    } else {
      const isAbsolute = /^https?:\/\//i.test(url);
      if (isAbsolute) {
        parts.push(
          <a
            key={`l-${key++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-iter-violet hover:underline"
          >
            {label}
          </a>,
        );
      } else {
        parts.push(
          <Link
            key={`l-${key++}`}
            href={url}
            className="text-iter-violet hover:underline"
          >
            {label}
          </Link>,
        );
      }
    }
    cursor = start + full.length;
  }
  if (cursor < text.length) {
    parts.push(<Fragment key={`t-${key++}`}>{text.slice(cursor)}</Fragment>);
  }
  return parts;
}
