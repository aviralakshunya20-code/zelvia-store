// js/screens/tool.js - Free Ruler Tool Screen (Chapter 5.12, 6.2)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, icon, scribble, toast } from '../ui.js';
import { mountRuler } from '../ruler.js';
import { maxMeasureMm } from '../calib.js';
import { fromMm } from '../units.js';
import { SFX } from '../fx.js';

router.on('s-tool', render);
let rulerInstance = null;

function render(){
  const s = state.get(), root = $('#s-tool');
  if (rulerInstance) { rulerInstance.destroy(); rulerInstance = null; }

  if (!s.calib.pxPerMm) {
    root.innerHTML = `
      <div class="screen-header">
        <button class="btn alt" id="t-back" aria-label="Peeche jao">${icon('back')}</button>
        <h1 class="h1">Ruler Tool</h1><div style="width:48px;"></div>
      </div>
      ${scribble(110)}
      <div class="card" style="text-align:center; padding:24px 16px;">
        <div style="margin-bottom:12px;">${icon('lock', { size: 36 })}</div>
        <h2 class="h2">Pehle calibrate karo</h2>
        <p class="body" style="margin:8px 0 16px 0;">Ruler chalane ke liye pehle screen ko credit/ATM card se calibrate karo.</p>
        <button class="btn go" id="t-go-calib">Calibrate karein</button>
      </div>
    `;
    $('#t-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
    $('#t-go-calib', root).onclick = () => { SFX.tap(); router.go('#calib'); };
    return;
  }

  if (window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01) {
    toast('Zoom badla hai. Dobara calibrate karo.');
  }

  let unit = s.settings.units || 'cm';
  const pxPerMm = s.calib.pxPerMm;
  const isLandscape = window.innerWidth >= window.innerHeight;
  let isVertical = !isLandscape;

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="t-back" aria-label="Peeche jao">${icon('back')}</button>
      <h1 class="h1">Ruler Tool</h1><div style="width:48px;"></div>
    </div>
    ${scribble(110)}
    <div class="screen-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <div style="display:flex; gap:6px;" id="t-chips">
          <button class="chip ${unit==='mm'?'active':''}" data-u="mm">mm</button>
          <button class="chip ${unit==='cm'?'active':''}" data-u="cm">cm</button>
          <button class="chip ${unit==='in'?'active':''}" data-u="in">in</button>
        </div>
        <button class="btn alt fine-btn" id="t-flip">${isVertical ? 'Horizontal' : 'Vertical'}</button>
      </div>
      <div class="ruler-container" id="t-ruler-box"></div>
      <div style="text-align:center; margin:8px 0;"><div class="bignum" id="t-readout">0 mm</div></div>
      <div class="bottom-bar center">
        <button class="btn alt" id="t-recalib" style="width:100%;">Dobara calibrate karein</button>
      </div>
    </div>
  `;

  $('#t-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#t-flip', root).onclick = () => { SFX.tap(); isVertical = !isVertical; render(); };
  $('#t-recalib', root).onclick = () => { SFX.tap(); router.go('#calib'); };

  const readout = $('#t-readout', root);
  const fmtVal = v => unit === 'mm' ? v.toFixed(1) + ' mm' : unit === 'cm' ? (v / 10).toFixed(2) + ' cm' : (fromMm(v, 'in')).toFixed(2) + ' in';
  const updateReadout = v => { readout.textContent = fmtVal(v); };

  $('#t-chips', root).querySelectorAll('.chip').forEach(c => {
    c.onclick = () => {
      SFX.tap(); unit = c.dataset.u;
      $('#t-chips', root).querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active');
      updateReadout(rulerInstance ? rulerInstance.get() : 0);
    };
  });

  const axisPx = isVertical ? window.innerHeight : Math.min(window.innerWidth, 480);
  const maxMm = Math.min(300, Math.max(50, maxMeasureMm(pxPerMm, axisPx)));

  rulerInstance = mountRuler($('#t-ruler-box', root), {
    pxPerMm, vertical: isVertical, maxMm,
    onChange: updateReadout
  });
  updateReadout(0);
}
