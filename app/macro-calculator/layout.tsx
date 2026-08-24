import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Macro Calculator — Protein, Carbs & Fat', description: 'Calculate your daily macro targets (protein, carbs, fat) based on your calorie goal. Free macro calculator with balanced, high-protein, and low-carb splits.', alternates: { canonical: 'https://onlinemeasurer.com/macro-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
