'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Ruler } from 'lucide-react';
import { getMeasurements, addMeasurement, deleteMeasurement, uid } from '@/lib/store';
import type { BodyMeasurement } from '@/lib/types';

const FIELDS: { key: keyof BodyMeasurement; label: string; unit: string }[] = [
  { key: 'weight', label: 'Weight', unit: 'kg' },
  { key: 'waist', label: 'Waist', unit: 'cm' },
  { key: 'chest', label: 'Chest', unit: 'cm' },
  { key: 'hips', label: 'Hips', unit: 'cm' },
  { key: 'leftArm', label: 'Left Arm', unit: 'cm' },
  { key: 'rightArm', label: 'Right Arm', unit: 'cm' },
  { key: 'leftThigh', label: 'Left Thigh', unit: 'cm' },
  { key: 'rightThigh', label: 'Right Thigh', unit: 'cm' },
];

export default function BodyMeasurementsPage() {
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<BodyMeasurement>>({ date: new Date().toISOString().split('T')[0] });

  useEffect(() => { setMeasurements(getMeasurements()); }, []);

  const handleSave = () => {
    const m: BodyMeasurement = { id: uid(), date: form.date || new Date().toISOString().split('T')[0], ...form } as BodyMeasurement;
    addMeasurement(m);
    setMeasurements(getMeasurements());
    setShowForm(false);
    setForm({ date: new Date().toISOString().split('T')[0] });
  };

  const handleDelete = (id: string) => { deleteMeasurement(id); setMeasurements(getMeasurements()); };

  return (
    <main className="container section animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Body Measurements</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm"><Plus size={14} /> Add</button>
      </div>

      {showForm && (
        <div className="card mb-4 animate-scaleIn" style={{ padding: 16 }}>
          <div className="mb-3">
            <label className="label">Date</label>
            <input type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {FIELDS.map(({ key, label, unit }) => (
              <div key={key}>
                <label className="label">{label} ({unit})</label>
                <input type="number" className="input" placeholder={unit} value={(form[key] as number) || ''} onChange={e => setForm({ ...form, [key]: parseFloat(e.target.value) || undefined })} />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="label">Notes</label>
            <input className="input" placeholder="Optional notes" value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn btn-primary flex-1">Save</button>
            <button onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      {measurements.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12" style={{ color: 'var(--gray-400)' }}>
          <Ruler size={40} />
          <p style={{ fontSize: 14 }}>No measurements recorded yet. Start tracking to see your progress.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                {FIELDS.map(f => <th key={f.key}>{f.label}</th>)}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...measurements].reverse().map(m => (
                <tr key={m.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  {FIELDS.map(f => (
                    <td key={f.key}>{(m[f.key] as number) || '—'}</td>
                  ))}
                  <td>
                    <button onClick={() => handleDelete(m.id)} className="btn btn-ghost btn-icon btn-sm" style={{ color: 'var(--red)' }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
