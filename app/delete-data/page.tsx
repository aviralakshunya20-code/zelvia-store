'use client';

import { useState } from 'react';
import { deleteAllData } from '@/lib/store';
import { AlertTriangle } from 'lucide-react';

export default function DeleteDataPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    if (!confirmed) return;
    deleteAllData();
    setDeleted(true);
  };

  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Delete All Data</h1>
      {deleted ? (
        <div className="card" style={{ padding: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--green-700)', marginBottom: 8 }}>✓ All data deleted</p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Your food diary, profile, measurements, and recipes have been permanently removed from this device.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 20 }}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} style={{ color: 'var(--red)' }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--red)', margin: 0 }}>This action cannot be undone</p>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
            Deleting will permanently remove all your food logs, body measurements, saved recipes, custom foods, favourites, and profile settings from this browser.
          </p>
          <label className="flex items-center gap-2 mb-4 cursor-pointer" style={{ fontSize: 14 }}>
            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--red)' }} />
            I understand this is permanent and want to delete everything
          </label>
          <button onClick={handleDelete} className="btn btn-danger w-full" disabled={!confirmed}>Delete All My Data</button>
        </div>
      )}
    </main>
  );
}
