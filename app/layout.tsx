import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#090b10',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'OnlineMeasurer | Verified Precision Tools, Laser Measurers & Hardware Lab',
  description:
    'Independent accuracy benchmarks, interactive on-screen calibration tools, and verified buying guides for digital calipers, laser distance meters, multimeters, and robotics hardware.',
  keywords: [
    'OnlineMeasurer',
    'online measurer',
    'on screen ruler',
    'laser distance meter',
    'digital caliper',
    'multimeter benchmark',
    'ESP32',
    'precision measurement',
    'Mera Pehla Humanoid Robot',
  ],
  metadataBase: new URL('https://onlinemeasurer.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'OnlineMeasurer',
    title: 'OnlineMeasurer | Verified Precision Tools, Laser Measurers & Hardware Lab',
    description:
      'Independent accuracy benchmarks, interactive on-screen calibration tools, and verified buying guides.',
    url: 'https://onlinemeasurer.com',
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
