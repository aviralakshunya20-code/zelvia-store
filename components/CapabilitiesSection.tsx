'use client';

import React from 'react';
import { SERVICES } from '@/lib/projects';

export function CapabilitiesSection() {
  return (
    <section id="services" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="mono-tag">[ 03 ] WHAT I BUILD</span>
            <span className="text-xs font-mono text-zinc-400">ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            End-to-end digital solutions for serious businesses.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            From initial database modeling to high-conversion UI and cloud deployment. Everything is custom-engineered to make your business faster, more profitable, and automated.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="card-monochrome p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-zinc-400 font-bold">
                    [{service.number}]
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-white/10 text-zinc-300 bg-white/[0.03]">
                    {service.timeline}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    Included Deliverables:
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {service.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-white font-mono select-none">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5 mb-4">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.02] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="btn-secondary w-full text-xs justify-between group"
                >
                  <span>Build This For My Business</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
