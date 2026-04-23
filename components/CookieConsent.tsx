"use client";

import { useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConsentCategory = "necessary" | "analytics" | "marketing";

interface ConsentState {
  necessary: boolean; // Toujours true - cookies essentiels
  analytics: boolean; // Google Analytics, Hotjar, etc.
  marketing: boolean; // Google Ads, Facebook Pixel, etc.
}

interface CookieConsentProps {
  locale?: "fr" | "en" | "es";
}

// ---------------------------------------------------------------------------
// Traductions
// ---------------------------------------------------------------------------

const translations = {
  fr: {
    banner: {
      title: "Nous respectons votre vie privée",
      description:
        "Nous déposons des cookies d'analyse et de marketing uniquement après votre consentement explicite. Vous pouvez tout accepter, tout refuser ou personnaliser vos choix.",
      acceptAll: "Tout accepter",
      rejectAll: "Tout refuser",
      customize: "Personnaliser",
      policyLink: "Voir la politique cookies complète",
      policyHref: "/politique-cookies",
    },
    modal: {
      title: "Préférences de cookies",
      description:
        "Gérez vos préférences par catégorie. Les cookies nécessaires sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.",
      save: "Enregistrer mes préférences",
      acceptAll: "Tout accepter",
      detailsLabel: "Liste détaillée des cookies",
      categories: {
        necessary: {
          title: "Cookies nécessaires",
          description:
            "Strictement nécessaires au fonctionnement du site (gestion du consentement, sécurité).",
          always: "Toujours actifs",
          trackers: "iter_cookie_consent, iter_cookie_consent_date (localStorage 1st-party, 180 jours)",
        },
        analytics: {
          title: "Cookies analytiques",
          description:
            "Mesure d'audience via Google Analytics 4 (Google LLC, États-Unis — clauses contractuelles types UE).",
          trackers: "_ga, _ga_* (13 mois), _gid (24 h)",
        },
        marketing: {
          title: "Cookies marketing",
          description:
            "Suivi des conversions et reciblage via Google Ads / Google Marketing Platform (Google LLC, États-Unis).",
          trackers: "_gcl_au (90 jours), IDE, DSID (13 mois)",
        },
      },
    },
    footer: "Gérer les cookies",
  },
  en: {
    banner: {
      title: "We respect your privacy",
      description:
        "We set analytics and marketing cookies only after your explicit consent. You can accept all, reject all, or customize your choices.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
      policyLink: "See the full cookie policy",
      policyHref: "/en/cookie-policy",
    },
    modal: {
      title: "Cookie preferences",
      description:
        "Manage your preferences by category. Necessary cookies are essential for the site to function and cannot be disabled.",
      save: "Save my preferences",
      acceptAll: "Accept all",
      detailsLabel: "Detailed cookie list",
      categories: {
        necessary: {
          title: "Necessary cookies",
          description:
            "Strictly necessary for the site to function (consent management, security).",
          always: "Always active",
          trackers: "iter_cookie_consent, iter_cookie_consent_date (localStorage 1st-party, 180 days)",
        },
        analytics: {
          title: "Analytics cookies",
          description:
            "Traffic measurement via Google Analytics 4 (Google LLC, United States — EU Standard Contractual Clauses).",
          trackers: "_ga, _ga_* (13 months), _gid (24h)",
        },
        marketing: {
          title: "Marketing cookies",
          description:
            "Conversion tracking and retargeting via Google Ads / Google Marketing Platform (Google LLC, United States).",
          trackers: "_gcl_au (90 days), IDE, DSID (13 months)",
        },
      },
    },
    footer: "Manage cookies",
  },
  es: {
    banner: {
      title: "Respetamos su privacidad",
      description:
        "Instalamos cookies de análisis y marketing únicamente tras su consentimiento explícito. Puede aceptar todo, rechazar todo o personalizar sus preferencias.",
      acceptAll: "Aceptar todo",
      rejectAll: "Rechazar todo",
      customize: "Personalizar",
      policyLink: "Ver la política de cookies completa",
      policyHref: "/es/politica-cookies",
    },
    modal: {
      title: "Preferencias de cookies",
      description:
        "Gestione sus preferencias por categoría. Las cookies necesarias son esenciales para el funcionamiento del sitio y no se pueden desactivar.",
      save: "Guardar mis preferencias",
      acceptAll: "Aceptar todo",
      detailsLabel: "Lista detallada de cookies",
      categories: {
        necessary: {
          title: "Cookies necesarias",
          description:
            "Estrictamente necesarias para el funcionamiento del sitio (gestión del consentimiento, seguridad).",
          always: "Siempre activas",
          trackers: "iter_cookie_consent, iter_cookie_consent_date (localStorage 1st-party, 180 días)",
        },
        analytics: {
          title: "Cookies analíticas",
          description:
            "Medición de audiencia mediante Google Analytics 4 (Google LLC, EE.UU. — Cláusulas Contractuales Tipo UE).",
          trackers: "_ga, _ga_* (13 meses), _gid (24 h)",
        },
        marketing: {
          title: "Cookies de marketing",
          description:
            "Seguimiento de conversiones y retargeting a través de Google Ads / Google Marketing Platform (Google LLC, EE.UU.).",
          trackers: "_gcl_au (90 días), IDE, DSID (13 meses)",
        },
      },
    },
    footer: "Gestionar cookies",
  },
};

// ---------------------------------------------------------------------------
// Consent storage helpers
// ---------------------------------------------------------------------------

const CONSENT_KEY = "iter_cookie_consent";
const CONSENT_DATE_KEY = "iter_cookie_consent_date";
const CONSENT_EXPIRY_DAYS = 180; // 6 mois - CNIL recommandation

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    const date = localStorage.getItem(CONSENT_DATE_KEY);
    if (!raw || !date) return null;

    // Vérifier l'expiration (6 mois)
    const consentDate = new Date(date);
    const now = new Date();
    const diffDays =
      (now.getTime() - consentDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > CONSENT_EXPIRY_DAYS) {
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem(CONSENT_DATE_KEY);
      return null;
    }

    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
}

