import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#07090e',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dave Hill Goalkeeping Academy | Elite Pro GK Coaching & Mentorship',
  description:
    'Elite 1-on-1 Goalkeeper Coaching by Dave Hill — 1st Team Goalkeeper Coach at Leatherhead FC. Ex-Bracknell Town, Farnborough FC & Chertsey Town. Surrey & Berkshire.',
  keywords: [
    'Dave Hill goalkeeper coach',
    'Leatherhead FC GK coach',
    'goalkeeper training Surrey',
    'goalkeeper coaching Berkshire',
    'elite goalkeeper academy UK',
  ],
  openGraph: {
    title: 'Dave Hill Goalkeeping Academy | 1st Team Coach Leatherhead FC',
    description:
      'Elite pro goalkeeper coaching, cross dominance, shot stopping, footwork biomechanics, and trial preparation.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Dave Hill Goalkeeping Academy',
      },
    ],
  },
};

export default function DaveHillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
