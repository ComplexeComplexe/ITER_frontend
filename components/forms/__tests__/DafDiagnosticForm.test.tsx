/**
 * @file Integration tests for the DAF diagnostic form (rendered inside
 *       app/lp/daf-externalise/client.tsx). The form is not exported as
 *       a standalone component, so we test it by mounting the whole
 *       LandingPageClient and mocking the heavy deps (Header, Footer,
 *       next/script, next/navigation).
 *
 * Scope of these tests: the lead_form_submitted dataLayer push and its
 * conditional firing only. The form's other side-effects (UTM capture,
 * scroll depth, sticky CTA) are not covered here.
 */
import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";

// ─── Mocks ───────────────────────────────────────────────────────────────

vi.mock("@/components/Header", () => ({ default: () => null }));
vi.mock("@/components/Footer", () => ({ default: () => null }));
vi.mock("next/script", () => ({ default: () => null }));

const routerPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: routerPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// We import AFTER the mocks are registered so vi.mock hoisting binds first.
// Le groupe de routes (fr) a été introduit le 15/08 pour donner un root layout
// par locale — les URL sont inchangées, seul le chemin sur disque bouge.
import LandingPageClient from "@/app/(fr)/lp/daf-externalise/client";

// ─── Test helpers ────────────────────────────────────────────────────────

type DLEntry = Record<string, unknown>;

function getLeadEvents(): DLEntry[] {
  return (window.dataLayer || []).filter(
    (e): e is DLEntry =>
      typeof e === "object" && e !== null && (e as DLEntry).event === "lead_form_submitted",
  );
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: "Jean" } });
  fireEvent.change(screen.getByLabelText(/^Nom/i), { target: { value: "Dupont" } });
  fireEvent.change(screen.getByLabelText(/Email professionnel/i), {
    target: { value: "Jean.Dupont@Example.COM" },
  });
  fireEvent.change(screen.getByLabelText(/Société/i), { target: { value: "Acme SAS" } });
  fireEvent.change(screen.getByLabelText(/Téléphone/i), {
    target: { value: "06 12 34 56 78" },
  });
  fireEvent.change(screen.getByLabelText(/Taille de l'entreprise/i), {
    target: { value: "11-50" },
  });
  fireEvent.change(screen.getByLabelText(/Besoin principal/i), {
    target: { value: "Trésorerie" },
  });
  // The RGPD checkbox is required for the form to pass client-side validation.
  fireEvent.click(screen.getByLabelText(/J'accepte/i));
}

// Submit by dispatching `submit` on the form element directly. We avoid
// `fireEvent.click(button)` because the page has multiple buttons whose
// accessible names contain "Planifier" (sticky CTA, section CTAs that
// scroll to the form), which would make a name-based selector ambiguous.
function submitForm(container: HTMLElement) {
  const form = container.querySelector("#conversion-form form") as HTMLFormElement | null;
  if (!form) throw new Error("conversion-form not found in the rendered tree");
  fireEvent.submit(form);
}

// ─── Tests ───────────────────────────────────────────────────────────────

describe("DafDiagnosticForm — lead_form_submitted push", () => {
  beforeEach(() => {
    window.iterConsent = { necessary: true, analytics: true, marketing: true };
    window.dataLayer = [];
    routerPush.mockClear();
  });

  afterEach(() => {
    // RTL's auto-cleanup only fires when globals are enabled in vitest. We
    // run with globals: false, so we unmount manually to keep document.body
    // clean between tests (otherwise subsequent #conversion-form queries
    // would match a stale tree from a prior render).
    cleanup();
    vi.restoreAllMocks();
  });

  it("pushes lead_form_submitted exactly once after a 2xx API response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({}) }),
    );

    const { container } = render(<LandingPageClient />);
    fillRequiredFields();
    submitForm(container);

    await waitFor(() => {
      expect(getLeadEvents()).toHaveLength(1);
    });

    const evt = getLeadEvents()[0] as DLEntry & {
      form_id: string;
      form_location: string;
      enhanced_conversion_data: Record<string, unknown>;
    };

    expect(evt.form_id).toBe("daf-diagnostic");
    expect(evt.form_location).toBe("lp-daf-externalise");
    expect(evt.enhanced_conversion_data).toMatchObject({
      email: "jean.dupont@example.com",
      phone_number: "+33612345678",
      first_name: "Jean",
      last_name: "Dupont",
      address: { country: "FR" },
    });

    // router.push to /merci should fire AFTER the push.
    await waitFor(() => {
      expect(routerPush).toHaveBeenCalledWith("/lp/daf-externalise/merci");
    });
  });

  it("does NOT push when the API responds with ok:false", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: "boom" }),
      }),
    );

    const { container } = render(<LandingPageClient />);
    fillRequiredFields();
    submitForm(container);

    // Wait for the error UI to appear, then assert no push happened.
    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de l'envoi/i)).toBeInTheDocument();
    });

    expect(getLeadEvents()).toHaveLength(0);
    expect(routerPush).not.toHaveBeenCalled();
  });

  it("does NOT push when fetch throws (network error)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const { container } = render(<LandingPageClient />);
    fillRequiredFields();
    submitForm(container);

    await waitFor(() => {
      expect(screen.getByText(/Erreur lors de l'envoi/i)).toBeInTheDocument();
    });

    expect(getLeadEvents()).toHaveLength(0);
    expect(routerPush).not.toHaveBeenCalled();
  });

  it("does NOT double-push on a rapid double submit", async () => {
    // Both submits resolve OK — without the leadPushedRef guard, both would
    // emit a lead_form_submitted event.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: () => Promise.resolve({}) }),
    );

    const { container } = render(<LandingPageClient />);
    fillRequiredFields();
    submitForm(container);
    submitForm(container);

    await waitFor(() => {
      expect(getLeadEvents()).toHaveLength(1);
    });

    // Give the event loop a chance to drain any in-flight second push.
    await new Promise((r) => setTimeout(r, 50));
    expect(getLeadEvents()).toHaveLength(1);
  });
});
