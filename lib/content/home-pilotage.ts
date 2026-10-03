import type { Locale } from "@/lib/i18n";
import {
  CLIENTS_ACCOMPAGNES,
  FONDS_LEVES,
  FORMULES,
  ENGAGEMENT,
  TRUSTFOLIO_RATING,
} from "./facts";
import { getDafOfferFacts } from "./offer-facts";
import { TRUSTFOLIO_REVIEWS } from "./trustfolio-reviews";

export const HOME_CLIENT_LOGOS = [
  "ukio",
  "surfe",
  "happyscribe",
  "hosco",
  "mitiga",
  "seasonly",
] as const;
export const HOME_CLIENT_NAMES = [
  "Ukio",
  "Surfe",
  "Happy Scribe",
  "Hosco",
  "Mitiga",
  "Seasonly",
] as const;
/** Illustrative forecast only. Never presented as a client or Iter result. */
export const HOME_CASH_EXAMPLE = [
  130, 112, 119, 97, 88, 77, 61, 99, 130, 143, 158, 172, 184,
] as const;
export const HOME_TRUSTFOLIO_URL =
  "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews";
export const HOME_LEAD_SLUGS = [
  "sebastien-doat",
  "benjamin-ziza",
  "florent-greth",
  "borith-biv",
] as const;
export const HOME_NEED_PATHS = [
  "/services/previsionnel-tresorerie",
  "/services/accompagnement-levee-de-fond",
  "/services/controle-de-gestion-externalise",
];

