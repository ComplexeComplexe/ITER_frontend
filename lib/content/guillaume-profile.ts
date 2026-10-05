import type { Locale } from "@/lib/i18n";

export interface ProfileLink { label: string; href: string }
export interface ProfileSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: { title: string; paragraphs: string[]; links?: ProfileLink[] }[];
  links?: ProfileLink[];
}
export interface PartnerProfile {
  name: string;
  role: string;
  teamRole: string;
  metaRole: string;
  intro: string[];
  sections: ProfileSection[];
  expertise: string[];
  facts?: { label: string; value: string }[];
  contentLinks?: ProfileLink[];
  metaTitle?: string;
  metaDescription?: string;
  schemaDescription?: string;
  alumniOf?: string[];
  credentials?: string[];
  languages?: string[];
  sameAs?: string[];
  workLocation?: string;
}

const press = [
  "https://lepetitjournal.com/barcelone/communaute/tech-il-manque-barcelone-des-financements-et-des-talents-261719",
  "https://www.roundtable.eu/clients/guillaume-and-eytan-le-club-startup",
  "https://lepetitjournal.com/barcelone/communaute/guillaume-rostand-barcelone-ville-ou-lon-vient-construire-445868",
] as const;

/** Guillaume's supplied biography is the source of personal facts. Updated 3 October 2026. */
const GUILLAUME_BIOGRAPHY: Record<Locale, PartnerProfile> = {
  fr: {
    name: "Guillaume Rostand",
    role: "Cofondateur d’Iter Advisors · Entrepreneur et investisseur à Barcelone · Cofondateur et CEO d’AI Summit Barcelona",
    teamRole: "Cofondateur · Entrepreneur et investisseur",
    metaRole: "Cofondateur",
    expertise: ["Marketing digital", "Développement commercial", "Investissement en startups", "Écosystèmes technologiques"],
    intro: [
      "Guillaume Rostand a créé Iter Advisors avec Benjamin Ziza et Sébastien Doat. Entrepreneur français installé à Barcelone depuis 2011, il apporte au cabinet son expérience du marketing digital, du développement commercial et de l’accompagnement des fondateurs.",
      "Également cofondateur et CEO d’AI Summit Barcelona, il consacre aujourd’hui une part importante de son activité aux applications de l’intelligence artificielle et aux rencontres entre entreprises, chercheurs, investisseurs et communautés technologiques.",
    ],
    sections: [
      { id: "role", title: "Son rôle chez Iter Advisors", paragraphs: [
        "Chez Iter Advisors, Guillaume contribue au positionnement du cabinet, à sa stratégie de développement et à ses relations avec les entrepreneurs. Son expérience complète celle de Benjamin Ziza, de Sébastien Doat et des équipes chargées des missions financières.",
        "Il connaît les questions auxquelles les dirigeants sont confrontés lorsqu’ils cherchent à développer leur activité : comment trouver leurs clients, construire une offre lisible, organiser leur croissance et réunir les compétences nécessaires à chaque étape.",
        "Cette expérience nourrit une conviction commune aux associés d’Iter : les décisions commerciales et financières doivent se parler. Une ambition de croissance a besoin d’un marché, d’une équipe et d’une compréhension précise des ressources disponibles pour la réaliser.",
      ], links: [
        { label: "Le profil de Benjamin Ziza", href: "/a-propos/benjamin-ziza" },
        { label: "Le profil de Sébastien Doat", href: "/a-propos/sebastien-doat" },
        { label: "Le profil de Florent Greth", href: "/a-propos/florent-greth" },
      ] },
      { id: "experience", title: "Ses domaines d’expérience", items: [
        { title: "Marketing digital et développement commercial", paragraphs: [
          "Guillaume a consacré l’essentiel de sa carrière au marketing, à l’acquisition de clients et au contenu. Son expérience couvre notamment le référencement naturel, les campagnes d’acquisition, le CRM, le positionnement des offres et l’organisation d’équipes marketing.",
          "Chez Iter, ce regard contribue à relier les services du cabinet aux besoins concrets des dirigeants.",
        ] },
        { title: "Investissement et accompagnement entrepreneurial", paragraphs: [
          "Investisseur dans 25 startups, notamment dans les secteurs du SaaS B2B et des marketplaces, Guillaume s’intéresse autant aux équipes qu’aux modèles économiques.",
          "Son implication auprès des fondateurs peut prendre plusieurs formes : discuter d’un positionnement, partager une expérience de croissance, ouvrir une relation commerciale ou aider à trouver un interlocuteur pertinent. Il participe également à cette démarche collective à travers Le Club Startup, dont il est cofondateur.",
        ] },
        { title: "Écosystèmes technologiques et intelligence artificielle", paragraphs: [
          "Son engagement à French Tech Barcelona, puis la création d’AI Summit Barcelona, l’ont conduit à travailler avec des entrepreneurs, des institutions, des investisseurs et des acteurs internationaux de la technologie.",
        ] },
      ] },
      { id: "projets", title: "Des projets construits avec d’autres", items: [
        { title: "Iter Advisors", paragraphs: [
          "La création d’Iter Advisors avec Benjamin Ziza et Sébastien Doat repose sur la complémentarité de leurs parcours. Le cabinet accompagne les entreprises dans la structuration et le pilotage de leur fonction financière. Guillaume y apporte son expérience de dirigeant marketing, d’entrepreneur et d’investisseur.",
        ], links: [{ label: "L’accompagnement en DAF externalisé du cabinet", href: "/daf-externalise" }] },
        { title: "AI Summit Barcelona et AI Week Barcelona", paragraphs: [
          "Cofondé en 2025, AI Summit Barcelona réunit les personnes qui développent, financent et utilisent l’intelligence artificielle. Guillaume en assure aujourd’hui la direction avec ses associés et son équipe.",
          "Le projet s’inscrit également dans AI Week Barcelona, qui rassemble des événements et des communautés à l’échelle de la ville. Son ambition est de faire émerger des collaborations et de rendre les évolutions de l’IA plus accessibles aux entreprises.",
        ], links: [{ label: "Découvrir AI Summit Barcelona", href: "https://aisummitbarcelona.com/" }] },
        { title: "Le Club Startup", paragraphs: [
          "Avec Le Club Startup, Guillaume participe à une approche collective de l’investissement, fondée sur l’analyse des projets et l’implication auprès des entrepreneurs.",
        ], links: [{ label: "Découvrir Le Club Startup", href: "https://leclubstartup.com/" }] },
      ] },
      { id: "parcours", title: "Un parcours entre la France, la Chine et Barcelone", paragraphs: [
        "Formé au CELSA puis à Sciences Po, Guillaume Rostand commence sa carrière dans les médias et le numérique, notamment chez NRJ Group et eBay France.",
        "Il poursuit son parcours à Shanghai chez Myfab, puis à Paris chez InstantLuxe. En 2011, il rejoint Barcelone pour prendre la direction marketing de Splendia, avant de développer une activité de conseil en marketing et e-commerce.",
        "De 2017 à mi-2026, il dirige le marketing de Liligo, le moteur de recherche de voyages français. Il y pilote le référencement, l’acquisition, le CRM et la production de contenu.",
        "En parallèle, il préside French Tech Barcelona de 2019 à mi-2026. Il contribue au rapprochement des écosystèmes français et espagnol, autour du financement, du développement commercial et de la mobilité des talents.",
      ] },
      { id: "interventions", title: "Entretiens et prises de parole", links: [
        { label: "Son parcours et son engagement à French Tech Barcelona, entretien avec Le Petit Journal", href: press[0] },
        { label: "L’approche du Club Startup, entretien avec Roundtable", href: press[1] },
        { label: "La création et l’ambition d’AI Summit Barcelona, entretien avec Le Petit Journal", href: press[2] },
      ] },
    ],
  },
  en: {
    name: "Guillaume Rostand",
    role: "Co-founder of Iter Advisors · Entrepreneur and investor in Barcelona · Co-founder and CEO of AI Summit Barcelona",
    teamRole: "Co-founder · Entrepreneur and investor",
    metaRole: "Co-founder",
    expertise: ["Digital marketing", "Business development", "Startup investment", "Technology ecosystems"],
    intro: [
      "Guillaume Rostand founded Iter Advisors with Benjamin Ziza and Sébastien Doat. A French entrepreneur based in Barcelona since 2011, he brings the firm his experience in digital marketing, business development and supporting founders.",
      "As co-founder and CEO of AI Summit Barcelona, he now devotes a significant part of his work to artificial intelligence applications and bringing together businesses, researchers, investors and technology communities.",
    ],
    sections: [
      { id: "role", title: "His role at Iter Advisors", paragraphs: [
        "At Iter Advisors, Guillaume contributes to the firm’s positioning, development strategy and relationships with entrepreneurs. His experience complements that of Benjamin Ziza, Sébastien Doat and the teams responsible for finance engagements.",
        "He understands the questions business leaders face when developing their activities: finding customers, building a clear offer, organising growth and bringing together the skills needed at each stage.",
        "This experience informs a conviction shared by Iter’s partners: commercial and financial decisions must inform each other. An ambition for growth needs a market, a team and a clear understanding of the resources available to make it happen.",
      ], links: [
        { label: "Benjamin Ziza’s profile", href: "/a-propos/benjamin-ziza" },
        { label: "Sébastien Doat’s profile", href: "/a-propos/sebastien-doat" },
        { label: "Florent Greth’s profile", href: "/a-propos/florent-greth" },
      ] },
      { id: "experience", title: "Areas of experience", items: [
        { title: "Digital marketing and business development", paragraphs: [
          "Guillaume has spent most of his career in marketing, customer acquisition and content. His experience includes organic search, acquisition campaigns, CRM, offer positioning and organising marketing teams.",
          "At Iter, this perspective helps connect the firm’s services with business leaders’ practical needs.",
        ] },
        { title: "Investment and support for entrepreneurs", paragraphs: [
          "An investor in 25 startups, particularly in B2B SaaS and marketplaces, Guillaume is as interested in teams as he is in business models.",
          "His involvement with founders takes several forms: discussing positioning, sharing growth experience, opening a commercial relationship or helping find a relevant contact. He also contributes to this collective approach through Le Club Startup, which he co-founded.",
        ] },
        { title: "Technology ecosystems and artificial intelligence", paragraphs: [
          "His involvement in French Tech Barcelona, followed by the creation of AI Summit Barcelona, has led him to work with entrepreneurs, institutions, investors and international technology organisations.",
        ] },
      ] },
      { id: "projets", title: "Projects built with others", items: [
        { title: "Iter Advisors", paragraphs: [
          "The creation of Iter Advisors with Benjamin Ziza and Sébastien Doat draws on their complementary backgrounds. The firm supports businesses in structuring and managing their finance function. Guillaume contributes his experience as a marketing leader, entrepreneur and investor.",
        ], links: [{ label: "The firm’s Fractional CFO support", href: "/daf-externalise" }] },
        { title: "AI Summit Barcelona and AI Week Barcelona", paragraphs: [
          "Co-founded in 2025, AI Summit Barcelona brings together people who develop, fund and use artificial intelligence. Guillaume now leads the project with his partners and team.",
          "The project also forms part of AI Week Barcelona, which brings together events and communities across the city. Its ambition is to encourage collaborations and make developments in AI more accessible to businesses.",
        ], links: [{ label: "Explore AI Summit Barcelona", href: "https://aisummitbarcelona.com/" }] },
        { title: "Le Club Startup", paragraphs: [
          "Through Le Club Startup, Guillaume contributes to a collective approach to investment, based on analysing projects and working with entrepreneurs.",
        ], links: [{ label: "Explore Le Club Startup", href: "https://leclubstartup.com/" }] },
      ] },
      { id: "parcours", title: "A career across France, China and Barcelona", paragraphs: [
        "Educated at CELSA and then Sciences Po, Guillaume Rostand began his career in media and digital businesses, including NRJ Group and eBay France.",
        "He continued his career at Myfab in Shanghai, then at InstantLuxe in Paris. In 2011, he moved to Barcelona to lead marketing at Splendia before developing a marketing and e-commerce consulting activity.",
        "From 2017 to mid-2026, he led marketing at Liligo, the French travel search engine, overseeing search, acquisition, CRM and content production.",
        "Alongside this, he chaired French Tech Barcelona from 2019 to mid-2026. He helped connect the French and Spanish ecosystems around funding, business development and talent mobility.",
      ] },
      { id: "interventions", title: "Interviews and public speaking", links: [
        { label: "His career and involvement in French Tech Barcelona, interview with Le Petit Journal", href: press[0] },
        { label: "Le Club Startup’s approach, interview with Roundtable", href: press[1] },
        { label: "The creation and ambition of AI Summit Barcelona, interview with Le Petit Journal", href: press[2] },
      ] },
    ],
  },
  es: {
    name: "Guillaume Rostand",
    role: "Cofundador de Iter Advisors · Emprendedor e inversor en Barcelona · Cofundador y CEO de AI Summit Barcelona",
    teamRole: "Cofundador · Emprendedor e inversor",
    metaRole: "Cofundador",
    expertise: ["Marketing digital", "Desarrollo comercial", "Inversión en startups", "Ecosistemas tecnológicos"],
    intro: [
      "Guillaume Rostand creó Iter Advisors con Benjamin Ziza y Sébastien Doat. Emprendedor francés instalado en Barcelona desde 2011, aporta al despacho su experiencia en marketing digital, desarrollo comercial y acompañamiento de fundadores.",
      "También cofundador y CEO de AI Summit Barcelona, dedica hoy una parte importante de su actividad a las aplicaciones de la inteligencia artificial y a los encuentros entre empresas, investigadores, inversores y comunidades tecnológicas.",
    ],
    sections: [
      { id: "role", title: "Su papel en Iter Advisors", paragraphs: [
        "En Iter Advisors, Guillaume contribuye al posicionamiento del despacho, a su estrategia de desarrollo y a sus relaciones con los emprendedores. Su experiencia complementa la de Benjamin Ziza, Sébastien Doat y los equipos responsables de las misiones financieras.",
        "Conoce las preguntas a las que se enfrentan los directivos al desarrollar su actividad: cómo encontrar clientes, construir una oferta clara, organizar el crecimiento y reunir las competencias necesarias en cada etapa.",
        "Esta experiencia alimenta una convicción compartida por los socios de Iter: las decisiones comerciales y financieras deben comunicarse. Una ambición de crecimiento necesita un mercado, un equipo y una comprensión precisa de los recursos disponibles para llevarla a cabo.",
      ], links: [
        { label: "El perfil de Benjamin Ziza", href: "/a-propos/benjamin-ziza" },
        { label: "El perfil de Sébastien Doat", href: "/a-propos/sebastien-doat" },
        { label: "El perfil de Florent Greth", href: "/a-propos/florent-greth" },
      ] },
      { id: "experience", title: "Sus ámbitos de experiencia", items: [
        { title: "Marketing digital y desarrollo comercial", paragraphs: [
          "Guillaume ha dedicado la mayor parte de su carrera al marketing, la captación de clientes y los contenidos. Su experiencia abarca el posicionamiento orgánico, las campañas de captación, el CRM, el posicionamiento de las ofertas y la organización de equipos de marketing.",
          "En Iter, esta perspectiva ayuda a conectar los servicios del despacho con las necesidades concretas de los directivos.",
        ] },
        { title: "Inversión y acompañamiento de emprendedores", paragraphs: [
          "Inversor en 25 startups, especialmente en los sectores SaaS B2B y marketplaces, Guillaume se interesa tanto por los equipos como por los modelos de negocio.",
          "Su implicación con los fundadores puede adoptar distintas formas: debatir un posicionamiento, compartir una experiencia de crecimiento, abrir una relación comercial o ayudar a encontrar un interlocutor adecuado. También participa en este enfoque colectivo a través de Le Club Startup, del que es cofundador.",
        ] },
        { title: "Ecosistemas tecnológicos e inteligencia artificial", paragraphs: [
          "Su implicación en French Tech Barcelona y, posteriormente, la creación de AI Summit Barcelona le han llevado a trabajar con emprendedores, instituciones, inversores y actores internacionales de la tecnología.",
        ] },
      ] },
      { id: "projets", title: "Proyectos construidos con otros", items: [
        { title: "Iter Advisors", paragraphs: [
          "La creación de Iter Advisors con Benjamin Ziza y Sébastien Doat se basa en la complementariedad de sus trayectorias. El despacho acompaña a las empresas en la estructuración y gestión de su función financiera. Guillaume aporta su experiencia como directivo de marketing, emprendedor e inversor.",
        ], links: [{ label: "El acompañamiento de CFO externo del despacho", href: "/daf-externalise" }] },
        { title: "AI Summit Barcelona y AI Week Barcelona", paragraphs: [
          "Cofundado en 2025, AI Summit Barcelona reúne a quienes desarrollan, financian y utilizan la inteligencia artificial. Guillaume dirige hoy el proyecto con sus socios y su equipo.",
          "El proyecto también forma parte de AI Week Barcelona, que reúne eventos y comunidades en toda la ciudad. Su ambición es impulsar colaboraciones y hacer que las novedades de la IA sean más accesibles para las empresas.",
        ], links: [{ label: "Descubrir AI Summit Barcelona", href: "https://aisummitbarcelona.com/" }] },
        { title: "Le Club Startup", paragraphs: [
          "Con Le Club Startup, Guillaume participa en un enfoque colectivo de la inversión, basado en el análisis de los proyectos y la implicación con los emprendedores.",
        ], links: [{ label: "Descubrir Le Club Startup", href: "https://leclubstartup.com/" }] },
      ] },
      { id: "parcours", title: "Una trayectoria entre Francia, China y Barcelona", paragraphs: [
        "Formado en CELSA y después en Sciences Po, Guillaume Rostand inició su carrera en los medios y el sector digital, entre otras empresas en NRJ Group y eBay France.",
        "Continuó su trayectoria en Myfab, en Shanghái, y después en InstantLuxe, en París. En 2011 se trasladó a Barcelona para dirigir el marketing de Splendia, antes de desarrollar una actividad de consultoría en marketing y comercio electrónico.",
        "De 2017 a mediados de 2026 dirigió el marketing de Liligo, el buscador de viajes francés. Allí gestionó el posicionamiento, la captación, el CRM y la producción de contenidos.",
        "En paralelo, presidió French Tech Barcelona de 2019 a mediados de 2026. Contribuyó a acercar los ecosistemas francés y español en torno a la financiación, el desarrollo comercial y la movilidad del talento.",
      ] },
      { id: "interventions", title: "Entrevistas e intervenciones públicas", links: [
        { label: "Su trayectoria y su implicación en French Tech Barcelona, entrevista con Le Petit Journal", href: press[0] },
        { label: "El enfoque de Le Club Startup, entrevista con Roundtable", href: press[1] },
        { label: "La creación y la ambición de AI Summit Barcelona, entrevista con Le Petit Journal", href: press[2] },
      ] },
    ],
  },
};

