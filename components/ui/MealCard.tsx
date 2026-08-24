'use client';

import { MealEntry } from '@/lib/types';
import { Pencil, Trash2, Copy, ArrowRightLeft } from 'lucide-react';

export function MealCard({
  entry,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
}: {
  entry: MealEntry;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMove?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 animate-fadeIn" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 14, fontWeight: 500 }} className="truncate">{entry.foodName}</span>
          {entry.isEstimated && (
            <span className="badge badge-orange" style={{ fontSize: 9, padding: '1px 6px' }}>Est.</span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {entry.quantity} {entry.unit} · {Math.round(entry.nutrition.calories)} kcal
          <span style={{ marginLeft: 8 }}>P:{Math.round(entry.nutrition.protein)}g</span>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {onEdit && <button onClick={onEdit} className="btn btn-ghost btn-icon btn-sm" aria-label="Edit"><Pencil size={14} /></button>}
        {onDuplicate && <button onClick={onDuplicate} className="btn btn-ghost btn-icon btn-sm" aria-label="Duplicate"><Copy size={14} /></button>}
        {onMove && <button onClick={onMove} className="btn btn-ghost btn-icon btn-sm" aria-label="Move"><ArrowRightLeft size={14} /></button>}
        {onDelete && <button onClick={onDelete} className="btn btn-ghost btn-icon btn-sm" aria-label="Delete" style={{ color: 'var(--red)' }}><Trash2 size={14} /></button>}
      </div>
    </div>
  );
}
