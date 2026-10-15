/** Build-time art direction. No network, renderer or image API in page renders. */
export const THUMBNAILS_ENABLED = true; // Set false and rebuild for an immediate legacy-image rollback.
export const THUMBNAIL_VERSION = 1;
export const THUMBNAIL_BRAND = { violet: '#4320c5', ink: '#20202b', muted: '#5b5b6b', accent: '#d8ef65', paper: '#f7f7fa', tint: '#f0edf9' };
export type ThumbnailCategory = 'corporate' | 'finance' | 'tax' | 'tools' | 'ai' | 'hr';
export type ThumbnailVariant = 'brand' | 'dashboard' | 'cash' | 'capital' | 'comparison' | 'treaty' | 'residence' | 'calculator' | 'stack' | 'invoice' | 'workflow' | 'review' | 'organisation' | 'recruitment';
export const CATEGORY_LABELS = {
  corporate: { fr: 'Iter Advisors', en: 'Iter Advisors', es: 'Iter Advisors' },
  finance: { fr: 'Direction financière', en: 'CFO insights', es: 'Dirección financiera' },
  tax: { fr: 'Fiscalité internationale', en: 'International tax', es: 'Fiscalidad internacional' },
  tools: { fr: 'Outils & méthodes', en: 'Tools & methods', es: 'Herramientas y métodos' },
  ai: { fr: 'IA & finance', en: 'AI & finance', es: 'IA y finanzas' },
  hr: { fr: 'Capital humain', en: 'People & organisation', es: 'Capital humano' },
};
export const DRAWING_ALTS = {
  brand: ['Identité visuelle Iter Advisors', 'Iter Advisors brand identity', 'Identidad visual de Iter Advisors'],
  dashboard: ['Tableau de pilotage financier illustratif', 'Illustrative financial dashboard', 'Cuadro de mando financiero ilustrativo'],
  cash: ['Schéma illustratif des flux de trésorerie', 'Illustrative cash-flow diagram', 'Diagrama ilustrativo de flujos de caja'],
  capital: ['Schéma illustratif de financement et de capital', 'Illustrative funding and capital diagram', 'Diagrama ilustrativo de financiación y capital'],
  comparison: ['Comparaison illustrée des systèmes fiscaux français et espagnol', 'Illustrated comparison of French and Spanish tax systems', 'Comparación ilustrada de los sistemas fiscales francés y español'],
  treaty: ['Schéma des revenus transfrontaliers et du traitement de la double imposition', 'Diagram of cross-border income and double-taxation treatment', 'Esquema de ingresos transfronterizos y tratamiento de la doble imposición'],
  residence: ['Schéma illustratif de résidence et de déclarations fiscales', 'Illustrative tax residence and tax filing diagram', 'Esquema ilustrativo de residencia y declaraciones fiscales'],
  calculator: ['Interface de calcul illustrée sans données réelles', 'Illustrative calculator interface without real data', 'Interfaz de cálculo ilustrativa sin datos reales'],
  stack: ['Schéma de comparaison et de connexion des outils financiers', 'Diagram comparing and connecting financial tools', 'Esquema de comparación y conexión de herramientas financieras'],
  invoice: ['Circuit illustré de traitement et de validation des factures', 'Illustrated invoice processing and validation flow', 'Flujo ilustrado de procesamiento y validación de facturas'],
  workflow: ['Workflow illustratif reliant données, automatisation et validation humaine', 'Illustrative workflow connecting data, automation and human review', 'Flujo ilustrativo que conecta datos, automatización y revisión humana'],
  review: ['Boucle illustrée de contrôle humain des automatisations financières', 'Illustrated human review loop for financial automation', 'Bucle ilustrado de revisión humana de automatizaciones financieras'],
  organisation: ['Organigramme illustratif des responsabilités RH', 'Illustrative HR responsibility organisation chart', 'Organigrama ilustrativo de responsabilidades de RR. HH.'],
  recruitment: ['Parcours illustratif de recrutement et d’intégration', 'Illustrative recruitment and onboarding journey', 'Recorrido ilustrativo de contratación e incorporación'],
} satisfies Record<ThumbnailVariant, string[]>;

