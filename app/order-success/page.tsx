'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders, showToast } = useStore();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  const handleDownloadInvoice = () => {
    window.print();
    showToast('Invoice generated for printing/download!', 'success');
  };

  if (!currentOrder) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <h1 className="text-xl font-bold text-gray-900">No active order found</h1>
          <Link href="/" className="inline-block bg-black text-white text-xs font-bold py-3 px-6 rounded-full">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Celebration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md text-center space-y-4 mb-8 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              ORDER CONFIRMED &amp; DISPATCHING
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2">
              Thank You for Shopping with ZELVIA!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
              We have received your order. A confirmation SMS with tracking details has been dispatched to{' '}
              <strong className="text-gray-900">{currentOrder.shippingAddress.phone}</strong>.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-bold bg-gray-50 border border-gray-200 p-3 rounded-2xl">
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Order Reference</span>
              <span className="text-gray-900">{currentOrder.orderNumber}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Estimated Delivery</span>
              <span className="text-emerald-700">{currentOrder.estimatedDelivery}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div>
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Total Paid</span>
              <span className="text-[#ff2459]">₹{currentOrder.pricing.finalAmount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadInvoice}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 px-5 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Invoice</span>
            </button>
            <Link
              href="/account"
              className="bg-black hover:bg-neutral-800 text-white font-bold text-xs py-2.5 px-5 rounded-full flex items-center gap-1.5 transition-colors"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Track Live Status in My Orders</span>
            </Link>
          </div>
        </div>

        {/* Live Tracking Stages */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#ff2459]" />
              <span>Live Courier Dispatch Timeline</span>
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Express Courier Assigned
            </span>
          </div>

          <div className="space-y-4">
            {currentOrder.trackingSteps.map((step, idx) => (
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
                  {idx < currentOrder.trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        step.completed ? 'bg-[#ff2459]' : 'bg-gray-200'
                      }`}
                    />
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
        </div>

        {/* Items List & Details Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            Purchased Fashion Items ({currentOrder.items.length})
          </h2>

          <div className="divide-y divide-gray-100 space-y-3">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 pt-3">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-gray-900 truncate">{item.product.name}</h4>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    Color: {item.selectedColor} • Size: {item.selectedSize} • Qty: {item.quantity}
                  </p>
                  <p className="text-gray-400 text-[10px]">Brand: {item.product.brand}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-gray-950 block">
                    ₹{item.product.price * item.quantity}
                  </span>
                  <span className="text-[10px] text-gray-400 line-through">
                    ₹{item.product.mrp * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
            >
              Continue Shopping &rarr;
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>7-Day Return &amp; Exchange guarantee included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
