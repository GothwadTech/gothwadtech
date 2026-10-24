import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const EcosystemPage = lazy(() => import('./pages/EcosystemPage').then((m) => ({ default: m.EcosystemPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })));
const DocsPage = lazy(() => import('./pages/DocsPage').then((m) => ({ default: m.DocsPage })));
const CompanyPage = lazy(() => import('./pages/CompanyPage').then((m) => ({ default: m.CompanyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const ROUTES = ['home', 'ecosystem', 'products', 'solutions', 'docs', 'company', 'contact'];

const ROUTE_ALIASES: Record<string, string> = {
  '': 'home',
  '/': 'home',
  about: 'company',
  portfolio: 'ecosystem',
  browser: 'products',
  leadership: 'company',
};

function pageFromPathname(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';
  if (!seg) return 'home';
  const target = ROUTE_ALIASES[seg] ?? seg;
  return ROUTES.includes(target) ? target : 'home';
}

function pageFromHash(hash: string): string | null {
  const raw = hash.replace(/^#/, '').toLowerCase().trim();
  if (!raw) return null;
  const target = ROUTE_ALIASES[raw] ?? raw;
  return ROUTES.includes(target) ? target : null;
}

const pathForPage = (page: string) => (page === 'home' ? '/' : `/${page}`);

const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Gothwad Tech — Official Website | Everything Gothwad, in one place',
    description: 'Official Gothwad Tech portal. One Gothwad Account for Mail, Drive, Meet, Store, Tube, GrixChat, Indogram, Browser, Education, AI, Docs and CEO — with direct links & source on GitHub.',
  },
  ecosystem: {
    title: 'Ecosystem — All Gothwad Products & Direct Links | Gothwad Tech',
    description: 'Browse the full Gothwad ecosystem: Accounts, Mail, Drive, Meet, Tube, Browser, GrixChat, Indogram, Launcher, Manager, Education, AI, Docs and more — each with live links and GitHub source.',
  },
  products: {
    title: 'Products — Sovereign Apps: Browser, GrixChat, Indogram | Gothwad Tech',
    description: 'Sovereign Indian apps: Gothwad Browser (11.8 MB), GrixChat (<15ms) and Indogram (200k communities) plus Mail, Drive, Meet, Tube and the full product catalog.',
  },
  solutions: {
    title: 'Solutions — School ERP, Restaurant POS, Retail & Enterprise | Gothwad Tech',
    description: 'Digital solutions for Indian businesses: school management suites, restaurant ordering & POS, shop billing & Khata, custom ERP and sovereign engine builds.',
  },
  docs: {
    title: 'Docs — Developer Documentation | Gothwad Tech',
    description: 'Central documentation for Gothwad ecosystem: Accounts OAuth/PKCE, Mail setup, API reference, Tube web, GrixChat, Meet and guides with source citations.',
  },
  company: {
    title: 'Company — Leadership & Mission | Gothwad Tech',
    description: 'About Gothwad Tech: mission Aatmanirbhar Bharat, leadership (Pawan Gothwad, Yuvkesh Meena), sovereign consumer tech and enterprise platforms from Jaipur, India.',
  },
  contact: {
    title: 'Contact — Connect with Gothwad Tech',
    description: 'Contact Gothwad Tech: business desk, support, help and general info. WhatsApp +91 73399 04665, emails: contact, support, help, info @gothwadtech.com.',
  },
};

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    const isLink = selector.startsWith('link');
    el = document.createElement(isLink ? 'link' : 'meta');
    if (isLink) el.setAttribute('rel', 'canonical');
    else {
      const name = selector.includes('property=') ? 'property' : 'name';
      const m = selector.match(/\[(?:name|property)="([^"]+)"\]/);
      const raw = m?.[1];
      if (raw) el.setAttribute(name, raw);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-700 border-t-[#0494f4] rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  const [activePage, setActivePage] = useState<string>(() => {
    // hydrate from URL immediately (SSR-safe)
    if (typeof window !== 'undefined') {
      const legacy = pageFromHash(window.location.hash);
      if (legacy) return legacy;
      return pageFromPathname(window.location.pathname);
    }
    return 'home';
  });

  const handleNavigate = (page: string) => {
    const norm = ROUTES.includes(page) ? page : 'home';
    setActivePage(norm);
    const path = pathForPage(norm);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const legacy = pageFromHash(window.location.hash);
    if (legacy) {
      window.history.replaceState({}, '', pathForPage(legacy));
      setActivePage(legacy);
    } else {
      setActivePage(pageFromPathname(window.location.pathname));
    }
    const sync = () => setActivePage(pageFromPathname(window.location.pathname));
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  useEffect(() => {
    const meta = PAGE_META[activePage] ?? PAGE_META.home;
    const url = `https://gothwadtech.com${pathForPage(activePage)}`;
    document.title = meta.title;
    setMeta('meta[name=\"description\"]', 'content', meta.description);
    setMeta('meta[property=\"og:title\"]', 'content', meta.title);
    setMeta('meta[property=\"og:description\"]', 'content', meta.description);
    setMeta('meta[property=\"og:url\"]', 'content', url);
    setMeta('meta[name=\"twitter:title\"]', 'content', meta.title);
    setMeta('meta[name=\"twitter:description\"]', 'content', meta.description);
    setMeta('meta[name=\"twitter:url\"]', 'content', url);
    setMeta('link[rel=\"canonical\"]', 'href', url);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#0494f4]/25 selection:text-[#0494f4] flex flex-col font-sans">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1 pt-[56px]">
        <Suspense fallback={<RouteFallback />}>
          {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {activePage === 'ecosystem' && <EcosystemPage />}
          {activePage === 'products' && <ProductsPage />}
          {activePage === 'solutions' && <SolutionsPage onNavigate={handleNavigate} />}
          {activePage === 'docs' && <DocsPage />}
          {activePage === 'company' && <CompanyPage onNavigate={handleNavigate} />}
          {activePage === 'contact' && <ContactPage />}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />
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
