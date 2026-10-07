// js/screens/guess.js - Guess Screen (Chapter 5.6, 6.4, Phase 2)
import * as game from '../game.js';
import * as state from '../state.js';
import * as router from '../router.js';
import { $, icon, toast, confirmModal } from '../ui.js';
import { fmtMm, toMm } from '../units.js';
import { maxMeasureMm } from '../calib.js';
import { comboMultiplier } from '../score.js';
import { naapu, fita, startBlinkLoop } from '../chars.js';
import { SFX, haptic } from '../fx.js';
import { t, getLang } from '../strings.js';

router.on('s-guess', render);

const MIN_MM = 0.5, MAX_MM = 30000;
const mmFromT = t => MIN_MM * Math.pow(MAX_MM / MIN_MM, t / 1000);
const tFromMm = mm => 1000 * Math.log(mm / MIN_MM) / Math.log(MAX_MM / MIN_MM);

const getSnapStep = mm => mm < 10 ? 0.1 : mm < 100 ? 0.5 : mm < 1000 ? 1 : mm < 10000 ? 10 : 50;
const snapMm = val => {
  const s = getSnapStep(val);
  return Math.min(MAX_MM, Math.max(MIN_MM, Math.round(Math.round(val / s) * s * 10) / 10));
};

let stopBlink = null;

