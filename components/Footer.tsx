'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FOUNDER_INFO } from '@/lib/projects';

export function Footer() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-12 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center text-xs font-bold text-white">
                OM
              </div>
              <span className="font-semibold text-sm tracking-tight text-white uppercase font-sans">
                Online Measurer
              </span>
            </Link>
            <p className="text-xs text-zinc-400 font-sans max-w-sm leading-relaxed">
              Precision digital engineering and full-stack web applications. Measured for sub-second speed, 100/100 Core Web Vitals, and zero unnecessary bloat.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Edge Status: All Systems Operational (Global CDN)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs text-white uppercase tracking-wider font-semibold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  [01] Selected Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  [02] Services &amp; Capabilities
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  [03] Manifesto (No Fake Reviews)
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  [04] 4-Step Engineering Protocol
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">
                  [05] Scope &amp; Cost Calculator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  [06] Contact &amp; Hire
                </a>
              </li>
            </ul>
          </div>

          {/* Systems Telemetry */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs text-white uppercase tracking-wider font-semibold">
              System Telemetry
            </div>
            <div className="p-3.5 rounded border border-white/10 bg-white/[0.02] text-xs space-y-2 text-zinc-400">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-zinc-200">India (IST)</span>
              </div>
              <div className="flex justify-between">
                <span>Local Time:</span>
                <span className="text-white font-bold">{currentTime || '12:00:00'} IST</span>
              </div>
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className="text-emerald-400">Accepting Q2/Q3 Builds</span>
              </div>
              <div className="flex justify-between">
                <span>Deployment:</span>
                <span className="text-zinc-200">onlinemeasurer.com (Edge)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {new Date().getFullYear()} Online Measurer ({FOUNDER_INFO.name}). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={FOUNDER_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={`mailto:${FOUNDER_INFO.email}`}
              className="hover:text-white transition-colors"
            >
              {FOUNDER_INFO.email}
            </a>
            <span>•</span>
            <a
              href={FOUNDER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
