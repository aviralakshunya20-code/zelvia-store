'use client';

import {
  DailyLog,
  MealEntry,
  UserProfile,
  BodyMeasurement,
  Recipe,
  NutritionInfo,
  FoodItem,
  MealType,
} from './types';

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
  } catch {
    return fallback;
  }
}

function set(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Date helpers
export function todayStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
    waterGlassSizeMl: 250,
    onboardingComplete: false,
    createdAt: Date.now(),
  };
}

// --- Daily Logs & Strict Calculations ---
function getAllLogs(): Record<string, DailyLog> {
  return get<Record<string, DailyLog>>(KEYS.logs, {});
}

function saveAllLogs(logs: Record<string, DailyLog>) {
  set(KEYS.logs, logs);
}

/**
 * Validates and sanitizes a single meal entry so that calculations never fail or produce NaN
 */
export function sanitizeMealEntry(entry: MealEntry): MealEntry {
  const cals = Math.max(0, Math.round(Number(entry.nutrition?.calories) || 0));
  const prot = Math.max(0, Math.round((Number(entry.nutrition?.protein) || 0) * 10) / 10);
  const carbs = Math.max(0, Math.round((Number(entry.nutrition?.carbs) || 0) * 10) / 10);
  const fat = Math.max(0, Math.round((Number(entry.nutrition?.fat) || 0) * 10) / 10);
  const fibre = Math.max(0, Math.round((Number(entry.nutrition?.fibre) || 0) * 10) / 10);

  return {
    ...entry,
    id: entry.id || uid(),
    foodName: entry.foodName || 'Unnamed Food',
    quantity: Math.max(0.1, Number(entry.quantity) || 1),
    unit: entry.unit || 'serving',
    nutrition: {
      calories: cals,
      protein: prot,
      carbs: carbs,
      fat: fat,
      fibre: fibre,
    },
    isEstimated: Boolean(entry.isEstimated),
    source: entry.source || (entry.isEstimated ? 'ai_estimate' : 'manual_entry'),
    confidenceLevel: entry.confidenceLevel || (entry.source === 'package_label' ? 'high' : 'medium'),
    timestamp: Number(entry.timestamp) || Date.now(),
  };
}

export function getDayLog(date: string): DailyLog {
  const logs = getAllLogs();
  const rawLog = logs[date];
  if (!rawLog) {
    return { date, meals: [], waterGlasses: 0, waterGlassSizeMl: 250 };
  }

  // Sanitize all entries to guarantee mathematical consistency
  const sanitizedMeals = (rawLog.meals || []).map(sanitizeMealEntry);
  return {
    ...rawLog,
    date,
    meals: sanitizedMeals,
    waterGlasses: Math.max(0, Number(rawLog.waterGlasses) || 0),
    waterGlassSizeMl: Number(rawLog.waterGlassSizeMl) || 250,
  };
}

export function saveDayLog(log: DailyLog) {
  const logs = getAllLogs();
  const sanitized: DailyLog = {
    ...log,
    meals: (log.meals || []).map(sanitizeMealEntry),
    waterGlasses: Math.max(0, Number(log.waterGlasses) || 0),
  };
  logs[log.date] = sanitized;
  saveAllLogs(logs);
}

/**
 * Adds a meal entry to the date log and guarantees all totals recalculate strictly
 */
export function addMealEntry(date: string, entry: MealEntry) {
  const log = getDayLog(date);
  const cleanEntry = sanitizeMealEntry(entry);
  log.meals.push(cleanEntry);
  saveDayLog(log);
}

export function updateMealEntry(date: string, entryId: string, updates: Partial<MealEntry>) {
  const log = getDayLog(date);
  const idx = log.meals.findIndex(m => m.id === entryId);
  if (idx >= 0) {
    const merged = { ...log.meals[idx], ...updates };
    log.meals[idx] = sanitizeMealEntry(merged);
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
    const clone = sanitizeMealEntry({
      ...entry,
      id: uid(),
      timestamp: Date.now(),
    });
    log.meals.push(clone);
    saveDayLog(log);
  }
}

export function moveMealEntry(date: string, entryId: string, newMealType: MealType) {
  const log = getDayLog(date);
  const idx = log.meals.findIndex(m => m.id === entryId);
  if (idx >= 0) {
    log.meals[idx].mealType = newMealType;
    saveDayLog(log);
  }
}

export function copyMealsFromDate(fromDate: string, toDate: string, mealTypeFilter?: MealType) {
  const fromLog = getDayLog(fromDate);
  const toLog = getDayLog(toDate);

  const sourceMeals = mealTypeFilter
    ? fromLog.meals.filter(m => m.mealType === mealTypeFilter)
    : fromLog.meals;

  const copied = sourceMeals.map(m =>
    sanitizeMealEntry({
      ...m,
      id: uid(),
      timestamp: Date.now(),
    })
  );

  toLog.meals.push(...copied);
  saveDayLog(toLog);
}

