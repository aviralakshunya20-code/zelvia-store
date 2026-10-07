// js/state.js - Persistent state management (Chapter 8)

const KEY = 'naapu.v1';
const DEFAULT = {
  v: 1,
  calib: { pxPerMm: null, dpr: null, sig: null },
  settings: { sound: true, haptics: true, units: 'cm' },
  xp: 0,
  worlds: {},
  daily: { lastDay: null, streak: 0, best: 0, done: {} },
  stats: { rounds: 0, sumErrPct: 0, bestRoundPts: 0, perfects: 0 },
  seenIntro: false
};

let mem = null;
let storageFailed = false;

function merge(base, extra){
  for (const k in extra){
    if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k]) && base[k] && typeof base[k] === 'object')
      merge(base[k], extra[k]);
    else base[k] = extra[k];
  }
  return base;
}

export function load(){
  mem = structuredClone(DEFAULT);
  storageFailed = false;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === 1) {
        merge(mem, parsed);
      }
    }
  } catch (e) {
    storageFailed = true;
    /* private mode ya kharab JSON: default se chalo */
  }
  return mem;
}

export function save(){
  try {
    localStorage.setItem(KEY, JSON.stringify(mem));
  } catch (e) {
    storageFailed = true;
  }
}

export const get = () => mem;

export function reset(){
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    storageFailed = true;
  }
  load();
}

export const isStorageFailed = () => storageFailed;
