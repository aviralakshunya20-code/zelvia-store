'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MainCategory } from '@/types';

interface MegaMenuProps {
  category: MainCategory;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, onClose }) => {
  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 py-6 px-8 z-50 transition-all animate-in fade-in slide-in-from-top-1 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Category Columns */}
        <div className="col-span-8 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-1 border-b border-gray-100 flex items-center justify-between">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/category/${item.slug}`}
                      onClick={onClose}
                      className="group/item flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#ff2459] transition-colors py-0.5"
                    >
                      <span className="group-hover/item:translate-x-1 transition-transform">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded leading-tight tracking-wider ${
                            item.badge === 'HOT' || item.badge === 'VIRAL' || item.badge === 'CRAZY'
                              ? 'bg-rose-500 text-white'
                              : item.badge === 'STEAL' || item.badge === '70% OFF'
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Banner */}
        {category.featuredImage && (
          <div className="col-span-4 lg:col-span-3">
            <Link
              href={category.featuredImage.link}
              onClick={onClose}
              className="group block relative rounded-xl overflow-hidden shadow-md aspect-[3/4] bg-gray-100"
            >
              <Image
                src={category.featuredImage.src}
                alt={category.featuredImage.title}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff2459] bg-white/90 px-2 py-0.5 rounded w-fit mb-1.5">
                  FEATURED EDIT
                </span>
                <h4 className="text-base font-extrabold leading-tight mb-1">{category.featuredImage.title}</h4>
                <p className="text-xs text-gray-200 mb-3">{category.featuredImage.subtitle}</p>
                <span className="inline-flex items-center text-xs font-bold text-white group-hover:text-[#ff2459] transition-colors">
                  Explore Collection &rarr;
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
