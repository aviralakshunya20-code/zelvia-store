'use client';

import React, { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('om-theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const current = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
      setTheme(current);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('om-theme', next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        id="theme-switcher-toggle"
        aria-label="Toggle laboratory display theme"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          fontSize: '0.8rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid var(--border-medium)',
          borderRadius: '9999px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <span>🌙</span>
        <span>Lab Dark Mode</span>
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-switcher-toggle"
      aria-label={`Toggle theme. Current theme is ${isDark ? 'Lab Dark Mode' : 'Clean Light Mode'}`}
      title={isDark ? 'Switch to Clean Light Mode' : 'Switch to Lab Dark Mode'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: isDark ? '#FFFFFF' : '#0F172A',
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.9)',
        border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.35)'}`,
        borderRadius: '9999px',
        cursor: 'pointer',
        boxShadow: isDark
          ? '0 2px 10px rgba(0, 0, 0, 0.3)'
          : '0 2px 8px rgba(15, 23, 42, 0.08)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? 'Lab Dark Mode' : 'Clean Light Mode'}</span>
      <span
        style={{
          fontSize: '0.65rem',
          padding: '2px 7px',
          backgroundColor: isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(2, 132, 199, 0.12)',
          color: isDark ? '#38bdf8' : '#0284c7',
          borderRadius: '9999px',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}
      >
        {isDark ? 'ACTIVE' : 'ACTIVE'}
      </span>
    </button>
  );
}
