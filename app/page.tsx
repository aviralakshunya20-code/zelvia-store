'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Camera,
  Plus,
  Mic,
  Droplets,
  Scale,
  Lightbulb,
  Sparkles,
  ChevronRight,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { CalorieRing } from '@/components/ui/CalorieRing';
import { MacroBar } from '@/components/ui/MacroBar';
import { MealCard } from '@/components/ui/MealCard';
import { Disclaimer } from '@/components/ui/Disclaimer';
import {
  getProfile,
  getDayLog,
  getDayNutritionTotals,
  todayStr,
  defaultProfile,
  updateWater,
  deleteMealEntry,
  duplicateMealEntry,
  moveMealEntry,
} from '@/lib/store';
import type { UserProfile, MealEntry, MealType } from '@/lib/types';

const MEAL_TYPES: { key: MealType; label: string; emoji: string; timeHint: string; quickSuggest: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅', timeHint: '7:00 AM - 10:30 AM', quickSuggest: 'Poha, Idli, Roti, Eggs' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️', timeHint: '12:30 PM - 3:00 PM', quickSuggest: 'Dal, Rice, Roti, Sabzi, Curd' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙', timeHint: '7:30 PM - 10:00 PM', quickSuggest: 'Khichdi, Paneer, Salad, Roti' },
  { key: 'snacks', label: 'Snacks & Drinks', emoji: '🍿', timeHint: 'Anytime', quickSuggest: 'Chai, Roasted Chana, Fruit, Nuts' },
];

const QUICK_EXAMPLES = [
  { label: '2 Roti + Dal Tadka', query: '2 roti and 1 katori dal tadka' },
  { label: '1 Plate Poha + Chai', query: '1 plate poha and 1 cup chai' },
  { label: '2 Eggs Bhurji + Toast', query: '2 eggs bhurji and 2 brown bread toast' },
  { label: 'Curd Rice + Salad', query: '1 katori curd rice with cucumber salad' },
];

function getGreeting(name?: string): { greeting: string; subtext: string } {
  const hour = new Date().getHours();
  const userName = name && name.trim() ? `, ${name.trim()}` : '';
  
  if (hour < 12) {
    return {
      greeting: `Good morning${userName} 🌅`,
      subtext: "Let's kickstart your day with a healthy breakfast.",
    };
  }
  if (hour < 17) {
    return {
      greeting: `Good afternoon${userName} ☀️`,
      subtext: 'Time to fuel up and keep your energy high.',
    };
  }
  if (hour < 21) {
    return {
      greeting: `Good evening${userName} 🌙`,
      subtext: 'Wrap up your daily nutrition and hit your targets.',
    };
  }
  return {
    greeting: `Good night${userName} 🌌`,
    subtext: 'Review your day or log late evening snacks.',
  };
}

function getFormattedDate(): string {
  const today = new Date();
  return today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
}

