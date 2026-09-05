import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/Breadcrumb", () => ({ default: () => null }));
vi.mock("framer-motion", async (importOriginal) => ({ ...await importOriginal<typeof import("framer-motion")>(), useInView: () => true }));
import ContactPage from "../ContactPage";
import { getContactContext } from "@/lib/contact-context";
import { DOCUMENTED_CASES } from "@/lib/content/documented-cases";

function events() {
  return (window.dataLayer || []).filter(item => typeof item === "object" && item !== null && (item as Record<string, unknown>).event === "lead_form_submitted");
}
function fillAndSubmit(container: HTMLElement) {
  for (const [name, value] of Object.entries({ firstName: "Test", lastName: "Example", email: "test@example.com", company: "Example", message: "Test local avec envoi simulé" })) {
    const field = container.querySelector(`[name="${name}"]`);
    if (field) fireEvent.change(field, { target: { value } });
  }
  fireEvent.change(screen.getByLabelText(/Votre échéance/), { target: { value: "this-month" } });
  fireEvent.submit(container.querySelector("form")!);
}
describe("Contact qualification and attribution", () => {
  beforeEach(() => { window.dataLayer = []; window.history.replaceState({}, "", "/contact#startup"); });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
  it("maps every published case CTA and rejects arbitrary or inherited keys", () => {
    for (const item of DOCUMENTED_CASES) expect(getContactContext(`#cas-${item.slug}`)?.originPage).toBe(item.href);
    for (const value of ["#email=test@example.com", "#__proto__", "#constructor", "#unknown"]) expect(getContactContext(value)).toBeUndefined();
  });
  it("submits selected need, timeline and originating offer, then records one conversion", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ContactPage locale="fr" />);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue("daf-startup");
    fillAndSubmit(container);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ source: "contact", data: { challenge: "daf-startup", urgency: "this-month", originPage: "/fractional-cfo-startups" } });
    expect(events()[0]).toMatchObject({ origin_page: "/fractional-cfo-startups", lead: { main_need: "daf-startup" } });
    expect(screen.getByText(/Votre message a bien été envoyé/)).toBeInTheDocument();
  });
  it("retains qualification after failure and records conversion only on a successful retry", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, json: async () => ({}) }).mockResolvedValueOnce({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<ContactPage locale="fr" />);
    fillAndSubmit(container);
    await screen.findByText(/Une erreur est survenue/);
    expect(events()).toHaveLength(0);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue("daf-startup");
    expect(screen.getByLabelText(/Votre échéance/)).toHaveValue("this-month");
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
