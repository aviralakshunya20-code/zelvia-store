import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Online Measurer – High-Performance Web Engineering & Custom Digital Platforms',
    template: '%s | Online Measurer',
  },
  description:
    'Custom web applications, high-converting e-commerce stores, and high-performance websites engineered with Next.js, React 19, and strict TypeScript. Sub-second speed and zero fake reviews.',
  keywords: [
    'Web developer portfolio',
    'Full-stack web engineer',
    'Next.js 16 web applications',
    'Custom e-commerce developer',
    'High performance websites',
    'Online Measurer',
    'Aviral web architect',
    'React 19 development',
    'TypeScript web applications',
    'Fast web apps for business',
  ],
  metadataBase: new URL('https://onlinemeasurer.com'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Online Measurer',
    title: 'Online Measurer – Web & App Studio',
    description:
      'We build high-converting websites and modern web applications that turn visitors into paying customers.',
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
        {/* Load Nunito & Quicksand which match Arial Rounded MT Bold aesthetic across all OS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-rose-100 selection:text-rose-700">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