function getDailyInsight(
  nutrition: { calories: number; protein: number; fibre: number },
  profile: UserProfile
): string {
  const proteinGap = profile.dailyProteinTarget - nutrition.protein;
  const fibreGap = profile.dailyFibreTarget - nutrition.fibre;
  const calPct = nutrition.calories / Math.max(profile.dailyCalorieTarget, 1);

  if (nutrition.calories === 0) {
    return 'Start your day by scanning breakfast — even a quick entry helps you stay accountable.';
  }
  if (proteinGap > 15) {
    return `You're ${Math.round(proteinGap)}g short of your protein goal — try paneer, eggs, sprouts, or Greek yogurt.`;
  }
  if (fibreGap > 10) {
    return `Boost fibre with a bowl of dal, fresh cucumber salad, or roasted chana to reach your ${profile.dailyFibreTarget}g goal.`;
  }
  if (calPct > 1.1) {
    return 'You have crossed your calorie target slightly. Focus on protein and hydration for the rest of the day!';
  }
  if (calPct > 0.8) {
    return "Great job! You're on track to meet your targets today. Keep it up!";
  }
  return 'Steady progress! Keep logging homemade meals for the most accurate picture.';
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [water, setWater] = useState(0);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
  const [showCustomWater, setShowCustomWater] = useState(false);
  const [customWaterInput, setCustomWaterInput] = useState('');
  const today = todayStr();

  const reload = useCallback(() => {
    const p = getProfile() || defaultProfile();
    setProfile(p);
    const log = getDayLog(today);
    setMeals(log.meals);
    setWater(log.waterGlasses || 0);
    setNutrition(getDayNutritionTotals(today));
  }, [today]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleWater = (delta: number) => {
    const next = Math.max(0, water + delta);
    updateWater(today, next);
    setWater(next);
  };

  const handleCustomWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customWaterInput, 10);
    if (!isNaN(val) && val >= 0) {
      updateWater(today, val);
      setWater(val);
      setShowCustomWater(false);
      setCustomWaterInput('');
    }
  };

  const handleDelete = (id: string) => {
    deleteMealEntry(today, id);
    reload();
  };
  const handleDuplicate = (id: string) => {
    duplicateMealEntry(today, id);
    reload();
  };
  const handleMove = (id: string) => {
    const entry = meals.find((m) => m.id === id);
    if (!entry) return;
    const types: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const next = types[(types.indexOf(entry.mealType) + 1) % types.length];
    moveMealEntry(today, id, next);
    reload();
  };

  const { greeting, subtext } = getGreeting(profile.name);
  const formattedDate = getFormattedDate();
  const hasNoMeals = meals.length === 0;

  return (
    <main className="container section animate-fadeIn" style={{ paddingTop: 8 }}>
      {/* Onboarding Banner if not completed */}
      {!profile.onboardingComplete && (
        <div
          className="card mb-4"
          style={{
            padding: '12px 16px',
            background: 'linear-gradient(135deg, var(--green-100) 0%, #EFF6FF 100%)',
            border: '1.5px solid var(--green-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={20} style={{ color: 'var(--green-700)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-900)' }}>
                Personalize your calorie & macro targets
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                Set your goal, weight, height & get exact Mifflin-St Jeor targets in 30 seconds.
              </div>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="btn btn-primary btn-sm no-underline"
            style={{ flexShrink: 0, padding: '6px 14px', fontSize: 12 }}
          >
            Start Setup →
          </Link>
        </div>
      )}

      {/* Greeting Header & Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {greeting}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0' }}>{subtext}</p>
        </div>
        <div
          className="badge"
          style={{
            alignSelf: 'flex-start',
            padding: '4px 10px',
            background: 'var(--gray-100)',
            color: 'var(--text)',
            fontSize: 12,
            fontWeight: 500,
            border: '1px solid var(--border)',
          }}
        >
          <Clock size={12} style={{ marginRight: 5, color: 'var(--green-700)' }} /> {formattedDate}
        </div>
      </div>

      {/* Top Overview: Compact 2-column on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
        {/* Left: Calorie Ring (Compact) */}
        <div
          className="card md:col-span-5 flex flex-col items-center justify-center relative"
          style={{ padding: '14px 12px', minHeight: 180 }}
        >
          <CalorieRing consumed={nutrition.calories} target={profile.dailyCalorieTarget} size={145} />
          <div className="flex items-center gap-4 mt-2" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            <span>Goal: <strong style={{ color: 'var(--text)' }}>{profile.dailyCalorieTarget}</strong> kcal</span>
            <span>•</span>
            <span>Food: <strong style={{ color: 'var(--green-700)' }}>{Math.round(nutrition.calories)}</strong> kcal</span>
          </div>
        </div>

        {/* Right: Nutrition Macros Card */}
        <div className="card md:col-span-7 flex flex-col justify-between" style={{ padding: '14px 16px' }}>
          <div className="flex items-center justify-between mb-2">
            <h2 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, color: 'var(--text-secondary)' }}>
              Macronutrient Breakdown
            </h2>
            <Link href="/macro-calculator" style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 500 }}>
              Calculator →
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <MacroBar label="Protein" current={nutrition.protein} target={profile.dailyProteinTarget} color="var(--blue)" />
            <MacroBar label="Carbs" current={nutrition.carbs} target={profile.dailyCarbsTarget} color="var(--orange)" />
            <MacroBar label="Fat" current={nutrition.fat} target={profile.dailyFatTarget} color="var(--red)" />
            <MacroBar label="Fibre" current={nutrition.fibre} target={profile.dailyFibreTarget} color="var(--green-600)" />
          </div>
        </div>
      </div>

      {/* Dedicated Water Tracker Card (Separated from Macros) */}
      <div className="water-card mb-3" style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: 24, flexShrink: 0 }}>💧</div>
        <div style={{ flex: 1 }}>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Hydration</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>
              {water} / {profile.dailyWaterTarget || 8} glasses ({water * 250} ml)
            </span>
          </div>
          {/* Visual glasses progress bar */}
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', margin: '6px 0' }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (water / (profile.dailyWaterTarget || 8)) * 100)}%`,
                background: 'var(--blue)',
                borderRadius: 3,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5" style={{ flexShrink: 0 }}>
          <button
            onClick={() => handleWater(1)}
            className="btn btn-secondary btn-xs"
            style={{ background: '#DBEAFE', color: '#1E40AF', fontWeight: 600, padding: '4px 10px' }}
            title="Add 1 glass (250ml)"
          >
            <Plus size={13} /> 1 Glass
          </button>
          {water > 0 && (
            <button
              onClick={() => handleWater(-1)}
              className="btn btn-ghost btn-xs"
              style={{ fontSize: 11, padding: '4px 6px' }}
              title="Remove 1 glass"
            >
              −1
            </button>
          )}
          <button
            onClick={() => setShowCustomWater(!showCustomWater)}
            className="btn btn-ghost btn-xs"
            style={{ fontSize: 11, padding: '4px 6px', color: 'var(--text-secondary)' }}
            title="Set custom water"
          >
            ✏️
          </button>
        </div>
      </div>

      {/* Custom Water Input Form */}
      {showCustomWater && (
        <form onSubmit={handleCustomWaterSubmit} className="card mb-3 animate-fadeIn" style={{ padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="number"
            min="0"
            max="30"
            className="input"
            style={{ minHeight: 34, padding: '4px 8px', fontSize: 13 }}
            placeholder="Enter total glasses (e.g. 8)"
            value={customWaterInput}
            onChange={(e) => setCustomWaterInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ minHeight: 34 }}>Save</button>
          <button type="button" onClick={() => setShowCustomWater(false)} className="btn btn-ghost btn-sm" style={{ minHeight: 34 }}>Cancel</button>
        </form>
      )}

      {/* Action Buttons with Clear Hierarchy */}
      <div className="mb-3">
        {hasNoMeals ? (
          /* Empty State Hero Action */
          <div className="empty-hero mb-3">
            <div style={{ fontSize: 32, marginBottom: 6 }}>🍲</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
              Start with your first meal
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 auto 12px', maxWidth: 440, lineHeight: 1.5 }}>
              Scan a plate photo or type what you ate in plain English or Hinglish.
              <span style={{ display: 'block', fontSize: 11, color: 'var(--green-700)', fontWeight: 600, marginTop: 2 }}>
                ⚡ Usually takes under 10 seconds
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
              <Link
                href="/scan"
                className="btn btn-primary btn-lg no-underline w-full sm:w-auto"
                style={{
                  boxShadow: '0 4px 14px rgba(64, 145, 108, 0.35)',
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '12px 24px',
                }}
              >
                <Camera size={20} /> Scan Your First Meal
              </Link>
            </div>

            {/* Quick 1-tap Examples */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Quick Examples:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
                {QUICK_EXAMPLES.map((ex) => (
                  <Link
                    key={ex.label}
                    href={`/scan?mode=text&text=${encodeURIComponent(ex.query)}`}
                    className="badge no-underline"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '5px 10px',
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    + {ex.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Regular Action Bar when meals already exist */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link
              href="/scan"
              className="btn btn-primary btn-sm no-underline"
              style={{ padding: '8px 12px', fontSize: 13, fontWeight: 600 }}
            >
              <Camera size={16} /> Scan Meal
            </Link>
            <Link
              href="/food-search"
              className="btn btn-outline btn-sm no-underline"
              style={{ padding: '8px 12px', fontSize: 13 }}
            >
              <Plus size={16} /> Add Food
            </Link>
            <Link
              href="/scan?mode=voice"
              className="btn btn-subtle btn-sm no-underline"
              style={{ padding: '8px 12px', fontSize: 13 }}
            >
              <Mic size={16} style={{ color: 'var(--orange)' }} /> Voice Log
            </Link>
            <Link
              href="/body-measurements"
              className="btn btn-subtle btn-sm no-underline"
              style={{ padding: '8px 12px', fontSize: 13 }}
            >
              <Scale size={16} /> Weight
            </Link>
          </div>
        )}
      </div>

      {/* Daily Insight Tip */}
      <div
        className="card mb-4"
        style={{
          padding: '10px 14px',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          background: 'var(--surface)',
        }}
      >
        <Lightbulb size={17} style={{ color: 'var(--orange)', flexShrink: 0 }} />
        <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>
          {getDailyInsight(nutrition, profile)}
        </p>
        <Link href="/indian-food-calories" style={{ fontSize: 11, color: 'var(--green-700)', flexShrink: 0, fontWeight: 500 }}>
          Food Chart →
        </Link>
      </div>

      {/* Meal Sections (Compact & Visible Above Fold on Desktop) */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Today&apos;s Meals</h2>
          <Link href="/diary" style={{ fontSize: 12, color: 'var(--green-700)', fontWeight: 500 }}>
            View Full Diary →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {MEAL_TYPES.map(({ key, label, emoji, quickSuggest }) => {
            const mealItems = meals.filter((m) => m.mealType === key);
            const mealCals = mealItems.reduce((s, m) => s + m.nutrition.calories, 0);
            const hasItems = mealItems.length > 0;

            return (
              <div
                key={key}
                className="card"
                style={{
                  padding: '12px 14px',
                  border: hasItems ? '1px solid var(--border)' : '1px dashed var(--gray-300)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 18 }}>{emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasItems && (
                      <span className="badge badge-green" style={{ fontSize: 11 }}>
                        {Math.round(mealCals)} kcal
                      </span>
                    )}
                    <Link
                      href={`/food-search?meal=${key}`}
                      className="btn btn-secondary btn-xs no-underline"
                      style={{ padding: '3px 8px', fontSize: 11 }}
                    >
                      <Plus size={11} /> Add
                    </Link>
                  </div>
                </div>

                {hasItems ? (
                  <div className="flex flex-col gap-1.5 mt-2">
                    {mealItems.map((entry) => (
                      <MealCard
                        key={entry.id}
                        entry={entry}
                        onDelete={() => handleDelete(entry.id)}
                        onDuplicate={() => handleDuplicate(entry.id)}
                        onMove={() => handleMove(entry.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: '8px 0 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 12,
                      color: 'var(--gray-400)',
                    }}
                  >
                    <span>Suggested: {quickSuggest}</span>
                    <Link
                      href={`/scan?meal=${key}`}
                      style={{ fontSize: 11, color: 'var(--green-700)', fontWeight: 500 }}
                    >
                      Scan →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tools & Insights Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <Link href="/progress" className="card no-underline p-3 text-center" style={{ color: 'var(--text)' }}>
          <TrendingUp size={18} style={{ color: 'var(--green-700)', margin: '0 auto 4px' }} />
          <div style={{ fontSize: 12, fontWeight: 600 }}>Weekly Trends</div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>View progress</div>
        </Link>
        <Link href="/recipes" className="card no-underline p-3 text-center" style={{ color: 'var(--text)' }}>
          <span style={{ fontSize: 18, display: 'block', marginBottom: 2 }}>🍲</span>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Recipe Builder</div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Cook & track</div>
        </Link>
        <Link href="/indian-food-calories" className="card no-underline p-3 text-center" style={{ color: 'var(--text)' }}>
          <span style={{ fontSize: 18, display: 'block', marginBottom: 2 }}>📋</span>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Food Chart</div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>80+ Indian foods</div>
        </Link>
        <Link href="/tdee-calculator" className="card no-underline p-3 text-center" style={{ color: 'var(--text)' }}>
          <span style={{ fontSize: 18, display: 'block', marginBottom: 2 }}>⚡</span>
          <div style={{ fontSize: 12, fontWeight: 600 }}>TDEE Calculator</div>
          <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Burn rate</div>
        </Link>
      </div>

      <Disclaimer />
    </main>
  );
}
