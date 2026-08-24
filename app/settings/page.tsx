'use client';

import { useState, useEffect } from 'react';
import { getProfile, saveProfile, defaultProfile, getTheme, setTheme } from '@/lib/store';
import { calcDailyCalories, calcMacros, calcBMR, calcTDEE } from '@/lib/calculators';
import { Disclaimer } from '@/components/ui/Disclaimer';
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
      fat_loss: 'lose', maintenance: 'maintain', muscle_gain: 'gain',
      better_protein: 'maintain', healthier_eating: 'maintain',
    };
    const cals = calcDailyCalories({
      weightKg: profile.weightKg, heightCm: profile.heightCm,
      ageYears: parseInt(profile.ageRange || '30') || 30,
      sex: profile.sex === 'female' ? 'female' : 'male',
      activityLevel: profile.activityLevel,
    }, goalMap[profile.goal]);
    const macros = calcMacros(cals, profile.goal === 'muscle_gain' || profile.goal === 'better_protein' ? 'high_protein' : 'balanced');
    update({
      dailyCalorieTarget: cals,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
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
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Settings</h1>

      {/* Appearance */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Appearance</h2>
        <label className="flex items-center justify-between cursor-pointer">
          <span style={{ fontSize: 14 }}>Dark Mode</span>
          <input type="checkbox" checked={dark} onChange={e => { setDark(e.target.checked); setTheme(e.target.checked ? 'dark' : 'light'); }} style={{ width: 20, height: 20, accentColor: 'var(--green-600)' }} />
        </label>
      </div>

      {/* Body */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Body Profile</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" className="input" value={profile.heightCm} onChange={e => update({ heightCm: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input type="number" className="input" value={profile.weightKg} onChange={e => update({ weightKg: parseFloat(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="label">Age</label>
            <input className="input" value={profile.ageRange || ''} onChange={e => update({ ageRange: e.target.value })} placeholder="e.g. 28" />
          </div>
          <div>
            <label className="label">Sex (optional)</label>
            <select className="input" value={profile.sex || ''} onChange={e => update({ sex: e.target.value as UserProfile['sex'] })}>
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="label">Target Weight (kg)</label>
            <input type="number" className="input" value={profile.targetWeightKg || ''} onChange={e => update({ targetWeightKg: parseFloat(e.target.value) || undefined })} />
          </div>
          <div>
            <label className="label">Activity Level</label>
            <select className="input" value={profile.activityLevel} onChange={e => update({ activityLevel: e.target.value as ActivityLevel })}>
              {ACTIVITY_LEVELS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Goal */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Goal</h2>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(g => (
            <button key={g.value} onClick={() => update({ goal: g.value })} className="btn btn-sm" style={{
              background: profile.goal === g.value ? 'var(--green-700)' : 'var(--surface)',
              color: profile.goal === g.value ? 'white' : 'var(--text)',
              border: `1px solid ${profile.goal === g.value ? 'var(--green-700)' : 'var(--border)'}`,
            }}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diet */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Diet Preferences</h2>
        <div className="flex flex-wrap gap-2">
          {DIET_OPTIONS.map(d => (
            <button key={d.value} onClick={() => toggleDiet(d.value)} className="btn btn-sm" style={{
              background: profile.dietPreferences.includes(d.value) ? 'var(--green-200)' : 'var(--surface)',
              color: profile.dietPreferences.includes(d.value) ? 'var(--green-900)' : 'var(--text)',
              border: `1px solid ${profile.dietPreferences.includes(d.value) ? 'var(--green-400)' : 'var(--border)'}`,
            }}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition Targets */}
      <div className="card mb-4" style={{ padding: 16 }}>
        <div className="flex justify-between items-center mb-3">
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Daily Targets</h2>
          <button onClick={recalculate} className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>Auto-Calculate</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Calories (kcal)', key: 'dailyCalorieTarget' as const },
            { label: 'Protein (g)', key: 'dailyProteinTarget' as const },
            { label: 'Carbs (g)', key: 'dailyCarbsTarget' as const },
            { label: 'Fat (g)', key: 'dailyFatTarget' as const },
            { label: 'Fibre (g)', key: 'dailyFibreTarget' as const },
            { label: 'Water (glasses)', key: 'dailyWaterTarget' as const },
          ].map(f => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              <input type="number" className="input" value={profile[f.key]} onChange={e => update({ [f.key]: parseFloat(e.target.value) || 0 })} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary btn-lg w-full mb-4">
        {saved ? '✓ Saved' : 'Save Settings'}
      </button>

      <Disclaimer />
    </main>
  );
}
