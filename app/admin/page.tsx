'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Truck,
  TrendingUp,
  IndianRupee,
  Users,
  Eye,
  RotateCcw,
  Sparkles,
  Save,
  X,
  ExternalLink,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product, OrderStatus, Coupon } from '@/types';

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultProducts,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    storeSettings,
    updateStoreSettings,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons' | 'settings'>('products');

  // Product Modal State (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'ZELVIA LUXE',
    category: 'dresses',
    gender: 'women' as Product['gender'],
    subcategory: 'floral-maxi-dresses',
    price: 799,
    mrp: 2499,
    discountPercentage: 68,
    rating: 4.8,
    reviewCount: 120,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Rose Pink', hex: '#e2808a' },
      { name: 'Midnight Black', hex: '#111111' },
    ],
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 },
    ],
    tag: 'HOT' as Product['tag'],
    description: 'Trendy high-fashion piece designed for effortless chic styling.',
    details: {
      fabric: '100% Breathable Georgette with inner lining',
      fit: 'Slim contour fit',
      pattern: 'Solid / Floral Print',
      occasion: 'Casual, Brunch, Party',
      careInstructions: 'Machine wash cold with like colors',
      countryOfOrigin: 'India',
    },
    isCodAvailable: true,
    isFlashSale: false,
    flashSaleClaimedPercent: 80,
    soldCountLast7Days: 450,
  });

  // Coupon Modal State
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    code: '',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 499,
    maxDiscount: 300,
    description: '',
    expiresAt: '2026-12-31',
  });

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(storeSettings);

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.pricing.finalAmount : 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const lowStockProducts = products.filter((p) => p.sizes.some((s) => s.stock <= 4));

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      brand: 'ZELVIA LUXE',
      category: 'dresses',
      gender: 'women',
      subcategory: 'floral-maxi-dresses',
      price: 699,
      mrp: 1999,
      discountPercentage: 65,
      rating: 4.8,
      reviewCount: 15,
      images: [
        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      ],
      colors: [
        { name: 'Rose', hex: '#e2808a' },
        { name: 'Black', hex: '#111111' },
      ],
      sizes: [
        { size: 'XS', stock: 10 },
        { size: 'S', stock: 20 },
        { size: 'M', stock: 25 },
        { size: 'L', stock: 12 },
        { size: 'XL', stock: 5 },
      ],
      tag: 'NEW',
      description: 'Exclusive seasonal drop with premium fabric and silhouette.',
      details: {
        fabric: '100% Cotton / Georgette',
        fit: 'Regular Relaxed Fit',
        pattern: 'Solid Finish',
        occasion: 'Everyday Streetwear, Party, Travel',
        careInstructions: 'Machine wash cold',
        countryOfOrigin: 'India',
      },
      isCodAvailable: true,
      isFlashSale: false,
      flashSaleClaimedPercent: 70,
      soldCountLast7Days: 120,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      gender: p.gender,
      subcategory: p.subcategory,
      price: p.price,
      mrp: p.mrp,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      reviewCount: p.reviewCount,
      images: [...p.images],
      colors: [...p.colors],
      sizes: [...p.sizes],
      tag: p.tag,
      description: p.description,
      details: { ...p.details },
      isCodAvailable: p.isCodAvailable,
      isFlashSale: !!p.isFlashSale,
      flashSaleClaimedPercent: p.flashSaleClaimedPercent || 80,
      soldCountLast7Days: p.soldCountLast7Days || 200,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast('Please provide a product title and price', 'error');
      return;
    }

    const calculatedDiscount = Math.round(((productForm.mrp - productForm.price) / productForm.mrp) * 100);
    const payload = {
      ...productForm,
      slug: productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      discountPercentage: calculatedDiscount > 0 ? calculatedDiscount : productForm.discountPercentage,
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }
    setIsProductModalOpen(false);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    addCoupon({
      ...newCoupon,
      code: newCoupon.code.toUpperCase().trim(),
    });
    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 499,
      maxDiscount: 300,
      description: '',
      expiresAt: '2026-12-31',
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Center Header */}
        <div className="bg-black rounded-3xl p-6 border border-neutral-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#ff2459] text-white flex items-center justify-center font-black text-xl shadow-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white uppercase tracking-tight">
                  {storeSettings.storeName} Merchant Portal
                </h1>
                <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  ● Store Live &amp; Selling
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Full production control: edit products, update fulfillment status, configure coupons &amp; pricing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <span>View Customer Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={resetDefaultProducts}
              className="bg-neutral-800 hover:bg-rose-950 text-neutral-300 hover:text-rose-300 font-bold text-xs py-2.5 px-3 rounded-xl border border-neutral-700 transition-colors"
              title="Reset sample catalog"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'products', label: 'Product Catalog', icon: ShoppingBag, count: products.length },
            { id: 'orders', label: 'Orders & Dispatch', icon: Package, count: orders.length },
            { id: 'analytics', label: 'Sales & Analytics', icon: TrendingUp },
            { id: 'coupons', label: 'Coupons & Deals', icon: Tag, count: coupons.length },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#ff2459] text-white shadow-lg'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 border border-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${isActive ? 'bg-black text-white' : 'bg-neutral-900 text-neutral-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCT CATALOG */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-800/80 p-4 rounded-2xl border border-neutral-700">
              <div className="text-xs text-neutral-300">
                Manage your live store styles. Any change made here updates the website in real time.
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="bg-[#ff2459] hover:bg-[#e01648] text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Fashion Style</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-black rounded-3xl border border-neutral-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-900 text-[11px] font-black uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Product Info</th>
                      <th className="p-4">Category / Gender</th>
                      <th className="p-4">Price / MRP</th>
                      <th className="p-4">Stock (Sizes)</th>
                      <th className="p-4">Status &amp; Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {products.map((prod) => {
                      const totalStock = prod.sizes ? prod.sizes.reduce((sum, s) => sum + s.stock, 0) : 0;
                      return (
                        <tr key={prod.id} className="hover:bg-neutral-900/60 transition-colors">
                          {/* Image & Title */}
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                                <Image
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  fill
                                  sizes="60px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  href={`/product/${prod.id}`}
                                  target="_blank"
                                  className="font-bold text-white hover:text-[#ff2459] truncate block max-w-xs transition-colors"
                                >
                                  {prod.name}
                                </Link>
                                <span className="text-[10px] text-[#ff2459] font-bold uppercase">
                                  {prod.brand}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="p-4 capitalize">
                            <span className="font-semibold text-neutral-200">{prod.category}</span>
                            <span className="block text-[10px] text-neutral-500 uppercase">{prod.gender}</span>
                          </td>

                          {/* Price */}
                          <td className="p-4">
                            <div className="flex items-baseline gap-1.5 font-bold">
                              <span className="text-white font-black text-sm">₹{prod.price}</span>
                              <span className="text-neutral-500 line-through text-[11px]">₹{prod.mrp}</span>
                              <span className="text-rose-400 text-[10px] font-black">{prod.discountPercentage}% OFF</span>
                            </div>
                          </td>

                          {/* Stock */}
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-black text-xs ${totalStock <= 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {totalStock} in stock
                              </span>
                            </div>
                            <div className="flex gap-1 mt-1 text-[9px] text-neutral-400">
                              {prod.sizes && prod.sizes.map((s) => (
                                <span key={s.size} className="bg-neutral-800 px-1 py-0.2 rounded border border-neutral-700">
                                  {s.size}:{s.stock}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Badges */}
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {prod.tag && (
                                <span className="bg-[#ff2459] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                  {prod.tag}
                                </span>
                              )}
                              {prod.isFlashSale && (
                                <span className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                  FLASH
                                </span>
                              )}
                              {prod.isCodAvailable && (
                                <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  COD
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer"
                                title="Edit Product"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(prod.id)}
                                className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-950 text-neutral-400 hover:text-rose-300 transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & DISPATCH */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-black rounded-3xl border border-neutral-800 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#ff2459]" />
                  <span>Real-Time Customer Orders ({orders.length})</span>
                </h2>
                <span className="text-xs text-neutral-400">
                  Update fulfillment stage to update customer tracking page instantly
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-900 text-[11px] font-black uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer &amp; Phone</th>
                      <th className="p-4">Delivery City / Pincode</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Payment &amp; Amount</th>
                      <th className="p-4">Status &amp; Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="p-4">
                          <span className="font-black text-white block">{ord.orderNumber}</span>
                          <span className="text-[10px] text-neutral-500">{ord.date}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-white block">{ord.shippingAddress.fullName}</span>
                          <span className="text-[11px] text-neutral-400">{ord.shippingAddress.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-neutral-200 block">
                            {ord.shippingAddress.city}, {ord.shippingAddress.state}
                          </span>
                          <span className="text-[10px] text-neutral-500">Pincode: {ord.shippingAddress.pincode}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-neutral-200">{ord.items.length} items</span>
                          <div className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                            {ord.items.map((i) => i.product.name).join(', ')}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-black text-sm text-[#ff2459] block">
                            ₹{ord.pricing.finalAmount}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.2 rounded ${
                            ord.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {ord.paymentMethod} ({ord.paymentStatus})
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-neutral-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-neutral-700 outline-none cursor-pointer focus:border-[#ff2459]"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SALES & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-black p-5 rounded-3xl border border-neutral-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Total Gross Revenue
                </span>
                <p className="text-2xl font-black text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-emerald-400 font-semibold">+18.4% from last week</span>
              </div>
              <div className="bg-black p-5 rounded-3xl border border-neutral-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Total Orders Placed
                </span>
                <p className="text-2xl font-black text-white">{orders.length}</p>
                <span className="text-[11px] text-emerald-400 font-semibold">{totalItemsSold} fashion items sold</span>
              </div>
              <div className="bg-black p-5 rounded-3xl border border-neutral-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Average Order Value (AOV)
                </span>
                <p className="text-2xl font-black text-white">₹{averageOrderValue}</p>
                <span className="text-[11px] text-neutral-400">Higher than fast-fashion avg</span>
              </div>
              <div className="bg-black p-5 rounded-3xl border border-neutral-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                  Active Styles Catalog
                </span>
                <p className="text-2xl font-black text-white">{products.length}</p>
                <span className="text-[11px] text-amber-400 font-semibold">{lowStockProducts.length} items low stock</span>
              </div>
            </div>

            {/* Top Selling Categories */}
            <div className="bg-black rounded-3xl p-6 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Category Sales Velocity &amp; Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Women Dresses & Co-Ords', percentage: 48, revenue: '₹48,200', color: 'bg-[#ff2459]' },
                  { name: 'Men Streetwear & Oversized Tees', percentage: 26, revenue: '₹26,100', color: 'bg-indigo-500' },
                  { name: 'Y2K Bags, Heels & Platform Sneakers', percentage: 16, revenue: '₹16,400', color: 'bg-amber-500' },
                  { name: 'Indian Festive & Anarkali Fusion', percentage: 10, revenue: '₹9,800', color: 'bg-emerald-500' },
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">{cat.name}</span>
                      <span className="text-neutral-400">{cat.revenue} ({cat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden">
                      <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS & DISCOUNTS */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
            {/* Add Coupon Form */}
            <div className="lg:col-span-4 bg-black rounded-3xl p-6 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#ff2459]" />
                <span>Create New Coupon</span>
              </h3>

              <form onSubmit={handleAddCouponSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Coupon Promo Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DIWALI50"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 uppercase outline-none focus:border-[#ff2459]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-400 font-bold uppercase mb-1">Type</label>
                    <select
                      value={newCoupon.discountType}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                      className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                    >
                      <option value="percentage">% Percentage</option>
                      <option value="flat">₹ Flat Discount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-bold uppercase mb-1">Value ({newCoupon.discountType === 'percentage' ? '%' : '₹'}) *</label>
                    <input
                      type="number"
                      required
                      value={newCoupon.discountValue}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                      className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none focus:border-[#ff2459]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrderValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: Number(e.target.value) })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Description / Campaign</label>
                  <input
                    type="text"
                    placeholder="e.g. Festival Special: Flat ₹150 OFF"
                    value={newCoupon.description}
                    onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                    className="w-full bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-black py-3 rounded-xl cursor-pointer"
                >
                  Create &amp; Activate Coupon
                </button>
              </form>
            </div>

            {/* Active Coupons List */}
            <div className="lg:col-span-8 bg-black rounded-3xl p-6 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Active Store Promo Codes ({coupons.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="bg-[#ff2459] text-white font-black text-xs px-2.5 py-1 rounded-lg uppercase tracking-wider">
                          {c.code}
                        </span>
                        <p className="text-xs font-bold text-white mt-2">{c.description || 'Special Discount'}</p>
                        <p className="text-[11px] text-neutral-400">
                          {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`} • Min cart: ₹{c.minOrderValue}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteCoupon(c.code)}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STORE & BRANDING SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-black rounded-3xl p-6 sm:p-8 border border-neutral-800 space-y-6 animate-in fade-in">
            <h2 className="text-base font-black uppercase tracking-wider text-white border-b border-neutral-800 pb-3 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#ff2459]" />
              <span>Store Configuration &amp; Live Branding</span>
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settingsForm.storeName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">COD Handling Fee (₹)</label>
                  <input
                    type="number"
                    value={settingsForm.codFee}
                    onChange={(e) => setSettingsForm({ ...settingsForm, codFee: Number(e.target.value) })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Merchant UPI ID</label>
                  <input
                    type="text"
                    value={settingsForm.merchantUpiId}
                    onChange={(e) => setSettingsForm({ ...settingsForm, merchantUpiId: e.target.value })}
                    className="w-full bg-neutral-900 text-white font-bold p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">
                  Top Announcement Bar Message #1
                </label>
                <input
                  type="text"
                  value={settingsForm.announcements[0] || ''}
                  onChange={(e) => {
                    const copy = [...settingsForm.announcements];
                    copy[0] = e.target.value;
                    setSettingsForm({ ...settingsForm, announcements: copy });
                  }}
                  className="w-full bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Support Phone</label>
                  <input
                    type="text"
                    value={settingsForm.supportPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                    className="w-full bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settingsForm.supportEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                    className="w-full bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#ff2459] hover:bg-[#e01648] text-white font-black text-xs py-3 px-8 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Store Settings</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setIsProductModalOpen(false)} />
          <div className="relative bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full z-10 space-y-4 shadow-2xl border border-neutral-700 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-black uppercase text-white">
                {editingProductId ? 'Edit Product Style' : 'Create New Fashion Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. French Floral Sweetheart Ruched Midi Dress"
                  className="w-full bg-black p-3 rounded-xl border border-neutral-700 outline-none text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-bold outline-none"
                  >
                    <option value="dresses">Dresses</option>
                    <option value="tops">Tops &amp; Blouses</option>
                    <option value="bottoms">Bottoms &amp; Cargos</option>
                    <option value="co-ords">Co-ord Sets</option>
                    <option value="ethnic">Ethnic Wear</option>
                    <option value="men">Men Streetwear</option>
                    <option value="curve">Curve + Plus</option>
                    <option value="accessories">Shoes &amp; Bags &amp; Accs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Gender</label>
                  <select
                    value={productForm.gender}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value as any })}
                    className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-bold outline-none"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="curve">Curve</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Badge Tag</label>
                  <select
                    value={productForm.tag || ''}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value as any })}
                    className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-bold outline-none"
                  >
                    <option value="HOT">HOT</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="NEW">NEW</option>
                    <option value="FLASH DEAL">FLASH DEAL</option>
                    <option value="70% OFF">70% OFF</option>
                    <option value="">None</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-black text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold uppercase mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                    className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-black text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  value={productForm.images[0] || ''}
                  onChange={(e) => {
                    const copy = [...productForm.images];
                    copy[0] = e.target.value;
                    setProductForm({ ...productForm, images: copy });
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-mono text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Secondary / Hover Image URL</label>
                <input
                  type="url"
                  value={productForm.images[1] || ''}
                  onChange={(e) => {
                    const copy = [...productForm.images];
                    copy[1] = e.target.value;
                    setProductForm({ ...productForm, images: copy });
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white font-mono text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-bold uppercase mb-1">Description &amp; Fabric</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-black p-3 rounded-xl border border-neutral-700 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFlashSale}
                    onChange={(e) => setProductForm({ ...productForm, isFlashSale: e.target.checked })}
                    className="w-4 h-4 accent-[#ff2459]"
                  />
                  <span className="font-bold">Put on Flash Sale</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isCodAvailable}
                    onChange={(e) => setProductForm({ ...productForm, isCodAvailable: e.target.checked })}
                    className="w-4 h-4 accent-[#ff2459]"
                  />
                  <span className="font-bold">Cash On Delivery Available</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="submit"
                  className="flex-1 bg-[#ff2459] hover:bg-[#e01648] text-white font-black py-3.5 rounded-xl cursor-pointer"
                >
                  {editingProductId ? 'Save Product Changes' : 'Publish Product to Storefront'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="border border-neutral-700 text-neutral-300 font-bold py-3.5 px-6 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
