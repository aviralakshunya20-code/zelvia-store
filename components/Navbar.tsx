'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FOUNDER_INFO } from '@/lib/projects';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Selected Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Why No Fake Reviews', href: '/about' },
    { label: 'Playground Lab', href: '/playground' },
    { label: 'Get Quote', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Pink Rounded Squircle */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl border-2 border-rose-500 bg-rose-50 flex items-center justify-center font-black text-rose-600 text-sm shadow-sm group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all">
            OM
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors uppercase">
              Online Measurer
            </span>
            <span className="text-[11px] font-bold text-rose-500 tracking-wider">
              Web &amp; App Studio
            </span>
          </div>
        </Link>

        {/* Live Availability Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-700">
            Accepting New Client Builds
          </span>
        </div>

        {/* Multipage Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={handleCopyEmail}
            className="btn-fun-outline !py-2 !px-3.5 !text-xs"
            title="Copy email to clipboard"
          >
            {copied ? '✓ Copied!' : '✉ Copy Email'}
          </button>
          <Link href="/contact" className="btn-fun-pink !py-2 !px-4 !text-xs">
            Start Project →
          </Link>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-rose-100 px-6 py-5 space-y-3 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-sm font-extrabold ${
                  pathname === item.href
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-slate-700 hover:text-rose-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                handleCopyEmail();
                setMobileMenuOpen(false);
              }}
              className="btn-fun-outline w-full text-xs justify-center"
            >
              {copied ? 'Copied aviralakshunya20@gmail.com' : 'Copy Email Address'}
            </button>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-fun-pink w-full text-xs justify-center"
            >
              Start Project Inquiry →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
