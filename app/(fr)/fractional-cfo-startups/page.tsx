import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import CaseProofLinks from "@/components/CaseProofLinks";
import { CLIENTS_ACCOMPAGNES, FORMULES, TRUSTFOLIO_RATING } from "@/lib/content/facts";

/**
 * Route for /fractional-cfo-startups.
 *
 * SEO-007 (2026-08-10) — déplacée depuis /jobs/fractional-cfo-startups.
 * La page vend une prestation, mais vivait dans le répertoire des offres
 * d'emploi : son parent /jobs est en noindex, elle était absente du sitemap,
 * et le hub /jobs la listait comme un poste ouvert en JSON-LD ItemList. Une
 * page commerciale qui se positionne en 10e position sur « fractional CFO »
 * n'avait rien à faire là. L'ancienne URL redirige en 301 (un seul saut).
 *
 * Le nettoyage d'intention avait commencé le 30/05 (FCFO-S03 / FCFO-S04) :
 * le JobPosting JSON-LD et le bloc recrutement étaient déjà partis vers
 * /carrieres/fractional-cfo. Le déménagement d'URL termine le travail.
 *
 * Structure:
 *   - Commercial hero (H1, trust badges, booking + #tarifs CTAs)
 *   - "L'essentiel en 30 secondes" TL;DR (FCFO-S05)
 *   - 4-persona "Pour qui ?" section (FCFO-S07)
 *   - Commercial H2 sections (intro, définition, avantages, méthodologie,
 *     tarifs, témoignages, FAQ, CTA final)
 *   - Compact recruitment callout (FCFO-S06) linking to /carrieres/fractional-cfo
 *
 * Schema @graph:
 *   - ProfessionalService (Starter / Growth / Scale) — T4 / 2026-06-07
 *   - FAQPage (6 commercial Q/R)
 *   - Organization
 *   (BreadcrumbList : émis par le composant <Breadcrumb>)
 */

const PAGE_URL = "https://www.iteradvisors.com/fractional-cfo-startups";

