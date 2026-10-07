// js/screens/calibrate.js - Screen Calibration (Chapter 5.3, 6.1)
import * as state from '../state.js';
import * as router from '../router.js';
import { CARD_MM, CARD_SHORT_MM, isPlausible, deviceSig } from '../calib.js';
import { $, icon, scribble, toast } from '../ui.js';
import { SFX } from '../fx.js';

router.on('s-calib', render);

function render(){
  const s = state.get(), root = $('#s-calib');
  const isFirstTime = !s.calib.pxPerMm;

  const isLandscape = window.innerWidth >= window.innerHeight;
  const longAxisLen = isLandscape ? window.innerWidth : window.innerHeight;
  const isTouchPhone = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 600;

  let currentL = s.calib.pxPerMm ? Math.round(s.calib.pxPerMm * CARD_MM) : Math.round(isTouchPhone ? 85.6 * 6.0 : 85.6 * 3.78);
  const minL = Math.round(0.15 * longAxisLen);
  const maxL = Math.round(0.95 * longAxisLen);
  currentL = Math.max(minL, Math.min(maxL, currentL));

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="c-back" aria-label="Peeche jao" style="${isFirstTime ? 'visibility:hidden;' : ''}">${icon('back')}</button>
      <h1 class="h1">Pehle screen ko samjhao</h1>
      <div style="width:48px;"></div>
    </div>
    ${scribble(140)}
    <p class="body" style="margin-bottom:12px;">Credit/ATM/Aadhaar PVC card screen par rakho. Slider se outline ko card ke barabar karo.</p>
    <div class="card-box-stage"><div class="card-outline" id="c-outline"></div></div>
    <div class="calib-controls">
      <input type="range" min="${minL}" max="${maxL}" step="1" value="${currentL}" id="c-slider">
      <div class="fine-buttons-row">
        <button class="btn alt fine-btn" data-d="-5">-5</button>
        <button class="btn alt fine-btn" data-d="-1">-1</button>
        <button class="btn alt fine-btn" data-d="1">+1</button>
        <button class="btn alt fine-btn" data-d="5">+5</button>
      </div>
      <p class="small" id="c-readout" style="text-align:center; margin:8px 0;"></p>
    </div>
    <div class="bottom-bar center">
      <button class="btn go" id="c-done" style="width:100%;">Ho gaya</button>
    </div>
  `;

  const outline = $('#c-outline', root);
  const slider = $('#c-slider', root);
  const readout = $('#c-readout', root);

  function updateL(newL){
    currentL = Math.max(minL, Math.min(maxL, newL));
    slider.value = currentL;
    const shortL = Math.round(currentL * (CARD_SHORT_MM / CARD_MM));

    if (isLandscape){
      outline.style.width = currentL + 'px';
      outline.style.height = shortL + 'px';
      outline.innerHTML = '<span>85.6 mm lamba &rarr;</span>';
    } else {
      outline.style.width = shortL + 'px';
      outline.style.height = currentL + 'px';
      outline.innerHTML = '<span>&darr;<br>85.6 mm<br>lamba<br>&darr;</span>';
    }
    const ppm = currentL / CARD_MM;
    readout.textContent = `Abhi: ${ppm.toFixed(2)} px per mm`;
  }

  slider.oninput = () => updateL(parseInt(slider.value, 10));

  root.querySelectorAll('.fine-buttons-row button').forEach(b => {
    b.onclick = () => { SFX.tap(); updateL(currentL + parseInt(b.dataset.d, 10)); };
  });

  $('#c-back', root).onclick = () => { SFX.tap(); router.go('#home'); };

  $('#c-done', root).onclick = () => {
    const ppm = currentL / CARD_MM;
    if (!isPlausible(ppm)) {
      SFX.bad();
      toast('Ye size sahi nahi lag raha. Dobara try karo.');
      return;
    }
    s.calib = {
      pxPerMm: ppm,
      dpr: window.devicePixelRatio || 1,
      sig: deviceSig()
    };
    state.save();
    SFX.great();
    toast('Screen calibrate ho gayi!');
    router.go('#home');
  };

  updateL(currentL);
}
