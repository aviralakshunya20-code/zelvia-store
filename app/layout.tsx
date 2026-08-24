import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/ui/Header';
import { BottomNav } from '@/components/ui/BottomNav';
import { CookieConsent } from '@/components/ui/CookieConsent';

export const metadata: Metadata = {
  title: {
    default: 'OnlineMeasurer — AI Calorie & Nutrition Tracker for Indian Food',
    template: '%s | OnlineMeasurer',
  },
  description: 'Track calories, protein, carbs and nutrition for Indian food with AI. Photo scanning, natural language logging, and 80+ Indian foods. Free BMI, BMR, TDEE calculators.',
  keywords: ['AI calorie tracker', 'calorie tracker India', 'Indian food calorie calculator', 'food photo calorie counter', 'calorie calculator', 'BMI calculator', 'BMR calculator', 'TDEE calculator', 'macro calculator', 'protein calculator', 'daily calorie intake calculator', 'homemade food calorie tracker'],
  metadataBase: new URL('https://onlinemeasurer.com'),
  openGraph: {
    type: 'website',
    siteName: 'OnlineMeasurer',
    title: 'OnlineMeasurer — AI Calorie & Nutrition Tracker',
    description: 'Track calories, protein, and nutrition for Indian food. Free calculators and AI-powered meal logging.',
    url: 'https://onlinemeasurer.com',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onlinemeasurer.com' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'OnlineMeasurer',
              url: 'https://onlinemeasurer.com',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web',
              description: 'AI-powered calorie and nutrition tracker for Indian food. Track meals with photo scanning, natural language, and voice logging.',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            }),
          }}
        />
      </head>
      <body>
        <Header />
        <div className="page-content">{children}</div>
        <BottomNav />
        <CookieConsent />
      </body>
    </html>
  );
}
