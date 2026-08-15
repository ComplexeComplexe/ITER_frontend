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
    tldr: "Externaliser sa comptabilité représente 30 à 60 % d'économie face au coût employeur d'un comptable interne, avec une expertise plus large et une flexibilité adaptée aux startups et PME en croissance.",
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
              // SEO-DAF-02 (2026-08-09) — « certification des comptes » est le
              // monopole du commissaire aux comptes ; l'expert-comptable
              // établit et atteste les comptes annuels.
              "Un expert-comptable assure souvent la production des liasses fiscales et l'établissement des comptes annuels, avec un rythme trimestriel ou annuel. Un prestataire d'externalisation comptable traite les opérations au quotidien : saisie des factures, déclarations de TVA, suivi de la trésorerie. Les deux rôles sont complémentaires. Iter Advisors peut coordonner les deux pour une couverture complète.",
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
  /**
   * SEO-REP §4.2 (2026-08-15) — traduction espagnole du contenu français.
   *
   * Avant cette passe, /es/services/externalizar-contabilidad rendait le MÊME
   * composant que le hub /es/services, avec pour seule différence un H1
   * surchargé : similarité Jaccard de 0,96 sur des séquences de 5 mots. Ce
   * n'était pas deux pages proches, c'était la même page servie deux fois.
   *
   * Adaptations volontaires plutôt qu'une traduction littérale : la TVA
   * devient l'IVA, la liasse fiscale les cuentas anuales, les charges
   * sociales la Seguridad Social. Les liens internes pointent vers les URL
   * espagnoles. Les noms des sources restent en français — ce sont les
   * sources réelles des chiffres, les traduire les rendrait introuvables.
   *
   * Les tarifs, les fourchettes et les avis clients sont identiques au
   * français : c'est la même offre et ce sont les mêmes clients.
   */
  es: {
    meta: {
      title: "Externalización contable para pymes: guía 2026",
      description:
        "Externaliza tu contabilidad con Iter Advisors: teneduría de libros, declaraciones de IVA, nóminas y cierre anual. Pennylane, Sage, QuickBooks.",
    },
    author: {
      name: "Sébastien Doat",
      jobTitle: "Socio fundador y CFO Advisor",
      linkedInUrl: "https://www.linkedin.com/in/sebastiendoat",
      avatarUrl: "/images/team/sebastien-doat.webp",
      updateDate: "2026-05-05",
    },
    tldr: "Externalizar la contabilidad representa un ahorro del 30 al 60 % frente al coste empresarial de un contable interno, con una experiencia más amplia y una flexibilidad adaptada a startups y pymes en crecimiento.",
    h1: "Externalización contable: tarifas, método y beneficios para pymes y startups",
    testimonials: [
      {
        name: "Charles Deknudt",
        company: "Eltex",
        sector: "CEO y fundador",
        text: "Tras cerrar nuestra primera ronda, necesitábamos estructurar las operaciones financieras. Iter profesionalizó nuestra función financiera y resultó ser un socio sólido, integrado en el equipo.",
        rating: 5,
      },
      {
        name: "Arnaud MEGE",
        company: "Unplexed",
        sector: "Co-founder",
        text: "Los equipos de Iter estructuraron nuestra función financiera con rigor, disponibilidad y eficacia, superando incluso nuestras expectativas iniciales.",
        rating: 5,
      },
      {
        name: "Mathurin Blouin",
        company: "MFL",
        sector: "CEO",
        text: "Iter nos acompañó en la implantación del reporting y la gestión de tesorería, aportando mayor visibilidad y tranquilidad financiera.",
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
        title: "¿Qué es la externalización contable?",
        paragraphs: [
          "La externalización contable consiste en confiar toda o parte de la contabilidad a un proveedor externo, en lugar de a un empleado interno. El alcance varía según las necesidades: puede limitarse al registro contable y a las declaraciones fiscales, o incluir la gestión de nóminas, el seguimiento de tesorería y el acompañamiento en el cierre anual.",
          "A diferencia de una asesoría tradicional, que a menudo se limita a producir las cuentas anuales, una externalización contable moderna se integra en el día a día de la empresa. Funciona en flujo continuo: facturas de proveedores, gastos, cobros de clientes, declaraciones de IVA, todo se trata sobre la marcha. La dirección conserva una visibilidad en tiempo real sobre su situación financiera.",
          "Las herramientas cloud han transformado este modelo. Con programas como Pennylane, Sage o QuickBooks, el proveedor externo accede a los mismos datos que la dirección. Se acabaron los intercambios de archivos Excel por correo y el desfase de varias semanas entre la realidad operativa y las cifras contables.",
        ],
      },
      {
        id: "signaux",
        title: "Las señales de que hay que externalizar la contabilidad",
        paragraphs: [
          "Varias situaciones concretas indican que una gestión contable artesanal ha llegado a su límite:",
        ],
        bullets: [
          {
            title: "La tesorería se vuelve difícil de seguir.",
            text: "La dirección ya no sabe con exactitud de cuánto dispone realmente, porque los saldos pendientes de clientes y los vencimientos de proveedores no están consolidados.",
          },
          {
            title: "Las declaraciones fiscales se acumulan o llegan tarde.",
            text: "Un IVA no declarado a tiempo, unas cuentas anuales preparadas con prisas, recargos por demora que se suman: estos problemas recurrentes reflejan una falta de recursos o de experiencia.",
          },
          {
            title: "El cierre anual tarda meses.",
            text: "Cuando el balance y la cuenta de resultados solo se finalizan varios meses después del cierre del ejercicio, la dirección pilota a ciegas durante buena parte del año siguiente.",
          },
          {
            title: "Los inversores o los bancos piden datos estructurados.",
            text: "Una startup en ronda de financiación o una pyme que solicita crédito bancario debe aportar un reporting fiable. Unas cuentas llevadas a la ligera no pasan el filtro.",
          },
          {
            title: "El tiempo dedicado a la contabilidad supera lo razonable.",
            text: "Un fundador que dedica varias medias jornadas por semana a registrar facturas desvía su atención del crecimiento del negocio.",
          },
        ],
        closingText:
          "Estas señales no significan necesariamente que haya que contratar a un contable interno. Para una estructura de diez a cincuenta personas, un puesto a jornada completa suele quedar sobredimensionado. La externalización contable ofrece una flexibilidad más adecuada en esa fase de crecimiento.",
      },
      {
        id: "benefices",
        title: "Los beneficios concretos de una contabilidad externalizada",
        paragraphs: [
          "Externalizar la contabilidad no es solo delegar una carga administrativa. Produce efectos medibles sobre la calidad del pilotaje de la empresa.",
        ],
        bullets: [
          {
            title: "Datos fiables y al día.",
            text: "La contabilidad se lleva en flujo continuo, sin retrasos. La dirección dispone de una fotografía financiera que refleja la realidad del momento.",
          },
          {
            title: "Cumplimiento de los plazos fiscales.",
            text: "Las declaraciones de IVA, las cuentas anuales y las obligaciones con la Seguridad Social se preparan y presentan en plazo. El riesgo de recargos y de inspecciones disminuye.",
          },
          {
            title: "Tiempo recuperado para la dirección.",
            text: "El fundador o el CEO recupera horas cada semana para centrarse en el producto, los clientes y la estrategia.",
          },
          {
            title: "Acceso a experiencia sin contratar.",
            text: "El proveedor acumula experiencia sobre decenas de situaciones distintas. Anticipa las trampas que la dirección no ve venir necesariamente.",
          },
          {
            title: "Coste controlado y escalable.",
            text: "La externalización contable se adapta al volumen de actividad. Cuesta menos que un empleado a jornada completa, con una flexibilidad que la contratación interna no ofrece.",
          },
        ],
        closingText:
          "Para una empresa en crecimiento, estos beneficios se traducen además en una mejor preparación ante auditorías, due diligences y negociaciones con inversores o socios bancarios.",
      },
      {
        id: "comparatif",
        title: "Comparativa: contable interno, asesoría o externalización",
        paragraphs: [
          "Tanto si dudas entre contratar internamente, recurrir a una asesoría tradicional o externalizar tu contabilidad, esta tabla comparativa te ayudará a evaluar los costes reales y las ventajas de cada enfoque:",
        ],
        tables: [
          {
            caption: "Comparativa detallada de los tres modelos de contabilidad",
            headers: [
              "Criterio",
              "Contable interno (pyme)",
              "Asesoría contable",
              "Externalización Iter Advisors",
            ],
            rows: [
              [
                "Coste anual (empresa de 15-20 personas)",
                "35 000 € - 55 000 €",
                "4 000 € - 8 000 €",
                "4 200 € - 9 600 €",
              ],
              [
                "Herramientas y software",
                "Variable (a menudo heredado)",
                "Impuestas por la asesoría",
                "A elegir (Pennylane, Sage, QB)",
              ],
              [
                "Plazo de respuesta (dudas urgentes)",
                "Inmediato",
                "48-72 horas",
                "24 horas",
              ],
              [
                "Pilotaje financiero (cuadros de mando, KPIs)",
                "Limitado",
                "Solo cuentas anuales",
                "Reporting mensual completo + análisis",
              ],
              [
                "Flexibilidad (ajuste del volumen)",
                "Contrato fijo (12-24 meses)",
                "Tarifa estándar",
                "Modular mes a mes",
              ],
              [
                "Plazo de puesta en marcha",
                "2-3 meses (contratación)",
                "2-4 semanas",
                "1-2 semanas",
              ],
              [
                "Continuidad en caso de ausencia",
                "Riesgo de interrupción",
                "Asegurada (otro asesor)",
                "Asegurada (equipo dedicado)",
              ],
              [
                "Relación de confianza establecida",
                "Media (un único interlocutor)",
                "Muy buena (asesoría consolidada)",
                "Excelente (socio a largo plazo)",
              ],
            ],
          },
        ],
      },
      {
        id: "tarifs",
        title: "¿Cuánto cuesta externalizar la contabilidad en 2026?",
        paragraphs: [
          "El coste de la externalización contable depende principalmente de cuatro factores: el tamaño de la empresa (volumen de facturas), la complejidad fiscal (IVA intracomunitario, multi-entidad, exportaciones), el alcance del servicio (solo teneduría, o teneduría más nóminas y reporting) y el nivel de pilotaje esperado (producción conforme, o cuadros de mando y análisis).",
          "Estas son las horquillas de precio observadas en 2026, junto con la horquilla practicada por Iter Advisors según el perfil de empresa.",
        ],
        tables: [
          {
            caption: "Tarifas 2026 — Externalización contable por tamaño de empresa",
            headers: [
              "Perfil de empresa",
              "Volumen mensual típico",
              "Mercado (horquilla mensual sin IVA)",
              "Iter Advisors (cuota mensual sin IVA)",
            ],
            rows: [
              [
                "Autónomo / microempresa (1-5 empleados)",
                "10-40 facturas, IVA simple",
                "200 - 500 €",
                "350 - 650 €",
              ],
              [
                "Startup early-stage (5-15 empleados)",
                "30-80 facturas, nóminas",
                "400 - 900 €",
                "550 - 1 100 €",
              ],
              [
                "Pyme en crecimiento (15-50 empleados)",
                "100-300 facturas, IVA UE, nóminas",
                "800 - 1 800 €",
                "900 - 1 800 €",
              ],
              [
                "Pyme estructurada (50-150 empleados)",
                "300-800 facturas, multi-entidad",
                "1 500 - 3 500 €",
                "1 800 - 3 200 €",
              ],
              [
                "Scale-up / gran empresa (150+ empleados)",
                "800+ facturas, consolidación",
                "3 000 - 8 000 €",
                "3 500 - 7 000 €",
              ],
            ],
          },
        ],
      },
      {
        id: "approche-iter",
        title: "Cómo acompaña Iter Advisors tu contabilidad externalizada",
        paragraphs: [
          "Nuestro enfoque se apoya en tres principios: integración fluida, herramientas existentes y experiencia financiera de nivel CFO.",
          "Integración sin ruptura. No te obligamos a cambiar de software de un día para otro. Iter Advisors trabaja con las herramientas que ya utilizas, ya sea Pennylane, Sage, QuickBooks u otras soluciones cloud. La migración, cuando es necesaria, se realiza en dos semanas como máximo, sin interrupción del servicio.",
          "Un alcance claro y completo. Nuestro acompañamiento cubre la teneduría de la contabilidad general, las declaraciones de IVA y fiscales, la gestión de nóminas y cotizaciones a la Seguridad Social, así como la preparación y el seguimiento del cierre contable anual. Cada punto se trata con el mismo rigor, sin delegación opaca a subcontratistas.",
          "Contables que entienden tu negocio. Nuestros equipos no se limitan a registrar asientos. Entienden el contexto de tu empresa: tu modelo de negocio, tus retos de tesorería, tus obligaciones frente a los inversores. Esta visión global permite producir una contabilidad que sirve al pilotaje, no solo al cumplimiento fiscal.",
        ],
        closingText:
          "La externalización contable funciona mejor cuando se integra en una estrategia financiera global. Para una visión completa, explora también nuestra oferta de [[CFO externalizado|/es/externalizacion-daf]] (dirección financiera completa) y nuestros servicios de [[previsión de tesorería|/es/services/prevision-tesoreria]] y [[control de gestión|/es/services/control-gestion-externalizado]] para un pilotaje de 360°.",
      },
      {
        id: "erreurs-eviter",
        title: "Los errores que hay que evitar al externalizar la contabilidad",
        paragraphs: [
          "Externalizar no exime de mantenerse vigilante. Estos son los escollos más frecuentes:",
        ],
        bullets: [
          {
            title: "Elegir proveedor solo por el precio.",
            text: "Una tarifa anormalmente baja suele esconder una delegación en el extranjero, plazos de tratamiento más largos o falta de reactividad cuando surge un problema.",
          },
          {
            title: "Perder de vista las propias cifras.",
            text: "Externalizar no significa desentenderse de la contabilidad. La dirección debe seguir consultando con regularidad su balance y su cuenta de resultados.",
          },
          {
            title: "No verificar la compatibilidad de las herramientas.",
            text: "Si el proveedor impone un software obsoleto o incompatible con tu ecosistema, la fricción diaria será real.",
          },
          {
            title: "Subestimar la importancia de la comunicación.",
            text: "Un intercambio mensual estructurado entre la dirección y el proveedor evita las malas sorpresas. La contabilidad externalizada funciona mejor cuando es colaborativa.",
          },
        ],
      },
      {
        id: "faq",
        title: "Preguntas frecuentes",
        faqs: [
          {
            question: "¿Qué es la externalización contable?",
            answer:
              "Consiste en confiar la teneduría de libros, las declaraciones fiscales y, en su caso, las nóminas a un proveedor externo en lugar de a un empleado interno. Permite acceder a experiencia profesional sin las obligaciones de una contratación, con una flexibilidad adaptada al volumen de actividad de la empresa.",
          },
          {
            question: "¿Cuánto cuesta externalizar la contabilidad?",
            answer:
              "El coste depende del volumen de asientos, del número de empleados, de la complejidad fiscal y del alcance cubierto. Para una pyme o una startup en crecimiento, la externalización contable resulta por lo general más económica que un contable interno a jornada completa, y con una experiencia a menudo más amplia.",
          },
          {
            question: "¿Qué diferencia hay entre una asesoría contable y un proveedor de externalización?",
            answer:
              "Una asesoría suele encargarse de producir las cuentas anuales y las obligaciones fiscales, con un ritmo trimestral o anual. Un proveedor de externalización contable trata las operaciones a diario: registro de facturas, declaraciones de IVA, seguimiento de tesorería. Ambos papeles son complementarios. Iter Advisors puede coordinar los dos para una cobertura completa.",
          },
          {
            question: "¿La externalización contable funciona con Pennylane, Sage o QuickBooks?",
            answer:
              "Sí. Iter Advisors se integra directamente en las herramientas cloud que ya utilizas. Trabajamos con Pennylane, Sage, QuickBooks y otras soluciones. La migración a una nueva herramienta, si es necesaria, se realiza en dos semanas sin interrupción del servicio.",
          },
          {
            question: "¿Puede la dirección mantener el control de sus cuentas al externalizarlas?",
            answer:
              "Por supuesto. Con el software cloud, la dirección conserva acceso en tiempo real a sus datos contables. La externalización delega la ejecución, no la visión. El reporting mensual y los intercambios regulares con el proveedor mantienen a la dirección informada y en capacidad de decidir.",
          },
          {
            question: "¿Cuándo conviene externalizar en lugar de contratar internamente?",
            answer:
              "La externalización es pertinente cuando el volumen de actividad no justifica un puesto a jornada completa, cuando la empresa atraviesa una fase de crecimiento rápido e inestable, o cuando la dirección quiere acceder a una experiencia variada sin comprometerse con una contratación. Suele ser el caso de las startups y de las pymes en desarrollo.",
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusión",
        paragraphs: [
          "Una contabilidad fiable y al día es la base de cualquier pilotaje financiero serio. Para quienes dirigen startups y pymes en crecimiento, la externalización contable ofrece un equilibrio pertinente: la experiencia de un profesional sin el coste ni la rigidez de una contratación interna.",
          "En Iter Advisors tratamos la contabilidad como una herramienta de decisión, no como una simple obligación administrativa. Nos integramos en tus herramientas existentes, respetamos tus plazos y te damos la visibilidad que necesitas para avanzar con tranquilidad.",
          "Puedes hablar con Iter Advisors para evaluar el nivel de acompañamiento contable adecuado para tu empresa.",
        ],
      },
    ],
  },
};

export function getComptabiliteExternalisationContent(locale: "fr" | "es") {
  return comptabiliteExternalisationContent[locale];
}
