import { MainCategory } from '@/types';

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'women',
    name: 'WOMEN',
    slug: 'women',
    badge: 'TRENDING',
    columns: [
      {
        title: 'Dresses & Jumpsuits',
        items: [
          { id: 'w-dr-1', name: 'Floral Maxi Dresses', slug: 'floral-maxi-dresses' },
          { id: 'w-dr-2', name: 'Bodycon & Party Dresses', slug: 'bodycon-dresses', badge: 'HOT' },
          { id: 'w-dr-3', name: 'Casual Summer Dresses', slug: 'casual-dresses' },
          { id: 'w-dr-4', name: 'Slip & Satin Dresses', slug: 'satin-dresses' },
          { id: 'w-dr-5', name: 'Wrap & Tiered Midi', slug: 'midi-dresses' },
          { id: 'w-dr-6', name: 'Rompers & Jumpsuits', slug: 'jumpsuits' },
        ],
      },
      {
        title: 'Tops & Co-Ords',
        items: [
          { id: 'w-tp-1', name: 'Corset & Bustier Tops', slug: 'corset-tops', badge: 'VIRAL' },
          { id: 'w-tp-2', name: 'Matching 2-Piece Sets', slug: 'co-ord-sets', badge: 'BESTSELLER' },
          { id: 'w-tp-3', name: 'Crop Tops & Baby Tees', slug: 'crop-tops' },
          { id: 'w-tp-4', name: 'Oversized Graphic Tees', slug: 'graphic-tees' },
          { id: 'w-tp-5', name: 'Satin & Organza Blouses', slug: 'blouses' },
          { id: 'w-tp-6', name: 'Knit & Ribbed Tops', slug: 'knit-tops' },
        ],
      },
      {
        title: 'Bottoms & Denim',
        items: [
          { id: 'w-bt-1', name: 'Wide Leg & Parachute Pants', slug: 'wide-leg-pants', badge: 'TRENDING' },
          { id: 'w-bt-2', name: 'High-Rise Baggy Jeans', slug: 'jeans' },
          { id: 'w-bt-3', name: 'Cargo Pants & Joggers', slug: 'cargos' },
          { id: 'w-bt-4', name: 'Pleated & Tennis Skirts', slug: 'skirts' },
          { id: 'w-bt-5', name: 'Tailored Trousers', slug: 'formal-trousers' },
          { id: 'w-bt-6', name: 'Denim Shorts & Skorts', slug: 'shorts' },
        ],
      },
      {
        title: 'Indian Ethnic & Fusion',
        items: [
          { id: 'w-et-1', name: 'Printed Anarkali Sets', slug: 'anarkali-sets' },
          { id: 'w-et-2', name: 'Fusion Kurti Tops', slug: 'fusion-kurtis', badge: 'POPULAR' },
          { id: 'w-et-3', name: 'Festive Co-ords', slug: 'festive-coords' },
          { id: 'w-et-4', name: 'Georgette Dupattas', slug: 'dupattas' },
          { id: 'w-et-5', name: 'Indo-Western Palazzos', slug: 'ethnic-bottoms' },
        ],
      },
      {
        title: 'Curated Edits',
        items: [
          { id: 'w-ed-1', name: 'Under ₹499 Bazaar', slug: 'under-499', badge: 'STEAL' },
          { id: 'w-ed-2', name: 'Under ₹999 Runway', slug: 'under-999' },
          { id: 'w-ed-3', name: 'Airport Outfits', slug: 'airport-fits' },
          { id: 'w-ed-4', name: 'College Essentials', slug: 'college-fits' },
          { id: 'w-ed-5', name: 'Vacay Vibes', slug: 'vacay-vibes' },
        ],
      },
    ],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
      title: 'SUMMER SUNSET DROP',
      subtitle: 'Up to 70% Off • Starting ₹399',
      link: '/category/women',
    },
  },
  {
    id: 'men',
    name: 'MEN',
    slug: 'men',
    columns: [
      {
        title: 'Tops & Tees',
        items: [
          { id: 'm-tp-1', name: 'Oversized Anime & Graphic Tees', slug: 'oversized-tees', badge: 'HOT' },
          { id: 'm-tp-2', name: 'Cuban Collar Shirts', slug: 'cuban-collar-shirts' },
          { id: 'm-tp-3', name: 'Drop Shoulder Solid T-Shirts', slug: 'solid-tees' },
          { id: 'm-tp-4', name: 'Linen & Textured Shirts', slug: 'linen-shirts' },
          { id: 'm-tp-5', name: 'Polo & Zip-Up Knits', slug: 'polos' },
        ],
      },
      {
        title: 'Bottomwear',
        items: [
          { id: 'm-bt-1', name: 'Multi-Pocket Street Cargos', slug: 'men-cargos', badge: 'TRENDING' },
          { id: 'm-bt-2', name: 'Relaxed Fit Denim Jeans', slug: 'men-jeans' },
          { id: 'm-bt-3', name: 'Linen Drawstring Pants', slug: 'linen-pants' },
          { id: 'm-bt-4', name: 'Chino Trousers & Shorts', slug: 'men-shorts' },
          { id: 'm-bt-5', name: 'Acid Wash Joggers', slug: 'joggers' },
        ],
      },
      {
        title: 'Outerwear & Jackets',
        items: [
          { id: 'm-ot-1', name: 'Varsity & Bomber Jackets', slug: 'bombers' },
          { id: 'm-ot-2', name: 'Oversized Hoodies & Sweats', slug: 'hoodies' },
          { id: 'm-ot-3', name: 'Denim Trucker Jackets', slug: 'denim-jackets' },
          { id: 'm-ot-4', name: 'Corduroy Overshirts', slug: 'overshirts' },
        ],
      },
      {
        title: 'Ethnic & Special',
        items: [
          { id: 'm-et-1', name: 'Modern Short Kurtas', slug: 'short-kurtas' },
          { id: 'm-et-2', name: 'Nehru Jackets & Sets', slug: 'nehru-jackets' },
          { id: 'm-et-3', name: 'Under ₹599 Steals', slug: 'men-under-599' },
        ],
      },
    ],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop',
      title: 'STREET CULTURE DROP',
      subtitle: 'Oversized Tees & Cargos • From ₹449',
      link: '/category/men',
    },
  },
  {
    id: 'curve',
    name: 'CURVE + PLUS',
    slug: 'curve',
    badge: 'NEW',
    columns: [
      {
        title: 'Curve Fits',
        items: [
          { id: 'c-1', name: 'Plus Size Party Dresses (1XL-5XL)', slug: 'plus-dresses', badge: 'POPULAR' },
          { id: 'c-2', name: 'Curve Wrap & Maxi Dresses', slug: 'curve-maxi' },
          { id: 'c-3', name: 'Flattering Peplum & Ruched Tops', slug: 'curve-tops' },
          { id: 'c-4', name: 'High-Stretch Comfort Denim', slug: 'curve-denim' },
          { id: 'c-5', name: 'Chic Co-ord Sets', slug: 'curve-coords' },
        ],
      },
      {
        title: 'By Size',
        items: [
          { id: 'cs-1', name: 'Size 1XL (UK 16 / US 12)', slug: 'size-1xl' },
          { id: 'cs-2', name: 'Size 2XL (UK 18 / US 14)', slug: 'size-2xl' },
          { id: 'cs-3', name: 'Size 3XL (UK 20 / US 16)', slug: 'size-3xl' },
          { id: 'cs-4', name: 'Size 4XL-5XL', slug: 'size-4xl' },
        ],
      },
    ],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
      title: 'LOVE YOUR CURVES',
      subtitle: 'Tailored for You • Up to 65% OFF',
      link: '/category/curve',
    },
  },
  {
    id: 'accessories',
    name: 'SHOES & BAGS & ACCS',
    slug: 'accessories',
    columns: [
      {
        title: 'Footwear',
        items: [
          { id: 'a-fw-1', name: 'Chunky Y2K Platform Sneakers', slug: 'sneakers', badge: 'TREND' },
          { id: 'a-fw-2', name: 'Strappy Block Heels', slug: 'heels' },
          { id: 'a-fw-3', name: 'Slide Sandals & Mules', slug: 'sandals' },
          { id: 'a-fw-4', name: 'Boots & Loafers', slug: 'boots' },
        ],
      },
      {
        title: 'Bags & Wallets',
        items: [
          { id: 'a-bg-1', name: 'Quilted Shoulder Bags', slug: 'shoulder-bags', badge: 'MUST HAVE' },
          { id: 'a-bg-2', name: 'Canvas & Leather Totes', slug: 'tote-bags' },
          { id: 'a-bg-3', name: 'Mini Crossbody Bags', slug: 'crossbody' },
          { id: 'a-bg-4', name: 'Clutches & Party Pouches', slug: 'party-bags' },
        ],
      },
      {
        title: 'Jewellery & Accent',
        items: [
          { id: 'a-jw-1', name: 'Layered Gold Necklaces', slug: 'necklaces' },
          { id: 'a-jw-2', name: 'Chunky Hoop Earrings', slug: 'earrings' },
          { id: 'a-jw-3', name: 'Retro Sunglasses (UV Protected)', slug: 'sunglasses' },
          { id: 'a-jw-4', name: 'Statement Belts & Hair Claw Clips', slug: 'hair-accs' },
        ],
      },
    ],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      title: 'IT-GIRL ACCESSORIES',
      subtitle: 'Bags, Bling & Sunglasses from ₹199',
      link: '/category/accessories',
    },
  },
  {
    id: 'sale',
    name: '⚡ FLASH SALE',
    slug: 'sale',
    badge: 'UP TO 80%',
    columns: [
      {
        title: 'Price Stores',
        items: [
          { id: 's-1', name: '🔥 Under ₹299 Crazy Steals', slug: 'under-299', badge: 'CRAZY' },
          { id: 's-2', name: '⚡ Under ₹499 Fast Selling', slug: 'under-499' },
          { id: 's-3', name: '✨ Under ₹799 Premium Picks', slug: 'under-799' },
          { id: 's-4', name: '🏷️ Flat 70% Off Clearance', slug: 'flat-70-off' },
        ],
      },
      {
        title: 'Special Combos',
        items: [
          { id: 'sc-1', name: 'Buy 2 Get 1 FREE', slug: 'buy2-get1', badge: 'OFFER' },
          { id: 'sc-2', name: 'Flat ₹200 OFF on ₹999+', slug: 'flat-200' },
          { id: 'sc-3', name: 'First App/Web Order 20% OFF', slug: 'first-order' },
        ],
      },
    ],
    featuredImage: {
      src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop',
      title: 'MEGA MIDNIGHT SALE',
      subtitle: 'Extra 20% Applied at Checkout',
      link: '/category/sale',
    },
  },
];

