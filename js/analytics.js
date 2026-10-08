// js/analytics.js - Analytics engine (Cloudflare Web Analytics beacon + local debugging events)
import { CONFIG } from './config.js';

/**
 * Loads Cloudflare Web Analytics JavaScript beacon if provider is 'cloudflare' and a valid token is set.
 * Cloudflare Web Analytics operates automatically on page load to measure page views and Core Web Vitals.
 */
export function initAnalytics() {
  if (typeof document === 'undefined') return;

  if (CONFIG.ANALYTICS_PROVIDER === 'cloudflare' &&
      CONFIG.ANALYTICS_TOKEN &&
      CONFIG.ANALYTICS_TOKEN !== 'YOUR_CLOUDFLARE_BEACON_TOKEN') {

    const loadBeacon = () => {
      if (document.getElementById('cf-beacon-script')) return;
      const s = document.createElement('script');
      s.id = 'cf-beacon-script';
      s.defer = true;
      s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      s.setAttribute('data-cf-beacon', JSON.stringify({ token: CONFIG.ANALYTICS_TOKEN }));
      document.body.appendChild(s);
    };

    if (document.readyState === 'complete') {
      loadBeacon();
    } else {
      window.addEventListener('load', loadBeacon, { once: true });
    }
  }
}

/**
 * Log or dispatch a custom analytics event for local debugging.
 * Note: Cloudflare Web Analytics collects page views only, not custom events.
 * The DOM event ('naapu:analytics') is dispatched locally for console debugging and test inspection.
 * @param {string} eventName
 * @param {object} [properties={}]
 */
export function trackEvent(eventName, properties = {}) {
  const payload = {
    event: eventName,
    time: Date.now(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...properties
  };

  // Dispatch custom DOM event for local debugging & test verification
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('naapu:analytics', { detail: payload }));
  }

  // Forward to Google Analytics 4 if available
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, properties);
  }
}

export function trackPageView(path = typeof window !== 'undefined' ? window.location.pathname : '/') {
  trackEvent('page_view', { path });
}

export function trackSetStarted(worldId) {
  trackEvent('set_started', { worldId });
}

export function trackSetFinished(worldId, score, stars) {
  trackEvent('set_finished', { worldId, score, stars });
}

export function trackRulerUsed(unit) {
  trackEvent('ruler_used', { unit });
}

export function trackFitUsed(fits) {
  trackEvent('fit_used', { fits });
}

export function trackFitCheckUsed(fits) {
  trackEvent('fit_used', { fits });
}

export function trackDailyDone(score, streak) {
  trackEvent('daily_done', { score, streak });
}

// Auto-run beacon check on script load in browser
if (typeof window !== 'undefined') {
  initAnalytics();
}
