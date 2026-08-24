import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'TDEE Calculator — Total Daily Energy Expenditure', description: 'Calculate your Total Daily Energy Expenditure. Know how many calories you burn daily based on your activity level. Free TDEE calculator.', alternates: { canonical: 'https://onlinemeasurer.com/tdee-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
