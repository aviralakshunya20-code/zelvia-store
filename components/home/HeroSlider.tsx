'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'THE VIRAL SUNSET COLLECTION',
    subtitle: 'FLAT 65% OFF + EXTRA 20% ON APP/WEB',
    tag: '🔥 NEW SEASON DROP',
    description: 'Chic Parisian Floral Dresses, Ruched Satin Fits & Breathable Georgette',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Shop Women’s Drop',
    ctaLink: '/category/women',
    badgeColor: 'bg-[#ff2459]',
  },
  {
    id: 2,
    title: 'STREET CYBERPUNK & OVERSIZED',
    subtitle: 'HEAVYWEIGHT TEES & CARGOS FROM ₹499',
    tag: '⚡ STREET CULTURE',
    description: '240 GSM Graphic Drops, Baggy Denim & Tactical 6-Pocket Cargos',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Explore Men Street',
    ctaLink: '/category/men',
    badgeColor: 'bg-indigo-600',
  },
  {
    id: 3,
    title: 'CRAZY MIDNIGHT STEALS: UNDER ₹499',
    subtitle: 'OVER 10,000+ STYLES ON CLEARANCE',
    tag: '🏷️ UP TO 80% OFF',
    description: 'Tops, Jewellery, Sunglasses, Bags & Matching Co-ords',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop',
    ctaText: 'Grab Steal Deals',
    ctaLink: '/category/sale',
    badgeColor: 'bg-amber-600',
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-black text-white aspect-[16/10] sm:aspect-[21/9] max-h-[580px]">
      {/* Background Images */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transition-transform duration-10000 ease-out`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={idx === 0}
            className="object-cover object-center brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center z-10">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2">
            <span
              className={`${slide.badgeColor} text-white text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-lg flex items-center gap-1`}
            >
              <Sparkles className="w-3 h-3" />
              {slide.tag}
            </span>
            <span className="text-[11px] font-bold text-gray-300 hidden sm:inline">
              🚚 Express Delivery across India
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase drop-shadow-md">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-base font-bold text-[#ff2459] uppercase tracking-wide">
            {slide.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 drop-shadow">
            {slide.description}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href={slide.ctaLink}
              className="bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xl flex items-center gap-2 transition-transform active:scale-95 group"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/category/sale"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full border border-white/30 transition-colors"
            >
              View Offers &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-colors z-20 hidden sm:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-colors z-20 hidden sm:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-[#ff2459]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
