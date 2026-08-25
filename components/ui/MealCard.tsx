'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MealEntry, PortionUnit } from '@/lib/types';
import {
  Pencil,
  Trash2,
  Copy,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Tag,
  MessageSquareWarning,
} from 'lucide-react';

export function MealCard({
  entry,
  onEdit,
  onDelete,
  onDuplicate,
  onMove,
  onReportIncorrect,
}: {
  entry: MealEntry;
  onEdit?: (entry: MealEntry) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMove?: () => void;
  onReportIncorrect?: () => void;
}) {
  const [showFeedback, setShowFeedback] = useState(false);

  const getConfidenceBadge = () => {
    if (entry.source === 'package_label') {
      return { label: 'High confidence', color: 'badge-green', icon: CheckCircle2 };
    }
    switch (entry.confidenceLevel) {
      case 'high':
        return { label: 'High confidence', color: 'badge-green', icon: CheckCircle2 };
      case 'medium':
        return { label: 'Needs review', color: 'badge-orange', icon: AlertCircle };
      case 'low':
      default:
        return { label: 'Could not verify', color: 'badge-red', icon: HelpCircle };
    }
  };

  const badge = getConfidenceBadge();
  const Icon = badge.icon;

  return (
    <div
      className="card animate-fadeIn"
      style={{
        padding: '10px 12px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        borderRadius: 8,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-1.5 mb-1">
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              {entry.foodName}
            </span>
            {entry.brand && (
              <span
                className="badge"
                style={{ fontSize: 10, background: 'var(--gray-100)', color: 'var(--text-secondary)' }}
              >
                {entry.brand}
              </span>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-1.5 mb-1.5">
            {/* Source Badge */}
            <span
              className="badge"
              style={{
                fontSize: 10,
                background: entry.source === 'package_label' ? 'var(--green-200)' : '#FEF3C7',
                color: entry.source === 'package_label' ? 'var(--green-900)' : '#92400E',
                fontWeight: 600,
                padding: '1px 6px',
              }}
            >
              {entry.source === 'package_label' ? 'Package label' : 'AI estimate'}
            </span>

            {/* Calibrated Confidence Badge */}
            <span
              className={`badge ${badge.color}`}
              style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px' }}
            >
              <Icon size={10} style={{ marginRight: 3 }} /> {badge.label}
            </span>
          </div>

          {/* Nutrition Info Line */}
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <span>
              <strong>{entry.quantity}</strong> {entry.unit}
            </span>
            <span>•</span>
            <span style={{ color: 'var(--green-800)', fontWeight: 700 }}>
              {Math.round(entry.nutrition.calories)} kcal
            </span>
            <span>•</span>
            <span>P: {Math.round(entry.nutrition.protein * 10) / 10}g</span>
            <span>C: {Math.round(entry.nutrition.carbs * 10) / 10}g</span>
            <span>F: {Math.round(entry.nutrition.fat * 10) / 10}g</span>
            {entry.nutrition.fibre > 0 && <span>Fib: {Math.round(entry.nutrition.fibre * 10) / 10}g</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-0.5" style={{ flexShrink: 0 }}>
          {onEdit && (
            <button
              onClick={() => onEdit(entry)}
              className="btn btn-ghost btn-icon btn-xs"
              aria-label={`Edit ${entry.foodName}`}
              title="Edit food"
              style={{ padding: 6 }}
            >
              <Pencil size={13} />
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={onDuplicate}
              className="btn btn-ghost btn-icon btn-xs"
              aria-label={`Duplicate ${entry.foodName}`}
              title="Duplicate"
              style={{ padding: 6 }}
            >
              <Copy size={13} />
            </button>
          )}
          {onMove && (
            <button
              onClick={onMove}
              className="btn btn-ghost btn-icon btn-xs"
              aria-label={`Move ${entry.foodName}`}
              title="Move meal"
              style={{ padding: 6 }}
            >
              <ArrowRightLeft size={13} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="btn btn-ghost btn-icon btn-xs"
              aria-label={`Delete ${entry.foodName}`}
              title="Delete"
              style={{ color: 'var(--red)', padding: 6 }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Quick feedback action */}
      <div className="flex items-center justify-between mt-2 pt-1.5" style={{ borderTop: '1px solid var(--border)' }}>
        <button
          type="button"
          onClick={() => setShowFeedback(!showFeedback)}
          className="btn btn-ghost btn-xs"
          style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '2px 4px' }}
        >
          <MessageSquareWarning size={11} style={{ marginRight: 4 }} />
          This result is incorrect?
        </button>

        {entry.notes && (
          <span style={{ fontSize: 10.5, color: 'var(--gray-400)', fontStyle: 'italic' }}>
            {entry.notes}
          </span>
        )}
      </div>

      {showFeedback && (
        <div
          className="animate-fadeIn mt-2 p-2 rounded"
          style={{ background: 'var(--gray-100)', fontSize: 11.5, lineHeight: 1.4 }}
        >
          <p style={{ margin: '0 0 6px', color: 'var(--text)' }}>
            If the AI estimate or detected portion is not accurate for your dish, you can edit it directly or search the food database:
          </p>
          <div className="flex gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  setShowFeedback(false);
                  onEdit(entry);
                }}
                className="btn btn-primary btn-xs"
                style={{ fontSize: 11, padding: '3px 8px' }}
              >
                <Pencil size={11} /> Edit Macros Now
              </button>
            )}
            <Link
              href={`/food-search?meal=${entry.mealType}&q=${encodeURIComponent(entry.foodName)}`}
              className="btn btn-outline btn-xs no-underline"
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              Search Database
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
