import React, { useState } from 'react';
import { Flame, Zap, Download, Gauge, Check, Compass, MessageSquare, Send, Smartphone, Globe, Users, Cloud, Bot, CheckCircle2, Phone } from 'lucide-react';
import { BROWSER_BENCHMARKS, SOVEREIGN_PRODUCTS, SovereignProduct } from '../data/companyData';

interface GothwadBrowserSectionProps {
  onOpenBrowserSimulator: () => void;
  onOpenOrderModal: (service?: string) => void;
}

export const GothwadBrowserSection: React.FC<GothwadBrowserSectionProps> = ({
  onOpenBrowserSimulator,
  onOpenOrderModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<SovereignProduct>(SOVEREIGN_PRODUCTS[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadClick = (productName: string) => {
    setDownloadSuccess(productName);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <section
      id="products"
      className="py-16 md:py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-14 transition-colors duration-150 relative"
    >
      {/* Anchor bridge for legacy #browser links */}
      <div id="browser" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current text-[#0494f4]" />
            <span>Sovereign Indian Tech Flagships</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Indian Tech Suite —{' '}
            <span className="text-[#0494f4]">
              High-Speed Sovereign Platforms
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Engineered in India for global speed and performance. Explore our three flagship consumer applications launched on Google Play Store and Web.
          </p>

          {/* Product Filter Tabs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              All Flagship Apps (3)
            </button>
            {SOVEREIGN_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  setActiveTab(prod.id);
                  setSelectedProduct(prod);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === prod.id
                    ? 'bg-[#0494f4] text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {prod.id === 'gothwad-browser' && <Compass className="w-3.5 h-3.5" />}
                {prod.id === 'grixchat' && <MessageSquare className="w-3.5 h-3.5" />}
                {prod.id === 'indogram' && <Send className="w-3.5 h-3.5" />}
                <span>{prod.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Main Product Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {SOVEREIGN_PRODUCTS.map((product) => {
            const isBrowser = product.id === 'gothwad-browser';
            const isGrixchat = product.id === 'grixchat';
            const isIndogram = product.id === 'indogram';

            return (
              <div
                key={product.id}
                className={`p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border transition-all flex flex-col justify-between shadow-xs ${
                  selectedProduct.id === product.id
                    ? 'border-[#0494f4] ring-1 ring-[#0494f4]/40'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isBrowser
                          ? 'bg-[#0494f4]/10 text-[#0494f4]'
                          : isGrixchat
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      }`}
                    >
                      {isBrowser && <Compass className="w-6 h-6" />}
                      {isGrixchat && <MessageSquare className="w-6 h-6" />}
                      {isIndogram && <Send className="w-6 h-6" />}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Play Store & Web
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-1">
                    {product.name}
                  </h3>
                  <div
                    className={`text-xs font-semibold mb-3 ${
                      isBrowser
                        ? 'text-[#0494f4]'
                        : isGrixchat
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-sky-600 dark:text-sky-400'
                    }`}
                  >
                    {product.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-5">
                    {product.highlights.slice(0, 3).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isBrowser
                              ? 'text-[#0494f4]'
                              : isGrixchat
                              ? 'text-emerald-500'
                              : 'text-sky-500'
                          }`}
                        />
                        <span className="leading-snug">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Stat Pill Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-5 text-center">
                    {product.stats.slice(0, 2).map((st, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-[10px] text-zinc-400">{st.label}</div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2">
                    {isBrowser ? (
                      <button
                        onClick={onOpenBrowserSimulator}
                        className="flex-1 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Zap className="w-4 h-4 fill-white" />
                        <span>Try Simulator</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveTab(product.id);
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                          isGrixchat
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-sky-600 hover:bg-sky-700'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Explore {product.name}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDownloadClick(product.name)}
                      className="px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      title="Download APK Direct"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>APK</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                    <span className="flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Google Play Store
                    </span>
                    <span className="font-mono">{product.apkSize}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Download Feedback Toast */}
        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>{downloadSuccess}</strong> APK package download stream initiated from verified Gothwad Sovereign Edge CDN!
              </span>
            </div>
            <span className="font-mono text-[10px] bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded">
              Verified 100% Clean
            </span>
          </div>
        )}

        {/* Deep Dive Tab Section: Detailed Specs for Selected Product */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Deep Dive Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg bg-[#0494f4]/10 text-[#0494f4]">
                  {selectedProduct.id === 'gothwad-browser' && <Compass className="w-5 h-5" />}
                  {selectedProduct.id === 'grixchat' && <MessageSquare className="w-5 h-5" />}
                  {selectedProduct.id === 'indogram' && <Send className="w-5 h-5" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                  {selectedProduct.name} — Architecture & Feature Breakdown
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {selectedProduct.tagline} • Full Play Store & Web Production Release
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {selectedProduct.id === 'gothwad-browser' ? (
                <button
                  onClick={onOpenBrowserSimulator}
                  className="px-4 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Launch Live Simulator</span>
                </button>
              ) : (
                <button
                  onClick={() => handleDownloadClick(selectedProduct.name)}
                  className="px-4 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Get APK ({selectedProduct.apkSize})</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Specific Features Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedProduct.features.map((feat, fIdx) => (
              <div
                key={fIdx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
                  {feat.title}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* If Gothwad Browser is selected, display the benchmark table */}
          {selectedProduct.id === 'gothwad-browser' && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-[#0494f4]" />
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    Head-to-Head Speed & Memory Benchmarks
                  </h4>
                </div>
                <span className="text-xs text-zinc-400">10 Active Concurrent Tabs</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      <th className="py-3 px-3.5">Metric</th>
                      <th className="py-3 px-3.5 text-[#0494f4] bg-[#0494f4]/10 rounded-t-lg font-bold">
                        🚀 Gothwad Browser
                      </th>
                      <th className="py-3 px-3.5">Google Chrome</th>
                      <th className="py-3 px-3.5">Mozilla Firefox</th>
                      <th className="py-3 px-3.5">Microsoft Edge</th>
                      <th className="py-3 px-3.5">Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
                    {BROWSER_BENCHMARKS.map((bm, index) => (
                      <tr key={index} className="hover:bg-zinc-50 dark:hover:bg-zinc-850/50 transition-colors">
                        <td className="py-3 px-3.5 font-medium text-zinc-900 dark:text-zinc-100">
                          <div>{bm.metric}</div>
                          <div className="text-[10px] text-zinc-400">{bm.description}</div>
                        </td>
                        <td className="py-3 px-3.5 bg-[#0494f4]/5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {bm.gothwad} <span className="text-[10px] text-zinc-400 font-normal">{bm.unit}</span>
                        </td>
                        <td className="py-3 px-3.5 font-mono text-zinc-600 dark:text-zinc-300">
                          {bm.chrome} <span className="text-[10px] text-zinc-400">{bm.unit}</span>
                        </td>
                        <td className="py-3 px-3.5 font-mono text-zinc-600 dark:text-zinc-300">
                          {bm.firefox} <span className="text-[10px] text-zinc-400">{bm.unit}</span>
                        </td>
                        <td className="py-3 px-3.5 font-mono text-zinc-600 dark:text-zinc-300">
                          {bm.edge} <span className="text-[10px] text-zinc-400">{bm.unit}</span>
                        </td>
                        <td className="py-3 px-3.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            {bm.advantageText}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* If GrixChat is selected, display communication feature highlights */}
          {selectedProduct.id === 'grixchat' && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Sub-15ms Dispatch</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Real-time WebSocket message pipelines guarantee instant delivery across mobile cellular data.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Adaptive HD Calling</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Proprietary audio and video bitrate compression ensures crystal clarity on 3G and rural networks.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Mobile + Web Sync</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Seamless simultaneous sync between your smartphone and web browser with instant session handoff.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* If Indogram is selected, display cloud community highlights */}
          {selectedProduct.id === 'indogram' && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">200,000 Member Groups</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    High-capacity communities with rich admin permissions, message pins, granular filters, and slow mode.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Limitless Cloud Archives</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Never worry about phone storage filling up. Stream videos, audio, and documents on demand from the cloud.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">Bot & Mini-App Runtime</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Integrate automated web workflows, commerce bots, and real-time utilities directly inside your chat stream.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
