import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Terms of Service', description: 'Terms of service for OnlineMeasurer. Rules governing your use of our website and tools.', alternates: { canonical: 'https://onlinemeasurer.com/terms' } };

export default function TermsPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Terms of Service</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 8 }}><strong style={{ color: 'var(--text)' }}>Last updated:</strong> December 2024</p>
        <p style={{ marginBottom: 16 }}>By using OnlineMeasurer, you agree to these terms. Please read them carefully.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>1. Use of Service</h2>
        <p>OnlineMeasurer provides free online tools for calorie tracking, nutrition estimation, and health calculators. You may use these tools for personal, non-commercial purposes.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>2. Not Medical Advice</h2>
        <p>All calorie estimates, nutrition data, calculator results, and health information provided by OnlineMeasurer are for informational and educational purposes only. They are not medical advice, diagnosis, or treatment recommendations. Always consult a qualified healthcare professional before making dietary changes, especially if you have health conditions, are pregnant, or are taking medication.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>3. Accuracy of Information</h2>
        <p>We strive to provide accurate nutrition data based on published sources (IFCT, NIN). However, actual nutrition values vary based on cooking methods, ingredient brands, portion sizes, and regional variations. Our AI-based estimates are approximations and should be reviewed by the user before use.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>4. User Data</h2>
        <p>Your data is stored locally on your device. We are not responsible for data loss due to browser cache clearing, device changes, or other local storage issues. We recommend periodically exporting your data.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>5. Intellectual Property</h2>
        <p>All content, design, code, and tools on OnlineMeasurer are our intellectual property. You may not copy, reproduce, or redistribute our content without written permission. Blog articles may be shared with proper attribution and a link to the original.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>6. Limitation of Liability</h2>
        <p>OnlineMeasurer is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from the use of our tools, calculators, or nutrition information. Use of this website is at your own risk.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>7. Changes</h2>
        <p>We may update these terms from time to time. Continued use of the website constitutes acceptance of the updated terms.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>8. Contact</h2>
        <p>For questions about these terms, contact us at hello@onlinemeasurer.com.</p>
      </div>
    </main>
  );
}
