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
  brand?: string;
  mealType: MealType;
  quantity: number;
  unit: PortionUnit;
  nutrition: NutritionInfo;
  isEstimated: boolean;
  source?: NutritionSource;
  confidenceLevel?: ConfidenceRating;
  confidence?: number;
  oilGheeAdjustment?: number; // extra calories from oil/ghee
  timestamp: number;
  notes?: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: MealEntry[];
  waterGlasses: number;
  waterGlassSizeMl?: number;
  weight?: number;
  notes?: string;
  fastingStart?: number;
  fastingEnd?: number;
}

export interface UserProfile {
  name?: string;
  ageRange?: string;
  ageGroup?: '<18' | '18-64' | '65+';
  healthConditions?: string[];
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
  waterGlassSizeMl?: number;
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

export type FoodClassification =
  | 'packaged_food'
  | 'homemade_meal'
  | 'restaurant_meal'
  | 'nutrition_label'
  | 'multiple_items'
  | 'unclear';

export type ConfidenceRating = 'high' | 'medium' | 'low';

export type NutritionSource = 'package_label' | 'ai_estimate' | 'manual_entry';

export interface AnalyzedFoodItem {
  name: string;
  brand?: string;
  quantity: number;
  unit: PortionUnit;
  nutrition: NutritionInfo;
  source: NutritionSource;
  confidenceLevel: ConfidenceRating;
  confidenceScore?: number;
  alternatives?: string[];
  notes?: string;
}

export interface AIAnalysisResult {
  success: boolean;
  classification?: FoodClassification;
  brand?: string;
  productName?: string;
  variant?: string;
  confidenceLevel?: ConfidenceRating;
  source?: NutritionSource;
  needsLabelVerification?: boolean;
  message?: string;
  error?: string;
  errorCode?: 'API_KEY_MISSING' | 'UNREADABLE_IMAGE' | 'API_ERROR' | 'NETWORK_ERROR';
  foods: AnalyzedFoodItem[];
  isEstimated: boolean;
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
