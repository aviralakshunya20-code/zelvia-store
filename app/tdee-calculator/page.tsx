'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcTDEE, calcBMR } from '@/lib/calculators';
import type { CalcInput } from '@/lib/calculators';

export default function TDEEPage() {
  const [input, setInput] = useState<CalcInput>({ weightKg: 65, heightCm: 165, ageYears: 28, sex: 'male', activityLevel: 'moderate' });
  const tdee = calcTDEE(input);
  const bmr = calcBMR(input);
  const u = (k: Partial<CalcInput>) => setInput(prev => ({ ...prev, ...k }));

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure — the total calories you burn per day including activity. This is the most important number for weight management."
      faqs={[
        { question: 'What is TDEE?', answer: 'Total Daily Energy Expenditure (TDEE) is the total number of calories you burn per day. It includes your BMR (calories at rest), the thermic effect of food, and calories burned through physical activity.' },
        { question: 'How do I use TDEE for weight loss?', answer: 'To lose weight, eat fewer calories than your TDEE (a deficit). A 500-calorie daily deficit results in approximately 0.5 kg of weight loss per week. Never eat below 1200 calories without medical supervision.' },
        { question: 'How accurate is this TDEE estimate?', answer: 'TDEE calculations are estimates based on population averages. Individual variation can be 10-15%. Use this as a starting point and adjust based on your actual results over 2-3 weeks.' },
      ]}
      relatedTools={[
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/bmr-calculator', label: 'BMR Calculator' },
        { href: '/macro-calculator', label: 'Macro Calculator' },
        { href: '/calories-burned-calculator', label: 'Calories Burned' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={input.weightKg} onChange={e => u({ weightKg: parseFloat(e.target.value) || 0 })} /></div>
          <div><label className="label">Height (cm)</label><input type="number" className="input" value={input.heightCm} onChange={e => u({ heightCm: parseFloat(e.target.value) || 0 })} /></div>
          <div><label className="label">Age</label><input type="number" className="input" value={input.ageYears} onChange={e => u({ ageYears: parseInt(e.target.value) || 0 })} /></div>
          <div><label className="label">Sex</label><select className="input" value={input.sex} onChange={e => u({ sex: e.target.value as 'male' | 'female' })}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>
        <div className="mb-4">
          <label className="label">Activity Level</label>
          <select className="input" value={input.activityLevel} onChange={e => u({ activityLevel: e.target.value as CalcInput['activityLevel'] })}>
            <option value="sedentary">Sedentary (desk job, little exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very_active">Very Active (intense daily + physical job)</option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-1 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--green-700)' }}>{tdee}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>calories/day (TDEE)</span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>BMR: {bmr} cal/day</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Weight Loss', value: Math.max(1200, tdee - 500), desc: '−500 cal/day' },
            { label: 'Maintain', value: tdee, desc: 'TDEE' },
            { label: 'Weight Gain', value: tdee + 300, desc: '+300 cal/day' },
          ].map(g => (
            <div key={g.label} className="card" style={{ padding: '10px 12px', textAlign: 'center', border: 'none', background: 'var(--green-100)' }}>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{g.label}</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--green-800)' }}>{g.value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
