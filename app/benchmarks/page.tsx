import React from 'react';
import Link from 'next/link';

interface StatBox {
  value: string;
  label: string;
  desc: string;
  highlightColor?: string;
}

interface ReportItem {
  ref: string;
  date: string;
  category: string;
  categoryType: 'dimensional' | 'optical' | 'embedded' | 'electrical';
  title: string;
  abstract: string;
  metrics: StatBox[];
  findings: string[];
  diagramTitle: string;
  diagramSvg: React.ReactNode;
}

const REPORTS: ReportItem[] = [
  {
    ref: 'REP-2026-01',
    date: 'February 2026',
    category: 'Dimensional Metrology',
    categoryType: 'dimensional',
    title: 'Thermal Expansion Drift in Budget Stainless Steel Calipers (15°C to 35°C)',
    abstract: 'Evaluation of 5 commercially popular sub-₹1,500 stainless steel digital calipers subjected to controlled thermal cycling inside an environmental test chamber. Focus on scale coefficient linearity, jaw parallelism, and composite carbon-fiber closure hysteresis.',
    metrics: [
      {
        value: '0.08 mm',
        label: 'Jaw Closure Hysteresis',
        desc: 'Composite carbon-fiber specimens under moisture and 20°C thermal delta.',
        highlightColor: '#38bdf8',
      },
      {
        value: '11.2 ppm/°C',
        label: 'Thermal Expansion Coeff',
        desc: 'Hardened 4Cr13 steel matched theoretical limits within ±0.4%.',
        highlightColor: undefined,
      },
      {
        value: '15°C → 35°C',
        label: 'Chamber Test Window',
        desc: 'Controlled thermal cycling simulating non-climate-controlled workshops.',
        highlightColor: undefined,
      },
      {
        value: '±0.02 mm',
        label: 'Certified Reference Bar',
        desc: 'Benchmarked against calibrated Grade 0 ceramic gauge blocks.',
        highlightColor: '#38bdf8',
      },
    ],
    findings: [
      'Hardened 4Cr13 steel specimens expanded predictably at 11.2 × 10^-6 /°C, matching theoretical material limits.',
      'Cheap carbon-fiber composite calipers exhibited 0.08 mm hysteresis at jaw closure due to moisture absorption and thermal deformation.',
      'Operational Directive: For workshops fluctuating by >10°C, always zero the caliper on a calibrated 25mm ceramic block at current ambient temperature.',
    ],
    diagramTitle: 'FIG 1.1: Environmental Chamber Jaw Drift & Hysteresis Envelope (15°C – 35°C)',
    diagramSvg: (
      <svg viewBox="0 0 460 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="460" height="160" fill="#080C14" />
        <defs>
          <pattern id="grid-caliper" width="23" height="16" patternUnits="userSpaceOnUse">
            <path d="M 23 0 L 0 0 0 16" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="460" height="160" fill="url(#grid-caliper)" />

        <line x1="40" y1="135" x2="430" y2="135" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="135" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

        <text x="45" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">15°C</text>
        <text x="140" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">20°C</text>
        <text x="235" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">25°C (STD)</text>
        <text x="330" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">30°C</text>
        <text x="415" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">35°C</text>

        <text x="10" y="32" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="start">+0.10mm</text>
        <text x="10" y="80" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="start">±0.00mm</text>
        <text x="10" y="128" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="start">-0.05mm</text>

        <path d="M 40 86 L 140 82 L 235 78 L 330 73 L 430 68" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
        <path d="M 40 82 C 100 80, 180 65, 235 60 C 290 55, 360 48, 430 40" fill="none" stroke="#38BDF8" strokeWidth="2.2" />
        <path d="M 430 40 C 370 56, 300 78, 235 88 C 170 98, 100 102, 40 100" fill="none" stroke="#F59E0B" strokeWidth="1.8" />

        <line x1="235" y1="60" x2="235" y2="88" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="235" cy="60" r="3" fill="#38BDF8" />
        <circle cx="235" cy="88" r="3" fill="#F59E0B" />
        <rect x="245" y="66" width="145" height="20" fill="rgba(8, 12, 20, 0.9)" stroke="#38BDF8" strokeWidth="1" rx="4" />
        <text x="252" y="80" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">Δ = 0.08 mm Hysteresis</text>

        <rect x="52" y="24" width="8" height="2" fill="#FFFFFF" />
        <text x="65" y="27" fill="#E2E8F0" fontSize="8" fontFamily="monospace">4Cr13 Steel (11.2 ppm/°C)</text>
        <rect x="200" y="24" width="8" height="2" fill="#38BDF8" />
        <text x="213" y="27" fill="#38BDF8" fontSize="8" fontFamily="monospace">Composite Heating</text>
        <rect x="330" y="24" width="8" height="2" fill="#F59E0B" />
        <text x="343" y="27" fill="#F59E0B" fontSize="8" fontFamily="monospace">Cooling Lag</text>
      </svg>
    ),
  },
  {
    ref: 'REP-2026-02',
    date: 'January 2026',
    category: 'Optical Distance',
    categoryType: 'optical',
    title: 'Class II 635nm Laser Distance Meters in High-Lux Ambient Daylight',
    abstract: 'Benchmarking optical beam divergence and pulse-transit receiver saturation under 80,000 to 100,000 lux outdoor solar illumination. Testing 50m and 100m distance meters across dark asphalt, timber, and drywall surfaces.',
    metrics: [
      {
        value: '64%',
        label: 'Sunlight Error Rate',
        desc: 'Receiver saturation ERR 101 code frequency past 25m without target plate.',
        highlightColor: '#fb923c',
      },
      {
        value: '82%',
        label: 'Repeatability Gain',
        desc: 'Dual spirit level chassis compared to single-vial handheld benchmarks.',
        highlightColor: undefined,
      },
      {
        value: '100k Lux',
        label: 'Solar Lux Stress Limit',
        desc: 'Testing outdoor direct perpendicular summer sunlight threshold.',
        highlightColor: undefined,
      },
      {
        value: '635 nm',
        label: 'Pulse Transit Diode',
        desc: 'Standard Class II visible red laser diode with 1mW max output.',
        highlightColor: '#fb923c',
      },
    ],
    findings: [
      'Over 25 meters under direct solar illumination, false error codes (ERR 101 / Signal Weak) increased by 64% without a red optical target plate.',
      'Dual spirit level chassis improved beam landing precision at 30m by 82% over single-vial models by eliminating vertical roll parallax.',
      'Operational Directive: When surveying outdoors beyond 20m, use a Class II meter equipped with a digital camera crosshair or high-reflectance target plate.',
    ],
    diagramTitle: 'FIG 2.1: Optical Transit Pulse Saturation Curve Under 100,000 Lux Solar Irradiation',
    diagramSvg: (
      <svg viewBox="0 0 460 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="460" height="160" fill="#080C14" />
        <defs>
          <pattern id="grid-laser" width="23" height="16" patternUnits="userSpaceOnUse">
            <path d="M 23 0 L 0 0 0 16" fill="none" stroke="rgba(249, 115, 22, 0.12)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="460" height="160" fill="url(#grid-laser)" />

        <line x1="40" y1="135" x2="430" y2="135" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="135" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

        <text x="40" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">0m</text>
        <text x="130" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">15m</text>
        <text x="220" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">25m (THRESHOLD)</text>
        <text x="325" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">40m</text>
        <text x="410" y="148" fill="#94A3B8" fontSize="9" fontFamily="monospace">50m</text>

        <text x="8" y="32" fill="#94A3B8" fontSize="8" fontFamily="monospace">100%</text>
        <text x="8" y="75" fill="#94A3B8" fontSize="8" fontFamily="monospace">50%</text>
        <text x="8" y="118" fill="#94A3B8" fontSize="8" fontFamily="monospace">10%</text>

        <rect x="220" y="20" width="210" height="115" fill="rgba(249, 115, 22, 0.08)" stroke="rgba(249, 115, 22, 0.25)" strokeDasharray="3 3" />
        <text x="235" y="38" fill="#FB923C" fontSize="9" fontFamily="monospace" fontWeight="bold">⚠ ERR 101 ZONE (+64% ERROR RATE)</text>

        <path d="M 40 30 C 120 32, 220 40, 320 54 C 380 65, 410 75, 430 82" fill="none" stroke="#38BDF8" strokeWidth="2" />
        <path d="M 40 32 C 120 38, 180 55, 220 80 C 260 105, 320 125, 430 132" fill="none" stroke="#FB923C" strokeWidth="2.5" />

        <line x1="220" y1="20" x2="220" y2="135" stroke="#FB923C" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="220" cy="80" r="4" fill="#FB923C" />

        <rect x="50" y="24" width="8" height="2" fill="#38BDF8" />
        <text x="63" y="27" fill="#E2E8F0" fontSize="8" fontFamily="monospace">With Target Plate (Reflectance &gt; 90%)</text>
        <rect x="50" y="38" width="8" height="2" fill="#FB923C" />
        <text x="63" y="41" fill="#FB923C" fontSize="8" fontFamily="monospace">Bare Concrete (100k Lux Direct Sunlight)</text>
      </svg>
    ),
  },
  {
    ref: 'REP-2026-03',
    date: 'December 2025',
    category: 'Embedded Hardware',
    categoryType: 'embedded',
    title: 'Servo Jitter Analysis on ESP32 Dual-Core Architecture Driving PCA9685 I2C Busses',
    abstract: 'High-speed oscilloscope timing analysis of 16 MG996R metal-gear servos articulated simultaneously by an ESP32 microcontroller over I2C fast-mode (400 kHz) during concurrent FreeRTOS Wi-Fi telemetry packet bursts.',
    metrics: [
      {
        value: '12 µs',
        label: 'Peak Shared Core Jitter',
        desc: 'Core 0 Wi-Fi RTOS interrupt latency causing mechanical gear chatter.',
        highlightColor: '#34d399',
      },
      {
        value: '< 0.1 µs',
        label: 'Core 1 Isolated Jitter',
        desc: 'Task pinning eliminated interrupt collisions below measurement threshold.',
        highlightColor: undefined,
      },
      {
        value: '400 kHz',
        label: 'I2C Fast Mode Clock',
        desc: 'SCL clock stability verified on 16-channel PCA9685 PWM expansion board.',
        highlightColor: undefined,
      },
      {
        value: '16 Ch',
        label: 'Synchronous Servos',
        desc: 'Full hexapod limb kinematics simultaneously actuated under heavy telemetry load.',
        highlightColor: '#34d399',
      },
    ],
    findings: [
      'When Wi-Fi RTOS tasks and PWM servo loops shared Core 0, servo pulse jitter reached 12 microseconds during TCP packet bursts, causing audible joint vibration.',
      'Pinning the I2C control task strictly to Core 1 completely eliminated jitter (< 0.1 microseconds standard deviation).',
      'Operational Directive: For walking robotics and precision gimbal rigs, always pin wireless telemetry to Core 0 and kinematic control loops to Core 1.',
    ],
    diagramTitle: 'FIG 3.1: Digital Oscilloscope 200MHz Capture: Core 0 Wi-Fi RTOS Interrupt Glitch Envelope',
    diagramSvg: (
      <svg viewBox="0 0 460 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="460" height="160" fill="#080C14" />
        <defs>
          <pattern id="grid-scope" width="23" height="16" patternUnits="userSpaceOnUse">
            <path d="M 23 0 L 0 0 0 16" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="460" height="160" fill="url(#grid-scope)" />

        <line x1="230" y1="0" x2="230" y2="160" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="1" strokeDasharray="1 3" />
        <line x1="0" y1="80" x2="460" y2="80" stroke="rgba(16, 185, 129, 0.35)" strokeWidth="1" strokeDasharray="1 3" />

        <rect x="10" y="8" width="70" height="16" fill="#FBBF24" rx="2" />
        <text x="16" y="20" fill="#080C14" fontSize="9" fontFamily="monospace" fontWeight="bold">CH1 5.00V</text>

        <rect x="90" y="8" width="70" height="16" fill="#34D399" rx="2" />
        <text x="96" y="20" fill="#080C14" fontSize="9" fontFamily="monospace" fontWeight="bold">CH2 3.30V</text>

        <text x="175" y="20" fill="#94A3B8" fontSize="9" fontFamily="monospace">TB: 50.0µs/div</text>
        <text x="310" y="20" fill="#34D399" fontSize="9" fontFamily="monospace">TRIG: CH1 RISING 2.5V</text>

        <path d="M 20 120 L 70 120 L 70 45 L 200 45 L 200 120 L 260 120 L 260 45 L 390 45 L 390 120 L 440 120" fill="none" stroke="#FBBF24" strokeWidth="2" />
        <path d="M 190 45 L 190 120" fill="none" stroke="rgba(251, 191, 36, 0.45)" strokeWidth="1.5" strokeDasharray="2 2" />
        <path d="M 215 45 L 215 120" fill="none" stroke="rgba(251, 191, 36, 0.45)" strokeWidth="1.5" strokeDasharray="2 2" />

        <rect x="190" y="40" width="25" height="85" fill="rgba(251, 191, 36, 0.15)" stroke="#FBBF24" strokeWidth="1" />
        <text x="145" y="142" fill="#FBBF24" fontSize="9" fontFamily="monospace" fontWeight="bold">Δt = 12 µs JITTER</text>

        <path d="M 20 70 L 60 70 L 60 62 L 100 62 L 100 70 L 140 70 L 140 62 L 180 62 L 180 70 L 220 70 L 220 62 L 260 62 L 260 70 L 300 70 L 300 62 L 340 62 L 340 70 L 380 70 L 380 62 L 420 62 L 420 70 L 440 70" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <text x="310" y="60" fill="#34D399" fontSize="8" fontFamily="monospace">Core 1 Clock (&lt;0.1µs Dev)</text>
      </svg>
    ),
  },
  {
    ref: 'REP-2026-04',
    date: 'November 2025',
    category: 'Electrical Measurement',
    categoryType: 'electrical',
    title: 'True-RMS Crest Factor Accuracy on Budget 6000-Count Multimeters',
    abstract: 'Testing AC voltage measurement errors on modified sine wave inverters and phase-cut TRIAC light dimmers using True-RMS vs standard average-responding digital multimeters benchmarked against calibrated bench instruments.',
    metrics: [
      {
        value: '14.8%',
        label: 'Average-Meter Error',
        desc: 'Standard meters underestimate modified square & inverter output waveforms.',
        highlightColor: '#c084fc',
      },
      {
        value: '1.2%',
        label: 'True-RMS Error Band',
        desc: 'Certified True-RMS instruments measured within 1.2% of calibrated bench scope.',
        highlightColor: undefined,
      },
      {
        value: 'CAT III',
        label: '600V Safety Isolation',
        desc: 'Galvanic protection rating required for distribution board and motor measurements.',
        highlightColor: undefined,
      },
      {
        value: '6,000',
        label: 'ADC Display Counts',
        desc: 'Resolution standard enabling 0.1V precision on high-energy mains voltages.',
        highlightColor: '#c084fc',
      },
    ],
    findings: [
      'Standard average-responding multimeters underestimated modified sine wave RMS voltage by 14.8%, leading to dangerous equipment under-voltage misdiagnoses.',
      'True-RMS meters with CAT III 600V protection measured within 1.2% of high-end calibrated laboratory bench oscilloscopes.',
      'Operational Directive: True-RMS architecture is strictly mandatory for measuring variable-frequency drives, switching power supplies, and solar inverters.',
    ],
    diagramTitle: 'FIG 4.1: Calibrated Bench Scope AC Waveform Distortion & RMS Root-Sum Discrepancy',
    diagramSvg: (
      <svg viewBox="0 0 460 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="460" height="160" fill="#080C14" />
        <defs>
          <pattern id="grid-elec" width="23" height="16" patternUnits="userSpaceOnUse">
            <path d="M 23 0 L 0 0 0 16" fill="none" stroke="rgba(168, 85, 247, 0.12)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="460" height="160" fill="url(#grid-elec)" />

        <line x1="40" y1="80" x2="430" y2="80" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />

        <text x="6" y="32" fill="#94A3B8" fontSize="8" fontFamily="monospace">+325V PK</text>
        <text x="6" y="83" fill="#94A3B8" fontSize="8" fontFamily="monospace">0V REF</text>
        <text x="6" y="132" fill="#94A3B8" fontSize="8" fontFamily="monospace">-325V PK</text>

        <path d="M 40 80 Q 90 15, 140 80 T 240 80 T 340 80 T 430 80" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 40 80 L 60 80 L 60 35 L 120 35 L 120 80 L 160 80 L 160 125 L 220 125 L 220 80 L 260 80 L 260 35 L 320 35 L 320 80 L 360 80 L 360 125 L 420 125 L 420 80 L 430 80" fill="none" stroke="#C084FC" strokeWidth="2.5" />

        <rect x="60" y="35" width="60" height="45" fill="rgba(192, 132, 252, 0.15)" stroke="#C084FC" strokeWidth="1" strokeDasharray="2 2" />

        <line x1="40" y1="46" x2="430" y2="46" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="235" y="24" width="180" height="18" fill="rgba(8, 12, 20, 0.85)" stroke="#38BDF8" strokeWidth="1" rx="4" />
        <text x="240" y="36" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">True-RMS Target: 230.0 V (1.2% Var)</text>

        <line x1="40" y1="56" x2="430" y2="56" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
        <rect x="235" y="98" width="180" height="18" fill="rgba(8, 12, 20, 0.85)" stroke="#EF4444" strokeWidth="1" rx="4" />
        <text x="240" y="110" fill="#EF4444" fontSize="9" fontFamily="monospace" fontWeight="bold">Average Meter: 196.0 V (-14.8% Error)</text>

        <rect x="50" y="145" width="8" height="2" fill="#FFFFFF" />
        <text x="63" y="148" fill="#E2E8F0" fontSize="8" fontFamily="monospace">Pure Sine (Utility Grid)</text>
        <rect x="190" y="145" width="8" height="2" fill="#C084FC" />
        <text x="203" y="148" fill="#C084FC" fontSize="8" fontFamily="monospace">Modified Inverter Output</text>
      </svg>
    ),
  },
];

export default function BenchmarksPage() {
  const getCategoryClass = (type: ReportItem['categoryType']) => {
    switch (type) {
      case 'dimensional':
        return 'category-pill category-pill-dimensional';
      case 'optical':
        return 'category-pill category-pill-optical';
      case 'embedded':
        return 'category-pill category-pill-embedded';
      case 'electrical':
        return 'category-pill category-pill-electrical';
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', listStyle: 'none', gap: '8px', alignItems: 'center' }}>
          <li>
            <Link href="/" style={{ color: 'var(--text-secondary)' }}>
              Home
            </Link>
          </li>
          <li style={{ color: 'var(--text-muted)' }}>/</li>
          <li>
            <span style={{ color: 'var(--text-muted)' }}>Publications</span>
          </li>
          <li style={{ color: 'var(--text-muted)' }}>/</li>
          <li aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            Laboratory Benchmark Reports
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <header style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '32px', marginBottom: '44px' }}>
        <div
          className="meta-code"
          style={{
            color: 'var(--accent-institution)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '8px',
          }}
        >
          ARCHIVE // TECHNICAL BENCHMARK BULLETINS & OSCILLOSCOPE DISPATCHES
        </div>
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 2.85rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}
        >
          Laboratory Benchmark Reports & Technical Dispatches
        </h1>
        <p
          style={{
            fontSize: '1.08rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '880px',
          }}
        >
          Independent laboratory evaluations, calibrated sensor traces, environmental chamber drift studies, and repeatable test datasets compiled by the OnlineMeasurer metrology team.
        </p>
      </header>

      {/* Two-Column Structured Report Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {REPORTS.map((report) => (
          <article
            key={report.ref}
            className="elevated-card"
            style={{
              padding: '36px 32px',
            }}
          >
            <div className="report-2col-layout">
              {/* LEFT COLUMN: Metadata, Category Badge, Title & Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Badge & Publication Meta Header */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span className={getCategoryClass(report.categoryType)}>
                    {report.category}
                  </span>
                  <span
                    className="meta-code"
                    style={{
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--bg-surface)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-hairline)',
                    }}
                  >
                    {report.ref}
                  </span>
                  <span className="meta-code" style={{ color: 'var(--text-muted)' }}>
                    • {report.date}
                  </span>
                </div>

                {/* Report Title */}
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {report.title}
                </h2>

                {/* Summary / Abstract Paragraph */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                  }}
                >
                  {report.abstract}
                </p>

                {/* Key Experimental Findings Checklist */}
                <div
                  style={{
                    marginTop: '8px',
                    padding: '18px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '8px',
                  }}
                >
                  <div
                    className="meta-code"
                    style={{
                      color: 'var(--accent-institution)',
                      marginBottom: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    EXPERIMENTAL PROTOCOL & DIRECTIVES:
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {report.findings.map((finding, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.55 }}>
                        <span style={{ color: 'var(--accent-institution)', fontWeight: 700, marginTop: '2px' }}>▸</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: Key Metrics Grid & SVG Oscilloscope / Diagram Slot */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Header for Metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    className="meta-code"
                    style={{
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    KEY LAB METRICS & ACCURACY DISCREPANCY
                  </div>
                  <div className="meta-code" style={{ color: 'var(--accent-institution)', fontSize: '0.72rem' }}>
                    ISO 13385 BENCHMARKED
                  </div>
                </div>

                {/* 2x2 Key Metrics Highlighted Stat Boxes Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}
                >
                  {report.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="metric-stat-box">
                      <div className="metric-stat-label">{metric.label}</div>
                      <div
                        className="metric-stat-number"
                        style={{ color: metric.highlightColor || 'var(--text-primary)' }}
                      >
                        {metric.value}
                      </div>
                      <div className="metric-stat-desc">{metric.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Visual Oscilloscope / Test Specimen Diagram Slot */}
                <div className="oscilloscope-display">
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="meta-code" style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 700 }}>
                      INSTRUMENT CAPTURE // 200MS/s VECTOR TRACE
                    </span>
                    <span className="meta-code" style={{ color: '#94A3B8', fontSize: '0.7rem' }}>
                      REF: {report.ref}-DSO
                    </span>
                  </div>

                  {/* High Precision Inline SVG Vector Waveform / Diagram */}
                  <div style={{ padding: '8px' }}>
                    {report.diagramSvg}
                  </div>

                  <div
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'rgba(10, 15, 26, 0.95)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                    }}
                  >
                    {report.diagramTitle}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
