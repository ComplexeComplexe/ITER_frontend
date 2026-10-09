"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getStoredConsent, storeConsent, applyTrackingConsent as pushConsentToGTM, type ConsentState } from "@/lib/analytics/consent";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConsentCategory = "necessary" | "analytics" | "marketing";

interface CookieConsentProps {
  locale?: "fr" | "en" | "es";
}

// ---------------------------------------------------------------------------
// Traductions
// ---------------------------------------------------------------------------

const translations = {
  fr: {
    banner: {
      title: "Vos choix cookies",
      description:
        "Analyse et marketing : votre accord est requis.",
      acceptAll: "Tout accepter",
      rejectAll: "Tout refuser",
      customize: "Personnaliser",
      policyLink: "Politique cookies",
      policyHref: "/politique-cookies",
    },
    modal: {
      title: "Préférences de cookies",
      description:
        "Gérez vos préférences par catégorie. Les cookies nécessaires sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.",
      save: "Enregistrer mes préférences",
      close: "Fermer sans modifier mes choix",
      dismissHint: "Sans choix enregistré, fermer conserve uniquement les cookies nécessaires.",
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
      title: "Your cookie choices",
      description:
        "Analytics and marketing require your consent.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
      policyLink: "Cookie policy",
      policyHref: "/en/cookie-policy",
    },
    modal: {
      title: "Cookie preferences",
      description:
        "Manage your preferences by category. Necessary cookies are essential for the site to function and cannot be disabled.",
      save: "Save my preferences",
      close: "Close without changing my choices",
      dismissHint: "Without a saved choice, closing keeps only necessary cookies.",
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
      title: "Sus opciones de cookies",
      description:
        "Análisis y marketing solo con su consentimiento.",
      acceptAll: "Aceptar todo",
      rejectAll: "Rechazar todo",
      customize: "Personalizar",
      policyLink: "Política de cookies",
      policyHref: "/es/politica-cookies",
    },
    modal: {
      title: "Preferencias de cookies",
      description:
        "Gestione sus preferencias por categoría. Las cookies necesarias son esenciales para el funcionamiento del sitio y no se pueden desactivar.",
      save: "Guardar mis preferencias",
      close: "Cerrar sin modificar mis preferencias",
      dismissHint: "Sin preferencias guardadas, cerrar mantiene solo las cookies necesarias.",
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
// Component
// ---------------------------------------------------------------------------

export default function CookieConsent({ locale = "fr" }: CookieConsentProps) {
  const t = translations[locale] || translations.fr;

  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [draftConsent, setDraftConsent] = useState(consent);
  const hasRecordedChoice = useRef(false);
  const hasInteracted = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initialisation
  useEffect(() => {
    // The first-visit banner is server-rendered. The head script hides it before
    // paint for valid stored choices; hydration then restores the actual consent.
    const frame = requestAnimationFrame(() => {
      if (hasInteracted.current) return;
      const stored = getStoredConsent();
      if (stored) {
        hasRecordedChoice.current = true;
        setShowBanner(false);
        setConsent(stored);
        setDraftConsent(stored);
        pushConsentToGTM(stored);
      } else {
        // Default consent (all denied) is already set by the <head> script in
        // the root layout before GTM loads. We just need to show the banner.
        setShowBanner(true);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Sauvegarder et appliquer le consentement
  const applyConsent = useCallback((newConsent: ConsentState) => {
    hasInteracted.current = true;
    hasRecordedChoice.current = true;
    setConsent(newConsent);
    setDraftConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    storeConsent(newConsent);
    pushConsentToGTM(newConsent);
  }, []);

  const handleAcceptAll = useCallback(() => {
    applyConsent({ necessary: true, analytics: true, marketing: true });
  }, [applyConsent]);

  const handleRejectAll = useCallback(() => {
    applyConsent({ necessary: true, analytics: false, marketing: false });
  }, [applyConsent]);

  const handleSavePreferences = useCallback(() => {
    applyConsent(draftConsent);
  }, [applyConsent, draftConsent]);

  const toggleCategory = useCallback((category: ConsentCategory) => {
    if (category === "necessary") return; // Toujours actif
    setDraftConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  // Bouton flottant pour rouvrir les préférences
  const handleOpenPreferences = useCallback(() => {
    hasInteracted.current = true;
    setDraftConsent(consent);
    setShowModal(true);
    setShowBanner(false);
  }, [consent]);

  const handleClosePreferences = useCallback(() => {
    // Dismissing the first visit is a refusal, never an implicit opt-in.
    // Later dismissals discard the draft without changing a saved choice.
    if (!hasRecordedChoice.current) {
      applyConsent({ necessary: true, analytics: false, marketing: false });
    } else {
      setDraftConsent(consent);
      setShowModal(false);
    }
  }, [applyConsent, consent]);

  useEffect(() => {
    const open = () => handleOpenPreferences();
    window.addEventListener("iter:open-cookie-preferences", open);
    return () => window.removeEventListener("iter:open-cookie-preferences", open);
  }, [handleOpenPreferences]);

  useEffect(() => {
    if (!showModal) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex="0"]',
    ) || []);
    focusable()[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClosePreferences();
      } else if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0], last = elements.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [showModal, handleClosePreferences]);

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Bannière de consentement                                          */}
      {/* ----------------------------------------------------------------- */}
      {showBanner && (
        <div
          data-consent-banner
          data-nosnippet
          role="dialog"
          aria-label={t.banner.title}
          aria-modal="false"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-2 md:p-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-[oklch(0.92_0.004_270)] bg-white shadow-2xl">
            <div className="p-3 md:p-6">
              {/* Titre */}
              <div className="mb-1 flex items-center gap-2">
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
                  className="flex-1 text-sm md:text-lg font-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "oklch(0.15 0.01 270)",
                  }}
                >
                  {t.banner.title}
                </h2>
                <button
                  onClick={handleRejectAll}
                  aria-label={t.modal.close}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p
                className="mb-1 text-sm leading-snug md:leading-relaxed"
                style={{ color: "oklch(0.45 0.01 270)" }}
              >
                {t.banner.description}
              </p>

              {/* Boutons */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-end sm:gap-3">
                <button
                  onClick={handleRejectAll}
                  className="min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.92 0.004 270)",
                    color: "oklch(0.45 0.01 270)",
                  }}
                >
                  {t.banner.rejectAll}
                </button>
                <button
                  onClick={handleOpenPreferences}
                  className="order-3 sm:order-none min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.42 0.28 275)",
                    color: "oklch(0.42 0.28 275)",
                  }}
                >
                  {t.banner.customize}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{ borderColor: "oklch(0.92 0.004 270)", color: "oklch(0.45 0.01 270)" }}
                >
                  {t.banner.acceptAll}
                </button>
                <a href={t.banner.policyHref} className="order-4 inline-flex min-h-11 items-center justify-center text-sm underline hover:no-underline" style={{ color: "oklch(0.42 0.28 275)" }}>{t.banner.policyLink}</a>
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
          data-cookie-overlay
          data-nosnippet
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClosePreferences();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-label={t.modal.title}
            aria-describedby="cookie-preferences-description"
            aria-modal="true"
            className="flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <div className="shrink-0 px-5 pt-5 pb-3">
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
                  onClick={handleClosePreferences}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                  aria-label={t.modal.close}
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
                id="cookie-preferences-description"
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.01 270)" }}
              >
                {t.modal.description}
              </p>
              <p className="mt-2 text-xs text-gray-600">{t.modal.dismissHint}</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5">

              {/* Catégories */}
              <div className="space-y-4">
                {(
                  ["necessary", "analytics", "marketing"] as ConsentCategory[]
                ).map((category) => {
                  const cat = t.modal.categories[category];
                  const isNecessary = category === "necessary";
                  const isActive = draftConsent[category];

                  return (
                    <div
                      key={category}
                      className="site-card rounded-xl border p-4"
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
                              className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
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
            </div>
              {/* Boutons */}
              <div className="flex shrink-0 flex-col gap-2 border-t border-gray-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:justify-end">
                <button
                  onClick={handleRejectAll}
                  className="min-h-11 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {t.banner.rejectAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: "oklch(0.92 0.004 270)",
                    color: "oklch(0.45 0.01 270)",
                  }}
                >
                  {t.modal.acceptAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="min-h-11 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                  style={{ backgroundColor: "oklch(0.42 0.28 275)" }}
                >
                  {t.modal.save}
                </button>
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
