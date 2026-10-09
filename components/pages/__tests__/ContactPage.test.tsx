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
  beforeEach(() => {
    window.iterConsent = { necessary: true, analytics: true, marketing: true }; window.dataLayer = []; window.history.replaceState({}, "", "/contact#startup"); });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
  it("maps every published case CTA and rejects arbitrary or inherited keys", () => {
    for (const item of DOCUMENTED_CASES) expect(getContactContext(`#cas-${item.slug}`)?.originPage).toBe(item.href);
    for (const value of ["#email=test@example.com", "#__proto__", "#constructor", "#unknown"]) expect(getContactContext(value)).toBeUndefined();
  });
  it("submits selected need, timeline and originating offer, then records one conversion", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, receiptId: "local-mock" }) });
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ContactPage locale="fr" />);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue("daf-startup");
    fillAndSubmit(container);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ source: "contact", data: { challenge: "daf-startup", urgency: "this-month", originPage: "/fractional-cfo-startups" } });
    expect(events()[0]).toMatchObject({ origin_page: "/fractional-cfo-startups", lead: { main_need: "daf-startup" } });
    expect(screen.getByText(/Votre message a bien été envoyé/)).toBeInTheDocument();
  });
  it.each([
    ["drh", "rh", "/drh-externalise"],
    ["drh-temps-partage", "rh", "/drh-externalise/temps-partage"],
    ["borith-biv", "rh", "/a-propos/borith-biv"],
    ["gestion-paie-charges-sociales", "rh", "/services/gestion-paie-charges-sociales"],
    ["transition", "transition", "/daf-externalise/transition"],
    ["comptabilite", "accounting", "/services/comptabilite-externalisation"],
  ])("preserves the %s service need through submission and conversion", async (context, need, originPage) => {
    window.history.replaceState({}, "", `/contact#${context}`);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, receiptId: "local-mock" }) });
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ContactPage locale="fr" />);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue(need);
    if (need === "rh") expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Parlons de votre organisation RH");
    fillAndSubmit(container);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ data: { challenge: need, originPage } });
    expect(events()[0]).toMatchObject({ origin_page: originPage, lead: { main_need: need } });
  });
  it("keeps AI context and optional company/message without inventing a booking", async () => {
    window.history.replaceState({}, "", "/contact#ia-reporting");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, receiptId: "local-mock" }) }); vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ContactPage locale="fr" />);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue("automation");
    expect(container.querySelector('[name="company"]')).not.toBeRequired();
    expect(container.querySelector('[name="message"]')).not.toBeRequired();
    expect(screen.getByText(/Aucun rendez-vous n’est réservé automatiquement/)).toBeInTheDocument();
    fillAndSubmit(container);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(events()[0]).toMatchObject({ origin_page:"/ressources/ia-finance/automatiser-reporting-financier", lead:{main_need:"automation"} });
  });
  it("preserves a legacy funding link without capturing unrelated query data", async () => {
    window.history.replaceState({}, "", "/contact?type=levee-de-fonds&email=private@example.com");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true, receiptId: "local-mock" }) }); vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ContactPage locale="fr" />);
    expect(screen.getByLabelText(/Votre priorité/)).toHaveValue("funding");
    fillAndSubmit(container);
    await waitFor(() => expect(events()).toHaveLength(1));
    expect(events()[0]).toMatchObject({ origin_page: "/ressources/blog/checklist-due-diligence-levee-de-fonds", lead: { main_need: "funding" } });
    expect(JSON.stringify(events())).not.toContain("private@example.com");
  });
  it("uses explicit price context first and rejects unknown query contexts", () => {
    expect(getContactContext("#tarifs", "?type=levee-de-fonds")?.originPage).toBe("/daf-externalise/tarifs");
    expect(getContactContext("", "?type=__proto__")).toBeUndefined();
    expect(getContactContext("", "?type=private@example.com")).toBeUndefined();
    expect(getContactContext("", "?type=audit-structure")?.need).toBe("daf-pme");
    expect(getContactContext("#diagnostic-finance")?.need).toBe("daf-pme");
    expect(getContactContext("", "?type=stack-fintech")?.need).toBe("automation");
    expect(getContactContext("#daf-drh-synergie")?.need).toBe("rh");
    expect(getContactContext("#formation-cfo")?.need).toBe("other");
  });
  it("does not count an HTTP 200 response without a confirmed receipt as a lead", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) }));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(<ContactPage locale="fr" />);
    fillAndSubmit(container);
    await screen.findByText(/Une erreur est survenue/);
    expect(events()).toHaveLength(0);
  });
  it("retains qualification after failure and records conversion only on a successful retry", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: false, json: async () => ({}) }).mockResolvedValueOnce({ ok: true, json: async () => ({ success: true, receiptId: "local-mock" }) });
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
