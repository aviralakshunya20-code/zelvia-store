'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/lib/projects';
import { Project } from '@/lib/types';
import { CaseStudyModal } from './CaseStudyModal';

type FilterType = 'all' | 'ecommerce' | 'web-apps' | 'ai-tools' | 'branding';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="work" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="mono-tag">[ 01 ] SELECTED WORK</span>
              <span className="text-xs font-mono text-zinc-400">ENGINEERED BUILDS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Proven code. Measurable results.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Each project is built from scratch with zero boilerplate bloat. Explore the live performance, architecture, and production deliverables below.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {(
              [
                { label: 'All Projects', value: 'all' },
                { label: 'E-Commerce', value: 'ecommerce' },
                { label: 'Web Applications', value: 'web-apps' },
                { label: 'AI & Systems', value: 'ai-tools' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3 py-1.5 rounded transition-all ${
                  activeFilter === filter.value
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card-monochrome p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Top metadata */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="mono-tag text-[10px]">{project.categoryLabel}</span>
                    <span className="text-xs font-mono text-zinc-400">{project.year}</span>
                  </div>
                  {project.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 text-white bg-white/5">
                      FEATURED BUILD
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2.5 my-6 p-3 rounded border border-white/10 bg-black/40">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-left">
                      <div className="font-mono text-lg font-bold text-white">
                        {metric.value}
                      </div>
                      <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider truncate">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="text-[11px] font-mono text-zinc-400 px-1.5 py-0.5">
                      +{project.stack.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                <span>View Full Architecture & Spec</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Note */}
        <div className="mt-12 p-4 rounded border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-white">ℹ</span>
            <span>All codebases tested with strict TypeScript, sub-second TTFB, and zero third-party tracking bloat.</span>
          </div>
          <a
            href="https://github.com/aviralakshunya20-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline flex items-center gap-1 shrink-0"
          >
            Audit GitHub Repositories ↗
          </a>
        </div>

      </div>

      {/* Case Study Technical Sheet Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
