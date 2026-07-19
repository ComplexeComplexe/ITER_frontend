import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { pushLeadFormSubmitted, __test__ } from "../leadForm";

const { toE164, deriveFormId } = __test__;

describe("toE164", () => {
  it("returns undefined for missing / empty input", () => {
    expect(toE164(undefined)).toBeUndefined();
    expect(toE164("")).toBeUndefined();
    expect(toE164("   ")).toBeUndefined();
  });

  it("preserves an already-formatted E.164 number", () => {
    expect(toE164("+33612345678")).toBe("+33612345678");
  });

  it("converts a French national-format number (leading 0) to E.164", () => {
    expect(toE164("0612345678")).toBe("+33612345678");
  });

  it("strips formatting punctuation before normalizing", () => {
    expect(toE164("06 12.34-56/78")).toBe("+33612345678");
    expect(toE164("(06) 12 34 56 78")).toBe("+33612345678");
  });

  it("prefixes the default country code when no leading 0 and no '+'", () => {
    expect(toE164("612345678")).toBe("+33612345678");
  });

  it("respects a custom defaultCountry override", () => {
    expect(toE164("612345678", "+34")).toBe("+34612345678");
    expect(toE164("0612345678", "+34")).toBe("+34612345678");
  });

  it("treats a '+' anywhere in input as 'international intent' only when leading", () => {
    // Per spec: only the LEADING '+' (on the raw input) preserves the + prefix.
    // A stray '+' inside the string is stripped along with other non-digits.
    expect(toE164("+33 6 12 34 56 78")).toBe("+33612345678");
    expect(toE164("06+1234")).toBe("+3361234"); // not leading → treated as national
  });
});

describe("deriveFormId", () => {
  it("maps known form locations to their form_id", () => {
    expect(deriveFormId("lp-daf-externalise")).toBe("daf-diagnostic");
    expect(deriveFormId("contact")).toBe("contact");
  });

  it("falls back to the formLocation string for unknown values", () => {
    expect(deriveFormId("some-future-form")).toBe("some-future-form");
  });
});

describe("pushLeadFormSubmitted", () => {
  beforeEach(() => {
    // Wipe any leftover dataLayer between tests.
    (window as unknown as { dataLayer?: unknown }).dataLayer = undefined;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates window.dataLayer if it does not exist", () => {
    expect((window as unknown as { dataLayer?: unknown[] }).dataLayer).toBeUndefined();
    pushLeadFormSubmitted({
      email: "a@b.com",
      firstName: "A",
      lastName: "B",
      formLocation: "lp-daf-externalise",
    });
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it("pushes a reset entry before the main payload", () => {
    pushLeadFormSubmitted({
      email: "a@b.com",
      firstName: "A",
      lastName: "B",
      formLocation: "lp-daf-externalise",
    });

    expect(window.dataLayer.length).toBe(2);
    expect(window.dataLayer[0]).toEqual({
      enhanced_conversion_data: undefined,
      lead: undefined,
    });
  });

  it("emits the exact payload shape with all normalizations applied", () => {
    pushLeadFormSubmitted({
      email: "  John.Doe@Example.COM  ",
      phone: "06 12 34 56 78",
      firstName: "  Jean  ",
      lastName: "  Dupont  ",
      company: "  Acme  ",
      companySize: "11-50",
      mainNeed: "Trésorerie",
      formLocation: "lp-daf-externalise",
    });

    expect(window.dataLayer[1]).toEqual({
      event: "lead_form_submitted",
      form_id: "daf-diagnostic",
      form_location: "lp-daf-externalise",
      lead: {
        company: "  Acme  ", // company is passed through as-is (no trim spec)
        company_size: "11-50",
        main_need: "Trésorerie",
      },
      enhanced_conversion_data: {
        email: "john.doe@example.com",
        phone_number: "+33612345678",
        first_name: "Jean",
        last_name: "Dupont",
        address: { country: "FR" },
      },
    });
  });

  it("derives form_id from formLocation for /contact", () => {
    pushLeadFormSubmitted({
      email: "x@y.fr",
      firstName: "X",
      lastName: "Y",
      formLocation: "contact",
    });

    const payload = window.dataLayer[1] as { form_id: string; form_location: string };
    expect(payload.form_id).toBe("contact");
    expect(payload.form_location).toBe("contact");
  });

  it("leaves phone_number undefined when no phone is provided", () => {
    pushLeadFormSubmitted({
      email: "x@y.fr",
      firstName: "X",
      lastName: "Y",
      formLocation: "contact",
    });

    const payload = window.dataLayer[1] as {
      enhanced_conversion_data: { phone_number: string | undefined };
    };
    expect(payload.enhanced_conversion_data.phone_number).toBeUndefined();
  });

  it("is a no-op when window is undefined (SSR)", () => {
    // Save / temporarily delete the global window reference. jsdom defines
    // `window` on globalThis — removing it simulates a server-side render.
    const realWindow = globalThis.window;
    // @ts-expect-error — intentionally simulating SSR
    delete globalThis.window;

    expect(() =>
      pushLeadFormSubmitted({
        email: "x@y.fr",
        firstName: "X",
        lastName: "Y",
        formLocation: "contact",
      }),
    ).not.toThrow();

    // Restore so the rest of the suite keeps a working window.
    globalThis.window = realWindow;
  });
});
