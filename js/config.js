// js/config.js - Central configuration for Naapu & OnlineMeasurer

export const CONFIG = {
  // Advertising configuration (Google AdSense)
  // Hard Rule: ADS_ENABLED must remain false until you approve and configure real IDs
  ADS_ENABLED: false,
  ADSENSE_CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  AD_SLOTS: {
    GUIDE_TOP: '1111111111',
    GUIDE_MID: '2222222222',
    GUIDE_BOT: '3333333333',
    HOME_BOT: '4444444444'
  },

  // Analytics configuration (honesty & privacy)
  // When 'none', zero analytics scripts load and no data is transmitted.
  // Set to 'cloudflare' with a real token to enable Cloudflare Web Analytics beacon.
  ANALYTICS_ENABLED: false,
  ANALYTICS_PROVIDER: 'none', // 'none' or 'cloudflare'
  ANALYTICS_TOKEN: 'YOUR_CLOUDFLARE_BEACON_TOKEN',

  // Site contact & metadata
  CONTACT_EMAIL: 'contact@onlinemeasurer.com',
  SITE_URL: 'https://onlinemeasurer.com'
};
