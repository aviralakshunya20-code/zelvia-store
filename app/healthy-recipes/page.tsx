import Link from 'next/link';
import type { Metadata } from 'next';
import { AdSlot } from '@/components/ui/AdSlot';
import { Disclaimer } from '@/components/ui/Disclaimer';

export const metadata: Metadata = { title: 'Healthy Indian Recipes with Nutrition', description: 'Simple, healthy Indian recipe ideas with per-serving calorie and nutrition information. High-protein, low-calorie, and balanced meal ideas.', alternates: { canonical: 'https://onlinemeasurer.com/healthy-recipes' } };

const RECIPES = [
  { name: 'High-Protein Dal Tadka', cals: 140, protein: 8, desc: 'Toor dal with a simple tadka of ghee, cumin, garlic. Rich in protein and fibre.', serving: '1 katori', tip: 'Add spinach for extra iron and fibre.' },
  { name: 'Egg Bhurji with Veggies', cals: 200, protein: 14, desc: 'Scrambled eggs with onion, tomato, green chilli. Quick 10-minute high-protein breakfast.', serving: '2 eggs', tip: 'Use 1 whole egg + 2 whites to reduce fat.' },
  { name: 'Moong Sprout Chaat', cals: 120, protein: 8, desc: 'Boiled moong sprouts with onion, tomato, lemon, and chaat masala. Zero oil.', serving: '1 katori', tip: 'Great as a mid-meal protein snack.' },
  { name: 'Palak Paneer (Light)', cals: 160, protein: 10, desc: 'Spinach with paneer using minimal oil. Rich in calcium, iron, and protein.', serving: '1 katori', tip: 'Use low-fat paneer to reduce calories further.' },
  { name: 'Curd Rice', cals: 180, protein: 5, desc: 'Leftover rice mixed with fresh curd, mustard seeds, and curry leaves. Light and cooling.', serving: '1 katori', tip: 'Add pomegranate or cucumber for freshness.' },
  { name: 'Oats Chilla', cals: 150, protein: 7, desc: 'Savoury oats pancake with grated veggies. High fibre, low glycemic index.', serving: '2 chilla', tip: 'Mix oats with besan (gram flour) for extra protein.' },
  { name: 'Chicken Tikka (Grilled)', cals: 180, protein: 25, desc: 'Tandoori-style chicken tikka. One of the highest protein-per-calorie meals in Indian cuisine.', serving: '4 pieces', tip: 'Pair with mint chutney and onion salad for a complete meal.' },
  { name: 'Vegetable Daliya (Broken Wheat)', cals: 170, protein: 5, desc: 'Dalia cooked with mixed vegetables. High fibre whole grain meal suitable for diabetics.', serving: '1 katori', tip: 'Replace rice with daliya for better blood sugar control.' },
];

export default function HealthyRecipesPage() {
  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Healthy Indian Recipes</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
        Simple, nutritious Indian meal ideas with calorie and protein information. These are practical recipes you can cook at home with common ingredients.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        {RECIPES.map((r, i) => (
          <div key={i} className="card" style={{ padding: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{r.name}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{r.desc}</p>
            <div className="flex gap-4 mb-2" style={{ fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: 'var(--green-700)' }}>{r.cals} kcal</span>
              <span style={{ color: 'var(--blue)' }}>Protein: {r.protein}g</span>
              <span style={{ color: 'var(--text-secondary)' }}>per {r.serving}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--green-700)', fontStyle: 'italic' }}>💡 Tip: {r.tip}</p>
          </div>
        ))}
      </div>

      <AdSlot />

      <section className="mb-6">
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Build Your Own Recipes</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          Use our <Link href="/recipes">recipe builder</Link> to enter your own ingredients and calculate per-serving nutrition for any homemade dish.
        </p>
      </section>

      <Disclaimer />

      <section className="mt-6">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Related</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/indian-food-calories" className="btn btn-secondary btn-sm no-underline">Indian Food Calories</Link>
          <Link href="/protein-calculator" className="btn btn-secondary btn-sm no-underline">Protein Calculator</Link>
          <Link href="/calorie-calculator" className="btn btn-secondary btn-sm no-underline">Calorie Calculator</Link>
          <Link href="/" className="btn btn-primary btn-sm no-underline">Start Tracking →</Link>
        </div>
      </section>
    </main>
  );
}
