import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { AdSlot } from '@/components/ui/AdSlot';

export const metadata: Metadata = {
  title: 'Blog — Nutrition, Calories & Health Guides',
  description: 'Practical guides on Indian food calories, protein intake, calorie tracking, BMI, and nutrition. Original, helpful content for healthier eating.',
  alternates: { canonical: 'https://onlinemeasurer.com/blog' },
};

export default function BlogPage() {
  return (
    <main className="container section animate-fadeIn">
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Blog</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
        Practical guides on Indian food calories, nutrition, and healthy eating. No fluff, no guilt — just useful information.
      </p>

      <div className="flex flex-col gap-4">
        {BLOG_POSTS.map((post, i) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="card block no-underline" style={{ padding: 20, color: 'var(--text)', transition: 'box-shadow 0.2s' }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>{post.title}</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 8 }}>{post.description}</p>
              <div className="flex gap-3" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
            {i === 2 && <AdSlot />}
          </article>
        ))}
      </div>
    </main>
  );
}
