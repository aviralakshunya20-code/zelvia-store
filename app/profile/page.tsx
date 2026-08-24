'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Shield, Trash2, FileText, Download, Info } from 'lucide-react';
import { getProfile, defaultProfile, exportAllData } from '@/lib/store';
import type { UserProfile } from '@/lib/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());

  useEffect(() => { setProfile(getProfile() || defaultProfile()); }, []);

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'onlinemeasurer-data.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const links = [
    { href: '/settings', label: 'Settings', icon: User, desc: 'Goals, targets, preferences' },
    { href: '/body-measurements', label: 'Body Measurements', icon: Info, desc: 'Weight, waist, chest tracking' },
    { href: '/recipes', label: 'My Recipes', icon: FileText, desc: 'Saved recipes with nutrition' },
    { href: '/privacy', label: 'Privacy', icon: Shield, desc: 'Data & privacy controls' },
    { href: '/delete-data', label: 'Delete Data', icon: Trash2, desc: 'Erase all your data' },
  ];

  const publicLinks = [
    { href: '/about', label: 'About OnlineMeasurer' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <main className="container section animate-fadeIn">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center rounded-full" style={{ width: 56, height: 56, background: 'var(--green-200)', color: 'var(--green-800)' }}>
          <User size={24} />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{profile.name || 'Guest User'}</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            {profile.onboardingComplete ? `${profile.goal.replace(/_/g, ' ')} · ${profile.dailyCalorieTarget} kcal/day` : 'Complete your profile in Settings'}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card" style={{ padding: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green-700)' }}>{profile.weightKg}</p>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>kg</p>
        </div>
        <div className="card" style={{ padding: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue)' }}>{profile.heightCm}</p>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>cm</p>
        </div>
        <div className="card" style={{ padding: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--orange)' }}>{profile.dailyCalorieTarget}</p>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>kcal/day</p>
        </div>
      </div>

      {/* Menu Links */}
      <div className="card mb-4" style={{ overflow: 'hidden' }}>
        {links.map(({ href, label, icon: Icon, desc }) => (
          <Link key={href} href={href} className="flex items-center gap-3 px-4 py-3 no-underline" style={{ borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>
            <Icon size={18} style={{ color: 'var(--green-600)' }} />
            <div className="flex-1">
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{label}</p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Export */}
      <button onClick={handleExport} className="btn btn-secondary w-full mb-4">
        <Download size={16} /> Export All Data (JSON)
      </button>

      {/* Public Links */}
      <div className="card" style={{ padding: '12px 16px' }}>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {publicLinks.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{l.label}</Link>
          ))}
        </div>
      </div>
    </main>
  );
}
