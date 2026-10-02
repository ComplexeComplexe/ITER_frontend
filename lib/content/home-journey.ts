import type { Locale } from "@/lib/i18n";

// Short interface copy only: safe to use in the homepage's client component.
const journeys = {
  fr: {
    title: "Votre direction financière externalisée, du cash au reporting",
    subtitle: "Un DAF senior à temps partagé pour piloter votre trésorerie, fiabiliser le reporting et préparer vos financements. Pour les PME et startups, avec des équipes à Paris et Barcelone.",
    contact: "Échanger sur mon besoin finance", offer: "Direction financière externalisée",
    hrLabel: "Offre DRH", hrTitle: "Direction RH à temps partagé", hrText: "Recrutement, organisation, management : un accompagnement RH pour vos équipes.", hrCta: "Découvrir l’offre DRH",
    reviews: " · Avis sur le cabinet", choice: "Choisir un accompagnement",
    choices: [
      { title: "Un DAF pour mon entreprise", text: "Missions, équipe et honoraires", href: "/daf-externalise" },
      { title: "Fiabiliser trésorerie et reporting", text: "Indicateurs, marges et décisions", href: "/services/controle-de-gestion-externalise" },
      { title: "Automatiser ma finance", text: "Guides IA, exercices et méthode", href: "/ressources/ia-finance" },
    ],
    servicesTitle: "Des services pour piloter votre finance", servicesText: "Trésorerie, reporting, financements : choisissez le sujet sur lequel avancer avec votre direction financière.",
    cluster: ["Tarifs du DAF externalisé", "DAF à temps partagé", "DAF de transition", "Comptabilité externalisée", "Métier de DAF", "Fiscalité France-Espagne"],
    hr: { eyebrow: "Direction des ressources humaines", title: "Une direction RH à temps partagé pour structurer vos équipes", paragraphs: [
      "Vos recrutements s’accélèrent, les managers manquent de repères ou les sujets RH reposent sur le dirigeant ? Iter vous accompagne pour organiser la fonction RH et faire avancer vos priorités, avec un périmètre et un rythme d’intervention définis ensemble.",
      "Pour les PME et startups qui ont besoin d’une direction RH sans recruter à temps plein : recrutement et intégration, organisation des équipes, pratiques managériales ou coordination de la paie et des partenaires RH.",
      "Le DAF éclaire le budget et la masse salariale ; le DRH accompagne l’organisation et les équipes. Vous pouvez faire appel à l’une ou l’autre expertise selon votre besoin.",
    ], cta: "Découvrir notre accompagnement DRH", shared: "Comment fonctionne le temps partagé ?", nav: "Services RH", links: ["Recrutement et intégration", "Paie et coordination", "Formation et développement", "Conformité et relations sociales"] },
    resources: { eyebrow: "Ressources", title: "Des ressources pour vos prochaines décisions", intro: "Choisir un DAF, anticiper le cash ou fiabiliser le reporting : commencez par votre besoin.", all: "Toutes nos ressources", hr: "Également : quand structurer votre fonction RH ?", cards: [
      { label: "Choisir son DAF", title: "DAF salarié ou externalisé : comment décider ?", text: "Comparez les responsabilités, la disponibilité et le budget sur un même périmètre.", detail: "Comparatif et critères de décision" },
      { label: "Anticiper le cash", title: "BFR : les leviers pour mieux piloter la trésorerie", text: "Identifiez le rôle des stocks, des délais clients et des échéances fournisseurs.", detail: "Guide pratique" },
      { label: "Automatiser la finance", title: "Reporting financier : méthode, contrôles et ROI", text: "Testez un exercice fictif corrigé et estimez le gain net selon vos hypothèses.", detail: "Kit corrigé et calculateur" },
    ] },
  },
  en: {
    title: "Your Fractional CFO, from cash flow to reporting",
    subtitle: "A senior part-time CFO to manage your cash flow, improve reporting reliability and prepare financing. For SMEs and startups, with teams in Paris and Barcelona.",
    contact: "Discuss my finance needs", offer: "Fractional CFO services",
    hrLabel: "HR director services", hrTitle: "Part-time HR leadership", hrText: "Recruitment, organisation and management: HR support for your teams.", hrCta: "Explore our HR services",
    reviews: " · Reviews of the firm", choice: "Choose your support",
    choices: [
      { title: "A CFO for my business", text: "Responsibilities, team and fees", href: "/daf-externalise" },
      { title: "Reliable cash flow and reporting", text: "Indicators, margins and decisions", href: "/services/controle-de-gestion-externalise" },
      { title: "Automate my finance processes", text: "AI guides, exercises and methods", href: "/ressources/ia-finance" },
    ],
    servicesTitle: "Services to manage your finance function", servicesText: "Cash flow, reporting or financing: choose the priority to address with your finance leadership.",
    cluster: ["Fractional CFO fees", "Part-time CFO", "Interim CFO", "Accounting coordination", "The CFO role", "France-Spain taxation"],
    hr: { eyebrow: "Human resources leadership", title: "Part-time HR leadership to organise your teams", paragraphs: [
      "Is recruitment accelerating, do managers need guidance, or does the founder handle all HR matters? Iter helps you organise your HR function and address your priorities, with a scope and schedule agreed together.",
      "For SMEs and startups that need HR leadership without a full-time hire: recruitment and onboarding, team organisation, management practices, or coordination of payroll and HR partners.",
      "The CFO informs budget and payroll decisions; the HR director supports the organisation and its people. You can call on either expertise according to your needs.",
    ], cta: "Explore our HR director support", shared: "How does part-time support work?", nav: "HR services", links: ["Recruitment and onboarding", "Payroll coordination", "Training and development", "Compliance and employee relations"] },
    resources: { eyebrow: "Resources", title: "Resources for your next decisions", intro: "Choose a CFO, anticipate cash needs or improve reporting reliability: start with your priority.", all: "All our resources", hr: "Also: when should you organise your HR function?", cards: [
      { label: "Choose your CFO", title: "In-house or Fractional CFO: how to decide?", text: "Compare responsibilities, availability and budget for the same scope of work.", detail: "Comparison and decision criteria" },
      { label: "Anticipate cash needs", title: "Working capital: practical cash flow levers", text: "Understand the impact of inventory, customer payment terms and supplier deadlines.", detail: "Practical guide" },
      { label: "Automate finance", title: "Financial reporting: methods, controls and ROI", text: "Try a worked fictional exercise and estimate net benefits using your own assumptions.", detail: "Worked exercise and calculator" },
    ] },
  },
  es: {
    title: "Su CFO externo, de la tesorería al reporting",
    subtitle: "Un director financiero sénior a tiempo parcial para gestionar su tesorería, mejorar la fiabilidad del reporting y preparar la financiación. Para pymes y startups, con equipos en París y Barcelona.",
    contact: "Hablar de mis necesidades financieras", offer: "Dirección financiera externa",
    hrLabel: "Servicios de dirección de RR. HH.", hrTitle: "Dirección de RR. HH. a tiempo parcial", hrText: "Selección, organización y gestión: apoyo de recursos humanos para sus equipos.", hrCta: "Descubrir nuestros servicios de RR. HH.",
    reviews: " · Opiniones sobre la firma", choice: "Elegir un acompañamiento",
    choices: [
      { title: "Un CFO para mi empresa", text: "Funciones, equipo y honorarios", href: "/daf-externalise" },
      { title: "Tesorería y reporting fiables", text: "Indicadores, márgenes y decisiones", href: "/services/controle-de-gestion-externalise" },
      { title: "Automatizar mis procesos financieros", text: "Guías de IA, ejercicios y método", href: "/ressources/ia-finance" },
    ],
    servicesTitle: "Servicios para dirigir su función financiera", servicesText: "Tesorería, reporting o financiación: elija la prioridad que desea abordar con su dirección financiera.",
    cluster: ["Honorarios del CFO externo", "CFO a tiempo parcial", "CFO de transición", "Coordinación contable", "Funciones del CFO", "Fiscalidad Francia-España"],
    hr: { eyebrow: "Dirección de recursos humanos", title: "Una dirección de RR. HH. a tiempo parcial para organizar sus equipos", paragraphs: [
      "¿Aumentan las contrataciones, necesitan orientación los responsables o recaen los asuntos de RR. HH. en el director? Iter le ayuda a organizar la función de recursos humanos y avanzar en sus prioridades, con un alcance y un ritmo de intervención acordados conjuntamente.",
      "Para pymes y startups que necesitan dirección de RR. HH. sin contratar a tiempo completo: selección e incorporación, organización de equipos, prácticas de gestión o coordinación de nóminas y proveedores de recursos humanos.",
      "El CFO aporta información sobre el presupuesto y los costes de personal; el director de RR. HH. acompaña a la organización y a sus equipos. Puede recurrir a una u otra especialidad según sus necesidades.",
    ], cta: "Descubrir nuestro acompañamiento de RR. HH.", shared: "¿Cómo funciona el apoyo a tiempo parcial?", nav: "Servicios de RR. HH.", links: ["Selección e incorporación", "Nóminas y coordinación", "Formación y desarrollo", "Cumplimiento y relaciones laborales"] },
    resources: { eyebrow: "Recursos", title: "Recursos para sus próximas decisiones", intro: "Elegir un CFO, anticipar necesidades de tesorería o mejorar el reporting: empiece por su prioridad.", all: "Todos nuestros recursos", hr: "También: ¿cuándo organizar su función de RR. HH.?", cards: [
      { label: "Elegir su CFO", title: "CFO interno o externo: ¿cómo decidir?", text: "Compare responsabilidades, disponibilidad y presupuesto para un mismo alcance.", detail: "Comparativa y criterios de decisión" },
      { label: "Anticipar la tesorería", title: "Capital circulante: palancas para gestionar la tesorería", text: "Identifique el efecto de las existencias, los plazos de cobro y los vencimientos de proveedores.", detail: "Guía práctica" },
      { label: "Automatizar las finanzas", title: "Reporting financiero: método, controles y ROI", text: "Pruebe un ejercicio ficticio resuelto y estime el beneficio neto según sus hipótesis.", detail: "Ejercicio resuelto y calculadora" },
    ] },
  },
};

export const HOME_CLUSTER_PATHS = ["/daf-externalise/tarifs", "/daf-externalise/temps-partage", "/daf-externalise/transition", "/services/comptabilite-externalisation", "/daf-externalise/metier", "/ressources/fiscalite-espagne-france"];
export const HOME_HR_PATHS = ["/services/recrutement-talent-acquisition", "/services/gestion-paie-charges-sociales", "/services/formation-developpement", "/services/conformite-droit-travail"];
export const HOME_RESOURCE_PATHS = ["/ressources/blog/daf-externalise-vs-daf-salarie", "/ressources/blog/reduire-bfr-7-leviers-actionnables", "/ressources/ia-finance/automatiser-reporting-financier"];
export const getHomeJourney = (locale: Locale) => journeys[locale];
