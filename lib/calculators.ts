// Calculator functions with documented formulas
// All calculations are estimates for informational purposes, not medical advice.

export interface CalcInput {
  weightKg: number;
  heightCm: number;
  ageYears: number;
  sex: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // desk job, little exercise
  light: 1.375,        // light exercise 1-3 days/week
  moderate: 1.55,      // moderate exercise 3-5 days/week
  active: 1.725,       // heavy exercise 6-7 days/week
  very_active: 1.9,    // very heavy exercise, physical job
} as const;

/** BMI = weight(kg) / height(m)² */
export function calcBMI(weightKg: number, heightCm: number): { bmi: number; category: string; color: string } {
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  let category: string, color: string;
  if (bmi < 18.5) { category = 'Underweight'; color = '#3B82F6'; }
  else if (bmi < 25) { category = 'Normal'; color = '#22C55E'; }
  else if (bmi < 30) { category = 'Overweight'; color = '#F59E0B'; }
  else { category = 'Obese'; color = '#EF4444'; }
  return { bmi, category, color };
}

/** BMR using Mifflin-St Jeor equation (more accurate than Harris-Benedict for most people) */
export function calcBMR(input: Pick<CalcInput, 'weightKg' | 'heightCm' | 'ageYears' | 'sex'>): number {
  const { weightKg, heightCm, ageYears, sex } = input;
  if (sex === 'male') return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5);
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161);
}

/** TDEE = BMR × Activity Multiplier */
export function calcTDEE(input: CalcInput): number {
  const bmr = calcBMR(input);
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[input.activityLevel]);
}

/** Daily calorie target based on goal */
export function calcDailyCalories(input: CalcInput, goal: 'lose' | 'maintain' | 'gain'): number {
  const tdee = calcTDEE(input);
  if (goal === 'lose') return Math.max(1200, tdee - 500); // Never below 1200
  if (goal === 'gain') return tdee + 300;
  return tdee;
}

/** Macro split in grams. Returns {protein, carbs, fat} */
export function calcMacros(dailyCalories: number, split: 'balanced' | 'high_protein' | 'low_carb' = 'balanced') {
  const splits = {
    balanced: { proteinPct: 0.20, carbsPct: 0.50, fatPct: 0.30 },
    high_protein: { proteinPct: 0.30, carbsPct: 0.40, fatPct: 0.30 },
    low_carb: { proteinPct: 0.30, carbsPct: 0.25, fatPct: 0.45 },
  };
  const s = splits[split];
  return {
    protein: Math.round((dailyCalories * s.proteinPct) / 4),   // 4 cal/g
    carbs: Math.round((dailyCalories * s.carbsPct) / 4),       // 4 cal/g
    fat: Math.round((dailyCalories * s.fatPct) / 9),           // 9 cal/g
  };
}

/** Protein needs based on body weight and activity */
export function calcProtein(weightKg: number, activityLevel: CalcInput['activityLevel']): { min: number; max: number; recommended: number } {
  const factors = { sedentary: [0.8, 1.0], light: [1.0, 1.2], moderate: [1.2, 1.6], active: [1.6, 2.0], very_active: [1.8, 2.2] } as const;
  const [minF, maxF] = factors[activityLevel];
  return {
    min: Math.round(weightKg * minF),
    max: Math.round(weightKg * maxF),
    recommended: Math.round(weightKg * ((minF + maxF) / 2)),
  };
}

/** Daily water intake (ml) based on weight and activity */
export function calcWaterIntake(weightKg: number, activityLevel: CalcInput['activityLevel']): { ml: number; glasses: number } {
  const baseML = weightKg * 35;
  const activityBonus = { sedentary: 0, light: 200, moderate: 400, active: 600, very_active: 800 };
  const total = Math.round(baseML + activityBonus[activityLevel]);
  return { ml: total, glasses: Math.round(total / 250) };
}

/** Ideal weight range using Devine formula (simplified) */
export function calcIdealWeight(heightCm: number, sex: 'male' | 'female'): { min: number; max: number; ideal: number } {
  const heightInches = heightCm / 2.54;
  const baseHeight = 60; // 5 feet
  const extra = Math.max(0, heightInches - baseHeight);
  let ideal: number;
  if (sex === 'male') ideal = 50 + 2.3 * extra;
  else ideal = 45.5 + 2.3 * extra;
  return {
    min: Math.round(ideal * 0.9),
    max: Math.round(ideal * 1.1),
    ideal: Math.round(ideal),
  };
}

/** Estimate calories burned for an activity */
export function calcCaloriesBurned(weightKg: number, activityMET: number, durationMinutes: number): number {
  // Calories = MET × weight(kg) × duration(hours)
  return Math.round(activityMET * weightKg * (durationMinutes / 60));
}

// Common activity MET values
export const ACTIVITY_METS: Record<string, { name: string; met: number }> = {
  walking_slow: { name: 'Walking (slow, 3 km/h)', met: 2.5 },
  walking_brisk: { name: 'Walking (brisk, 5 km/h)', met: 3.8 },
  running_slow: { name: 'Running (slow, 8 km/h)', met: 8.0 },
  running_fast: { name: 'Running (fast, 12 km/h)', met: 11.5 },
  cycling: { name: 'Cycling (moderate)', met: 6.8 },
  swimming: { name: 'Swimming (moderate)', met: 7.0 },
  yoga: { name: 'Yoga', met: 3.0 },
  weight_training: { name: 'Weight Training', met: 5.0 },
  dancing: { name: 'Dancing', met: 5.5 },
  cricket: { name: 'Cricket', met: 5.0 },
  badminton: { name: 'Badminton', met: 5.5 },
  household: { name: 'Household Chores', met: 3.5 },
  stairs: { name: 'Climbing Stairs', met: 8.0 },
  skipping: { name: 'Skipping / Jump Rope', met: 10.0 },
};

/** Fibre recommendation: 25-30g/day for adults */
export function calcFibreTarget(): number {
  return 25;
}
