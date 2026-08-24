'use client';

import Link from 'next/link';
import { Leaf, Settings, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTheme, setTheme } from '@/lib/store';

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const t = getTheme();
    setDark(t === 'dark');
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    setDark(!dark);
  };

  return (
    <header
      className="sticky top-0 z-30"
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <div className="flex items-center justify-between px-4 py-3" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Link href="/" className="flex items-center gap-2 no-underline" style={{ color: 'var(--text)' }}>
          <span className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: 'var(--green-700)', color: 'white' }}>
            <Leaf size={18} />
          </span>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
            Online<span style={{ color: 'var(--green-600)' }}>Measurer</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <button onClick={toggle} className="btn btn-ghost btn-icon btn-sm" aria-label="Toggle theme" title={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/settings" className="btn btn-ghost btn-icon btn-sm" aria-label="Settings">
            <Settings size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
