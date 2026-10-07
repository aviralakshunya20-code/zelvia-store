// js/guide.js - Lightweight script for static guide and trust pages (Phase B, C, D)
import { initAds, renderAd } from './ads.js';
import { trackPageView } from './analytics.js';
import { makePaper } from './fx.js';

// Apply subtle paper background texture
makePaper();

// Record privacy-friendly page view
trackPageView();

// Initialize ads listener
initAds();

// Populate allowed ad slots on guide pages
const topSlot = document.getElementById('ad-guide-top');
if (topSlot) renderAd(topSlot, 'guide-top');

const midSlot = document.getElementById('ad-guide-mid');
if (midSlot) renderAd(midSlot, 'guide-mid');

const botSlot = document.getElementById('ad-guide-bot');
if (botSlot) renderAd(botSlot, 'guide-bot');
