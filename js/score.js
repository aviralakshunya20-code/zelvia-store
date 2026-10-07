// js/score.js - Pure scoring functions (Chapter 6.5, 6.6, 9.2)
import { TITLES } from './data.js';

export function guessPoints(guessMm, trueMm){
  const err = Math.abs(guessMm - trueMm) / trueMm;
  if (err <= 0.02) return 100;
  if (err >= 0.5)  return 0;
  return Math.round(100 * (1 - (err - 0.02) / 0.48));
}

export function measureBonus(measuredMm, trueMm, tolMul = 1){
  const err = Math.abs(measuredMm - trueMm) / trueMm;
  if (err <= 0.03 * tolMul) return 30;
  if (err <= 0.06 * tolMul) return 15;
  return 0;
}

export function comboMultiplier(streak){
  if (streak >= 4) return 2.0;
  if (streak === 3) return 1.5;
  if (streak === 2) return 1.2;
  return 1.0;
}

export function scoreRound(guessMm, trueMm, measuredMm, streakBefore, hintUsed = false, approx = false){
  let g = guessPoints(guessMm, trueMm);
  if (hintUsed) g = Math.max(0, g - 10);
  const bonus = measuredMm == null ? 0 : measureBonus(measuredMm, trueMm, approx ? 2 : 1);
  const streakAfter = g >= 70 ? streakBefore + 1 : 0;
  const mult = comboMultiplier(streakAfter);
  return { guessPts: g, bonus, streakAfter, mult, total: Math.round((g + bonus) * mult) };
}

export const starsFor = total => total >= 700 ? 3 : total >= 450 ? 2 : total >= 200 ? 1 : 0;
export const xpGain   = total => Math.round(total / 10);

export function levelFor(xp){
  let lv = 1;
  for (const [l, , need] of TITLES) if (xp >= need) lv = l;
  return lv;
}
