import type { Metadata } from "next";

export const presentationLocales = ["fr", "en", "es"] as const;
export type PresentationLocale = (typeof presentationLocales)[number];
export const presentationOffers = ["cfo-tech", "cfo-pme"] as const;
export type PresentationOffer = (typeof presentationOffers)[number];

export const presentationLabels = { fr: "Français", en: "English", es: "Español" };

export const presentationCopy = {
  fr: {
    back: "Toutes les présentations", language: "Langue de la présentation",
    download: "Télécharger la présentation", pages: "3 pages",
    preview: "Présentation", cover: "Couverture de la présentation",
    help: "Retrouvez notre offre, nos références et des exemples de missions dans ce document.",
  },
  en: {
    back: "All presentations", language: "Presentation language",
    download: "Download the presentation", pages: "3 pages",
    preview: "Presentation", cover: "Presentation cover",
    help: "Explore our services, references and examples of engagements in this document.",
  },
  es: {
    back: "Todas las presentaciones", language: "Idioma de la presentación",
    download: "Descargar la presentación", pages: "3 páginas",
    preview: "Presentación", cover: "Portada de la presentación",
    help: "Descubre nuestros servicios, referencias y ejemplos de misiones en este documento.",
  },
};

export const presentationCatalog = {
  "cfo-tech": {
    fr: { title: "CFO Tech", audience: "Startups et scale-ups", description: "Une direction financière pour structurer et accompagner la croissance des entreprises tech.", file: "iter-advisors-cfo-tech-fr.pdf", size: "2,3 Mo" },
    en: { title: "CFO Tech", audience: "Startups and scale-ups", description: "Financial leadership to structure and support the growth of tech companies.", file: "iter-advisors-cfo-tech-en.pdf", size: "2.2 MB" },
    es: { title: "CFO Tech", audience: "Startups y scale-ups", description: "Dirección financiera para estructurar y acompañar el crecimiento de empresas tecnológicas.", file: "iter-advisors-cfo-tech-es.pdf", size: "2,3 MB" },
  },
  "cfo-pme": {
    fr: { title: "CFO PME", audience: "PME et entreprises en croissance", description: "Une direction financière pour piloter la trésorerie, la rentabilité et le développement de votre PME.", file: "iter-advisors-cfo-pme-fr.pdf", size: "2,4 Mo" },
    en: { title: "CFO for SMBs", audience: "Small and medium-sized businesses", description: "Financial leadership to manage cash flow, profitability and the growth of your business.", file: "iter-advisors-cfo-smbs-en.pdf", size: "2.2 MB" },
    es: { title: "CFO para pymes", audience: "Pymes y empresas en crecimiento", description: "Dirección financiera para gestionar la tesorería, la rentabilidad y el crecimiento de tu pyme.", file: "iter-advisors-cfo-pymes-es.pdf", size: "2,4 MB" },
  },
} as const;

const paths = {
  "cfo-tech": { fr: "/CFO-tech", en: "/en/cfo-tech", es: "/es/cfo-tech" },
  "cfo-pme": { fr: "/CFO-pme", en: "/en/cfo-smb", es: "/es/cfo-pymes" },
};

export function presentationPath(offer: PresentationOffer, locale: PresentationLocale) {
  return paths[offer][locale];
}

export function presentationMetadata(offer: PresentationOffer, locale: PresentationLocale): Metadata {
  const document = presentationCatalog[offer][locale];
  return {
    title: `${document.title} | ${presentationCopy[locale].preview} | Iter Advisors`,
    description: document.description,
    alternates: { canonical: `https://www.iteradvisors.com${presentationPath(offer, locale)}` },
    robots: { index: false, follow: false, noarchive: true },
  };
}
