import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Compass, MessageSquare, Send, CheckCircle2, Smartphone } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onOpenOrderModal: (service?: string) => void;
  onOpenBrowserSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderModal,
  onOpenBrowserSimulator,
}) => {
  const { t } = useLanguage();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-20 pb-12 md:pt-24 md:pb-16 scroll-mt-14 transition-colors duration-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-[#0494f4] animate-pulse" />
            <span>Sovereign Deep-Tech & Flagship Consumer Ecosystem</span>
            <span className="text-[#0494f4]/40">|</span>
            <span className="text-zinc-600 dark:text-zinc-300">Aatmanirbhar Bharat</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Google Play Store & Web Live • Enterprise Grade</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans leading-[1.14]">
            Pioneering Sovereign Digital Infrastructure &{' '}
            <span className="text-[#0494f4]">
              High-Speed Platforms
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Gothwad Tech is a premier sovereign deep-tech and digital engineering conglomerate. We architect high-performance enterprise systems, sovereign cloud backends, and a suite of flagship consumer applications — including <strong className="text-zinc-900 dark:text-white font-semibold">Gothwad Browser</strong>, <strong className="text-zinc-900 dark:text-white font-semibold">GrixChat</strong>, and <strong className="text-zinc-900 dark:text-white font-semibold">Indogram</strong>, launched across Web and Google Play Store.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="hero-explore-products-btn"
              onClick={() => handleScrollToSection('products')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0494f4] hover:bg-[#0077cd] text-white shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Explore Indian Tech Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-try-simulator-btn"
              onClick={onOpenBrowserSimulator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-100 border border-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <Zap className="w-4 h-4 text-[#0494f4] fill-[#0494f4]" />
              <span>Live Apps Simulator</span>
            </button>

            <button
              onClick={() => handleScrollToSection('services')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-zinc-500" />
              <span>Enterprise Services</span>
            </button>
          </div>

          {/* Key Assurance Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>3 Flagship Sovereign Apps</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Google Play Store & Web Releases</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>12 Dedicated Software Architects</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% In-House Deep-Tech</span>
            </span>
          </div>
        </div>

        {/* 3 Flagship Products Overview Bento Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0494f4]" />
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Sovereign Flagship Platforms Launched on Play Store & Web
              </h2>
            </div>
            <button
              onClick={() => handleScrollToSection('products')}
              className="text-xs font-bold text-[#0494f4] hover:underline flex items-center gap-1"
            >
              <span>View Full Suite Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Product 1: Gothwad Browser */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-[#0494f4]/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0494f4]/10 border border-[#0494f4]/20 flex items-center justify-center text-[#0494f4]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 font-mono">
                    Play Store & Web
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Gothwad Browser
                </h3>
                <div className="text-xs text-[#0494f4] font-medium mb-3">
                  Ultra-Fast Microkernel Browser (&lt;12MB)
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Consumes 75% less RAM than Chrome with native TurboShield tracker blocking and 16-thread turbo downloader.
                </p>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-4 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-400">Package Size</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">11.8 MB</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400">RAM (10 Tabs)</div>
                    <div className="text-sm font-bold text-[#0494f4] font-mono">142 MB</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  onClick={onOpenBrowserSimulator}
                  className="flex-1 py-2 rounded-lg bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Simulator</span>
                </button>
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Product 2: GrixChat */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-mono">
                    Play Store & Web
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  GrixChat
                </h3>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                  Real-Time Instant Messenger & Video
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Instant messaging, crystal-clear voice/video calling, 2GB file sharing, channels, stories, and flawless multi-device sync.
                </p>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-4 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-400">Dispatch Latency</div>
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">&lt;15 ms</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400">Max File Size</div>
                    <div className="text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">2.0 GB</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Explore GrixChat</span>
                </button>
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Product 3: Indogram */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-sky-500/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 font-mono">
                    Play Store & Web
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Indogram
                </h3>
                <div className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-3">
                  Sovereign Cloud Messenger & Communities
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Unlimited cloud media storage, 200k+ member group channels, smart bot automation runtime, and independent multi-device cloud logins.
                </p>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-4 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-400">Community Cap</div>
                    <div className="text-sm font-bold text-sky-600 dark:text-sky-400 font-mono">200,000+</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400">Cloud Storage</div>
                    <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">Unlimited</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Explore Indogram</span>
                </button>
                <button
                  onClick={() => handleScrollToSection('products')}
                  className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMPANY_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center shadow-xs"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white font-mono tracking-tight text-[#0494f4]">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{stat.helper}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
