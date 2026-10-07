// js/screens/splash.js - Splash Screen (Chapter 5.2)
import * as state from '../state.js';
import * as router from '../router.js';
import { $, scribble } from '../ui.js';
import { naapu } from '../chars.js';

router.on('s-splash', render);
let splashTimer = null;

function render(){
  const s = state.get(), root = $('#s-splash');
  if (splashTimer) clearTimeout(splashTimer);

  root.innerHTML = `
    <div class="bob-wrap" style="text-align:center;">${naapu('idle')}</div>
    <h1 class="display" style="margin-top:16px;">Naapu</h1>
    ${scribble(160)}
    <p class="body" style="margin-top:8px;">Pehle andaaza, phir naap.</p>
  `;

  function proceed(){
    if (splashTimer) clearTimeout(splashTimer);
    if (!s.calib.pxPerMm) router.go('#calib');
    else router.go('#home');
  }

  root.onclick = proceed;
  splashTimer = setTimeout(proceed, 1000);
}
