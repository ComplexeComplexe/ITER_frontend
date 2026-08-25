import type { StrapiTeamMember } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";

interface FallbackMemberData {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  roles: Record<Locale, string>;
  /** Optional locale-specific label used exclusively in the page H1.
   *  Falls back to `roles[locale]` when absent. */
  h1Roles?: Record<Locale, string>;
  slug: string;
  photo: { url: string } | null;
  linkedIn: string;
  order: number;
  showInHero: boolean;
  /** Short bio used in schema.org Person.description and the meta description (≤ 160 chars recommended).
   *  Only populated for founding partners; other members fall back to
   *  the team listing on /a-propos. */
  bio?: Record<Locale, string>;
  /** Extended bio paragraphs rendered on the author page for SEO word-count depth (SEO-15).
   *  Separate from `bio` so schema.org description stays concise. */
  bioExtended?: Record<Locale, string>;
}

// Helper function to convert name to slug format
function nameToSlug(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase().replace(/[éèê]/g, 'e')}-${lastName.toLowerCase().replace(/[éèê]/g, 'e')}`;
}

const fallbackData: FallbackMemberData[] = [
  // === Direction / Partners ===
  {
    id: 1,
    documentId: "sebastien-doat",
    firstName: "Sébastien",
    lastName: "Doat",
    roles: {
      fr: "Associé fondateur - CFO & Investisseur",
      en: "Founding Partner - CFO & Investor",
      es: "Socio fundador - CFO e Inversor"
    },
    h1Roles: {
      fr: "Associé fondateur, DAF externalisé",
      en: "Founding Partner, Fractional CFO",
      es: "Socio fundador, CFO Externalizado",
    },
    slug: "sebastien-doat",
    photo: { url: "/images/team/sebastien-doat.webp" },
    linkedIn: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
    order: 1,
    showInHero: true,
    bio: {
      fr: // Bloc 5 (10/08/2026) — deux corrections validées : le total levé est de
      // plus de 65 M€, pas 150 M€, et Sébastien est basé à Barcelone depuis
      // novembre 2020, pas au bureau de Paris.
      "Associé fondateur et CFO d'Iter Advisors, basé à Barcelone depuis novembre 2020. Plus de 15 ans en finance d'entreprise : transaction services et audit chez ACA Nexia, DAF chez Terres de Café, puis CFO et General Manager Europe de Carts Guru entre Barcelone et San Francisco. Il a sécurisé plus de 65 M€ pour ses clients et sociétés accompagnées. Son terrain : la trésorerie, la modélisation financière et la négociation avec les investisseurs.",
      en: "Sébastien has spent 15 years structuring finance for startups and scale-ups across France and Spain. Before co-founding Iter Advisors, he held CFO roles at several hyper-growth companies, supporting fundraises totalling over €65M. His focus areas: cash management, financial modelling, and investor negotiations.",
      es: "Sébastien ha pasado 15 años estructurando las finanzas de startups y scale-ups en Francia y España. Antes de cofundar Iter Advisors, ocupó el puesto de CFO en varias empresas de hipercrecimiento, acompañando rondas de financiación por más de 65 M€. Sus áreas de enfoque: tesorería, modelización financiera y negociación con inversores.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Sébastien travaille directement avec les fondateurs à chaque étape de leur parcours financier — de la mise en place du premier tableau de bord KPI à la préparation des board decks de Série B et à la gestion des négociations avec les investisseurs. Il est spécialisé dans la gestion de trésorerie, les prévisions roulantes à 13 semaines, la modélisation financière et le conseil en M&A. Son portefeuille clients couvre des entreprises SaaS, fintech, proptech et deep tech opérant en France, en Espagne et en Belgique. Il conseille sur l'optimisation du besoin en fonds de roulement, la sélection des outils ERP et financiers, la préparation à la due diligence et l'intégration financière post-acquisition. Parmi les opérations menées : la Série B de 50 M$ de SolarMente, l'acquisition d'Eltex par SolarMente en 2024, les tours d'Emerald Stay (4 M€), d'Equito (plus de 3 M€ en equity et non dilutif), d'Impact Plus (2,2 M€), de Carts Guru (7,2 M$) et de Terres de Café (1,3 M€), ainsi que des transaction services pour Mama Shelter sur trois opérations comprises entre 25 et 135 M€. Il siège comme board advisor chez Equito depuis 2023 et NuuBB depuis 2022, et l'a fait chez SolarMente de 2022 à 2025. Sébastien contribue régulièrement au journal d'Iter Advisors sur les thèmes du DAF externalisé, des benchmarks de cash burn et de la préparation aux levées de fonds.",
      en: "At Iter Advisors, Sébastien works directly with founders at every stage of their financial journey — from setting up the first KPI dashboard and cash flow model to preparing Series B board presentations and managing investor negotiations. He specialises in 13-week rolling cash forecasts, financial modelling, M&A advisory, and fundraising preparation. His client portfolio spans SaaS, fintech, proptech, and deep tech companies operating across France, Spain, and Belgium, covering transactions from €2M seed rounds to €40M+ growth rounds and two secondary exits. He advises on working capital optimisation, ERP and tool selection, due diligence readiness, and post-acquisition financial integration. Sébastien contributes regularly to the Iter Advisors journal on fractional CFO pricing, cash burn benchmarks, and fundraising strategy. He holds a Master's in Finance and speaks French, Spanish, and English.",
      es: "En Iter Advisors, trabaja directamente con fundadores en todas las etapas de su recorrido financiero — desde la creación del primer cuadro de mando KPI hasta la preparación de board decks de Serie B. Asesora sobre previsión de tesorería a 13 semanas, optimización del capital circulante, selección de herramientas financieras y preparación de due diligence. Su cartera de clientes abarca empresas SaaS, fintech, proptech y deep tech en Francia, España y Bélgica, con operaciones desde rondas seed de 2 M€ hasta levantamientos de crecimiento superiores a 40 M€. Sébastien contribuye regularmente al diario de Iter Advisors sobre precios de CFO externalizado, benchmarks de cash burn y estrategia de captación de fondos. Habla francés, español e inglés con fluidez.",
    },
  },
  {
    id: 2,
    documentId: "benjamin-ziza",
    firstName: "Benjamin",
    lastName: "Ziza",
    roles: {
      fr: "Associé fondateur - CFO & Investisseur",
      en: "Founding Partner - CFO & Investor",
      es: "Socio fundador - CFO e Inversor"
    },
    h1Roles: {
      fr: "Associé fondateur, DAF externalisé",
      en: "Founding Partner, Fractional CFO",
      es: "Socio fundador, CFO Externalizado",
    },
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.webp" },
    linkedIn: "https://www.linkedin.com/in/benjamin-ziza/",
    order: 2,
    showInHero: true,
    bio: {
      fr: // Bloc 5 (10/08/2026) — formation corrigée : Benjamin est diplômé
      // d'expertise comptable (DEC, 2012-2015), pas d'une école de commerce.
      "Benjamin a structuré la direction financière de startups et de PME pendant plus de 14 ans avant de cofonder Iter Advisors en 2020. Il pilote aujourd'hui le bureau de Barcelone et accompagne une dizaine de fondateurs par an sur leur stratégie financière, leur fiscalité internationale (notamment la loi Beckham) et la préparation de leurs levées de fonds. Auteur principal du journal d'Iter Advisors, il écrit sur les sujets qu'il pratique au quotidien : trésorerie, KPIs SaaS, externalisation comptable et fiscalité France-Espagne.",
      en: "Benjamin spent 12 years structuring finance for SaaS startups and industrial SMEs before co-founding Iter Advisors. He now runs the Barcelona office and supports around ten founders a year on financial strategy, international taxation (notably the Beckham Law) and fundraising preparation. As lead writer of the Iter Advisors journal, he covers the topics he practices daily: cash management, SaaS KPIs, accounting outsourcing, and Franco-Spanish taxation.",
      es: "Benjamin pasó 12 años estructurando las finanzas de startups SaaS y pymes industriales antes de cofundar Iter Advisors. Hoy dirige la oficina de Barcelona y acompaña a una decena de fundadores al año en su estrategia financiera, su fiscalidad internacional (en particular la ley Beckham) y la preparación de sus rondas de financiación. Autor principal de la revista de Iter Advisors, escribe sobre los temas que practica a diario: tesorería, KPIs SaaS, externalización contable y fiscalidad franco-española.",
    },
    bioExtended: {
      fr: "Basé à Barcelone, Benjamin apporte une double perspective sur la réglementation financière européenne et les réalités pratiques du développement d'une entreprise technologique — de la mise en place de la première paie à la tenue des boards institutionnels. Son expertise couvre les prévisions de trésorerie à 13 semaines, le reporting de gestion, la restructuration financière et la planification fiscale transfrontalière entre la France, l'Espagne et d'autres pays. Il a accompagné des levées de fonds de 500 K€ pre-seed jusqu'à 15 M€ en Série A, ainsi que plusieurs opérations de M&A. Diplômé d'expertise comptable (DEC, 2012-2015), formé à l'expertise comptable et au commissariat aux comptes, il intervient sur les levées de fonds y compris les dossiers à risque, les plans de restructuration, la structuration post-levée et la préparation de cession. Il s'exprime couramment en français, espagnol et anglais.",
      en: "Based in Barcelona, Benjamin leads Iter Advisors' Spanish operations and brings a dual perspective on European financial regulation and the practicalities of scaling a technology business — from first payroll setup to institutional board meetings. His expertise includes 13-week cash flow forecasting, management reporting, financial restructuring, and cross-border tax planning across France, Spain, and beyond. He has supported fundraising rounds from €500K pre-seed to €15M Series A, as well as M&A transactions. He writes regularly on SaaS KPIs, treasury management and Franco-Spanish taxation. Benjamin is a qualified chartered accountant (DEC, 2012-2015), trained in both accountancy and statutory audit.",
      es: "Desde Barcelona, Benjamin dirige las operaciones de Iter Advisors en España y aporta una doble perspectiva sobre la regulación financiera europea y las realidades prácticas de escalar una empresa tecnológica, desde la primera nómina hasta las reuniones de consejo institucional. Su experiencia abarca previsión de tesorería a 13 semanas, reporting de gestión, reestructuración financiera y planificación fiscal transfronteriza entre Francia, España y más allá. Ha apoyado rondas de financiación desde 500 K€ pre-seed hasta 15 M€ en Serie A, así como transacciones de M&A. Escribe con regularidad sobre KPIs SaaS, tesorería y fiscalidad franco-española. Benjamin está titulado en experiencia contable (DEC, 2012-2015), con formación en auditoría legal.000 profesionales de las finanzas cada mes. Benjamin es graduado en Finanzas por una de las principales grandes écoles francesas y habla con fluidez francés, español e inglés.",
    },
  },
  {
    id: 3,
    documentId: "guillaume-rostand",
    firstName: "Guillaume",
    lastName: "Rostand",
    roles: {
      fr: "Associé fondateur & CMO",
      en: "Founding Partner & CMO",
      es: "Socio fundador y CMO"
    },
    h1Roles: {
      fr: "Co-fondateur, DAF externalisé",
      en: "Co-Founder, Fractional CFO",
      es: "Cofundador, CFO Externalizado",
    },
    slug: "guillaume-rostand",
    photo: { url: "/images/team/guillaume-rostand.webp" },
    linkedIn: "https://www.linkedin.com/in/rostand/",
    order: 3,
    showInHero: true,
    bio: {
      fr: "Guillaume cofonde et pilote la croissance d'Iter Advisors. Ancien fondateur de startups SaaS, il a passé une décennie côté opérateur avant de basculer côté accompagnement. Il dirige aujourd'hui les sujets marketing, partenariats et développement commercial du cabinet.",
      en: "Guillaume co-founded Iter Advisors and runs its growth function. A former SaaS-startup founder, he spent a decade on the operator side before switching to advisory. He leads the firm's marketing, partnerships and business development efforts.",
      es: "Guillaume cofundó Iter Advisors y dirige su función de crecimiento. Ex fundador de startups SaaS, pasó una década en el lado operativo antes de cambiar al asesoramiento. Hoy lidera las áreas de marketing, alianzas y desarrollo comercial del despacho.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Guillaume pilote la stratégie de croissance et de marketing, avec la responsabilité de positionner le cabinet comme la référence du DAF externalisé pour les fondateurs tech européens. Il travaille en étroite collaboration avec l'équipe CFO pour transformer l'expertise financière en ressources pratiques : guides approfondis sur les modèles de DAF externalisé, les stacks d'outils financiers, les processus de due diligence et la stratégie financière des startups, consultés chaque mois par des milliers de fondateurs et professionnels de la finance. En tant qu'ancien fondateur SaaS, Guillaume apporte une compréhension de première main des défis financiers des entreprises en croissance : gérer les relations investisseurs sur plusieurs géographies, choisir entre externalisation et recrutement interne, construire des systèmes financiers capables d'absorber une croissance rapide sans perdre le contrôle. Il est directement impliqué dans plus de 40 relations fondateurs chez Iter Advisors, contribuant à la stratégie commerciale, au positionnement marché et à la formation des équipes en France, en Espagne et en Belgique. Guillaume est basé entre Toulouse et Barcelone. Il est titulaire d'un diplôme d'ingénieur et s'exprime couramment en français, espagnol et anglais. Il contribue régulièrement à des conférences startup européennes et à des programmes de mentorat sur les thèmes de la croissance durable et des opérations financières.",
      en: "At Iter Advisors, Guillaume leads the firm's growth and marketing strategy, with responsibility for positioning Iter Advisors as the reference fractional CFO resource for European tech founders. He works closely with the CFO team to translate deep financial expertise into practical guidance — publishing in-depth guides on outsourced CFO models, financial tool stacks, due diligence processes, and startup finance strategy read by thousands of founders and finance professionals each month. As a former SaaS founder, Guillaume brings first-hand experience of the financial challenges that growth-stage companies face: managing investor relationships across multiple geographies, choosing between outsourcing and in-house hiring, and building financial systems that can absorb rapid growth without losing control. He has been directly involved in more than 40 founder relationships at Iter Advisors, contributing to commercial strategy, market positioning, and team formation across France, Spain, and Belgium. Guillaume is based between Toulouse and Barcelona, holds a degree in Engineering, and speaks French, Spanish, and English. He contributes regularly to European startup conferences and mentorship programmes on sustainable growth and financial operations, and is committed to making expert CFO knowledge accessible to every founder regardless of company stage or sector.",
      es: "En Iter Advisors, Guillaume dirige la estrategia de crecimiento y marketing del despacho, con la responsabilidad de posicionar a Iter Advisors como la referencia del CFO externalizado para los fundadores tech europeos. Trabaja estrechamente con el equipo de CFO para transformar la experiencia financiera en recursos prácticos: guías en profundidad sobre modelos de CFO externalizado, stacks de herramientas financieras, procesos de due diligence y estrategia financiera para startups, leídas mensualmente por miles de fundadores y profesionales de las finanzas. Como ex fundador de SaaS, Guillaume aporta un conocimiento de primera mano de los retos financieros de las empresas en crecimiento: gestionar relaciones con inversores en múltiples geografías, elegir entre externalización y contratación interna, y construir sistemas financieros capaces de absorber un crecimiento rápido sin perder el control. Está directamente implicado en más de 40 relaciones con fundadores en Iter Advisors, contribuyendo a la estrategia comercial, el posicionamiento de mercado y la formación de equipos en Francia, España y Bélgica. Guillaume reside entre Toulouse y Barcelona. Es licenciado en Ingeniería y habla con fluidez francés, español e inglés. Contribuye regularmente a conferencias startup europeas y programas de mentoría sobre crecimiento sostenible y operaciones financieras.",
    },
  },
  {
    id: 4,
    documentId: "florent-greth",
    firstName: "Florent",
    lastName: "Greth",
    roles: {
      fr: "Partner & CFO",
      en: "Partner & CFO",
      es: "Partner y CFO"
    },
    h1Roles: {
      fr: "Partner & CFO externalisé",
      en: "Partner & Fractional CFO",
      es: "Partner y CFO Externalizado",
    },
    slug: "florent-greth",
    photo: { url: "/images/team/florent-greth.webp" },
    linkedIn: "https://www.linkedin.com/in/florent-greth-cfo-pennylane/?locale=en",
    order: 4,
    showInHero: true,
    bio: {
      fr: "Associé et CFO chez Iter Advisors, basé à Barcelone. Plus de 15 ans en direction financière et contrôle de gestion, passés notamment chez PACCOR, VIIA, Abertis Group et KPMG en audit. Il a rejoint Iter Advisors en 2023 pour prendre la responsabilité du pôle DAF externe, et a été nommé associé en 2026. Référent sur le déploiement et la migration Pennylane.",
      en: "Florent is a Partner & CFO at Iter Advisors. A specialist in SaaS finance tools (Pennylane, Agicap), he supports SMEs and startups on financial structuring and cash flow management.",
      es: "Florent es Partner y CFO en Iter Advisors. Especialista en herramientas SaaS de finanzas (Pennylane, Agicap), acompaña a pymes y startups en estructuración financiera y gestión de tesorería.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Florent intervient auprès de PME en croissance et de startups pour structurer leur direction financière, mettre en place des outils de pilotage adaptés et optimiser leur trésorerie. Expert reconnu des solutions finance SaaS, notamment Pennylane, il accompagne la migration et l'implémentation de ces outils chez ses clients, réduisant les délais de clôture et automatisant les réconciliations comptables. Ses missions couvrent la mise en place de prévisionnels de trésorerie à 12 mois glissants, la construction de tableaux de bord financiers personnalisés, la préparation aux audits et la structuration des process comptables et financiers. Florent est spécialisé dans les secteurs SaaS, e-commerce et services B2B, où il accompagne les fondateurs dans la compréhension et l'amélioration de leurs métriques financières clés : ARR, MRR, churn, LTV/CAC et free cash flow. Il travaille régulièrement sur la préparation aux levées de fonds (Seed à Série A), en construisant les modèles financiers et les data rooms qui rassurent les investisseurs. Au-delà du pilotage financier opérationnel, Florent conseille sur la sélection et l'intégration de la stack technologique finance : ERP, logiciel de trésorerie, gestion des dépenses, facturation et paie. Son approche : simplifier ce qui peut l'être, automatiser ce qui est répétitif, et libérer du temps au fondateur pour se concentrer sur la croissance.",
      en: "At Iter Advisors, Florent works with growth-stage SMEs and startups to structure their finance function, implement the right management tools, and optimise their cash flow. A recognised expert in SaaS finance solutions, particularly Pennylane, he supports clients through tool migration and implementation — reducing closing times and automating accounting reconciliations. His engagements cover 12-month rolling cash flow forecasts, custom financial dashboards, audit preparation, and structuring of accounting and finance processes. Florent specialises in SaaS, e-commerce and B2B services sectors, where he guides founders in understanding and improving their key financial metrics: ARR, MRR, churn, LTV/CAC and free cash flow. He regularly supports fundraising preparation (Seed to Series A), building financial models and data rooms that instil investor confidence. Beyond operational financial management, Florent advises on selecting and integrating the finance technology stack: ERP, treasury software, expense management, invoicing and payroll. His approach: simplify where possible, automate what is repetitive, and free up time for founders to focus on growth.",
      es: "En Iter Advisors, Florent trabaja con pymes en crecimiento y startups para estructurar su dirección financiera, implementar las herramientas de control adecuadas y optimizar su tesorería. Experto reconocido en soluciones SaaS de finanzas, en particular Pennylane, acompaña a los clientes en la migración e implementación de estas herramientas, reduciendo los plazos de cierre y automatizando las reconciliaciones contables. Sus misiones abarcan previsiones de tesorería a 12 meses, cuadros de mando financieros personalizados, preparación de auditorías y estructuración de procesos contables y financieros. Florent está especializado en los sectores SaaS, e-commerce y servicios B2B, donde guía a los fundadores en la comprensión y mejora de sus métricas financieras clave: ARR, MRR, churn, LTV/CAC y free cash flow. Trabaja regularmente en la preparación para la captación de fondos (Seed a Serie A), construyendo modelos financieros y data rooms que generan confianza en los inversores. Más allá de la gestión financiera operativa, Florent asesora sobre la selección e integración del stack tecnológico financiero: ERP, software de tesorería, gestión de gastos, facturación y nómina.",
    },
  },
  {
    id: 5,
    documentId: "borith-biv",
    firstName: "Borith",
    lastName: "Biv",
    roles: {
      fr: "Partner Capital Humain",
      en: "Partner Human Capital",
      es: "Partner Capital Humano"
    },
    h1Roles: {
      fr: "Partner Capital Humain & DRH externalisé",
      en: "Partner Human Capital & Fractional CHRO",
      es: "Partner Capital Humano y DRRHH externalizado",
    },
    slug: "borith-biv",
    photo: { url: "/images/team/borith-biv.webp" },
    linkedIn: "https://www.linkedin.com/in/borith-biv-linkb/",
    order: 5,
    showInHero: false,
    bio: {
      fr: "Borith est Partner Capital Humain chez Iter Advisors. Il accompagne les PME et startups sur la structuration RH, le recrutement des profils financiers et la gestion des équipes en croissance.",
      en: "Borith is a Human Capital Partner at Iter Advisors. He supports SMEs and startups on HR structuring, financial talent recruitment and people management in high-growth contexts.",
      es: "Borith es Partner de Capital Humano en Iter Advisors. Acompaña a pymes y startups en la estructuración de RRHH, el reclutamiento de perfiles financieros y la gestión de equipos en crecimiento.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Borith pilote la practice Capital Humain, qui accompagne les entreprises en croissance sur leurs enjeux RH les plus critiques : recrutement de profils finance et gestion, structuration de la fonction RH, mise en place de politiques salariales et construction d'équipes performantes. Ses missions s'adressent principalement aux startups post-Series A et aux PME de 20 à 150 salariés qui ont besoin d'une direction des ressources humaines opérationnelle mais ne sont pas encore prêtes à recruter un DRH à temps plein. En tant que DRH externalisé à temps partagé, Borith intervient sur la définition des politiques RH, la rédaction et la structuration des fiches de poste, la mise en conformité avec le droit du travail, la gestion de la paie et la coordination avec les partenaires sociaux. Il est également spécialisé dans le recrutement de profils financiers (DAF, RAF, contrôleurs de gestion, analystes financiers), avec une compréhension fine des compétences techniques et des soft skills recherchés dans ces fonctions. Son approche combine rigueur opérationnelle et vision stratégique : il aide les fondateurs à construire des organisations financières qui peuvent absorber une croissance rapide sans perdre en qualité ni en cohésion d'équipe. Borith parle couramment français et anglais et intervient en France, en Espagne et en Belgique.",
      en: "At Iter Advisors, Borith leads the Human Capital practice, which supports growth-stage companies on their most critical HR challenges: finance and management talent recruitment, HR function structuring, salary policy design and high-performance team building. His engagements primarily target post-Series A startups and SMEs with 20 to 150 employees that need an operational HR function but are not yet ready to hire a full-time CHRO. As a fractional CHRO, Borith works on defining HR policies, writing and structuring job descriptions, ensuring compliance with labour law, managing payroll coordination and engaging with employee representatives. He also specialises in recruiting finance profiles (CFO, Financial Controller, Management Controller, Financial Analysts), with a deep understanding of the technical skills and soft skills these roles require. His approach combines operational rigour with strategic vision: he helps founders build finance organisations that can absorb rapid growth without losing quality or team cohesion. Borith speaks fluent French and English and works across France, Spain, and Belgium.",
      es: "En Iter Advisors, Borith lidera la práctica de Capital Humano, que acompaña a las empresas en crecimiento en sus retos de RRHH más críticos: reclutamiento de perfiles de finanzas y gestión, estructuración de la función de RRHH, diseño de políticas salariales y construcción de equipos de alto rendimiento. Sus misiones se dirigen principalmente a startups post-Serie A y pymes de 20 a 150 empleados que necesitan una función de RRHH operativa pero aún no están listas para contratar un director de RRHH a tiempo completo. Como director de RRHH externalizado a tiempo parcial, Borith trabaja en la definición de políticas de RRHH, la redacción y estructuración de descripciones de puestos, el cumplimiento del derecho laboral, la coordinación de nóminas y la gestión de las relaciones laborales. También está especializado en el reclutamiento de perfiles financieros (CFO, RAF, controladores de gestión, analistas financieros). Borith habla con fluidez francés e inglés e interviene en Francia, España y Bélgica.",
    },
  },

  // === Finance - CFO ===
  {
    id: 6,
    documentId: "deisy-arias-ramirez",
    firstName: "Deisy",
    lastName: "Arias Ramirez",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "deisy-arias-ramirez",
    photo: { url: "/images/team/deisy-arias-ramirez.webp" },
    linkedIn: "https://www.linkedin.com/in/deisyarias/",
    order: 6,
    showInHero: false,
    bio: {
      fr: "Deisy est CFO chez Iter Advisors. Elle accompagne des startups et PME sur le pilotage financier, la gestion de trésorerie et la préparation aux levées de fonds.",
      en: "Deisy is a CFO at Iter Advisors, supporting startups and SMEs on financial management, cash flow and fundraising preparation.",
      es: "Deisy es CFO en Iter Advisors y acompaña a startups y pymes en control financiero, gestión de tesorería y preparación para rondas de inversión.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Deisy intervient auprès de startups et PME en croissance pour structurer leur pilotage financier et les préparer aux étapes clés de leur développement. Ses missions couvrent la mise en place de tableaux de bord financiers, la construction de prévisionnels de trésorerie, l'analyse des marges et la préparation des dossiers d'investissement. Elle est spécialisée dans les secteurs SaaS et tech, où elle accompagne les fondateurs sur les métriques financières propres à ces modèles (ARR, CAC, LTV, unit economics). Deisy intervient également sur la structuration comptable et l'optimisation des process financiers, en s'appuyant sur les meilleurs outils du marché. Son approche pragmatique et orientée résultats lui permet d'être rapidement opérationnelle et d'apporter de la valeur dès les premières semaines de mission. Elle parle couramment français, espagnol et anglais.",
      en: "At Iter Advisors, Deisy works with growth-stage startups and SMEs to structure their financial management and prepare them for key milestones. Her engagements cover financial dashboard setup, cash flow forecasting, margin analysis and investor file preparation. She specialises in SaaS and tech sectors, guiding founders on financial metrics specific to these models (ARR, CAC, LTV, unit economics). Deisy also works on accounting structuring and financial process optimisation, leveraging best-in-class tools. Her pragmatic, results-oriented approach allows her to become operational quickly and deliver value from the first weeks of an engagement. She speaks fluent French, Spanish and English.",
      es: "En Iter Advisors, Deisy trabaja con startups y pymes en crecimiento para estructurar su control financiero y prepararlas para hitos clave. Sus misiones incluyen implementación de cuadros de mando financieros, previsiones de tesorería, análisis de márgenes y preparación de documentación para inversores. Está especializada en los sectores SaaS y tech, donde guía a los fundadores en las métricas financieras propias de estos modelos (ARR, CAC, LTV, unit economics). Habla con fluidez francés, español e inglés.",
    },
  },
  {
    id: 7,
    documentId: "sebastien-preel",
    firstName: "Sébastien",
    lastName: "Preel",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "sebastien-preel",
    photo: { url: "/images/team/sebastien-preel.webp" },
    linkedIn: "https://www.linkedin.com/in/spreel/",
    order: 7,
    showInHero: false,
    bio: {
      fr: "Sébastien est CFO chez Iter Advisors. Il accompagne PME et ETI sur la structuration financière, le contrôle de gestion et les opérations de M&A.",
      en: "Sébastien is a CFO at Iter Advisors, supporting SMEs and mid-caps on financial structuring, management control and M&A transactions.",
      es: "Sébastien es CFO en Iter Advisors y acompaña a pymes y medianas empresas en estructuración financiera, control de gestión y operaciones de M&A.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Sébastien intervient auprès de PME et ETI pour structurer leur direction financière, optimiser leur contrôle de gestion et les accompagner dans leurs opérations de croissance externe. Ses missions couvrent la mise en place de reporting de gestion, la construction de modèles financiers pour des opérations de M&A, l'analyse de la rentabilité par activité et la préparation des comités de direction. Il est spécialisé dans les secteurs industriels, de services et de distribution, où il apporte une vision financière structurée au service des décisions opérationnelles. Sébastien intervient également sur les due diligences financières (vendeur ou acquéreur), la valorisation d'entreprises et la négociation avec les partenaires financiers. Son expérience en finance d'entreprise lui permet d'identifier rapidement les leviers de performance et de les traduire en actions concrètes pour les dirigeants. Il parle couramment français et anglais.",
      en: "At Iter Advisors, Sébastien works with SMEs and mid-caps to structure their finance function, optimise management control and support their external growth transactions. His engagements cover management reporting setup, financial model building for M&A transactions, profitability analysis by business line and board preparation. He specialises in industrial, services and distribution sectors, bringing structured financial vision to operational decisions. Sébastien also works on financial due diligence (sell-side and buy-side), business valuation and negotiations with financial partners. His corporate finance experience allows him to quickly identify performance levers and translate them into concrete actions for management. He speaks fluent French and English.",
      es: "En Iter Advisors, Sébastien trabaja con pymes y medianas empresas para estructurar su dirección financiera, optimizar el control de gestión y acompañarlas en sus operaciones de crecimiento externo. Sus misiones cubren la implementación de reporting de gestión, la construcción de modelos financieros para operaciones de M&A, el análisis de rentabilidad por línea de negocio y la preparación de comités de dirección. Está especializado en los sectores industrial, de servicios y distribución. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 8,
    documentId: "tom-jaufre",
    firstName: "Tom",
    lastName: "Jaufre",
    roles: {
      fr: "CFO & M&A",
      en: "CFO & M&A",
      es: "CFO y M&A"
    },
    slug: "tom-jaufre",
    photo: { url: "/images/team/tom-jaufre.webp" },
    linkedIn: "https://www.linkedin.com/in/tom-jaufre-65904175/",
    order: 8,
    showInHero: false,
    bio: {
      fr: "Tom est CFO & M&A chez Iter Advisors. Spécialiste des opérations de cession-acquisition, il accompagne PME et scale-ups sur la structuration financière et les transactions de croissance externe.",
      en: "Tom is a CFO & M&A specialist at Iter Advisors, supporting SMEs and scale-ups on financial structuring and external growth transactions.",
      es: "Tom es CFO y M&A en Iter Advisors. Especialista en operaciones de compraventa, acompaña a pymes y scale-ups en estructuración financiera y transacciones de crecimiento externo.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Tom est le spécialiste des opérations M&A. Il intervient sur l'ensemble du cycle d'une transaction : de l'analyse stratégique initiale à la clôture finale, en passant par la due diligence financière, la valorisation et la négociation des termes. Ses missions couvrent aussi bien le conseil aux cédants (structuration de la cession, préparation de la data room, accompagnement des négociations) que l'accompagnement des acquéreurs (due diligence buy-side, analyse des synergies, modélisation du business plan post-acquisition). Au-delà des opérations M&A, Tom assure des missions de CFO externalisé pour des PME en croissance : reporting de gestion, pilotage de trésorerie, préparation aux levées de fonds et structuration des process financiers. Il est spécialisé dans les secteurs tech, services et industrie légère. Son approche combine rigueur financière et sens des affaires, avec une capacité à comprendre rapidement les enjeux spécifiques de chaque entreprise. Tom parle couramment français et anglais.",
      en: "At Iter Advisors, Tom is the M&A specialist. He is involved throughout the transaction cycle: from initial strategic analysis to final closing, through financial due diligence, valuation and term negotiation. His engagements cover vendor advisory (sale structuring, data room preparation, negotiation support) and buyer advisory (buy-side due diligence, synergy analysis, post-acquisition business plan modelling). Beyond M&A transactions, Tom provides fractional CFO services to growth-stage SMEs: management reporting, cash flow management, fundraising preparation and financial process structuring. He specialises in tech, services and light manufacturing sectors. His approach combines financial rigour with business acumen, with an ability to quickly grasp each company's specific challenges. Tom speaks fluent French and English.",
      es: "En Iter Advisors, Tom es el especialista en M&A. Interviene en todo el ciclo de una transacción: desde el análisis estratégico inicial hasta el cierre final, pasando por la due diligence financiera, la valoración y la negociación de términos. Sus misiones cubren tanto el asesoramiento al vendedor como al comprador. Más allá de las operaciones de M&A, Tom presta servicios de CFO externalizado para pymes en crecimiento: reporting de gestión, gestión de tesorería y preparación de rondas de financiación. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 9,
    documentId: "jessica-barnicaud",
    firstName: "Jessica",
    lastName: "Barnicaud",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "jessica-barnicaud",
    photo: { url: "/images/team/jessica-barnicaud.webp" },
    linkedIn: "https://www.linkedin.com/in/jessica-barnicaud/",
    order: 9,
    showInHero: false,
    bio: {
      fr: "Jessica est CFO chez Iter Advisors. Elle accompagne startups et PME sur le pilotage financier, la structuration des process comptables et la préparation aux levées de fonds.",
      en: "Jessica is a CFO at Iter Advisors, supporting startups and SMEs on financial management, accounting process structuring and fundraising preparation.",
      es: "Jessica es CFO en Iter Advisors y acompaña a startups y pymes en control financiero, estructuración de procesos contables y preparación para rondas de inversión.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Jessica accompagne startups et PME dans la structuration de leur fonction financière et la mise en place d'outils de pilotage adaptés à leur stade de développement. Ses missions couvrent la mise en place du reporting financier mensuel, la construction de prévisionnels de trésorerie, l'analyse des marges et des coûts, la sélection et l'implémentation d'outils comptables (Pennylane, QuickBooks, Xero) et la préparation des dossiers investisseurs. Elle est spécialisée dans les entreprises SaaS et tech à forte croissance, où elle aide les fondateurs à maîtriser leurs métriques financières et à construire une direction financière solide avant d'accélérer. Jessica travaille également sur la mise en conformité fiscale et sociale, la coordination avec les experts-comptables et la préparation aux due diligences. Son approche pédagogique et opérationnelle lui permet d'accompagner aussi bien des fondateurs non financiers que des équipes finance en cours de structuration. Elle parle couramment français et anglais.",
      en: "At Iter Advisors, Jessica supports startups and SMEs in structuring their finance function and implementing management tools suited to their stage of development. Her engagements cover monthly financial reporting, cash flow forecasting, margin and cost analysis, selection and implementation of accounting tools (Pennylane, QuickBooks, Xero) and investor file preparation. She specialises in high-growth SaaS and tech companies, where she helps founders master their financial metrics and build a solid finance function before accelerating. Jessica also works on tax and payroll compliance, coordination with external accountants and due diligence preparation. Her educational and operational approach allows her to work equally well with non-financial founders and finance teams in the process of structuring. She speaks fluent French and English.",
      es: "En Iter Advisors, Jessica acompaña a startups y pymes en la estructuración de su función financiera y la implementación de herramientas de control adaptadas a su etapa de desarrollo. Sus misiones cubren reporting financiero mensual, previsiones de tesorería, análisis de márgenes y costes, selección e implementación de herramientas contables y preparación de documentación para inversores. Está especializada en empresas SaaS y tech de alto crecimiento. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 10,
    documentId: "benjamin-carlot",
    firstName: "Benjamin",
    lastName: "Carlot",
    roles: {
      fr: "Head of Finance & Controlling",
      en: "Head of Finance & Controlling",
      es: "Jefe de Finanzas y Control"
    },
    slug: "benjamin-carlot",
    photo: { url: "/images/team/benjamin-carlot.webp" },
    linkedIn: "https://www.linkedin.com/in/benjamin-carlot-fractional-cfo-43303120/",
    order: 10,
    showInHero: false,
    bio: {
      fr: "Benjamin est Head of Finance & Controlling chez Iter Advisors. Il accompagne PME et scale-ups sur le contrôle de gestion, l'analyse de performance et la structuration des process finance.",
      en: "Benjamin is Head of Finance & Controlling at Iter Advisors, supporting SMEs and scale-ups on management control, performance analysis and finance process structuring.",
      es: "Benjamin es Jefe de Finanzas y Control en Iter Advisors y acompaña a pymes y scale-ups en control de gestión, análisis de rendimiento y estructuración de procesos financieros.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Benjamin pilote les missions de contrôle de gestion externalisé, accompagnant des PME et scale-ups dans la mise en place de systèmes de pilotage de la performance adaptés à leurs enjeux. Ses missions couvrent la construction de plans comptables analytiques, la mise en place d'outils de Business Intelligence (Power BI, Metabase, Google Looker), le suivi des KPIs par activité et la production de reportings mensuels et trimestriels à destination des équipes dirigeantes et des investisseurs. Benjamin est spécialisé dans les entreprises multi-entités et multi-pays, où la consolidation des données financières et la comparabilité des performances constituent un enjeu central. Il travaille également sur la structuration des processus budgétaires (budget annuel, forecasts glissants, analyse des écarts) et la mise en conformité des process de clôture. Son approche est systématique et orientée données : il construit des architectures financières qui permettent une prise de décision rapide et éclairée. Benjamin est certifié CFO à temps partagé et intervient principalement en France et en Belgique. Il parle couramment français et anglais.",
      en: "At Iter Advisors, Benjamin leads outsourced management control engagements, supporting SMEs and scale-ups in building performance management systems tailored to their needs. His work covers analytical chart of accounts structuring, Business Intelligence tool implementation (Power BI, Metabase, Google Looker), KPI tracking by business line and production of monthly and quarterly reports for management teams and investors. Benjamin specialises in multi-entity and multi-country companies, where financial data consolidation and performance comparability are central challenges. He also works on budgeting process structuring (annual budgets, rolling forecasts, variance analysis) and closing process optimisation. His approach is systematic and data-driven: he builds financial architectures that enable fast, informed decision-making. Benjamin holds a fractional CFO certification and works primarily in France and Belgium. He speaks fluent French and English.",
      es: "En Iter Advisors, Benjamin lidera los proyectos de control de gestión externalizado, apoyando a pymes y scale-ups en la construcción de sistemas de gestión del rendimiento. Sus misiones cubren estructuración de planes de cuentas analíticos, implementación de herramientas de Business Intelligence (Power BI, Metabase), seguimiento de KPIs y producción de informes mensuales y trimestrales. Está especializado en empresas multi-entidad y multi-país. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 11,
    documentId: "christophe-hoarau",
    firstName: "Christophe",
    lastName: "Hoarau",
    roles: {
      fr: "CFO & Data Officer",
      en: "CFO & Data Officer",
      es: "CFO y Oficial de Datos"
    },
    slug: "christophe-hoarau",
    photo: { url: "/images/team/christophe-hoarau.webp" },
    linkedIn: "https://www.linkedin.com/in/christophe-hoarau-2bb8b8ab/",
    order: 11,
    showInHero: false,
    bio: {
      fr: "Christophe est CFO & Data Officer chez Iter Advisors. Il combine expertise financière et maîtrise de la data pour accompagner PME et scale-ups sur le pilotage analytique et la Business Intelligence.",
      en: "Christophe is CFO & Data Officer at Iter Advisors, combining financial expertise and data mastery to support SMEs and scale-ups on analytical management and Business Intelligence.",
      es: "Christophe es CFO y Data Officer en Iter Advisors. Combina experiencia financiera y dominio de los datos para acompañar a pymes y scale-ups en el pilotaje analítico y la Business Intelligence.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Christophe incarne la convergence entre la finance et la data. Il accompagne PME et scale-ups dans la mise en place de systèmes de pilotage financier modernes, combinant les outils CFO traditionnels avec des solutions de Business Intelligence et d'automatisation de la donnée. Ses missions couvrent la construction d'architectures de données financières, l'implémentation de dashboards temps réel (Power BI, Tableau, Metabase), la mise en place de pipelines de données automatisés et la définition d'indicateurs financiers et opérationnels clés. Christophe intervient également comme CFO externalisé classique, assurant la trésorerie, le reporting de gestion et la préparation aux levées de fonds — mais avec une dimension data systématiquement intégrée qui accélère la prise de décision. Il est spécialisé dans les entreprises tech et marketplace, où la volumétrie des données transactionnelles est importante et où la réconciliation entre les métriques produit et les données financières constitue un enjeu central. Son approche : construire un système de mesure de la performance qui réconcilie la vision financière, la vision opérationnelle et la vision produit dans un tableau de bord unique. Christophe parle couramment français et anglais.",
      en: "At Iter Advisors, Christophe embodies the convergence of finance and data. He supports SMEs and scale-ups in building modern financial management systems, combining traditional CFO tools with Business Intelligence solutions and data automation. His work covers financial data architecture design, real-time dashboard implementation (Power BI, Tableau, Metabase), automated data pipeline setup and definition of key financial and operational indicators. Christophe also acts as a traditional fractional CFO, handling cash management, management reporting and fundraising preparation — but with a data dimension systematically integrated to accelerate decision-making. He specialises in tech and marketplace companies, where transactional data volumes are significant and reconciling product metrics with financial data is a central challenge. His approach: build a performance measurement system that reconciles the financial, operational and product view in a single dashboard. Christophe speaks fluent French and English.",
      es: "En Iter Advisors, Christophe encarna la convergencia entre las finanzas y los datos. Apoya a pymes y scale-ups en la construcción de sistemas modernos de gestión financiera, combinando herramientas CFO tradicionales con soluciones de Business Intelligence y automatización de datos. Sus misiones cubren diseño de arquitecturas de datos financieros, implementación de dashboards en tiempo real (Power BI, Tableau, Metabase) y definición de indicadores financieros y operativos clave. También actúa como CFO externalizado clásico, gestionando tesorería, reporting y preparación de rondas de financiación. Habla con fluidez francés e inglés.",
    },
  },

  // === Analysts ===
  {
    id: 12,
    documentId: "ornella-salgado",
    firstName: "Ornella",
    lastName: "Salgado",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "ornella-salgado",
    photo: { url: "/images/team/ornella-salgado.webp" },
    linkedIn: "https://www.linkedin.com/in/ornellaslgd/",
    order: 12,
    showInHero: false,
  },
  {
    id: 13,
    documentId: "pauline-mathieu",
    firstName: "Pauline",
    lastName: "Mathieu",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "pauline-mathieu",
    photo: { url: "/images/team/pauline-mathieu.webp" },
    linkedIn: "https://www.linkedin.com/in/pauline-mathieu-082488160/",
    order: 13,
    showInHero: false,
  },
  {
    id: 14,
    documentId: "alice-fumeron",
    firstName: "Alice",
    lastName: "Fumeron",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "alice-fumeron",
    photo: { url: "/images/team/alice-fumeron.webp" },
    linkedIn: "https://www.linkedin.com/in/alicefumeron/",
    order: 14,
    showInHero: false,
  },
  {
    id: 15,
    documentId: "carole-casse",
    firstName: "Carole",
    lastName: "Casse",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "carole-casse",
    photo: { url: "/images/team/carole-casse.webp" },
    linkedIn: "https://www.linkedin.com/in/carole-casse/",
    order: 15,
    showInHero: false,
  },
  {
    id: 16,
    documentId: "andress-ayme",
    firstName: "Andress",
    lastName: "Ayme",
    roles: {
      fr: "Intern Financial Analyst",
      en: "Intern Financial Analyst",
      es: "Analista Financiero Interno"
    },
    slug: "andress-ayme",
    photo: { url: "/images/team/andress-ayme.webp" },
    linkedIn: "https://www.linkedin.com/in/andress-ayme-089904276/",
    order: 16,
    showInHero: false,
  },
];

export function getTeamMembers(locale: Locale): StrapiTeamMember[] {
  return fallbackData.map((member) => ({
    ...member,
    title: `${member.firstName} ${member.lastName}`,
    role: member.roles[locale],
  })) as StrapiTeamMember[];
}

// Alias for backward compatibility
export const getFallbackTeamMembers = getTeamMembers;

/**
 * Locate a single team member by slug + return them with the locale's
 * role + bio resolved. Returns `null` if the slug is unknown OR if the
 * member has no bio for this locale (no point rendering an empty
 * author page).
 */
export function getTeamMemberBySlug(
  slug: string,
  locale: Locale,
): (StrapiTeamMember & { bio: string; h1Role?: string; bioExtended?: string }) | null {
  const member = fallbackData.find((m) => m.slug === slug);
  if (!member || !member.bio?.[locale]) return null;
  return {
    ...member,
    title: `${member.firstName} ${member.lastName}`,
    role: member.roles[locale],
    bio: member.bio[locale],
    h1Role: member.h1Roles?.[locale],
    bioExtended: member.bioExtended?.[locale],
  } as StrapiTeamMember & { bio: string; h1Role?: string; bioExtended?: string };
}

/**
 * Slugs that have a dedicated author page (i.e. have a bio in every
 * locale). Used by `generateStaticParams` and the sitemap.
 */
/**
 * Title et description d'une fiche de membre.
 *
 * SEO-AUD-0824 §8 (2026-08-24) — les onze fiches partageaient leur title entre
 * FR, EN et ES : il ne portait que le nom, identique par nature d'une langue à
 * l'autre. Le rôle, lui, est traduit — c'est donc lui qui distingue les trois
 * versions, et accessoirement ce qui rend le title informatif.
 *
 * SEO-REP §7 (2026-08-15) avait retiré ce rôle parce qu'il poussait les titles
 * à 63-71 caractères. On le remet, mais en cédant du terrain par étapes :
 * d'abord la marque, puis la partie du rôle qui suit le séparateur. Le nom
 * seul reste le dernier recours, jamais le premier choix.
 */
export function authorPageTitle(fullName: string, role: string): string {
  const suffixe = " | Iter Advisors";
  const court = role.split(/\s[-–&]\s|\s(?:y|e)\s/)[0].trim();
  const candidats = [
    `${fullName} — ${role}${suffixe}`,
    `${fullName} — ${role}`,
    `${fullName} — ${court}${suffixe}`,
    `${fullName} — ${court}`,
  ];
  return candidats.find((c) => c.length <= 60) ?? `${fullName}${suffixe}`;
}

/**
 * Description d'une fiche de membre, coupée sur une frontière de mot.
 *
 * `bio.slice(0, 160)` tranchait au caractère près, donc parfois au milieu d'un
 * mot — ce que le lecteur voit dans les résultats de recherche.
 */
export function authorPageDescription(bio: string): string {
  if (bio.length <= 160) return bio;
  const coupe = bio.slice(0, 157);
  const dernierEspace = coupe.lastIndexOf(" ");
  return `${coupe.slice(0, dernierEspace > 100 ? dernierEspace : 157).replace(/[,;:.\s]+$/, "")}…`;
}

export function getAuthorSlugs(): string[] {
  return fallbackData
    .filter((m) => m.bio && m.bio.fr && m.bio.en && m.bio.es)
    .map((m) => m.slug);
}
