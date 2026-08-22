'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, showToast } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach((p) => {
      addToCart(p, p.colors[0]?.name || 'Default', p.sizes[0]?.size || 'M', 1);
    });
    showToast(`Moved ${wishlistedProducts.length} saved styles to Bag! 🎉`, 'success');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold">My Saved Wishlist</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight flex items-center gap-2">
              <span>Saved Items</span>
              <span className="text-sm font-bold text-[#ff2459] bg-rose-50 px-2.5 py-0.5 rounded-full">
                {wishlistedProducts.length} Items
              </span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Your favorite runway looks, trending streetwear, and wishlist drops.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <button
              onClick={handleMoveAllToBag}
              className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#ff2459]" />
              <span>Move All to Bag</span>
            </button>
          )}
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl p-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-[#ff2459] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Your wishlist is empty</h2>
            <p className="text-xs text-gray-500">
              Save items you love by clicking the heart icon on any product card while browsing.
            </p>
            <Link
              href="/category/women"
              className="inline-block bg-[#ff2459] hover:bg-[#e01648] text-white font-bold text-xs py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
            >
              Explore Trending Looks &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
