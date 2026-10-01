const contexts: Record<string, { need: string; originPage: string }> = {
  "sebastien-doat": { need: "daf-pme", originPage: "/a-propos/sebastien-doat" },
  "temps-partage": { need: "daf-pme", originPage: "/daf-externalise/temps-partage" },
  transition: { need: "transition", originPage: "/daf-externalise/transition" },
  comptabilite: { need: "accounting", originPage: "/services/comptabilite-externalisation" },
  "services-finance": { need: "daf-pme", originPage: "/services" },
  "ia-reporting": { need: "automation", originPage: "/ressources/ia-finance/automatiser-reporting-financier" },
  "ia-chatgpt": { need: "automation", originPage: "/ressources/ia-finance/chatgpt-finance" },
  "ia-finance": { need: "automation", originPage: "/ressources/ia-finance" },
  tresorerie: { need: "cash", originPage: "/services/previsionnel-tresorerie" },
  reporting: { need: "cash", originPage: "/services/controle-de-gestion-externalise" },
  organisation: { need: "daf-pme", originPage: "/services/gestion-financiere-externalisee" },
  levee: { need: "funding", originPage: "/services/accompagnement-levee-de-fond" },
  "due-diligence": { need: "funding", originPage: "/services/ma-due-diligence" },
  "levee-de-fonds": { need: "funding", originPage: "/ressources/blog/checklist-due-diligence-levee-de-fonds" },
  "audit-structure": { need: "daf-pme", originPage: "/ressources/blog/organiser-sa-direction-financiere" },
  "diagnostic-finance": { need: "daf-pme", originPage: "/daf-externalise" },
  "daf-drh-synergie": { need: "rh", originPage: "/ressources/blog/daf-drh-externalises-synergie" },
  "formation-cfo": { need: "other", originPage: "/ressources" },
  "stack-fintech": { need: "automation", originPage: "/ressources/outils" },
  tarifs: { need: "daf-pme", originPage: "/daf-externalise/tarifs" },
  daf: { need: "daf-pme", originPage: "/daf-externalise" },
  startup: { need: "daf-startup", originPage: "/fractional-cfo-startups" },
  toulouse: { need: "daf-pme", originPage: "/daf-externalise-toulouse" },
  "cas-solarmente-serie-b-cleantech": { need: "funding", originPage: "/ressources/cas-clients/solarmente-serie-b-cleantech" },
  "cas-seasonly-marge-par-canal-bfr": { need: "cash", originPage: "/ressources/cas-clients/seasonly-marge-par-canal-bfr" },
  "cas-opti-digital-structuration-financement": { need: "daf-pme", originPage: "/ressources/cas-clients/opti-digital-structuration-financement" },
};

/** Only known CTA contexts are recorded; arbitrary fragments, query strings
 * and referrers (which can contain personal data) never enter analytics. */
export function getContactContext(hash: string, search = "") {
  const fragment = hash.replace(/^#/, "");
  if (Object.hasOwn(contexts, fragment)) return contexts[fragment];
  const legacyType = new URLSearchParams(search).get("type");
  return legacyType && Object.hasOwn(contexts, legacyType)
    ? contexts[legacyType]
    : undefined;
}

export const CONTACT_NEEDS = [
  { value: "automation", fr: "IA et automatisation du reporting", en: "AI and reporting automation", es: "IA y automatización del reporting" },
  { value: "daf-pme", fr: "DAF pour une PME", en: "CFO for an SME", es: "CFO para una pyme" },
  { value: "daf-startup", fr: "DAF pour une startup / SaaS", en: "CFO for a startup / SaaS", es: "CFO para una startup / SaaS" },
  { value: "cash", fr: "Trésorerie, marge ou reporting", en: "Cash flow, margins or reporting", es: "Tesorería, margen o reporting" },
  { value: "funding", fr: "Financement ou acquisition", en: "Funding or acquisition", es: "Financiación o adquisición" },
  { value: "accounting", fr: "Organisation comptable", en: "Accounting operations", es: "Organización contable" },
  { value: "transition", fr: "Remplacement d'un DAF", en: "Interim CFO", es: "CFO de transición" },
  { value: "rh", fr: "Accompagnement RH", en: "HR support", es: "Apoyo de RR. HH." },
  { value: "other", fr: "Autre besoin", en: "Another need", es: "Otra necesidad" },
] as const;
