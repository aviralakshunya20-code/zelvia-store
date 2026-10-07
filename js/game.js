// js/game.js - Game set and round state machine (Chapter 6.3, 9.7)
import { ITEMS } from './data.js';
import { scoreRound, starsFor, xpGain, levelFor } from './score.js';
import * as state from './state.js';

let run = null;

const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function startSet(worldId){
  run = {
    worldId,
    items: shuffle(ITEMS.filter(i => i.world === worldId)),
    idx: 0,
    streak: 0,
    total: 0,
    rounds: [],
    hintUsed: false,
    currentGuessMm: 100
  };
  return run.items[0];
}

export const getRun = () => run;
export const current = () => run ? run.items[run.idx] : null;
export const info = () => run ? { idx: run.idx, of: run.items.length, streak: run.streak, total: run.total } : null;
export const isHintUsed = () => run ? run.hintUsed : false;

export function useHint(){
  if (!run) return '';
  run.hintUsed = true;
  return current().hint;
}

export function setPendingGuess(guessMm){
  if (run) run.currentGuessMm = guessMm;
}

export const getPendingGuess = () => run ? run.currentGuessMm : 100;

export function submit(guessMm, measuredMm = null){
  const it = current();
  const r = scoreRound(guessMm, it.mm, measuredMm, run.streak, run.hintUsed, it.approx);
  run.streak = r.streakAfter;
  run.total += r.total;
  const roundRecord = {
    id: it.id,
    name: it.name,
    guessMm,
    trueMm: it.mm,
    measuredMm,
    ...r,
    errPct: Math.abs(guessMm - it.mm) / it.mm * 100
  };
  run.rounds.push(roundRecord);
  run.hintUsed = false;
  return roundRecord;
}

export function lastRound(){
  return run && run.rounds.length > 0 ? run.rounds[run.rounds.length - 1] : null;
}

export function next(){
  if (!run) return false;
  run.idx++;
  return run.idx < run.items.length; // false = set khatam
}

export function finish(){
  if (!run) return null;
  const s = state.get();
  const oldLevel = levelFor(s.xp);
  const stars = starsFor(run.total);
  const xp = xpGain(run.total);
  const w = s.worlds[run.worldId] || (s.worlds[run.worldId] = { best: 0, stars: 0, plays: 0 });

  w.best = Math.max(w.best, run.total);
  w.stars = Math.max(w.stars, stars);
  w.plays++;
  s.xp += xp;

  let bestRound = null;
  for (const r of run.rounds){
    s.stats.rounds++;
    s.stats.sumErrPct += r.errPct;
    s.stats.bestRoundPts = Math.max(s.stats.bestRoundPts, r.total);
    if (r.guessPts >= 98) s.stats.perfects++;

    if (!bestRound || r.total > bestRound.total) {
      bestRound = r;
    }
  }
  state.save();

  return {
    total: run.total,
    stars,
    xp,
    level: levelFor(s.xp),
    levelUp: levelFor(s.xp) > oldLevel,
    bestRoundItemName: bestRound ? bestRound.name : '',
    worldId: run.worldId
  };
}

export function worldUnlocked(idx, worlds){ // idx 0..7
  if (idx === 0) return true;
  const prev = worlds['w' + idx];
  return !!prev && prev.stars >= 1;
}

export function abandonSet(){
  run = null;
}
