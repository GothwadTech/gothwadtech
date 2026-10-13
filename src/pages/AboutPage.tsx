import React, { useState } from 'react';
import { Users, ShieldCheck, Mail, Compass, HeartHandshake } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/companyData';
import { TeamMember } from '../types';

interface AboutPageProps {
  onOpenOrderModal: (service?: string) => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenOrderModal,
  onNavigate,
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const leadership = TEAM_MEMBERS.filter((m) => m.tier === 'Executive Leadership');
  const engineers = TEAM_MEMBERS.filter((m) => m.tier !== 'Executive Leadership');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* 1. Header & Company Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>About Gothwad Tech & Leadership</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Pioneering <span className="text-[#0494f4]">Digital Transformation</span> & Sovereign Tech
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Founded by <strong>Pawan Gothwad</strong> and led by CEO <strong>Nishant</strong> and CTO <strong>Vishnu Meena</strong>, Gothwad Tech delivers high-efficiency digital solutions for Indian institutions and builds indigenous consumer software to power a self-reliant digital India.
        </p>
      </div>

      {/* 2. Executive Leadership Grid */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Executive Leadership & Founders
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Visionary leaders driving technological breakthroughs and business scaling across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map((leader) => (
            <div
              key={leader.id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-[#0494f4] transition-all"
            >
              <div>
                {/* Avatar & Initials Badge */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={leader.avatarUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#0494f4]">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mb-3 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80">
                  {leader.titleBadge}
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {leader.bio}
                </p>

                {/* Key Skills */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Expertise:</div>
                  <div className="flex flex-wrap gap-1">
                    {leader.keySkills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Link */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-mono">{leader.email}</span>
                <a
                  href={`mailto:${leader.email}`}
                  className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-[#0494f4] hover:text-white text-zinc-600 dark:text-zinc-300 transition-colors"
                  title={`Email ${leader.name}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dedicated Engineering Powerhouse (8 Specialized Architects) */}
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Engineering & Operations Powerhouse
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Dedicated specialists in School ERPs, Mobile Apps, POS hardware integrations, and Edge Cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineers.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{member.name}</h4>
                    <div className="text-[11px] text-[#0494f4] font-semibold line-clamp-1">{member.role}</div>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-3">
                  {member.bio}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800 text-[10px] font-mono text-zinc-500">
                {member.focusArea}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Core Values & Principles */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 text-white space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black">Our Guiding Engineering Principles</h3>
          <p className="text-xs text-zinc-400">
            Built on transparency, technical superiority, and Indian data independence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-sm">100% IP & Data Ownership</h4>
            <p className="text-xs text-zinc-400">
              When we build digital management systems for schools or businesses, your data and source intellectual property belong strictly to you.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
            <Compass className="w-5 h-5 text-[#0494f4]" />
            <h4 className="font-bold text-sm">Aatmanirbhar Bharat</h4>
            <p className="text-xs text-zinc-400">
              We actively engineer sovereign consumer apps (Gothwad Browser, GrixChat, Indogram) to give Indian citizens indigenous choices.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
            <HeartHandshake className="w-5 h-5 text-purple-400" />
            <h4 className="font-bold text-sm">Direct Founder Engagement</h4>
            <p className="text-xs text-zinc-400">
              Every client gets direct architectural consultation from our executive founders to ensure flawless system design and timely delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
