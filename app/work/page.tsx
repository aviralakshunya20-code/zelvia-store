'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import { Project } from '@/lib/types';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { CategoryBar } from '@/components/CategoryBar';

type FilterType = 'all' | 'ecommerce' | 'web-apps' | 'ai-tools' | 'branding';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <div className="bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            <span className="text-xs font-black text-rose-600 uppercase">
              Production Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Selected Works &amp; Case Studies.
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-600">
            Every build is engineered from scratch for real businesses. No templates, no bloat. Explore the performance and architecture below.
          </p>
        </div>

        {/* Category Icons Row */}
        <div className="mb-10 p-5 rounded-3xl bg-slate-50 border border-slate-100">
          <div className="text-center mb-2">
            <span className="text-xs font-black uppercase text-slate-500">
              Browse Work by Category
            </span>
          </div>
          <CategoryBar />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
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
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeFilter === filter.value
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600 border-2 border-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="playful-card p-6 sm:p-8 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-black text-rose-600 uppercase">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {project.year}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 mt-2">
                  {project.tagline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-2xl font-black text-slate-900">{m.value}</div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-bold text-slate-600 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600 group-hover:translate-x-1 transition-transform">
                <span>Inspect Technical Architecture &amp; Spec</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-rose-50 border-2 border-rose-200 text-center space-y-4">
          <h3 className="text-2xl font-black text-slate-900">
            Have a custom idea in mind?
          </h3>
          <p className="text-sm font-semibold text-slate-600 max-w-lg mx-auto">
            Whether it&apos;s a high-ticket e-commerce store, a multi-tenant SaaS, or an automated workflow tool, I can build it.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="btn-fun-pink">
              Start Your Project Consultation →
            </Link>
          </div>
        </div>

      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
