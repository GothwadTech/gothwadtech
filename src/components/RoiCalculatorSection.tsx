import React, { useState } from 'react';
import { Calculator, TrendingDown, Sparkles, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export const RoiCalculatorSection: React.FC<{ onOpenOrderModal: () => void }> = ({ onOpenOrderModal }) => {
  const [currentMonthlySpendInr, setCurrentMonthlySpendInr] = useState<number>(50000);
  const [teamSize, setTeamSize] = useState<number>(10);
  const [latencyTolerance, setLatencyTolerance] = useState<'high' | 'ultra_low'>('ultra_low');

  // Calculations
  const annualCurrentSpend = currentMonthlySpendInr * 12;
  // With custom sovereign code, SaaS subscription cuts + server optimizations save 62% on average
  const annualGothwadSpend = Math.round(annualCurrentSpend * 0.38);
  const annualSavings = annualCurrentSpend - annualGothwadSpend;
  const fiveYearSavings = annualSavings * 5;

  return (
    <section id="calculator" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Enterprise Efficiency & ROI</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Cost & Cloud <span className="text-[#0494f4]">Savings Calculator</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            See how much your business saves annually by switching from bloated monthly SaaS subscriptions & heavy cloud servers to Gothwad Tech’s custom sovereign architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#0494f4]" />
              <span>Enter Your Current Infrastructure Costs</span>
            </h3>

            {/* Slider 1: Monthly Spend */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">Monthly Cloud & SaaS Bill</span>
                <span className="text-base font-mono text-[#0494f4]">
                  ₹{currentMonthlySpendInr.toLocaleString('en-IN')} / mo
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={currentMonthlySpendInr}
                onChange={(e) => setCurrentMonthlySpendInr(Number(e.target.value))}
                className="w-full accent-[#0494f4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>₹10,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000+</span>
              </div>
            </div>

            {/* Slider 2: Team Members */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-zinc-700 dark:text-zinc-300">Internal Users / Team Size</span>
                <span className="text-base font-mono text-zinc-900 dark:text-white">
                  {teamSize} Members
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#0494f4] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>1 Member</span>
                <span>100 Members</span>
                <span>250+ Members</span>
              </div>
            </div>

            {/* Latency / Architecture Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Target Architecture Speed Requirement
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLatencyTolerance('ultra_low')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    latencyTolerance === 'ultra_low'
                      ? 'bg-[#0494f4]/15 border-[#0494f4] text-[#0494f4]'
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <div>Ultra-Low Latency (&lt;50ms)</div>
                  <div className="text-[10px] opacity-75 font-normal">Native caching & microkernel optimization</div>
                </button>
                <button
                  type="button"
                  onClick={() => setLatencyTolerance('high')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                    latencyTolerance === 'high'
                      ? 'bg-[#0494f4]/15 border-[#0494f4] text-[#0494f4]'
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <div>Standard Web Speed</div>
                  <div className="text-[10px] opacity-75 font-normal">Standard cloud setup</div>
                </button>
              </div>
            </div>

            {/* Why Custom Sovereign Software Wins */}
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
              <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Recurring Per-User Licensing Fees</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                You own 100% of the code and intellectual property. No per-seat billing, no foreign currency conversion fees.
              </p>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 dark:from-zinc-900 dark:via-zinc-900 dark:to-black text-white p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#0494f4]/20 border border-[#0494f4]/40 text-[#0494f4] text-xs font-bold">
                Projected Savings Output
              </span>
              <span className="text-xs text-zinc-400 font-mono">62% Average Cost Reduction</span>
            </div>

            {/* Big Numbers */}
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Estimated 1-Year Net Savings
              </div>
              <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight text-[#0494f4]">
                ₹{annualSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 pt-1 font-semibold">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>5-Year Cumulative Savings: ₹{fiveYearSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Comparison Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60">
                <div className="text-[10px] text-zinc-400 uppercase font-bold">Current SaaS / Cloud</div>
                <div className="text-sm font-bold text-red-400 font-mono mt-0.5">
                  ₹{annualCurrentSpend.toLocaleString('en-IN')} / yr
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0494f4]/15 border border-[#0494f4]/40">
                <div className="text-[10px] text-[#0494f4] uppercase font-bold">With Gothwad Tech</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  ₹{annualGothwadSpend.toLocaleString('en-IN')} / yr
                </div>
              </div>
            </div>

            {/* Checklist of Real-World Gains */}
            <div className="space-y-2 border-t border-zinc-800 pt-4 text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>4x Faster Page Loads (&lt;100ms API response time)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero vendor lock-in with 100% source code handover</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sovereign data hosting in certified Indian cloud hubs</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenOrderModal}
              className="w-full py-3 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Claim Your Architecture Quote Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
