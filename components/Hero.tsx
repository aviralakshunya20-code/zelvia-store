'use client';

import React, { useState } from 'react';
import { FOUNDER_INFO } from '@/lib/projects';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.04] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          
          {/* Top Identifier Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md">
            <span className="pulse-indicator-white" />
            <span className="text-[11px] font-mono tracking-wider text-zinc-300 uppercase">
              Online Measurer • Digital Engineering Studio
            </span>
          </div>

          {/* Primary Punchy Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            I build high-performance{' '}
            <span className="underline decoration-white/30 decoration-2 underline-offset-8">
              websites & web apps
            </span>{' '}
            that turn visitors into customers.
          </h1>

          {/* Point-to-Point Subheading */}
          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Simple, razor-sharp engineering with zero marketing fluff. Every layout measured, every query optimized. 
            Built for founders and businesses who refuse to settle for slow, generic templates.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a href="#work" className="btn-primary text-sm px-6 py-3">
              Explore Selected Projects ↓
            </a>
            <a href="#estimator" className="btn-secondary text-sm px-5 py-3">
              <span className="font-mono text-xs text-zinc-400 mr-1">[01]</span> Scope Calculator
            </a>
            <button
              onClick={handleCopyEmail}
              className="btn-secondary text-sm px-5 py-3 font-mono text-xs text-zinc-300"
            >
              {copied ? '✓ Copied: ' + FOUNDER_INFO.email : '✉ ' + FOUNDER_INFO.email}
            </button>
          </div>

          {/* Live Telemetry Bar */}
          <div className="pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="p-3.5 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-left">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  100/100
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Core Web Vitals
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Zero layout shift, 60fps</div>
              </div>

              <div className="p-3.5 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-left">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  &lt; 40ms
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Edge TTFB Latency
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Global multi-region CDN</div>
              </div>

              <div className="p-3.5 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-left">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  100%
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Strict TypeScript
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Rock-solid, bug-free runtime</div>
              </div>

              <div className="p-3.5 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-left">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  0%
                </div>
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Fake Reviews / Hype
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">Pure proof in staging code</div>
              </div>
            </div>
          </div>

          {/* Quick Terminal Spec Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/80 font-mono text-xs text-zinc-400">
            <span className="text-zinc-400">$</span>
            <span className="text-zinc-300">architect --brand=&quot;Online Measurer&quot; --mode=production</span>
            <span className="text-emerald-400 font-bold">✓ READY</span>
          </div>

        </div>
      </div>
    </section>
  );
}
