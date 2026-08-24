import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://onlinemeasurer.com';

  const staticPages = [
    '', '/scan', '/diary', '/food-search', '/recipes', '/progress',
    '/body-measurements', '/settings', '/profile', '/privacy', '/delete-data', '/onboarding',
    '/calorie-calculator', '/bmi-calculator', '/bmr-calculator', '/tdee-calculator',
    '/macro-calculator', '/protein-calculator', '/water-intake-calculator',
    '/ideal-weight-calculator', '/calories-burned-calculator',
    '/indian-food-calories', '/healthy-recipes',
    '/blog', '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer', '/cookie-policy',
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : path.includes('calculator') || path === '/indian-food-calories' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.includes('calculator') || path === '/indian-food-calories' ? 0.8 : 0.6,
  }));

  // Blog posts
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
