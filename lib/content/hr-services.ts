import { Locale } from "../i18n";

/**
 * HR service pages (TICKET 1) — 4 dedicated pages spun out of /drh-externalise
 * to resolve the 5-card cannibalization on /services. FR content only for
 * now; EN/ES translations to follow.
 */

export interface HRServiceUseCase {
  title: string;
  description: string;
}

export interface HRServicePricingRow {
  formula: string;
  scope: string;
  price: string;
}

export interface HRServiceContent {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  breadcrumb: string;
  intro: string[];
  whatIs: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  };
  whyOutsource: {
    heading: string;
    benefits: { label: string; description: string }[];
  };
  approach: {
    heading: string;
    phases: { step: string; description: string }[];
  };
  useCases: {
    heading: string;
    cases: HRServiceUseCase[];
  };
  pricing: {
    heading: string;
    rows: HRServicePricingRow[];
    note?: string;
  };
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export type HRServiceSlug =
  | "recrutement-talent-acquisition"
  | "gestion-paie-charges-sociales"
  | "formation-developpement"
  | "conformite-droit-travail";

export const hrServices: Record<HRServiceSlug, HRServiceContent> = {
  "recrutement-talent-acquisition": {
    slug: "recrutement-talent-acquisition",
    meta: {
      title: "Recrutement & Talent Acquisition externalisé | Iter Advisors",
      description:
        "Externalisez votre recrutement avec un DRH externalisé : sourcing, présélection, entretiens, onboarding. Forfait mensuel sans commission de placement.",
    },
    h1: "Recrutement & Talent Acquisition externalisé — Iter Advisors",
    breadcrumb: "Recrutement & Talent Acquisition",
    intro: [
      "Le recrutement est le premier levier de croissance d'une entreprise. Une bonne hire à temps peut accélérer votre développement ; une mauvaise hire peut vous coûter 6 à 12 mois de progression. Pour les startups et PME qui n'ont pas les moyens d'un DRH à temps plein, externaliser le recrutement est une stratégie efficace pour attirer les bonnes compétences sans mobiliser des ressources internes limitées.",
      "Chez Iter Advisors, nous accompagnons des dizaines de clients chaque année sur leurs problématiques de recrutement — de la définition du poste à l'intégration du collaborateur. Notre équipe de DRH externalisés connaît les spécificités des startups tech, SaaS et PME en croissance.",
    ],
    whatIs: {
      heading: "Qu'est-ce que le recrutement externalisé ?",
      paragraphs: [
        "Le recrutement externalisé consiste à confier tout ou partie du processus d'acquisition de talents à un expert RH extérieur. Cela peut couvrir :",
      ],
      bullets: [
        "La définition du profil et de la fiche de poste adaptée à votre culture d'entreprise",
        "Le sourcing sur les canaux pertinents (LinkedIn, job boards spécialisés, réseaux professionnels)",
        "Le pré-screening des candidats (entretiens techniques, culture fit, vérification des références)",
        "L'organisation du process d'entretien avec vos équipes",
        "La négociation et la rédaction de l'offre",
        "L'onboarding et l'intégration des nouvelles recrues",
      ],
    },
    whyOutsource: {
      heading: "Pourquoi externaliser le recrutement ?",
      benefits: [
        {
          label: "Accélération du time-to-hire",
          description:
            "Nos clients réduisent leur délai de recrutement de 30 à 40% en moyenne. Un process structuré avec un pipeline de candidats qualifiés évite les blocages et les pertes de candidats.",
        },
        {
          label: "Accès à un réseau élargi",
          description:
            "Notre équipe cumule 15+ ans d'expérience RH dans la tech et la finance. Nous avons accès à des réseaux de candidats passifs que les job boards publics n'atteignent pas.",
        },
        {
          label: "Réduction du taux d'erreur de recrutement",
          description:
            "Process structuré avec critères clairs, entretiens techniques adaptés et vérification rigoureuse des références. Turnover lié à de mauvais recrutements réduit de 25%.",
        },
        {
          label: "Focus des fondateurs préservé",
          description:
            "Chez nos clients seed/Series A, les fondateurs passent 20 à 30% de leur temps sur du recrutement. Externaliser libère ce temps précieux pour le produit et le business.",
        },
        {
          label: "Adaptabilité",
          description:
            "Vous recrutez 3 personnes ce trimestre et 12 le suivant ? Notre modèle s'adapte à votre rythme sans surcoût structurel.",
        },
      ],
    },
    approach: {
      heading: "Notre approche en 4 phases",
      phases: [
        {
          step: "Phase 1 — Cadrage (semaine 1)",
          description:
            "Compréhension de votre culture d'entreprise, vos équipes actuelles, vos objectifs de croissance et les compétences manquantes. Définition du profil idéal — hard skills, soft skills, culture fit — et établissement d'un calendrier de recrutement réaliste.",
        },
        {
          step: "Phase 2 — Sourcing actif (semaines 2-4)",
          description:
            "Stratégie de sourcing multi-canaux : LinkedIn Recruiter, job boards spécialisés (Welcome to the Jungle, Les Jeudis, AngelList), réseaux professionnels et headhunting ciblé pour les profils seniors. Chaque candidat est présélectionné via un entretien de 30 minutes avant d'être présenté.",
        },
        {
          step: "Phase 3 — Sélection (semaines 3-6)",
          description:
            "Organisation du process d'entretien avec vos équipes : entretiens techniques, culture fit, case studies si pertinent. Accompagnement de la négociation salariale et rédaction de l'offre d'emploi.",
        },
        {
          step: "Phase 4 — Intégration (mois 1-3)",
          description:
            "Suivi de l'onboarding du nouveau collaborateur : plan d'intégration 30-60-90 jours, points de suivi réguliers, feedback au manager. Objectif : une intégration réussie et un collaborateur opérationnel au plus vite.",
        },
      ],
    },
    useCases: {
      heading: "Cas d'usage",
      cases: [
        {
          title: "Startup SaaS en Series A — 15 → 35 personnes",
          description:
            "La startup levait 5M€ et devait recruter 20 personnes en 6 mois (développeurs, PM, commerciaux). Notre DRH a structuré le process, créé un ATS maison, et réduit le time-to-hire de 45 à 28 jours. Résultat : 18 recrutements sur 20 en 6 mois, turnover à 6 mois de 5%.",
        },
        {
          title: "PME e-commerce — 25 personnes",
          description:
            "Recherche d'un responsable logistique et 3 préparateurs de commandes. Définition des profils, gestion des annonces, présélection de 40 candidats, organisation des entretiens. Résultat : 4 recrutements en 8 semaines, dont un profil senior 10 ans d'expérience.",
        },
        {
          title: "Scale-up tech à Barcelone — 50 personnes",
          description:
            "Recrutement de profils tech anglophones à Barcelone. Notre réseau local et notre connaissance du marché tech catalan ont permis de sourcer 12 développeurs en 4 mois. Équipe technique doublée, productivité maintenue.",
        },
      ],
    },
    pricing: {
      heading: "Tarification indicative",
      rows: [
        { formula: "Sourcing", scope: "Définition profil + sourcing + présélection", price: "800-1 200 €/mois" },
        { formula: "Recrutement clé en main", scope: "Process complet jusqu'à l'intégration", price: "2 000-3 500 €/mois" },
        { formula: "Rétention & culture", scope: "Onboarding + suivi intégration + culture RH", price: "1 500-2 500 €/mois" },
      ],
      note: "Forfait mensuel, sans commission de placement. Engagement minimum 3 mois.",
    },
    cta: {
      heading: "Vous recrutez sur les 6 prochains mois ?",
      body: "Parlons de votre plan de recrutement. Notre équipe vous aide à structurer votre process et à attirer les talents adaptés à votre culture.",
      buttonLabel: "Prendre rendez-vous",
    },
  },
  "gestion-paie-charges-sociales": {
    slug: "gestion-paie-charges-sociales",
    meta: {
      title: "Gestion de la paie externalisée | Iter Advisors",
      description:
        "Externalisez votre paie sur PayFit ou Silae : bulletins, DSN, URSSAF, charges sociales. Taux d'erreur < 0,5%, conformité garantie. Forfait par salarié.",
    },
    h1: "Gestion de la Paie & Charges Sociales externalisée — Iter Advisors",
    breadcrumb: "Gestion de la Paie & Charges Sociales",
    intro: [
      "La paie est le cœur financier et social de votre entreprise. Un bulletin erroné, une DSN rejetée, un calcul de charges incorrect — chaque erreur peut coûter cher en pénalités, en temps de correction et en confiance des salariés. Pour les PME et startups sans RH dédié, la gestion de la paie devient vite un casse-tête complexe : conventions collectives, avantages salariés, provisions, déclarations sociales…",
      "Chez Iter Advisors, nous gérons la paie de plus de 200 salariés chaque mois pour nos clients. Notre équipe maîtrise les outils modernes comme PayFit et Silae, connaît les spécificités des CCN tech et startups, et assure une conformité sociale sans faille.",
    ],
    whatIs: {
      heading: "Qu'est-ce que la gestion de la paie externalisée ?",
      paragraphs: [
        "La gestion de la paie externalisée couvre l'ensemble du processus de traitement de la rémunération et des obligations sociales :",
      ],
      bullets: [
        "Établissement des bulletins de paie mensuels (salaires, primes, congés, absences)",
        "Gestion des entrées/sorties, avenants, ruptures conventionnelles",
        "Calcul et déclaration des charges sociales (DSN, URSSAF, retraite, prévoyance)",
        "Administration des avantages salariés (mutuelle, tickets restaurant, stock-options)",
        "Suivi des congés payés et RTT",
        "Préparation des documents de fin d'année (attestations fiscales, récapitulatifs)",
        "Veille réglementaire et mise à jour des taux sociaux",
        "Gestion des contrôles URSSAF et autres organismes",
      ],
    },
    whyOutsource: {
      heading: "Pourquoi externaliser la paie ?",
      benefits: [
        { label: "Zéro erreur", description: "Taux d'erreur de paie < 0,5%. Double validation systématique et outils automatisés éliminent les erreurs récurrentes." },
        { label: "Conformité garantie", description: "Veille réglementaire permanente : taux de cotisation, évolutions légales (TEPA, ancienneté, forfait jours). Vous ne manquez jamais une échéance." },
        { label: "Gain de temps considérable", description: "Le traitement manuel de la paie pour 20 salariés mobilise 2 à 3 jours par mois. Externalisé : quelques heures de validation de votre côté." },
        { label: "Sécurité juridique", description: "DSN déclarées dans les temps, contrats respectant la législation, procédures de licenciement encadrées. Accompagnement en cas de contrôle URSSAF." },
        { label: "Satisfaction salariée", description: "Bulletins clairs, portail collaborateur accessible, réponses rapides aux questions — des salariés satisfaits restent." },
      ],
    },
    approach: {
      heading: "Notre approche en 4 phases",
      phases: [
        { step: "Phase 1 — Audit & paramétrage (semaine 1)", description: "Audit complet de votre situation paie : contrats, CCN, avantages, historique. Paramétrage de l'outil (PayFit ou Silae) avec vos spécificités." },
        { step: "Phase 2 — Migration (semaine 2)", description: "Migration des données : soldes de congés, historique, avenants. Test de la première paie en parallèle." },
        { step: "Phase 3 — Traitement mensuel (récurrent)", description: "Collecte des éléments variables (absences, primes, heures supp.), établissement des bulletins, double validation, déclaration DSN." },
        { step: "Phase 4 — Suivi & conformité (trimestriel)", description: "Point trimestriel sur les évolutions réglementaires, mise à jour des paramètres, préparation des documents annuels, accompagnement en cas de contrôle." },
      ],
    },
    useCases: {
      heading: "Cas d'usage",
      cases: [
        { title: "Startup SaaS — 12 → 45 salariés en 18 mois", description: "Doublement d'effectifs tous les 6 mois. Paie sur PayFit, traitement de 35 embauches, 12 ruptures conventionnelles et 4 promotions. Résultat : 0 erreur en 18 mois, DSN toujours à temps." },
        { title: "PME industrielle — 30 salariés, CCN Métallurgie", description: "Migration sur Silae avec module gestion des temps. Temps de traitement passé de 3 jours à 4 heures, conformité Métallurgie assurée." },
        { title: "Scale-up à Barcelone — 60 salariés, multi-pays", description: "Salariés en France et en Espagne avec réglementations différentes. Équipe franco-espagnole structurant la paie des deux pays. Résultat : harmonisation des process, reporting RH unifié." },
      ],
    },
    pricing: {
      heading: "Tarification indicative",
      rows: [
        { formula: "Paie standard (PayFit)", scope: "5-50 salariés, CCN courante", price: "40-60 €/salarié/mois" },
        { formula: "Paie complexe (Silae)", scope: "CCN rare, multi-conventions, gestion temps", price: "60-90 €/salarié/mois" },
        { formula: "Accompagnement social", scope: "Conformité, contrôles, veille", price: "500-1 500 €/mois" },
      ],
    },
    cta: {
      heading: "La paie de votre équipe mérite l'excellence",
      body: "Confiez-nous la gestion de vos bulletins et déclarations sociales — nos experts RH assurent une conformité sans faille.",
      buttonLabel: "Prendre rendez-vous",
    },
  },
  "formation-developpement": {
    slug: "formation-developpement",
    meta: {
      title: "Formation & Développement des équipes — Iter Advisors",
      description:
        "Plan de formation structuré pour startups et PME : diagnostic, sourcing OPCO/CPF, animation, mesure du ROI. Rétention talents +25%, productivité +20-30%.",
    },
    h1: "Formation & Développement des équipes — Iter Advisors",
    breadcrumb: "Formation & Développement",
    intro: [
      "Dans une économie où les compétences techniques évoluent tous les 18 à 24 mois, la formation n'est plus un avantage — c'est une nécessité stratégique. Les startups qui investissent dans le développement de leurs équipes retiennent leurs talents 2,5 fois plus longtemps et augmentent leur productivité de 20 à 30%.",
      "Mais pour les PME et startups sans DRH, organiser la formation devient un exercice complexe : identification des besoins, choix des programmes, budget, suivi des heures CPF, mesure de l'impact… Chez Iter Advisors, nous structurons des plans de formation adaptés à la réalité des startups en croissance — pragmatiques, orientés résultats, et alignés avec vos objectifs business.",
    ],
    whatIs: {
      heading: "Qu'est-ce que le développement des compétences externalisé ?",
      paragraphs: [
        "Notre accompagnement en formation et développement couvre :",
      ],
      bullets: [
        "Diagnostic des besoins : identification des compétences critiques, gaps techniques et managériaux, analyse des potentiels",
        "Plan de formation : construction d'un plan annuel avec budget, calendrier et objectifs pédagogiques",
        "Sourcing des formations : identification des organismes adaptés (bootcamps tech, programmes de leadership, certifications)",
        "Gestion administrative : conventions de formation, suivi OPCO/CPF, registre des formations",
        "Formations internes : animation de sessions sur mesure (onboarding culturel, productivité, communication)",
        "Suivi de l'impact : évaluation des acquis, mesure du ROI formation, ajustements du plan",
      ],
    },
    whyOutsource: {
      heading: "Pourquoi investir dans le développement des équipes ?",
      benefits: [
        { label: "Rétention des talents", description: "94% des salariés restent plus longtemps dans une entreprise qui investit dans leur développement. Turnover post-formation réduit de 25%." },
        { label: "Productivité accrue", description: "Un développeur formé aux bonnes pratiques code 30% plus vite avec moins de bugs. Un manager formé à la délégation gagne 5 heures par semaine." },
        { label: "Employer branding", description: "Une politique de formation structurée est un argument de poids pour attirer des profils seniors. 60% des candidats tech interrogent sur le budget formation en entretien." },
        { label: "Agilité organisationnelle", description: "Des équipes polyvalentes s'adaptent plus vite aux changements. La formation cross-fonctionnelle réduit les dépendances individuelles." },
      ],
    },
    approach: {
      heading: "Notre approche en 4 étapes",
      phases: [
        { step: "Étape 1 — Mapping des compétences", description: "Audit des compétences existantes par équipe et par individu. Identification des savoir-faire critiques, des single points of failure, et des profils à fort potentiel." },
        { step: "Étape 2 — Plan de formation sur mesure", description: "Plan trimestriel avec 3 types de formations : obligatoires (conformité), développement (montée en compétences), anticipation (compétences futures du métier)." },
        { step: "Étape 3 — Mise en œuvre", description: "Organisation des sessions (internes ou externes), gestion de l'administratif (OPCO, CPF, convention), suivi des présences." },
        { step: "Étape 4 — Évaluation & ROI", description: "À 30 et 90 jours post-formation, mesure de l'application des acquis et de l'impact sur la performance. Ajustement du plan." },
      ],
    },
    useCases: {
      heading: "Cas d'usage",
      cases: [
        { title: "Startup tech — équipe dev de 8 personnes", description: "Le CTO voulait monter en compétence sur les architectures cloud. Certification AWS pour 4 développeurs et formation Kubernetes pour l'équipe. Résultat : migration infra réalisée en interne (15K€ d'économie vs prestataire), temps de déploiement divisé par 3." },
        { title: "PME en croissance — promotion de 3 managers", description: "Trois experts techniques promus managers sans accompagnement. Programme de 6 mois : management opérationnel, délégation, feedback. Satisfaction équipes : 3,2 → 4,1/5, turnover -30%." },
        { title: "Scale-up — plan de formation annuel", description: "Société de 80 salariés sans plan de formation. Plan structuré avec 80K€ de budget, négociation avec 4 organismes, gestion des conventions OPCO. 85% des salariés formés dans l'année." },
      ],
    },
    pricing: {
      heading: "Tarification indicative",
      rows: [
        { formula: "Diagnostic & plan", scope: "Audit compétences + plan annuel", price: "1 500-3 000 € (one-shot)" },
        { formula: "Accompagnement mensuel", scope: "Plan de formation + sourcing + suivi", price: "1 200-2 000 €/mois" },
        { formula: "Formations internes", scope: "Animation de sessions sur mesure", price: "Sur devis" },
      ],
    },
    cta: {
      heading: "Vos équipes sont votre actif le plus précieux",
      body: "Investissez dans leur développement avec un plan de formation structuré et mesurable.",
      buttonLabel: "Construire mon plan de formation",
    },
  },
  "conformite-droit-travail": {
    slug: "conformite-droit-travail",
    meta: {
      title: "Conformité & Droit du Travail externalisé | Iter Advisors",
      description:
        "Sécurisez vos décisions RH : contrats, règlement intérieur, ruptures, CSE, prud'hommes. Veille réglementaire, taux de victoire prud'homale 85%.",
    },
    h1: "Conformité & Droit du Travail externalisé — Iter Advisors",
    breadcrumb: "Conformité & Droit du Travail",
    intro: [
      "Le droit du travail français compte plus de 10 000 pages de textes réglementaires. Pour un dirigeant de startup ou de PME, naviguer dans cette complexité sans expert RH dédié est un défi permanent — et les erreurs coûtent cher : litiges prud'homaux (coût moyen 15 000 €), pénalités URSSAF, amendes pour non-conformité…",
      "Chez Iter Advisors, nous assurons la conformité sociale de nos clients comme un fondamental. Notre équipe maîtrise le droit du travail, anticipe les évolutions réglementaires et sécurise juridiquement chaque décision RH.",
    ],
    whatIs: {
      heading: "Qu'est-ce que la conformité RH externalisée ?",
      paragraphs: [
        "Notre accompagnement en conformité et droit du travail couvre :",
      ],
      bullets: [
        "Rédaction et mise à jour des contrats de travail (CDI, CDD, apprentissage, freelance)",
        "Règlement intérieur : rédaction, mise en conformité, affichage",
        "Procédures disciplinaires : avertissements, licenciements pour faute, ruptures conventionnelles",
        "Gestion des temps : forfait jours, modulation, temps partiel, heures supplémentaires",
        "Veille réglementaire : application des nouvelles lois (télétravail, Rixain)",
        "Accords d'entreprise : négociation, rédaction, dépôt",
        "Représentation du personnel : élections, CSE, DP, délégués syndicaux",
        "Gestion des litiges : conseil prud'homal, médiation, négociation transactionnelle",
        "Conformité documentaire : registre unique du personnel, DUERP, affichages obligatoires",
      ],
    },
    whyOutsource: {
      heading: "Pourquoi externaliser la conformité ?",
      benefits: [
        { label: "Sécurité juridique", description: "Chaque décision RH est encadrée et documentée. Vous prenez des décisions en connaissance de cause, avec une traçabilité complète." },
        { label: "Anticipation réglementaire", description: "Loi télétravail, directive Rixain, évolutions du forfait jours… Nous surveillons les évolutions et préconisons les ajustements 3 à 6 mois avant les échéances." },
        { label: "Réduction des risques prud'homaux", description: "Contrat bien rédigé, procédure disciplinaire respectée, entretien préalable correctement mené. Taux de victoire prud'homale de 85% chez nos clients." },
        { label: "Sérénité du dirigeant", description: "Vous n'avez plus à vous demander si votre règlement intérieur est à jour ou si votre licenciement tiendra la route." },
      ],
    },
    approach: {
      heading: "Notre approche",
      phases: [
        { step: "Approche préventive", description: "Nous croyons à la prévention plutôt qu'au traitement des litiges. Point de veille réglementaire mensuel et identification des points de vigilance." },
        { step: "Approche opérationnelle", description: "Nous ne sommes pas un cabinet d'avocats théorique. Nous connaissons la réalité terrain des startups et adaptons nos recommandations à votre contexte." },
        { step: "Approche documentée", description: "Chaque procédure, chaque décision, chaque entretien est documenté. En cas de contrôle ou de litige, vous disposez d'un dossier complet et structuré." },
      ],
    },
    useCases: {
      heading: "Cas d'usage",
      cases: [
        { title: "Startup — licenciement d'un salarié problématique", description: "Salarié en place depuis 8 mois, productivité insuffisante, tensions d'équipe. Encadrement de la procédure : entretiens préalables, proposition de rupture conventionnelle, négociation, rédaction. Sortie négociée en 3 semaines, 0 litige." },
        { title: "PME — mise en conformité post-croissance", description: "Entreprise passée de 10 à 35 salariés sans mettre à jour ses contrats ni son règlement. Audit, réécriture de 28 contrats, rédaction du règlement intérieur, organisation des élections CSE. Conformité complète en 2 mois." },
        { title: "Scale-up — directive Rixain (égalité salariale)", description: "Société de 120 salariés devant se mettre en conformité avec la directive sur l'égalité de rémunération. Audit, analyse des écarts, plan de correction. Écart moyen réduit de 12% à 4%." },
      ],
    },
    pricing: {
      heading: "Tarification indicative",
      rows: [
        { formula: "Veille & conformité", scope: "Veille réglementaire + mise à jour documents", price: "800-1 500 €/mois" },
        { formula: "Accompagnement juridique", scope: "Conseil + rédaction actes + litiges", price: "1 500-3 000 €/mois" },
        { formula: "Intervention ponctuelle", scope: "Licenciement, rupture, négociation", price: "500-2 000 € (one-shot)" },
      ],
    },
    cta: {
      heading: "Ne laissez pas la complexité du droit du travail freiner votre croissance",
      body: "Nos experts RH sécurisent vos décisions et vous permettent de vous concentrer sur votre business.",
      buttonLabel: "Sécuriser ma conformité RH",
    },
  },
};

export function getHRServiceContent(slug: string): HRServiceContent | undefined {
  return hrServices[slug as HRServiceSlug];
}

export const HR_SERVICE_SLUGS: HRServiceSlug[] = [
  "recrutement-talent-acquisition",
  "gestion-paie-charges-sociales",
  "formation-developpement",
  "conformite-droit-travail",
];

export function getAllHRServices(_locale: Locale = "fr"): HRServiceContent[] {
  return HR_SERVICE_SLUGS.map((slug) => hrServices[slug]);
}
