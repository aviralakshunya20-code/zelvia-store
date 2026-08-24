import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Contact Us', description: 'Get in touch with the OnlineMeasurer team. Questions, feedback, or partnership inquiries.', alternates: { canonical: 'https://onlinemeasurer.com/contact' } };

export default function ContactPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Contact Us</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>We would love to hear from you. Whether you have a question about the app, a suggestion for improvement, or a partnership inquiry, reach out to us.</p>
        <div className="card" style={{ padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>Send Us a Message</h2>
          <div className="flex flex-col gap-3">
            <div><label className="label">Name</label><input className="input" placeholder="Your name" /></div>
            <div><label className="label">Email</label><input className="input" type="email" placeholder="your@email.com" /></div>
            <div><label className="label">Subject</label><input className="input" placeholder="How can we help?" /></div>
            <div><label className="label">Message</label><textarea className="input" rows={5} placeholder="Your message..." style={{ resize: 'vertical' }} /></div>
            <button className="btn btn-primary">Send Message</button>
          </div>
        </div>
        <p>You can also reach us at: <strong style={{ color: 'var(--text)' }}>hello@onlinemeasurer.com</strong></p>
        <p style={{ marginTop: 8 }}>We typically respond within 24-48 hours.</p>
      </div>
    </main>
  );
}
