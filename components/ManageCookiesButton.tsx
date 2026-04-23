"use client";

export default function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => {
        try {
          localStorage.removeItem("iter_cookie_consent");
          localStorage.removeItem("iter_cookie_consent_date");
        } catch {
          /* ignore */
        }
        // Reload to re-trigger the consent banner via CookieConsent effect.
        window.location.reload();
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
    >
      {label}
    </button>
  );
}
