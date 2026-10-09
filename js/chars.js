// js/chars.js - Hand-drawn SVG character generators (Chapter 7.1 - 7.3)
const INK = '#2B2118';

export function naapu(expr = 'idle'){
  const eyes = {
    idle:  '<circle cx="48" cy="52" r="5"/><circle cx="72" cy="52" r="5"/>',
    happy: `<path d="M42 54 Q48 45 54 54 M66 54 Q72 45 78 54" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
    sad:   `<circle cx="48" cy="54" r="5"/><circle cx="72" cy="54" r="5"/><path d="M40 44 L54 48 M80 44 L66 48" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
    think: '<circle cx="50" cy="50" r="5"/><circle cx="74" cy="50" r="5"/>',
    wow:   `<circle cx="48" cy="52" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="72" cy="52" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="48" cy="52" r="2.5"/><circle cx="72" cy="52" r="2.5"/>`
  }[expr] || '<circle cx="48" cy="52" r="5"/><circle cx="72" cy="52" r="5"/>';

  const mouth = {
    idle:  `<path d="M52 74 Q60 80 68 74" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    happy: `<path d="M48 70 Q60 88 72 70 Z" fill="${INK}"/>`,
    sad:   `<path d="M52 80 Q60 72 68 80" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    think: `<path d="M54 76 H66" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`,
    wow:   `<ellipse cx="60" cy="78" rx="6" ry="8" fill="${INK}"/>`
  }[expr] || `<path d="M52 74 Q60 80 68 74" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;

  const arms = (expr === 'happy' || expr === 'wow') ? 'M26 92 L8 70 M94 92 L112 70' : 'M26 96 L10 110 M94 96 L110 110';
  let ticks = '';
  for (let i = 0; i < 20; i++) ticks += `<path d="M26 ${18 + i * 6} H${26 + (i % 5 === 0 ? 14 : 8)}"/>`;

  return `<svg viewBox="0 0 120 164" width="120" height="164" role="img" aria-label="Mezur ${expr}" class="char-svg">
    <g fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"><path d="${arms}"/></g>
    <rect x="40" y="144" width="14" height="14" rx="3" fill="${INK}"/>
    <rect x="66" y="144" width="14" height="14" rx="3" fill="${INK}"/>
    <rect x="26" y="8" width="68" height="138" rx="9" fill="#F3B73B" stroke="${INK}" stroke-width="4"/>
    <g stroke="${INK}" stroke-width="2.5" stroke-linecap="round">${ticks}</g>
    <circle cx="42" cy="64" r="5" fill="#F4A58A"/><circle cx="78" cy="64" r="5" fill="#F4A58A"/>
    <g fill="${INK}" class="char-eyes">${eyes}</g>${mouth}
  </svg>`;
}

export function fita(expr = 'think'){
  return `<svg viewBox="0 0 120 120" width="100" height="100" role="img" aria-label="Fita snail" class="char-svg">
    <ellipse cx="52" cy="98" rx="36" ry="12" fill="#F4A58A" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="24" cy="88" r="12" fill="#F4A58A" stroke="${INK}" stroke-width="3.5"/>
    <line x1="20" y1="78" x2="16" y2="62" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <line x1="28" y1="78" x2="32" y2="62" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="16" cy="${expr === 'think' ? 61 : 62}" r="3" fill="${INK}"/>
    <circle cx="32" cy="62" r="3" fill="${INK}"/>
    <circle cx="60" cy="58" r="30" fill="#6FB1D6" stroke="${INK}" stroke-width="4"/>
    <path d="M60 58 a6 6 0 1 1 6 6 a12 12 0 1 1 -12 -12 a18 18 0 1 1 18 18" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <g stroke="${INK}" stroke-width="2" stroke-linecap="round">
      <line x1="60" y1="28" x2="60" y2="34"/><line x1="75" y1="32" x2="71" y2="37"/><line x1="86" y1="44" x2="81" y2="47"/>
      <line x1="90" y1="58" x2="84" y2="58"/><line x1="86" y1="72" x2="81" y2="69"/><line x1="75" y1="84" x2="71" y2="79"/>
    </g>
  </svg>`;
}

export function chhotu(){
  const w = 'M40 20 V90 a20 20 0 0 0 40 0 V30 a10 10 0 0 0 -20 0 V84';
  return `<svg viewBox="0 0 120 120" width="80" height="80" role="img" aria-label="Chhotu paperclip" class="char-svg">
    <path d="${w}" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${w}" fill="none" stroke="#9AA5AD" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="92" r="3.5" fill="${INK}"/><circle cx="70" cy="92" r="3.5" fill="${INK}"/>
    <path d="M54 102 Q60 108 66 102" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

export function gajBaba(){
  let ticks = '';
  for (let i = 0; i < 12; i++) ticks += `<line x1="${16 + i * 8}" y1="40" x2="${16 + i * 8}" y2="${40 + (i % 2 === 0 ? 14 : 8)}"/>`;
  return `<svg viewBox="0 0 120 120" width="100" height="100" role="img" aria-label="Gaj Baba" class="char-svg">
    <rect x="10" y="40" width="100" height="36" rx="6" fill="#B9783F" stroke="${INK}" stroke-width="4"/>
    <g stroke="${INK}" stroke-width="2.5" stroke-linecap="round">${ticks}</g>
    <circle cx="44" cy="58" r="4.5" fill="${INK}"/><circle cx="76" cy="58" r="4.5" fill="${INK}"/>
    <line x1="36" y1="48" x2="52" y2="52" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <line x1="84" y1="48" x2="68" y2="52" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 66 Q60 76 76 66 Q60 70 44 66" fill="${INK}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`;
}

export function startBlinkLoop(containerEl){
  let timerId = null;
  function scheduleBlink(){
    timerId = setTimeout(() => {
      const eyesEl = containerEl.querySelector('.char-eyes');
      if (eyesEl) {
        const orig = eyesEl.innerHTML;
        eyesEl.innerHTML = `<path d="M42 54 Q48 45 54 54 M66 54 Q72 45 78 54" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
        setTimeout(() => { if (eyesEl) eyesEl.innerHTML = orig; scheduleBlink(); }, 120);
      } else scheduleBlink();
    }, 3000 + Math.random() * 2000);
  }
  scheduleBlink();
  return () => clearTimeout(timerId);
}

export { naapu as mezur };
