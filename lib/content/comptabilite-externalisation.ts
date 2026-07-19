export const comptabiliteExternalisationContent = {
  fr: {
    meta: {
      title: "Externalisation comptable startups & PME | Iter Advisors",
      description:
        "Externalisez votre comptabilité avec Iter Advisors : tenue des comptes, déclarations fiscales, paie et clôture annuelle. Pennylane, Sage, QuickBooks.",
    },
    author: {
      name: "Sébastien Doat",
      jobTitle: "Co-fondateur & CFO Advisor",
      linkedInUrl: "https://www.linkedin.com/in/sebastiendoat",
      // Ahrefs T-404 (2026-06-08): was "/images/sebastien-doat.jpg" → 400/404
      // (wrong path + wrong extension). The real asset is the .webp under /team/.
      avatarUrl: "/images/team/sebastien-doat.webp",
      updateDate: "2026-05-05",
    },
    tldr: "Externaliser sa comptabilité coûte 60-85% moins cher qu'un comptable interne, avec une expertise plus large et une flexibilité adaptée aux startups et PME en croissance.",
    h1: "Externalisation comptable : tarifs, méthode et bénéfices pour PME et startups",
    // T5 (2026-06-07) — replaced 3 fake testimonials (Alain Rousseau /
    // Valérie Lefevre / Marc Dubois, dont un contenait la coquille
    // "Impressive professionnalism") par 3 vrais avis Trustfolio
    // nominatifs, source : https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc
    // Ces 3 avis ne portent pas spécifiquement sur de la comptabilité
    // mais sur l'accompagnement financier global Iter Advisors —
    // honnêteté > vraisemblance fabriquée.
    testimonials: [
      {
        name: "Charles Deknudt",
        company: "Eltex",
        sector: "PDG et fondateur",
        text: "Après avoir levé notre premier tour de table, nous avions besoin de structurer nos opérations financières. Iter a professionnalisé notre fonction financière et s'est avéré être un partenaire financier solide intégré à l'équipe.",
        rating: 5,
      },
      {
        name: "Arnaud MEGE",
        company: "Unplexed",
        sector: "Co-founder",
        text: "Les équipes d'Iter ont structuré notre fonction finance avec sérieux, disponibilité et efficacité, dépassant même nos attentes initiales.",
        rating: 5,
      },
      {
        name: "Mathurin Blouin",
        company: "MFL",
        sector: "CEO",
        text: "Iter nous a accompagnés sur la mise en place du reporting et de la gestion de trésorerie, offrant une meilleure visibilité et sérénité financière.",
        rating: 5,
      },
    ],
    sources: [
      "Ordre des experts-comptables - Chiffres clés du secteur 2025",
      "INSEE - Coûts de fonctionnement des TPE/PME",
      "Association DFCG - Guide des pratiques de comptabilité externalisée",
      "Conseil supérieur de l'ordre des experts-comptables",
    ],
    sections: [
      {
        id: "definition",
        title: "Qu'est-ce que l'externalisation comptable ?",
        paragraphs: [
          "L'externalisation comptable consiste à confier tout ou partie de la tenue des comptes à un prestataire externe, plutôt qu'à un salarié interne. Le périmètre couvert varie selon les besoins : il peut s'agir uniquement de la saisie comptable et des déclarations fiscales, ou inclure la gestion de paie, le suivi de trésorerie et l'accompagnement à la clôture annuelle.",
          "Contrairement à un simple cabinet comptable traditionnel qui se contente souvent de la production des liasses fiscales, une externalisation comptable moderne s'intègre dans le quotidien de l'entreprise. Elle fonctionne en flux continu : factures fournisseurs, notes de frais, règlements clients, déclarations de TVA, tout est traité au fil de l'eau. Le dirigeant garde une visibilité en temps réel sur sa situation financière.",
          "Les outils cloud ont transformé ce modèle. Avec des logiciels comme Pennylane, Sage ou QuickBooks, le prestataire externe accède aux mêmes données que le dirigeant. Plus besoin d'échanges de fichiers Excel par email ni de décalage de plusieurs semaines entre la réalité opérationnelle et les chiffres comptables.",
        ],
      },
      {
        id: "signaux",
        title: "Les signaux qui montrent qu'il faut externaliser sa comptabilité",
        paragraphs: [
          "Plusieurs situations concrètes indiquent qu'une gestion comptable artisanale atteint ses limites :",
        ],
        bullets: [
          {
            title: "La trésorerie devient difficile à suivre.",
            text: "Le dirigeant ne sait plus exactement combien son entreprise a réellement de disponible, car les encours clients et les échéances fournisseurs ne sont pas consolidés.",
          },
          {
            title: "Les déclarations fiscales s'accumulent ou sont en retard.",
            text: "Une TVA non déclarée à temps, une liasse fiscale bâclée, des pénalités de retard qui s'ajoutent : ces problèmes récurrents traduisent un manque de ressources ou d'expertise.",
          },
          {
            title: "La clôture annuelle prend des mois.",
            text: "Quand le bilan et le compte de résultat ne sont finalisés que plusieurs mois après la fin de l'exercice, le dirigeant pilote à l'aveugle pendant une partie de l'année suivante.",
          },
          {
            title: "Les investisseurs ou les banques demandent des données structurées.",
            text: "Une startup en levée de fonds ou une PME qui sollicite un crédit bancaire doit fournir un reporting fiable. Des comptes tenus à la va-vite ne passent pas le filtre.",
          },
          {
            title: "Le temps passé sur la comptabilité dépasse ce qui est raisonnable.",
            text: "Un fondateur qui consacre plusieurs demi-journées par semaine à la saisie de factures détourne son attention de la croissance de son activité.",
          },
        ],
        closingText:
          "Ces signaux ne signifient pas forcément qu'il faut recruter un comptable en interne. Pour une structure de dix à cinquante personnes, un poste à temps plein est souvent surdimensionné. L'externalisation comptable offre une flexibilité plus adaptée à ce stade de croissance.",
      },
      {
        id: "benefices",
        title: "Les bénéfices concrets d'une comptabilité externalisée",
        paragraphs: [
          "Externaliser sa comptabilité, ce n'est pas seulement déléguer une corvée administrative. Cela produit des effets mesurables sur la qualité de pilotage de l'entreprise.",
        ],
        bullets: [
          {
            title: "Données fiables et à jour.",
            text: "La comptabilité est tenue en flux continu, sans retard. Le dirigeant dispose d'un état de sa situation financière qui reflète la réalité du moment.",
          },
          {
            title: "Respect des échéances fiscales.",
            text: "Les déclarations de TVA, les liasses fiscales et les obligations sociales sont préparées et déposées dans les délais. Les risques de pénalités et de redressements diminuent.",
          },
          {
            title: "Gain de temps pour le dirigeant.",
            text: "Le fondateur ou le CEO retrouve des heures chaque semaine pour se concentrer sur le produit, les clients et la stratégie.",
          },
          {
            title: "Accès à une expertise sans recrutement.",
            text: "Le prestataire dispose d'une expérience sur des dizaines de situations différentes. Il anticipe les pièges que le dirigeant ne voit pas forcément venir.",
          },
          {
            title: "Coût maîtrisé et évolutif.",
            text: "L'externalisation comptable s'adapte au volume d'activité. Elle coûte moins cher qu'un salarié à temps plein, avec une flexibilité que le recrutement interne n'offre pas.",
          },
        ],
        closingText:
          "Pour une entreprise en croissance, ces bénéfices se traduisent aussi par une meilleure préparation aux audits, aux due diligences et aux négociations avec des investisseurs ou des partenaires bancaires.",
      },
      {
        id: "comparatif",
        title: "Comparatif : comptable interne vs cabinet vs externalisation",
        paragraphs: [
          "Que vous hésitiez entre recruter en interne, solliciter un cabinet traditionnel ou externaliser votre comptabilité, ce tableau comparatif vous aidera à évaluer les coûts réels et les avantages de chaque approche :",
        ],
        tables: [
          {
            caption: "Comparaison détaillée des trois modèles de comptabilité",
            headers: [
              "Critère",
              "Comptable interne (TPE/PME)",
              "Cabinet expertise comptable",
              "Externalisation Iter Advisors",
            ],
            rows: [
              [
                "Coût annuel (entreprise de 15-20 personnes)",
                "35 000 € - 55 000 €",
                "4 000 € - 8 000 €",
                "4 200 € - 9 600 €",
              ],
              [
                "Outils et logiciels",
                "Variable (souvent legacy)",
                "Imposés par le cabinet",
                "Au choix (Pennylane, Sage, QB)",
              ],
              [
                "Délai de réponse (questions urgentes)",
                "Immédiat",
                "48-72 heures",
                "24 heures",
              ],
              [
                "Pilotage financier (tableaux de bord, KPIs)",
                "Limité",
                "Liasses fiscales uniquement",
                "Reporting mensuel complet + analyse",
              ],
              [
                "Flexibilité (ajustement du volume)",
                "Contrat fixe (12-24 mois)",
                "Forfait standard",
                "Modulaire mois par mois",
              ],
              [
                "Délai de mise en place",
                "2-3 mois (recrutement)",
                "2-4 semaines",
                "1-2 semaines",
              ],
              [
                "Continuité en cas d'absence",
                "Risque de rupture",
                "Assuré (autre expert-comptable)",
                "Assuré (équipe dédiée)",
              ],
              [
                "Relation de confiance établie",
                "Moyenne (1 seul interlocuteur)",
                "Très bonne (cabinet établi)",
                "Excellente (partenaire long terme)",
              ],
            ],
          },
        ],
      },
      {
        // T5 (2026-06-07) — nouvelle section H2 "tarifs" demandée par
        // le ticket. La requête "coût externalisation comptabilité"
        // génère 4600+ impressions / GSC et la page est position 9-12 :
        // une grille tarifaire concrète peut faire passer en top 5.
        id: "tarifs",
        title: "Combien coûte l'externalisation de la comptabilité en 2026 ?",
        paragraphs: [
          "Le coût de l'externalisation comptable dépend principalement de quatre facteurs : la taille de votre entreprise (volume de factures), la complexité fiscale (TVA intracommunautaire, multi-entités, exports), le périmètre du service (tenue seule ou tenue + paie + reporting), et le niveau de pilotage attendu (production conforme uniquement ou tableaux de bord et analyse).",
          "Voici les fourchettes de prix constatées en 2026 sur le marché français, ainsi que la fourchette pratiquée par Iter Advisors selon le profil-type d'entreprise. Pour une analyse complète avec comparatif des 4 modèles disponibles (cabinet traditionnel, plateforme en ligne, cabinet digital hybride, CFO-piloté) et calcul ROI détaillé, consultez notre article dédié : [[Coût de l'externalisation comptable en 2026|/ressources/blog/cout-externalisation-comptable-2026]].",
        ],
        tables: [
          {
            caption: "Grille tarifaire 2026 — Externalisation comptable par taille d'entreprise",
            headers: [
              "Profil d'entreprise",
              "Volume mensuel typique",
              "Marché (fourchette mensuelle HT)",
              "Iter Advisors (forfait mensuel HT)",
            ],
            rows: [
              [
                "Auto-entrepreneur / TPE (1-5 salariés)",
                "10-40 factures, TVA simple",
                "200 - 500 €",
                "350 - 650 €",
              ],
              [
                "Startup early-stage (5-15 salariés)",
                "30-80 factures, paie",
                "400 - 900 €",
                "550 - 1 100 €",
              ],
              [
                "PME en croissance (15-50 salariés)",
                "100-300 factures, TVA UE, paie",
                "800 - 1 800 €",
                "900 - 1 800 €",
              ],
              [
                "PME structurée (50-150 salariés)",
                "300-800 factures, multi-entités",
                "1 500 - 3 500 €",
                "1 800 - 3 200 €",
              ],
              [
                "Scale-up / ETI (150+ salariés)",
                "800+ factures, consolidation",
                "3 000 - 8 000 €",
                "3 500 - 7 000 €",
              ],
            ],
          },
        ],
      },
      {
        id: "approche-iter",
        title: "Comment Iter Advisors accompagne votre comptabilité externalisée",
        paragraphs: [
          "Notre approche repose sur trois principes : intégration fluide, outils existants, et expertise financière de niveau CFO.",
          "Intégration sans rupture. Nous ne vous imposons pas de changer de logiciel du jour au lendemain. Iter Advisors travaille avec les outils que vous utilisez déjà, qu'il s'agisse de Pennylane, Sage, QuickBooks ou d'autres solutions cloud. La migration, quand elle est nécessaire, se fait en deux semaines maximum, sans interruption de service.",
          "Un périmètre clair et complet. Notre accompagnement couvre la tenue de la comptabilité générale, les déclarations TVA et fiscales, la gestion de la paie et des charges sociales, ainsi que la préparation et le suivi de la clôture comptable annuelle. Chaque point est traité avec la même rigueur, sans délégation opaque à des sous-traitants.",
          "Des comptables qui comprennent votre business. Nos équipes ne se contentent pas de saisir des écritures. Elles comprennent le contexte de votre entreprise : votre modèle économique, vos enjeux de trésorerie, vos obligations envers des investisseurs. Cette vision globale permet de produire une comptabilité qui sert le pilotage, pas seulement la conformité fiscale.",
        ],
        closingText:
          // T5 (2026-06-07) — fix lien interne : pointait vers /daf-externalise-paris
          // (page locale Paris) au lieu de /daf-externalise (page pilier nationale).
          // L'ancre "DAF externalisé" doit aller vers la page pilier pour éviter
          // la cannibalisation entre pilier (position 22) et locale Paris (position 11).
          "L'externalisation comptable fonctionne d'autant mieux qu'elle s'intègre dans une stratégie financière globale. Pour une vision complète, explorez aussi notre offre [[DAF externalisé|/daf-externalise]] (direction financière complète) et nos services de [[prévisionnel de trésorerie|/services/previsionnel-tresorerie]] et [[contrôle de gestion|/services/controle-de-gestion-externalise]] pour un pilotage à 360°.",
      },
      {
        id: "erreurs-eviter",
        title: "Les erreurs à éviter quand on externalise sa comptabilité",
        paragraphs: [
          "Externaliser ne dispense pas de rester vigilant. Voici les écueils les plus fréquents :",
        ],
        bullets: [
          {
            title: "Choisir un prestataire sur le prix seul.",
            text: "Un tarif anormalement bas cache souvent une délégation à l'étranger, des délais de traitement allongés ou un manque de réactivité en cas de problème.",
          },
          {
            title: "Perdre la visibilité sur ses chiffres.",
            text: "Externaliser ne signifie pas s'abstraire de sa comptabilité. Le dirigeant doit continuer à consulter régulièrement son bilan et son compte de résultat.",
          },
          {
            title: "Ne pas vérifier la compatibilité des outils.",
            text: "Si le prestataire impose un logiciel obsolète ou incompatible avec votre écosystème, la friction quotidienne sera réelle.",
          },
          {
            title: "Sous-estimer l'importance de la communication.",
            text: "Un échange mensuel structuré entre le dirigeant et le prestataire évite les mauvaises surprises. La comptabilité externalisée fonctionne mieux quand elle est collaborative.",
          },
        ],
      },
      {
        id: "faq",
        title: "Questions fréquentes",
        faqs: [
          {
            question: "Qu'est-ce que l'externalisation comptable ?",
            answer:
              "C'est le fait de confier la tenue des comptes, les déclarations fiscales et éventuellement la paie à un prestataire externe, plutôt qu'à un salarié interne. Cela permet d'accéder à une expertise professionnelle sans les contraintes d'un recrutement, avec une flexibilité adaptée au volume d'activité de l'entreprise.",
          },
          {
            question: "Combien coûte l'externalisation de la comptabilité ?",
            answer:
              "Le coût dépend du volume d'écritures, du nombre de salariés, de la complexité fiscale et du périmètre couvert. Pour une PME ou une startup en croissance, l'externalisation comptable revient généralement moins cher qu'un comptable interne à temps plein, tout en offrant une expertise souvent plus large.",
          },
          {
            question: "Quelle différence entre un expert-comptable et un prestataire d'externalisation comptable ?",
            answer:
              "Un expert-comptable assure souvent la production des liasses fiscales et la certification des comptes, avec un rythme trimestriel ou annuel. Un prestataire d'externalisation comptable traite les opérations au quotidien : saisie des factures, déclarations de TVA, suivi de la trésorerie. Les deux rôles sont complémentaires. Iter Advisors peut coordonner les deux pour une couverture complète.",
          },
          {
            question: "L'externalisation comptable fonctionne-t-elle avec Pennylane, Sage ou QuickBooks ?",
            answer:
              "Oui. Iter Advisors s'intègre directement dans les outils cloud que vous utilisez déjà. Nous travaillons avec Pennylane, Sage, QuickBooks et d'autres solutions. La migration vers un nouvel outil, si elle est nécessaire, se fait en deux semaines sans interruption de service.",
          },
          {
            question: "Un dirigeant peut-il garder la main sur ses comptes en les externalisant ?",
            answer:
              "Absolument. Avec les logiciels cloud, le dirigeant conserve un accès en temps réel à ses données comptables. L'externalisation délègue l'exécution, pas la vision. Le reporting mensuel et les échanges réguliers avec le prestataire maintiennent le dirigeant informé et en capacité de décider.",
          },
          {
            question: "Quand faut-il externaliser sa comptabilité plutôt que recruter en interne ?",
            answer:
              "L'externalisation est pertinente quand le volume d'activité ne justifie pas un poste à temps plein, quand l'entreprise traverse une phase de croissance rapide et instable, ou quand le dirigeant veut accéder à une expertise variée sans engager un salarié. C'est souvent le cas des startups et des PME en développement.",
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        paragraphs: [
          "Une comptabilité fiable et à jour est le fondement de tout pilotage financier sérieux. Pour les dirigeants de startups et de PME en croissance, l'externalisation comptable offre un équilibre pertinent : l'expertise d'un professionnel sans le coût et la rigidité d'un recrutement interne.",
          "Chez Iter Advisors, nous traitons la comptabilité comme un outil de décision, pas comme une simple obligation administrative. Nous nous intégrons dans vos outils existants, nous respectons vos échéances et nous vous donnons la visibilité dont vous avez besoin pour avancer sereinement.",
          "Vous pouvez échanger avec Iter Advisors pour évaluer le niveau d'accompagnement comptable adapté à votre entreprise.",
        ],
      },
    ],
  },
};

export function getComptabiliteExternalisationContent(locale: "fr") {
  return comptabiliteExternalisationContent[locale];
}
