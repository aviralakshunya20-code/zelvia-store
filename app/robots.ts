import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/delete-data', '/privacy'],
      },
    ],
    sitemap: 'https://onlinemeasurer.com/sitemap.xml',
  };
}
