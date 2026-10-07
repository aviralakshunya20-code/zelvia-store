// js/ui.js - Small DOM helpers, icons, toast and dialogs (Chapter 4.7)

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function el(tag, attrs = {}, children = []){
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)){
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) e.setAttribute(k, '');
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  if (!Array.isArray(children)) children = [children];
  for (const c of children){
    if (c != null) e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
  return e;
}

const ICONS = {
  back: '<path d="M15 4 L7 12 L15 20"/>',
  home: '<path d="M3 12 L12 4 L21 12 M6 10 V20 H18 V10"/>',
  check: '<path d="M4 13 L9 18 L20 6"/>',
  cross: '<path d="M5 5 L19 19 M19 5 L5 19"/>',
  star: '<polygon points="12,2 15,9 22,9.5 16.5,14.5 18,22 12,18 6,22 7.5,14.5 2,9.5 9,9"/>',
  lock: '<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8 11 V8 a4 4 0 0 1 8 0 V11"/>',
  'sound-on': '<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z M16 9 Q19 12 16 15"/>',
  'sound-off': '<path d="M4 9 H8 L13 5 V19 L8 15 H4 Z M16 9 L21 15 M21 9 L16 15"/>',
  gear: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M19 5 L17 7 M5 19 L7 17"/>',
  ruler: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6 V10 M11 6 V9 M15 6 V10 M19 6 V9"/>'
};

export function icon(name, { filled = false, size = 24, stroke = '#2B2118' } = {}){
  const inner = ICONS[name] || '';
  const fillVal = (name === 'star' && filled) ? '#F3B73B' : 'none';
  return `<svg class="icon" viewBox="0 0 24 24" width="${size}" height="${size}" role="img" aria-label="${name}" style="stroke:${stroke};fill:${fillVal}">${inner}</svg>`;
}

export function scribble(width = 120){
  return `<svg class="scribble" width="${width}" height="8" viewBox="0 0 120 8" aria-hidden="true"><path d="M2 5 Q30 1 60 5 T118 4" fill="none" stroke="#E4572E" stroke-width="3" stroke-linecap="round"/></svg>`;
}

let toastTimer = null;
export function toast(msg){
  const live = $('#live');
  if (live) live.textContent = msg;

  let t = $('.toast');
  if (t) t.remove();
  if (toastTimer) clearTimeout(toastTimer);

  t = document.createElement('div');
  t.className = 'toast';
  t.role = 'alert';
  t.textContent = msg;
  document.body.appendChild(t);

  toastTimer = setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 200);
  }, 2000);
}

export function confirmModal(title, msg, onOk, onCancel){
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.innerHTML = `
    <div class="dialog-box">
      <h2 class="h2">${title}</h2>
      <p class="body">${msg}</p>
      <div class="bottom-bar grid-2">
        <button class="btn alt" id="modal-cancel">Nahi</button>
        <button class="btn bad" id="modal-ok">Haan</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  $('#modal-cancel', overlay).onclick = () => { overlay.remove(); if (onCancel) onCancel(); };
  $('#modal-ok', overlay).onclick = () => { overlay.remove(); if (onOk) onOk(); };
}
