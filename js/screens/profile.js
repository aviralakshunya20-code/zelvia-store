// js/screens/profile.js - Profile & Lifetime Stats (Chapter 5.12, 8)
import * as state from '../state.js';
import * as router from '../router.js';
import { TITLES, getTitleName } from '../data.js';
import { levelFor } from '../score.js';
import { $, icon, scribble } from '../ui.js';
import { naapu } from '../chars.js';
import { SFX } from '../fx.js';
import { t } from '../strings.js';

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
      <button class="btn alt" id="p-back" aria-label="${t('back')}">${icon('back')}</button>
      <h2 class="h1">${t('profileTitle')}</h2>
      <div style="width:48px;"></div>
    </div>
    ${scribble(120)}
    <div class="screen-content">
      <div class="card" style="text-align:center; padding:16px;">
        <div class="bob-wrap" style="margin-bottom:8px;">${naapu('idle')}</div>
        <h3 class="display" style="font-size:32px;">${t('level')} ${lvl}: ${getTitleName(lvl)}</h3>
        <div style="margin-top:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;" class="small">
            <span>${t('profileProgress')}</span><span>${s.xp} / ${nextXp} ${t('xp')}</span>
          </div>
          <div class="bar-track"><div class="bar-fill mustard" style="width:${pct}%;"></div></div>
        </div>
      </div>
      <div class="card" style="margin-top:12px;">
        <h3 class="h2" style="margin-bottom:12px;">${t('profileRecord')}</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:18px;">
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profileTotalRounds')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${rounds}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profileAvgDiff')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${avgErr}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profileBestRound')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.stats.bestRoundPts || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profilePerfects')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.stats.perfects || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profileDailyStreak')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.daily.streak || 0}</div>
          </div>
          <div class="card" style="padding:10px; text-align:center; background:var(--paper2);">
            <div class="small">${t('profileBestStreak')}</div><div class="bignum" style="font-size:36px; line-height:36px;">${s.daily.best || 0}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  $('#p-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
}
