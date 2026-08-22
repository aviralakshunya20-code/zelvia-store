'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, Shield, Truck, RotateCcw, Award, Smartphone, ArrowRight, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Subscribed! Use code WELCOME20 for 20% off 🎉', 'success');
    }
  };

  return (
    <footer className="bg-[#111111] text-white pt-14 pb-24 lg:pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Discount Prompt */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-rose-950/60 rounded-3xl p-6 sm:p-10 border border-neutral-700/60 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[10px] font-black tracking-widest text-[#ff2459] bg-[#ff2459]/10 border border-[#ff2459]/30 px-3 py-1 rounded-full uppercase">
                VIP STYLE PASS
              </span>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Get Flat ₹150 OFF + Weekly Secret Drops
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Join 500,000+ fashion insiders across India for early access to flash sales &amp; trend reports.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 text-emerald-200 text-xs font-semibold flex items-center gap-3 animate-in fade-in">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white">You&apos;re on the VIP list!</p>
                    <p className="text-[11px] text-emerald-300">Use promo code <strong className="text-white bg-emerald-700 px-1.5 py-0.5 rounded">WELCOME20</strong> at checkout.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-neutral-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl border border-neutral-700 focus:border-[#ff2459] focus:ring-1 focus:ring-[#ff2459] outline-none"
                    />
                    <Mail className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#ff2459] hover:bg-[#e01648] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>Claim ₹150</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-neutral-800 text-neutral-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-neutral-900 text-[#ff2459] shrink-0 border border-neutral-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Free Express Shipping</p>
              <p className="text-[11px] text-neutral-400">On all orders above ₹799</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-neutral-900 text-[#ff2459] shrink-0 border border-neutral-800">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">7-Day Doorstep Returns</p>
              <p className="text-[11px] text-neutral-400">Hassle-free instant refund</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-neutral-900 text-[#ff2459] shrink-0 border border-neutral-800">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Cash On Delivery (COD)</p>
              <p className="text-[11px] text-neutral-400">25,000+ Indian Pincodes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-neutral-900 text-[#ff2459] shrink-0 border border-neutral-800">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Quality Promise</p>
              <p className="text-[11px] text-neutral-400">Direct from fashion creators</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white uppercase leading-none">
                ZELVIA
              </span>
              <span className="block text-[9px] font-bold tracking-[0.2em] text-[#ff2459] uppercase">
                INDIA
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              India&apos;s favorite fast-fashion destination. Trending runaway styles delivered to your doorstep at unbeatable prices.
            </p>
            <div className="pt-2 text-xs text-neutral-400">
              <p className="font-semibold text-white">Customer Support</p>
              <p>support@zelvia.in</p>
              <p className="text-[11px] text-neutral-500">Mon - Sat: 9 AM - 8 PM IST</p>
            </div>
          </div>

          {/* Shop Women */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Women&apos;s Fashion</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/category/floral-maxi-dresses" className="hover:text-[#ff2459] transition-colors">Floral Maxi Dresses</Link></li>
              <li><Link href="/category/bodycon-dresses" className="hover:text-[#ff2459] transition-colors">Bodycon &amp; Party Fits</Link></li>
              <li><Link href="/category/corset-tops" className="hover:text-[#ff2459] transition-colors">Corset Tops &amp; Bustiers</Link></li>
              <li><Link href="/category/co-ord-sets" className="hover:text-[#ff2459] transition-colors">Matching Co-ord Sets</Link></li>
              <li><Link href="/category/cargos" className="hover:text-[#ff2459] transition-colors">Y2K Street Cargos</Link></li>
              <li><Link href="/category/anarkali-sets" className="hover:text-[#ff2459] transition-colors">Ethnic &amp; Fusion Kurtas</Link></li>
            </ul>
          </div>

          {/* Men & Curve */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Men &amp; Curve</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/category/oversized-tees" className="hover:text-[#ff2459] transition-colors">Oversized Anime Graphic Tees</Link></li>
              <li><Link href="/category/cuban-collar-shirts" className="hover:text-[#ff2459] transition-colors">Resort Cuban Collar Shirts</Link></li>
              <li><Link href="/category/men-cargos" className="hover:text-[#ff2459] transition-colors">Tactical Street Cargos</Link></li>
              <li><Link href="/category/plus-dresses" className="hover:text-[#ff2459] transition-colors">Curve Party Dresses (1XL-5XL)</Link></li>
              <li><Link href="/category/curve-tops" className="hover:text-[#ff2459] transition-colors">Plus Size Flattering Tops</Link></li>
              <li><Link href="/category/sneakers" className="hover:text-[#ff2459] transition-colors">Chunky Y2K Sneakers</Link></li>
            </ul>
          </div>

          {/* Quick Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Customer Help</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/track-order" className="hover:text-[#ff2459] transition-colors">Track Your Order</Link></li>
              <li><Link href="/account" className="hover:text-[#ff2459] transition-colors">Return / Exchange Request</Link></li>
              <li><Link href="/account" className="hover:text-[#ff2459] transition-colors">Shipping &amp; Delivery Policy</Link></li>
              <li><Link href="/account" className="hover:text-[#ff2459] transition-colors">Cash On Delivery Terms</Link></li>
              <li><Link href="/category/sale" className="hover:text-[#ff2459] transition-colors">Coupons &amp; Offers</Link></li>
              <li><Link href="/account" className="hover:text-[#ff2459] transition-colors">Size Guide &amp; Fit Recommender</Link></li>
            </ul>
          </div>

          {/* Experience App */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Mobile Experience</h4>
            <p className="text-xs text-neutral-400">
              Shop faster with app-exclusive drops and flash notifications.
            </p>
            <div className="space-y-2 pt-1">
              <div className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 flex items-center gap-3 cursor-pointer transition-colors">
                <Smartphone className="w-5 h-5 text-[#ff2459]" />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-neutral-400">Get It On</p>
                  <p className="text-xs font-bold text-white">Google Play &amp; App Store</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-[11px] text-neutral-500 font-semibold mb-1.5">Accepted Payment Methods</p>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-neutral-400 font-bold">
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">UPI / QR</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">PhonePe</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">Google Pay</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">RuPay</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">COD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 ZELVIA India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
