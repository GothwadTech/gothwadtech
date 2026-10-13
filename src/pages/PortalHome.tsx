import React from 'react';
import { Logo } from '../components/Logo';
import { PortalBar } from '../components/portal/PortalBar';
import { SearchBox } from '../components/portal/SearchBox';
import { AppShortcuts } from '../components/portal/AppShortcuts';
import { ABOUT_URL, ROOT_DOMAIN } from '../data/portalConfig';

interface PortalHomeProps {
  onSearch: (q: string) => void;
  user?: { name: string; username: string; avatarUrl?: string } | null;
}

const FOOTER_LINKS = [
  { label: 'About', href: ABOUT_URL },
  { label: 'Mail', href: `https://mail.${ROOT_DOMAIN}` },
  { label: 'Drive', href: `https://drive.${ROOT_DOMAIN}` },
  { label: 'Business', href: ABOUT_URL },
];

/**
 * The portal homepage: Gothwad wordmark + search bar, with the ecosystem
 * product shortcuts as the main body of the page (not just a bare search box).
 */
export const PortalHome: React.FC<PortalHomeProps> = ({ onSearch, user = null }) => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <PortalBar user={user} />

      {/* Main: search + product shortcuts */}
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 pt-6 sm:pt-12 pb-10">
        <Logo size="lg" className="mb-6 sm:mb-8" />

        <SearchBox
          variant="hero"
          autoFocus
          onSubmitQuery={onSearch}
          className="mb-8 sm:mb-10"
        />

        <div className="w-full max-w-4xl">
          <h2 className="sr-only">Gothwad products</h2>
          <AppShortcuts variant="grid" />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Gothwad Tech
          </span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#0494f4] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
};