/**
 * SEO-007 (2026-08-10) — le JSON-LD était passé par `metadata.other`, qui
 * rend un `<meta name="application/ld+json" content="…">`. Google ne lit les
 * données structurées que dans un `<script type="application/ld+json">` : ce
 * balisage n'a donc jamais été exploitable. Hissé hors de generateMetadata et
 * émis dans la page, comme partout ailleurs dans ce dépôt.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // JobPosting moved to /carrieres/fractional-cfo (FCFO-S02, 2026-05-30):
    // this URL is now a pure commercial Service page; recruitment markup
    // lives at its dedicated route so Google for Jobs surfaces it cleanly.
    // ── ProfessionalService (Starter / Growth / Scale) ─────────────
    {
      "@type": "ProfessionalService",
      "@id": `${PAGE_URL}#service`,
      name: "Fractional CFO pour Startups",
      provider: {
        "@type": "Organization",
        name: "Iter Advisors",
        url: "https://www.iteradvisors.com",
      },
      description:
        "Expertise financière senior pour startups à temps partiel. Accompagnement levée de fonds, planification financière, reporting mensuel. Dès 3 000 € HT/mois.",
      areaServed: ["Paris", "Toulouse", "Barcelone"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        // Arbitrage 10/08/2026 — le fractional CFO est un positionnement, pas
        // une quatrième gamme : l'entrée se fait par Essentiel ou Croissance de
        // la grille officielle. La grille propre à cette page (Starter 4 500 /
        // Growth 8 500 / Scale 15 000) est supprimée — elle n'existait nulle
        // part ailleurs et contredisait la grille du pilier.
        name: "Formules DAF externalisé",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Essentiel",
            price: "3000",
            priceCurrency: "EUR",
          },
          {
            "@type": "Offer",
            name: "Croissance",
            price: "5000",
            priceCurrency: "EUR",
          },
        ],
      },
    },
    // ── FAQPage (6 commercial Q/R, mirrors visible accordion) ───
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Que fait exactement un Fractional CFO ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un Fractional CFO gère la direction financière stratégique à temps partiel : planification financière, accompagnement à la levée de fonds, reporting aux investisseurs, gestion de trésorerie, et encadrement de votre équipe comptable. Contrairement à un comptable qui enregistre les transactions, un Fractional CFO interprète les données et guide les décisions stratégiques.",
          },
        },
        {
          "@type": "Question",
          name: "Combien coûte un Fractional CFO ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Une mission démarre à 3 000 € HT par mois (formule Essentiel) et va jusqu'à 6 500 € pour un accompagnement de type Croissance, le format le plus fréquent chez les startups en Série A. Un directeur financier salarié de séniorité équivalente représente 100 000 à 213 000 € de coût employeur annuel, charges comprises.",
          },
        },
        {
          "@type": "Question",
          name: "Quand une startup doit-elle recruter un Fractional CFO ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Les 5 déclencheurs les plus fréquents sont : (1) préparation d'une levée de fonds, (2) burn mensuel dépassant 100 K€, (3) expansion internationale, (4) obligations de reporting au board, et (5) ne disposer que d'un comptable sans direction financière stratégique.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence entre un Fractional CFO et un comptable ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un comptable enregistre et rapproche les transactions. Un Fractional CFO analyse la performance financière, construit des prévisions, accompagne les levées, et apporte des recommandations stratégiques au fondateur et au board.",
          },
        },
        {
          "@type": "Question",
          name: "Un Fractional CFO peut-il aider pour une levée de fonds ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Les Fractional CFO Iter Advisors ont accompagné des dizaines de levées de fonds du seed à la série B — plus de 100 M€ levés par nos clients depuis 2021. Ils préparent les data rooms, construisent les modèles financiers, créent les présentations investisseurs, et préparent les fondateurs à la due diligence.",
          },
        },
        {
          "@type": "Question",
          name: "Dans quel délai un Fractional CFO peut-il intervenir ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Iter Advisors met en relation les startups avec un Fractional CFO sous 5 jours ouvrés. Le diagnostic et la mise en route sont réalisés sous 2 semaines.",
          },
        },
        {
          "@type": "Question",
          name: "Quelle est la différence entre un fractional CFO et un DAF externalisé ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aucune différence métier — ce sont deux noms pour le même rôle. \"DAF externalisé\" est le terme français historique ; \"fractional CFO\" est la terminologie anglo-saxonne plébiscitée par les startups VC-backed. Iter Advisors couvre les deux : pour la version FR généraliste, voir notre offre dédiée DAF externalisé.",
          },
        },
        {
          "@type": "Question",
          name: "Puis-je commencer par une mission ponctuelle (data room, levée) ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Oui. Nous proposons des missions ponctuelles à durée fixe (data room pour une levée, due diligence, mise en place du reporting, prévisionnel 12 mois). Tarification au forfait selon le périmètre, avec un calendrier défini au cadrage. Beaucoup de missions ponctuelles débouchent ensuite sur un engagement récurrent au mois.",
          },
        },
        {
          "@type": "Question",
          name: "Comment se passe le matching avec le bon fractional CFO ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lors de l'échange initial de 30 minutes, nous identifions vos enjeux (stade, secteur, type de levée) ; puis nous proposons un fractional CFO de notre équipe selon son expérience sectorielle et son style d'intervention. Vous rencontrez le profil avant signature : pas de surprise au démarrage.",
          },
        },
        {
          "@type": "Question",
          name: "Que se passe-t-il si on ne s'entend pas avec le fractional CFO ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sans durée d'engagement minimale, résiliable avec un préavis de 30 jours. En pratique, nous proposons d'abord un autre fractional CFO de l'équipe pour poursuivre la mission sans perdre le contexte : c'est l'avantage d'un cabinet de 15 CFOs vs un freelance solo.",
          },
        },
      ],
    },
    // ── Organization ────────────────────────────────────────────
    {
      "@type": "Organization",
      "@id": "https://www.iteradvisors.com/#organization",
      name: "Iter Advisors",
      url: "https://www.iteradvisors.com",
      logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
    },
    // SEO-005 (2026-08-10) — BreadcrumbList manuel retiré. Le composant
    // <Breadcrumb> de la page émet déjà le sien. Tant que ce graphe partait
    // dans un <meta>, il était ignoré et le doublon invisible ; maintenant
    // qu'il est réellement rendu, il fallait choisir. Même arbitrage que sur
    // les pages /daf-externalise/*.
  ],
};

export async function generateMetadata(): Promise<Metadata> {

  // T#9 (2026-07-13) — Title/meta enrichis avec les variantes GSC sous-
  // exploitées "CFO externe" (pos 33) et "CFO à temps partagé" (pos 13).
  // Le mot-clé "Fractional CFO" (pos 10,6) est conservé en premier pour
  // ne pas perdre l'autorité acquise.
  // SEO-FIN §6 (2026-08-15) — décision hreflang documentée : aucun alternate.
  //
  // Cette page cible un segment précis, les startups VC-backed, avec un terme
  // anglais utilisé tel quel en français. /en/fractional-cfo-startups et
  // /es/fractional-cfo-startups répondent 404 : il n'existe pas d'équivalent.
  //
  // Les candidats les plus proches, /en/fractional-cfo et
  // /es/externalizacion-daf, sont les équivalents du PILIER générique, pas de
  // cette page. Les déclarer en alternates relierait deux intentions
  // différentes — un hreflang doit relier des équivalents réels.
  //
  // À rouvrir le jour où une vraie traduction segment startup existe.
  return {
    title:
      "DAF externalisé startup & SaaS | Fractional CFO | Iter Advisors",
    description:
      "Fractional CFO / CFO à temps partagé senior pour startups VC-backed. Dès 3 000 € HT/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title:
        "DAF externalisé startup & SaaS | Fractional CFO | Iter Advisors",
      description:
        "Fractional CFO / CFO à temps partagé senior pour startups VC-backed. Dès 3 000 € HT/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
      url: PAGE_URL,
      type: "website",
    images: [{ url: "/images/og-logo.png", width: 1200, height: 630 }],
  },
  };
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* ─── Hero commercial ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Services", href: "/services" },
              { label: "Fractional CFO Startups" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            {/* T#9 (2026-07-13) — H1 enrichi avec "CFO externe" et "CFO à
                temps partagé" (variantes GSC sous-exploitées pos 33 et 13).
                Ces trois termes désignent la même réalité — Google les
                traite en variantes sémantiques. */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              DAF externalisé pour startups et SaaS : votre fractional CFO
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed mb-6">
              Préparer une levée, connaître son runway et fiabiliser le reporting investisseurs : un CFO senior rejoint votre équipe pour structurer ces décisions. Nos missions démarrent à 3 000 € HT par mois, avec un périmètre défini au cadrage et un profil présenté avant signature.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact#startup"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                Demander un Fractional CFO
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="#tarifs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                Voir nos tarifs ↓
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                `${CLIENTS_ACCOMPAGNES} entreprises accompagnées`,
                "Paris · Toulouse · Barcelone",
                `${TRUSTFOLIO_RATING}/5 sur Trustfolio`,
              ].map((stat, i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  <Check
                    size={14}
                    aria-hidden="true"
                    className="text-iter-chartreuse"
                  />
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── L'essentiel en 30 secondes (FCFO-S05) — TL;DR optimisé pour
            AI Overviews / extraction LLM. Figures reprises de l'existant. ─── */}
      <section className="bg-background pt-2 pb-2">
        <div className="container max-w-3xl px-4 sm:px-6">
          <aside
            aria-label="L'essentiel en 30 secondes"
            className="rounded-3xl border border-border/60 bg-muted/30 p-5 sm:p-8"
          >
            <h2 className="text-lg sm:text-xl font-bold font-heading text-foreground mb-4 sm:mb-5">
              L&apos;essentiel en 30 secondes
            </h2>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { label: "Définition", text: "un fractional CFO est un directeur financier senior à temps partiel (2 à 8 jours/mois)." },
                { label: "Tarif Iter Advisors", text: "à partir de 3 000 € HT/mois — formules Essentiel, Croissance et Premium." },
                // Arbitrage 10/08/2026 — la promesse « 5 jours » est remplacée par le
                // parcours réel : 8 à 15 jours du premier échange au démarrage.
                { label: "Délai d'intervention", text: "mission démarrée sous 8 à 15 jours." },
                { label: "Pour qui", text: "startups VC-backed, scale-ups Series A/B, SaaS, deep-tech, e-commerce." },
                { label: "Bureaux", text: "Paris, Toulouse, Barcelone — interventions hybrides." },
                { label: "Différence vs DAF externalisé", text: "même métier, terminologie anglo-saxonne plus utilisée par les startups VC." },
              ].map((p, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 sm:gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>
                    <strong className="text-foreground font-semibold">{p.label} :</strong>{" "}
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ─── Content sections ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl space-y-16 sm:space-y-24">

          {/* ── Intro commercial ── */}
          <div id="commercial-intro" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Vous cherchez à embaucher un Fractional CFO ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Nos Fractional CFO sont d'anciens directeurs financiers de
              startups en forte croissance et de scale-ups. Ils s'intègrent à
              votre équipe, participent aux conseils d'administration,
              construisent vos modèles financiers, et encadrent votre équipe
              comptable — sans le coût fixe d'un salarié permanent. Découvrez
              notre{" "}
              <Link
                href="/daf-externalise"
                className="text-iter-violet hover:underline font-medium"
              >
                service Fractional CFO
              </Link>{" "}
              ou lisez la suite pour comprendre comment ça fonctionne.
            </p>
          </div>

          {/* ── Section 1 — Définition ── */}
          <div id="definition" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Qu'est-ce qu'un Fractional CFO et comment ça fonctionne ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Un Fractional CFO est un directeur financier senior qui intervient
              dans votre entreprise à temps partiel — généralement 1 à 3 jours
              par semaine. Là où un directeur financier salarié de séniorité
              équivalente représente 100 000 à 213 000 € de coût employeur
              annuel, charges comprises, un fractional CFO apporte la même
              expertise stratégique pour 3 000 à 6 500 € HT par mois selon le
              périmètre — soit 30 à 60 % d&apos;économie.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Chez Iter Advisors, nos Fractional CFO sont d'anciens directeurs
              financiers de startups en forte croissance et de scale-ups. Ils
              s'intègrent à votre équipe, participent aux conseils
              d'administration, construisent vos modèles financiers, et
              encadrent votre équipe comptable — sans le coût fixe d'un salarié
              permanent.
            </p>
            <p className="text-sm sm:text-base text-foreground font-semibold mb-3">
              Quand une startup doit-elle recruter un Fractional CFO ? Voici les
              5 déclencheurs les plus courants :
            </p>
            <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60 mb-6">
              <table className="w-full text-sm border-collapse">
                <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet bg-muted/30 px-4 py-3">
                  Déclencheurs de recrutement d'un Fractional CFO
                </caption>
                <thead className="bg-muted/40">
                  <tr>
                    {["Déclencheur", "Pourquoi c'est important", "Quand agir"].map(
                      (h, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Levée de fonds (Seed à Series B)",
                      "Les investisseurs exigent des comptes audités et un data room solide",
                      "3 à 6 mois avant la levée",
                    ],
                    [
                      "Burn mensuel > 100 K€",
                      "La visibilité financière devient une question de survie",
                      "Immédiat",
                    ],
                    [
                      "Expansion internationale",
                      "Multi-devises, prix de transfert, conformité locale",
                      "6 à 12 mois avant",
                    ],
                    [
                      "Reporting aux investisseurs",
                      "Des tableaux de bord mensuels avec KPIs et prévisions",
                      "Immédiat",
                    ],
                    [
                      "Équipe finance réduite à 1 comptable",
                      "Aucune direction financière stratégique",
                      "Dans les 3 mois",
                    ],
                  ].map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="p-3 sm:p-4 font-semibold text-foreground border-b border-border/40 leading-relaxed">
                        {row[0]}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground border-b border-border/40 leading-relaxed">
                        {row[1]}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground border-b border-border/40 leading-relaxed">
                        {row[2]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              <strong className="text-foreground">La différence clé :</strong>{" "}
              un comptable enregistre les flux. Un Fractional CFO les
              interprète, modélise les scénarios, et guide les décisions
              stratégiques.
            </p>
          </div>

          {/* ── Section 2 — Avantages ── */}
          {/* Pour qui ? — 4 personas (FCFO-S07) */}
          <div id="pour-qui" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Pour qui ?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  title: "Founder pré-Series A",
                  text: "Vous préparez votre prochain tour et votre comptable ne suffit plus : prévisionnel, data room, KPIs SaaS, conversations VC.",
                },
                {
                  title: "Scale-up Series A/B",
                  text: "Vous structurez votre fonction finance avant d'embaucher un CFO salarié — reporting mensuel, budget glissant, contrôle de gestion.",
                },
                {
                  title: "CEO ETI en transformation",
                  text: "Vous avez besoin d'un senior fractional sur 6 mois pour piloter une transition (départ DAF, M&A, restructuration finance).",
                },
                {
                  title: "Founder espagnol s'implantant en France",
                  text: "Vous voulez un cabinet bilingue France-Espagne capable d'aligner fiscalité, comptabilité et reporting groupe des deux côtés.",
                },
              ].map((p, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {p.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div id="avantages" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              6 raisons de choisir un Fractional CFO plutôt qu'un recrutement à
              plein temps
            </h2>
            <ul className="space-y-5">
              {[
                {
                  title: "1. Un coût maîtrisé.",
                  // Arbitrage 10/08/2026 — le fractional CFO est un positionnement, pas une
                    // quatrième formule : l'entrée se fait par Essentiel ou Croissance.
                    // Le prix d'entrée passe de 4 500 à 3 000 €, le coût salarié à la
                    // fourchette unique 100-213 k€ et l'économie à 30-60 %.
                    text: "Un directeur financier salarié de séniorité équivalente représente 100 000 à 213 000 € de coût employeur annuel, charges comprises. Une mission Iter Advisors démarre à 3 000 € HT/mois — soit 30 à 60 % d'économie selon le stade de maturité et le périmètre confié.",
                },
                {
                  title: "2. Une mise en route rapide.",
                  text: "Nos Fractional CFO sont opérationnels sous 2 semaines et livrent une première feuille de route financière sous 30 jours. Pas de processus de recrutement de 3 mois.",
                },
                {
                  title: "3. Des playbooks éprouvés.",
                  text: "Le profil est choisi selon les opérations déjà accompagnées et les besoins de votre startup. Il apporte des modèles financiers, des relations avec des investisseurs, et une méthodologie testée sur le terrain.",
                },
                {
                  title: "4. Une flexibilité totale.",
                  text: "Augmentez l'intervention pendant la levée de fonds. Réduisez après la clôture. Ajustez le périmètre chaque mois. Sans durée minimale, avec un préavis de 30 jours.",
                },
                {
                  title: "5. Un écosystème complet.",
                  text: "Au-delà du CFO individuel, vous accédez à l'écosystème Iter Advisors : cabinets comptables, conseillers fiscaux, partenaires juridiques, et données de benchmarking SaaS.",
                },
                {
                  title: "6. Zéro dilution au capital.",
                  text: "La prestation est facturée en honoraires. Les formules présentées ne prévoient pas de rémunération en actions.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                >
                  <strong className="text-foreground">{item.title}</strong>{" "}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Section 3 — Méthodologie ── */}
          <div id="methodologie" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Comment fonctionne le service Fractional CFO chez Iter Advisors ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Nos interventions Fractional CFO suivent une méthodologie
              structurée en 4 phases :
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Phase 1 — Diagnostic (Semaine 1)",
                  text: "Nous auditons votre situation financière actuelle : qualité de la comptabilité, runway de trésorerie, rythme de reporting, et compétences de l'équipe. Livrable : un scorecard financier sur 10 points avec 5 priorités immédiates.",
                },
                {
                  title: "Phase 2 — Fondations (Semaines 2 à 4)",
                  text: "Nous mettons en place l'infrastructure financière : processus de clôture mensuelle, tableau de bord des KPIs, suivi budget vs réalisé, et prévision de trésorerie. Livrable : un reporting mensuel prêt pour le conseil d'administration.",
                },
                {
                  title: "Phase 3 — Accélération (Mois 2 à 6)",
                  text: "Nous nous concentrons sur les priorités stratégiques : accompagnement à la levée de fonds (data room, prévisions investisseurs), planification financière (forecast 12 mois, modélisation de scénarios), et optimisations opérationnelles (collecte de créances, maîtrise des dépenses).",
                },
                {
                  title: "Phase 4 — Transition (Mois 6+)",
                  text: "Lorsque votre équipe finance est prête, nous transférons l'ensemble des processus et de la documentation. Lorsque le besoin devient un temps plein durable, nous préparons la passation au CFO recruté : modèles, procédures et historique des décisions.",
                },
              ].map((phase, i) => (
                <div key={i} className="border-l-4 border-iter-chartreuse pl-4">
                  <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {phase.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Pour aller plus loin sur deux missions souvent intégrées au scope
              fractional CFO, voir nos services dédiés :{" "}
              <Link
                href="/services/accompagnement-levee-de-fond"
                className="text-iter-violet hover:underline font-medium"
              >
                accompagnement levée de fonds
              </Link>{" "}
              et{" "}
              <Link
                href="/services/controle-de-gestion-externalise"
                className="text-iter-violet hover:underline font-medium"
              >
                contrôle de gestion externalisé
              </Link>
              .
            </p>
          </div>

          {/* ── Section 4 — Tarifs ── */}
          <div id="tarifs" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Combien coûte un Fractional CFO ? Nos formules
            </h2>
            <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60 mb-6">
              <table className="w-full text-sm border-collapse">
                <caption className="caption-top text-left text-xs font-semibold uppercase tracking-widest text-iter-violet bg-muted/30 px-4 py-3">
                  Formules Fractional CFO Iter Advisors
                </caption>
                <thead className="bg-muted/40">
                  <tr>
                    {[
                      "Formule",
                      "Volume mensuel indicatif",
                      "Périmètre",
                      "Tarif mensuel HT",
                    ].map((h, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...FORMULES.map(f => [f.nom, f.volumeIndicatif, f.inclus, `${f.prixMin.toLocaleString("fr-FR")}–${f.prixMax.toLocaleString("fr-FR")} €`]),
                    ["Mission ponctuelle", "Projet", "Préparation de levée, audit défensif, data room, modèle financier", "Sur devis"],
                  ].map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="p-3 sm:p-4 font-semibold text-foreground border-b border-border/40 leading-relaxed">
                        {row[0]}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground border-b border-border/40 leading-relaxed">
                        {row[1]}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground border-b border-border/40 leading-relaxed">
                        {row[2]}
                      </td>
                      <td className="p-3 sm:p-4 text-muted-foreground border-b border-border/40 leading-relaxed font-medium">
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Toutes nos formules incluent : accès aux modèles financiers Iter
              Advisors, base de données de benchmarking SaaS, revues
              stratégiques trimestrielles, et un senior avec 10+ ans
              d'expérience. Consultez{" "}
              <Link
                href="/daf-externalise"
                className="text-iter-violet hover:underline font-medium"
              >
                toutes nos formules de CFO externalisé
              </Link>{" "}
              pour plus de détails. La tarification varie selon la complexité
              de l'entreprise (multi-entités, multi-devises) et la
              localisation. Pour la grille tarifaire FR détaillée, voir aussi{" "}
              <Link
                href="/daf-externalise/tarifs"
                className="text-iter-violet hover:underline font-medium"
              >
                les tarifs DAF externalisé
              </Link>
              .
            </p>
          </div>

          {/* ── Section 5 — Témoignages ── */}
          <div id="temoignages" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Ce que nos clients disent de leur Fractional CFO
            </h2>
            <div className="space-y-6">
              {/* Real Trustfolio reviews (2026-05-30) — replaces 3 prior
                  placeholder testimonials with initials-only attribution.
                  Source: lib/content/trustfolio-reviews.ts (verified Trustfolio). */}
              {[
                {
                  quote:
                    "Après avoir levé notre premier tour de table, nous avions besoin de structurer nos opérations financières. Iter a professionnalisé notre fonction financière et s'est avéré être un partenaire financier solide intégré à l'équipe.",
                  author: "Charles Deknudt",
                  role: "PDG et fondateur",
                  location: "Eltex",
                },
                {
                  quote:
                    "Les équipes d'Iter ont structuré notre fonction finance avec sérieux, disponibilité et efficacité, dépassant même nos attentes initiales.",
                  author: "Arnaud MEGE",
                  role: "Co-founder",
                  location: "Unplexed",
                },
                {
                  quote:
                    "Après 5 ans de collaboration, Iter demeure un véritable atout stratégique offrant expertise multidisciplinaire et vision à long terme.",
                  author: "Magali Quentel-Reme",
                  role: "CEO & Co-Founder",
                  location: "Opti Digital",
                },
              ].map((tst, i) => (
                <figure
                  key={i}
                  className="border-l-4 border-iter-violet bg-iter-violet/5 rounded-r-lg p-5 sm:p-6"
                >
                  <blockquote className="text-sm sm:text-base text-foreground/80 italic leading-relaxed mb-3">
                    « {tst.quote} »
                  </blockquote>
                  <figcaption className="text-xs sm:text-sm">
                    <span className="font-semibold text-foreground not-italic">
                      {tst.author}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      — {tst.role}, {tst.location}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <Link
                href="/ressources/cas-clients"
                className="text-iter-violet hover:underline font-medium"
              >
                Voir tous nos cas clients →
              </Link>
            </p>
          </div>

          {/* ── Section 6 — FAQ commerciale ── */}
          <div id="faq-commercial" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Fractional CFO — Questions fréquentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Que fait exactement un Fractional CFO ?",
                  answer:
                    "Un Fractional CFO gère la direction financière stratégique à temps partiel : planification financière, accompagnement à la levée de fonds, reporting aux investisseurs, gestion de trésorerie, et encadrement de votre équipe comptable. Contrairement à un comptable qui enregistre les transactions, un Fractional CFO interprète les données et guide les décisions stratégiques.",
                },
                {
                  question: "Combien coûte un Fractional CFO ?",
                  answer:
                    "Une mission démarre à 3 000 € HT par mois (formule Essentiel) et va jusqu'à 6 500 € pour un accompagnement de type Croissance, le format le plus fréquent en Série A. Un directeur financier salarié de séniorité équivalente représente 100 000 à 213 000 € de coût employeur annuel, charges comprises.",
                },
                {
                  question:
                    "Quand une startup doit-elle recruter un Fractional CFO ?",
                  answer:
                    "Les 5 déclencheurs les plus fréquents sont : (1) préparation d'une levée de fonds, (2) burn mensuel dépassant 100 K€, (3) expansion internationale, (4) obligations de reporting au board, et (5) ne disposer que d'un comptable sans direction financière stratégique.",
                },
                {
                  question:
                    "Quelle est la différence entre un Fractional CFO et un comptable ?",
                  answer:
                    "Un comptable enregistre et rapproche les transactions. Un Fractional CFO analyse la performance financière, construit des prévisions, accompagne les levées, et apporte des recommandations stratégiques au fondateur et au board.",
                },
                {
                  question:
                    "Un Fractional CFO peut-il aider pour une levée de fonds ?",
                  answer:
                    "Oui. Les Fractional CFO Iter Advisors ont accompagné des dizaines de levées de fonds du seed à la série B — plus de 100 M€ levés par nos clients depuis 2021. Ils préparent les data rooms, construisent les modèles financiers, créent les présentations investisseurs, et préparent les fondateurs à la due diligence.",
                },
                {
                  question:
                    "Dans quel délai un Fractional CFO peut-il intervenir ?",
                  answer:
                    "Iter Advisors met en relation les startups avec un Fractional CFO sous 5 jours ouvrés. Le diagnostic et la mise en route sont réalisés sous 2 semaines.",
                },
                {
                  question:
                    "Quelle est la différence entre un fractional CFO et un DAF externalisé ?",
                  answer:
                    "Aucune différence métier — ce sont deux noms pour le même rôle. \"DAF externalisé\" est le terme français historique ; \"fractional CFO\" est la terminologie anglo-saxonne plébiscitée par les startups VC-backed. Iter Advisors couvre les deux : pour la version FR généraliste, voir notre offre dédiée DAF externalisé.",
                },
                {
                  question:
                    "Puis-je commencer par une mission ponctuelle (data room, levée) ?",
                  answer:
                    "Oui. Nous proposons des missions ponctuelles à durée fixe (data room pour une levée, due diligence, mise en place du reporting, prévisionnel 12 mois). Tarification au forfait selon le périmètre, avec un calendrier défini au cadrage. Beaucoup de missions ponctuelles débouchent ensuite sur un engagement récurrent au mois.",
                },
                {
                  question:
                    "Comment se passe le matching avec le bon fractional CFO ?",
                  answer:
                    "Lors de l'échange initial de 30 minutes, nous identifions vos enjeux (stade, secteur, type de levée) ; puis nous proposons un fractional CFO de notre équipe selon son expérience sectorielle et son style d'intervention. Vous rencontrez le profil avant signature : pas de surprise au démarrage.",
                },
                {
                  question:
                    "Que se passe-t-il si on ne s'entend pas avec le fractional CFO ?",
                  answer:
                    "Sans durée d'engagement minimale, résiliable avec un préavis de 30 jours. En pratique, nous proposons d'abord un autre fractional CFO de l'équipe pour poursuivre la mission sans perdre le contexte : c'est l'avantage d'un cabinet de 15 CFOs vs un freelance solo.",
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-border/60 bg-background"
                >
                  <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-heading m-0">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-iter-violet shrink-0 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* ── Section 7 — CTA commercial ── */}
          <div id="cta-service" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6">
              Prêt à recruter votre Fractional CFO ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Demandez un appel découverte gratuit de 30 minutes avec Benjamin
              Ziza, Founding Partner & CFO chez Iter Advisors. Nous évaluerons
              vos besoins financiers et vous mettrons en relation avec le
              Fractional CFO adapté.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact#startup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all"
              >
                Prendre rendez-vous
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/daf-externalise"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                En savoir plus sur notre service Fractional CFO
              </Link>
            </div>
          </div>

          {/* ─── Encart recrutement compact (FCFO-S06) ────────────────
              Le bloc recrutement complet (rôle, profil, ce qu'on propose,
              process, FAQ candidats, JobPosting JSON-LD…) vit désormais sur
              /carrieres/fractional-cfo. On garde ici un appel discret pour
              les CFO seniors qui atterriraient sur la page commerciale. ─── */}
          <aside
            id="jobs-section"
            aria-label="Rejoindre l'équipe Iter Advisors"
            className="scroll-mt-24 rounded-2xl border border-iter-violet/30 bg-iter-violet/5 p-5 sm:p-6"
          >
            <h2 className="text-base sm:text-lg font-bold font-heading text-foreground mb-2">
              Vous êtes un CFO senior et souhaitez rejoindre notre équipe ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Nous recrutons en continu des fractional CFOs avec 10+ ans
              d&apos;expérience pour intervenir sur notre portefeuille de 85+
              startups en France et en Espagne.
            </p>
            <Link
              href="/carrieres/fractional-cfo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
            >
              Découvrir nos opportunités de recrutement
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </aside>

        </div>
      </section>

      <CaseProofLinks heading="Des missions de structuration et de croissance" slugs={["solarmente-serie-b-cleantech", "opti-digital-structuration-financement"]} />
      <CTASection locale="fr" />
    </PageLayout>
  );
}
