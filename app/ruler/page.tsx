'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface CalibrationTarget {
  id: 'card' | 'phone' | 'coin';
  title: string;
  subtitle: string;
  widthMm: number;
  heightMm?: number;
}

const CALIB_TARGETS: Record<'card' | 'phone' | 'coin', CalibrationTarget> = {
  card: {
    id: 'card',
    title: 'Standard Credit / Bank Card',
    subtitle: 'ISO/IEC 7810 ID-1 Standard (85.60 mm width)',
    widthMm: 85.60,
    heightMm: 53.98,
  },
  phone: {
    id: 'phone',
    title: 'Smartphone Screen Width',
    subtitle: 'iPhone 13/14/15 or Galaxy S23 Width (71.50 mm)',
    widthMm: 71.50,
    heightMm: 140.0,
  },
  coin: {
    id: 'coin',
    title: 'Standard Coin',
    subtitle: '₹5 Coin / US Quarter / 1 Euro Diameter (23.00 mm)',
    widthMm: 23.00,
    heightMm: 23.00,
  },
};

export default function RulerPage() {
  const [dpi, setDpi] = useState<number>(96);
  const [unit, setUnit] = useState<'mm' | 'in' | 'cm'>('mm');
  const [measureHistory, setMeasureHistory] = useState<Array<{ name: string; val: string }>>([]);
  const [specimenName, setSpecimenName] = useState('');
  const [specimenVal, setSpecimenVal] = useState('');
  
  // Calibration Modal State
  const [isCalibModalOpen, setIsCalibModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<'card' | 'phone' | 'coin'>('card');
  
  const rulerTicksRef = useRef<HTMLDivElement>(null);

  // Initialize DPI from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDpi = localStorage.getItem('om_calib_dpi');
      if (savedDpi) {
        setDpi(Number(savedDpi));
      }
    }
  }, []);

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

  const saveDpi = (newDpi: number) => {
    setDpi(newDpi);
    if (typeof window !== 'undefined') {
      localStorage.setItem('om_calib_dpi', String(newDpi));
    }
  };

  const addLog = () => {
    if (!specimenName || !specimenVal) return;
    setMeasureHistory([...measureHistory, { name: specimenName, val: `${specimenVal} ${unit}` }]);
    setSpecimenName('');
    setSpecimenVal('');
  };

  const target = CALIB_TARGETS[selectedTarget];
  const targetPxWidth = (target.widthMm * dpi) / 25.4;
  const targetPxHeight = target.heightMm ? (target.heightMm * dpi) / 25.4 : targetPxWidth;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 100px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '12px' }}>
        <ol style={{ listStyle: 'none', display: 'flex', gap: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <li>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              HOME
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>INSTRUMENTS</li>
          <li aria-hidden="true">/</li>
          <li style={{ color: 'var(--text-primary)' }} aria-current="page">
            ON-SCREEN CALIBRATED RULER
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 700, marginBottom: '8px' }}>
              Calibrated On-Screen Digital Ruler Suite
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '820px', fontSize: '0.95rem' }}>
              Direct optical display measurement utility. Designed for measuring physical prototypes, circuit boards, and hardware against your display.
            </p>
          </div>

          <button
            onClick={() => setIsCalibModalOpen(true)}
            className="btn-institutional"
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            ⚡ Calibrate Display ({dpi} DPI)
          </button>
        </div>
      </div>

      {/* Primary Calibration Card Banner */}
      <div style={{ border: '1px solid var(--border-hairline)', backgroundColor: 'var(--bg-surface)', padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
              CURRENT CALIBRATION: {dpi} DPI ({((25.4 / dpi)).toFixed(3)} MM/PIXEL)
            </div>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              Calibrated with {target.title} ({target.widthMm.toFixed(2)} mm)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Accurate measurements require screen scale matching. Hold an item against the screen to verify.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => saveDpi(Math.max(60, dpi - 1))}
              className="btn-outline"
              title="Decrease DPI by 1"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            >
              -1
            </button>
            <input
              type="range"
              min="72"
              max="240"
              value={dpi}
              onChange={(e) => saveDpi(Number(e.target.value))}
              aria-label="Display DPI Calibration Slider"
              style={{ width: '140px', accentColor: 'var(--accent-institution)' }}
            />
            <button
              onClick={() => saveDpi(Math.min(300, dpi + 1))}
              className="btn-outline"
              title="Increase DPI by 1"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            >
              +1
            </button>
            <button
              onClick={() => setIsCalibModalOpen(true)}
              className="btn-institutional"
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              Calibrate with Item...
            </button>
          </div>
        </div>
      </div>

      {/* Unit Switcher & Step Information */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setUnit('mm')}
            className={unit === 'mm' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            Millimeters (mm)
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={unit === 'cm' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            Centimeters (cm)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={unit === 'in' ? 'btn-institutional' : 'btn-outline'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            Inches (in)
          </button>
        </div>

        <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
          SCALE STEP: {unit === 'in' ? '1/16 Inch' : '1.0 Millimeter'} // ACCURACY: OPTICAL DISPLAY GRADE
        </div>
      </div>

      {/* Real Interactive Ruler Track */}
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

      {/* Specimen Log Sheet Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Specimen Measurement Entry</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Record component dimensions measured from the optical display scale.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Specimen Name (e.g. PCB Standoff, M3 Screw, Motor Flange)"
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
              <button onClick={addLog} className="btn-institutional" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                Add to Log
              </button>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-canvas)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', color: 'var(--text-primary)' }}>Active Measurement Record</h3>
          {measureHistory.length === 0 ? (
            <div className="meta-code" style={{ color: 'var(--text-muted)', paddingTop: '20px' }}>
              No specimens recorded in current session. Enter values to the left.
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

      {/* Metrology Disclaimer & Physical Tool Upgrade Card */}
      <div style={{ border: '1px solid var(--border-hairline)', padding: '28px', backgroundColor: 'var(--bg-surface)' }}>
        <div className="meta-code" style={{ color: 'var(--accent-highlight)', fontWeight: 600, marginBottom: '6px' }}>
          METROLOGICAL LIMITATION ADVISORY
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Need Precision Beyond Display Resolution?
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
          On-screen optical measurement is constrained by monitor pixel pitch. For precision engineering tolerances (&lt; ±0.05 mm), optical screens cannot replace hardened stainless steel physical calipers tested against Grade 0 ceramic gauge blocks.
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
          <Link href="/catalog" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-institution)' }}>
            Browse Full Hardware Directory →
          </Link>
        </div>
      </div>

      {/* ============================================================
          FRICTION-FREE CALIBRATION MODAL
          ============================================================ */}
      {isCalibModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-medium)',
              width: '100%',
              maxWidth: '680px',
              padding: '32px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div className="meta-code" style={{ color: 'var(--accent-institution)', marginBottom: '4px' }}>
                  STEP 1 // CHOOSE REFERENCE OBJECT
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Calibrate Screen to Physical Standard
                </h2>
              </div>
              <button
                onClick={() => setIsCalibModalOpen(false)}
                className="btn-outline"
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                ✕ Close
              </button>
            </div>

            {/* Reference Item Selector (Card / Phone / Coin) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setSelectedTarget('card')}
                className={selectedTarget === 'card' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '10px', flexDirection: 'column', gap: '4px', textAlign: 'center', height: 'auto' }}
              >
                <div style={{ fontSize: '1.2rem' }}>💳</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>Credit Card</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>85.60 mm</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTarget('phone')}
                className={selectedTarget === 'phone' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '10px', flexDirection: 'column', gap: '4px', textAlign: 'center', height: 'auto' }}
              >
                <div style={{ fontSize: '1.2rem' }}>📱</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>Smartphone</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>71.50 mm</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTarget('coin')}
                className={selectedTarget === 'coin' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '10px', flexDirection: 'column', gap: '4px', textAlign: 'center', height: 'auto' }}
              >
                <div style={{ fontSize: '1.2rem' }}>🪙</div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>Standard Coin</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>23.00 mm</div>
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Hold your physical <strong>{target.title}</strong> directly against the box below. Adjust the slider until the outline matches your physical object exactly.
            </p>

            {/* Interactive Physical Target Box */}
            <div
              style={{
                border: '1px solid var(--border-hairline)',
                backgroundColor: 'var(--bg-surface)',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                minHeight: '160px',
                overflowX: 'auto',
              }}
            >
              <div
                style={{
                  width: `${targetPxWidth}px`,
                  height: `${Math.min(targetPxHeight, 140)}px`,
                  border: '2px solid var(--accent-institution)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-canvas)',
                  textAlign: 'center',
                  padding: '8px',
                }}
              >
                {target.title}
                <br />
                {target.widthMm} mm
              </div>
            </div>

            {/* Slider & Presets */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="meta-code">FINE TUNE DPI ({dpi} DPI):</span>
                <span className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 700 }}>
                  {((25.4 / dpi)).toFixed(3)} mm/px
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => saveDpi(Math.max(60, dpi - 1))} className="btn-outline" style={{ padding: '6px 12px' }}>
                  -1
                </button>
                <input
                  type="range"
                  min="70"
                  max="240"
                  value={dpi}
                  onChange={(e) => saveDpi(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent-institution)' }}
                />
                <button onClick={() => saveDpi(Math.min(300, dpi + 1))} className="btn-outline" style={{ padding: '6px 12px' }}>
                  +1
                </button>
              </div>

              {/* Quick Screen Presets */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => saveDpi(96)} className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  Standard Laptop (96 DPI)
                </button>
                <button onClick={() => saveDpi(110)} className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  MacBook Display (110 DPI)
                </button>
                <button onClick={() => saveDpi(140)} className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  4K Monitor (140 DPI)
                </button>
                <button onClick={() => saveDpi(160)} className="btn-outline" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
                  Mobile Display (160 DPI)
                </button>
              </div>
            </div>

            {/* Apply & Save Button */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', borderTop: '1px solid var(--border-hairline)', paddingTop: '20px' }}>
              <button
                type="button"
                onClick={() => setIsCalibModalOpen(false)}
                className="btn-institutional"
                style={{ padding: '10px 24px' }}
              >
                Apply & Save Calibration ({dpi} DPI) ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          PERSISTENT QUICK-CALIBRATE FLOATING BAR (Sticky Bottom)
          ============================================================ */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-hairline)',
          padding: '10px 24px',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Active Calibration Readout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="meta-code" style={{ fontWeight: 700, color: 'var(--accent-institution)' }}>
              ⚡ RULER SCALE: {dpi} DPI
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => saveDpi(Math.max(60, dpi - 1))}
                className="btn-outline"
                title="Decrease DPI"
                style={{ padding: '2px 8px', fontSize: '0.75rem', minHeight: '26px' }}
              >
                -1
              </button>
              <button
                onClick={() => saveDpi(Math.min(300, dpi + 1))}
                className="btn-outline"
                title="Increase DPI"
                style={{ padding: '2px 8px', fontSize: '0.75rem', minHeight: '26px' }}
              >
                +1
              </button>
            </div>
          </div>

          {/* Quick Units and Calibration Modal Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setUnit('mm')}
                className={unit === 'mm' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '4px 10px', fontSize: '0.78rem', minHeight: '28px' }}
              >
                mm
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={unit === 'cm' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '4px 10px', fontSize: '0.78rem', minHeight: '28px' }}
              >
                cm
              </button>
              <button
                onClick={() => setUnit('in')}
                className={unit === 'in' ? 'btn-institutional' : 'btn-outline'}
                style={{ padding: '4px 10px', fontSize: '0.78rem', minHeight: '28px' }}
              >
                in
              </button>
            </div>

            <button
              onClick={() => setIsCalibModalOpen(true)}
              className="btn-institutional"
              style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700 }}
            >
              ⚡ Quick Calibrate (Card / Coin)...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
