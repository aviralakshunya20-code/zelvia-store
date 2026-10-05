import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'OnlineMeasurer | Curated Builder & Hardware Catalog',
  description:
    'Curated components, hardware kits, dev gear, and textbooks featured in Mera Pehla Humanoid Robot and The Coding Interview Blueprint.',
  keywords: [
    'OnlineMeasurer',
    'Curated Hardware Catalog',
    'Mera Pehla Humanoid Robot',
    'The Coding Interview Blueprint',
    'ESP32 Robotics',
    'PCA9685 servo driver',
    'B.Tech hardware kit',
    'Amazon Curated Store',
  ],
  metadataBase: new URL('https://onlinemeasurer.com'),
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'OnlineMeasurer',
    title: 'OnlineMeasurer | Curated Builder & Hardware Catalog',
    description:
      'Interactive animated catalog of verified hardware components, robotics kits, dev gear, and books.',
    url: 'https://onlinemeasurer.com',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://onlinemeasurer.com' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
