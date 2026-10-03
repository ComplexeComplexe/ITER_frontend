"use client";

export default function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new Event("iter:open-cookie-preferences"));
      }}
      className="site-button site-button-secondary inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
    >
      {label}
    </button>
  );
}
