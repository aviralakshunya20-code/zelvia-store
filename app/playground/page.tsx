'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveSpeedometer } from '@/components/InteractiveSpeedometer';

export default function PlaygroundPage() {
  // Cart simulation
  const [cartCount, setCartCount] = useState(1);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [accentColor, setAccentColor] = useState('rose');
  const [confettiActive, setConfettiActive] = useState(false);

  const basePrice = 4999;
  const discount = couponApplied ? 0.5 : 1;
  const totalPrice = Math.round(basePrice * cartCount * discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VIP50' || couponCode.toUpperCase() === 'MEASURER') {
      setCouponApplied(true);
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 2000);
  };

  return (
    <div className="bg-white text-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200">
            <span className="text-xs font-black text-rose-600 uppercase">
              Entertaining Interactive Lab
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Frontend Craftsmanship Playground.
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-600">
            Test real interactive components built with zero lag, optimistic UI state, and fluid animations. This is the quality your clients will experience.
          </p>
        </div>

        {/* 01. Interactive Speedometer */}
        <div>
          <InteractiveSpeedometer />
        </div>

        {/* 02. Interactive E-Commerce Cart Simulation */}
        <div className="p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-black uppercase text-rose-600">
                Live Simulation 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Optimistic E-Commerce Checkout Funnel
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Notice how quantity adjustments and price totals update with 0ms latency.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-700 text-xs font-black">
                ● Live 60 FPS
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Product Card */}
            <div className="p-6 rounded-2xl bg-white border-2 border-rose-200 shadow-sm space-y-4">
              <div className="w-full h-44 rounded-xl bg-gradient-to-tr from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center text-5xl">
                👟
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black text-slate-900">
                    Velocity Pro Runner
                  </h3>
                  <span className="text-lg font-black text-rose-600">
                    ₹{basePrice}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  Ultra-light athletic shoe with responsive carbon plate.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600">Select Quantity:</span>
                <div className="flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-xl">
                  <button
                    onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                    className="text-base font-black text-slate-700 hover:text-rose-600 px-1"
                  >
                    -
                  </button>
                  <span className="font-black text-sm text-slate-900">{cartCount}</span>
                  <button
                    onClick={() => setCartCount(cartCount + 1)}
                    className="text-base font-black text-slate-700 hover:text-rose-600 px-1"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Instant Checkout Breakdown */}
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-5">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
                Live Cart Summary (0ms Lag)
              </h3>

              <div className="space-y-2 text-sm font-bold text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''}):</span>
                  <span>₹{basePrice * cartCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Courier Delivery:</span>
                  <span className="text-emerald-600 font-black">FREE</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-rose-600">
                    <span>VIP Promo (50% Off):</span>
                    <span>-₹{Math.round(basePrice * cartCount * 0.5)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black text-slate-900 pt-3 border-t border-slate-100">
                  <span>Total Amount:</span>
                  <span className="text-rose-600">₹{totalPrice}</span>
                </div>
              </div>

              {/* Promo input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code (Try: VIP50)"
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold uppercase focus:outline-none focus:border-rose-400"
                />
                <button type="submit" className="btn-fun-pink !py-2 !px-4 text-xs">
                  Apply
                </button>
              </form>

              {couponApplied && (
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold text-center border border-emerald-200">
                  🎉 VIP50 applied! 50% discount activated!
                </div>
              )}

              <button
                onClick={triggerConfetti}
                className="btn-fun-pink w-full justify-center !py-3"
              >
                Instant 1-Tap Checkout →
              </button>
            </div>

          </div>
        </div>

        {/* 03. Confetti Celebration Toy */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 border-2 border-rose-200 text-center space-y-4">
          <span className="text-3xl">🎉</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Interactive Confetti Reaction
          </h2>
          <p className="text-sm font-semibold text-slate-600 max-w-md mx-auto">
            Test micro-animations and celebratory client purchase triggers with zero script lag.
          </p>
          <div className="pt-2">
            <button onClick={triggerConfetti} className="btn-fun-pink !py-3.5 !px-8 text-base">
              {confettiActive ? '✨ POPPING CONFETTI! ✨' : '🚀 Launch Confetti Cannon!'}
            </button>
          </div>
          {confettiActive && (
            <div className="text-2xl animate-bounce-gentle">
              🎊 🎈 🥳 🚀 ✨ 💎 🌟 ⚡
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link href="/contact" className="btn-fun-pink !py-3.5 !px-8 text-base">
            Ready to Build an Interactive App for Your Business? →
          </Link>
        </div>

      </div>
    </div>
  );
}
