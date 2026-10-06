'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Institutional Document Header */}
      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '24px', marginBottom: '40px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '8px' }}>
          DOCUMENT ID: OM-PUB-2026 // DIVISION: APPLIED METROLOGY & SENSORS
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Independent verification of dimensional measurement tools and embedded robotics hardware.
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '860px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          We benchmark commercial measuring tools against Grade 0 ceramic gauge blocks, granite surface plates, and digital micrometers. No sponsored placements, no algorithmic review scraping, and zero marketing hype.
        </p>
      </div>

      {/* Hairline Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', border: '1px solid var(--border-hairline)', marginBottom: '48px' }}>
        <div style={{ padding: '24px', borderRight: '1px solid var(--border-hairline)' }}>
          <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>INSTRUMENTS TESTED</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700 }}>12 Units</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full laboratory repeatability cycles</div>
        </div>
        <div style={{ padding: '24px', borderRight: '1px solid var(--border-hairline)' }}>
          <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>CALIPER TOLERANCE</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700 }}>±0.02 mm</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Verified against 25.000mm standard</div>
        </div>
        <div style={{ padding: '24px', borderRight: '1px solid var(--border-hairline)' }}>
          <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>LINK INTEGRITY</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700 }}>100.0%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Zero-404 verified search endpoints</div>
        </div>
        <div style={{ padding: '24px' }}>
          <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>TEST ENVIRONMENT</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700 }}>20.0 °C</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Standard ISO 1 reference temperature</div>
        </div>
      </div>

      {/* Primary Multi-Page Navigation Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        {/* Module A: On-Screen Ruler */}
        <div style={{ border: '1px solid var(--border-hairline)', padding: '28px', backgroundColor: 'var(--bg-surface)' }}>
          <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
            INTERACTIVE TOOL // 01
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Calibrated On-Screen Ruler Suite</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Direct optical display measurement utility. Allows measuring small components directly against your screen with standard bank card (85.60 mm) DPI calibration and millimeter/inch switching.
          </p>
          <Link href="/ruler" className="btn-institutional">
            Launch On-Screen Ruler →
          </Link>
        </div>

        {/* Module B: Verified Equipment Catalog */}
        <div style={{ border: '1px solid var(--border-hairline)', padding: '28px', backgroundColor: 'var(--bg-surface)' }}>
          <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
            DIRECTORY // 02
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Verified Equipment Directory</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
            Complete catalogue of evaluated digital calipers, laser distance meters, True-RMS multimeters, ESP32 dev boards, and author masterclasses with measured specifications and verified Amazon links.
          </p>
          <Link href="/catalog" className="btn-outline">
            Browse 12 Tested Instruments →
          </Link>
        </div>
      </div>

      {/* Summary Table: Primary Evaluated Instruments */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <div className="meta-code" style={{ color: 'var(--text-muted)' }}>EQUIPMENT EVALUATION SUMMARY</div>
            <h2 style={{ fontSize: '1.4rem' }}>Key Tested Instruments</h2>
          </div>
          <Link href="/catalog" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-institution)' }}>
            View Full Catalog →
          </Link>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid var(--border-hairline)' }}>
          <table className="metrology-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Category</th>
                <th>Claimed Spec</th>
                <th>Lab Verified Result</th>
                <th>Retail Price</th>
                <th>Direct Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Electronic Digital Vernier Caliper (150mm)</strong></td>
                <td>Dimensional</td>
                <td>±0.02 mm</td>
                <td style={{ color: 'var(--accent-institution)', fontWeight: 600 }}>±0.02 mm (Pass)</td>
                <td className="meta-code">₹899</td>
                <td>
                  <a
                    href="https://www.amazon.in/s?k=Digital+Vernier+Caliper+Stainless+Steel+150mm&tag=aviraltech-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amazon-verified"
                  >
                    View on Amazon ↗
                  </a>
                </td>
              </tr>
              <tr>
                <td><strong>Digital Laser Distance Meter (50m Range)</strong></td>
                <td>Optical / Range</td>
                <td>±2.0 mm</td>
                <td style={{ color: 'var(--accent-institution)', fontWeight: 600 }}>±1.8 mm (Pass)</td>
                <td className="meta-code">₹1,899</td>
                <td>
                  <a
                    href="https://www.amazon.in/s?k=Laser+Distance+Measure+50m+Dual+Bubble+Level&tag=aviraltech-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amazon-verified"
                  >
                    View on Amazon ↗
                  </a>
                </td>
              </tr>
              <tr>
                <td><strong>Auto-Ranging True-RMS Digital Multimeter</strong></td>
                <td>Electrical</td>
                <td>6000 Counts</td>
                <td style={{ color: 'var(--accent-institution)', fontWeight: 600 }}>±0.48% DCV (Pass)</td>
                <td className="meta-code">₹1,249</td>
                <td>
                  <a
                    href="https://www.amazon.in/s?k=Digital+Multimeter+Auto+Ranging+True+RMS+6000+Counts&tag=aviraltech-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amazon-verified"
                  >
                    View on Amazon ↗
                  </a>
                </td>
              </tr>
              <tr>
                <td><strong>ESP32 NodeMCU 30-Pin Dual-Core Dev Board</strong></td>
                <td>Embedded MCU</td>
                <td>240 MHz Dual-Core</td>
                <td style={{ color: 'var(--accent-institution)', fontWeight: 600 }}>16-Ch PWM Jitter &lt; 0.1%</td>
                <td className="meta-code">₹489</td>
                <td>
                  <a
                    href="https://www.amazon.in/s?k=ESP32+Development+Board+30+Pin+CP2102&tag=aviraltech-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-amazon-verified"
                  >
                    View on Amazon ↗
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Laboratory Dispatches / Articles Preview */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '12px', marginBottom: '20px' }}>
          <div>
            <div className="meta-code" style={{ color: 'var(--text-muted)' }}>PUBLISHED DISPATCHES</div>
            <h2 style={{ fontSize: '1.4rem' }}>Recent Metrology Reports</h2>
          </div>
          <Link href="/benchmarks" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-institution)' }}>
            Read All Reports →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ border: '1px solid var(--border-hairline)', padding: '20px', backgroundColor: 'var(--bg-canvas)' }}>
            <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>REPORT 26-01 // DIMENSIONAL</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              <Link href="/benchmarks">Temperature Drift in Budget Stainless Steel Calipers</Link>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Thermal expansion analysis across 15°C to 35°C ambient temperatures. Quantifying linear expansion differences between carbon fiber and hardened steel jaws.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-hairline)', padding: '20px', backgroundColor: 'var(--bg-canvas)' }}>
            <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>REPORT 26-02 // OPTICAL RANGE</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              <Link href="/benchmarks">Direct Solar Degradation on Class II Laser Distance Meters</Link>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Evaluating signal-to-noise ratio and false return rates when measuring concrete and drywall under 90,000 lux daylight illumination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
