// js/screens/splash.js - Splash Screen (Chapter 5.2)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, scribble } from '../ui.js';
import { naapu } from '../chars.js';
import { t } from '../strings.js';

router.on('s-splash', render);
let splashTimer = null;

function render(){
  const s = state.get(), root = $('#s-splash');
  if (splashTimer) clearTimeout(splashTimer);

  root.innerHTML = `
    <div class="bob-wrap" style="text-align:center;">${naapu('idle')}</div>
    <div class="display" role="heading" aria-level="2" style="margin-top:16px;">Mezur</div>
    ${scribble(160)}
    <p class="body" style="margin-top:8px;">${t('splashTagline')}</p>
  `;

  function proceed(){
    if (splashTimer) clearTimeout(splashTimer);
    if (!s.calib.pxPerMm) router.go('#calib');
    else router.go('#home');
  }

  root.onclick = proceed;
  splashTimer = setTimeout(proceed, 1000);
}