// Decisions for strategic pages; extend with localized title/variant or preservation override.
export const THUMBNAIL_OVERRIDES: Record<string, { category?: ThumbnailCategory; variant?: ThumbnailVariant; title?: string; preserve?: boolean; square?: boolean }> = {
  '/': { category: 'corporate', variant: 'brand', title: 'Iter Advisors', square: true },
  '/en': { category: 'corporate', variant: 'brand', title: 'Iter Advisors', square: true },
  '/es': { category: 'corporate', variant: 'brand', title: 'Iter Advisors', square: true },
  '/daf-externalise': { category: 'finance', variant: 'dashboard', title: 'DAF externalisé', square: true },
  '/drh-externalise': { category: 'hr', variant: 'organisation', title: 'DRH externalisé', square: true },
  '/es/externalizacion-rrhh': {category:'hr',variant:'organisation',title:'Dirección de RR. HH. externa',square:true},
  '/ressources/ia-finance': {category:'ai',variant:'workflow',title:'IA et finance',square:true},
  '/en/resources/ai-finance/chatgpt-finance': {category:'ai',variant:'review',title:'ChatGPT for finance',square:true},
  '/ressources/outils/pennylane': {category:'tools',variant:'stack',title:'Pennylane : usages et limites',square:true},
  '/ressources/glossaire/besoin-fonds-roulement-bfr': {category:'tools',variant:'calculator',title:'BFR : comprendre le calcul',square:true},
  '/ressources/blog/regimes-fiscaux-france-vs-espagne': { category: 'tax', variant: 'comparison', title: 'Fiscalité France / Espagne', square: true },
  '/ressources/fiscalite/double-imposition-france-espagne': { category: 'tax', variant: 'treaty', title: 'Double imposition', square: true },
  '/ressources/fiscalite/impot-revenu-espagne': { category: 'tax', variant: 'residence', title: 'Impôt sur le revenu en Espagne', square: true },
};
const normal = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function classifyThumbnail(path: string, title: string): { category: ThumbnailCategory; variant: ThumbnailVariant } {
  const o = THUMBNAIL_OVERRIDES[path];
  if (o?.category && o.variant) return { category: o.category, variant: o.variant };
  const s = normal(path + ' ' + title);
  const p = normal(path);
  if (/^\/(en\/|es\/)?(daf|cfo|fractional-cfo|externalizacion-daf)/.test(p)) return { category:'finance', variant:/transition|transicion/.test(p)?'cash':'dashboard' };
  if (/\/ia-finance|\/ai-finance|artificial|automatis|automatiz|\bia\b|\bai\b/.test(s)) return { category: 'ai', variant: /risque|risk|riesgo|controle|control|audit/.test(s) ? 'review' : 'workflow' };
  if (/facturation-electronique|electronic-invoic|facturacion-electronica|e-reporting/.test(s)) return { category: 'tools', variant: 'invoice' };
  if (/fiscal|\/tax|beckham|impo[st]|impuest|irpf|modelo-720|tribut|taxation/.test(s)) return { category: 'tax', variant: /double|doble|convention|treaty/.test(s) ? 'treaty' : /compar|vs|regime/.test(s) ? 'comparison' : 'residence' };
  if (/cash-burn|cash-flow|flux-de-tresorerie|previsionnel-tresorerie|cash-forecast|prevision-tesoreria/.test(p)) return {category:'finance',variant:'cash'};
  if (/drh|rrhh|\bhr\b|rh-|human|humain|people|paie|payroll|nomina|talent|recrut|recruit|cumplimiento-laboral|formacion-desarrollo|conformite-droit-travail|formation-developpement/.test(s)) return { category: 'hr', variant: /recrut|recruit|contratacion|onboard|talent/.test(s) ? 'recruitment' : 'organisation' };
  if (/outil|herramient|\/tools|calcul|calculator|bfr|working.capital|capital-circulante|ratio|marge|margin/.test(s)) return { category: 'tools', variant: /calcul|calculator|bfr|capital-circulante|ratio|marge|margin/.test(s) ? 'calculator' : 'stack' };
  if (/term-sheet|bspce|incentivos-capital|equity-incentive/.test(s)) return { category:'finance', variant:'capital' };
  if (/daf|cfo|financ|comptab|account|contab|tresor|cash|tesorer|fund|fond|cap.table|report|budget|management-control/.test(s)) return { category: 'finance', variant: /cash|tresor|tesorer|runway|burn/.test(s) ? 'cash' : /fond|fund|capital|cap.table|bspce|dilut/.test(s) ? 'capital' : 'dashboard' };
  return { category: 'corporate', variant: 'brand' };
}
export function thumbnailExcluded(path: string): boolean {
  return /\/(a-propos|about|quienes-somos)\/|\/(cas-clients|case-studies|casos-clientes|casos-de-exito|usecases)(\/|$)|cas-etude-|case-study|caso-happy-scribe|\/jobs|\/empleos|\/legal|aviso-legal|mentions-legales|privacy|politique-|politica-|cookie|confidentialite|\/contact$/.test(path);
}
export function shortThumbnailTitle(title: string): string {
  const value = title.replace(/\s*[|]\s*Iter Advisors.*$/i, '').replace(/\s*[-–]\s*Iter Advisors.*$/i, '').trim();
  if (value.length <= 65) return value;
  const clause = value.split(/[:?—]/)[0].trim();
  if (clause.length >= 15 && clause.length <= 65) return clause;
  return value.slice(0, 62).replace(/\s+\S*$/, '') + '…';
}
