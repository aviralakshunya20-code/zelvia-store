'use client';

import React, { useState } from 'react';

interface ProjectEstimatorProps {
  onSelectScope?: (scopeSummary: string) => void;
}

export function ProjectEstimator({ onSelectScope }: ProjectEstimatorProps) {
  const [projectType, setProjectType] = useState<'webapp' | 'ecommerce' | 'website' | 'ai'>('webapp');
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'flexible'>('standard');
  const [features, setFeatures] = useState<string[]>([
    'Responsive Mobile UI & PWA',
    'Custom Database & API (PostgreSQL)',
  ]);

  const toggleFeature = (feature: string) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  const projectTypeLabels = {
    webapp: 'Full-Stack Web Application (SaaS / Portal)',
    ecommerce: 'High-Converting E-Commerce Storefront',
    website: 'Bespoke Brand & High-Performance Website',
    ai: 'Custom AI & Computer Vision Integration',
  };

  const getEstimatedDuration = () => {
    if (timeline === 'rush') return '10 – 14 Days (Accelerated Sprint)';
    if (timeline === 'standard') return '2 – 4 Weeks (Standard Production Sprint)';
    return '4 – 6 Weeks (Deep Iteration)';
  };

  const handleApplyScope = () => {
    const summary = `Project Type: ${projectTypeLabels[projectType]}\nTimeline: ${getEstimatedDuration()}\nRequired Features:\n- ${features.join('\n- ')}`;
    if (onSelectScope) {
      onSelectScope(summary);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="text-xs font-black text-rose-600 uppercase tracking-wider block">
              01. Select Project Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'webapp', title: 'Full-Stack Web App', desc: 'Custom SaaS, user portals, dashboards' },
                { id: 'ecommerce', title: 'E-Commerce Platform', desc: 'Instant cart, Stripe, mobile checkout' },
                { id: 'website', title: 'Brand / Company Website', desc: '100/100 Core Web Vitals, high-converting' },
                { id: 'ai', title: 'AI & Vision Tooling', desc: 'Multimodal Gemini & automated pipelines' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setProjectType(type.id as typeof projectType)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    projectType === type.id
                      ? 'bg-rose-50 border-rose-500 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-rose-200'
                  }`}
                >
                  <div className={`font-black text-sm ${projectType === type.id ? 'text-rose-600' : 'text-slate-900'}`}>
                    {type.title}
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Features Included */}
          <div className="space-y-3">
            <label className="text-xs font-black text-rose-600 uppercase tracking-wider block">
              02. Capabilities &amp; Integrations Required
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Responsive Mobile UI & PWA',
                'Custom Database & API (PostgreSQL)',
                'User Auth & Role Management',
                'Stripe / Razorpay Payments',
                'Admin Command Center & Analytics',
                'Multimodal AI / Vision Pipeline',
                'Automated Transactional Emails',
                'Full Technical SEO & Microdata',
              ].map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={`px-3.5 py-2.5 rounded-2xl text-left border-2 text-xs font-extrabold transition-all cursor-pointer flex items-center justify-between ${
                    features.includes(feature)
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-rose-200'
                  }`}
                >
                  <span>{feature}</span>
                  <span className="text-xs font-black">
                    {features.includes(feature) ? '✓' : '+'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Desired Timeline */}
          <div className="space-y-3">
            <label className="text-xs font-black text-rose-600 uppercase tracking-wider block">
              03. Target Delivery Window
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'rush', label: 'Rush Sprint', sub: '1 – 2 Weeks' },
                { id: 'standard', label: 'Standard', sub: '2 – 4 Weeks' },
                { id: 'flexible', label: 'Comprehensive', sub: '4+ Weeks' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTimeline(t.id as typeof timeline)}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                    timeline === t.id
                      ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-rose-200'
                  }`}
                >
                  <div className="text-xs font-black">{t.label}</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{t.sub}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Real-time Summary Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border-2 border-rose-200 bg-white shadow-lg space-y-6">
          <div className="border-b-2 border-slate-100 pb-4">
            <div className="text-xs font-black text-rose-500 uppercase tracking-wider">
              Instant Blueprint
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              Estimated Project Scope
            </h3>
          </div>

          <div className="space-y-3.5 text-xs font-bold text-slate-700">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Architecture:</span>
              <span className="text-slate-900 font-extrabold text-right">
                Next.js 16 + React 19 + Edge CDN
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Target Duration:</span>
              <span className="text-rose-600 font-extrabold text-right">
                {getEstimatedDuration()}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Selected Features:</span>
              <span className="text-slate-900 font-extrabold text-right">
                {features.length} Components Active
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Staging URL:</span>
              <span className="text-emerald-600 font-extrabold text-right">
                ✓ Included (Private Preview)
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Code Handover:</span>
              <span className="text-slate-900 font-extrabold text-right">
                100% Full Source Code Ownership
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleApplyScope}
              className="btn-fun-pink w-full text-xs justify-center !py-3.5"
            >
              Inquire With This Exact Scope →
            </button>
            <p className="text-[11px] font-bold text-slate-400 text-center mt-2.5">
              Takes you directly to the inquiry form with your custom specs prefilled.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
