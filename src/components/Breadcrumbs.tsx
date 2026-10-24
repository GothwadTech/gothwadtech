import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

type Crumb = { name: string; path?: string };

export const Breadcrumbs: React.FC<{ items: Crumb[]; onNavigate?: (path: string) => void }> = ({ items, onNavigate }) => {
  // Always prepend Home unless already present
  const full = items[0]?.name === 'Home' ? items : [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
        {full.map((c, i) => {
          const isLast = i === full.length - 1;
          const isHome = c.name === 'Home';
          return (
            <li key={c.name + i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />}
              {isLast || !c.path ? (
                <span className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1" aria-current="page">
                  {isHome ? <Home className="w-3 h-3" /> : null}
                  {c.name}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate?.(c.path!)}
                  className="hover:text-[#0494f4] hover:underline flex items-center gap-1 cursor-pointer text-left"
                >
                  {isHome ? <Home className="w-3 h-3" /> : null}
                  {c.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
