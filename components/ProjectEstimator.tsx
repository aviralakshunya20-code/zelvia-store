'use client';

import React, { useState } from 'react';

interface ProjectEstimatorProps {
  onSelectScope?: (scopeSummary: string) => void;
}

export function ProjectEstimator({ onSelectScope }: ProjectEstimatorProps) {
  const [projectType, setProjectType] = useState<'webapp' | 'ecommerce' | 'website' | 'ai'>('webapp');
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'flexible'>('standard');
  const [features, setFeatures] = useState<string[]>([
    'Responsive Mobile UI',
    'Custom Database & API',
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
    <section id="estimator" className="py-24 border-t border-white/10 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="mono-tag">[ 06 ] SCOPE CALCULATOR</span>
            <span className="text-xs font-mono text-zinc-400">INSTANT ESTIMATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Plan your build in 60 seconds.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Select your project specifications below to get an instant scope, recommended architecture, and estimated timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                01. Select Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                    className={`p-3.5 rounded-lg text-left border transition-all ${
                      projectType === type.id
                        ? 'bg-white/10 border-white text-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">{type.title}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Features Included */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                02. Capabilities &amp; Integrations Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                    className={`px-3 py-2 rounded text-left border text-xs font-mono transition-all flex items-center justify-between ${
                      features.includes(feature)
                        ? 'bg-white/10 border-white/40 text-white'
                        : 'bg-white/[0.01] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-300'
                    }`}
                  >
                    <span>{feature}</span>
                    <span className="text-xs font-bold">
                      {features.includes(feature) ? '✓' : '+'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Desired Timeline */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                03. Target Delivery Window
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rush', label: 'Rush Sprint', sub: '1 – 2 Weeks' },
                  { id: 'standard', label: 'Standard', sub: '2 – 4 Weeks' },
                  { id: 'flexible', label: 'Comprehensive', sub: '4+ Weeks' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeline(t.id as typeof timeline)}
                    className={`p-3 rounded border text-center transition-all ${
                      timeline === t.id
                        ? 'bg-white/10 border-white text-white'
                        : 'bg-white/[0.01] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{t.label}</div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{t.sub}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-time Summary Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl border border-white/15 bg-black/80 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Instant Blueprint
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Estimated Project Scope
              </h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-400">Architecture:</span>
                <span className="text-white text-right font-semibold">
                  Next.js 16 + React 19 + Edge CDN
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-400">Target Duration:</span>
                <span className="text-white text-right font-semibold">
                  {getEstimatedDuration()}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-400">Active Features:</span>
                <span className="text-white text-right font-semibold">
                  {features.length} Components Selected
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-400">Staging URL:</span>
                <span className="text-emerald-400 text-right">
                  Included (Private Preview)
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-zinc-400">Code Ownership:</span>
                <span className="text-white text-right">
                  100% Client Repository Handover
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleApplyScope}
                className="btn-primary w-full text-xs justify-center !py-3"
              >
                Inquire With This Exact Scope →
              </button>
              <p className="text-[10px] font-mono text-zinc-400 text-center mt-2.5">
                Takes you directly to the inquiry form below with your custom specs prefilled.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
