import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Controls', description: 'Manage your privacy settings and data on OnlineMeasurer.' };

export default function PrivacyPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Privacy Controls</h1>
      <div className="card" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Your Data, Your Control</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          OnlineMeasurer stores all your food diary, body measurements, and preferences <strong>locally on your device</strong> using browser storage. No personal data is transmitted to our servers.
        </p>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
          <li>All food logs are stored in your browser&apos;s localStorage</li>
          <li>No account or login is required</li>
          <li>No personal health data is shared with third parties</li>
          <li>You can export or delete all your data at any time</li>
          <li>AI features use local mock implementations — no photos or text are sent externally</li>
        </ul>
      </div>
    </main>
  );
}
