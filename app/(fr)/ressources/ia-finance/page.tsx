import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Hub de la section « IA & Finance » — même modèle que le hub fiscalité
 * (/ressources/fiscalite-espagne-france) : CollectionPage, liste de pages
 * avec drapeau `ready`, blocs thématiques, CTA.
 *
 * IA-FINANCE (2026-09-01) — l'audit DataForSEO du 2 septembre relève un champ
 * sémantique de plus de 5 700 recherches mensuelles en France (« chatgpt
 * finance » 1 900, « ia finance » 590, « automatisation reporting » 320 au
 * CPC record de 167 €) sans aucun cabinet de DAF externalisé dans les SERP.
 * Deux articles IA existaient déjà dans le blog, isolés ; ils sont remaillés
 * ici comme articles de fond.
 *
 * Les contenus fournis par l'audit citaient des chiffres de missions (« 12
 * missions en 2025, 6 à 11 heures gagnées ») et trois cas clients chiffrés,
 * rédigés par un outil et non validés par un DAF. Règle du site : aucun
 * chiffre non arbitré. La méthode et les positions sont publiées ; les
 * données de mission ne le sont pas, et la page « retours d'expérience »
 * reste « à venir » tant que des cas réels n'ont pas été validés par les
 * clients concernés.
 */

const PAGE_URL = "https://www.iteradvisors.com/ressources/ia-finance";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "IA & Finance : guides et retours de DAF | Iter Advisors",
  description:
    "Guides pratiques, comparatifs d'outils et retours de DAF sur l'IA appliquée à la finance : reporting automatisé, LLM, ChatGPT, Power BI. Zéro théorie, que du terrain.",
  path: "/ressources/ia-finance",
  disableHreflang: ["en", "es"],
});

const PAGES: { id: string; label: string; href: string; ready: boolean; descriptor: string }[] = [
  {
    id: "reporting",
    label: "Automatiser le reporting financier",
    href: "/ressources/ia-finance/automatiser-reporting-financier",
    ready: true,
    descriptor:
      "Notre guide de référence : ce qui s'automatise bien (extraction, consolidation, mise en forme), ce qui ne s'automatise pas (le jugement, la présentation au board), et la méthode pour passer d'un reporting Excel manuel à un reporting automatisé en 90 jours.",
  },
  {
    id: "chatgpt",
    label: "ChatGPT pour la finance",
    href: "/ressources/ia-finance/chatgpt-finance",
    ready: true,
    descriptor:
      "L'outil le plus recherché par les directions financières françaises, et le plus mal utilisé. Les cas d'usage qui fonctionnent (commentaires de clôture, analyse de variance, questions de board) et ceux qui posent problème (confidentialité, chiffres inventés).",
  },
  {
    id: "llm",
    label: "Les LLM en finance",
    href: "/ressources/ia-finance/llm-finance",
    ready: true,
    descriptor:
      "Au-delà de ChatGPT : Claude, Gemini, et ce que les grands modèles de langage peuvent réellement faire sur vos chiffres — avec les limites à connaître avant de brancher quoi que ce soit sur votre comptabilité.",
  },
  {
    id: "outils",
    label: "Les outils",
    href: "/ressources/ia-finance/outils",
    ready: true,
    descriptor:
      "Power BI et ses alternatives, les connecteurs comptables, les offres professionnelles des LLM, et la stack que nous recommandons selon la taille de l'entreprise — sans commission ni affiliation.",
  },
  {
    id: "retex",
    label: "Retours d'expérience",
    href: "/ressources/ia-finance/retours-experience",
    ready: false,
    descriptor:
      "Des missions détaillées, chiffres à l'appui : ce qui a marché, ce qui a échoué, ce que cela a coûté. En cours de validation avec les clients concernés.",
  },
  {
    id: "feuille",
    label: "La feuille de route 90 jours",
    href: "/ressources/ia-finance/feuille-de-route-90-jours",
    ready: true,
    descriptor: "Le plan d'action que nous appliquons en mission, semaine par semaine.",
  },
];

const ARTICLES = [
  {
    href: "/ressources/blog/ia-finance-automatisation-direction-financiere",
    title: "IA et automatisation financière : le guide 2026 pour les PME",
    descriptor: "les quatre cas d'usage qui marchent vraiment, et ceux qui ne marchent pas encore",
  },
  {
    href: "/ressources/blog/ia-et-automatisation-des-taches-repetitives",
    title: "IA et automatisation : gagner du temps sur les tâches répétitives",
    descriptor: "le détail des tâches à automatiser en premier",
  },
];

