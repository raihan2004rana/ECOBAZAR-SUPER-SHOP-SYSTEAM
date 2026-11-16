'use client';

import * as React from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  Clock,
  Phone,
  Headphones,
  Menu,
  X,
  Plus,
  Minus,
  Check,
  Flame,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Eye,
  Percent,
} from 'lucide-react';
import {
  Button,
  Badge,
  PriceDisplay,
  ToastProvider,
  useToast,
} from '@ecobazar/ui';

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface ProductItem {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  soldCount?: number;
  totalStock?: number;
}

interface QuickBadge {
  id: string;
  name: string;
  count: string;
  image: string;
}

interface HeroSlide {
  id: string;
  tag: string;
  tagIcon: string;
  headline: string;
  subtitle: string;
  btnText: string;
  btnLink: string;
  badgeText: string;
  image: string;
  watermark: string;
  gradient: string;
}

// ==========================================
// DATA FIXTURES
// ==========================================
const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    tag: 'Exclusive Offer — 25% Off Fresh Harvest',
    tagIcon: '✨',
    headline: 'Fast Fresh Groceries\nDelivered Daily',
    subtitle: 'From breakfast items to crisp organic vegetables, get farm-quality groceries delivered within 30 minutes in Dhaka.',
    btnText: 'Shop Now',
    btnLink: '#deals',
    badgeText: 'ECOBAZAR Express Fleet',
    image: '/images/hero-deliveryman.jpg',
    watermark: 'EcoBazar',
    gradient: 'from-[#123C2D] via-[#1A5C41] to-[#0E3524]',
  },
  {
    id: 'slide-2',
    tag: 'Pure Grass-Fed Dairy — 100% Organic',
    tagIcon: '🥛',
    headline: 'Farm Fresh Cow Milk\n& Pure Golden Ghee',
    subtitle: 'Directly sourced from trusted Pabna & Sirajganj pastures. Lab certified, antibiotic-free, and rich in natural nutrients.',
    btnText: 'Explore Dairy',
    btnLink: '#dairy',
    badgeText: 'Cold-Chain Certified',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    watermark: 'PureDairy',
    gradient: 'from-[#0B4A3A] via-[#156D55] to-[#0D3828]',
  },
  {
    id: 'slide-3',
    tag: 'Seasonal Harvest — Sweet & Juicy',
    tagIcon: '🥭',
    headline: 'Handpicked Organic\nFruits & Mangoes',
    subtitle: 'Delicious Himsagar, Langra, sweet ruby pomegranates, and crisp apples harvested at peak ripeness for your family.',
    btnText: 'Shop Fresh Fruits',
    btnLink: '#fruits',
    badgeText: 'Orchard Fresh Today',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80',
    watermark: 'FreshFruits',
    gradient: 'from-[#144A29] via-[#217744] to-[#123C2D]',
  },
  {
    id: 'slide-4',
    tag: 'Dhaka Kitchen Staples — Certified Purity',
    tagIcon: '🌾',
    headline: 'Aromatic Chinigura\n& Premium Basmati Rice',
    subtitle: 'Aged long-grain rice, ghani-broken pure mustard oil, and premium red lentils at unbeatable supermarket prices.',
    btnText: 'Shop Daily Staples',
    btnLink: '#staples',
    badgeText: '100% Stone-Free Guarantee',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    watermark: 'AromaRice',
    gradient: 'from-[#1B4332] via-[#2D6A4F] to-[#081C15]',
  },
];

