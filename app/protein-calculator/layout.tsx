import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Protein Calculator — Daily Protein Needs', description: 'Calculate how much protein you need per day based on your weight and activity. Includes Indian protein sources and recommendations.', alternates: { canonical: 'https://onlinemeasurer.com/protein-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