function PageLink({ p }: { p: (typeof PAGES)[number] }) {
  if (p.ready) {
    return (
      <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
        <span>
          <Link href={p.href} className="text-iter-violet hover:underline font-semibold">
            {p.label}
          </Link>
          {" : "}
          {p.descriptor}
        </span>
      </li>
    );
  }
  return (
    <li className="flex gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
  const ready = PAGES.filter((p) => p.ready);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#collection`,
        url: PAGE_URL,
        name: "IA & Finance : ce qu'un DAF fait vraiment avec l'intelligence artificielle",
        description:
          "Guides pratiques, comparatifs d'outils et retours de DAF sur l'IA appliquée à la finance d'entreprise : reporting automatisé, LLM, ChatGPT, Power BI.",
        inLanguage: "fr-FR",
        isPartOf: { "@id": "https://www.iteradvisors.com/#website" },
        hasPart: [
          ...ready.map((p) => ({
            "@type": "Article",
            url: `https://www.iteradvisors.com${p.href}`,
            name: p.label,
          })),
          ...ARTICLES.map((a) => ({
            "@type": "Article",
            url: `https://www.iteradvisors.com${a.href}`,
            name: a.title,
          })),
        ],
      },
      // Pas de BreadcrumbList à la main : <Breadcrumb> en émet déjà un.
    ],
  };

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-background pt-32 pb-12 sm:pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb
            locale="fr"
            items={[{ label: "Ressources", href: "/ressources" }, { label: "IA & Finance" }]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight text-balance">
            IA &amp; Finance : ce qu&apos;un DAF fait vraiment avec l&apos;intelligence artificielle
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
            La plupart des contenus sur l&apos;IA en finance sont écrits par des éditeurs de
            logiciels qui veulent vous vendre un abonnement, ou par des cabinets de conseil qui
            recyclent des rapports américains. Ce hub est différent : ce que vous lirez ici vient
            de missions réelles menées par nos DAF externalisés dans des PME et des startups
            françaises.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Notre position est simple. L&apos;IA ne remplace pas un DAF. Elle remplace les tâches
            qui empêchent un DAF de faire son vrai travail : la saisie, les rapprochements, la
            production de tableaux de bord mensuels, la rédaction de commentaires de clôture.
            C&apos;est peu spectaculaire, mais c&apos;est réel, et cela se mesure mission par
            mission.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="container max-w-4xl space-y-14 sm:space-y-16">
          <div id="guides" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Ce que vous trouverez dans ce hub
            </h2>
            <ul className="space-y-3 list-none pl-0">
              {PAGES.map((p) => (
                <PageLink key={p.id} p={p} />
              ))}
            </ul>
          </div>

          <hr className="border-border/50" />

          <div id="articles" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Nos articles de fond sur l&apos;IA
            </h2>
            <ul className="space-y-2.5 list-none pl-0">
              {ARTICLES.map((a) => (
                <li
                  key={a.href}
                  className="flex gap-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>
                    <Link href={a.href} className="text-iter-violet hover:underline font-semibold">
                      {a.title}
                    </Link>
                    {" — "}
                    {a.descriptor}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-border/50" />

          <div id="methode" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Une question de méthode avant tout
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Le piège classique consiste à acheter un outil avant de savoir ce qu&apos;on veut
              automatiser. Sur la plupart de nos missions, le premier mois n&apos;a pas concerné
              l&apos;IA du tout : il a consisté à nettoyer le plan comptable, à standardiser les
              flux et à documenter le processus de clôture. L&apos;IA arrive ensuite, sur des
              données propres. Si vos données sont sales, l&apos;IA produira des erreurs plus vite.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              C&apos;est exactement le type de chantier qu&apos;un{" "}
              <Link href="/daf-externalise" className="text-iter-violet hover:underline">
                DAF externalisé
              </Link>{" "}
              pilote : cadrage, choix d&apos;outils, déploiement, formation des équipes. Si vous
              voulez échanger sur votre situation,{" "}
              <Link href="/contact" className="text-iter-violet hover:underline">
                prenez rendez-vous
              </Link>
              .
            </p>
          </div>

          <aside className="rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Votre reporting mensuel prend encore plusieurs jours ?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Un diagnostic d&apos;une journée suffit à chronométrer votre processus tâche par
              tâche et à dire ce qui s&apos;automatise — et ce qui ne s&apos;automatise pas.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
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
