import React, { useEffect, useRef, useState } from 'react';
import { Grid2x2, LogIn, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GOTHWAD_APPS, appUrl, type GothwadApp } from '../../data/gothwadApps';
import { ROOT_DOMAIN, ACCOUNTS_URL, ABOUT_URL } from '../../data/portalConfig';

interface PortalBarProps {
  /** Signed-in user, once OAuth is wired. `null` renders the Sign in button. */
  user?: { name: string; username: string; avatarUrl?: string } | null;
  onSignIn?: () => void;
}

function useDismiss(ref: React.RefObject<HTMLDivElement | null>, open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, open, close]);
}

const AppLauncher: React.FC<{ onOpen?: (a: GothwadApp) => void }> = ({ onOpen }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Gothwad apps"
        aria-expanded={open}
        aria-haspopup="true"
        className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <Grid2x2 className="w-5 h-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-72 sm:w-80 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-50"
        >
          <div className="grid grid-cols-4 gap-1">
            {GOTHWAD_APPS.map((app) => {
              const Icon = app.icon;
              return (
                <a
                  key={app.id}
                  role="menuitem"
                  href={appUrl(app, ROOT_DOMAIN)}
                  onClick={() => {
                    onOpen?.(app);
                    setOpen(false);
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${app.accent}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-200 text-center leading-tight">
                    {app.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const AccountChip: React.FC<Pick<PortalBarProps, 'user' | 'onSignIn'>> = ({
  user,
  onSignIn,
}) => {
  // Not wired to OAuth yet — send the user to Accounts and bring them back
  // here afterwards (same `next` contract Mail uses).
  const signInHref = `${ACCOUNTS_URL}/signin?next=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : ROOT_DOMAIN,
  )}`;

  if (user) {
    const initial = (user.name || user.username || '?').trim().charAt(0).toUpperCase();
    return (
      <button
        type="button"
        className="w-9 h-9 rounded-full bg-[#0494f4] text-white font-bold text-sm flex items-center justify-center hover:brightness-110 transition cursor-pointer overflow-hidden"
        aria-label={`Gothwad Account: ${user.name}`}
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </button>
    );
  }

  return (
    <a
      href={signInHref}
      onClick={onSignIn}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-sm font-semibold transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign in</span>
    </a>
  );
};

export const PortalBar: React.FC<PortalBarProps> = ({ user = null, onSignIn }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      <a
        href={ABOUT_URL}
        className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-[#0494f4] dark:hover:text-[#0494f4] transition-colors"
      >
        About
      </a>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <AppLauncher />
        <AccountChip user={user} onSignIn={onSignIn} />
      </div>
    </header>
  );
};
