// js/screens/fit.js - Fit Checker Tool (Chapter 5.11, 6.9)
import * as state from '../state.js';
import * as router from '../router.js';
import { fitCheck } from '../fit.js';
import { toMm, fromMm, fmtMm } from '../units.js';
import { $, icon, scribble, toast } from '../ui.js';
import { mountRuler } from '../ruler.js';
import { maxMeasureMm } from '../calib.js';
import { naapu } from '../chars.js';
import { SFX, haptic, shake } from '../fx.js';
import { trackFitCheckUsed } from '../analytics.js';
import { t } from '../strings.js';

router.on('s-fit', render);

function render(){
  const s = state.get(), root = $('#s-fit');
  const uOpts = ['mm', 'cm', 'm', 'in', 'ft'].map(u => `<option value="${u}">${u}</option>`).join('');

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="ft-back" aria-label="${t('back')}">${icon('back')}</button>
      <h2 class="h1" style="font-size:26px;">${t('fitTitle')}</h2>
      <div style="width:48px;"></div>
    </div>
    ${scribble(140)}
    <div class="screen-content">
      <!-- Quick Commerce & Travel Presets -->
      <div class="card" style="padding:14px 16px;">
        <div style="font-weight:600; font-size:14px; margin-bottom:8px; color:var(--ink);">
          ${t('fitPresetsTitle')}
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
          <button type="button" class="chip ft-preset" data-preset="cabin" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            ✈️ Flight Cabin (55×35×25)
          </button>
          <button type="button" class="chip ft-preset" data-preset="courier_s" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            📦 Courier Box S (20×15×10)
          </button>
          <button type="button" class="chip ft-preset" data-preset="courier_m" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            📦 Courier Box M (30×20×15)
          </button>
          <button type="button" class="chip ft-preset" data-preset="laptop_14" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            💻 14" Laptop (32×22×2)
          </button>
          <button type="button" class="chip ft-preset" data-preset="laptop_15" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            💻 15.6" Laptop (36×25×2.5)
          </button>
          <button type="button" class="chip ft-preset" data-preset="env_a4" style="padding:6px 8px; font-size:12px; justify-content:flex-start; text-align:left;">
            ✉️ A4 Envelope (32×23×2)
          </button>
        </div>
      </div>

      <div class="card fit-group">
        <h3 class="h2">${t('fitItemHeader')}</h3>
        <div class="fit-inputs-row">
          <input type="number" step="any" placeholder="L" value="300" id="ft-iL">
          <input type="number" step="any" placeholder="W" value="200" id="ft-iW">
          <input type="number" step="any" placeholder="H" value="100" id="ft-iH">
          <select id="ft-iU">${uOpts}</select>
        </div>
        <div style="display:flex; gap:6px; margin-top:4px;">
          <span class="small">Ruler:</span>
          <button class="chip" data-r="iL">L ${icon('ruler', { size: 14 })}</button>
          <button class="chip" data-r="iW">W ${icon('ruler', { size: 14 })}</button>
          <button class="chip" data-r="iH">H ${icon('ruler', { size: 14 })}</button>
        </div>
      </div>
      <div class="card fit-group">
        <h3 class="h2">${t('fitSpaceHeader')}</h3>
        <div class="fit-inputs-row">
          <input type="number" step="any" placeholder="L" value="350" id="ft-sL">
          <input type="number" step="any" placeholder="W" value="250" id="ft-sW">
          <input type="number" step="any" placeholder="H" value="120" id="ft-sH">
          <select id="ft-sU">${uOpts}</select>
        </div>
        <div style="display:flex; gap:6px; margin-top:4px;">
          <span class="small">Ruler:</span>
          <button class="chip" data-r="sL">L ${icon('ruler', { size: 14 })}</button>
          <button class="chip" data-r="sW">W ${icon('ruler', { size: 14 })}</button>
          <button class="chip" data-r="sH">H ${icon('ruler', { size: 14 })}</button>
        </div>
      </div>
      <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="body">${t('fitGapLabel')}</span>
        <div style="display:flex; align-items:center; gap:6px;">
          <input type="number" step="any" value="0" id="ft-gap" style="width:90px; text-align:center;">
          <span class="body">mm</span>
        </div>
      </div>
      <button class="btn go" id="ft-check" style="width:100%; margin-top:8px;">${t('fitCheckBtn')}</button>
      <div class="card fit-result-card" id="ft-res" hidden></div>
      <p class="small" style="text-align:center; margin-top:12px;">${t('fitDisclaimer')}</p>
    </div>
  `;

  $('#ft-back', root).onclick = () => { SFX.tap(); router.go('#home'); };

  const iL = $('#ft-iL', root), iW = $('#ft-iW', root), iH = $('#ft-iH', root), iU = $('#ft-iU', root);
  const sL = $('#ft-sL', root), sW = $('#ft-sW', root), sH = $('#ft-sH', root), sU = $('#ft-sU', root);
  const gapIn = $('#ft-gap', root), resCard = $('#ft-res', root);

  const inpMap = { iL, iW, iH, sL, sW, sH };

  const PRESET_DATA = {
    cabin: { type: 'space', vals: [55, 35, 25], u: 'cm', gap: 10, label: 'IndiGo / Air India Cabin Bag (55×35×25 cm)' },
    courier_s: { type: 'space', vals: [20, 15, 10], u: 'cm', gap: 15, label: 'Small Courier Box (20×15×10 cm)' },
    courier_m: { type: 'space', vals: [30, 20, 15], u: 'cm', gap: 15, label: 'Medium Courier Box (30×20×15 cm)' },
    laptop_14: { type: 'item', vals: [32, 22, 2], u: 'cm', gap: 10, label: '14" Laptop Body (32×22×2 cm)' },
    laptop_15: { type: 'item', vals: [36, 25, 2.5], u: 'cm', gap: 15, label: '15.6" Laptop Body (36×25×2.5 cm)' },
    env_a4: { type: 'space', vals: [32.4, 22.9, 2], u: 'cm', gap: 5, label: 'A4 Document Mailer (32.4×22.9 cm)' }
  };

  root.querySelectorAll('.ft-preset').forEach(btn => {
    btn.onclick = () => {
      SFX.tap();
      const p = PRESET_DATA[btn.dataset.preset];
      if (!p) return;
      root.querySelectorAll('.ft-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (p.type === 'space') {
        sL.value = p.vals[0];
        sW.value = p.vals[1];
        sH.value = p.vals[2];
        sU.value = p.u;
      } else {
        iL.value = p.vals[0];
        iW.value = p.vals[1];
        iH.value = p.vals[2];
        iU.value = p.u;
      }
      gapIn.value = p.gap;
      toast('Preset loaded: ' + p.label);
    };
  });

  root.querySelectorAll('[data-r]').forEach(btn => {
    btn.onclick = () => {
      const target = inpMap[btn.dataset.r];
      const unit = btn.dataset.r.startsWith('i') ? iU.value : sU.value;
      openRulerModal(target, unit);
    };
  });

  $('#ft-check', root).onclick = () => {
    SFX.tap();
    const itemMm = [toMm(parseFloat(iL.value)||0, iU.value), toMm(parseFloat(iW.value)||0, iU.value), toMm(parseFloat(iH.value)||0, iU.value)];
    const spaceMm = [toMm(parseFloat(sL.value)||0, sU.value), toMm(parseFloat(sW.value)||0, sU.value), toMm(parseFloat(sH.value)||0, sU.value)];
    const res = fitCheck(itemMm, spaceMm, parseFloat(gapIn.value)||0);
    trackFitCheckUsed(res.fits);

    resCard.hidden = false;
    let listHtml = '';
    if (res.fits) {
      SFX.ok(); haptic('tap');
      listHtml = `<div style="margin-bottom:4px;"><strong>${t('fitSpareTitle')}</strong></div>` +
        res.spare.map((v, i) => `<div>Dimension ${i+1}: ${fmtMm(v)}</div>`).join('');
    } else {
      SFX.bad(); haptic('bad'); shake(resCard);
      listHtml = `<div style="margin-bottom:4px; color:var(--tomato);"><strong>${t('fitDeficitTitle')}</strong></div>` +
        res.short.map((v, i) => v > 0 ? `<div>Dimension ${i+1}: -${fmtMm(v)}</div>` : '').join('');
    }

    resCard.innerHTML = `
      <div class="bob-wrap" style="margin-bottom:8px;">${naapu(res.fits ? 'happy' : 'sad')}</div>
      <div class="stamp ${res.fits ? 'leaf' : ''}" style="margin-bottom:12px;">${res.fits ? t('fitResultFits') : t('fitResultNoFit')}</div>
      <div class="body" style="text-align:left; font-size:18px;">${listHtml}</div>
    `;
  };

  function openRulerModal(targetInput, unit){
    if (!s.calib.pxPerMm) return toast(t('toolCalibNeededTitle'));
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog-box" style="max-width:440px;">
        <h3 class="h2">${t('toolTitle')}</h3>
        <div class="ruler-container" id="ft-modal-ruler" style="min-height:100px;"></div>
        <div class="bignum" id="ft-modal-readout" style="margin:8px 0; font-size:36px;">0 mm</div>
        <div class="bottom-bar grid-2">
          <button class="btn alt" id="ft-modal-cancel">${t('cancel')}</button>
          <button class="btn go" id="ft-modal-use">${t('done')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const pxPerMm = s.calib.pxPerMm;
    const maxMm = Math.min(250, maxMeasureMm(pxPerMm, 400));
    const readout = $('#ft-modal-readout', overlay);
    const inlineR = mountRuler($('#ft-modal-ruler', overlay), {
      pxPerMm, vertical: false, maxMm,
      onChange: v => { readout.textContent = v.toFixed(1) + ' mm'; }
    });

    $('#ft-modal-cancel', overlay).onclick = () => { inlineR.destroy(); overlay.remove(); };
    $('#ft-modal-use', overlay).onclick = () => {
      const inUnit = fromMm(inlineR.get(), unit);
      targetInput.value = Math.round(inUnit * 100) / 100;
      inlineR.destroy(); overlay.remove();
    };
  }
}
