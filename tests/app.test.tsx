/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import { setSystemTheme } from './setup';

function mockAnonymousSession() {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ authenticated: false }), { status: 200, headers: { 'content-type': 'application/json' } }))
  );
}

function goTo(path: string) {
  window.history.replaceState({}, '', path);
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
  setSystemTheme(false);
  mockAnonymousSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('app shell', () => {
  it('renders the home page', async () => {
    goTo('/');
    render(<App />);
    expect(await screen.findByRole('search')).toBeTruthy();
    expect(document.querySelector('h1')?.textContent).toMatch(/Gothwad Tech/i);
    expect(screen.getAllByText(/Everything Gothwad/i).length).toBeGreaterThan(0);
  });

  it('gives every internal nav item a real href', async () => {
    goTo('/');
    render(<App />);
    const primary = await screen.findByRole('navigation', { name: 'Primary' });
    const hrefs = Array.from(primary.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('/ecosystem');
    expect(hrefs).toContain('/products');
    expect(hrefs).toContain('/solutions');
    expect(hrefs).toContain('/docs');
    expect(hrefs).toContain('/company');
  });

  it('renders only one footer on the home page', async () => {
    goTo('/');
    render(<App />);
    await screen.findByRole('search');
    expect(document.querySelectorAll('footer').length).toBe(1);
  });

  it('renders the 404 page for an unknown path', async () => {
    goTo('/definitely-not-a-page');
    render(<App />);
    expect(await screen.findByText('Page not found')).toBeTruthy();
    expect(document.title).toContain('Page not found');
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toContain('noindex');
  });

  it('renders the account-slot route as the plain route', async () => {
    goTo('/u/3/docs');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /Docs/i })).toBeTruthy();
    // canonical must never leak the slot
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://gothwadtech.com/docs');
  });

  it('sets per-route canonical and social tags', async () => {
    goTo('/ecosystem');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /All Gothwad products/i });

    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://gothwadtech.com/ecosystem');
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://gothwadtech.com/ecosystem');
    expect(document.querySelector('meta[name="twitter:url"]')?.getAttribute('content')).toBe('https://gothwadtech.com/ecosystem');

    // hreflang must follow the route, not stay pinned to the homepage
    const hreflangs = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((l) =>
      l.getAttribute('href')
    );
    expect(hreflangs.length).toBeGreaterThan(0);
    hreflangs.forEach((href) => expect(href).toBe('https://gothwadtech.com/ecosystem'));
  });

  it('removes the static JSON-LD fallbacks once mounted', async () => {
    document.head.insertAdjacentHTML(
      'beforeend',
      '<script type="application/ld+json" id="ld-webpage-fallback">{}</script>' +
        '<script type="application/ld+json" id="ld-breadcrumb-fallback">{}</script>'
    );
    goTo('/docs');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /Docs/i });
    await waitFor(() => {
      expect(document.getElementById('ld-webpage-fallback')).toBeNull();
      expect(document.getElementById('ld-breadcrumb-fallback')).toBeNull();
    });
    expect(document.getElementById('ld-webpage-dynamic')).not.toBeNull();
  });

  it('filters the ecosystem directory from a ?q= deep link', async () => {
    goTo('/ecosystem?q=tube');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /All Gothwad products/i });
    const search = screen.getByRole('searchbox', { name: /Search products/i }) as HTMLInputElement;
    expect(search.value).toBe('tube');
    // The filter is applied from the URL, not just the input value.
    const summary = screen.getByText(/Showing \d+ of 26 products/i);
    const shown = Number(summary.textContent?.match(/Showing (\d+)/)?.[1] ?? 0);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(26);
    // …and the URL is kept in sync for sharing.
    expect(window.location.search).toContain('q=tube');
  });
});
