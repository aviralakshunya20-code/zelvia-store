// run-tests.js - Node test runner for Chapter 9.11 tests & system verification
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: k => store.has(k) ? store.get(k) : null,
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k),
    clear: () => store.clear()
  };
}

import { guessPoints, measureBonus, comboMultiplier, scoreRound, starsFor, xpGain, levelFor } from './js/score.js';
import { fitCheck } from './js/fit.js';
import { dayIndex, dailyTarget, dailyTolerance, dailyOk, dayKey, applyDailySuccess } from './js/daily.js';
import { toMm, fromMm, fmtMm } from './js/units.js';
import { pxPerMmFromCard, isPlausible, maxMeasureMm } from './js/calib.js';
import * as state from './js/state.js';
import { t, getLang, setLang } from './js/strings.js';

const T = [
 // [naam, kya chalana hai, expected]
 ['guess 100/100',   () => guessPoints(100, 100), 100],
 ['guess 102/100',   () => guessPoints(102, 100), 100],
 ['guess 103/100',   () => guessPoints(103, 100), 98],
 ['guess 105/100',   () => guessPoints(105, 100), 94],
 ['guess 110/100',   () => guessPoints(110, 100), 83],
 ['guess 115/100',   () => guessPoints(115, 100), 73],
 ['guess 75/100',    () => guessPoints(75, 100), 52],
 ['guess 130/100',   () => guessPoints(130, 100), 42],
 ['guess 60/100',    () => guessPoints(60, 100), 21],
 ['guess 150/100',   () => guessPoints(150, 100), 0],
 ['guess 50/100',    () => guessPoints(50, 100), 0],
 ['guess 23.5/23',   () => guessPoints(23.5, 23), 100],
 ['guess 1/0.76',    () => guessPoints(1, 0.76), 38],
 ['bonus exact',     () => measureBonus(85.6, 85.6), 30],
 ['bonus 86.5',      () => measureBonus(86.5, 85.6), 30],
 ['bonus 89.5',      () => measureBonus(89.5, 85.6), 15],
 ['bonus 95',        () => measureBonus(95, 85.6), 0],
 ['bonus 3% edge',   () => measureBonus(103, 100), 30],
 ['bonus approx 53', () => measureBonus(53, 50.5, 2), 30],
 ['bonus normal 53', () => measureBonus(53, 50.5, 1), 15],
 ['combo 0,1',       () => [comboMultiplier(0), comboMultiplier(1)], [1, 1]],
 ['combo 2,3',       () => [comboMultiplier(2), comboMultiplier(3)], [1.2, 1.5]],
 ['combo 4,9',       () => [comboMultiplier(4), comboMultiplier(9)], [2, 2]],
 ['round A', () => scoreRound(110, 100, null, 0), { guessPts: 83, bonus: 0, streakAfter: 1, mult: 1, total: 83 }],
 ['round B', () => scoreRound(75, 100, null, 1),  { guessPts: 52, bonus: 0, streakAfter: 0, mult: 1, total: 52 }],
 ['round C', () => scoreRound(100, 100, 100, 3),  { guessPts: 100, bonus: 30, streakAfter: 4, mult: 2, total: 260 }],
 ['round D', () => scoreRound(103, 100, null, 2), { guessPts: 98, bonus: 0, streakAfter: 3, mult: 1.5, total: 147 }],
 ['round E', () => scoreRound(110, 100, 104, 1),  { guessPts: 83, bonus: 15, streakAfter: 2, mult: 1.2, total: 118 }],
 ['round F hint', () => scoreRound(110, 100, null, 0, true),  { guessPts: 73, bonus: 0, streakAfter: 1, mult: 1, total: 73 }],
 ['round G hint', () => scoreRound(115, 100, null, 0, true),  { guessPts: 63, bonus: 0, streakAfter: 0, mult: 1, total: 63 }],
 ['stars', () => [199, 200, 449, 450, 699, 700, 770].map(starsFor), [0, 1, 1, 2, 2, 3, 3]],
 ['xp',    () => [0, 612, 1001].map(xpGain), [0, 61, 100]],
 ['level', () => [0, 99, 100, 249, 250, 450, 700, 1000, 1400, 1999, 2000, 99999].map(levelFor), [1, 1, 2, 2, 3, 4, 5, 6, 7, 7, 8, 8]],
 ['fit T1', () => fitCheck([300, 200, 100], [350, 250, 120]), { fits: true, short: [0, 0, 0], spare: [20, 50, 50], itemSorted: [100, 200, 300], spaceSorted: [120, 250, 350] }],
 ['fit T2', () => fitCheck([400, 300, 100], [350, 250, 120]).fits, false],
 ['fit T2 short', () => fitCheck([400, 300, 100], [350, 250, 120]).short, [0, 50, 50]],
 ['fit T3 gap', () => fitCheck([100, 200, 300], [110, 250, 350], 10).fits, true],
 ['fit T3 spare', () => fitCheck([100, 200, 300], [110, 250, 350], 10).spare, [0, 40, 40]],
 ['fit T4', () => fitCheck([100, 100, 100], [99, 500, 500]).short, [1, 0, 0]],
 ['dayIndex 2026-01-01', () => dayIndex(new Date(2026, 0, 1)), 0],
 ['dayIndex 2026-10-07', () => dayIndex(new Date(2026, 9, 7)), 279],
 ['dayIndex 2027-01-01', () => dayIndex(new Date(2027, 0, 1)), 365],
 ['daily target 10-07',  () => dailyTarget(new Date(2026, 9, 7)), 65],
 ['daily target 12-31',  () => dailyTarget(new Date(2026, 11, 31)), 40],
 ['daily tol',  () => [dailyTolerance(20), dailyTolerance(65), dailyTolerance(110)], [3, 3.25, 5.5]],
 ['daily ok',   () => [dailyOk(68, 65), dailyOk(68.5, 65), dailyOk(17, 20)], [true, false, true]],
 ['dayKey',     () => dayKey(new Date(2026, 9, 7)), '2026-10-07'],
 ['streak +1',  () => applyDailySuccess({ lastDay: '2026-10-06', streak: 3, best: 5 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 4, best: 5 }],
 ['streak reset', () => applyDailySuccess({ lastDay: '2026-10-01', streak: 3, best: 3 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 1, best: 3 }],
 ['streak same',  () => applyDailySuccess({ lastDay: '2026-10-07', streak: 4, best: 5 }, '2026-10-07', '2026-10-06'), { lastDay: '2026-10-07', streak: 4, best: 5 }],
 ['fmtMm', () => [0.76, 5, 12.3, 85.6, 99, 100, 297, 2100, 3048, 20120].map(fmtMm),
   ['0.76 mm', '5 mm', '12.3 mm', '85.6 mm', '99 mm', '10 cm', '29.7 cm', '2.1 m', '3.05 m', '20.12 m']],
 ['units', () => [toMm(2.5, 'in'), toMm(3, 'cm'), fromMm(25.4, 'in')].map(x => Math.round(x * 1e6) / 1e6), [63.5, 30, 1]],
 ['calib px', () => Math.round(pxPerMmFromCard(513.6) * 1e6) / 1e6, 6],
 ['plausible', () => [2.4, 2.5, 14, 14.1].map(isPlausible), [false, true, true, false]],
 ['maxMeasure', () => maxMeasureMm(6, 844), 107],

 // Language settings & migration tests (Requirement 4 & 5)
 ['lang default en', () => {
   state.reset();
   return [state.get().settings.lang, getLang(), t('back')];
 }, ['en', 'en', 'Back']],

 ['lang setLang hinglish', () => {
   setLang('hinglish');
   const savedRaw = localStorage.getItem('naapu.v1');
   const parsed = JSON.parse(savedRaw || '{}');
   return [state.get().settings.lang, parsed.settings?.lang, getLang(), t('back')];
 }, ['hinglish', 'hinglish', 'hinglish', 'Peeche']],

 ['lang legacy migration', () => {
   state.reset();
   localStorage.setItem('naapu_lang', 'hinglish');
   state.load();
   const oldKeyExists = localStorage.getItem('naapu_lang');
   const savedRaw = localStorage.getItem('naapu.v1');
   const parsed = JSON.parse(savedRaw || '{}');
   return [state.get().settings.lang, parsed.settings?.lang, oldKeyExists];
 }, ['hinglish', 'hinglish', null]],

 ['lang progress reset clears lang', () => {
   setLang('hinglish');
   state.reset();
   return [state.get().settings.lang, getLang(), t('back'), localStorage.getItem('naapu_lang')];
 }, ['en', 'en', 'Back', null]],
];

let fail = 0;
for (const [n, f, want] of T){
  const got = f(), ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) {
    fail++;
    console.error(`FAIL: ${n} | got: ${JSON.stringify(got)} | want: ${JSON.stringify(want)}`);
  } else {
    console.log(`OK:   ${n}`);
  }
}

if (fail > 0) {
  console.error(`\n${fail} TESTS FAILED!`);
  process.exit(1);
} else {
  console.log('\nSAB PASS (ALL TESTS PASSED)!');
  process.exit(0);
}
