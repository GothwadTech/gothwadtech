/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectItem } from './types';
import { MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';

// Distinct Pages — code-split so the initial bundle only carries the portal.
const PortalHome = lazy(() =>
  import('./pages/PortalHome').then((m) => ({ default: m.PortalHome })),
);
// Corporate (agency) homepage. Kept reachable at /legacy until the company
// site is live on about.gothwadtech.com — after that it gets deleted here.
const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const SolutionsPage = lazy(() =>
  import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })),
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })),
);
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);

// Modals — only fetched when actually opened.
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then((m) => ({
    default: m.ProjectDetailModal,
  })),
);
const BrowserSimulatorModal = lazy(() =>
  import('./components/BrowserSimulatorModal').then((m) => ({
    default: m.BrowserSimulatorModal,
  })),
);
const OrderModal = lazy(() =>
  import('./components/OrderModal').then((m) => ({ default: m.OrderModal })),
);

const ROUTES = [
  'legacy',
  'solutions',
  'products',
  'portfolio',
  'about',
  'contact',
];

// Legacy hash anchors that map onto a real page.
const ROUTE_ALIASES: Record<string, string> = {
  browser: 'products',
  leadership: 'about',
};

const isRoute = (value: string) => ROUTES.includes(value);

// '/products/' -> 'products'; '/Products' -> 'products'; unknown -> 'home'
function pageFromPathname(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';
  if (!segment) return 'home';
  const target = ROUTE_ALIASES[segment] ?? segment;
  return isRoute(target) ? target : 'home';
}

const pathForPage = (page: string) => (page === 'home' ? '/' : `/${page}`);

