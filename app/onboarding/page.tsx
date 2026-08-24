'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Target, Activity, Scale, Ruler, Utensils, Sparkles } from 'lucide-react';
import { getProfile, defaultProfile, saveProfile } from '@/lib/store';
import { calcBMR, calcTDEE, calcMacros } from '@/lib/calculators';
import type { UserProfile, Goal, ActivityLevel, DietPreference } from '@/lib/types';

const GOALS: { value: Goal; label: string; icon: string; desc: string }[] = [
  { value: 'fat_loss', label: 'Lose Weight / Fat Loss', icon: '🔥', desc: 'Calorie deficit for healthy fat loss' },
  { value: 'maintenance', label: 'Maintain Weight', icon: '⚖️', desc: 'Stay at your current weight and build healthy habits' },
  { value: 'muscle_gain', label: 'Build Muscle', icon: '💪', desc: 'Slight surplus and higher protein for muscle' },
  { value: 'better_protein', label: 'Improve Protein Intake', icon: '🥗', desc: 'Meet daily protein goals on an Indian diet' },
];

const ACTIVITY: { value: ActivityLevel; label: string; desc: string }[] = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Desk job, little or no regular exercise' },
  { value: 'light', label: 'Lightly Active', desc: 'Light workout or brisk walking 1-3 days/week' },
  { value: 'moderate', label: 'Moderately Active', desc: 'Active workout or gym 3-5 days/week' },
  { value: 'active', label: 'Very Active', desc: 'Hard exercise or sports 6-7 days/week' },
  { value: 'very_active', label: 'Extremely Active', desc: 'Athlete or physically demanding job' },
];

const DIETS: { value: DietPreference; label: string; icon: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
  { value: 'eggetarian' as DietPreference, label: 'Eggetarian', icon: '🥚' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'jain', label: 'Jain', icon: '🙏' },
  { value: 'halal', label: 'Halal', icon: '☪️' },
  { value: 'high_protein', label: 'High Protein', icon: '🥩' },
  { value: 'low_carb', label: 'Low Carb', icon: '🥗' },
  { value: 'diabetic_friendly', label: 'Diabetic Friendly', icon: '🩺' },
];

