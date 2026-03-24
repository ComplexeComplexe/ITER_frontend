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
        "Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. Vous pouvez accepter tous les cookies, les refuser ou personnaliser vos préférences.",
      acceptAll: "Tout accepter",
      rejectAll: "Tout refuser",
      customize: "Personnaliser",
    },
    modal: {
      title: "Préférences de cookies",
      description:
        "Gérez vos préférences de cookies ci-dessous. Les cookies nécessaires sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.",
      save: "Enregistrer mes préférences",
      acceptAll: "Tout accepter",
      categories: {
        necessary: {
          title: "Cookies nécessaires",
          description:
            "Ces cookies sont indispensables au fonctionnement du site (navigation, sécurité, préférences de langue). Ils ne peuvent pas être désactivés.",
          always: "Toujours actifs",
        },
        analytics: {
          title: "Cookies analytiques",
          description:
            "Ces cookies nous permettent de mesurer l'audience du site et de comprendre comment les visiteurs l'utilisent, afin d'améliorer nos services (Google Analytics).",
        },
        marketing: {
          title: "Cookies marketing",
          description:
            "Ces cookies sont utilisés pour vous proposer des publicités pertinentes et mesurer l'efficacité de nos campagnes (Google Ads, réseaux sociaux).",
        },
      },
    },
    footer: "Gérer les cookies",
  },
  en: {
    banner: {
      title: "We respect your privacy",
      description:
        "We use cookies to analyze traffic and improve your experience. You can accept all cookies, reject them, or customize your preferences.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
    },
    modal: {
      title: "Cookie preferences",
      description:
        "Manage your cookie preferences below. Necessary cookies are essential for the website to function and cannot be disabled.",
      save: "Save my preferences",
      acceptAll: "Accept all",
      categories: {
        necessary: {
          title: "Necessary cookies",
          description:
            "These cookies are essential for the website to function (navigation, security, language preferences). They cannot be disabled.",
          always: "Always active",
        },
        analytics: {
          title: "Analytics cookies",
          description:
            "These cookies allow us to measure website traffic and understand how visitors use it, in order to improve our services (Google Analytics).",
        },
        marketing: {
          title: "Marketing cookies",
          description:
            "These cookies are used to show you relevant ads and measure the effectiveness of our campaigns (Google Ads, social media).",
        },
      },
    },
    footer: "Manage cookies",
  },
  es: {
    banner: {
      title: "Respetamos su privacidad",
      description:
        "Utilizamos cookies para analizar el tráfico y mejorar su experiencia. Puede aceptar todas las cookies, rechazarlas o personalizar sus preferencias.",
      acceptAll: "Aceptar todo",
      rejectAll: "Rechazar todo",
      customize: "Personalizar",
    },
    modal: {
      title: "Preferencias de cookies",
      description:
        "Gestione sus preferencias de cookies a continuación. Las cookies necesarias son esenciales para el funcionamiento del sitio y no se pueden desactivar.",
      save: "Guardar mis preferencias",
      acceptAll: "Aceptar todo",
      categories: {
        necessary: {
          title: "Cookies necesarias",
          description:
            "Estas cookies son esenciales para el funcionamiento del sitio (navegación, seguridad, preferencias de idioma). No se pueden desactivar.",
          always: "Siempre activas",
        },
        analytics: {
          title: "Cookies analíticas",
          description:
            "Estas cookies nos permiten medir el tráfico del sitio y comprender cómo lo utilizan los visitantes, para mejorar nuestros servicios (Google Analytics).",
        },
        marketing: {
          title: "Cookies de marketing",
          description:
            "Estas cookies se utilizan para mostrarle anuncios relevantes y medir la eficacia de nuestras campañas (Google Ads, redes sociales).",
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
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

function pushConsentToGTM(consent: ConsentState): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(Object.fromEntries(args.map((a, i) => [i, a])));
  }

  // Google Consent Mode v2
  window.dataLayer.push({
    event: "consent_update",
    consent_analytics: consent.analytics ? "granted" : "denied",
    consent_marketing: consent.marketing ? "granted" : "denied",
  });

  // Utiliser gtag consent update si disponible
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  }
}

function setDefaultConsent(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  // Pousser le consentement par défaut (tout denied)
  window.dataLayer.push({
    event: "consent_default",
    consent_analytics: "denied",
    consent_marketing: "denied",
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
      setDefaultConsent();
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
                className="mb-5 text-sm leading-relaxed"
                style={{ color: "oklch(0.45 0.01 270)" }}
              >
                {t.banner.description}
              </p>

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
                    </div>
                  );
                })}
              </div>

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
