import { Coupon } from '@/types';

export const COUPONS: Coupon[] = [
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 499,
    maxDiscount: 300,
    description: 'Get 20% OFF on your first order (Max ₹300)',
    expiresAt: '2026-12-31',
  },
  {
    code: 'ZELVIA100',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 799,
    description: 'Flat ₹100 OFF on orders above ₹799',
    expiresAt: '2026-12-31',
  },
  {
    code: 'FLASH50',
    discountType: 'flat',
    discountValue: 50,
    minOrderValue: 299,
    description: 'Instant ₹50 savings on any flash sale purchase',
    expiresAt: '2026-12-31',
  },
  {
    code: 'FESTIVE25',
    discountType: 'percentage',
    discountValue: 25,
    minOrderValue: 1499,
    maxDiscount: 500,
    description: 'Festival Special: 25% OFF on cart value ₹1,499+ (Max ₹500)',
    expiresAt: '2026-12-31',
  },
  {
    code: 'FREESHIP',
    discountType: 'flat',
    discountValue: 99,
    minOrderValue: 0,
    description: 'Free standard shipping on all orders',
    expiresAt: '2026-12-31',
  },
];
