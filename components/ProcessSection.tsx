'use client';

import React from 'react';
import { PROCESS_STEPS } from '@/lib/projects';

export function ProcessSection() {
  return (
    <section id="process" className="py-24 border-t border-white/10 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="mono-tag">[ 04 ] HOW WE WORK</span>
            <span className="text-xs font-mono text-zinc-400">POINT-TO-POINT PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Simple 4-step execution. Zero wasted hours.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            No endless meetings, no bureaucratic back-and-forth. You always know what is being built, when you can test it, and when it goes live.
          </p>
        </div>

        {/* 4 Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-lg border border-white/10 bg-black/50 space-y-3 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded border border-white/20 bg-white/5">
                    STEP {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span>Deterministic milestone</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
