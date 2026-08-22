'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem, Address, Order, Coupon, TrackingStep, OrderStatus } from '@/types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '@/data/products';
import { COUPONS as DEFAULT_COUPONS } from '@/data/coupons';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcements: string[];
  announcementCode: string;
  freeShippingThreshold: number;
  codFee: number;
  merchantUpiId: string;
  supportPhone: string;
  supportEmail: string;
  instagramHandle: string;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'ZELVIA INDIA',
  tagline: 'FAST FASHION, INDIAN SOUL',
  announcements: [
    '⚡ MEGA MIDNIGHT DROP: Flat 70% OFF + Extra 20% on First Order with code WELCOME20',
    '🚚 FREE Express Shipping across India on all orders above ₹799!',
    '💸 Cash On Delivery (COD) Available on 25,000+ Indian Pincodes • 7-Day Easy Returns',
  ],
  announcementCode: 'WELCOME20',
  freeShippingThreshold: 799,
  codFee: 49,
  merchantUpiId: 'zelvia.pay@okhdfcbank',
  supportPhone: '+91 98765 43210',
  supportEmail: 'support@zelvia.in',
  instagramHandle: '@zelvia.india',
};

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Priya Sharma',
    phone: '+91 98765 43210',
    pincode: '110001',
    flatHouse: 'Flat 402, Royal Palms Apartments',
    streetArea: 'Barakhamba Road, Connaught Place',
    landmark: 'Near Metro Station Gate 2',
    city: 'New Delhi',
    state: 'Delhi',
    addressType: 'Home',
    isDefault: true,
  },
  {
    id: 'addr-2',
    fullName: 'Priya Sharma (Office)',
    phone: '+91 98765 43210',
    pincode: '560001',
    flatHouse: 'Level 5, Cyber Tech Tower',
    streetArea: 'MG Road, Ashok Nagar',
    landmark: 'Opposite Metro Pillar 114',
    city: 'Bengaluru',
    state: 'Karnataka',
    addressType: 'Work',
    isDefault: false,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ZEL-9281736',
    date: '18 Aug 2026',
    items: [
      {
        productId: 'zel-001',
        product: DEFAULT_PRODUCTS[0],
        selectedColor: 'Vintage Rose',
        selectedSize: 'S',
        quantity: 1,
        addedAt: Date.now() - 300000000,
      },
      {
        productId: 'zel-013',
        product: DEFAULT_PRODUCTS[12],
        selectedColor: '18K Yellow Gold',
        selectedSize: 'Adjustable Extender',
        quantity: 1,
        addedAt: Date.now() - 300000000,
      },
    ],
    shippingAddress: INITIAL_ADDRESSES[0],
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    pricing: {
      totalMrp: 3498,
      discountOnMrp: 2350,
      couponDiscount: 100,
      shippingFee: 0,
      codFee: 0,
      finalAmount: 1048,
    },
    couponApplied: 'ZELVIA100',
    status: 'Shipped',
    estimatedDelivery: '23 Aug 2026',
    trackingSteps: [
      { status: 'Order Placed & Confirmed', location: 'ZELVIA HQ, Gurugram', timestamp: '18 Aug, 10:30 AM', completed: true },
      { status: 'Packed & Dispatched', location: 'North India Central Hub, Manesar', timestamp: '19 Aug, 04:15 PM', completed: true },
      { status: 'In Transit', location: 'Delhi Courier Sorting Facility', timestamp: '20 Aug, 08:00 AM', completed: true, isCurrent: true },
      { status: 'Out for Delivery', location: 'Connaught Place Delivery Center', timestamp: 'Expected 23 Aug', completed: false },
      { status: 'Delivered', location: 'Delivery to Doorstep', timestamp: 'Expected 23 Aug', completed: false },
    ],
  },
];

interface StoreContextType {
  // Products (Dynamic Store Catalog)
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetDefaultProducts: () => void;

