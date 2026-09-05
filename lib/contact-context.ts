const contexts: Record<string, { need: string; originPage: string }> = {
  daf: { need: "daf-pme", originPage: "/daf-externalise" },
  startup: { need: "daf-startup", originPage: "/fractional-cfo-startups" },
  toulouse: { need: "daf-pme", originPage: "/daf-externalise-toulouse" },
  "cas-solarmente-serie-b-cleantech": { need: "funding", originPage: "/ressources/cas-clients/solarmente-serie-b-cleantech" },
  "cas-seasonly-marge-par-canal-bfr": { need: "cash", originPage: "/ressources/cas-clients/seasonly-marge-par-canal-bfr" },
  "cas-opti-digital-structuration-financement": { need: "daf-pme", originPage: "/ressources/cas-clients/opti-digital-structuration-financement" },
};

/** Only known CTA contexts are recorded; arbitrary fragments, query strings
 * and referrers (which can contain personal data) never enter analytics. */
export function getContactContext(hash: string) {
  return Object.hasOwn(contexts, hash.replace(/^#/, "")) ? contexts[hash.replace(/^#/, "")] : undefined;
}

export const CONTACT_NEEDS = [
  { value: "daf-pme", fr: "DAF pour une PME", en: "CFO for an SME", es: "CFO para una pyme" },
  { value: "daf-startup", fr: "DAF pour une startup / SaaS", en: "CFO for a startup / SaaS", es: "CFO para una startup / SaaS" },
  { value: "cash", fr: "Trésorerie, marge ou reporting", en: "Cash flow, margins or reporting", es: "Tesorería, margen o reporting" },
  { value: "funding", fr: "Financement ou acquisition", en: "Funding or acquisition", es: "Financiación o adquisición" },
  { value: "transition", fr: "Remplacement d'un DAF", en: "Interim CFO", es: "CFO de transición" },
  { value: "rh", fr: "Accompagnement RH", en: "HR support", es: "Apoyo de RR. HH." },
  { value: "other", fr: "Autre besoin", en: "Another need", es: "Otra necesidad" },
] as const;
