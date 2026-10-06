'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function RulerPage() {
  const [dpi, setDpi] = useState<number>(96);
  const [unit, setUnit] = useState<'mm' | 'in' | 'cm'>('mm');
  const [measureHistory, setMeasureHistory] = useState<Array<{ name: string; val: string }>>([]);
  const [specimenName, setSpecimenName] = useState('');
  const [specimenVal, setSpecimenVal] = useState('');
  const rulerTicksRef = useRef<HTMLDivElement>(null);

  // Redraw ruler ticks whenever DPI or unit changes
  useEffect(() => {
    const container = rulerTicksRef.current;
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 900;
    const pxPerMm = dpi / 25.4;
    const step = unit === 'in' ? dpi / 16 : pxPerMm;
    const totalTicks = Math.floor(width / step);

    for (let i = 0; i <= totalTicks; i++) {
      const tick = document.createElement('div');
      const isMajor = unit === 'in' ? i % 16 === 0 : i % 10 === 0;
      const isMid = unit === 'in' ? i % 8 === 0 : i % 5 === 0;
      const height = isMajor ? '40px' : isMid ? '24px' : '12px';

      tick.style.position = 'absolute';
      tick.style.left = `${i * step}px`;
      tick.style.top = '0';
      tick.style.width = '1px';
      tick.style.height = height;
      tick.style.backgroundColor = isMajor ? 'var(--text-primary)' : 'var(--border-medium)';

      if (isMajor) {
        const lbl = document.createElement('span');
        const val = unit === 'in' ? i / 16 : unit === 'cm' ? i / 10 : i;
        lbl.textContent = String(val);
        lbl.style.position = 'absolute';
        lbl.style.left = `${i * step + 4}px`;
        lbl.style.top = '44px';
        lbl.style.fontSize = '11px';
        lbl.style.fontFamily = 'var(--font-mono)';
        lbl.style.fontWeight = '600';
        lbl.style.color = 'var(--text-primary)';
        container.appendChild(lbl);
      }
      container.appendChild(tick);
    }
  }, [dpi, unit]);

  const addLog = () => {
    if (!specimenName || !specimenVal) return;
    setMeasureHistory([...measureHistory, { name: specimenName, val: `${specimenVal} ${unit}` }]);
    setSpecimenName('');
    setSpecimenVal('');
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
        <Link href="/">HOME</Link> / INSTRUMENT / ON-SCREEN CALIBRATED RULER
      </div>

      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '20px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '8px' }}>
          Calibrated On-Screen Digital Ruler Suite
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', fontSize: '0.95rem' }}>
          An exact optical metrology utility designed for measuring physical engineering prototypes, electronic boards, and fasteners directly against your display. Calibrate using any standard ISO/IEC 7810 ID-1 card (85.60 mm width).
        </p>
      </div>

      {/* Calibration Target Banner */}
      <div style={{ border: '1px solid var(--border-hairline)', backgroundColor: 'var(--bg-surface)', padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>CALIBRATION STANDARD</div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>Standard Credit Card Width: 85.60 mm (3.370 in)</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Hold a bank card horizontally against the screen and adjust the slider until the target box matches the card length.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="meta-code">DPI:</span>
            <input
              type="range"
              min="72"
              max="240"
              value={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
              style={{ width: '160px', accentColor: 'var(--accent-institution)' }}
            />
            <span className="meta-code" style={{ fontWeight: 700, width: '60px' }}>{dpi} DPI</span>
          </div>
        </div>

        {/* Visual Calibration Target Box */}
        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-hairline)', paddingTop: '16px' }}>
          <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '6px' }}>
            PHYSICAL SCALE VERIFICATION (Match this box to your physical card):
          </div>
          <div
            style={{
              width: `${(85.6 * dpi) / 25.4}px`,
              height: `${(53.98 * dpi) / 25.4}px`,
              border: '2px solid var(--accent-institution)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-canvas)',
            }}
          >
            ISO/IEC 7810 CARD TARGET (85.60 mm × 53.98 mm)
          </div>
        </div>
      </div>

      {/* Ruler Controls & Unit Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setUnit('mm')}
            className={unit === 'mm' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            Millimeters (mm)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={unit === 'in' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            Inches (in)
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={unit === 'cm' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.82rem' }}
          >
            Centimeters (cm)
          </button>
        </div>

        <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
          STEP: {unit === 'in' ? '1/16 Inch' : '1.0 Millimeter'}
        </div>
      </div>

      {/* Interactive Ruler Canvas */}
      <div
        style={{
          border: '1px solid var(--border-hairline)',
          height: '110px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-canvas)',
          marginBottom: '40px',
        }}
      >
        <div ref={rulerTicksRef} style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Measurement Log Sheet */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '56px' }}>
        <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Specimen Log Entry</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Record component dimensions measured from the screen scale.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Specimen Name (e.g. PCB Standoff, M3 Screw)"
              value={specimenName}
              onChange={(e) => setSpecimenName(e.target.value)}
              style={{ padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-canvas)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder={`Measured Value (in ${unit})`}
                value={specimenVal}
                onChange={(e) => setSpecimenVal(e.target.value)}
                style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-canvas)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
              />
              <button onClick={addLog} className="btn-institutional" style={{ padding: '10px 20px' }}>
                Add to Log
              </button>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-canvas)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Active Measurement Record</h3>
          {measureHistory.length === 0 ? (
            <div className="meta-code" style={{ color: 'var(--text-muted)', paddingTop: '20px' }}>
              No specimens recorded in current session. Enter values above.
            </div>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {measureHistory.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '6px', fontSize: '0.88rem' }}>
                  <span>{item.name}</span>
                  <span className="meta-code" style={{ fontWeight: 600 }}>{item.val}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Metrology Disclaimer & Physical Instrument Upgrade */}
      <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-subtle)' }}>
        <div className="meta-code" style={{ color: 'var(--accent-highlight)', fontWeight: 600, marginBottom: '6px' }}>
          METROLOGY LIMITATION ADVISORY
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
          On-screen optical measurement is limited by display pixel density and optical parallax. For sub-millimeter manufacturing tolerances (&lt; ±0.5 mm), optical screens are insufficient. Use physical stainless steel calipers tested against gauge blocks.
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://www.amazon.in/s?k=Digital+Vernier+Caliper+Stainless+Steel+150mm&tag=aviraltech-20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amazon-verified"
          >
            View Lab-Tested ±0.02mm Digital Caliper on Amazon ↗
          </a>
          <Link href="/catalog" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-institution)' }}>
            View Full Tested Tools Directory →
          </Link>
        </div>
      </div>
    </div>
  );
}
