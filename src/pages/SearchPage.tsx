import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { Logo } from '../components/Logo';
import { PortalBar } from '../components/portal/PortalBar';
import { SearchBox } from '../components/portal/SearchBox';
import { runSearch, SearchApiError } from '../services/searchApi';
import type { SearchResponse } from '../types/search';

interface SearchPageProps {
  query: string;
  onSearch: (q: string) => void;
  user?: { name: string; username: string; avatarUrl?: string } | null;
}

/** Best-effort favicon so each result row shows the site's own icon. */
function Favicon({ url, alt }: { url: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  if (failed || !host) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
      alt=""
      onError={() => setFailed(true)}
      className="w-5 h-5 rounded-full shrink-0 mt-0.5"
      referrerPolicy="no-referrer"
      aria-hidden="true"
      title={alt}
    />
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-live="polite">
      <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
        <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
      <span className="sr-only">Searching…</span>
    </div>
  );
}

export const SearchPage: React.FC<SearchPageProps> = ({ query, onSearch, user = null }) => {
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SearchApiError | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setData(null);

    runSearch(query, controller.signal)
      .then((res) => setData(res))
      .catch((err: unknown) => {
        if ((err as Error)?.name === 'AbortError') return;
        setError(
          err instanceof SearchApiError
            ? err
            : new SearchApiError('Something went wrong while searching.'),
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  const notConfigured = error?.code === 'not_configured';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Compact results header */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur">
        <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3">
          <button
            type="button"
            onClick={() => onSearch('')}
            className="shrink-0 cursor-pointer"
            aria-label="Gothwad home"
          >
            <Logo size="sm" showText={false} />
          </button>
          <div className="flex-1">
            <SearchBox
              variant="bar"
              defaultValue={query}
              busy={loading}
              onSubmitQuery={onSearch}
            />
          </div>
        </div>
        <div className="absolute right-4 sm:right-6 top-2.5">
          <PortalBar user={user} />
        </div>
      </div>

      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-3xl mx-auto">
          {loading && <LoadingState />}

          {!loading && error && (
            <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                    {notConfigured ? 'AI search is not enabled yet' : 'Search failed'}
                  </h2>
                  <p className="mt-1 text-sm text-amber-800 dark:text-amber-200/90">
                    {notConfigured
                      ? 'The search Worker is deployed but has no OpenRouter API key set. Add OPENROUTER_API_KEY as a Worker secret and this page will start returning results.'
                      : error.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && data && (
            <div className="space-y-6">
              {/* AI answer — the "AI Overview" card */}
              {data.answer && (
                <section
                  aria-label="AI answer"
                  className="p-5 rounded-2xl border border-[#0494f4]/30 bg-[#0494f4]/5"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <Sparkles className="w-4 h-4 text-[#0494f4]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0494f4]">
                      AI answer
                    </span>
                    {data.cached && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <Clock className="w-3 h-3" />
                        cached
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-800 dark:text-zinc-100 whitespace-pre-wrap">
                    {data.answer}
                  </p>
                  <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                    AI-generated from the sources below — verify before relying on it.
                  </p>
                </section>
              )}

              {/* Sources */}
              {data.sources.length > 0 && (
                <ol className="space-y-5">
                  {data.sources.map((s, i) => (
                    <li key={s.url + i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Favicon url={s.url} alt={s.title} />
                          <span className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                            {(() => {
                              try {
                                return new URL(s.url).hostname.replace(/^www\./, '');
                              } catch {
                                return s.url;
                              }
                            })()}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-[#0494f4] group-hover:underline leading-snug inline-flex items-start gap-1.5">
                          {s.title || s.url}
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        {s.snippet && (
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {s.snippet}
                          </p>
                        )}
                      </a>
                    </li>
                  ))}
                </ol>
              )}

              {data.sources.length === 0 && !data.answer && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No results for “{data.query}”. Try different words.
                </p>
              )}
            </div>
          )}

          {!loading && !error && !data && !query && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Type something to search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