export function clearDayMeals(date: string, mealTypeFilter?: MealType) {
  const log = getDayLog(date);
  if (mealTypeFilter) {
    log.meals = log.meals.filter(m => m.mealType !== mealTypeFilter);
  } else {
    log.meals = [];
  }
  saveDayLog(log);
}

export function updateWater(date: string, glasses: number, glassSizeMl = 250) {
  const log = getDayLog(date);
  log.waterGlasses = Math.max(0, glasses);
  log.waterGlassSizeMl = glassSizeMl;
  saveDayLog(log);
}

export function updateDayWeight(date: string, weight: number) {
  const log = getDayLog(date);
  log.weight = weight;
  saveDayLog(log);
}

/**
 * Strict Day Nutrition Totals calculation:
 * The sum strictly equals the sum of each item's nutrition. Zero stale numbers.
 */
export function getDayNutritionTotals(date: string): NutritionInfo {
  const log = getDayLog(date);
  return log.meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.nutrition.calories,
      protein: Math.round((acc.protein + m.nutrition.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + m.nutrition.carbs) * 10) / 10,
      fat: Math.round((acc.fat + m.nutrition.fat) * 10) / 10,
      fibre: Math.round((acc.fibre + m.nutrition.fibre) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
  );
}

/**
 * Strict Meal Section Totals calculation (Breakfast, Lunch, Dinner, Snacks)
 */
export function getMealNutritionTotals(date: string, mealType: MealType): NutritionInfo {
  const log = getDayLog(date);
  const mealItems = log.meals.filter(m => m.mealType === mealType);
  return mealItems.reduce(
    (acc, m) => ({
      calories: acc.calories + m.nutrition.calories,
      protein: Math.round((acc.protein + m.nutrition.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + m.nutrition.carbs) * 10) / 10,
      fat: Math.round((acc.fat + m.nutrition.fat) * 10) / 10,
      fibre: Math.round((acc.fibre + m.nutrition.fibre) * 10) / 10,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }
  );
}

export function getLogsForRange(startDate: string, endDate: string): DailyLog[] {
  const logs = getAllLogs();
  return Object.values(logs)
    .filter(l => l.date >= startDate && l.date <= endDate)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * 7-Day Weekly Summary without streak pressure
 */
export interface WeeklyStats {
  averageCalories: number;
  averageProtein: number;
  totalMealsLogged: number;
  daysLoggedCount: number;
  insight: string;
}

export function getWeeklyStats(endDateStr = todayStr()): WeeklyStats {
  const endDate = new Date(endDateStr);
  const days: DailyLog[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(endDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push(getDayLog(dateStr));
  }

  const daysWithMeals = days.filter(d => d.meals.length > 0);
  const totalMealsLogged = days.reduce((sum, d) => sum + d.meals.length, 0);

  if (daysWithMeals.length === 0) {
    return {
      averageCalories: 0,
      averageProtein: 0,
      totalMealsLogged: 0,
      daysLoggedCount: 0,
      insight: 'Log your meals across the week to see your average calorie and protein trends.',
    };
  }

  const totalCalories = daysWithMeals.reduce((sum, d) => {
    return sum + d.meals.reduce((mSum, m) => mSum + m.nutrition.calories, 0);
  }, 0);

  const totalProtein = daysWithMeals.reduce((sum, d) => {
    return sum + d.meals.reduce((mSum, m) => mSum + m.nutrition.protein, 0);
  }, 0);

  const averageCalories = Math.round(totalCalories / daysWithMeals.length);
  const averageProtein = Math.round((totalProtein / daysWithMeals.length) * 10) / 10;
  const daysLoggedCount = daysWithMeals.length;

  let insight = 'Your weekly nutrition overview provides a helpful baseline for your health goals.';
  if (daysLoggedCount >= 5) {
    insight = `You've logged ${daysLoggedCount} days this week — steady awareness without daily pressure builds lasting habits.`;
  } else if (averageProtein >= 50) {
    insight = `Your daily protein is averaging ~${Math.round(averageProtein)}g across logged days. Great foundation!`;
  } else {
    insight = 'Focus on weekly averages rather than daily perfection — every logged meal adds clarity.';
  }

  return {
    averageCalories,
    averageProtein,
    totalMealsLogged,
    daysLoggedCount,
    insight,
  };
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
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
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
  const rows = ['Date,Meal,Food,Calories,Protein(g),Carbs(g),Fat(g),Fibre(g),Quantity,Unit,Source'];
  for (const log of Object.values(logs)) {
    for (const m of log.meals) {
      rows.push(
        [
          log.date,
          m.mealType,
          `"${m.foodName}"`,
          m.nutrition.calories,
          m.nutrition.protein,
          m.nutrition.carbs,
          m.nutrition.fat,
          m.nutrition.fibre,
          m.quantity,
          m.unit,
          m.source || 'manual_entry',
        ].join(',')
      );
    }
  }
  return rows.join('\n');
}

export function deleteAllData() {
  if (typeof localStorage === 'undefined') return;
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}
