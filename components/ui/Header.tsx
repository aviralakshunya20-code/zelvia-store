'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Settings } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/diary', label: 'Diary' },
  { href: '/scan', label: 'Scan' },
  { href: '/progress', label: 'Progress' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [dark, setDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('om-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('om-theme', next ? 'dark' : 'light');
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <Link href="/" className="no-underline" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16,
        }}>⚡</div>
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          Online<span style={{ color: 'var(--green-600)' }}>Measurer</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={toggle} className="btn btn-ghost btn-icon btn-sm" aria-label="Toggle theme" style={{ padding: 8 }}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link href="/settings" className="btn btn-ghost btn-icon btn-sm no-underline" style={{ padding: 8 }}>
          <Settings size={18} />
        </Link>
      </div>
    </header>
  );
}