const sidebarCategories = [
  { id: '1', name: 'Fresh & Organic', nameBn: 'তাজা ও অর্গানিক', count: '180+', icon: '🌱' },
  { id: '2', name: 'Baby Food & Care', nameBn: 'শিশুখাদ্য ও যত্ন', count: '45+', icon: '🍼' },
  { id: '3', name: 'Fresh Vegetables', nameBn: 'তাজা শাকসবজি', count: '142+', icon: '🥬' },
  { id: '4', name: 'Meat & Fresh Fish', nameBn: 'মাংস ও তাজা মাছ', count: '88+', icon: '🥩' },
  { id: '5', name: 'Dairy, Butter & Eggs', nameBn: 'দুধ, মাখন ও ডিম', count: '64+', icon: '🥛' },
  { id: '6', name: 'Bakery & Fresh Snacks', nameBn: 'বেকারি ও স্ন্যাকস', count: '52+', icon: '🥐' },
  { id: '7', name: 'Rice, Pulses & Grains', nameBn: 'চাল, ডাল ও খাদ্যশস্য', count: '96+', icon: '🌾' },
  { id: '8', name: 'Beverages & Juices', nameBn: 'পানীয় ও ফলের জুস', count: '74+', icon: '🧃' },
  { id: '9', name: 'Frozen Foods', nameBn: 'ফ্রোজেন ফ্রেশ ফুড', count: '38+', icon: '❄️' },
  { id: '10', name: 'Spices, Pickles & Oils', nameBn: 'মসলা, আচার ও খাঁটি তেল', count: '82+', icon: '🌶️' },
  { id: '11', name: 'Health & Personal Care', nameBn: 'স্বাস্থ্য ও পার্সোনাল কেয়ার', count: '58+', icon: '✨' },
];

const quickBadges: QuickBadge[] = [
  {
    id: 'b1',
    name: 'Seasonal Harvest',
    count: '342 Items',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'b2',
    name: 'Pressed Juices',
    count: '185 Items',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'b3',
    name: 'Rare Fruits',
    count: '89 Items',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'b4',
    name: 'Crisp Vegetables',
    count: '312 Items',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'b5',
    name: 'Fresh Dairy Picks',
    count: '245 Items',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'b6',
    name: 'Nutty Treasures',
    count: '178 Items',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
  },
];

const dealProducts: ProductItem[] = [
  {
    id: 'deal-1',
    name: 'Organic Mustard Oil 1L (Cold Pressed)',
    nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    category: 'Spices & Oils',
    brand: 'ECOBAZAR Pure',
    price: 285,
    originalPrice: 340,
    unit: '1 Litre Bottle',
    rating: 4.9,
    reviews: 218,
    badge: 'HOT DEAL -16%',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80',
    soldCount: 84,
    totalStock: 120,
  },
  {
    id: 'deal-2',
    name: 'Farm Fresh Layer Brown Eggs (Dozen)',
    nameBn: 'ফার্মের তাজা লাল ডিম',
    category: 'Dairy & Eggs',
    brand: 'Gazipur Organic Farms',
    price: 135,
    originalPrice: 160,
    unit: '12 pcs pack',
    rating: 4.8,
    reviews: 412,
    badge: 'SAVE 15%',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&auto=format&fit=crop&q=80',
    soldCount: 142,
    totalStock: 200,
  },
  {
    id: 'deal-3',
    name: 'Aromatic Chinigura Polao Rice 2kg',
    nameBn: 'সুগন্ধি চিনিগুঁড়া পোলাও চাল',
    category: 'Grains & Rice',
    brand: 'Dinajpur Special',
    price: 290,
    originalPrice: 350,
    unit: '2kg sealed bag',
    rating: 5.0,
    reviews: 189,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
    soldCount: 96,
    totalStock: 150,
  },
  {
    id: 'deal-4',
    name: 'Pure Sundarban Wild Honey 500g',
    nameBn: 'সুন্দরবনের খাঁটি প্রাকৃতিক মধু',
    category: 'Health & Wellness',
    brand: 'Forest Reserve',
    price: 490,
    originalPrice: 580,
    unit: '500g glass jar',
    rating: 4.9,
    reviews: 95,
    badge: 'LIMITED -15%',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80',
    soldCount: 52,
    totalStock: 80,
  },
  {
    id: 'deal-5',
    name: 'Fresh Sweet Green Peas 1kg',
    nameBn: 'তাজা মিষ্টি কড়াইশুঁটি / মটরশুঁটি',
    category: 'Fresh Vegetables',
    brand: 'Natore Fresh',
    price: 120,
    originalPrice: 150,
    unit: '1 kg pack',
    rating: 4.7,
    reviews: 73,
    badge: 'FARM PICK',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80',
    soldCount: 110,
    totalStock: 140,
  },
];

