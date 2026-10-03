'use client';

import React, { useState } from 'react';
import {
  HomeIcon,
  ElectronicsIcon,
  BabyIcon,
  FashionIcon,
  ShoesIcon,
  GroceryIcon,
  BeautyIcon,
  FragranceIcon,
  JewelleryIcon,
  SportsIcon,
} from './IllustratedIcons';

export const CATEGORIES = [
  { id: 'home', label: 'HOME', icon: HomeIcon, tag: 'Smart Living & Decor', desc: 'Custom webapps for home, interior & architecture businesses.' },
  { id: 'electronics', label: 'ELECTRONICS', icon: ElectronicsIcon, tag: 'High-Tech & Gadgets', desc: 'Fast catalog storefronts with instant specification filters.' },
  { id: 'baby', label: 'BABY', icon: BabyIcon, tag: 'Mother & Care', desc: 'Gentle, friendly, high-trust storefronts & subscription apps.' },
  { id: 'fashion', label: 'FASHION', icon: FashionIcon, tag: 'Luxury & Apparel', desc: 'High-converting fashion boutiques with instant size/color pickers.' },
  { id: 'shoes', label: 'SHOES', icon: ShoesIcon, tag: 'Footwear & Streetwear', desc: 'Sneaker drops, limited release engines, and real-time inventory.' },
  { id: 'grocery', label: 'GROCERY', icon: GroceryIcon, tag: 'Quick Commerce & Mart', desc: 'Sub-minute quick-delivery checkout and localized delivery maps.' },
  { id: 'beauty', label: 'BEAUTY', icon: BeautyIcon, tag: 'Cosmetics & Skincare', desc: 'Visual swatch pickers, interactive shade matchers, and reviews.' },
  { id: 'fragrance', label: 'FRAGRANCE', icon: FragranceIcon, tag: 'Perfume & Scents', desc: 'Luxury editorial layouts with rich interactive sensory storytelling.' },
  { id: 'jewellery', label: 'JEWELLERY', icon: JewelleryIcon, tag: 'Gold & Diamond', desc: 'Ultra-secure high-ticket transactions, custom ring builders.' },
  { id: 'sports', label: 'SPORTS', icon: SportsIcon, tag: 'Athletics & Gear', desc: 'Dynamic gear configurators and community event portals.' },
];

interface CategoryBarProps {
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function CategoryBar({ activeId, onSelect }: CategoryBarProps) {
  const [selected, setSelected] = useState<string>(activeId || 'all');
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const handleCardClick = (cat: typeof CATEGORIES[0]) => {
    const newId = selected === cat.id ? 'all' : cat.id;
    setSelected(newId);
    setActiveMessage(newId === 'all' ? null : `${cat.tag}: ${cat.desc}`);
    if (onSelect) onSelect(newId);
  };

  return (
    <div className="w-full my-8">
      {/* Scrollable container for mobile, flex center on desktop */}
      <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-4 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const IconComp = cat.icon;
          const isSelected = selected === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat)}
              className="flex flex-col items-center cursor-pointer shrink-0 group select-none transition-transform active:scale-95"
            >
              {/* Pink-bordered card matching the user's reference image */}
              <div
                className={`category-badge-card ${
                  isSelected
                    ? '!bg-rose-50 !border-rose-600 scale-105 ring-4 ring-rose-200 shadow-lg'
                    : ''
                }`}
              >
                <IconComp />
                {isSelected && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </div>

              {/* Bold label below card */}
              <span
                className={`category-badge-label ${
                  isSelected ? '!text-rose-600 font-black' : ''
                }`}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Entertaining Interactive Info Bar */}
      {activeMessage && (
        <div className="max-w-2xl mx-auto mt-3 px-5 py-2.5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center animate-fade-in">
          <p className="text-xs sm:text-sm font-bold text-rose-700">
            {activeMessage}
          </p>
        </div>
      )}
    </div>
  );
}
