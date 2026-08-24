'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { FOOD_DATABASE, searchFoods, getCategories, PORTION_LABELS } from '@/lib/nutrition-db';
import { AdSlot } from '@/components/ui/AdSlot';
import { Disclaimer } from '@/components/ui/Disclaimer';

export default function IndianFoodCaloriesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const results = searchFoods(query, { vegetarian: vegOnly || undefined, category: category || undefined });
  const categories = getCategories();

  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Indian Food Calorie Chart</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
        Find calories, protein, carbs, fat, and fibre values for {FOOD_DATABASE.length}+ common Indian foods. Search for roti, dal, paneer, biryani, idli, dosa, and more. All values are per standard serving in household portions.
      </p>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ minWidth: 200 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 14, color: 'var(--gray-400)' }} />
          <input className="input" style={{ paddingLeft: 36 }} placeholder="Search food..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <select className="input" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <label className="flex items-center gap-2 btn btn-ghost btn-sm" style={{ fontSize: 13 }}>
          <input type="checkbox" checked={vegOnly} onChange={e => setVegOnly(e.target.checked)} style={{ accentColor: 'var(--green-600)' }} /> Veg
        </label>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }} className="mb-6">
        <table className="data-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Serving</th>
              <th>Cal</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Fibre</th>
            </tr>
          </thead>
          <tbody>
            {results.map(food => (
              <tr key={food.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{food.name} {food.isVegetarian && '🟢'}</div>
                  {food.nameHi && <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{food.nameHi}</div>}
                </td>
                <td style={{ whiteSpace: 'nowrap', fontSize: 12 }}>{food.servingSize} {food.servingUnit}</td>
                <td style={{ fontWeight: 600 }}>{food.nutrition.calories}</td>
                <td>{food.nutrition.protein}g</td>
                <td>{food.nutrition.carbs}g</td>
                <td>{food.nutrition.fat}g</td>
                <td>{food.nutrition.fibre}g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
        Sources: IFCT 2017 (Indian Food Composition Tables), NIN Hyderabad estimates, and product labels. Values are approximate for standard household servings.
      </p>

      <AdSlot />

      {/* Explanation */}
      <section className="mb-6">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Understanding Indian Food Portions</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          Indian cooking uses household measurements that vary from home to home. Here are the approximate portions we use:
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(PORTION_LABELS).filter(([k]) => !['g', 'ml'].includes(k)).map(([key, label]) => (
            <div key={key} className="card" style={{ padding: '8px 12px', fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{key}</span>: {label}
            </div>
          ))}
        </div>
      </section>

      <Disclaimer />

      <section className="mt-6">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/calorie-calculator" className="btn btn-secondary btn-sm no-underline">Calorie Calculator</Link>
          <Link href="/protein-calculator" className="btn btn-secondary btn-sm no-underline">Protein Calculator</Link>
          <Link href="/macro-calculator" className="btn btn-secondary btn-sm no-underline">Macro Calculator</Link>
          <Link href="/" className="btn btn-primary btn-sm no-underline">Track Your Meals →</Link>
        </div>
      </section>
    </main>
  );
}