const weeklyProducts: ProductItem[] = [
  {
    id: 'wp-1',
    name: 'Organic Green Cabbage / Lettuce',
    nameBn: 'তাজা সবুজ বাঁধা কপি',
    category: 'Vegetables',
    brand: 'Bogura Agro',
    price: 45,
    originalPrice: 60,
    unit: 'per piece',
    rating: 4.8,
    reviews: 87,
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'wp-2',
    name: 'Sweet Ruby Strawberries 250g',
    nameBn: 'রসালো তাজা লাল স্ট্রবেরি',
    category: 'Fruits',
    brand: 'Rajshahi Berries',
    price: 390,
    originalPrice: 450,
    unit: '250g punnet',
    rating: 4.9,
    reviews: 142,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'wp-3',
    name: 'Imported Ripe Hass Avocados',
    nameBn: 'আমদানিকৃত তাজা অ্যাভোকাডো',
    category: 'Fruits',
    brand: 'Global Grade A',
    price: 320,
    originalPrice: 380,
    unit: '2 pcs pack',
    rating: 4.7,
    reviews: 56,
    badge: 'Superfood',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'wp-4',
    name: 'Golden Kiwi Fruit (Fresh)',
    nameBn: 'গোল্ডেন মিষ্টি তাজা কিউই',
    category: 'Fruits',
    brand: 'NZ Fresh',
    price: 240,
    unit: '3 pcs pack',
    rating: 4.9,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'wp-5',
    name: 'Crisp Green Granny Smith Apples',
    nameBn: 'তাজা সবুজ আপেল',
    category: 'Fruits',
    brand: 'Kashmir Valley',
    price: 280,
    originalPrice: 320,
    unit: 'per kg',
    rating: 4.8,
    reviews: 112,
    badge: 'Organic',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 'wp-6',
    name: 'Fresh Spinach / Palong Shak',
    nameBn: 'তাজা দেশি পালং শাক',
    category: 'Vegetables',
    brand: 'Savar Local Farm',
    price: 30,
    unit: 'per bundle',
    rating: 4.9,
    reviews: 198,
    badge: 'Daily',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=80',
  },
];

