'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CategoryBar } from '@/components/CategoryBar';
import { InteractiveSpeedometer } from '@/components/InteractiveSpeedometer';
import { PROJECTS, FOUNDER_INFO } from '@/lib/projects';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { Project } from '@/lib/types';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white text-slate-900 pb-20">
      
      {/* 01. Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Soft pastel ambient background blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-100/70 via-pink-100/50 to-sky-100/60 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Cute Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border-2 border-rose-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-black text-rose-700 uppercase tracking-wider">
              Online Measurer • High-Performance Web Studio
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.12]">
            I build high-converting{' '}
            <span className="text-rose-500 underline decoration-rose-300 decoration-wavy decoration-2 underline-offset-8">
              websites &amp; web apps
            </span>{' '}
            that turn visitors into customers.
          </h1>

          {/* Punchy Subheading */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-bold leading-relaxed">
            Ultra-fast, entertaining, and engineered with precision. No slow templates, no bloated code, and zero fake reviews. 
            Built for modern businesses that care about speed and conversions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/work" className="btn-fun-pink">
              Explore Selected Projects 💼
            </Link>
            <Link href="/playground" className="btn-fun-outline">
              Interactive Lab 🧪
            </Link>
            <button onClick={handleCopyEmail} className="btn-fun-outline">
              {copied ? '✓ Copied Email!' : '✉ ' + FOUNDER_INFO.email}
            </button>
          </div>

          {/* Fast KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8">
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
              <div className="text-3xl font-black text-rose-500">100/100</div>
              <div className="text-xs font-black text-slate-700 uppercase mt-1">Core Web Vitals</div>
              <div className="text-[11px] font-semibold text-slate-400">Zero layout shift</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
              <div className="text-3xl font-black text-slate-900">&lt; 40ms</div>
              <div className="text-xs font-black text-slate-700 uppercase mt-1">Edge Latency</div>
              <div className="text-[11px] font-semibold text-slate-400">Global multi-region CDN</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
              <div className="text-3xl font-black text-slate-900">100%</div>
              <div className="text-xs font-black text-slate-700 uppercase mt-1">TypeScript Strict</div>
              <div className="text-[11px] font-semibold text-slate-400">Bug-free reliability</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
              <div className="text-3xl font-black text-emerald-600">0%</div>
              <div className="text-xs font-black text-slate-700 uppercase mt-1">Fake Reviews</div>
              <div className="text-[11px] font-semibold text-slate-400">100% real code proof</div>
            </div>
          </div>

        </div>
      </section>

      {/* 02. The Iconic Category Icons Bar (Matching User Image) */}
      <section className="py-6 border-y-2 border-slate-100 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-black uppercase text-rose-600 tracking-wider mb-2">
            Industry Solutions &amp; Category Domains
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-500 max-w-lg mx-auto">
            Click any category below to preview custom web experiences tailored for that industry:
          </p>
          <CategoryBar />
        </div>
      </section>

      {/* 03. Interactive Speed Benchmark */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveSpeedometer />
        </div>
      </section>

      {/* 04. Selected Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black text-rose-500 uppercase tracking-wider block mb-1">
                [ Selected Projects ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Tested code. Real client results.
              </h2>
            </div>
            <Link href="/work" className="btn-fun-outline !py-2 !px-4 text-xs font-extrabold">
              View All 4 Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 2).map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="playful-card p-6 sm:p-8 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-black text-rose-600 uppercase">
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

                  <div className="grid grid-cols-3 gap-2.5 my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    {project.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-xl font-black text-slate-900">{m.value}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-xs font-bold text-slate-500 px-2 py-0.5 rounded-lg bg-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600 group-hover:translate-x-1 transition-transform">
                  <span>View Full Architectural Blueprint</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 05. The Zero Fake Reviews Manifesto Callout */}
      <section className="py-16 bg-rose-50/50 border-y-2 border-rose-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase">
            Authenticity First
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why you will never see fake reviews on our website.
          </h2>
          <p className="text-base font-semibold text-slate-600 max-w-2xl mx-auto">
            Most digital agencies invent 5-star testimonials with stock photos. We refuse to participate in fake hype. 
            We build your staging application first so you can test real performance before final handover.
          </p>
          <div className="pt-3">
            <Link href="/about" className="btn-fun-pink">
              Read Our Full Zero-Hype Manifesto →
            </Link>
          </div>
        </div>
      </section>

      {/* 06. Ready to Build CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Ready to build a website that actually grows your business?
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-600">
            Get an instant proposal and architecture breakdown within 12 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-fun-pink !py-3.5 !px-8 text-base">
              Get Your Free Project Quote →
            </Link>
            <Link href="/services" className="btn-fun-outline !py-3.5 !px-6 text-base">
              Explore Services &amp; Timelines
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
