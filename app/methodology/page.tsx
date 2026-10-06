import React from 'react';
import Link from 'next/link';

export default function MethodologyPage() {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
        <Link href="/">HOME</Link> / LABORATORY PROTOCOL / TESTING METHODOLOGY
      </div>

      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '24px', marginBottom: '40px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
          METROLOGY PROTOCOL REF: MP-2026-REV4 // ISO 13385-1:2019
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Laboratory Testing Standards & Methodology
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          OnlineMeasurer evaluates commercial dimensional measuring tools, distance meters, multimeters, and embedded hardware using repeatable laboratory protocols. We do not accept free vendor review samples, do not publish sponsored reviews, and acquire all specimens anonymously through standard retail commerce.
        </p>
      </div>

      {/* Protocol Section 1 */}
      <section style={{ marginBottom: '48px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', marginBottom: '4px' }}>SECTION 01</div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Reference Standards & Calibration Equipment</h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
          All dimensional measurements are calibrated against Grade 0 ceramic and tungsten carbide gauge blocks certified to ISO 3650 standards. Temperature during verification is maintained at 20.0 °C (±1.5 °C) per ISO 1 reference temperature specifications to eliminate thermal expansion skew.
        </p>
        <div style={{ border: '1px solid var(--border-hairline)', backgroundColor: 'var(--bg-surface)', padding: '20px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li><strong>Primary Gauge Blocks:</strong> Grade 0 Ceramic Blocks (2.500 mm, 10.000 mm, 25.000 mm, 100.000 mm).</li>
            <li><strong>Surface Plate:</strong> Starrett Grade A Laboratory Granite Surface Plate (Flatness within 0.002 mm).</li>
            <li><strong>Optical Baseline:</strong> 50-meter indoor laser calibration hallway with fixed reflective and non-reflective targets.</li>
            <li><strong>Electrical Bench:</strong> Rigol DG1022Z Function Generator & Siglent SDS1104X-E 100MHz Digital Oscilloscope.</li>
          </ul>
        </div>
      </section>

      {/* Protocol Section 2 */}
      <section style={{ marginBottom: '48px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', marginBottom: '4px' }}>SECTION 02</div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Digital Caliper 50-Cycle Repeatability Protocol</h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
          Consumer calipers frequently display 0.01 mm resolution on their digital screen while suffering from 0.05 mm mechanical play in the sliding jaw carriage. We subject each caliper to a 50-cycle repeatability stress test:
        </p>
        <ol style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
          <li>The sliding jaw is closed against the fixed jaw to establish zero.</li>
          <li>A 25.000 mm Grade 0 ceramic block is inserted into the outer jaws.</li>
          <li>Thumbscrew pressure is applied until the slip mechanism engages (or standard 5N thumb force).</li>
          <li>The reading is recorded, the jaws are opened to 100 mm, and closed back onto the block.</li>
          <li>This cycle is repeated 50 consecutive times. The mean deviation and standard deviation (σ) are calculated.</li>
        </ol>
      </section>

      {/* Protocol Section 3 */}
      <section style={{ marginBottom: '48px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', marginBottom: '4px' }}>SECTION 03</div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Laser Distance Meter Environmental Stress Testing</h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Laser distance meters perform reliably under dim indoor conditions, but degrade significantly under intense solar illumination. Our testing benchmarks meters at 10m, 25m, and 50m intervals against four distinct target substrates: untreated plywood, white drywall, red brick, and dark painted aluminum, measuring signal-to-noise ratio and time-to-acquire.
        </p>
      </section>

      {/* Protocol Section 4: Editorial Independence */}
      <section style={{ border: '1px solid var(--border-hairline)', backgroundColor: 'var(--bg-surface)', padding: '28px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
          SECTION 04 // COMMERCIAL INDEPENDENCE & AFFILIATE STATEMENT
        </div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Commercial Transparency & Funding Model</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
          OnlineMeasurer maintains strict commercial separation between editorial testing and financial operations:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', fontSize: '0.85rem' }}>
          <div style={{ border: '1px solid var(--border-hairline)', padding: '16px', backgroundColor: 'var(--bg-canvas)' }}>
            <strong>Anonymous Retail Procurement:</strong> We do not accept free hardware samples from manufacturers or distributors. All test units are bought at standard retail pricing.
          </div>
          <div style={{ border: '1px solid var(--border-hairline)', padding: '16px', backgroundColor: 'var(--bg-canvas)' }}>
            <strong>Amazon Associates Program:</strong> Outbound purchase references contain our Associate Tag (<code>aviraltech-20</code>). We earn standardized fees on qualifying purchases, which directly fund our equipment procurement.
          </div>
        </div>
      </section>
    </div>
  );
}
