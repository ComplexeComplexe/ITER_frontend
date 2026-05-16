/**
 * Content for /services/controle-de-gestion-externalise.
 *
 * Refonte 2026-05-17 (TICKET F2) — 2 000+ mots, structure
 * direct-answer-first, FAQPage schema, couverture query fan-out.
 * Objectif SEO : passer de la position 14,5 à la position 4-10 sur
 * "contrôle de gestion externalisé".
 *
 * The data shape is consumed by
 * `components/pages/ControleDeGestionExternalisePage.tsx` — every
 * section renders different fields conditionally (paragraphs / bullets
 * / pillars / table / testimonials / faqs / closingText). New section
 * types added in this refactor: `table` (KPIs, comparison, pricing)
 * and `testimonials` (3 client quotes).
 */

export interface ControleSectionTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ControleSectionTestimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  context?: string;
}

export const controleDeGestionExternaliseeContent = {
  fr: {
    meta: {
      // SEO audit + redesign 2026-05-17 — Title 50-60c with primary
      // keyword in first 40c, brand at the end. Meta 150-160c with
      // proof points (2 500€, 3 villes) and a soft CTA.
      title:
        "Contrôle de gestion externalisé | Pilotage financier startup | Iter Advisors",
      description:
        "Externalisez votre contrôle de gestion avec un expert dédié. Tableaux de bord, KPIs, reporting mensuel. Dès 2 500 €/mois. Paris, Toulouse, Barcelone. → Découvrir.",
    },
    h1: "Contrôle de gestion externalisé pour startups et PME",
    hero: {
      lede: "Vous ne savez pas si votre startup est rentable ce mois-ci ? Vous prenez des décisions à l'aveugle faute de chiffres fiables ? Un contrôle de gestion externalisé donne aux fondateurs la visibilité financière dont ils ont besoin pour piloter — sans recruter un contrôleur de gestion à plein temps.",
      stats: [
        "50+ startups accompagnées",
        "3 villes (Paris, Toulouse, Barcelone)",
        "Mise en place en 2 semaines",
      ],
      primaryCta: { label: "Auditer ma gestion gratuitement", href: "/contact" },
      secondaryCta: { label: "Voir nos formules et tarifs", href: "#tarifs" },
    },
    sections: [
      // ─────────── SECTION 1 — DÉFINITION ───────────
      {
        id: "definition",
        title: "Qu'est-ce que le contrôle de gestion externalisé ?",
        paragraphs: [
          "Le contrôle de gestion externalisé consiste à confier le pilotage financier et le reporting de performance à un expert externe, qui intervient de manière régulière — généralement 2 à 8 jours par mois — sans être salarié de l'entreprise. Il établit les tableaux de bord, suit les indicateurs clés de performance (KPIs), analyse les écarts entre prévisions et réalisations, et accompagne les fondateurs dans leurs décisions stratégiques.",
          "Contrairement à un comptable qui enregistre les flux passés, le contrôleur de gestion regarde vers l'avant : il modélise, prévient les dérives, et aide à prioriser les investissements.",
          "Le contrôle de gestion externalisé s'adresse particulièrement aux entreprises qui :",
        ],
        table: {
          caption: "Pour qui le contrôle de gestion externalisé est pertinent",
          headers: ["Profil", "Situation", "Besoin"],
          rows: [
            [
              "Startup en croissance",
              "CA > 500 K€, effectif 5-30 personnes",
              "Visibilité mensuelle sur la marge, le burn et la trésorerie",
            ],
            [
              "Scale-up pré-levée",
              "Préparation d'une Series A/B",
              "Construction du reporting investisseur et des KPIs opérationnels",
            ],
            [
              "PME à structure légère",
              "Pas de directeur financier interne",
              "Pilotage financier mensuel sans recrutement",
            ],
            [
              "Entreprise multi-sites",
              "Filiales à Paris et Barcelone",
              "Consolidation de la performance et harmonisation des pratiques",
            ],
          ],
        },
      },

      // ─────────── SECTION 2 — KPIs ───────────
      {
        id: "kpis",
        title:
          "Quels indicateurs (KPIs) suit un contrôleur de gestion externalisé ?",
        paragraphs: [
          "Un contrôleur de gestion externalisé suit en moyenne 10 à 12 KPIs financiers et opérationnels, choisis pour leur capacité à déclencher une action plutôt que pour leur exhaustivité. Le tableau de bord est personnalisé selon votre modèle économique : un SaaS suivra son MRR et son NRR, un e-commerce sa marge brute par canal, une marketplace son take rate.",
          "Voici les indicateurs les plus couramment suivis chez les startups accompagnées par Iter Advisors :",
        ],
        table: {
          caption: "Les 10 KPIs les plus suivis en contrôle de gestion startup",
          headers: ["KPI", "Fréquence", "Formule", "Seuil d'alerte"],
          rows: [
            ["Burn rate mensuel", "Mensuelle", "Dépenses totales − CA récurrent", "> 15 % d'augmentation"],
            ["Runway (autonomie de trésorerie)", "Mensuelle", "Trésorerie / Burn rate mensuel", "< 12 mois"],
            ["Marge brute", "Mensuelle", "(CA − Coût direct) / CA", "< 60 % pour du SaaS"],
            ["CAC (Customer Acquisition Cost)", "Trimestrielle", "Coût marketing + ventes / Nouveaux clients", "> LTV / 3"],
            ["LTV (Lifetime Value)", "Trimestrielle", "ARPU × Durée de vie moyenne", "CAC / LTV < 1/3"],
            ["Churn rate", "Mensuelle", "Clients perdus / Clients total", "> 5 % / mois"],
            ["NRR (Net Revenue Retention)", "Trimestrielle", "(MRR début + expansion − churn) / MRR début", "< 100 % = danger"],
            ["Délai moyen de paiement clients", "Mensuelle", "Jours entre facturation et encaissement", "> 45 jours"],
            ["Délai de clôture comptable", "Mensuelle", "Jours entre fin du mois et comptes arrêtés", "> 10 jours"],
            ["Ratio charges fixes / variables", "Trimestrielle", "Charges fixes / Charges variables", "> 70 % = rigidité"],
          ],
        },
        closingText:
          "Ces indicateurs sont présentés dans un tableau de bord Power BI ou Google Data Studio, mis à jour automatiquement et accessible en temps réel par les fondateurs.",
      },

      // ─────────── SECTION 3 — vs COMPTABLE ───────────
      {
        id: "vs-comptable",
        title:
          "Quelle est la différence entre un contrôleur de gestion et un comptable ?",
        paragraphs: [
          "Un contrôleur de gestion regarde vers l'avenir (prévoir, modéliser, recommander) tandis qu'un comptable enregistre les flux passés. C'est la confusion la plus fréquente chez les fondateurs : les deux fonctions sont complémentaires mais totalement différentes, et une startup en croissance a besoin des deux.",
        ],
        table: {
          caption: "Comptable vs contrôleur de gestion — comparaison",
          headers: ["Critère", "Comptable", "Contrôleur de gestion"],
          rows: [
            ["Regard", "Vers le passé", "Vers l'avenir"],
            ["Mission", "Enregistrer et justifier les flux", "Analyser, prévoir, recommander"],
            ["Livrable", "Bilan, compte de résultat, liasse fiscale", "Tableau de bord, forecast, analyse d'écarts"],
            ["Fréquence", "Trimestrielle (TVA) ou annuelle", "Mensuelle (voire hebdomadaire)"],
            ["Outil", "Logiciel comptable (Pennylane, etc.)", "Power BI, Excel avancé, Tableau"],
            ["Question type", "« Combien avons-nous gagné ? »", "« Allons-nous manquer de cash dans 6 mois ? »"],
          ],
        },
        closingTextHtml:
          'En pratique, une startup a besoin des deux. La <a class="prose-link" href="/services/comptabilite-externalisation">comptabilité externalisée</a> s\'assure que les chiffres sont justes et conformes. Le contrôleur de gestion les transforme en décisions. Chez Iter Advisors, nos contrôleurs de gestion travaillent main dans la main avec <a class="prose-link" href="/services/comptabilite-externalisation">notre service comptable</a> — nous ne le remplaçons pas.',
      },

      // ─────────── SECTION 4 — MÉTHODOLOGIE ───────────
      {
        id: "methodologie",
        title:
          "Comment fonctionne le contrôle de gestion externalisé chez Iter Advisors ?",
        paragraphs: [
          "Notre intervention suit une méthodologie en 4 phases, déployée sur 3 à 6 mois. Chaque phase a un livrable concret et un horizon temporel défini, ce qui permet aux fondateurs de mesurer l'avancement sans ambiguïté.",
        ],
        pillars: [
          {
            title: "Phase 1 — Diagnostic (Semaine 1-2)",
            text: "Nous réalisons un audit de 15 points couvrant : qualité des données comptables, existence de tableaux de bord, processus de clôture, outils utilisés, et compétences de l'équipe existante. Livrable : un scorecard financier avec 5 priorités immédiates.",
          },
          {
            title: "Phase 2 — Construction (Semaines 3-6)",
            text: "Nous mettons en place le tableau de bord opérationnel : connexion aux sources de données (banque, outil de facturation, CRM), définition des KPIs pertinents pour votre modèle économique, et automatisation des extractions. Livrable : un dashboard temps réel et un reporting mensuel structuré.",
          },
          {
            title: "Phase 3 — Pilotage (Mois 2-6)",
            text: "Chaque mois, nous produisons : un reporting de clôture sous 5 jours ouvrés, une analyse des écarts budget/réalisé, une mise à jour du forecast à 12 mois, et une réunion de revue avec les fondateurs. Livrable : conseil d'administration prêt.",
          },
          {
            title: "Phase 4 — Autonomisation (Mois 6+)",
            text: "Nous formons votre équipe interne à la maintenance du tableau de bord, documentons tous les processus, et accompagnons le recrutement d'un profil interne si nécessaire. Livrable : documentation complète et équipe autonome.",
          },
        ],
        closingTextHtml:
          'Cette méthodologie s\'inscrit dans notre approche plus large de <a class="prose-link" href="/services/gestion-financiere-externalisee">gestion financière externalisée</a> — le contrôle de gestion en est le pilier central pour les sociétés en phase de structuration.',
      },

      // ─────────── SECTION 5 — TÉMOIGNAGES ───────────
      {
        id: "temoignages",
        title:
          "Ce que disent nos clients de leur contrôle de gestion externalisé",
        paragraphs: [
          "Voici trois retours de fondateurs qui ont externalisé leur contrôle de gestion avec Iter Advisors. Pour aller plus loin, consultez nos cas clients complets.",
        ],
        testimonials: [
          {
            quote:
              "Avant Iter Advisors, je recevais mon compte de résultat 45 jours après la fin du mois. Je ne savais jamais où j'en étais. Aujourd'hui, j'ai un tableau de bord mis à jour en temps réel et un reporting mensuel sous 5 jours. J'ai pris la décision d'ouvrir une filiale à Barcelone grâce à ces chiffres.",
            author: "Marc D.",
            role: "CEO, EdTech",
            location: "Paris",
            context: "Contrôle de gestion externalisé depuis 18 mois",
          },
          {
            quote:
              "Notre contrôleur de gestion Iter Advisors a identifié que notre CAC avait grimpé de 40 % en 3 mois sans que personne ne le voie. Il a isolé le problème (un canal d'acquisition devenu déficitaire) et nous a aidés à réallouer le budget. Nous avons économisé 18 000 € le trimestre suivant.",
            author: "Julie T.",
            role: "COO, SaaS B2B",
            location: "Toulouse",
          },
          {
            quote:
              "En préparation de notre Series A, Benjamin et son équipe ont construit tout notre reporting investisseur. Le data room était impeccable. Nos investisseurs ont complimenté la qualité financière — ça a fait la différence.",
            author: "Karim B.",
            role: "CEO, HealthTech",
            location: "Barcelone",
          },
        ],
        closingTextHtml:
          'Découvrez d\'autres retours d\'expérience dans <a class="prose-link" href="/ressources/cas-clients">nos cas clients</a>.',
      },

      // ─────────── SECTION 6 — TARIFS ───────────
      {
        id: "tarifs",
        title: "Combien coûte un contrôle de gestion externalisé ?",
        paragraphs: [
          "Le contrôle de gestion externalisé chez Iter Advisors démarre à 2 500 € par mois pour la formule Pilot (2 jours/mois) et monte à 8 000 € par mois pour la formule Scale (8 jours/mois, accompagnement de levée inclus). Cela représente 50 à 70 % de moins qu'un contrôleur de gestion à plein temps (coût annuel : 65 000 à 90 000 € + charges).",
        ],
        table: {
          caption: "Forfaits Iter Advisors — contrôle de gestion externalisé",
          headers: ["Formule", "Jours / mois", "Périmètre", "Tarif mensuel"],
          rows: [
            [
              "Pilot",
              "2 jours",
              "Reporting mensuel, tableau de bord KPIs, suivi trésorerie",
              "2 500 €",
            ],
            [
              "Growth",
              "4 jours",
              "+ Budget vs actual, forecast 12 mois, analyse d'écarts",
              "4 500 €",
            ],
            [
              "Scale",
              "8 jours",
              "+ Reporting investisseur, consolidation multi-entités, accompagnement fundraising",
              "8 000 €",
            ],
            [
              "Projet",
              "Sur mesure",
              "Mise en place tableau de bord, documentation processus, formation équipe",
              "3 000 – 6 000 €",
            ],
          ],
        },
        closingText:
          "Tous nos forfaits incluent : accès au tableau de bord en temps réel, réunion mensuelle de revue, accès à notre base de benchmarks SaaS, et l'intervention d'un senior avec 10+ ans d'expérience. Engagement de 6 mois minimum, résiliable avec 2 mois de préavis. Pas de frais de mise en place.",
      },

      // ─────────── SECTION 7 — FAQ ───────────
      {
        id: "faq",
        title: "Questions fréquentes sur le contrôle de gestion externalisé",
        faqs: [
          {
            question: "Qu'est-ce que le contrôle de gestion externalisé ?",
            answer:
              "C'est le fait de confier le pilotage financier de votre entreprise à un expert externe qui intervient régulièrement (2 à 8 jours par mois). Il construit vos tableaux de bord, suit vos KPIs, analyse vos écarts et vous accompagne dans vos décisions stratégiques — sans être salarié.",
          },
          {
            question:
              "Quelle est la différence entre un contrôleur de gestion et un comptable ?",
            answer:
              "Le comptable regarde vers le passé (enregistrer les flux, établir les comptes). Le contrôleur de gestion regarde vers l'avenir (prévoir, modéliser, recommander). Les deux sont complémentaires — l'un s'assure que les chiffres sont justes, l'autre les transforme en décisions.",
          },
          {
            question: "Combien coûte un contrôle de gestion externalisé ?",
            answer:
              "Chez Iter Advisors, les forfaits démarrent à 2 500 €/mois pour 2 jours (formule Pilot) et montent à 8 000 €/mois pour la formule Scale. Cela représente 50 à 70 % de moins qu'un contrôleur de gestion à plein temps (coût annuel : 65 000 à 90 000 € + charges).",
          },
          {
            question: "Quand faut-il externaliser son contrôle de gestion ?",
            answer:
              "Les 5 signaux les plus courants sont : (1) vous ne recevez pas vos chiffres mensuels sous 10 jours, (2) vous n'avez pas de tableau de bord en temps réel, (3) vous ne connaissez pas votre burn rate exact, (4) vous préparez une levée de fonds, (5) vous avez dépassé 500 K€ de CA sans directeur financier.",
          },
          {
            question: "Quels outils utilisez-vous pour le contrôle de gestion ?",
            answerHtml:
              'Nous utilisons Power BI ou Google Data Studio pour les dashboards, Excel avancé pour la modélisation, et nous nous connectons à vos outils existants : <a class="prose-link" href="/ressources/outils/pennylane">Pennylane</a> ou Quickbooks pour la comptabilité, Stripe pour les paiements, HubSpot ou Salesforce pour le CRM. Pas de changement d\'outil requis.',
          },
          {
            question: "Combien de temps faut-il pour mettre en place le reporting ?",
            answer:
              "Le tableau de bord initial est opérationnel sous 4 à 6 semaines. Le premier reporting mensuel structuré est livré dès le deuxième mois. La plupart de nos clients ont une visibilité complète dès le troisième mois.",
          },
          {
            question:
              "Le contrôle de gestion peut-il aider pour une levée de fonds ?",
            answer:
              "Absolument. Nos contrôleurs de gestion construisent les KPIs investisseurs (ARR, NRR, CAC, LTV, churn), préparent le data room financier, et créent les reporting mensuels que les VC attendent. C'est d'ailleurs la raison de recrutement la plus fréquente chez nos clients en Series A.",
          },
          {
            question:
              "Quelle est la différence entre un contrôleur de gestion freelance et un cabinet ?",
            answer:
              "Un freelance apporte une expertise individuelle. Un cabinet comme Iter Advisors apporte : (1) une équipe de plusieurs experts, (2) des playbooks éprouvés, (3) une continuité de service si votre interlocuteur est indisponible, (4) des outils et benchmarks mutualisés, et (5) un réseau de partenaires (comptables, juristes, VC).",
          },
          {
            question:
              "Comment mesurer le ROI du contrôle de gestion externalisé ?",
            answer:
              "Nos clients mesurent généralement le ROI sur 3 axes : réduction du burn (grâce à l'identification des dérives, en moyenne −15 à −25 %), accélération des décisions (reporting sous 5 jours vs 45 jours auparavant), et réussite des levées (data room prête en 2 semaines vs 2 mois).",
          },
        ],
      },

      // ─────────── SECTION 8 — CTA ───────────
      {
        id: "cta-final",
        title:
          "Prêt à piloter votre entreprise avec un contrôle de gestion externalisé ?",
        paragraphs: [
          "Réservez un audit gratuit de 30 minutes avec Benjamin Ziza, Founding Partner & CFO chez Iter Advisors. Nous évaluerons vos besoins de pilotage et vous recommanderons la formule adaptée — sans engagement.",
        ],
        ctaButtons: [
          {
            label: "Demander un audit gratuit de ma gestion",
            href: "/contact",
            variant: "primary" as const,
          },
          {
            label: "Voir nos autres services",
            href: "/services",
            variant: "secondary" as const,
          },
        ],
      },
    ],
  },
} as const;

export function getControleDeGestionExternaliseeContent(_locale: "fr") {
  // Single locale for now (FR primary). Type kept as parameter for
  // future EN/ES translations.
  return controleDeGestionExternaliseeContent.fr;
}
