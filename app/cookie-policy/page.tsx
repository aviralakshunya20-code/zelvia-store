import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Cookie Policy', description: 'Cookie policy for OnlineMeasurer. How we use cookies and how to manage your preferences.', alternates: { canonical: 'https://onlinemeasurer.com/cookie-policy' } };

export default function CookiePolicyPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Cookie Policy</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text)' }}>Last updated:</strong> December 2024</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>What Are Cookies</h2>
        <p style={{ marginBottom: 16 }}>Cookies are small text files stored on your device by websites you visit. They are widely used to make websites work efficiently and provide information to site owners.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>How We Use Cookies</h2>
        <p style={{ marginBottom: 8 }}>OnlineMeasurer uses minimal cookies:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li><strong>Essential (localStorage):</strong> We use browser localStorage to save your food diary, preferences, body measurements, and settings. This data never leaves your device.</li>
          <li><strong>Preference cookies:</strong> To remember your theme preference (light/dark mode) and cookie consent choice.</li>
          <li><strong>Advertising (future):</strong> If we implement advertising, third-party advertising partners (such as Google AdSense) may place cookies to serve relevant advertisements. These cookies are governed by the respective third party&apos;s privacy policy.</li>
        </ul>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Managing Cookies</h2>
        <p style={{ marginBottom: 16 }}>You can control cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. Note that disabling localStorage will prevent the app from saving your food diary and settings.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Contact</h2>
        <p>For questions about our cookie policy, contact us at hello@onlinemeasurer.com.</p>
      </div>
    </main>
  );
}
