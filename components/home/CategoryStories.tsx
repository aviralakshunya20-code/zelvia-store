'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOP_STORY_CATEGORIES } from '@/data/categories';

export const CategoryStories = () => {
  return (
    <section className="py-6 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900">
            EXPLORE BY CATEGORY
          </h2>
          <span className="text-[11px] text-[#ff2459] font-bold">Swipe to see all &rarr;</span>
        </div>

        {/* Scrollable Story Row */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 pt-1">
          {TOP_STORY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="flex flex-col items-center gap-2 group shrink-0"
            >
              {/* Circular Avatar with Gradient Ring */}
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-400 via-[#ff2459] to-purple-600 group-hover:scale-105 transition-transform duration-300 shadow-md">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white p-0.5">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#ff2459] text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full whitespace-nowrap shadow-md uppercase">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-800 group-hover:text-[#ff2459] transition-colors text-center truncate max-w-[80px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
