import type { Locale } from '@/lib/i18n';

/** Commercial figures confirmed by Guillaume on 3 October 2026. */
export const HR_COMMERCIAL_TERMS = {
  confirmedAt: '2026-10-03', currency: 'EUR', vatIncluded: false,
  light: { minDays: 1, maxDays: 2, from: 1800 },
  regular: { minDays: 3, maxDays: 4, min: 3200, max: 4800 },
  employeeFrance: { min: 90000, max: 140000, basis: 'annual-gross-salary' },
} as const;

interface CommercialCopy {
  budget: string;
  updated: string;
  contactTitle: string;
  contactText: string;
  pillarsTitle: string;
  pillarsIntro: string;
  pillars: { title: string; text: string; output: string; href: string; link: string }[];
  output: string;
  comparisonTitle: string;
  comparisonIntro: string;
  headers: string[];
  comparison: string[][];
  salaryNote: string;
  legalSource: string;
  priceTitle: string;
  priceIntro: string;
  priceLabels: [string, string, string];
  priceScopes: [string, string, string];
  priceNote: string;
  priceUnit: string;
  priceFaq: string;
  project: string;
  request: string;
  countriesTitle: string;
  countriesIntro: string;
  countries: [string, string][];
  beckham: string;
  toolsTitle: string;
  toolsIntro: string;
  toolUses: Record<string, string>;
  toolsLink: string;
}
export const HR_COMMERCIAL_COPY = {
  fr: {
    budget: 'Sur devis, selon le périmètre et la disponibilité attendue',
    updated: 'Mis à jour le',
    contactTitle: 'Quelles priorités RH souhaitez-vous traiter ?',
    contactText: 'Présentez vos équipes, les sujets ouverts et les échéances. Le premier échange permet de préciser les travaux utiles, les responsabilités et le rythme.',
    pillarsTitle: 'Quatre piliers pour structurer votre fonction RH',
    pillarsIntro: 'La mission part de vos sujets concrets. Les travaux sont choisis avec le dirigeant, les managers et les prestataires concernés.',
    output: 'Exemple de livrable',
    pillars: [
      { title: 'Conformité et dialogue social', text: 'Organiser le calendrier RH, identifier les documents à revoir et préparer le suivi des sujets CSE lorsque votre situation le nécessite. Les décisions et validations juridiques restent cadrées avec les professionnels compétents.', output: 'Un calendrier des échéances, des points ouverts et des responsables.', href: '/services/conformite-droit-travail', link: 'Conformité et relations sociales' },
      { title: 'Recrutement et onboarding', text: 'Clarifier les postes, les critères de sélection et le budget avant de recruter. Préparer les étapes d’arrivée, les interlocuteurs et les points de suivi pour que les managers sachent comment intégrer une nouvelle personne.', output: 'Une fiche de poste, un circuit de sélection et un parcours d’intégration.', href: '/services/recrutement-talent-acquisition', link: 'Recrutement et intégration' },
      { title: 'Rémunération et intéressement', text: 'Relier les décisions de salaire, les variables et les avantages au budget et aux responsabilités. Les dispositifs d’actionnariat ou d’equity sont préparés avec la direction financière et validés par les conseils compétents.', output: 'Une grille de rémunération et des options d’arbitrage documentées.', href: '/daf-externalise', link: 'Coordonner RH et direction financière' },
      { title: 'Rituels et pratiques managériales', text: 'Mettre en place des entretiens, des points d’équipe et des repères de rôle adaptés à votre organisation. Identifier les besoins de formation et suivre les actions convenues avec les managers.', output: 'Des trames d’entretien, un calendrier de suivi et un plan de formation.', href: '/services/formation-developpement', link: 'Formation et développement' },
    ],
    comparisonTitle: 'DRH interne, DRH externalisé, avocat ou gestionnaire de paie ?',
    comparisonIntro: 'Ces intervenants sont complémentaires. Choisissez selon le travail à réaliser, le temps de présence et les responsabilités attendues.',
    headers: ['Intervenant', 'Besoin couvert', 'Quand le choisir', 'Repère de coût'],
    comparison: [
      ['DRH interne en CDI', 'Direction RH intégrée et présence quotidienne.', 'Un besoin durable qui justifie un poste à temps plein.', '90 000 à 140 000 € brut / an en France, hors charges employeur.'],
      ['DRH externalisé Iter', 'Pilotage RH, organisation et coordination dans le périmètre convenu.', 'Des priorités récurrentes, avec un rythme défini et des relais internes.', 'Sur devis selon le périmètre, le rythme et la disponibilité attendue.'],
      ['Avocat en droit social', 'Conseil juridique spécialisé et accompagnement des situations sensibles.', 'Une question de droit ou un dossier qui nécessite un conseil juridique.', 'Honoraires définis dans une convention avec votre avocat.'],
      ['Gestionnaire ou prestataire de paie', 'Production des bulletins et déclarations selon le contrat.', 'Une production de paie à organiser ou à confier à un spécialiste.', 'Devis selon les bulletins, les établissements et les prestations.'],
    ],
    salaryNote: 'Le salaire brut est un repère indicatif communiqué par Iter pour un DRH en France, pas le coût employeur complet. Il dépend du poste et du contexte ; ce n’est pas une moyenne de marché issue d’une étude de rémunération. Comparez des fonctions, des responsabilités et des disponibilités équivalentes. Les honoraires d’une mission à temps partagé ne couvrent pas la même disponibilité qu’un CDI ; cette comparaison ne démontre pas un pourcentage d’économie.',
    legalSource: 'Comprendre la fixation des honoraires d’avocat',
    priceTitle: 'Tarifs indicatifs du DRH externalisé Iter',
    priceIntro: 'Le rythme donne un premier repère. Les livrables, les interlocuteurs et la disponibilité attendue déterminent le devis.',
    priceLabels: ['1 à 2 jours par mois', '3 à 4 jours par mois', 'Mission ponctuelle ou forfait'],
    priceScopes: ['Pour un suivi ciblé des priorités RH avec des relais dans votre équipe.', 'Pour un travail régulier avec le dirigeant et les managers sur plusieurs sujets.', 'Pour un besoin délimité : recrutement, organisation ou diagnostic RH.'],
    priceNote: 'Montants mensuels indicatifs en euros HT, hors TVA. Le tarif dépend du périmètre, du rythme et des modalités convenues ; la préparation, les déplacements et les demandes supplémentaires sont précisés dans le devis.',
    priceUnit: 'HT / mois',
    priceFaq: 'Pour un rythme indicatif de 3 à 4 jours par mois, la fourchette est de 3 200 à 4 800 € HT par mois. Le format de 1 à 2 jours par mois est chiffré sur devis. Une mission ponctuelle ou au forfait est chiffrée sur devis. Le périmètre, la disponibilité, les livrables et les frais éventuels sont précisés dans la proposition.',
    project: 'Sur devis', request: 'Cadrer mon budget RH',
    countriesTitle: 'France et Espagne : organiser les sujets RH entre Paris et Barcelone',
    countriesIntro: 'Une équipe répartie entre deux pays demande de préciser qui emploie les collaborateurs, qui produit la paie et qui valide les obligations locales. Le cadrage tient compte des entités, des langues et des intervenants disponibles.',
    countries: [
      ['Contrats et responsabilités locales', 'Identifier l’employeur, les documents nécessaires et les professionnels chargés de valider le cadre applicable dans chaque pays.'],
      ['Paie et mobilité', 'Organiser les données et les échanges avec les prestataires locaux. La mission RH ne remplace pas la production de paie ni une expertise fiscale transfrontalière.'],
      ['Impatriation et situation personnelle', 'Coordonner, lorsque nécessaire, les sujets de mobilité avec les conseils fiscaux. L’éligibilité à un régime comme la loi Beckham se vérifie individuellement.'],
    ],
    beckham: 'Comprendre la loi Beckham en Espagne',
    toolsTitle: 'Choisir les outils RH après avoir défini les processus',
    toolsIntro: 'Le logiciel doit servir votre organisation. Examinez les modules, les droits, les interfaces et les exports avec votre prestataire de paie. La présence d’un outil ici ne signifie pas partenariat ou certification.',
    toolUses: { payfit: 'Paie et collecte des variables.', lucca: 'Données RH, absences et flux vers la paie.', factorial: 'Organisation des données et processus RH.', silae: 'Production de paie avec votre prestataire.' },
    toolsLink: 'Explorer les critères de choix des outils financiers et RH',
  },
  en: {
    budget: 'By quotation, depending on scope and availability required',
    updated: 'Updated on',
    contactTitle: 'Which HR priorities do you need to address?',
    contactText: 'Describe your teams, open issues and deadlines. The initial conversation clarifies useful work, responsibilities and the schedule.',
    pillarsTitle: 'Four areas to structure your HR function',
    pillarsIntro: 'The engagement starts with your practical needs. Work is agreed with the business leader, managers and relevant providers.', output: 'Example deliverable',
    pillars: [
      { title: 'Compliance and employee relations', text: 'Organise the HR calendar, identify documents to review and prepare employee-representation matters, including the French CSE where relevant. Legal decisions and validation are agreed with qualified professionals.', output: 'A calendar of deadlines, open issues and owners.', href: '/services/conformite-droit-travail', link: 'Compliance and employee relations' },
      { title: 'Recruitment and onboarding', text: 'Clarify roles, selection criteria and budget before hiring. Plan arrival steps, contacts and follow-up so managers know how to integrate a new colleague.', output: 'A job description, selection process and onboarding plan.', href: '/services/recrutement-talent-acquisition', link: 'Recruitment and onboarding' },
      { title: 'Pay and incentives', text: 'Connect salary, variable pay and benefits decisions to budget and responsibilities. Equity arrangements are prepared with finance leadership and validated by the appropriate advisers.', output: 'A pay framework and documented decision options.', href: '/daf-externalise', link: 'Coordinate HR and finance leadership' },
      { title: 'Management routines', text: 'Set up reviews, team meetings and clear responsibilities suited to your organisation. Identify training needs and follow up on actions agreed with managers.', output: 'Review templates, a follow-up calendar and a training plan.', href: '/services/formation-developpement', link: 'Training and development' },
    ],
    comparisonTitle: 'In-house HR director, external HR director, lawyer or payroll provider?',
    comparisonIntro: 'These professionals are complementary. Choose according to the work, availability and responsibilities required.', headers: ['Professional', 'Scope', 'When to choose', 'Cost reference'],
    comparison: [
      ['In-house HR director', 'Integrated HR leadership and daily presence.', 'A lasting need that justifies a full-time position.', '€90,000 to €140,000 gross annual salary in France, excluding employer contributions.'],
      ['Iter external HR director', 'HR leadership, organisation and coordination within the agreed scope.', 'Recurring priorities, with an agreed schedule and internal contacts.', 'By quotation, based on scope, schedule and availability required.'],
      ['Employment lawyer', 'Specialist legal advice and support for sensitive situations.', 'A legal question or matter requiring legal counsel.', 'Fees set out in an agreement with your lawyer.'],
      ['Payroll professional or provider', 'Payroll production and filings according to the contract.', 'Payroll production to organise or assign to a specialist.', 'Quote based on payslips, establishments and services.'],
    ],
    salaryNote: 'The gross salary is an indicative reference supplied by Iter for a role in France, not total employment cost. It depends on the position and context; it is not a market average from a salary survey. Compare equivalent roles, responsibilities and availability. Part-time engagement fees do not cover the same availability as a full-time employee; this comparison does not establish a percentage saving.', legalSource: 'Understand how lawyer fees are agreed',
    priceTitle: 'Indicative fees for Iter external HR leadership', priceIntro: 'The schedule gives an initial reference. Deliverables, contacts and expected availability determine the quote.',
    priceLabels: ['1 to 2 days per month', '3 to 4 days per month', 'One-off engagement or fixed scope'], priceScopes: ['Targeted follow-up of HR priorities with internal contacts in your team.', 'Regular work with the leader and managers across several topics.', 'A defined need such as recruitment, organisation or an HR diagnostic.'],
    priceNote: 'Indicative monthly amounts in euros excluding VAT. Fees depend on scope, schedule and agreed arrangements; preparation, travel and additional requests are specified in the quote.', priceUnit: 'excluding VAT / month', priceFaq: 'For an indicative schedule of 3 to 4 days per month, the range is €3,200 to €4,800 per month excluding VAT. The 1 to 2 day monthly format is quoted individually. One-off or fixed-scope work is quoted separately. Scope, availability, deliverables and any additional expenses are specified in the proposal.', project: 'By quotation', request: 'Define my HR budget',
    countriesTitle: 'France and Spain: coordinate HR between Paris and Barcelona', countriesIntro: 'Teams across two countries require clarity on the employer, payroll production and local compliance. Scoping considers entities, languages and available professionals.',
    countries: [['Local contracts and responsibilities', 'Identify the employer, necessary documents and the professionals validating the applicable framework in each country.'], ['Payroll and mobility', 'Organise information and exchanges with local providers. HR leadership does not replace payroll production or specialist cross-border tax advice.'], ['Relocation and individual circumstances', 'Coordinate mobility matters with tax advisers where needed. Eligibility for a regime such as Spain’s Beckham Law is assessed individually.']], beckham: 'Understand Spain’s Beckham Law',
    toolsTitle: 'Choose HR software after defining the processes', toolsIntro: 'Software should serve your organisation. Examine modules, permissions, interfaces and exports with your payroll provider. Listing a tool does not imply partnership or certification.',
    toolUses: { payfit: 'Payroll and input collection.', lucca: 'HR data, absences and payroll inputs.', factorial: 'HR data and process organisation.', silae: 'Payroll production with your provider.' }, toolsLink: 'Explore finance and HR software selection criteria',
  },
  es: {
    budget: 'Según presupuesto, alcance y disponibilidad necesaria',
    updated: 'Actualizado el',
    contactTitle: '¿Qué prioridades de RRHH necesita abordar?',
    contactText: 'Describa sus equipos, los asuntos abiertos y los plazos. La primera conversación precisa el trabajo útil, las responsabilidades y la dedicación.',
    pillarsTitle: 'Cuatro áreas para estructurar su función de RRHH', pillarsIntro: 'La misión parte de sus necesidades concretas. Los trabajos se acuerdan con la dirección, los responsables de equipos y los proveedores implicados.', output: 'Ejemplo de entregable',
    pillars: [
      { title: 'Cumplimiento y relaciones laborales', text: 'Organizar el calendario de RRHH, identificar documentos que revisar y preparar los asuntos de representación del personal, incluido el CSE francés cuando corresponda. Las decisiones y validaciones jurídicas se delimitan con profesionales competentes.', output: 'Un calendario de plazos, asuntos abiertos y responsables.', href: '/services/conformite-droit-travail', link: 'Cumplimiento y relaciones laborales' },
      { title: 'Contratación e incorporación', text: 'Precisar puestos, criterios de selección y presupuesto antes de contratar. Preparar las etapas de llegada, interlocutores y seguimiento para que los responsables sepan cómo integrar a una nueva persona.', output: 'Una descripción de puesto, un proceso de selección y un plan de incorporación.', href: '/services/recrutement-talent-acquisition', link: 'Contratación e incorporación' },
      { title: 'Retribución e incentivos', text: 'Relacionar las decisiones salariales, variables y beneficios con el presupuesto y las responsabilidades. Los planes de participación en el capital se preparan con la dirección financiera y se validan con los asesores competentes.', output: 'Un marco retributivo y opciones de decisión documentadas.', href: '/daf-externalise', link: 'Coordinar RRHH y dirección financiera' },
      { title: 'Rutinas de gestión de equipos', text: 'Organizar entrevistas, reuniones de equipo y responsabilidades adaptadas a su organización. Identificar necesidades de formación y seguir las acciones acordadas con los responsables.', output: 'Plantillas de entrevista, un calendario de seguimiento y un plan de formación.', href: '/services/formation-developpement', link: 'Formación y desarrollo' },
    ],
    comparisonTitle: '¿Director de RRHH interno, externo, abogado o proveedor de nóminas?', comparisonIntro: 'Estos profesionales son complementarios. Elija según el trabajo, la dedicación y las responsabilidades necesarias.', headers: ['Profesional', 'Alcance', 'Cuándo elegirlo', 'Referencia de coste'],
    comparison: [
      ['Director de RRHH interno', 'Dirección de RRHH integrada y presencia diaria.', 'Una necesidad estable que justifica un puesto a jornada completa.', '90.000 a 140.000 € brutos anuales en Francia, sin cotizaciones empresariales.'],
      ['Director de RRHH externo Iter', 'Dirección, organización y coordinación de RRHH dentro del alcance acordado.', 'Prioridades recurrentes, con dedicación acordada e interlocutores internos.', 'Según presupuesto, alcance, dedicación y disponibilidad necesaria.'],
      ['Abogado laboralista', 'Asesoramiento jurídico especializado y apoyo en situaciones sensibles.', 'Una consulta o un expediente que requiere asesoramiento jurídico.', 'Honorarios acordados con su abogado.'],
      ['Profesional o proveedor de nóminas', 'Elaboración de nóminas y declaraciones según contrato.', 'Una producción de nóminas que organizar o confiar a un especialista.', 'Presupuesto según nóminas, establecimientos y prestaciones.'],
    ],
    salaryNote: 'El salario bruto es una referencia orientativa facilitada por Iter para un puesto en Francia, no el coste empresarial total. Depende del puesto y del contexto; no es una media de mercado procedente de un estudio salarial. Compare puestos, responsabilidades y disponibilidad equivalentes. Los honorarios a tiempo parcial no cubren la misma disponibilidad que un empleado a jornada completa; la comparación no acredita un porcentaje de ahorro.', legalSource: 'Comprender cómo se acuerdan los honorarios de abogados en Francia',
    priceTitle: 'Honorarios orientativos de dirección de RRHH externa Iter', priceIntro: 'La dedicación ofrece una primera referencia. Los entregables, interlocutores y disponibilidad esperada determinan el presupuesto.',
    priceLabels: ['1 a 2 días al mes', '3 a 4 días al mes', 'Misión puntual o alcance cerrado'], priceScopes: ['Seguimiento de prioridades concretas de RRHH con interlocutores en su equipo.', 'Trabajo regular con la dirección y los responsables sobre varios asuntos.', 'Una necesidad delimitada: contratación, organización o diagnóstico de RRHH.'],
    priceNote: 'Importes mensuales orientativos en euros sin IVA. Los honorarios dependen del alcance, dedicación y condiciones acordadas; preparación, desplazamientos y solicitudes adicionales se precisan en el presupuesto.', priceUnit: 'sin IVA / mes', priceFaq: 'Para una dedicación orientativa de 3 a 4 días al mes, la horquilla es de 3.200 a 4.800 € al mes sin IVA. El formato de 1 a 2 días al mes se presupuesta individualmente. Las misiones puntuales o de alcance cerrado se presupuestan por separado. La propuesta precisa alcance, disponibilidad, entregables y posibles gastos adicionales.', project: 'Según presupuesto', request: 'Definir mi presupuesto de RRHH',
    countriesTitle: 'Francia y España: coordinar RRHH entre París y Barcelona', countriesIntro: 'Un equipo repartido entre dos países necesita precisar el empleador, la producción de nóminas y la validación de las obligaciones locales. El alcance considera entidades, idiomas y profesionales disponibles.',
    countries: [['Contratos y responsabilidades locales', 'Identificar el empleador, los documentos necesarios y los profesionales que validan el marco aplicable en cada país.'], ['Nóminas y movilidad', 'Organizar la información y los intercambios con proveedores locales. La dirección de RRHH no sustituye la elaboración de nóminas ni el asesoramiento fiscal transfronterizo.'], ['Traslado y situación individual', 'Coordinar la movilidad con asesores fiscales cuando proceda. La elegibilidad para un régimen como la ley Beckham se analiza individualmente.']], beckham: 'Comprender la ley Beckham en España',
    toolsTitle: 'Elegir herramientas de RRHH después de definir los procesos', toolsIntro: 'El software debe servir a su organización. Examine módulos, permisos, interfaces y exportaciones con su proveedor de nóminas. Mencionar una herramienta no implica alianza ni certificación.',
    toolUses: { payfit: 'Nóminas y recogida de variables.', lucca: 'Datos de RRHH, ausencias e información para nóminas.', factorial: 'Organización de datos y procesos de RRHH.', silae: 'Producción de nóminas con su proveedor.' }, toolsLink: 'Explorar criterios de selección de software financiero y de RRHH',
  },
} satisfies Record<Locale, CommercialCopy>;

export function hrOfferCatalog(locale: Locale) {
  const c = HR_COMMERCIAL_COPY[locale];
  return {
    '@type': 'OfferCatalog', name: c.priceTitle,
    itemListElement: [
      { '@type': 'Offer', name: c.priceLabels[0], description: `${c.priceScopes[0]} ${c.project}.` },
      { '@type': 'Offer', name: c.priceLabels[1], description: c.priceScopes[1], priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: HR_COMMERCIAL_TERMS.regular.min, maxPrice: HR_COMMERCIAL_TERMS.regular.max, priceCurrency: 'EUR', valueAddedTaxIncluded: false, unitText: locale === 'fr' ? 'mois' : locale === 'en' ? 'month' : 'mes' } },
      { '@type': 'Offer', name: c.priceLabels[2], description: `${c.priceScopes[2]} ${c.project}.` },
    ],
  };
}
