// js/state.js - Persistent state management (Chapter 8, Chapter 9.10)

const KEY = 'naapu.v1';
export const DEFAULT = {
  v: 1,
  calib: { pxPerMm: null, dpr: null, sig: null },
  settings: { sound: true, haptics: true, units: 'cm', lang: 'en' },
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
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.v === 1) {
          merge(mem, parsed);
        }
      }

      // One-time migration of legacy 'naapu_lang' key into state.settings.lang
      const legacyLang = localStorage.getItem('naapu_lang');
      if (legacyLang) {
        if (legacyLang === 'hinglish' || legacyLang === 'en') {
          mem.settings.lang = legacyLang;
        }
        localStorage.removeItem('naapu_lang');
        save();
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
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(KEY, JSON.stringify(mem));
    }
  } catch (e) {
    storageFailed = true;
  }
}

export const get = () => mem || (load(), mem);

export function reset(){
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(KEY);
      localStorage.removeItem('naapu_lang');
    }
  } catch (e) {
    storageFailed = true;
  }
  load();
}

export const isStorageFailed = () => storageFailed;
export const STATE_KEY = KEY;
