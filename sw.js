// sw.js - Service Worker for offline caching (Chapter 9.10)
const V = 'naapu-v3';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/PatrickHand-Regular.ttf',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/og-image.png',
  './css/base.css',
  './css/components.css',
  './css/screens.css',
  './js/config.js',
  './js/strings.js',
  './js/ads.js',
  './js/analytics.js',
  './js/guide.js',
  './js/main.js',
  './js/router.js',
  './js/state.js',
  './js/data.js',
  './js/units.js',
  './js/score.js',
  './js/fit.js',
  './js/daily.js',
  './js/calib.js',
  './js/ruler.js',
  './js/game.js',
  './js/ui.js',
  './js/fx.js',
  './js/chars.js',
  './js/screens/splash.js',
  './js/screens/calibrate.js',
  './js/screens/home.js',
  './js/screens/world.js',
  './js/screens/guess.js',
  './js/screens/measure.js',
  './js/screens/reveal.js',
  './js/screens/summary.js',
  './js/screens/daily.js',
  './js/screens/fit.js',
  './js/screens/tool.js',
  './js/screens/profile.js',
  './js/screens/settings.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V).then(c => {
      return Promise.allSettled(
        FILES.map(f => c.add(f).catch(err => console.warn('Could not cache file:', f, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => {
      return Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});
