'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcProtein } from '@/lib/calculators';
import type { CalcInput } from '@/lib/calculators';

export default function ProteinCalculatorPage() {
  const [weight, setWeight] = useState(65);
  const [activity, setActivity] = useState<CalcInput['activityLevel']>('moderate');
  const protein = calcProtein(weight, activity);

  return (
    <CalculatorLayout
      title="Protein Calculator"
      description="Find out how much protein you need per day based on your body weight and activity level. Protein is essential for muscle repair, immune function, and overall health."
      faqs={[
        { question: 'How much protein do I need per day?', answer: 'The general recommendation is 0.8g per kg of body weight for sedentary adults. Active individuals need 1.2-2.0g per kg. For a 65 kg moderately active person, that is roughly 78-104g per day.' },
        { question: 'What are good Indian sources of protein?', answer: 'Paneer (18g/100g), eggs (6g each), moong dal (7g/katori), chana (8g/katori), soy chunks (52g/100g dry), curd (3g/katori), chicken breast (25g/100g), and peanuts (7g/30g).' },
        { question: 'Can I eat too much protein?', answer: 'For healthy adults, protein intake up to 2g per kg body weight is generally safe. Very high intakes (above 2.5g/kg) over long periods may stress the kidneys in those with pre-existing kidney conditions. Consult a doctor if unsure.' },
      ]}
      relatedTools={[
        { href: '/macro-calculator', label: 'Macro Calculator' },
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/indian-food-calories', label: 'Indian Food Calories' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Activity Level</label><select className="input" value={activity} onChange={e => setActivity(e.target.value as CalcInput['activityLevel'])}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very_active">Very Active</option></select></div>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--blue)' }}>{protein.recommended}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>grams/day recommended</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Range: {protein.min}g – {protein.max}g</span>
        </div>
      </div>
    </CalculatorLayout>
  );
}
