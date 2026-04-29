import Link from "next/link";
import { pickAnchor } from "@/lib/seo/anchors";

/**
 * Contextual internal link with a deterministic, weighted anchor variant
 * (CC-02). Use this anywhere we'd otherwise hand-write `<Link
 * href="/daf-externalise">DAF externalisé</Link>` to spread anchor text
 * across articles automatically.
 *
 * Example:
 *   <ContextualInternalLink
 *     target="/daf-externalise"
 *     seed={article.slug}
 *   />
 *
 * Behavior:
 *  - Same `(target, seed)` pair always renders the same anchor (build
 *    output is deterministic, sitemap signature stable).
 *  - Across many seeds, the distribution matches the weights in
 *    `lib/seo/anchors.ts`.
 *  - You can override the anchor with `children`. In that case the
 *    component is just a styled `<Link>`.
 */
export default function ContextualInternalLink({
  target,
  seed,
  children,
  className,
}: {
  target: string;
  seed: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const anchor = children ?? pickAnchor(target, seed);
  return (
    <Link href={target} className={className}>
      {anchor}
    </Link>
  );
}
