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
 *   - Only inline links `[label](url)` are parsed. No bold/italic/code.
 *   - Relative URLs (`/foo`) render via Next.js `<Link>` (client-side
 *     navigation + prefetch).
 *   - Absolute URLs render via `<a target="_blank" rel="noopener
 *     noreferrer">`.
 *   - HTML in `label` is NOT supported — it's plain text.
 */
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderInlineMarkdownLinks(text: string): ReactNode {
  if (!text) return text;
  // Fast-path: no Markdown link → return as-is.
  if (!LINK_RE.test(text)) return text;
  LINK_RE.lastIndex = 0;

  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [full, label, url] = m;
    const start = m.index ?? 0;
    if (start > cursor) {
      parts.push(
        <Fragment key={`t-${key++}`}>{text.slice(cursor, start)}</Fragment>,
      );
    }
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
    cursor = start + full.length;
  }
  if (cursor < text.length) {
    parts.push(<Fragment key={`t-${key++}`}>{text.slice(cursor)}</Fragment>);
  }
  return parts;
}
