// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { readPageTranslations, usePageTranslations } from "@/lib/hooks/use-page-translations";

afterEach(() => { document.head.innerHTML = ""; });
describe("published page translations", () => {
  it("uses the exact translated slug rather than a generated URL", () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/es/clientes"><link rel="alternate" hreflang="fr-FR" href="https://www.iteradvisors.com/clients"><link rel="alternate" hreflang="en-GB" href="https://www.iteradvisors.com/en/clients">';
    expect(readPageTranslations('/es/clientes', 'es')).toEqual({es:'/es/clientes',fr:'/clients',en:'/en/clients'});
  });
  it("offers no synthetic translation for a monolingual page", () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/ressources/ia-finance"><link rel="alternate" hreflang="x-default" href="https://www.iteradvisors.com/ressources/ia-finance">';
    expect(readPageTranslations('/ressources/ia-finance', 'fr')).toEqual({fr:'/ressources/ia-finance'});
  });
  it("does not reuse metadata from the previous page during navigation", () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/"><link rel="alternate" hreflang="es-ES" href="https://www.iteradvisors.com/es">';
    expect(readPageTranslations('/daf-externalise', 'fr')).toEqual({fr:'/daf-externalise'});
  });
  it("rejects a language mismatch and external destinations", () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/clients"><link rel="alternate" hreflang="es-ES" href="https://www.iteradvisors.com/clients"><link rel="alternate" hreflang="en-GB" href="https://example.com/en/clients">';
    expect(readPageTranslations('/clients', 'fr')).toEqual({fr:'/clients'});
  });
  it("refreshes the menu when navigation metadata arrives after the route", async () => {
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/"><link rel="alternate" hreflang="es" href="https://www.iteradvisors.com/es">';
    const { result, rerender, unmount } = renderHook(({ path }) => usePageTranslations(path, 'fr'), { initialProps: { path: '/' } });
    await waitFor(() => expect(result.current.es).toBe('/es'));
    rerender({ path: '/clients' });
    expect(result.current.es).toBeUndefined();
    document.head.innerHTML = '<link rel="canonical" href="https://www.iteradvisors.com/clients"><link rel="alternate" hreflang="es" href="https://www.iteradvisors.com/es/clientes">';
    await waitFor(() => expect(result.current.es).toBe('/es/clientes'));
    unmount();
  });
});
