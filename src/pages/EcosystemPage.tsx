import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Github, Search, ExternalLink } from 'lucide-react';
import { ECOSYSTEM_APPS, CATEGORIES } from '../data/ecosystem';
import type { CategoryId } from '../data/ecosystem';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { PageKey } from '../lib/routing';

function readInitialQuery(): string {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('q') ?? '';
}

function readInitialCategory(): CategoryId {
  if (typeof window === 'undefined') return 'all';
  const raw = new URLSearchParams(window.location.search).get('category') ?? '';
  return (CATEGORIES as readonly { id: string }[]).some((category) => category.id === raw) ? (raw as CategoryId) : 'all';
}

const ORIGIN = 'https://gothwadtech.com';

/** ItemList structured data for the directory — kept with the page that owns the data. */
function useEcosystemItemList() {
  useEffect(() => {
    const id = 'ld-itemlist-ecosystem';
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${ORIGIN}/ecosystem#products`,
      name: 'Gothwad Ecosystem — All Products',
      description: 'Every Gothwad Tech product with its live subdomain and source repository.',
      numberOfItems: ECOSYSTEM_APPS.length,
      itemListElement: ECOSYSTEM_APPS.map((app, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: app.name,
        url: `${ORIGIN}/ecosystem#${app.id}`,
        item: {
          '@type': 'WebApplication',
          name: app.name,
          url: app.href,
          description: app.description,
          operatingSystem: app.platforms.join(', '),
        },
      })),
    };
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);
}

export const EcosystemPage: React.FC<{ onNavigate: (p: PageKey) => void }> = ({ onNavigate }) => {
  useEcosystemItemList();
  const [category, setCategory] = useState<CategoryId>(readInitialCategory);
  const [query, setQuery] = useState<string>(readInitialQuery);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: ECOSYSTEM_APPS.length };
    for (const app of ECOSYSTEM_APPS) map[app.category] = (map[app.category] ?? 0) + 1;
    return map;
  }, []);

  const apps = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ECOSYSTEM_APPS.filter((app) => {
      if (category !== 'all' && app.category !== category) return false;
      if (!needle) return true;
      return [app.name, app.tagline, app.description, app.host, app.badge, ...app.platforms]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [category, query]);

  // Keep the URL shareable/searchable: /ecosystem?q=mail&category=productivity
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    const next = `/ecosystem${params.toString() ? `?${params.toString()}` : ''}`;
    if (`${window.location.pathname}${window.location.search}` !== next) {
      window.history.replaceState({ page: 'ecosystem' }, '', next);
    }
  }, [query, category]);

  // Deep links like /ecosystem#mail should land on that card.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Breadcrumbs items={[{ name: 'Ecosystem', page: 'ecosystem' }]} onNavigate={onNavigate} />

      <div className="space-y-2 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          Ecosystem directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          All Gothwad products — <span className="text-[#0494f4]">direct links</span>
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {ECOSYSTEM_APPS.length} products in one place. Each card shows the live subdomain, a short description and a link
          to its source repository where one is public.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((entry) => {
            const count = counts[entry.id] ?? 0;
            const selected = category === entry.id;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setCategory(entry.id as CategoryId)}
                aria-pressed={selected}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  selected
                    ? 'bg-[#0494f4] text-white border-[#0494f4]'
                    : 'bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {entry.label}
                <span className={`ml-1.5 ${selected ? 'text-white/70' : 'text-zinc-400'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <label htmlFor="ecosystem-search" className="sr-only">
            Search products
          </label>
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            id="ecosystem-search"
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search: Mail, Drive, Tube, Browser…"
            type="search"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4] focus:ring-2 focus:ring-[#0494f4]/20"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500 text-center" aria-live="polite">
        Showing {apps.length} of {ECOSYSTEM_APPS.length} products
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => {
          const Icon = app.icon;
          const isRepoOnly = app.live === false;
          return (
            <article
              key={app.id}
              id={app.id}
              className="flex flex-col scroll-mt-24 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${app.iconBg} ${app.iconText}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1.5">
                  {app.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {app.badge}
                    </span>
                  )}
                  {app.core && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0494f4]/10 text-[#0494f4] border border-[#0494f4]/20">
                      Core
                    </span>
                  )}
                </div>
              </div>

              <h2 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">{app.name}</h2>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{app.tagline}</div>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{app.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {app.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                <a
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs font-bold transition-colors"
                >
                  <span>{isRepoOnly ? 'Source' : 'Open'}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only"> {app.name}</span>
                </a>
                {app.githubUrl && !isRepoOnly && (
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" /> <span>GitHub</span>
                  </a>
                )}
              </div>
              <div className="mt-2 text-[11px] font-mono text-zinc-500 text-center truncate">
                {isRepoOnly ? 'github.com/GothwadTech' : `${app.host}.gothwadtech.com`}
              </div>
            </article>
          );
        })}
      </div>

      {apps.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No products match “{query}”</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
              searchRef.current?.focus();
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#0494f4] text-white text-xs font-bold cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">One account, many apps</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
            Core apps share a single Gothwad Account session. Other products use “Sign in with Gothwad” and can be revoked
            individually.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Web and Android</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
            Cloudflare-hosted web apps alongside native Android apps for phones, tablets and Android TV.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-900 dark:text-white">Source available</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
            Most products are open source. Read the code at{' '}
            <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">
              github.com/GothwadTech
            </a>
            .
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500">
        Need OAuth integration?{' '}
        <a href="https://docs.gothwadtech.com/docs/oauth" target="_blank" rel="noreferrer" className="text-[#0494f4] hover:underline">
          Read Sign in with Gothwad (PKCE)
        </a>
      </p>
    </div>
  );
};
