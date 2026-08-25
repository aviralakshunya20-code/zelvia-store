'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  Target,
  Activity,
  Scale,
  Ruler,
  Utensils,
  Sparkles,
  ShieldAlert,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
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

const HEALTH_CONDITIONS = [
  { id: 'pregnant_or_breastfeeding', label: 'Pregnant or Breastfeeding', desc: 'Requires tailored nutritional intake' },
  { id: 'diabetes', label: 'Diabetes / Blood Sugar Concerns', desc: 'Focus on balanced glycemic load' },
  { id: 'eating_disorder_history', label: 'History of Eating Disorder', desc: 'Encourages supportive, non-restrictive logging' },
  { id: 'medical_diet', label: 'Clinician-Prescribed Medical Diet', desc: 'Follow your doctor’s personalized advice' },
  { id: 'none', label: 'None of the above', desc: 'General wellness & nutrition tracking' },
];

const DIETS: { value: DietPreference; label: string; icon: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian', icon: '🥦' },
  { value: 'eggitarian', label: 'Eggetarian', icon: '🥚' },
  { value: 'vegan', label: 'Vegan', icon: '🌱' },
  { value: 'jain', label: 'Jain', icon: '🙏' },
  { value: 'halal', label: 'Halal', icon: '☪️' },
  { value: 'high_protein', label: 'High Protein', icon: '🥩' },
  { value: 'low_carb', label: 'Low Carb', icon: '🥗' },
  { value: 'diabetic_friendly', label: 'Diabetic Friendly', icon: '🩺' },
];

