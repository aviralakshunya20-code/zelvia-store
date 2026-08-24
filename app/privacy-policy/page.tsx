import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy policy for OnlineMeasurer. How we handle your data and protect your privacy.', alternates: { canonical: 'https://onlinemeasurer.com/privacy-policy' } };

export default function PrivacyPolicyPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Privacy Policy</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text)' }}>Last updated:</strong> December 2024</p>
        <p style={{ marginBottom: 16 }}>OnlineMeasurer (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website onlinemeasurer.com. This page informs you of our policies regarding the collection, use, and protection of personal information.</p>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Information We Collect</h2>
        <p style={{ marginBottom: 8 }}>OnlineMeasurer is designed with privacy as a priority. We minimise data collection:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li><strong>Local Data:</strong> Your food diary, body measurements, profile settings, and preferences are stored in your browser&apos;s localStorage on your device. This data never leaves your device.</li>
          <li><strong>Analytics:</strong> We may use privacy-friendly analytics to understand page views and usage patterns. No personally identifiable information is collected through analytics.</li>
          <li><strong>Contact Information:</strong> If you contact us via our contact form, we collect your name, email, and message content solely to respond to your inquiry.</li>
        </ul>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Data We Do NOT Collect</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>We do not require account registration or login</li>
          <li>We do not collect health data on our servers</li>
          <li>We do not track your diet or share it with third parties</li>
          <li>We do not use your food photos — AI photo analysis uses local mock processing</li>
          <li>We do not sell, trade, or transfer your personal information</li>
        </ul>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Cookies</h2>
        <p>We use essential cookies to save your preferences (such as dark mode setting). We do not use tracking cookies. If we implement advertising in the future, advertising partners may use cookies. You can control cookie preferences through your browser settings and our cookie consent banner.</p>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Third-Party Services</h2>
        <p>We may display advertisements through Google AdSense or similar advertising networks. These services may use cookies or web beacons to serve ads based on your browsing history. Please review Google&apos;s privacy policy for more information.</p>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Your Rights</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>You can export all your data at any time from the Profile page</li>
          <li>You can delete all your data at any time from the Delete Data page</li>
          <li>You can clear your browser&apos;s localStorage to remove all OnlineMeasurer data</li>
        </ul>

        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Contact</h2>
        <p>For privacy-related questions, contact us at hello@onlinemeasurer.com.</p>
      </div>
    </main>
  );
}
