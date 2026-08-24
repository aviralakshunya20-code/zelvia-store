export function AdSlot({ label = 'Advertisement', className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`ad-slot ${className}`} aria-label="Advertisement placeholder">
      <span>{label}</span>
    </div>
  );
}
