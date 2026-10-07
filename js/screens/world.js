// js/screens/world.js - World Detail Screen (Chapter 5.5, 6.7, 7.1)
import * as game from '../game.js';
import * as state from '../state.js';
import * as router from '../router.js';
import { WORLDS, ITEMS } from '../data.js';
import { $, icon, scribble } from '../ui.js';
import { gajBaba } from '../chars.js';
import { SFX } from '../fx.js';

router.on('s-world', render);

function render(worldId = 'w1'){
  const s = state.get(), world = WORLDS.find(w => w.id === worldId) || WORLDS[0];
  const items = ITEMS.filter(i => i.world === world.id);
  const wData = s.worlds[world.id] || { best: 0, stars: 0, plays: 0 };
  const root = $('#s-world');

  let starsHtml = '';
  for (let i = 0; i < 3; i++) starsHtml += icon('star', { size: 22, filled: i < wData.stars });

  let itemsHtml = items.map(it => `<li>${it.name}</li>`).join('');

  root.innerHTML = `
    <div class="screen-header">
      <button class="btn alt" id="w-back" aria-label="Peeche jao">${icon('back')}</button>
      <div style="width:48px;"></div>
    </div>
    <div style="margin-bottom:12px;">
      <h1 class="h1">${world.name}</h1>
      ${scribble(140)}
      <p class="small">${world.about}</p>
    </div>
    ${(world.id === 'w7' || world.id === 'w8') ? `
      <div class="card" style="display:flex; align-items:center; gap:12px; margin-bottom:12px; background:var(--paper2);">
        ${gajBaba()}<div><div class="h2">Gaj Baba:</div><p class="small">"Bade naap hain beta, sambhal kar andaaza lagana!"</p></div>
      </div>
    ` : ''}
    <div class="card" style="margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="body">Best: ${wData.best > 0 ? wData.best + ' pts' : 'Nahi khela abhi'}</div>
        <div style="display:flex; gap:4px;">${starsHtml}</div>
      </div>
    </div>
    <div class="card">
      <h2 class="h2" style="margin-bottom:8px;">5 Items is set mein:</h2>
      <ul class="world-items-list">${itemsHtml}</ul>
    </div>
    <div class="bottom-bar center">
      <button class="btn go" id="w-play" style="width:100%;">Khelo</button>
    </div>
  `;

  $('#w-back', root).onclick = () => { SFX.tap(); router.go('#home'); };
  $('#w-play', root).onclick = () => { SFX.tap(); game.startSet(world.id); router.go('#guess'); };
}
