import React, { useState } from 'react';
import { Code, Terminal, Copy, Check, Layers, Shield, Cpu } from 'lucide-react';
import { safeCopyToClipboard } from '../utils/browserUtils';

const CODE_EXAMPLES = {
  curl: `curl -X POST https://api.gothwadtech.com/v1/projects/quote \\
  -H "Authorization: Bearer GT_SOVEREIGN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectType": "ENTERPRISE_WEB_APP",
    "targetSLA": "99.99_UPTIME",
    "region": "INDIA_CENTRAL_JAIPUR",
    "deliveryPace": "TURBO_SPRINT"
  }'`,
  node: `import { GothwadTechClient } from '@gothwadtech/sdk';

const client = new GothwadTechClient({
  apiKey: process.env.GOTHWAD_API_KEY,
  hubRegion: 'ap-south-1' // Jaipur/Bengaluru
});

// Calculate instant architecture blueprint
const estimate = await client.architecture.generateBlueprint({
  category: 'BROWSER_EXTENSION_SUITE',
  expectedRPS: 50000,
  zeroDataLeakMode: true
});

console.log('Zero-Latency Architecture Ready:', estimate);`,
  browser: `// Gothwad Browser TurboShield Extension API
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ACTIVATE_16_THREAD_STREAM') {
    gothwad.turboSocket.openStream({
      url: request.fileUrl,
      concurrency: 16,
      shredTrackers: true
    }).then(status => sendResponse({ status: 'STREAM_ACTIVE' }));
    return true;
  }
});`,
};

export const DeveloperDocsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'browser'>('node');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    const success = await safeCopyToClipboard(CODE_EXAMPLES[activeTab]);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="docs" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Code className="w-3.5 h-3.5" />
            <span>Developer Ecosystem & APIs</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Gothwad Tech <span className="text-[#0494f4]">Developer Hub & SDKs</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Integrate with Gothwad Tech’s sovereign APIs, Gothwad Browser extension microkernel, and high-performance developer toolchains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Docs Navigation Links */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                API Reference & Guides
              </h3>

              <div className="space-y-1 text-xs">
                <a
                  href="#docs"
                  className="p-2.5 rounded-xl bg-[#0494f4]/10 text-[#0494f4] font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span>Quickstart SDK (Node / TS)</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0494f4]/20">v2.4</span>
                </a>

                <a
                  href="#docs"
                  className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    <span>Browser Microkernel API</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">Rust / C++</span>
                </a>

                <a
                  href="#docs"
                  className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Sovereign Auth & JWT Specs</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">REST</span>
                </a>

                <a
                  href="#docs"
                  className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Webhook Event Payloads</span>
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">JSON</span>
                </a>
              </div>
            </div>

            {/* Quick Install Box */}
            <div className="p-4 rounded-xl bg-zinc-950 text-white border border-zinc-800 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Install Official CLI / SDK
              </div>
              <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs text-[#0494f4] flex items-center justify-between">
                <code>npm i @gothwadtech/sdk</code>
                <span className="text-[10px] text-zinc-400">latest</span>
              </div>
            </div>
          </div>

          {/* Interactive Code Console */}
          <div className="lg:col-span-8 bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl text-white">
            {/* Header bar with tabs */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 mr-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('node')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer ${
                      activeTab === 'node' ? 'bg-[#0494f4] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Node / TypeScript
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('curl')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer ${
                      activeTab === 'curl' ? 'bg-[#0494f4] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    cURL REST API
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('browser')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors cursor-pointer ${
                      activeTab === 'browser' ? 'bg-[#0494f4] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Browser Extension API
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy Snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto leading-relaxed">
              <pre>
                <code>{CODE_EXAMPLES[activeTab]}</code>
              </pre>
            </div>

            {/* Console Footer */}
            <div className="px-4 py-2.5 bg-zinc-900/50 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Sovereign Sandboxed Runtime: <strong>active (Jaipur Hub)</strong></span>
              <span className="text-[#0494f4] font-semibold">Response latency: &lt; 24ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
