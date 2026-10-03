'use client';

import React, { useState } from 'react';
import { FOUNDER_INFO } from '@/lib/projects';

interface ContactSectionProps {
  initialMessage?: string;
}

export function ContactSection({ initialMessage = '' }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Web App');
  const [message, setMessage] = useState(initialMessage);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync if initialMessage changes from Estimator
  React.useEffect(() => {
    if (initialMessage) {
      setMessage((prev) => (prev ? `${prev}\n\n[ ESTIMATED SCOPE ]:\n${initialMessage}` : initialMessage));
    }
  }, [initialMessage]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType, message }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback to mailto
        window.location.href = `mailto:${FOUNDER_INFO.email}?subject=Project Inquiry from ${name}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nType: ${projectType}\n\n${message}`
        )}`;
        setSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:${FOUNDER_INFO.email}?subject=Project Inquiry from ${name}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nType: ${projectType}\n\n${message}`
      )}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="mono-tag">[ 07 ] START A PROJECT</span>
            <span className="text-xs font-mono text-zinc-400">DIRECT COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let&apos;s build something exceptional.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Tell me about your business goals, target timeline, or desired features. You will receive a direct technical response and architecture proposal within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct channels & info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.015] space-y-4">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Direct Contact Channels
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Prefer to chat directly? Reach out via any of the channels below for an immediate conversation:
              </p>

              <div className="space-y-3 pt-2 font-mono text-xs">
                {/* Email with copy */}
                <div className="p-3 rounded border border-white/10 bg-black/60 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Primary Email</div>
                    <div className="text-white font-semibold mt-0.5">{FOUNDER_INFO.email}</div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="btn-secondary text-[11px] !py-1 !px-2.5"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href={FOUNDER_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded border border-white/10 bg-black/60 flex items-center justify-between hover:border-white/30 transition-colors block"
                >
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Instant Messaging</div>
                    <div className="text-white font-semibold mt-0.5">WhatsApp / Direct Chat</div>
                  </div>
                  <span className="text-zinc-400">↗</span>
                </a>

                {/* GitHub */}
                <a
                  href={FOUNDER_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded border border-white/10 bg-black/60 flex items-center justify-between hover:border-white/30 transition-colors block"
                >
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Open Source &amp; Code</div>
                    <div className="text-white font-semibold mt-0.5">GitHub Profile</div>
                  </div>
                  <span className="text-zinc-400">↗</span>
                </a>
              </div>
            </div>

            {/* Turnaround Guarantee Badge */}
            <div className="p-5 rounded-lg border border-white/10 bg-zinc-950 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <span className="pulse-indicator" />
                <span>12-Hour Technical Response Guarantee</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Every inquiry is reviewed directly by the lead engineer—no junior sales reps or outsourced qualification scripts.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl border border-white/15 bg-black/80">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Inquiry Received Successfully
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I have received your project details and will review your technical requirements within 12 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="btn-secondary text-xs"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Your Name &amp; Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Chen (Founder, Acme)"
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@acme.com"
                      className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Project Classification
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App (SaaS, Customer Portal)</option>
                    <option value="High-Converting E-Commerce">High-Converting E-Commerce Storefront</option>
                    <option value="Bespoke Business Website">Bespoke Brand &amp; Company Website</option>
                    <option value="AI & Vision Tooling">Custom AI / Vision Pipeline Integration</option>
                    <option value="Codebase Audit & Optimization">Codebase Speed &amp; Architecture Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Project Requirements / Scope *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your product, what you want to build, any reference sites you admire, and your target launch date..."
                    className="w-full px-3.5 py-2.5 rounded bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 resize-none font-mono"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[10px] font-mono text-zinc-400">
                    No spam. Confidential NDA-ready technical evaluation.
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full sm:w-auto text-xs !py-3 !px-6"
                  >
                    {submitting ? 'Submitting...' : 'Send Project Inquiry →'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
