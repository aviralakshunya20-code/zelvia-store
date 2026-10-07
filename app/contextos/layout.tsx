import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ContextOS • Autonomous Institutional Memory for Fast-Growing Teams',
  description:
    'Passively capture the why behind critical decisions from Slack, PRs, and meetings. Eliminate the coordination drag that turns startup velocity into corporate slow motion.',
  openGraph: {
    title: 'ContextOS • Autonomous Institutional Memory Layer',
    description: 'Stop your team from re-solving problems you already solved.',
    url: 'https://onlinemeasurer.com/contextos',
  },
};

export default function ContextOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
