/**
 * Split a blog article's HTML at a sensible mid-point so a soft CTA can
 * be injected between two sections.
 *
 * Algorithm:
 *   1. Collect every `<h2 ...>` index in the HTML.
 *   2. Pick the H2 whose offset is closest to the midpoint of the
 *      content length, but never before 35% or after 65%.
 *   3. Return [before, after]. If no acceptable H2 exists, return
 *      [html, ""] — the caller will render the soft CTA after the body.
 *
 * The split happens BEFORE the H2 so the H2 visually opens the second
 * half right after the CTA.
 */
export function splitHtmlAroundMid(html: string): [string, string] {
  if (!html) return ["", ""];
  const total = html.length;
  const min = Math.floor(total * 0.35);
  const max = Math.floor(total * 0.65);

  const h2Indices: number[] = [];
  const re = /<h2\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    h2Indices.push(m.index);
  }

  // Filter to H2s inside the [min, max] window
  const candidates = h2Indices.filter((i) => i >= min && i <= max);
  if (candidates.length === 0) return [html, ""];

  // Pick the H2 closest to the midpoint
  const mid = total / 2;
  candidates.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  const cut = candidates[0];
  return [html.slice(0, cut), html.slice(cut)];
}
