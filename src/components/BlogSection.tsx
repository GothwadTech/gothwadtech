import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Share2 } from 'lucide-react';
import { safeCopyToClipboard } from '../utils/browserUtils';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  authorRole: string;
  tags: string[];
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'how-we-built-gothwad-browser-under-12mb',
    title: 'How We Engineered Gothwad Browser Under 12MB (C++ & Rust Microkernel)',
    excerpt: 'Deep-dive into stripping 450MB of Chromium bloat, implementing our custom TurboShield allocator, and building 16-thread download chunking.',
    category: 'Deep-Tech & Kernel',
    readTime: '6 min read',
    publishedDate: 'Aug 10, 2026',
    author: 'Pawan Gothwad',
    authorRole: 'Founder & Chief Architect',
    tags: ['C++', 'Rust', 'Browser Engine', 'Aatmanirbhar Bharat'],
    content: [
      'Modern web browsers have become notoriously bloated, routinely consuming 2GB to 4GB of RAM just to render a few tabs. When we set out to build Gothwad Browser, our primary constraint was radical efficiency: the entire binary must stay strictly under 12MB while outperforming global browsers in cold start latency.',
      'To achieve this, we decoupled the rendering pipeline from heavy telemetry background daemons. We replaced standard memory allocators with our custom lightweight TurboShield C++ buffer pool, cutting idle heap usage by over 90%.',
      'Additionally, our 16-thread parallel socket downloader leverages multiplexed TCP chunking. This enables downloads to saturate full bandwidth even on variable 4G/5G networks across India.',
    ],
  },
  {
    id: 'aatmanirbhar-bharat-sovereign-software-manifesto',
    title: 'Aatmanirbhar Bharat in Deep Tech: Why India Needs Sovereign Software',
    excerpt: 'Why relying on foreign SaaS stacks creates systemic operational risks, and how Gothwad Tech is building indigenous enterprise foundations.',
    category: 'Sovereign Tech Vision',
    readTime: '5 min read',
    publishedDate: 'Aug 04, 2026',
    author: 'Nishant',
    authorRole: 'Chief Executive Officer (CEO)',
    tags: ['Sovereignty', 'India Tech', 'Data Privacy', 'Enterprise'],
    content: [
      'Digital sovereignty is no longer optional for high-growth enterprises and public infrastructure. When critical business logic and customer records reside exclusively on foreign subscription models, companies risk unexpected tariff spikes, sudden terms-of-service revisions, and data privacy leaks.',
      'Gothwad Tech is committed to building sovereign software products where Indian enterprises own 100% of their source code, run on localized cloud regions, and eliminate per-seat licensing penalties forever.',
      'Our team of 12 dedicated architects is proving that Indian deep-tech products can surpass Silicon Valley benchmarks in speed, resilience, and UX craft.',
    ],
  },
  {
    id: 'zero-latency-web-engineering-playbook',
    title: 'Zero-Latency Web Engineering: Delivering <50ms Sub-Second APIs',
    excerpt: 'The exact architectural blueprints we use to build lightning-fast web platforms with 99+ Google Lighthouse scores for our clients.',
    category: 'Engineering Architecture',
    readTime: '7 min read',
    publishedDate: 'July 28, 2026',
    author: 'Vishnu Meena',
    authorRole: 'Co-Founder & CTO',
    tags: ['Architecture', 'React', 'Node.js', 'Performance'],
    content: [
      'Speed directly drives conversion rates. A 100ms delay in page load translates into measurable customer drop-off. In every client project we deliver at Gothwad Tech, sub-second performance is baked into the initial blueprint.',
      'We utilize server-side hydration techniques, atomic CSS compilation via modern Tailwind engines, and Redis-cached key-value layers to guarantee response times under 50 milliseconds.',
      'Every web application undergoes automated load tests against 100,000 simulated concurrent requests before production deployment.',
    ],
  },
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = async (post: BlogPost) => {
    const success = await safeCopyToClipboard(window.location.href);
    if (success) {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="blog" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Engineering Journal</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Sovereign Tech <span className="text-[#0494f4]">Insights & Case Studies</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Read technical whitepapers, browser microkernel benchmarks, and architectural blueprints written directly by our 12 engineering leaders.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between hover:border-[#0494f4]/40 transition-all shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0494f4]/10 text-[#0494f4] font-bold text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#0494f4] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read Action */}
              <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{post.author}</div>
                  <div className="text-[10px] text-zinc-400">{post.authorRole}</div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="px-3 py-1.5 rounded-lg bg-[#0494f4]/10 hover:bg-[#0494f4] text-[#0494f4] hover:text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Read Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0494f4]/10 text-[#0494f4] font-bold text-xs">
                  {selectedPost.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                  {selectedPost.title}
                </h3>
                <div className="text-xs text-zinc-400 mt-2 flex items-center gap-3">
                  <span>By <strong className="text-zinc-700 dark:text-zinc-300">{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
                  <span>•</span>
                  <span>{selectedPost.publishedDate}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-2 border-t border-zinc-200 dark:border-zinc-800">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleShare(selectedPost)}
                  className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedId === selectedPost.id ? 'Link Copied!' : 'Share Article'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-lg bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
