import { Locale } from "../i18n";

export type DrhSubPageSlug = "temps-partage";

export interface DrhSubContent {
  meta: {
    title: string;
    description: string;
  };
  parentLabel: string;
  parentHref: string;
  breadcrumbLabel: string;
  h1: string;
  sections: {
    heading?: string;
    content: string[];
  }[];
  ctaButton: string;
}

export const drhSubContent: Record<Locale, Record<DrhSubPageSlug, DrhSubContent>> = {
  fr: {
    "temps-partage": {
      meta: {
        title: "DRH à temps partagé | Direction RH flexible | Iter Advisors",
        description:
          "Le DRH à temps partagé : une solution flexible pour structurer et piloter votre fonction RH. Découvrez l'offre Iter Advisors.",
      },
      parentLabel: "DRH Externalisé",
      parentHref: "/drh-externalise",
      breadcrumbLabel: "DRH à temps partagé",
      h1: "Le DRH à temps partagé : une direction RH flexible et efficace",
      sections: [
        {
          content: [
            "Le DRH à temps partagé est un directeur des ressources humaines qui intervient de manière régulière au sein de votre entreprise, généralement quelques jours par semaine ou par mois. Cette formule offre un accès permanent à une expertise RH de haut niveau, tout en optimisant les coûts.",
            "Cette solution s'adresse particulièrement aux PME, startups et scale-ups qui ont besoin d'une fonction RH structurée mais dont l'activité ne justifie pas encore un recrutement à temps plein.",
          ],
        },
        {
          heading: "Comment fonctionne le DRH à temps partagé ?",
          content: [
            "Le DRH à temps partagé s'intègre dans votre organisation comme un membre à part entière de votre équipe de direction. Il participe à la définition de la stratégie RH, travaille avec les managers sur le recrutement et le développement des talents, et assure un suivi régulier de la conformité et des relations sociales.",
            "La fréquence d'intervention est définie selon vos besoins : de 1 à 3 jours par semaine en général. Elle peut être ajustée à la hausse lors de périodes intenses (recrutements massifs, restructuration, déploiement SIRH) ou à la baisse en phase de croisière.",
          ],
        },
        {
          heading: "Les avantages du temps partagé",
          content: [
            "Le premier avantage est économique : le coût d'un DRH à temps partagé représente une fraction du coût d'un DRH en CDI, tout en apportant le même niveau d'expertise. Vous bénéficiez d'un regard externe et d'une expérience multisectorielle.",
            "La continuité est un autre atout majeur : le DRH à temps partagé suit votre entreprise dans la durée et développe une connaissance approfondie de votre culture et de vos enjeux. Enfin, la flexibilité vous permet d'ajuster le volume d'intervention en fonction de la croissance de votre activité.",
          ],
        },
        {
          heading: "L'approche Iter Advisors",
          content: [
            "Chez Iter Advisors, chaque mission DRH débute par un diagnostic de votre situation RH (contrats, paie, conformité, organisation). Nous définissons ensemble un plan d'action priorisé et une formule d'accompagnement adaptée à votre maturité et à votre budget.",
            "Notre présence à Barcelone, Paris et Toulouse nous permet d'intervenir auprès d'entreprises françaises et internationales. Contactez-nous pour discuter de vos besoins RH.",
          ],
        },
      ],
      ctaButton: "Prendre rendez-vous",
    },
  },
  en: {
    "temps-partage": {
      meta: {
        title: "Shared-time HR Director | Flexible HR | Iter Advisors",
        description:
          "The shared-time HR director: a flexible solution to structure and lead your HR function. Discover Iter Advisors' offering.",
      },
      parentLabel: "HR Outsourced",
      parentHref: "/en/hr-outsourcing",
      breadcrumbLabel: "Shared-time HR",
      h1: "The shared-time HR director: flexible, effective people leadership",
      sections: [
        {
          content: [
            "The shared-time HR director is a Chief People Officer who works regularly within your company, typically a few days per week or per month. This format provides ongoing access to high-level HR expertise while optimizing costs.",
            "This solution is particularly suited to SMEs, startups and scale-ups that need a structured HR function but whose activity does not yet justify a full-time hire.",
          ],
        },
        {
          heading: "How does shared-time HR work?",
          content: [
            "The shared-time HR director integrates into your organization as a full member of your leadership team. They contribute to HR strategy, work with managers on recruitment and talent development, and ensure ongoing follow-up on compliance and employee relations.",
            "The frequency of intervention is defined according to your needs: typically 1 to 3 days per week. It can be increased during intense periods (mass recruitment, restructuring, HRIS rollout) or reduced during steady-state phases.",
          ],
        },
        {
          heading: "Benefits of shared-time HR",
          content: [
            "The first benefit is cost: a shared-time HR director costs a fraction of a full-time equivalent while delivering the same level of expertise. You get an external perspective and cross-sector experience.",
            "Continuity is another major advantage: the shared-time HR director works with your company over time and develops a deep understanding of your culture and challenges. Finally, flexibility allows you to adjust the volume of intervention as your activity grows.",
          ],
        },
        {
          heading: "The Iter Advisors approach",
          content: [
            "At Iter Advisors, each HR engagement starts with a diagnosis of your HR situation (contracts, payroll, compliance, organization). We define a prioritized action plan and a support format tailored to your maturity and budget.",
            "Our presence in Barcelona, Paris and Toulouse allows us to work with French and international companies. Contact us to discuss your HR needs.",
          ],
        },
      ],
      ctaButton: "Make an appointment",
    },
  },
  es: {
    "temps-partage": {
      meta: {
        title: "RRHH a tiempo compartido | Dirección RH | Iter Advisors",
        description:
          "El director de RRHH a tiempo compartido: una solución flexible para estructurar y pilotar su función de personas. Descubra la oferta de Iter Advisors.",
      },
      parentLabel: "RRHH externalizado",
      parentHref: "/es/externalizacion-rrhh",
      breadcrumbLabel: "RRHH a tiempo compartido",
      h1: "El director de RRHH a tiempo compartido: dirección de personas flexible y eficaz",
      sections: [
        {
          content: [
            "El director de RRHH a tiempo compartido es un director de recursos humanos que interviene de forma regular en su empresa, generalmente unos días por semana o al mes. Esta fórmula ofrece un acceso permanente a una experiencia RRHH de alto nivel, optimizando costes.",
            "Esta solución se dirige especialmente a pymes, startups y scale-ups que necesitan una función RRHH estructurada pero cuya actividad no justifica aún una contratación a tiempo completo.",
          ],
        },
        {
          heading: "¿Cómo funciona el RRHH a tiempo compartido?",
          content: [
            "El director de RRHH a tiempo compartido se integra en su organización como un miembro más de su equipo directivo. Participa en la definición de la estrategia de personas, trabaja con los managers en reclutamiento y desarrollo del talento, y asegura un seguimiento regular de la conformidad y las relaciones laborales.",
            "La frecuencia de intervención se define según sus necesidades: por lo general de 1 a 3 días por semana. Puede aumentarse en periodos intensos (reclutamientos masivos, reestructuración, despliegue SIRH) o reducirse en fase de crucero.",
          ],
        },
        {
          heading: "Ventajas del tiempo compartido",
          content: [
            "La primera ventaja es económica: el coste de un director de RRHH a tiempo compartido representa una fracción del coste de un director en plantilla, con el mismo nivel de experiencia. Se beneficia de una mirada externa y de experiencia multisectorial.",
            "La continuidad es otro activo importante: el director de RRHH a tiempo compartido acompaña a su empresa en el tiempo y desarrolla un conocimiento profundo de su cultura y sus retos. Por último, la flexibilidad permite ajustar el volumen de intervención en función del crecimiento de su actividad.",
          ],
        },
        {
          heading: "El enfoque Iter Advisors",
          content: [
            "En Iter Advisors, cada misión RRHH comienza con un diagnóstico de su situación de personas (contratos, nómina, conformidad, organización). Definimos juntos un plan de acción priorizado y una fórmula de acompañamiento adaptada a su madurez y presupuesto.",
            "Nuestra presencia en Barcelona, París y Toulouse nos permite intervenir en empresas francesas e internacionales. Contáctenos para hablar de sus necesidades de RRHH.",
          ],
        },
      ],
      ctaButton: "Concertar una cita",
    },
  },
};

const slugMapping: Record<Locale, Record<string, DrhSubPageSlug>> = {
  fr: {
    "temps-partage": "temps-partage",
  },
  en: {
    "shared-time": "temps-partage",
  },
  es: {
    "tiempo-compartido": "temps-partage",
  },
};

export function getDrhSubContent(locale: Locale, urlSlug: string): DrhSubContent | undefined {
  const key = slugMapping[locale]?.[urlSlug];
  if (!key) return undefined;
  return drhSubContent[locale][key];
}
