'use client';

import { useState, useEffect } from 'react';
import { Download, TrendingUp } from 'lucide-react';
import { getProfile, defaultProfile, getLogsForRange, exportCSV } from '@/lib/store';
import type { UserProfile, DailyLog } from '@/lib/types';

function sub(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

function MiniChart({ data, color, height = 60 }: { data: number[]; color: string; height?: number }) {
  if (data.length < 2) return <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Not enough data for chart</p>;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100 / (data.length - 1);
  const points = data.map((v, i) => `${i * w},${height - ((v - min) / range) * (height - 8)}`).join(' ');
  return (
    <svg viewBox={`0 0 100 ${height}`} style={{ width: '100%', height }} preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" points={points} />
    </svg>
  );
}

export default function ProgressPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile());
  const [period, setPeriod] = useState<'7' | '30'>('7');
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setProfile(getProfile() || defaultProfile());
    setLogs(getLogsForRange(sub(today, parseInt(period)), today));
  }, [period, today]);

  const dailyData = logs.map(l => {
    const n = l.meals.reduce((a, m) => ({
      calories: a.calories + m.nutrition.calories,
      protein: a.protein + m.nutrition.protein,
      carbs: a.carbs + m.nutrition.carbs,
      fat: a.fat + m.nutrition.fat,
      fibre: a.fibre + m.nutrition.fibre,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
    return { date: l.date, ...n, water: l.waterGlasses, weight: l.weight };
  });

  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const calArr = dailyData.map(d => d.calories);
  const protArr = dailyData.map(d => d.protein);
  const waterArr = dailyData.map(d => d.water);
  const weightArr = dailyData.filter(d => d.weight).map(d => d.weight!);

  // Most logged meals
  const foodCounts: Record<string, number> = {};
  logs.forEach(l => l.meals.forEach(m => { foodCounts[m.foodName] = (foodCounts[m.foodName] || 0) + 1; }));
  const topFoods = Object.entries(foodCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const handleExport = () => {
    const csv = exportCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `onlinemeasurer-diary-${today}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="container section animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Progress</h1>
        <button onClick={handleExport} className="btn btn-ghost btn-sm"><Download size={14} /> CSV</button>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2 mb-5">
        {(['7', '30'] as const).map(p => (
          <button key={p} onClick={() => setPeriod(p)} className="btn btn-sm" style={{
            background: period === p ? 'var(--green-700)' : 'var(--surface)',
            color: period === p ? 'white' : 'var(--text)',
            border: `1px solid ${period === p ? 'var(--green-700)' : 'var(--border)'}`,
          }}>
            {p === '7' ? '7 Days' : '30 Days'}
          </button>
        ))}
      </div>

      {/* Averages */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Avg Calories', value: `${avg(calArr)} kcal`, color: 'var(--green-700)' },
          { label: 'Avg Protein', value: `${avg(protArr)}g`, color: 'var(--blue)' },
          { label: 'Avg Water', value: `${avg(waterArr)} glasses`, color: 'var(--blue)' },
          { label: 'Days Tracked', value: `${logs.filter(l => l.meals.length > 0).length}`, color: 'var(--green-600)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Calorie Trend */}
      <div className="card mb-4" style={{ padding: '16px 20px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={16} style={{ color: 'var(--green-600)' }} /> Calorie Trend
        </h2>
        <MiniChart data={calArr} color="var(--green-600)" />
        <div className="flex justify-between mt-2" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          <span>Target: {profile.dailyCalorieTarget} kcal</span>
          <span>Avg: {avg(calArr)} kcal</span>
        </div>
      </div>

      {/* Protein Trend */}
      <div className="card mb-4" style={{ padding: '16px 20px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Protein Trend</h2>
        <MiniChart data={protArr} color="var(--blue)" />
        <div className="flex justify-between mt-2" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          <span>Target: {profile.dailyProteinTarget}g</span>
          <span>Avg: {avg(protArr)}g</span>
        </div>
      </div>

      {/* Weight Trend */}
      {weightArr.length > 0 && (
        <div className="card mb-4" style={{ padding: '16px 20px' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Weight Trend</h2>
          <MiniChart data={weightArr} color="var(--orange)" />
          <div className="flex justify-between mt-2" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
            <span>Latest: {weightArr[weightArr.length - 1]} kg</span>
            {profile.targetWeightKg && <span>Target: {profile.targetWeightKg} kg</span>}
          </div>
        </div>
      )}

      {/* Weekly Review */}
      <div className="card mb-4" style={{ padding: '16px 20px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Weekly Review</h2>

        {topFoods.length > 0 && (
          <div className="mb-3">
            <p style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>Most Logged Foods</p>
            {topFoods.map(([name, count]) => (
              <div key={name} className="flex justify-between py-1" style={{ fontSize: 13 }}>
                <span>{name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{count}×</span>
              </div>
            ))}
          </div>
        )}

        <div className="divider" />

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {avg(protArr) < profile.dailyProteinTarget * 0.8
            ? '💡 Your average protein intake is below target. Try adding paneer, eggs, dal, or sprouts to your meals.'
            : avg(calArr) > profile.dailyCalorieTarget * 1.1
            ? '💡 Your average calorie intake is above target. Consider smaller portions or more low-calorie options like salads.'
            : '💡 You are doing well! Keep up the consistent tracking — it is the most important factor in reaching your goals.'}
        </p>
      </div>
    </main>
  );
}
