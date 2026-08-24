'use client';

export function CalorieRing({ consumed, target, size = 160 }: { consumed: number; target: number; size?: number }) {
  const strokeWidth = size > 120 ? 12 : 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(consumed / Math.max(target, 1), 1.5);
  const offset = circumference - pct * circumference;
  const remaining = Math.max(0, target - consumed);
  const isOver = consumed > target;

  const color = isOver ? 'var(--orange)' : 'var(--green-600)';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--ring-bg)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center" style={{ marginTop: size * 0.28 }}>
        <span className="calorie-ring-text" style={{ fontSize: size > 120 ? 28 : 20, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
          {Math.round(consumed)}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
          of {target} kcal
        </span>
        <span style={{ fontSize: 12, color: isOver ? 'var(--orange)' : 'var(--green-600)', fontWeight: 600, marginTop: 2 }}>
          {isOver ? `${Math.round(consumed - target)} over` : `${Math.round(remaining)} left`}
        </span>
      </div>
    </div>
  );
}
