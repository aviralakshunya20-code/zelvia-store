import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'BMR Calculator — Basal Metabolic Rate', description: 'Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation. Know how many calories your body burns at rest.', alternates: { canonical: 'https://onlinemeasurer.com/bmr-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
