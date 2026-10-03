'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FOUNDER_INFO } from '@/lib/projects';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:border-white transition-colors">
            OM
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-zinc-300 transition-colors uppercase">
              Online Measurer
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
              STUDIO & ARCHITECTURE
            </span>
          </div>
        </Link>

        {/* Live Status indicator */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="pulse-indicator" />
          <span className="text-xs font-mono text-zinc-300 uppercase tracking-wider">
            Available for Q2/Q3 Projects
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <a
            href="#work"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Work ]
          </a>
          <a
            href="#services"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Services ]
          </a>
          <a
            href="#philosophy"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Manifesto ]
          </a>
          <a
            href="#process"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Process ]
          </a>
          <a
            href="#estimator"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Scope Tool ]
          </a>
          <a
            href="#contact"
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-wide uppercase font-mono"
          >
            [ Contact ]
          </a>
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            title="Copy email to clipboard"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copied ? 'Copied Email!' : 'Copy Email'}
          </button>
          <a href="#contact" className="btn-primary text-xs !py-1.5 !px-3.5">
            Start a Build →
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <span className="pulse-indicator" />
            <span className="text-xs font-mono text-zinc-300">
              AVAILABLE FOR NEW BUILDS
            </span>
          </div>
          <div className="flex flex-col space-y-3 font-mono text-sm">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 01 ] Selected Projects
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 02 ] Services & Capabilities
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 03 ] Why No Fake Reviews
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 04 ] 4-Step Process
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 05 ] Scope & Cost Tool
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-300 hover:text-white"
            >
              [ 06 ] Contact / Hire
            </a>
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                handleCopyEmail();
                setMobileMenuOpen(false);
              }}
              className="btn-secondary w-full text-xs justify-center"
            >
              {copied ? 'Copied aviralakshunya20@gmail.com' : 'Copy Email Address'}
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-xs justify-center"
            >
              Start Project Inquiry →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
