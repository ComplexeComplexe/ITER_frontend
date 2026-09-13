import { describe, expect, it } from 'vitest';
import { runInNewContext } from 'node:vm';
import { renderToString } from 'react-dom/server';
import CookieConsent from '@/components/CookieConsent';
import { CONSENT_DISPLAY_BOOTSTRAP } from '../consent';

function hiddenByBootstrap(raw: string | null, date: string | null, blocked = false) {
  const classes: string[] = [];
  const document = { documentElement: { classList: { add: (name: string) => classes.push(name) } } };
  const window = { localStorage: { getItem: (key: string) => {
    if (blocked) throw new Error('storage blocked');
    return key === 'iter_cookie_consent' ? raw : date;
  } } };
  runInNewContext(CONSENT_DISPLAY_BOOTSTRAP, {window, document});
  return classes.includes('iter-consent-stored');
}

describe('first-paint consent banner', () => {
  it.each(['fr','en','es'] as const)('renders the %s consent choice in server HTML', locale => {
    const html = renderToString(<CookieConsent locale={locale} />);
    expect(html).toContain('data-consent-banner');
    expect(html).toContain('role="dialog"');
    expect(html).not.toContain('googletagmanager.com');
  });
  it('hides the initial banner for a valid refusal as well as acceptance', () => {
    for (const accepted of [false, true]) {
      expect(hiddenByBootstrap(JSON.stringify({analytics: accepted, marketing: accepted}), new Date().toISOString())).toBe(true);
    }
  });
  it('keeps the banner visible for invalid, expired, future or unavailable storage', () => {
    const valid = JSON.stringify({analytics: true, marketing: false});
    for (const date of [null, 'invalid', new Date(0).toISOString(), new Date(Date.now()+86400000).toISOString()]) {
      expect(hiddenByBootstrap(valid, date)).toBe(false);
    }
    for (const raw of [null, '{', JSON.stringify({analytics:'true',marketing:false})]) {
      expect(hiddenByBootstrap(raw, new Date().toISOString())).toBe(false);
    }
    expect(hiddenByBootstrap(valid, new Date().toISOString(), true)).toBe(false);
  });
});
