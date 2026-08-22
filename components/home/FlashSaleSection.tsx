'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Clock, ArrowRight, Flame } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export const FlashSaleSection = () => {
  const { products } = useStore();
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 38,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  return (
    <section className="py-10 bg-gradient-to-b from-rose-50/50 via-white to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#ff2459] text-white shadow-md animate-bounce">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-950 uppercase tracking-tight">
                  ⚡ FLASH SALE
                </h2>
                <span className="text-[10px] bg-black text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  LIMITED TIME
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Exclusive lightning discounts • Up to 75% OFF • Fast selling out
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
              <Clock className="w-4 h-4 text-[#ff2459]" />
              <span>Ends in:</span>
            </div>
            <div className="flex items-center gap-1 text-white font-black text-xs">
              <span className="bg-black px-2.5 py-1.5 rounded-lg shadow-sm">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-black font-bold">:</span>
              <span className="bg-black px-2.5 py-1.5 rounded-lg shadow-sm">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-black font-bold">:</span>
              <span className="bg-[#ff2459] px-2.5 py-1.5 rounded-lg shadow-sm">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Deals CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/category/sale"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white hover:bg-rose-50 text-gray-900 border border-gray-300 hover:border-[#ff2459] px-6 py-3 rounded-full shadow-xs transition-all group"
          >
            <span>Explore All 250+ Flash Deals</span>
            <ArrowRight className="w-4 h-4 text-[#ff2459] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
