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
    heading: string;
    content: string[];
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
      meta: {
        title: "CFO Barcelone — Direction Financière à Temps Partagé | Iter Advisors",
        description:
          "Iter Advisors, cabinet de DAF externalisé à Barcelone. CFO à temps partagé pour startups et PME en Espagne. Franco-espagnol, +85 entreprises.",
      },
      breadcrumbLabel: "DAF externalisé Barcelone",
      h1: "DAF externalisé à Barcelone : votre CFO à temps partagé en Espagne",
      intro: [
        "Barcelone est devenue l'un des hubs technologiques les plus dynamiques d'Europe, attirant startups, scale-ups et PME internationales. Dans cet écosystème en pleine croissance, disposer d'un directeur financier expérimenté est un avantage concurrentiel décisif.",
        "Iter Advisors est implanté à Barcelone depuis sa création. Nos CFOs bilingues français-espagnol accompagnent les entreprises dans la structuration de leur fonction finance, la préparation de levées de fonds et le pilotage de leur croissance sur le marché espagnol.",
      ],
      sections: [
        {
          heading: "Pourquoi choisir un DAF externalisé à Barcelone ?",
          content: [
            "L'écosystème entrepreneurial barcelonais présente des spécificités qui rendent le DAF externalisé particulièrement pertinent : un tissu dense de startups tech, des réglementations fiscales espagnoles complexes (IS, IVA, retenciones), et un besoin fréquent de reporting bilingue pour les investisseurs internationaux.",
            "Nos CFOs basés à Barcelone maîtrisent l'environnement fiscal et juridique espagnol, les relations avec les banques locales (CaixaBank, Sabadell, BBVA) et les spécificités du marché ibérique. Ils interviennent en français, espagnol et anglais.",
          ],
        },
        {
          heading: "Nos missions à Barcelone",
          content: [
            "Pilotage financier et reporting mensuel adapté aux normes espagnoles et internationales.",
            "Gestion de trésorerie et optimisation du BFR dans un contexte multi-devises.",
            "Préparation de levées de fonds auprès d'investisseurs espagnols et internationaux (VCs, family offices).",
            "Structuration comptable et fiscale pour les entreprises françaises implantées en Espagne.",
            "Accompagnement M&A et due diligence pour les opérations cross-border France-Espagne.",
          ],
        },
        {
          heading: "L'avantage Iter Advisors à Barcelone",
          content: [
            "Notre bureau barcelonais est situé au coeur du quartier de l'Eixample, à proximité des principaux hubs d'innovation (22@, Pier01). Nous travaillons avec un réseau de partenaires locaux : cabinets d'avocats, gestorías, banques et fonds d'investissement.",
            "Avec plus de 85 entreprises accompagnées entre la France et l'Espagne, nous comprenons les enjeux spécifiques des entreprises qui opèrent sur les deux marchés : double comptabilité, prix de transfert, conventions fiscales franco-espagnoles.",
          ],
        },
      ],
      faq: [
        {
          question: "Combien coûte un DAF externalisé à Barcelone ?",
          answer:
            "Nos formules à Barcelone vont de 2 000 EUR/mois (2-3 jours) à 7 000+ EUR/mois (8+ jours). Les tarifs sont alignés sur le marché espagnol, avec un TJM de 750 à 1 100 EUR HT.",
        },
        {
          question: "Votre DAF externalisé parle-t-il espagnol ?",
          answer:
            "Oui, tous nos CFOs basés à Barcelone sont bilingues français-espagnol (et anglais). Ils maîtrisent la terminologie financière et fiscale dans les trois langues.",
        },
        {
          question: "Intervenez-vous dans toute l'Espagne ?",
          answer:
            "Oui, bien que notre bureau soit à Barcelone, nous intervenons dans toute l'Espagne en mode hybride (présentiel + remote). Nous avons des clients à Madrid, Valence, Malaga et Bilbao.",
        },
        {
          question: "Pouvez-vous gérer la comptabilité espagnole ?",
          answer:
            "Nous ne sommes pas un cabinet comptable, mais nous pilotons la relation avec votre gestoría ou expert-comptable espagnol. Nous assurons le contrôle de gestion, le reporting et la stratégie financière.",
        },
      ],
      ctaButton: "Prendre rendez-vous à Barcelone",
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
            "Our Barcelona packages range from EUR 2,000/month (2-3 days) to EUR 7,000+/month (8+ days). Rates are aligned with the Spanish market, with a daily rate of EUR 750-1,100 excl. VAT.",
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
            "Nuestras formulas en Barcelona van de 2.000 EUR/mes (2-3 dias) a 7.000+ EUR/mes (8+ dias). Las tarifas estan alineadas con el mercado espanol, con una tarifa diaria de 750 a 1.100 EUR sin IVA.",
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
          "Iter Advisors, cabinet de DAF externalisé à Paris. CFO à temps partagé pour PME et startups en Ile-de-France. +85 entreprises, dès 2 000 €/mois.",
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
            "Un DAF externalisé à Paris permet de bénéficier d'une expertise de direction financière sans supporter le coût d'un recrutement à temps plein (120-180 K EUR brut annuel à Paris pour un DAF senior). Nos formules démarrent à 2 000 EUR/mois.",
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
            "Nos formules à Paris vont de 2 000 EUR/mois (2-3 jours) à 8 000+ EUR/mois (8+ jours). Le TJM se situe entre 900 et 1 250 EUR HT, en ligne avec le marché parisien.",
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
        title: "Fractional CFO in Paris | Ile-de-France | Iter Advisors",
        description:
          "Iter Advisors, fractional CFO firm in Paris. Part-time financial management for SMEs and startups in Ile-de-France. 85+ companies supported.",
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
            "A fractional CFO in Paris provides finance leadership expertise without the cost of a full-time hire (EUR 120-180K gross annually in Paris for a senior CFO). Our packages start at EUR 2,000/month.",
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
            "Our Paris packages range from EUR 2,000/month (2-3 days) to EUR 8,000+/month (8+ days). The daily rate is EUR 900-1,250 excl. VAT, in line with the Parisian market.",
        },
        {
          question: "Do you work on-site in Paris?",
          answer:
            "Yes, our CFOs work in hybrid mode: 1-2 days per week on-site at your Paris offices, and the rest remotely. We adapt to your needs.",
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
            "Un CFO externalizado en Paris permite beneficiarse de una experiencia de direccion financiera sin soportar el coste de una contratacion a tiempo completo (120-180 K EUR brutos anuales en Paris para un CFO senior). Nuestras formulas empiezan en 2.000 EUR/mes.",
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
            "Nuestras formulas en Paris van de 2.000 EUR/mes (2-3 dias) a 8.000+ EUR/mes (8+ dias). La tarifa diaria se situa entre 900 y 1.250 EUR sin IVA, en linea con el mercado parisino.",
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
        title: "Directeur Financier Externalisé à Toulouse — CFO Occitanie | Iter Advisors",
        description:
          "Iter Advisors, cabinet de DAF externalisé à Toulouse. Direction financière à temps partagé pour PME et startups en Occitanie. +85 entreprises accompagnées.",
      },
      breadcrumbLabel: "DAF externalisé Toulouse",
      h1: "DAF externalisé à Toulouse : votre CFO à temps partagé en Occitanie",
      intro: [
        "Toulouse, capitale de l'aéronautique et du spatial, est aussi un pôle majeur de l'innovation et de l'entrepreneuriat en France. La région Occitanie abrite un écosystème dynamique de startups, PME industrielles et entreprises de services.",
        "Iter Advisors accompagne les entreprises toulousaines avec des DAFs externalisés qui comprennent les spécificités du tissu économique local : sous-traitance aéronautique, deeptech, agritech et services aux entreprises.",
      ],
      sections: [
        {
          heading: "Pourquoi choisir un DAF externalisé à Toulouse ?",
          content: [
            "L'écosystème toulousain se distingue par sa diversité sectorielle (aéronautique, spatial, santé, agritech) et par la présence de grands donneurs d'ordres (Airbus, Thales, Pierre Fabre). Les PME et ETI de la région ont besoin d'un pilotage financier rigoureux pour gérer leurs cycles longs et leurs relations avec les grands comptes.",
            "Le coût de la vie à Toulouse étant inférieur à Paris, les tarifs de nos DAFs externalisés sont adaptés au marché local, tout en offrant une expertise de niveau national.",
          ],
        },
        {
          heading: "Nos missions à Toulouse",
          content: [
            "Pilotage financier et reporting pour PME industrielles et de services en Occitanie.",
            "Gestion de trésorerie adaptée aux cycles longs de la sous-traitance aéronautique.",
            "Accompagnement des levées de fonds et des financements régionaux (Région Occitanie, Bpifrance Toulouse).",
            "Structuration financière pour les entreprises en croissance et préparation aux opérations de M&A.",
            "Accompagnement à l'internationalisation, notamment vers l'Espagne via notre bureau de Barcelone.",
          ],
        },
        {
          heading: "L'avantage Iter Advisors à Toulouse",
          content: [
            "Notre présence à Toulouse complète notre maillage territorial avec Paris et Barcelone. Nous offrons aux entreprises occitanes un accès à un réseau national et international d'investisseurs et de partenaires.",
            "Notre connaissance du tissu économique local et notre proximité avec l'Espagne font de nous un partenaire idéal pour les entreprises qui cherchent à se développer au-delà de la région.",
          ],
        },
      ],
      faq: [
        {
          question: "Combien coûte un DAF externalisé à Toulouse ?",
          answer:
            "Nos formules à Toulouse vont de 2 000 EUR/mois (2-3 jours) à 6 000+ EUR/mois (8+ jours). Le TJM se situe entre 750 et 1 000 EUR HT, adapté au marché occitan.",
        },
        {
          question: "Intervenez-vous dans toute l'Occitanie ?",
          answer:
            "Oui, nous intervenons à Toulouse et dans toute la région Occitanie : Montpellier, Perpignan, Tarbes, Albi. Nos CFOs travaillent en mode hybride.",
        },
        {
          question: "Avez-vous une expertise aéronautique ?",
          answer:
            "Oui, plusieurs de nos CFOs ont une expérience significative dans le secteur aéronautique et la sous-traitance industrielle. Ils comprennent les enjeux de trésorerie liés aux cycles longs et aux grands donneurs d'ordres.",
        },
      ],
      ctaButton: "Prendre rendez-vous à Toulouse",
    },
    en: {
      meta: {
        title: "Fractional CFO in Toulouse | Occitanie | Iter Advisors",
        description:
          "Iter Advisors, fractional CFO firm in Toulouse. Part-time financial management for SMEs and startups in Occitanie. 85+ companies supported.",
      },
      breadcrumbLabel: "Fractional CFO Toulouse",
      h1: "Fractional CFO in Toulouse: your part-time CFO in Occitanie",
      intro: [
        "Toulouse, the capital of aerospace, is also a major hub for innovation and entrepreneurship in France. The Occitanie region hosts a dynamic ecosystem of startups, industrial SMEs and service companies.",
        "Iter Advisors supports Toulouse-based companies with fractional CFOs who understand the specificities of the local economic fabric: aerospace subcontracting, deeptech, agritech and business services.",
      ],
      sections: [
        {
          heading: "Why choose a fractional CFO in Toulouse?",
          content: [
            "The Toulouse ecosystem stands out for its sector diversity (aerospace, space, health, agritech) and the presence of major contractors (Airbus, Thales, Pierre Fabre). Regional SMEs and mid-caps need rigorous financial management to handle long cycles and large account relationships.",
            "With Toulouse's lower cost of living compared to Paris, our fractional CFO rates are adapted to the local market while offering national-level expertise.",
          ],
        },
        {
          heading: "Our missions in Toulouse",
          content: [
            "Financial management and reporting for industrial and service SMEs in Occitanie.",
            "Cash management adapted to the long cycles of aerospace subcontracting.",
            "Fundraising support and regional financing (Region Occitanie, Bpifrance Toulouse).",
            "Financial structuring for growing companies and M&A preparation.",
            "International expansion support, particularly to Spain via our Barcelona office.",
          ],
        },
        {
          heading: "The Iter Advisors advantage in Toulouse",
          content: [
            "Our Toulouse presence completes our territorial coverage with Paris and Barcelona. We offer Occitanie companies access to a national and international network of investors and partners.",
            "Our knowledge of the local economic fabric and proximity to Spain make us an ideal partner for companies looking to expand beyond the region.",
          ],
        },
      ],
      faq: [
        {
          question: "How much does a fractional CFO cost in Toulouse?",
          answer:
            "Our Toulouse packages range from EUR 2,000/month (2-3 days) to EUR 6,000+/month (8+ days). The daily rate is EUR 750-1,000 excl. VAT, adapted to the Occitanie market.",
        },
        {
          question: "Do you operate throughout Occitanie?",
          answer:
            "Yes, we operate in Toulouse and throughout the Occitanie region: Montpellier, Perpignan, Tarbes, Albi. Our CFOs work in hybrid mode.",
        },
        {
          question: "Do you have aerospace expertise?",
          answer:
            "Yes, several of our CFOs have significant experience in the aerospace sector and industrial subcontracting. They understand the cash flow challenges related to long cycles and major contractors.",
        },
      ],
      ctaButton: "Book a call in Toulouse",
    },
    es: {
      meta: {
        title: "CFO externalizado Toulouse | Occitania | Iter Advisors",
        description:
          "Iter Advisors, gabinete de CFO externalizado en Toulouse. Dirección financiera a tiempo compartido para pymes y startups en Occitania. +85 empresas.",
      },
      breadcrumbLabel: "CFO externalizado Toulouse",
      h1: "CFO externalizado en Toulouse: su director financiero a tiempo compartido en Occitania",
      intro: [
        "Toulouse, capital de la aeronautica y el espacio, es tambien un polo importante de innovacion y emprendimiento en Francia. La region de Occitania alberga un ecosistema dinamico de startups, pymes industriales y empresas de servicios.",
        "Iter Advisors acompana a las empresas de Toulouse con CFOs externalizados que comprenden las especificidades del tejido economico local: subcontratacion aeronautica, deeptech, agritech y servicios a empresas.",
      ],
      sections: [
        {
          heading: "Por que elegir un CFO externalizado en Toulouse?",
          content: [
            "El ecosistema de Toulouse se distingue por su diversidad sectorial (aeronautica, espacio, salud, agritech) y la presencia de grandes contratistas (Airbus, Thales, Pierre Fabre). Las pymes y ETI de la region necesitan una gestion financiera rigurosa para gestionar sus ciclos largos y sus relaciones con las grandes cuentas.",
            "Con un coste de vida inferior al de Paris, las tarifas de nuestros CFOs externalizados estan adaptadas al mercado local, ofreciendo al mismo tiempo una experiencia de nivel nacional.",
          ],
        },
        {
          heading: "Nuestras misiones en Toulouse",
          content: [
            "Gestion financiera y reporting para pymes industriales y de servicios en Occitania.",
            "Gestion de tesoreria adaptada a los ciclos largos de la subcontratacion aeronautica.",
            "Acompanamiento en rondas de financiacion y financiaciones regionales (Region Occitania, Bpifrance Toulouse).",
            "Estructuracion financiera para empresas en crecimiento y preparacion de operaciones de M&A.",
            "Acompanamiento a la internacionalizacion, especialmente hacia Espana a traves de nuestra oficina de Barcelona.",
          ],
        },
        {
          heading: "La ventaja Iter Advisors en Toulouse",
          content: [
            "Nuestra presencia en Toulouse completa nuestra cobertura territorial con Paris y Barcelona. Ofrecemos a las empresas de Occitania acceso a una red nacional e internacional de inversores y socios.",
            "Nuestro conocimiento del tejido economico local y nuestra proximidad con Espana nos convierten en un socio ideal para las empresas que buscan expandirse mas alla de la region.",
          ],
        },
      ],
      faq: [
        {
          question: "Cuanto cuesta un CFO externalizado en Toulouse?",
          answer:
            "Nuestras formulas en Toulouse van de 2.000 EUR/mes (2-3 dias) a 6.000+ EUR/mes (8+ dias). La tarifa diaria se situa entre 750 y 1.000 EUR sin IVA, adaptada al mercado occitano.",
        },
        {
          question: "Intervienen en toda Occitania?",
          answer:
            "Si, intervenimos en Toulouse y en toda la region de Occitania: Montpellier, Perpignan, Tarbes, Albi. Nuestros CFOs trabajan en modo hibrido.",
        },
        {
          question: "Tienen experiencia aeronautica?",
          answer:
            "Si, varios de nuestros CFOs tienen una experiencia significativa en el sector aeronautico y la subcontratacion industrial. Comprenden los retos de tesoreria ligados a los ciclos largos y los grandes contratistas.",
        },
      ],
      ctaButton: "Concierte una cita en Toulouse",
    },
  },
};

export function getDafLocalContent(city: DafLocalCity, locale: Locale): DafLocalContent {
  return localContent[city][locale];
}
