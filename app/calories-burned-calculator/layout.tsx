import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Calories Burned Calculator', description: 'Calculate calories burned during exercise and physical activities. Includes walking, running, cycling, yoga, cricket, and more.', alternates: { canonical: 'https://onlinemeasurer.com/calories-burned-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
