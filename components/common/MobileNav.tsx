'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Zap, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const MobileNav = () => {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartOpen, user, setIsAuthModalOpen } = useStore();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Categories', href: '/category/women', icon: Layers },
    { label: 'Deals', href: '/category/sale', icon: Zap, badge: 'HOT' },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, count: wishlist.length },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-3 lg:hidden shadow-lg">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center relative py-1 transition-colors ${
                isActive ? 'text-[#ff2459]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ff2459] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-rose-600 text-white text-[8px] font-bold px-1 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}

        {/* Bag / Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center relative py-1 text-gray-600 hover:text-gray-900"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#ff2459] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-1">Bag</span>
        </button>
      </div>
    </nav>
  );
};
