// js/ruler.js - Ruler canvas ticks, pointer dragging and DOM mounting (Chapter 6.2, 9.6)
import { haptic } from './fx.js';

export const ZERO = 40; // 0 mm canvas ke start se 40 px andar
const rng = seed => () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

export function drawTicks(canvas, { pxPerMm, vertical, lengthMm }){
  const dpr = window.devicePixelRatio || 1;
  const thick = 64;
  const long = Math.ceil(ZERO + lengthMm * pxPerMm + 20);
  const w = vertical ? thick : long;
  const h = vertical ? long : thick;

  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);

  const g = canvas.getContext('2d');
  g.scale(dpr, dpr);
  g.strokeStyle = g.fillStyle = '#0F172A';
  g.lineCap = 'butt';
  g.font = '600 13px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  g.textAlign = 'center';

  for (let mm = 0; mm <= lengthMm; mm++){
    const p = ZERO + mm * pxPerMm;
    const len = mm % 10 === 0 ? 24 : mm % 5 === 0 ? 16 : 9;
    g.lineWidth = mm % 10 === 0 ? 1.8 : 1.0;
    g.beginPath();
    if (vertical){
      g.moveTo(0, p);
      g.lineTo(len, p);
    } else {
      g.moveTo(p, 0);
      g.lineTo(p, len);
    }
    g.stroke();

    if (mm % 10 === 0 && mm > 0){
      if (vertical) g.fillText(String(mm / 10), len + 14, p + 5);
      else g.fillText(String(mm / 10), p, len + 16);
    }
  }
}

export function makeRuler(elTarget, { pxPerMm, vertical, maxMm, onChange }){
  let mm = 0;
  let lastVibTime = 0;
  let lastVibMm = -1;

  const toMm = e => {
    const r = elTarget.getBoundingClientRect();
    const p = vertical ? (e.clientY - r.top) : (e.clientX - r.left);
    return Math.min(maxMm, Math.max(0, Math.round(((p - ZERO) / pxPerMm) * 2) / 2));
  };

  const vib = val => {
    if (val % 5 === 0 && val !== lastVibMm) {
      const now = performance.now();
      if (now - lastVibTime >= 60) {
        haptic('ruler');
        lastVibTime = now;
        lastVibMm = val;
      }
    }
  };

  const move = e => {
    const v = toMm(e);
    if (v !== mm){
      mm = v;
      vib(mm);
      onChange(mm);
    }
  };

  elTarget.style.touchAction = 'none';

  const onDown = e => {
    try { elTarget.setPointerCapture(e.pointerId); } catch (_) {}
    move(e);
    elTarget.addEventListener('pointermove', move);
  };
  const onUp = e => {
    try { elTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    elTarget.removeEventListener('pointermove', move);
  };

  elTarget.addEventListener('pointerdown', onDown);
  elTarget.addEventListener('pointerup', onUp);
  elTarget.addEventListener('pointercancel', onUp);

  const onKey = e => {
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') delta = e.shiftKey ? 10 : 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') delta = e.shiftKey ? -10 : -1;
    if (delta !== 0){
      e.preventDefault();
      const n = Math.min(maxMm, Math.max(0, mm + delta));
      if (n !== mm){
        mm = n;
        vib(mm);
        onChange(mm);
      }
    }
  };
  elTarget.addEventListener('keydown', onKey);

  return {
    get: () => mm,
    set: v => {
      mm = Math.min(maxMm, Math.max(0, Math.round(v * 2) / 2));
      onChange(mm);
    },
    destroy: () => {
      elTarget.removeEventListener('pointerdown', onDown);
      elTarget.removeEventListener('pointerup', onUp);
      elTarget.removeEventListener('pointercancel', onUp);
      elTarget.removeEventListener('keydown', onKey);
    }
  };
}

export function mountRuler(parentEl, { pxPerMm, vertical, maxMm, onChange }){
  const stage = document.createElement('div');
  stage.className = 'ruler-stage';
  stage.tabIndex = 0;
  stage.role = 'slider';
  stage.setAttribute('aria-label', 'Ruler');
  stage.innerHTML = '<canvas></canvas><div class="ruler-marker-line"></div><div class="ruler-marker-handle"></div>';

  const canvas = stage.querySelector('canvas');
  const line = stage.querySelector('.ruler-marker-line');
  const handle = stage.querySelector('.ruler-marker-handle');

  parentEl.appendChild(stage);
  drawTicks(canvas, { pxPerMm, vertical, lengthMm: maxMm });

  function setPos(mmVal){
    const p = ZERO + mmVal * pxPerMm;
    if (vertical){
      line.style.cssText = `left:0;width:64px;top:${p}px;height:3px`;
      handle.style.cssText = `left:32px;top:${p}px`;
    } else {
      line.style.cssText = `top:0;height:64px;left:${p}px;width:3px`;
      handle.style.cssText = `top:32px;left:${p}px`;
    }
  }

  const handler = makeRuler(stage, {
    pxPerMm, vertical, maxMm,
    onChange: val => { setPos(val); if (onChange) onChange(val); }
  });

  setPos(0);

  return {
    get: handler.get,
    set: v => { handler.set(v); setPos(v); },
    destroy: () => { handler.destroy(); stage.remove(); }
  };
}
