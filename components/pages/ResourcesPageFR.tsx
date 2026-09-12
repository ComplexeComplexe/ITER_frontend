import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { DOCUMENTED_CASES } from "@/lib/content/documented-cases";
import type { CmsNavItem } from "@/lib/static-content";

const needs = [
  { title: "Anticiper la trésorerie", text: "Comprendre le BFR, suivre le cash et préparer vos décisions de financement.", links: [
    { title: "Cash burn : calculer son runway", href: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee" },
    { title: "Comprendre le besoin en fonds de roulement", href: "/ressources/glossaire/besoin-fonds-roulement-bfr" },
  ] },
  { title: "Piloter la rentabilité", text: "Choisir les indicateurs utiles et expliquer les écarts entre budget et réalisé.", links: [
    { title: "Tableau de bord : les 12 KPIs financiers", href: "/ressources/blog/tableau-de-bord-financier-startup-12-kpis" },
    { title: "Voir un exemple de reporting de gestion", href: "/services/controle-de-gestion-externalise#exemple-tableau-de-bord" },
  ] },
  { title: "Choisir son DAF", text: "Comparer les responsabilités, les formats d’accompagnement et le budget.", links: [
    { title: "DAF externalisé ou salarié : comparer", href: "/ressources/blog/daf-externalise-vs-daf-salarie" },
    { title: "Comprendre le coût d’un DAF externalisé", href: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026" },
    { title: "Les formules et tarifs Iter Advisors", href: "/daf-externalise/tarifs" },
  ] },
  { title: "Préparer un financement", text: "Structurer les informations financières attendues par les investisseurs.", links: [
    { title: "Checklist de due diligence financière", href: "/ressources/blog/checklist-due-diligence-levee-de-fonds" },
    { title: "Organiser la finance d’un SaaS en Series A", href: "/ressources/blog/stack-financier-saas-series-a" },
  ] },
  { title: "Travailler entre France et Espagne", text: "Retrouver les guides fiscaux et identifier les points à examiner avec vos conseils.", links: [
    { title: "Loi Beckham : conditions et démarches", href: "/ressources/fiscalite/beckham-law" },
    { title: "Impôt sur le revenu en Espagne", href: "/ressources/fiscalite/impot-revenu-espagne" },
    { title: "Comparer les régimes fiscaux France-Espagne", href: "/ressources/blog/regimes-fiscaux-france-vs-espagne" },
  ] },
  { title: "Utiliser l’IA en finance", text: "Choisir un cas d’usage, prévoir les contrôles et comprendre les limites.", links: [
    { title: "Explorer les guides IA et finance", href: "/ressources/ia-finance" },
    { title: "Automatiser le reporting financier", href: "/ressources/ia-finance/automatiser-reporting-financier" },
    { title: "ChatGPT pour la finance : usages et limites", href: "/ressources/ia-finance/chatgpt-finance" },
  ] },
];
const tools = [
  { title: "Pennylane : comptabilité et facturation", href: "/ressources/outils/pennylane" },
  { title: "Agicap : prévisions de trésorerie", href: "/ressources/outils/agicap" },
  { title: "Power BI : tableaux de bord", href: "/ressources/outils/power-bi" },
];
const terms = [
  { title: "BFR", href: "/ressources/glossaire/besoin-fonds-roulement-bfr" },
  { title: "Cash burn et runway", href: "/ressources/glossaire/cash-burn-runway" },
  { title: "EBITDA", href: "/ressources/glossaire/ebitda" },
  { title: "ARR et MRR", href: "/ressources/glossaire/arr-mrr" },
  { title: "CAC et LTV", href: "/ressources/glossaire/cac-ltv" },
  { title: "Contrôle de gestion", href: "/ressources/glossaire/controle-de-gestion" },
];
const linkStyle = "inline-flex items-center gap-2 text-sm font-medium text-iter-violet underline underline-offset-4 decoration-iter-violet/30 hover:decoration-iter-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-iter-violet";

export default function ResourcesPageFR({ cmsNavigation }: { cmsNavigation?: CmsNavItem[] }) {
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <section className="bg-gradient-to-br from-background to-iter-violet/5 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="container max-w-6xl">
          <Breadcrumb locale="fr" items={[{ label: "Ressources" }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight mt-5 mb-4 max-w-3xl">Des ressources pour piloter votre finance</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">Guides, outils et cas clients pour avancer sur votre trésorerie, votre rentabilité ou votre organisation financière. Choisissez votre besoin.</p>
        </div>
      </section>
      <nav aria-label="Sections de la page ressources" className="sticky top-16 lg:top-[72px] z-20 border-y border-border bg-background/95 backdrop-blur">
        <div className="container max-w-6xl overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-6 py-3 whitespace-nowrap text-sm font-medium">
            {[["#blog", "Par besoin"], ["#cas-clients", "Cas clients"], ["#outils", "Outils"], ["#glossaire", "Glossaire"], ["#fiches-metiers", "Métiers"]].map(([href, label]) => (
              <li key={href}><a href={href} className="inline-flex py-2 text-foreground hover:text-iter-violet">{label}</a></li>
            ))}
          </ul>
        </div>
      </nav>
      <section id="blog" className="py-10 sm:py-14 scroll-mt-36">
        <div className="container max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6">Sur quel sujet souhaitez-vous avancer ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {needs.map(need => (
              <article key={need.title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-2">{need.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{need.text}</p>
                <ul className="space-y-3">{need.links.map(link => <li key={link.href}><Link href={link.href} className={linkStyle}>{link.title}<ArrowRight size={14} className="shrink-0" aria-hidden="true" /></Link></li>)}</ul>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 mt-6">
            <Link href="/ressources/blog" className={linkStyle}>Tous les articles</Link>
            <Link href="/ressources/blog/quand-embaucher-daf-externalise-5-signes" className={linkStyle}>Identifier votre besoin de DAF</Link>
          </div>
        </div>
      </section>
      <section id="cas-clients" className="bg-muted/30 py-10 sm:py-14 scroll-mt-36">
        <div className="container max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-3">Voir les travaux réalisés chez nos clients</h2>
          <p className="text-muted-foreground max-w-3xl mb-6">Chaque fiche présente le contexte, les livrables et les limites des résultats publiés. Ces missions illustrent notre travail ; leurs résultats ne préjugent pas des vôtres.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {DOCUMENTED_CASES.map(item => (
              <Link key={item.slug} href={item.href} className="group block rounded-2xl border border-border bg-background p-5 sm:p-6 hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-iter-violet">
                <h3 className="text-lg font-semibold mb-2">{item.company}</h3>
                <p className="text-sm font-medium text-iter-violet mb-3">{item.proof}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm text-iter-violet font-medium mt-4">Lire la mission <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
          <div id="temoignages" className="flex flex-wrap gap-5 mt-6 scroll-mt-36">
            <Link href="/ressources/cas-clients" className={linkStyle}>Tous les cas clients</Link>
            <a href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc" className={linkStyle}>Consulter les avis sur Trustfolio</a>
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-14">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-8">
          <div id="outils" className="scroll-mt-36">
            <h2 className="text-2xl font-bold font-heading mb-3">Choisir vos outils finance</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Retrouvez le rôle de chaque outil, ses cas d’usage et les questions à se poser avant son intégration.</p>
            <ul className="space-y-3 mb-5">{tools.map(tool => <li key={tool.href}><Link className={linkStyle} href={tool.href}>{tool.title}</Link></li>)}</ul>
            <Link href="/ressources/outils" className={linkStyle}>Explorer l’annuaire des outils</Link>
          </div>
          <div id="glossaire" className="scroll-mt-36">
            <h2 className="text-2xl font-bold font-heading mb-3">Comprendre les indicateurs</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Définitions, calculs et exemples pour comprendre vos tableaux de bord et préparer les échanges avec vos partenaires.</p>
            <ul className="flex flex-wrap gap-2 mb-5">{terms.map(term => <li key={term.href}><Link className="inline-flex rounded-full border border-border px-4 py-2 text-sm hover:border-iter-violet hover:text-iter-violet" href={term.href}>{term.title}</Link></li>)}</ul>
            <Link href="/ressources/glossaire" className={linkStyle}>Tout le glossaire financier</Link>
          </div>
          <div id="fiches-metiers" className="md:col-span-2 rounded-2xl border border-border p-5 sm:p-6 scroll-mt-36">
            <h2 className="text-2xl font-bold font-heading mb-3">Organiser votre fonction finance</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Identifiez les responsabilités du DAF et les complémentarités avec votre expert-comptable. Une organisation claire aide à choisir le bon accompagnement.</p>
            <div className="flex flex-wrap gap-5">
              <Link href="/daf-externalise/metier" className={linkStyle}>Le métier de DAF</Link>
              <Link href="/daf-externalise" className={linkStyle}>L’accompagnement DAF externalisé</Link>
              <Link href="/ressources/blog/daf-externalise-vs-expert-comptable" className={linkStyle}>DAF et expert-comptable : qui fait quoi ?</Link>
            </div>
          </div>
        </div>
      </section>
      <CTASection locale="fr" />
    </PageLayout>
  );
}
