import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Calorie Calculator — Daily Calorie Intake', description: 'Calculate how many calories you need per day based on your body, activity, and goals. Free daily calorie intake calculator.', alternates: { canonical: 'https://onlinemeasurer.com/calorie-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
