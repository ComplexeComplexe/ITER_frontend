import Image from "next/image";
import Link from "next/link";

/** Contact context only. This does not assert authorship or editorial review. */
export default function HRExpert({ compact = false }: { compact?: boolean }) {
  return <aside className={compact ? "site-expert-compact mt-6 flex items-center gap-3 border-t border-border pt-4" : "site-card p-6 sm:p-8"} aria-label="Votre interlocuteur RH">
    <div className="flex items-center gap-4">
      <Image src="/images/team/borith-biv.webp" alt="Borith Biv" width={compact ? 48 : 80} height={compact ? 48 : 80} className={`${compact ? "h-12 w-12" : "h-20 w-20"} rounded-full object-cover object-top shrink-0`} />
      <div><p className="site-eyebrow">Votre interlocuteur RH</p><Link href="/a-propos/borith-biv" className="font-semibold text-iter-violet underline underline-offset-4">Borith Biv</Link><p className="text-sm text-muted-foreground">Partner Capital Humain</p></div>
    </div>
    {!compact && <><p className="mt-5 text-muted-foreground">Échangez sur votre organisation, vos recrutements et les sujets RH qui mobilisent vos équipes. Le premier échange permet de préciser le périmètre et les intervenants nécessaires.</p><div className="site-actions"><Link href="/contact#borith-biv" className="site-button site-button-primary">Présenter mon besoin RH</Link><Link href="/drh-externalise" className="site-inline-link">Découvrir la direction RH externalisée</Link></div></>}
  </aside>;
}
