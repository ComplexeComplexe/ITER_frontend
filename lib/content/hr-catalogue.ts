import type { Locale } from '@/lib/i18n';
/** Scope extracted from HR SERVICES (2).xlsx, February 2026. Pricing and
 * tier inclusion conflict across tabs, so neither is inferred here. */
export const HR_CATALOGUE = {
 fr: {
  title: 'Du diagnostic RH aux supports utilisés par vos équipes',
  intro: 'Le catalogue distingue le suivi récurrent des projets spécialisés. Le devis sélectionne les travaux utiles selon l’effectif, les pays, les ressources internes et les priorités. Il ne comprend pas automatiquement tous les services.',
  scope: 'Travaux possibles', output: 'Supports attendus',
  items: [
   ['Administration et coordination paie', 'Revue des dossiers salariés, calendrier RH, collecte des variables et contrôle avec le prestataire de paie.', 'Liste des documents à compléter, circuit de collecte des variables et calendrier de contrôle.'],
   ['Recrutement et intégration', 'Cadrage du poste avec le manager, sourcing, entretiens structurés et préparation de l’arrivée.', 'Fiche de poste, grille d’entretien, shortlist et suivi d’intégration à 30, 60 et 90 jours.'],
   ['Rémunération et organisation', 'Clarifier les rôles, les niveaux de rémunération, les variables et les avantages avec la direction financière.', 'Organigramme, répartition des responsabilités et grille de rémunération à discuter avec la direction.'],
   ['Développement et management', 'Organiser les entretiens, identifier les besoins de formation et préparer les échanges avec les managers.', 'Trames d’entretien, plan de formation et tableau de suivi des actions.'],
   ['Conformité et dialogue social', 'Organiser la revue des documents et les échanges avec les conseils compétents, en tenant compte du pays et de la situation de l’entreprise.', 'Calendrier des sujets à revoir, liste des documents et suivi des actions avec les responsables.'],
   ['SIRH et indicateurs', 'Définir les besoins avant de sélectionner ou déployer un outil et organiser les accès et données.', 'Cahier des charges, matrice des accès et indicateurs de turnover, d’absences ou de recrutement selon le besoin.'],
  ],
  separate: 'Projets à cadrer séparément',
  projects: 'Audit RH ciblé, due diligence sociale, volet RH d’une levée, remplacement temporaire de DRH ou formation d’une équipe RH interne. Le recrutement et un déploiement SIRH important peuvent nécessiter une mission distincte.',
  limits: 'La coordination paie ne signifie pas production automatique des bulletins. Les dossiers juridiques sensibles sont traités avec les conseils compétents. Les obligations et documents sont adaptés au pays concerné ; un CSE français ne se transpose pas à une équipe espagnole.',
 },
 en: {
  title: 'From an HR diagnostic to practical team resources',
  intro: 'The catalogue separates recurring support from specialist projects. The quote selects useful work based on headcount, countries, internal resources and priorities. It does not automatically include every service.',
  scope: 'Possible work', output: 'Expected resources',
  items: [
   ['HR administration and payroll coordination', 'Review employee records, plan the HR calendar, collect payroll inputs and check them with the payroll provider.', 'Document checklist, payroll input collection process and control calendar.'],
   ['Recruitment and onboarding', 'Define the role with the manager, source candidates, structure interviews and prepare their arrival.', 'Job description, interview scorecard, shortlist and onboarding follow-up at 30, 60 and 90 days.'],
   ['Compensation and organisation', 'Clarify roles, pay levels, variable compensation and benefits with finance leadership.', 'Organisation chart, responsibilities and pay framework to discuss with management.'],
   ['Development and management', 'Organise reviews, identify training needs and prepare discussions with managers.', 'Review templates, training plan and action tracker.'],
   ['Compliance and employee relations', 'Organise document review and discussions with qualified advisers, taking account of the country and the company’s circumstances.', 'Review calendar, document checklist and action tracker with named owners.'],
   ['HR systems and indicators', 'Define requirements before selecting or implementing software and organise access and data.', 'Requirements document, access matrix and turnover, absence or recruitment indicators as needed.'],
  ],
  separate: 'Projects scoped separately',
  projects: 'Targeted HR review, employment due diligence, HR work for a funding round, temporary HR director replacement or training for an internal HR team. Recruitment and a major HR system implementation may require a separate engagement.',
  limits: 'Payroll coordination does not automatically include payroll production. Sensitive legal matters involve qualified advisers. Local obligations and documents are adapted to the relevant country; the French CSE is not a Spanish employee representation arrangement.',
 },
 es: {
  title: 'Del diagnóstico de RRHH a los documentos de trabajo del equipo',
  intro: 'El catálogo separa el seguimiento recurrente de los proyectos especializados. El presupuesto selecciona los trabajos útiles según plantilla, países, recursos internos y prioridades. No incluye automáticamente todos los servicios.',
  scope: 'Trabajos posibles', output: 'Documentos previstos',
  items: [
   ['Administración y coordinación de nóminas', 'Revisar expedientes, organizar el calendario de RRHH, recopilar variables y comprobarlas con el proveedor de nóminas.', 'Lista de documentos pendientes, proceso de recopilación de variables y calendario de controles.'],
   ['Selección e incorporación', 'Definir el puesto con el responsable, buscar candidatos, organizar entrevistas y preparar la llegada.', 'Descripción de puesto, ficha de evaluación, selección final y seguimiento a los 30, 60 y 90 días.'],
   ['Retribución y organización', 'Precisar funciones, niveles salariales, variables y beneficios con la dirección financiera.', 'Organigrama, reparto de responsabilidades y marco retributivo para revisar con la dirección.'],
   ['Desarrollo y gestión de equipos', 'Organizar entrevistas, identificar necesidades de formación y preparar reuniones con los responsables.', 'Plantillas de entrevista, plan de formación y seguimiento de acciones.'],
   ['Cumplimiento y relaciones laborales', 'Organizar la revisión documental y los intercambios con asesores competentes, según el país y la situación de la empresa.', 'Calendario de revisión, lista de documentos y seguimiento de acciones con responsables.'],
   ['Sistemas e indicadores de RRHH', 'Definir requisitos antes de seleccionar o implantar una herramienta y organizar accesos y datos.', 'Documento de requisitos, matriz de accesos e indicadores de rotación, ausencias o selección según la necesidad.'],
  ],
  separate: 'Proyectos con alcance independiente',
  projects: 'Diagnóstico de RRHH, due diligence laboral, preparación del componente de RRHH de una ronda, sustitución temporal del director de RRHH o formación del equipo interno. La selección y una implantación importante de software pueden necesitar una misión separada.',
  limits: 'Coordinar nóminas no incluye automáticamente su elaboración. Los asuntos jurídicos sensibles se tratan con asesores competentes. Las obligaciones y documentos se adaptan al país; el CSE francés no se traslada a la representación de trabajadores en España.',
 },
} satisfies Record<Locale, { title: string; intro: string; scope: string; output: string; items: string[][]; separate: string; projects: string; limits: string }>;
export const HR_SERVICE_CATALOGUE_INDEX: Record<string, number> = {
 'gestion-paie-charges-sociales': 0,
 'recrutement-talent-acquisition': 1,
 'conformite-droit-travail': 4,
 'formation-developpement': 3,
};
