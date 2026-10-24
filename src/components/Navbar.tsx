import React, { useRef } from 'react';
import { Logo } from './Logo';
import { useGothwadSession } from '../hooks/useGothwadSession';
import { openGothwadAccountMenu, avatarColorFor, initialsFromAccount } from '../lib/accountMenuWidget';
import { ACCOUNTS_WEB_ORIGIN, ACCOUNTS_API_ORIGIN, buildSignInUrl, buildAccountSlotPath } from '../config/brand';
import { signOutGothwadSlot, switchGothwadAccountSlot } from '../lib/gothwadSso';
import { useTheme as useThemeCtx } from '../context/ThemeContext';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const isHome = activePage === 'home';
  const { data, loading, authuser, authenticated } = useGothwadSession();
  const { isDark } = useThemeCtx();
  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleAvatarClick = () => {
    if (!avatarBtnRef.current || !data?.user) return;
    const effectiveUser = data.user;
    const effectiveAccounts = data.accounts.length ? data.accounts : [{
      id: data.activeId || 'a',
      authuser,
      username: effectiveUser.username || '',
      name: effectiveUser.name || effectiveUser.username || 'Account',
      firstName: effectiveUser.firstName,
      lastName: effectiveUser.lastName,
      email: effectiveUser.email,
      avatarUrl: effectiveUser.avatarUrl,
      avatar_url: effectiveUser.avatar_url,
    } as any];

    openGothwadAccountMenu(
      { user: effectiveUser as any, accounts: effectiveAccounts as any, activeId: data.activeId || effectiveAccounts[0]?.id || 'a', authuser },
      {
        theme: (isDark ? 'dark' : 'light') as any,
        anchorEl: avatarBtnRef.current,
        nextUrl: window.location.href,
        manageAccountHref: `${ACCOUNTS_WEB_ORIGIN}/u/${authuser}/me`,
        accountsWebOrigin: ACCOUNTS_WEB_ORIGIN,
        accountsApiOrigin: `${ACCOUNTS_API_ORIGIN}/api`,
        appDomain: 'gothwadtech.com',
        accountHref: (acct: any) => buildAccountSlotPath(acct.authuser ?? 0),
        onSwitchAccount: async (target: any) => {
          const res = await switchGothwadAccountSlot(target.id, target.authuser ?? 0);
          if (res.ok) {
            const path = buildAccountSlotPath(target.authuser ?? 0);
            // preserve SPA route after the slot prefix
            const current = window.location.pathname.replace(/^\/u\/[0-5]/, '') || '/';
            window.location.href = `${path}${current.replace(/^\//, '') ? current.slice(1) ? `/${current.replace(/^\//,'')}` : '/' : '/'}`.replace('//','/');
            // fallback reload
            setTimeout(() => window.location.reload(), 300);
          } else {
            window.location.href = buildAccountSlotPath(target.authuser ?? 0);
          }
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

  const signInHref = buildSignInUrl(typeof window !== 'undefined' ? window.location.href : 'https://gothwadtech.com');

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200/0 dark:border-zinc-800/0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer" aria-label="Gothwad Tech home">
              <Logo size="sm" imageSrc="/assets/brand/logo.png" />
            </button>
          )}
          <nav className="hidden sm:flex items-center gap-4 text-[13px] text-zinc-600 dark:text-zinc-400">
            <button onClick={() => onNavigate('company')} className="hover:underline cursor-pointer">About</button>
            <a href="https://store.gothwadtech.com" target="_blank" rel="noreferrer" className="hover:underline">Store</a>
          </nav>
        </div>

        <nav className="flex items-center gap-1 sm:gap-3 text-[13px]">
          <button onClick={() => onNavigate('ecosystem')} className="hidden sm:inline hover:underline cursor-pointer text-zinc-700 dark:text-zinc-300">Ecosystem</button>
          <button onClick={() => onNavigate('docs')} className="hidden sm:inline hover:underline cursor-pointer text-zinc-700 dark:text-zinc-300">Docs</button>
          <a href="https://github.com/GothwadTech" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 hover:underline text-zinc-700 dark:text-zinc-300">GitHub</a>

          {/* Auth-aware right end: Google rule — Sign in only when anonymous, else avatar */}
          {loading ? (
            <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse" aria-hidden="true" />
          ) : authenticated && data?.user ? (
            <button
              ref={avatarBtnRef}
              onClick={handleAvatarClick}
              className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700 hover:ring-zinc-300 transition-all shrink-0"
              style={{
                background: data.user.avatarUrl ? '#e5e7eb' : avatarColorFor(data.user.email || data.user.username || data.user.name || 'u'),
              }}
              aria-label="Gothwad Account"
            >
              {data.user.avatarUrl ? (
                <img src={data.user.avatarUrl} alt={data.user.name || data.user.email} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                initialsFromAccount(data.user as any)
              )}
            </button>
          ) : (
            <a
              href={signInHref}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-xs sm:text-sm font-medium transition-colors"
            >
              Sign in
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};
