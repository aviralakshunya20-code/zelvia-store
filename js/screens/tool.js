// js/screens/tool.js - Free Ruler Tool Screen (Chapter 5.12, 6.2)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, icon, scribble, toast } from '../ui.js';
import { mountRuler } from '../ruler.js';
import { maxMeasureMm, estimatePxPerMm } from '../calib.js';
import { fromMm } from '../units.js';
import { SFX } from '../fx.js';
import { trackRulerUsed } from '../analytics.js';
import { t } from '../strings.js';

router.on('s-tool', render);
let rulerInstance = null;

function render(){
  const s = state.get(), root = $('#s-tool');
  if (rulerInstance) { rulerInstance.destroy(); rulerInstance = null; }

  // Visitors arriving from search should see a working ruler right away. Until they
  // calibrate, use an estimated scale and say clearly that it is approximate.
  const calibrated = Boolean(s.calib.pxPerMm);

  if (window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01) {
    toast(t('calibZoomChanged'));
  }

  let unit = s.settings.units || 'cm';
  if (window.location.pathname.includes('/ruler/inches')) unit = 'in';
  else if (window.location.pathname.includes('/ruler/cm')) unit = 'cm';
  else if (window.location.pathname.includes('/ruler/mm')) unit = 'mm';

  const pxPerMm = calibrated ? s.calib.pxPerMm : estimatePxPerMm();
  const isLandscape = window.innerWidth >= window.innerHeight;
  let isVertical = !isLandscape;

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="t-back" aria-label="${t('back')}">${icon('back')}</button>
      <h2 class="h1">${t('toolTitle')}</h2><div style="width:48px;"></div>
    </div>
    ${scribble(110)}
    <div class="screen-content">
      ${calibrated ? '' : `
      <div class="card" role="status" style="padding:12px 14px; margin-bottom:10px; display:flex; gap:10px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <p class="body" style="margin:0; flex:1 1 220px;"><strong>${t('toolApproxTitle')}</strong> ${t('toolApproxDesc')}</p>
        <button class="btn go fine-btn" id="t-go-calib">${t('toolCalibBtn')}</button>
      </div>`}
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
        <button class="btn alt" id="t-recalib" style="width:100%;">${calibrated ? t('toolRecalibBtn') : t('toolCalibBtn')}</button>
      </div>
    </div>
  `;

  $('#t-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#t-flip', root).onclick = () => { SFX.tap(); isVertical = !isVertical; render(); };
  $('#t-recalib', root).onclick = () => { SFX.tap(); router.go('#calib'); };
  const goCalib = $('#t-go-calib', root);
  if (goCalib) goCalib.onclick = () => { SFX.tap(); router.go('#calib'); };

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
  trackRulerUsed(unit);
}

