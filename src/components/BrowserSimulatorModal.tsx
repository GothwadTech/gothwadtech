import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  Flame,
  Info,
} from 'lucide-react';

interface BrowserSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: (service?: string) => void;
}

export const BrowserSimulatorModal: React.FC<BrowserSimulatorModalProps> = ({
  isOpen,
  onClose,
  onOpenOrderModal,
}) => {
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<'ram' | 'adblock' | 'downloader'>('ram');
  const [tabCount, setTabCount] = useState(5);
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [simulatedAdsBlocked] = useState(38);
  const [simulatedDataSavedMb] = useState(14.2);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Dynamic RAM calculations based on tab count
  const gothwadRam = Math.round(45 + tabCount * 9.5);
  const chromeRam = Math.round(160 + tabCount * 42);
  const firefoxRam = Math.round(140 + tabCount * 35);

  const startDownloadTest = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
  };

  useEffect(() => {
    let timer: any;
    if (isDownloading && downloadProgress < 100) {
      timer = setTimeout(() => {
        setDownloadProgress((prev) => Math.min(100, prev + 12));
      }, 150);
    } else if (downloadProgress >= 100) {
      setIsDownloading(false);
    }
    return () => clearTimeout(timer);
  }, [isDownloading, downloadProgress]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
        {/* Top Browser Simulation Bar */}
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>gothwad://demo/illustrative-preview</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded border border-emerald-200 dark:border-emerald-500/20">
              Rust Kernel
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Controls Tab Bar */}
        <div className="p-3 bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveSimulatorTab('ram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSimulatorTab === 'ram'
                  ? 'bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Memory & Tabs
            </button>

            <button
              onClick={() => setActiveSimulatorTab('adblock')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSimulatorTab === 'adblock'
                  ? 'bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Ad Blocker
            </button>

            <button
              onClick={() => setActiveSimulatorTab('downloader')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeSimulatorTab === 'downloader'
                  ? 'bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              16-Thread Downloader
            </button>
          </div>

          <div className="text-[11px] text-zinc-400">
            Simulated preview
          </div>
        </div>

        {/* Illustrative-data disclaimer — shown on every tab */}
        <div className="px-3 py-2 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-200">
            <strong className="font-bold">Illustrative demo.</strong> Every figure
            below is simulated to demonstrate how the interface behaves — it is not
            a measured benchmark and not a comparison against real Chrome or
            Firefox builds. Actual performance depends on your hardware, OS,
            extensions and workload.
          </p>
        </div>

        {/* Tab 1: RAM & Tab Simulator */}
        {activeSimulatorTab === 'ram' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-0.5">
                  Active Simulated Tabs: <span className="text-amber-600 dark:text-amber-400">{tabCount} Tabs</span>
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Simulate heavy multi-tasking and see memory consumption.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTabCount(Math.max(1, tabCount - 1))}
                  className="px-2.5 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs cursor-pointer"
                >
                  - Tab
                </button>
                <button
                  onClick={() => setTabCount(Math.min(25, tabCount + 1))}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 text-white dark:bg-amber-400 dark:text-zinc-950 font-bold text-xs cursor-pointer"
                >
                  + Tab
                </button>
              </div>
            </div>

            {/* RAM Comparison Meters */}
            <div className="space-y-3">
              {/* Gothwad Browser Bar */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-zinc-950 border border-amber-400/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Gothwad Browser (Rust Engine)
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                    ~{gothwadRam} MB{' '}
                    <span className="font-sans font-normal text-[10px] opacity-70">(modelled)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-200 rounded-full"
                    style={{ width: `${Math.min(100, (gothwadRam / 1200) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  Zero memory leak • Background auto-sleep
                </div>
              </div>

              {/* Google Chrome Bar */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Google Chrome
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
                    ~{chromeRam} MB{' '}
                    <span className="font-sans font-normal text-[10px] opacity-70">(modelled)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 transition-all duration-200 rounded-full"
                    style={{ width: `${Math.min(100, (chromeRam / 1200) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-400">
                  Modelled at ~{Math.round((chromeRam / gothwadRam) * 10) / 10}x the figure
                  above — illustrative, not a measured comparison
                </div>
              </div>

              {/* Mozilla Firefox Bar */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    Mozilla Firefox
                  </span>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400 text-xs sm:text-sm">
                    ~{firefoxRam} MB{' '}
                    <span className="font-sans font-normal text-[10px] opacity-70">(modelled)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-200 rounded-full"
                    style={{ width: `${Math.min(100, (firefoxRam / 1200) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: TurboShield Ad Blocker */}
        {activeSimulatorTab === 'adblock' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-0.5">
                  TurboShield Ad Blocker
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Blocks tracking at socket level before downloading.
                </p>
              </div>

              <button
                onClick={() => setAdBlockEnabled(!adBlockEnabled)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  adBlockEnabled
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {adBlockEnabled ? 'Shield Active' : 'Shield Off'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-[11px] text-zinc-400 mb-0.5">
                  Ads Blocked <span className="opacity-70">(sample page)</span>
                </div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {adBlockEnabled ? simulatedAdsBlocked : 0}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {adBlockEnabled ? 'Demo count for one sample page' : 'Shield disabled'}
                </div>
              </div>

              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="text-[11px] text-zinc-400 mb-0.5">
                  Data Saved <span className="opacity-70">(sample page)</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {adBlockEnabled ? `${simulatedDataSavedMb} MB` : '0 MB'}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {adBlockEnabled ? 'Demo estimate, not measured' : 'Shield disabled'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 16-Thread Downloader */}
        {activeSimulatorTab === 'downloader' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                    Multi-Threaded Parallel Download
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Splits downloads into 16 concurrent socket streams.
                  </p>
                </div>

                <button
                  onClick={startDownloadTest}
                  disabled={isDownloading}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-zinc-950 font-bold text-xs flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'Downloading...' : 'Test Speed'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-600 dark:text-zinc-300">Ubuntu-Sovereign.iso (2.4 GB)</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{downloadProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-150 rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Simulated speed: 38.4 MB/s</span>
                  <span>
                    {downloadProgress === 100
                      ? 'Demo complete'
                      : '16 threads (simulated)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
            Need a custom browser or performance app for your team?
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenOrderModal('Sovereign Systems & Browser Core Tech');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Order Browser Engine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
