import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Send, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { OrderTrackerSection } from '../components/OrderTrackerSection';

interface ContactPageProps {
  onOpenOrderModal: (service?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenOrderModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: 'School / Educational Institution',
    requirement: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        businessType: 'School / Educational Institution',
        requirement: '',
      });
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Business Communication Desk</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Let’s Discuss Your <span className="text-[#0494f4]">Digital Transformation</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Whether you need a full-featured School ERP, zero-commission Restaurant POS, Local Shop billing software, or sovereign tech consultation, our founders and engineering team are ready to assist.
        </p>
      </div>

      {/* 2. Main Two-Column Layout: Official Form & Direct Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Project Request Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
              Request a Custom System Demo or Quotation
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Fill out your details and our technical team will respond within 2 business hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                Inquiry Received Successfully!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                Thank you, <strong>{formData.name || 'Valued Partner'}</strong>. A dedicated project architect from Gothwad Tech will contact you shortly on WhatsApp / Phone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0494f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0494f4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0494f4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Business / Category *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0494f4]"
                  >
                    <option value="School / Educational Institution">School / College / Institute ERP</option>
                    <option value="Restaurant / Café / Cloud Kitchen">Restaurant & Café POS / Ordering Web</option>
                    <option value="Local Retail Shop / Supermarket">Local Retail Shop & Barcode Billing</option>
                    <option value="Business ERP / Custom Management">Business Management Tools & CRM</option>
                    <option value="Custom Android / iOS App">Custom Mobile App / Website</option>
                    <option value="Sovereign Tech Integration">Sovereign Tech Integration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Describe Your Requirement / Current Challenges *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We are a school with 1,200 students needing fee collection and WhatsApp attendance alerts..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0494f4]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Gothwad Tech</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels & Founders Desk (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Direct Desk Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 text-white space-y-4">
            <h3 className="text-lg font-bold">Direct Communication Channels</h3>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumberOnly}?text=Hello%20Gothwad%20Tech,%20I%20want%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400">WhatsApp Instant Desk</div>
                  <div className="text-xs text-zinc-300">Fast 15-minute response time</div>
                </div>
              </a>

              <a
                href="tel:07339904665"
                className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 hover:bg-zinc-800 transition-colors flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0494f4] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Direct Phone Call</div>
                  <div className="text-xs text-zinc-400 font-mono">+91 73399 04665</div>
                </div>
              </a>

              <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Headquarters</div>
                  <div className="text-xs text-zinc-400">Gothwad Tech HQ, Rajasthan, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Emails Card */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
              Departmental Contact Desks
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400">General Inquiries:</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="font-mono text-[#0494f4] font-semibold hover:underline">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400">Technical Support & Care:</span>
                <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="font-mono text-[#0494f4] font-semibold hover:underline">
                  {COMPANY_INFO.supportEmail}
                </a>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800">
                <span className="text-zinc-600 dark:text-zinc-400">Founder Direct Desk:</span>
                <a href={`mailto:${COMPANY_INFO.founderEmail}`} className="font-mono text-[#0494f4] font-semibold hover:underline">
                  {COMPANY_INFO.founderEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Order Tracking Section */}
      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Client Order & Project Tracking Portal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Check the live development, QA testing, and deployment status of your system.
          </p>
        </div>

        <OrderTrackerSection />
      </div>
    </div>
  );
};
