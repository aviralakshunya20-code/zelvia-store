'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  CreditCard,
  Truck,
  Plus,
  ArrowRight,
  Sparkles,
  QrCode,
  Smartphone,
  Building2,
  Banknote,
  Lock,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Address } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    cartMrpTotal,
    cartSubtotal,
    cartDiscount,
    couponDiscount,
    shippingFee,
    cartFinalTotal,
    appliedCoupon,
    createOrder,
    showToast,
  } = useStore();

  // Multi-step state: 1 = Address, 2 = Payment
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  // Address Form State
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    flatHouse: '',
    streetArea: '',
    landmark: '',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'Home' as 'Home' | 'Work' | 'Other',
    isDefault: false,
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD' | 'Wallet'>('UPI');
  const [upiId, setUpiId] = useState('priya.sharma@okhdfcbank');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('482');
  const [cardName, setCardName] = useState('Priya Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-xl font-bold text-gray-900">Your bag is empty</h1>
          <p className="text-xs text-gray-500">Please add items to your cart before checking out.</p>
          <Link
            href="/category/women"
            className="inline-block bg-black text-white text-xs font-bold py-3 px-6 rounded-full"
          >
            Shop Trending Styles
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.phone || !newAddr.pincode || !newAddr.flatHouse) {
      showToast('Please fill all required address fields', 'error');
      return;
    }
    const createdId = addAddress(newAddr);
    setSelectedAddressId(createdId);
    setIsAddingNewAddress(false);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder(paymentMethod, paymentMethod === 'COD');
      setIsProcessing(false);
      if (order) {
        showToast('Order Placed Successfully! 🎉', 'success');
        router.push(`/order-success?orderId=${order.id}`);
      }
    }, 1500);
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const codFee = paymentMethod === 'COD' ? 49 : 0;
  const grandTotal = cartFinalTotal + codFee;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header & Steps */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Secure Checkout</span>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center justify-center gap-3 text-xs font-bold">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                activeStep === 1
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#ff2459] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Delivery Address</span>
            </button>

            <ChevronRight className="w-4 h-4 text-gray-400" />

            <button
              onClick={() => {
                if (selectedAddressId) setActiveStep(2);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                activeStep === 2
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#ff2459] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Payment Options</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: ADDRESS */}
            {activeStep === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-rose-50 text-[#ff2459]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-gray-900 uppercase">
                        Select Delivery Address
                      </h2>
                      <p className="text-xs text-gray-500">
                        Where should we deliver your fast-fashion order?
                      </p>
                    </div>
                  </div>

                  {!isAddingNewAddress && (
                    <button
                      onClick={() => setIsAddingNewAddress(true)}
                      className="text-xs font-bold text-[#ff2459] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  )}
                </div>

                {/* Saved Address Cards */}
                {!isAddingNewAddress ? (
                  <div className="space-y-3">
                    {addresses.map((addr) => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between ${
                            isSelected
                              ? 'border-[#ff2459] bg-rose-50/20 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="selectedAddr"
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="accent-[#ff2459] w-4 h-4 mt-1"
                            />
                            <div className="text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-gray-950">
                                  {addr.fullName}
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                  {addr.addressType}
                                </span>
                                {addr.isDefault && (
                                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-700 font-medium">
                                {addr.flatHouse}, {addr.streetArea}
                              </p>
                              {addr.landmark && (
                                <p className="text-gray-500 text-[11px]">
                                  Landmark: {addr.landmark}
                                </p>
                              )}
                              <p className="text-gray-900 font-bold">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              <p className="text-gray-600 font-semibold pt-1">
                                Phone: {addr.phone}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-emerald-600 hidden sm:inline">
                            ⚡ Express Delivery to Pincode {addr.pincode}
                          </span>
                        </div>
                      );
                    })}

                    <div className="pt-4">
                      <button
                        onClick={() => setActiveStep(2)}
                        className="w-full sm:w-auto bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-3.5 px-8 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                      >
                        <span>Deliver to This Address &rarr;</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Add New Address Form */
                  <form onSubmit={handleSaveNewAddress} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.fullName}
                          onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          10-Digit Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newAddr.phone}
                          onChange={(e) =>
                            setNewAddr({ ...newAddr, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })
                          }
                          placeholder="e.g. 9876543210"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          Indian Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.pincode}
                          onChange={(e) =>
                            setNewAddr({
                              ...newAddr,
                              pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                            })
                          }
                          placeholder="e.g. 110001"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          City / District *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Flat / House No. / Building Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.flatHouse}
                        onChange={(e) => setNewAddr({ ...newAddr, flatHouse: e.target.value })}
                        placeholder="Flat 402, Building A"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Road Name / Area / Colony *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddr.streetArea}
                        onChange={(e) => setNewAddr({ ...newAddr, streetArea: e.target.value })}
                        placeholder="Connaught Place, Barakhamba Road"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={newAddr.landmark}
                        onChange={(e) => setNewAddr({ ...newAddr, landmark: e.target.value })}
                        placeholder="Near Metro Station Gate 2"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#ff2459]"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-black hover:bg-neutral-800 text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer"
                      >
                        Save &amp; Use Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNewAddress(false)}
                        className="border border-gray-300 text-gray-700 font-bold text-xs py-3 px-6 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {activeStep === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-rose-50 text-[#ff2459]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-gray-900 uppercase">
                        Select Payment Method
                      </h2>
                      <p className="text-xs text-gray-500">
                        100% Mock Payment Integration • Safe &amp; Instant Verification
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-xs font-bold text-[#ff2459] hover:underline"
                  >
                    Change Address
                  </button>
                </div>

                {/* Delivering To summary banner */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#ff2459] shrink-0" />
                    <span className="text-gray-700">
                      Delivering to: <strong className="text-gray-900">{selectedAddress.fullName}</strong> ({selectedAddress.pincode})
                    </span>
                  </div>
                  <span className="text-emerald-700 font-bold">Express Delivery</span>
                </div>

                {/* Payment Options Grid */}
                <div className="space-y-4">
                  {/* UPI Option */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'border-[#ff2459] bg-rose-50/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('UPI')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'UPI'}
                          onChange={() => setPaymentMethod('UPI')}
                          className="accent-[#ff2459] w-4 h-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-[#ff2459]" />
                            <span className="font-extrabold text-sm text-gray-950">
                              UPI (Google Pay, PhonePe, Paytm, QR)
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Fastest payment • Extra 5% Instant Cashback voucher
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                        RECOMMENDED
                      </span>
                    </div>

                    {paymentMethod === 'UPI' && (
                      <div className="mt-4 pt-4 border-t border-rose-100 space-y-3">
                        <div className="flex gap-2">
                          {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setSelectedUpiApp(app as any)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-xl border uppercase transition-colors ${
                                selectedUpiApp === app
                                  ? 'bg-black text-white border-black'
                                  : 'bg-white text-gray-700 border-gray-200'
                              }`}
                            >
                              {app === 'qr' ? '📷 Scan QR' : app}
                            </button>
                          ))}
                        </div>

                        {selectedUpiApp === 'qr' ? (
                          <div className="text-center py-3 bg-white rounded-xl border border-gray-200 space-y-2">
                            <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto flex items-center justify-center border border-gray-300">
                              <QrCode className="w-24 h-24 text-gray-800" />
                            </div>
                            <p className="text-[11px] text-gray-500">
                              Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
                            </p>
                          </div>
                        ) : (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                              Enter UPI ID / VPA
                            </label>
                            <div className="flex rounded-xl border border-gray-300 overflow-hidden bg-white">
                              <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="username@okhdfcbank"
                                className="flex-1 text-xs px-3.5 py-2.5 outline-none font-semibold text-gray-900"
                              />
                              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-2.5 flex items-center">
                                Verified ✓
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Credit / Debit Card Option */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'Card'
                        ? 'border-[#ff2459] bg-rose-50/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('Card')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentOption"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="accent-[#ff2459] w-4 h-4"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#ff2459]" />
                          <span className="font-extrabold text-sm text-gray-950">
                            Credit / Debit Cards
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          RuPay, Visa, MasterCard, Maestro &amp; Diners
                        </p>
                      </div>
                    </div>

                    {paymentMethod === 'Card' && (
                      <div className="mt-4 pt-4 border-t border-rose-100 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 8901 2345 6789"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white outline-none font-semibold text-gray-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white outline-none font-semibold text-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              maxLength={4}
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white outline-none font-semibold text-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery (COD) */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'COD'
                        ? 'border-[#ff2459] bg-rose-50/20'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('COD')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentOption"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="accent-[#ff2459] w-4 h-4"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4 text-[#ff2459]" />
                            <span className="font-extrabold text-sm text-gray-950">
                              Cash on Delivery (COD)
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Pay in cash or UPI QR at your doorstep upon arrival (+₹49 Handling fee)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4 sticky top-28">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-gray-400 font-normal">{cart.length} items</span>
              </h3>

              {/* Items Preview */}
              <div className="max-h-52 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-50">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 pt-2">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-gray-500 text-[11px]">
                        Qty: {item.quantity} • {item.selectedSize}
                      </p>
                    </div>
                    <span className="text-xs font-black text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold text-gray-900">₹{cartMrpTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount on MRP</span>
                  <span>-₹{cartDiscount}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                {paymentMethod === 'COD' && (
                  <div className="flex justify-between text-amber-700 font-semibold">
                    <span>COD Handling Fee</span>
                    <span>+₹49</span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-950">
                  <span>Total Payable</span>
                  <span className="text-[#ff2459]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                onClick={activeStep === 1 ? () => setActiveStep(2) : handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-extrabold text-xs sm:text-sm py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : activeStep === 1 ? (
                  <>
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ₹{grandTotal} &amp; Place Order</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Safe Payments • 7-Day Doorstep Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
