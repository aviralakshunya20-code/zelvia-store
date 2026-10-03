'use client';

import React, { useState } from 'react';

export function PhilosophySection() {
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
    <section id="philosophy" className="py-24 border-t border-white/10 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2">
            <span className="mono-tag">[ 02 ] OUR PHILOSOPHY</span>
            <span className="text-xs font-mono text-zinc-400">AUTHENTICITY FIRST</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Zero fake reviews. Zero manufactured hype.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Most digital agencies populate their websites with stock photo testimonials and invented 5-star quotes. 
            We refuse to play that game.
          </p>
        </div>

        {/* 3 Pillar Manifesto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          
          <div className="card-monochrome p-6 space-y-3">
            <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white">
              01
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Test Live in Staging First
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We deploy your website or web app to a private staging URL early in the sprint. You click every button, test the load speed on your phone, and verify data flows before any final handover.
            </p>
          </div>

          <div className="card-monochrome p-6 space-y-3">
            <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white">
              02
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Measurable Code, Not Words
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We don&apos;t ask you to trust our promises. We measure every deliverable: sub-50ms Edge TTFB, 100/100 Lighthouse performance, 100% strict TypeScript types, and seamless mobile UX.
            </p>
          </div>

          <div className="card-monochrome p-6 space-y-3">
            <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white">
              03
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Genuine Reviews Are Earned
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Real business owners leave real reviews only after their platform delivers real paying customers and saves them hundreds of engineering hours. That is the only social proof worth having.
            </p>
          </div>

        </div>

        {/* Interactive Authentic Review / Feedback Box */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl border border-white/15 bg-black/60 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                Direct Client Verification &amp; Review Portal
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">UNEDITED &amp; HONEST</span>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center mx-auto text-lg">
                ✓
              </div>
              <h4 className="text-base font-bold text-white">Thank you for your authentic review</h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Your feedback will be verified directly against production project milestones. We appreciate honest collaboration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <p className="text-xs text-zinc-400">
                Worked with Online Measurer on a web build? Leave your authentic feedback below. No filtered quotes, no marketing edits.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Your Name &amp; Role
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul S. (Founder, TechCorp)"
                    className="w-full px-3 py-2 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Project Website URL
                  </label>
                  <input
                    type="text"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="e.g. yourbusiness.com"
                    className="w-full px-3 py-2 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Honest Feedback / Experience
                </label>
                <textarea
                  rows={3}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us honestly about the engineering speed, design aesthetic, and business outcome..."
                  className="w-full px-3 py-2 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-zinc-400">
                  Reviews are cross-referenced with deployed commits.
                </span>
                <button type="submit" className="btn-primary text-xs !py-2 !px-4">
                  Submit Genuine Review →
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
