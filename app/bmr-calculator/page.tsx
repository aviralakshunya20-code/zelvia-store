'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcBMR } from '@/lib/calculators';

export default function BMRCalculatorPage() {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);
  const [age, setAge] = useState(28);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const bmr = calcBMR({ weightKg: weight, heightCm: height, ageYears: age, sex });

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate — the number of calories your body burns at rest to maintain basic functions like breathing, circulation, and cell production. This is your calorie floor."
      faqs={[
        { question: 'What is BMR?', answer: 'Basal Metabolic Rate (BMR) is the number of calories your body needs per day to maintain basic life-sustaining functions while at complete rest. It accounts for about 60-75% of your total daily calorie expenditure.' },
        { question: 'How is BMR calculated?', answer: 'We use the Mifflin-St Jeor equation, which is considered the most accurate for most people. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161.' },
        { question: 'Should I eat at my BMR level?', answer: 'No. BMR is the minimum your body needs at complete rest. Your actual calorie needs are higher because you move, digest food, and exercise. Use the TDEE calculator to find your total daily calorie needs.' },
      ]}
      relatedTools={[
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/macro-calculator', label: 'Macro Calculator' },
        { href: '/bmi-calculator', label: 'BMI Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Height (cm)</label><input type="number" className="input" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Age</label><input type="number" className="input" value={age} onChange={e => setAge(parseInt(e.target.value) || 0)} /></div>
          <div><label className="label">Sex</label><select className="input" value={sex} onChange={e => setSex(e.target.value as 'male' | 'female')}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>
        <div className="flex flex-col items-center gap-1 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--green-700)' }}>{bmr}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>calories/day at rest</span>
        </div>
      </div>
      <section className="mb-6">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>What Affects Your BMR?</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>Your BMR is influenced by age, sex, weight, height, muscle mass, and genetics. Men generally have a higher BMR than women due to greater muscle mass. BMR decreases with age as muscle mass naturally declines. Building lean muscle through resistance training can help maintain or increase your BMR over time.</p>
      </section>
    </CalculatorLayout>
  );
}
