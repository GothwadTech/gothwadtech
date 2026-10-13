import React from 'react';
import { GOTHWAD_APPS, appUrl, type GothwadApp } from '../../data/gothwadApps';
import { ROOT_DOMAIN } from '../../data/portalConfig';

interface AppShortcutsProps {
  /** 'grid' = big labelled tiles (homepage). 'compact' = icon-only row. */
  variant?: 'grid' | 'compact';
  onOpenApp?: (app: GothwadApp) => void;
  className?: string;
}

/**
 * The product shortcuts on the portal homepage — the main body of the page,
 * with the search bar sitting above it.
 *
 * Every tile is a plain external <a>, so middle-click / ctrl-click / "open in
 * new tab" all behave the way a user expects.
 */
export const AppShortcuts: React.FC<AppShortcutsProps> = ({
  variant = 'grid',
  onOpenApp,
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
        {GOTHWAD_APPS.map((app) => {
          const Icon = app.icon;
          return (
            <a
              key={app.id}
              href={appUrl(app, ROOT_DOMAIN)}
              title={app.name}
              onClick={() => onOpenApp?.(app)}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform duration-150"
            >
              <span
                className={`w-full h-full rounded-xl flex items-center justify-center ${app.accent}`}
              >
                <Icon className="w-5 h-5" />
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 ${className}`}
    >
      {GOTHWAD_APPS.map((app) => {
        const Icon = app.icon;
        return (
          <a
            key={app.id}
            href={appUrl(app, ROOT_DOMAIN)}
            onClick={() => onOpenApp?.(app)}
            className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#0494f4] dark:hover:border-[#0494f4] hover:shadow-md transition-all duration-150"
          >
            <span
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-150 ${app.accent}`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-100 text-center leading-tight">
              {app.name}
            </span>
            <span className="hidden sm:block text-[11px] text-zinc-500 dark:text-zinc-400 text-center leading-tight">
              {app.description}
            </span>
          </a>
        );
      })}
    </div>
  );
};
