import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { AppLink } from './AppLink';
import type { PageKey } from '../lib/routing';

export type Crumb = { name: string; page?: PageKey };

interface BreadcrumbsProps {
  items: Crumb[];
  onNavigate?: (page: PageKey) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  // Always prepend Home unless already present
  const full: Crumb[] = items[0]?.name === 'Home' ? items : [{ name: 'Home', page: 'home' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
        {full.map((crumb, index) => {
          const isLast = index === full.length - 1;
          const isHome = crumb.name === 'Home';
          const label = (
            <>
              {isHome ? <Home className="w-3 h-3" aria-hidden="true" /> : null}
              {crumb.name}
            </>
          );
          return (
            <li key={`${crumb.name}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" aria-hidden="true" />}
              {isLast || !crumb.page ? (
                <span className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1" aria-current="page">
                  {label}
                </span>
              ) : onNavigate ? (
                <AppLink page={crumb.page} onNavigate={onNavigate} className="hover:text-[#0494f4] hover:underline flex items-center gap-1">
                  {label}
                </AppLink>
              ) : (
                <a href={`/${crumb.page === 'home' ? '' : crumb.page}`} className="hover:text-[#0494f4] hover:underline flex items-center gap-1">
                  {label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
