'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', org: '', email: '', topic: 'errata', msg: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div className="meta-code" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
        <Link href="/">HOME</Link> / INQUIRIES / CONTACT & SUBMISSIONS
      </div>

      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '24px', marginBottom: '40px' }}>
        <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
          COMMUNICATIONS // METROLOGY SECTION
        </div>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Technical Inquiries & Errata Submissions
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Contact the OnlineMeasurer laboratory desk for technical inquiries, data corrections, or metrological repeatability inquiries.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Form Column */}
        <div style={{ border: '1px solid var(--border-hairline)', padding: '28px', backgroundColor: 'var(--bg-canvas)' }}>
          {submitted ? (
            <div style={{ padding: '20px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-hairline)' }}>
              <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 700, marginBottom: '8px' }}>
                ACKNOWLEDGMENT: TRANSMISSION RECORDED
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Your submission has been catalogued in our laboratory dispatch queue. For verified technical errata or data discrepancies, our team will review the measurement logs within 5 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="meta-code" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  FULL NAME / RESEARCHER
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. A. Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label className="meta-code" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  INSTITUTION / COMPANY (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Physical Laboratory, Maker Workshop"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label className="meta-code" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@institution.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label className="meta-code" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  INQUIRY CLASSIFICATION
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                >
                  <option value="errata">Metrology Data Errata or Correction</option>
                  <option value="equipment">Hardware Recommendation / Submission</option>
                  <option value="press">Editorial Independence Inquiry</option>
                  <option value="general">General Laboratory Correspondence</option>
                </select>
              </div>

              <div>
                <label className="meta-code" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  STATEMENT / TECHNICAL DESCRIPTION
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide precise details, citing instrument ID or report reference if applicable."
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
                />
              </div>

              <button type="submit" className="btn-institutional" style={{ padding: '12px 24px', marginTop: '8px' }}>
                Submit to Dispatch Queue →
              </button>
            </form>
          )}
        </div>

        {/* Institutional Desk Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-surface)' }}>
            <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
              OFFICIAL LABORATORY DESK
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Editorial & Metrology Section</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
              OnlineMeasurer operates autonomously. We review reader-submitted hardware suggestions and prioritize instruments with high retail sales volume and reported dimensional variance.
            </p>
            <div className="meta-code" style={{ color: 'var(--text-muted)' }}>
              EMAIL: editorial@onlinemeasurer.com
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-hairline)', padding: '24px', backgroundColor: 'var(--bg-surface)' }}>
            <div className="meta-code" style={{ color: 'var(--accent-institution)', fontWeight: 600, marginBottom: '6px' }}>
              SUBMISSION GUIDELINES
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Manufacturers & Vendors</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Do NOT send unsolicited evaluation units. We strictly benchmark hardware acquired anonymously through consumer retail channels (Amazon.in / Amazon.com) to prevent cherry-picked golden sample distortion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
