import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Disclaimer', description: 'Health and nutrition disclaimer for OnlineMeasurer. Important information about the limitations of our estimates.', alternates: { canonical: 'https://onlinemeasurer.com/disclaimer' } };

export default function DisclaimerPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Disclaimer</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Health and Nutrition Disclaimer</h2>
        <p style={{ marginBottom: 16 }}>The information provided by OnlineMeasurer, including but not limited to calorie estimates, macro calculations, BMI, BMR, TDEE, and nutrition data for Indian foods, is for <strong>informational and educational purposes only</strong>.</p>
        <p style={{ marginBottom: 16 }}>This information is <strong>not a substitute</strong> for professional medical advice, diagnosis, or treatment. Always seek the advice of a physician, registered dietitian, or other qualified healthcare provider with any questions you may have regarding a medical condition or dietary change.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Accuracy of Data</h2>
        <p style={{ marginBottom: 16 }}>Nutrition values displayed on this website are estimates based on published sources including the Indian Food Composition Tables (IFCT 2017), National Institute of Nutrition (NIN) publications, and product labels. Actual values may vary based on:</p>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>Specific ingredients and brands used</li>
          <li>Cooking method and duration</li>
          <li>Oil, ghee, and butter quantities</li>
          <li>Exact portion sizes</li>
          <li>Regional recipe variations</li>
        </ul>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>AI-Based Estimates</h2>
        <p style={{ marginBottom: 16 }}>Our AI meal analysis features provide estimates that may not be accurate. All AI-generated nutrition data is clearly labelled as &quot;Estimated&quot; with a confidence indicator. Users should always review and correct AI estimates before saving them.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Calculator Results</h2>
        <p style={{ marginBottom: 16 }}>Results from our BMI, BMR, TDEE, calorie, macro, protein, water intake, and ideal weight calculators are based on generalised formulas and population averages. Individual results may vary significantly. These tools are meant for general awareness, not clinical decision-making.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '24px 0 8px' }}>Not for Medical Conditions</h2>
        <p>If you have diabetes, heart disease, kidney disease, eating disorders, or any other medical condition, do <strong>not</strong> rely on this tool for dietary management. Consult your healthcare provider.</p>
      </div>
    </main>
  );
}
