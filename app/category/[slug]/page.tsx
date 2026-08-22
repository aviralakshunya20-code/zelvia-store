'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { MAIN_CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '1XL', '2XL', '26', '28', '30', '32', '34', 'UK 5', 'UK 6', 'UK 7'];
const COLORS = [
  { name: 'Black', hex: '#111111' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Rose / Pink', hex: '#e2808a' },
  { name: 'Green / Olive', hex: '#4b5320' },
  { name: 'Gold / Champagne', hex: '#d4af37' },
  { name: 'Blue', hex: '#0047ab' },
  { name: 'Sand / Beige', hex: '#c2b280' },
];

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { products } = useStore();
  const rawSlug = params?.slug as string || 'women';
  const searchQuery = searchParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(
    rawSlug === 'all' || rawSlug === 'sale' ? 'all' : rawSlug
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [priceBracket, setPriceBracket] = useState<string>('all');
  const [codOnly, setCodOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating-desc'>('recommended');
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Category Information
  const currentCategoryInfo = useMemo(() => {
    if (rawSlug === 'sale') {
      return {
        name: 'Flash Sale & Crazy Deals',
        description: 'Up to 80% off clearance items, under ₹499 steals, and limited lightning drops.',
      };
    }
    if (searchQuery) {
      return {
        name: `Search Results: "${searchQuery}"`,
        description: 'Showing all fast-fashion matching trends and styles.',
      };
    }
    const foundMain = MAIN_CATEGORIES.find((c) => c.slug === rawSlug);
    if (foundMain) {
      return {
        name: `${foundMain.name}'s Collection`,
        description: `Explore all trending fashion picks for ${foundMain.name.toLowerCase()} with COD and fast express shipping across India.`,
      };
    }
    // Subcategory check
    for (const cat of MAIN_CATEGORIES) {
      for (const col of cat.columns) {
        const item = col.items.find((i) => i.slug === rawSlug);
        if (item) {
          return {
            name: item.name,
            description: `Shop the latest ${item.name.toLowerCase()} curated for current runway and street trends.`,
          };
        }
      }
    }
    return {
      name: 'All Fast Fashion Drops',
      description: 'Discover thousands of trending runway and streetwear looks.',
    };
  }, [rawSlug, searchQuery]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query check
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Route / Category filter
      if (rawSlug === 'sale') {
        if (!p.isFlashSale && p.discountPercentage < 65) return false;
      } else if (rawSlug === 'women' && p.gender !== 'women') {
        return false;
      } else if (rawSlug === 'men' && p.gender !== 'men') {
        return false;
      } else if (rawSlug === 'curve' && p.gender !== 'curve') {
        return false;
      } else if (rawSlug === 'accessories' && p.category !== 'accessories') {
        return false;
      } else if (rawSlug !== 'all' && rawSlug !== 'women' && rawSlug !== 'men' && rawSlug !== 'curve' && rawSlug !== 'accessories' && !searchQuery) {
        if (p.subcategory !== rawSlug && p.category !== rawSlug) return false;
      }

      // Price brackets
      if (priceBracket === 'under499' && p.price > 499) return false;
      if (priceBracket === '500-999' && (p.price < 500 || p.price > 999)) return false;
      if (priceBracket === '1000-1999' && (p.price < 1000 || p.price > 1999)) return false;
      if (priceBracket === '2000+' && p.price < 2000) return false;

      // Discount filter
      if (minDiscount > 0 && p.discountPercentage < minDiscount) return false;

      // COD filter
      if (codOnly && !p.isCodAvailable) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s.size));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase().split(' ')[0]))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount-desc') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [
    rawSlug,
    searchQuery,
    priceBracket,
    minDiscount,
    codOnly,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  const activeFilterCount =
    (priceBracket !== 'all' ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (codOnly ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length;

  const clearAllFilters = () => {
    setPriceBracket('all');
    setMinDiscount(0);
    setCodOnly(false);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const toggleSize = (s: string) => {
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
  };

  const toggleColor = (c: string) => {
    setSelectedColors((prev) => (prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]));
  };

  const FilterPanel = () => (
    <div className="space-y-6 text-xs">
      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <span className="font-bold text-gray-900">{activeFilterCount} Active Filters</span>
          <button
            onClick={clearAllFilters}
            className="text-[#ff2459] hover:underline font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>
      )}

      {/* Price Bracket */}
      <div className="space-y-2.5">
        <h4 className="font-extrabold uppercase tracking-wider text-gray-900 text-[11px]">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under499', label: 'Under ₹499 (Budget Steals)' },
            { id: '500-999', label: '₹500 - ₹999 (Most Popular)' },
            { id: '1000-1999', label: '₹1,000 - ₹1,999 (Luxe Edits)' },
          ].map((pb) => (
            <label
              key={pb.id}
              className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black py-0.5"
            >
              <input
                type="radio"
                name="priceBracket"
                checked={priceBracket === pb.id}
                onChange={() => setPriceBracket(pb.id)}
                className="accent-[#ff2459] w-3.5 h-3.5"
              />
              <span>{pb.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Minimum */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100">
        <h4 className="font-extrabold uppercase tracking-wider text-gray-900 text-[11px]">
          Discount Range
        </h4>
        <div className="space-y-1.5">
          {[
            { val: 0, label: 'All Discounts' },
            { val: 30, label: '30% and above' },
            { val: 50, label: '50% and above' },
            { val: 65, label: '65% and above (Mega Deals)' },
          ].map((d) => (
            <label
              key={d.val}
              className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-black py-0.5"
            >
              <input
                type="radio"
                name="discountFilter"
                checked={minDiscount === d.val}
                onChange={() => setMinDiscount(d.val)}
                className="accent-[#ff2459] w-3.5 h-3.5"
              />
              <span>{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100">
        <h4 className="font-extrabold uppercase tracking-wider text-gray-900 text-[11px]">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((sz) => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                className={`px-2.5 py-1 rounded-lg border font-bold text-[11px] transition-colors ${
                  isSelected
                    ? 'bg-black border-black text-white'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palettes */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100">
        <h4 className="font-extrabold uppercase tracking-wider text-gray-900 text-[11px]">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const isSelected = selectedColors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                className={`w-6 h-6 rounded-full border border-gray-300 transition-transform ${
                  isSelected ? 'ring-2 ring-offset-2 ring-[#ff2459] scale-110' : 'hover:scale-110'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* COD Availability Toggle */}
      <div className="pt-3 border-t border-gray-100">
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="font-bold text-gray-900">Cash On Delivery (COD)</span>
          <input
            type="checkbox"
            checked={codOnly}
            onChange={(e) => setCodOnly(e.target.checked)}
            className="accent-[#ff2459] w-4 h-4 rounded"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-black shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/category/women" className="hover:text-black shrink-0">
              Categories
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-gray-900 font-bold capitalize truncate">
              {currentCategoryInfo.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Header */}
        <div className="mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 uppercase tracking-tight">
            {currentCategoryInfo.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            {currentCategoryInfo.description}
          </p>
        </div>

        {/* Action Bar (Filter Trigger, Sort, View Grid) */}
        <div className="flex items-center justify-between gap-3 pb-6 border-b border-gray-100">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          {/* Product Count (Desktop) */}
          <div className="text-xs text-gray-500 font-medium hidden sm:block">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> styles
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-bold hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-100 text-xs font-bold text-gray-900 px-3 py-2 rounded-xl border-none outline-none cursor-pointer focus:ring-1 focus:ring-[#ff2459]"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount-desc">Discount: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>

            {/* Grid Layout Switcher (Desktop) */}
            <div className="hidden lg:flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 2 ? 'bg-white shadow-xs text-black' : 'text-gray-400'
                }`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 3 ? 'bg-white shadow-xs text-black' : 'text-gray-400'
                }`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 4 ? 'bg-white shadow-xs text-black' : 'text-gray-400'
                }`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Filters:</span>
            {priceBracket !== 'all' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-rose-50 text-[#ff2459] font-bold px-2.5 py-1 rounded-full border border-rose-200">
                Price: {priceBracket}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceBracket('all')} />
              </span>
            )}
            {minDiscount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-rose-50 text-[#ff2459] font-bold px-2.5 py-1 rounded-full border border-rose-200">
                {minDiscount}%+ OFF
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMinDiscount(0)} />
              </span>
            )}
            {codOnly && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-rose-50 text-[#ff2459] font-bold px-2.5 py-1 rounded-full border border-rose-200">
                COD Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setCodOnly(false)} />
              </span>
            )}
            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-gray-800 font-bold px-2.5 py-1 rounded-full"
              >
                Size: {s}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleSize(s)} />
              </span>
            ))}
            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 text-[11px] bg-gray-100 text-gray-800 font-bold px-2.5 py-1 rounded-full"
              >
                Color: {c}
                <X className="w-3 h-3 cursor-pointer" onClick={() => toggleColor(c)} />
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-gray-500 hover:text-black font-semibold underline ml-1"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Body Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-gray-100 text-sm font-black uppercase text-gray-900">
                <Filter className="w-4 h-4 text-[#ff2459]" />
                <span>Filters &amp; Refinements</span>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Product Listing Cards */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-[#ff2459] flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No matching outfits found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting or resetting your filter criteria to see all fast-fashion drops.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-black hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-transform active:scale-95"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-3 sm:gap-5 ${
                  gridCols === 2
                    ? 'grid-cols-2'
                    : gridCols === 3
                    ? 'grid-cols-2 sm:grid-cols-3'
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm font-black uppercase text-gray-900">Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4">
              <FilterPanel />
            </div>
            <div className="pt-4 border-t border-gray-100 mt-auto">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#ff2459] text-white py-3 rounded-xl font-bold text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading fashion styles...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
