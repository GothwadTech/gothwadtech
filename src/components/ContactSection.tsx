import React, { useState } from 'react';
import { Mail, Send, MessageSquare, Sparkles, CheckCircle2, Phone, Copy, Check, Headphones, HelpCircle, Info } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { safeStorage } from '../utils/safeStorage';
import { safeCopyToClipboard } from '../utils/browserUtils';

interface ContactSectionProps {
  onOpenOrderModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenOrderModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('contact@gothwadtech.com');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = async (emailText: string) => {
    const success = await safeCopyToClipboard(emailText);
    if (success) {
      setCopiedEmail(emailText);
      setTimeout(() => setCopiedEmail(null), 2500);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const contactMsg = {
        id: `GT-MSG-${Date.now()}`,
        name,
        email,
        department,
        subject,
        message,
        timestamp: new Date().toISOString(),
      };
      const existing = safeStorage.getItem<any[]>('gt_contact_messages', []) || [];
      safeStorage.setItem('gt_contact_messages', [contactMsg, ...existing]);
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors duration-150"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5 fill-current text-[#0494f4]" />
            <span>Official Contact & Help Desks</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Connect with{' '}
            <span className="text-[#0494f4]">
              Gothwad Tech Team
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            Have a project order, technical query, or partnership inquiry? Reach out directly via our specialized email desks or phone line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Official Channels Directory */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  Direct Communication Channels
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  Online
                </span>
              </div>

              {/* Mobile Phone & WhatsApp Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0494f4]/10 via-[#0494f4]/5 to-transparent border border-[#0494f4]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#0494f4] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#0494f4] font-bold uppercase tracking-wider">
                        Official Phone & WhatsApp Desk
                      </div>
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white font-mono hover:text-[#0494f4] transition-colors block"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors hover:opacity-90 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Desk</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech%20Team,%20I%20would%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Department Desks */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-1">
                  Official Email Desks
                </div>

                {/* 1. contact@gothwadtech.com */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#0494f4]/10 border border-[#0494f4]/20 text-[#0494f4] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-zinc-400 font-medium">Official Inquiries & Orders</div>
                      <a
                        href="mailto:contact@gothwadtech.com"
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate block hover:text-[#0494f4]"
                      >
                        contact@gothwadtech.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('contact@gothwadtech.com')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#0494f4] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                    aria-label="Copy contact email"
                  >
                    {copiedEmail === 'contact@gothwadtech.com' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* 2. support@gothwadtech.com */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-zinc-400 font-medium">Customer & SLA Support Desk</div>
                      <a
                        href="mailto:support@gothwadtech.com"
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate block hover:text-[#0494f4]"
                      >
                        support@gothwadtech.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('support@gothwadtech.com')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#0494f4] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                    aria-label="Copy support email"
                  >
                    {copiedEmail === 'support@gothwadtech.com' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* 3. help@gothwadtech.com */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-zinc-400 font-medium">Help & Technical Assistance</div>
                      <a
                        href="mailto:help@gothwadtech.com"
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate block hover:text-[#0494f4]"
                      >
                        help@gothwadtech.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('help@gothwadtech.com')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#0494f4] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                    aria-label="Copy help email"
                  >
                    {copiedEmail === 'help@gothwadtech.com' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* 4. info@gothwadtech.com */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-[#0494f4]/40 transition-colors group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-zinc-400 font-medium">General Information & Media</div>
                      <a
                        href="mailto:info@gothwadtech.com"
                        className="text-xs font-bold text-zinc-900 dark:text-white truncate block hover:text-[#0494f4]"
                      >
                        info@gothwadtech.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('info@gothwadtech.com')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-[#0494f4] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                    aria-label="Copy info email"
                  >
                    {copiedEmail === 'info@gothwadtech.com' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Leadership Direct Contacts */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0494f4] px-1">
                  Executive Direct Inquiries
                </div>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px]">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white">Pawan Gothwad</span>{' '}
                      <span className="text-[10px] text-zinc-400">(Founder)</span>
                    </div>
                    <a
                      href="mailto:pawan@gothwadtech.com"
                      className="font-mono text-[#0494f4] hover:underline font-semibold"
                    >
                      pawan@gothwadtech.com
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px]">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white">Nishant</span>{' '}
                      <span className="text-[10px] text-zinc-400">(CEO)</span>
                    </div>
                    <a
                      href="mailto:nishant@gothwadtech.com"
                      className="font-mono text-[#0494f4] hover:underline font-semibold"
                    >
                      nishant@gothwadtech.com
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px]">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white">Vishnu Meena</span>{' '}
                      <span className="text-[10px] text-zinc-400">(Co-Founder & CTO)</span>
                    </div>
                    <a
                      href="mailto:vishnu@gothwadtech.com"
                      className="font-mono text-[#0494f4] hover:underline font-semibold"
                    >
                      vishnu@gothwadtech.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Fast-Track Order Callout */}
              <div className="p-3.5 rounded-xl bg-[#0494f4]/10 border border-[#0494f4]/20">
                <div className="text-xs font-bold text-[#0494f4] mb-1">
                  Ready to calculate an instant quote?
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mb-2.5">
                  Use our itemized configurator with timeline guarantees and live budget calculator.
                </p>
                <button
                  onClick={onOpenOrderModal}
                  className="w-full py-2 rounded-lg bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-white" />
                  <span>Open Project Configurator</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Direct Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">Send a Direct Message</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              Select your recipient desk, fill in your requirements, and our engineering team will respond within 2-4 hours.
            </p>

            {submitted ? (
              <div className="p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-center space-y-1.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Thank you, {name || 'valued visitor'}. Your query has been routed to{' '}
                  <strong className="text-zinc-900 dark:text-white">{department}</strong>. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Recipient Desk
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#0494f4] cursor-pointer"
                    >
                      <option value="contact@gothwadtech.com">Orders & Projects (contact@gothwadtech.com)</option>
                      <option value="support@gothwadtech.com">Client Support (support@gothwadtech.com)</option>
                      <option value="help@gothwadtech.com">Technical Help (help@gothwadtech.com)</option>
                      <option value="info@gothwadtech.com">General Information (info@gothwadtech.com)</option>
                      <option value="pawan@gothwadtech.com">Founder Direct (pawan@gothwadtech.com)</option>
                      <option value="nishant@gothwadtech.com">CEO Direct (nishant@gothwadtech.com)</option>
                      <option value="vishnu@gothwadtech.com">CTO Direct (vishnu@gothwadtech.com)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Web Platform Development"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, timeline, or query..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to {department}</span>
                </button>
              </form>
            )}

            {/* Quick Assurance Badges */}
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="text-[10px] text-zinc-400">Response SLA</div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">&lt; 4 Hours</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="text-[10px] text-zinc-400">Privacy Guarantee</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% NDA</div>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="text-[10px] text-zinc-400">Engineering Hub</div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">Jaipur, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
