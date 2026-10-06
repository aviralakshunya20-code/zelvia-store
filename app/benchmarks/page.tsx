import React from 'react';
import Link from 'next/link';

interface ReportItem {
  ref: string;
  date: string;
  category: string;
  title: string;
  abstract: string;
  findings: string[];
}

const REPORTS: ReportItem[] = [
  {
    ref: "REP-2026-01",
    date: "February 2026",
    category: "DIMENSIONAL METROLOGY",
    title: "Thermal Expansion Drift in Budget Stainless Steel Calipers (15°C to 35°C)",
    abstract: "Evaluation of 5 commercially popular sub-₹1,500 stainless steel digital calipers subjected to controlled thermal cycling inside an environmental test chamber. Focus on scale coefficient linearity and jaw parallelism.",
    findings: [
      "Hardened 4Cr13 steel specimens expanded predictably at 11.2 × 10^-6 /°C, matching theoretical material limits.",
      "Cheap carbon-fiber composite calipers exhibited 0.08 mm hysteresis at jaw closure due to moisture absorption and thermal deformation.",
      "Recommendation: For workshop environments fluctuating by >10°C, zero the caliper on a calibrated 25mm block at current ambient temperature."
    ]
  },
  {
    ref: "REP-2026-02",
    date: "January 2026",
    category: "OPTICAL DISTANCE",
    title: "Class II 635nm Laser Distance Meters in High-Lux Ambient Daylight",
    abstract: "Benchmarking beam divergence and pulse-transit receiver saturation under 80,000 to 100,000 lux outdoor solar illumination. Testing 50m and 100m distance meters across dark asphalt, timber, and drywall.",
    findings: [
      "Over 25 meters under direct sunlight, false error codes (ERR 101 / Signal Weak) increased by 64% without a red optical target plate.",
      "Dual spirit level models improved beam landing accuracy at 30m by 82% over single-vial models.",
      "Recommendation: When surveying outdoors beyond 20m, use a Class II meter equipped with a digital optical viewfinder or reflective target card."
    ]
  },
  {
    ref: "REP-2026-03",
    date: "December 2025",
    category: "EMBEDDED HARDWARE",
    title: "Servo Jitter Analysis on ESP32 Dual-Core Architecture Driving PCA9685 I2C Busses",
    abstract: "Oscilloscope timing analysis of 16 MG996R metal-gear servos articulated simultaneously by an ESP32 microcontroller over I2C fast-mode (400 kHz) during active Wi-Fi telemetry transmission.",
    findings: [
      "When Wi-Fi RTOS tasks and PWM servo loops shared Core 0, servo pulse jitter reached 12 microseconds during TCP packet bursts, causing audible joint chatter.",
      "Pinning the I2C control task strictly to Core 1 completely eliminated jitter (< 0.1 microseconds standard deviation).",
      "Recommendation: For walking robotics, always isolate telemetry tasks to Core 0 and kinematic control loops to Core 1."
    ]
  },
  {
    ref: "REP-2026-04",
    date: "November 2025",
    category: "ELECTRICAL MEASUREMENT",
    title: "True-RMS Crest Factor Accuracy on Budget 6000-Count Multimeters",
    abstract: "Testing AC voltage measurement errors on modified sine wave inverters and phase-cut TRIAC light dimmers using True-RMS vs standard average-responding digital multimeters.",
    findings: [
      "Standard average-responding multimeters underestimated modified sine wave RMS voltage by 14.8%.",
      "True-RMS meters with CAT III 600V protection measured within 1.2% of high-end calibrated bench oscilloscopes.",
      "Recommendation: True-RMS is strictly required for measuring AC motor controllers, switching power supplies, and inverters."
    ]
  }
];

export default function BenchmarksPage() {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
        <Link href="/">HOME</Link> / PUBLICATIONS / LABORATORY BENCHMARK REPORTS
      </div>

      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '24px', marginBottom: '40px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
          ARCHIVE // TECHNICAL BENCHMARK BULLETINS
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Laboratory Benchmark Reports & Technical Dispatches
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Comprehensive engineering evaluations, oscilloscope captures, thermal drift studies, and repeatable test datasets compiled by the OnlineMeasurer metrology team.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {REPORTS.map((report) => (
          <article
            key={report.ref}
            style={{
              border: '1px solid var(--border-hairline)',
              backgroundColor: 'var(--bg-canvas)',
              padding: '28px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600 }}>
                {report.ref} // {report.category}
              </span>
              <span className="meta-code" style={{ color: 'var(--text-muted)' }}>
                PUBLISHED: {report.date}
              </span>
            </div>

            <h2 style={{ fontSize: '1.45rem', marginBottom: '12px', lineHeight: 1.3 }}>
              {report.title}
            </h2>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {report.abstract}
            </p>

            <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '16px', backgroundColor: 'var(--bg-surface)', padding: '16px' }}>
              <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
                KEY EXPERIMENTAL FINDINGS:
              </div>
              <ul style={{ listStyle: 'square', paddingLeft: '20px', fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {report.findings.map((finding, idx) => (
                  <li key={idx} style={{ lineHeight: 1.5 }}>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
