// js/calib.js - Calibration math and validity checks (Chapter 6.1, 9.5)
import * as state from './state.js';

export const CARD_MM = 85.6, CARD_SHORT_MM = 53.98;
export const pxPerMmFromCard = longPx => longPx / CARD_MM;
export const isPlausible = p => p >= 2.5 && p <= 14;
export const longAxis = () => innerWidth >= innerHeight ? 'x' : 'y';
export const maxMeasureMm = (pxPerMm, axisPx) => Math.floor((axisPx - 200) / pxPerMm);
export const deviceSig = () =>
  Math.min(screen.width, screen.height) + 'x' + Math.max(screen.width, screen.height) + 'x' + devicePixelRatio;

export function viewOk(){
  const c = state.get().calib;
  if (!c.pxPerMm) return false;
  const zoomed = window.visualViewport && Math.abs(visualViewport.scale - 1) > 0.01;
  const dprMoved = c.dpr && Math.abs(devicePixelRatio - c.dpr) > 0.01;
  const sigBad = c.sig && c.sig !== deviceSig();
  return !zoomed && !dprMoved && !sigBad;
}

// Rough physical scale for uncalibrated screens. CSS defines 96 px per inch, but
// phones and tablets render CSS pixels physically larger than desktop monitors.
export function estimatePxPerMm(){
  const shortSide = Math.min(screen.width, screen.height);
  const touch = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  if (touch && shortSide < 600) return 6.2;   // phones (~160 CSS px per inch)
  if (touch) return 5.0;                      // tablets
  return 3.9;                                 // laptops and desktop monitors
}

/** Saved calibration if valid for this screen, otherwise an estimate. */
export function currentScale(){
  const c = state.get().calib;
  if (c.pxPerMm && viewOk()) return { pxPerMm: c.pxPerMm, calibrated: true };
  return { pxPerMm: estimatePxPerMm(), calibrated: false };
}
