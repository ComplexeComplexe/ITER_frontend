import { currentConsent } from "./consent";

const rhPaths = new Set(["/drh-externalise", "/drh-externalise/temps-partage", "/a-propos/borith-biv", "/services/recrutement-talent-acquisition", "/services/gestion-paie-charges-sociales", "/services/formation-developpement", "/services/conformite-droit-travail"]);
const financePaths = new Set(["/daf-externalise", "/daf-externalise/tarifs", "/daf-externalise/temps-partage", "/daf-externalise/transition", "/services", "/services/controle-de-gestion-externalise", "/services/previsionnel-tresorerie", "/ressources/ia-finance"]);

/** Only controlled destination paths are measured; no query strings or free text. */
export function recordServiceNavigation(href: string, placement: string) {
  if (typeof window === "undefined" || !currentConsent()?.analytics) return;
  let url: URL;
  try { url = new URL(href, window.location.origin); } catch { return; }
  if (url.origin !== window.location.origin) return;
  const family = rhPaths.has(url.pathname) ? "rh" : financePaths.has(url.pathname) ? "finance" : undefined;
  if (!family) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "service_navigation", service_family: family, placement: ["home-hero", "home-rh-section", "navigation", "footer", "content"].includes(placement) ? placement : "content", target_path: url.pathname, page_variant: "finance-first-rh-2026-10" });
}
