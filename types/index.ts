export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  gender: 'women' | 'men' | 'curve' | 'unisex' | 'accessories';
  subcategory: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: {
    size: string;
    stock: number;
  }[];
  tag?: 'HOT' | 'BESTSELLER' | 'NEW' | 'FLASH DEAL' | 'TRENDING' | 'LIMITED' | '70% OFF';
  description: string;
  details: {
    fabric: string;
    fit: string;
    pattern: string;
    neckline?: string;
    sleeveLength?: string;
    occasion: string;
    careInstructions: string;
    countryOfOrigin: string;
  };
  isCodAvailable: boolean;
  isFlashSale?: boolean;
  flashSaleClaimedPercent?: number;
  soldCountLast7Days?: number;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: CategoryItem[];
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  columns: MegaMenuColumn[];
  featuredImage?: {
    src: string;
    title: string;
    subtitle: string;
    link: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  isVerifiedBuyer: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  images?: string[];
  sizePurchased: string;
  colorPurchased: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
  helpfulVotes: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiresAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  flatHouse: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export type OrderStatus = 'Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned';

export interface TrackingStep {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  isCurrent?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  pricing: {
    totalMrp: number;
    discountOnMrp: number;
    couponDiscount: number;
    shippingFee: number;
    codFee: number;
    finalAmount: number;
  };
  couponApplied?: string;
  status: OrderStatus;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  cancelReason?: string;
  returnReason?: string;
}

export interface FilterState {
  category: string;
  gender: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  discounts: number[];
  occasions: string[];
  inStockOnly: boolean;
  codOnly: boolean;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'discount-desc' | 'rating-desc';
}
