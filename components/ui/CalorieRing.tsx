'use client';

export interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: number;
  hasEstimatedMeals?: boolean;
}

export function CalorieRing({
  consumed,
  target,
  size = 150,
  hasEstimatedMeals = false,
}: CalorieRingProps) {
  const strokeWidth = size > 120 ? 12 : 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeTarget = Math.max(1, Math.round(target));
  const safeConsumed = Math.max(0, Math.round(consumed));
  const isOver = safeConsumed > safeTarget;
  const diff = Math.abs(safeConsumed - safeTarget);

  const pct = Math.min(safeConsumed / safeTarget, 1.25);
  const offset = circumference - pct * circumference;

  // Calm color palette: green for on-track, calm soft amber/teal when over target (never punishment red)
  const ringColor = isOver ? '#059669' : '#10B981';

  return (
    <div className="flex flex-col items-center gap-1 relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
        role="img"
        aria-label={`Calorie intake: ${safeConsumed} of ${safeTarget} kcal. ${isOver ? `${diff} kcal above target` : `${diff} kcal remaining`}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ pointerEvents: 'none' }}
      >
        <span
          style={{
            fontSize: size > 130 ? 26 : 20,
            fontWeight: 800,
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {hasEstimatedMeals ? `~${safeConsumed}` : safeConsumed}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
          of {safeTarget} kcal
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isOver ? 'var(--text-secondary)' : 'var(--green-700)',
            marginTop: 2,
          }}
        >
          {isOver ? `${diff} kcal above` : `${diff} kcal left`}
        </span>
      </div>
    </div>
  );
}
