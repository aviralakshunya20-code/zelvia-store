'use client';

import React, { useState } from 'react';
import { X, Smartphone, Mail, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useStore();
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'phone') {
      if (!phone || phone.length < 10) return;
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep('otp');
        setOtp('7392'); // Auto demo OTP for smooth flow
      }, 500);
    } else {
      if (!email) return;
      login(phone || '+91 98765 43210', name || 'Fashion Insider', email);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(
        phone ? `+91 ${phone}` : '+91 98765 43210',
        name || 'Fashion Insider',
        email || 'insider@zelvia.in'
      );
      setStep('input');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login('+91 98765 43210', 'Priya Sharma', 'priya.sharma@gmail.com');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Banner */}
        <div className="bg-gradient-to-r from-black via-neutral-900 to-rose-950 text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black tracking-tight text-white">ZELVIA</span>
            <span className="text-[10px] bg-[#ff2459] text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
              CLUB
            </span>
          </div>
          <h3 className="text-lg font-bold text-white">Sign In & Unlock ₹150 OFF</h3>
          <p className="text-xs text-rose-200 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff2459]" />
            Free Express Delivery + VIP Flash Sales
          </p>
        </div>

        <div className="p-6">
          {step === 'input' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2459] focus:ring-1 focus:ring-[#ff2459] outline-none"
                />
              </div>

              {authMethod === 'phone' ? (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Mobile Number (10 Digits)
                  </label>
                  <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#ff2459] focus-within:ring-1 focus-within:ring-[#ff2459]">
                    <span className="bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold px-3 py-2.5 flex items-center border-r border-gray-200">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      required
                      className="flex-1 text-xs sm:text-sm px-3 py-2.5 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2459] focus:ring-1 focus:ring-[#ff2459] outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'Sending OTP...' : 'Get Instant OTP / Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMethod(authMethod === 'phone' ? 'email' : 'phone')}
                  className="text-gray-700 hover:text-[#ff2459] font-medium underline"
                >
                  Use {authMethod === 'phone' ? 'Email instead' : 'Mobile Number instead'}
                </button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl text-xs font-bold text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                Google 1-Click Sign In (Mock)
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Enter 4-digit code sent to <strong className="text-gray-800">+91 {phone}</strong>
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                  (Demo OTP autofilled: <strong>{otp}</strong>)
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 4))}
                  placeholder="• • • •"
                  maxLength={4}
                  required
                  className="w-full text-center text-2xl tracking-[0.5em] font-black py-2.5 rounded-xl border border-gray-200 focus:border-[#ff2459] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff2459] hover:bg-[#e01648] text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-gray-700 hover:text-[#ff2459] font-medium"
                >
                  Change Number
                </button>
                <button
                  type="button"
                  onClick={() => setOtp('8492')}
                  className="text-[#ff2459] hover:underline font-bold"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Safe & Secure Login • Fast Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
