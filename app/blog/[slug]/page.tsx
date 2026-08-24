import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';
import { AdSlot } from '@/components/ui/AdSlot';
import { Disclaimer } from '@/components/ui/Disclaimer';

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://onlinemeasurer.com/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  // Simple markdown-to-HTML conversion for headings, bold, tables, and lists
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) return <h2 key={i} style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{block.slice(3)}</h2>;
      if (block.startsWith('### ')) return <h3 key={i} style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 6 }}>{block.slice(4)}</h3>;
      if (block.startsWith('| ')) {
        const rows = block.split('\n').filter(r => r.trim() && !r.match(/^\|\s*-/));
        const headers = rows[0]?.split('|').filter(c => c.trim()).map(c => c.trim());
        const body = rows.slice(1).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
        return (
          <div key={i} style={{ overflowX: 'auto', margin: '12px 0' }}>
            <table className="data-table">
              <thead><tr>{headers?.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
              <tbody>{body.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      }
      if (block.match(/^\d+\.\s/)) {
        const items = block.split('\n').filter(l => l.trim());
        return <ol key={i} style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, color: 'var(--text-secondary)' }}>{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') }} />)}</ol>;
      }
      if (block.match(/^[-*]\s/)) {
        const items = block.split('\n').filter(l => l.trim());
        return <ul key={i} style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, color: 'var(--text-secondary)' }}>{items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') }} />)}</ul>;
      }
      if (block.startsWith('*') && block.endsWith('*') && !block.startsWith('**')) return <p key={i} style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: block.slice(1, -1).replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') }} />;
      return <p key={i} style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text)">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') }} />;
    });
  };

  return (
    <main className="container section animate-fadeIn">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: post.title, description: post.description,
        datePublished: post.date, author: { '@type': 'Organization', name: 'OnlineMeasurer' },
        publisher: { '@type': 'Organization', name: 'OnlineMeasurer', url: 'https://onlinemeasurer.com' },
      }) }} />

      <Link href="/blog" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>← Back to Blog</Link>

      <article style={{ marginTop: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h1>
        <div className="flex gap-3 mb-6" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>{post.readingTime} min read</span>
        </div>

        <div>{renderContent(post.content)}</div>
      </article>

      <AdSlot className="my-8" />
      <Disclaimer />

      <section className="mt-8">
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/calorie-calculator" className="btn btn-secondary btn-sm no-underline">Calorie Calculator</Link>
          <Link href="/indian-food-calories" className="btn btn-secondary btn-sm no-underline">Indian Food Calories</Link>
          <Link href="/" className="btn btn-primary btn-sm no-underline">Start Tracking →</Link>
        </div>
      </section>
    </main>
  );
}
