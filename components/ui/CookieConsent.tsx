'use client';

import { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent } from '@/lib/store';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const accept = () => { setCookieConsent(true); setShow(false); };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slideUp lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm">
      <div className="card" style={{ padding: '16px 20px', boxShadow: 'var(--shadow-lg)' }}>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6 }}>
          We use cookies to save your preferences and food diary locally on your device. No personal data is sent to servers.
        </p>
        <div className="flex gap-2">
          <button onClick={accept} className="btn btn-primary btn-sm flex-1">Accept</button>
          <button onClick={() => setShow(false)} className="btn btn-ghost btn-sm">Dismiss</button>
        </div>
      </div>
    </div>
  );
}
