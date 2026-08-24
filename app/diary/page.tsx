'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { MealCard } from '@/components/ui/MealCard';
import { MacroBar } from '@/components/ui/MacroBar';
import { getDayLog, getDayNutritionTotals, getProfile, defaultProfile, deleteMealEntry, duplicateMealEntry, moveMealEntry, copyMealsFromDate } from '@/lib/store';
import type { MealType, MealEntry, UserProfile } from '@/lib/types';

const MEAL_TYPES: { key: MealType; label: string }[] = [
  { key: 'breakfast', label: '🌅 Breakfast' },
  { key: 'lunch', label: '☀️ Lunch' },
  { key: 'dinner', label: '🌙 Dinner' },
  { key: 'snacks', label: '🍿 Snacks' },
];

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr: string): string {
  const today = new Date().toISOString().split('T')[0];
  if (dateStr === today) return 'Today';
  if (dateStr === addDays(today, -1)) return 'Yesterday';
  return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function DiaryPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());

  const reload = useCallback(() => {
    const log = getDayLog(date);
    setMeals(log.meals);
    setNutrition(getDayNutritionTotals(date));
    setProfile(getProfile() || defaultProfile());
  }, [date]);

  useEffect(() => { reload(); }, [reload]);

  const handleDelete = (id: string) => { deleteMealEntry(date, id); reload(); };
  const handleDuplicate = (id: string) => { duplicateMealEntry(date, id); reload(); };
  const handleMove = (id: string) => {
    const entry = meals.find(m => m.id === id);
    if (!entry) return;
    const types: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const next = types[(types.indexOf(entry.mealType) + 1) % types.length];
    moveMealEntry(date, id, next);
    reload();
  };
  const handleCopyYesterday = () => {
    copyMealsFromDate(addDays(date, -1), date);
    reload();
  };

  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Food Diary</h1>

      {/* Date Navigator */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setDate(addDays(date, -1))} className="btn btn-ghost btn-icon" aria-label="Previous day">
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span style={{ fontWeight: 600, fontSize: 16 }}>{formatDate(date)}</span>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ fontSize: 12, color: 'var(--text-secondary)', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'center' }} />
        </div>
        <button onClick={() => setDate(addDays(date, 1))} className="btn btn-ghost btn-icon" aria-label="Next day">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Daily Summary */}
      <div className="card mb-4" style={{ padding: '14px 18px' }}>
        <div className="flex justify-between items-center mb-3">
          <span style={{ fontWeight: 600, fontSize: 14 }}>Daily Total</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--green-700)' }}>{Math.round(nutrition.calories)} kcal</span>
        </div>
        <div className="flex flex-col gap-2">
          <MacroBar label="Protein" current={nutrition.protein} target={profile.dailyProteinTarget} color="var(--blue)" />
          <MacroBar label="Carbs" current={nutrition.carbs} target={profile.dailyCarbsTarget} color="var(--orange)" />
          <MacroBar label="Fat" current={nutrition.fat} target={profile.dailyFatTarget} color="var(--red)" />
          <MacroBar label="Fibre" current={nutrition.fibre} target={profile.dailyFibreTarget} color="var(--green-600)" />
        </div>
      </div>

      {/* Copy from yesterday */}
      <button onClick={handleCopyYesterday} className="btn btn-ghost btn-sm mb-4" style={{ fontSize: 12 }}>
        <Copy size={14} /> Copy meals from yesterday
      </button>

      {/* Meal Sections */}
      {MEAL_TYPES.map(({ key, label }) => {
        const items = meals.filter(m => m.mealType === key);
        const cals = items.reduce((s, m) => s + m.nutrition.calories, 0);
        return (
          <div key={key} className="mb-5">
            <div className="flex justify-between items-center mb-1">
              <h2 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{label}</h2>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{Math.round(cals)} kcal</span>
            </div>
            {items.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--gray-400)', padding: '6px 0' }}>Nothing logged</p>
            ) : (
              items.map(entry => (
                <MealCard
                  key={entry.id} entry={entry}
                  onEdit={() => {}}
                  onDelete={() => handleDelete(entry.id)}
                  onDuplicate={() => handleDuplicate(entry.id)}
                  onMove={() => handleMove(entry.id)}
                />
              ))
            )}
          </div>
        );
      })}
    </main>
  );
}
