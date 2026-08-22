'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Package, Truck, CheckCircle2, ChevronRight, ShieldCheck, MapPin } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Order } from '@/types';

export default function TrackOrderPage() {
  const { orders } = useStore();
  const [orderQuery, setOrderQuery] = useState('ZEL-9281736');
  const [phoneQuery, setPhoneQuery] = useState('9876543210');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(orderQuery.trim().toLowerCase()) ||
        o.id.toLowerCase().includes(orderQuery.trim().toLowerCase())
    );
    setSearchedOrder(found || orders[0] || null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-bold">Track Shipment</span>
        </div>

        {/* Search Portal Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-50 text-[#ff2459]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-950 uppercase">Fast Order Tracking</h1>
              <p className="text-xs text-gray-500">
                Track your parcel&apos;s live status across 25,000+ Indian courier hubs
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Order Number / ID
                </label>
                <input
                  type="text"
                  required
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. ZEL-9281736"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 uppercase font-semibold outline-none focus:border-[#ff2459]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={phoneQuery}
                  onChange={(e) => setPhoneQuery(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 font-semibold outline-none focus:border-[#ff2459]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Track Live Status</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Result */}
        {hasSearched && searchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-gray-950">{searchedOrder.orderNumber}</span>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {searchedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Placed on {searchedOrder.date} • Courier: Delhivery Express
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-gray-400 font-semibold block uppercase">Estimated Delivery</span>
                <span className="text-sm font-black text-emerald-700">{searchedOrder.estimatedDelivery}</span>
              </div>
            </div>

            {/* Step-by-Step Tracking Graph */}
            <div className="space-y-4 pt-2">
              {searchedOrder.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 text-xs">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.completed
                          ? 'bg-[#ff2459] text-white shadow-xs'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    {idx < searchedOrder.trackingSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.completed ? 'bg-[#ff2459]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <p className={`font-bold text-sm ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.status}
                      </p>
                      <span className="text-[11px] text-gray-400">{step.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{step.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Address */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <MapPin className="w-3.5 h-3.5 text-[#ff2459]" />
                <span>Destination Address</span>
              </div>
              <p className="text-gray-700">
                {searchedOrder.shippingAddress.fullName} • {searchedOrder.shippingAddress.flatHouse}, {searchedOrder.shippingAddress.streetArea}, {searchedOrder.shippingAddress.city} - {searchedOrder.shippingAddress.pincode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
