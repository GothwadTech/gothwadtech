import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/companyData';
import { ProjectItem } from '../types';

interface PortfolioPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenOrderModal: (serviceTitle?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onSelectProject,
  onOpenOrderModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Schools & Education',
    'Restaurants & Hospitality',
    'Retail & Local Shops',
    'Business & Enterprise',
    'Sovereign Tech',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0494f4]/10 border border-[#0494f4]/30 text-[#0494f4] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Proven Deliveries & Case Studies</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Client Transformations & <span className="text-[#0494f4]">Sovereign Deployments</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Explore real digital management solutions shipped for Indian schools, restaurants, supermarkets, enterprises, and sovereign technology labs.
        </p>

        {/* Filter Pills */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0494f4] text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-850 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-[#0494f4] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900/90 backdrop-blur-sm text-white text-[10px] font-bold font-mono">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#0494f4] transition-colors mb-1 line-clamp-1">
                  {project.title}
                </h3>
                <div className="text-xs text-[#0494f4] font-semibold mb-2 line-clamp-1">
                  {project.subtitle}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-4 text-center">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-[10px] text-zinc-400">{m.label}</div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Click Prompt */}
            <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 group-hover:text-[#0494f4] font-bold">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Custom Solution Inquiry Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold">Have a unique business requirement or institution?</h3>
          <p className="text-xs text-zinc-400">Our engineering team designs custom software with 100% IP ownership.</p>
        </div>
        <button
          onClick={() => onOpenOrderModal('Custom Business Management System')}
          className="px-5 py-2.5 rounded-xl bg-[#0494f4] hover:bg-[#0077cd] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          Discuss Your Project
        </button>
      </div>
    </div>
  );
};