const STEPS = ['Goal', 'Body', 'Safety', 'Activity', 'Diet', 'Target'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(() => getProfile() || defaultProfile());
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(28);
  const [ageGroup, setAgeGroup] = useState<'<18' | '18-64' | '65+'>('18-64');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(['none']);

  const update = (patch: Partial<UserProfile>) => setProfile(p => ({ ...p, ...patch }));

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else finish();
  };
  const prev = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const isSensitive =
    ageGroup === '<18' ||
    selectedConditions.some(c => c !== 'none');

  const sex: 'male' | 'female' = profile.sex === 'female' ? 'female' : 'male';
  const calcInput = {
    weightKg: profile.weightKg || 65,
    heightCm: profile.heightCm || 165,
    ageYears: age,
    sex,
    activityLevel: profile.activityLevel || 'moderate',
  };

  const bmr = calcBMR(calcInput);
  const tdee = calcTDEE(calcInput);

  // If under-18 or sensitive condition, do NOT create aggressive deficit
  let calTarget: number;
  if (isSensitive) {
    calTarget = Math.round(tdee); // Gentle maintenance
  } else if (profile.goal === 'fat_loss') {
    const minFloor = sex === 'female' ? 1200 : 1500;
    calTarget = Math.max(minFloor, Math.round(tdee - 450));
  } else if (profile.goal === 'muscle_gain') {
    calTarget = Math.round(tdee + 300);
  } else {
    calTarget = Math.round(tdee);
  }

  const finish = () => {
    const isHighProtein = profile.dietPreferences?.includes('high_protein');
    const isLowCarb = profile.dietPreferences?.includes('low_carb');
    const macroSplit = isHighProtein ? 'high_protein' : isLowCarb ? 'low_carb' : 'balanced';
    const macros = calcMacros(calTarget, macroSplit);

    const final: UserProfile = {
      ...profile,
      name: name.trim() || 'Friend',
      ageRange: String(age),
      ageGroup,
      healthConditions: selectedConditions,
      onboardingComplete: true,
      dailyCalorieTarget: calTarget,
      dailyProteinTarget: macros.protein,
      dailyCarbsTarget: macros.carbs,
      dailyFatTarget: macros.fat,
      dailyFibreTarget: sex === 'female' ? 21 : 25,
      dailyWaterTarget: Math.max(6, Math.round(((profile.weightKg || 65) * 35) / 250)),
      waterGlassSizeMl: 250,
    };
    saveProfile(final);
    router.push('/');
  };

  const toggleCondition = (id: string) => {
    if (id === 'none') {
      setSelectedConditions(['none']);
      return;
    }
    const filtered = selectedConditions.filter(c => c !== 'none');
    if (filtered.includes(id)) {
      const nextList = filtered.filter(c => c !== id);
      setSelectedConditions(nextList.length === 0 ? ['none'] : nextList);
    } else {
      setSelectedConditions([...filtered, id]);
    }
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
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {STEPS.map((sName, i) => (
            <div
              key={i}
              className={`step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}
              title={sName}
            />
          ))}
        </div>

        {/* Step 0: Goal */}
        {step === 0 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Target size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>What&apos;s your primary goal?</h1>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                We will calculate personalized calorie & macro estimates for you.
              </p>
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
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{g.label}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{g.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Body Metrics */}
        {step === 1 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Ruler size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>About your body</h1>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                Used for the Mifflin-St Jeor metabolic calculation.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label">Your Name or Nickname</label>
                <input
                  className="input"
                  placeholder="e.g. Rahul"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Height (cm)</label>
                  <input
                    type="number"
                    className="input"
                    value={profile.heightCm || 165}
                    onChange={e => update({ heightCm: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label className="label">Weight (kg)</label>
                  <input
                    type="number"
                    className="input"
                    value={profile.weightKg || 65}
                    onChange={e => update({ weightKg: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Age (years)</label>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={e => setAge(parseInt(e.target.value, 10) || 25)}
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
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Health & Safety Check */}
        {step === 2 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <HeartPulse size={36} style={{ color: 'var(--green-700)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Safety & Health Check</h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Ensures we provide safe, non-restrictive, and supportive guidance.
              </p>
            </div>

            <div className="mb-4">
              <label className="label">Age Category</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: '<18', label: 'Under 18' },
                  { key: '18-64', label: '18 - 64' },
                  { key: '65+', label: '65+' },
                ].map(a => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setAgeGroup(a.key as '<18' | '18-64' | '65+')}
                    className="btn btn-sm"
                    style={{
                      background: ageGroup === a.key ? 'var(--green-700)' : 'var(--surface)',
                      color: ageGroup === a.key ? 'white' : 'var(--text)',
                      border: `1px solid ${ageGroup === a.key ? 'var(--green-700)' : 'var(--border)'}`,
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="label">Any specific considerations? (Optional)</label>
              <div className="flex flex-col gap-2">
                {HEALTH_CONDITIONS.map(c => {
                  const isSelected = selectedConditions.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCondition(c.id)}
                      className={`option-card ${isSelected ? 'selected' : ''}`}
                      style={{ padding: '10px 12px' }}
                    >
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.label}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>{c.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {isSensitive && (
              <div
                className="p-3 rounded-md animate-fadeIn"
                style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', fontSize: 12, lineHeight: 1.45 }}
              >
                <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-1">
                  <ShieldAlert size={14} style={{ color: '#2563EB' }} /> Supportive Guidance
                </div>
                <p style={{ margin: 0, color: '#1E40AF' }}>
                  For young users or sensitive health conditions, OnlineMeasurer sets gentle maintenance estimates and
                  never recommends restrictive calorie deficits. We encourage following guidance from a qualified
                  healthcare professional.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Activity Level */}
        {step === 3 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Activity size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Activity Level</h1>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                How active are you on an average week?
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ACTIVITY.map(a => (
                <button
                  key={a.value}
                  type="button"
                  className={`option-card ${profile.activityLevel === a.value ? 'selected' : ''}`}
                  onClick={() => update({ activityLevel: a.value })}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{a.label}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Diet Preferences */}
        {step === 4 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Utensils size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Diet Preferences</h1>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Select all that apply to you.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {DIETS.map(d => {
                const isSelected = profile.dietPreferences?.includes(d.value);
                return (
                  <button
                    key={d.value}
                    type="button"
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleDiet(d.value)}
                    style={{ padding: '14px 12px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{d.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{d.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Final Calculated Targets Review */}
        {step === 5 && (
          <div className="onboarding-step animate-fadeIn">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Sparkles size={36} style={{ color: 'var(--green-600)', marginBottom: 8 }} />
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Personalized Targets</h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Based on Mifflin-St Jeor equation ({Math.round(bmr)} kcal BMR · {Math.round(tdee)} kcal TDEE)
              </p>
            </div>

            <div className="card mb-4" style={{ padding: 20, textAlign: 'center', background: 'var(--green-100)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Daily Calorie Target
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--green-900)', margin: '4px 0' }}>
                {calTarget} <span style={{ fontSize: 16, fontWeight: 600 }}>kcal</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
                {isSensitive
                  ? 'Gentle maintenance intake for safe and healthy daily nourishment.'
                  : profile.goal === 'fat_loss'
                  ? 'Healthy moderate deficit for sustainable progress.'
                  : 'Tailored for steady energy and vitality.'}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div className="card p-2" style={{ background: 'var(--surface)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Protein</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                  {calcMacros(calTarget, 'balanced').protein}g
                </div>
              </div>
              <div className="card p-2" style={{ background: 'var(--surface)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Carbs</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                  {calcMacros(calTarget, 'balanced').carbs}g
                </div>
              </div>
              <div className="card p-2" style={{ background: 'var(--surface)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Fat</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                  {calcMacros(calTarget, 'balanced').fat}g
                </div>
              </div>
              <div className="card p-2" style={{ background: 'var(--surface)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Water</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)' }}>
                  {Math.max(6, Math.round(((profile.weightKg || 65) * 35) / 250))} gl
                </div>
              </div>
            </div>

            <p style={{ fontSize: 11, color: 'var(--gray-400)', textAlign: 'center', margin: '0 0 12px' }}>
              Estimates for wellness tracking · You can adjust any target anytime in Settings.
            </p>
          </div>
        )}

        {/* Bottom Nav Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 24 }}>
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '12px 20px', fontSize: 14 }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div style={{ flex: 1 }} />
          )}

          <button
            type="button"
            onClick={next}
            className="btn btn-primary"
            style={{ flex: 2, padding: '12px 20px', fontSize: 14, fontWeight: 600 }}
          >
            {step === STEPS.length - 1 ? (
              <>Start Tracking Now <CheckCircle2 size={16} /></>
            ) : (
              <>Continue <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