// ---------------------------------------------------------------------------
// GTM Consent Mode v2 integration
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function pushConsentToGTM(consent: ConsentState): void {
  if (typeof window === "undefined") return;

  // Google Consent Mode v2 — the default was already set in the <head>
  // script of the layout. We fire a consent update via the gtag() shim, which
  // pushes an Arguments-like entry into dataLayer (the pattern GTM expects).
  // If GTM has already loaded its own gtag(), we use that for proper dedupe.
  window.dataLayer = window.dataLayer || [];
  const gtagFn =
    typeof window.gtag === "function"
      ? window.gtag
      : (...args: unknown[]) => {
          window.dataLayer.push(args);
        };

  gtagFn("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CookieConsent({ locale = "fr" }: CookieConsentProps) {
  const t = translations[locale] || translations.fr;

  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [mounted, setMounted] = useState(false);

  // Initialisation
  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      pushConsentToGTM(stored);
    } else {
      // Default consent (all denied) is already set by the <head> script in
      // the root layout before GTM loads. We just need to show the banner.
      setShowBanner(true);
    }
  }, []);

  // Sauvegarder et appliquer le consentement
  const applyConsent = useCallback((newConsent: ConsentState) => {
    setConsent(newConsent);
    storeConsent(newConsent);
    pushConsentToGTM(newConsent);
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    applyConsent({ necessary: true, analytics: true, marketing: true });
  }, [applyConsent]);

  const handleRejectAll = useCallback(() => {
    applyConsent({ necessary: true, analytics: false, marketing: false });
  }, [applyConsent]);

  const handleSavePreferences = useCallback(() => {
    applyConsent(consent);
  }, [applyConsent, consent]);

  const toggleCategory = useCallback((category: ConsentCategory) => {
    if (category === "necessary") return; // Toujours actif
    setConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  // Bouton flottant pour rouvrir les préférences
  const handleOpenPreferences = useCallback(() => {
    setShowModal(true);
    setShowBanner(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Bannière de consentement                                          */}
      {/* ----------------------------------------------------------------- */}
      {showBanner && (
        <div
          role="dialog"
          aria-label={t.banner.title}
          aria-modal="false"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-[oklch(0.92_0.004_270)] bg-white shadow-2xl">
            <div className="p-5 md:p-6">
              {/* Titre */}
              <div className="mb-3 flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.42 0.28 275)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h2
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.15 0.01 270)",
                  }}
                >
                  {t.banner.title}
                </h2>
              </div>

              {/* Description */}
              <p
                className="mb-3 text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.01 270)" }}
              >
                {t.banner.description}
              </p>

              {/* Lien vers politique cookies détaillée */}
              <a
                href={t.banner.policyHref}
                className="mb-5 inline-block text-xs underline hover:no-underline"
                style={{ color: "oklch(0.42 0.28 275)" }}
              >
                {t.banner.policyLink}
              </a>

              {/* Boutons */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <button
                  onClick={handleRejectAll}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.92 0.004 270)",
                    color: "oklch(0.45 0.01 270)",
                  }}
                >
                  {t.banner.rejectAll}
                </button>
                <button
                  onClick={() => {
                    setShowBanner(false);
                    setShowModal(true);
                  }}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.42 0.28 275)",
                    color: "oklch(0.42 0.28 275)",
                  }}
                >
                  {t.banner.customize}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.42 0.28 275)" }}
                >
                  {t.banner.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Modale de préférences                                             */}
      {/* ----------------------------------------------------------------- */}
      {showModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            role="dialog"
            aria-label={t.modal.title}
            aria-modal="true"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <h2
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.15 0.01 270)",
                  }}
                >
                  {t.modal.title}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
                  aria-label="Fermer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.01 270)" }}
              >
                {t.modal.description}
              </p>

              {/* Catégories */}
              <div className="space-y-4">
                {(
                  ["necessary", "analytics", "marketing"] as ConsentCategory[]
                ).map((category) => {
                  const cat = t.modal.categories[category];
                  const isNecessary = category === "necessary";
                  const isActive = consent[category];

                  return (
                    <div
                      key={category}
                      className="rounded-xl border p-4"
                      style={{
                        borderColor: isActive
                          ? "oklch(0.42 0.28 275 / 0.3)"
                          : "oklch(0.92 0.004 270)",
                        backgroundColor: isActive
                          ? "oklch(0.42 0.28 275 / 0.03)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-sm font-semibold"
                          style={{ color: "oklch(0.15 0.01 270)" }}
                        >
                          {cat.title}
                        </h3>
                        {isNecessary ? (
                          <span
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: "oklch(0.42 0.28 275 / 0.1)",
                              color: "oklch(0.42 0.28 275)",
                            }}
                          >
                            {"always" in cat ? cat.always : ""}
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleCategory(category)}
                            className="relative h-6 w-11 rounded-full transition-colors duration-200"
                            style={{
                              backgroundColor: isActive
                                ? "oklch(0.42 0.28 275)"
                                : "oklch(0.85 0.004 270)",
                            }}
                            role="switch"
                            aria-checked={isActive}
                            aria-label={cat.title}
                          >
                            <span
                              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                              style={{
                                transform: isActive
                                  ? "translateX(22px)"
                                  : "translateX(2px)",
                              }}
                            />
                          </button>
                        )}
                      </div>
                      <p
                        className="mt-2 text-xs leading-relaxed"
                        style={{ color: "oklch(0.45 0.01 270)" }}
                      >
                        {cat.description}
                      </p>
                      <p
                        className="mt-2 font-mono text-[10px] leading-relaxed"
                        style={{ color: "oklch(0.55 0.01 270)" }}
                      >
                        {cat.trackers}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Lien vers politique cookies détaillée */}
              <a
                href={t.banner.policyHref}
                className="mt-4 inline-block text-xs underline hover:no-underline"
                style={{ color: "oklch(0.42 0.28 275)" }}
              >
                {t.modal.detailsLabel}
              </a>

              {/* Boutons */}
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.92 0.004 270)",
                    color: "oklch(0.45 0.01 270)",
                  }}
                >
                  {t.modal.acceptAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "oklch(0.42 0.28 275)" }}
                >
                  {t.modal.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Bouton flottant "Gérer les cookies" (visible quand bannière fermée) */}
      {/* ----------------------------------------------------------------- */}
      {!showBanner && !showModal && (
        <button
          onClick={handleOpenPreferences}
          className="fixed bottom-4 left-4 z-[9998] flex items-center gap-1.5 rounded-full border bg-white px-3 py-2 text-xs font-medium shadow-lg transition-all hover:shadow-xl"
          style={{
            borderColor: "oklch(0.92 0.004 270)",
            color: "oklch(0.45 0.01 270)",
          }}
          aria-label={t.footer}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="8" cy="9" r="1.5" fill="currentColor" />
            <circle cx="15" cy="8" r="1" fill="currentColor" />
            <circle cx="10" cy="14" r="1.5" fill="currentColor" />
            <circle cx="16" cy="13" r="1" fill="currentColor" />
            <circle cx="13" cy="17" r="1" fill="currentColor" />
          </svg>
          {t.footer}
        </button>
      )}
    </>
  );
}
