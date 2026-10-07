// js/units.js - Units conversion and formatting (Chapter 9.1)
export const UNITS = { mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8 };
export const toMm   = (v, u) => v * UNITS[u];
export const fromMm = (mm, u) => mm / UNITS[u];

const trim = (n, d) => String(Math.round(n * 10 ** d) / 10 ** d);
export function fmtMm(mm){
  if (mm < 10)   return trim(mm, 2) + ' mm';
  if (mm < 100)  return trim(mm, 1) + ' mm';
  if (mm < 1000) return trim(mm / 10, 1) + ' cm';
  return trim(mm / 1000, 2) + ' m';
}
