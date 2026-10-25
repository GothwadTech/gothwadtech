import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import pageMeta from './data/pageMeta.json';
import {
  type PageKey,
  pageFromHash,
  pageFromPathname,
  pathForPage,
  hrefForPage,
} from './lib/routing';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage').then((m) => ({ default: m.EcosystemPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then((m) => ({ default: m.DocsPage })));
const CompanyPage = lazy(() => import('./pages/CompanyPage').then((m) => ({ default: m.CompanyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

type PageMetaJson = {
  path: string;
  label: string;
  title: string;
  description: string;
  keywords?: string;
  heading: string;
  lede: string;
};

const META = pageMeta as Record<PageKey, PageMetaJson>;

const ORIGIN = 'https://gothwadtech.com';
const OG_IMAGE = `${ORIGIN}/assets/brand/og-image.png`;
const LAST_MODIFIED = '2026-10-25';

type Navigate = (page: PageKey) => void;

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    const isLink = selector.startsWith('link');
    el = document.createElement(isLink ? 'link' : 'meta');
    if (isLink) {
      const relMatch = selector.match(/rel="([^"]+)"/);
      el.setAttribute('rel', relMatch?.[1] ?? 'canonical');
      const hreflangMatch = selector.match(/hreflang="([^"]+)"/);
      if (hreflangMatch) el.setAttribute('hreflang', hreflangMatch[1]);
    } else {
      const nameMatch = selector.match(/\[(?:name|property)="([^"]+)"\]/);
      if (nameMatch) {
        el.setAttribute(selector.includes('property=') ? 'property' : 'name', nameMatch[1]);
      }
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

function buildBreadcrumbJsonLd(items: { name: string; path: string }[], canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${ORIGIN}${item.path}`,
    })),
  };
}

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-[#0494f4] rounded-full animate-spin" />
    </div>
  );
}

const NotFoundPage: React.FC = () => (
  <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 text-center">
    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0494f4]">404</p>
    <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Page not found</h1>
    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      That URL does not exist on gothwadtech.com. Try the ecosystem directory instead.
    </p>
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <a href="/" className="px-4 py-2 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-sm font-medium">Home</a>
      <a href="/ecosystem" className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium">Ecosystem</a>
      <a href="/contact" className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium">Contact</a>
    </div>
  </div>
);

function AppContent() {
  const [activePage, setActivePage] = useState<PageKey | null>(() => {
    if (typeof window === 'undefined') return 'home';
    return pageFromHash(window.location.hash) ?? pageFromPathname(window.location.pathname);
  });

  const navigate = useCallback<Navigate>((page) => {
    const href = hrefForPage(page);
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== href) {
      window.history.pushState({ page }, '', href);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Normalise legacy hash routes (#docs) into real paths once, without a re-render.
  useEffect(() => {
    const legacy = pageFromHash(window.location.hash);
    if (legacy) window.history.replaceState({ page: legacy }, '', hrefForPage(legacy));
  }, []);

  // Browser back/forward.
  useEffect(() => {
    const sync = () => setActivePage(pageFromPathname(window.location.pathname));
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    // The prerendered / static JSON-LD blocks are replaced by the live ones below.
    removeJsonLd('ld-webpage-fallback');
    removeJsonLd('ld-webpage-prerendered');
    removeJsonLd('ld-breadcrumb-fallback');

    if (!activePage) {
      document.title = 'Page not found | Gothwad Tech';
      setMeta('meta[name="description"]', 'content', 'The requested page does not exist on gothwadtech.com.');
      setMeta('meta[name="robots"]', 'content', 'noindex, follow');
      setMeta('meta[name="googlebot"]', 'content', 'noindex, follow');
      return;
    }

    const meta = META[activePage];
    const canonical = `${ORIGIN}${pathForPage(activePage)}`;
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    if (activePage !== 'home') breadcrumbs.push({ name: meta.label, path: meta.path });

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    if (meta.keywords) setMeta('meta[name="keywords"]', 'content', meta.keywords);
    setMeta('meta[name="title"]', 'content', meta.title);

    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', canonical);
    setMeta('link[rel="alternate"][hreflang="en-IN"]', 'href', canonical);
    setMeta('link[rel="alternate"][hreflang="en"]', 'href', canonical);

    setMeta('meta[property="og:type"]', 'content', activePage === 'home' ? 'website' : 'article');
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', OG_IMAGE);
    setMeta('meta[property="og:image:secure_url"]', 'content', OG_IMAGE);

    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:url"]', 'content', canonical);
    setMeta('meta[name="twitter:image"]', 'content', OG_IMAGE);

    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('meta[name="googlebot"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    const pageType =
      activePage === 'ecosystem' ? 'CollectionPage'
        : activePage === 'company' ? 'AboutPage'
          : activePage === 'contact' ? 'ContactPage'
            : 'WebPage';

    upsertJsonLd('ld-webpage-dynamic', {
      '@context': 'https://schema.org',
      '@type': pageType,
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': `${ORIGIN}/#website` },
      about: { '@id': `${ORIGIN}/#organization` },
      inLanguage: 'en-IN',
      datePublished: '2023-01-01T00:00:00+05:30',
      dateModified: `${LAST_MODIFIED}T00:00:00+05:30`,
      primaryImageOfPage: { '@id': `${ORIGIN}/#logo` },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
    });
    upsertJsonLd('ld-breadcrumb-dynamic', buildBreadcrumbJsonLd(breadcrumbs, canonical));

    // Ecosystem ItemList lives with EcosystemPage so the product data stays in that chunk.
  }, [activePage]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#0494f4]/25 selection:text-[#0494f4] flex flex-col font-sans">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#0494f4] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      <Navbar activePage={activePage} onNavigate={navigate} />

      <main id="main" tabIndex={-1} className="flex-1 pt-[56px] focus:outline-none">
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            {activePage === 'home' && <HomePage onNavigate={navigate} />}
            {activePage === 'ecosystem' && <EcosystemPage onNavigate={navigate} />}
            {activePage === 'products' && <ProductsPage onNavigate={navigate} />}
            {activePage === 'solutions' && <SolutionsPage onNavigate={navigate} />}
            {activePage === 'docs' && <DocsPage onNavigate={navigate} />}
            {activePage === 'company' && <CompanyPage onNavigate={navigate} />}
            {activePage === 'contact' && <ContactPage onNavigate={navigate} />}
            {!activePage && <NotFoundPage />}
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
