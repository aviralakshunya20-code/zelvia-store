'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { COUPONS } from '@/data/coupons';

export const CartDrawer = () => {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    cartMrpTotal,
    cartSubtotal,
    cartDiscount,
    couponDiscount,
    shippingFee,
    freeShippingThreshold,
    freeShippingProgress,
    cartFinalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponCodeInput;
    if (!code) return;
    const res = applyCoupon(code);
    if (res.success) {
      setCouponMessage({ text: res.message, error: false });
      setCouponCodeInput('');
    } else {
      setCouponMessage({ text: res.message, error: true });
    }
  };

  const amountNeededForFreeShip = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#ff2459]" />
            <h2 className="text-base font-extrabold tracking-tight uppercase">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-rose-50 border-b border-rose-100 p-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#ff2459]" />
              {amountNeededForFreeShip === 0
                ? '🎉 You unlocked FREE Express Delivery!'
                : `Add ₹${amountNeededForFreeShip} more for FREE Delivery`}
            </span>
            <span className="text-[#ff2459] font-black">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-rose-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#ff2459] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-[#ff2459]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Your bag is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven&apos;t added any trending styles yet. Explore our hottest drops!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/category/women');
                }}
                className="bg-black hover:bg-neutral-800 text-white font-bold text-xs py-3 px-6 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                Shop Trending Drops
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-bold text-gray-900 line-clamp-1 hover:text-[#ff2459] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.selectedColor, item.selectedSize)
                          }
                          className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-semibold">
                          Color: {item.selectedColor}
                        </span>
                        <span className="text-[10px] bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-semibold">
                          Size: {item.selectedSize}
                        </span>
                      </div>
                    </div>

                    {/* Price & Quantity Stepper */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-gray-900">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-gray-100 text-gray-600 active:scale-95 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-gray-900 px-2.5 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-gray-100 text-gray-600 active:scale-95 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Accordion if cart has items */}
          {cart.length > 0 && (
            <div className="pt-2">
              <div className="border border-gray-200 rounded-2xl p-3.5 bg-gray-50/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#ff2459]" />
                  <span>Coupons &amp; Offers</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs font-bold text-emerald-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span>{appliedCoupon.code} applied!</span>
                        <p className="text-[10px] text-emerald-600 font-normal">
                          Saved ₹{couponDiscount}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code"
                        className="flex-1 bg-white text-xs px-3 py-2 rounded-xl border border-gray-200 uppercase font-bold tracking-wider outline-none focus:border-[#ff2459]"
                      />
                      <button
                        onClick={() => handleApplyCoupon()}
                        className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-transform active:scale-95 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {couponMessage && (
                      <p
                        className={`text-[11px] font-semibold mt-1.5 ${
                          couponMessage.error ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {couponMessage.text}
                      </p>
                    )}

                    {/* Quick promo code suggestions */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {COUPONS.slice(0, 3).map((c) => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyCoupon(c.code)}
                          className="text-[10px] bg-white hover:bg-rose-50 hover:border-[#ff2459] border border-dashed border-gray-300 text-gray-700 px-2 py-1 rounded-lg font-bold transition-colors"
                        >
                          {c.code} ({c.description.split('(')[0]})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3 shadow-lg">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span className="font-semibold text-gray-900">₹{cartMrpTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount on MRP</span>
                <span>-₹{cartDiscount}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings ({appliedCoupon?.code})</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    <span>₹{shippingFee}</span>
                  )}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between text-sm font-black text-gray-900">
                <span>Total Payable</span>
                <span className="text-base text-[#ff2459]">₹{cartFinalTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Safe Payments • 7-Day Easy Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
