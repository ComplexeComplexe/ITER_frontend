import { COUT_DAF_SALARIE, DELAIS, ENGAGEMENT, FORMULES } from "./facts";

const euros = (value: number) => value.toLocaleString("fr-FR");


export const dafExternalisePariEnrichedContent = {
  fr: {
    meta: {
      // T2 (2026-06-30) — Cannibalisation avec /daf-externalise (pilier
      // national, position 16). Le Title contenait "DAF externalisé" en
      // intro, créant un signal ambigu pour Google. Recentré sur la cible
      // locale "Cabinet DAF Paris" pour laisser le pilier ranker sur la
      // requête nationale.
      title: "DAF externalisé à Paris | Iter Advisors",
      description:
        "Cabinet de DAF externalisés à Paris. CFO seniors pour startups et PME, dès 2 jours/mois. 85 entreprises accompagnées.",
    },
    author: {
      name: "Sébastien Doat",
      jobTitle: "Co-fondateur & CFO Advisor",
      linkedInUrl: "https://www.linkedin.com/in/sebastiendoat",
      // GEO-P0 (2026-08-02) — /daf-externalise-paris renvoyait un 500 :
      // next/image rejette une src absolue dont l'hôte n'est pas déclaré
      // dans images.remotePatterns, et le fichier visé n'existait pas non
      // plus (même erreur corrigée ailleurs le 08/06, cf. Ahrefs T-404,
      // mais cet avatarUrl avait été oublié).
      avatarUrl: "/images/team/sebastien-doat.webp",
      updateDate: "2026-09-05",
    },
    tldr: "Iter Advisors propose des DAF externalisés à Paris dès 3 000 € HT/mois, avec une expertise spécialisée startups Station F et levées de fonds. Disposer d'une direction financière senior sans recruter un salarié : c'est l'alternative pertinente pour les PME et startups en croissance.",
    // T2 (2026-06-30) — H1 recentré sur "Cabinet DAF Paris" pour matcher
    // le Title et éliminer la cannibalisation avec le pilier national.
    h1: "Cabinet DAF Paris : direction financière à temps partagé en Ile-de-France",
    // Individual attributions require a verifiable source. Keep the Trustfolio link.
    testimonials: [],
    sources: [
      "DFCG (Association des Directeurs Financiers et de Contrôle de Gestion)",
      "INSEE - Chiffres clés de l'entrepreneuriat en Île-de-France",
      "Bpifrance - Guide des financements pour startups",
      "Station F - Rapport 2025 sur l'écosystème startup parisien",
      "Partech - European Tech Report 2025",
    ],
    intro: [
      "Paris et l'Ile-de-France concentrent la majorité des startups et PME innovantes françaises. Station F, les incubateurs du 9e arrondissement, les fonds d'investissement de la place parisienne : l'écosystème est dense et compétitif. Dans ce contexte, recruter un directeur financier senior à temps plein représente 100 000 à 213 000 euros de coût employeur annuel, charges comprises, hors coût de recrutement et de vacance de poste.",
      "Le DAF externalisé à Paris offre une alternative concrète. Il donne accès à une expertise de direction financière de niveau senior, avec une flexibilité adaptée à la croissance de l'entreprise. Pour une startup qui prépare une levée de fonds auprès de Partech ou Breega, ou une PME qui veut structurer son pilotage avant une expansion, disposer d'un DAF à temps partagé est souvent le choix le plus pertinent.",
      "Chez Iter Advisors, nous accompagnons les entreprises parisiennes avec des CFOs expérimentés qui interviennent sur site et en remote dans toute l'Ile-de-France. Notre connaissance de l'écosystème francilien est un atout concret pour nos clients.",
    ],
    sections: [
      {
        id: "definition",
        title: "Qu'est-ce qu'un DAF externalisé à Paris ?",
        paragraphs: [
          "Un DAF externalisé à Paris est un directeur administratif et financier senior qui intervient à temps partagé dans votre entreprise, sans être salarié. Il assume les responsabilités classiques d'un DAF : pilotage financier, reporting, trésorerie, relations avec les investisseurs et les banques, structuration de la fonction finance.",
          "Contrairement à un consultant ponctuel qui livre une étude puis repart, un DAF externalisé s'intègre dans la durée. Il participe aux comités de direction, prépare les board meetings, accompagne les levées de fonds et structure les processus financiers de l'entreprise. La différence avec un salarié interne réside dans la flexibilité : le nombre de jours d'intervention s'ajuste au rythme de l'activité.",
          "Sur le marché parisien, cette formule est particulièrement adaptée. Le coût d'un DAF senior à Paris est parmi les plus élevés de France, et la pénurie de profils qualifiés rend les recrutements longs et incertains. Le démarrage se fait en 8 à 15 jours après le premier échange, selon le périmètre et le profil retenu.",
        ],
      },
      {
        id: "comparatif",
        title: "Comparatif : DAF interne vs DAF externalisé à Paris",
        comparison: {
          internal: {
            title: "DAF interne à temps plein",
            price: "100 000 € - 213 000 €",
            subtitle: "Coût employeur annuel, charges et package compris",
            cons: [
              "Recrutement long (3 à 6 mois)",
              "Coût fixe mensuel élevé",
              "Contrat de travail et gestion du poste",
              "Risque de turnover coûteux",
              "Profil recruté pour un périmètre défini",
              "Disponibilité à temps plein à dimensionner",
            ],
          },
          external: {
            title: "DAF externalisé Iter Advisors",
            price: "À partir de 3 000 € HT/mois",
            subtitle: "Formule adaptable selon vos besoins",
            pros: [
              `Démarrage en ${DELAIS.missionDemarree}`,
              "Coût proportionnel à l'activité",
              "Flexibilité mensuelle",
              "Expertise multi-sectorielle",
              "Réseau VCs et banques parisiennes",
              "Ajustement sans rupture",
            ],
          },
        },
        tables: [
          {
            caption: "Comparer un poste à temps plein et un accompagnement à temps partagé",
            headers: ["Critère", "DAF salarié", "DAF externalisé Iter Advisors"],
            rows: [
              ["Budget annuel", `${euros(COUT_DAF_SALARIE.min)}–${euros(COUT_DAF_SALARIE.max)} € de coût employeur`, `${euros(FORMULES[0].prixMin * 12)}–${euros(FORMULES[2].prixMax * 12)} € HT de forfaits`],
              ["Base du budget", "Charges et package compris, hors recrutement et vacance du poste", "Forfait mensuel annualisé, hors déplacements ou missions complémentaires"],
              ["Disponibilité", "Poste à temps plein", "Volume indicatif de 1 à 8 jours par mois selon le périmètre"],
              ["Démarrage", "Selon le recrutement et le préavis du candidat", DELAIS.missionDemarree],
              ["Engagement", "Contrat de travail", ENGAGEMENT.formulation],
            ],
          },
        ],
      },
      {
        id: "missions",
        title: "Les missions d'un DAF externalisé à Paris et en Île-de-France",
        paragraphs: [
          "Le périmètre d'intervention d'un DAF externalisé couvre l'ensemble de la fonction finance. Voici les missions les plus demandées par les entreprises de Paris et de l'Île-de-France :",
        ],
        tables: [
          {
            caption: "Périmètre des missions d'un DAF externalisé Iter Advisors à Paris",
            headers: ["Domaine", "Missions concrètes", "Fréquence"],
            rows: [
              ["Pilotage financier", "Tableaux de bord, reporting mensuel, analyse des écarts, suivi des KPIs", "Mensuel"],
              ["Trésorerie", "Suivi de la trésorerie, prévisions à 13 semaines, gestion du BFR, négociation bancaire", "Hebdomadaire"],
              ["Levées de fonds", "Préparation du data room, financial model, accompagnement VCs (Partech, Elaia, Breega, Idinvest)", "Par projet"],
              ["Structuration", "Mise en place de processus finance, choix des outils, intégration comptable, reporting investisseurs", "Projet"],
              ["Relations institutionnelles", "Accompagnement Bpifrance, CIR, JEI, relations banques, négociation crédits", "Trimestriel"],
              ["M&A et due diligence", "Accompagnement aux cessions, acquisitions, audit financier, négociation", "Par projet"],
            ],
          },
        ],
      },
      {
        id: "parcours",
        title: "Le parcours type d'un DAF externalisé chez Iter Advisors",
        paragraphs: [
          "Chaque entreprise a ses spécificités, mais le démarrage d'une collaboration suit généralement un schéma reconnu. Voici comment se déroule l'intervention d'un DAF externalisé Iter Advisors sur le terrain parisien :",
        ],
        timeline: [
          {
            title: "Mois 1 : Diagnostic et structuration",
            description:
              "Audit de la situation financière actuelle, revue des processus, identification des priorités. Mise en place des outils de pilotage et des tableaux de bord adaptés à votre activité.",
          },
          {
            title: "Mois 2-3 : Mise en routine",
            description:
              "Établissement du reporting mensuel, structuration de la trésorerie, mise en conformité des déclarations fiscales. Premiers écarts analysés et premières recommandations formulées.",
          },
          {
            title: "Mois 4-6 : Optimisation",
            description:
              "Analyse des coûts par centre de profit, optimisation du BFR, négociation bancaire si nécessaire. Préparation éventuelle d'une levée de fonds ou d'un dossier Bpifrance.",
          },
          {
            title: "Mois 7-12 : Pilotage stratégique",
            description:
              "Reporting investisseurs, accompagnement aux board meetings, élaboration du budget annuel, analyse des scénarios de croissance. Le DAF devient un véritable partenaire stratégique.",
          },
        ],
      },
      {
        id: "marche-parisien",
        title: "Pourquoi Paris et l'Île-de-France sont un marché spécifique pour le DAF externalisé",
        paragraphs: [
          "Le marché parisien et francilien présente des caractéristiques qui rendent le DAF externalisé particulièrement pertinent. Que vous soyez basé dans le 8e arrondissement de Paris, en banlieue (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne) ou dans les Yvelines, l'Île-de-France concentre l'écosystème startup et entrepreneurial français :",
        ],
        kpis: [
          {
            number: "35 %",
            label: "des startups françaises\nsont basées à Paris",
          },
          {
            number: "120 K€+",
            label: "coût employeur annuel\nd'un DAF senior, charges comprises",
          },
          {
            number: "3-6 mois",
            label: "délai moyen de\nrecrutement d'un DAF",
          },
        ],
        bullets: [
          {
            title: "Densité de l'écosystème startup.",
            text: "Station F, les incubateurs du 9e, les fonds d'investissement : Paris concentre les acteurs clés. Un DAF externalisé qui connaît cet écosystème peut accélérer les relations avec les VCs et les banques.",
          },
          {
            title: "Coût salarial élevé.",
            text: "Les profils financiers seniors à Paris sont parmi les plus chers de France. Pour une startup en amorçage ou une PME en développement, ce coût est souvent disproportionné par rapport au besoin réel.",
          },
          {
            title: "Pénurie de talents.",
            text: "Les bons profils financiers sont rares et très sollicités. Le turnover est fréquent et coûteux. L'externalisation évite ce risque.",
          },
          {
            title: "Accès aux dispositifs d'aide.",
            text: "Bpifrance, le CIR, le JEI : les dispositifs franciliens sont nombreux mais complexes. Un DAF externalisé parisien connaît ces mécanismes et peut les exploiter efficacement.",
          },
          {
            title: "Internationalisation.",
            text: "Notre double implantation Paris-Barcelone est un atout pour les entreprises qui se développent vers l'Espagne ou l'Europe du Sud.",
          },
        ],
      },
      {
        id: "avantage-iter",
        title: "L'avantage Iter Advisors à Paris et en Île-de-France",
        paragraphs: [
          "Notre équipe parisienne intervient sur site et en remote dans toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Essonne (91), Yvelines (78), Seine-et-Marne (77) et Val-d'Oise (95). Nous connaissons parfaitement l'écosystème financier francilien et entretenons des relations privilégiées avec les principaux acteurs du marché, des fonds d'investissement parisiens aux dispositifs d'aide régionaux.",
        ],
        tables: [
          {
            caption: "Notre réseau et notre expertise à Paris",
            headers: ["Type d'acteur", "Exemples", "Comment Iter Advisors vous aide"],
            rows: [
              [
                "Fonds d'investissement",
                "Partech, Elaia, Breega, Idinvest, Seventure Partners",
                "Préparation du data room, financial model, accompagnement aux due diligences",
              ],
              [
                "Banques et financement",
                "Bpifrance, BPI, banques traditionnelles",
                "Structuration des dossiers de crédit, négociation des conditions, suivi des engagements",
              ],
              [
                "Dispositifs d'aide",
                "CIR, JEI, aides régionales Ile-de-France",
                "Optimisation des dispositifs, préparation des dossiers, conformité fiscale",
              ],
              [
                "Écosystème startup",
                "Station F, incubateurs, accélérateurs",
                "Connaissance des standards de reporting, des attentes des VCs, des benchmarks sectoriels",
              ],
            ],
          },
        ],
        closingText:
          "Notre double implantation Paris-Barcelone est un atout unique pour les entreprises qui se développent à l'international, notamment vers le marché espagnol. Nous pouvons accompagner la structuration financière sur les deux territoires avec une cohérence méthodologique.",
      },
      {
        id: "signaux",
        title: "Les signaux qui montrent qu'il faut faire appel à un DAF externalisé à Paris et en Île-de-France",
        paragraphs: [
          "Plusieurs situations concrètes indiquent qu'une direction financière artisanale atteint ses limites. Vous êtes dirigeant d'une startup à Station F, d'une PME en banlieue parisienne (La Défense, Boulogne, Saint-Denis) ou d'une entreprise technologique en Île-de-France ? Ces signaux vous concernent :",
        ],
        bullets: [
          {
            title: "La trésorerie devient difficile à prévoir.",
            text: "Le dirigeant ne sait plus exactement combien son entreprise aura de disponible dans trois mois. Les encours clients s'allongent, les dépenses augmentent, et le lien entre les deux n'est pas maîtrisé.",
          },
          {
            title: "Les investisseurs demandent un reporting structuré.",
            text: "Une startup en levée de fonds ou une PME avec des actionnaires doit fournir des analyses financières régulières. Des chiffres approximatifs ou des tableaux Excel personnels ne passent pas le filtre des VCs parisiens.",
          },
          {
            title: "La croissance s'accélère mais la rentabilité stagne.",
            text: "Le chiffre d'affaires augmente, mais la marge nette ne suit pas. Sans une analyse par produit, par client ou par canal de distribution, il est impossible d'identifier le levier d'amélioration.",
          },
          {
            title: "La fonction finance repose sur une seule personne surchargée.",
            text: "Un comptable ou un office manager gère les factures, la paie et la trésorerie. Aucune vision stratégique, aucune anticipation. Les décisions se prennent au jour le jour.",
          },
          {
            title: "L'entreprise prépare une levée de fonds ou une opération de croissance externe.",
            text: "Le data room, le financial model, la due diligence : ces étapes exigent une expertise financière senior que le dirigeant ne peut pas improviser.",
          },
        ],
        closingText:
          "Ces signaux ne signifient pas forcément qu'il faut recruter un DAF à temps plein. Pour une structure de dix à soixante personnes, un poste à temps plein est souvent surdimensionné et coûteux. Le DAF externalisé à Paris offre une flexibilité et une expertise adaptées à ce stade de croissance.",
      },
      {
        id: "faq",
        title: "Questions fréquentes",
        faqs: [
          {
            question: "Qu'est-ce qu'un DAF externalisé à Paris ?",
            answer:
              "C'est un directeur administratif et financier senior qui intervient à temps partagé dans votre entreprise parisienne ou francilienne, sans être salarié. Il assume le pilotage financier, le reporting, la trésorerie, les relations avec les investisseurs et la structuration de la fonction finance, avec une flexibilité adaptée à votre croissance.",
          },
          {
            question: "Combien coûte un DAF externalisé à Paris ?",
            answer:
              // Arbitrage 10/08/2026 — trois corrections : prix d'entrée 2 000 → 3 000 €,
              // « 120 000 à 180 000 € brut annuel, charges comprises » (formulation
              // contradictoire, et cinquième fourchette du site) → coût employeur
              // unique, et économie 60-85 % → fourchette unique 30-60 %.
              "Les formules Iter Advisors démarrent à 3 000 euros HT par mois et vont jusqu'à 8 000 euros selon la formule. Le retainer couvre un scope défini au cadrage, pas un nombre d'heures. Pour comparaison, un directeur financier salarié de séniorité équivalente représente 100 000 à 213 000 euros de coût employeur annuel, charges comprises : l'externalisation représente 30 à 60 % d'économie.",
          },
          {
            question: "Quelle différence entre un DAF externalisé et un consultant financier ponctuel ?",
            answer:
              "Un consultant livre une mission définie puis repart. Un DAF externalisé s'intègre dans la durée, participe aux comités de direction, prépare les board meetings et devient un partenaire stratégique. La relation est continue et évolutive, pas ponctuelle.",
          },
          {
            question: "Un DAF externalisé peut-il accompagner une levée de fonds à Paris ?",
            answer:
              "Oui, et c'est l'une des missions les plus demandées. Iter Advisors prépare le data room, construit le financial model, accompagne les due diligences et négocie avec les VCs de la place parisienne (Partech, Elaia, Breega, Idinvest, Seventure Partners). Notre connaissance de l'écosystème est un atout concret.",
          },
          {
            question: "Le DAF externalisé intervient-il sur site à Paris ?",
            answer:
              "Oui. Notre équipe parisienne intervient sur site dans votre bureau parisien et en remote selon vos préférences. Nous couvrons toute l'Ile-de-France. La flexibilité du mode de travail est un des avantages du modèle : le DAF est présent quand c'est nécessaire, sans occuper un bureau permanent.",
          },
          {
            question: "Quand faut-il faire appel à un DAF externalisé plutôt que recruter en interne ?",
            answer:
              "L'externalisation est pertinente quand le volume d'activité ne justifie pas un poste à temps plein, quand l'entreprise traverse une phase de croissance rapide et instable, ou quand le dirigeant veut accéder à une expertise variée sans engager un salarié. C'est souvent le cas des startups et des PME en développement à Paris.",
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        paragraphs: [
          "Un pilotage financier fiable et structuré est le fondement de toute croissance sereine. Pour les dirigeants de startups et de PME à Paris et en Ile-de-France, le DAF externalisé offre un équilibre pertinent : l'expertise d'un professionnel senior sans le coût et la rigidité d'un recrutement interne.",
          "Chez Iter Advisors, nous traitons la direction financière comme un outil de décision, pas comme une simple fonction administrative. Nous connaissons l'écosystème parisien, nous travaillons avec les outils que vous utilisez déjà et nous nous adaptons à votre rythme de croissance.",
          "Vous pouvez échanger avec Iter Advisors pour évaluer le niveau d'accompagnement financier adapté à votre entreprise parisienne.",
        ],
      },
    ],
  },
};

export function getDafExternalisePariEnrichedContent(locale: "fr") {
  return dafExternalisePariEnrichedContent[locale];
}
