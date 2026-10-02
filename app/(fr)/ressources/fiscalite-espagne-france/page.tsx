import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Hub page of the "Fiscalité Espagne France" semantic cocoon.
 * Created 2026-05-31 from livrable_final_fiscalite.pdf (Week 2 of the 90-day
 * roadmap). Distributes PageRank toward 14 pillar pages — only Pillar 1
 * (Résidence fiscale) ships today; the other 13 mentions are kept as plain
 * prose, no broken links, and will become clickable as each pillar lands.
 *
 * Schemas emitted (per the livrable's schema spec):
 *   - BreadcrumbList
 *   - CollectionPage (hasPart → pillar URLs as they come online)
 * ProfessionalService is already emitted site-wide from app/layout.tsx.
 */

const PAGE_URL = "https://www.iteradvisors.com/ressources/fiscalite-espagne-france";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Fiscalité France-Espagne : le guide 2026 | Iter Advisors",
  description:
    "Repères fiscaux France-Espagne pour dirigeants et entrepreneurs : résidence, IRPF et convention fiscale, avec parcours filiale et coordination des conseils.",
  path: "/ressources/fiscalite-espagne-france",
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn\'t crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* Pillar URLs the hub points at. Update `ready: true` as each pillar ships
   so the link becomes clickable; otherwise the entry is rendered as prose. */
const PILLARS: { id: string; label: string; href: string; ready: boolean; descriptor: string }[] = [
  { id: "residence", label: "Résidence fiscale", href: "/ressources/fiscalite/residence-fiscale-france-espagne", ready: true, descriptor: "Découvrez les 3 critères qui déterminent votre résidence fiscale en Espagne (règle des 183 jours, centre des intérêts économiques, foyer familial)." },
  { id: "double", label: "Double imposition", href: "/ressources/fiscalite/double-imposition-france-espagne", ready: true, descriptor: "Comprenez comment fonctionne la convention fiscale franco-espagnole pour éviter d'être imposé deux fois sur les mêmes revenus." },
  // CONTENU-C4 (2026-08-31) — la question que le cluster ne traitait pas :
  // société française avec filiale espagnole, qui pilote la finance.
  { id: "filiale", label: "Filiale espagnole", href: "/ressources/blog/filiale-espagnole-pilotage-financier", ready: true, descriptor: "Société française avec une filiale en Espagne : obligations des deux côtés, flux intragroupe, et qui pilote quoi." },
  { id: "irpf", label: "Impôt sur le revenu", href: "/ressources/fiscalite/impot-revenu-espagne", ready: true, descriptor: "Calculez votre impôt sur le revenu en Espagne et découvrez les tranches d'imposition applicables en 2026." },
  { id: "beckham", label: "Loi Beckham", href: "/ressources/fiscalite/beckham-law", ready: true, descriptor: "Examinez les conditions, les limites et les démarches du régime des impatriés avant toute simulation." },
  { id: "modelo720", label: "Modelo 720", href: "/ressources/fiscalite/modelo-720", ready: true, descriptor: "Ne manquez pas l'obligation de déclarer vos biens situés à l'étranger (comptes bancaires, assurance-vie, immobilier en France) sous peine de lourdes sanctions." },
  { id: "entrepreneur", label: "Fiscalité entrepreneur", href: "/ressources/fiscalite/entrepreneur-francais-espagne", ready: false, descriptor: "Comparez l'Impôt sur les Sociétés (IS) et les charges patronales entre la France et l'Espagne." },
  { id: "autonomo", label: "Freelance autónomo", href: "/ressources/fiscalite/freelance-autonomo-espagne", ready: false, descriptor: "Découvrez le statut d'autónomo, ses cotisations sociales (cuota) et ses obligations de facturation (TVA intracommunautaire)." },
  { id: "dividendes", label: "Dividendes", href: "/ressources/fiscalite/dividendes-france-espagne", ready: false, descriptor: "Optimisez la fiscalité de vos dividendes versés par une société française à un résident espagnol." },
  { id: "locatifs", label: "Revenus locatifs", href: "/ressources/fiscalite/revenus-locatifs-france-espagne", ready: false, descriptor: "Comment déclarer vos revenus fonciers français en Espagne ?" },
  { id: "succession", label: "Succession", href: "/ressources/fiscalite/succession-france-espagne", ready: false, descriptor: "Anticipez les droits de succession et de donation entre la France et l'Espagne." },
];

function PillarLink({ p }: { p: (typeof PILLARS)[number] }) {
  if (p.ready) {
    return (
      <li className="site-copy flex gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
        <span>
          <Link
            href={p.href}
            className="text-iter-violet hover:underline font-semibold"
          >
            {p.label}
          </Link>
          {" : "}
          {p.descriptor}
        </span>
      </li>
    );
  }
  return (
    <li className="site-copy flex gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
      <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
      <span>
        <span className="font-semibold text-foreground/70">{p.label}</span>
        {" : "}
        {p.descriptor}
        <span className="ml-1 text-xs text-muted-foreground/70 italic">(à venir)</span>
      </span>
    </li>
  );
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");

  const readyPillars = PILLARS.filter((p) => p.ready);

  // The visible Breadcrumb component emits the matching BreadcrumbList.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#collection`,
        url: PAGE_URL,
        name: "Fiscalité Espagne France : repères pour dirigeants et entrepreneurs",
        description:
          "Ressources fiscales France-Espagne pour dirigeants, entrepreneurs et filiales : résidence, revenus, déclarations et coordination des conseils.",
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://www.iteradvisors.com/#website" },
        hasPart: readyPillars.map((p) => ({
          "@type": "Article",
          url: `https://www.iteradvisors.com${p.href}`,
          name: p.label,
        })),
      },
    ],
  };

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="site-hero bg-background pt-32 pb-12 sm:pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Ressources", href: "/ressources" },
              { label: "Fiscalité Espagne France" },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight">
            Fiscalité Espagne France : repères pour dirigeants et entrepreneurs
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
            Vous dirigez une entreprise française implantée en Espagne, préparez une
            filiale ou examinez une mobilité personnelle ? Distinguez les obligations
            de la société de la situation fiscale de son dirigeant. Ce hub rassemble
            les guides de résidence, de revenus et de déclaration pour préparer les
            questions à soumettre à vos conseils.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
            Pour l’organisation de l’entreprise, le guide du{" "}
            <Link href="/ressources/blog/filiale-espagnole-pilotage-financier" className="text-iter-violet underline">pilotage financier d’une filiale espagnole</Link>{" "}
            précise les données, les interlocuteurs et le reporting. Notre offre de{" "}
            <Link href="/daf-externalise-barcelone" className="text-iter-violet underline">DAF externalisé à Barcelone</Link>{" "}
            présente la coordination finance France-Espagne. Le choix d’un régime et
            les déclarations fiscales sont à valider avec les professionnels compétents.
          </p>
        </div>
      </section>

      <section className="site-section bg-background py-12 sm:py-16">
        <div className="container max-w-4xl space-y-14 sm:space-y-16">
          {/* H2 1 — Fondamentaux */}
          <div id="fondamentaux" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Comprendre les fondamentaux de la fiscalité franco-espagnole
            </h2>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
              La première étape de toute expatriation ou création
              d&apos;entreprise transfrontalière consiste à déterminer où vous
              devez payer vos impôts. Cette décision ne se prend pas à la
              légère et dépend de critères stricts définis par les
              administrations fiscales des deux pays.
            </p>
            <ul className="space-y-2.5 list-none pl-0">
              {PILLARS.filter(p => ["residence", "double"].includes(p.id)).map(p => <PillarLink key={p.id} p={p} />)}
            </ul>
          </div>

          <hr className="border-border/50" />

          {/* H2 2 — Particuliers et expatriés */}
          <div id="particuliers" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Impôts des particuliers et expatriés
            </h2>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
              Le système d&apos;imposition espagnol (IRPF) diffère
              significativement du système français, notamment par sa gestion
              régionalisée. Chaque communauté autonome (Catalogne, Madrid,
              Andalousie) applique ses propres barèmes et déductions.
            </p>
            <ul className="space-y-2.5 list-none pl-0">
              {PILLARS.filter(p => ["irpf", "beckham", "modelo720"].includes(p.id)).map(p => <PillarLink key={p.id} p={p} />)}
            </ul>
          </div>

          <hr className="border-border/50" />

          {/* H2 3 — Entrepreneurs */}
          <div id="entrepreneurs" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Entrepreneurs, freelances et sociétés
            </h2>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
              Que vous soyez freelance (<em>autónomo</em>) ou dirigeant d&apos;une
              société (SL), la structuration de votre activité a un impact direct
              sur votre rentabilité nette.
            </p>
            <ul className="space-y-2.5 list-none pl-0">
              {PILLARS.filter(p => ["filiale", "entrepreneur", "autonomo"].includes(p.id)).map(p => <PillarLink key={p.id} p={p} />)}
            </ul>
          </div>

          <hr className="border-border/50" />

          {/* H2 4 — Patrimoine */}
          <div id="patrimoine" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Patrimoine et immobilier
            </h2>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
              La gestion de votre patrimoine transfrontalier nécessite une
              attention particulière, notamment en matière de transmission et
              de revenus locatifs.
            </p>
            <ul className="space-y-2.5 list-none pl-0">
              {PILLARS.filter(p => ["dividendes", "locatifs", "succession"].includes(p.id)).map(p => <PillarLink key={p.id} p={p} />)}
            </ul>
          </div>

          <hr className="border-border/50" />

          {/* H2 5 — Pourquoi nous */}
          <div id="pourquoi" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Pourquoi se faire accompagner par Iter Advisors ?
            </h2>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Le pilotage financier demande des données cohérentes et une répartition
              claire du travail entre votre équipe, les cabinets comptables et les
              conseils fiscaux de chaque pays.
            </p>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Nos DAF externalisés et experts financiers vous accompagnent
              pour :
            </p>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {[
                "Rassembler les données financières et les questions à examiner avec vos conseils.",
                "Coordonner les interlocuteurs et les échéances convenues dans chaque pays.",
                "Mettre en place des tableaux de bord financiers adaptés à votre activité transfrontalière.",
              ].map((item) => (
                <li key={item} className="site-copy flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Articles récents — cross-linking with the /ressources/blog/* cluster */}
          <section className="mt-4">
            <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
              Articles récents sur la fiscalité franco-espagnole
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Régimes fiscaux France vs Espagne", href: "/ressources/blog/regimes-fiscaux-france-vs-espagne" },
                { title: "Impôt sur le revenu en Espagne", href: "/ressources/fiscalite/impot-revenu-espagne" },
                { title: "Piloter une filiale espagnole", href: "/ressources/blog/filiale-espagnole-pilotage-financier" },
                { title: "Double imposition France-Espagne", href: "/ressources/fiscalite/double-imposition-france-espagne" },
                { title: "Modelo 720 : déclaration des biens", href: "/ressources/fiscalite/modelo-720" },
              ].map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="site-card group flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-iter-violet/30 transition-all"
                >
                  <ArrowRight
                    size={16}
                    className="text-iter-violet shrink-0 group-hover:translate-x-1 transition-transform"
                    aria-hidden
                  />
                  <span className="text-sm font-medium group-hover:text-iter-violet transition-colors">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <aside className="site-card rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Vous avez un projet d&apos;implantation en Espagne ou des doutes
              sur votre structuration actuelle ?
            </p>
            <p className="site-copy text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Prenez rendez-vous pour un diagnostic financier gratuit de 30
              minutes avec nos experts franco-espagnols.
            </p>
            <Link
              href="/contact"
              className="site-button site-button-primary inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
            >
              Demander un diagnostic
              <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      <CTASection locale="fr" />
    </PageLayout>
  );
}
