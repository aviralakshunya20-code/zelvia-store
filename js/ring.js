// js/ring.js - On-screen ring sizer: match a circle to a ring's inner edge, read US / UK / EU size
import { currentScale } from './calib.js';

// US size → inner diameter (mm), standard linear chart: d = 11.63 + 0.8128 × US
export const usToDiameter = us => 11.63 + 0.8128 * us;
export const diameterToUs = d => (d - 11.63) / 0.8128;

// Approximate UK letter for each US half size (jewellers' charts vary slightly)
const UK = {
  3: 'F½', 3.5: 'G½', 4: 'H½', 4.5: 'I½', 5: 'J½', 5.5: 'K½', 6: 'L½', 6.5: 'M½', 7: 'N½', 7.5: 'O½',
  8: 'P½', 8.5: 'Q½', 9: 'R½', 9.5: 'S½', 10: 'T½', 10.5: 'U½', 11: 'V½', 11.5: 'W½', 12: 'Y', 12.5: 'Z', 13: 'Z+1'
};

export const SIZES = Object.keys(UK).map(Number).sort((a, b) => a - b).map(us => {
  const d = usToDiameter(us);
  return { us, uk: UK[us], diameter: d, circumference: Math.PI * d, eu: Math.round(Math.PI * d) };
});

export function nearestSize(diameterMm){
  return SIZES.reduce((best, s) => Math.abs(s.diameter - diameterMm) < Math.abs(best.diameter - diameterMm) ? s : best, SIZES[0]);
}

function init(){
  const root = document.getElementById('ring-app');
  if (!root) return;
  const { pxPerMm, calibrated } = currentScale();

  const circle = root.querySelector('#ring-circle');
  const slider = root.querySelector('#ring-slider');
  const out = {
    d: root.querySelector('#ring-d'),
    c: root.querySelector('#ring-c'),
    us: root.querySelector('#ring-us'),
    uk: root.querySelector('#ring-uk'),
    eu: root.querySelector('#ring-eu'),
  };
  const rows = [...document.querySelectorAll('#ring-table tbody tr')];
  root.querySelector('#ring-calib-note').hidden = calibrated;

  let d = 17.3; // US 7, the most common size

  function render(){
    const px = d * pxPerMm;
    circle.style.width = circle.style.height = `${px}px`;
    const size = nearestSize(d);
    out.d.textContent = `${d.toFixed(1)} mm`;
    out.c.textContent = `${(Math.PI * d).toFixed(1)} mm`;
    out.us.textContent = String(size.us);
    out.uk.textContent = size.uk;
    out.eu.textContent = String(size.eu);
    slider.value = String(d);
    rows.forEach(r => r.classList.toggle('row-active', Number(r.dataset.us) === size.us));
  }

  slider.addEventListener('input', () => { d = parseFloat(slider.value); render(); });
  root.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => {
    d = Math.min(23.5, Math.max(13.5, Math.round((d + parseFloat(b.dataset.step)) * 10) / 10));
    render();
  }));
  rows.forEach(r => r.addEventListener('click', () => { d = usToDiameter(Number(r.dataset.us)); render(); }));

  render();
}

init();
