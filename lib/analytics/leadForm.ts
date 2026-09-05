// Lead form analytics — pushes `lead_form_submitted` to the GTM dataLayer
// with first-party user data formatted for Google Ads enhanced conversions
// for leads. The corresponding GTM container (GTM-KZZ9L5VZ) reads the
// `enhanced_conversion_data.*` fields from this push and feeds them to the
// User-Provided Data variable on the Ads conversion tag. GTM hashes the
// values (SHA-256) before transmission, so no PII leaves the browser in
// clear text.
//
// IMPORTANT: only call this helper AFTER the backend confirms the lead
// (HTTP 2xx). Calling it on click or on validation start inflates Ads
// conversions and breaks the campaign ROAS reporting.

export type LeadFormLocation = "lp-daf-externalise" | "contact" | string;

export type LeadFormPayload = {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  company?: string;
  companySize?: string;
  mainNeed?: string;
  formLocation: LeadFormLocation;
  originPage?: string;
};

/**
 * Derive the `form_id` dataLayer key from the form location.
 * Mapping is centralized here so consumers only pass `formLocation` and the
 * GTM payload stays internally consistent (no risk of /contact pushing
 * `form_id: 'daf-diagnostic'` by accident).
 */
const deriveFormId = (formLocation: LeadFormLocation): string => {
  switch (formLocation) {
    case "lp-daf-externalise":
      return "daf-diagnostic";
    case "contact":
      return "contact";
    default:
      // Generic fallback — the location string itself becomes the form_id,
      // which is at worst readable and at best a valid GTM trigger value.
      return formLocation;
  }
};

/**
 * Convert a French/international phone number to E.164 (e.g. "+33612345678").
 * Rules (from the GTM/Ads spec):
 *  - If input started with "+", keep "+" and the remaining digits.
 *  - If digits start with "0" (FR national format), replace the leading 0
 *    with the default country code ("+33").
 *  - Otherwise, prefix the default country code.
 * Returns undefined when input is empty / has no digits.
 */
const toE164 = (raw?: string, defaultCountry = "+33"): string | undefined => {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return undefined;
  if (raw.trim().startsWith("+")) return "+" + digits;
  if (digits.startsWith("0")) return defaultCountry + digits.slice(1);
  return defaultCountry + digits;
};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/**
 * Push the `lead_form_submitted` event to the dataLayer.
 *
 * Payload shape (must be preserved as-is for GTM Data Layer Variables to
 * resolve `enhanced_conversion_data.email`, `…address.country`, etc.):
 *
 *   {
 *     event: "lead_form_submitted",
 *     form_id: "daf-diagnostic",
 *     form_location: "lp-daf-externalise" | "contact",
 *     lead: { company, company_size, main_need },
 *     enhanced_conversion_data: {
 *       email,
 *       phone_number,
 *       first_name,
 *       last_name,
 *       address: { country: "FR" }
 *     }
 *   }
 */
export const pushLeadFormSubmitted = (p: LeadFormPayload): void => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  // Reset previous lead / enhanced_conversion_data so the new push isn't
  // shadowed by a stale value from an earlier event in this page session.
  window.dataLayer.push({
    enhanced_conversion_data: undefined,
    lead: undefined,
  });

  window.dataLayer.push({
    event: "lead_form_submitted",
    form_id: deriveFormId(p.formLocation),
    form_location: p.formLocation,
    ...(p.originPage ? { origin_page: p.originPage } : {}),
    lead: {
      company: p.company,
      company_size: p.companySize,
      main_need: p.mainNeed,
    },
    enhanced_conversion_data: {
      email: p.email.trim().toLowerCase(),
      phone_number: toE164(p.phone),
      first_name: p.firstName.trim(),
      last_name: p.lastName.trim(),
      address: { country: "FR" },
    },
  });
};

/**
 * Internal-only export for unit tests. Do NOT use in production code —
 * the public API surface is `pushLeadFormSubmitted`.
 */
export const __test__ = { toE164, deriveFormId };
