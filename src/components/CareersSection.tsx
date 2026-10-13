import React, { useState } from 'react';
import { Users, Sparkles, CheckCircle2, ArrowRight, Send, MapPin, Clock, Shield, FileCheck } from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  skills: string[];
}

const OPEN_ROLES: JobRole[] = [
  {
    id: 'rust-kernel-engineer',
    title: 'Senior C++ & Rust Browser Kernel Engineer',
    department: 'Gothwad Browser Core',
    location: 'Jaipur Hub / Hybrid',
    type: 'Full-Time',
    experience: '3-6 Years',
    description: 'Work alongside Founder Pawan Gothwad and CTO Vishnu Meena on microkernel memory optimizations, socket multithreading, and sandboxed execution.',
    skills: ['Rust', 'C++20', 'Memory Safety', 'Chromium Internals', 'Linux Sockets'],
  },
  {
    id: 'fullstack-react-engineer',
    title: 'High-Performance Fullstack Architect (React/Node)',
    department: 'Sovereign Web Solutions',
    location: 'Jaipur / Bengaluru / Remote',
    type: 'Full-Time',
    experience: '2-5 Years',
    description: 'Build zero-latency client applications, sub-second API pipelines, and high-conversion enterprise dashboards with sub-100ms response targets.',
    skills: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'deeptech-intern',
    title: 'Aatmanirbhar Deep-Tech Engineering Fellow (Internship)',
    department: 'Innovation & Research Lab',
    location: 'Jaipur Hub / Remote',
    type: '6-Month Paid Fellowship',
    experience: 'Passionate Students / Freshers',
    description: 'Mentorship directly under our 12 expert leadership team. Ship real code into production and contribute to sovereign software systems.',
    skills: ['DSA', 'TypeScript / Go / Rust', 'System Architecture', 'Problem Solving'],
  },
];

export const CareersSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const app = {
        id: `GT-APP-${Date.now()}`,
        roleId: selectedRole?.id,
        roleTitle: selectedRole?.title,
        name: candidateName,
        email: candidateEmail,
        phone: candidatePhone,
        githubUrl,
        coverNote,
        timestamp: new Date().toISOString(),
      };
      const existing = safeStorage.getItem<any[]>('gt_career_applications', []) || [];
      safeStorage.setItem('gt_career_applications', [app, ...existing]);
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      setCandidateName('');
      setCandidateEmail('');
      setCandidatePhone('');
      setGithubUrl('');
      setCoverNote('');
    }, 4000);
  };

  return (
    <section id="careers" className="py-20 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Join the Powerhouse</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Careers & Fellowships at <span className="text-[#0494f4]">Gothwad Tech</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            We are a tight-knit collective of 12 dedicated architects and engineers building India’s sovereign software future. Ready to build world-beating systems?
          </p>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {OPEN_ROLES.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#0494f4]/40 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0494f4]/10 text-[#0494f4] font-bold text-xs">
                    {role.department}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {role.experience}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                  {role.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-xl">
                  {role.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-3 h-3 text-[#0494f4]" />
                    <span>{role.location}</span>
                  </div>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <Clock className="w-3 h-3 text-[#0494f4]" />
                    <span>{role.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-[#0494f4] dark:hover:bg-[#0077cd] dark:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Culture & Perks Callout */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <Shield className="w-5 h-5 text-[#0494f4] mx-auto mb-1.5" />
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Merit & Craft Culture</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Zero bureaucracy. Direct product ownership.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <Sparkles className="w-5 h-5 text-[#0494f4] mx-auto mb-1.5" />
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Competitive Compensation</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Industry-benchmarked salaries & performance grants.</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <FileCheck className="w-5 h-5 text-[#0494f4] mx-auto mb-1.5" />
            <div className="text-xs font-bold text-zinc-900 dark:text-white">Direct Leadership Mentorship</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Collaborate directly with Founder & CTO.</div>
          </div>
        </div>

        {/* Application Modal */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-[#0494f4] tracking-wider">
                    Quick 1-Click Application
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {selectedRole.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Application Received!</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    Thank you {candidateName}. Our leadership team will review your profile and reach out within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Verma"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="aman@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      GitHub Profile or Portfolio Link *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/username"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1">
                      Brief Note / Best Project Built
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you love to build and your proudest achievement..."
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#0494f4]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
