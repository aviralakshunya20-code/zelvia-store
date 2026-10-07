// js/main.js - Application entry point (Chapter 9.10)
import * as state from './state.js';
import * as router from './router.js';
import { makePaper } from './fx.js';
import { toast } from './ui.js';
import { viewOk } from './calib.js';

// Import all screens to register router listeners
import './screens/splash.js';
import './screens/calibrate.js';
import './screens/home.js';
import './screens/world.js';
import './screens/guess.js';
import './screens/measure.js';
import './screens/reveal.js';
import './screens/summary.js';
import './screens/daily.js';
import './screens/fit.js';
import './screens/tool.js';
import './screens/profile.js';
import './screens/settings.js';

import { initAds, renderAd } from './ads.js';
import { trackPageView } from './analytics.js';

// Initialize
state.load();
makePaper();
router.start();
trackPageView();
initAds();

// If on home page, render bottom ad container
const homeAd = document.getElementById('ad-home-bottom');
if (homeAd) renderAd(homeAd, 'home-bot');

// Service Worker registration with update listener (Chapter 9.10, 10.1 #14)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            toast('Naya version. Refresh karo.');
          }
        });
      }
    });
  }).catch(() => {});
}

// Window resize & orientation change handler (Chapter 10.1 #1)
let resizeTimeout = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Check if calibration became invalid due to browser zoom (Chapter 10.1 #2)
    const s = state.get();
    if (s.calib.pxPerMm && !viewOk()) {
      toast('Zoom badla hai. Dobara calibrate karo.');
    }
  }, 300);
});
