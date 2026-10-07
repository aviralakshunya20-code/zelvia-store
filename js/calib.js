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
