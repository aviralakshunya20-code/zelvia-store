'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  MapPin,
  X,
  Menu,
  TrendingUp,
  Sparkles,
  ChevronRight,
  PackageCheck,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MAIN_CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { MegaMenu } from './MegaMenu';

const TRENDING_KEYWORDS = [
  'Floral Dress',
  'Oversized Anime Tee',
  'Cargo Pants',
  'Satin Bodycon',
  'Co-ord Set',
  'Y2K Sneakers',
  'Corset Top',
  'Anarkali Kurta',
];

export const Header = () => {
  const router = useRouter();
  const {
    products,
    cartCount,
    wishlist,
    setIsCartOpen,
    user,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
    storeSettings,
  } = useStore();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setIsSearchFocused(false);
    router.push(`/category/all?search=${encodeURIComponent(keyword)}`);
  };

  const activeCategory = MAIN_CATEGORIES.find((c) => c.id === activeMenuId);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1 text-gray-700 hover:text-black rounded-lg"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex flex-col items-start select-none group">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-black uppercase group-hover:text-[#ff2459] transition-colors leading-none">
                ZELVIA
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#ff2459] uppercase -mt-0.5">
                INDIA • FAST FASHION
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar with Live Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for dresses, oversized tees, cargos, coords, bags..."
                className="w-full bg-gray-100 hover:bg-gray-50 focus:bg-white text-xs sm:text-sm text-gray-900 pl-10 pr-10 py-2.5 rounded-full border border-transparent focus:border-[#ff2459] focus:ring-2 focus:ring-[#ff2459]/20 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Trending searches */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#ff2459]" />
                    Trending Right Now
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_KEYWORDS.map((kw) => (
                      <button
                        key={kw}
                        onClick={() => handleKeywordClick(kw)}
                        className="text-xs bg-gray-100 hover:bg-rose-50 hover:text-[#ff2459] px-3 py-1.5 rounded-full font-medium text-gray-700 transition-colors"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Product Results */}
                {searchQuery.trim() && (
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 border-t border-gray-100 pt-3">
                      Matching Products ({filteredProducts.length})
                    </div>
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={`/product/${prod.id}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors group"
                          >
                            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              <Image src={prod.images[0]} alt={prod.name} fill sizes="60px" className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate group-hover:text-[#ff2459] transition-colors">
                                {prod.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-black text-black">₹{prod.price}</span>
                                <span className="text-[11px] text-gray-400 line-through">₹{prod.mrp}</span>
                                <span className="text-[10px] text-[#ff2459] font-bold">{prod.discountPercentage}% OFF</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#ff2459] group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs text-gray-500">
                        No direct matches found for &quot;{searchQuery}&quot;. Press Enter to explore all items.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Track Order Link */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[#ff2459] px-2.5 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              <PackageCheck className="w-4 h-4 text-[#ff2459]" />
              <span>Track Order</span>
            </Link>

            {/* Store Admin Link */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-xs font-bold bg-gray-100 hover:bg-black hover:text-white text-gray-800 px-3 py-1.5 rounded-full transition-all"
            >
              <span>Admin</span>
            </Link>

            {/* Account / User */}
            <div className="relative group">
              {user.isLoggedIn ? (
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 p-2 text-gray-700 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Account profile"
                >
                  <User className="w-5 h-5 text-gray-800" />
                  <span className="text-xs font-bold hidden xl:inline truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 p-2 text-gray-700 hover:text-[#ff2459] rounded-full hover:bg-rose-50 transition-colors"
                  aria-label="Sign In or Sign Up"
                >
                  <User className="w-5 h-5" />
                  <span className="text-xs font-bold hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-gray-700 hover:text-[#ff2459] rounded-full hover:bg-rose-50 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#ff2459] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-3.5 py-2 rounded-full font-bold text-xs transition-transform active:scale-95 shadow-sm"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#ff2459]" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#ff2459] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (under logo on small screens) */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fast-fashion trends..."
              className="w-full bg-gray-100 text-xs text-gray-900 pl-9 pr-8 py-2 rounded-full border border-transparent focus:bg-white focus:border-[#ff2459] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Desktop Mega Menu Bar */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center justify-start gap-8 border-t border-gray-100 relative">
          {MAIN_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="relative py-3.5"
              onMouseEnter={() => setActiveMenuId(cat.id)}
            >
              <Link
                href={`/category/${cat.slug}`}
                className={`text-xs font-extrabold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  cat.slug === 'sale'
                    ? 'text-[#ff2459] hover:text-[#e01648]'
                    : activeMenuId === cat.id
                    ? 'text-[#ff2459]'
                    : 'text-gray-800 hover:text-black'
                }`}
              >
                <span>{cat.name}</span>
                {cat.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                      cat.badge.includes('80%')
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-400 text-black'
                    }`}
                  >
                    {cat.badge}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Active Desktop Mega Menu */}
      {activeCategory && (
        <MegaMenu
          category={activeCategory}
          onClose={() => setActiveMenuId(null)}
        />
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-black text-white">
              <div>
                <span className="text-xl font-black tracking-tight uppercase text-white">ZELVIA</span>
                <p className="text-[10px] text-[#ff2459] font-bold tracking-widest">FAST FASHION INDIA</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white"
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Accordion */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {MAIN_CATEGORIES.map((cat) => {
                const isExpanded = expandedMobileCat === cat.id;
                return (
                  <div key={cat.id} className="border-b border-gray-100 pb-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-extrabold text-gray-900 hover:text-[#ff2459] uppercase tracking-wide flex items-center gap-2"
                      >
                        {cat.name}
                        {cat.badge && (
                          <span className="text-[9px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded">
                            {cat.badge}
                          </span>
                        )}
                      </Link>
                      <button
                        onClick={() => setExpandedMobileCat(isExpanded ? null : cat.id)}
                        className="p-1 text-gray-400 hover:text-black"
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90 text-[#ff2459]' : ''}`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pl-3 py-2 space-y-3 bg-gray-50 rounded-xl my-1">
                        {cat.columns.map((col, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                              {col.title}
                            </span>
                            <div className="space-y-1 pl-2">
                              {col.items.map((item) => (
                                <Link
                                  key={item.id}
                                  href={`/category/${item.slug}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block text-xs font-medium text-gray-700 hover:text-[#ff2459] py-1"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 space-y-2">
                <Link
                  href="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 py-2 hover:text-[#ff2459]"
                >
                  <PackageCheck className="w-4 h-4 text-[#ff2459]" />
                  <span>Track My Order</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 py-2 hover:text-[#ff2459]"
                >
                  <Heart className="w-4 h-4 text-[#ff2459]" />
                  <span>Saved Items ({wishlist.length})</span>
                </Link>
              </div>
            </div>

            {/* Mobile Footer Auth */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              {user.isLoggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-gray-500">{user.phone}</p>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-bold text-[#ff2459] hover:underline"
                  >
                    My Account &rarr;
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-black text-white py-2.5 rounded-xl font-bold text-xs text-center"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
