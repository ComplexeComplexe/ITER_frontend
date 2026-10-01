import Image from "next/image";
import Link from "next/link";
import { FINANCE_EXPERT as expert } from "@/lib/content/finance-expert";

export default function FinanceExpert({ compact = false }: { compact?: boolean }) {
  if (compact) return <div className="site-expert-compact flex items-center gap-3 mt-6 border-t border-border pt-5">
    <Image src={expert.photo} alt="Sébastien Doat" width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top shrink-0" />
    <div><p className="text-xs text-muted-foreground">Votre interlocuteur finance</p><Link href={expert.href} className="font-semibold text-iter-violet underline underline-offset-4">{expert.name}</Link><p className="text-xs text-muted-foreground">{expert.role}</p></div>
  </div>;
  return <aside aria-label="Votre interlocuteur finance" className="site-card my-8 rounded-2xl border border-border bg-background p-6 sm:p-8">
    <div className="flex flex-col sm:flex-row gap-5 items-start">
      <Image src={expert.photo} alt="Sébastien Doat, associé fondateur d’Iter Advisors" width={80} height={80} className="h-20 w-20 rounded-2xl object-cover object-top shrink-0" />
      <div className="min-w-0"><p className="site-eyebrow">Votre interlocuteur finance</p><h2 className="font-heading mb-3">Échanger avec Sébastien Doat</h2><p className="text-muted-foreground leading-relaxed">{expert.description}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm"><Link href={expert.href} className="text-iter-violet underline underline-offset-4">Parcours, publications et interventions</Link><a href={expert.linkedin} className="text-iter-violet underline underline-offset-4">Profil LinkedIn</a></div>
        <Link href="/contact#daf" className="site-button site-button-primary mt-5">Présenter mon besoin</Link>
      </div>
    </div>
  </aside>;
}