const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title:
      'Gothwad Tech — Sovereign Software Systems, Web Platforms & High-Performance Browsers',
    description:
      "Official website of Gothwad Tech — India's premier sovereign software powerhouse founded by Pawan Gothwad. Builders of the ultra-fast Gothwad Browser, enterprise web applications, mobile platforms, and deep-tech digital engineering.",
  },
  legacy: {
    title: 'Gothwad Tech — Sovereign Software Systems & Digital Engineering',
    description:
      'The Gothwad Tech company site: enterprise web platforms, mobile apps, AI systems and the Gothwad Browser.',
  },
  solutions: {
    title: 'Enterprise Solutions — Gothwad Tech',
    description:
      'Enterprise web and distributed systems, native and cross-platform mobile engineering, applied AI and intelligent automation, and zero-trust cybersecurity from Gothwad Tech.',
  },
  products: {
    title: 'Products — Gothwad Browser & Sovereign Indian Tech | Gothwad Tech',
    description:
      'Explore the Gothwad Browser, GrixChat and Indogram — sovereign Indian consumer technology engineered under the Atmanirbhar Bharat mission.',
  },
  portfolio: {
    title: 'Portfolio — Delivered Enterprise Projects | Gothwad Tech',
    description:
      'A selection of enterprise platforms, billing systems and high-concurrency web applications delivered by Gothwad Tech for clients across India.',
  },
  about: {
    title: 'About & Leadership — Gothwad Tech',
    description:
      'Meet the leadership behind Gothwad Tech and read about our mission to build technological sovereignty for India.',
  },
  contact: {
    title: 'Contact — Start a Project | Gothwad Tech',
    description:
      "Talk to the Gothwad Tech engineering team about enterprise web platforms, mobile apps, AI systems or a custom browser build. Reach us by phone, WhatsApp or email.",
  },
};

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    // index.html defines the common tags; this only guards against a missing one.
    const isLink = selector.startsWith('link');
    el = document.createElement(isLink ? 'link' : 'meta');
    if (isLink) el.setAttribute('rel', 'canonical');
    else {
      const name = selector.includes('property=') ? 'property' : 'name';
      const raw = selector.match(/\[(?:name|property)="([^"]+)"\]/)?.[1];
      if (raw) el.setAttribute(name, raw);
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// '#Products' -> 'products'; '#docs' (a plain in-page anchor) -> null
function pageFromHash(hash: string): string | null {
  const raw = hash.replace(/^#/, '').toLowerCase();
  if (!raw) return null;
  const target = ROUTE_ALIASES[raw] ?? raw;
  return isRoute(target) ? target : null;
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
  // Page state: 'home' | 'solutions' | 'products' | 'portfolio' | 'about' | 'contact'
  const [activePage, setActivePage] = useState<string>('home');

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [modalInitialService, setModalInitialService] = useState<string>('');

  const handleOpenOrderModal = (serviceTitle?: string) => {
    if (serviceTitle) {
      setModalInitialService(serviceTitle);
    }
    setIsOrderModalOpen(true);
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    const path = pathForPage(page);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  // Real path routing, with a one-time redirect for legacy hash URLs.
  useEffect(() => {
    // Old links like gothwadtech.com/#products are rewritten to /products so
    // they keep working, and so crawlers see a canonical path. Plain in-page
    // anchors such as #docs are left untouched.
    const legacy = pageFromHash(window.location.hash);
    if (legacy) {
      window.history.replaceState({}, '', pathForPage(legacy));
    }

    const sync = () => setActivePage(pageFromPathname(window.location.pathname));
    sync();

    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  // Per-route SEO tags — an SPA only gets real SEO value from path routing
  // if the crawled metadata actually changes with the route.
  useEffect(() => {
    const meta = PAGE_META[activePage] ?? PAGE_META.home;
    const url = `https://gothwadtech.com${pathForPage(activePage)}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('meta[name="twitter:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [activePage]);

  // The portal ships its own bar and footer, so the corporate Navbar/Footer
  // must not double up on that route.
  const isPortal = activePage === 'home';

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#0494f4]/25 selection:text-[#0494f4] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar — corporate pages only */}
      {!isPortal && (
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          onOpenOrderModal={handleOpenOrderModal}
        />
      )}

      {/* Main Page Body */}
      <main className={`flex-1 ${isPortal ? '' : 'pt-14'}`}>
        <Suspense fallback={<RouteFallback />}>
          {activePage === 'home' && <PortalHome />}

          {activePage === 'legacy' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenOrderModal={handleOpenOrderModal}
              onOpenBrowserSimulator={() => setIsSimulatorOpen(true)}
            />
          )}

          {activePage === 'solutions' && (
            <SolutionsPage
              onOpenOrderModal={handleOpenOrderModal}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'products' && (
            <ProductsPage
              onOpenBrowserSimulator={() => setIsSimulatorOpen(true)}
              onOpenOrderModal={handleOpenOrderModal}
            />
          )}

          {activePage === 'portfolio' && (
            <PortfolioPage
              onSelectProject={(proj) => setSelectedProject(proj)}
              onOpenOrderModal={handleOpenOrderModal}
            />
          )}

          {activePage === 'about' && (
            <AboutPage
              onOpenOrderModal={handleOpenOrderModal}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'contact' && (
            <ContactPage
              onOpenOrderModal={handleOpenOrderModal}
            />
          )}
        </Suspense>
      </main>

      {/* Footer — corporate pages only */}
      {!isPortal && (
        <Footer
          onNavigate={handleNavigate}
          onOpenOrderModal={handleOpenOrderModal}
        />
      )}

      {/* Floating Action WhatsApp & Phone Contact — corporate pages only */}
      <div
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 ${
          isPortal ? 'hidden' : ''
        }`}
      >
        <a
          href="tel:07339904665"
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 text-white font-bold text-xs shadow-md border border-zinc-700 transition-colors cursor-pointer"
          title="Direct Call Desk"
        >
          <Phone className="w-3.5 h-3.5 text-[#0494f4]" />
          <span>+91 73399 04665</span>
        </a>

        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech%20Team,%20I%20want%20to%20discuss%20a%20digital%20solution/project!`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          aria-label="Direct WhatsApp Contact"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>WhatsApp Desk</span>
        </a>
      </div>

      {/* Interactive Modals — each chunk is fetched only when opened */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenOrderModal={handleOpenOrderModal}
          />
        </Suspense>
      )}

      {isSimulatorOpen && (
        <Suspense fallback={null}>
          <BrowserSimulatorModal
            isOpen
            onClose={() => setIsSimulatorOpen(false)}
            onOpenOrderModal={handleOpenOrderModal}
          />
        </Suspense>
      )}

      {isOrderModalOpen && (
        <Suspense fallback={null}>
          <OrderModal
            isOpen
            onClose={() => setIsOrderModalOpen(false)}
            initialService={modalInitialService}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
