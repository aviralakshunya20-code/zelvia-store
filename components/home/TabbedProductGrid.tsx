'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

const TABS = [
  { id: 'trending', label: '🔥 TRENDING NOW' },
  { id: 'new', label: '✨ NEW ARRIVALS' },
  { id: 'bestsellers', label: '🏆 BESTSELLERS' },
  { id: 'under699', label: '🏷️ UNDER ₹699' },
  { id: 'men', label: '⚡ MEN’S STREET' },
];

export const TabbedProductGrid = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('trending');

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'new':
        return products.filter((p) => p.tag === 'NEW' || p.createdAt >= '2026-08-10');
      case 'bestsellers':
        return products.filter((p) => p.tag === 'BESTSELLER' || p.reviewCount > 1500);
      case 'under699':
        return products.filter((p) => p.price <= 699);
      case 'men':
        return products.filter((p) => p.gender === 'men');
      case 'trending':
      default:
        return products;
    }
  };

  const displayedProducts = getFilteredProducts().slice(0, 8);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#ff2459] uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Fast-Fashion Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight">
              HOTTEST PICKS OF THE WEEK
            </h2>
          </div>

          {/* Tab Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-extrabold uppercase px-4 py-2.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/category/women"
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-xl transition-transform active:scale-95 group"
          >
            <span>View All {products.length}+ Trending Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
