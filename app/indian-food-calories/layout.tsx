import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Indian Food Calorie Chart — Calories in Indian Food', description: 'Complete calorie chart for Indian foods: roti, rice, dal, paneer, biryani, idli, dosa, poha, and more. Calories, protein, carbs, fat per serving.', alternates: { canonical: 'https://onlinemeasurer.com/indian-food-calories' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
