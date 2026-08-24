'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ScanLine, Plus, Mic, Droplets, Scale, Lightbulb } from 'lucide-react';
import { CalorieRing } from '@/components/ui/CalorieRing';
import { MacroBar } from '@/components/ui/MacroBar';
import { MealCard } from '@/components/ui/MealCard';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { getProfile, getDayLog, getDayNutritionTotals, todayStr, defaultProfile, updateWater, deleteMealEntry, duplicateMealEntry, moveMealEntry } from '@/lib/store';
import type { UserProfile, MealEntry, MealType } from '@/lib/types';

const MEAL_TYPES: { key: MealType; label: string; emoji: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙' },
  { key: 'snacks', label: 'Snacks', emoji: '🍿' },
];

const QUICK_ACTIONS = [
  { href: '/scan', label: 'Scan Food', icon: ScanLine, color: 'var(--green-700)' },
  { href: '/food-search', label: 'Add Meal', icon: Plus, color: 'var(--blue)' },
  { href: '/scan?mode=voice', label: 'Voice Log', icon: Mic, color: 'var(--orange)' },
];

function getDailyInsight(nutrition: { calories: number; protein: number; fibre: number }, profile: UserProfile): string {
  const proteinGap = profile.dailyProteinTarget - nutrition.protein;
  const fibreGap = profile.dailyFibreTarget - nutrition.fibre;
  const calPct = nutrition.calories / Math.max(profile.dailyCalorieTarget, 1);

  if (nutrition.calories === 0) return 'Start your day by logging breakfast — even a quick entry helps build the habit.';
  if (proteinGap > 15) return `You are ${Math.round(proteinGap)}g short of your protein target — consider a protein-rich snack like paneer, eggs, or sprouts.`;
  if (fibreGap > 10) return `Add some fibre to your meals — a bowl of dal, salad, or fruit can help you reach your ${profile.dailyFibreTarget}g target.`;
  if (calPct > 1.1) return 'You have exceeded your calorie target. That is okay — one day does not define your journey. Focus on balance.';
  if (calPct > 0.8) return 'You are on track today. Keep it up — consistency matters more than perfection.';
  return 'Good progress so far. Remember to log all your meals for accurate tracking.';
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [water, setWater] = useState(0);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
  const today = todayStr();

  const reload = useCallback(() => {
    const p = getProfile() || defaultProfile();
    setProfile(p);
    const log = getDayLog(today);
    setMeals(log.meals);
    setWater(log.waterGlasses);
    setNutrition(getDayNutritionTotals(today));
  }, [today]);

  useEffect(() => { reload(); }, [reload]);

  const handleWater = (delta: number) => {
    const next = Math.max(0, water + delta);
    updateWater(today, next);
    setWater(next);
  };

  const handleDelete = (id: string) => { deleteMealEntry(today, id); reload(); };
  const handleDuplicate = (id: string) => { duplicateMealEntry(today, id); reload(); };
  const handleMove = (id: string) => {
    const entry = meals.find(m => m.id === id);
    if (!entry) return;
    const types: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const next = types[(types.indexOf(entry.mealType) + 1) % types.length];
    moveMealEntry(today, id, next);
    reload();
  };

  return (
    <main className="container section animate-fadeIn">
      {/* Calorie Ring */}
      <div className="flex flex-col items-center mb-6 relative">
        <CalorieRing consumed={nutrition.calories} target={profile.dailyCalorieTarget} size={180} />
      </div>

      {/* Macros */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div className="flex flex-col gap-3">
          <MacroBar label="Protein" current={nutrition.protein} target={profile.dailyProteinTarget} color="var(--blue)" />
          <MacroBar label="Carbs" current={nutrition.carbs} target={profile.dailyCarbsTarget} color="var(--orange)" />
          <MacroBar label="Fat" current={nutrition.fat} target={profile.dailyFatTarget} color="var(--red)" />
          <MacroBar label="Fibre" current={nutrition.fibre} target={profile.dailyFibreTarget} color="var(--green-600)" />
          <MacroBar label="Water" current={water} target={profile.dailyWaterTarget} color="var(--blue)" unit=" glasses" />
          <div className="flex items-center gap-2 mt-1">
            <button onClick={() => handleWater(1)} className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
              <Droplets size={14} /> +1 Glass
            </button>
            {water > 0 && (
              <button onClick={() => handleWater(-1)} className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>−1</button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-5 overflow-x-auto no-scrollbar">
        {QUICK_ACTIONS.map(a => (
          <Link key={a.href} href={a.href} className="btn btn-sm no-underline" style={{ background: a.color, color: 'white', flexShrink: 0 }}>
            <a.icon size={16} /> {a.label}
          </Link>
        ))}
        <Link href="/body-measurements" className="btn btn-sm btn-secondary no-underline" style={{ flexShrink: 0 }}>
          <Scale size={16} /> Weight
        </Link>
      </div>

      {/* Daily Insight */}
      <div className="card" style={{ padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Lightbulb size={18} style={{ color: 'var(--orange)', flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {getDailyInsight(nutrition, profile)}
        </p>
      </div>

      {/* Meal Sections */}
      {MEAL_TYPES.map(({ key, label, emoji }) => {
        const mealItems = meals.filter(m => m.mealType === key);
        const mealCals = mealItems.reduce((s, m) => s + m.nutrition.calories, 0);
        return (
          <div key={key} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{emoji} {label}</h2>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{Math.round(mealCals)} kcal</span>
                <Link href={`/food-search?meal=${key}`} className="btn btn-secondary btn-sm" style={{ fontSize: 11, padding: '4px 10px', minHeight: 28 }}>
                  <Plus size={12} /> Add
                </Link>
              </div>
            </div>
            {mealItems.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--gray-400)', padding: '8px 0' }}>No items logged</p>
            ) : (
              mealItems.map(entry => (
                <MealCard
                  key={entry.id}
                  entry={entry}
                  onDelete={() => handleDelete(entry.id)}
                  onDuplicate={() => handleDuplicate(entry.id)}
                  onMove={() => handleMove(entry.id)}
                />
              ))
            )}
          </div>
        );
      })}

      <Disclaimer />
    </main>
  );
}
