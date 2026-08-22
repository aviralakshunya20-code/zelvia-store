'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  MapPin,
  Heart,
  CreditCard,
  RotateCcw,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  X,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types';

export default function AccountPage() {
  const {
    user,
    logout,
    orders,
    cancelOrder,
    returnOrder,
    addresses,
    addAddress,
    deleteAddress,
    wishlist,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wallet' | 'profile'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [selectedOrderForReturn, setSelectedOrderForReturn] = useState<Order | null>(null);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState<Order | null>(null);
  const [returnReason, setReturnReason] = useState('Size is too small/large');
  const [cancelReason, setCancelReason] = useState('Found better price / changed mind');

  // Address modal state
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user.name || 'Priya Sharma',
    phone: user.phone || '+91 98765 43210',
    pincode: '',
    flatHouse: '',
    streetArea: '',
    landmark: '',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'Home' as 'Home' | 'Work' | 'Other',
    isDefault: false,
  });

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'active') return o.status === 'Placed' || o.status === 'Processing' || o.status === 'Shipped' || o.status === 'Out for Delivery';
    if (orderFilter === 'delivered') return o.status === 'Delivered';
    if (orderFilter === 'cancelled') return o.status === 'Cancelled' || o.status === 'Returned';
    return true;
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.pincode || !newAddr.flatHouse) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddAddressModal(false);
  };

  const handleConfirmReturn = () => {
    if (selectedOrderForReturn) {
      returnOrder(selectedOrderForReturn.id, returnReason);
      setSelectedOrderForReturn(null);
    }
  };

  const handleConfirmCancel = () => {
    if (selectedOrderForCancel) {
      cancelOrder(selectedOrderForCancel.id, cancelReason);
      setSelectedOrderForCancel(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile Badge */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff2459] to-rose-400 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xl font-black">
                {user.name ? user.name[0] : 'U'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-gray-950">{user.name || 'Valued Customer'}</h1>
                <span className="text-[10px] bg-[#ff2459] text-white px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  VIP Insider
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{user.phone} • {user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-2 text-xs">
              <span className="text-gray-500 font-semibold block text-[10px] uppercase">ZELVIA Credits</span>
              <span className="text-sm font-black text-[#ff2459]">₹350.00</span>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1">
            {[
              { id: 'orders', label: 'My Orders & Tracking', icon: Package, badge: orders.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: addresses.length },
              { id: 'wallet', label: 'Wallet & Rewards', icon: Wallet, badge: '₹350' },
              { id: 'profile', label: 'Account Profile', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff2459]' : 'text-gray-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        isActive ? 'bg-[#ff2459] text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Order Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'all', label: 'All Orders' },
                    { id: 'active', label: 'Active / In Transit' },
                    { id: 'delivered', label: 'Delivered' },
                    { id: 'cancelled', label: 'Cancelled / Returned' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setOrderFilter(f.id as any)}
                      className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                        orderFilter === f.id
                          ? 'bg-black text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 space-y-3">
                    <Package className="w-12 h-12 text-gray-300 mx-auto" />
                    <h3 className="text-base font-bold text-gray-900">No orders found in this view</h3>
                    <Link
                      href="/category/women"
                      className="inline-block bg-black text-white text-xs font-bold py-2.5 px-6 rounded-full"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-gray-950">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  order.status === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : order.status === 'Cancelled' || order.status === 'Returned'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                              Placed on {order.date} • Total: ₹{order.pricing.finalAmount} ({order.paymentMethod})
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrderForTracking(order)}
                              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
                            >
                              <Truck className="w-3.5 h-3.5 text-[#ff2459]" />
                              <span>Track Order</span>
                            </button>

                            {order.status !== 'Cancelled' && order.status !== 'Returned' && (
                              <button
                                onClick={() => setSelectedOrderForReturn(order)}
                                className="border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs py-2 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Return / Exchange</span>
                              </button>
                            )}

                            {order.status === 'Placed' && (
                              <button
                                onClick={() => setSelectedOrderForCancel(order)}
                                className="border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs py-2 px-3 rounded-xl cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/70 border border-gray-100"
                            >
                              <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                                <Image
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 text-xs">
                                <Link
                                  href={`/product/${item.productId}`}
                                  className="font-bold text-gray-900 truncate block hover:text-[#ff2459]"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-gray-500 text-[11px] mt-0.5">
                                  Size: {item.selectedSize} • Color: {item.selectedColor}
                                </p>
                                <span className="font-extrabold text-gray-950 mt-1 block">
                                  ₹{item.product.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Address & Status snippet */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 pt-2 bg-gray-50/30 p-3 rounded-xl">
                          <span className="truncate">
                            Delivering to: <strong className="text-gray-800">{order.shippingAddress.fullName}</strong>, {order.shippingAddress.city} ({order.shippingAddress.pincode})
                          </span>
                          <span className="text-emerald-700 font-bold">
                            Est. Delivery: {order.estimatedDelivery}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-base font-extrabold text-gray-900 uppercase">
                      Saved Delivery Addresses
                    </h2>
                    <p className="text-xs text-gray-500">
                      Manage your home and work delivery locations
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddAddressModal(true)}
                    className="bg-[#ff2459] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-gray-900">{addr.fullName}</span>
                        <span className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-0.5 rounded-md uppercase">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {addr.flatHouse}, {addr.streetArea}
                        {addr.landmark && <><br />Landmark: {addr.landmark}</>}
                        <br />
                        <strong className="text-gray-900">{addr.city}, {addr.state} - {addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold pt-1">
                        Phone: {addr.phone}
                      </p>
                      <div className="pt-3 border-t border-gray-200 flex justify-end">
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-xs text-rose-600 hover:underline font-bold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WALLET TAB */}
            {activeTab === 'wallet' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
                <div className="bg-gradient-to-r from-neutral-900 to-rose-950 rounded-2xl p-6 text-white space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff2459] bg-white/10 px-2.5 py-0.5 rounded-full">
                    ZELVIA WALLET
                  </span>
                  <h3 className="text-3xl font-black">₹350.00</h3>
                  <p className="text-xs text-neutral-300">
                    Usable instantly on any checkout order above ₹499
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    Recent Wallet Activity
                  </h4>
                  <div className="divide-y divide-gray-100 text-xs">
                    <div className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">VIP Sign-up Welcome Bonus</p>
                        <p className="text-[11px] text-gray-400">18 Aug 2026</p>
                      </div>
                      <span className="text-emerald-600 font-bold text-sm">+₹200</span>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">UPI Instant Cashback Voucher</p>
                        <p className="text-[11px] text-gray-400">19 Aug 2026</p>
                      </div>
                      <span className="text-emerald-600 font-bold text-sm">+₹150</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
                <h2 className="text-base font-extrabold text-gray-900 uppercase border-b border-gray-100 pb-3">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">Mobile Number</label>
                    <input
                      type="text"
                      defaultValue={user.phone}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 uppercase mb-1">Country</label>
                    <input
                      type="text"
                      defaultValue="India (🇮🇳)"
                      disabled
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50"
                    />
                  </div>
                </div>
                <button
                  onClick={() => showToast('Profile settings saved!', 'success')}
                  className="bg-black text-white text-xs font-bold py-3 px-6 rounded-xl cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Order Tracking Modal */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedOrderForTracking(null)} />
          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full z-10 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-extrabold uppercase text-gray-900">
                  Tracking: {selectedOrderForTracking.orderNumber}
                </h3>
                <p className="text-xs text-gray-500">
                  Est. Delivery: {selectedOrderForTracking.estimatedDelivery}
                </p>
              </div>
              <button onClick={() => setSelectedOrderForTracking(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tracking Steps */}
            <div className="space-y-4">
              {selectedOrderForTracking.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 text-xs">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.completed
                          ? 'bg-[#ff2459] text-white shadow-xs'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    {idx < selectedOrderForTracking.trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-10 ${step.completed ? 'bg-[#ff2459]' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.status}
                      </p>
                      <span className="text-[11px] text-gray-400">{step.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrderForTracking(null)}
              className="w-full bg-black text-white text-xs font-bold py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Return Request Modal */}
      {selectedOrderForReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedOrderForReturn(null)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-extrabold uppercase text-gray-900 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#ff2459]" />
                <span>Doorstep Return / Exchange</span>
              </h3>
              <button onClick={() => setSelectedOrderForReturn(null)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Select reason for returning order <strong>{selectedOrderForReturn.orderNumber}</strong>. Free courier pickup will be scheduled at your address.
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Reason for return</label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200 outline-none"
              >
                <option value="Size is too small/large">Size is too small / large</option>
                <option value="Fabric quality not as expected">Fabric quality not as expected</option>
                <option value="Color differs from images">Color differs from photos</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
              </select>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-semibold">
              ✓ Doorstep pickup in 24-48 hours • Instant refund to original payment source upon pickup
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleConfirmReturn}
                className="flex-1 bg-[#ff2459] hover:bg-[#e01648] text-white font-bold text-xs py-3 rounded-xl cursor-pointer"
              >
                Confirm Return &amp; Refund
              </button>
              <button
                onClick={() => setSelectedOrderForReturn(null)}
                className="border border-gray-200 text-gray-700 font-bold text-xs py-3 px-4 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {selectedOrderForCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedOrderForCancel(null)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-extrabold uppercase text-gray-900">
              Cancel Order {selectedOrderForCancel.orderNumber}?
            </h3>
            <p className="text-xs text-gray-600">
              Are you sure you want to cancel this order? Any payments will be credited back instantly.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-rose-600 text-white font-bold text-xs py-3 rounded-xl cursor-pointer"
              >
                Yes, Cancel Order
              </button>
              <button
                onClick={() => setSelectedOrderForCancel(null)}
                className="border border-gray-200 text-gray-700 font-bold text-xs py-3 px-4 rounded-xl"
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowAddAddressModal(false)} />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-extrabold uppercase text-gray-900">Add New Delivery Address</h3>
              <button onClick={() => setShowAddAddressModal(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
              <input
                type="text"
                placeholder="Phone Number"
                required
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
              <input
                type="text"
                placeholder="6-Digit Indian Pincode"
                required
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
              <input
                type="text"
                placeholder="Flat / House / Building"
                required
                value={newAddr.flatHouse}
                onChange={(e) => setNewAddr({ ...newAddr, flatHouse: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
              <input
                type="text"
                placeholder="Street / Area / Colony"
                required
                value={newAddr.streetArea}
                onChange={(e) => setNewAddr({ ...newAddr, streetArea: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-gray-200"
              />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-black text-white font-bold py-3 rounded-xl">
                  Save Address
                </button>
                <button type="button" onClick={() => setShowAddAddressModal(false)} className="border p-3 rounded-xl font-bold">
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
