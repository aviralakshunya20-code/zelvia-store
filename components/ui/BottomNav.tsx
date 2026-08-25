'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, TrendingUp, User } from 'lucide-react';
import { LogoMark } from '@/components/ui/Logo';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/scan', label: 'Scan', isScan: true },
    { href: '/diary', label: 'Diary', icon: BookOpen },
    { href: '/progress', label: 'Progress', icon: TrendingUp },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center justify-around" style={{ maxWidth: 480, margin: '0 auto' }}>
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 py-2 px-3 transition-colors"
              style={{
                color: isActive ? 'var(--primary)' : 'var(--gray-400)',
                minWidth: 56,
                position: item.isScan ? 'relative' : undefined,
              }}
              aria-label={item.label}
            >
              {item.isScan ? (
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 48,
                    height: 48,
                    marginTop: -16,
                    boxShadow: '0 4px 14px rgba(35,123,91,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LogoMark size={32} ariaLabel="Scan Food" />
                </span>
              ) : Icon ? (
                <Icon size={20} />
              ) : null}
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