const STEPS = ['Goal', 'Body', 'Activity', 'Diet', 'Target'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(() => getProfile() || defaultProfile());
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(28);

  const update = (patch: Partial<UserProfile>) => setProfile(p => ({ ...p, ...patch }));

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else finish();
  };
  const prev = () => { if (step > 0) setStep(s => s - 1); };

  const sex: 'male' | 'female' = profile.sex === 'female' ? 'female' : 'male';
  const calcInput: {
    weightKg: number;
    heightCm: number;
    ageYears: number;
    sex: 'male' | 'female';
    activityLevel: ActivityLevel;
  } = {
    weightKg: profile.weightKg || 68,
    heightCm: profile.heightCm || 170,
    ageYears: age,
    sex,
    activityLevel: profile.activityLevel || 'sedentary',
  };

  const bmr = calcBMR(calcInput);
  const tdee = calcTDEE(calcInput);
  const calTarget = profile.goal === 'fat_loss' ? Math.max(1200, Math.round(tdee - 500))
    : profile.goal === 'muscle_gain' ? Math.round(tdee + 300) : Math.round(tdee);

  const finish = () => {
    const isHighProtein = profile.dietPreferences.includes('high_protein');
    const isLowCarb = profile.dietPreferences.includes('low_carb');
    const macroSplit = isHighProtein ? 'high_protein' : isLowCarb ? 'low_carb' : 'balanced';
    const macros = calcMacros(calTarget, macroSplit);

    const final: UserProfile = {
      ...profile,
      name: name.trim() || 'Friend',
      onboardingComplete: true,
      dailyCalorieTarget: calTarget,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
      dailyFibreTarget: sex === 'female' ? 21 : 25,
      dailyWaterTarget: Math.max(6, Math.round(profile.weightKg * 35 / 250)),
    };
    saveProfile(final);
    router.push('/');
  };

  const toggleDiet = (val: DietPreference) => {
    const current = profile.dietPreferences || [];
    if (current.includes(val)) {
      update({ dietPreferences: current.filter(d => d !== val) });
    } else {
      update({ dietPreferences: [...current, val] });
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {STEPS.map((_, i) => (
            <div key={i} className={`step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`} />
          ))}
        </div>

        {/* Step 0: Goal */}
        {step === 0 && (
          <div className="onboarding-step">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Target size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>What&apos;s your primary goal?</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>We will calculate personalized calories & macros for you.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {GOALS.map(g => (
                <button
                  key={g.value}
                  type="button"
                  className={`option-card ${profile.goal === g.value ? 'selected' : ''}`}
                  onClick={() => update({ goal: g.value })}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{g.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{g.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{g.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Body */}
        {step === 1 && (
          <div className="onboarding-step">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Ruler size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>About your body</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Used for the Mifflin-St Jeor metabolic calculation.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label">Your name</label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rahul / Priya" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  type="button"
                  className={`option-card ${profile.sex === 'male' ? 'selected' : ''}`}
                  onClick={() => update({ sex: 'male' })}
                  style={{ textAlign: 'center', padding: 12 }}
                >
                  <div style={{ fontSize: 20 }}>🙋‍♂️</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Male</div>
                </button>
                <button
                  type="button"
                  className={`option-card ${profile.sex === 'female' ? 'selected' : ''}`}
                  onClick={() => update({ sex: 'female' })}
                  style={{ textAlign: 'center', padding: 12 }}
                >
                  <div style={{ fontSize: 20 }}>🙋‍♀️</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Female</div>
                </button>
              </div>
              <div>
                <label className="label">Age (years)</label>
                <input className="input" type="number" min="12" max="100" value={age} onChange={e => setAge(Math.max(12, parseInt(e.target.value, 10) || 25))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label className="label">Height (cm)</label>
                  <input className="input" type="number" min="100" max="250" value={profile.heightCm} onChange={e => update({ heightCm: parseFloat(e.target.value) || 170 })} />
                </div>
                <div>
                  <label className="label">Weight (kg)</label>
                  <input className="input" type="number" min="30" max="300" step="0.5" value={profile.weightKg} onChange={e => update({ weightKg: parseFloat(e.target.value) || 68 })} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Activity */}
        {step === 2 && (
          <div className="onboarding-step">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Activity size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Daily activity level</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>How active are you in a typical week?</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ACTIVITY.map(a => (
                <button
                  key={a.value}
                  type="button"
                  className={`option-card ${profile.activityLevel === a.value ? 'selected' : ''}`}
                  onClick={() => update({ activityLevel: a.value })}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Diet Preferences */}
        {step === 3 && (
          <div className="onboarding-step">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Utensils size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Diet preference (optional)</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Select all that apply to tailor suggestions.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {DIETS.map(d => {
                const selected = (profile.dietPreferences || []).includes(d.value);
                return (
                  <button
                    key={d.value}
                    type="button"
                    className={`option-card ${selected ? 'selected' : ''}`}
                    onClick={() => toggleDiet(d.value)}
                    style={{ textAlign: 'center', padding: 12 }}
                  >
                    <div style={{ fontSize: 22 }}>{d.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{d.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Personalized Plan Summary */}
        {step === 4 && (
          <div className="onboarding-step">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Sparkles size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Personalized Plan</h1>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Calculated with standard Mifflin-St Jeor nutrition formula.</p>
            </div>
            <div className="card" style={{ padding: 20, textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--green-700)', lineHeight: 1 }}>{calTarget}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4, fontWeight: 500 }}>calories / day</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>
                {profile.goal === 'fat_loss' ? `500 cal deficit from your TDEE of ${Math.round(tdee)} kcal` :
                 profile.goal === 'muscle_gain' ? `300 cal surplus from your TDEE of ${Math.round(tdee)} kcal` :
                 `Matching your maintenance TDEE of ${Math.round(tdee)} kcal`}
              </div>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13 }}>
                <div><span style={{ color: 'var(--text-secondary)' }}>Name:</span> <strong>{name || 'Friend'}</strong></div>
                <div><span style={{ color: 'var(--text-secondary)' }}>BMR:</span> <strong>{Math.round(bmr)} kcal</strong></div>
                <div><span style={{ color: 'var(--text-secondary)' }}>TDEE:</span> <strong>{Math.round(tdee)} kcal</strong></div>
                <div><span style={{ color: 'var(--text-secondary)' }}>Water Goal:</span> <strong>{Math.max(6, Math.round(profile.weightKg * 35 / 250))} glasses</strong></div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 12, fontStyle: 'italic' }}>
              You can adjust these targets anytime from the Settings page.
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {step > 0 && (
            <button type="button" onClick={prev} className="btn btn-outline" style={{ flex: '0 0 auto' }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button type="button" onClick={next} className="btn btn-primary" style={{ flex: 1 }}>
            {step === STEPS.length - 1 ? (
              <><Sparkles size={16} /> Start Tracking</>
            ) : (
              <>Continue <ArrowRight size={16} /></>
            )}
          </button>
        </div>

        {step === 0 && (
          <button
            type="button"
            onClick={() => {
              const p = defaultProfile();
              p.onboardingComplete = true;
              saveProfile(p);
              router.push('/');
            }}
            className="btn btn-ghost"
            style={{ width: '100%', marginTop: 8, fontSize: 13 }}
          >
            Skip — use standard 2,000 kcal defaults
          </button>
        )}
      </div>
    </main>
  );
}
