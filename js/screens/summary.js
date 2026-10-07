// js/screens/summary.js - Set Summary Screen (Chapter 5.9, 6.6)
import * as game from '../game.js';
import * as state from '../state.js';
import * as router from '../router.js';
import { TITLES, WORLDS } from '../data.js';
import { $, $$, icon, scribble } from '../ui.js';
import { naapu } from '../chars.js';
import { SFX, haptic, confetti } from '../fx.js';
import { renderAd } from '../ads.js';
import { trackSetFinished } from '../analytics.js';

router.on('s-summary', render);

function render(){
  const result = game.finish();
  if (!result) return router.go('#home');

  // Track analytics for completed set
  trackSetFinished(result.worldId, result.total, result.stars);

  const s = state.get(), root = $('#s-summary');
  const charExpr = result.stars === 3 ? 'wow' : (result.stars === 0 ? 'sad' : 'happy');

  const currentTitle = TITLES.find(t => t[0] === result.level) || TITLES[0];
  const nextTitle = TITLES.find(t => t[0] === result.level + 1);
  const prevXpNeeded = currentTitle[2];
  const nextXpNeeded = nextTitle ? nextTitle[2] : prevXpNeeded;
  const levelProgress = Math.min(100, Math.max(0, nextTitle ? Math.round(((s.xp - prevXpNeeded) / (nextXpNeeded - prevXpNeeded)) * 100) : 100));

  const curWIdx = parseInt(result.worldId.replace('w', ''), 10) - 1;
  const nextWIdx = curWIdx + 1;
  let newWorldName = null;
  if (result.stars >= 1 && nextWIdx < WORLDS.length) {
    const nextW = WORLDS[nextWIdx];
    const prevEntry = s.worlds[nextW.id];
    if (!prevEntry || prevEntry.plays === 0) newWorldName = nextW.name;
  }

  root.innerHTML = `
    <div style="text-align:center; margin:12px 0 8px 0;">
      <h1 class="display">Set khatam</h1>
      ${scribble(160)}
    </div>
    <div class="summary-stars-row" id="sum-stars">
      <div class="card" style="padding:8px 12px; display:flex; align-items:center; justify-content:center; min-width:54px;">${icon('star', { size: 36 })}</div>
      <div class="card" style="padding:8px 12px; display:flex; align-items:center; justify-content:center; min-width:54px;">${icon('star', { size: 36 })}</div>
      <div class="card" style="padding:8px 12px; display:flex; align-items:center; justify-content:center; min-width:54px;">${icon('star', { size: 36 })}</div>
    </div>
    <div style="text-align:center; margin:8px 0;"><div class="bob-wrap">${naapu(charExpr)}</div></div>
    <div class="card">
      <div class="summary-stats-box">
        <div style="display:flex; justify-content:space-between;"><span>Total score:</span> <strong>${result.total} pts</strong></div>
        <div style="display:flex; justify-content:space-between;"><span>Behtareen round:</span> <strong>${result.bestRoundItemName || '-'}</strong></div>
        <div style="display:flex; justify-content:space-between;"><span>XP mila:</span> <strong style="color:var(--leaf);">+${result.xp} XP</strong></div>
      </div>
      <div class="xp-level-card">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;" class="small">
          <strong>Level ${result.level}: ${currentTitle[1]}</strong>
          <span>${s.xp} / ${nextXpNeeded} XP</span>
        </div>
        <div class="bar-track"><div class="bar-fill mustard" style="width:${levelProgress}%;"></div></div>
      </div>
      ${newWorldName ? `<div class="stamp leaf" style="margin-top:12px; font-size:20px; width:100%; display:block;">Naya world khula: ${newWorldName}!</div>` : ''}
    </div>
    <div class="ad-slot-wrapper spaced-from-buttons" style="margin-top:160px; margin-bottom:24px;">
      <div class="ad-slot slot-rectangle" id="ad-summary-slot">
        <span class="small" style="opacity:.5;">Advertisement Space (Inactive)</span>
      </div>
    </div>
    <div class="bottom-bar grid-2">
      <button class="btn alt" id="sum-home">Home</button>
      <button class="btn go" id="sum-again">Dobara</button>
    </div>
  `;

  const adSlot = $('#ad-summary-slot', root);
  if (adSlot) renderAd(adSlot, 'summary');

  $('#sum-home', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#sum-again', root).onclick = () => { SFX.tap(); game.startSet(result.worldId); router.go('#guess'); };

  const starCards = $$('#sum-stars .card', root);
  for (let i = 0; i < result.stars; i++){
    setTimeout(() => {
      if (starCards[i]){
        starCards[i].innerHTML = icon('star', { size: 36, filled: true });
        starCards[i].classList.add('pop');
        SFX.star(i); haptic('tap');
      }
    }, (i + 1) * 200);
  }

  if (result.stars === 3) setTimeout(() => confetti(60), 700);
  if (result.levelUp) setTimeout(() => { SFX.levelup(); haptic('levelup'); confetti(60); }, 900);
}
