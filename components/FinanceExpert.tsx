import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getSiteInterface } from "@/lib/content/site-interface";
import { aboutHref } from "@/lib/path-localization";
import { parityHref } from "@/lib/locale-route-map";
import { FINANCE_EXPERT as expert } from "@/lib/content/finance-expert";

export default function FinanceExpert({ compact = false, locale = "fr" }: { compact?: boolean; locale?: Locale }) {
  const ui = getSiteInterface(locale);
  const href = aboutHref(locale, expert.slug);
  if (compact) return <div className="site-expert-compact flex items-center gap-3 mt-6 border-t border-border pt-5">
    <Image src={expert.photo} alt="Sébastien Doat" width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top shrink-0" />
    <div><p className="text-xs text-muted-foreground">{ui.financeContact}</p><Link href={href} className="font-semibold text-iter-violet underline underline-offset-4">{expert.name}</Link><p className="text-xs text-muted-foreground">{ui.financeRole}</p></div>
  </div>;
  return <aside aria-label={ui.financeContact} className="site-card my-8 rounded-2xl border border-border bg-background p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row gap-5 items-start">
      <Image src={expert.photo} alt={`Sébastien Doat, ${ui.financeRole}, Iter Advisors`} width={80} height={80} className="h-20 w-20 rounded-2xl object-cover object-top shrink-0" />
      <div className="min-w-0"><p className="site-eyebrow">{ui.financeContact}</p><h2 className="font-heading mb-3">{ui.financeTitle}</h2><p className="text-muted-foreground leading-relaxed">{ui.financeDescription}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm"><Link href={href} className="text-iter-violet underline underline-offset-4">{ui.profile}</Link><a href={expert.linkedin} className="text-iter-violet underline underline-offset-4">{ui.linkedin}</a></div>
        <Link href={parityHref("/contact#daf", locale)} className="site-button site-button-primary mt-5">{ui.contact}</Link>
      </div>
    </div>
  </aside>;
}
