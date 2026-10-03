'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/projects';
import { ProjectEstimator } from '@/components/ProjectEstimator';

export default function ServicesPage() {
  return (
    <div className="bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            <span className="text-xs font-black text-rose-600 uppercase">
              Capabilities &amp; Solutions
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            End-to-end digital solutions for growing businesses.
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-600">
            From initial database modeling to high-conversion UI, payment setups, and cloud deployment. Everything is tailor-made to generate real business revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="playful-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-rose-600 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200">
                    SERVICE {service.number}
                  </span>
                  <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                    {service.timeline}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {service.title}
                </h2>
                <p className="text-xs font-black text-rose-500 uppercase tracking-wider mt-1 mb-3">
                  {service.tagline}
                </p>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Included Deliverables:
                  </div>
                  <ul className="space-y-2 text-xs font-bold text-slate-700">
                    {service.deliverables.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-black select-none">✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 mb-4">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-slate-500 px-2 py-0.5 rounded-lg bg-slate-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="btn-fun-pink w-full text-xs justify-between group"
                >
                  <span>Build This For My Business</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Scope & Price Estimator */}
        <div className="pt-8 border-t-2 border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-rose-500 text-white text-xs font-black uppercase">
              Interactive Scope Builder
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Calculate Your Custom Build Scope
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              Pick your desired features and timeline to generate an instant technical spec.
            </p>
          </div>

          <ProjectEstimator />
        </div>

      </div>
    </div>
  );
}
