import { Locale } from "../i18n";

export interface ResourceCard {
  title: string;
  href: string;
  image: string;
  tag?: string;
}

export interface ResourceCategory {
  heading: string;
  seeAllLabel: string;
  seeAllHref: string;
  cards: ResourceCard[];
}

export interface ResourcesContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  categories: ResourceCategory[];
  discover: string;
}

export const resourcesContent: Record<Locale, ResourcesContent> = {
  fr: {
    meta: {
      title: "Ressources | Iter Advisors",
      description:
        "Retrouvez toutes nos ressources : cas clients, articles de blog, fiches métiers et glossaire. Expertise financière par Iter Advisors.",
    },
    breadcrumbLabel: "Ressources",
    h1: "Ressources",
    intro:
      "Retrouvez tous les contenus réalisés par nos CFOs : articles, fiches thématiques, témoignages, modèles à télécharger et bien plus encore. Notre objectif : vous apporter les clés pour piloter votre croissance financière.",
    categories: [
      {
        heading: "Cas clients",
        seeAllLabel: "Voir tous nos cas clients",
        seeAllHref: "/ressources/testimonials",
        cards: [
          {
            title: "Happy Scribe : structuration financière d'une scale-up",
            href: "/ressources/testimonials",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Cas client",
          },
          {
            title: "Ukio : accompagnement à la levée de fonds Série A",
            href: "/ressources/testimonials",
            image: "/images/logos/logo-ukio.webp",
            tag: "Cas client",
          },
          {
            title: "Surfe : mise en place du reporting et pilotage",
            href: "/ressources/testimonials",
            image: "/images/logos/logo-surfe.webp",
            tag: "Cas client",
          },
          {
            title: "Yego : optimisation de la gestion de trésorerie",
            href: "/ressources/testimonials",
            image: "/images/logos/logo-yego.webp",
            tag: "Cas client",
          },
        ],
      },
      {
        heading: "Actualités",
        seeAllLabel: "Voir tous nos articles",
        seeAllHref: "/ressources/blog",
        cards: [
          {
            title: "Les 10 outils pour les CFOs en start-up",
            href: "/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
            image: "/images/blog/les-10-outils-cfos.jpg",
            tag: "Blog",
          },
          {
            title: "Flux de trésorerie : définition et importance pour les entreprises",
            href: "/ressources/blog/flux-de-tresorerie",
            image: "/images/blog/flux-de-tresorerie.jpg",
            tag: "Blog",
          },
          {
            title: "La modernisation du rôle de CFO",
            href: "/ressources/blog/la-modernisation-du-role-de-cfo",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
          {
            title: "Comment structurer sa direction financière ?",
            href: "/ressources/blog",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Fiches métiers",
        seeAllLabel: "Voir toutes nos fiches métiers",
        seeAllHref: "/ressources/fiche-metier",
        cards: [
          {
            title: "Fiche métier : Directeur Administratif et Financier",
            href: "/ressources/fiche-metier",
            image: "/images/logos/logo-hero.webp",
            tag: "Fiche métier",
          },
        ],
      },
    ],
    discover: "Découvrir",
  },
  en: {
    meta: {
      title: "Resources | Iter Advisors",
      description:
        "Browse all our resources: case studies, blog articles, job descriptions and glossary. Financial expertise by Iter Advisors.",
    },
    breadcrumbLabel: "Resources",
    h1: "Resources",
    intro:
      "Browse all the content created by our CFOs: articles, thematic sheets, testimonials, downloadable templates and more. Our goal: to give you the keys to manage your financial growth.",
    categories: [
      {
        heading: "Case studies",
        seeAllLabel: "See all case studies",
        seeAllHref: "/en/ressources/testimonials",
        cards: [
          {
            title: "Happy Scribe: financial structuring of a scale-up",
            href: "/en/ressources/testimonials",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Case study",
          },
          {
            title: "Ukio: Series A fundraising support",
            href: "/en/ressources/testimonials",
            image: "/images/logos/logo-ukio.webp",
            tag: "Case study",
          },
          {
            title: "Surfe: reporting setup and performance management",
            href: "/en/ressources/testimonials",
            image: "/images/logos/logo-surfe.webp",
            tag: "Case study",
          },
          {
            title: "Yego: cash management optimization",
            href: "/en/ressources/testimonials",
            image: "/images/logos/logo-yego.webp",
            tag: "Case study",
          },
        ],
      },
      {
        heading: "Blog",
        seeAllLabel: "See all articles",
        seeAllHref: "/en/ressources/blog",
        cards: [
          {
            title: "AI and automation of repetitive tasks in the Finance department",
            href: "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
            image: "/images/blog/ia-automatisation.jpg",
            tag: "Blog",
          },
          {
            title: "Organizing your finance department",
            href: "/en/ressources/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Essential financial tech tools",
            href: "/en/ressources/blog/essentiels-outils-tech-finance",
            image: "/images/blog/outils-tech-finance.jpg",
            tag: "Blog",
          },
          {
            title: "How to structure your financial department",
            href: "/en/ressources/blog",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Job descriptions",
        seeAllLabel: "See all job descriptions",
        seeAllHref: "/en/ressources/fiche-metier",
        cards: [
          {
            title: "Job description: Chief Financial Officer",
            href: "/en/ressources/fiche-metier",
            image: "/images/logos/logo-hero.webp",
            tag: "Job description",
          },
        ],
      },
    ],
    discover: "Discover",
  },
  es: {
    meta: {
      title: "Recursos | Iter Advisors",
      description:
        "Consulte todos nuestros recursos: casos prácticos, artículos de blog, perfiles profesionales y glosario. Experiencia financiera de Iter Advisors.",
    },
    breadcrumbLabel: "Recursos",
    h1: "Recursos",
    intro:
      "Consulte todos los contenidos creados por nuestros CFOs: artículos, fichas temáticas, testimonios, plantillas descargables y mucho más. Nuestro objetivo: darle las claves para gestionar su crecimiento financiero.",
    categories: [
      {
        heading: "Casos prácticos",
        seeAllLabel: "Ver todos los casos prácticos",
        seeAllHref: "/es/ressources/testimonials",
        cards: [
          {
            title: "Happy Scribe: estructuración financiera de una scale-up",
            href: "/es/ressources/testimonials",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Ukio: acompañamiento en la ronda de financiación Serie A",
            href: "/es/ressources/testimonials",
            image: "/images/logos/logo-ukio.webp",
            tag: "Caso práctico",
          },
          {
            title: "Surfe: implantación del reporting y seguimiento",
            href: "/es/ressources/testimonials",
            image: "/images/logos/logo-surfe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Yego: optimización de la gestión de tesorería",
            href: "/es/ressources/testimonials",
            image: "/images/logos/logo-yego.webp",
            tag: "Caso práctico",
          },
        ],
      },
      {
        heading: "Blog",
        seeAllLabel: "Ver todos los artículos",
        seeAllHref: "/es/ressources/blog",
        cards: [
          {
            title: "IA y automatización de tareas repetitivas en el departamento de Finanzas",
            href: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
            image: "/images/blog/ia-automatisation.jpg",
            tag: "Blog",
          },
          {
            title: "Organizar su departamento financiero",
            href: "/es/ressources/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Las herramientas tecnológicas esenciales para las finanzas",
            href: "/es/ressources/blog/essentiels-outils-tech-finance",
            image: "/images/blog/outils-tech-finance.jpg",
            tag: "Blog",
          },
          {
            title: "Cómo estructurar su departamento financiero",
            href: "/es/ressources/blog",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Perfiles profesionales",
        seeAllLabel: "Ver todos los perfiles profesionales",
        seeAllHref: "/es/ressources/fiche-metier",
        cards: [
          {
            title: "Perfil profesional: Director Financiero",
            href: "/es/ressources/fiche-metier",
            image: "/images/logos/logo-hero.webp",
            tag: "Perfil profesional",
          },
        ],
      },
    ],
    discover: "Descubra",
  },
};

export function getResourcesContent(locale: Locale) {
  return resourcesContent[locale];
}
