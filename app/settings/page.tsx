'use client';

import { useState, useEffect } from 'react';
import { getProfile, saveProfile, defaultProfile, getTheme, setTheme } from '@/lib/store';
import { calcDailyCalories, calcMacros } from '@/lib/calculators';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { AlertCircle, Droplets, HeartPulse, ShieldCheck } from 'lucide-react';
import type { UserProfile, Goal, ActivityLevel, DietPreference } from '@/lib/types';

const GOALS: { value: Goal; label: string }[] = [
  { value: 'fat_loss', label: 'Fat Loss' },
  { value: 'maintenance', label: 'Maintain Weight' },
  { value: 'muscle_gain', label: 'Muscle Gain' },
  { value: 'better_protein', label: 'Better Protein Intake' },
  { value: 'healthier_eating', label: 'Healthier Eating' },
];

const ACTIVITY_LEVELS: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary (desk job)' },
  { value: 'light', label: 'Light (1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (3-5 days/week)' },
  { value: 'active', label: 'Active (6-7 days/week)' },
  { value: 'very_active', label: 'Very Active (intense daily)' },
];

const DIET_OPTIONS: { value: DietPreference; label: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'eggitarian', label: 'Eggitarian' },
  { value: 'jain', label: 'Jain' },
  { value: 'halal', label: 'Halal' },
  { value: 'high_protein', label: 'High Protein' },
  { value: 'low_carb', label: 'Low Carb' },
  { value: 'diabetic_friendly', label: 'Diabetic Friendly' },
];

