'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcBMI } from '@/lib/calculators';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState(65);
  const [height, setHeight] = useState(165);
  const result = calcBMI(weight, height);

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) using your height and weight. BMI is a simple screening tool — it does not directly measure body fat and may not be accurate for athletes, older adults, or those with high muscle mass."
      faqs={[
        { question: 'What is BMI?', answer: 'Body Mass Index (BMI) is a value calculated from your weight and height. It provides a rough estimate of whether your weight falls within a healthy range for your height. The formula is: BMI = weight (kg) ÷ height (m)².' },
        { question: 'What is a healthy BMI range?', answer: 'A BMI between 18.5 and 24.9 is generally considered normal weight. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is classified as obese. For Indian populations, some experts suggest that health risks increase at lower BMI values (above 23).' },
        { question: 'Is BMI accurate for everyone?', answer: 'No. BMI does not distinguish between muscle mass and fat mass. Athletes, pregnant women, growing children, and the elderly may get misleading results. It is a screening tool, not a diagnostic one. Consult a healthcare provider for a complete assessment.' },
        { question: 'How often should I check my BMI?', answer: 'Checking your BMI once every few months is usually sufficient. More important than the number itself is tracking your trend over time and focusing on healthy habits.' },
      ]}
      relatedTools={[
        { href: '/bmr-calculator', label: 'BMR Calculator' },
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
        { href: '/ideal-weight-calculator', label: 'Ideal Weight Calculator' },
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">Weight (kg)</label>
            <input type="number" className="input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" className="input" value={height} onChange={e => setHeight(parseFloat(e.target.value) || 0)} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <span style={{ fontSize: 48, fontWeight: 700, color: result.color }}>{result.bmi}</span>
          <span className="badge" style={{ background: result.color + '22', color: result.color, fontSize: 14, padding: '4px 16px' }}>{result.category}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center' }}>
          BMI = {weight} kg ÷ ({(height / 100).toFixed(2)} m)² = {result.bmi}
        </div>
      </div>

      <section className="mb-6">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Understanding Your BMI</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          BMI is calculated by dividing your weight in kilograms by your height in metres squared. It is widely used as a quick way to categorise weight status, but it has important limitations.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          For South Asian populations, research suggests that health risks may begin at lower BMI values. The World Health Organisation has proposed adjusted categories for Asian populations where overweight may begin at BMI 23 rather than 25. This is because South Asians tend to carry more visceral fat at lower BMIs compared to Western populations.
        </p>
      </section>
    </CalculatorLayout>
  );
}
