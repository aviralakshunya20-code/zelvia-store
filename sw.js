// sw.js - Service Worker for offline caching (Chapter 9.10)
const V = 'naapu-v5';
const FILES = [
  './',
  './index.html',
  './favicon.ico',
  './favicon.png',
  './manifest.webmanifest',
  './assets/favicon-32x32.png',
  './assets/favicon-16x16.png',
  './assets/apple-touch-icon.png',
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
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // ads, analytics: always network

  // Pages: network first so new deploys show up, cached copy when offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(V).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});