const copy = {
  fr: {
    meta: {
      title: "Iter Advisors : DAF & DRH à temps partagé | Paris, Barcelone",
      description:
        "Un DAF senior pour piloter vos finances. Équipe finance et RH à Paris et Barcelone, 85 entreprises accompagnées. Découvrez nos missions et tarifs.",
    },
    eyebrow: "Cabinet finance & RH · Paris / Barcelone",
    headline: ["Un ", "DAF senior", " pour piloter vos finances."],
    subtitle:
      "Trésorerie, budgets, reporting et financements : un directeur financier intégré à votre équipe, quelques jours par mois. Pour les PME et startups en France et en Espagne.",
    contact: "Échanger avec un DAF",
    fees: "Voir les tarifs",
    month: "€ HT / mois",
    notice: "Préavis de",
    days: "jours",
    noMinimum: "Sans durée minimale.",
    companies: "entreprises accompagnées",
    raised: "levés par nos clients",
    rating: "sur Trustfolio",
    logoLabel: "À leurs côtés, dans les décisions qui comptent",
    sheet: {
      badge: "Données fictives",
      title: "Voir venir. Décider à temps.",
      intro: "Exemple de prévisionnel · 13 semaines",
      kpis: ["Cash en S13", "Runway estimé", "Point bas · S7"],
      runway: "6 mois",
      axis: "Trésorerie (k€)",
      week: "S",
      threshold: "Seuil illustratif : 50 k€",
      rhythm: "Horizon hebdomadaire",
      process: "Hypothèses → scénarios → arbitrages",
      description:
        "Exemple fictif de trésorerie : 130 k€ en semaine 1, point bas de 61 k€ en semaine 7, 184 k€ en semaine 13. Le runway de six mois est une hypothèse illustrative distincte du prévisionnel.",
    },
    rhSignal: "Vos enjeux humains aussi.",
    rhSignalText: "Borith Biv pilote notre DRH à temps partagé.",
    rhLink: "Découvrir l’offre DRH",
    needs: {
      eyebrow: "Votre prochaine décision",
      title: "On commence par quoi ?",
      intro: "Une priorité claire. Un accompagnement adapté à votre équipe.",
      cards: [
        {
          label: "Cash",
          title: "Piloter ma trésorerie",
          text: "Anticiper les tensions, suivre les encaissements et choisir les bons arbitrages.",
        },
        {
          label: "Financement",
          title: "Préparer une levée de fonds",
          text: "Construire un business plan défendable et préparer les échanges avec les investisseurs.",
        },
        {
          label: "Reporting",
          title: "Fiabiliser mon reporting",
          text: "Réconcilier les chiffres, comprendre la marge et lire la performance chaque mois.",
        },
      ],
    },
    services: {
      eyebrow: "Nos services finance",
      title: "Un périmètre précis. Des chiffres utilisables.",
      link: "Découvrir la mission",
    },
    offer: {
      eyebrow: "Le bon format",
      title: "La fonction finance. À la bonne cadence.",
      text: "Vous avez besoin d’un décideur finance expérimenté, sans ouvrir immédiatement un poste à temps plein. Nous définissons les priorités, les livrables et une cadence adaptée au volume de travail.",
      anchor: "DAF externalisé",
      link: "Comprendre l’offre",
      related: "Explorer les formats et expertises",
    },
    rh: {
      eyebrow: "DRH à temps partagé",
      title: "Des équipes qui grandissent. Une organisation qui suit.",
      text: "Recrutement, onboarding, organisation, coordination de la paie et conformité : un DRH senior vous accompagne quelques jours par mois, sur un périmètre défini.",
      role: "Partner Capital Humain",
    },
    method: {
      eyebrow: "Du premier échange au rythme de croisière",
      title: "Une méthode. Quatre étapes.",
      steps: [
        {
          title: "Échanger",
          text: "Votre situation, vos urgences et les décisions à préparer.",
        },
        {
          title: "Cadrer",
          text: "Périmètre, interlocuteur, cadence et premiers livrables.",
        },
        {
          title: "Mettre à plat",
          text: "Données, outils et hypothèses : une base commune.",
        },
        {
          title: "Piloter",
          text: "Un rythme de travail et des points de décision réguliers.",
        },
      ],
    },
    why: {
      eyebrow: "Pourquoi Iter",
      title: "Un interlocuteur dédié. Des expertises réunies.",
      items: [
        {
          title: "Intégré à votre équipe",
          text: "Une personne qui connaît le terrain, les chiffres et les contraintes du dirigeant.",
        },
        {
          title: "Appuyé par le collectif",
          text: "Des compétences complémentaires, une revue par un associé selon la formule et des modalités de passation définies.",
        },
        {
          title: "Entre France et Espagne",
          text: "Des équipes à Paris et Barcelone, qui travaillent avec vos partenaires locaux.",
        },
      ],
    },
    team: {
      eyebrow: "Le cabinet",
      title: "Des gens. Avant les tableaux.",
      link: "Rencontrer toute l’équipe",
    },
    reviews: {
      eyebrow: "Ils racontent leur accompagnement",
      title: "Le regard de nos clients.",
      source: "Lire les avis sur Trustfolio",
      translated: "",
      bodies: [] as string[],
    },
    moments: {
      eyebrow: "Quand nous appeler",
      title: "Quand les enjeux changent de taille.",
      items: [
        "Vous préparez un financement.",
        "La croissance met le cash sous tension.",
        "Le reporting arrive trop tard.",
        "Un départ nécessite un relais finance.",
        "Vous vous développez en France ou en Espagne.",
      ],
    },
    faq: {
      eyebrow: "À propos d’Iter",
      title: "Avant de nous rencontrer.",
      questions: [
        "Où intervenez-vous ?",
        "Quand peut commencer une mission ?",
        "Comment se déroule l’accompagnement ?",
        "Pouvez-vous travailler avec nos outils ?",
        "Peut-on vous confier aussi les RH ?",
        "Pouvez-vous préparer un financement ?",
      ],
      answers: [
        "",
        "",
        "Nous cadrons les priorités, désignons votre interlocuteur et convenons d’une cadence de travail et de livrables. Les modalités sont revues avec vous lorsque le besoin évolue.",
        "Nous examinons votre organisation existante avant de recommander un changement. Les outils servent la fiabilité des données et le pilotage.",
        "Oui. L’offre DRH à temps partagé est pilotée par Borith Biv et fait l’objet d’un cadrage distinct de l’accompagnement finance.",
        "Nous préparons le modèle financier, les hypothèses et les informations nécessaires aux échanges avec les financeurs. Le périmètre est convenu avec vous ; l’obtention du financement dépend aussi de l’entreprise et des investisseurs.",
      ],
      link: "Tout savoir sur le DAF externalisé",
    },
    final: {
      eyebrow: "Parlons de vos priorités",
      title: "Une conversation. Un premier cap.",
      text: "Présentez votre situation à Sébastien Doat. Nous verrons ensemble si Iter correspond à votre besoin.",
      role: "Associé fondateur · CFO",
    },
  },
  en: {
    meta: {
      title: "Iter Advisors: Fractional CFO & HR | Paris, Barcelona",
      description:
        "A senior CFO to lead your finances. Finance and HR teams in Paris and Barcelona, 85 businesses supported. Explore our services, people and fees.",
    },
    eyebrow: "Finance & HR firm · Paris / Barcelona",
    headline: ["A ", "senior CFO", " to lead your finances."],
    subtitle:
      "Cash flow, budgets, reporting and financing: a finance director embedded in your team for a few days a month. For SMEs and startups in France and Spain.",
    contact: "Talk to a CFO",
    fees: "View fees",
    month: "€ / month excl. VAT",
    notice: "Notice period:",
    days: "days",
    noMinimum: "No minimum term.",
    companies: "businesses supported",
    raised: "raised by our clients",
    rating: "on Trustfolio",
    logoLabel: "Alongside them when decisions matter",
    sheet: {
      badge: "Fictional data",
      title: "Look ahead. Decide in time.",
      intro: "Forecast example · 13 weeks",
      kpis: ["Cash at W13", "Estimated runway", "Lowest cash · W7"],
      runway: "6 months",
      axis: "Cash balance (€k)",
      week: "W",
      threshold: "Illustrative threshold: €50k",
      rhythm: "Weekly horizon",
      process: "Assumptions → scenarios → decisions",
      description:
        "Fictional cash example: €130k in week 1, a low of €61k in week 7 and €184k in week 13. The six-month runway is a separate illustrative assumption, not derived from the forecast.",
    },
    rhSignal: "Your people priorities too.",
    rhSignalText: "Borith Biv leads our part-time HR director services.",
    rhLink: "Explore HR support",
    needs: {
      eyebrow: "Your next decision",
      title: "Where should we start?",
      intro: "A clear priority. Support that fits your team.",
      cards: [
        {
          label: "Cash",
          title: "Manage my cash flow",
          text: "Anticipate cash pressure, track collections and weigh the options.",
        },
        {
          label: "Financing",
          title: "Prepare a fundraising round",
          text: "Build a defensible business plan and prepare investor discussions.",
        },
        {
          label: "Reporting",
          title: "Make my reporting reliable",
          text: "Reconcile the numbers, understand margins and review monthly performance.",
        },
      ],
    },
    services: {
      eyebrow: "Our finance services",
      title: "A clear scope. Numbers you can use.",
      link: "Explore this service",
    },
    offer: {
      eyebrow: "The right format",
      title: "Finance leadership. At the right pace.",
      text: "You need an experienced finance decision-maker without opening a full-time role straight away. We agree on priorities, deliverables and a rhythm that fits the workload.",
      anchor: "Fractional CFO",
      link: "Explore our",
      related: "Explore our formats and expertise",
    },
    rh: {
      eyebrow: "Part-time HR director",
      title: "Growing teams. An organisation that keeps up.",
      text: "Recruitment, onboarding, organisation, payroll coordination and compliance: a senior HR director supports you for a few days a month within an agreed scope.",
      role: "Human Capital Partner",
    },
    method: {
      eyebrow: "From the first conversation to a steady rhythm",
      title: "One method. Four steps.",
      steps: [
        {
          title: "Discuss",
          text: "Your situation, urgent issues and upcoming decisions.",
        },
        {
          title: "Define",
          text: "Scope, lead contact, cadence and first deliverables.",
        },
        {
          title: "Establish the basics",
          text: "Data, tools and assumptions: a shared foundation.",
        },
        {
          title: "Manage",
          text: "A working rhythm and regular decision points.",
        },
      ],
    },
    why: {
      eyebrow: "Why Iter",
      title: "One dedicated contact. Shared expertise.",
      items: [
        {
          title: "Part of your team",
          text: "A person who knows your operations, numbers and leadership constraints.",
        },
        {
          title: "Backed by the team",
          text: "Complementary skills, partner review according to the plan and agreed handover arrangements.",
        },
        {
          title: "Across France and Spain",
          text: "Teams in Paris and Barcelona working with your local partners.",
        },
      ],
    },
    team: {
      eyebrow: "The firm",
      title: "People. Before spreadsheets.",
      link: "Meet the whole team",
    },
    reviews: {
      eyebrow: "Their experience in their words",
      title: "Our clients’ perspective.",
      source: "Read the reviews on Trustfolio",
      translated: "Translated from French",
      bodies: [
        "After five years of working together, Iter remains a strategic asset, combining multidisciplinary expertise with a long-term perspective.",
        "Iter’s teams structured our finance function with diligence, availability and efficiency, even exceeding our initial expectations.",
      ],
    },
    moments: {
      eyebrow: "When to call us",
      title: "When the scale of the challenge changes.",
      items: [
        "You are preparing financing.",
        "Growth is putting pressure on cash.",
        "Reporting arrives too late.",
        "A departure calls for interim finance leadership.",
        "You are expanding into France or Spain.",
      ],
    },
    faq: {
      eyebrow: "About Iter",
      title: "Before we meet.",
      questions: [
        "Where do you work?",
        "When can an engagement start?",
        "How does an engagement work?",
        "Can you work with our tools?",
        "Can you also support HR?",
        "Can you help us prepare financing?",
      ],
      answers: [
        "",
        "",
        "We define priorities, appoint your lead contact and agree on a working rhythm and deliverables. Arrangements are reviewed with you as needs change.",
        "We review your existing organisation before recommending changes. Tools support reliable data and finance management.",
        "Yes. Part-time HR director support is led by Borith Biv, with a separate scope from finance support.",
        "We prepare the financial model, assumptions and information needed for discussions with funders. Scope is agreed with you; securing financing also depends on the business and investors.",
      ],
      link: "Learn about the Fractional CFO service",
    },
    final: {
      eyebrow: "Let’s discuss your priorities",
      title: "A conversation. A first direction.",
      text: "Tell Sébastien Doat about your situation. Together, we will assess whether Iter fits your needs.",
      role: "Founding partner · CFO",
    },
  },
  es: {
    meta: {
      title: "Iter Advisors: CFO externo y RR. HH. | París, Barcelona",
      description:
        "Un CFO sénior para dirigir sus finanzas. Equipos de finanzas y RR. HH. en París y Barcelona, 85 empresas acompañadas. Conozca servicios y honorarios.",
    },
    eyebrow: "Consultoría de finanzas y RR. HH. · París / Barcelona",
    headline: ["Un ", "CFO sénior", " para dirigir sus finanzas."],
    subtitle:
      "Tesorería, presupuestos, reporting y financiación: un director financiero integrado en su equipo unos días al mes. Para pymes y startups en Francia y España.",
    contact: "Hablar con un CFO",
    fees: "Ver honorarios",
    month: "€ / mes sin IVA",
    notice: "Preaviso de",
    days: "días",
    noMinimum: "Sin permanencia mínima.",
    companies: "empresas acompañadas",
    raised: "captados por nuestros clientes",
    rating: "en Trustfolio",
    logoLabel: "A su lado en las decisiones importantes",
    sheet: {
      badge: "Datos ficticios",
      title: "Anticipar. Decidir a tiempo.",
      intro: "Ejemplo de previsión · 13 semanas",
      kpis: ["Caja en S13", "Runway estimado", "Caja mínima · S7"],
      runway: "6 meses",
      axis: "Tesorería (miles de €)",
      week: "S",
      threshold: "Umbral ilustrativo: 50.000 €",
      rhythm: "Horizonte semanal",
      process: "Hipótesis → escenarios → decisiones",
      description:
        "Ejemplo ficticio de tesorería: 130.000 € en la semana 1, un mínimo de 61.000 € en la semana 7 y 184.000 € en la semana 13. El runway de seis meses es una hipótesis ilustrativa independiente de la previsión.",
    },
    rhSignal: "También sus retos de personas.",
    rhSignalText:
      "Borith Biv dirige nuestros servicios de RR. HH. a tiempo parcial.",
    rhLink: "Descubrir el apoyo de RR. HH.",
    needs: {
      eyebrow: "Su próxima decisión",
      title: "¿Por dónde empezamos?",
      intro: "Una prioridad clara. Un apoyo adaptado a su equipo.",
      cards: [
        {
          label: "Tesorería",
          title: "Gestionar mi tesorería",
          text: "Anticipar tensiones, seguir los cobros y valorar las opciones.",
        },
        {
          label: "Financiación",
          title: "Preparar una ronda de financiación",
          text: "Construir un plan de negocio defendible y preparar conversaciones con inversores.",
        },
        {
          label: "Reporting",
          title: "Fiabilizar mi reporting",
          text: "Conciliar los datos, comprender los márgenes y revisar el rendimiento mensual.",
        },
      ],
    },
    services: {
      eyebrow: "Nuestros servicios financieros",
      title: "Un alcance preciso. Cifras utilizables.",
      link: "Conocer este servicio",
    },
    offer: {
      eyebrow: "El formato adecuado",
      title: "La función financiera. Al ritmo adecuado.",
      text: "Necesita un responsable financiero experimentado sin abrir inmediatamente un puesto a jornada completa. Definimos las prioridades, los entregables y un ritmo adaptado al volumen de trabajo.",
      anchor: "CFO externo",
      link: "Conocer el servicio de",
      related: "Explorar formatos y especialidades",
    },
    rh: {
      eyebrow: "Dirección de RR. HH. a tiempo parcial",
      title: "Equipos que crecen. Una organización que acompaña.",
      text: "Selección, incorporación, organización, coordinación de nóminas y cumplimiento: un director de RR. HH. sénior le acompaña unos días al mes, con un alcance definido.",
      role: "Socio de Capital Humano",
    },
    method: {
      eyebrow: "De la primera conversación al ritmo de trabajo",
      title: "Un método. Cuatro etapas.",
      steps: [
        {
          title: "Conversar",
          text: "Su situación, sus urgencias y las decisiones que preparar.",
        },
        {
          title: "Definir",
          text: "Alcance, interlocutor, ritmo y primeros entregables.",
        },
        {
          title: "Establecer la base",
          text: "Datos, herramientas e hipótesis: una base común.",
        },
        {
          title: "Dirigir",
          text: "Un ritmo de trabajo y puntos de decisión regulares.",
        },
      ],
    },
    why: {
      eyebrow: "Por qué Iter",
      title: "Un interlocutor dedicado. Experiencia compartida.",
      items: [
        {
          title: "Integrado en su equipo",
          text: "Una persona que conoce las operaciones, las cifras y las limitaciones del directivo.",
        },
        {
          title: "Respaldado por el equipo",
          text: "Competencias complementarias, revisión por un socio según el plan y condiciones de traspaso definidas.",
        },
        {
          title: "Entre Francia y España",
          text: "Equipos en París y Barcelona que trabajan con sus colaboradores locales.",
        },
      ],
    },
    team: {
      eyebrow: "La firma",
      title: "Personas. Antes que hojas de cálculo.",
      link: "Conocer a todo el equipo",
    },
    reviews: {
      eyebrow: "Su experiencia de acompañamiento",
      title: "La perspectiva de nuestros clientes.",
      source: "Leer las opiniones en Trustfolio",
      translated: "Traducido del francés",
      bodies: [
        "Tras cinco años de colaboración, Iter sigue siendo un activo estratégico que aporta experiencia multidisciplinar y visión a largo plazo.",
        "Los equipos de Iter estructuraron nuestra función financiera con rigor, disponibilidad y eficiencia, superando incluso nuestras expectativas iniciales.",
      ],
    },
    moments: {
      eyebrow: "Cuándo llamarnos",
      title: "Cuando cambia la escala de los retos.",
      items: [
        "Está preparando financiación.",
        "El crecimiento pone presión sobre la tesorería.",
        "El reporting llega demasiado tarde.",
        "Una salida requiere un relevo financiero.",
        "Se está expandiendo en Francia o España.",
      ],
    },
    faq: {
      eyebrow: "Sobre Iter",
      title: "Antes de conocernos.",
      questions: [
        "¿Dónde trabajan?",
        "¿Cuándo puede empezar una misión?",
        "¿Cómo funciona el acompañamiento?",
        "¿Pueden trabajar con nuestras herramientas?",
        "¿También pueden apoyar los RR. HH.?",
        "¿Pueden ayudarnos a preparar financiación?",
      ],
      answers: [
        "",
        "",
        "Definimos las prioridades, designamos su interlocutor y acordamos un ritmo de trabajo y entregables. Revisamos las condiciones con usted cuando cambian las necesidades.",
        "Revisamos su organización actual antes de recomendar cambios. Las herramientas sirven para fiabilizar los datos y dirigir la función financiera.",
        "Sí. Borith Biv dirige el apoyo de RR. HH. a tiempo parcial, con un alcance distinto del acompañamiento financiero.",
        "Preparamos el modelo financiero, las hipótesis y la información necesaria para conversar con los financiadores. El alcance se acuerda con usted; conseguir financiación también depende de la empresa y los inversores.",
      ],
      link: "Conocer el servicio de CFO externo",
    },
    final: {
      eyebrow: "Hablemos de sus prioridades",
      title: "Una conversación. Un primer rumbo.",
      text: "Presente su situación a Sébastien Doat. Veremos juntos si Iter se adapta a sus necesidades.",
      role: "Socio fundador · CFO",
    },
  },
};

