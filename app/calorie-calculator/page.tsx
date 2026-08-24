'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcDailyCalories, calcTDEE } from '@/lib/calculators';
import type { CalcInput } from '@/lib/calculators';

export default function CalorieCalculatorPage() {
  const [input, setInput] = useState<CalcInput>({ weightKg: 65, heightCm: 165, ageYears: 28, sex: 'male', activityLevel: 'moderate' });
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const cals = calcDailyCalories(input, goal);
  const tdee = calcTDEE(input);
  const u = (k: Partial<CalcInput>) => setInput(prev => ({ ...prev, ...k }));

  return (
    <CalculatorLayout
      title="Daily Calorie Calculator"
      description="Find out how many calories you should eat per day based on your body, activity level, and goals. Whether you want to lose weight, maintain, or build muscle."
      faqs={[
        { question: 'How many calories should I eat per day?', answer: 'It depends on your age, sex, weight, height, activity level, and goal. Most adults need between 1600 and 3000 calories per day. This calculator gives you a personalised estimate.' },
        { question: 'How many calories to lose 1 kg per week?', answer: 'To lose roughly 1 kg per week, you need a calorie deficit of about 7700 calories per week, or roughly 1100 calories per day. A safer, more sustainable approach is a 500-calorie daily deficit (0.5 kg/week).' },
        { question: 'Is 1200 calories too low?', answer: 'For most adults, 1200 calories is the minimum recommended intake. Going below this consistently can lead to nutrient deficiencies and metabolic adaptation. Consult a healthcare provider before eating very low calorie diets.' },
      ]}
      relatedTools={[
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
        { href: '/macro-calculator', label: 'Macro Calculator' },
        { href: '/protein-calculator', label: 'Protein Calculator' },
        { href: '/bmr-calculator', label: 'BMR Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={input.weightKg} onChange={e => u({ weightKg: parseFloat(e.target.value) || 0 })} /></div>
          <div><label className="label">Height (cm)</label><input type="number" className="input" value={input.heightCm} onChange={e => u({ heightCm: parseFloat(e.target.value) || 0 })} /></div>
          <div><label className="label">Age</label><input type="number" className="input" value={input.ageYears} onChange={e => u({ ageYears: parseInt(e.target.value) || 0 })} /></div>
          <div><label className="label">Sex</label><select className="input" value={input.sex} onChange={e => u({ sex: e.target.value as 'male' | 'female' })}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>
        <div className="mb-4"><label className="label">Activity Level</label><select className="input" value={input.activityLevel} onChange={e => u({ activityLevel: e.target.value as CalcInput['activityLevel'] })}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very_active">Very Active</option></select></div>
        <div className="mb-4"><label className="label">Goal</label>
          <div className="flex gap-2">
            {([['lose', 'Lose Weight'], ['maintain', 'Maintain'], ['gain', 'Gain Weight']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setGoal(v)} className="btn btn-sm flex-1" style={{ background: goal === v ? 'var(--green-700)' : 'var(--surface)', color: goal === v ? 'white' : 'var(--text)', border: `1px solid ${goal === v ? 'var(--green-700)' : 'var(--border)'}` }}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--green-700)' }}>{cals}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>calories/day recommended</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Your TDEE: {tdee} cal/day</span>
        </div>
      </div>
    </CalculatorLayout>
  );
}
