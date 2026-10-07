// js/screens/measure.js - Bonus Measure Screen (Chapter 5.7, 6.2)
import * as game from '../game.js';
import * as state from '../state.js';
import * as router from '../router.js';
import { $, scribble, toast, confirmModal } from '../ui.js';
import { mountRuler } from '../ruler.js';
import { maxMeasureMm } from '../calib.js';
import { SFX } from '../fx.js';

router.on('s-measure', render);
let rulerInstance = null;

function render(){
  const run = game.getRun(), item = game.current(), s = state.get();
  if (!run || !item) return router.go('#home');
  if (!s.calib.pxPerMm) return router.go('#calib');
  if (rulerInstance) { rulerInstance.destroy(); rulerInstance = null; }

  const root = $('#s-measure');
  if (window.visualViewport && Math.abs(window.visualViewport.scale - 1) > 0.01) {
    toast('Zoom badla hai. Dobara calibrate karo.');
  }

  const isLandscape = window.innerWidth >= window.innerHeight;
  const isVertical = !isLandscape;
  const pxPerMm = s.calib.pxPerMm;
  const axisPx = isVertical ? window.innerHeight : Math.min(window.innerWidth, 480);
  const maxMm = Math.min(maxMeasureMm(pxPerMm, axisPx), Math.ceil(item.mm + 20));

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="m-quit" aria-label="Set chhodo">X</button>
      <h1 class="h1" style="font-size:26px;">Bonus naap</h1>
    </div>
    ${scribble(120)}
    <p class="body" style="text-align:center; margin-bottom:12px;">Asli ${item.name} ko ruler ke 0 se laga kar marker kheencho:</p>
    <div class="ruler-container" id="m-ruler-box"></div>
    <div style="text-align:center; margin:12px 0;"><div class="bignum" id="m-readout">0.0 mm</div></div>
    <div class="bottom-bar grid-2">
      <button class="btn alt" id="m-skip">Rehne do</button>
      <button class="btn go" id="m-lock">Naap liya</button>
    </div>
  `;

  $('#m-quit', root).onclick = () => {
    SFX.tap();
    confirmModal('Set chhodna hai?', 'Ye set ka score nahi judega.', () => {
      game.abandonSet(); router.go('#home');
    });
  };

  const readout = $('#m-readout', root);
  rulerInstance = mountRuler($('#m-ruler-box', root), {
    pxPerMm, vertical: isVertical, maxMm,
    onChange: val => { readout.textContent = val.toFixed(1) + ' mm'; }
  });

  $('#m-skip', root).onclick = () => {
    SFX.tap();
    game.submit(game.getPendingGuess(), null);
    router.go('#reveal');
  };

  $('#m-lock', root).onclick = () => {
    SFX.tap();
    game.submit(game.getPendingGuess(), rulerInstance ? rulerInstance.get() : 0);
    router.go('#reveal');
  };
}
