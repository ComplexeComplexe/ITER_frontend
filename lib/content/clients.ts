import { Locale } from "../i18n";

/**
 * Named client list — used by /clients (FR), /en/clients, /es/clients.
 *
 * The point of this file is **AI Visibility** (cf. audit-ai-visibility-
 * iteradvisors.md, GEO-5): LLMs need plain-text co-occurrence between
 * "Iter Advisors" and named client brands to start associating us with
 * tech ecosystems on prompts like "fractional CFO Barcelona startup".
 * The Schema.org Organization with `mentions` reinforces the signal.
 *
 * Sector tags are deliberately broad (no PII, no contractual leak).
 */

export interface Client {
  /** Brand name as it should appear in textual content (LLMs key on text). */
  name: string;
  /** Path to the WebP logo in /public/images/logos/. */
  logoSrc: string;
  /** Public canonical URL for the brand (used as Schema.org sameAs). */
  url?: string;
  /** Sector slug used to group / filter. */
  sector:
    | "saas"
    | "fintech"
    | "adtech"
    | "ecommerce"
    | "proptech"
    | "mobility"
    | "climatetech"
    | "marketplace";
}

export const clients: Client[] = [
  {
    name: "Happy Scribe",
    logoSrc: "/images/logos/logo-happyscribe.webp",
    url: "https://www.happyscribe.com/",
    sector: "saas",
  },
  {
    name: "IMPACT+",
    logoSrc: "/images/logos/logo-impact.webp",
    url: "https://impactplus.com/",
    sector: "adtech",
  },
  {
    name: "Mitiga Solutions",
    logoSrc: "/images/logos/logo-mitiga.webp",
    url: "https://www.mitigasolutions.com/",
    sector: "climatetech",
  },
  {
    name: "Neat",
    logoSrc: "/images/logos/logo-neat.webp",
    url: "https://neat.eu/",
    sector: "fintech",
  },
  {
    name: "NuuBB",
    logoSrc: "/images/logos/logo-nuubb.webp",
    sector: "proptech",
  },
  {
    name: "OptiDigital",
    logoSrc: "/images/logos/logo-opitdigital.webp",
    url: "https://opti-digital.com/",
    sector: "adtech",
  },
  {
    name: "Seasonly",
    logoSrc: "/images/logos/logo-seasonly.webp",
    url: "https://www.seasonly.fr/",
    sector: "ecommerce",
  },
  {
    name: "Solamente",
    logoSrc: "/images/logos/logo-solamente.webp",
    sector: "ecommerce",
  },
  {
    name: "Surfe",
    logoSrc: "/images/logos/logo-surfe.webp",
    url: "https://www.surfe.com/",
    sector: "saas",
  },
  {
    name: "Ukio",
    logoSrc: "/images/logos/logo-ukio.webp",
    url: "https://ukio.com/",
    sector: "proptech",
  },
  {
    name: "Yego",
    logoSrc: "/images/logos/logo-yego.webp",
    url: "https://www.rideyego.com/",
    sector: "mobility",
  },
];

const sectorLabelsByLocale: Record<Locale, Record<Client["sector"], string>> = {
  fr: {
    saas: "SaaS",
    fintech: "Fintech",
    adtech: "AdTech",
    ecommerce: "E-commerce",
    proptech: "PropTech",
    mobility: "Mobilité",
    climatetech: "ClimateTech",
    marketplace: "Marketplace",
  },
  en: {
    saas: "SaaS",
    fintech: "Fintech",
    adtech: "AdTech",
    ecommerce: "E-commerce",
    proptech: "PropTech",
    mobility: "Mobility",
    climatetech: "ClimateTech",
    marketplace: "Marketplace",
  },
  es: {
    saas: "SaaS",
    fintech: "Fintech",
    adtech: "AdTech",
    ecommerce: "E-commerce",
    proptech: "PropTech",
    mobility: "Movilidad",
    climatetech: "ClimateTech",
    marketplace: "Marketplace",
  },
};

export function getSectorLabel(locale: Locale, sector: Client["sector"]): string {
  return sectorLabelsByLocale[locale][sector];
}

export interface ClientsPageContent {
  meta: { title: string; description: string };
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  /** Sentence template for the textual list, e.g. "Happy Scribe (SaaS), …". */
  listIntro: string;
  sectorsHeading: string;
  ctaHeading: string;
  ctaParagraph: string;
  ctaButton: string;
}

