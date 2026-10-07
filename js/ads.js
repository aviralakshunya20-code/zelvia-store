// js/ads.js - Consent & Ad Placement Manager (Phase D & E)
import { CONFIG } from './config.js';

// Allowed placement types
const ALLOWED_PLACEMENTS = new Set([
  'guide-top',
  'guide-mid',
  'guide-bot',
  'home-bot',
  'summary'
]);

// Forbidden screen IDs / areas where ads MUST NEVER appear
const FORBIDDEN_SECTIONS = [
  's-splash',
  's-calib',
  's-guess',
  's-measure',
  's-reveal',
  's-tool',
  's-fit'
];

let scriptInjected = false;
let userInteracted = false;

/**
 * Consent hook: checks if user has given consent for personalized / non-personalized ads.
 * You can connect Google User Messaging Platform (UMP) or Funding Choices here.
 */
export function hasUserConsent() {
  if (typeof window === 'undefined') return false;
  // If Google CMP (TCF) is present, check __tcfapi status
  if (window.__tcfapi) {
    let tcfConsented = false;
    window.__tcfapi('getTCData', 2, (tcData, success) => {
      if (success && tcData) tcfConsented = true;
    });
    return tcfConsented;
  }
  // Otherwise check local consent flag (default to true if non-EEA, or false if strictly pending)
  const stored = localStorage.getItem('naapu_ad_consent');
  return stored === 'granted';
}

/**
 * Hook to record user consent
 */
export function setUserConsent(granted = true) {
  localStorage.setItem('naapu_ad_consent', granted ? 'granted' : 'denied');
  if (granted && CONFIG.ADS_ENABLED && userInteracted) {
    loadAdSenseScript();
  }
}

/**
 * Lazy loads AdSense script only after user interaction & verified consent
 */
function loadAdSenseScript() {
  if (!CONFIG.ADS_ENABLED || scriptInjected) return;
  if (!hasUserConsent()) return;

  scriptInjected = true;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.ADSENSE_CLIENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Checks vertical distance from all buttons to enforce the strict >=150px rule
 */
function isFarEnoughFromButtons(slotEl) {
  const rect = slotEl.getBoundingClientRect();
  const buttons = document.querySelectorAll('button, .btn, [role="button"], a.btn');
  for (const btn of buttons) {
    if (btn.offsetParent === null) continue; // Hidden button
    const bRect = btn.getBoundingClientRect();
    const vertDist = Math.min(
      Math.abs(rect.top - bRect.bottom),
      Math.abs(bRect.top - rect.bottom)
    );
    // If elements overlap or are within 150px vertically
    if (vertDist < 150 && !(rect.bottom < bRect.top - 150 || rect.top > bRect.bottom + 150)) {
      // Check if button is actually nearby
      return false;
    }
  }
  return true;
}

/**
 * Render an ad into a designated container
 * @param {HTMLElement} container
 * @param {string} placementType
 */
export function renderAd(container, placementType) {
  if (!CONFIG.ADS_ENABLED) return;
  if (!ALLOWED_PLACEMENTS.has(placementType)) {
    console.warn(`Ad placement rejected: "${placementType}" is not an allowed slot.`);
    return;
  }

  // Ensure container is not inside a forbidden section
  for (const fid of FORBIDDEN_SECTIONS) {
    if (container.closest('#' + fid)) {
      console.warn(`Ad placement blocked: inside forbidden section #${fid}`);
      return;
    }
  }

  // Enforce 150px spacing rule
  if (!isFarEnoughFromButtons(container)) {
    console.warn(`Ad placement blocked: container is closer than 150px to an interactive button.`);
    return;
  }

  let slotId = '';
  switch (placementType) {
    case 'guide-top': slotId = CONFIG.AD_SLOTS.GUIDE_TOP; break;
    case 'guide-mid': slotId = CONFIG.AD_SLOTS.GUIDE_MID; break;
    case 'guide-bot': slotId = CONFIG.AD_SLOTS.GUIDE_BOT; break;
    case 'home-bot':  slotId = CONFIG.AD_SLOTS.HOME_BOT; break;
    case 'summary':   slotId = CONFIG.AD_SLOTS.SUMMARY_BOT; break;
  }

  // Build ins element with fixed height container to prevent CLS
  container.innerHTML = `
    <div class="ad-notice">Advertisement</div>
    <ins class="adsbygoogle"
         style="display:block;width:100%;"
         data-ad-client="${CONFIG.ADSENSE_CLIENT_ID}"
         data-ad-slot="${slotId}"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  `;

  try {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (err) {
    // Suppress AdSense push errors
  }
}

/**
 * Initialize ads manager and setup lazy-interaction listener
 */
export function initAds() {
  if (!CONFIG.ADS_ENABLED) return;

  function onFirstInteraction() {
    userInteracted = true;
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('scroll', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    loadAdSenseScript();
  }

  window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
  window.addEventListener('scroll', onFirstInteraction, { passive: true });
  window.addEventListener('keydown', onFirstInteraction, { passive: true });
}
