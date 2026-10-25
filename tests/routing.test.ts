import { describe, expect, it } from 'vitest';
import {
  APP_DOMAIN,
  buildAccountSlotPath,
  buildSignInUrl,
  formatGothwadEmail,
  parseAuthuserFromUrl,
  stripAuthuserPath,
} from '../src/config/brand';
import { hrefForPage, pageFromHash, pageFromPathname, pathForPage } from '../src/lib/routing';

describe('parseAuthuserFromUrl', () => {
  it('reads the account slot from the path', () => {
    expect(parseAuthuserFromUrl('/u/3/docs', '')).toEqual({ authuser: 3, hasExplicitSlot: true });
    expect(parseAuthuserFromUrl('/u/0/', '')).toEqual({ authuser: 0, hasExplicitSlot: true });
  });

  it('reads the account slot from the query string', () => {
    expect(parseAuthuserFromUrl('/', '?authuser=2')).toEqual({ authuser: 2, hasExplicitSlot: true });
    expect(parseAuthuserFromUrl('/', '?u=5')).toEqual({ authuser: 5, hasExplicitSlot: true });
  });

  it('ignores out-of-range and malformed slots', () => {
    expect(parseAuthuserFromUrl('/u/9/', '')).toEqual({ authuser: 0, hasExplicitSlot: false });
    expect(parseAuthuserFromUrl('/docs', '?authuser=abc')).toEqual({ authuser: 0, hasExplicitSlot: false });
    // /u/12 must not be read as slot 1
    expect(parseAuthuserFromUrl('/u/12/docs', '')).toEqual({ authuser: 0, hasExplicitSlot: false });
  });
});

describe('stripAuthuserPath', () => {
  it('removes the slot prefix', () => {
    expect(stripAuthuserPath('/u/1/docs')).toBe('/docs');
    expect(stripAuthuserPath('/u/1')).toBe('/');
    expect(stripAuthuserPath('/u/1/')).toBe('/');
  });

  it('leaves ordinary paths untouched', () => {
    expect(stripAuthuserPath('/ecosystem')).toBe('/ecosystem');
    expect(stripAuthuserPath('/')).toBe('/');
    expect(stripAuthuserPath('/u/9/docs')).toBe('/u/9/docs');
  });
});

describe('buildAccountSlotPath', () => {
  it('clamps invalid slots to 0', () => {
    expect(buildAccountSlotPath(4)).toBe('/u/4/');
    expect(buildAccountSlotPath(9)).toBe('/u/0/');
    expect(buildAccountSlotPath(-1)).toBe('/u/0/');
    expect(buildAccountSlotPath(1.5)).toBe('/u/0/');
  });
});

describe('formatGothwadEmail', () => {
  it('appends the domain when missing', () => {
    expect(formatGothwadEmail('Pawan')).toBe('pawan@gothwadtech.com');
    expect(formatGothwadEmail('pawan@gothwadtech.com')).toBe('pawan@gothwadtech.com');
    expect(formatGothwadEmail('')).toBe('');
  });
});

describe('buildSignInUrl', () => {
  it('always carries next and optional flags', () => {
    const url = new URL(buildSignInUrl('https://gothwadtech.com/docs', { choose: true, add: true }));
    expect(url.pathname).toBe('/signin');
    expect(url.searchParams.get('next')).toBe('https://gothwadtech.com/docs');
    expect(url.searchParams.get('choose')).toBe('1');
    expect(url.searchParams.get('add')).toBe('1');
    expect(url.host).toBe(`accounts.${APP_DOMAIN}`);
  });
});

describe('routing', () => {
  it('maps known paths and aliases', () => {
    expect(pageFromPathname('/')).toBe('home');
    expect(pageFromPathname('/ecosystem')).toBe('ecosystem');
    expect(pageFromPathname('/ECOSYSTEM')).toBe('ecosystem');
    expect(pageFromPathname('/about')).toBe('company');
    expect(pageFromPathname('/portfolio')).toBe('ecosystem');
    expect(pageFromPathname('/browser')).toBe('products');
    expect(pageFromPathname('/u/2/docs')).toBe('docs');
  });

  it('returns null for unknown paths so a real 404 can render', () => {
    expect(pageFromPathname('/nope')).toBeNull();
    expect(pageFromHash('#nope')).toBeNull();
  });

  it('resolves legacy hash routes', () => {
    expect(pageFromHash('#docs')).toBe('docs');
    expect(pageFromHash('#leadership')).toBe('company');
    expect(pageFromHash('')).toBeNull();
  });

  it('builds clean paths', () => {
    expect(pathForPage('home')).toBe('/');
    expect(pathForPage('ecosystem')).toBe('/ecosystem');
  });

  it('preserves the account slot only when one is active', () => {
    expect(hrefForPage('docs', 0, false)).toBe('/docs');
    expect(hrefForPage('docs', 2, true)).toBe('/u/2/docs');
    expect(hrefForPage('home', 2, true)).toBe('/u/2/');
  });
});
