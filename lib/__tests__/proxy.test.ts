import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '../../proxy';

describe('Next 16 proxy routing', () => {
  it.each([
    ['/fr/daf-externalise?source=test', '/daf-externalise?source=test'],
    ['/en/en/contact', '/en/contact'],
    ['/en/daf-externalise', '/en/fractional-cfo'],
  ])('preserves the redirect from %s to %s', (from, to) => {
    const response = proxy(new NextRequest('https://www.iteradvisors.com' + from));
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://www.iteradvisors.com' + to);
  });
  it('lets a canonical content request continue', () => {
    expect(proxy(new NextRequest('https://www.iteradvisors.com/daf-externalise')).headers.get('x-middleware-next')).toBe('1');
  });
});
