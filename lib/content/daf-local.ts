import { getDafOffer } from "./daf-offer";
import { Locale } from "../i18n";

export interface DafLocalContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string[];
  sections: {
    id?: string;
    aliases?: string[];
    heading: string;
    content: string[];
    links?: { href: string; label: string }[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  ctaButton: string;
}

export type DafLocalCity = "barcelone" | "paris" | "toulouse";

const localContent: Record<DafLocalCity, Record<Locale, DafLocalContent>> = {
  barcelone: {
    fr: {
  "meta": {
    "title": "DAF externalisé à Barcelone pour PME et startups",
    "description": "Direction financière à Barcelone : trésorerie, reporting France-Espagne, financement et coordination avec votre gestoría. Périmètre et budget définis ensemble."
  },
  "breadcrumbLabel": "DAF externalisé Barcelone",
  "h1": "DAF externalisé à Barcelone pour PME et startups",
  "intro": [
    "Votre entreprise est implantée à Barcelone ou développe une activité entre la France et l’Espagne. Vous cherchez des chiffres comparables, des prévisions de trésorerie et un interlocuteur pour préparer les décisions de la direction.",
    "Barcelone est le siège d’Iter Advisors, Carrer Casp 54. Benjamin Ziza, Florent Greth, Tom Jauffre et Deisy Arias Ramírez y interviennent sur les sujets financiers. Les langues de travail, la présence sur site et les relais sont précisés au cadrage."
  ],
  "sections": [
    {
      "id": "missions",
      "heading": "Une direction financière pour votre activité en Espagne",
      "content": [
        "La mission peut comprendre un prévisionnel de trésorerie, le budget et un reporting mensuel pour votre direction ou vos investisseurs. Pour un groupe présent dans les deux pays, nous définissons les rubriques, hypothèses et calendriers nécessaires à une lecture cohérente des entités.",
        "Le financement se prépare avec les dirigeants et leurs conseils : modèle financier, scénarios, data room et suivi des questions. Le cas SolarMente décrit des travaux de structuration financière et d’accompagnement d’une opération ; ses résultats ne constituent pas une prévision pour une autre entreprise."
      ],
      "links": [
        {
          "href": "/daf-externalise",
          "label": "Comprendre la mission de DAF externalisé"
        },
        {
          "href": "/ressources/cas-clients/solarmente-serie-b-cleantech",
          "label": "Lire le périmètre de la mission SolarMente"
        },
        {
          "href": "/services/previsionnel-tresorerie",
          "label": "Préparer un prévisionnel de trésorerie"
        }
      ]
    },
    {
      "id": "fiscalite",
      "aliases": [
        "recrutement"
      ],
      "heading": "Articuler le DAF, la gestoría et vos conseils",
      "content": [
        "Iter Advisors n’est pas un cabinet comptable. La mission de direction financière organise le pilotage et la coordination avec votre gestoría ou cabinet espagnol. La tenue, les déclarations, la paie et les conseils spécialisés restent attribués aux intervenants compétents dans le contrat.",
        "Pour une filiale espagnole, identifiez qui produit les données locales, qui contrôle les flux intragroupe et qui les rapproche avec le reporting du groupe. Les règles fiscales et sociales dépendent de votre situation ; aucun taux ou avantage ne doit être appliqué sans examen par les conseils concernés.",
        "Un recrutement doit aussi être inscrit dans les prévisions : rémunération, charges, date d’arrivée et capacité d’intégration. Un écart général de salaire entre deux villes ne permet pas d’établir le coût de votre poste."
      ],
      "links": [
        {
          "href": "/ressources/blog/filiale-espagnole-pilotage-financier",
          "label": "Organiser le pilotage d’une filiale espagnole"
        },
        {
          "href": "/services/comptabilite-externalisation",
          "label": "Clarifier la coordination comptable"
        },
        {
          "href": "/a-propos/benjamin-ziza",
          "label": "Découvrir le profil de Benjamin Ziza"
        }
      ]
    },
    {
      "id": "subventions",
      "heading": "Financement : partir des dispositifs officiels",
      "content": [
        "ENISA présente des prêts participatifs pour startups et PME. ACCIÓ publie les appels à aides et services pour les entreprises. Barcelona Activa propose de l’accompagnement à l’entrepreneuriat. Ces dispositifs ont des objets, calendriers et conditions différents.",
        "Consultez les conditions en vigueur et vérifiez l’éligibilité de l’entreprise avant de construire un dossier. Le plan de trésorerie doit distinguer demande, décision et encaissement. Un financement demandé n’est pas acquis ; les budgets, justificatifs et responsabilités sont à définir avec les intervenants concernés."
      ],
      "links": [
        {
          "href": "https://www.enisa.es/servicios/financiacion/startups-y-pymes/",
          "label": "ENISA : financement des startups et PME"
        },
        {
          "href": "https://www.accio.gencat.cat/ca/serveis/convocatories-dajuts/llistat-ajuts/",
          "label": "ACCIÓ : appels à aides et services"
        },
        {
          "href": "https://www.barcelonactiva.cat/ca/assessorament-formacio-networking",
          "label": "Barcelona Activa : accompagnement et formation"
        }
      ]
    },
    {
      "id": "erreurs",
      "heading": "Préparer votre premier échange",
      "content": [
        "Présentez les entités, pays, outils, banques et interlocuteurs déjà en place. Ajoutez les décisions à préparer et les échéances proches : recrutement, clôture, besoin de financement ou reporting investisseur.",
        "Les premiers travaux consistent à examiner les données disponibles, les accès et les points non rapprochés. Prévoyez une personne responsable de la transmission et des validations dans chaque entité. Le rythme de la mission dépend de ces besoins, plutôt que de la seule adresse du siège."
      ],
      "links": [
        {
          "href": "/daf-externalise/temps-partage",
          "label": "Définir le rythme d’un DAF à temps partagé"
        },
        {
          "href": "/contact#barcelone",
          "label": "Présenter votre besoin à Barcelone"
        }
      ]
    },
    {
      "id": "cout",
      "heading": "Quel budget prévoir à Barcelone ?",
      "content": [
        `Les formules Iter vont de ${getDafOffer("fr").price}. ${getDafOffer("fr").billing} ${getDafOffer("fr").commitment}`,
        "Le devis précise les livrables, les interlocuteurs, la disponibilité et les éventuels déplacements. La même grille Iter s’applique à ses implantations ; le lieu ne permet pas, à lui seul, de déduire une économie. Les travaux ponctuels et les prestations des conseils sont à distinguer du périmètre récurrent."
      ],
      "links": [
        {
          "href": "/daf-externalise/tarifs",
          "label": "Comparer les formules et tarifs Iter Advisors"
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Combien coûte un DAF externalisé à Barcelone ?",
      "answer": `Les formules Iter vont de ${getDafOffer("fr").price}. ${getDafOffer("fr").billing} ${getDafOffer("fr").commitment}`
    },
    {
      "question": "Quelles langues et quelle présence sont prévues ?",
      "answer": "Les langues de travail, les interventions sur site, le travail à distance et les interlocuteurs sont précisés au cadrage, selon les besoins et les profils mobilisés."
    },
    {
      "question": "Pouvez-vous gérer la comptabilité espagnole ?",
      "answer": "Iter n’est pas un cabinet comptable. Nous organisons le pilotage et la coordination avec votre gestoría ou cabinet espagnol. La production des comptes, les déclarations et la paie sont attribuées explicitement aux professionnels concernés."
    },
    {
      "question": "Pouvez-vous garantir une aide ou un financement ?",
      "answer": "Non. Les dispositifs dépendent de critères, de calendriers et d’une décision de l’organisme. La préparation d’un dossier et des prévisions financières ne garantit ni l’éligibilité ni l’obtention du financement."
    }
  ],
  "ctaButton": "Parlons de votre besoin à Barcelone"
},
    en: {
      meta: {
        title: "Fractional CFO in Barcelona | Part-time CFO | Iter Advisors",
        description:
          "Iter Advisors, fractional CFO firm in Barcelona. Part-time CFO for startups and SMEs in Spain. French-Spanish expertise, 85+ companies supported.",
      },
      breadcrumbLabel: "Fractional CFO Barcelona",
      h1: "Fractional CFO in Barcelona: your part-time CFO in Spain",
      intro: [
        "Barcelona has become one of Europe's most dynamic tech hubs, attracting startups, scale-ups and international SMEs. In this fast-growing ecosystem, having an experienced CFO is a decisive competitive advantage.",
        "Iter Advisors has been based in Barcelona since its founding. Our bilingual French-Spanish CFOs support companies in structuring their finance function, preparing fundraises and managing growth in the Spanish market.",
      ],
      sections: [
        {
          heading: "Why choose a fractional CFO in Barcelona?",
          content: [
            "Barcelona's entrepreneurial ecosystem has specificities that make a fractional CFO particularly relevant: a dense network of tech startups, complex Spanish tax regulations (IS, IVA, retenciones), and a frequent need for bilingual reporting for international investors.",
            "Our Barcelona-based CFOs master the Spanish tax and legal environment, relationships with local banks (CaixaBank, Sabadell, BBVA) and the specificities of the Iberian market. They work in French, Spanish and English.",
          ],
        },
        {
          heading: "Our missions in Barcelona",
          content: [
            "Financial management and monthly reporting adapted to Spanish and international standards.",
            "Cash management and working capital optimization in a multi-currency context.",
            "Fundraising preparation with Spanish and international investors (VCs, family offices).",
            "Accounting and tax structuring for French companies established in Spain.",
            "M&A support and due diligence for cross-border France-Spain transactions.",
          ],
        },
        {
          heading: "The Iter Advisors advantage in Barcelona",
          content: [
            "Our Barcelona office is located in the heart of the Eixample district, close to the main innovation hubs (22@, Pier01). We work with a network of local partners: law firms, gestorías, banks and investment funds.",
            "With over 85 companies supported between France and Spain, we understand the specific challenges of companies operating in both markets: dual accounting, transfer pricing, Franco-Spanish tax treaties.",
          ],
        },
      ],
      faq: [
        {
          question: "How much does a fractional CFO cost in Barcelona?",
          answer:
            `Iter Advisors packages range from ${getDafOffer("en").price}. ${getDafOffer("en").billing} ${getDafOffer("en").commitment}`,
        },
        {
          question: "Do your fractional CFOs speak Spanish?",
          answer:
            "Yes, all our Barcelona-based CFOs are bilingual French-Spanish (and English). They master financial and tax terminology in all three languages.",
        },
        {
          question: "Do you operate throughout Spain?",
          answer:
            "Yes, although our office is in Barcelona, we operate throughout Spain in hybrid mode (on-site + remote). We have clients in Madrid, Valencia, Malaga and Bilbao.",
        },
        {
          question: "Can you manage Spanish accounting?",
          answer:
            "We are not an accounting firm, but we manage the relationship with your Spanish gestoría or accountant. We handle management control, reporting and financial strategy.",
        },
      ],
      ctaButton: "Book a call in Barcelona",
    },
    es: {
      meta: {
        title: "CFO externalizado en Barcelona | Iter Advisors",
        description:
          "Iter Advisors, gabinete de CFO externalizado en Barcelona. CFO a tiempo compartido para startups y pymes. Franco-español, +85 empresas acompañadas.",
      },
      breadcrumbLabel: "CFO externalizado Barcelona",
      h1: "CFO externalizado en Barcelona: su director financiero a tiempo compartido",
      intro: [
        "Barcelona se ha convertido en uno de los hubs tecnologicos mas dinamicos de Europa, atrayendo startups, scale-ups y pymes internacionales. En este ecosistema en pleno crecimiento, disponer de un director financiero experimentado es una ventaja competitiva decisiva.",
        "Iter Advisors esta implantado en Barcelona desde su creacion. Nuestros CFOs bilingues frances-espanol acompanan a las empresas en la estructuracion de su funcion financiera, la preparacion de rondas de financiacion y la gestion de su crecimiento en el mercado espanol.",
      ],
      sections: [
        {
          heading: "Por que elegir un CFO externalizado en Barcelona?",
          content: [
            "El ecosistema emprendedor barcelones presenta especificidades que hacen del CFO externalizado una solucion particularmente pertinente: un tejido denso de startups tech, regulaciones fiscales espanolas complejas (IS, IVA, retenciones), y una necesidad frecuente de reporting bilingue para inversores internacionales.",
            "Nuestros CFOs basados en Barcelona dominan el entorno fiscal y juridico espanol, las relaciones con los bancos locales (CaixaBank, Sabadell, BBVA) y las especificidades del mercado iberico. Intervienen en frances, espanol e ingles.",
          ],
        },
        {
          heading: "Nuestras misiones en Barcelona",
          content: [
            "Gestion financiera y reporting mensual adaptado a las normas espanolas e internacionales.",
            "Gestion de tesoreria y optimizacion del fondo de maniobra en un contexto multi-divisa.",
            "Preparacion de rondas de financiacion con inversores espanoles e internacionales (VCs, family offices).",
            "Estructuracion contable y fiscal para empresas francesas implantadas en Espana.",
            "Acompanamiento M&A y due diligence para operaciones cross-border Francia-Espana.",
          ],
        },
        {
          heading: "La ventaja Iter Advisors en Barcelona",
          content: [
            "Nuestra oficina barcelonesa esta situada en el corazon del barrio del Eixample, cerca de los principales hubs de innovacion (22@, Pier01). Trabajamos con una red de socios locales: despachos de abogados, gestorias, bancos y fondos de inversion.",
            "Con mas de 85 empresas acompanadas entre Francia y Espana, comprendemos los retos especificos de las empresas que operan en ambos mercados: doble contabilidad, precios de transferencia, convenios fiscales franco-espanoles.",
          ],
        },
      ],
      faq: [
        {
          question: "Cuanto cuesta un CFO externalizado en Barcelona?",
          answer:
            `Las fórmulas de Iter Advisors van de ${getDafOffer("es").price}. ${getDafOffer("es").billing} ${getDafOffer("es").commitment}`,
        },
        {
          question: "Su CFO externalizado habla espanol?",
          answer:
            "Si, todos nuestros CFOs basados en Barcelona son bilingues frances-espanol (e ingles). Dominan la terminologia financiera y fiscal en los tres idiomas.",
        },
        {
          question: "Intervienen en toda Espana?",
          answer:
            "Si, aunque nuestra oficina esta en Barcelona, intervenimos en toda Espana en modo hibrido (presencial + remoto). Tenemos clientes en Madrid, Valencia, Malaga y Bilbao.",
        },
        {
          question: "Pueden gestionar la contabilidad espanola?",
          answer:
            "No somos un gabinete contable, pero gestionamos la relacion con su gestoria o contable espanol. Nos encargamos del control de gestion, el reporting y la estrategia financiera.",
        },
      ],
      ctaButton: "Concierte una cita en Barcelona",
    },
  },
  paris: {
    fr: {
      meta: {
        title: "DAF externalisé Paris — CFO temps partagé | Iter Advisors",
        description:
          "Iter Advisors, cabinet de DAF externalisé à Paris. CFO à temps partagé pour PME et startups en Ile-de-France. +85 entreprises, dès 3 000 € HT/mois.",
      },
      breadcrumbLabel: "DAF externalisé Paris",
      h1: "DAF externalisé à Paris : votre CFO à temps partagé en Ile-de-France",
      intro: [
        "Paris et l'Ile-de-France concentrent la majorité des startups et PME innovantes françaises. Dans un marché où la compétition pour les talents financiers est intense, le DAF externalisé offre une alternative flexible et immédiatement opérationnelle.",
        "Iter Advisors accompagne les entreprises parisiennes avec des CFOs expérimentés qui interviennent à temps partagé. Notre connaissance de l'écosystème francilien - investisseurs, banques, incubateurs - est un atout majeur pour nos clients.",
      ],
      sections: [
        {
          heading: "Pourquoi choisir un DAF externalisé à Paris ?",
          content: [
            "Le marché parisien se caractérise par une forte densité de startups tech (Station F, incubateurs), un accès privilégié aux investisseurs (VCs de la place parisienne, Bpifrance) et un coût salarial élevé pour les profils financiers seniors.",
            `Un DAF externalisé à Paris apporte une direction financière sur un périmètre convenu, sans recrutement à temps plein. Les formules Iter Advisors vont de ${getDafOffer("fr").price}, selon le périmètre et le profil mobilisé.`,
          ],
        },
        {
          heading: "Nos missions à Paris",
          content: [
            "Pilotage financier et reporting pour startups et PME franciliennes.",
            "Préparation de levées de fonds avec les VCs parisiens (Partech, Elaia, Breega, Idinvest).",
            "Structuration financière pour les entreprises en hypercroissance.",
            "Accompagnement des relations avec Bpifrance, BPI, et les dispositifs d'aide à l'innovation (CIR, JEI).",
            "Due diligence et accompagnement M&A pour les opérations sur le marché français.",
          ],
        },
        {
          heading: "L'avantage Iter Advisors à Paris",
          content: [
            "Notre équipe parisienne intervient sur site et en remote dans toute l'Ile-de-France. Nous connaissons parfaitement l'écosystème financier parisien et entretenons des relations privilégiées avec les principaux acteurs du marché.",
            "Notre double implantation Paris-Barcelone est un atout unique pour les entreprises qui se développent à l'international, notamment vers le marché espagnol.",
          ],
        },
      ],
      faq: [
        {
          question: "Combien coûte un DAF externalisé à Paris ?",
          answer:
            // FACTS (2026-09-01) — même correction qu'à Barcelone : grille unique,
            // forfait mensuel, pas de TJM côté client.
            "Nos formules à Paris vont de 3 000 à 8 000 € HT par mois selon la formule et le scope confié, comme sur nos autres bureaux. La facturation est un forfait mensuel, sans durée d'engagement minimale (préavis de 30 jours) ; nous ne facturons pas à la journée.",
        },
        {
          question: "Intervenez-vous sur site à Paris ?",
          answer:
            "Oui, nos CFOs interviennent en mode hybride : 1 à 2 jours par semaine sur site dans vos locaux parisiens, et le reste en remote. Nous nous adaptons à vos besoins.",
        },
        {
          question: "Pouvez-vous nous aider avec Bpifrance ?",
          answer:
            "Oui, nous accompagnons régulièrement nos clients dans leurs demandes auprès de Bpifrance (prêts d'honneur, garanties, aides à l'innovation). Nous connaissons les process et les interlocuteurs.",
        },
      ],
      ctaButton: "Prendre rendez-vous à Paris",
    },
    en: {
      meta: {
        title: "Outsourced CFO in Paris | Iter Advisors",
        description:
          "Senior CFOs for Paris-based startups and SMEs. Reporting, cash flow, fundraising. Starting within 2 weeks.",
      },
      breadcrumbLabel: "Fractional CFO Paris",
      h1: "Fractional CFO in Paris: your part-time CFO in Ile-de-France",
      intro: [
        "Paris and Ile-de-France concentrate the majority of innovative French startups and SMEs. In a market where competition for financial talent is intense, a fractional CFO offers a flexible and immediately operational alternative.",
        "Iter Advisors supports Parisian companies with experienced CFOs working on a part-time basis. Our knowledge of the Ile-de-France ecosystem - investors, banks, incubators - is a major asset for our clients.",
      ],
      sections: [
        {
          heading: "Why choose a fractional CFO in Paris?",
          content: [
            "The Parisian market is characterized by a high density of tech startups (Station F, incubators), privileged access to investors (Parisian VCs, Bpifrance) and high salary costs for senior finance profiles.",
            `A fractional CFO in Paris provides finance leadership for a defined scope without recruiting a full-time CFO. Iter Advisors packages range from ${getDafOffer("en").price}, depending on the scope and seniority required.`,
          ],
        },
        {
          heading: "Our missions in Paris",
          content: [
            "Financial management and reporting for Ile-de-France startups and SMEs.",
            "Fundraising preparation with Parisian VCs (Partech, Elaia, Breega, Idinvest).",
            "Financial structuring for hypergrowth companies.",
            "Support with Bpifrance relationships and innovation aid schemes (CIR, JEI).",
            "Due diligence and M&A support for French market transactions.",
          ],
        },
        {
          heading: "The Iter Advisors advantage in Paris",
          content: [
            "Our Parisian team works on-site and remotely throughout Ile-de-France. We have deep knowledge of the Parisian financial ecosystem and maintain privileged relationships with key market players.",
            "Our dual Paris-Barcelona presence is a unique asset for companies expanding internationally, particularly into the Spanish market.",
          ],
        },
      ],
      faq: [
        {
          question: "How much does a fractional CFO cost in Paris?",
          answer:
            `Iter Advisors packages range from ${getDafOffer("en").price}. ${getDafOffer("en").billing} ${getDafOffer("en").commitment}`,
        },
        {
          question: "Do you work on-site in Paris?",
          answer:
            "Our CFOs can work in hybrid mode. On-site visits and remote work are agreed according to the scope, availability and needs of your Paris team.",
        },
        {
          question: "Can you help with Bpifrance?",
          answer:
            "Yes, we regularly support our clients with Bpifrance applications (honor loans, guarantees, innovation aid). We know the processes and contacts.",
        },
      ],
      ctaButton: "Book a call in Paris",
    },
    es: {
      meta: {
        title: "CFO externalizado París | Tiempo compartido | Iter Advisors",
        description:
          "Iter Advisors, gabinete de CFO externalizado en París. Dirección financiera a tiempo compartido para pymes y startups en Île-de-France. +85 empresas.",
      },
      breadcrumbLabel: "CFO externalizado Paris",
      h1: "CFO externalizado en Paris: su director financiero a tiempo compartido en Ile-de-France",
      intro: [
        "Paris e Ile-de-France concentran la mayoria de las startups y pymes innovadoras francesas. En un mercado donde la competencia por el talento financiero es intensa, el CFO externalizado ofrece una alternativa flexible e inmediatamente operativa.",
        "Iter Advisors acompana a las empresas parisinas con CFOs experimentados que intervienen a tiempo compartido. Nuestro conocimiento del ecosistema francilien - inversores, bancos, incubadoras - es un activo fundamental para nuestros clientes.",
      ],
      sections: [
        {
          heading: "Por que elegir un CFO externalizado en Paris?",
          content: [
            "El mercado parisino se caracteriza por una alta densidad de startups tech (Station F, incubadoras), acceso privilegiado a inversores (VCs parisinos, Bpifrance) y un coste salarial elevado para perfiles financieros senior.",
            `Un CFO externalizado en París aporta dirección financiera sobre un alcance acordado, sin contratar a tiempo completo. Las fórmulas de Iter Advisors van de ${getDafOffer("es").price}, según el alcance y la experiencia necesaria.`,
          ],
        },
        {
          heading: "Nuestras misiones en Paris",
          content: [
            "Gestion financiera y reporting para startups y pymes de Ile-de-France.",
            "Preparacion de rondas de financiacion con VCs parisinos (Partech, Elaia, Breega, Idinvest).",
            "Estructuracion financiera para empresas en hipercrecimiento.",
            "Acompanamiento en las relaciones con Bpifrance y los dispositivos de ayuda a la innovacion (CIR, JEI).",
            "Due diligence y acompanamiento M&A para operaciones en el mercado frances.",
          ],
        },
        {
          heading: "La ventaja Iter Advisors en Paris",
          content: [
            "Nuestro equipo parisino interviene en sitio y en remoto en toda Ile-de-France. Conocemos perfectamente el ecosistema financiero parisino y mantenemos relaciones privilegiadas con los principales actores del mercado.",
            "Nuestra doble implantacion Paris-Barcelona es un activo unico para las empresas que se desarrollan a nivel internacional, especialmente hacia el mercado espanol.",
          ],
        },
      ],
      faq: [
        {
          question: "Cuanto cuesta un CFO externalizado en Paris?",
          answer:
            `Las fórmulas de Iter Advisors van de ${getDafOffer("es").price}. ${getDafOffer("es").billing} ${getDafOffer("es").commitment}`,
        },
        {
          question: "Intervienen en sitio en Paris?",
          answer:
            "Si, nuestros CFOs intervienen en modo hibrido: 1-2 dias por semana en sitio en sus oficinas parisinas, y el resto en remoto. Nos adaptamos a sus necesidades.",
        },
        {
          question: "Pueden ayudar con Bpifrance?",
          answer:
            "Si, acompanamos regularmente a nuestros clientes en sus solicitudes ante Bpifrance (prestamos de honor, garantias, ayudas a la innovacion). Conocemos los procesos y los interlocutores.",
        },
      ],
      ctaButton: "Concierte una cita en Paris",
    },
  },
  toulouse: {
    fr: {
      meta: {
        title: "DAF externalisé Toulouse : missions et tarifs | Iter",
        description: "DAF externalisé pour PME et startups à Toulouse : trésorerie, reporting et financement. Dès 3 000 € HT/mois, à distance et sur site selon votre besoin.",
      },
      breadcrumbLabel: "DAF externalisé Toulouse",
      h1: "DAF externalisé à Toulouse : piloter votre PME ou votre startup",
      intro: [
        "Votre entreprise est à Toulouse et vous avez besoin de visibilité sur le cash, les marges ou un financement ? Un DAF senior prend en charge le pilotage avec vos équipes et votre expert-comptable, pour un périmètre défini avant le démarrage.",
        "Nos missions sont pilotées depuis Paris et Barcelone, avec des déplacements à Toulouse convenus au cadrage. Le budget est de 3 000 à 8 000 € HT par mois ; le démarrage intervient en 8 à 15 jours après le premier échange, selon le profil et le périmètre.",
      ],
      sections: [
        {
          heading: "Ce que nous définissons avant de démarrer",
          content: [
            "Un interlocuteur financier dédié, les priorités de votre dirigeant, les données disponibles et les responsabilités respectives du DAF, de votre équipe et de votre expert-comptable.",
            "Le calendrier des revues, les livrables et les déplacements sont convenus par écrit. Les échanges courants se font à distance ; les réunions sur site sont organisées selon les besoins de la mission. Nous ne promettons pas de présence hebdomadaire locale.",
          ],
        },
        {
          heading: "Trois besoins fréquents à cadrer ensemble",
          content: [
            "PME de services ou de production : suivre la marge par activité ou par affaire, prévoir les encaissements, piloter le BFR et préparer un investissement avec vos banques.",
            "Startup en croissance : fiabiliser le runway, construire le budget et le reporting investisseurs, puis préparer le modèle financier et la data room si une levée est prévue.",
            "Entreprise qui se développe en Espagne : coordonner les reportings des entités et les interlocuteurs financiers, comptables et juridiques depuis notre implantation à Barcelone.",
          ],
        },
        {
          heading: "Les livrables du premier mois",
          content: [
            "Un prévisionnel de trésorerie à 13 semaines, un premier reporting mensuel P&L, cash et indicateurs, et une revue finance avec le dirigeant constituent le socle de la formule Essentiel.",
            "Le business plan, le financement, la consolidation ou les opérations de croissance externe complètent le périmètre selon la formule. Les priorités sont ordonnées en fonction de vos données et des échéances réelles.",
          ],
        },
        {
          heading: "Un budget défini par le travail confié",
          content: [
            "La grille nationale s'applique à Toulouse : Essentiel de 3 000 à 5 000 € HT/mois, Croissance de 5 000 à 6 500 €, Premium de 6 500 à 8 000 €. Les volumes indicatifs vont de 1 à 8 jours par mois selon la formule.",
            "Le forfait porte sur un périmètre et un profil, pas sur un nombre de journées. Les frais de déplacement éventuels sont précisés séparément au devis. Aucun dépassement n'est facturé sans avenant signé. Sans durée d'engagement minimale, résiliable avec un préavis de 30 jours.",
          ],
        },
        {
          heading: "Notre présence à Toulouse, en pratique",
          content: [
            "Nous n'avons pas de consultant résident à Toulouse. Les missions sont suivies par nos équipes parisienne et barcelonaise ; le profil est présenté avant la signature pour vérifier son adéquation à votre activité.",
            "Notre adresse de domiciliation est le 32 boulevard d'Arcole, 31000 Toulouse. Les rendez-vous se tiennent à distance ou dans vos locaux, selon ce qui est convenu ensemble.",
          ],
        },
      ],
      faq: [
        { question: "Combien coûte un DAF externalisé à Toulouse ?", answer: "De 3 000 à 8 000 € HT/mois selon le périmètre et le profil. La grille est nationale. Les déplacements éventuels sont chiffrés séparément au devis." },
        { question: "Le DAF intervient-il dans nos locaux ?", answer: "Oui, selon une cadence fixée au cadrage. Le suivi courant se fait à distance depuis Paris ou Barcelone ; les déplacements concernent notamment le démarrage et les revues financières. Aucun consultant n'est résident à Toulouse." },
        { question: "Faut-il avoir levé des fonds ?", answer: "Non. Une PME sans investisseurs peut avoir besoin d'un prévisionnel de trésorerie, d'un suivi de marge ou d'un dossier bancaire. Le périmètre découle de ces besoins, pas du mode de financement de l'entreprise." },
        { question: "Avez-vous un cas client toulousain à présenter ?", answer: "Nous n'avons pas encore de cas client toulousain publiable. Les études présentées sur le site illustrent des missions conduites ailleurs. L'expérience du profil proposé et les livrables attendus sont examinés lors du cadrage." },
        { question: "Quel est le délai de démarrage ?", answer: "Comptez 8 à 15 jours depuis le premier échange, selon le profil et la complexité. Les premiers livrables de reporting arrivent dès le premier mois d'intervention." },
      ],
      ctaButton: "Décrire mon besoin à Toulouse",
    },
    en: {
      meta: { title: "Fractional CFO in Toulouse: scope and fees | Iter Advisors", description: "Fractional CFO for SMEs and startups in Toulouse. Cash flow, reporting and funding from €3,000 excl. VAT/month, remotely and on site as agreed." },
      breadcrumbLabel: "Fractional CFO Toulouse",
      h1: "Fractional CFO for SMEs and startups in Toulouse",
      intro: ["Build visibility over cash, margins and financing with a senior CFO working alongside your team and accountant.", "Engagements are managed from Paris and Barcelona, with travel to Toulouse agreed during scoping. There is no resident consultant in Toulouse."],
      sections: [
        { heading: "Scope and first deliverables", content: ["Define the priorities, data access and reporting cadence before starting: cash forecast, monthly reporting, margin analysis or funding preparation.", "The first month focuses on a financial diagnosis, a cash forecast and a reporting plan adapted to your available data and agreed scope."] },
        { heading: "National pricing and timing", content: ["Essential: €3,000–€5,000 excluding VAT/month; Growth: €5,000–€6,500; Premium: €6,500–€8,000. Indicative involvement ranges from 1 to 8 days per month, depending on the package.", "Engagements usually start within 8–15 days of the first discussion, depending on scope and profile. Travel is quoted separately. There is no minimum term, with 30 days' notice."] },
        { heading: "How we work with Toulouse companies", content: ["Our registered address is 32 boulevard d'Arcole, 31000 Toulouse. It is a domiciliation address; meetings take place remotely or at your premises as agreed.", "The proposed CFO is presented before signing so you can assess their fit with your sector and needs. We do not publish a Toulouse-specific client case at this stage."] },
      ],
      faq: [
        { question: "How much does a fractional CFO cost in Toulouse?", answer: "€3,000–€8,000 excluding VAT per month, depending on scope and seniority. National pricing applies; any travel is quoted separately." },
        { question: "Will the CFO work at our premises?", answer: "On-site work is agreed during scoping. Day-to-day support is managed remotely from Paris or Barcelona; there is no resident CFO in Toulouse." },
        { question: "Can you support a company that is not fundraising?", answer: "Yes. An engagement can focus on cash flow, margins, reporting, budgeting and banking relationships without an equity round." },
      ],
      ctaButton: "Describe your needs in Toulouse",
    },
    es: {
      meta: { title: "CFO externalizado en Toulouse: servicios y tarifas | Iter", description: "CFO para pymes y startups de Toulouse: tesorería, reporting y financiación desde 3.000 € sin IVA/mes, a distancia y presencialmente según lo acordado." },
      breadcrumbLabel: "CFO externalizado Toulouse",
      h1: "CFO externalizado para pymes y startups en Toulouse",
      intro: ["Gane visibilidad sobre la tesorería, los márgenes y la financiación con un CFO sénior que colabora con su equipo y su asesor contable.", "Las misiones se coordinan desde París y Barcelona, con desplazamientos a Toulouse acordados al definir el alcance. No hay consultor residente en Toulouse."],
      sections: [
        { heading: "Alcance y primeros entregables", content: ["Antes de empezar, definimos prioridades, acceso a los datos y frecuencia del seguimiento: previsión de tesorería, reporting mensual, márgenes o preparación de financiación.", "El primer mes se centra en un diagnóstico financiero, una previsión de tesorería y un plan de reporting adaptados a los datos disponibles y al alcance contratado."] },
        { heading: "Tarifas nacionales y plazos", content: ["Esencial: 3.000–5.000 € sin IVA/mes; Crecimiento: 5.000–6.500 €; Premium: 6.500–8.000 €. La dedicación orientativa va de 1 a 8 días al mes según la fórmula.", "El inicio se prevé entre 8 y 15 días tras el primer contacto, según el perfil y el alcance. Los desplazamientos se presupuestan aparte. Sin permanencia mínima, con un preaviso de 30 días."] },
        { heading: "Cómo trabajamos con las empresas de Toulouse", content: ["Nuestra dirección de domiciliación es 32 boulevard d'Arcole, 31000 Toulouse. Las reuniones se celebran a distancia o en sus instalaciones, según lo acordado.", "Presentamos al CFO propuesto antes de la firma para comprobar su adecuación al sector y las necesidades. Por ahora no publicamos un caso de cliente específico de Toulouse."] },
      ],
      faq: [
        { question: "¿Cuánto cuesta un CFO externalizado en Toulouse?", answer: "Entre 3.000 y 8.000 € sin IVA al mes, según el alcance y el perfil. Se aplica la tarifa nacional y los desplazamientos se presupuestan aparte." },
        { question: "¿Trabaja el CFO en nuestras instalaciones?", answer: "Las visitas se acuerdan al definir la misión. El seguimiento habitual se realiza a distancia desde París o Barcelona; no hay CFO residente en Toulouse." },
        { question: "¿Es necesario preparar una ronda de financiación?", answer: "No. La misión puede centrarse en tesorería, márgenes, reporting, presupuestos y relaciones bancarias sin una ampliación de capital." },
      ],
      ctaButton: "Describa sus necesidades en Toulouse",
    },
  },
};

export function getDafLocalContent(city: DafLocalCity, locale: Locale): DafLocalContent {
  return localContent[city][locale];
}
