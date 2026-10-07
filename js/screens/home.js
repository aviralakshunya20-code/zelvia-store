// js/screens/home.js - Home World Map & Main Navigation (Chapter 5.4, 6.7)
import * as state from '../state.js';
import * as router from '../router.js';
import { WORLDS } from '../data.js';
import { worldUnlocked } from '../game.js';
import { $, $$, icon, scribble, toast } from '../ui.js';
import { naapu } from '../chars.js';
import { SFX } from '../fx.js';

router.on('s-home', render);
let warnedStorageOnce = false;

function render(){
  const s = state.get(), root = $('#s-home');
  if (state.isStorageFailed() && !warnedStorageOnce){
    warnedStorageOnce = true;
    toast('Progress save nahi hoga (Private mode)');
  }

  const isCalibrated = !!s.calib.pxPerMm;
  const userLvl = Math.min(8, Math.max(1, Math.floor(s.xp / 100) + 1));

  let cardsHtml = '';
  WORLDS.forEach((w, idx) => {
    const un = worldUnlocked(idx, s.worlds);
    const wData = s.worlds[w.id] || { best: 0, stars: 0, plays: 0 };
    if (un){
      let starsHtml = '';
      for (let i = 0; i < 3; i++) starsHtml += icon('star', { size: 20, filled: i < wData.stars });
      cardsHtml += `
        <div class="card world-card" data-wid="${w.id}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="chip">W${idx + 1}</span>
            <span class="small">${wData.best > 0 ? wData.best + ' pts' : ''}</span>
          </div>
          <div class="w-name">${w.name}</div>
          <div class="w-stars">${starsHtml}</div>
        </div>
      `;
    } else {
      cardsHtml += `
        <div class="card world-card locked" data-locked="1">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="chip">W${idx + 1}</span>
            <span>${icon('lock', { size: 20 })}</span>
          </div>
          <div class="w-name">${w.name}</div>
          <div class="small">Lock</div>
        </div>
      `;
    }
  });

  root.innerHTML = `
    <div class="screen-header">
      <div class="home-brand">
        <div style="width:44px; height:50px; overflow:hidden;">${naapu('idle')}</div>
        <span class="h1" style="font-size:28px;">Naapu</span>
      </div>
      <div class="header-right">
        <button class="btn alt" id="h-profile" aria-label="Profile" style="padding:8px 12px; min-height:44px;"><span style="font-size:18px;">Lv ${userLvl}</span></button>
        <button class="btn alt" id="h-settings" aria-label="Settings" style="padding:8px 12px; min-height:44px;">${icon('gear', { size: 22 })}</button>
      </div>
    </div>
    <div style="margin-bottom:8px;">
      <h1 class="h1">Kahan chalein?</h1>
      ${scribble(120)}
    </div>
    <div class="worlds-grid">${cardsHtml}</div>
    <div class="bottom-bar grid-3">
      <button class="btn alt" id="h-daily" style="padding:8px 4px; font-size:18px;">${!isCalibrated ? icon('lock', { size: 18 }) : ''} Daily</button>
      <button class="btn alt" id="h-fit" style="padding:8px 4px; font-size:18px;">Fit Tool</button>
      <button class="btn alt" id="h-tool" style="padding:8px 4px; font-size:18px;">${!isCalibrated ? icon('lock', { size: 18 }) : ''} Ruler</button>
    </div>
  `;

  $('#h-profile', root).onclick = () => { SFX.tap(); router.go('#profile'); };
  $('#h-settings', root).onclick = () => { SFX.tap(); router.go('#settings'); };
  $('#h-fit', root).onclick = () => { SFX.tap(); router.go('#fit'); };

  $('#h-daily', root).onclick = () => {
    if (!isCalibrated) { SFX.lock(); toast('Pehle calibrate karo'); }
    else { SFX.tap(); router.go('#daily'); }
  };
  $('#h-tool', root).onclick = () => {
    if (!isCalibrated) { SFX.lock(); toast('Pehle calibrate karo'); }
    else { SFX.tap(); router.go('#tool'); }
  };

  $$('.world-card', root).forEach(card => {
    card.onclick = () => {
      if (card.dataset.locked) { SFX.lock(); toast('Pichhla world 1 star se paar karo'); }
      else { SFX.tap(); router.go('#world/' + card.dataset.wid); }
    };
  });
}