  // Store Settings (Admin Configurable)
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: string, selectedSize: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, selectedColor: string, selectedSize: string, quantity: number) => void;
  removeFromCart: (productId: string, selectedColor: string, selectedSize: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Cart Calculations
  cartCount: number;
  cartMrpTotal: number;
  cartSubtotal: number;
  cartDiscount: number;
  couponDiscount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  cartFinalTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;

  // Auth & Profile
  user: UserProfile;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (phone: string, name?: string, email?: string) => void;
  logout: () => void;

  // Addresses
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => string;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (paymentMethod: Order['paymentMethod'], isCod: boolean) => Order | null;
  cancelOrder: (orderId: string, reason: string) => void;
  returnOrder: (orderId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, location?: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Quick search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['zel-002', 'zel-012']);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['zel-001', 'zel-003', 'zel-007']);
  const [user, setUser] = useState<UserProfile>({
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya.sharma@example.in',
    isLoggedIn: true,
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(INITIAL_ADDRESSES[0].id);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const savedProducts = localStorage.getItem('zelvia_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedSettings = localStorage.getItem('zelvia_settings');
      if (savedSettings) setStoreSettings(JSON.parse(savedSettings));

      const savedCoupons = localStorage.getItem('zelvia_coupons');
      if (savedCoupons) setCoupons(JSON.parse(savedCoupons));

      const savedCart = localStorage.getItem('zelvia_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('zelvia_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('zelvia_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedAddresses = localStorage.getItem('zelvia_addresses');
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));

      const savedUser = localStorage.getItem('zelvia_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch {
      // Fallback
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('zelvia_products', JSON.stringify(products));
      localStorage.setItem('zelvia_settings', JSON.stringify(storeSettings));
      localStorage.setItem('zelvia_coupons', JSON.stringify(coupons));
      localStorage.setItem('zelvia_cart', JSON.stringify(cart));
      localStorage.setItem('zelvia_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('zelvia_orders', JSON.stringify(orders));
      localStorage.setItem('zelvia_addresses', JSON.stringify(addresses));
      localStorage.setItem('zelvia_user', JSON.stringify(user));
    }
  }, [products, storeSettings, coupons, cart, wishlist, orders, addresses, user, isClient]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Product CRUD
  const addProduct = useCallback((productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = 'zel-' + String(Date.now()).slice(-4);
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name.slice(0, 20)}..." created!`, 'success');
  }, [showToast]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully!', 'success');
  }, [showToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from store', 'info');
  }, [showToast]);

  const resetDefaultProducts = useCallback(() => {
    setProducts(DEFAULT_PRODUCTS);
    setCoupons(DEFAULT_COUPONS);
    setStoreSettings(DEFAULT_SETTINGS);
    showToast('Store data reset to default catalog', 'info');
  }, [showToast]);

  const updateStoreSettings = useCallback((updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...updates }));
    showToast('Store settings updated!', 'success');
  }, [showToast]);

  // Cart operations
  const addToCart = useCallback((product: Product, selectedColor: string, selectedSize: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          product,
          selectedColor,
          selectedSize,
          quantity,
          addedAt: Date.now(),
        },
      ];
    });
    showToast(`Added "${product.name.slice(0, 24)}..." to Bag!`, 'success');
  }, [showToast]);

  const updateCartQuantity = useCallback((productId: string, selectedColor: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) =>
        prev.filter(
          (item) => !(item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
        )
      );
      showToast('Item removed from Bag', 'info');
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  }, [showToast]);

  const removeFromCart = useCallback((productId: string, selectedColor: string, selectedSize: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
    showToast('Item removed from Bag', 'info');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Saved Items', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  // Fixed addToRecentlyViewed: checks first item before updating state to prevent infinite loops
  const addToRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      if (prev[0] === productId) return prev; // Avoid unnecessary re-renders
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  }, []);

  const login = useCallback((phone: string, name = 'Valued Customer', email = 'customer@zelvia.in') => {
    const updated = { phone, name, email, isLoggedIn: true };
    setUser(updated);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name}! 🎉`, 'success');
  }, [showToast]);

  const logout = useCallback(() => {
    setUser({ name: '', phone: '', email: '', isLoggedIn: false });
    showToast('Logged out successfully', 'info');
  }, [showToast]);

  const addAddress = useCallback((address: Omit<Address, 'id'>) => {
    const newId = 'addr-' + Date.now();
    const newAddr: Address = { ...address, id: newId };
    if (address.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    setSelectedAddressId(newId);
    showToast('Delivery address saved!', 'success');
    return newId;
  }, [showToast]);

  const updateAddress = useCallback((id: string, updated: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return { ...a, ...updated };
        }
        if (updated.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    showToast('Address updated!', 'success');
  }, [showToast]);

  const deleteAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted', 'info');
  }, [showToast]);

  // Pricing calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartMrpTotal = cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = cartMrpTotal - cartSubtotal;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.discountValue) / 100;
      couponDiscount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      couponDiscount = appliedCoupon.discountValue;
    }
  }

  const shippingFee = cartSubtotal >= storeSettings.freeShippingThreshold || cartSubtotal === 0 || appliedCoupon?.code === 'FREESHIP' ? 0 : 99;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / storeSettings.freeShippingThreshold) * 100));
  const cartFinalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const applyCoupon = useCallback((code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Min order value for ${found.code} is ₹${found.minOrderValue}. Add more items!`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! 🎉`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  }, [coupons, cartSubtotal, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  }, [showToast]);

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev.filter((c) => c.code !== newCoupon.code)]);
    showToast(`Coupon "${newCoupon.code}" added!`, 'success');
  }, [showToast]);

  const deleteCoupon = useCallback((code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon "${code}" deleted`, 'info');
  }, [showToast]);

  const createOrder = useCallback((paymentMethod: Order['paymentMethod'], isCod: boolean) => {
    if (cart.length === 0) return null;
    const selectedAddr = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const codFee = isCod ? storeSettings.codFee : 0;
    const finalAmount = cartFinalTotal + codFee;
    const orderNumber = 'ZEL-' + Math.floor(1000000 + Math.random() * 9000000);
    const orderId = 'ord-' + Date.now();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      shippingAddress: selectedAddr,
      paymentMethod,
      paymentStatus: isCod ? 'Pending' : 'Paid',
      pricing: {
        totalMrp: cartMrpTotal,
        discountOnMrp: cartDiscount,
        couponDiscount,
        shippingFee,
        codFee,
        finalAmount,
      },
      couponApplied: appliedCoupon?.code,
      status: 'Placed',
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      trackingSteps: [
        { status: 'Order Placed & Confirmed', location: 'ZELVIA Online Store', timestamp: 'Just now', completed: true, isCurrent: true },
        { status: 'Packed & Quality Checked', location: 'Gurugram Fulfillment Hub', timestamp: 'Pending', completed: false },
        { status: 'In Transit with Express Courier', location: 'Regional Sorting Facility', timestamp: 'Pending', completed: false },
        { status: 'Out for Delivery', location: `${selectedAddr.city} Delivery Center`, timestamp: 'Pending', completed: false },
        { status: 'Delivered', location: 'At Doorstep', timestamp: 'Pending', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  }, [cart, addresses, selectedAddressId, storeSettings.codFee, cartFinalTotal, cartMrpTotal, cartDiscount, couponDiscount, shippingFee, appliedCoupon, clearCart]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus, location = 'Hub') => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const updatedSteps = o.trackingSteps.map((step) => {
          if (step.status.toLowerCase().includes(status.toLowerCase())) {
            return { ...step, completed: true, isCurrent: true, timestamp: 'Just now', location };
          }
          return step;
        });
        return {
          ...o,
          status,
          paymentStatus: status === 'Delivered' && o.paymentMethod === 'COD' ? 'Paid' : o.paymentStatus,
          trackingSteps: updatedSteps,
        };
      })
    );
    showToast(`Order status updated to: ${status}`, 'success');
  }, [showToast]);

  const cancelOrder = useCallback((orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Cancelled',
              cancelReason: reason,
              trackingSteps: [
                ...o.trackingSteps,
                { status: 'Order Cancelled', location: 'Customer Request', timestamp: 'Just now', completed: true, isCurrent: true },
              ],
            }
          : o
      )
    );
    showToast('Order cancelled successfully', 'info');
  }, [showToast]);

  const returnOrder = useCallback((orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Returned',
              returnReason: reason,
              trackingSteps: [
                ...o.trackingSteps,
                { status: 'Return & Doorstep Pickup Scheduled', location: 'Courier Agent Assigned', timestamp: 'Just now', completed: true, isCurrent: true },
              ],
            }
          : o
      )
    );
    showToast('Doorstep return & refund request initiated! 🚚', 'success');
  }, [showToast]);

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultProducts,
        storeSettings,
        updateStoreSettings,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        cartCount,
        cartMrpTotal,
        cartSubtotal,
        cartDiscount,
        couponDiscount,
        shippingFee,
        freeShippingThreshold: storeSettings.freeShippingThreshold,
        freeShippingProgress,
        cartFinalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        logout,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        orders,
        createOrder,
        cancelOrder,
        returnOrder,
        updateOrderStatus,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
