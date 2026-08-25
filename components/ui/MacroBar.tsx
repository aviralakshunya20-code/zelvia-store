'use client';

import { useState } from 'react';
import { HelpCircle, Check, AlertCircle, Info } from 'lucide-react';

export interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  color?: string;
  explanation?: string;
}

const MACRO_EXPLANATIONS: Record<string, string> = {
  protein: 'Protein builds and repairs muscles, supports immune function, and helps keep you feeling satisfied between meals.',
  carbs: 'Carbohydrates are your body’s primary energy source, fueling daily physical activities and brain function.',
  fat: 'Healthy dietary fats support hormone production, brain health, and the absorption of essential fat-soluble vitamins (A, D, E, K).',
  fibre: 'Dietary fibre supports healthy digestion, steady blood sugar levels, and long-term gut microbiome health.',
};

export function MacroBar({
  label,
  current,
  target,
  unit = 'g',
  color,
  explanation,
}: MacroBarProps) {
  const [showInfo, setShowInfo] = useState(false);

  const safeCurrent = Math.max(0, Math.round(current * 10) / 10);
  const safeTarget = Math.max(1, Math.round(target));
  const diff = safeCurrent - safeTarget;
  const isOver = diff > 0;
  const pct = Math.min((safeCurrent / safeTarget) * 100, 100);

  // Status calculation (not relying only on color)
  let statusText = 'On track';
  let statusBadgeColor = 'var(--green-100)';
  let statusTextColor = 'var(--green-800)';
  let barColor = color || 'var(--green-600)';

  if (isOver) {
    statusText = `${Math.round(diff)}${unit} over`;
    statusBadgeColor = '#F1F5F9'; // neutral slate
    statusTextColor = '#475569';
    barColor = color || '#3B82F6';
  } else if (pct >= 85) {
    statusText = 'Near target';
    statusBadgeColor = '#FEF3C7'; // calm amber
    statusTextColor = '#92400E';
  } else {
    statusText = `${Math.round(safeTarget - safeCurrent)}${unit} left`;
    statusBadgeColor = 'var(--gray-100)';
    statusTextColor = 'var(--text-secondary)';
  }

  const defaultExplanation =
    explanation ||
    MACRO_EXPLANATIONS[label.toLowerCase()] ||
    `${label} is an essential daily macronutrient.`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center gap-1.5 text-left border-none bg-transparent p-0 cursor-pointer"
          style={{ font: 'inherit', color: 'var(--text)' }}
          aria-label={`Learn about ${label}`}
        >
          <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
          <HelpCircle size={13} style={{ color: 'var(--text-secondary)', opacity: 0.7 }} />
        </button>

        <div className="flex items-center gap-2">
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>
            <strong>{Math.round(safeCurrent)}</strong> / {safeTarget}
            {unit}
          </span>
          <span
            className="badge"
            style={{
              fontSize: 10,
              padding: '1px 6px',
              background: statusBadgeColor,
              color: statusTextColor,
              fontWeight: 600,
            }}
          >
            {statusText}
          </span>
        </div>
      </div>

      {/* Progress Bar with accessible ARIA attributes */}
      <div
        style={{
          height: 6,
          background: 'var(--border)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={safeCurrent}
        aria-valuemin={0}
        aria-valuemax={safeTarget}
        aria-label={`${label} progress`}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: barColor,
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Concise non-medical explanation popup on tap */}
      {showInfo && (
        <div
          className="animate-fadeIn"
          style={{
            marginTop: 4,
            padding: '8px 10px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            fontSize: 11.5,
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
          }}
        >
          <Info size={14} style={{ color: 'var(--green-700)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ margin: 0 }}>{defaultExplanation}</p>
            <span style={{ fontSize: 10, color: 'var(--gray-400)', display: 'block', marginTop: 2 }}>
              General dietary information · Not medical advice
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
