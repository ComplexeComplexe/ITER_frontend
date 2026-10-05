import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { ProfileLink } from "@/lib/content/guillaume-profile";
import { parityHref } from "@/lib/locale-route-map";

/** Link supplied phrases without changing the approved biography text. */
export default function ProfileProse({ text, links = [], locale }: { text: string; links?: ProfileLink[]; locale: Locale }) {
  const parts = [];
  let start = 0;
  while (start < text.length) {
    const next = links.filter(link => link.label.length > 0)
      .map(link => ({ link, index: text.indexOf(link.label, start) }))
      .filter(match => match.index >= 0)
      .sort((a, b) => a.index - b.index || b.link.label.length - a.link.label.length)[0];
    if (!next) { parts.push(text.slice(start)); break; }
    parts.push(text.slice(start, next.index));
    parts.push(<Link key={next.index} href={parityHref(next.link.href, locale)} className="site-inline-link">{next.link.label}</Link>);
    start = next.index + next.link.label.length;
  }
  return <>{parts}</>;
}