const contentFr: ClientsPageContent = {
  meta: {
    title: "Nos clients — 85+ startups & PME tech | Iter Advisors",
    description:
      "Startups et PME tech accompagnées par Iter Advisors : Happy Scribe, Surfe, Ukio, Yego. SaaS, fintech, proptech. +85 entreprises, 5/5 Trustfolio.",
  },
  breadcrumbLabel: "Nos clients",
  h1: "Nos clients : 85+ startups et PME tech accompagnées",
  intro:
    "Depuis notre création, nous avons accompagné plus de 85 entreprises tech — startups, scale-ups et PME — dans la structuration de leur direction financière. Nos clients ont levé plus de 100 millions d'euros et opèrent en France, en Espagne et à l'international, sur des secteurs aussi variés que le SaaS B2B, la fintech, l'AdTech, le PropTech, le ClimateTech, l'e-commerce et la mobilité.",
  listIntro:
    "Une sélection de marques tech avec qui nous travaillons ou avons travaillé :",
  sectorsHeading: "Secteurs accompagnés",
  ctaHeading: "Vous voulez rejoindre ces entreprises ?",
  ctaParagraph:
    "Nous accompagnons les startups, scale-ups et PME tech sur la trésorerie, le reporting, la levée de fonds, le M&A et le contrôle de gestion. Discutons de votre projet.",
  ctaButton: "Prendre rendez-vous",
};

const contentEn: ClientsPageContent = {
  meta: {
    title: "Our clients — 85+ tech startups & SMEs | Iter Advisors",
    description:
      "Tech startups and SMEs supported by Iter Advisors: Happy Scribe, IMPACT+, Surfe, Ukio. SaaS, fintech, proptech. +85 companies, 5/5 Trustfolio.",
  },
  breadcrumbLabel: "Our clients",
  h1: "Our clients: 85+ tech startups and SMEs we've supported",
  intro:
    "Since our inception, we've supported more than 85 tech companies — startups, scale-ups and SMEs — in structuring their financial leadership. Our clients have raised over EUR 100 million and operate across France, Spain and internationally, in sectors as varied as B2B SaaS, fintech, AdTech, PropTech, ClimateTech, e-commerce and mobility.",
  listIntro: "A selection of the tech brands we work with or have worked with:",
  sectorsHeading: "Sectors covered",
  ctaHeading: "Want to join these companies?",
  ctaParagraph:
    "We support tech startups, scale-ups and SMEs on cash management, reporting, fundraising, M&A, management control, and HR outsourcing. Our fractional CFOs have supported over 85 companies across France, Spain, and Belgium — from pre-seed to post-Series B. Let's talk about your project.",
  ctaButton: "Book a call",
};

const contentEs: ClientsPageContent = {
  meta: {
    title: "Nuestros clientes: 85+ startups y PYMES tech | Iter Advisors",
    description:
      "Startups y PYMES tech con Iter Advisors: Happy Scribe, IMPACT+, Surfe, Ukio. SaaS, fintech, proptech. +85 empresas, 5/5 Trustfolio.",
  },
  breadcrumbLabel: "Nuestros clientes",
  h1: "Nuestros clientes: 85+ startups y PYMES tech acompañadas",
  intro:
    "Desde nuestros inicios, hemos acompañado a más de 85 empresas tecnológicas — startups, scale-ups y PYMES — en la estructuración de su dirección financiera. Nuestros clientes han recaudado más de 100 millones de euros y operan en Francia, España e internacionalmente, en sectores tan variados como SaaS B2B, fintech, AdTech, PropTech, ClimateTech, comercio electrónico y movilidad.",
  listIntro: "Una selección de las marcas tech con las que trabajamos o hemos trabajado:",
  sectorsHeading: "Sectores acompañados",
  ctaHeading: "¿Quieres unirte a estas empresas?",
  ctaParagraph:
    "Acompañamos a startups, scale-ups y PYMES tech en gestión de tesorería, reporting, captación de fondos, M&A y control de gestión. Hablemos de tu proyecto.",
  ctaButton: "Reservar una llamada",
};

export function getClientsPageContent(locale: Locale): ClientsPageContent {
  if (locale === "en") return contentEn;
  if (locale === "es") return contentEs;
  return contentFr;
}