export default function SettingsPage() {
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile());
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfileState(getProfile() || defaultProfile());
    setDark(getTheme() === 'dark');
  }, []);

  const update = (updates: Partial<UserProfile>) => {
    setProfileState(prev => ({ ...prev, ...updates }));
    setSaved(false);
  };

  const recalculate = () => {
    const goalMap: Record<Goal, 'lose' | 'maintain' | 'gain'> = {
      fat_loss: 'lose',
      maintenance: 'maintain',
      muscle_gain: 'gain',
      better_protein: 'maintain',
      healthier_eating: 'maintain',
    };
    const cals = calcDailyCalories(
      {
        weightKg: profile.weightKg || 65,
        heightCm: profile.heightCm || 165,
        ageYears: parseInt(profile.ageRange || '28', 10) || 28,
        sex: profile.sex === 'female' ? 'female' : 'male',
        activityLevel: profile.activityLevel || 'moderate',
      },
      goalMap[profile.goal]
    );

    // Enforce safe minimum floors
    const minFloor = profile.sex === 'female' ? 1200 : 1500;
    const safeCals = Math.max(minFloor, cals);

    const macros = calcMacros(
      safeCals,
      profile.goal === 'muscle_gain' || profile.goal === 'better_protein' ? 'high_protein' : 'balanced'
    );

    update({
      dailyCalorieTarget: safeCals,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
      dailyWaterTarget: Math.max(6, Math.round(((profile.weightKg || 65) * 35) / (profile.waterGlassSizeMl || 250))),
    });
  };

  const handleSave = () => {
    saveProfile({ ...profile, onboardingComplete: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleDiet = (d: DietPreference) => {
    const prefs = profile.dietPreferences.includes(d)
      ? profile.dietPreferences.filter(p => p !== d)
      : [...profile.dietPreferences, d];
    update({ dietPreferences: prefs });
  };

  return (
    <main className="container section animate-fadeIn" style={{ paddingTop: 8, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Settings & Personalization</h1>

      {/* Appearance */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Appearance</h2>
        <label className="flex items-center justify-between cursor-pointer">
          <span style={{ fontSize: 14 }}>Dark Mode</span>
          <input
            type="checkbox"
            checked={dark}
            onChange={e => {
              setDark(e.target.checked);
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
            style={{ width: 20, height: 20, accentColor: 'var(--green-600)' }}
          />
        </label>
      </div>

      {/* Body Profile */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Body Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Height (cm)</label>
            <input
              type="number"
              className="input"
              value={profile.heightCm}
              onChange={e => update({ heightCm: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input
              type="number"
              className="input"
              value={profile.weightKg}
              onChange={e => update({ weightKg: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Age</label>
            <input
              className="input"
              value={profile.ageRange || ''}
              onChange={e => update({ ageRange: e.target.value })}
              placeholder="e.g. 28"
            />
          </div>
          <div>
            <label className="label">Biological Sex</label>
            <select
              className="input"
              value={profile.sex || 'female'}
              onChange={e => update({ sex: e.target.value as UserProfile['sex'] })}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other / Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="label">Target Weight (kg, optional)</label>
            <input
              type="number"
              className="input"
              value={profile.targetWeightKg || ''}
              onChange={e => update({ targetWeightKg: parseFloat(e.target.value) || undefined })}
            />
          </div>
          <div>
            <label className="label">Activity Level</label>
            <select
              className="input"
              value={profile.activityLevel}
              onChange={e => update({ activityLevel: e.target.value as ActivityLevel })}
            >
              {ACTIVITY_LEVELS.map(a => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Primary Goal</h2>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(g => (
            <button
              key={g.value}
              type="button"
              onClick={() => update({ goal: g.value })}
              className="btn btn-sm"
              style={{
                background: profile.goal === g.value ? 'var(--green-700)' : 'var(--surface)',
                color: profile.goal === g.value ? 'white' : 'var(--text)',
                border: `1px solid ${profile.goal === g.value ? 'var(--green-700)' : 'var(--border)'}`,
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Preferences */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Dietary Preferences</h2>
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map(d => (
            <button
              key={d.value}
              type="button"
              onClick={() => toggleDiet(d.value)}
              className="btn btn-sm"
              style={{
                background: profile.dietPreferences?.includes(d.value) ? 'var(--green-200)' : 'var(--surface)',
                color: profile.dietPreferences?.includes(d.value) ? 'var(--green-900)' : 'var(--text)',
                border: `1px solid ${profile.dietPreferences?.includes(d.value) ? 'var(--green-400)' : 'var(--border)'}`,
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition & Hydration Targets */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <div className="flex justify-between items-center mb-3">
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Daily Targets & Hydration Settings</h2>
          <button onClick={recalculate} className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
            Auto-Calculate
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="label">Calories (kcal)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyCalorieTarget}
              onChange={e => update({ dailyCalorieTarget: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Protein (g)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyProteinTarget}
              onChange={e => update({ dailyProteinTarget: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Carbs (g)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyCarbsTarget}
              onChange={e => update({ dailyCarbsTarget: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Fat (g)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyFatTarget}
              onChange={e => update({ dailyFatTarget: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Fibre (g)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyFibreTarget}
              onChange={e => update({ dailyFibreTarget: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="label">Daily Water (glasses)</label>
            <input
              type="number"
              className="input"
              value={profile.dailyWaterTarget}
              onChange={e => update({ dailyWaterTarget: parseFloat(e.target.value) || 8 })}
            />
          </div>
          <div>
            <label className="label">Glass Volume (ml)</label>
            <select
              className="input"
              value={profile.waterGlassSizeMl || 250}
              onChange={e => update({ waterGlassSizeMl: parseInt(e.target.value, 10) || 250 })}
            >
              <option value="200">200 ml (Small Cup)</option>
              <option value="250">250 ml (Standard Glass)</option>
              <option value="300">300 ml (Mug)</option>
              <option value="350">350 ml (Large Glass)</option>
              <option value="500">500 ml (Bottle)</option>
            </select>
          </div>
        </div>

        {/* Hydration Health Notice */}
        <div
          className="p-3 rounded-md"
          style={{ background: 'var(--gray-100)', border: '1px solid var(--border)', fontSize: 12, lineHeight: 1.45 }}
        >
          <div className="flex items-center gap-1.5 font-semibold text-gray-800 mb-1">
            <Droplets size={14} style={{ color: 'var(--blue)' }} /> Hydration Notice
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Hydration needs vary based on climate, heat, sweat, body weight, and physical activity. Individuals with
            kidney, cardiovascular, fluid-balance conditions, pregnancy, or clinician-guided fluid restrictions should
            always follow professional medical advice. Target is a general wellness guideline, not medical advice.
          </p>
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary btn-lg w-full mb-4">
        {saved ? '✓ Saved Settings' : 'Save Settings'}
      </button>

      <Disclaimer />
    </main>
  );
}
