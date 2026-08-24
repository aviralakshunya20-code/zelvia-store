'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcIdealWeight } from '@/lib/calculators';

export default function IdealWeightPage() {
  const [height, setHeight] = useState(165);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const iw = calcIdealWeight(height, sex);

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Estimate your ideal body weight range based on your height and sex. Remember that ideal weight varies based on body composition, frame size, and individual factors."
      faqs={[
        { question: 'What is the ideal weight formula?', answer: 'We use the Devine formula: For males, ideal weight = 50 + 2.3 kg per inch over 5 feet. For females, ideal weight = 45.5 + 2.3 kg per inch over 5 feet. The range is ±10% of this value.' },
        { question: 'Is there one ideal weight for everyone?', answer: 'No. Ideal weight depends on muscle mass, bone density, body frame, and overall health. Someone with more muscle may weigh more but be healthier than someone who is lighter but with higher body fat.' },
      ]}
      relatedTools={[
        { href: '/bmi-calculator', label: 'BMI Calculator' },
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Height (cm)</label><input type="number" className="input" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Sex</label><select className="input" value={sex} onChange={e => setSex(e.target.value as 'male' | 'female')}><option value="male">Male</option><option value="female">Female</option></select></div>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--green-700)' }}>{iw.ideal}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>kg (ideal)</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Healthy range: {iw.min}–{iw.max} kg</span>
        </div>
      </div>
    </CalculatorLayout>
  );
}
