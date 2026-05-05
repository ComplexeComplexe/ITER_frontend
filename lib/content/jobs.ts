import { Locale } from "../i18n";

export interface JobListing {
  title: string;
  href: string;
}

export interface JobsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
  };
  intro: string;
  about: {
    heading: string;
    paragraph: string;
  };
  jobs: JobListing[];
  discoverLabel: string;
}

const jobsFr: JobsContent = {
  meta: {
    title: "Jobs | Iter Advisors",
    description:
      "Rejoignez Iter Advisors ! D\u00e9couvrez nos offres d\u2019emploi en finance : CFO, analyste, manager et marketing.",
  },
  hero: {
    h1: "Iter Advisors recrute",
  },
  intro:
    "Vous souhaitez \u00eatre en charge de la gestion financi\u00e8re de plusieurs entreprises, accompagner des entrepreneurs talentueux dans un cadre pluridisciplinaire\u00a0? Rejoignez-nous\u00a0!",
  about: {
    heading: "\u00c0 propos de nous",
    paragraph:
      "Iter Advisors est une soci\u00e9t\u00e9 de conseil financier en pleine croissance. Nous rejoindre, c\u2019est int\u00e9grer un environnement international et multiculturel avec l\u2019opportunit\u00e9 de partager l\u2019aventure du lancement d\u2019une start-up avec nous.",
  },
  jobs: [
    { title: "Fractional CFO pour startups", href: "/jobs/fractional-cfo-startups" },
    { title: "Responsable Marketing & Growth Strategy", href: "/jobs/marketing-growth-strategy" },
    { title: "Senior Finance Manager", href: "/jobs/senior-finance-manager" },
    { title: "Analyste financier junior", href: "/jobs/finance-analyst-junior-fr" },
  ],
  discoverLabel: "D\u00e9couvrir",
};

const jobsEn: JobsContent = {
  meta: {
    title: "Jobs | Iter Advisors",
    description:
      "Join Iter Advisors! Discover our finance job openings: CFO, analyst, manager and marketing.",
  },
  hero: {
    h1: "Iter Advisors is recruiting",
  },
  intro:
    "Would you like to be in charge of the financial management of several companies, supporting talented entrepreneurs in a multidisciplinary environment? Then join us!",
  about: {
    heading: "About us",
    paragraph:
      "Iter Advisors is a fast-growing financial advisory firm. Joining us means joining an international, multicultural environment, with the opportunity to share in the adventure of launching a start-up with us.",
  },
  jobs: [
    { title: "Fractional CFO for startups", href: "/en/jobs/fractional-cfo-startups" },
    { title: "Marketing & Growth Strategy Manager", href: "/en/jobs/marketing-growth-strategy" },
    { title: "Senior Finance Manager", href: "/en/jobs/senior-finance-manager" },
    { title: "Junior Financial Analyst", href: "/en/jobs/finance-analyst-junior-fr" },
  ],
  discoverLabel: "Discover",
};

const jobsEs: JobsContent = {
  meta: {
    title: "Jobs | Iter Advisors",
    description:
      "Unase a Iter Advisors. Descubra nuestras ofertas de empleo en finanzas: CFO, analista, manager y marketing.",
  },
  hero: {
    h1: "Iter Advisors est\u00e1 contratando",
  },
  intro:
    "\u00bfLe gustar\u00eda encargarse de la gesti\u00f3n financiera de varias empresas, apoyando a empresarios con talento en un entorno multidisciplinar? \u00a1\u00danase a nosotros!",
  about: {
    heading: "Sobre nosotros",
    paragraph:
      "Iter Advisors es una empresa de asesoramiento financiero en r\u00e1pido crecimiento. Unirse a nosotros significa integrarse en un entorno internacional y multicultural, con la oportunidad de compartir la aventura de lanzar una start-up con nosotros.",
  },
  jobs: [
    { title: "CFO Fraccionario para startups", href: "/es/jobs/fractional-cfo-startups" },
    { title: "Responsable de Marketing y Crecimiento", href: "/es/jobs/marketing-growth-strategy" },
    { title: "Senior Finance Manager", href: "/es/jobs/senior-finance-manager" },
    { title: "Analista Financiero Junior", href: "/es/jobs/finance-analyst-junior-fr" },
  ],
  discoverLabel: "Descubra",
};

export const jobsContent: Record<Locale, JobsContent> = {
  fr: jobsFr,
  en: jobsEn,
  es: jobsEs,
};

export function getJobsContent(locale: Locale): JobsContent {
  return jobsContent[locale];
}
