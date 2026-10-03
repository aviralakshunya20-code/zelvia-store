'use client';

import React, { useState } from 'react';
import { FOUNDER_INFO } from '@/lib/projects';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack Web App');
  const [budget, setBudget] = useState('₹50k – ₹1.5L / Standard');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
        body: JSON.stringify({ name, email, projectType, budget, message }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        window.location.href = `mailto:${FOUNDER_INFO.email}?subject=Project Inquiry from ${name}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nType: ${projectType}\nBudget: ${budget}\n\n${message}`
        )}`;
        setSubmitted(true);
      }
    } catch {
      window.location.href = `mailto:${FOUNDER_INFO.email}?subject=Project Inquiry from ${name}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nType: ${projectType}\nBudget: ${budget}\n\n${message}`
      )}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            <span className="text-xs font-black text-rose-600 uppercase">
              Start Your Project
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Let&apos;s build something extraordinary.
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-600">
            Send me a note about your business, target timeline, or desired features. You will receive an architectural proposal and turnaround timeline within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct channels & info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-5">
              <h3 className="text-xl font-black text-slate-900 uppercase">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                Prefer to chat directly? Reach out directly via WhatsApp, Email, or GitHub for immediate technical discussions:
              </p>

              <div className="space-y-3 pt-2">
                {/* Email with copy */}
                <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between shadow-xs">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">Direct Email</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">{FOUNDER_INFO.email}</div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="btn-fun-pink !py-1.5 !px-3 !text-xs"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href={FOUNDER_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between hover:border-emerald-400 transition-colors shadow-xs group block"
                >
                  <div>
                    <div className="text-[10px] font-black text-emerald-600 uppercase">Instant Chat</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">WhatsApp Direct Message</div>
                  </div>
                  <span className="text-emerald-500 font-black text-lg group-hover:translate-x-1 transition-transform">↗</span>
                </a>

                {/* GitHub */}
                <a
                  href={FOUNDER_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-between hover:border-rose-400 transition-colors shadow-xs group block"
                >
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase">Code Repository</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5">GitHub Developer Profile</div>
                  </div>
                  <span className="text-rose-500 font-black text-lg group-hover:translate-x-1 transition-transform">↗</span>
                </a>
              </div>
            </div>

            {/* Turnaround Guarantee Badge */}
            <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-black text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>12-Hour Direct Technical Response</span>
              </div>
              <p className="text-xs font-bold text-slate-600 leading-relaxed">
                You communicate directly with lead full-stack architect Aviral. Zero sales reps, zero corporate waiting games.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl border-2 border-slate-200 bg-white shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 font-black text-3xl flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Project Inquiry Received!
                </h3>
                <p className="text-sm font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I will review your requirements and reply with a technical breakdown within 12 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="btn-fun-outline text-xs"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                      Your Name &amp; Business *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sharma (Founder)"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-rose-400 focus:bg-white"
                    >
                      <option value="Full-Stack Web App">Full-Stack Web App (SaaS / Portal)</option>
                      <option value="High-Converting E-Commerce">High-Converting E-Commerce Store</option>
                      <option value="Bespoke Business Website">Bespoke Brand &amp; Company Website</option>
                      <option value="AI & Vision Tooling">Custom AI &amp; Vision Pipelines</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                      Target Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-rose-400 focus:bg-white"
                    >
                      <option value="Under ₹50k (Small Sprint)">Under ₹50k (Small Sprint / Landing)</option>
                      <option value="₹50k – ₹1.5L (Standard MVP)">₹50k – ₹1.5L (Standard MVP)</option>
                      <option value="₹1.5L – ₹3L (Full Product)">₹1.5L – ₹3L (Full Custom Build)</option>
                      <option value="₹3L+ (Enterprise/Comprehensive)">₹3L+ (Enterprise/Scale)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1.5">
                    What would you like to build? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about what you are selling or building, any websites you love, and your ideal timeline..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-400">
                    🔒 Strictly confidential NDA-ready inquiry.
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-fun-pink w-full sm:w-auto !py-3.5 !px-8 text-sm"
                  >
                    {submitting ? 'Sending...' : 'Send Project Inquiry →'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