const brandShowcaseProducts = [
  { id: 'bsp-1', name: 'Creamy Milk Bites', brand: 'Pure Joy', price: 95, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80' },
  { id: 'bsp-2', name: 'Silky Sprout Oat Milk', brand: 'SilkBio', price: 210, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&auto=format&fit=crop&q=80' },
  { id: 'bsp-3', name: 'Rich Milk Fudge', brand: 'Sweet Farm', price: 140, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80' },
  { id: 'bsp-4', name: 'Sweet Milk Delights', brand: 'Bogura Sweets', price: 260, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&auto=format&fit=crop&q=80' },
];

// ==========================================
// STOREFRONT MAIN COMPONENT
// ==========================================
function StorefrontContent() {
  const { toast } = useToast();

  // Carousel & UI States
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = React.useState(true);
  const [activeCategoryId, setActiveCategoryId] = React.useState('1');
  const [selectedWeeklyTab, setSelectedWeeklyTab] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cartQuantities, setCartQuantities] = React.useState<Record<string, number>>({});
  const [wishlistCount, setWishlistCount] = React.useState(3);
  const [likedMap, setLikedMap] = React.useState<Record<string, boolean>>({
    'deal-1': true,
    'wp-2': true,
  });

  // Calculate total cart items count
  const cartTotalItems = React.useMemo(() => {
    return Object.values(cartQuantities).reduce((acc, qty) => acc + qty, 0);
  }, [cartQuantities]);

  // Auto-play hero slider every 5 seconds
  React.useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(sliderInterval);
  }, []);

  const goToSlide = (idx: number) => setCurrentSlideIndex(idx);
  const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Countdown Timer State for "Today's Best Deal"
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (product: ProductItem) => {
    setLikedMap((prev) => {
      const willLike = !prev[product.id];
      if (willLike) {
        setWishlistCount((c) => c + 1);
        toast.info('Added to Wishlist', `${product.name} saved to favorites.`);
      } else {
        setWishlistCount((c) => Math.max(0, c - 1));
      }
      return { ...prev, [product.id]: willLike };
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartQuantities((prev) => {
      const currentQty = prev[product.id] || 0;
      const newQty = currentQty + 1;
      toast.success('Added to Cart', `${product.name} (৳${product.price}) now in cart (${newQty} pcs).`);
      return { ...prev, [product.id]: newQty };
    });
  };

  const handleDecreaseQuantity = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const nextState = { ...prev };
        delete nextState[productId];
        return nextState;
      }
      return { ...prev, [productId]: currentQty - 1 };
    });
  };

  const filteredWeeklyProducts = React.useMemo(() => {
    if (selectedWeeklyTab === 'All') return weeklyProducts;
    return weeklyProducts.filter((p) => p.category === selectedWeeklyTab);
  }, [selectedWeeklyTab]);

  const currentSlide = heroSlides[currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#F4F6F3] text-neutral-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* ========================================================= */}
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR (SOLID DEEP GREEN #123C2D) */}
      {/* ========================================================= */}
      <section
        style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
        className="w-full text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#0D2D22] shadow-sm z-50 relative"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Contact Phone & Locale Switchers */}
          <div className="flex items-center gap-4 text-white font-medium">
            <span className="flex items-center gap-1.5 text-white">
              <Phone className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
              <span>Need Support? Call:</span>
              <strong className="text-amber-300 font-black tracking-wide">+880 1700-000000</strong>
            </span>
            <span className="hidden md:inline text-emerald-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white transition">
              <span>🇧🇩 English / বাংলা</span>
              <ChevronDown className="h-3 w-3 text-emerald-200" />
            </span>
            <span className="hidden md:inline text-emerald-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white transition">
              <span className="font-bold text-amber-300">BDT (৳)</span>
              <ChevronDown className="h-3 w-3 text-emerald-200" />
            </span>
          </div>

          {/* Right: Order Tracking & Portal Links */}
          <div className="flex items-center gap-3 sm:gap-4 font-semibold text-white ml-auto">
            <a
              href="#track"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-[11px] shadow-sm transition"
            >
              <span>Track Order</span>
            </a>
            <a href="/design-system" className="hover:text-amber-300 text-emerald-100 transition hidden sm:inline">
              Design System
            </a>
            <a href="http://localhost:3001" target="_blank" className="hover:text-amber-300 text-emerald-100 transition hidden sm:inline">
              Admin Portal
            </a>
            <a href="#about" className="hover:text-amber-300 text-emerald-100 transition hidden lg:inline">
              About Us
            </a>
            <a href="#account" className="hover:text-amber-300 text-white transition">
              My Account
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & SEARCH BAR */}
      {/* ========================================================= */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-6">
          {/* Brand Logo: ECOBAZAR */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-forest-900 flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
              E
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tight text-forest-900 leading-none">
                ECO<span className="text-primary-green">BAZAR</span>
              </span>
              <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                Supermarket & POS
              </span>
            </div>
          </a>

          {/* Integrated Search Box */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center relative">
            <div className="flex w-full items-center rounded-lg border-2 border-forest-900/30 focus-within:border-forest-900 bg-neutral-50/50 transition shadow-inner">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fresh fruits, vegetables, dairy, rice, spices..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-transparent outline-hidden placeholder:text-neutral-400"
              />
              <button
                type="button"
                className="h-10 px-5 bg-forest-900 hover:bg-forest-950 text-white rounded-r-md flex items-center justify-center transition-colors"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Header Action Badges: Account, Wishlist, Cart */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Account Link */}
            <a
              href="#account"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-forest-900 transition"
            >
              <div className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-neutral-400">Account</span>
                <span className="font-bold">Login / Sign In</span>
              </div>
            </a>

            {/* Wishlist Icon */}
            <button
              type="button"
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition"
              aria-label="Wishlist items"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Active Pulse Animation */}
            <button
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-xs transition"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-amber-400 text-neutral-900 text-[10px] font-black flex items-center justify-center">
                  {cartTotalItems}
                </span>
              </div>
              <span className="hidden sm:inline font-mono">৳ {(cartTotalItems * 210).toFixed(2)}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="border-t border-neutral-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Green Explore All Categories Button */}
              <button
                type="button"
                onClick={() => setIsCategorySidebarOpen(!isCategorySidebarOpen)}
                className="hidden lg:flex items-center justify-between gap-3 w-64 px-4 py-3 bg-primary-green hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-t-lg transition select-none shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Menu className="h-4 w-4 stroke-[2.5]" />
                  <span>Explore All Categories</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isCategorySidebarOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Center Menu Links */}
              <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-neutral-700">
                <a href="/" className="text-primary-green font-bold hover:text-emerald-700 transition">
                  Home
                </a>
                <a href="#about" className="hover:text-forest-900 transition">
                  About Us
                </a>
                <a href="#shop" className="hover:text-forest-900 transition">
                  Shop
                </a>
                <a href="#deals" className="hover:text-forest-900 transition">
                  Daily Deals
                </a>
                <a href="#branches" className="hover:text-forest-900 transition flex items-center gap-1">
                  <span>Branches</span>
                  <Badge size="sm" variant="mint" className="text-[9px] py-0 px-1.5">3 Live</Badge>
                </a>
                <a href="#contact" className="hover:text-forest-900 transition">
                  Contact
                </a>
              </nav>
            </div>

            {/* Right Hotline Callout */}
            <div className="hidden sm:flex items-center gap-2.5 text-xs text-neutral-700 font-semibold py-2">
              <div className="h-8 w-8 rounded-full bg-mint-100 flex items-center justify-center text-forest-900">
                <Headphones className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                  24/7 Fast Support
                </span>
                <span className="font-extrabold text-forest-900">+880 9612-000000</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION WITH MULTI-SLIDE CAROUSEL & SIDEBAR */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Category Sidebar (Visible on Desktop) */}
          <div
            className={`lg:col-span-3 transition-all duration-300 ${
              isCategorySidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="rounded-2xl lg:rounded-b-2xl lg:rounded-t-none border border-neutral-200 bg-white p-2.5 shadow-sm space-y-1">
              {sidebarCategories.map((cat) => {
                const isActive = activeCategoryId === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      toast.info(`Filtered: ${cat.name}`, `${cat.count} items loaded in inventory.`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left ${
                      isActive
                        ? 'bg-forest-900 text-white font-bold shadow-xs border-l-4 border-amber-400 pl-2.5'
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-forest-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <ChevronRight
                      className={`h-3.5 w-3.5 ${
                        isActive ? 'text-amber-300' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Hero Multi-Slide Banner */}
          <div className={isCategorySidebarOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentSlide.gradient} text-white shadow-xl p-6 sm:p-10 lg:p-12 min-h-[380px] sm:min-h-[420px] flex items-center transition-all duration-500`}
            >
              {/* Large stylized watermark behind hero */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[80px] sm:text-[140px] lg:text-[180px] font-black text-white/[0.07] italic leading-none z-0"
                aria-hidden="true"
              >
                {currentSlide.watermark}
              </div>

              {/* Slider Navigation Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 w-full">
                {/* Left Text Offer */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
                    <span>{currentSlide.tagIcon}</span>
                    <span>{currentSlide.tag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight whitespace-pre-line">
                    {currentSlide.headline}
                  </h1>

                  <p className="text-xs sm:text-sm text-emerald-100/90 max-w-md leading-relaxed font-normal">
                    {currentSlide.subtitle}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={currentSlide.btnLink}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary-green hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-102 group"
                    >
                      <span>{currentSlide.btnText}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>30-Min Instant Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual Image */}
                <div className="md:col-span-5 relative flex justify-center md:justify-end">
                  <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-emerald-950/40">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-3 text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {currentSlide.badgeText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx
                        ? 'w-7 bg-amber-400'
                        : 'w-2.5 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SIX CIRCULAR ICON CATEGORY BADGES */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => {
                toast.info(`Exploring: ${badge.name}`, `Loaded ${badge.count} from local farms.`);
              }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 text-center cursor-pointer group"
            >
              <div className="h-16 w-16 rounded-full overflow-hidden bg-neutral-50 mb-2 p-1 border border-neutral-100 group-hover:scale-105 transition-transform">
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xs font-bold text-neutral-800 group-hover:text-forest-900 transition-colors">
                {badge.name}
              </h3>
              <span className="text-[10px] font-semibold text-neutral-400 mt-0.5">
                {badge.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. TODAY'S BEST DEAL (CLEAR BOLD COUNTDOWN & PROGRESS BAR) */}
      {/* ========================================================= */}
      <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Deal Section Header with HIGH-CONTRAST Live Countdown */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Flame className="h-5 w-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Today's Best Deal
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                Up to 50% discount for limited time only • সীমিত সময়ের বিশেষ মূল্যছাড়
              </p>
            </div>
          </div>

          {/* CRYSTAL-CLEAR High-Contrast Countdown Timer */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-neutral-100 px-3 py-1.5 rounded-xl border border-neutral-200">
            <span className="text-xs font-black text-neutral-700 mr-1 flex items-center gap-1 uppercase tracking-wider">
              <Clock className="h-4 w-4 text-rose-600" />
              <span>Ends in:</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black">
              {/* Hours Box */}
              <span
                style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black"
              >
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-neutral-500 font-black">:</span>
              {/* Minutes Box */}
              <span
                style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black"
              >
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-neutral-500 font-black">:</span>
              {/* Seconds Box */}
              <span
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black animate-pulse"
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Column Deal Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dealProducts.map((prod) => {
            const isLiked = Boolean(likedMap[prod.id]);
            const inCartQty = cartQuantities[prod.id] || 0;
            const soldPercent = Math.round(((prod.soldCount || 0) / (prod.totalStock || 100)) * 100);

            return (
              <div
                key={prod.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200"
              >
                {/* Badge & Wishlist */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                    {prod.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod)}
                    className={`h-7 w-7 rounded-full flex items-center justify-center transition ${
                      isLiked
                        ? 'bg-rose-50 text-rose-500'
                        : 'bg-neutral-50 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 mb-2.5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-semibold text-emerald-700 block truncate">
                    {prod.brand}
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
                  </div>

                  {/* Progress Bar: Sold count */}
                  <div className="pt-2 space-y-1">
                    <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${soldPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                      <span>Sold: {prod.soldCount}</span>
                      <span>Stock: {prod.totalStock}</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button with ACTIVE Counter Feedback */}
                <div className="mt-3 pt-2 border-t border-neutral-100">
                  {inCartQty > 0 ? (
                    <div className="flex items-center justify-between bg-emerald-600 text-white rounded-xl p-1 shadow-xs">
                      <button
                        type="button"
                        onClick={(e) => handleDecreaseQuantity(prod.id, e)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-bold text-xs">
                        {inCartQty} in cart
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="w-full py-2 px-3 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FULL-IMAGE PROMOTIONAL BANNER SECTION (MATCHING SCREENSHOT 2) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: 2 Stacked Cards */}
          <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
            {/* Card 1: Your Daily Store */}
            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#FFF5E6] to-[#FFE6B8] border border-amber-200 flex items-center justify-between shadow-xs hover:shadow-md transition">
              <div className="space-y-1.5 text-left max-w-[62%]">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md inline-block">
                  Super 20% Savings
                </span>
                <h3 className="text-lg font-black text-amber-950 leading-tight">
                  Your Daily Store. Fresh Fruits & Juices
                </h3>
                <a
                  href="#fruits"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline pt-1"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-sm shrink-0 border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=240&auto=format&fit=crop&q=80"
                  alt="Fresh Fruits"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Card 2: Your Cart, Your Way */}
            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#EBF7EE] to-[#C8F0D6] border border-emerald-200 flex items-center justify-between shadow-xs hover:shadow-md transition">
              <div className="space-y-1.5 text-left max-w-[62%]">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-md inline-block">
                  Super 15% Savings
                </span>
                <h3 className="text-lg font-black text-emerald-950 leading-tight">
                  Your Cart, Your Way. Farm Crisp Greens
                </h3>
                <a
                  href="#veg"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 hover:underline pt-1"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-sm shrink-0 border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=240&auto=format&fit=crop&q=80"
                  alt="Farm Fresh Greens"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Giant Rich Golden Yogurt Banner (Matched to Reference) */}
          <div className="md:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706] text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-amber-300">
            <div className="space-y-3 text-left max-w-sm">
              <span className="text-xs font-black uppercase tracking-wider text-white bg-amber-950/40 px-3 py-1 rounded-full inline-block backdrop-blur-xs">
                NATURAL FLAVOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-amber-950 leading-tight">
                Yogurt BANANA — ENJOY RICH TASTE
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 font-medium">
                Traditional Bogura sweet curd, probiotic greek yogurt, and fresh milk smoothies made with 100% pasture-raised cow milk.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toast.info('Dairy Category', 'Filtered to fresh yogurt and dairy products.')}
                  className="px-6 py-2.5 rounded-full bg-forest-900 hover:bg-black text-white text-xs font-bold shadow-md transition"
                >
                  Explore Dairy Deals
                </button>
              </div>
            </div>

            <div className="h-44 sm:h-52 w-44 sm:w-52 rounded-2xl overflow-hidden shadow-xl border-4 border-white/50 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80"
                alt="Fresh Yogurt Banana"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. POPULAR GROCERIES WEEKLY (CLEAR ACTIVE TAB STYLING) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              Popular Groceries Weekly
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              সাপ্তাহিক সর্বাধিক বিক্রিত পণ্য • Certified organic farm selections
            </p>
          </div>

          {/* Category Tabs with UNMISTAKABLE Active Indicator */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Vegetables', 'Fruits', 'Dairy', 'Snacks'].map((tab) => {
              const isTabActive = selectedWeeklyTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedWeeklyTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition whitespace-nowrap ${
                    isTabActive
                      ? 'bg-forest-900 text-white shadow-md ring-2 ring-emerald-500/40 scale-102'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6-Column Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredWeeklyProducts.map((prod) => {
            const isLiked = Boolean(likedMap[prod.id]);
            const inCartQty = cartQuantities[prod.id] || 0;

            return (
              <div
                key={prod.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-3 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200"
              >
                {/* Wishlist Heart */}
                <div className="flex items-center justify-between mb-1.5">
                  {prod.badge ? (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      {prod.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod)}
                    className="p-1 rounded-full text-neutral-400 hover:text-rose-500 transition"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Product Photo */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-medium text-neutral-400 block truncate">
                    {prod.brand}
                  </span>
                  <h3 className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-forest-900 transition-colors">
                    {prod.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] font-bold text-neutral-700">{prod.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-0.5">
                    <span className="text-sm font-black text-forest-900">৳ {prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ৳ {prod.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart CTA with Active Counter */}
                <div className="mt-2.5 pt-2 border-t border-neutral-100">
                  {inCartQty > 0 ? (
                    <div className="flex items-center justify-between bg-emerald-600 text-white rounded-lg p-1 text-xs">
                      <button
                        type="button"
                        onClick={(e) => handleDecreaseQuantity(prod.id, e)}
                        className="h-5 w-5 rounded bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-bold text-[11px]">
                        {inCartQty} in cart
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod)}
                        className="h-5 w-5 rounded bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className="w-full py-1.5 rounded-lg border border-neutral-200 hover:bg-forest-900 hover:text-white hover:border-forest-900 text-neutral-800 text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. DUAL PROMO BANNERS: FRESH FOOD & SHOP THE SMART WAY */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Banner: Fresh Food, Fast Delivery */}
          <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#7C1E14] via-[#9B2C1C] to-[#5A140C] text-white flex flex-col justify-between shadow-md border border-rose-900">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-950 bg-rose-200 px-2.5 py-1 rounded-full inline-block">
                Enjoy 20% Savings
              </span>
              <h3 className="text-2xl font-black text-white leading-tight">
                Fresh Food. Fast Delivery.
              </h3>
              <p className="text-xs text-rose-100/90 leading-relaxed">
                Directly pressed cold mustard oil, raw spices, and pantry essentials delivered to your kitchen table.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                className="px-5 py-2 rounded-full bg-white text-rose-950 font-black text-xs hover:bg-rose-100 transition shadow-sm"
              >
                Shop Now →
              </button>
              <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=80"
                  alt="Pure Mustard Oil"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Banner: Shop the Smart Way Anytime, Anywhere (Sweet Corn) */}
          <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#DFF2E4] via-[#C5E9CE] to-[#A3D9B1] text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-emerald-300">
            <div className="space-y-3 text-left max-w-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-white bg-forest-900 px-3 py-1 rounded-full inline-block">
                Enjoy 15% Savings
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 leading-tight">
                Shop the Smart Way — Anytime, Anywhere
              </h3>
              <p className="text-xs text-emerald-900/90 font-medium">
                Get your daily essential farm fresh produce delivered in 30 mins. Experience convenience that fits your busy lifestyle.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full bg-forest-900 hover:bg-black text-white text-xs font-bold shadow-md transition"
                >
                  Shop Now →
                </button>
              </div>
            </div>

            <div className="h-36 sm:h-44 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white/70 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80"
                alt="Fresh Sweet Corn"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FARM FRESH GROCERY / BRAND SHOWCASE (MATCHING SCREENSHOT 2) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
          <h2 className="text-xl font-black text-neutral-900 tracking-tight">
            Farm Fresh Grocery & Pantry Brands
          </h2>
          <a href="#pantry" className="text-xs font-bold text-forest-900 hover:underline">
            View All Brands →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Vertical Promo Card: Premium Nuts */}
          <div className="md:col-span-4 rounded-3xl p-6 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border border-amber-300 text-amber-950 flex flex-col justify-between shadow-xs">
            <div className="space-y-2 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full inline-block">
                Healthy Living
              </span>
              <h3 className="text-2xl font-black text-amber-950 leading-tight">
                Premium Nuts & Dry Fruits
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Roasted cashews, California almonds, and premium walnuts sealed for maximum freshness.
              </p>
            </div>
            <div className="h-44 w-full rounded-2xl overflow-hidden mt-4 shadow-sm border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"
                alt="Premium Nuts"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right 4-Item Showcase */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandShowcaseProducts.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-neutral-200 bg-white p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition text-left"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-50 mb-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-400 font-semibold uppercase">{prod.brand}</span>
                  <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{prod.name}</h4>
                  <p className="text-xs font-black text-forest-900">৳ {prod.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('Added to Cart', `${prod.name} added.`)}
                  className="mt-2 w-full py-1 rounded-lg bg-forest-900 hover:bg-forest-950 text-white text-[11px] font-bold transition"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. VALUE PROPOSITIONS & TRUST BADGES */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">30-Min Fast Delivery</p>
              <p className="text-[11px] text-neutral-500">From 3 Dhaka hubs</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">100% Organic & Halal</p>
              <p className="text-[11px] text-neutral-500">Quality lab checked</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">Easy Returns at Doorstep</p>
              <p className="text-[11px] text-neutral-500">Instant refund support</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
            <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-neutral-900">24/7 Dedicated Support</p>
              <p className="text-[11px] text-neutral-500">Call +880 9612-000000</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. FOOTER (ECOBAZAR MULTI-BRANCH RETAIL SYSTEM) */}
      {/* ========================================================= */}
      <footer className="mt-12 border-t border-neutral-200 bg-white pt-12 pb-8 text-neutral-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-forest-900 flex items-center justify-center text-white font-black text-base">
                E
              </div>
              <span className="text-xl font-black text-forest-900">
                ECO<span className="text-primary-green">BAZAR</span>
              </span>
            </div>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Bangladesh's premier multi-branch intelligent supermarket operating system. Sourcing directly from certified local farmers to your table.
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
              <li><a href="#category-1" className="hover:text-forest-900">Fresh & Organic</a></li>
              <li><a href="#category-3" className="hover:text-forest-900">Fresh Vegetables</a></li>
              <li><a href="#category-5" className="hover:text-forest-900">Farm Milk & Eggs</a></li>
              <li><a href="#category-7" className="hover:text-forest-900">Aromatic Rice & Pulses</a></li>
              <li><a href="#category-10" className="hover:text-forest-900">Mustard Oil & Spices</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Platform & Dashboards
            </p>
            <ul className="space-y-1.5 text-neutral-500">
              <li>
                <a href="http://localhost:3001" target="_blank" className="font-bold text-emerald-700 hover:text-emerald-800">
                  Admin & POS Dashboard →
                </a>
              </li>
              <li>
                <a href="/design-system" className="font-bold text-emerald-700 hover:text-emerald-800">
                  Design System Catalog →
                </a>
              </li>
              <li><a href="#pos" className="hover:text-forest-900">POS Barcode System</a></li>
              <li><a href="#warehouses" className="hover:text-forest-900">Warehouse Logistics</a></li>
              <li><a href="#audit" className="hover:text-forest-900">Batch Expiry Management</a></li>
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
      <StorefrontContent />
    </ToastProvider>
  );
}
