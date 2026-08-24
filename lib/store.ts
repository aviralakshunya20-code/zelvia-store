'use client';

import { DailyLog, MealEntry, UserProfile, BodyMeasurement, Recipe, NutritionInfo, FoodItem } from './types';

const KEYS = {
  profile: 'om_profile',
  logs: 'om_daily_logs',
  measurements: 'om_measurements',
  recipes: 'om_recipes',
  favourites: 'om_favourites',
  recentFoods: 'om_recent',
  customFoods: 'om_custom_foods',
  theme: 'om_theme',
  cookieConsent: 'om_cookie_consent',
} as const;

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function set(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Date helpers
export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// --- Profile ---
export function getProfile(): UserProfile | null {
  return get<UserProfile | null>(KEYS.profile, null);
}

export function saveProfile(profile: UserProfile) {
  set(KEYS.profile, profile);
}

export function defaultProfile(): UserProfile {
  return {
    heightCm: 165,
    weightKg: 65,
    activityLevel: 'moderate',
    goal: 'healthier_eating',
    dietPreferences: [],
    allergies: [],
    dislikedFoods: [],
    language: 'en',
    dailyCalorieTarget: 2000,
    dailyProteinTarget: 60,
    dailyCarbsTarget: 250,
    dailyFatTarget: 65,
    dailyFibreTarget: 25,
    dailyWaterTarget: 8,
    onboardingComplete: false,
    createdAt: Date.now(),
  };
}

// --- Daily Logs ---
function getAllLogs(): Record<string, DailyLog> {
  return get<Record<string, DailyLog>>(KEYS.logs, {});
}

function saveAllLogs(logs: Record<string, DailyLog>) {
  set(KEYS.logs, logs);
}

export function getDayLog(date: string): DailyLog {
  const logs = getAllLogs();
  return logs[date] || { date, meals: [], waterGlasses: 0 };
}

export function saveDayLog(log: DailyLog) {
  const logs = getAllLogs();
  logs[log.date] = log;
  saveAllLogs(logs);
}

export function addMealEntry(date: string, entry: MealEntry) {
  const log = getDayLog(date);
  log.meals.push(entry);
  saveDayLog(log);
}

export function updateMealEntry(date: string, entryId: string, updates: Partial<MealEntry>) {
  const log = getDayLog(date);
  const idx = log.meals.findIndex(m => m.id === entryId);
  if (idx >= 0) {
    log.meals[idx] = { ...log.meals[idx], ...updates };
    saveDayLog(log);
  }
}

export function deleteMealEntry(date: string, entryId: string) {
  const log = getDayLog(date);
  log.meals = log.meals.filter(m => m.id !== entryId);
  saveDayLog(log);
}

export function duplicateMealEntry(date: string, entryId: string) {
  const log = getDayLog(date);
  const entry = log.meals.find(m => m.id === entryId);
  if (entry) {
    log.meals.push({ ...entry, id: uid(), timestamp: Date.now() });
    saveDayLog(log);
  }
}

export function moveMealEntry(date: string, entryId: string, newMealType: MealEntry['mealType']) {
  const log = getDayLog(date);
  const idx = log.meals.findIndex(m => m.id === entryId);
  if (idx >= 0) {
    log.meals[idx].mealType = newMealType;
    saveDayLog(log);
  }
}

export function copyMealsFromDate(fromDate: string, toDate: string) {
  const fromLog = getDayLog(fromDate);
  const toLog = getDayLog(toDate);
  const copied = fromLog.meals.map(m => ({ ...m, id: uid(), timestamp: Date.now() }));
  toLog.meals.push(...copied);
  saveDayLog(toLog);
}

export function updateWater(date: string, glasses: number) {
  const log = getDayLog(date);
  log.waterGlasses = Math.max(0, glasses);
  saveDayLog(log);
}

export function updateDayWeight(date: string, weight: number) {
  const log = getDayLog(date);
  log.weight = weight;
  saveDayLog(log);
}

export function getDayNutritionTotals(date: string): NutritionInfo {
  const log = getDayLog(date);
  return log.meals.reduce((acc, m) => ({
    calories: acc.calories + m.nutrition.calories,
    protein: acc.protein + m.nutrition.protein,
    carbs: acc.carbs + m.nutrition.carbs,
    fat: acc.fat + m.nutrition.fat,
    fibre: acc.fibre + m.nutrition.fibre,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
}

export function getLogsForRange(startDate: string, endDate: string): DailyLog[] {
  const logs = getAllLogs();
  return Object.values(logs).filter(l => l.date >= startDate && l.date <= endDate).sort((a, b) => a.date.localeCompare(b.date));
}

// --- Body Measurements ---
export function getMeasurements(): BodyMeasurement[] {
  return get<BodyMeasurement[]>(KEYS.measurements, []);
}

export function addMeasurement(m: BodyMeasurement) {
  const all = getMeasurements();
  all.push(m);
  all.sort((a, b) => a.date.localeCompare(b.date));
  set(KEYS.measurements, all);
}

export function deleteMeasurement(id: string) {
  set(KEYS.measurements, getMeasurements().filter(m => m.id !== id));
}

// --- Recipes ---
export function getRecipes(): Recipe[] {
  return get<Recipe[]>(KEYS.recipes, []);
}

export function saveRecipe(recipe: Recipe) {
  const all = getRecipes().filter(r => r.id !== recipe.id);
  all.push(recipe);
  set(KEYS.recipes, all);
}

export function deleteRecipe(id: string) {
  set(KEYS.recipes, getRecipes().filter(r => r.id !== id));
}

// --- Favourites & Recent ---
export function getFavourites(): string[] {
  return get<string[]>(KEYS.favourites, []);
}

export function toggleFavourite(foodId: string) {
  const favs = getFavourites();
  const idx = favs.indexOf(foodId);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(foodId);
  set(KEYS.favourites, favs);
}

export function getRecentFoods(): string[] {
  return get<string[]>(KEYS.recentFoods, []);
}

export function addRecentFood(foodId: string) {
  const recent = getRecentFoods().filter(id => id !== foodId);
  recent.unshift(foodId);
  set(KEYS.recentFoods, recent.slice(0, 30));
}

// --- Custom Foods ---
export function getCustomFoods(): FoodItem[] {
  return get<FoodItem[]>(KEYS.customFoods, []);
}

export function addCustomFood(food: FoodItem) {
  const all = getCustomFoods();
  all.push(food);
  set(KEYS.customFoods, all);
}

// --- Theme ---
export function getTheme(): 'light' | 'dark' {
  return get<'light' | 'dark'>(KEYS.theme, 'light');
}

export function setTheme(theme: 'light' | 'dark') {
  set(KEYS.theme, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

// --- Cookie Consent ---
export function getCookieConsent(): boolean {
  return get<boolean>(KEYS.cookieConsent, false);
}

export function setCookieConsent(accepted: boolean) {
  set(KEYS.cookieConsent, accepted);
}

// --- Data Export & Deletion ---
export function exportAllData(): string {
  const data = {
    profile: getProfile(),
    logs: getAllLogs(),
    measurements: getMeasurements(),
    recipes: getRecipes(),
    favourites: getFavourites(),
    customFoods: getCustomFoods(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

export function exportCSV(): string {
  const logs = getAllLogs();
  const rows = ['Date,Meal,Food,Calories,Protein(g),Carbs(g),Fat(g),Fibre(g),Quantity,Unit'];
  for (const log of Object.values(logs)) {
    for (const m of log.meals) {
      rows.push([log.date, m.mealType, `"${m.foodName}"`, m.nutrition.calories, m.nutrition.protein, m.nutrition.carbs, m.nutrition.fat, m.nutrition.fibre, m.quantity, m.unit].join(','));
    }
  }
  return rows.join('\n');
}

export function deleteAllData() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}