function render(){
  const run = game.getRun(), item = game.current();
  if (!run || !item) return router.go('#home');
  if (stopBlink) { stopBlink(); stopBlink = null; }

  const root = $('#s-guess');
  const lang = getLang();
  let guessMm = 100, isLocked = false;

  const questionText = lang === 'en'
    ? `Estimate the ${item.part} of ${item.name}`
    : `${item.name} ki ${item.part} kitni hogi?`;

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="g-quit" aria-label="${t('quit')}">${icon('cross')}</button>
      <span class="body">${t('guessRound', { round: run.idx + 1 })}</span>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span class="small">${t('revealCombo', { combo: comboMultiplier(run.streak).toFixed(1) })}</span>
      <span class="small">${t('summaryTotal')} ${run.total}</span>
    </div>
    <h2 class="h2" style="text-align:center; margin:8px 0;">${questionText}</h2>
    <div style="text-align:center; margin:8px 0;"><div class="bob-wrap" id="g-char">${naapu('think')}</div></div>
    <div id="g-hint-box" style="margin-bottom:8px;"></div>
    <div class="guess-box">
      <button class="bignum bignum-btn" id="g-bignum" aria-label="Type guess">${fmtMm(guessMm)}</button>
      <div class="step-slider-row">
        <button class="btn alt step-btn" id="g-minus" aria-label="-">-</button>
        <input type="range" min="0" max="1000" step="1" value="${Math.round(tFromMm(guessMm))}" id="g-slider">
        <button class="btn alt step-btn" id="g-plus" aria-label="+">+</button>
      </div>
    </div>
    <div class="type-input-modal" id="g-modal" hidden>
      <div style="display:flex; gap:8px;">
        <input type="number" inputmode="decimal" step="any" placeholder="Number" id="g-num-input" style="flex:1;">
        <select id="g-unit-select"><option value="mm">mm</option><option value="cm">cm</option><option value="m">m</option></select>
      </div>
      <button class="btn go" id="g-type-done" style="width:100%; margin-top:8px;">OK</button>
    </div>
    <div class="bottom-bar">
      <button class="btn alt" id="g-hint-btn">Hint (-10)</button>
      <button class="btn go" id="g-lock-btn" style="min-width:140px;">${t('guessLockBtn')}</button>
    </div>
    <div id="g-offer-box" style="margin-top:12px;"></div>
  `;

  stopBlink = startBlinkLoop($('#g-char', root));

  const btnBignum = $('#g-bignum', root);
  const slider = $('#g-slider', root);
  const btnMinus = $('#g-minus', root);
  const btnPlus = $('#g-plus', root);
  const btnLock = $('#g-lock-btn', root);
  const btnHint = $('#g-hint-btn', root);
  const modal = $('#g-modal', root);
  const numInput = $('#g-num-input', root);
  const unitSelect = $('#g-unit-select', root);

  function update(m){
    guessMm = snapMm(m);
    btnBignum.textContent = fmtMm(guessMm);
    slider.value = Math.round(tFromMm(guessMm));
    btnLock.disabled = guessMm <= 0;
  }

  slider.oninput = () => update(mmFromT(parseInt(slider.value, 10)));

  function setupRepeater(btn, mul){
    let t1, t2;
    const step = () => { update(guessMm + getSnapStep(guessMm) * mul); SFX.tap(); haptic('tap'); };
    const stop = () => { clearTimeout(t1); clearInterval(t2); };
    btn.onpointerdown = e => { e.preventDefault(); step(); t1 = setTimeout(() => { t2 = setInterval(step, 80); }, 400); };
    btn.onpointerup = stop; btn.onpointerleave = stop; btn.onpointercancel = stop;
  }
  setupRepeater(btnMinus, -1);
  setupRepeater(btnPlus, 1);

  $('#g-quit', root).onclick = () => {
    SFX.tap();
    confirmModal(t('guessQuitConfirmTitle'), t('guessQuitConfirmMsg'), () => {
      game.abandonSet(); router.go('#home');
    });
  };

  btnBignum.onclick = () => {
    SFX.tap();
    modal.hidden = !modal.hidden;
    if (!modal.hidden){
      unitSelect.value = guessMm >= 1000 ? 'm' : (guessMm >= 100 ? 'cm' : 'mm');
      numInput.value = unitSelect.value === 'm' ? (guessMm / 1000) : (unitSelect.value === 'cm' ? (guessMm / 10) : guessMm);
      numInput.focus();
    }
  };

  const applyType = () => {
    SFX.tap();
    const v = parseFloat(numInput.value);
    if (!isNaN(v) && v > 0) update(toMm(v, unitSelect.value));
    modal.hidden = true;
  };
  $('#g-type-done', root).onclick = applyType;
  numInput.onkeydown = e => { if (e.key === 'Enter') applyType(); };

  btnHint.onclick = () => {
    SFX.tap(); btnHint.disabled = true;
    const h = game.useHint();
    $('#g-hint-box', root).innerHTML = `<div class="card" style="display:flex; align-items:center; gap:12px; background:var(--paper2);">${fita('think')}<div><div class="h2" style="font-size:20px;">Fita Hint:</div><p class="body">${h}</p></div></div>`;
    toast('Hint used: -10 points');
  };

  btnLock.onclick = () => {
    if (isLocked) return;
    isLocked = true;
    btnLock.disabled = btnHint.disabled = slider.disabled = btnMinus.disabled = btnPlus.disabled = true;
    SFX.tap();
    game.setPendingGuess(guessMm);

    const s = state.get();
    const axisPx = window.innerHeight;
    const canMeasure = s.calib.pxPerMm && item.mm >= 5 && item.mm <= maxMeasureMm(s.calib.pxPerMm, axisPx);

    if (canMeasure){
      const offerBox = $('#g-offer-box', root);
      offerBox.innerHTML = `
        <div class="card" style="text-align:center; padding:16px;">
          <h2 class="h2">${t('guessBonusOfferTitle')}</h2>
          <p class="body" style="margin:8px 0 16px 0;">${t('guessBonusOfferDesc')}</p>
          <div class="bottom-bar grid-2">
            <button class="btn alt" id="g-skip-bonus">${t('skip')}</button>
            <button class="btn go" id="g-go-bonus">${t('guessBonusMeasureBtn')}</button>
          </div>
        </div>
      `;
      $('#g-skip-bonus', offerBox).onclick = () => { SFX.tap(); game.submit(guessMm, null); router.go('#reveal'); };
      $('#g-go-bonus', offerBox).onclick = () => { SFX.tap(); router.go('#measure'); };
    } else {
      game.submit(guessMm, null);
      router.go('#reveal');
    }
  };
}
