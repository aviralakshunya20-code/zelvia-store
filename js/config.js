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
    HOME_BOT: '4444444444',
    SUMMARY_BOT: '5555555555'
  },

  // Privacy-friendly analytics flag
  ANALYTICS_ENABLED: false,

  // Site contact & metadata
  CONTACT_EMAIL: 'contact@onlinemeasurer.com',
  SITE_URL: 'https://onlinemeasurer.com'
};
