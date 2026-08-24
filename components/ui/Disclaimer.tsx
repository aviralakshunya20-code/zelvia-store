export function Disclaimer({ text }: { text?: string }) {
  return (
    <div className="disclaimer" role="note">
      <strong>Disclaimer:</strong> {text || 'All calorie and nutrition estimates are for informational and educational purposes only. They are not a substitute for professional medical or dietary advice. Consult a healthcare provider before making significant changes to your diet.'}
    </div>
  );
}
