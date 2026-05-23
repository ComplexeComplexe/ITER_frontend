import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Mail, Linkedin } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Route for /jobs/fractional-cfo-startups.
 *
 * TICKET F1 (2026-05-17) — Hybrid commercial + job page.
 *
 * Structure:
 *   - Commercial hero (H1) + trust badges + dual CTA
 *   - 7 commercial H2 sections (définition, avantages, méthodologie,
 *     tarifs, témoignages, FAQ, CTA final)
 *   - Job section (id="jobs-section", H2 "Rejoindre notre équipe") —
 *     existing job content preserved verbatim per ticket instruction.
 *
 * Schema @graph:
 *   - JobPosting (existing, preserved)
 *   - FinancialService (new, Starter/Growth/Scale)
 *   - FAQPage (6 commercial Q/R)
 *   - Organization
 *   - BreadcrumbList
 *
 * Internal links: 3× /daf-externalise per SEO brief
 *   (Section 1 intro, Section 4 tarifs, Section 7 CTA)
 */

const PAGE_URL =
  "https://www.iteradvisors.com/jobs/fractional-cfo-startups";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // ── JobPosting (preserved) ──────────────────────────────────
      {
        "@type": "JobPosting",
        title: "Fractional CFO pour Startups — Postuler | Iter Advisors",
        description:
          "Iter Advisors recrute des fractional CFOs seniors pour accompagner un portefeuille de startups tech (SaaS, deep-tech, e-commerce) basées en France et en Espagne. Vous prendrez en charge la direction financière de 3 à 5 clients en parallèle, sur un mode part-time flexible (freelance, portage ou CDI).",
        datePosted: "2026-05-04",
        validThrough: "2026-12-31",
        employmentType: ["CONTRACTOR", "FULL_TIME", "PART_TIME"],
        hiringOrganization: {
          "@type": "Organization",
          name: "Iter Advisors",
          sameAs: "https://www.iteradvisors.com",
          logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
        },
        jobLocation: [
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Carrer Casp, 54, 5-1°",
              addressLocality: "Barcelona",
              postalCode: "08010",
              addressRegion: "Catalunya",
              addressCountry: "ES",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Paris",
              addressRegion: "Île-de-France",
              addressCountry: "FR",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Toulouse",
              addressRegion: "Occitanie",
              addressCountry: "FR",
            },
          },
        ],
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: [
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "European Union" },
        ],
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: {
            "@type": "QuantitativeValue",
            minValue: 750,
            maxValue: 1250,
            unitText: "DAY",
          },
        },
        directApply: true,
        industry: "Financial Services",
        occupationalCategory: "11-3031.00 Financial Managers",
        qualifications:
          "10+ years of experience as CFO, Head of Finance or DAF in VC-backed startups or growing SMEs. Series A or B fundraising experience required. SaaS metrics expertise highly valued.",
        responsibilities:
          "Monthly financial reporting, cash flow management, fundraising support (data room, business plan, term sheet negotiation), management control, KPIs setup, strategic advisory to founders, board meetings preparation.",
        skills:
          "Pennylane, Sage, Agicap, Notion, Looker, Power BI, financial modelling, cash flow forecasting, fundraising, M&A",
        url: PAGE_URL,
      },
      // ── FinancialService (new, F1) ──────────────────────────────
      {
        "@type": "FinancialService",
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
            name: "Carrières",
            item: "https://www.iteradvisors.com/jobs",
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
      "Fractional CFO pour Startups — Postuler | Iter Advisors",
    description:
      "Embauchez un Fractional CFO pour votre startup. Expertise financière senior à temps partiel dès 4 500 €/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title:
        "Fractional CFO pour Startups — Postuler | Iter Advisors",
      description:
        "Embauchez un Fractional CFO pour votre startup. Expertise financière senior à temps partiel dès 4 500 €/mois. Levée de fonds, reporting, planification. Paris, Toulouse, Barcelone.",
      url: PAGE_URL,
      type: "website",
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
              { label: "Carrières", href: "/jobs" },
              { label: "Fractional CFO startups" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Fractional CFO pour startups — Recruter un CFO à temps partiel
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed mb-6">
              Une expertise financière senior sans le coût du plein temps. De
              la levée de fonds à la planification financière, nos Fractional
              CFO accompagnent les fondateurs dans chaque étape de la
              croissance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/daf-externalise"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                Découvrir notre service Fractional CFO
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="#jobs-section"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                Vous souhaitez nous rejoindre ? Voir nos offres
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
              localisation.
            </p>
          </div>

          {/* ── Section 5 — Témoignages ── */}
          <div id="temoignages" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Ce que nos clients disent de leur Fractional CFO
            </h2>
            <div className="space-y-6">
              {[
                {
                  quote:
                    "Nous avons fait appel à Iter Advisors 4 mois avant notre Series A. Ils ont reconstruit tout notre modèle financier, préparé le data room, et coaché notre CEO sur les questions des investisseurs. Nous avons levé 4,2 M€ en 6 semaines.",
                  author: "Thomas R.",
                  role: "CEO, SaaS B2B",
                  location: "Paris",
                },
                {
                  quote:
                    "En tant que première fois fondatrice, je ne savais pas ce que j'ignorais en finance. Notre Fractional CFO Iter Advisors a mis en place notre reporting, détecté un problème de trésorerie 3 mois avant qu'il ne nous impacte, et m'a donné confiance dans chaque conseil d'administration.",
                  author: "Sarah M.",
                  role: "Co-fondatrice, HealthTech",
                  location: "Barcelone",
                },
                {
                  quote:
                    "Nous sommes passés d'un big 4 à Iter Advisors. Deux fois moins cher, 3 fois plus réactifs, et quelqu'un qui comprend vraiment les métriques SaaS. Notre burn a baissé de 22 % le premier trimestre.",
                  author: "Luc B.",
                  role: "CEO, Marketplace",
                  location: "Toulouse",
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

          {/* ════════════════════════════════════════════════════════
              Section 8 — Job (PRÉSERVÉE, NE PAS MODIFIER)
              id="jobs-section" — anchor for the hero secondary CTA
              ════════════════════════════════════════════════════════ */}
          <div id="jobs-section" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Rejoindre notre équipe de Fractional CFO
            </h2>

            <div className="space-y-16 sm:space-y-24">

              {/* Le rôle */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Le rôle d'un fractional CFO chez Iter Advisors
                </h3>
                <div className="prose prose-sm sm:prose-base max-w-none space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Un <strong>fractional CFO</strong> (ou DAF à temps partagé)
                    est un directeur financier senior qui intervient dans
                    plusieurs entreprises sans être salarié à temps plein dans
                    aucune. Il assume les mêmes responsabilités qu'un CFO
                    interne — pilotage financier, trésorerie, reporting,
                    relations investisseurs — mais sur un mode flexible adapté
                    aux besoins de chaque startup.
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Chez Iter Advisors, vos missions typiques incluent :
                  </p>
                  <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                    <li>
                      • Mettre en place et opérer le reporting financier mensuel
                    </li>
                    <li>
                      • Piloter la trésorerie et construire les prévisionnels
                      (cash flow forecast 13 semaines, plan de trésorerie 12
                      mois)
                    </li>
                    <li>
                      • Préparer et accompagner les levées de fonds (data room,
                      business plan, négociation term sheet)
                    </li>
                    <li>
                      • Structurer le contrôle de gestion et les KPIs business
                      (ARR, NRR, CAC, LTV pour le SaaS)
                    </li>
                    <li>
                      • Conseiller la direction sur les décisions stratégiques
                      (pricing, recrutements, M&A)
                    </li>
                    <li>
                      • Animer les comités stratégiques et les boards
                      investisseurs
                    </li>
                  </ul>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Vous interviendrez sur un portefeuille de{" "}
                    <strong>startups tech en croissance</strong> : SaaS B2B,
                    deep-tech, e-commerce, fintech. La majorité de nos clients
                    ont entre 10 et 80 personnes, sont basés en France ou en
                    Espagne, et ont déjà levé un seed ou une Series A.
                  </p>
                </div>
              </div>

              {/* Profil recherché */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Profil recherché
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-3">
                      Expérience
                    </h4>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>
                        •{" "}
                        <strong>10 ans minimum</strong> en direction financière
                        (CFO, DAF, head of finance) dans des startups VC-backed
                        ou des PME en croissance
                      </li>
                      <li>
                        • Expérience d'au moins une{" "}
                        <strong>levée de fonds Series A ou B</strong> menée en
                        tant que CFO
                      </li>
                      <li>
                        • Idéalement une expérience préalable en mode{" "}
                        <strong>fractional / part-time / freelance</strong>{" "}
                        (mais pas obligatoire)
                      </li>
                      <li>
                        • Connaissance approfondie du business model SaaS et de
                        ses métriques (ARR, NRR, CAC, LTV, burn, runway)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-3">
                      Compétences
                    </h4>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>
                        • Maîtrise des outils modernes : Pennylane, Sage,
                        Agicap, Notion, Looker / Power BI
                      </li>
                      <li>
                        • Capacité à structurer rapidement une fonction finance
                        from scratch
                      </li>
                      <li>
                        • Aisance relationnelle avec les fondateurs et les
                        investisseurs
                      </li>
                      <li>
                        • Anglais professionnel courant (la moitié de nos
                        clients communiquent en anglais)
                      </li>
                      <li>
                        • Espagnol apprécié (cabinet basé à Barcelone)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-3">
                      Mindset
                    </h4>
                    <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                      <li>
                        • Autonomie et capacité à gérer plusieurs clients en
                        parallèle
                      </li>
                      <li>
                        • Goût pour les environnements entrepreneuriaux et
                        l'incertitude
                      </li>
                      <li>• Pragmatisme : on construit, on teste, on ajuste</li>
                      <li>
                        • Volonté de transmettre et de faire grandir ses pairs
                        au sein du cabinet
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ce que nous proposons */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Ce que nous proposons
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li>
                    •{" "}
                    <strong>Modèle d'engagement flexible</strong> : freelance,
                    portage salarial ou CDI selon votre situation
                  </li>
                  <li>
                    •{" "}
                    <strong>Rémunération attractive</strong> : indexée sur le
                    volume de missions et le type de client (typiquement 750–
                    1 250 € HT par jour selon séniorité)
                  </li>
                  <li>
                    •{" "}
                    <strong>Bureaux centraux</strong> à Barcelone (Rambla de
                    Catalunya), Paris et Toulouse — mode hybride, pas de
                    présence imposée
                  </li>
                  <li>
                    •{" "}
                    <strong>Portefeuille de clients déjà constitué</strong> :
                    pas de prospection à faire, vous arrivez sur des missions
                    qualifiées
                  </li>
                  <li>
                    •{" "}
                    <strong>Équipe support</strong> : analystes financiers et
                    CFOs partners pour vous épauler sur les missions complexes
                  </li>
                  <li>
                    •{" "}
                    <strong>Réseau d'experts</strong> : avocats d'affaires,
                    banquiers, experts-comptables, fonds VCs partenaires
                  </li>
                  <li>
                    •{" "}
                    <strong>Formation continue</strong> et participation à des
                    conférences (DFCG, France Digitale, EU-Startups)
                  </li>
                  <li>
                    •{" "}
                    <strong>
                      Culture fondée sur la confiance et l'autonomie
                    </strong>
                  </li>
                </ul>
              </div>

              {/* Pourquoi rejoindre */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Pourquoi rejoindre Iter Advisors plutôt que rester en solo ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Beaucoup de CFOs seniors hésitent entre rester en freelance
                  indépendant et rejoindre un cabinet. Voici ce que vous gagnez
                  en rejoignant Iter Advisors :
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li>
                    •{" "}
                    <strong>Flux de missions stable</strong> : nous générons les
                    leads, vous vous concentrez sur la finance
                  </li>
                  <li>
                    •{" "}
                    <strong>Backup en cas d'imprévu</strong> : un partner peut
                    prendre le relai sur un client si besoin
                  </li>
                  <li>
                    •{" "}
                    <strong>Cadre méthodologique partagé</strong> : nos
                    templates et nos process accélèrent vos missions
                  </li>
                  <li>
                    •{" "}
                    <strong>Communauté de pairs seniors</strong> : 15 CFOs et
                    analystes avec qui échanger
                  </li>
                  <li>
                    •{" "}
                    <strong>Couverture cross-border</strong> : nos clients sont
                    aussi bien en France qu'en Espagne, vous élargissez votre
                    champ d'intervention
                  </li>
                </ul>
              </div>

              {/* Chiffres */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Iter Advisors en quelques chiffres
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • <strong>+85 entreprises</strong> tech accompagnées depuis
                    2019
                  </li>
                  <li>
                    • <strong>+100 M€</strong> levés par nos clients (seed,
                    Series A, Series B)
                  </li>
                  <li>
                    • <strong>5/5 sur 35 avis Trustfolio</strong>
                  </li>
                  <li>
                    • <strong>3 bureaux</strong> : Barcelone, Paris, Toulouse
                  </li>
                  <li>
                    • Recommandé par{" "}
                    <Link
                      href="https://wilco-startup.com"
                      target="_blank"
                      rel="noopener"
                      className="text-iter-violet hover:underline"
                    >
                      WILCO
                    </Link>{" "}
                    et présent dans l'écosystème{" "}
                    <Link
                      href="https://francedigitale.org"
                      target="_blank"
                      rel="noopener"
                      className="text-iter-violet hover:underline"
                    >
                      France Digitale
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Comment postuler */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Comment postuler
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Envoyez votre CV et un message court présentant votre parcours
                  et vos motivations à{" "}
                  <a
                    href="mailto:recrutement@iteradvisors.com"
                    className="text-iter-violet hover:underline font-semibold"
                  >
                    recrutement@iteradvisors.com
                  </a>
                  , ou directement à{" "}
                  <a
                    href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-iter-violet hover:underline font-semibold"
                  >
                    Sébastien Doat sur LinkedIn
                  </a>
                  .
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 font-semibold">
                  Le process de recrutement comprend :
                </p>
                <ol className="space-y-2 text-sm sm:text-base text-muted-foreground list-decimal list-inside">
                  <li>
                    1️⃣ Échange initial de 30 minutes avec Sébastien (founding
                    partner)
                  </li>
                  <li>
                    2️⃣ Entretien approfondi avec un partner et un CFO senior
                    (1h30)
                  </li>
                  <li>
                    3️⃣ Cas pratique sur un dossier client réel anonymisé (2h, à
                    votre rythme)
                  </li>
                  <li>4️⃣ Rencontre informelle avec l'équipe</li>
                  <li>5️⃣ Offre et démarrage sous 4 semaines maximum</li>
                </ol>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
                  <strong>
                    Délai moyen entre la candidature et la première mission : 6
                    semaines
                  </strong>
                  .
                </p>
              </div>

              {/* Pour aller plus loin */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  Pour aller plus loin
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Avant de candidater, vous pouvez approfondir votre
                  compréhension de notre métier et de notre approche :
                </p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li>
                    •{" "}
                    <Link
                      href="/daf-externalise"
                      className="text-iter-violet hover:underline"
                    >
                      Notre offre de DAF externalisé
                    </Link>{" "}
                    — la version FR de ce que vous ferez côté client
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/daf-externalise"
                      className="text-iter-violet hover:underline"
                    >
                      DAF à temps partagé : missions, formules et tarifs
                    </Link>
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/services/controle-de-gestion-externalise"
                      className="text-iter-violet hover:underline"
                    >
                      Contrôle de gestion externalisé
                    </Link>{" "}
                    — l'une de vos missions clés côté client
                  </li>
                  <li>
                    •{" "}
                    <Link
                      href="/services/comptabilite-externalisation"
                      className="text-iter-violet hover:underline"
                    >
                      Externalisation comptable
                    </Link>{" "}
                    — la base de votre travail
                  </li>
                </ul>
              </div>

              {/* FAQ job */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
                  FAQ — questions fréquentes sur le recrutement
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Suis-je obligé(e) d'être en freelance ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Non. Nous proposons trois modes d'engagement : freelance
                      pur, portage salarial ou CDI temps plein avec rémunération
                      variable selon les missions. Le choix dépend de votre
                      situation personnelle et fiscale.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Puis-je continuer à avoir des clients en propre en
                      parallèle ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Oui, à condition qu'il n'y ait pas de conflit d'intérêts
                      avec nos clients (concurrence directe). Nous validons cela
                      ensemble lors de la signature.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Combien de jours par mois faut-il être disponible ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Au minimum 8 jours par mois (équivalent 2 missions de
                      formule Essentiel). La plupart de nos fractional CFOs
                      travaillent entre 12 et 18 jours par mois pour Iter
                      Advisors.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Y a-t-il une obligation de présence à Barcelone, Paris ou
                      Toulouse ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Non. Vous pouvez résider n'importe où en France, en
                      Espagne ou en Europe. Une présence ponctuelle dans nos
                      bureaux est appréciée pour les comités, mais pas
                      obligatoire. La plupart des missions se déroulent en
                      hybride (1 jour sur site / 1 jour distant) ou 100 %
                      distant.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Quel est le profil typique d'un fractional CFO recruté
                      chez Iter Advisors ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Ancien CFO ou head of finance dans une scale-up (Series A
                      à Series C), 10–20 ans d'expérience, ayant déjà mené au
                      moins une levée de fonds. La majorité de nos CFOs ont une
                      expérience SaaS, deep-tech ou e-commerce.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold font-heading text-foreground mb-2">
                      Quel est le délai entre ma candidature et la première
                      mission ?
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      En moyenne 6 semaines : 3 semaines de process de
                      recrutement, puis 3 semaines pour vous matcher avec un
                      client adapté à votre profil.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA job final */}
              <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
                <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Prêt à rejoindre l'équipe ?
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:recrutement@iteradvisors.com"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <Mail size={18} />
                    Envoyer votre CV
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
                  >
                    <Linkedin size={18} />
                    Contacter Sébastien
                  </a>
                </div>
              </div>

            </div>
          </div>
          {/* ── end #jobs-section ── */}

        </div>
      </section>

      <CTASection locale="fr" />
    </PageLayout>
  );
}
