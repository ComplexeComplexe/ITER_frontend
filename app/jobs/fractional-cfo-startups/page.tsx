import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import type { CmsNavItem } from "@/lib/strapi";
import { BOOKING_URL } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Route for /jobs/fractional-cfo-startups.
 *
 * URL kept (preserves SEO authority earned on "fractional CFO" terms), intent
 * realigned to a pure commercial Service per FCFO-S03 / FCFO-S04 (2026-05-30,
 * strategie-fractional-cfo-startups.md). The JobPosting JSON-LD and the long
 * recruitment block moved to /carrieres/fractional-cfo so Google stops seeing
 * two contradictory intents on this URL.
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
 *   - BreadcrumbList (Accueil > Services > Fractional CFO Startups)
 */

const PAGE_URL =
  "https://www.iteradvisors.com/jobs/fractional-cfo-startups";

export async function generateMetadata(): Promise<Metadata> {
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
          "Expertise financière senior pour startups à temps partiel. Accompagnement levée de fonds, planification financière, reporting mensuel. Dès 4 500 €/mois.",
        areaServed: ["Paris", "Toulouse", "Barcelone"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Formules Fractional CFO",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Starter",
              price: "4500",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Growth",
              price: "8500",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Scale",
              price: "15000",
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
              text: "Le service Fractional CFO Iter Advisors démarre à 4 500 €/mois pour 2 jours par semaine. La formule la plus choisie est Growth à 8 500 €/mois pour 4 jours. Un recrutement CFO à plein temps coûte entre 120 000 € et 200 000 € par an plus des actions.",
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
              text: "Oui. Les Fractional CFO Iter Advisors ont accompagné plus de 50 levées de fonds du Seed à la Series B. Ils préparent les data rooms, construisent les modèles financiers, créent les présentations investisseurs, et préparent les fondateurs à la due diligence.",
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
              text: "Oui. Nous proposons des missions ponctuelles à durée fixe (data room pour une levée, due diligence, mise en place du reporting, prévisionnel 12 mois). Tarification au forfait selon le périmètre, opérationnel sous 5 jours ouvrés. Beaucoup de missions ponctuelles débouchent ensuite sur un engagement récurrent au mois.",
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
              text: "Aucun engagement de durée — vous pouvez interrompre la mission au mois suivant, sans frais. En pratique, nous proposons d'abord un autre fractional CFO de l'équipe pour poursuivre la mission sans perdre le contexte : c'est l'avantage d'un cabinet de 15 CFOs vs un freelance solo.",
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
      // ── BreadcrumbList ──────────────────────────────────────────
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.iteradvisors.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.iteradvisors.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Fractional CFO pour Startups",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return {
    title:
      "Fractional CFO pour Startups en France | Iter Advisors",
    description:
      "Embauchez un Fractional CFO senior pour votre startup. Dès 4 500 €/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title:
        "Fractional CFO pour Startups en France | Iter Advisors",
      description:
        "Embauchez un Fractional CFO senior pour votre startup. Dès 4 500 €/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
      url: PAGE_URL,
      type: "website",
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630 }],
  },
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Fractional CFO pour startups — Une expertise financière senior pour accélérer votre croissance
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed mb-6">
              Une expertise financière senior sans le coût du plein temps. De
              la levée de fonds à la planification financière, nos Fractional
              CFO accompagnent les fondateurs dans chaque étape de la
              croissance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={BOOKING_URL}
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
                "50+ startups accompagnées",
                "Paris · Toulouse · Barcelone",
                "Note moyenne clients : 4,9/5",
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
                { label: "Tarif Iter Advisors", text: "à partir de 4 500 €/mois — 3 formules Starter / Growth / Scale." },
                { label: "Délai d'intervention", text: "opérationnel en 5 jours ouvrés." },
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
              par semaine. Contrairement à un CFO à plein temps qui coûte entre
              120 000 € et 200 000 € par an, un Fractional CFO apporte la même
              expertise stratégique pour un budget 3 à 5 fois inférieur,
              généralement entre 4 500 € et 15 000 € par mois selon le
              périmètre.
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
                  text: "Un CFO à plein temps à Paris coûte entre 120 K€ et 200 K€ + bonus + actions. Un Fractional CFO Iter Advisors démarre à 4 500 €/mois — une réduction de 60 à 80 % du coût.",
                },
                {
                  title: "2. Une mise en route rapide.",
                  text: "Nos Fractional CFO sont opérationnels sous 2 semaines et livrent une première feuille de route financière sous 30 jours. Pas de processus de recrutement de 3 mois.",
                },
                {
                  title: "3. Des playbooks éprouvés.",
                  text: "Chaque Fractional CFO Iter Advisors a géré des levées de fonds de 5 M€ à 100 M€+. Il apporte des modèles financiers, des relations avec des investisseurs, et une méthodologie testée sur le terrain.",
                },
                {
                  title: "4. Une flexibilité totale.",
                  text: "Augmentez l'intervention pendant la levée de fonds. Réduisez après la clôture. Ajustez le périmètre chaque mois. Aucun engagement de long terme.",
                },
                {
                  title: "5. Un écosystème complet.",
                  text: "Au-delà du CFO individuel, vous accédez à l'écosystème Iter Advisors : cabinets comptables, conseillers fiscaux, partenaires juridiques, et données de benchmarking SaaS.",
                },
                {
                  title: "6. Zéro dilution au capital.",
                  text: "Contrairement à un CFO à plein temps qui demande généralement 0,5 à 1,5 % du capital, un Fractional CFO est un prestataire — aucun impact sur votre cap table.",
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
                  text: "Lorsque votre équipe finance est prête, nous transférons l'ensemble des processus et de la documentation. La plupart de nos clients recrutent un CFO à plein temps sous 12 à 18 mois, pleinement équipés avec des systèmes propres.",
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
                      "Jours/semaine",
                      "Périmètre",
                      "Tarif mensuel",
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
                    [
                      "Starter",
                      "2 jours",
                      "Reporting financier, suivi de trésorerie, clôture mensuelle",
                      "4 500 €",
                    ],
                    [
                      "Growth",
                      "4 jours",
                      "+ Accompagnement levée, reporting board, tableau de bord KPIs",
                      "8 500 €",
                    ],
                    [
                      "Scale",
                      "8 jours",
                      "+ Planification financière, relations investisseurs, mentoring équipe",
                      "15 000 €",
                    ],
                    [
                      "Projet",
                      "Sur mesure",
                      "Ponctuel : data room, modèle financier, due diligence",
                      "3 000 – 8 000 €",
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
                    "Le service Fractional CFO Iter Advisors démarre à 4 500 €/mois pour 2 jours par semaine. La plupart des startups choisissent la formule Growth à 8 500 €/mois pour 4 jours. Un recrutement CFO à plein temps coûte entre 120 000 € et 200 000 € par an plus des actions.",
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
                    "Oui. Les Fractional CFO Iter Advisors ont accompagné plus de 50 levées de fonds du Seed à la Series B. Ils préparent les data rooms, construisent les modèles financiers, créent les présentations investisseurs, et préparent les fondateurs à la due diligence.",
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
                    "Oui. Nous proposons des missions ponctuelles à durée fixe (data room pour une levée, due diligence, mise en place du reporting, prévisionnel 12 mois). Tarification au forfait selon le périmètre, opérationnel sous 5 jours ouvrés. Beaucoup de missions ponctuelles débouchent ensuite sur un engagement récurrent au mois.",
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
                    "Aucun engagement de durée — vous pouvez interrompre la mission au mois suivant, sans frais. En pratique, nous proposons d'abord un autre fractional CFO de l'équipe pour poursuivre la mission sans perdre le contexte : c'est l'avantage d'un cabinet de 15 CFOs vs un freelance solo.",
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
              Réservez un appel découverte gratuit de 30 minutes avec Benjamin
              Ziza, Founding Partner & CFO chez Iter Advisors. Nous évaluerons
              vos besoins financiers et vous mettrons en relation avec le
              Fractional CFO adapté.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
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

      <CTASection locale="fr" />
    </PageLayout>
  );
}
