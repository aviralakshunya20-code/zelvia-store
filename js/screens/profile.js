// js/screens/profile.js - Profile & Lifetime Stats (Chapter 5.12, 8)
import * as state from '../state.js';
import * as router from '../router.js';
import { TITLES } from '../data.js';
import { levelFor } from '../score.js';
import { $, icon, scribble } from '../ui.js';
import { naapu } from '../chars.js';
import { SFX } from '../fx.js';

router.on('s-profile', render);

function render(){
  const s = state.get(), root = $('#s-profile');
  const lvl = levelFor(s.xp);
  const curT = TITLES.find(t => t[0] === lvl) || TITLES[0];
  const nextT = TITLES.find(t => t[0] === lvl + 1);
  const prevXp = curT[2], nextXp = nextT ? nextT[2] : prevXp;
  const pct = Math.min(100, Math.max(0, nextT ? Math.round(((s.xp - prevXp) / (nextXp - prevXp)) * 100) : 100));

  const rounds = s.stats.rounds || 0;
  const avgErr = rounds > 0 ? (s.stats.sumErrPct / rounds).toFixed(1) + ' %' : '0 %';

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="p-back" aria-label="Peeche jao">${icon('back')}</button>
      <h1 class="h1">Profile & Stats</h1>
      <div style="width:48px;"></div>
    </div>
    ${scribble(120)}
    <div class="screen-content">
      <div class="card" style="text-align:center; padding:16px;">
        <div class="bob-wrap" style="margin-bottom:8px;">${naapu('idle')}</div>
        <h2 class="display" style="font-size:32px;">Level ${lvl}: ${curT[1]}</h2>
        <div style="margin-top:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;" class="small">
            <span>Progress</span><span>${s.xp} / ${nextXp} XP</span>
          </div>
          <div class="bar-track"><div class="bar-fill mustard" style="width:${pct}%;"></div></div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <h2 class="h2" style="margin-bottom:12px;">Aapka Record</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:18px;">
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Total rounds:</div><div class="bignum" style="font-size:36px; line-height:36px;">${rounds}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Average farq:</div><div class="bignum" style="font-size:36px; line-height:36px;">${avgErr}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Best round:</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.stats.bestRoundPts || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Perfect (&ge;98):</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.stats.perfects || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Daily streak:</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.daily.streak || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">Best streak:</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.daily.best || 0}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  $('#p-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
}
