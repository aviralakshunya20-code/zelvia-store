'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcWaterIntake } from '@/lib/calculators';
import type { CalcInput } from '@/lib/calculators';

export default function WaterIntakePage() {
  const [weight, setWeight] = useState(65);
  const [activity, setActivity] = useState<CalcInput['activityLevel']>('moderate');
  const water = calcWaterIntake(weight, activity);

  return (
    <CalculatorLayout
      title="Water Intake Calculator"
      description="Find out how much water you should drink daily based on your weight and activity level. Proper hydration supports digestion, energy, skin health, and overall wellbeing."
      faqs={[
        { question: 'How much water should I drink per day?', answer: 'A general guideline is 35 ml per kg of body weight plus additional intake for exercise. For a 65 kg moderately active person, that is roughly 2.6-2.7 litres or about 10-11 glasses per day.' },
        { question: 'Does tea or coffee count?', answer: 'Yes, to some extent. Caffeinated beverages do contribute to fluid intake, though plain water is ideal. Chai, buttermilk, nimbu pani, and coconut water are all good hydration options.' },
        { question: 'How do I know if I am dehydrated?', answer: 'Signs include dark yellow urine, dry mouth, fatigue, headache, and dizziness. In hot Indian summers, increase water intake even beyond the calculated amount.' },
      ]}
      relatedTools={[
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/bmi-calculator', label: 'BMI Calculator' },
        { href: '/protein-calculator', label: 'Protein Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Activity Level</label><select className="input" value={activity} onChange={e => setActivity(e.target.value as CalcInput['activityLevel'])}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very_active">Very Active</option></select></div>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--blue)' }}>{water.glasses}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>glasses/day (~{water.ml} ml)</span>
        </div>
      </div>
    </CalculatorLayout>
  );
}
