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
    <footer className="border-t-2 border-slate-100 bg-slate-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl border-2 border-rose-500 bg-rose-50 flex items-center justify-center font-black text-rose-600 text-sm">
                OM
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 uppercase">
                Online Measurer
              </span>
            </Link>
            <p className="text-sm font-semibold text-slate-600 max-w-sm leading-relaxed">
              We build high-converting websites and modern web applications that turn visitors into paying customers. Fast, playful, and meticulously measured.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Edge Status: All Systems Operational (Global CDN)</span>
            </div>
          </div>

          {/* Multipage Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs text-rose-600 uppercase tracking-wider font-black">
              Explore Pages
            </div>
            <ul className="space-y-2 text-sm font-bold text-slate-700">
              <li>
                <Link href="/" className="hover:text-rose-600 transition-colors">
                  🏠 Home Page
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-rose-600 transition-colors">
                  💼 Selected Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-rose-600 transition-colors">
                  🛠 Services &amp; Capabilities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rose-600 transition-colors">
                  💎 Why No Fake Reviews
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-rose-600 transition-colors">
                  🧪 Interactive Playground Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-600 transition-colors">
                  ✉ Get a Free Project Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Telemetry card */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs text-rose-600 uppercase tracking-wider font-black">
              Real-time Status
            </div>
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-xs font-bold space-y-2 text-slate-700 shadow-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span>India (Serving Global Businesses)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Live Time (IST):</span>
                <span className="text-rose-600 font-extrabold">{currentTime || '12:00:00'} IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client Openings:</span>
                <span className="text-emerald-600">Accepting Q2/Q3 Builds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Production URL:</span>
                <span className="text-slate-900">onlinemeasurer.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div>
            © {new Date().getFullYear()} Online Measurer ({FOUNDER_INFO.name}). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={FOUNDER_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={`mailto:${FOUNDER_INFO.email}`}
              className="hover:text-rose-600 transition-colors"
            >
              {FOUNDER_INFO.email}
            </a>
            <span>•</span>
            <a
              href={FOUNDER_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
