'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Heart,
  Star,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Tag,
  Ruler,
  Share2,
  ChevronRight,
  MapPin,
  Flame,
  ThumbsUp,
  X,
} from 'lucide-react';
import { REVIEWS } from '@/data/reviews';
import { useStore } from '@/context/StoreContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToRecentlyViewed,
    showToast,
    applyCoupon,
  } = useStore();

  const product = products.find((p) => p.id === id) || products[0];
  const isSaved = isInWishlist(product ? product.id : '');

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product && product.colors && product.colors[0] ? product.colors[0].name : 'Default'
  );
  const [selectedSize, setSelectedSize] = useState(
    product && product.sizes && product.sizes[0] ? product.sizes[0].size : 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('110001');
  const [pincodeResult, setPincodeResult] = useState<{
    valid: boolean;
    city: string;
    deliveryDate: string;
    codAvailable: boolean;
  } | null>({
    valid: true,
    city: 'New Delhi & NCR',
    deliveryDate: 'Delivery in 2-3 Business Days',
    codAvailable: true,
  });
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, number>>({});

  useEffect(() => {
    if (product?.id) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id, addToRecentlyViewed]);

  // Update color/size if product changes
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors[0]) setSelectedColor(product.colors[0].name);
      if (product.sizes && product.sizes[0]) setSelectedSize(product.sizes[0].size);
      setSelectedImageIndex(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">Product not found</h1>
          <Link href="/category/women" className="inline-block bg-black text-white text-xs font-bold py-3 px-6 rounded-full">
            Back to Category
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult({
        valid: true,
        city: pincode.startsWith('11') ? 'Delhi & NCR' : pincode.startsWith('40') ? 'Mumbai & Maharashtra' : pincode.startsWith('56') ? 'Bengaluru & Karnataka' : 'Express Delivery Zone',
        deliveryDate: 'Delivery by ' + new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        codAvailable: true,
      });
      showToast('Pincode verified! Fast delivery available 🚚', 'success');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  const handleVoteHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
    showToast('Thanks for your feedback!', 'info');
  };

  const selectedSizeObj = product.sizes ? product.sizes.find((s) => s.size === selectedSize) : null;
  const isLowStock = selectedSizeObj && selectedSizeObj.stock <= 4;
  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-black shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/category/${product.gender}`} className="hover:text-black shrink-0 capitalize">{product.gender}</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/category/${product.subcategory}`} className="hover:text-black shrink-0 capitalize">{product.subcategory.replace(/-/g, ' ')}</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-gray-900 font-bold truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Multi-Angle Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar sm:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-gray-100 border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#ff2459] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumb ${idx}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Preview with Lightbox Zoom Trigger */}
            <div className="flex-1 relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-md group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                onClick={() => setIsZoomModalOpen(true)}
              />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.tag && (
                  <span className="bg-[#ff2459] text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {product.tag}
                  </span>
                )}
                <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-[#ff2459] shadow-lg transition-transform active:scale-90"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#ff2459] text-[#ff2459]' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:text-black shadow-lg transition-transform active:scale-90"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Click image to expand fullscreen
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Social proof */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span className="font-extrabold uppercase tracking-widest text-[#ff2459] bg-rose-50 px-2.5 py-0.5 rounded-full">
                  {product.brand}
                </span>
                <span className="text-gray-400">SKU: {product.id.toUpperCase()}</span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-black text-gray-950 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md text-xs font-bold text-gray-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} Reviews)</span>
                </div>
                {product.soldCountLast7Days && (
                  <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-rose-600" />
                    {product.soldCountLast7Days} sold in last 7 days
                  </span>
                )}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-1.5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-gray-950">₹{product.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                <span className="text-sm font-black text-[#ff2459]">
                  {product.discountPercentage}% OFF
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span>Inclusive of all GST &amp; taxes</span>
                <span>You save ₹{product.mrp - product.price}</span>
              </div>
            </div>

            {/* Promo Offers */}
            <div className="border border-rose-100 rounded-2xl p-3.5 bg-rose-50/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <Tag className="w-3.5 h-3.5 text-[#ff2459]" />
                <span>Applicable Offers &amp; Discounts</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                  <div>
                    <strong className="text-gray-900">WELCOME20</strong>: Extra 20% OFF on 1st order
                  </div>
                  <button
                    onClick={() => applyCoupon('WELCOME20')}
                    className="text-[11px] font-bold text-[#ff2459] hover:underline"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-200">
                  <div>
                    <strong className="text-gray-900">ZELVIA100</strong>: Flat ₹100 OFF on orders ₹799+
                  </div>
                  <button
                    onClick={() => applyCoupon('ZELVIA100')}
                    className="text-[11px] font-bold text-[#ff2459] hover:underline"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">
                    Color: <span className="text-gray-600 font-normal">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? 'ring-2 ring-offset-2 ring-[#ff2459] scale-110'
                          : 'border-gray-300 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">
                    Select Size: <span className="text-[#ff2459] font-black">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs font-bold text-gray-700 hover:text-[#ff2459] flex items-center gap-1 underline"
                  >
                    <Ruler className="w-3.5 h-3.5 text-[#ff2459]" />
                    <span>Size Guide &amp; Chart</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      disabled={s.stock === 0}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        selectedSize === s.size
                          ? 'bg-black border-black text-white shadow-md'
                          : s.stock === 0
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through'
                          : 'bg-white border-gray-300 text-gray-800 hover:border-black'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>

                {isLowStock && (
                  <p className="text-[11px] font-bold text-amber-600 animate-pulse">
                    ⚡ Hurry, only {selectedSizeObj?.stock} items left in size {selectedSize}!
                  </p>
                )}
              </div>
            )}

            {/* Action CTAs: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#ff2459]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Delivery & Pincode Checker */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <MapPin className="w-3.5 h-3.5 text-[#ff2459]" />
                <span>Delivery &amp; COD Availability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit Indian Pincode"
                  maxLength={6}
                  required
                  className="flex-1 bg-white text-xs px-3.5 py-2 rounded-xl border border-gray-300 outline-none focus:border-[#ff2459]"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeResult && (
                <div className="space-y-1.5 text-xs text-gray-700 pt-1">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Truck className="w-4 h-4 shrink-0" />
                    <span>{pincodeResult.deliveryDate} ({pincodeResult.city})</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cash on Delivery (COD) Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>7-Day Doorstep Exchange &amp; Return</span>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications & Details */}
            {product.details && (
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                  Product Details &amp; Fabric
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Fabric</span>
                    <span className="text-gray-900 font-bold">{product.details.fabric}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Fit</span>
                    <span className="text-gray-900 font-bold">{product.details.fit}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Occasion</span>
                    <span className="text-gray-900 font-bold">{product.details.occasion}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold block text-[11px]">Origin</span>
                    <span className="text-gray-900 font-bold">{product.details.countryOfOrigin}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-950">
                Verified Customer Reviews
              </h2>
              <p className="text-xs text-gray-500">
                Real photos and ratings from fashion shoppers across India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-2xl font-black text-gray-900">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                Based on {product.reviewCount} ratings
              </span>
            </div>
          </div>

          {/* Review List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-gray-50/70 border border-gray-100 rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-[#ff2459]">
                      {rev.userName[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{rev.userName}</p>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                        <Check className="w-3 h-3" />
                        <span>Verified Buyer • {rev.sizePurchased} / {rev.colorPurchased}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <h4 className="text-xs font-bold text-gray-900">{rev.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>

                {rev.images && rev.images.length > 0 && (
                  <div className="flex gap-2 pt-1">
                    {rev.images.map((rImg, idx) => (
                      <div key={idx} className="relative w-16 h-20 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={rImg}
                          alt="Buyer photo"
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-200/60">
                  <span>Fit: <strong className="text-gray-800">{rev.fitFeedback}</strong></span>
                  <button
                    onClick={() => handleVoteHelpful(rev.id)}
                    className="flex items-center gap-1 hover:text-black font-semibold cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulVotes + (helpfulReviews[rev.id] || 0)})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related / Complete The Look Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 mb-6">
              Complete The Look &amp; Similar Drops
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowSizeGuide(false)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-lg w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-extrabold uppercase text-gray-900 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#ff2459]" />
                <span>Size Guide (Body Measurements in CM)</span>
              </h3>
              <button onClick={() => setShowSizeGuide(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 font-extrabold">
                    <th className="p-2.5 rounded-l-lg">Size</th>
                    <th className="p-2.5">Bust / Chest</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5 rounded-r-lg">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="p-2.5 font-bold">XS (UK 6)</td><td className="p-2.5">80-84 cm</td><td className="p-2.5">60-64 cm</td><td className="p-2.5">86-90 cm</td></tr>
                  <tr><td className="p-2.5 font-bold">S (UK 8)</td><td className="p-2.5">84-88 cm</td><td className="p-2.5">64-68 cm</td><td className="p-2.5">90-94 cm</td></tr>
                  <tr><td className="p-2.5 font-bold">M (UK 10)</td><td className="p-2.5">88-92 cm</td><td className="p-2.5">68-72 cm</td><td className="p-2.5">94-98 cm</td></tr>
                  <tr><td className="p-2.5 font-bold">L (UK 12)</td><td className="p-2.5">92-96 cm</td><td className="p-2.5">72-76 cm</td><td className="p-2.5">98-102 cm</td></tr>
                  <tr><td className="p-2.5 font-bold">XL (UK 14)</td><td className="p-2.5">96-102 cm</td><td className="p-2.5">76-82 cm</td><td className="p-2.5">102-108 cm</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-500">
              💡 Tip: If you are between two sizes, we recommend ordering one size up for a relaxed fit.
            </p>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white z-20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-3xl w-full aspect-[3/4] max-h-[85vh]">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
