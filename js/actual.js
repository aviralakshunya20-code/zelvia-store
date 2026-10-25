// js/actual.js - Show everyday objects at actual (1:1) size on screen
import { currentScale } from './calib.js';

// Dimensions in millimetres. Circles use w = diameter.
export const OBJECTS = [
  { id: 'card', group: 'Cards & photos', name: 'Bank / credit card', w: 85.6, h: 53.98, shape: 'rect', note: 'ISO/IEC 7810 ID-1 — same as Aadhaar PVC, PAN and driving licence cards' },
  { id: 'passport-photo', group: 'Cards & photos', name: 'Passport photo (India, UK, EU)', w: 35, h: 45, shape: 'rect', note: '35 × 45 mm' },
  { id: 'us-passport-photo', group: 'Cards & photos', name: 'US passport photo', w: 50.8, h: 50.8, shape: 'rect', note: '2 × 2 inches' },
  { id: 'stamp-photo', group: 'Cards & photos', name: 'Stamp-size photo', w: 20, h: 25, shape: 'rect', note: '20 × 25 mm, used on many Indian forms' },
  { id: 'mini-sim', group: 'SIM & memory cards', name: 'Mini SIM (2FF)', w: 25, h: 15, shape: 'rect', note: '25 × 15 mm' },
  { id: 'micro-sim', group: 'SIM & memory cards', name: 'Micro SIM (3FF)', w: 15, h: 12, shape: 'rect', note: '15 × 12 mm' },
  { id: 'nano-sim', group: 'SIM & memory cards', name: 'Nano SIM (4FF)', w: 12.3, h: 8.8, shape: 'rect', note: '12.3 × 8.8 mm' },
  { id: 'microsd', group: 'SIM & memory cards', name: 'microSD card', w: 11, h: 15, shape: 'rect', note: '11 × 15 mm' },
  { id: 'sd', group: 'SIM & memory cards', name: 'SD card', w: 24, h: 32, shape: 'rect', note: '24 × 32 mm' },
  { id: 'inr-1', group: 'Indian coins (2019 series)', name: '₹1 coin', w: 20, shape: 'circle', note: '20 mm diameter' },
  { id: 'inr-2', group: 'Indian coins (2019 series)', name: '₹2 coin', w: 23, shape: 'circle', note: '23 mm diameter' },
  { id: 'inr-5', group: 'Indian coins (2019 series)', name: '₹5 coin', w: 25, shape: 'circle', note: '25 mm diameter' },
  { id: 'inr-10', group: 'Indian coins (2019 series)', name: '₹10 coin', w: 27, shape: 'circle', note: '27 mm diameter' },
  { id: 'inr-20', group: 'Indian coins (2019 series)', name: '₹20 coin', w: 27, shape: 'circle', note: '27 mm, 12-sided' },
  { id: 'us-penny', group: 'US coins', name: 'Penny (1¢)', w: 19.05, shape: 'circle', note: '19.05 mm diameter' },
  { id: 'us-nickel', group: 'US coins', name: 'Nickel (5¢)', w: 21.21, shape: 'circle', note: '21.21 mm diameter' },
  { id: 'us-dime', group: 'US coins', name: 'Dime (10¢)', w: 17.91, shape: 'circle', note: '17.91 mm diameter' },
  { id: 'us-quarter', group: 'US coins', name: 'Quarter (25¢)', w: 24.26, shape: 'circle', note: '24.26 mm diameter' },
  { id: 'aa', group: 'Batteries', name: 'AA battery', w: 50.5, h: 14.5, shape: 'rect', note: '50.5 × 14.5 mm' },
  { id: 'aaa', group: 'Batteries', name: 'AAA battery', w: 44.5, h: 10.5, shape: 'rect', note: '44.5 × 10.5 mm' },
  { id: 'cr2032', group: 'Batteries', name: 'CR2032 coin cell', w: 20, shape: 'circle', note: '20 mm diameter' },
];

function init(){
  const root = document.getElementById('actual-app');
  if (!root) return;
  const { pxPerMm, calibrated } = currentScale();
  root.querySelector('#actual-calib-note').hidden = calibrated;

  const select = root.querySelector('#actual-select');
  const stage = root.querySelector('#actual-stage');
  const label = root.querySelector('#actual-label');

  // Grouped picker
  const groups = [...new Set(OBJECTS.map(o => o.group))];
  select.innerHTML = groups.map(g =>
    `<optgroup label="${g}">${OBJECTS.filter(o => o.group === g).map(o => `<option value="${o.id}">${o.name}</option>`).join('')}</optgroup>`
  ).join('');

  function show(id){
    const o = OBJECTS.find(x => x.id === id) || OBJECTS[0];
    const w = o.w * pxPerMm;
    const h = (o.shape === 'circle' ? o.w : o.h) * pxPerMm;
    const shape = o.shape === 'circle'
      ? `<div class="actual-obj actual-circle" style="width:${w}px;height:${h}px"></div>`
      : `<div class="actual-obj" style="width:${w}px;height:${h}px"></div>`;
    stage.innerHTML = shape;
    label.innerHTML = `<b>${o.name}</b><span>${o.note}</span>`;
    select.value = o.id;
    if (history.replaceState) history.replaceState(null, '', `#${o.id}`);
  }

  select.addEventListener('change', () => show(select.value));
  document.querySelectorAll('[data-show]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    show(a.dataset.show);
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  show(location.hash.slice(1) || 'card');
}

init();
