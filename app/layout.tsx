import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'OnlineMeasurer | Laboratory for Dimensional Metrology & Hardware Verification',
  description:
    'Independent metrology testing laboratory evaluating commercial dimensional measuring tools, calipers, laser meters, and embedded microcontrollers against calibrated standards.',
  keywords: [
    'OnlineMeasurer',
    'Dimensional Metrology',
    'Calibrated Ruler',
    'Digital Caliper Accuracy',
    'Laser Distance Meter Test',
    'Grade 0 Gauge Blocks',
    'ESP32 Hardware Benchmarks',
    'ISO 13385',
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
    siteName: 'OnlineMeasurer Laboratory',
    title: 'OnlineMeasurer | Dimensional Metrology & Hardware Verification',
    description:
      'Independent laboratory benchmarks for commercial calipers, laser meters, and robotics hardware.',
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
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Top Utility Chrome Strip */}
        <div style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-hairline)', fontSize: '0.75rem', padding: '6px 24px' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
              LAB REGISTRY: OM-2026-Q1 // SPECIMENS EVALUATED: 12 // METROLOGICAL REF: ISO 13385-1
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="meta-code" style={{ color: 'var(--text-muted)' }}>
                AFFILIATE DISCLOSURE: AMAZON TAG <strong>aviraltech-20</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Global Persistent Header */}
        <header style={{ backgroundColor: 'var(--bg-canvas)', borderBottom: '1px solid var(--border-hairline)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  ONLINE MEASURER
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>
                  Laboratory of Applied Metrology & Hardware Verification
                </div>
              </Link>
            </div>

            {/* Distinct Navigation Routes */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Home
              </Link>
              <Link href="/ruler" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                On-Screen Ruler
              </Link>
              <Link href="/catalog" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Equipment Catalog
              </Link>
              <Link href="/methodology" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Testing Standards
              </Link>
              <Link href="/benchmarks" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Lab Reports
              </Link>
              <Link href="/contact" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Inquiries
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main>{children}</main>

        {/* Persistent Global Institutional Footer (Utility Chrome) */}
        <footer style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-hairline)', marginTop: '80px', padding: '48px 24px 32px' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginBottom: '40px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  OnlineMeasurer Laboratory
                </div>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  An independent metrology and hardware evaluation initiative. We acquire retail measuring tools anonymously and benchmark dimensional repeatability against calibrated Grade 0 reference standards.
                </p>
                <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
                  REVISION INDEX: 2026.4 // JURISDICTION: IN & GLOBAL
                </div>
              </div>

              <div>
                <div className="meta-code" style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Index & Architecture
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <li><Link href="/" style={{ color: 'var(--text-secondary)' }}>Overview & Recent Data</Link></li>
                  <li><Link href="/ruler" style={{ color: 'var(--text-secondary)' }}>On-Screen Calibrated Ruler Suite</Link></li>
                  <li><Link href="/catalog" style={{ color: 'var(--text-secondary)' }}>Verified Hardware Directory (12 Tools)</Link></li>
                  <li><Link href="/methodology" style={{ color: 'var(--text-secondary)' }}>Metrological Testing Protocol</Link></li>
                  <li><Link href="/benchmarks" style={{ color: 'var(--text-secondary)' }}>Technical Benchmark Bulletins</Link></li>
                  <li><Link href="/contact" style={{ color: 'var(--text-secondary)' }}>Technical Errata & Submissions</Link></li>
                </ul>
              </div>

              <div>
                <div className="meta-code" style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px', textTransform: 'uppercase' }}>
                  Commercial Transparency & Affiliation
                </div>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '12px' }}>
                  OnlineMeasurer participates in the Amazon Services LLC Associates Program. When visitors click outbound references to Amazon.in or Amazon.com, we may receive a standardized commission on qualifying items purchased within 24 hours.
                </p>
                <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
                  ASSOCIATE TAG: <strong>aviraltech-20</strong>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <div>
                © 2026 OnlineMeasurer Laboratory. Evaluated under strict metrological repeatability protocols.
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link href="/methodology">Editorial Independence</Link>
                <Link href="/contact">Submit Errata</Link>
                <a href="#top">Return to Top ↑</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
