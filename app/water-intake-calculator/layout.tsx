import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Water Intake Calculator — Daily Water Needs', description: 'Calculate how much water you should drink daily based on your weight and activity level. Free hydration calculator.', alternates: { canonical: 'https://onlinemeasurer.com/water-intake-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
