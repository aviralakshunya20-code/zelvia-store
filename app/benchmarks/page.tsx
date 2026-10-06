'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type CategoryFilter = 'all' | 'dimensional' | 'optical' | 'embedded' | 'electrical';

interface SpecRow {
  parameter: string;
  measured: string;
  standard: string;
  status: string;
  statusType: 'pass' | 'fail' | 'warn' | 'certified';
  tooltip?: {
    term: string;
    def: string;
    ref?: string;
  };
}

interface StatBox {
  value: string;
  label: string;
  desc: string;
  highlightColor?: string;
  tooltip?: {
    term: string;
    def: string;
    ref?: string;
  };
}

interface GraphDataPoint {
  xLabel: string;
  xVal: number;
  y1: number;
  y2?: number;
  y3?: number;
  note?: string;
}

interface ReportItem {
  ref: string;
  date: string;
  category: string;
  categoryType: 'dimensional' | 'optical' | 'embedded' | 'electrical';
  title: string;
  abstractNode: React.ReactNode;
  specimenId: string;
  testRig: string;
  standardDoc: string;
  cadSvg: React.ReactNode;
  metrics: StatBox[];
  specSheet: SpecRow[];
  csvData: string;
  csvFileName: string;
  graph: {
    title: string;
    yAxisLabel: string;
    xAxisLabel: string;
    series1Name: string;
    series1Color: string;
    series2Name?: string;
    series2Color?: string;
    points: GraphDataPoint[];
  };
}

// Interactive Popover Tooltip for Technical Metrology Terms
function TechTooltip({
  term,
  definition,
  standard,
  children,
}: {
  term: string;
  definition: string;
  standard?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`${term}: ${definition}`}
    >
      <span
        className="tech-tooltip-term"
        style={{
          borderBottom: '1.5px dotted rgba(56, 189, 248, 0.75)',
          color: 'inherit',
          cursor: 'help',
        }}
      >
        {children || term}
      </span>

      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '250px',
            padding: '10px 14px',
            backgroundColor: '#0F172A',
            border: '1px solid rgba(56, 189, 248, 0.45)',
            borderRadius: '8px',
            boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.8), 0 0 16px rgba(56, 189, 248, 0.2)',
            zIndex: 100,
            pointerEvents: 'none',
            textAlign: 'left',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#38bdf8',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {term}
          </span>
          <span
            style={{
              display: 'block',
              fontSize: '0.78rem',
              color: '#E2E8F0',
              lineHeight: 1.45,
              marginBottom: standard ? '6px' : '0',
            }}
          >
            {definition}
          </span>
          {standard && (
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#94a3b8',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '4px',
              }}
            >
              REF: {standard}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

