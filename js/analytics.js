// js/analytics.js - Privacy-friendly analytics events (Phase E)
import { CONFIG } from './config.js';

/**
 * Log or dispatch a privacy-friendly custom event
 * @param {string} eventName
 * @param {object} [properties={}]
 */
export function trackEvent(eventName, properties = {}) {
  if (!CONFIG.ANALYTICS_ENABLED) return;

  const payload = {
    event: eventName,
    time: Date.now(),
    path: window.location.pathname,
    ...properties
  };

  // Dispatch custom DOM event for custom measurement endpoints
  window.dispatchEvent(new CustomEvent('naapu:analytics', { detail: payload }));
}

export function trackPageView(path = window.location.pathname) {
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

export function trackFitCheckUsed(fits) {
  trackEvent('fit_check_used', { fits });
}

export function trackDailyDone(score, streak) {
  trackEvent('daily_done', { score, streak });
}
