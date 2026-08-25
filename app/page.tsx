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
  HelpCircle,
  Copy,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Pencil,
  X,
  Info,
  RotateCcw,
  Check,
} from 'lucide-react';
import { CalorieRing } from '@/components/ui/CalorieRing';
import { MacroBar } from '@/components/ui/MacroBar';
import { MealCard } from '@/components/ui/MealCard';
import { Disclaimer } from '@/components/ui/Disclaimer';
import {
  getProfile,
  getDayLog,
  getDayNutritionTotals,
  getMealNutritionTotals,
  todayStr,
  defaultProfile,
  updateWater,
  deleteMealEntry,
  duplicateMealEntry,
  moveMealEntry,
  updateMealEntry,
  copyMealsFromDate,
  getWeeklyStats,
  getRecentFoods,
  WeeklyStats,
} from '@/lib/store';
import type { UserProfile, MealEntry, MealType, PortionUnit, NutritionInfo } from '@/lib/types';

const MEAL_TYPES: { key: MealType; label: string; emoji: string; timeHint: string }[] = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅', timeHint: '7:00 AM - 10:30 AM' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️', timeHint: '12:30 PM - 3:00 PM' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙', timeHint: '7:30 PM - 10:00 PM' },
  { key: 'snacks', label: 'Snacks & Drinks', emoji: '🍿', timeHint: 'Anytime' },
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
      subtext: "Let's kickstart your day with a nourishing meal.",
    };
  }
  if (hour < 17) {
    return {
      greeting: `Good afternoon${userName} ☀️`,
      subtext: 'Time to refuel and sustain your daily energy.',
    };
  }
  if (hour < 21) {
    return {
      greeting: `Good evening${userName} 🌙`,
      subtext: 'Review your day or log dinner.',
    };
  }
  return {
    greeting: `Good night${userName} 🌌`,
    subtext: 'Review your day or log late evening refreshments.',
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

function getDailyFocusInsight(
  meals: MealEntry[],
  water: number,
  nutrition: NutritionInfo,
  profile: UserProfile
): { text: string; type: 'info' | 'success' | 'alert' } {
  const needsReviewMeals = meals.filter(
    m => m.isEstimated && (m.confidenceLevel === 'medium' || m.confidenceLevel === 'low')
  );

  if (needsReviewMeals.length > 0) {
    return {
      text: `You have ${needsReviewMeals.length} estimated meal(s) that can be reviewed for more accurate daily totals.`,
      type: 'alert',
    };
  }

  if (meals.length === 0) {
    return {
      text: 'Start your day by logging your first meal — photo scanning takes under 10 seconds.',
      type: 'info',
    };
  }

  const breakfastItems = meals.filter(m => m.mealType === 'breakfast');
  const breakfastProtein = breakfastItems.reduce((s, m) => s + m.nutrition.protein, 0);
  if (breakfastProtein >= 15) {
    return {
      text: `You logged ${Math.round(breakfastProtein)}g protein at breakfast — a great foundation for steady energy.`,
      type: 'success',
    };
  }

  const waterTarget = profile.dailyWaterTarget || 8;
  if (water >= waterTarget) {
    return {
      text: `Hydration goal met (${water}/${waterTarget} glasses). Listen to your body and hydrate naturally.`,
      type: 'success',
    };
  }

  const calDiff = nutrition.calories - profile.dailyCalorieTarget;
  if (calDiff > 100) {
    return {
      text: `You are ${Math.round(calDiff)} kcal above today’s target. One day does not define progress—focus on your next meal and your weekly trend.`,
      type: 'info',
    };
  }

  return {
    text: 'Steady awareness builds healthy habits. Focus on nourishment, balanced plates, and regular meals.',
    type: 'info',
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [water, setWater] = useState(0);
  const [nutrition, setNutrition] = useState<NutritionInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fibre: 0,
  });
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    averageCalories: 0,
    averageProtein: 0,
    totalMealsLogged: 0,
    daysLoggedCount: 0,
    insight: '',
  });

  const [showCustomWater, setShowCustomWater] = useState(false);
  const [customWaterInput, setCustomWaterInput] = useState('');
  const [showAccuracyModal, setShowAccuracyModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MealEntry | null>(null);

  const today = todayStr();

  const reload = useCallback(() => {
    const p = getProfile() || defaultProfile();
    setProfile(p);
    const log = getDayLog(today);
    setMeals(log.meals);
    setWater(log.waterGlasses || 0);
    setNutrition(getDayNutritionTotals(today));
    setWeeklyStats(getWeeklyStats(today));
  }, [today]);

  useEffect(() => {
    reload();
  }, [reload]);

  const handleWater = (delta: number) => {
    const next = Math.max(0, water + delta);
    updateWater(today, next, profile.waterGlassSizeMl || 250);
    setWater(next);
  };

  const handleCustomWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customWaterInput, 10);
    if (!isNaN(val) && val >= 0) {
      updateWater(today, val, profile.waterGlassSizeMl || 250);
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
    const entry = meals.find(m => m.id === id);
    if (!entry) return;
    const types: MealType[] = ['breakfast', 'lunch', 'dinner', 'snacks'];
    const next = types[(types.indexOf(entry.mealType) + 1) % types.length];
    moveMealEntry(today, id, next);
    reload();
  };

  const handleCopyYesterday = (mealType: MealType) => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yestStr = d.toISOString().split('T')[0];
    copyMealsFromDate(yestStr, today, mealType);
    reload();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;
    updateMealEntry(today, editingEntry.id, editingEntry);
    setEditingEntry(null);
    reload();
  };

  const { greeting, subtext } = getGreeting(profile.name);
  const formattedDate = getFormattedDate();
  const hasNoMeals = meals.length === 0;

  const hasEstimatedMeals = meals.some(m => m.isEstimated);
  const needsReviewMeals = meals.filter(
    m => m.isEstimated && (m.confidenceLevel === 'medium' || m.confidenceLevel === 'low')
  );

  const waterTarget = profile.dailyWaterTarget || 8;
  const isWaterGoalMet = water >= waterTarget;
  const glassVolume = profile.waterGlassSizeMl || 250;
  const waterVolumeMl = water * glassVolume;

  const focusInsight = getDailyFocusInsight(meals, water, nutrition, profile);

  return (
    <main className="container section animate-fadeIn" style={{ paddingTop: 8, paddingBottom: 60 }}>
      {/* Onboarding Banner if not completed */}
      {!profile.onboardingComplete && (
        <div
          className="card mb-4 animate-fadeIn"
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
                Set your goal, weight, height & get safe Mifflin-St Jeor targets in 30 seconds.
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

      {/* Top Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
        {/* Left: Calorie Ring (Supportive & Non-shaming) */}
        <div
          className="card md:col-span-5 flex flex-col items-center justify-center relative"
          style={{ padding: '14px 12px', minHeight: 180 }}
        >
          <CalorieRing
            consumed={nutrition.calories}
            target={profile.dailyCalorieTarget}
            size={145}
            hasEstimatedMeals={hasEstimatedMeals}
          />
          <div className="flex items-center gap-3 mt-2" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            <span>
              Goal: <strong style={{ color: 'var(--text)' }}>{profile.dailyCalorieTarget}</strong> kcal
            </span>
            <span>•</span>
            <span>
              Food:{' '}
              <strong style={{ color: 'var(--green-800)' }}>
                {hasEstimatedMeals ? `~${Math.round(nutrition.calories)}` : Math.round(nutrition.calories)}
              </strong>{' '}
              kcal
            </span>
          </div>

          {hasEstimatedMeals && (
            <button
              type="button"
              onClick={() => setShowAccuracyModal(true)}
              className="btn btn-ghost btn-xs mt-1"
              style={{ fontSize: 10.5, color: 'var(--green-700)', padding: '2px 6px' }}
            >
              Estimated total · Accuracy review →
            </button>
          )}
        </div>

        {/* Right: Macronutrient Breakdown with Explanations */}
        <div className="card md:col-span-7 flex flex-col justify-between" style={{ padding: '14px 16px' }}>
          <div className="flex items-center justify-between mb-2">
            <h2
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
                color: 'var(--text-secondary)',
              }}
            >
              Macronutrient Breakdown
            </h2>
            <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>Tap any macro for info</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <MacroBar
              label="Protein"
              current={nutrition.protein}
              target={profile.dailyProteinTarget}
              color="var(--blue)"
            />
            <MacroBar
              label="Carbs"
              current={nutrition.carbs}
              target={profile.dailyCarbsTarget}
              color="var(--orange)"
            />
            <MacroBar
              label="Fat"
              current={nutrition.fat}
              target={profile.dailyFatTarget}
              color="var(--red)"
            />
            <MacroBar
              label="Fibre"
              current={nutrition.fibre}
              target={profile.dailyFibreTarget}
              color="var(--green-600)"
            />
          </div>
        </div>
      </div>

      {/* 1. Daily Focus Insight Card */}
      <div
        className="card mb-3 animate-fadeIn"
        style={{
          padding: '10px 14px',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          background:
            focusInsight.type === 'alert'
              ? '#FEF3C7'
              : focusInsight.type === 'success'
              ? 'var(--green-100)'
              : 'var(--surface)',
          border:
            focusInsight.type === 'alert'
              ? '1px solid #FCD34D'
              : focusInsight.type === 'success'
              ? '1px solid var(--green-300)'
              : '1px solid var(--border)',
        }}
      >
        {focusInsight.type === 'alert' ? (
          <AlertCircle size={18} style={{ color: '#B45309', flexShrink: 0 }} />
        ) : focusInsight.type === 'success' ? (
          <CheckCircle2 size={18} style={{ color: 'var(--green-700)', flexShrink: 0 }} />
        ) : (
          <Lightbulb size={18} style={{ color: 'var(--orange)', flexShrink: 0 }} />
        )}
        <p
          style={{
            fontSize: 12.5,
            color: focusInsight.type === 'alert' ? '#92400E' : 'var(--text)',
            lineHeight: 1.45,
            margin: 0,
            flex: 1,
          }}
        >
          {focusInsight.text}
        </p>
      </div>

      {/* 2. Hydration Safety Card */}
      <div className="water-card mb-3" style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 24, flexShrink: 0 }}>💧</div>
        <div style={{ flex: 1 }}>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Daily Hydration</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: isWaterGoalMet ? 'var(--green-800)' : 'var(--blue)',
              }}
            >
              {water} / {waterTarget} glasses ({waterVolumeMl} ml)
            </span>
          </div>

          <div
            style={{
              height: 6,
              background: 'var(--border)',
              borderRadius: 3,
              overflow: 'hidden',
              margin: '6px 0 4px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (water / waterTarget) * 100)}%`,
                background: isWaterGoalMet ? 'var(--green-600)' : 'var(--blue)',
                borderRadius: 3,
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-secondary)', margin: '2px 0 0', lineHeight: 1.35 }}>
            Hydration needs differ with climate, activity, and health conditions. Drink to thirst.
          </p>
        </div>

        <div className="flex items-center gap-1.5" style={{ flexShrink: 0 }}>
          {isWaterGoalMet ? (
            <div className="flex items-center gap-1">
              <span
                className="badge badge-green"
                style={{ fontSize: 11, fontWeight: 600, padding: '4px 8px' }}
              >
                ✓ Goal met
              </span>
              <button
                onClick={() => handleWater(1)}
                className="btn btn-subtle btn-xs"
                style={{ fontSize: 11, padding: '4px 8px' }}
                title="Log additional glass"
              >
                +1 Glass
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleWater(1)}
              className="btn btn-secondary btn-xs"
              style={{ background: '#DBEAFE', color: '#1E40AF', fontWeight: 600, padding: '5px 12px' }}
              title={`Add 1 glass (${glassVolume}ml)`}
            >
              <Plus size={13} /> +1 Glass
            </button>
          )}

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
        <form
          onSubmit={handleCustomWaterSubmit}
          className="card mb-3 animate-fadeIn"
          style={{ padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <input
            type="number"
            min="0"
            max="30"
            className="input"
            style={{ minHeight: 34, padding: '4px 8px', fontSize: 13 }}
            placeholder={`Enter total glasses (e.g. ${waterTarget})`}
            value={customWaterInput}
            onChange={e => setCustomWaterInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ minHeight: 34 }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setShowCustomWater(false)}
            className="btn btn-ghost btn-sm"
            style={{ minHeight: 34 }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* 3. Action Buttons / Empty State */}
      <div className="mb-4">
        {hasNoMeals ? (
          <div className="empty-hero mb-3">
            <div style={{ fontSize: 32, marginBottom: 6 }}>🍲</div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>
              Log your first meal today
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                margin: '0 auto 12px',
                maxWidth: 440,
                lineHeight: 1.5,
              }}
            >
              Scan a plate photo or type what you ate in plain English or Hinglish.
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  color: 'var(--green-700)',
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                ⚡ Usually takes under 10 seconds
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3">
              <Link
                href="/scan"
                className="btn btn-primary btn-lg no-underline w-full sm:w-auto"
                style={{
                  boxShadow: '0 4px 14px rgba(35, 123, 91, 0.35)',
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
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Quick Examples:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
                {QUICK_EXAMPLES.map(ex => (
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

      {/* 4. Meal Sections: Breakfast, Lunch, Dinner, Snacks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text)' }}>Today&apos;s Meals</h2>
          <Link href="/diary" style={{ fontSize: 12, color: 'var(--green-700)', fontWeight: 500 }}>
            View Full Diary →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {MEAL_TYPES.map(({ key, label, emoji }) => {
            const mealItems = meals.filter(m => m.mealType === key);
            // Strict recalculation of meal calories
            const mealCals = mealItems.reduce((s, m) => s + (Number(m.nutrition?.calories) || 0), 0);
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
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasItems && (
                      <span className="badge badge-green" style={{ fontSize: 11, fontWeight: 700 }}>
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
                  <div className="flex flex-col gap-2 mt-2">
                    {mealItems.map(entry => (
                      <MealCard
                        key={entry.id}
                        entry={entry}
                        onEdit={item => setEditingEntry(item)}
                        onDelete={() => handleDelete(entry.id)}
                        onDuplicate={() => handleDuplicate(entry.id)}
                        onMove={() => handleMove(entry.id)}
                      />
                    ))}
                  </div>
                ) : (
                  /* Better Empty Meal Options (Requirement F.3) */
                  <div className="flex flex-col gap-1.5 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Link
                        href={`/scan?meal=${key}`}
                        className="badge no-underline"
                        style={{ background: 'var(--green-100)', color: 'var(--green-900)', fontSize: 11 }}
                      >
                        <Camera size={11} style={{ marginRight: 3 }} /> Scan
                      </Link>
                      <Link
                        href={`/scan?mode=text&meal=${key}`}
                        className="badge no-underline"
                        style={{ background: 'var(--gray-100)', color: 'var(--text)', fontSize: 11 }}
                      >
                        ✍️ Type
                      </Link>
                      <Link
                        href={`/food-search?meal=${key}`}
                        className="badge no-underline"
                        style={{ background: 'var(--gray-100)', color: 'var(--text)', fontSize: 11 }}
                      >
                        🕒 Recent
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCopyYesterday(key)}
                        className="badge"
                        style={{
                          background: 'var(--gray-100)',
                          color: 'var(--text)',
                          fontSize: 11,
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        <Copy size={10} style={{ marginRight: 3 }} /> Copy Yesterday
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Weekly Trend Card (Over Daily Perfection) */}
      <div className="card mb-4 p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: 'var(--green-700)' }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text)' }}>
              Weekly Nutrition Trend
            </h3>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Last 7 Days</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-3 text-center">
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800">
            <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>Avg Calories</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>
              {weeklyStats.averageCalories > 0 ? `${weeklyStats.averageCalories} kcal` : '—'}
            </div>
          </div>
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800">
            <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>Avg Protein</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>
              {weeklyStats.averageProtein > 0 ? `${weeklyStats.averageProtein}g` : '—'}
            </div>
          </div>
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800">
            <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>Meals Logged</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green-800)' }}>
              {weeklyStats.totalMealsLogged}
            </div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
          💡 {weeklyStats.insight}
        </p>
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
        <Link
          href="/indian-food-calories"
          className="card no-underline p-3 text-center"
          style={{ color: 'var(--text)' }}
        >
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

      {/* Accuracy Review Modal */}
      {showAccuracyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
        >
          <div
            className="card animate-scaleIn"
            style={{ width: '100%', maxWidth: 480, padding: 20, maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Accuracy Review</h3>
              <button
                onClick={() => setShowAccuracyModal(false)}
                className="btn btn-ghost btn-icon btn-xs"
                style={{ padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: 12 }}>
              Your daily total contains meals estimated with AI. You can review and adjust any item below to make your
              diary 100% accurate:
            </p>

            <div className="flex flex-col gap-2 mb-4">
              {needsReviewMeals.length === 0 ? (
                <div className="p-3 text-center bg-gray-50 rounded text-sm text-gray-600">
                  All logged items have been verified or have high confidence.
                </div>
              ) : (
                needsReviewMeals.map(item => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded border border-gray-200 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.foodName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {item.quantity} {item.unit} · {item.nutrition.calories} kcal · {item.source}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowAccuracyModal(false);
                        setEditingEntry(item);
                      }}
                      className="btn btn-outline btn-xs"
                      style={{ fontSize: 11, padding: '3px 8px' }}
                    >
                      <Pencil size={11} /> Edit
                    </button>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => setShowAccuracyModal(false)} className="btn btn-primary btn-sm w-full">
              Done Reviewing
            </button>
          </div>
        </div>
      )}

      {/* Quick Edit Meal Entry Modal */}
      {editingEntry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
        >
          <form
            onSubmit={handleSaveEdit}
            className="card animate-scaleIn"
            style={{ width: '100%', maxWidth: 440, padding: 20 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Edit Meal Entry</h3>
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="btn btn-ghost btn-icon btn-xs"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div>
                <label className="label">Food Name</label>
                <input
                  className="input"
                  value={editingEntry.foodName}
                  onChange={e => setEditingEntry({ ...editingEntry, foodName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="label">Quantity</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0.25"
                    className="input"
                    value={editingEntry.quantity}
                    onChange={e =>
                      setEditingEntry({ ...editingEntry, quantity: parseFloat(e.target.value) || 1 })
                    }
                  />
                </div>
                <div>
                  <label className="label">Unit</label>
                  <select
                    className="input"
                    value={editingEntry.unit}
                    onChange={e =>
                      setEditingEntry({ ...editingEntry, unit: e.target.value as PortionUnit })
                    }
                  >
                    {[
                      'piece',
                      'serving',
                      'g',
                      'ml',
                      'katori',
                      'bowl',
                      'plate',
                      'roti',
                      'glass',
                      'cup',
                      'tablespoon',
                    ].map(u => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {(
                  [
                    ['calories', 'Cals', 'kcal'],
                    ['protein', 'Prot', 'g'],
                    ['carbs', 'Carb', 'g'],
                    ['fat', 'Fat', 'g'],
                    ['fibre', 'Fib', 'g'],
                  ] as const
                ).map(([k, label, unit]) => (
                  <div key={k}>
                    <label className="label" style={{ fontSize: 10, textAlign: 'center' }}>
                      {label}
                    </label>
                    <input
                      type="number"
                      className="input text-center"
                      style={{ padding: '6px 2px', fontSize: 12 }}
                      value={Math.round(editingEntry.nutrition[k])}
                      onChange={e =>
                        setEditingEntry({
                          ...editingEntry,
                          nutrition: {
                            ...editingEntry.nutrition,
                            [k]: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                    />
                    <span style={{ fontSize: 9, color: 'var(--text-secondary)', display: 'block', textAlign: 'center' }}>
                      {unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm flex-1">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditingEntry(null)}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <Disclaimer />
    </main>
  );
}
