import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Sun, Moon, ArrowRight, Phone, Mail, MessageSquare, Building2, Cpu, Layers, Users, Home } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenOrderModal: (preselectedService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenOrderModal,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { themeMode, isDark, setThemeMode, toggleTheme } = useTheme();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'solutions', label: 'Digital Solutions', icon: Building2, highlightBadge: 'Schools & Business' },
    { id: 'products', label: 'Sovereign Apps', icon: Cpu, highlightBadge: 'Play Store' },
    { id: 'portfolio', label: 'Case Studies', icon: Layers },
    { id: 'about', label: 'Leadership', icon: Users },
    { id: 'contact', label: 'Contact Desk', icon: Mail },
  ];

  const handlePageClick = (pageId: string) => {
    setIsDrawerOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed Header (Flush Top) */}
      <header
        id="main-navbar"
        className="fixed top-0 inset-x-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/90 shadow-xs transition-all duration-150"
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between py-2.5">
            {/* Brand Logo & Name */}
            <button
              onClick={() => handlePageClick('home')}
              className="group focus:outline-none focus:ring-2 focus:ring-[#0494f4] rounded-xl p-0.5 transition-transform active:scale-95 shrink-0 cursor-pointer"
              aria-label="Gothwad Tech Home"
            >
              <Logo size="sm" />
            </button>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageClick(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-[#0494f4] font-bold shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Get Quote CTA + Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Sovereign Apps Explore CTA */}
              <button
                onClick={() => handlePageClick('products')}
                className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-150 shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
                <span>Sovereign Apps</span>
              </button>

              {/* Get Solution Quotation Button */}
              <button
                onClick={() => onOpenOrderModal()}
                className="hidden lg:inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0494f4] hover:bg-[#0077cd] text-white transition-all duration-150 shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <span>Get Quotation</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 transition-colors cursor-pointer active:scale-95"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#0494f4]" />
                ) : (
                  <Moon className="w-4 h-4 text-zinc-800" />
                )}
              </button>

              {/* Mobile 3-Line Hamburger Icon Button */}
              <button
                type="button"
                id="side-drawer-toggle-btn"
                onClick={() => setIsDrawerOpen(true)}
                className="md:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-150 active:scale-95 cursor-pointer flex items-center justify-center"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-In Side Drawer Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Slide-In Side Drawer Menu */}
      <aside
        id="side-navigation-drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 sm:w-80 max-w-[85vw] h-full max-h-screen bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between transition-transform duration-200 ease-out will-change-transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Side menu"
      >
        {/* Drawer Header */}
        <div className="h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <Logo size="sm" />
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-3 overflow-y-auto overscroll-contain flex-1 space-y-3">
          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1.5 px-2">
              MAIN SECTIONS
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handlePageClick(item.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0494f4] text-white font-bold shadow-xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0494f4]'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.highlightBadge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                      {item.highlightBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Direct Desk */}
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
            <div className="font-bold text-zinc-900 dark:text-white flex items-center justify-between text-[11px]">
              <span>Direct Support & Consultation</span>
            </div>
            <a
              href="tel:07339904665"
              className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono">{COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-[#0494f4] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#0494f4] shrink-0" />
              <span className="font-mono truncate">{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2 bg-zinc-50 dark:bg-zinc-950 shrink-0">
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              onOpenOrderModal();
            }}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0494f4] hover:bg-[#0077cd] text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Get System Quotation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech,%20I%20want%20to%20connect.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp Instant Chat</span>
          </a>
        </div>
      </aside>
    </>
  );
};
