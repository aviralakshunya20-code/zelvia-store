'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, ShoppingBag, X, Heart, Star, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface LookItem {
  id: string;
  handle: string;
  location: string;
  image: string;
  product: Product;
  likes: number;
}

const LOOKS: LookItem[] = [
  {
    id: 'look-1',
    handle: '@ananya.vibe',
    location: 'Bandra, Mumbai',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[0],
    likes: 1420,
  },
  {
    id: 'look-2',
    handle: '@rhea_looks',
    location: 'Hauz Khas, Delhi',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[1],
    likes: 2890,
  },
  {
    id: 'look-3',
    handle: '@kabir_street',
    location: 'Indiranagar, Bengaluru',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[6],
    likes: 3100,
  },
  {
    id: 'look-4',
    handle: '@tanvi.glam',
    location: 'Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[3],
    likes: 1750,
  },
  {
    id: 'look-5',
    handle: '@priya.fashion',
    location: 'Park Street, Kolkata',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[5],
    likes: 980,
  },
  {
    id: 'look-6',
    handle: '@sneha.snaps',
    location: 'Koregaon Park, Pune',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    product: PRODUCTS[2],
    likes: 2150,
  },
];

export const LookbookSection = () => {
  const [activeLook, setActiveLook] = useState<LookItem | null>(null);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#ff2459] uppercase bg-rose-50 px-3 py-1 rounded-full">
            <Camera className="w-3.5 h-3.5" />
            <span>#ZELVIAGIRLS &amp; BOYS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight">
            STYLE INSPIRATION LOOKBOOK
          </h2>
          <p className="text-xs text-gray-500">
            Tag @zelvia.india on Instagram to get featured and win ₹5,000 shopping vouchers every week!
          </p>
        </div>

        {/* 6-Grid Lookbook */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              onClick={() => setActiveLook(look)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer shadow-xs hover:shadow-xl transition-all"
            >
              <Image
                src={look.image}
                alt={look.handle}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </span>
                </div>

                <div className="text-left">
                  <p className="text-[11px] font-bold truncate">{look.handle}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-300">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{look.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shoppable Modal Popup */}
        {activeLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setActiveLook(null)}
            />
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full z-10 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200">
              {/* Photo */}
              <div className="relative aspect-square md:aspect-auto h-64 md:h-full bg-gray-100">
                <Image
                  src={activeLook.image}
                  alt={activeLook.handle}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setActiveLook(null)}
                  className="md:hidden absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shoppable Product Card */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff2459] to-amber-400 p-0.5">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white uppercase">
                          {activeLook.handle.slice(1, 3)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{activeLook.handle}</p>
                        <p className="text-[10px] text-gray-400">{activeLook.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveLook(null)}
                      className="hidden md:block p-1 text-gray-400 hover:text-black"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="py-4 space-y-3">
                    <span className="text-[10px] font-bold text-[#ff2459] uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">
                      Featured in this look
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {activeLook.product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-gray-900">
                        ₹{activeLook.product.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{activeLook.product.mrp}
                      </span>
                      <span className="text-xs font-bold text-[#ff2459]">
                        {activeLook.product.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/product/${activeLook.product.id}`}
                    onClick={() => setActiveLook(null)}
                    className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Shop This Outfit &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
