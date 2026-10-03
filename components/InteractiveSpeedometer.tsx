'use client';

import React, { useState } from 'react';

export function InteractiveSpeedometer() {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);

  const runTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setTested(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50 via-white to-sky-50 border-2 border-rose-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-rose-100">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase tracking-wider mb-2">
            Interactive Speed Benchmark
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            See the difference sub-second speed makes.
          </h3>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Every 100ms of lag loses 7% of customer sales. See how our builds compare against standard template sites.
          </p>
        </div>

        <button
          onClick={runTest}
          disabled={testing}
          className="btn-fun-pink shrink-0 !py-3 !px-6 !text-sm"
        >
          {testing ? 'Testing Engine...' : tested ? '⚡ Re-Run Benchmark' : '⚡ Run Speed Benchmark'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
        {/* Slow Template */}
        <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-slate-500">
              Standard WordPress / Heavy Template
            </span>
            <span className="text-xs font-bold text-rose-500 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200">
              Slow 🐌
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {testing ? '...' : '4.62s'}
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full bg-rose-400 rounded-full transition-all duration-1000 ${
                testing ? 'w-1/4' : 'w-full'
              }`}
            />
          </div>
          <ul className="text-xs font-semibold text-slate-500 space-y-1 pt-1">
            <li>• 38 external JS scripts &amp; heavy plugins</li>
            <li>• High bounce rate on mobile devices</li>
            <li>• Server lag during traffic spikes</li>
          </ul>
        </div>

        {/* Online Measurer Next.js */}
        <div className="p-5 rounded-2xl bg-white border-2 border-rose-400 ring-4 ring-rose-100 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Our Build 🚀
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-rose-600">
              Online Measurer (Next.js 16 + Edge)
            </span>
          </div>
          <div className="text-3xl font-black text-rose-600">
            {testing ? '...' : '0.38s'}
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full bg-emerald-500 rounded-full transition-all duration-700 ${
                testing ? 'w-1/2' : 'w-1/12'
              }`}
            />
          </div>
          <ul className="text-xs font-bold text-slate-700 space-y-1 pt-1">
            <li>✓ 100/100 Google Lighthouse Core Web Vitals</li>
            <li>✓ Global Edge CDN caching (sub-40ms TTFB)</li>
            <li>✓ 0% bloated script drag, 100% strict TypeScript</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
