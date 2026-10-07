// js/ads.js - Consent & Ad Placement Manager (Phases 1 & D)
import { CONFIG } from './config.js';

// NOTE FOR PUBLISHER: Enable Google's "Privacy & messaging" consent message in your AdSense account
// (AdSense Dashboard -> Privacy & messaging -> GDPR / CPRA).
// When enabled, Google's Certified Consent Management Platform (CMP) will automatically provide window.__tcfapi
// for visitors in the EU/EEA/UK. In other regions where __tcfapi is not injected, ads load normally after interaction.

// Strictly allowed placements: long-text home page bottom and /guides/* pages
const ALLOWED_PLACEMENTS = new Set([
  'guide-top',
  'guide-mid',
  'guide-bot',
  'home-bot'
]);

// Forbidden sections where ads MUST NEVER appear under any circumstances
const FORBIDDEN_SECTIONS = [
  's-splash',
  's-calib',
  's-guess',
  's-measure',
  's-reveal',
  's-summary',
  's-tool',
  's-fit'
];

let scriptInjected = false;
let userInteracted = false;
let tcfListenerRegistered = false;

/**
 * Injects the official Google AdSense script tag once consent and interaction criteria are fulfilled
 */
export function loadAdSenseScript() {
  if (!CONFIG.ADS_ENABLED || scriptInjected) return;

  scriptInjected = true;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.ADSENSE_CLIENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Handles consent check via TCF v2.2 API if available; otherwise loads normally
 */
function handleConsentAndLoad() {
  if (!CONFIG.ADS_ENABLED || scriptInjected) return;

  // If window.__tcfapi exists (e.g., Google Funding Choices / CMP active in EEA/UK)
  if (typeof window.__tcfapi === 'function') {
    if (tcfListenerRegistered) return;
    tcfListenerRegistered = true;

    window.__tcfapi('addEventListener', 2, (tcData, success) => {
      if (success && tcData) {
        if (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') {
          // If GDPR does not apply or Purpose 1 (storage/access on device) is consented
          const consentGranted = tcData.gdprApplies === false ||
            (tcData.purpose && tcData.purpose.consents && tcData.purpose.consents[1]);

          if (consentGranted) {
            loadAdSenseScript();
          }
        }
      }
    });
  } else {
    // If no CMP is present in this region, load AdSense normally after first interaction
    loadAdSenseScript();
  }
}

/**
 * Verifies that the ad container is at least 150px away from interactive buttons
 */
function isFarEnoughFromButtons(slotEl) {
  if (!slotEl || typeof slotEl.getBoundingClientRect !== 'function') return true;
  const rect = slotEl.getBoundingClientRect();
  const buttons = document.querySelectorAll('button, .btn, [role="button"], a.btn');
  for (const btn of buttons) {
    if (btn.offsetParent === null) continue; // Skip hidden elements
    const bRect = btn.getBoundingClientRect();
    const vertDist = Math.min(
      Math.abs(rect.top - bRect.bottom),
      Math.abs(bRect.top - rect.bottom)
    );
    if (vertDist < 150 && !(rect.bottom < bRect.top - 150 || rect.top > bRect.bottom + 150)) {
      return false;
    }
  }
  return true;
}

/**
 * Render an ad into an allowed placement container
 * When CONFIG.ADS_ENABLED is false, this renders absolutely nothing.
 * @param {HTMLElement} container
 * @param {string} placementType
 */
export function renderAd(container, placementType) {
  // If ads are disabled in config, render nothing at all
  if (!CONFIG.ADS_ENABLED || !container) return;

  if (!ALLOWED_PLACEMENTS.has(placementType)) {
    console.warn(`Ad placement rejected: "${placementType}" is not an allowed slot.`);
    return;
  }

  // Ensure container is not inside a forbidden game section
  for (const fid of FORBIDDEN_SECTIONS) {
    if (container.closest('#' + fid)) {
      console.warn(`Ad placement blocked: inside forbidden section #${fid}`);
      return;
    }
  }

  // Enforce >=150px spacing from buttons
  if (!isFarEnoughFromButtons(container)) {
    console.warn(`Ad placement blocked: container is closer than 150px to a button.`);
    return;
  }

  let slotId = '';
  switch (placementType) {
    case 'guide-top': slotId = CONFIG.AD_SLOTS.GUIDE_TOP; break;
    case 'guide-mid': slotId = CONFIG.AD_SLOTS.GUIDE_MID; break;
    case 'guide-bot': slotId = CONFIG.AD_SLOTS.GUIDE_BOT; break;
    case 'home-bot':  slotId = CONFIG.AD_SLOTS.HOME_BOT; break;
  }

  // Render ad container with reserved fixed height to prevent CLS
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
    // Suppress AdSense push exceptions
  }
}

/**
 * Initializes the ads manager.
 * If CONFIG.ADS_ENABLED is false, it returns immediately without setting any listeners.
 */
export function initAds() {
  if (!CONFIG.ADS_ENABLED) return;

  // Mark body as ads-active so CSS reveals reserved slot heights
  document.body.classList.add('ads-active');

  function onFirstInteraction() {
    if (userInteracted) return;
    userInteracted = true;
    window.removeEventListener('pointerdown', onFirstInteraction);
    window.removeEventListener('scroll', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    handleConsentAndLoad();
  }

  window.addEventListener('pointerdown', onFirstInteraction, { passive: true });
  window.addEventListener('scroll', onFirstInteraction, { passive: true });
  window.addEventListener('keydown', onFirstInteraction, { passive: true });
}
