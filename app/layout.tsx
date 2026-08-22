import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { MobileNav } from '@/components/common/MobileNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/common/AuthModal';
import { ToastContainer } from '@/components/common/ToastContainer';

export const metadata: Metadata = {
  title: 'ZELVIA India | Fast Fashion, Indian Soul',
  description:
    'Discover trending fast fashion in India. Dresses, tops, streetwear, denim, and accessories with Cash On Delivery & 7-day easy doorstep returns.',
  keywords: [
    'fashion e-commerce india',
    'fast fashion',
    'shein india alternative',
    'floral dresses',
    'oversized tees',
    'cargos',
    'bodycon dress',
    'online shopping india',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased flex flex-col min-h-screen bg-white text-gray-900">
        <StoreProvider>
          {/* Top Promotional Bar */}
          <AnnouncementBar />

          {/* Sticky Header with Search & Mega Menu */}
          <Header />

          {/* Page Content */}
          <div className="flex-1 pb-16 lg:pb-0">{children}</div>

          {/* Sliding Cart Drawer */}
          <CartDrawer />

          {/* Login/Signup Modal */}
          <AuthModal />

          {/* Global Notification Toasts */}
          <ToastContainer />

          {/* Mobile Bottom Sticky Navigation */}
          <MobileNav />

          {/* Footer */}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
