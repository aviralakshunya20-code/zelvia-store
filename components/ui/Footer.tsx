import Link from 'next/link';

const TOOL_LINKS = [
  { href: '/bmi-calculator', label: 'BMI Calculator' },
  { href: '/bmr-calculator', label: 'BMR Calculator' },
  { href: '/tdee-calculator', label: 'TDEE Calculator' },
  { href: '/calorie-calculator', label: 'Calorie Calculator' },
  { href: '/macro-calculator', label: 'Macro Calculator' },
  { href: '/protein-calculator', label: 'Protein Calculator' },
  { href: '/water-intake-calculator', label: 'Water Calculator' },
  { href: '/indian-food-calories', label: 'Indian Food Calories' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tools</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TOOL_LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {COMPANY_LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {LEGAL_LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
            © {new Date().getFullYear()} OnlineMeasurer. All nutrition values are estimates, not medical advice.
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
            Made with 🇮🇳 for Indian food tracking
          </p>
        </div>
      </div>
    </footer>
  );
}
