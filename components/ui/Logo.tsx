import React from 'react';

export interface LogoProps {
  /** Size in pixels for the icon (desktop default 36, mobile 34, bottom nav 24) */
  size?: number;
  /** Whether to render the 'OnlineMeasurer' wordmark alongside the symbol */
  showWordmark?: boolean;
  /** Color theme variant for the wordmark text */
  variant?: 'auto' | 'light' | 'dark';
  /** Optional additional class names */
  className?: string;
  /** Accessible label */
  ariaLabel?: string;
}

/**
 * LogoMark: Pure SVG symbol with 22.9% rounded square, premium #237B5B -> #54BE8A gradient,
 * calibrated progress ring with deliberate gap, integrated leaf, and subtle scan corner cues.
 */
export function LogoMark({
  size = 36,
  className = '',
  ariaLabel = 'OnlineMeasurer icon',
}: {
  size?: number;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{ flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}
    >
      <title>{ariaLabel}</title>
      <defs>
        <linearGradient id="om-mark-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#237B5B" />
          <stop offset="100%" stopColor="#54BE8A" />
        </linearGradient>
        <linearGradient id="om-mark-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EAF8F1" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* Rounded-Square App Icon Background (22.9% corner radius) */}
      <rect width="48" height="48" rx="11" fill="url(#om-mark-bg)" />

      {/* Subtle Scan / Measurement Reticle Marks (Calibrated Cues) */}
      <path
        d="M 10.5 15.5 L 10.5 10.5 L 15.5 10.5"
        stroke="#FFFFFF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
      />
      <path
        d="M 37.5 32.5 L 37.5 37.5 L 32.5 37.5"
        stroke="#FFFFFF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
      />

      {/* Calibration Measurement Ticks */}
      <line
        x1="12"
        y1="24"
        x2="14.5"
        y2="24"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <line
        x1="24"
        y1="36"
        x2="24"
        y2="33.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />

      {/* Circular Nutrition / Progress Ring with Deliberate Top-Right Gap */}
      <path
        d="M 28.5 13.5 A 11.5 11.5 0 1 0 35.5 22.5"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Natural Leaf Shape Integrated at Upper-Right Arc Endpoint */}
      <path
        d="M 28.5 14 C 28.5 9.2, 35.5 9.2, 37.5 10.5 C 37.5 12.5, 37 18.5, 32.5 18.5 C 29.8 18.5, 28.5 16.2, 28.5 14 Z"
        fill="url(#om-mark-leaf)"
      />

      {/* Subtle Leaf Central Vein */}
      <path
        d="M 30 15.2 C 32 14.2, 34.5 12.8, 36.5 11.5"
        stroke="#237B5B"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

/**
 * Wordmark: Clean geometric sans-serif aligning "Online" (#18251F or white) and "Measurer" (#3CA978)
 */
export function WordmarkText({
  variant = 'auto',
  fontSize = 18,
}: {
  variant?: 'auto' | 'light' | 'dark';
  fontSize?: number;
}) {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const onlineColor = isDark
    ? '#FFFFFF'
    : isLight
    ? '#18251F'
    : 'var(--text, #18251F)';

  return (
    <span
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      <span style={{ color: onlineColor, transition: 'color 0.2s ease' }}>Online</span>
      <span style={{ color: '#3CA978' }}>Measurer</span>
    </span>
  );
}

/**
 * Complete OnlineMeasurer Logo (Icon + Wordmark aligned on one baseline)
 */
export function Logo({
  size = 36,
  showWordmark = true,
  variant = 'auto',
  className = '',
  ariaLabel = 'OnlineMeasurer Logo',
}: LogoProps) {
  // Compute text font-size proportional to icon size
  const textFontSize = Math.max(14, Math.round(size * 0.5));

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.max(6, Math.round(size * 0.25))}px`,
        verticalAlign: 'middle',
        userSelect: 'none',
      }}
      aria-label={ariaLabel}
    >
      <LogoMark size={size} ariaLabel={showWordmark ? '' : ariaLabel} />
      {showWordmark && <WordmarkText variant={variant} fontSize={textFontSize} />}
    </span>
  );
}

export default Logo;
