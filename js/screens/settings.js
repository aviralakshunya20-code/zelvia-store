// js/screens/settings.js - Settings Screen (Chapter 5.12, Phase 2)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, icon, scribble, toast, confirmModal } from '../ui.js';
import { SFX, haptic } from '../fx.js';
import { t, getLang, setLang } from '../strings.js';

router.on('s-settings', render);

function render(){
  const s = state.get(), root = $('#s-settings');
  const currentLang = getLang();

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="st-back" aria-label="${t('back')}">${icon('back')}</button>
      <h1 class="h1">${t('settingsTitle')}</h1>
      <div style="width:48px;"></div>
    </div>
    ${scribble(100)}
    <div class="screen-content">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">${t('settingsSound')}</span>
          <button class="btn ${s.settings.sound ? 'go' : 'alt'}" id="st-sound">
            ${s.settings.sound ? icon('sound-on') : icon('sound-off')} <span>${s.settings.sound ? t('on') : t('off')}</span>
          </button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">${t('settingsHaptics')}</span>
          <button class="btn ${s.settings.haptics ? 'go' : 'alt'}" id="st-haptics">
            <span>${s.settings.haptics ? t('on') : t('off')}</span>
          </button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">${t('settingsLanguage')}</span>
          <div style="display:flex; gap:6px;" id="st-lang">
            <button class="chip ${currentLang === 'en' ? 'active' : ''}" data-l="en">English</button>
            <button class="chip ${currentLang === 'hinglish' ? 'active' : ''}" data-l="hinglish">Hinglish</button>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span class="body">${t('settingsDefaultUnit')}</span>
          <div style="display:flex; gap:6px;" id="st-units">
            <button class="chip ${s.settings.units === 'mm' ? 'active' : ''}" data-u="mm">mm</button>
            <button class="chip ${s.settings.units === 'cm' ? 'active' : ''}" data-u="cm">cm</button>
            <button class="chip ${s.settings.units === 'in' ? 'active' : ''}" data-u="in">in</button>
          </div>
        </div>
        <button class="btn alt" id="st-recalib" style="width:100%; margin-top:12px;">${t('settingsRecalibBtn')}</button>
      </div>
      <div class="card" style="margin-top:16px;">
        <h2 class="h2">${t('settingsDangerZone')}</h2>
        <p class="small" style="margin:8px 0 12px 0;">${t('settingsResetWarning')}</p>
        <button class="btn bad" id="st-reset" style="width:100%;">${t('settingsResetBtn')}</button>
      </div>
      <p class="small" style="text-align:center; margin-top:12px;">${t('settingsIosNote')}</p>
    </div>
  `;

  $('#st-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#st-sound', root).onclick = () => { s.settings.sound = !s.settings.sound; state.save(); SFX.tap(); render(); };
  $('#st-haptics', root).onclick = () => { s.settings.haptics = !s.settings.haptics; state.save(); SFX.tap(); haptic('tap'); render(); };
  $('#st-recalib', root).onclick = () => { SFX.tap(); router.go('#calib'); };

  $('#st-lang', root).querySelectorAll('.chip').forEach(c => {
    c.onclick = () => {
      setLang(c.dataset.l);
      SFX.tap();
      render();
    };
  });

  $('#st-units', root).querySelectorAll('.chip').forEach(c => {
    c.onclick = () => { s.settings.units = c.dataset.u; state.save(); SFX.tap(); render(); };
  });

  $('#st-reset', root).onclick = () => {
    SFX.tap();
    confirmModal(t('settingsResetModal1Title'), t('settingsResetModal1Msg'), () => {
      confirmModal(t('settingsResetModal2Title'), t('settingsResetModal2Msg'), () => {
        state.reset(); SFX.bad(); toast(t('settingsResetToast')); router.go('#home');
      });
    });
  };
}