// Lightweight Interactive Result Curve Graph
function InteractiveGraph({ graph }: { graph: ReportItem['graph'] }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showSeries1, setShowSeries1] = useState(true);
  const [showSeries2, setShowSeries2] = useState(true);

  const pts = graph.points;
  const n = pts.length;

  const width = 460;
  const height = 160;
  const padLeft = 44;
  const padRight = 20;
  const padTop = 28;
  const padBottom = 30;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const allY = pts.flatMap((p) => [p.y1, p.y2 ?? p.y1]);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const ySpan = maxY - minY === 0 ? 1 : maxY - minY;

  const getX = (idx: number) => padLeft + (idx / (n - 1)) * plotW;
  const getY = (val: number) => padTop + plotH - ((val - minY) / ySpan) * plotH;

  const path1 = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.y1)}`)
    .join(' ');

  const path2 = pts[0].y2 !== undefined
    ? pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.y2!)}`).join(' ')
    : '';

  const activePoint = activeIdx !== null ? pts[activeIdx] : null;

  return (
    <div className="oscilloscope-display" style={{ position: 'relative' }}>
      {/* Top Header & Series Toggles */}
      <div
        style={{
          padding: '6px 10px',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        <span className="meta-code" style={{ color: 'var(--accent-institution)', fontSize: '0.7rem', fontWeight: 700 }}>
          {graph.title}
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setShowSeries1(!showSeries1)}
            style={{
              background: 'none',
              border: `1px solid ${showSeries1 ? graph.series1Color : 'rgba(255, 255, 255, 0.15)'}`,
              color: showSeries1 ? graph.series1Color : 'var(--text-muted)',
              borderRadius: '4px',
              padding: '1px 6px',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              opacity: showSeries1 ? 1 : 0.5,
            }}
          >
            ● {graph.series1Name}
          </button>
          {graph.series2Name && (
            <button
              type="button"
              onClick={() => setShowSeries2(!showSeries2)}
              style={{
                background: 'none',
                border: `1px solid ${showSeries2 ? graph.series2Color : 'rgba(255, 255, 255, 0.15)'}`,
                color: showSeries2 ? graph.series2Color : 'var(--text-muted)',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                opacity: showSeries2 ? 1 : 0.5,
              }}
            >
              ● {graph.series2Name}
            </button>
          )}
        </div>
      </div>

      {/* Live Readout HUD */}
      <div
        style={{
          padding: '4px 10px',
          backgroundColor: 'rgba(10, 15, 26, 0.9)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          minHeight: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {activePoint ? (
          <>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                X: {activePoint.xLabel}
              </span>
              {showSeries1 && (
                <span style={{ color: graph.series1Color, fontWeight: 600 }}>
                  Y1: {activePoint.y1}
                </span>
              )}
              {showSeries2 && activePoint.y2 !== undefined && (
                <span style={{ color: graph.series2Color, fontWeight: 600 }}>
                  Y2: {activePoint.y2}
                </span>
              )}
            </div>
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.68rem' }}>
              {activePoint.note}
            </span>
          </>
        ) : (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            Hover data points for live coordinate HUD
          </span>
        )}
      </div>

      {/* SVG Canvas */}
      <div style={{ padding: '4px 6px 2px' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          height="100%"
          style={{ display: 'block', cursor: 'crosshair' }}
          onMouseLeave={() => setActiveIdx(null)}
        >
          <rect width={width} height={height} fill="#080C14" />
          <defs>
            <pattern id={`grid-${graph.title.replace(/\s+/g, '')}`} width="23" height="16" patternUnits="userSpaceOnUse">
              <path d="M 23 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill={`url(#grid-${graph.title.replace(/\s+/g, '')})`} />

          <line x1={padLeft} y1={padTop + plotH} x2={width - padRight} y2={padTop + plotH} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
          <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotH} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />

          {pts.map((p, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 10}
              fill={activeIdx === i ? '#FFFFFF' : '#94A3B8'}
              fontSize="8.5"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight={activeIdx === i ? 'bold' : 'normal'}
            >
              {p.xLabel}
            </text>
          ))}

          <text x={padLeft - 4} y={padTop + 6} fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">
            {maxY.toFixed(1)}
          </text>
          <text x={padLeft - 4} y={padTop + plotH} fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="end">
            {minY.toFixed(1)}
          </text>

          {showSeries2 && path2 && (
            <path d={path2} fill="none" stroke={graph.series2Color || '#F59E0B'} strokeWidth="1.8" strokeDasharray="3 2" />
          )}
          {showSeries1 && (
            <path d={path1} fill="none" stroke={graph.series1Color} strokeWidth="2.2" />
          )}

          {activeIdx !== null && (
            <>
              <line
                x1={getX(activeIdx)}
                y1={padTop}
                x2={getX(activeIdx)}
                y2={padTop + plotH}
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {showSeries1 && (
                <circle
                  cx={getX(activeIdx)}
                  cy={getY(pts[activeIdx].y1)}
                  r="4.5"
                  fill={graph.series1Color}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              )}
              {showSeries2 && pts[activeIdx].y2 !== undefined && (
                <circle
                  cx={getX(activeIdx)}
                  cy={getY(pts[activeIdx].y2!)}
                  r="4.5"
                  fill={graph.series2Color || '#F59E0B'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              )}
            </>
          )}

          {pts.map((_, i) => {
            const x = getX(i);
            const stepW = plotW / (n - 1);
            return (
              <rect
                key={i}
                x={x - stepW / 2}
                y={padTop}
                width={stepW}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setActiveIdx(i)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

const REPORTS: ReportItem[] = [
  {
    ref: 'REP-2026-01',
    date: 'February 2026',
    category: 'Dimensional Metrology',
    categoryType: 'dimensional',
    title: 'Thermal Expansion Drift in Budget Stainless Steel Calipers (15°C to 35°C)',
    specimenId: 'OM-CAL-4Cr13-SS',
    testRig: 'OM-ENV-CHAMBER-2A',
    standardDoc: 'ISO 13385-1:2019',
    abstractNode: (
      <span>
        Evaluation of 5 commercially popular sub-₹1,500 stainless steel digital calipers subjected to controlled thermal cycling inside an environmental test chamber. Focus on{' '}
        <TechTooltip
          term="Thermal Drift"
          definition="Dimensional expansion or contraction of measuring jaws caused by fluctuations in room temperature."
          standard="11.2 × 10⁻⁶ /°C"
        />{' '}
        scale coefficient linearity and jaw parallelism against{' '}
        <TechTooltip
          term="ISO 13385-1"
          definition="International standard specifying dimensional characteristics and design requirements for digital calipers."
          standard="Grade A (±0.02mm)"
        />{' '}
        reference gauge blocks.
      </span>
    ),
    cadSvg: (
      <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="240" height="160" fill="#080C14" />
        <defs>
          <pattern id="cad-grid-1" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="240" height="160" fill="url(#cad-grid-1)" />

        {/* Blueprint Framing Reticles */}
        <line x1="8" y1="8" x2="24" y2="8" stroke="#38BDF8" strokeWidth="1" />
        <line x1="8" y1="8" x2="8" y2="24" stroke="#38BDF8" strokeWidth="1" />
        <line x1="232" y1="152" x2="216" y2="152" stroke="#38BDF8" strokeWidth="1" />
        <line x1="232" y1="152" x2="232" y2="136" stroke="#38BDF8" strokeWidth="1" />

        {/* Caliper Main Beam (4Cr13 Steel) */}
        <rect x="25" y="70" width="190" height="20" fill="rgba(30, 41, 59, 0.8)" stroke="#38BDF8" strokeWidth="1.2" />
        {/* Scale Graduations */}
        {[35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205].map((x, i) => (
          <line key={i} x1={x} y1="70" x2={x} y2={i % 5 === 0 ? "80" : "75"} stroke="#38BDF8" strokeWidth="0.8" opacity="0.8" />
        ))}

        {/* Fixed Measuring Jaw */}
        <path d="M 25 70 L 25 125 L 35 125 L 35 90 L 45 70 Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="1.4" />

        {/* Sliding Jaw Carriage & Digital Module */}
        <rect x="90" y="58" width="55" height="44" fill="rgba(15, 23, 42, 0.95)" stroke="#38BDF8" strokeWidth="1.4" rx="2" />
        <path d="M 90 90 L 90 125 L 100 125 L 100 102 Z" fill="rgba(56, 189, 248, 0.25)" stroke="#38BDF8" strokeWidth="1.4" />

        {/* Digital LCD Window */}
        <rect x="98" y="65" width="38" height="18" fill="#080C14" stroke="#38BDF8" strokeWidth="0.8" />
        <text x="117" y="78" fill="#38BDF8" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          25.00
        </text>

        {/* Tolerance Dimension Arrows */}
        <line x1="35" y1="134" x2="90" y2="134" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        <text x="62" y="145" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle">
          JAW GAP: 25mm
        </text>

        {/* CAD Crosshair Annotation */}
        <circle cx="30" cy="120" r="4" fill="none" stroke="#38BDF8" strokeWidth="1" />
        <line x1="22" y1="120" x2="38" y2="120" stroke="#38BDF8" strokeWidth="0.8" />
        <line x1="30" y1="112" x2="30" y2="128" stroke="#38BDF8" strokeWidth="0.8" />

        <text x="215" y="24" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" textAnchor="end">
          ISO 13385-1 REF
        </text>
        <text x="25" y="24" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
          CAD // SPECIMEN 01
        </text>
      </svg>
    ),
    metrics: [
      {
        value: '0.08 mm',
        label: 'Jaw Closure Hysteresis',
        desc: 'Composite carbon-fiber specimens under moisture and 20°C thermal delta.',
        highlightColor: '#38bdf8',
        tooltip: {
          term: 'Hysteresis',
          def: 'Measurement discrepancy when closing jaws from positive vs negative direction due to material elasticity.',
          ref: 'ISO 13385-1 (≤ 0.02mm)',
        },
      },
      {
        value: '11.2 ppm/°C',
        label: 'Thermal Expansion Coeff',
        desc: 'Hardened 4Cr13 steel matched theoretical limits within ±0.4%.',
        tooltip: {
          term: 'Thermal Coefficient',
          def: 'Linear material expansion rate per degree Celsius temperature rise.',
          ref: '4Cr13 Specimen',
        },
      },
      {
        value: '15°C → 35°C',
        label: 'Chamber Test Window',
        desc: 'Controlled thermal cycling simulating non-climate-controlled workshops.',
      },
      {
        value: '±0.02 mm',
        label: 'Certified Reference Bar',
        desc: 'Benchmarked against calibrated Grade 0 ceramic gauge blocks.',
        highlightColor: '#38bdf8',
      },
    ],
    specSheet: [
      {
        parameter: 'Thermal Expansion Coeff',
        measured: '11.2 × 10⁻⁶ /°C',
        standard: '11.0 – 11.5 ppm/°C (4Cr13)',
        status: 'PASS: IN SPEC',
        statusType: 'pass',
        tooltip: {
          term: 'Expansion Linearity',
          def: 'Predictable dimensional stretch rate across temperature gradients.',
        },
      },
      {
        parameter: 'Jaw Closure Hysteresis',
        measured: '0.080 mm Gap',
        standard: '≤ 0.020 mm (ISO 13385-1)',
        status: 'FAIL: JAW LAG',
        statusType: 'fail',
        tooltip: {
          term: 'Closure Hysteresis',
          def: 'Permanent or elastic lag in mechanical zero-position return.',
          ref: 'ISO 13385-1',
        },
      },
      {
        parameter: 'Jaw Parallelism Variance',
        measured: '0.014 mm',
        standard: '≤ 0.020 mm Grade A',
        status: 'PASS: OPTIMAL',
        statusType: 'pass',
      },
      {
        parameter: 'Environmental Resilience',
        measured: '15°C – 35°C Cycles',
        standard: 'DIN 862 Compliance',
        status: 'CERTIFIED: PASS',
        statusType: 'certified',
      },
    ],
    csvFileName: 'OnlineMeasurer_REP-2026-01_Caliper_Thermal_Drift.csv',
    csvData: `Sample_ID,Chamber_Temp_C,4Cr13_Steel_Exp_mm,Composite_Exp_mm,Hysteresis_Delta_mm,Status
1,15.0,-0.056,-0.040,0.016,BASELINE_COLD
2,20.0,-0.002,0.012,0.014,ISO_1_STANDARD
3,25.0,0.054,0.080,0.026,IN_SPEC
4,30.0,0.110,0.148,0.038,HEAT_SOAK
5,35.0,0.168,0.248,0.080,MAX_HYSTERESIS_LIMIT`,
    graph: {
      title: 'CHAMBER TEMP VS JAW EXPANSION (15°C TO 35°C)',
      xAxisLabel: 'Chamber Temperature (°C)',
      yAxisLabel: 'Jaw Displacement (mm)',
      series1Name: 'Composite Jaw Expansion',
      series1Color: '#38bdf8',
      series2Name: '4Cr13 Steel Linear Ref',
      series2Color: '#f59e0b',
      points: [
        { xLabel: '15°C', xVal: 15, y1: 0.010, y2: 0.005, note: 'Cold chamber start' },
        { xLabel: '20°C', xVal: 20, y1: 0.024, y2: 0.012, note: 'ISO 1 standard reference' },
        { xLabel: '25°C', xVal: 25, y1: 0.046, y2: 0.022, note: 'Workshop ambient mean' },
        { xLabel: '30°C', xVal: 30, y1: 0.068, y2: 0.034, note: 'Elevated summer baseline' },
        { xLabel: '35°C', xVal: 35, y1: 0.080, y2: 0.045, note: 'Max jaw closure hysteresis' },
      ],
    },
  },
  {
    ref: 'REP-2026-02',
    date: 'January 2026',
    category: 'Optical Distance',
    categoryType: 'optical',
    title: 'Class II 635nm Laser Distance Meters in High-Lux Ambient Daylight',
    specimenId: 'OM-OPT-DIST-635',
    testRig: 'OM-SOLAR-BENCH-100K',
    standardDoc: 'IEC 60825-1:2014',
    abstractNode: (
      <span>
        Benchmarking optical beam divergence and photodiode pulse-transit receiver saturation under 80,000 to{' '}
        <TechTooltip
          term="100,000 Lux"
          definition="Peak direct summer solar illuminance causing photodiode receiver optical saturation."
          standard="Direct Solar Lux"
        />{' '}
        outdoor solar illumination. Testing 50m and 100m{' '}
        <TechTooltip
          term="Class II Laser"
          definition="Low-power visible red laser diode (635nm, <1mW) safe for accidental eye contact."
          standard="IEC 60825-1"
        />{' '}
        distance meters across dark asphalt and drywall.
      </span>
    ),
    cadSvg: (
      <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="240" height="160" fill="#080C14" />
        <defs>
          <pattern id="cad-grid-2" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(249, 115, 22, 0.12)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="240" height="160" fill="url(#cad-grid-2)" />

        {/* Blueprint Framing */}
        <line x1="8" y1="8" x2="24" y2="8" stroke="#FB923C" strokeWidth="1" />
        <line x1="8" y1="8" x2="8" y2="24" stroke="#FB923C" strokeWidth="1" />
        <line x1="232" y1="152" x2="216" y2="152" stroke="#FB923C" strokeWidth="1" />
        <line x1="232" y1="152" x2="232" y2="136" stroke="#FB923C" strokeWidth="1" />

        {/* Laser Chassis */}
        <rect x="25" y="45" width="70" height="95" fill="rgba(30, 41, 59, 0.9)" stroke="#FB923C" strokeWidth="1.3" rx="4" />
        {/* LCD Display */}
        <rect x="35" y="55" width="50" height="30" fill="#080C14" stroke="#FB923C" strokeWidth="0.8" />
        <text x="60" y="74" fill="#FB923C" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          25.84 m
        </text>

        {/* Dual Spirit Bubble Vials */}
        <rect x="35" y="92" width="22" height="6" fill="rgba(16, 185, 129, 0.25)" stroke="#34D399" strokeWidth="0.8" rx="2" />
        <circle cx="46" cy="95" r="2" fill="#34D399" />
        <rect x="63" y="92" width="22" height="6" fill="rgba(16, 185, 129, 0.25)" stroke="#34D399" strokeWidth="0.8" rx="2" />
        <circle cx="74" cy="95" r="2" fill="#34D399" />

        {/* Laser Aperture */}
        <circle cx="95" cy="55" r="4" fill="#FB923C" />
        {/* Optical Pulse Cone to Target */}
        <path d="M 95 55 L 210 25 L 210 85 Z" fill="rgba(249, 115, 22, 0.12)" stroke="#FB923C" strokeWidth="1" strokeDasharray="3 2" />
        {/* Target Plate */}
        <rect x="210" y="20" width="8" height="70" fill="rgba(239, 68, 68, 0.4)" stroke="#EF4444" strokeWidth="1.2" />
        <line x1="214" y1="20" x2="214" y2="90" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />

        {/* Solar Radiation Photons */}
        <line x1="145" y1="10" x2="165" y2="40" stroke="#F59E0B" strokeWidth="1.2" />
        <line x1="165" y1="8" x2="185" y2="38" stroke="#F59E0B" strokeWidth="1.2" />
        <text x="175" y="18" fill="#F59E0B" fontSize="7" fontFamily="monospace">
          100k LUX
        </text>

        <text x="25" y="24" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
          CAD // SPECIMEN 02
        </text>
        <text x="215" y="145" fill="#FB923C" fontSize="7.5" fontFamily="monospace" textAnchor="end">
          635nm CLASS II
        </text>
      </svg>
    ),
    metrics: [
      {
        value: '64%',
        label: 'Sunlight Error Spike',
        desc: 'Receiver saturation ERR 101 code frequency past 25m without target plate.',
        highlightColor: '#fb923c',
        tooltip: {
          term: 'ERR 101 Saturation',
          def: 'Receiver photodiode overwhelmed by solar ambient photons exceeding signal threshold.',
          ref: 'Daylight Saturation',
        },
      },
      {
        value: '82%',
        label: 'Repeatability Gain',
        desc: 'Dual spirit level chassis compared to single-vial handheld benchmarks.',
        tooltip: {
          term: 'Dual Spirit Vials',
          def: 'Integrated 2-axis bubble levels preventing vertical and horizontal cosine tilt error.',
        },
      },
      {
        value: '100k Lux',
        label: 'Solar Lux Stress Limit',
        desc: 'Testing outdoor direct perpendicular summer sunlight threshold.',
      },
      {
        value: '635 nm',
        label: 'Pulse Transit Diode',
        desc: 'Standard Class II visible red laser diode with 1mW max output.',
        highlightColor: '#fb923c',
      },
    ],
    specSheet: [
      {
        parameter: 'Outdoor Error Rate (>25m)',
        measured: '64.0% Failure Rate',
        standard: '≤ 5.0% Baseline Allowance',
        status: 'OUT OF SPEC',
        statusType: 'fail',
        tooltip: {
          term: 'Daylight Error Rate',
          def: 'Failure rate due to photon noise over long transit distances.',
        },
      },
      {
        parameter: 'Reflective Target Plate Error',
        measured: '1.8% Failure Rate',
        standard: '≤ 5.0% Baseline Allowance',
        status: 'PASS: OPTIMAL',
        statusType: 'pass',
      },
      {
        parameter: 'Spirit Vial Levelling Precision',
        measured: '+82% Repeatability',
        standard: 'Dual-Axis Bubble Chassis',
        status: 'CERTIFIED: PASS',
        statusType: 'certified',
      },
      {
        parameter: 'Pulse Diode Stability',
        measured: '635 nm ± 5nm',
        standard: 'Class II 1mW Safety Grade',
        status: 'PASS: IN SPEC',
        statusType: 'pass',
      },
    ],
    csvFileName: 'OnlineMeasurer_REP-2026-02_Laser_Distance_Daylight_SNR.csv',
    csvData: `Distance_M,Solar_Lux,No_Target_Error_Pct,Target_Plate_Error_Pct,Pulse_SNR_dB,Status
5,92000,0.5,0.0,42.4,OPTIMAL
15,95000,12.0,0.2,28.6,ACCEPTABLE
25,98000,44.0,0.8,14.2,THRESHOLD_SATURATION
35,100000,64.0,1.4,7.8,HIGH_ERROR_ZONE
50,102000,88.0,2.1,3.1,RECEIVER_TIMEOUT`,
    graph: {
      title: 'DISTANCE VS RECEIVER ERROR RATE (0M TO 50M)',
      xAxisLabel: 'Measurement Range (Meters)',
      yAxisLabel: 'Error Probability (%)',
      series1Name: 'Direct Sunlight (No Target)',
      series1Color: '#fb923c',
      series2Name: 'With Red Target Plate',
      series2Color: '#38bdf8',
      points: [
        { xLabel: '5m', xVal: 5, y1: 0.5, y2: 0.0, note: 'Near-field clean reception' },
        { xLabel: '15m', xVal: 15, y1: 12.0, y2: 0.2, note: 'Solar background noise rising' },
        { xLabel: '25m', xVal: 25, y1: 44.0, y2: 0.8, note: 'ERR 101 weak signal knee' },
        { xLabel: '35m', xVal: 35, y1: 64.0, y2: 1.4, note: '64% error rate threshold' },
        { xLabel: '50m', xVal: 50, y1: 88.0, y2: 2.1, note: 'Severe photodiode saturation' },
      ],
    },
  },
  {
    ref: 'REP-2026-03',
    date: 'December 2025',
    category: 'Embedded Hardware',
    categoryType: 'embedded',
    title: 'Servo Jitter Analysis on ESP32 Dual-Core Architecture Driving PCA9685 I2C Busses',
    specimenId: 'OM-EMB-ESP32-WROOM',
    testRig: 'RIGOL-DS1054Z-DSO',
    standardDoc: 'FreeRTOS SMP v10.4',
    abstractNode: (
      <span>
        High-speed oscilloscope timing analysis of 16 MG996R metal-gear servos articulated simultaneously by an ESP32 microcontroller over{' '}
        <TechTooltip
          term="PCA9685 I2C"
          definition="16-channel, 12-bit PWM I2C bus driver providing independent servo pulse frequency control."
          standard="I2C Fast Mode 400kHz"
        />{' '}
        fast-mode during concurrent{' '}
        <TechTooltip
          term="FreeRTOS Jitter"
          definition="Interrupt preemption latency caused by high-priority Wi-Fi network stacks interrupting hardware control tasks."
          standard="Core 0 Coexistence"
        />{' '}
        telemetry packet bursts.
      </span>
    ),
    cadSvg: (
      <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="240" height="160" fill="#080C14" />
        <defs>
          <pattern id="cad-grid-3" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="240" height="160" fill="url(#cad-grid-3)" />

        {/* Blueprint Framing */}
        <line x1="8" y1="8" x2="24" y2="8" stroke="#34D399" strokeWidth="1" />
        <line x1="8" y1="8" x2="8" y2="24" stroke="#34D399" strokeWidth="1" />
        <line x1="232" y1="152" x2="216" y2="152" stroke="#34D399" strokeWidth="1" />
        <line x1="232" y1="152" x2="232" y2="136" stroke="#34D399" strokeWidth="1" />

        {/* ESP32 Module Outline */}
        <rect x="30" y="38" width="80" height="100" fill="rgba(15, 23, 42, 0.95)" stroke="#34D399" strokeWidth="1.3" rx="3" />
        {/* RF Shield Can */}
        <rect x="38" y="65" width="64" height="65" fill="rgba(30, 41, 59, 0.8)" stroke="#34D399" strokeWidth="0.8" />
        <text x="70" y="85" fill="#34D399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          CORE 0: RF
        </text>
        <text x="70" y="102" fill="#38BDF8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          CORE 1: PWM
        </text>

        {/* PCB Copper Antenna Trace */}
        <path d="M 40 45 L 40 58 L 50 58 L 50 45 L 60 45 L 60 58 L 70 58 L 70 45 L 80 45 L 80 58 L 90 58 L 90 45" fill="none" stroke="#F59E0B" strokeWidth="1.2" />

        {/* PCA9685 Board */}
        <rect x="145" y="45" width="75" height="90" fill="rgba(15, 23, 42, 0.95)" stroke="#A855F7" strokeWidth="1.2" rx="3" />
        <text x="182" y="60" fill="#A855F7" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          PCA9685 16CH
        </text>
        {/* Servo Header Pins */}
        {[70, 85, 100, 115].map((y, idx) => (
          <g key={idx}>
            <circle cx="155" cy={y} r="2.5" fill="#FBBF24" />
            <circle cx="165" cy={y} r="2.5" fill="#EF4444" />
            <circle cx="175" cy={y} r="2.5" fill="#3B82F6" />
            <line x1="175" y1={y} x2="210" y2={y} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          </g>
        ))}

        {/* I2C Traces Between ESP32 and PCA9685 */}
        <path d="M 110 80 L 145 80" stroke="#34D399" strokeWidth="1.4" />
        <text x="127" y="75" fill="#34D399" fontSize="7" fontFamily="monospace" textAnchor="middle">
          SDA
        </text>
        <path d="M 110 95 L 145 95" stroke="#34D399" strokeWidth="1.4" strokeDasharray="3 2" />
        <text x="127" y="106" fill="#34D399" fontSize="7" fontFamily="monospace" textAnchor="middle">
          SCL
        </text>

        <text x="25" y="24" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
          CAD // SPECIMEN 03
        </text>
        <text x="215" y="24" fill="#34D399" fontSize="7.5" fontFamily="monospace" textAnchor="end">
          400kHz I2C
        </text>
      </svg>
    ),
    metrics: [
      {
        value: '12 µs',
        label: 'Peak Shared Core Jitter',
        desc: 'Core 0 Wi-Fi RTOS interrupt latency causing mechanical gear chatter.',
        highlightColor: '#34d399',
        tooltip: {
          term: 'Interrupt Jitter',
          def: 'Variation in PWM pulse edge arrival time caused by higher priority CPU ISR execution.',
        },
      },
      {
        value: '< 0.1 µs',
        label: 'Core 1 Isolated Jitter',
        desc: 'Task pinning eliminated interrupt collisions below measurement threshold.',
        tooltip: {
          term: 'Task Pinning',
          def: 'Restricting kinematic tasks to a dedicated CPU core free from Wi-Fi stack interrupts.',
        },
      },
      {
        value: '400 kHz',
        label: 'I2C Fast Mode Clock',
        desc: 'SCL clock stability verified on 16-channel PCA9685 PWM expansion board.',
      },
      {
        value: '16 Ch',
        label: 'Synchronous Articulation',
        desc: 'Full hexapod limb kinematics simultaneously actuated under heavy telemetry load.',
        highlightColor: '#34d399',
      },
    ],
    specSheet: [
      {
        parameter: 'Core 0 Shared Jitter',
        measured: '12.0 µs Glitch Peak',
        standard: '≤ 1.0 µs Servo Threshold',
        status: 'FAIL: CHATTER',
        statusType: 'fail',
        tooltip: {
          term: 'Servo Chatter',
          def: 'Audible hum and positioning oscillation caused by erratic PWM timing.',
        },
      },
      {
        parameter: 'Core 1 Isolated Jitter',
        measured: '0.08 µs Standard Dev',
        standard: '≤ 0.5 µs Precision Robotics',
        status: 'PASS: ZERO JITTER',
        statusType: 'pass',
      },
      {
        parameter: 'I2C Fast Mode Bus Clock',
        measured: '400.2 kHz Active',
        standard: '400.0 kHz Nominal',
        status: 'PASS: IN SPEC',
        statusType: 'pass',
      },
      {
        parameter: '16-Ch Actuation Stability',
        measured: '100% Packet Delivery',
        standard: 'Zero Bus Lockout',
        status: 'CERTIFIED: PASS',
        statusType: 'certified',
      },
    ],
    csvFileName: 'OnlineMeasurer_REP-2026-03_ESP32_Servo_Jitter.csv',
    csvData: `Sample_Time_ms,Core_Task,WiFi_Activity,PWM_Period_us,Measured_Jitter_us,Glitch_Detected
100,Core_0_Shared,IDLE,20000.0,0.4,NO
200,Core_0_Shared,TCP_TX_BURST,20012.0,12.0,YES_CHATTER
300,Core_0_Shared,BEACON_RX,20008.0,8.0,YES_CHATTER
400,Core_1_Pinned,TCP_TX_BURST,20000.08,0.08,NO_STABLE
500,Core_1_Pinned,HEAVY_TRAFFIC,20000.06,0.06,NO_STABLE`,
    graph: {
      title: 'DURATION VS TIMING JITTER (MICROSECONDS)',
      xAxisLabel: 'Sample Window (ms)',
      yAxisLabel: 'PWM Pulse Jitter (µs)',
      series1Name: 'Core 0 Shared Wi-Fi Task',
      series1Color: '#34d399',
      series2Name: 'Core 1 Isolated Pin',
      series2Color: '#a855f7',
      points: [
        { xLabel: '100ms', xVal: 100, y1: 0.4, y2: 0.08, note: 'Idle baseline state' },
        { xLabel: '200ms', xVal: 200, y1: 12.0, y2: 0.08, note: 'TCP packet burst collision (12µs)' },
        { xLabel: '300ms', xVal: 300, y1: 8.0, y2: 0.07, note: 'Wi-Fi beacon beacon interrupt' },
        { xLabel: '400ms', xVal: 400, y1: 11.4, y2: 0.08, note: 'Concurrent HTTP socket traffic' },
        { xLabel: '500ms', xVal: 500, y1: 9.8, y2: 0.06, note: 'Telemetry burst recovery' },
      ],
    },
  },
  {
    ref: 'REP-2026-04',
    date: 'November 2025',
    category: 'Electrical Measurement',
    categoryType: 'electrical',
    title: 'True-RMS Crest Factor Accuracy on Budget 6000-Count Multimeters',
    specimenId: 'OM-ELEC-DMM-6000',
    testRig: 'KEYSIGHT-34461A-6.5DIGIT',
    standardDoc: 'IEC 61010-1:2020',
    abstractNode: (
      <span>
        Testing AC voltage measurement errors on modified sine wave inverters and phase-cut TRIAC light dimmers using{' '}
        <TechTooltip
          term="True-RMS"
          definition="Root Mean Square calculation integrating total real heating power across distorted non-sinusoidal waveforms."
          standard="IEC 61010"
        />{' '}
        vs standard average-responding digital multimeters benchmarked against calibrated bench instruments across high{' '}
        <TechTooltip
          term="Crest Factor"
          definition="Ratio of peak waveform amplitude to RMS value (CF = Vpk / Vrms). Standard meters fail when CF > 1.41."
          standard="CF 1.41 – 3.0"
        />{' '}
        waveforms.
      </span>
    ),
    cadSvg: (
      <svg viewBox="0 0 240 160" width="100%" height="100%" style={{ display: 'block' }}>
        <rect width="240" height="160" fill="#080C14" />
        <defs>
          <pattern id="cad-grid-4" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(168, 85, 247, 0.12)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="240" height="160" fill="url(#cad-grid-4)" />

        {/* Blueprint Framing */}
        <line x1="8" y1="8" x2="24" y2="8" stroke="#C084FC" strokeWidth="1" />
        <line x1="8" y1="8" x2="8" y2="24" stroke="#C084FC" strokeWidth="1" />
        <line x1="232" y1="152" x2="216" y2="152" stroke="#C084FC" strokeWidth="1" />
        <line x1="232" y1="152" x2="232" y2="136" stroke="#C084FC" strokeWidth="1" />

        {/* Multimeter Housing */}
        <rect x="70" y="32" width="100" height="120" fill="rgba(15, 23, 42, 0.95)" stroke="#C084FC" strokeWidth="1.4" rx="8" />
        {/* LCD Screen with True-RMS Annunciator */}
        <rect x="80" y="42" width="80" height="34" fill="#080C14" stroke="#C084FC" strokeWidth="0.8" rx="2" />
        <text x="86" y="52" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
          TRUE-RMS AUTO
        </text>
        <text x="120" y="68" fill="#FFFFFF" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          230.0 V~
        </text>

        {/* Rotary Range Selector Switch */}
        <circle cx="120" cy="100" r="16" fill="rgba(30, 41, 59, 0.9)" stroke="#C084FC" strokeWidth="1.2" />
        <line x1="120" y1="100" x2="120" y2="87" stroke="#F59E0B" strokeWidth="2.5" />
        <circle cx="120" cy="100" r="4" fill="#F59E0B" />

        {/* Range Dial Labels */}
        <text x="120" y="82" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
          V~
        </text>
        <text x="142" y="103" fill="#94A3B8" fontSize="6.5" fontFamily="monospace">
          Ω
        </text>
        <text x="98" y="103" fill="#94A3B8" fontSize="6.5" fontFamily="monospace">
          A~
        </text>

        {/* Input Banana Jacks */}
        <circle cx="95" cy="134" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.8" />
        <text x="95" y="146" fill="#EF4444" fontSize="6" fontFamily="monospace" textAnchor="middle">
          V/Ω
        </text>
        <circle cx="112" cy="134" r="5" fill="#080C14" stroke="#FFFFFF" strokeWidth="0.8" />
        <text x="112" y="146" fill="#94A3B8" fontSize="6" fontFamily="monospace" textAnchor="middle">
          COM
        </text>
        <circle cx="129" cy="134" r="5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="0.8" />
        <text x="129" y="146" fill="#3B82F6" fontSize="6" fontFamily="monospace" textAnchor="middle">
          mA
        </text>
        <circle cx="146" cy="134" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="0.8" />
        <text x="146" y="146" fill="#EF4444" fontSize="6" fontFamily="monospace" textAnchor="middle">
          10A
        </text>

        <text x="25" y="24" fill="#94A3B8" fontSize="7.5" fontFamily="monospace">
          CAD // SPECIMEN 04
        </text>
        <text x="215" y="24" fill="#C084FC" fontSize="7.5" fontFamily="monospace" textAnchor="end">
          CAT III 600V
        </text>
      </svg>
    ),
    metrics: [
      {
        value: '14.8%',
        label: 'Average-Meter Error',
        desc: 'Standard meters underestimate modified square & inverter output waveforms.',
        highlightColor: '#c084fc',
        tooltip: {
          term: 'Average Responding Error',
          def: 'Inability of diode-rectified meters to compute non-sinusoidal AC heating area.',
          ref: 'Modified Sine Error',
        },
      },
      {
        value: '1.2%',
        label: 'True-RMS Error Band',
        desc: 'Certified True-RMS instruments measured within 1.2% of calibrated bench scope.',
        tooltip: {
          term: 'True-RMS Integration',
          def: 'Analog computation circuit that solves the mathematical root-mean-square equation.',
        },
      },
      {
        value: 'CAT III',
        label: '600V Safety Isolation',
        desc: 'Galvanic protection rating required for distribution board and motor measurements.',
        tooltip: {
          term: 'CAT III 600V',
          def: 'Installation category tested to withstand 6,000V transient electrical spikes.',
          ref: 'IEC 61010-1',
        },
      },
      {
        value: '6,000',
        label: 'ADC Display Counts',
        desc: 'Resolution standard enabling 0.1V precision on high-energy mains voltages.',
        highlightColor: '#c084fc',
      },
    ],
    specSheet: [
      {
        parameter: 'Average-Responding Error',
        measured: '-14.8% Underestimate',
        standard: '≤ 1.5% Reference Error',
        status: 'FAIL: NON-RMS',
        statusType: 'fail',
        tooltip: {
          term: 'Harmonic Attenuation',
          def: 'Loss of measurement accuracy on non-sinusoidal waveforms without True-RMS conversion.',
        },
      },
      {
        parameter: 'True-RMS Bench Accuracy',
        measured: '±1.2% Variance',
        standard: '≤ 2.0% CAT III 600V Spec',
        status: 'PASS: CERTIFIED',
        statusType: 'pass',
      },
      {
        parameter: 'Galvanic Overvoltage Safety',
        measured: 'CAT III 600V Verified',
        standard: 'IEC 61010-1 Compliance',
        status: 'CERTIFIED: PASS',
        statusType: 'certified',
      },
      {
        parameter: 'Display Resolution Counts',
        measured: '6,000 Counts Delta-Sigma',
        standard: '≥ 4,000 Counts High Res',
        status: 'PASS: OPTIMAL',
        statusType: 'pass',
      },
    ],
    csvFileName: 'OnlineMeasurer_REP-2026-04_TrueRMS_CrestFactor_Accuracy.csv',
    csvData: `Waveform_Type,Crest_Factor,Bench_Reference_V,TrueRMS_Meter_V,Average_Meter_V,Avg_Meter_Error_Pct
Pure_Sine,1.414,230.0,229.8,229.4,-0.26
Modified_Inverter_Step,1.820,230.0,227.2,196.0,-14.78
Phase_Cut_TRIAC_90Deg,2.140,162.0,160.4,138.2,-14.69
High_Harmonic_SMPS,2.880,230.0,226.0,188.0,-18.26`,
    graph: {
      title: 'CREST FACTOR VS VOLTAGE ERROR (%)',
      xAxisLabel: 'Waveform Crest Factor (CF)',
      yAxisLabel: 'Voltage Measurement Error (%)',
      series1Name: 'Standard Average Meter',
      series1Color: '#c084fc',
      series2Name: 'True-RMS Certified DMM',
      series2Color: '#38bdf8',
      points: [
        { xLabel: '1.41 (Sine)', xVal: 1.41, y1: -0.3, y2: -0.1, note: 'Pure utility sine wave' },
        { xLabel: '1.82 (Inverter)', xVal: 1.82, y1: -14.8, y2: -1.2, note: 'Modified stepped square wave' },
        { xLabel: '2.14 (TRIAC)', xVal: 2.14, y1: -14.7, y2: -1.0, note: '90° phase-cut light dimmer' },
        { xLabel: '2.50 (VFD)', xVal: 2.50, y1: -16.5, y2: -1.4, note: 'PWM inverter harmonic motor output' },
        { xLabel: '2.88 (SMPS)', xVal: 2.88, y1: -18.3, y2: -1.7, note: 'High crest factor power supply' },
      ],
    },
  },
];

export default function BenchmarksPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const filterCounts = {
    all: REPORTS.length,
    dimensional: REPORTS.filter((r) => r.categoryType === 'dimensional').length,
    optical: REPORTS.filter((r) => r.categoryType === 'optical').length,
    embedded: REPORTS.filter((r) => r.categoryType === 'embedded').length,
    electrical: REPORTS.filter((r) => r.categoryType === 'electrical').length,
  };

  const filteredReports = activeCategory === 'all'
    ? REPORTS
    : REPORTS.filter((r) => r.categoryType === activeCategory);

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

  const getStatusBadgeStyle = (statusType: SpecRow['statusType']) => {
    switch (statusType) {
      case 'pass':
      case 'certified':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          color: '#34d399',
          border: '1px solid rgba(16, 185, 129, 0.4)',
        };
      case 'fail':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#f87171',
          border: '1px solid rgba(239, 68, 68, 0.4)',
        };
      case 'warn':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.4)',
        };
    }
  };

  const handleDownloadCsv = (report: ReportItem) => {
    const blob = new Blob([report.csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', report.csvFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded: ${report.csvFileName}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '48px 24px 96px' }}>
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
      <header style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '28px', marginBottom: '32px' }}>
        <div
          className="meta-code"
          style={{
            color: 'var(--accent-institution)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '8px',
          }}
        >
          HARDWARE TESTING LAB SUITE // BENCHMARK VERIFICATION SYSTEM
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
            maxWidth: '920px',
          }}
        >
          High-end hardware verification suite with vector CAD specimen blueprints, interactive result curve graphs, quick spec sheet tolerances, and verifiable raw CSV dispatches. Hover over dotted technical terms for instant ISO standard definitions.
        </p>
      </header>

      {/* Category Filter Tab Bar */}
      <div
        role="tablist"
        aria-label="Filter benchmark reports by discipline"
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '36px',
          padding: '8px',
          backgroundColor: 'rgba(30, 41, 59, 0.55)',
          borderRadius: '12px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: activeCategory === 'all' ? 'var(--accent-institution)' : 'transparent',
            color: activeCategory === 'all' ? '#090D16' : 'var(--text-secondary)',
            border: activeCategory === 'all' ? '1px solid var(--accent-institution)' : '1px solid transparent',
          }}
        >
          All Reports ({filterCounts.all})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'dimensional'}
          onClick={() => setActiveCategory('dimensional')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: activeCategory === 'dimensional' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            color: activeCategory === 'dimensional' ? '#38bdf8' : 'var(--text-secondary)',
            border: activeCategory === 'dimensional' ? '1px solid #38bdf8' : '1px solid transparent',
          }}
        >
          Dimensional ({filterCounts.dimensional})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'optical'}
          onClick={() => setActiveCategory('optical')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: activeCategory === 'optical' ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
            color: activeCategory === 'optical' ? '#fb923c' : 'var(--text-secondary)',
            border: activeCategory === 'optical' ? '1px solid #fb923c' : '1px solid transparent',
          }}
        >
          Optical ({filterCounts.optical})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'embedded'}
          onClick={() => setActiveCategory('embedded')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: activeCategory === 'embedded' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeCategory === 'embedded' ? '#34d399' : 'var(--text-secondary)',
            border: activeCategory === 'embedded' ? '1px solid #34d399' : '1px solid transparent',
          }}
        >
          Embedded Hardware ({filterCounts.embedded})
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'electrical'}
          onClick={() => setActiveCategory('electrical')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: activeCategory === 'electrical' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
            color: activeCategory === 'electrical' ? '#c084fc' : 'var(--text-secondary)',
            border: activeCategory === 'electrical' ? '1px solid #c084fc' : '1px solid transparent',
          }}
        >
          Electrical ({filterCounts.electrical})
        </button>
      </div>

      {/* Floating Download Toast */}
      {downloadNotice && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid #38bdf8',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(56, 189, 248, 0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ color: '#38bdf8' }}>✓</span>
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* 3-Column Laboratory Report Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {filteredReports.map((report) => (
          <article
            key={report.ref}
            className="lab-report-card"
            style={{
              backgroundColor: '#1E293B',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '12px',
              padding: '32px 28px',
            }}
          >
            <div className="report-3col-layout">
              {/* COLUMN 1: CAD / Blueprint Vector Thumbnail & Specimen Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="cad-thumbnail-frame">
                  <div
                    style={{
                      padding: '6px 10px',
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="meta-code" style={{ color: '#38bdf8', fontSize: '0.68rem', fontWeight: 700 }}>
                      CAD // SPECIMEN BLUEPRINT
                    </span>
                    <span className="meta-code" style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                      2D VECTOR
                    </span>
                  </div>

                  {/* High Tech Vector Illustration */}
                  <div style={{ padding: '6px' }}>
                    {report.cadSvg}
                  </div>

                  <div
                    style={{
                      padding: '8px 10px',
                      backgroundColor: 'rgba(8, 12, 20, 0.9)',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                    }}
                  >
                    <div>
                      ID: <span style={{ color: 'var(--text-primary)' }}>{report.specimenId}</span>
                    </div>
                    <div>
                      RIG: <span style={{ color: 'var(--accent-institution)' }}>{report.testRig}</span>
                    </div>
                    <div>
                      STD: <span style={{ color: '#F59E0B' }}>{report.standardDoc}</span>
                    </div>
                  </div>
                </div>

                {/* Lab Certification Stamp */}
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span style={{ color: '#34d399', fontWeight: 700 }}>✓ BENCH VERIFIED</span>
                  <span style={{ color: 'var(--text-muted)' }}>ISO GRADE 0</span>
                </div>
              </div>

              {/* COLUMN 2: Core Findings, Abstract, Spec Sheet Table, and Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Meta Header */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span className={getCategoryClass(report.categoryType)}>
                    {report.category}
                  </span>
                  <span
                    className="meta-code"
                    style={{
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(15, 23, 42, 0.7)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {report.ref}
                  </span>
                  <span className="meta-code" style={{ color: 'var(--text-muted)' }}>
                    • {report.date}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: '1.38rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {report.title}
                </h2>

                {/* Abstract with Interactive Technical Term Tooltips */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {report.abstractNode}
                </p>

                {/* Quick Spec Sheet Table */}
                <div
                  style={{
                    marginTop: '4px',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span className="meta-code" style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.72rem' }}>
                      QUICK SPEC SHEET // TOLERANCE MATRIX
                    </span>
                    <span className="meta-code" style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>
                      {report.ref}
                    </span>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', borderBottom: '1px solid var(--border-hairline)' }}>
                        <th style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Parameter
                        </th>
                        <th style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Lab Reading
                        </th>
                        <th style={{ padding: '7px 10px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.specSheet.map((spec, sIdx) => {
                        const badgeStyle = getStatusBadgeStyle(spec.statusType);
                        return (
                          <tr
                            key={sIdx}
                            style={{
                              borderBottom: sIdx === report.specSheet.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                              color: '#F8FAFC',
                            }}
                          >
                            <td style={{ padding: '8px 10px', fontWeight: 500, color: '#F8FAFC' }}>
                              {spec.tooltip ? (
                                <TechTooltip term={spec.tooltip.term} definition={spec.tooltip.def} standard={spec.tooltip.ref}>
                                  {spec.parameter}
                                </TechTooltip>
                              ) : (
                                spec.parameter
                              )}
                            </td>
                            <td style={{ padding: '8px 10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                              {spec.measured}
                            </td>
                            <td style={{ padding: '8px 10px' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '2px 7px',
                                  borderRadius: '4px',
                                  fontSize: '0.68rem',
                                  fontFamily: 'var(--font-mono)',
                                  fontWeight: 700,
                                  letterSpacing: '0.03em',
                                  whiteSpace: 'nowrap',
                                  ...badgeStyle,
                                }}
                              >
                                {spec.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => handleDownloadCsv(report)}
                    className="btn-institutional"
                    style={{
                      padding: '7px 14px',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span>⬇</span> Download Raw CSV ({report.ref})
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrintReport()}
                    className="btn-outline"
                    style={{
                      padding: '7px 14px',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span>📄</span> Export Technical PDF
                  </button>
                </div>
              </div>

              {/* COLUMN 3: Key Metric Stat Boxes & Interactive Result Curve */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="meta-code" style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                    KEY LAB STATS
                  </span>
                  <span className="meta-code" style={{ color: '#38bdf8', fontSize: '0.68rem' }}>
                    LIVE RESULT CURVE
                  </span>
                </div>

                {/* 2x2 Stat Boxes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {report.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="metric-stat-box" style={{ padding: '12px 14px' }}>
                      <div className="metric-stat-label">
                        {metric.tooltip ? (
                          <TechTooltip term={metric.tooltip.term} definition={metric.tooltip.def} standard={metric.tooltip.ref}>
                            {metric.label}
                          </TechTooltip>
                        ) : (
                          metric.label
                        )}
                      </div>
                      <div
                        className="metric-stat-number"
                        style={{ color: metric.highlightColor || 'var(--text-primary)', fontSize: '1.35rem' }}
                      >
                        {metric.value}
                      </div>
                      <div className="metric-stat-desc" style={{ fontSize: '0.78rem' }}>
                        {metric.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Result Curve with Crosshair & HUD */}
                <InteractiveGraph graph={report.graph} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
