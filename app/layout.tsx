import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ONLINE MEASURER | Curated Hardware & Robotics Engineering Catalog',
  description:
    'The definitive curated hardware catalog for robotics builders, embedded engineers, and makers. Verified microcontrollers, precision sensors, actuators, and companion textbooks.',
  keywords: [
    'OnlineMeasurer',
    'ONLINE MEASURER',
    'Robotics Catalog',
    'ESP32',
    'Hardware Engineering',
    'Mera Pehla Humanoid Robot',
    'The Coding Interview Blueprint',
    'Sensors',
    'PCA9685',
    'MG996R',
  ],
  metadataBase: new URL('https://onlinemeasurer.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'ONLINE MEASURER',
    title: 'ONLINE MEASURER | Curated Hardware & Robotics Engineering Catalog',
    description:
      'Verified robotics components, ESP32 microcontrollers, PCA9685 drivers & author masterclasses.',
    url: 'https://onlinemeasurer.com',
    images: [
      {
        url: 'https://onlinemeasurer.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ONLINE MEASURER Curated Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ONLINE MEASURER | Curated Hardware & Robotics Engineering Catalog',
    description:
      'Verified robotics components, ESP32 microcontrollers, PCA9685 drivers & author masterclasses.',
    images: ['https://onlinemeasurer.com/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onlinemeasurer.com' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Montserrat:ital,wght@1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
