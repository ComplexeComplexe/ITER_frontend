import content from './electronic-invoicing.json';
import routes from './electronic-invoicing-routes.json';
import type { Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export type InvoicePageKey = keyof typeof routes;
export const INVOICE_ROUTES = routes;
export const INVOICE_DATE = '2026-10-06';
export const INVOICE_TIMESTAMP = '2026-10-06T00:00:00+02:00';
export interface InvoiceSection {
  id: string; title: string; paragraphs: string[]; bullets: string[];
  table: { headers: string[]; rows: string[][] } | null;
  sources: string[]; links: string[]; quote?: string;
}
export interface InvoiceContent {
  title: string; seoTitle: string; description: string; answer: string; quote: string; summary: string[];
  sections: InvoiceSection[]; faq: { question: string; answer: string }[];
}
export function getInvoiceContent(key: InvoicePageKey, locale: Locale): InvoiceContent { return content[locale][key]; }
export function invoiceImage(key: InvoicePageKey, locale: Locale) {
  return `https://www.iteradvisors.com/images/electronic-invoicing/${key}-${locale}.png`;
}
export function invoiceMetadata(key: InvoicePageKey, locale: Locale): Metadata {
  const page = getInvoiceContent(key, locale);
  const metadata = buildMetadata({ locale, title: page.seoTitle, description: page.description, path: routes[key][locale], localizedPaths: routes[key] });
  return {
    ...metadata,
    title: { absolute: page.seoTitle },
    openGraph: { ...metadata.openGraph, type: 'article', publishedTime: INVOICE_TIMESTAMP, modifiedTime: INVOICE_TIMESTAMP,
      images: [{ url: invoiceImage(key, locale), width: 1200, height: 630, alt: page.title }] },
    twitter: { ...metadata.twitter, title: page.seoTitle, description: page.description, images: [invoiceImage(key, locale)] },
  };
}
export const INVOICE_UI = {
  fr: { resources: 'Ressources', topic: 'Facturation électronique', country: 'Réforme française · Point de vue CFO', by: 'Par', role: 'Associé fondateur et DAF', updated: 'Mis à jour le 6 octobre 2026', essentials: 'L’essentiel', date: 'Sources vérifiées le 6 octobre 2026', toc: 'Dans ce guide', sources: 'Sources et références', next: 'Pour approfondir', faq: 'Questions fréquentes', back: 'Revenir au guide des obligations', contact: 'Faites diagnostiquer vos flux de facturation', scope: 'Décrivez vos outils, vos entités et les flux à préparer. Nous préciserons ensemble le périmètre d’intervention.', services: 'Coordination comptable', cfo: 'Accompagnement DAF externalisé', tools: 'Lire notre avis Pennylane', checklist: 'Télécharger la checklist de déploiement (CSV)', quote: 'Sébastien Doat, DAF', translated: '', related: 'Préparer le déploiement de votre PME', intro: 'Calendrier 2026-2027, plateformes, données et contrôles : préparez vos flux avec les recommandations de notre DAF.', card: 'Explorer le guide facturation électronique' },
  en: { resources: 'Resources', topic: 'Electronic invoicing', country: 'French reform · CFO perspective', by: 'By', role: 'Founding partner and CFO', updated: 'Updated on 6 October 2026', essentials: 'Key facts', date: 'Sources checked on 6 October 2026', toc: 'In this guide', sources: 'Sources and references', next: 'Explore further', faq: 'Frequently asked questions', back: 'Back to the requirements guide', contact: 'Get your invoicing flows assessed', scope: 'Describe your systems, entities and flows. We will agree the scope of support together.', services: 'Accounting coordination', cfo: 'Fractional CFO support', tools: 'Read our Pennylane review', checklist: 'Download the implementation checklist (CSV)', quote: 'Sébastien Doat, CFO', translated: 'Quote translated from French', related: 'Prepare your SME implementation', intro: '2026-2027 timeline, platforms, data and controls: prepare your flows with our CFO recommendations.', card: 'Explore the electronic-invoicing guide' },
  es: { resources: 'Recursos', topic: 'Facturación electrónica', country: 'Reforma francesa · Perspectiva CFO', by: 'Por', role: 'Socio fundador y CFO', updated: 'Actualizado el 6 de octubre de 2026', essentials: 'Lo esencial', date: 'Fuentes verificadas el 6 de octubre de 2026', toc: 'En esta guía', sources: 'Fuentes y referencias', next: 'Profundizar', faq: 'Preguntas frecuentes', back: 'Volver a la guía de obligaciones', contact: 'Solicite un diagnóstico de sus flujos de facturación', scope: 'Describa sistemas, entidades y flujos. Acordaremos juntos el alcance del acompañamiento.', services: 'Coordinación contable', cfo: 'Acompañamiento CFO externo', tools: 'Leer nuestra opinión sobre Pennylane', checklist: 'Descargar checklist de implantación (CSV)', quote: 'Sébastien Doat, CFO', translated: 'Cita traducida del francés', related: 'Preparar la implantación en su pyme', intro: 'Calendario 2026-2027, plataformas, datos y controles: prepare sus flujos con las recomendaciones de nuestro CFO.', card: 'Explorar la guía de facturación electrónica' },
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

INVOICE_SOURCES["directory"] = {"url": "https://aife.economie.gouv.fr/nos-applications/facturation-electronique-b2b/", "publisher": "AIFE", "label": {"fr": "PPF et annuaire de facturation", "en": "PPF and invoicing directory", "es": "PPF y directorio de facturación"}};

INVOICE_SOURCES["officialFormats"] = {"url": "https://www.impots.gouv.fr/specifications-externes-b2b", "publisher": "DGFiP", "label": {"fr": "Spécifications et normes de facturation", "en": "Invoicing specifications and standards", "es": "Especificaciones y normas de facturación"}};

INVOICE_SOURCES["penaltyInvoice"] = {"url": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000044051158/", "publisher": "Légifrance", "label": {"fr": "CGI, article 1737 : sanctions de facturation", "en": "French tax code, article 1737: invoicing penalties", "es": "Código fiscal francés, artículo 1737: sanciones de facturación"}};

INVOICE_SOURCES["penaltyReporting"] = {"url": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044045593/2022-03-28", "publisher": "Légifrance", "label": {"fr": "CGI, article 1788 D : e-reporting (version consultée en 2026)", "en": "French tax code, article 1788 D: e-reporting (2026 version checked)", "es": "Código fiscal francés, artículo 1788 D: e-reporting (versión consultada en 2026)"}};

INVOICE_SOURCES["tolerance"] = {"url": "https://www.economie.gouv.fr/actualites/facturation-electronique-entre-entreprises-coup-denvoi-de-la-reforme", "publisher": "Ministère de l’Économie", "label": {"fr": "Tolérance annoncée jusqu’à fin 2026", "en": "Announced tolerance through end-2026", "es": "Tolerancia anunciada hasta finales de 2026"}};

INVOICE_SOURCES["spainSystems"] = {"url": "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/preguntas-frecuentes.html?faqId=76bb77fe52572910VgnVCM100000dc381e0aRCRD", "publisher": "AEAT", "label": {"fr": "Systèmes de facturation espagnols : calendrier RRSIF", "en": "Spanish invoicing systems: RRSIF timeline", "es": "Sistemas de facturación españoles: calendario RRSIF"}};

INVOICE_SOURCES["spainB2B"] = {"url": "https://www.boe.es/buscar/act.php?id=BOE-A-2026-7295", "publisher": "BOE", "label": {"fr": "Espagne : décret 238/2026, facturation B2B", "en": "Spain: decree 238/2026, B2B invoicing", "es": "España: Real Decreto 238/2026, facturación B2B"}};

INVOICE_SOURCES["spainOrder"] = {"url": "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20587", "publisher": "BOE", "label": {"fr": "Espagne : arrêté HAC/1028/2026, solution publique", "en": "Spain: order HAC/1028/2026, public solution", "es": "España: Orden HAC/1028/2026, solución pública"}};
