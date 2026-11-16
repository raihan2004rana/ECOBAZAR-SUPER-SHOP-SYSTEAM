'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Clock,
  Plus,
  Minus,
} from 'lucide-react';
import {
  Button,
  Badge,
  PriceDisplay,
  ToastProvider,
  useToast,
} from '@ecobazar/ui';

interface ProductItem {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  origin: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

const categories = [
  {
    id: 'veg',
    name: 'Fresh Vegetables',
    nameBn: 'তাজা শাকসবজি',
    count: '145+ Products',
    bgColor: 'bg-[#EBF7EE]',
    hoverBorder: 'hover:border-emerald-300',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=350&auto=format&fit=crop&q=80',
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    nameBn: 'তাজা ফলমূল',
    count: '92+ Products',
    bgColor: 'bg-[#E9F5FB]',
    hoverBorder: 'hover:border-sky-300',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=350&auto=format&fit=crop&q=80',
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    nameBn: 'দুধ ও ডিম',
    count: '64+ Products',
    bgColor: 'bg-[#EFF2FC]',
    hoverBorder: 'hover:border-indigo-300',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=350&auto=format&fit=crop&q=80',
  },
  {
    id: 'bakery',
    name: 'Bakery & Snacks',
    nameBn: 'বেকারি ও স্ন্যাকস',
    count: '48+ Products',
    bgColor: 'bg-[#FDF0EB]',
    hoverBorder: 'hover:border-orange-300',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&auto=format&fit=crop&q=80',
  },
  {
    id: 'meat',
    name: 'Meat & Fish',
    nameBn: 'মাংস ও মাছ',
    count: '75+ Products',
    bgColor: 'bg-[#FDECEE]',
    hoverBorder: 'hover:border-rose-300',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=350&auto=format&fit=crop&q=80',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    nameBn: 'পানীয় সামগ্রী',
    count: '86+ Products',
    bgColor: 'bg-[#FEF8EB]',
    hoverBorder: 'hover:border-amber-300',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=350&auto=format&fit=crop&q=80',
  },
];

const products: ProductItem[] = [
  {
    id: 'p1',
    name: 'Organic Red Tomatoes',
    nameBn: 'অর্গানিক লাল পাকা টমেটো',
    category: 'Fresh Vegetables',
    origin: 'Bogura Organic Farms',
    price: 85,
    originalPrice: 110,
    unit: 'per kg',
    rating: 4.9,
    reviews: 124,
    badge: 'Fresh Daily',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Farm Fresh Brown Eggs',
    nameBn: 'ফার্মের তাজা লাল ডিম',
    category: 'Dairy & Eggs',
    origin: 'Gazipur Layer Farm',
    price: 145,
    originalPrice: 160,
    unit: '12 pcs',
    rating: 4.8,
    reviews: 210,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Fresh Sagor Bananas',
    nameBn: 'নরসিংদীর সাগর কলা',
    category: 'Fresh Fruits',
    origin: 'Narsingdi Orchard',
    price: 95,
    unit: 'per dozen',
    rating: 4.9,
    reviews: 86,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Fresh Pure Whole Cow Milk',
    nameBn: 'খাঁটি তরল গরুর দুধ',
    category: 'Dairy & Eggs',
    origin: 'Pabna Dairy Hub',
    price: 90,
    originalPrice: 100,
    unit: '1 Litre',
    rating: 5.0,
    reviews: 312,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p5',
    name: 'Premium Basmati Rice (Aromatic)',
    nameBn: 'প্রিমিয়াম সুগন্ধি বাসমতী চাল',
    category: 'Rice & Staples',
    origin: 'Dinajpur Special Reserve',
    price: 380,
    originalPrice: 420,
    unit: '2 kg pack',
    rating: 4.9,
    reviews: 94,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p6',
    name: 'Seedless Crisp Green Grapes',
    nameBn: 'তাজা সবুজ মিষ্টি আঙ্গুর',
    category: 'Fresh Fruits',
    origin: 'Imported Quality Grade A',
    price: 260,
    originalPrice: 300,
    unit: '500g pack',
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p7',
    name: 'Fresh Strawberries (Sweet)',
    nameBn: 'রসালো তাজা স্ট্রবেরি',
    category: 'Fresh Fruits',
    origin: 'Rajshahi Greenhouse',
    price: 450,
    originalPrice: 520,
    unit: '250g box',
    rating: 4.9,
    reviews: 142,
    badge: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p8',
    name: 'Imported Fresh Kiwi Pack',
    nameBn: 'আমদানিকৃত তাজা কিউই',
    category: 'Fresh Fruits',
    origin: 'New Zealand Direct',
    price: 220,
    unit: '3 pcs pack',
    rating: 4.8,
    reviews: 53,
    image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p9',
    name: 'Sweet Ruby Pomegranate',
    nameBn: 'মিষ্টি ডালিম / বেদানা',
    category: 'Fresh Fruits',
    origin: 'Kandahar Premium Grade',
    price: 340,
    originalPrice: 380,
    unit: 'per kg',
    rating: 4.9,
    reviews: 178,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'p10',
    name: 'Organic Red Crunchy Apples',
    nameBn: 'তাজা মিষ্টি লাল আপেল',
    category: 'Fresh Fruits',
    origin: 'Kashmir Valley Farm',
    price: 290,
    originalPrice: 320,
    unit: 'per kg',
    rating: 4.9,
    reviews: 205,
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80',
  },
];

function HomeContent() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = React.useState('All Items');
  const [cartCount, setCartCount] = React.useState(0);
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const [likedIds, setLikedIds] = React.useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, name: string) => {
    setLikedIds((prev) => {
      const isLiked = !prev[id];
      if (isLiked) {
        setWishlistCount((c) => c + 1);
        toast.info('Added to Wishlist', `${name} saved to your favorites.`);
      } else {
        setWishlistCount((c) => Math.max(0, c - 1));
      }
      return { ...prev, [id]: isLiked };
    });
  };

  const addToCart = (product: ProductItem) => {
    setCartCount((c) => c + 1);
    toast.success('Added to Cart', `${product.name} (৳${product.price}) added.`);
  };

  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === 'All Items') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP UTILITY HEADER */}
      <header className="border-b border-neutral-200/80 bg-white sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Language & Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 cursor-pointer hover:bg-neutral-100 transition">
              <span className="text-sm">🇧🇩</span>
              <span>BN / EN</span>
            </div>

            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search Grocery Items (e.g. Tomatoes, Basmati Rice, Milk)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-full border border-neutral-200 bg-neutral-50/60 focus:bg-white focus:border-emerald-600 focus:outline-hidden transition placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex items-center justify-center">
            <a href="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-xl bg-forest-900 flex items-center justify-center text-white font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-forest-900 leading-none">
                  ECO<span className="text-primary-green">BAZAR</span>
                </span>
                <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase">
                  Supermarket & POS
                </span>
              </div>
            </a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/design-system"
              className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50/70 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Design System</span>
            </a>

            <button
              type="button"
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 shadow-xs transition"
            >
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
              <span>Cart</span>
              <span className="h-5 min-w-[20px] px-1 rounded-full bg-primary-green text-white text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition shadow-xs"
            >
              <User className="h-3.5 w-3.5" />
              <span>Login / Sign Up</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="border-t border-neutral-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs font-medium text-neutral-600 overflow-x-auto">
            <div className="flex items-center gap-6 whitespace-nowrap">
              <a href="#shop" className="text-forest-900 font-bold hover:text-primary-green transition">
                Shop
              </a>
              <div className="flex items-center gap-1 cursor-pointer hover:text-forest-900 transition">
                <span>Categories</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <a href="#deals" className="hover:text-forest-900 transition">
                Deals
              </a>
              <a href="#produce" className="hover:text-forest-900 transition">
                Fresh Produce
              </a>
              <a href="#about" className="hover:text-forest-900 transition">
                About Us
              </a>
            </div>

            <div className="hidden md:flex items-center gap-5 whitespace-nowrap text-neutral-500">
              <a href="#policy" className="hover:text-neutral-900 transition">
                Policy
              </a>
              <a href="#faq" className="hover:text-neutral-900 transition">
                FAQs
              </a>
              <a href="#support" className="hover:text-neutral-900 transition">
                Help & Support
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* 2. HERO SECTION — EXACT MATCH WITH USER'S DESIGN REFERENCE */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#123C2D] via-[#1A5C41] to-[#0E3524] text-white shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Huge stylized background watermark text "EcoBazar" */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full text-center whitespace-nowrap text-[80px] sm:text-[140px] lg:text-[210px] font-black tracking-tight text-white/[0.08] italic leading-none z-0"
            aria-hidden="true"
          >
            EcoBazar
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                <span>Same-Day 30-Min Delivery in Dhaka</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Fresh Produce & Groceries Delivered.
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-md font-normal leading-relaxed">
                Shop from thousands of farm fresh fruits, vegetables, dairy, and daily essentials at unbeatable prices with guaranteed batch freshness.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0A241B] hover:bg-black text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <span>Shop Now</span>
                  <div className="h-6 w-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </div>
                </a>

                <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-200 font-medium">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>3 Dhaka Hubs Live</span>
                </div>
              </div>
            </div>

            {/* Center & Right Column: Hero Delivery Visual & Glassmorphism Card */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              {/* Main Delivery Man Hero Photo */}
              <div className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-emerald-950/40">
                <img
                  src="/images/hero-deliveryman.jpg"
                  alt="ECOBAZAR Express Delivery Courier holding farm fresh organic vegetables"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 text-left">
                  <p className="text-xs font-semibold text-white/90">ECOBAZAR Fleet</p>
                  <p className="text-[11px] text-emerald-300">Temperature Controlled Delivery</p>
                </div>
              </div>

              {/* Floating Glassmorphism Produce Card */}
              <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:-left-6 z-20 rounded-2xl bg-white/95 backdrop-blur-md p-3.5 shadow-2xl border border-white/60 flex items-center gap-3.5 text-neutral-900 animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="h-14 w-14 rounded-xl overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=160&auto=format&fit=crop&q=80"
                    alt="Fresh Vegetables Basket"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-0.5">
                    Daily Harvest
                  </span>
                  <p className="text-xs font-bold text-neutral-900">Fresh Vegetables</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-black text-forest-900">৳ 180</span>
                    <span className="text-[11px] text-neutral-400 line-through">৳ 240</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. POPULAR CATEGORIES */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                Popular Categories
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                জনপ্রিয় বিভাগসমূহ • Handpicked farm items categorized for quick discovery
              </p>
            </div>
            <a
              href="#categories"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition"
            >
              <span>Show All</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`group cursor-pointer rounded-2xl p-4 text-center transition-all duration-200 border border-transparent ${cat.bgColor} ${cat.hoverBorder} hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className="mx-auto mb-3 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl bg-white/80 p-1 shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-forest-900 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-500 font-bangla mt-0.5">{cat.nameBn}</p>
                <span className="text-[10px] font-semibold text-neutral-400 mt-1 block">
                  {cat.count}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROMO FEATURE BANNERS (3 CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Banner 1: Green 10% Off */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#E8F8EE] to-[#C9F0D6] border border-emerald-200 flex flex-col justify-between shadow-xs hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-1 rounded-full inline-block">
                NEW HERE?
              </span>
              <h3 className="text-xl font-black text-emerald-950 leading-tight">
                ENJOY 10% OFF YOUR FIRST ORDER
              </h3>
              <p className="text-xs text-emerald-800/80">
                Use checkout coupon code <strong className="font-mono text-emerald-950">ECO10</strong>. Valid on all fresh organic categories.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950">Claim Offer</span>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => toast.success('Coupon Copied', 'ECO10 applied to your checkout session.')}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Banner 2: Pink Free Delivery */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#FEECEF] to-[#FBD1D8] border border-rose-200 flex flex-col justify-between shadow-xs hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-200/60 px-2.5 py-1 rounded-full inline-block">
                DHAKA EXPRESS
              </span>
              <h3 className="text-xl font-black text-rose-950 leading-tight">
                FREE DELIVERY ON ORDERS OVER ৳ 500
              </h3>
              <p className="text-xs text-rose-800/80">
                Fulfilled from your nearest Dhanmondi, Gulshan, or Uttara store within 30 minutes.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-950">Order Fresh Today</span>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-rose-900 text-white flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => toast.info('Express Delivery', 'Cart threshold ৳500 for zero delivery charges.')}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Banner 3: Warm Yellow Family Pack */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#FFF8E7] to-[#FDE8B5] border border-amber-200 flex flex-col justify-between shadow-xs hover:shadow-md transition">
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2.5 py-1 rounded-full inline-block">
                FAMILY SAVINGS
              </span>
              <h3 className="text-xl font-black text-amber-950 leading-tight">
                FRESH GROCERIES FOR YOUR FAMILY
              </h3>
              <p className="text-xs text-amber-900/80">
                Weekly pantry bundles with pure mustard oil, aromatic rice, lentils, and farm dairy.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">Explore Bundles</span>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-amber-950 text-white flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => toast.info('Family Packs', 'Weekly staple combos ready for ordering.')}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. TODAY'S FRESH PICKS / PRODUCT CATALOG */}
        <section id="catalog" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                Today's Fresh Picks
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                দৈনিক তাজা বাজার • Harvested within 24 hours from verified local farms
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                'All Items',
                'Fresh Vegetables',
                'Fresh Fruits',
                'Dairy & Eggs',
                'Rice & Staples',
              ].map((catName) => (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === catName
                      ? 'bg-forest-900 text-white shadow-xs'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((prod) => {
              const isLiked = Boolean(likedIds[prod.id]);

              return (
                <div
                  key={prod.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200"
                >
                  {/* Top Badges & Wishlist Heart */}
                  <div className="flex items-center justify-between gap-1 mb-2 z-10">
                    {prod.badge ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {prod.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => toggleWishlist(prod.id, prod.name)}
                      className={`h-7 w-7 rounded-full flex items-center justify-center transition ${
                        isLiked
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-neutral-50 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 mb-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-medium text-neutral-400 block truncate">
                      {prod.origin}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-forest-900 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] font-bangla text-neutral-500 line-clamp-1">
                      {prod.nameBn}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-neutral-800">{prod.rating}</span>
                      <span className="text-[10px] text-neutral-400">({prod.reviews})</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="text-sm sm:text-base font-black text-forest-900">
                        ৳ {prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ৳ {prod.originalPrice}
                        </span>
                      )}
                      <span className="text-[10px] text-neutral-500">/ {prod.unit}</span>
                    </div>
                  </div>

                  {/* Add to Cart CTA */}
                  <div className="mt-3 pt-2 border-t border-neutral-100">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full text-xs gap-1.5 font-bold rounded-xl"
                      onClick={() => addToCart(prod)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. READY TO FILL YOUR CART APP BANNER */}
        <section className="rounded-3xl bg-gradient-to-r from-[#D8F3DC] via-[#EAF8EE] to-[#D8F3DC] border border-emerald-200 p-8 sm:p-12 text-forest-900 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <div className="lg:col-span-7 space-y-4 text-left">
              <Badge variant="forest">ECOBAZAR Mobile App</Badge>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-forest-900">
                Ready To Fill Your Cart With Freshness?
              </h2>
              <p className="text-xs sm:text-sm text-forest-800/90 max-w-lg leading-relaxed">
                Download the ECOBAZAR app for Android & iOS. Enjoy live branch inventory tracking, instant bKash/Nagad checkout, exclusive flash vouchers, and 30-minute doorstep delivery across Dhaka.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-black text-white text-xs font-bold shadow-md transition flex items-center gap-2"
                  onClick={() => toast.info('App Store', 'iOS version releasing in Phase 02.')}
                >
                  <span>App Store</span>
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-black text-white text-xs font-bold shadow-md transition flex items-center gap-2"
                  onClick={() => toast.info('Google Play', 'Android APK available in Phase 02.')}
                >
                  <span>Google Play</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="h-44 sm:h-56 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80"
                  alt="ECOBAZAR fresh produce harvest"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. VALUE PROPOSITIONS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">30-Min Fast Delivery</p>
              <p className="text-[11px] text-neutral-500">From 3 Dhaka hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">100% Organic & Halal</p>
              <p className="text-[11px] text-neutral-500">Quality lab checked</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">Easy Returns at Doorstep</p>
              <p className="text-[11px] text-neutral-500">No questions asked</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">24/7 Dedicated Support</p>
              <p className="text-[11px] text-neutral-500">Call 16XXX or live chat</p>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="mt-16 border-t border-neutral-200 bg-white pt-12 pb-8 text-neutral-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-forest-900 flex items-center justify-center text-white font-extrabold text-base">
                E
              </div>
              <span className="text-xl font-black text-forest-900">
                ECO<span className="text-primary-green">BAZAR</span>
              </span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Bangladesh's premier multi-branch intelligent supermarket operating system. Sourcing straight from local farmers to your table.
            </p>
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Dhanmondi • Gulshan-2 • Uttara</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Categories
            </p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><a href="#veg" className="hover:text-forest-900">Fresh Vegetables</a></li>
              <li><a href="#fruits" className="hover:text-forest-900">Organic Fruits</a></li>
              <li><a href="#dairy" className="hover:text-forest-900">Farm Milk & Eggs</a></li>
              <li><a href="#rice" className="hover:text-forest-900">Aromatic Rice</a></li>
              <li><a href="#oil" className="hover:text-forest-900">Pure Mustard Oil</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Platform & Branches
            </p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><a href="http://localhost:3001" target="_blank" className="hover:text-forest-900 font-semibold text-emerald-800">Admin Dashboard →</a></li>
              <li><a href="/design-system" className="hover:text-forest-900 font-semibold text-emerald-800">Design System Catalog →</a></li>
              <li><a href="#pos" className="hover:text-forest-900">POS Terminals</a></li>
              <li><a href="#warehouses" className="hover:text-forest-900">Central Warehouse</a></li>
              <li><a href="#audit" className="hover:text-forest-900">Batch Expiry Tracking</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Customer Service
            </p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><a href="#help" className="hover:text-forest-900">Help & FAQs</a></li>
              <li><a href="#returns" className="hover:text-forest-900">Return Policy</a></li>
              <li><a href="#privacy" className="hover:text-forest-900">Privacy & Terms</a></li>
              <li><a href="#hotline" className="hover:text-forest-900">Hotline: +880 1700-000000</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-400 text-[11px]">
          <p>© 2026 ECOBAZAR Operating System. All rights reserved.</p>
          <div className="flex items-center gap-4 text-neutral-500 font-medium">
            <span>bKash</span>
            <span>•</span>
            <span>Nagad</span>
            <span>•</span>
            <span>Visa / Mastercard</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
