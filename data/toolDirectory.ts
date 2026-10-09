import type { Locale } from '@/lib/i18n';
import { tools } from './tools';
import { descriptions } from './toolSummaries';
export const TOOL_CATEGORY_LABELS = {
  fr: { comptabilite: 'Comptabilité', tresorerie: 'Trésorerie', depenses: 'Dépenses et banque', paie: 'Paie', sirh: 'RH', reporting: 'Reporting', recouvrement: 'Recouvrement', equity: 'Actionnariat' },
  en: { comptabilite: 'Accounting', tresorerie: 'Treasury', depenses: 'Expenses and banking', paie: 'Payroll', sirh: 'HR', reporting: 'Reporting', recouvrement: 'Collections', equity: 'Equity' },
  es: { comptabilite: 'Contabilidad', tresorerie: 'Tesorería', depenses: 'Gastos y banca', paie: 'Nómina', sirh: 'RR. HH.', reporting: 'Reporting', recouvrement: 'Cobros', equity: 'Accionariado' },
};
const aliases = { comptabilite: 'accounting contabilidad facturation facturacion invoice compta', tresorerie: 'cash treasury tesoreria trésorerie prévision prevision forecast', depenses: 'notes de frais expense gastos cartes cards tarjetas banque bank banca paiement pago', paie: 'payroll nomina nómina salaire salary', sirh: 'hr rrhh ressources humaines personnel', reporting: 'bi dashboard tableau de bord cuadro mando', recouvrement: 'collection cobros relances factures client receivables', equity: 'cap table bspce accionariado capital dilution' };
export function getToolDirectory(locale: Locale) {
  const index = { fr: 0, en: 1, es: 2 }[locale];
  const directory = tools.map(tool => ({ slug: tool.slug, name: tool.name, logo: tool.logo, category: tool.category, description: descriptions[tool.slug][index], searchTerms: aliases[tool.category] }));
  return [...directory, { slug: "malibou", name: "malibou", logo: "", category: "paie" as const, description: ["Paie accompagnée et SIRH : analyse documentaire.", "Supported payroll and HR software: documentary analysis.", "Nómina acompañada y software de RRHH: análisis documental."][index], searchTerms: aliases.paie }];
}
