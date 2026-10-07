// js/strings.js - Multilingual localization engine (Phase 2)
// Dictionaries: "en" (default) and "hinglish"
import * as state from './state.js';

export const STRINGS = {
  en: {
    // Common
    back: 'Back',
    cancel: 'Cancel',
    done: 'Done',
    skip: 'Skip',
    quit: 'Quit',
    lock: 'Locked',
    on: 'ON',
    off: 'OFF',
    pts: 'pts',
    level: 'Level',
    xp: 'XP',
    streak: 'Streak',

    // Splash
    splashTagline: 'Measure everything without a ruler',
    splashStart: 'Start Playing',

    // Calibrate
    calibTitle: 'Calibrate Your Screen',
    calibDesc: 'Place any standard credit, debit, or ATM card on the screen. Adjust the slider until the outline matches the card edge.',
    calibStandardCard: '85.6 mm (standard bank card)',
    calibDoneBtn: 'Done',
    calibZoomChanged: 'Zoom changed. Please recalibrate.',

    // Home Hub
    homeBrand: 'Naapu',
    homeChooseWorld: 'Where to next?',
    homePlayPrev: 'Complete previous world with at least 1 star',
    homeStorageWarn: 'Progress will not save (Private mode)',
    homeToolRuler: 'Ruler',
    homeToolFit: 'Fit Tool',
    homeToolDaily: 'Daily',

    // World Details
    worldItemsInSet: '5 Items in this set:',
    worldPlayBtn: 'Play Set',

    // Guess
    guessRound: 'Round {round} / 5',
    guessHowBig: 'How big is this?',
    guessLockBtn: 'Lock Guess!',
    guessQuitConfirmTitle: 'Quit this set?',
    guessQuitConfirmMsg: 'Your current set score will be lost.',
    guessBonusOfferTitle: 'Measure the real item! (Bonus)',
    guessBonusOfferDesc: 'If you have this item, place it on the screen to measure for bonus points.',
    guessBonusMeasureBtn: 'Measure',

    // Measure (Bonus)
    measureTitle: 'Screen Measurement',
    measureInstruction: 'Place the item flat on the screen and align between markers.',
    measureDoneBtn: 'Measured!',

    // Reveal
    revealActual: 'Actual size:',
    revealGuess: 'Your estimate:',
    revealDiff: 'Difference:',
    revealCombo: 'Combo x{combo}',
    revealBonusEarned: '+{pts} bonus earned!',
    revealNextBtn: 'Next Round',
    revealSummaryBtn: 'See Results',
    revealCommentSpotOn: 'Spot on!',
    revealCommentGreat: 'Great guess!',
    revealCommentGood: 'Not bad',
    revealCommentOff: 'Way off',

    // Summary
    summaryTitle: 'Set Complete',
    summaryTotal: 'Total score:',
    summaryBestRound: 'Best round:',
    summaryXpGained: 'XP gained:',
    summaryWorldUnlocked: 'New world unlocked: {world}!',
    summaryHomeBtn: 'Home Hub',
    summaryAgainBtn: 'Play Again',
    summaryShareBtn: 'Share My Score',
    summaryCopiedToast: 'Score copied to clipboard!',

    // Daily Hunt
    dailyTitle: "Today's Hunt",
    dailyTargetMsg: 'Estimate today secret length:',
    dailySubmitBtn: 'Check Guess',
    dailyStreakSuccess: 'Hit! Streak: {streak}',
    dailyStreakMiss: 'Off by {diff} mm. Try again!',
    dailyAlreadyDone: 'Completed Today!',
    dailyComeBackTomorrow: 'Come back tomorrow for a new hunt!',

    // Fit Checker
    fitTitle: 'Will It Fit?',
    fitItemHeader: 'Item (L x W x H)',
    fitSpaceHeader: 'Space (L x W x H)',
    fitGapLabel: 'Clearance margin:',
    fitCheckBtn: 'Calculate Fit',
    fitResultFits: 'IT FITS',
    fitResultNoFit: 'DOES NOT FIT',
    fitSpareTitle: 'Spare clearance space:',
    fitDeficitTitle: 'Deficit (too small):',
    fitDisclaimer: 'Orthogonal 2D boundary calculation without tilt.',

    // Ruler Tool
    toolTitle: 'Online Screen Ruler',
    toolCalibNeededTitle: 'Calibration Required',
    toolCalibNeededDesc: 'To use the ruler, calibrate your screen with a credit card first.',
    toolCalibBtn: 'Calibrate Now',
    toolRecalibBtn: 'Recalibrate Ruler',

    // Profile
    profileTitle: 'Profile & Stats',
    profileGames: 'Sets Completed',
    profileRecord: 'Your Record',
    profileTotalRounds: 'Total rounds:',
    profileAvgDiff: 'Average difference:',
    profileBestRound: 'Best round:',
    profilePerfects: 'Perfect (≥98):',
    profileDailyStreak: 'Daily streak:',
    profileBestStreak: 'Best streak:',
    profileProgress: 'Progress',

    // Settings
    settingsTitle: 'Settings',
    settingsSound: 'Sound Effects:',
    settingsHaptics: 'Haptic Feedback:',
    settingsLanguage: 'Language / Bhasha:',
    settingsDefaultUnit: 'Ruler Default Unit:',
    settingsRecalibBtn: 'Recalibrate Display',
    settingsDangerZone: 'Danger Zone',
    settingsResetWarning: 'Clearing browser storage erases progress. Reset everything below:',
    settingsResetBtn: 'Reset All Progress',
    settingsResetModal1Title: 'Erase all progress?',
    settingsResetModal1Msg: 'All XP, stars, streaks, and unlocked worlds will be lost.',
    settingsResetModal2Title: 'Are you 100% sure?',
    settingsResetModal2Msg: 'This action cannot be undone.',
    settingsResetToast: 'All progress reset.',
    settingsIosNote: 'On iPhone, mute switch may disable synthesized audio.'
  },

  hinglish: {
    // Common
    back: 'Peeche',
    cancel: 'Cancel',
    done: 'Ho gaya',
    skip: 'Skip',
    quit: 'Chhodo',
    lock: 'Lock',
    on: 'ON',
    off: 'OFF',
    pts: 'pts',
    level: 'Level',
    xp: 'XP',
    streak: 'Streak',

    // Splash
    splashTagline: 'Bina ruler ke sab naapo',
    splashStart: 'Shuru karein',

    // Calibrate
    calibTitle: 'Pehle screen ko samjhao',
    calibDesc: 'Koi bhi credit, debit ya ATM card screen par rakho. Outline ko card ke size tak khincho.',
    calibStandardCard: '85.6 mm (standard card)',
    calibDoneBtn: 'Ho gaya',
    calibZoomChanged: 'Zoom badla hai. Dobara calibrate karo.',

    // Home Hub
    homeBrand: 'Naapu',
    homeChooseWorld: 'Kahan chalein?',
    homePlayPrev: 'Pehle pichla world 1 star se paar karo',
    homeStorageWarn: 'Progress save nahi hoga (Private mode)',
    homeToolRuler: 'Ruler',
    homeToolFit: 'Fit Tool',
    homeToolDaily: 'Daily',

    // World Details
    worldItemsInSet: '5 Items is set mein:',
    worldPlayBtn: 'Khelo',

    // Guess
    guessRound: 'Round {round} / 5',
    guessHowBig: 'Kitna bada hai?',
    guessLockBtn: 'Pakka!',
    guessQuitConfirmTitle: 'Set chhodna hai?',
    guessQuitConfirmMsg: 'Abhi tak ke points chale jayenge.',
    guessBonusOfferTitle: 'Asli sikka naapo (bonus)',
    guessBonusOfferDesc: 'Agar ye item aapke paas hai, screen par rakh kar naapo!',
    guessBonusMeasureBtn: 'Naapo',

    // Measure (Bonus)
    measureTitle: 'Screen par naapo',
    measureInstruction: 'Screen par rakho aur dono markers ke beech set karo.',
    measureDoneBtn: 'Naap liya!',

    // Reveal
    revealActual: 'Asli size:',
    revealGuess: 'Aapka andaaza:',
    revealDiff: 'Farq:',
    revealCombo: 'Combo x{combo}',
    revealBonusEarned: '+{pts} bonus mila!',
    revealNextBtn: 'Aage badho',
    revealSummaryBtn: 'Nateeja dekhein',
    revealCommentSpotOn: 'Wah! Gazab andaaza!',
    revealCommentGreat: 'Bahut khoob!',
    revealCommentGood: 'Theek thaak',
    revealCommentOff: 'Door the',

    // Summary
    summaryTitle: 'Set khatam',
    summaryTotal: 'Total score:',
    summaryBestRound: 'Behtareen round:',
    summaryXpGained: 'XP mila:',
    summaryWorldUnlocked: 'Naya world khula: {world}!',
    summaryHomeBtn: 'Home',
    summaryAgainBtn: 'Dobara',
    summaryShareBtn: 'Score Share Karein',
    summaryCopiedToast: 'Score clipboard par copy ho gaya!',

    // Daily Hunt
    dailyTitle: 'Aaj ka Hunt',
    dailyTargetMsg: 'Aaj ki secret lambai andaaza lagao:',
    dailySubmitBtn: 'Check karo',
    dailyStreakSuccess: 'Mil gaya! Streak: {streak}',
    dailyStreakMiss: 'Door the ({diff} mm ka farq). Dobara try karo!',
    dailyAlreadyDone: 'AAJ KA HO GAYA',
    dailyComeBackTomorrow: 'Kal phir aana!',

    // Fit Checker
    fitTitle: 'Aayega ya nahi?',
    fitItemHeader: 'Cheez (Item: L x W x H)',
    fitSpaceHeader: 'Jagah (Space: L x W x H)',
    fitGapLabel: 'Gap chhodna hai:',
    fitCheckBtn: 'Check karo',
    fitResultFits: 'AA JAYEGA',
    fitResultNoFit: 'NAHI AAYEGA',
    fitSpareTitle: 'Bacha hua space (spare):',
    fitDeficitTitle: 'Kami (short):',
    fitDisclaimer: 'Ye seedha rakh kar fit hone ka check hai. Tirchha karke nikalna alag hota hai.',

    // Ruler Tool
    toolTitle: 'Ruler Tool',
    toolCalibNeededTitle: 'Pehle calibrate karo',
    toolCalibNeededDesc: 'Ruler chalane ke liye pehle screen ko credit/ATM card se calibrate karo.',
    toolCalibBtn: 'Calibrate karein',
    toolRecalibBtn: 'Dobara calibrate karein',

    // Profile
    profileTitle: 'Profile & Stats',
    profileGames: 'Sets Khele',
    profileRecord: 'Aapka Record',
    profileTotalRounds: 'Total rounds:',
    profileAvgDiff: 'Average farq:',
    profileBestRound: 'Best round:',
    profilePerfects: 'Perfect (≥98):',
    profileDailyStreak: 'Daily streak:',
    profileBestStreak: 'Best streak:',
    profileProgress: 'Progress',

    // Settings
    settingsTitle: 'Settings',
    settingsSound: 'Awaaz (Sound):',
    settingsHaptics: 'Vibration (Haptics):',
    settingsLanguage: 'Bhasha / Language:',
    settingsDefaultUnit: 'Ruler default unit:',
    settingsRecalibBtn: 'Dobara calibrate karein',
    settingsDangerZone: 'Khatre ki Jagah',
    settingsResetWarning: 'Browser saaf karne par progress chali jaati hai. Sab reset karna hai to neeche dabayein:',
    settingsResetBtn: 'Progress Reset Karein',
    settingsResetModal1Title: 'Sab kuch mita dein?',
    settingsResetModal1Msg: 'Aapki saari progress, XP aur unlocked worlds reset ho jayenge.',
    settingsResetModal2Title: 'Pakka?',
    settingsResetModal2Msg: 'Ye wapas nahi aayega. Kya aap 100% sure hain?',
    settingsResetToast: 'Sab kuch reset ho gaya.',
    settingsIosNote: 'iPhone par silent switch ON hone par sound band ho sakta hai.'
  }
};

/**
 * Gets the current active language ('en' or 'hinglish') from state.settings.lang. Default is 'en'.
 */
export function getLang() {
  try {
    const s = state.get();
    if (s && s.settings && s.settings.lang) {
      return s.settings.lang;
    }
  } catch (_) {}
  return 'en';
}

/**
 * Sets the active language in main state JSON (settings.lang) and saves.
 */
export function setLang(lang) {
  const chosen = (lang === 'hinglish') ? 'hinglish' : 'en';
  try {
    const s = state.get();
    if (s && s.settings) {
      s.settings.lang = chosen;
      state.save();
    }
  } catch (_) {}
  return chosen;
}

/**
 * Translates a key according to current language dictionary.
 * Supports token substitution e.g. {round}, {diff}.
 */
export function t(key, params = {}) {
  const lang = getLang();
  const dict = STRINGS[lang] || STRINGS.en;
  let text = dict[key] || STRINGS.en[key] || key;

  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}
