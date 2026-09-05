export type ConsentState = { necessary: boolean; analytics: boolean; marketing: boolean };
export const CONSENT_KEY = "iter_cookie_consent";
export const CONSENT_DATE_KEY = "iter_cookie_consent_date";
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;

export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    const date = localStorage.getItem(CONSENT_DATE_KEY);
    if (!raw || !date) return null;
    const age = Date.now() - Date.parse(date);
    const value = JSON.parse(raw);
    if (!Number.isFinite(age) || age < 0 || age > MAX_AGE || !value ||
      typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;
    return { necessary: true, analytics: value.analytics, marketing: value.marketing };
  } catch { return null; }
}

export function storeConsent(consent: ConsentState): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
  } catch { /* A blocked storage must not prevent the current choice taking effect. */ }
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    iterConsent?: ConsentState;
    iterLoadGTM?: () => void;
  }
}

export function applyTrackingConsent(consent: ConsentState): void {
  window.dataLayer = window.dataLayer || [];
  window.iterConsent = consent;
  const gtag = window.gtag || function (...args: unknown[]) { window.dataLayer.push(args); };
  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
  if (!consent.marketing) window.dataLayer.push({ enhanced_conversion_data: null, lead: null });
  if (consent.analytics || consent.marketing) window.iterLoadGTM?.();
}

export function currentConsent(): ConsentState | null {
  return typeof window === "undefined" ? null : window.iterConsent || getStoredConsent();
}

// Runs in the document head before hydration. No Google request is made until
// the banner restores or records a valid positive choice. GTM owns Ads + GA4.
export const TRACKING_BOOTSTRAP = `(function(w,d){
  w.dataLayer=w.dataLayer||[];
  w.gtag=w.gtag||function(){w.dataLayer.push(arguments);};
  w.iterConsent={necessary:true,analytics:false,marketing:false};
  w.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted'});
  w.gtag('set','ads_data_redaction',true);
  w.gtag('set','url_passthrough',true);
  var loaded=false;
  w.iterLoadGTM=function(){
    if(loaded||!(w.iterConsent.analytics||w.iterConsent.marketing))return;
    loaded=true;
    w.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
    var s=d.createElement('script');s.async=true;s.id='iter-gtm';
    s.src='https://www.googletagmanager.com/gtm.js?id=GTM-KZZ9L5VZ';
    s.onerror=function(){loaded=false;s.remove();};
    d.head.appendChild(s);
  };
})(window,document);`;
