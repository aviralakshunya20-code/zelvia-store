'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Tag, Gift, Flame } from 'lucide-react';

const PROMOS = [
  {
    id: 1,
    tag: 'COMBO STEAL',
    title: 'BUY 2 GET 1 FREE',
    subtitle: 'On all Crop Tops, Skirts & Accessories',
    code: 'B2G1FREE',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    link: '/category/women',
    bgGradient: 'from-purple-900/90 to-black/60',
    icon: Gift,
  },
  {
    id: 2,
    tag: 'FESTIVE & WEDDING',
    title: 'INDIAN FUSION EDIT',
    subtitle: 'Anarkali Sets, Foil Kurtis & Palazzos from ₹899',
    code: 'FESTIVE25',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    link: '/category/anarkali-sets',
    bgGradient: 'from-rose-950/90 to-black/60',
    icon: Flame,
  },
  {
    id: 3,
    tag: 'COLLEGE CORE',
    title: 'AIRPORT & TRAVEL FITS',
    subtitle: 'Oversized Hoodies, Y2K Cargos & Sneakers',
    code: 'TRAVEL20',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop',
    link: '/category/cargos',
    bgGradient: 'from-slate-950/90 to-black/60',
    icon: Tag,
  },
];

export const PromoBanners = () => {
  return (
    <section className="py-10 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {PROMOS.map((promo) => {
            const Icon = promo.icon;
            return (
              <Link
                key={promo.id}
                href={promo.link}
                className="group relative rounded-3xl overflow-hidden shadow-md aspect-[16/11] sm:aspect-[4/3] bg-neutral-900 block"
              >
                {/* Background Image */}
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
                />

                {/* Dark Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${promo.bgGradient}`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-[#ff2459]" />
                      {promo.tag}
                    </span>
                    <span className="text-[10px] bg-[#ff2459] text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      CODE: {promo.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight leading-tight group-hover:text-[#ff2459] transition-colors">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium line-clamp-2">
                      {promo.subtitle}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:text-[#ff2459] transition-colors">
                        Shop Deal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
