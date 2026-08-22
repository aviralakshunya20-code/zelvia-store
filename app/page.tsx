import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryStories } from '@/components/home/CategoryStories';
import { FlashSaleSection } from '@/components/home/FlashSaleSection';
import { TabbedProductGrid } from '@/components/home/TabbedProductGrid';
import { PromoBanners } from '@/components/home/PromoBanners';
import { LookbookSection } from '@/components/home/LookbookSection';
import { TrustBadges } from '@/components/home/TrustBadges';

export const metadata = {
  title: 'ZELVIA India | Fast Fashion, Indian Soul | Trending Outfits Under ₹999',
  description:
    'Shop the latest trending women and men fast-fashion: Floral dresses, Y2K cargos, oversized anime graphic tees, satin bodycon dresses, co-ords, and accessories with COD & free shipping.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner Slider */}
      <HeroSlider />

      {/* Circular Category Stories */}
      <CategoryStories />

      {/* Lightning Flash Sale with Countdown */}
      <FlashSaleSection />

      {/* Main Multi-Tab Product Grid (Trending, New In, Bestsellers, Under ₹699) */}
      <TabbedProductGrid />

      {/* 3-Card Promotional Banners */}
      <PromoBanners />

      {/* UGC Shoppable Lookbook */}
      <LookbookSection />

      {/* Trust Badges */}
      <TrustBadges />
    </main>
  );
}
