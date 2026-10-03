import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CookieConsent from "@/components/CookieConsent";
import ManageCookiesButton from "@/components/ManageCookiesButton";
import { CONSENT_KEY, getStoredConsent, storeConsent } from "@/lib/analytics/consent";

beforeEach(() => {
  localStorage.clear();
  window.dataLayer = [];
  window.iterConsent = undefined;
  window.iterLoadGTM = vi.fn();
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { callback(0); return 1; });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

const noTracking = { necessary: true, analytics: false, marketing: false };
const fullTracking = { necessary: true, analytics: true, marketing: true };

describe("cookie preferences", () => {
  it("dismisses the first-visit banner directly without enabling tracking", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Fermer sans modifier mes choix" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(getStoredConsent()).toEqual(noTracking);
    expect(window.iterLoadGTM).not.toHaveBeenCalled();
  });
  for (const [locale, customize, close] of [
    ["fr", "Personnaliser", "Fermer sans modifier mes choix"],
    ["en", "Customize", "Close without changing my choices"],
    ["es", "Personalizar", "Cerrar sin modificar mis preferencias"],
  ] as const) {
    it(`dismisses and remembers a first-visit refusal in ${locale}`, () => {
      const { unmount } = render(<CookieConsent locale={locale} />);
      fireEvent.click(screen.getByRole("button", { name: customize, exact: true }));
      fireEvent.click(screen.getByRole("button", { name: close, exact: true }));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(getStoredConsent()).toEqual(noTracking);
      expect(window.iterLoadGTM).not.toHaveBeenCalled();
      unmount();
      render(<CookieConsent locale={locale} />);
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  }

  it("does not grant draft consent when Escape dismisses the first visit", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Personnaliser", exact: true }));
    fireEvent.click(screen.getByRole("switch", { name: "Cookies analytiques" }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(getStoredConsent()).toEqual(noTracking);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on the backdrop while preserving an existing choice and discarding edits", () => {
    storeConsent(fullTracking);
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Gérer les cookies" }));
    fireEvent.click(screen.getByRole("switch", { name: "Cookies analytiques" }));
    fireEvent.click(document.querySelector("[data-cookie-overlay]")!);
    expect(getStoredConsent()).toEqual(fullTracking);
    fireEvent.click(screen.getByRole("button", { name: "Gérer les cookies" }));
    expect(screen.getByRole("switch", { name: "Cookies analytiques" })).toHaveAttribute("aria-checked", "true");
  });

  it("persists only the categories explicitly saved and closes the dialog", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Personnaliser", exact: true }));
    fireEvent.click(screen.getByRole("switch", { name: "Cookies analytiques" }));
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer mes préférences" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(getStoredConsent()).toEqual({ ...noTracking, analytics: true });
    expect(window.iterConsent?.marketing).toBe(false);
  });

  for (const [action, expected] of [["Tout accepter", fullTracking], ["Tout refuser", noTracking]] as const) {
    it(`closes the modal immediately after ${action}`, () => {
      render(<CookieConsent />);
      fireEvent.click(screen.getByRole("button", { name: "Personnaliser", exact: true }));
      fireEvent.click(screen.getByRole("button", { name: action, exact: true }));
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(getStoredConsent()).toEqual(expected);
    });
  }

  it("keeps the dialog usable when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole("button", { name: "Personnaliser", exact: true }));
    fireEvent.click(screen.getByRole("button", { name: "Fermer sans modifier mes choix" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(window.iterConsent).toEqual(noTracking);
  });

  it("opens preferences from the policy page without erasing consent or reloading", () => {
    storeConsent(fullTracking);
    render(<><CookieConsent /><ManageCookiesButton label="Modifier mes choix" /></>);
    fireEvent.click(screen.getByRole("button", { name: "Modifier mes choix" }));
    expect(screen.getByRole("dialog", { name: "Préférences de cookies" })).toBeInTheDocument();
    expect(getStoredConsent()).toEqual(fullTracking);
    expect(localStorage.getItem(CONSENT_KEY)).toBeTruthy();
  });
});
