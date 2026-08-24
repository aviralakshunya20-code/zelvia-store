import Link from 'next/link';
import { AdSlot } from '@/components/ui/AdSlot';
import { Disclaimer } from '@/components/ui/Disclaimer';
import type { CalculatorFAQ } from '@/lib/types';

export function CalculatorLayout({
  title, description, children, faqs, relatedTools,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  faqs: CalculatorFAQ[];
  relatedTools: { href: string; label: string }[];
}) {
  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>{description}</p>

      {children}

      <Disclaimer />

      <AdSlot label="Advertisement" className="my-6" />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="mb-8">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </section>
      )}

      {/* Related Tools */}
      <section className="mb-6">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          {relatedTools.map(t => (
            <Link key={t.href} href={t.href} className="btn btn-secondary btn-sm no-underline">{t.label}</Link>
          ))}
          <Link href="/" className="btn btn-primary btn-sm no-underline">Open Calorie Tracker →</Link>
        </div>
      </section>
    </main>
  );
}
