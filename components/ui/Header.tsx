'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Settings } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link href="/" className="no-underline flex items-center" aria-label="OnlineMeasurer Home" style={{ display: 'inline-flex', alignItems: 'center' }}>
        {/* Desktop: 36px icon + wordmark, Mobile: 34px icon + wordmark */}
        <span className="hidden md:inline-flex">
          <Logo size={36} variant={dark ? 'dark' : 'light'} />
        </span>
        <span className="inline-flex md:hidden">
          <Logo size={34} variant={dark ? 'dark' : 'light'} />
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button
          onClick={toggle}
          className="btn btn-ghost btn-icon btn-sm"
          aria-label="Toggle theme"
          style={{ padding: 8 }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link href="/settings" className="btn btn-ghost btn-icon btn-sm no-underline" style={{ padding: 8 }}>
          <Settings size={18} />
        </Link>
      </div>
    </header>
  );
}
