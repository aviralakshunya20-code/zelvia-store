'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { COUPONS } from '@/data/coupons';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
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

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-4">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-[#ff2459]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Looks like you haven&apos;t added any trending styles yet. Explore our latest drops and save up to 70%!
          </p>
          <Link
            href="/category/women"
            className="inline-block bg-black hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm py-3.5 px-8 rounded-full shadow-lg transition-transform active:scale-95"
          >
            Start Shopping &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold">Shopping Bag</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight mb-6">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Meter */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#ff2459]" />
                  {amountNeededForFreeShip === 0
                    ? '🎉 You have qualified for FREE Express Delivery!'
                    : `Add ₹${amountNeededForFreeShip} more to unlock FREE Express Delivery!`}
                </span>
                <span className="text-[#ff2459] font-black">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ff2459] h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 flex flex-col sm:flex-row gap-4 shadow-xs"
                >
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-sm font-bold text-gray-900 hover:text-[#ff2459] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeFromCart(item.productId, item.selectedColor, item.selectedSize)
                          }
                          className="text-gray-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2.5 py-1 rounded-md font-semibold">
                          Color: {item.selectedColor}
                        </span>
                        <span className="bg-gray-100 px-2.5 py-1 rounded-md font-semibold">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-emerald-600 font-bold">In Stock</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-3">
                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-black text-gray-950">
                          ₹{item.product.price * item.quantity}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                        <span className="text-xs font-bold text-[#ff2459]">
                          {item.product.discountPercentage}% OFF
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.productId,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black text-gray-900 px-3">
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
                          className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 active:scale-95"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                <Tag className="w-4 h-4 text-[#ff2459]" />
                <span>Apply Promo Code</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs font-bold text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p>{appliedCoupon.code} Applied!</p>
                      <p className="text-[11px] text-emerald-600 font-normal">
                        Saving ₹{couponDiscount}
                      </p>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-xs text-rose-600 underline">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME20"
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 uppercase font-bold tracking-wider outline-none focus:border-[#ff2459]"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-xs font-semibold ${couponMessage.error ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {COUPONS.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => handleApplyCoupon(c.code)}
                        className="text-[10px] bg-gray-50 hover:bg-rose-50 border border-dashed border-gray-300 hover:border-[#ff2459] px-2 py-1 rounded-lg font-bold text-gray-700 transition-colors"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3.5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-gray-600">
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
                    <span>Coupon Savings</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-950">
                  <span>Total Amount</span>
                  <span className="text-[#ff2459]">₹{cartFinalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Safe Payments • 7-Day Doorstep Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
