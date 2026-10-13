import React, { useState } from 'react';
import { Zap, Sparkles, Download, Gauge, Check, Compass, MessageSquare, Send, Smartphone, CheckCircle2 } from 'lucide-react';
import { BROWSER_BENCHMARKS, SOVEREIGN_PRODUCTS, SovereignProduct } from '../data/companyData';

interface ProductsPageProps {
  onOpenBrowserSimulator: () => void;
  onOpenOrderModal: (service?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onOpenBrowserSimulator,
  onOpenOrderModal,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<SovereignProduct>(SOVEREIGN_PRODUCTS[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadClick = (productName: string) => {
    setDownloadSuccess(productName);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sovereign Indian Consumer Tech (Aatmanirbhar Bharat)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Sovereign Consumer Apps — <span className="text-[#0494f4]">Built in India</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Engineered to replace memory-heavy, ad-loaded foreign applications with ultra-fast, privacy-respecting indigenous software platforms. Available on Google Play Store and Web.
        </p>

        {/* Product Selector Bar */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {SOVEREIGN_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedProduct.id === prod.id
                  ? 'bg-[#0494f4] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {prod.id === 'gothwad-browser' && <Compass className="w-4 h-4" />}
              {prod.id === 'grixchat' && <MessageSquare className="w-4 h-4" />}
              {prod.id === 'indogram' && <Send className="w-4 h-4" />}
              <span>{prod.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Global Download Feedback Toast */}
      {downloadSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between gap-2 shadow-xs">
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

      {/* 3 Main Product Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SOVEREIGN_PRODUCTS.map((product) => {
          const isBrowser = product.id === 'gothwad-browser';
          const isGrixchat = product.id === 'grixchat';
          const isIndogram = product.id === 'indogram';
          const isCurrentSelected = selectedProduct.id === product.id;

          return (
            <div
              key={product.id}
              className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border transition-all flex flex-col justify-between shadow-xs ${
                isCurrentSelected
                  ? 'border-[#0494f4] ring-2 ring-[#0494f4]/30'
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
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    Play Store & Web
                  </span>
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

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Highlights */}
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

                {/* Stat Pill Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-5 text-center">
                  {product.stats.slice(0, 2).map((st, sIdx) => (
                    <div key={sIdx}>
                      <div className="text-[10px] text-zinc-400">{st.label}</div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-white font-mono">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
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
                      onClick={() => setSelectedProduct(product)}
                      className={`flex-1 py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
                        isGrixchat
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-sky-600 hover:bg-sky-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Deep Specs</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDownloadClick(product.name)}
                    className="px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Download Direct APK"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>APK</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                  <span className="flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Play Store Live
                  </span>
                  <span className="font-mono">{product.apkSize}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Product Deep Breakdown Box */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-[#0494f4]/10 text-[#0494f4]">
                {selectedProduct.id === 'gothwad-browser' && <Compass className="w-5 h-5" />}
                {selectedProduct.id === 'grixchat' && <MessageSquare className="w-5 h-5" />}
                {selectedProduct.id === 'indogram' && <Send className="w-5 h-5" />}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                {selectedProduct.name} — Architecture & Technical Specifications
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">
              {selectedProduct.tagline} • Full Google Play Store & Web Production Build
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {selectedProduct.id === 'gothwad-browser' && (
              <button
                onClick={onOpenBrowserSimulator}
                className="px-4 py-2 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch Live Simulator</span>
              </button>
            )}
            <button
              onClick={() => handleDownloadClick(selectedProduct.name)}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 text-white dark:text-zinc-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Get APK ({selectedProduct.apkSize})</span>
            </button>
          </div>
        </div>

        {/* Features Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-[#0494f4]" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Head-to-Head Speed & Memory Benchmarks
                </h3>
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
      </div>
    </div>
  );
};
