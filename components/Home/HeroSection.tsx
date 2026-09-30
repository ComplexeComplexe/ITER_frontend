import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface HeroSectionProps {
  locale: Locale;
  heroTitleRaw: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaUrl: string;
  discoverServicesLabel: string;
  trustfolioLabel: string;
}

/** Keep the offer and actions readable at first paint, without a rotating H1. */
export default function HeroSection(props: HeroSectionProps) {
  const { locale, heroTitleRaw, heroSubtitle, heroCtaLabel, heroCtaUrl, discoverServicesLabel, trustfolioLabel } = props;
  const isFrench = locale === "fr";
  return (
    <section className="relative bg-gradient-to-br from-iter-violet to-iter-dark text-white pt-28 pb-12 lg:pt-36 lg:pb-16">
      <div className="container">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] tracking-tight text-balance">{isFrench ? "Votre direction financière externalisée, du cash au reporting" : heroTitleRaw}</h1>
          <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">{isFrench ? "Un DAF senior pour piloter votre PME ou votre startup, structurer vos financements et automatiser les tâches utiles. Des équipes à Paris et Barcelone, un accompagnement défini selon vos besoins." : heroSubtitle}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link href={isFrench ? "/contact#daf" : heroCtaUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-iter-chartreuse px-6 py-3 text-iter-dark font-semibold">{isFrench ? "Échanger sur mon besoin" : heroCtaLabel}<ArrowRight size={18} /></Link>
            <Link href={isFrench ? "/daf-externalise" : `/${locale}/services`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/50 px-6 py-3 font-medium hover:bg-white/10">{isFrench ? "Missions et tarifs DAF" : discoverServicesLabel}</Link>
          </div>
          <a href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm underline underline-offset-4">5/5 {trustfolioLabel} Trustfolio</a>
        </div>
        {isFrench && <nav aria-label="Choisir un accompagnement" className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { title: "Un DAF pour mon entreprise", text: "Missions, équipe et honoraires", href: "/daf-externalise" },
            { title: "Fiabiliser trésorerie et reporting", text: "Indicateurs, marges et décisions", href: "/services/controle-de-gestion-externalise" },
            { title: "Automatiser ma finance", text: "Guides IA, exercices et méthode", href: "/ressources/ia-finance" },
          ].map(item => <Link key={item.href} href={item.href} className="rounded-2xl border border-white/25 bg-white/5 p-5 hover:bg-white/10"><span className="font-semibold">{item.title}</span><span className="mt-2 flex items-center justify-between gap-2 text-sm text-white/80">{item.text}<ArrowRight size={16} aria-hidden="true" /></span></Link>)}
        </nav>}
      </div>
    </section>
  );
}
