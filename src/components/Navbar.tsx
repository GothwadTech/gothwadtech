import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, Github, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { AppLink } from './AppLink';
import { useGothwadSession } from '../hooks/useGothwadSession';
import { openGothwadAccountMenu, avatarColorFor, initialsFromAccount } from '../lib/accountMenuWidget';
import {
  ACCOUNTS_WEB_ORIGIN,
  ACCOUNTS_API_ORIGIN,
  buildSignInUrl,
  buildAccountSlotPath,
  stripAuthuserPath,
} from '../config/brand';
import { signOutGothwadSlot, switchGothwadAccountSlot } from '../lib/gothwadSso';
import { useTheme } from '../context/ThemeContext';
import { NAV_PAGES, type PageKey } from '../lib/routing';
import pageMeta from '../data/pageMeta.json';

const LABELS = pageMeta as Record<PageKey, { label: string; path: string }>;

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  label: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, label }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={label}
    title={label}
    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
  >
    {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
  </button>
);

interface NavbarProps {
  activePage: PageKey | null;
  onNavigate: (page: PageKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const { data, loading, authuser, authenticated } = useGothwadSession();
  const { isDark, toggleTheme } = useTheme();
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const go = (page: PageKey) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  const handleAvatarClick = () => {
    if (!avatarBtnRef.current || !data?.user) return;
    const effectiveUser = data.user;
    const effectiveAccounts = data.accounts.length
      ? data.accounts
      : [
          {
            id: data.activeId || 'a',
            authuser,
            username: effectiveUser.username || '',
            name: effectiveUser.name || effectiveUser.username || 'Account',
            firstName: effectiveUser.firstName,
            lastName: effectiveUser.lastName,
            email: effectiveUser.email,
            avatarUrl: effectiveUser.avatarUrl,
            avatar_url: effectiveUser.avatar_url,
          },
        ];

    openGothwadAccountMenu(
      { user: effectiveUser, accounts: effectiveAccounts, activeId: data.activeId || effectiveAccounts[0]?.id || 'a', authuser },
      {
        theme: isDark ? 'dark' : 'light',
        anchorEl: avatarBtnRef.current,
        nextUrl: window.location.href,
        manageAccountHref: `${ACCOUNTS_WEB_ORIGIN}/u/${authuser}/me`,
        accountsWebOrigin: ACCOUNTS_WEB_ORIGIN,
        accountsApiOrigin: `${ACCOUNTS_API_ORIGIN}/api`,
        appDomain: 'gothwadtech.com',
        accountHref: (account) => buildAccountSlotPath(account.authuser ?? 0),
        onSwitchAccount: async (target) => {
          // Try the API first, but always move the URL to the chosen slot so the
          // page reloads against that account even when the apex has no Worker yet.
          await switchGothwadAccountSlot(target.id, target.authuser ?? 0);
          const rest = stripAuthuserPath(window.location.pathname);
          const next = `${buildAccountSlotPath(target.authuser ?? 0)}${rest === '/' ? '' : rest.slice(1)}`.replace(/\/{2,}/g, '/');
          window.location.assign(`${next}${window.location.search}`);
        },
        onSignOutAccount: async (slotId: string) => {
          await signOutGothwadSlot(slotId, authuser);
          window.location.reload();
        },
        onSignOutAll: async () => {
          await signOutGothwadSlot(undefined, authuser);
          window.location.reload();
        },
      }
    );
  };

  const themeLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  const signInHref = buildSignInUrl(typeof window !== 'undefined' ? window.location.href : 'https://gothwadtech.com');


  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => go('home')}
            className="flex items-center gap-2 cursor-pointer shrink-0"
            aria-label="Gothwad Tech — home"
          >
            <Logo size="sm" imageSrc="/assets/brand/logo.png" showText={false} />
            <span className="hidden xs:inline sm:inline font-black uppercase tracking-tight text-[15px] text-zinc-950 dark:text-white">
              GOTHWAD <span className="text-[#0494f4]">TECH</span>
            </span>
          </button>
        </div>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 text-[13px] text-zinc-600 dark:text-zinc-400">
          {NAV_PAGES.map((page) => (
            <AppLink
              key={page}
              page={page}
              onNavigate={onNavigate}
              aria-current={activePage === page ? 'page' : undefined}
              className={`hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 ${
                activePage === page ? 'text-zinc-900 dark:text-white font-semibold' : ''
              }`}
            >
              {LABELS[page].label}
            </AppLink>
          ))}
          <a
            href="https://store.gothwadtech.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white hover:underline"
          >
            Store <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://github.com/GothwadTech"
            target="_blank"
            rel="noreferrer"
            aria-label="Gothwad Tech on GitHub"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
          </a>

          <ThemeToggle isDark={isDark} onToggle={toggleTheme} label={themeLabel} />

          {loading ? (
            <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" aria-hidden="true" />
          ) : authenticated && data?.user ? (
            <button
              ref={avatarBtnRef}
              type="button"
              onClick={handleAvatarClick}
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700 hover:ring-zinc-300 transition-all shrink-0"
              style={{ background: data.user.avatarUrl ? '#e5e7eb' : avatarColorFor(data.user.email || data.user.username || data.user.name || 'u') }}
              aria-label="Gothwad Account menu"
            >
              {data.user.avatarUrl ? (
                <img src={data.user.avatarUrl} alt={data.user.name || data.user.email} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                initialsFromAccount(data.user)
              )}
            </button>
          ) : (
            <a
              href={signInHref}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Sign in
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <nav aria-label="Mobile" className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 grid gap-1 text-sm">
            {NAV_PAGES.map((page) => (
              <AppLink
                key={page}
                page={page}
                onNavigate={go}
                aria-current={activePage === page ? 'page' : undefined}
                className={`px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                  activePage === page ? 'font-semibold text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {LABELS[page].label}
              </AppLink>
            ))}
            <a
              href="https://store.gothwadtech.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 inline-flex items-center gap-1"
            >
              Store <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/GothwadTech"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 inline-flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
