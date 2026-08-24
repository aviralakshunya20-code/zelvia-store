import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About OnlineMeasurer', description: 'About OnlineMeasurer — AI-powered calorie and nutrition tracker designed for Indian food and daily health tracking.', alternates: { canonical: 'https://onlinemeasurer.com/about' } };

export default function AboutPage() {
  return (
    <main className="container section">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>About OnlineMeasurer</h1>
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>OnlineMeasurer is a free, AI-powered calorie and nutrition tracking tool designed specifically for Indian food and eating habits. We believe that tracking what you eat should be simple, quick, and judgement-free.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>Our Mission</h2>
        <p style={{ marginBottom: 16 }}>Most calorie trackers are built for Western diets. They do not understand that a katori of dal is a standard serving, or that adding ghee to roti changes the calorie count significantly. OnlineMeasurer is built from the ground up for Indian food — with a database of common Indian dishes, household portion sizes, and AI that understands Hinglish meal descriptions.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>What We Offer</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
          <li>AI-powered meal logging with photo, text, and voice input</li>
          <li>Indian food database with nutrition for 80+ common foods</li>
          <li>Free calculators: BMI, BMR, TDEE, macros, protein, water intake</li>
          <li>Food diary with daily, weekly, and monthly tracking</li>
          <li>Body measurement tracking</li>
          <li>Recipe builder with per-serving nutrition</li>
          <li>Original blog content on Indian nutrition and health</li>
        </ul>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>Privacy First</h2>
        <p style={{ marginBottom: 16 }}>All your data stays on your device. We do not require sign-up, we do not collect personal health data, and we do not sell your information. Your food diary is stored in your browser&apos;s local storage.</p>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>Disclaimer</h2>
        <p style={{ marginBottom: 16 }}>OnlineMeasurer provides estimates for informational and educational purposes only. Our calorie and nutrition data are approximations based on published sources (IFCT 2017, NIN Hyderabad). They are not a substitute for professional medical or dietary advice. Always consult a healthcare provider before making significant changes to your diet.</p>
        <div className="flex gap-2 mt-6">
          <Link href="/contact" className="btn btn-secondary no-underline">Contact Us</Link>
          <Link href="/" className="btn btn-primary no-underline">Start Tracking →</Link>
        </div>
      </div>
    </main>
  );
}
