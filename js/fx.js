// js/fx.js - Sound, effects, vibrations, paper texture (Chapter 7)
import * as state from './state.js';

// Paper texture (Chapter 7.6)
export function makePaper(){
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#F6EFDC';
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 260; i++){
    g.fillStyle = Math.random() < .5 ? 'rgba(43,33,24,.05)' : 'rgba(255,255,255,.35)';
    g.fillRect((Math.random() * 128) | 0, (Math.random() * 128) | 0, 1 + ((Math.random() * 2) | 0), 1);
  }
  document.body.style.backgroundImage = 'url(' + c.toDataURL() + ')';
}

// Sound (Web Audio API - Chapter 7.7)
let ctx = null;
const audio = () => {
  if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
};

export function beep(freq, ms, type = 'square', vol = 0.06, delayMs = 0){
  const s = state.get();
  if (s && s.settings && !s.settings.sound) return;
  try {
    const c = audio();
    if (!c) return;
    const t0 = c.currentTime + delayMs / 1000;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
    o.connect(g);
    g.connect(c.destination);
    o.start(t0);
    o.stop(t0 + ms / 1000 + 0.02);
  } catch (e) {
    /* AudioContext error safeguard */
  }
}

export const SFX = {
  tap: () => beep(520, 40, 'square', 0.06),
  ok: () => {
    beep(523, 90, 'square', 0.06);
    beep(784, 120, 'square', 0.06, 90);
  },
  great: () => {
    [523, 659, 784, 1047].forEach((f, i) => beep(f, 90, 'square', 0.06, i * 80));
  },
  bad: () => {
    beep(196, 120, 'sawtooth', 0.05);
    beep(147, 200, 'sawtooth', 0.05, 110);
  },
  star: (n = 0) => beep(880 + 110 * n, 120, 'sine', 0.07),
  levelup: () => {
    [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 100, 'square', 0.06, i * 90));
  },
  lock: () => beep(130, 100, 'square', 0.05)
};

// Haptics (Chapter 7.8)
export function haptic(type = 'tap'){
  const s = state.get();
  if (s && s.settings && !s.settings.haptics) return;
  if (!('vibrate' in navigator)) return;
  try {
    const pattern = {
      tap: 8,
      ruler: 5,
      great: [20, 40, 20],
      bad: 60,
      levelup: [30, 50, 30, 50, 60]
    }[type] || 8;
    navigator.vibrate(pattern);
  } catch (e) {}
}

// Confetti, Shake, Pop (Chapter 7.9)
export function confetti(n = 36){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host = document.getElementById('fx');
  if (!host) return;
  const colors = ['#E4572E', '#F3B73B', '#4C9F70', '#6FB1D6', '#2B2118'];
  for (let i = 0; i < n; i++){
    const s = document.createElement('i');
    s.style.cssText = 'position:absolute;left:50%;top:40%;width:8px;height:5px;background:' + colors[i % 5];
    host.appendChild(s);
    const dx = (Math.random() - .5) * 420;
    const up = 80 + Math.random() * 120;
    const fall = 200 + Math.random() * 320;
    const rot = (Math.random() - .5) * 900;
    s.animate([
      { transform: 'translate(0,0) rotate(0)' },
      { transform: `translate(${dx * .6}px,${-up}px) rotate(${rot * .4}deg)`, offset: .35 },
      { transform: `translate(${dx}px,${fall}px) rotate(${rot}deg)` }
    ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => s.remove();
  }
}

export function shake(el){
  if (!el || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  el.animate({
    transform: ['translateX(0)', 'translateX(-4px)', 'translateX(4px)', 'translateX(-3px)', 'translateX(3px)', 'translateX(0)']
  }, { duration: 240, easing: 'linear' });
}

export function pop(el){
  if (!el) return;
  el.animate({
    transform: ['scale(.4)', 'scale(1.25)', 'scale(1)']
  }, { duration: 320, easing: 'cubic-bezier(.2,.7,.4,1)' });
}

// Count-up (Chapter 7.10)
export function countUp(el, to, ms = 600, onDone){
  if (!el) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = to;
    if (onDone) onDone();
    return;
  }
  const t0 = performance.now();
  (function tick(now){
    const k = Math.min(1, (now - t0) / ms);
    const e = 1 - Math.pow(1 - k, 3); // ease-out
    el.textContent = Math.round(to * e);
    if (k < 1) requestAnimationFrame(tick);
    else if (onDone) onDone();
  })(t0);
}
