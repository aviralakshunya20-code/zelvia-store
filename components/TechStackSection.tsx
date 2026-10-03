'use client';

import React from 'react';
import { TECH_STACK } from '@/lib/projects';

export function TechStackSection() {
  return (
    <section className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="mono-tag">[ 05 ] OUR CRAFT &amp; STACK</span>
            <span className="text-xs font-mono text-zinc-400">ENGINEERING STANDARDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Modern foundations. Zero technical debt.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            We don&apos;t use bloated drag-and-drop builders that slow down your website. Every tool in our stack is chosen for maximum speed, security, and long-term maintainability.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-white/10 bg-white/[0.015] hover:border-white/30 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {tech.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                {tech.name}
              </h3>
              
              <div className="text-xs font-mono text-zinc-400">
                {tech.role}
              </div>

              <p className="text-xs text-zinc-400 pt-2 border-t border-white/5 leading-relaxed">
                <strong className="text-zinc-300">Client Benefit:</strong> {tech.whyItMattersForClient}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
