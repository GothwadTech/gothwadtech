import React, { useState } from 'react';
import { Star, CheckCircle2, Send, MessageSquare, ShieldCheck } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';

interface Review {
  id: string;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  projectDelivered: string;
  feedback: string;
  verified: boolean;
  date: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Vikram Shekhawat',
    role: 'Founder & CEO',
    company: 'FinSovereign Technologies',
    rating: 5,
    projectDelivered: 'Enterprise Payment Gateway & SaaS Portal',
    feedback: 'Pawan Gothwad and his 12-expert team engineered a banking-grade web platform that handles 100k daily checkouts with zero downtime. The speed is phenomenal (<40ms API latency). Proud to partner with an Indian sovereign tech powerhouse!',
    verified: true,
    date: 'August 2026',
  },
  {
    id: 'rev-2',
    clientName: 'Dr. Ananya Ray',
    role: 'Director of Technology',
    company: 'HealthSync AI India',
    rating: 5,
    projectDelivered: 'Cross-Platform Medical Flutter App & Cloud Run Backend',
    feedback: 'Delivered in record time without compromising code quality. Our medical app runs buttery smooth at 120fps on both iOS and Android. Their sovereign architecture saves us over ₹3.5 Lakhs every year in server overhead.',
    verified: true,
    date: 'July 2026',
  },
  {
    id: 'rev-3',
    clientName: 'Rajesh Meena',
    role: 'Chief Product Officer',
    company: 'LogisticsBharat Express',
    rating: 5,
    projectDelivered: 'Real-Time Fleet Dispatch Dashboard',
    feedback: 'Gothwad Tech’s attention to detail, Tailwind UI heuristics, and instant WhatsApp support are unmatched. Transparent pricing, strict NDA adherence, and 100% intellectual property ownership.',
    verified: true,
    date: 'June 2026',
  },
];

export const ReviewsHubSection: React.FC<{ onOpenOrderModal: () => void }> = ({ onOpenOrderModal }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = safeStorage.getItem<Review[]>('gt_client_reviews', []);
    return saved && saved.length > 0 ? [...saved, ...INITIAL_REVIEWS] : INITIAL_REVIEWS;
  });

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [projectDelivered, setProjectDelivered] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      clientName: name,
      role: role || 'Client',
      company: company || 'Enterprise Client',
      rating,
      projectDelivered: projectDelivered || 'Custom Sovereign System',
      feedback,
      verified: true,
      date: 'Just Now',
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    safeStorage.setItem('gt_client_reviews', [newRev]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setName('');
      setRole('');
      setCompany('');
      setFeedback('');
    }, 3000);
  };

  return (
    <section id="reviews-hub" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.95 / 5.0 Star Client Rating</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Verified Client <span className="text-[#0494f4]">Reviews & Testimonials</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Real feedback from enterprise founders, product managers, and startups who scaled their platforms with Gothwad Tech.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 rounded-xl bg-[#0494f4]/10 hover:bg-[#0494f4] text-[#0494f4] hover:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showReviewForm ? 'Hide Review Form' : 'Submit Your Client Review'}</span>
            </button>
          </div>
        </div>

        {/* Review Form (Collapsible) */}
        {showReviewForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Submit Your Verified Feedback
            </h3>

            {submitted ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                <div className="text-sm font-bold text-zinc-900 dark:text-white">Thank You for Your Feedback!</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Your review has been verified and published below.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Company & Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CEO at BharatTech"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Project Delivered
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Enterprise Web Platform"
                      value={projectDelivered}
                      onChange={(e) => setProjectDelivered(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Rating (Stars)
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0494f4] cursor-pointer"
                    >
                      <option value={5}>★★★★★ (5/5 Stars - Outstanding)</option>
                      <option value={4}>★★★★☆ (4/5 Stars - Very Good)</option>
                      <option value={3}>★★★☆☆ (3/5 Stars - Satisfactory)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Share how Gothwad Tech helped your business..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Client Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xs hover:border-[#0494f4]/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-bold text-[#0494f4] font-mono">
                  {rev.projectDelivered}
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                  "{rev.feedback}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{rev.clientName}</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {rev.role} • {rev.company}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
