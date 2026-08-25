import assert from 'node:assert';

console.log('=== RUNNING DASHBOARD DATA INTEGRITY & CALCULATION TESTS ===\n');

// Mock in-memory store logic matching lib/store.ts
function sanitizeMealEntry(entry) {
  const cals = Math.max(0, Math.round(Number(entry.nutrition?.calories) || 0));
  const prot = Math.max(0, Math.round((Number(entry.nutrition?.protein) || 0) * 10) / 10);
  const carbs = Math.max(0, Math.round((Number(entry.nutrition?.carbs) || 0) * 10) / 10);
  const fat = Math.max(0, Math.round((Number(entry.nutrition?.fat) || 0) * 10) / 10);
  const fibre = Math.max(0, Math.round((Number(entry.nutrition?.fibre) || 0) * 10) / 10);

  return {
    ...entry,
    id: entry.id || String(Math.random()),
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

class TestStore {
  constructor() {
    this.logs = {};
  }

  getDayLog(date) {
    if (!this.logs[date]) {
      this.logs[date] = { date, meals: [], waterGlasses: 0, waterGlassSizeMl: 250 };
    }
    return this.logs[date];
  }

  saveDayLog(log) {
    this.logs[log.date] = {
      ...log,
      meals: log.meals.map(sanitizeMealEntry),
    };
  }

  addMeal(date, entry) {
    const log = this.getDayLog(date);
    log.meals.push(sanitizeMealEntry(entry));
    this.saveDayLog(log);
  }

  updateMeal(date, id, updates) {
    const log = this.getDayLog(date);
    const idx = log.meals.findIndex(m => m.id === id);
    if (idx >= 0) {
      log.meals[idx] = sanitizeMealEntry({ ...log.meals[idx], ...updates });
      this.saveDayLog(log);
    }
  }

  deleteMeal(date, id) {
    const log = this.getDayLog(date);
    log.meals = log.meals.filter(m => m.id !== id);
    this.saveDayLog(log);
  }

  duplicateMeal(date, id) {
    const log = this.getDayLog(date);
    const entry = log.meals.find(m => m.id === id);
    if (entry) {
      log.meals.push(sanitizeMealEntry({ ...entry, id: 'dup_' + Math.random() }));
      this.saveDayLog(log);
    }
  }

  moveMeal(date, id, newType) {
    const log = this.getDayLog(date);
    const idx = log.meals.findIndex(m => m.id === id);
    if (idx >= 0) {
      log.meals[idx].mealType = newType;
      this.saveDayLog(log);
    }
  }

  getMealTotal(date, mealType) {
    const log = this.getDayLog(date);
    return log.meals
      .filter(m => m.mealType === mealType)
      .reduce((sum, m) => sum + m.nutrition.calories, 0);
  }

  getDailyTotals(date) {
    const log = this.getDayLog(date);
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
}

const store = new TestStore();
const date = '2026-08-25';

// TEST 1: Add Patisa (155 kcal) to Breakfast
console.log('--- TEST 1: Add Patisa (155 kcal) to Breakfast ---');
const patisaEntry = {
  id: 'patisa-1',
  foodName: "Haldiram's Dry Fruit Patisa Classic",
  brand: "Haldiram's",
  mealType: 'breakfast',
  quantity: 1,
  unit: 'piece',
  nutrition: { calories: 155, protein: 1.8, carbs: 18.9, fat: 8.1, fibre: 0.6 },
  source: 'package_label',
  confidenceLevel: 'high',
};

store.addMeal(date, patisaEntry);

const bTotal1 = store.getMealTotal(date, 'breakfast');
const dTotal1 = store.getDailyTotals(date);

assert.strictEqual(bTotal1, 155, 'Breakfast total MUST be 155 kcal');
assert.strictEqual(dTotal1.calories, 155, 'Daily total MUST be 155 kcal (NOT 2550 kcal)');
assert.notStrictEqual(bTotal1, 2550, 'Breakfast total must NOT be 2550 kcal');
console.log(`✅ Test 1 Passed: Breakfast Total = ${bTotal1} kcal, Daily Total = ${dTotal1.calories} kcal.`);

// TEST 2: Add Chai (50 kcal) to Breakfast
console.log('\n--- TEST 2: Add Chai (50 kcal) to Breakfast ---');
store.addMeal(date, {
  id: 'chai-1',
  foodName: 'Masala Chai',
  mealType: 'breakfast',
  quantity: 1,
  unit: 'cup',
  nutrition: { calories: 50, protein: 1.5, carbs: 7, fat: 1.5, fibre: 0 },
  source: 'manual_entry',
  confidenceLevel: 'high',
});

const bTotal2 = store.getMealTotal(date, 'breakfast');
const dTotal2 = store.getDailyTotals(date);
assert.strictEqual(bTotal2, 205, 'Breakfast total must be 155 + 50 = 205 kcal');
assert.strictEqual(dTotal2.calories, 205, 'Daily total must be 205 kcal');
console.log(`✅ Test 2 Passed: Breakfast Total = ${bTotal2} kcal, Daily Total = ${dTotal2.calories} kcal.`);

// TEST 3: Edit Patisa quantity to 2 (310 kcal)
console.log('\n--- TEST 3: Edit Patisa to 2 pieces (310 kcal) ---');
store.updateMeal(date, 'patisa-1', {
  quantity: 2,
  nutrition: { calories: 310, protein: 3.6, carbs: 37.8, fat: 16.2, fibre: 1.2 },
});
const bTotal3 = store.getMealTotal(date, 'breakfast');
const dTotal3 = store.getDailyTotals(date);
assert.strictEqual(bTotal3, 360, 'Breakfast total must be 310 + 50 = 360 kcal');
assert.strictEqual(dTotal3.calories, 360, 'Daily total must be 360 kcal');
console.log(`✅ Test 3 Passed: Edited Patisa: Breakfast = ${bTotal3} kcal, Daily = ${dTotal3.calories} kcal.`);

// TEST 4: Move Chai from Breakfast to Snacks
console.log('\n--- TEST 4: Move Chai to Snacks ---');
store.moveMeal(date, 'chai-1', 'snacks');
const bTotal4 = store.getMealTotal(date, 'breakfast');
const sTotal4 = store.getMealTotal(date, 'snacks');
const dTotal4 = store.getDailyTotals(date);
assert.strictEqual(bTotal4, 310, 'Breakfast must be 310 kcal');
assert.strictEqual(sTotal4, 50, 'Snacks must be 50 kcal');
assert.strictEqual(dTotal4.calories, 360, 'Daily total must remain 360 kcal (310 + 50)');
console.log(`✅ Test 4 Passed: Breakfast = ${bTotal4} kcal, Snacks = ${sTotal4} kcal, Daily = ${dTotal4.calories} kcal.`);

// TEST 5: Duplicate Chai in Snacks
console.log('\n--- TEST 5: Duplicate Chai in Snacks ---');
store.duplicateMeal(date, 'chai-1');
const sTotal5 = store.getMealTotal(date, 'snacks');
const dTotal5 = store.getDailyTotals(date);
assert.strictEqual(sTotal5, 100, 'Snacks must be 50 + 50 = 100 kcal');
assert.strictEqual(dTotal5.calories, 410, 'Daily total must be 310 + 100 = 410 kcal');
console.log(`✅ Test 5 Passed: Duplicate Chai: Snacks = ${sTotal5} kcal, Daily = ${dTotal5.calories} kcal.`);

// TEST 6: Delete Original Patisa
console.log('\n--- TEST 6: Delete Patisa ---');
store.deleteMeal(date, 'patisa-1');
const bTotal6 = store.getMealTotal(date, 'breakfast');
const dTotal6 = store.getDailyTotals(date);
assert.strictEqual(bTotal6, 0, 'Breakfast must be 0 kcal after deletion');
assert.strictEqual(dTotal6.calories, 100, 'Daily total must be 100 kcal');
console.log(`✅ Test 6 Passed: Deleted Patisa: Breakfast = ${bTotal6} kcal, Daily = ${dTotal6.calories} kcal.`);

console.log('\n🎉 ALL DATA INTEGRITY & RECALCULATION TESTS PASSED WITH 100% PRECISION!');
