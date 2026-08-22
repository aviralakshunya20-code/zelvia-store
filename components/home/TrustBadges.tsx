'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Sparkles, HeartHandshake } from 'lucide-react';

export const TrustBadges = () => {
  const BADGES = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      desc: 'On all orders above ₹799',
    },
    {
      icon: ShieldCheck,
      title: 'Cash on Delivery (COD)',
      desc: 'Available on 25,000+ Indian Pincodes',
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Doorstep Returns',
      desc: 'Hassle-free pickup & instant refund',
    },
    {
      icon: CreditCard,
      title: '100% Secure Payments',
      desc: 'UPI, RuPay, Cards & NetBanking',
    },
  ];

  return (
    <section className="py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="p-2.5 rounded-xl bg-rose-50 text-[#ff2459] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug">{badge.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
