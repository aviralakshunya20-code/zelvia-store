import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Motor City Auto Repair | Honest Mechanic in Dallas, TX (4.9★ Rated)',
  description:
    'Motor City Auto Repair at 2939 S Ervay St, Dallas, TX. Rated 4.9★ with 925+ reviews. Specializing in computer diagnostics, electrical repair, Texas A/C service, brakes, and transmissions. Call (214) 565-5550.',
  keywords: [
    'auto repair Dallas TX',
    'mechanic near me',
    '2939 S Ervay St',
    'Motor City Auto Repair',
    'check engine light Dallas',
    'car AC repair Dallas',
    'brake repair Dallas',
  ],
  icons: {
    icon: [{ url: '/motor-city/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Motor City Auto Repair | 4.9★ Rated Independent Mechanic in Dallas, TX',
    description:
      'Dealer-level computer diagnostics, honest Texas pricing, and bumper-to-bumper auto repair at 2939 S Ervay St.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Motor City Auto Repair Dallas',
      },
    ],
  },
};

export default function MotorCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