export function getHomePilotage(locale: Locale) {
  const t = copy[locale];
  const facts = getDafOfferFacts(locale);
  const format = new Intl.NumberFormat(locale);
  const min = format.format(Math.min(...FORMULES.map((f) => f.prixMin)));
  const max = format.format(Math.max(...FORMULES.map((f) => f.prixMax)));
  const reviews = [TRUSTFOLIO_REVIEWS[4], TRUSTFOLIO_REVIEWS[1]].map(
    (review, i) => ({
      ...review,
      body: t.reviews.bodies[i] || review.reviewBody,
    }),
  );
  return {
    ...t,
    price: `${min} ${locale === "en" ? "to" : locale === "es" ? "a" : "à"} ${max} ${t.month}`,
    engagement: `${t.notice} ${ENGAGEMENT.preavisJours} ${t.days}`,
    priceDetail: facts.price,
    start: facts.start,
    proofs: [
      { value: String(CLIENTS_ACCOMPAGNES), label: t.companies },
      {
        value:
          locale === "en" ? `€${FONDS_LEVES.replace(" M€", "M")}` : FONDS_LEVES,
        label: t.raised,
      },
      { value: `${TRUSTFOLIO_RATING}/5`, label: t.rating },
    ],
    faqItems: t.faq.questions.map((q, i) => ({
      q,
      a: i === 0 ? facts.geography : i === 1 ? facts.start : t.faq.answers[i],
    })),
    reviewItems: reviews,
  };
}
