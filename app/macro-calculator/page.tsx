'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcMacros, calcDailyCalories } from '@/lib/calculators';
import type { CalcInput } from '@/lib/calculators';

export default function MacroCalculatorPage() {
  const [cals, setCals] = useState(2000);
  const [split, setSplit] = useState<'balanced' | 'high_protein' | 'low_carb'>('balanced');
  const macros = calcMacros(cals, split);

  return (
    <CalculatorLayout
      title="Macro Calculator"
      description="Calculate your daily protein, carbs, and fat targets based on your calorie goal and preferred diet split. Macros determine not just how much you eat, but the quality of your nutrition."
      faqs={[
        { question: 'What are macros?', answer: 'Macros (macronutrients) are the three main nutrients that provide energy: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Balancing these helps you reach your fitness and health goals more effectively than counting calories alone.' },
        { question: 'What is the best macro split?', answer: 'It depends on your goal. A balanced split (20% protein, 50% carbs, 30% fat) works for most people. For muscle gain, try high protein (30/40/30). For fat loss, some prefer low carb (30/25/45). Experiment and see what works for your body.' },
        { question: 'Do I need to track macros exactly?', answer: 'No. Getting within 10-15g of your targets is sufficient for most people. Consistency over time matters more than daily precision.' },
      ]}
      relatedTools={[
        { href: '/protein-calculator', label: 'Protein Calculator' },
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="mb-4"><label className="label">Daily Calories</label><input type="number" className="input" value={cals} onChange={e => setCals(parseInt(e.target.value) || 0)} /></div>
        <div className="mb-4"><label className="label">Diet Split</label>
          <div className="flex gap-2">
            {([['balanced', 'Balanced (20/50/30)'], ['high_protein', 'High Protein (30/40/30)'], ['low_carb', 'Low Carb (30/25/45)']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setSplit(v)} className="btn btn-sm flex-1" style={{ background: split === v ? 'var(--green-700)' : 'var(--surface)', color: split === v ? 'white' : 'var(--text)', border: `1px solid ${split === v ? 'var(--green-700)' : 'var(--border)'}`, fontSize: 11 }}>{l}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 py-4">
          {[
            { label: 'Protein', value: macros.protein, color: 'var(--blue)', unit: 'g', cal: macros.protein * 4 },
            { label: 'Carbs', value: macros.carbs, color: 'var(--orange)', unit: 'g', cal: macros.carbs * 4 },
            { label: 'Fat', value: macros.fat, color: 'var(--red)', unit: 'g', cal: macros.fat * 9 },
          ].map(m => (
            <div key={m.label} className="flex flex-col items-center">
              <span style={{ fontSize: 36, fontWeight: 700, color: m.color }}>{m.value}</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{m.label} ({m.unit})</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{m.cal} kcal</span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
