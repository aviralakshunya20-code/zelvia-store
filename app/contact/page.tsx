'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FormState {
  name: string;
  org: string;
  email: string;
  topic: string;
  msg: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  msg?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    org: '',
    email: '',
    topic: 'errata',
    msg: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name should be at least 2 characters long.';
    }

    if (!data.email.trim()) {
      errs.email = 'Please provide an email address for correspondence.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g., alex@example.com).';
    }

    if (!data.msg.trim()) {
      errs.msg = 'Please describe your inquiry or data feedback.';
    } else if (data.msg.trim().length < 15) {
      errs.msg = 'Please enter at least 15 characters so we can understand your request.';
    }

    return errs;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleChange = (field: keyof FormState, val: string) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    if (touched[field]) {
      const validationErrors = validate(updated);
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, msg: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setSubmissionId(`OM-${Date.now().toString(36).toUpperCase()}`);
    }, 600);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      org: '',
      email: '',
      topic: 'errata',
      msg: '',
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.85rem' }}>
        <ol style={{ display: 'flex', listStyle: 'none', gap: '8px', alignItems: 'center' }}>
          <li>
            <Link href="/" style={{ color: 'var(--text-secondary)' }}>
              Home
            </Link>
          </li>
          <li style={{ color: 'var(--text-muted)' }}>/</li>
          <li aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            Contact & Technical Inquiries
          </li>
        </ol>
      </nav>

      {/* Accessible Header Section */}
      <header style={{ marginBottom: '40px', maxWidth: '840px' }}>
        <div
          className="meta-code"
          style={{
            fontWeight: 600,
            color: 'var(--accent-institution)',
            letterSpacing: '0.04em',
            marginBottom: '8px',
          }}
        >
          COMMUNICATIONS // METROLOGY SECTION
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4.5vw, 2.9rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}
        >
          Contact & Technical Inquiries
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px' }}>
          Have a question about our measurement methodologies, want to suggest an instrument for laboratory testing, or spotted a data discrepancy? Contact our team below.
        </p>
      </header>

      {/* Main Responsive Layout Grid (Transforms to single column under 768px) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start',
        }}
      >
        {/* Form Container Card - Elevated Card with Spatial Depth */}
        <section
          aria-labelledby="form-heading"
          className="elevated-card"
          style={{
            backgroundColor: 'rgba(22, 27, 34, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
            padding: '36px 32px',
          }}
        >
          <h2 id="form-heading" style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
            Send an Inquiry
          </h2>

          {submitted ? (
            /* Explicit Success State */
            <div
              role="alert"
              style={{
                backgroundColor: 'rgba(15, 20, 28, 0.7)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: '8px',
                padding: '28px',
                boxShadow: '0 8px 24px -6px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.4rem', color: 'var(--accent-institution)' }}>✓</span>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-institution)' }}>
                  TRANSMISSION CONFIRMED // {submissionId}
                </div>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                Thank you, {formData.name}!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                Your dispatch regarding <strong>{formData.topic === 'errata' ? 'Metrology Data Errata' : formData.topic === 'equipment' ? 'Equipment Benchmark Suggestion' : 'General Correspondence'}</strong> has been recorded. Our metrology team reviews verified errata and submissions within 3 to 5 business days.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="btn-outline"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                ← Submit Another Inquiry
              </button>
            </div>
          ) : (
            /* Accessible Form with Inline Validation and High-Contrast Accessibility */
            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Full Name / Name <span style={{ color: 'var(--accent-highlight)' }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g., Alex Sharma"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                  className="metrology-input"
                  style={{
                    borderColor: touched.name && errors.name ? '#ef4444' : undefined,
                  }}
                />
                {touched.name && errors.name && (
                  <p id="name-error" style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '6px', fontWeight: 500 }}>
                    ⚠ {errors.name}
                  </p>
                )}
              </div>

              {/* Institution / Company (Optional) */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="contact-org"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Institution / Company <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="contact-org"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g., Workshop, Studio, or Company (Optional)"
                  value={formData.org}
                  onChange={(e) => handleChange('org', e.target.value)}
                  className="metrology-input"
                />
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Email Address <span style={{ color: 'var(--accent-highlight)' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="e.g., alex@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                  className="metrology-input"
                  style={{
                    borderColor: touched.email && errors.email ? '#ef4444' : undefined,
                  }}
                />
                {touched.email && errors.email && (
                  <p id="email-error" style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '6px', fontWeight: 500 }}>
                    ⚠ {errors.email}
                  </p>
                )}
              </div>

              {/* Inquiry Topic */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="contact-topic"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={formData.topic}
                  onChange={(e) => handleChange('topic', e.target.value)}
                  className="metrology-input"
                >
                  <option value="errata">Metrology Data Errata or Correction</option>
                  <option value="equipment">Hardware Benchmark Recommendation</option>
                  <option value="press">Editorial Independence & Methodology Inquiry</option>
                  <option value="general">General Correspondence</option>
                </select>
              </div>

              {/* Message Details */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="contact-msg"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Message / Inquiry Details <span style={{ color: 'var(--accent-highlight)' }}>*</span>
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  required
                  placeholder="Describe your inquiry, specimen data, or technical question..."
                  value={formData.msg}
                  onChange={(e) => handleChange('msg', e.target.value)}
                  onBlur={() => handleBlur('msg')}
                  aria-invalid={touched.msg && !!errors.msg}
                  aria-describedby={touched.msg && errors.msg ? 'msg-error' : undefined}
                  className="metrology-input"
                  style={{
                    minHeight: '120px',
                    lineHeight: 1.6,
                    resize: 'vertical',
                    borderColor: touched.msg && errors.msg ? '#ef4444' : undefined,
                  }}
                />
                {touched.msg && errors.msg && (
                  <p id="msg-error" style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '6px', fontWeight: 500 }}>
                    ⚠ {errors.msg}
                  </p>
                )}
              </div>

              {/* High-Contrast Standout Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-institutional"
                style={{
                  width: '100%',
                  minHeight: '48px',
                  letterSpacing: '0.02em',
                }}
              >
                {isSubmitting ? 'Transmitting Dispatch...' : 'Submit to Dispatch Queue →'}
              </button>
            </form>
          )}
        </section>

        {/* Institutional Desk Info & Submission Guidelines */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Official Laboratory Desk Card - Elevated Card with Spatial Depth */}
          <div
            className="elevated-card"
            style={{
              backgroundColor: 'rgba(22, 27, 34, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
              padding: '28px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--accent-institution)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              OFFICIAL LABORATORY DESK
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
              Editorial & Metrology Section
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              OnlineMeasurer operates autonomously. We review reader-submitted hardware suggestions and prioritize instruments with high retail sales volume and reported dimensional variance.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                padding: '10px 14px',
                backgroundColor: 'rgba(15, 20, 28, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
              }}
            >
              EMAIL: editorial@onlinemeasurer.com
            </div>
          </div>

          {/* Submission Guidelines Card - Elevated Card with Spatial Depth */}
          <div
            className="elevated-card"
            style={{
              backgroundColor: 'rgba(22, 27, 34, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
              padding: '28px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--accent-highlight)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              EVALUATION POLICY
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
              Manufacturers & Vendors
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Please do <strong>not</strong> ship unsolicited evaluation hardware. To prevent cherry-picked golden sample distortion, we strictly test instruments acquired anonymously via standard retail channels (Amazon.in / Amazon.com).
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
