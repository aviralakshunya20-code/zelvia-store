'use client';
import { useState } from 'react';
import { CalculatorLayout } from '@/components/ui/CalculatorLayout';
import { calcCaloriesBurned, ACTIVITY_METS } from '@/lib/calculators';

export default function CaloriesBurnedPage() {
  const [weight, setWeight] = useState(65);
  const [activity, setActivity] = useState('walking_brisk');
  const [duration, setDuration] = useState(30);
  const burned = calcCaloriesBurned(weight, ACTIVITY_METS[activity].met, duration);

  return (
    <CalculatorLayout
      title="Calories Burned Calculator"
      description="Estimate how many calories you burn during different physical activities based on your weight and exercise duration."
      faqs={[
        { question: 'How are calories burned calculated?', answer: 'We use MET (Metabolic Equivalent of Task) values. Calories burned = MET × weight (kg) × duration (hours). MET values are standardised estimates of energy expenditure for various activities.' },
        { question: 'Which activity burns the most calories?', answer: 'High-intensity activities like running, skipping rope, and swimming burn the most calories per minute. However, the best exercise is one you enjoy and can do consistently.' },
      ]}
      relatedTools={[
        { href: '/calorie-calculator', label: 'Calorie Calculator' },
        { href: '/tdee-calculator', label: 'TDEE Calculator' },
        { href: '/macro-calculator', label: 'Macro Calculator' },
      ]}
    >
      <div className="card mb-6" style={{ padding: 20 }}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="label">Weight (kg)</label><input type="number" className="input" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} /></div>
          <div><label className="label">Duration (min)</label><input type="number" className="input" value={duration} onChange={e => setDuration(parseInt(e.target.value) || 0)} /></div>
        </div>
        <div className="mb-4"><label className="label">Activity</label>
          <select className="input" value={activity} onChange={e => setActivity(e.target.value)}>
            {Object.entries(ACTIVITY_METS).map(([key, val]) => (
              <option key={key} value={key}>{val.name} (MET: {val.met})</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center gap-2 py-4">
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--orange)' }}>{burned}</span>
          <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>calories burned</span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ACTIVITY_METS[activity].name} · {duration} minutes</span>
        </div>
      </div>

      {/* Activity reference table */}
      <section className="mb-6">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Calories Burned for {weight} kg ({duration} min)</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Activity</th><th>Calories</th></tr></thead>
            <tbody>
              {Object.entries(ACTIVITY_METS).map(([key, val]) => (
                <tr key={key} style={{ background: key === activity ? 'var(--green-100)' : undefined }}>
                  <td>{val.name}</td>
                  <td style={{ fontWeight: 600 }}>{calcCaloriesBurned(weight, val.met, duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </CalculatorLayout>
  );
}