export const TOP_STORY_CATEGORIES = [
  { id: 'cat-1', name: 'Dresses', slug: 'floral-maxi-dresses', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=300&auto=format&fit=crop', badge: 'HOT' },
  { id: 'cat-2', name: 'Co-Ords', slug: 'co-ord-sets', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=300&auto=format&fit=crop', badge: '70% OFF' },
  { id: 'cat-3', name: 'Oversized', slug: 'graphic-tees', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=300&auto=format&fit=crop', badge: 'NEW' },
  { id: 'cat-4', name: 'Cargos', slug: 'cargos', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=300&auto=format&fit=crop' },
  { id: 'cat-5', name: 'Ethnic Sets', slug: 'anarkali-sets', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop', badge: 'FESTIVE' },
  { id: 'cat-6', name: 'Under ₹499', slug: 'under-499', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop', badge: 'STEAL' },
  { id: 'cat-7', name: 'Bags', slug: 'shoulder-bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=300&auto=format&fit=crop' },
  { id: 'cat-8', name: 'Men Street', slug: 'men', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=300&auto=format&fit=crop' },
  { id: 'cat-9', name: 'Party Bling', slug: 'bodycon-dresses', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=300&auto=format&fit=crop' },
  { id: 'cat-10', name: 'Footwear', slug: 'sneakers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop' },
];
