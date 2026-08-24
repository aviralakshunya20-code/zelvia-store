import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'BMI Calculator — Check Your Body Mass Index',
  description: 'Free online BMI calculator. Enter your height and weight to calculate your BMI and understand what it means for your health. Includes Indian BMI ranges.',
  alternates: { canonical: 'https://onlinemeasurer.com/bmi-calculator' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is BMI?', acceptedAnswer: { '@type': 'Answer', text: 'Body Mass Index (BMI) is a value calculated from your weight and height. It provides a rough estimate of whether your weight falls within a healthy range for your height.' } },
        { '@type': 'Question', name: 'What is a healthy BMI range?', acceptedAnswer: { '@type': 'Answer', text: 'A BMI between 18.5 and 24.9 is generally considered normal weight. For Indian populations, health risks may increase at lower BMI values (above 23).' } },
      ],
    }) }} />
    {children}
  </>;
}