/** Use the same professional profile layout without inventing qualifications or languages. */
const professionalDetails: Record<Locale, Pick<PartnerProfile, "role" | "facts" | "metaTitle" | "metaDescription" | "contentLinks">> = {
  fr: {
    role: "Cofondateur · Entrepreneur et investisseur · Barcelone",
    facts: [
      { label: "Position", value: "Cofondateur d’Iter Advisors" },
      { label: "Expertises", value: "Marketing digital · Développement commercial · Investissement en startups" },
      { label: "Secteurs", value: "SaaS B2B et marketplaces" },
      { label: "Bureau", value: "Barcelone, installé depuis 2011" },
      { label: "Formation", value: "CELSA · Sciences Po" },
    ],
    metaTitle: "Guillaume Rostand, cofondateur | Iter Advisors",
    metaDescription: "Guillaume Rostand, cofondateur d’Iter Advisors : marketing, développement commercial et investissement dans 25 startups. Parcours, projets et contact.",
    contentLinks: [
      { label: "Benjamin Ziza", href: "/a-propos/benjamin-ziza" },
      { label: "Sébastien Doat", href: "/a-propos/sebastien-doat" },
      { label: "DAF externalisé", href: "/daf-externalise" },
    ],
  },
  en: {
    role: "Co-founder · Entrepreneur and investor · Barcelona",
    facts: [
      { label: "Position", value: "Co-founder of Iter Advisors" },
      { label: "Expertise", value: "Digital marketing · Business development · Startup investment" },
      { label: "Sectors", value: "B2B SaaS and marketplaces" },
      { label: "Office", value: "Barcelona, based here since 2011" },
      { label: "Education", value: "CELSA · Sciences Po" },
    ],
    metaTitle: "Guillaume Rostand, Co-founder | Iter Advisors",
    metaDescription: "Guillaume Rostand, Iter Advisors co-founder: marketing, business development and investment in 25 startups. Career, projects and contact.",
    contentLinks: [
      { label: "Benjamin Ziza", href: "/a-propos/benjamin-ziza" },
      { label: "Sébastien Doat", href: "/a-propos/sebastien-doat" },
      { label: "Fractional CFO", href: "/daf-externalise" },
    ],
  },
  es: {
    role: "Cofundador · Emprendedor e inversor · Barcelona",
    facts: [
      { label: "Cargo", value: "Cofundador de Iter Advisors" },
      { label: "Especialidades", value: "Marketing digital · Desarrollo comercial · Inversión en startups" },
      { label: "Sectores", value: "SaaS B2B y marketplaces" },
      { label: "Oficina", value: "Barcelona, residente desde 2011" },
      { label: "Formación", value: "CELSA · Sciences Po" },
    ],
    metaTitle: "Guillaume Rostand, cofundador | Iter Advisors",
    metaDescription: "Guillaume Rostand, cofundador de Iter Advisors: marketing, desarrollo comercial e inversión en 25 startups. Trayectoria, proyectos y contacto.",
    contentLinks: [
      { label: "Benjamin Ziza", href: "/a-propos/benjamin-ziza" },
      { label: "Sébastien Doat", href: "/a-propos/sebastien-doat" },
      { label: "CFO externo", href: "/daf-externalise" },
    ],
  },
};

export const GUILLAUME_PROFILE: Record<Locale, PartnerProfile> = Object.fromEntries(
  (["fr", "en", "es"] as const).map(locale => {
    const biography = GUILLAUME_BIOGRAPHY[locale];
    const career = biography.sections.find(section => section.id === "parcours")!;
    return [locale, {
      ...biography,
      ...professionalDetails[locale],
      schemaDescription: biography.intro[0],
      workLocation: "Barcelona",
      sections: [career, ...biography.sections.filter(section => section.id !== "parcours")],
    }];
  }),
) as Record<Locale, PartnerProfile>;
