import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { hrText } from "@/lib/content/hr-locales";
import { HR_TOOL_PRACTICE } from "@/lib/content/hr-tool-practice";

export default function HrToolPractice({ slug, locale = "fr" }: { slug: string; locale?: Locale }) {
  const practice = HR_TOOL_PRACTICE[slug];
  if (!practice) return null;
  return <section id="experience-rh" className="scroll-mt-28 border-b border-border py-10">
    <h2 className="text-2xl font-bold font-heading mb-5">{hrText(practice.title, locale)}</h2>
    <p className="site-copy text-muted-foreground leading-relaxed">{hrText(practice.text, locale)}</p>
    <p className="text-sm text-muted-foreground mt-4">{hrText("Retours de pratique communiqués par Borith Biv, Partner Capital Humain chez Iter Advisors.", locale)}</p>
    <Link href={parityHref("/drh-externalise", locale)} className="site-inline-link mt-4">
      {hrText("Découvrir la direction RH externalisée", locale)}
    </Link>
  </section>;
}
