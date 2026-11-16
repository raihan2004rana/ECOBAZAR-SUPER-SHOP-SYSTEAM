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
  ChevronUp,
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
  Trash2,
  Check,
  Flame,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Eye,
  Percent,
  CheckCircle2,
  Package,
  ArrowLeft,
  Tag,
  CreditCard,
  Building2,
  HelpCircle,
} from 'lucide-react';
import {
  Button,
  Badge,
  PriceDisplay,
  ToastProvider,
  useToast,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from '@ecobazar/ui';

// ==========================================
// INTERFACES & MODELS
// ==========================================
interface ProductItem {
  id: string;
  name: string;
  nameBn: string;
  category: string;
  subcategory?: string;
  brand: string;
  origin: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  stock: number;
  description: string;
  specifications: Record<string, string>;
}

interface CartEntry {
  product: ProductItem;
  quantity: number;
}

interface StoreBranch {
  id: string;
  name: string;
  area: string;
  deliveryTime: string;
  address: string;
}

interface HeroSlide {
  id: string;
  tag: string;
  tagIcon: string;
  headline: string;
  subtitle: string;
  btnText: string;
  categoryFilter: string;
  badgeText: string;
  image: string;
  watermark: string;
  gradient: string;
}

// ==========================================
// MASTER PRODUCT CATALOG DATA
// ==========================================
const masterProducts: ProductItem[] = [
  {
    id: 'p-1',
    name: 'Organic Red Vine Tomatoes (1kg)',
    nameBn: 'অর্গানিক পাকা লাল টমেটো',
    category: 'Fresh Vegetables',
    subcategory: 'Salad & Vine',
    brand: 'Bogura Organic Farms',
    origin: 'Bogura District, Bangladesh',
    price: 85,
    originalPrice: 110,
    unit: '1 kg pack',
    rating: 4.9,
    reviews: 142,
    stock: 45,
    badge: 'FRESH HARVEST',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Freshly plucked vine-ripened organic tomatoes grown without synthetic pesticides. Rich in lycopene and vitamin C, ideal for curries, salads, and fresh juice.',
    specifications: { 'Harvest Date': 'Today (within 24 hrs)', 'Farming': '100% Certified Organic', 'Storage': 'Store in cool dry place' },
  },
  {
    id: 'p-2',
    name: 'Farm Fresh Organic Brown Eggs (Dozen)',
    nameBn: 'ফার্মের তাজা লাল ডিম',
    category: 'Dairy, Butter & Eggs',
    subcategory: 'Eggs & Poultry',
    brand: 'Gazipur Layer Farm',
    origin: 'Gazipur, Dhaka',
    price: 135,
    originalPrice: 160,
    unit: '12 pcs carton',
    rating: 4.8,
    reviews: 215,
    stock: 80,
    badge: 'POPULAR DEAL',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
    description: 'High-protein farm-fresh brown eggs graded and UV-sterilized for complete food safety. Sourced daily from antibiotic-free layer hens.',
    specifications: { 'Grade': 'Grade A Large', 'Shelf Life': '21 days', 'Packaging': 'Shock-proof eco carton' },
  },
  {
    id: 'p-3',
    name: 'Pure Cold Pressed Mustard Oil 1L (Ghani)',
    nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    category: 'Spices, Pickles & Oils',
    subcategory: 'Cooking Oils',
    brand: 'ECOBAZAR Pure Heritage',
    origin: 'Natore, Bangladesh',
    price: 285,
    originalPrice: 340,
    unit: '1 Litre Bottle',
    rating: 5.0,
    reviews: 310,
    stock: 60,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional wood-cold-pressed raw mustard oil retaining pungent natural aroma and natural antioxidants. Essential for authentic Bangladeshi cooking and bhortas.',
    specifications: { 'Extraction': 'Traditional Wood Ghani', 'Purity': '100% Unadulterated', 'Packaging': 'Food-grade pet bottle' },
  },
  {
    id: 'p-4',
    name: 'Aromatic Chinigura Polao Rice (2kg)',
    nameBn: 'সুগন্ধি চিনিগুঁড়া পোলাও চাল',
    category: 'Rice, Pulses & Grains',
    subcategory: 'Aromatic Rice',
    brand: 'Dinajpur Special Reserve',
    origin: 'Dinajpur, Bangladesh',
    price: 290,
    originalPrice: 350,
    unit: '2 kg sealed bag',
    rating: 4.9,
    reviews: 184,
    stock: 75,
    badge: 'PREMIUM STAPLE',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: 'Aged small-grain aromatic Chinigura rice renowned for its delicate fragrance and fluffy texture. 100% stone-free, sorted by state-of-the-art color sorters.',
    specifications: { 'Aging': 'Aged 12 months', 'Stone-Free': 'Guaranteed 100%', 'Ideal For': 'Biryani, Polao, Firni' },
  },
  {
    id: 'p-5',
    name: 'Farm Fresh Pure Whole Cow Milk (1L)',
    nameBn: 'খাঁটি তরল গরুর দুধ',
    category: 'Dairy, Butter & Eggs',
    subcategory: 'Fresh Milk',
    brand: 'Pabna Dairy Pastures',
    origin: 'Pabna, Bangladesh',
    price: 90,
    originalPrice: 105,
    unit: '1 Litre Pouch',
    rating: 4.9,
    reviews: 260,
    stock: 50,
    badge: 'COLD-CHAIN',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80',
    description: 'Pasteurized whole cow milk with natural 4.2% butterfat. Sourced from pasture-grazed dairy cattle, delivered under strict chilled cold-chain transport.',
    specifications: { 'Fat Content': '4.2% Min', 'Pasteurized': 'Yes (72°C flash)', 'Shelf Life': '3 days chilled' },
  },
  {
    id: 'p-6',
    name: 'Sweet Ruby Pomegranate (per kg)',
    nameBn: 'মিষ্টি রসালো লাল ডালিম / বেদানা',
    category: 'Fresh & Organic',
    subcategory: 'Fresh Fruits',
    brand: 'Kandahar Premium Grade',
    origin: 'Imported Quality Grade A',
    price: 340,
    originalPrice: 390,
    unit: 'per kg',
    rating: 4.8,
    reviews: 95,
    stock: 35,
    badge: 'IMPORT QUALITY',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    description: 'Sweet, deep-ruby pomegranate seeds loaded with heart-healthy punicalagins and antioxidants. Hand-inspected for thin rinds and luscious juice arils.',
    specifications: { 'Taste Profile': 'Sweet & Crisp', 'Quality': 'Grade A Export', 'Origin': 'Imported' },
  },
  {
    id: 'p-7',
    name: 'Sweet Strawberries Fresh Pack (250g)',
    nameBn: 'তাজা লাল মিষ্টি স্ট্রবেরি',
    category: 'Fresh & Organic',
    subcategory: 'Berries & Fruits',
    brand: 'Rajshahi Greenhouse',
    origin: 'Rajshahi, Bangladesh',
    price: 390,
    originalPrice: 450,
    unit: '250g punnet',
    rating: 4.9,
    reviews: 110,
    stock: 25,
    badge: 'SEASONAL DELIGHT',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80',
    description: 'Locally grown sweet red strawberries picked this morning. Perfect for healthy fruit bowls, smoothies, and dessert toppings.',
    specifications: { 'Ripeness': '100% Tree-Ripened', 'Weight': '250g Net', 'Shelf Life': '4 days refrigerated' },
  },
  {
    id: 'p-8',
    name: 'Crisp Green Cabbage (Head)',
    nameBn: 'তাজা দেশি সবুজ বাঁধাকপি',
    category: 'Fresh Vegetables',
    subcategory: 'Cruciferous Greens',
    brand: 'Bogura Agro Farms',
    origin: 'Bogura, Bangladesh',
    price: 45,
    originalPrice: 60,
    unit: 'per piece',
    rating: 4.7,
    reviews: 82,
    stock: 90,
    badge: 'VALUE PICK',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=600&auto=format&fit=crop&q=80',
    description: 'Compact, crisp, sweet green cabbage packed with dietary fiber and vitamin K. Directly delivered from winter harvest fields.',
    specifications: { 'Weight Approx': '1.2 kg - 1.5 kg', 'Pesticide-Free': 'Yes', 'Origin': 'Local Agro' },
  },
  {
    id: 'p-9',
    name: 'Pure Sundarban Wild Flower Honey (500g)',
    nameBn: 'সুন্দরবনের প্রাকৃতিক খাঁটি মধু',
    category: 'Health & Personal Care',
    subcategory: 'Raw Honey',
    brand: 'Forest Reserve Khalsi',
    origin: 'Sundarbans Mangrove, Bangladesh',
    price: 490,
    originalPrice: 580,
    unit: '500g glass jar',
    rating: 5.0,
    reviews: 130,
    stock: 40,
    badge: '100% RAW',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Unprocessed, wild flower honey ethically harvested by traditional Mouwals of the Sundarbans. Natural immune booster with verified pollen content.',
    specifications: { 'Processing': 'Raw & Unpasteurized', 'Sugar Added': 'Zero (0%)', 'Jar': 'Airtight Glass' },
  },
  {
    id: 'p-10',
    name: 'Fresh Palong Shak / Leafy Spinach (Bundle)',
    nameBn: 'তাজা দেশি পালং শাক',
    category: 'Fresh Vegetables',
    subcategory: 'Leafy Greens',
    brand: 'Savar Riverside Agro',
    origin: 'Savar, Dhaka',
    price: 30,
    originalPrice: 40,
    unit: 'per bundle (approx 400g)',
    rating: 4.9,
    reviews: 165,
    stock: 120,
    badge: 'DAILY HARVEST',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    description: 'Tender, bright-green spinach leaves harvested at dawn. Packed with iron, folate, and calcium for wholesome family meals.',
    specifications: { 'Wash Status': 'Pre-sorted fresh', 'Bundle Weight': '400g avg', 'Cooking Style': 'Vaji or Soup' },
  },
];

const storeBranches: StoreBranch[] = [
  { id: 'b-dhn', name: 'Dhanmondi Flagship Store #01', area: 'Dhanmondi, Dhaka', deliveryTime: '25 Mins', address: 'House 42, Road 27, Dhanmondi, Dhaka' },
  { id: 'b-gls', name: 'Gulshan-2 Superstore #02', area: 'Gulshan-2, Dhaka', deliveryTime: '20 Mins', address: 'Circle-2, Gulshan Avenue, Dhaka' },
  { id: 'b-utr', name: 'Uttara Sector 11 Express #03', area: 'Uttara, Dhaka', deliveryTime: '30 Mins', address: 'Plot 14, Sector 11, Uttara, Dhaka' },
];

const categorySidebarData = [
  {
    id: 'c-all',
    name: 'All Departments',
    icon: '🛒',
    count: masterProducts.length,
    subcategories: ['All Products', 'Daily Deals', 'New Arrivals', 'Super Saver Packs'],
  },
  {
    id: 'c-veg',
    name: 'Fresh Vegetables',
    icon: '🥬',
    count: 3,
    subcategories: ['Salad & Vine', 'Cruciferous Greens', 'Leafy Greens', 'Root Vegetables'],
  },
  {
    id: 'c-dairy',
    name: 'Dairy, Butter & Eggs',
    icon: '🥛',
    count: 2,
    subcategories: ['Fresh Milk', 'Eggs & Poultry', 'Ghee & Butter', 'Yogurt & Curd'],
  },
  {
    id: 'c-staples',
    name: 'Rice, Pulses & Grains',
    icon: '🌾',
    count: 1,
    subcategories: ['Aromatic Rice', 'Lentils & Daal', 'Atta & Flours', 'Whole Grains'],
  },
  {
    id: 'c-spices',
    name: 'Spices, Pickles & Oils',
    icon: '🌶️',
    count: 1,
    subcategories: ['Cooking Oils', 'Pure Whole Spices', 'Ground Powders', 'Artisan Pickles'],
  },
  {
    id: 'c-organic',
    name: 'Fresh & Organic',
    icon: '🌱',
    count: 2,
    subcategories: ['Fresh Fruits', 'Berries & Fruits', 'Organic Juices', 'Herbal Teas'],
  },
  {
    id: 'c-health',
    name: 'Health & Personal Care',
    icon: '✨',
    count: 1,
    subcategories: ['Raw Honey', 'Nuts & Seeds', 'Organic Ghee', 'Herbal Wellness'],
  },
];

const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    tag: 'Exclusive Offer — 25% Off Fresh Harvest',
    tagIcon: '✨',
    headline: 'Fast Fresh Groceries\nDelivered in 30 Mins',
    subtitle: 'From morning breakfast staples to crisp farm greens, order commercial-grade groceries delivered directly to your doorstep across Dhaka.',
    btnText: 'Shop Fresh Now',
    categoryFilter: 'All Departments',
    badgeText: 'ECOBAZAR Express Fleet',
    image: '/images/hero-deliveryman.jpg',
    watermark: 'EcoBazar',
    gradient: 'from-[#123C2D] via-[#1A5C41] to-[#0E3524]',
  },
  {
    id: 'slide-2',
    tag: 'Pure Grass-Fed Dairy — 100% Organic',
    tagIcon: '🥛',
    headline: 'Farm Fresh Milk\n& Pure Golden Ghee',
    subtitle: 'Lab-certified, antibiotic-free raw cow milk and traditional hand-churned ghee sourced straight from pasture-grazed Pabna herds.',
    btnText: 'Explore Dairy',
    categoryFilter: 'Dairy, Butter & Eggs',
    badgeText: 'Cold-Chain Certified',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    watermark: 'PureDairy',
    gradient: 'from-[#0B4A3A] via-[#156D55] to-[#0D3828]',
  },
  {
    id: 'slide-3',
    tag: 'Seasonal Harvest — Sweet & Juicy',
    tagIcon: '🥭',
    headline: 'Handpicked Organic\nFruits & Pomegranates',
    subtitle: 'Sweet ruby pomegranates, strawberry punnets, and seasonal orchard fruits harvested at peak sweetness for your family.',
    btnText: 'Shop Fresh Fruits',
    categoryFilter: 'Fresh & Organic',
    badgeText: 'Orchard Fresh Today',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80',
    watermark: 'FreshFruits',
    gradient: 'from-[#144A29] via-[#217744] to-[#123C2D]',
  },
  {
    id: 'slide-4',
    tag: 'Dhaka Kitchen Staples — Guaranteed Purity',
    tagIcon: '🌾',
    headline: 'Aromatic Chinigura\n& Pure Mustard Oil',
    subtitle: 'Aged long-grain rice, stone-pressed mustard oil, and premium red lentils guaranteed 100% adulteration-free at supermarket wholesale rates.',
    btnText: 'Shop Daily Staples',
    categoryFilter: 'Rice, Pulses & Grains',
    badgeText: '100% Stone-Free Guarantee',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    watermark: 'AromaRice',
    gradient: 'from-[#1B4332] via-[#2D6A4F] to-[#081C15]',
  },
];

