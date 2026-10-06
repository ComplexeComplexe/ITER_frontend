import content from './electronic-invoicing.json';
import routes from './electronic-invoicing-routes.json';
import type { Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

export type InvoicePageKey = keyof typeof routes;
export const INVOICE_ROUTES = routes;
export const INVOICE_DATE = '2026-10-06';
export const INVOICE_TIMESTAMP = '2026-10-06T00:00:00+02:00';
export interface InvoiceSection {
  id: string; title: string; paragraphs: string[]; bullets: string[];
  table: { headers: string[]; rows: string[][] } | null;
  sources: string[]; links: string[];
}
export interface InvoiceContent {
  title: string; seoTitle: string; answer: string; quote: string; summary: string[];
  sections: InvoiceSection[]; faq: { question: string; answer: string }[];
}
export function getInvoiceContent(key: InvoicePageKey, locale: Locale): InvoiceContent { return content[locale][key]; }
export function invoiceMetadata(key: InvoicePageKey, locale: Locale) {
  const page = getInvoiceContent(key, locale);
  return buildMetadata({ locale, title: `${page.seoTitle} | Iter Advisors`, description: page.answer.split('. ')[0] + '.', path: routes[key][locale], localizedPaths: routes[key] });
}
export const INVOICE_UI = {
  fr: { resources: 'Ressources', topic: 'Facturation électronique', country: 'Réforme française · Point de vue CFO', by: 'À partir des réponses de', role: 'Associé fondateur et DAF', date: 'Sources vérifiées le 6 octobre 2026', toc: 'Dans ce guide', sources: 'Sources et références', next: 'Pour approfondir', faq: 'Questions fréquentes', back: 'Revenir au guide des obligations', contact: 'Parler de vos flux de facturation', scope: 'Décrivez vos outils, vos entités et les flux à préparer. Nous préciserons ensemble le périmètre d’intervention.', services: 'Coordination comptable', cfo: 'Pilotage financier', tools: 'Lire notre avis Pennylane', checklist: 'Télécharger la checklist de déploiement (CSV)', quote: 'Sébastien Doat, DAF', translated: '', related: 'Préparer le déploiement de votre PME', intro: 'Calendrier, données, plateformes et contrôles : une méthode CFO pour la réforme française.', card: 'Explorer le guide facturation électronique' },
  en: { resources: 'Resources', topic: 'Electronic invoicing', country: 'French reform · CFO perspective', by: 'Based on answers from', role: 'Founding partner and CFO', date: 'Sources checked on 6 October 2026', toc: 'In this guide', sources: 'Sources and references', next: 'Explore further', faq: 'Frequently asked questions', back: 'Back to the requirements guide', contact: 'Discuss your invoicing flows', scope: 'Describe your systems, entities and flows. We will agree the scope of support together.', services: 'Accounting coordination', cfo: 'Financial management', tools: 'Read our Pennylane review', checklist: 'Download the implementation checklist (CSV)', quote: 'Sébastien Doat, CFO', translated: 'Translated from French', related: 'Prepare your SME implementation', intro: 'Timeline, data, platforms and controls: a CFO method for the French reform.', card: 'Explore the electronic-invoicing guide' },
  es: { resources: 'Recursos', topic: 'Facturación electrónica', country: 'Reforma francesa · Perspectiva CFO', by: 'A partir de las respuestas de', role: 'Socio fundador y CFO', date: 'Fuentes verificadas el 6 de octubre de 2026', toc: 'En esta guía', sources: 'Fuentes y referencias', next: 'Profundizar', faq: 'Preguntas frecuentes', back: 'Volver a la guía de obligaciones', contact: 'Hablar de sus flujos de facturación', scope: 'Describa sistemas, entidades y flujos. Acordaremos juntos el alcance del acompañamiento.', services: 'Coordinación contable', cfo: 'Dirección financiera', tools: 'Leer nuestra opinión sobre Pennylane', checklist: 'Descargar checklist de implantación (CSV)', quote: 'Sébastien Doat, CFO', translated: 'Traducido del francés', related: 'Preparar la implantación en su pyme', intro: 'Calendario, datos, plataformas y controles: un método CFO para la reforma francesa.', card: 'Explorar la guía de facturación electrónica' },
} as const;
export const INVOICE_SOURCES: Record<string, { url: string; publisher: string; label: Record<Locale, string> }> = {
 calendar: { url: 'https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation', publisher: 'DGFiP', label: { fr: 'Calendrier de la réforme', en: 'Reform timeline', es: 'Calendario de la reforma' } },
 scope: { url: 'https://www.impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique', publisher: 'DGFiP', label: { fr: 'Périmètre de la réforme', en: 'Reform scope', es: 'Ámbito de la reforma' } },
 platforms: { url: 'https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees', publisher: 'DGFiP', label: { fr: 'Rôle des plateformes agréées', en: 'Approved-platform functions', es: 'Funciones de las plataformas autorizadas' } },
 approved: { url: 'https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees', publisher: 'DGFiP', label: { fr: 'Liste officielle des plateformes', en: 'Official platform list', es: 'Lista oficial de plataformas' } },
 payment: { url: 'https://bofip.impots.gouv.fr/bofip/13901-PGP.html/identifiant%3DBOI-TVA-DECLA-20-30-60-20260930', publisher: 'BOFiP', label: { fr: 'Règles de transmission des paiements', en: 'Payment-data submission rules', es: 'Reglas de transmisión de pagos' } },
 paymentData: { url: 'https://www.impots.gouv.fr/e-reporting-donnees-de-paiement', publisher: 'DGFiP', label: { fr: 'Données de paiement à transmettre', en: 'Payment data to submit', es: 'Datos de pago a transmitir' } },
 formats: { url: 'https://fnfe-mpe.org/factur-x/factur-x_en/', publisher: 'FNFE-MPE', label: { fr: 'Standard Factur-X', en: 'Factur-X standard', es: 'Estándar Factur-X' } },
 validation: { url: 'https://fnfe-mpe.org/factur-x/implementer-factur-x/', publisher: 'FNFE-MPE', label: { fr: 'Implémenter et contrôler Factur-X', en: 'Implement and validate Factur-X', es: 'Implantar y validar Factur-X' } },
};
