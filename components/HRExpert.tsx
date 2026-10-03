import Image from "next/image";
import Link from "next/link";
import { getTeamMemberBySlug } from "@/lib/content/team";
import type { Locale } from "@/lib/i18n";
import { getSiteInterface } from "@/lib/content/site-interface";
import { parityHref } from "@/lib/locale-route-map";

/** Contact context only. This does not assert authorship or editorial review. */
export default function HRExpert({ compact = false, locale = "fr", showOfferLink = true }: { compact?: boolean; locale?: Locale; showOfferLink?: boolean }) {
  const ui = getSiteInterface(locale);
  const member = getTeamMemberBySlug("borith-biv", locale)!;
  return <aside className={compact ? "site-expert-compact mt-6 flex items-center gap-3 border-t border-border pt-4" : "site-card p-6 sm:p-8"} aria-label={ui.hrContact}>
    <div className="flex items-center gap-4">
      <Image src="/images/team/borith-biv.webp" alt="Borith Biv" width={compact ? 48 : 80} height={compact ? 48 : 80} className={`${compact ? "h-12 w-12" : "h-20 w-20"} rounded-full object-cover object-top shrink-0`} />
      <div><p className="site-eyebrow">{ui.hrContact}</p><Link href={parityHref("/a-propos/borith-biv", locale)} className="font-semibold text-iter-violet underline underline-offset-4">Borith Biv</Link><p className="text-sm text-muted-foreground">{ui.hrRole}</p></div>
    </div>
    {!compact && <><p className="mt-5 text-muted-foreground">{ui.hrDescription}</p><div className="site-actions"><Link href={parityHref("/contact#borith-biv", locale)} className="site-button site-button-primary">{ui.hrCta}</Link>{showOfferLink && <Link href={parityHref("/drh-externalise", locale)} className="site-inline-link">{ui.hrOffer}</Link>}{member.linkedIn && <a href={member.linkedIn} className="site-inline-link" target="_blank" rel="noopener noreferrer">{ui.linkedin}</a>}</div></>}
  </aside>;
}