// ==========================================
// STOREFRONT MAIN COMPONENT
// ==========================================
function StorefrontView() {
  const { toast } = useToast();

  // 1. PERSISTENT CART STATE (with localStorage Rehydration)
  const [cartItems, setCartItems] = React.useState<CartEntry[]>([]);
  const [isCartHydrated, setIsCartHydrated] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null);
  const [couponInput, setCouponInput] = React.useState('');

  // 2. PERSISTENT WISHLIST STATE
  const [wishlistMap, setWishlistMap] = React.useState<Record<string, boolean>>({});

  // 3. OVERLAYS & MODALS STATE
  const [isCartDrawerOpen, setIsCartDrawerOpen] = React.useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = React.useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = React.useState<ProductItem | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = React.useState(false);
  const [trackingOrderId, setTrackingOrderId] = React.useState('ORD-20261116-092');
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [authStep, setAuthStep] = React.useState<'phone' | 'otp' | 'success'>('phone');
  const [authPhone, setAuthPhone] = React.useState('+880 1712-345678');
  const [isBranchModalOpen, setIsBranchModalOpen] = React.useState(false);
  const [selectedBranch, setSelectedBranch] = React.useState<StoreBranch>(storeBranches[0]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = React.useState(false);
  const [checkoutSuccessOrder, setCheckoutSuccessOrder] = React.useState<string | null>(null);

  // 4. NAVIGATION & FILTERING STATE
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All Departments');
  const [expandedCategoryId, setExpandedCategoryId] = React.useState<string | null>('c-veg');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // 5. FLASH SALE COUNTDOWN STATE
  const [timeLeft, setTimeLeft] = React.useState({ hours: 8, minutes: 42, seconds: 19 });

  // REHYDRATE CART & WISHLIST ON MOUNT
  React.useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ecobazar_cart_v2');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        // Seed initial 2 sample items
        setCartItems([
          { product: masterProducts[0], quantity: 2 },
          { product: masterProducts[1], quantity: 1 },
        ]);
      }
      const savedWishlist = localStorage.getItem('ecobazar_wishlist_v2');
      if (savedWishlist) {
        setWishlistMap(JSON.parse(savedWishlist));
      } else {
        setWishlistMap({ 'p-1': true, 'p-4': true });
      }
    } catch (err) {
      console.warn('Storage rehydration error:', err);
    }
    setIsCartHydrated(true);
  }, []);

  // PERSIST CART CHANGES
  React.useEffect(() => {
    if (isCartHydrated) {
      try {
        localStorage.setItem('ecobazar_cart_v2', JSON.stringify(cartItems));
      } catch (err) {
        console.warn('Cart persistence error:', err);
      }
    }
  }, [cartItems, isCartHydrated]);

  // PERSIST WISHLIST CHANGES
  React.useEffect(() => {
    if (isCartHydrated) {
      try {
        localStorage.setItem('ecobazar_wishlist_v2', JSON.stringify(wishlistMap));
      } catch (err) {
        console.warn('Wishlist persistence error:', err);
      }
    }
  }, [wishlistMap, isCartHydrated]);

  // COUNTDOWN TIMER TICKER
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AUTO-PLAY HERO SLIDER
  React.useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  // ==========================================
  // CART ACTIONS & COMPUTATIONS
  // ==========================================
  const totalCartCount = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = React.useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = React.useMemo(() => {
    if (appliedCoupon === 'ECO10') return Math.round(cartSubtotal * 0.1);
    if (appliedCoupon === 'FREESHIP') return 50;
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  const deliveryCharge = React.useMemo(() => {
    if (appliedCoupon === 'FREESHIP' || cartSubtotal >= 500 || cartItems.length === 0) return 0;
    return 50;
  }, [cartSubtotal, appliedCoupon, cartItems.length]);

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCharge);

  const handleAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.warning('Max Stock Limit Reached', `Only ${product.stock} units available in ${selectedBranch.name}.`);
          return prev;
        }
        toast.success('Cart Updated', `${product.name} quantity increased to ${existing.quantity + 1}.`);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success('Added to Cart', `${product.name} (৳${product.price}) added to your basket.`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        toast.info('Item Removed', `${existing.product.name} removed from cart.`);
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    toast.info('Item Removed', 'Product removed from shopping cart.');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (cleanCode === 'ECO10') {
      setAppliedCoupon('ECO10');
      toast.success('Coupon Applied!', '10% discount deducted from your subtotal.');
      setCouponInput('');
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      toast.success('Free Delivery Unlocked!', 'Delivery charges waived for your order.');
      setCouponInput('');
    } else {
      toast.error('Invalid Voucher Code', 'Try code ECO10 for 10% off or FREESHIP for free delivery.');
    }
  };

  // ==========================================
  // WISHLIST ACTIONS
  // ==========================================
  const wishlistItems = React.useMemo(() => {
    return masterProducts.filter((p) => wishlistMap[p.id]);
  }, [wishlistMap]);

  const toggleWishlist = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistMap((prev) => {
      const willLike = !prev[product.id];
      if (willLike) {
        toast.info('Saved to Wishlist', `${product.name} added to your favorites.`);
      } else {
        toast.info('Removed from Wishlist', `${product.name} removed from favorites.`);
      }
      return { ...prev, [product.id]: willLike };
    });
  };

  // ==========================================
  // FILTERED PRODUCT CATALOG
  // ==========================================
  const filteredProducts = React.useMemo(() => {
    let result = masterProducts;
    if (selectedCategory && selectedCategory !== 'All Departments') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameBn.includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const liveSearchSuggestions = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return masterProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameBn.includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const currentSlide = heroSlides[currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-neutral-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* ========================================================= */}
      {/* 1. TOP UTILITY HEADER (SOLID DEEP GREEN #123C2D) */}
      {/* ========================================================= */}
      <section
        style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
        className="w-full text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#0D2B20] z-40 relative shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Hotline & Currency */}
          <div className="flex items-center gap-4 font-medium text-white">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-amber-300" />
              <span>Dhaka Express Hotline:</span>
              <strong className="text-amber-300 font-black">+880 1700-000000</strong>
            </span>
            <span className="hidden md:inline text-emerald-600">|</span>
            {/* Functional Branch Switcher Button */}
            <button
              type="button"
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
            >
              <MapPin className="h-3 w-3 text-emerald-300" />
              <span>Delivering from: <strong className="text-amber-300">{selectedBranch.area}</strong></span>
              <ChevronDown className="h-3 w-3 text-emerald-200" />
            </button>
          </div>

          {/* Right: Order Tracking, Portal, Account */}
          <div className="flex items-center gap-3 sm:gap-4 font-semibold text-white ml-auto">
            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-[11px] shadow-xs transition"
            >
              <Truck className="h-3.5 w-3.5" />
              <span>Track Order</span>
            </button>
            <a href="/design-system" className="hover:text-amber-300 text-emerald-100 transition hidden sm:inline">
              Design System
            </a>
            <a href="http://localhost:3001" target="_blank" className="hover:text-amber-300 text-emerald-100 transition hidden sm:inline">
              Admin Portal →
            </a>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-amber-300 text-white transition flex items-center gap-1"
            >
              <User className="h-3.5 w-3.5" />
              <span>Account Login</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & INTERACTIVE SEARCH */}
      {/* ========================================================= */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

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
                Retail Operating System
              </span>
            </div>
          </a>

          {/* Integrated Search Bar with Live Autocomplete Popover */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="flex w-full items-center rounded-xl border-2 border-forest-900/30 focus-within:border-forest-900 bg-neutral-50/50 transition shadow-inner">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groceries (e.g. Tomatoes, Chinigura Rice, Milk, Eggs)..."
                className="w-full px-4 py-2.5 text-xs sm:text-sm bg-transparent outline-hidden placeholder:text-neutral-400 text-neutral-900"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-neutral-400 hover:text-neutral-700 mr-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                className="h-10 px-5 bg-forest-900 hover:bg-forest-950 text-white rounded-r-lg flex items-center justify-center transition-colors"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Live Search Autocomplete Popover */}
            {isSearchFocused && liveSearchSuggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-100 text-left"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1.5 border-b border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-400 uppercase">
                  <span>Matching Supermarket Items</span>
                  <span>{liveSearchSuggestions.length} Results</span>
                </div>
                <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                  {liveSearchSuggestions.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setSelectedProductForModal(prod);
                        setIsSearchFocused(false);
                      }}
                      className="p-2.5 flex items-center justify-between hover:bg-emerald-50/70 rounded-xl cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="h-10 w-10 rounded-lg object-cover bg-neutral-100" />
                        <div>
                          <p className="text-xs font-bold text-neutral-900">{prod.name}</p>
                          <p className="text-[10px] text-neutral-500 font-bangla">{prod.nameBn} • {prod.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-forest-900">৳ {prod.price}</span>
                        <span className="text-[10px] text-emerald-600 font-bold block">In Stock</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Header Action Badges: Branch, Wishlist, Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Branch Hub Selector Pill (Mobile/Tablet) */}
            <button
              type="button"
              onClick={() => setIsBranchModalOpen(true)}
              className="sm:hidden p-2 rounded-full text-neutral-700 hover:bg-neutral-100"
              title="Select branch"
            >
              <MapPin className="h-5 w-5 text-emerald-700" />
            </button>

            {/* Wishlist Icon with LIVE Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition"
              aria-label="Open Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-scale-in">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Button with LIVE Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-xs transition group"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4 text-emerald-300" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono">৳ {cartSubtotal.toFixed(2)}</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="border-t border-neutral-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium text-neutral-600">
            <div className="flex items-center gap-6 py-2 overflow-x-auto whitespace-nowrap">
              <button
                type="button"
                onClick={() => setSelectedCategory('All Departments')}
                className={`font-bold transition ${selectedCategory === 'All Departments' ? 'text-primary-green underline' : 'hover:text-forest-900'}`}
              >
                All Departments
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Fresh Vegetables')}
                className={`transition ${selectedCategory === 'Fresh Vegetables' ? 'text-primary-green font-bold' : 'hover:text-forest-900'}`}
              >
                Fresh Vegetables
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Dairy, Butter & Eggs')}
                className={`transition ${selectedCategory === 'Dairy, Butter & Eggs' ? 'text-primary-green font-bold' : 'hover:text-forest-900'}`}
              >
                Dairy & Eggs
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Rice, Pulses & Grains')}
                className={`transition ${selectedCategory === 'Rice, Pulses & Grains' ? 'text-primary-green font-bold' : 'hover:text-forest-900'}`}
              >
                Aromatic Rice
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('Spices, Pickles & Oils')}
                className={`transition ${selectedCategory === 'Spices, Pickles & Oils' ? 'text-primary-green font-bold' : 'hover:text-forest-900'}`}
              >
                Pure Mustard Oil
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 text-neutral-500 py-1.5">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ⚡ 30-Min Delivery in Dhaka
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION WITH 4-SLIDE CAROUSEL & CATEGORY SIDEBAR */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Vertical Category Sidebar (Interactive with Subcategories) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-2.5 shadow-sm space-y-1 text-left">
              <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-black uppercase text-neutral-400 tracking-wider">Supermarket Aisles</span>
                <Badge variant="mint" size="sm">Verified</Badge>
              </div>

              {categorySidebarData.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                const isExpanded = expandedCategoryId === cat.id;

                return (
                  <div key={cat.id} className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setExpandedCategoryId(isExpanded ? null : cat.id);
                        toast.info(`Department: ${cat.name}`, `Loaded ${cat.count} verified supermarket items.`);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? 'bg-forest-900 text-white font-black shadow-xs border-l-4 border-amber-400 pl-2'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-forest-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                          {cat.count}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5 text-neutral-400" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Subcategories */}
                    {isExpanded && cat.subcategories && (
                      <div className="pl-8 pr-2 py-1 space-y-0.5 animate-in fade-in-0 duration-150">
                        {cat.subcategories.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.name);
                              setSearchQuery(sub === 'All Products' ? '' : sub);
                            }}
                            className="w-full text-left text-[11px] py-1 px-2 rounded-lg text-neutral-500 hover:text-forest-900 hover:bg-neutral-100 transition truncate"
                          >
                            • {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Main Hero 4-Slide Banner */}
          <div className="lg:col-span-9">
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
                onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 w-full">
                {/* Left Text Column */}
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
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(currentSlide.categoryFilter);
                        const target = document.getElementById('catalog');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary-green hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-102 group"
                    >
                      <span>{currentSlide.btnText}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{selectedBranch.deliveryTime} Express in {selectedBranch.area}</span>
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
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlideIndex === idx ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white/80'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. TODAY'S BEST DEAL (WITH HIGH-CONTRAST TIMER) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-3 text-left">
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

          {/* HIGH-CONTRAST Live Countdown Timer Boxes */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-neutral-100 px-3 py-1.5 rounded-xl border border-neutral-200">
            <span className="text-xs font-black text-neutral-700 mr-1 flex items-center gap-1 uppercase tracking-wider">
              <Clock className="h-4 w-4 text-rose-600" />
              <span>Ends in:</span>
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-black">
              <span
                style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black"
              >
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-neutral-500 font-black">:</span>
              <span
                style={{ backgroundColor: '#123C2D', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black"
              >
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-neutral-500 font-black">:</span>
              <span
                style={{ backgroundColor: '#DC2626', color: '#FFFFFF' }}
                className="px-2.5 py-1 rounded-md shadow-xs text-sm font-black animate-pulse"
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Column Deal Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {masterProducts.slice(0, 5).map((prod) => {
            const isLiked = Boolean(wishlistMap[prod.id]);
            const cartEntry = cartItems.find((i) => i.product.id === prod.id);
            const inCartQty = cartEntry ? cartEntry.quantity : 0;

            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProductForModal(prod)}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 cursor-pointer text-left"
              >
                {/* Badge & Wishlist Heart */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                    {prod.badge || 'HOT DEAL'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(prod, e)}
                    className={`h-7 w-7 rounded-full flex items-center justify-center transition ${
                      isLiked ? 'bg-rose-50 text-rose-500' : 'bg-neutral-50 text-neutral-400 hover:text-neutral-700'
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
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-emerald-700 block truncate">
                    {prod.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-forest-900 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] font-bangla text-neutral-500 line-clamp-1">{prod.nameBn}</p>

                  <div className="flex items-center gap-1 pt-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-neutral-800">{prod.rating}</span>
                    <span className="text-[10px] text-neutral-400">({prod.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-sm sm:text-base font-black text-forest-900">৳ {prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">৳ {prod.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Stepper Button */}
                <div className="mt-3 pt-2 border-t border-neutral-100" onClick={(e) => e.stopPropagation()}>
                  {inCartQty > 0 ? (
                    <div className="flex items-center justify-between bg-emerald-600 text-white rounded-xl p-1 shadow-xs">
                      <button
                        type="button"
                        onClick={(e) => handleDecreaseQuantity(prod.id, e)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-bold text-xs">{inCartQty} in cart</span>
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(prod, e)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(prod, e)}
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
      {/* 5. FULL-IMAGE PROMO BANNERS (MATCHED TO REFERENCE) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: 2 Stacked Cards */}
          <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#FFF5E6] to-[#FFE6B8] border border-amber-200 flex items-center justify-between shadow-xs hover:shadow-md transition">
              <div className="space-y-1.5 text-left max-w-[62%]">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md inline-block">
                  Super 20% Savings
                </span>
                <h3 className="text-lg font-black text-amber-950 leading-tight">
                  Your Daily Store. Fresh Fruits & Juices
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Fresh & Organic')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline pt-1"
                >
                  <span>Shop Fruits →</span>
                </button>
              </div>
              <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-sm shrink-0 border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=240&auto=format&fit=crop&q=80"
                  alt="Fresh Fruits"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-gradient-to-r from-[#EBF7EE] to-[#C8F0D6] border border-emerald-200 flex items-center justify-between shadow-xs hover:shadow-md transition">
              <div className="space-y-1.5 text-left max-w-[62%]">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-md inline-block">
                  Super 15% Savings
                </span>
                <h3 className="text-lg font-black text-emerald-950 leading-tight">
                  Your Cart, Your Way. Farm Crisp Greens
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('Fresh Vegetables')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 hover:underline pt-1"
                >
                  <span>Shop Greens →</span>
                </button>
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

          {/* Right Column: Giant Golden Yogurt Banner */}
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
                  onClick={() => setSelectedCategory('Dairy, Butter & Eggs')}
                  className="px-6 py-2.5 rounded-full bg-forest-900 hover:bg-black text-white text-xs font-bold shadow-md transition"
                >
                  Explore Dairy Deals →
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
      {/* 6. POPULAR GROCERIES CATALOG GRID (FILTERABLE) */}
      {/* ========================================================= */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 pb-3 text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
              {selectedCategory}
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Showing {filteredProducts.length} verified products available for {selectedBranch.area}
            </p>
          </div>

          {/* Quick Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All Departments', 'Fresh Vegetables', 'Dairy, Butter & Eggs', 'Rice, Pulses & Grains', 'Fresh & Organic'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition whitespace-nowrap ${
                    isSelected
                      ? 'bg-forest-900 text-white shadow-md ring-2 ring-emerald-500/40'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((prod) => {
            const isLiked = Boolean(wishlistMap[prod.id]);
            const cartEntry = cartItems.find((i) => i.product.id === prod.id);
            const inCartQty = cartEntry ? cartEntry.quantity : 0;

            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProductForModal(prod)}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 cursor-pointer text-left"
              >
                {/* Badge & Wishlist Heart */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {prod.badge || 'IN STOCK'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(prod, e)}
                    className={`h-7 w-7 rounded-full flex items-center justify-center transition ${
                      isLiked ? 'bg-rose-50 text-rose-500' : 'bg-neutral-50 text-neutral-400 hover:text-neutral-700'
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
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-emerald-700 block truncate">
                    {prod.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-forest-900 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-[11px] font-bangla text-neutral-500 line-clamp-1">{prod.nameBn}</p>

                  <div className="flex items-center gap-1 pt-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-neutral-800">{prod.rating}</span>
                    <span className="text-[10px] text-neutral-400">({prod.reviews})</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-sm sm:text-base font-black text-forest-900">৳ {prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through">৳ {prod.originalPrice}</span>
                    )}
                    <span className="text-[10px] text-neutral-400">/ {prod.unit}</span>
                  </div>
                </div>

                {/* Add to Cart Stepper Button */}
                <div className="mt-3 pt-2 border-t border-neutral-100" onClick={(e) => e.stopPropagation()}>
                  {inCartQty > 0 ? (
                    <div className="flex items-center justify-between bg-emerald-600 text-white rounded-xl p-1 shadow-xs">
                      <button
                        type="button"
                        onClick={(e) => handleDecreaseQuantity(prod.id, e)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-bold text-xs">{inCartQty} in cart</span>
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(prod, e)}
                        className="h-7 w-7 rounded-lg bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center transition"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(prod, e)}
                      className="w-full py-2 px-3 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
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
      {/* 7. SLIDE-OUT SHOPPING CART DRAWER */}
      {/* ========================================================= */}
      <Drawer open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen} size="md">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-black text-forest-900">Your Shopping Basket</DrawerTitle>
              <DrawerDescription className="text-xs text-neutral-500">
                {totalCartCount} items from {selectedBranch.name}
              </DrawerDescription>
            </div>
            <Badge variant="mint" size="sm">Delivering in {selectedBranch.deliveryTime}</Badge>
          </div>
        </DrawerHeader>

        <DrawerBody className="p-0 space-y-4">
          {/* Free Delivery Milestone Progress */}
          <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-left">
            {cartSubtotal >= 500 ? (
              <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Congratulations! You unlocked FREE Dhaka delivery.</span>
              </p>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 mb-1">
                  <span>Add ৳{(500 - cartSubtotal).toFixed(0)} more for FREE delivery</span>
                  <span>{Math.round((cartSubtotal / 500) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, (cartSubtotal / 500) * 100)}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 space-y-3">
              <ShoppingBag className="h-12 w-12 mx-auto stroke-1 text-neutral-300" />
              <p className="text-sm font-semibold text-neutral-600">Your basket is empty</p>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Explore our fresh vegetables, dairy, or pantry staples to start shopping.
              </p>
              <Button variant="forest" size="sm" onClick={() => setIsCartDrawerOpen(false)}>
                Explore Catalog
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 max-h-[45vh] overflow-y-auto px-4">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover bg-neutral-100" />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{product.name}</h4>
                      <p className="text-[11px] text-neutral-400">৳{product.price} / {product.unit}</p>
                      <span className="text-xs font-black text-forest-900">৳{(product.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                      <button
                        type="button"
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="px-2 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-200"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold font-mono">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="px-2 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code Form */}
          {cartItems.length > 0 && (
            <div className="px-4 pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code (e.g. ECO10)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-neutral-200 bg-neutral-50 uppercase font-mono font-bold"
                />
                <Button variant="outline" size="sm" type="submit">
                  Apply
                </Button>
              </form>
              {appliedCoupon && (
                <p className="text-[11px] text-emerald-700 font-bold mt-1 text-left flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  <span>Coupon {appliedCoupon} applied successfully!</span>
                </p>
              )}
            </div>
          )}
        </DrawerBody>

        {/* Drawer Footer with Calculation & Checkout */}
        {cartItems.length > 0 && (
          <DrawerFooter className="flex-col gap-3 border-t border-neutral-200 bg-neutral-50/50 p-4">
            <div className="w-full space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900">৳ {cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedCoupon})</span>
                  <span>- ৳ {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge ({selectedBranch.area})</span>
                <span className="font-bold text-neutral-900">
                  {deliveryCharge === 0 ? <strong className="text-emerald-700">FREE</strong> : `৳ ${deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-forest-900 pt-1.5 border-t border-neutral-200">
                <span>Grand Total</span>
                <span>৳ {grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="forest"
              size="lg"
              className="w-full gap-2 text-sm font-black shadow-md"
              onClick={() => {
                setIsCartDrawerOpen(false);
                setIsCheckoutModalOpen(true);
              }}
            >
              <span>Proceed to Checkout (৳ {grandTotal.toFixed(2)})</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DrawerFooter>
        )}
      </Drawer>

      {/* ========================================================= */}
      {/* 8. SLIDE-OUT WISHLIST DRAWER */}
      {/* ========================================================= */}
      <Drawer open={isWishlistDrawerOpen} onOpenChange={setIsWishlistDrawerOpen} size="md">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-black text-forest-900">Your Saved Items</DrawerTitle>
          <DrawerDescription className="text-xs text-neutral-500">
            {wishlistItems.length} products saved for later
          </DrawerDescription>
        </DrawerHeader>

        <DrawerBody className="p-4 space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 space-y-3">
              <Heart className="h-12 w-12 mx-auto stroke-1 text-neutral-300" />
              <p className="text-sm font-semibold text-neutral-600">No saved items yet</p>
              <p className="text-xs text-neutral-400">Click the heart icon on any product to save it to your wishlist.</p>
            </div>
          ) : (
            wishlistItems.map((prod) => (
              <div key={prod.id} className="p-3 rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <img src={prod.image} alt={prod.name} className="h-12 w-12 rounded-xl object-cover bg-neutral-100" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">{prod.name}</h4>
                    <p className="text-xs font-black text-forest-900">৳ {prod.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      handleAddToCart(prod);
                      toggleWishlist(prod);
                    }}
                  >
                    Move to Cart
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod)}
                    className="p-1.5 text-neutral-400 hover:text-rose-500"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </DrawerBody>
      </Drawer>

      {/* ========================================================= */}
      {/* 9. PRODUCT DETAILS MODAL */}
      {/* ========================================================= */}
      {selectedProductForModal && (
        <Dialog open={Boolean(selectedProductForModal)} onOpenChange={() => setSelectedProductForModal(null)} size="lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            {/* Image Col */}
            <div className="md:col-span-5 space-y-3">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs space-y-1">
                <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>100% Quality & Freshness Guarantee</span>
                </p>
                <p className="text-[11px] text-emerald-800">
                  Inspected and packed under clean hygienic standards at {selectedBranch.name}.
                </p>
              </div>
            </div>

            {/* Information Col */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {selectedProductForModal.category}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  SKU: {selectedProductForModal.id.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-neutral-900">{selectedProductForModal.name}</h3>
                <p className="text-xs font-bangla text-neutral-500 font-semibold">{selectedProductForModal.nameBn}</p>
                <p className="text-xs text-neutral-400 mt-0.5">Supplier: {selectedProductForModal.brand} • {selectedProductForModal.origin}</p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-2 pt-1 border-t border-neutral-100">
                <span className="text-2xl font-black text-forest-900">৳ {selectedProductForModal.price}</span>
                {selectedProductForModal.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">৳ {selectedProductForModal.originalPrice}</span>
                )}
                <span className="text-xs text-neutral-500">/ {selectedProductForModal.unit}</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                {selectedProductForModal.description}
              </p>

              {/* Specifications */}
              <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-1">
                {Object.entries(selectedProductForModal.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-[11px]">
                    <span className="text-neutral-500">{key}:</span>
                    <span className="font-bold text-neutral-800">{val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <Button
                  variant="forest"
                  size="default"
                  className="flex-1 gap-2 font-bold"
                  onClick={() => {
                    handleAddToCart(selectedProductForModal);
                    setSelectedProductForModal(null);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add to Basket</span>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={(e) => toggleWishlist(selectedProductForModal, e)}
                >
                  <Heart className={`h-4 w-4 ${wishlistMap[selectedProductForModal.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* ========================================================= */}
      {/* 10. ORDER TRACKING LOOKUP MODAL */}
      {/* ========================================================= */}
      <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen} size="md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-black text-forest-900">Track Your Grocery Delivery</DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Enter your order tracking ID for real-time Dhaka delivery dispatch status.
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-4 text-left">
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingOrderId}
              onChange={(e) => setTrackingOrderId(e.target.value)}
              placeholder="e.g. ORD-20261116-092"
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 font-mono font-bold"
            />
            <Button variant="forest" size="sm" onClick={() => toast.success('Tracking Updated', 'GPS telemetry synced with Dhaka hub.')}>
              Track
            </Button>
          </div>

          {/* Tracking Milestone Timeline */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <span className="font-bold text-neutral-900">Order #{trackingOrderId}</span>
              <Badge variant="success" size="sm">Out for Delivery</Badge>
            </div>

            <div className="space-y-3 relative pl-6 border-l-2 border-emerald-500">
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                <p className="font-bold text-neutral-900">Order Confirmed</p>
                <p className="text-[11px] text-neutral-400">Payment verified via bKash • 12:15 PM</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 rounded-full bg-emerald-600 ring-4 ring-white" />
                <p className="font-bold text-neutral-900">Quality Inspection & Packing</p>
                <p className="text-[11px] text-neutral-400">Packed in chilled insulated bag at {selectedBranch.name} • 12:28 PM</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 rounded-full bg-amber-500 ring-4 ring-white animate-pulse" />
                <p className="font-bold text-neutral-900">Courier Dispatched</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Rider Karim is 1.2km away • ETA 14 mins</p>
              </div>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsTrackingModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* 11. BRANCH SELECTOR MODAL */}
      {/* ========================================================= */}
      <Dialog open={isBranchModalOpen} onOpenChange={setIsBranchModalOpen} size="sm">
        <DialogHeader className="text-left">
          <DialogTitle className="text-base font-black text-forest-900">Select Fulfilling Branch</DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Choose your nearest supermarket hub for fastest 30-min delivery and local inventory.
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-2 text-left">
          {storeBranches.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => {
                  setSelectedBranch(branch);
                  setIsBranchModalOpen(false);
                  toast.success('Branch Changed', `Now shopping from ${branch.name} (${branch.deliveryTime} delivery).`);
                }}
                className={`w-full p-3 rounded-2xl border text-xs text-left transition flex items-start gap-3 ${
                  isSelected ? 'border-primary-green bg-emerald-50/60 shadow-xs' : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <Building2 className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? 'text-primary-green' : 'text-neutral-400'}`} />
                <div className="flex-1">
                  <p className="font-bold text-neutral-900">{branch.name}</p>
                  <p className="text-[11px] text-neutral-500">{branch.address}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ⚡ {branch.deliveryTime} Express
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="h-4 w-4 text-primary-green shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </DialogBody>
      </Dialog>

      {/* ========================================================= */}
      {/* 12. CHECKOUT MODAL */}
      {/* ========================================================= */}
      <Dialog open={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen} size="md">
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-black text-forest-900">Complete Your Order</DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Fulfilling from {selectedBranch.name} • Total: ৳ {grandTotal.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-4 text-left">
          {checkoutSuccessOrder ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-black text-neutral-900">Order Confirmed Successfully!</h3>
              <p className="text-xs text-neutral-500">
                Invoice <strong>#{checkoutSuccessOrder}</strong> has been created. A confirmation SMS with live GPS tracking link has been sent to your phone.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold">
                Estimated Delivery: {selectedBranch.deliveryTime}
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Delivery Address in Dhaka</label>
                <input
                  type="text"
                  defaultValue="House 24, Road 8, Dhanmondi, Dhaka"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Contact Mobile Number</label>
                <input
                  type="text"
                  defaultValue="+880 1712-345678"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-neutral-700 block mb-1">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl border-2 border-primary-green bg-emerald-50/50 font-bold flex items-center gap-2 cursor-pointer">
                    <span className="text-base">📱</span>
                    <span>bKash Instant</span>
                  </div>
                  <div className="p-2.5 rounded-xl border border-neutral-200 font-semibold flex items-center gap-2 cursor-pointer hover:bg-neutral-50">
                    <span className="text-base">💵</span>
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          {checkoutSuccessOrder ? (
            <Button
              variant="forest"
              size="sm"
              onClick={() => {
                setCheckoutSuccessOrder(null);
                setIsCheckoutModalOpen(false);
                setCartItems([]);
              }}
            >
              Done & Return to Store
            </Button>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsCheckoutModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="forest"
                size="sm"
                onClick={() => {
                  const newId = `ORD-20261116-${Math.floor(100 + Math.random() * 900)}`;
                  setCheckoutSuccessOrder(newId);
                  toast.success('Order Placed!', `Order #${newId} registered with ${selectedBranch.name}.`);
                }}
              >
                Confirm & Pay (৳ {grandTotal.toFixed(2)})
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* 13. CUSTOMER AUTH / LOGIN MODAL */}
      {/* ========================================================= */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} size="sm">
        <DialogHeader className="text-left">
          <DialogTitle className="text-base font-black text-forest-900">Customer Account Login</DialogTitle>
          <DialogDescription className="text-xs text-neutral-500">
            Sign in with your mobile number for 1-click checkout & loyalty points.
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-3 text-left">
          {authStep === 'phone' ? (
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-neutral-700 block mb-1">Mobile Phone Number (Bangladesh)</label>
                <input
                  type="text"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-bold"
                />
              </div>
              <p className="text-[11px] text-neutral-400">We will send a 4-digit verification code via SMS.</p>
            </div>
          ) : (
            <div className="space-y-3 text-xs text-center py-2">
              <p className="text-xs text-neutral-600">Enter the 4-digit code sent to <strong>{authPhone}</strong></p>
              <input
                type="text"
                maxLength={4}
                defaultValue="2026"
                className="w-32 mx-auto text-center tracking-widest text-lg font-black px-3 py-2 rounded-xl border-2 border-primary-green"
              />
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          {authStep === 'phone' ? (
            <Button
              variant="forest"
              size="sm"
              className="w-full"
              onClick={() => {
                setAuthStep('otp');
                toast.info('OTP Sent', 'Demo verification code: 2026');
              }}
            >
              Send OTP Code
            </Button>
          ) : (
            <Button
              variant="forest"
              size="sm"
              className="w-full"
              onClick={() => {
                setIsAuthModalOpen(false);
                setAuthStep('phone');
                toast.success('Logged In Successfully', 'Welcome back, Customer!');
              }}
            >
              Verify & Sign In
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* 14. FOOTER */}
      {/* ========================================================= */}
      <footer className="mt-16 border-t border-neutral-200 bg-white pt-12 pb-8 text-neutral-600 text-xs">
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
              Bangladesh's premier commercial multi-branch supermarket platform. Sourcing directly from certified local farmers to your table with cold-chain freshness.
            </p>
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Dhanmondi • Gulshan-2 • Uttara</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">Popular Aisles</p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><button type="button" onClick={() => setSelectedCategory('Fresh Vegetables')} className="hover:text-forest-900">Fresh Vegetables</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Dairy, Butter & Eggs')} className="hover:text-forest-900">Dairy & Eggs</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Rice, Pulses & Grains')} className="hover:text-forest-900">Aromatic Rice & Pulses</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Spices, Pickles & Oils')} className="hover:text-forest-900">Pure Mustard Oil</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Fresh & Organic')} className="hover:text-forest-900">Organic Fruits</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">Retail Operations</p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><a href="http://localhost:3001" target="_blank" className="hover:text-forest-900 font-bold text-emerald-800">Admin Dashboard →</a></li>
              <li><a href="/design-system" className="hover:text-forest-900 font-bold text-emerald-800">Design System Catalog →</a></li>
              <li><button type="button" onClick={() => setIsTrackingModalOpen(true)} className="hover:text-forest-900">Track Order</button></li>
              <li><button type="button" onClick={() => setIsBranchModalOpen(true)} className="hover:text-forest-900">Branch Locations</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">Customer Support</p>
            <ul className="space-y-1.5 text-neutral-500">
              <li><span>Helpline: +880 1700-000000</span></li>
              <li><span>Email: support@ecobazar.com.bd</span></li>
              <li><span>Hours: 7:00 AM - 11:00 PM Daily</span></li>
              <li><span>Doorstep Return: 100% Guaranteed</span></li>
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
      <StorefrontView />
    </ToastProvider>
  );
}
