export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';
export type Goal = 'fat_loss' | 'maintenance' | 'muscle_gain' | 'better_protein' | 'healthier_eating';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type DietPreference =
  | 'vegetarian'
  | 'vegan'
  | 'eggitarian'
  | 'jain'
  | 'halal'
  | 'high_protein'
  | 'low_carb'
  | 'diabetic_friendly';
export type PortionUnit = 'g' | 'ml' | 'katori' | 'bowl' | 'glass' | 'roti' | 'piece' | 'plate' | 'tablespoon' | 'teaspoon' | 'cup' | 'serving';

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
}

export interface FoodItem {
  id: string;
  name: string;
  nameHi?: string;
  category: string;
  nutrition: NutritionInfo; // per standard serving
  servingSize: number;
  servingUnit: PortionUnit;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isJainFriendly?: boolean;
  source?: string;
  tags?: string[];
}

export interface MealEntry {
  id: string;
  foodId?: string;
  foodName: string;
  mealType: MealType;
  quantity: number;
  unit: PortionUnit;
  nutrition: NutritionInfo;
  isEstimated: boolean;
  confidence?: number; // 0-100
  oilGheeAdjustment?: number; // extra calories from oil/ghee
  timestamp: number;
  notes?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: MealEntry[];
  waterGlasses: number;
  weight?: number;
  notes?: string;
  fastingStart?: number;
  fastingEnd?: number;
}

export interface UserProfile {
  name?: string;
  ageRange?: string;
  sex?: 'male' | 'female' | 'other';
  heightCm: number;
  weightKg: number;
  targetWeightKg?: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  dietPreferences: DietPreference[];
  allergies: string[];
  dislikedFoods: string[];
  language: 'en' | 'hi';
  dailyCalorieTarget: number;
  dailyProteinTarget: number;
  dailyCarbsTarget: number;
  dailyFatTarget: number;
  dailyFibreTarget: number;
  dailyWaterTarget: number;
  onboardingComplete: boolean;
  createdAt: number;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight?: number;
  waist?: number;
  chest?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftThigh?: number;
  rightThigh?: number;
  notes?: string;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: { foodName: string; quantity: number; unit: PortionUnit; nutrition: NutritionInfo }[];
  perServingNutrition: NutritionInfo;
  isFavourite: boolean;
  createdAt: number;
}

export interface AIAnalysisResult {
  foods: {
    name: string;
    quantity: number;
    unit: PortionUnit;
    nutrition: NutritionInfo;
    confidence: number;
    alternatives?: string[];
  }[];
  isEstimated: true;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  keywords: string[];
  readingTime: number;
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}
