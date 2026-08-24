import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Ideal Weight Calculator', description: 'Calculate your ideal body weight range based on height and sex. Free ideal weight calculator using the Devine formula.', alternates: { canonical: 'https://onlinemeasurer.com/ideal-weight-calculator' } };
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
