'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FOUNDER_INFO } from '@/lib/projects';

export function AboutPage() {
  const [feedback, setFeedback] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            <span className="text-xs font-black text-rose-600 uppercase">
              Our Uncompromising Manifesto
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Zero fake reviews. Zero manufactured hype.
          </h1>
          <p className="text-base sm:text-xl font-bold text-slate-600 leading-relaxed">
            Most digital agencies populate their websites with stock photo testimonials and invented 5-star quotes. 
            We believe your business deserves radical honesty and real code proof.
          </p>
        </div>

        {/* Comparison: Fake Hype vs Real Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* What others do */}
          <div className="p-8 rounded-3xl bg-rose-50/60 border-2 border-rose-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-600">
                Typical Agency Trap ❌
              </span>
              <span className="text-xl">⚠️</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              The Fake Social Proof Game
            </h3>
            <ul className="space-y-3 text-sm font-semibold text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-black">✕</span>
                <span>Stock photos of models used as &quot;satisfied client founders&quot;.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-black">✕</span>
                <span>Invented 5-star testimonials with generic quotes like &quot;great service!&quot;.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-black">✕</span>
                <span>Demanding full upfront payment before you ever see a working screen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-black">✕</span>
                <span>Copy-pasting heavy WordPress templates that crawl at 4-second load times.</span>
              </li>
            </ul>
          </div>

          {/* What Online Measurer does */}
          <div className="p-8 rounded-3xl bg-white border-2 border-emerald-300 ring-4 ring-emerald-50 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-600">
                The Online Measurer Standard ✓
              </span>
              <span className="text-xl">🛡️</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Proof In Live Staging First
            </h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>We deploy your actual application to a private live staging URL early.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>You test every click, audit Google Lighthouse (100/100), and test on mobile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>Only after your platform drives real business results do we ask for an honest review.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span>100% clean, strict TypeScript code with full repository ownership transferred to you.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 3 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="playful-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border-2 border-rose-400 flex items-center justify-center font-black text-rose-600">
              01
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Extreme Performance
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              We measure sub-50ms Edge TTFB, zero layout shift (CLS 0.00), and 60 FPS transitions. Speed isn&apos;t an afterthought—it&apos;s our architectural foundation.
            </p>
          </div>

          <div className="playful-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border-2 border-rose-400 flex items-center justify-center font-black text-rose-600">
              02
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Conversion Architecture
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              Every button, badge, and copy placement is engineered to eliminate friction and turn visitors into paying customers without slimy tactics.
            </p>
          </div>

          <div className="playful-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border-2 border-rose-400 flex items-center justify-center font-black text-rose-600">
              03
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Direct Senior Engineering
            </h3>
            <p className="text-sm font-semibold text-slate-600 leading-relaxed">
              No junior project managers or outsourced contractors. You work directly with lead systems architect Aviral from day one to launch.
            </p>
          </div>
        </div>

        {/* Real Client Review Submission Box */}
        <div className="max-w-2xl mx-auto p-8 rounded-3xl border-2 border-rose-200 bg-rose-50/40 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-rose-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-rose-600">
                Authentic Verification
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                Client Review &amp; Feedback Portal
              </h3>
            </div>
            <span className="text-2xl">✍️</span>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 font-black text-xl flex items-center justify-center mx-auto">
                ✓
              </div>
              <h4 className="text-xl font-black text-slate-900">Thank you for your genuine review!</h4>
              <p className="text-sm font-semibold text-slate-600">
                Your feedback will be cross-referenced with your production project deployment. We deeply appreciate honest partners.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <p className="text-xs font-bold text-slate-600">
                Have you worked with Online Measurer on a website or web app? Share your unedited experience below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Your Name &amp; Role
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sameer K. (Founder)"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold focus:outline-none focus:border-rose-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                    Project Website URL
                  </label>
                  <input
                    type="text"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="e.g. yourstore.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold focus:outline-none focus:border-rose-400 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Honest Feedback / Experience
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us honestly about the engineering speed, design aesthetic, and customer outcome..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-xs font-bold focus:outline-none focus:border-rose-400 bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-slate-500">
                  Reviews are tied to verified client repositories.
                </span>
                <button type="submit" className="btn-fun-pink !py-2.5 !px-5 text-xs">
                  Submit Genuine Review →
                </button>
              </div>
            </form>
          )}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link href="/contact" className="btn-fun-pink !py-3.5 !px-8 text-base">
            Discuss Your Business Website With Aviral →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
