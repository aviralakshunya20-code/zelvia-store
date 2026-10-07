// js/screens/reveal.js - Round Reveal Screen (Chapter 5.8, 7.4)
import * as game from '../game.js';
import * as state from '../state.js';
import * as router from '../router.js';
import { $ } from '../ui.js';
import { fmtMm } from '../units.js';
import { maxMeasureMm } from '../calib.js';
import { naapu, chhotu } from '../chars.js';
import { SFX, haptic, confetti, shake, countUp } from '../fx.js';

router.on('s-reveal', render);

function render(){
  const run = game.getRun();
  if (!run || run.rounds.length === 0) return router.go('#home');
  const r = game.lastRound();
  if (!r) return router.go('#home');

  const s = state.get(), root = $('#s-reveal');
  const isLastRound = run.idx >= run.items.length - 1;

  let verdictText = 'Achha tha', expr = 'idle';
  if (r.guessPts >= 90) { verdictText = 'Bilkul sahi!'; expr = 'happy'; }
  else if (r.guessPts < 50) { verdictText = 'Door the'; expr = 'sad'; }

  const axisPx = window.innerHeight;
  const maxMm = s.calib.pxPerMm ? maxMeasureMm(s.calib.pxPerMm, axisPx) : 100;
  const canTrueScale = s.calib.pxPerMm && r.trueMm <= maxMm && r.guessMm <= maxMm;
  const maxVal = canTrueScale ? Math.max(r.trueMm, r.guessMm, 1) : Math.max(r.trueMm, r.guessMm);
  const truePct = (r.trueMm / maxVal) * 100;
  const guessPct = (r.guessMm / maxVal) * 100;

  root.innerHTML = `
    <div class="screen-header" style="justify-content:flex-end;">
      <span class="body">Round ${run.idx + 1} / ${run.items.length}</span>
    </div>
    <div class="reveal-verdict">
      <div class="bob-wrap" style="position:relative; display:inline-block;">
        ${naapu(expr)}
        ${r.guessPts >= 90 ? `<div style="position:absolute; right:-40px; bottom:20px;">${chhotu()}</div>` : ''}
      </div>
      <h1 class="h1" style="margin-top:8px;">${verdictText}</h1>
      ${r.guessPts >= 90 ? '<div class="stamp leaf" style="margin-top:6px;">BILKUL SAHI!</div>' : ''}
    </div>
    <div class="card" id="rev-card">
      <div class="bars-table">
        <div class="bar-row">
          <div class="bar-row-label"><span>Asli size:</span> <strong>${fmtMm(r.trueMm)}</strong></div>
          <div class="bar-track"><div class="bar-fill leaf" style="width:${truePct}%;"></div></div>
        </div>
        <div class="bar-row">
          <div class="bar-row-label"><span>Tumhara andaaza:</span> <strong>${fmtMm(r.guessMm)}</strong></div>
          <div class="bar-track"><div class="bar-fill tomato" style="width:${guessPct}%;"></div></div>
        </div>
        ${r.measuredMm != null ? `
          <div class="bar-row">
            <div class="bar-row-label"><span>Asli naap (bonus):</span> <strong>${fmtMm(r.measuredMm)}</strong></div>
            <div class="bar-track"><div class="bar-fill mustard" style="width:${Math.min(100, (r.measuredMm / Math.max(r.trueMm, r.guessMm, r.measuredMm)) * 100)}%;"></div></div>
          </div>
        ` : ''}
      </div>
      <div style="display:flex; justify-content:space-between; margin:10px 0; font-size:18px;">
        <span>Farq:</span> <strong>${r.errPct.toFixed(1)} %</strong>
      </div>
      <div class="round-breakdown">
        <div>Guess: +${r.guessPts}</div>
        <div>Bonus: +${r.bonus}</div>
        <div>Combo: x${r.mult.toFixed(1)}</div>
        <div>Streak: ${r.streakAfter}</div>
        <div class="round-total-row"><span>Round total:</span> <strong id="rev-total">0</strong></div>
      </div>
    </div>
    <div class="bottom-bar center">
      <button class="btn go" id="rev-next-btn" style="width:100%;">${isLastRound ? 'Result dekho' : 'Aage'}</button>
    </div>
  `;

  $('#rev-next-btn', root).onclick = () => {
    SFX.tap();
    if (isLastRound) router.go('#summary');
    else { game.next(); router.go('#guess'); }
  };

  const card = $('#rev-card', root);
  if (r.guessPts >= 90) { SFX.great(); haptic('great'); confetti(36); }
  else if (r.guessPts < 50) { SFX.bad(); haptic('bad'); shake(card); }
  else { SFX.ok(); haptic('tap'); }

  countUp($('#rev-total', root), r.total, 600);
}
