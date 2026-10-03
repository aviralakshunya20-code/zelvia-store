import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Online Measurer – High-Performance Web Engineering & Architecture',
    template: '%s | Online Measurer',
  },
  description:
    'Engineering high-impact web applications, modern e-commerce storefronts, and high-converting websites. 100/100 Core Web Vitals, sub-second TTFB, and zero fake reviews.',
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
    title: 'Online Measurer – High-Performance Web Engineering',
    description:
      'Engineering high-impact web applications, modern e-commerce, and high-converting websites. Measured for perfection.',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Online Measurer',
              url: 'https://onlinemeasurer.com',
              description:
                'High-performance web engineering studio specializing in Next.js web applications, e-commerce storefronts, and conversion-driven websites.',
              founder: {
                '@type': 'Person',
                name: 'Aviral',
                email: 'aviralakshunya20@gmail.com',
              },
              areaServed: 'Worldwide',
              priceRange: '$$$',
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
