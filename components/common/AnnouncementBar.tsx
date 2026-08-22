'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Truck, ShieldCheck, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AnnouncementBar = () => {
  const { storeSettings } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const announcements = storeSettings?.announcements || [
    '⚡ MEGA MIDNIGHT DROP: Flat 70% OFF + Extra 20% on First Order with code WELCOME20',
    '🚚 FREE Express Shipping across India on all orders above ₹799!',
    '💸 Cash On Delivery (COD) Available on 25,000+ Indian Pincodes • 7-Day Easy Returns',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const currentText = announcements[currentIndex] || announcements[0];

  return (
    <aside aria-label="Special announcements and offers" className="bg-[#111111] text-white text-xs font-medium py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
          className="p-1 hover:text-[#ff2459] transition-colors hidden sm:block"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center flex items-center justify-center gap-2 overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#ff2459] shrink-0 animate-pulse" />
          <p className="truncate text-[11px] sm:text-xs">
            {currentText}
          </p>
          <Link
            href="/category/sale"
            className="text-[#ff2459] hover:underline font-semibold text-[11px] ml-1 shrink-0 hidden md:inline"
          >
            Shop Deals &rarr;
          </Link>
        </div>

        <div className="flex items-center gap-4 hidden sm:flex">
          <Link
            href="/admin"
            className="text-[11px] bg-white/10 hover:bg-[#ff2459] text-white font-bold px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1"
          >
            <Settings className="w-3 h-3" />
            <span>Store Admin</span>
          </Link>
          <span className="text-[11px] text-gray-400">🇮🇳 India | INR (₹)</span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
            className="p-1 hover:text-[#ff2459] transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
