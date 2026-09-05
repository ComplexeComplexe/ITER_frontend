import { beforeEach, describe, expect, it, vi } from "vitest";
import { runInNewContext } from "node:vm";
import { TRACKING_BOOTSTRAP, getStoredConsent, applyTrackingConsent, storeConsent } from "../consent";

describe("consent-gated Google loader", () => {
  beforeEach(() => { localStorage.clear(); window.dataLayer = []; delete window.iterConsent; delete window.iterLoadGTM; });
  it("makes no script request initially and loads GTM only once after consent", () => {
    const scripts: Record<string, unknown>[] = [];
    const w: Record<string, any> = {};
    const d = {createElement: () => ({}), head: {appendChild: (s: Record<string, unknown>) => scripts.push(s)}};
    runInNewContext(TRACKING_BOOTSTRAP, {window:w,document:d});
    expect(scripts).toHaveLength(0);
    w.iterLoadGTM(); expect(scripts).toHaveLength(0);
    w.iterConsent.analytics = true;
    w.iterLoadGTM(); w.iterLoadGTM();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toBe("https://www.googletagmanager.com/gtm.js?id=GTM-KZZ9L5VZ");
    expect(w.dataLayer[0][0]).toBe("consent");
    expect(w.dataLayer[0][2].ad_storage).toBe("denied");
  });
  it("rejects missing, expired, future, invalid-date and non-boolean consent", () => {
    expect(getStoredConsent()).toBeNull();
    for (const date of ['invalid',new Date(Date.now()+86400000).toISOString(),new Date(0).toISOString()]) {
      localStorage.setItem('iter_cookie_consent',JSON.stringify({analytics:true,marketing:true}));
      localStorage.setItem('iter_cookie_consent_date',date);
      expect(getStoredConsent()).toBeNull();
    }
    localStorage.setItem('iter_cookie_consent_date',new Date().toISOString());
    localStorage.setItem('iter_cookie_consent',JSON.stringify({analytics:'true',marketing:false}));
    expect(getStoredConsent()).toBeNull();
  });
  it("restores a valid choice, updates consent before requesting GTM, and respects withdrawal", () => {
    storeConsent({necessary:true,analytics:true,marketing:false});
    const consent = getStoredConsent()!;
    window.gtag = vi.fn((...args) => window.dataLayer.push(args));
    window.iterLoadGTM = vi.fn(() => expect(window.dataLayer[0]).toMatchObject(['consent','update',{analytics_storage:'granted',ad_storage:'denied'}]));
    applyTrackingConsent(consent);
    expect(window.iterLoadGTM).toHaveBeenCalledTimes(1);
    applyTrackingConsent({necessary:true,analytics:false,marketing:false});
    expect(window.iterLoadGTM).toHaveBeenCalledTimes(1);
    expect(window.iterConsent?.analytics).toBe(false);
  });
  it("does not break the banner when storage is blocked", () => {
    const spy=vi.spyOn(Storage.prototype,'setItem').mockImplementation(()=>{throw new Error('blocked');});
    expect(()=>storeConsent({necessary:true,analytics:false,marketing:false})).not.toThrow();spy.mockRestore();
  });
});
