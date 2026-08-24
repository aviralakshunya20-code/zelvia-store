export function MacroBar({ label, current, target, color, unit = 'g' }: { label: string; current: number; target: number; color: string; unit?: string }) {
  const pct = Math.min((current / Math.max(target, 1)) * 100, 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {Math.round(current)}/{target}{unit}
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--ring-bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%', width: `${pct}%`, background: color,
            borderRadius: 3, transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}
