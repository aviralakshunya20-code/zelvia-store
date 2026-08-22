'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Zap, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const isSaved = isInWishlist(product.id);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, activeColor.name, size, 1);
    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowQuickAdd(false);
    }, 1200);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100/80 hover:border-gray-300/80 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Image Container with Badges & Wishlist */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={isHovered && secondaryImage ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges Top-Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tag && (
            <span
              className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm tracking-wider ${
                product.tag === 'HOT' || product.tag === '70% OFF' || product.tag === 'FLASH DEAL'
                  ? 'bg-[#ff2459] text-white'
                  : product.tag === 'BESTSELLER'
                  ? 'bg-black text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {product.tag}
            </span>
          )}
          {product.discountPercentage >= 65 && !product.tag && (
            <span className="bg-[#ff2459] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button Top-Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-[#ff2459] shadow-md transition-all active:scale-90 z-10"
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#ff2459] text-[#ff2459]' : 'text-gray-700'
            }`}
          />
        </button>

        {/* Flash sale urgent claim bar if applicable */}
        {product.isFlashSale && product.flashSaleClaimedPercent && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-xs text-white px-2.5 py-1 z-10 flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Zap className="w-3 h-3 fill-amber-400" />
              {product.flashSaleClaimedPercent}% Claimed
            </span>
            <span className="text-gray-300 text-[9px]">Fast Selling</span>
          </div>
        )}

        {/* Quick Add Overlay */}
        <div
          className={`absolute inset-x-2 bottom-2 z-20 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          {showQuickAdd ? (
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-2 shadow-2xl border border-gray-100 animate-in fade-in">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center mb-1.5">
                Select Size
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={(e) => handleQuickAdd(s.size, e)}
                    disabled={s.stock === 0}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                      addedSize === s.size
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : s.stock === 0
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                        : 'bg-white hover:bg-black hover:text-white border-gray-200 text-gray-900 active:scale-95'
                    }`}
                  >
                    {addedSize === s.size ? <Check className="w-3 h-3 inline" /> : s.size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuickAdd(true);
              }}
              className="w-full bg-black/90 hover:bg-black text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-lg flex items-center justify-center gap-1.5 backdrop-blur-xs transition-all active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#ff2459]" />
              <span>Quick Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-extrabold uppercase tracking-wider text-gray-400 text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-gray-800 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="group-hover:text-[#ff2459] transition-colors">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-2">
          {/* Color Dots */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((col, idx) => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  title={col.name}
                  style={{ backgroundColor: col.hex }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIndex === idx
                      ? 'ring-2 ring-offset-1 ring-black scale-110'
                      : 'border-gray-300 hover:scale-110'
                  }`}
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1">+{product.colors.length}</span>
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-black text-gray-950">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
            <span className="text-xs font-black text-[#ff2459]">
              {product.discountPercentage}% OFF
            </span>
          </div>

          {/* COD Tag */}
          <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500">
            <span>⚡ COD Available</span>
            {product.soldCountLast7Days && (
              <span className="text-emerald-700 font-semibold">{product.soldCountLast7Days}+ sold</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
