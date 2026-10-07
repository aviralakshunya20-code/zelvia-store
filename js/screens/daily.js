// js/screens/daily.js - Daily Hunt Screen (Chapter 5.10, 6.8, 9.4)
import * as state from '../state.js';
import * as router from '../router.js';
import { dailyTarget, dailyTolerance, dailyOk, dayKey, keyOffset, applyDailySuccess } from '../daily.js';
import { fmtMm } from '../units.js';
import { maxMeasureMm } from '../calib.js';
import { $, icon, scribble, toast } from '../ui.js';
import { mountRuler } from '../ruler.js';
import { naapu } from '../chars.js';
import { SFX, haptic, confetti, shake } from '../fx.js';
import { trackDailyDone } from '../analytics.js';
import { t } from '../strings.js';

router.on('s-daily', render);
let rulerInstance = null;

function render(){
  const s = state.get(), root = $('#s-daily');
  if (!s.calib.pxPerMm) {
    toast(t('toolCalibNeededTitle'));
    return router.go('#home');
  }

  const startTime = new Date();
  const todayKey = dayKey(startTime), yesterdayKey = keyOffset(startTime, -1);
  const targetMm = dailyTarget(startTime), tolMm = dailyTolerance(targetMm);

  if (rulerInstance) { rulerInstance.destroy(); rulerInstance = null; }

  if (s.daily.done[todayKey] && s.daily.done[todayKey].ok) {
    root.innerHTML = `
      <div class="screen-header">
        <button class="btn alt" id="d-back" aria-label="${t('back')}">${icon('back')}</button>
        <h2 class="h1" style="font-size:26px;">${t('dailyTitle')}</h2>
        <span class="chip">${t('streak')} ${s.daily.streak}</span>
      </div>
      ${scribble(120)}
      <div class="card" style="text-align:center; padding:24px 16px;">
        <div class="bob-wrap" style="margin-bottom:12px;">${naapu('happy')}</div>
        <div class="stamp leaf" style="margin-bottom:16px;">${t('dailyAlreadyDone')}</div>
        <p class="body">${t('dailyStreakSuccess', { streak: s.daily.streak })}</p>
        <p class="small" style="margin-top:8px;">${t('dailyComeBackTomorrow')}</p>
      </div>
    `;
    $('#d-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
    return;
  }

  const isLandscape = window.innerWidth >= window.innerHeight;
  const isVertical = !isLandscape;
  const pxPerMm = s.calib.pxPerMm;
  const axisPx = isVertical ? window.innerHeight : Math.min(window.innerWidth, 480);
  const maxMm = Math.min(maxMeasureMm(pxPerMm, axisPx), Math.ceil(targetMm + 30));

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="d-back" aria-label="${t('back')}">${icon('back')}</button>
      <h2 class="h1" style="font-size:26px;">${t('dailyTitle')}</h2>
      <span class="chip">${t('streak')} ${s.daily.streak}</span>
    </div>
    ${scribble(120)}
    <div class="card daily-target-box" id="d-card">
      <p class="body">${t('dailyTargetMsg')}</p>
      <div class="bignum" style="margin:8px 0;">${fmtMm(targetMm)}</div>
      <p class="small">(&plusmn; ${tolMm.toFixed(2)} mm)</p>
    </div>
    <div style="text-align:center; margin:8px 0;">
      <div class="bob-wrap" id="d-char">${naapu('idle')}</div>
      <p class="body" id="d-msg" style="margin-top:6px;"></p>
    </div>
    <div class="ruler-container" id="d-ruler-box"></div>
    <div style="text-align:center; margin:8px 0;"><div class="bignum" id="d-readout">0.0 mm</div></div>
    <div class="bottom-bar center">
      <button class="btn go" id="d-submit" style="width:100%;">${t('dailySubmitBtn')}</button>
    </div>
  `;

  $('#d-back', root).onclick = () => { SFX.tap(); router.go('#home'); };

  const readout = $('#d-readout', root);
  const charWrap = $('#d-char', root);
  const msgEl = $('#d-msg', root);
  const targetCard = $('#d-card', root);

  rulerInstance = mountRuler($('#d-ruler-box', root), {
    pxPerMm, vertical: isVertical, maxMm,
    onChange: val => { readout.textContent = val.toFixed(1) + ' mm'; }
  });

  $('#d-submit', root).onclick = () => {
    const val = rulerInstance ? rulerInstance.get() : 0;
    if (dailyOk(val, targetMm)){
      applyDailySuccess(s.daily, todayKey, yesterdayKey);
      s.daily.done[todayKey] = { measuredMm: val, ok: true };
      state.save();
      trackDailyDone(val, s.daily.streak);
      SFX.great(); haptic('great'); confetti(36);
      charWrap.innerHTML = naapu('happy');
      msgEl.textContent = t('dailyStreakSuccess', { streak: s.daily.streak });
      msgEl.style.color = 'var(--leaf)';
      setTimeout(render, 1200);
    } else {
      SFX.bad(); haptic('bad'); shake(targetCard);
      charWrap.innerHTML = naapu('sad');
      const diff = Math.abs(val - targetMm);
      msgEl.textContent = t('dailyStreakMiss', { diff: diff.toFixed(1) });
      msgEl.style.color = 'var(--tomato)';
    }
  };
}
