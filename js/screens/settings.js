// js/screens/settings.js - Settings Screen (Chapter 5.12)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, icon, scribble, toast, confirmModal } from '../ui.js';
import { SFX, haptic } from '../fx.js';

router.on('s-settings', render);

function render(){
  const s = state.get(), root = $('#s-settings');

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="st-back" aria-label="Peeche jao">${icon('back')}</button>
      <h1 class="h1">Settings</h1>
      <div style="width:48px;"></div>
    </div>
    ${scribble(100)}
    <div class="screen-content">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">Awaaz (Sound):</span>
          <button class="btn ${s.settings.sound ? 'go' : 'alt'}" id="st-sound">
            ${s.settings.sound ? icon('sound-on') : icon('sound-off')} <span>${s.settings.sound ? 'ON' : 'OFF'}</span>
          </button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">Vibration (Haptics):</span>
          <button class="btn ${s.settings.haptics ? 'go' : 'alt'}" id="st-haptics">
            <span>${s.settings.haptics ? 'ON' : 'OFF'}</span>
          </button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">Ruler default unit:</span>
          <div style="display:flex; gap:6px;" id="st-units">
            <button class="chip ${s.settings.units === 'mm' ? 'active' : ''}" data-u="mm">mm</button>
            <button class="chip ${s.settings.units === 'cm' ? 'active' : ''}" data-u="cm">cm</button>
            <button class="chip ${s.settings.units === 'in' ? 'active' : ''}" data-u="in">in</button>
          </div>
        </div>
        <button class="btn alt" id="st-recalib" style="width:100%; margin-top:12px;">Dobara calibrate karein</button>
      </div>
      <div class="card" style="margin-top:16px;">
        <h2 class="h2">Khatre ki Jagah</h2>
        <p class="small" style="margin:8px 0 12px 0;">Browser saaf karne par progress chali jaati hai. Sab reset karna hai to neeche dabayein:</p>
        <button class="btn bad" id="st-reset" style="width:100%;">Progress Reset Karein</button>
      </div>
      <p class="small" style="text-align:center; margin-top:12px;">iPhone par silent switch ON hone par sound band ho sakta hai.</p>
    </div>
  `;

  $('#st-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#st-sound', root).onclick = () => { s.settings.sound = !s.settings.sound; state.save(); SFX.tap(); render(); };
  $('#st-haptics', root).onclick = () => { s.settings.haptics = !s.settings.haptics; state.save(); SFX.tap(); haptic('tap'); render(); };
  $('#st-recalib', root).onclick = () => { SFX.tap(); router.go('#calib'); };

  $('#st-units', root).querySelectorAll('.chip').forEach(c => {
    c.onclick = () => { s.settings.units = c.dataset.u; state.save(); SFX.tap(); render(); };
  });

  $('#st-reset', root).onclick = () => {
    SFX.tap();
    confirmModal('Sab kuch mita dein?', 'Aapki saari progress, XP aur unlocked worlds reset ho jayenge.', () => {
      confirmModal('Pakka?', 'Ye wapas nahi aayega. Kya aap 100% sure hain?', () => {
        state.reset(); SFX.bad(); toast('Sab kuch reset ho gaya.'); router.go('#home');
      });
    });
  };
}
