'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanLine, BookOpen, TrendingUp, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/scan', label: 'Scan', icon: ScanLine },
  { href: '/diary', label: 'Diary', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/profile', label: 'Profile', icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-center justify-around" style={{ maxWidth: 480, margin: '0 auto' }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          const isScan = href === '/scan';
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 py-2 px-3 transition-colors"
              style={{
                color: isActive ? 'var(--primary)' : 'var(--gray-400)',
                minWidth: 56,
                position: isScan ? 'relative' : undefined,
              }}
              aria-label={label}
            >
              {isScan ? (
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 48, height: 48,
                    background: 'var(--green-700)',
                    color: 'white',
                    marginTop: -16,
                    boxShadow: '0 4px 12px rgba(64,145,108,0.4)',
                  }}
                >
                  <Icon size={22} />
                </span>
              ) : (
                <Icon size={20} />
              )}
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
