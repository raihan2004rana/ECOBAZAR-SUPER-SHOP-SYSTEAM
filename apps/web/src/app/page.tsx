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
  ExternalLink,
  Store,
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
  Logo,
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
  badgeColor?: 'red' | 'green' | 'orange';
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

// ==========================================
// MASTER PRODUCT CATALOG DATA
// ==========================================
const masterProducts: ProductItem[] = [
  // 1. TODAY'S BEST DEALS (Exact match to reference UI)
  {
    id: 'prod-tomato',
    name: 'Fresh Tomato',
    nameBn: 'তাজা পাকা লাল টমেটো',
    category: 'Fresh Fruits & Vegetables',
    subcategory: 'Fresh Vegetables',
    brand: 'Bogura Organic Farms',
    origin: 'Bogura, Bangladesh',
    price: 80,
    originalPrice: 100,
    unit: '1 kg',
    rating: 4.9,
    reviews: 182,
    stock: 65,
    badge: '20% OFF',
    badgeColor: 'red',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Farm-fresh, vine-ripened organic red tomatoes with natural sweetness. Rich in lycopene and vitamin C, picked this morning.',
    specifications: { 'Weight': '1 kg pack', 'Harvest': 'Morning Fresh', 'Farming': 'Organic Agro' },
  },
  {
    id: 'prod-banana',
    name: 'Banana (Champa)',
    nameBn: 'তাজা চাম্পা কলা',
    category: 'Fresh Fruits & Vegetables',
    subcategory: 'Fresh Fruits',
    brand: 'Narsingdi Orchard',
    origin: 'Narsingdi, Bangladesh',
    price: 60,
    originalPrice: 70,
    unit: '1 kg (approx 8-10 pcs)',
    rating: 4.8,
    reviews: 145,
    stock: 90,
    badge: '15% OFF',
    badgeColor: 'red',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
    description: 'Sweet and aromatic natural tree-ripened Champa bananas. Free from chemical carbide ripening agents, rich in potassium.',
    specifications: { 'Weight': '1 kg pack', 'Type': 'Naturally Ripened', 'Origin': 'Narsingdi' },
  },
  {
    id: 'prod-apple',
    name: 'Fresh Gala Apple',
    nameBn: 'আমদানিকৃত গালা আপেল',
    category: 'Fresh Fruits & Vegetables',
    subcategory: 'Fresh Fruits',
    brand: 'Kashmir Premium Grade',
    origin: 'Imported Quality',
    price: 90,
    originalPrice: 120,
    unit: '1 kg',
    rating: 4.9,
    reviews: 210,
    stock: 45,
    badge: '25% OFF',
    badgeColor: 'red',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp, juicy red Gala apples with balanced tartness. Individually sorted and wax-free for complete family wellness.',
    specifications: { 'Grade': 'Grade A Export', 'Crispness': 'Guaranteed Juicy', 'Wax-Free': 'Yes' },
  },
  {
    id: 'prod-rice-miniket',
    name: 'Rice (Miniket Premium)',
    nameBn: 'প্রিমিয়াম মিনিকেট চাল (৫ কেজি)',
    category: 'Rice, Pulses & Grains',
    subcategory: 'Daily Rice',
    brand: 'Dinajpur Special Reserve',
    origin: 'Dinajpur, Bangladesh',
    price: 280,
    originalPrice: 320,
    unit: '5 kg bag',
    rating: 5.0,
    reviews: 320,
    stock: 120,
    badge: 'HOT DEAL',
    badgeColor: 'orange',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    description: '100% stone-free, silky, slender Miniket rice. Triple-sorted by optical sorting machines for clean, fluffy everyday cooking.',
    specifications: { 'Net Weight': '5 kg', 'Aging': 'Aged 9 months', 'Stone-Free': '100% Guaranteed' },
  },
  {
    id: 'prod-milk',
    name: 'Fresh Pasteurized Milk',
    nameBn: 'খাঁটি তরল গরুর দুধ (১ লিটার)',
    category: 'Dairy & Eggs',
    subcategory: 'Fresh Milk',
    brand: 'Pabna Pastures Dairy',
    origin: 'Pabna, Bangladesh',
    price: 110,
    originalPrice: 125,
    unit: '1 Ltr bottle',
    rating: 4.9,
    reviews: 240,
    stock: 80,
    badge: 'COLD-CHAIN',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80',
    description: 'Pasteurized whole cow milk with natural 4.2% butterfat. Sourced from grass-grazed dairy herds and transported under cold-chain.',
    specifications: { 'Volume': '1 Litre', 'Fat Content': '4.2% Natural', 'Shelf Life': '3 days chilled' },
  },
  {
    id: 'prod-potato',
    name: 'Organic Diamond Potato',
    nameBn: 'দেশি ডায়মন্ড আলু',
    category: 'Fresh Fruits & Vegetables',
    subcategory: 'Root Vegetables',
    brand: 'Munshiganj Harvest',
    origin: 'Munshiganj, Bangladesh',
    price: 40,
    originalPrice: 50,
    unit: '1 kg',
    rating: 4.7,
    reviews: 95,
    stock: 200,
    badge: 'VALUE PACK',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    description: 'Firm, clean Munshiganj Diamond potatoes with smooth skin. Ideal for making curries, fries, and comforting mashed aloo bhorta.',
    specifications: { 'Weight': '1 kg pack', 'Size': 'Medium-Large Uniform', 'Soil Cleared': 'Yes' },
  },

  // 2. GROCERIES, DAIRY, MEAT & OTHER CATEGORIES
  {
    id: 'prod-eggs',
    name: 'Farm Fresh Brown Eggs (12 pcs)',
    nameBn: 'ফার্মের তাজা লাল ডিম (১২টি)',
    category: 'Dairy & Eggs',
    subcategory: 'Eggs',
    brand: 'Gazipur Layer Farm',
    origin: 'Gazipur, Dhaka',
    price: 145,
    originalPrice: 165,
    unit: '12 pcs carton',
    rating: 4.8,
    reviews: 215,
    stock: 110,
    badge: 'POPULAR',
    badgeColor: 'orange',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
    description: 'High-protein farm-fresh brown eggs graded and UV-sterilized for complete food safety. Sourced daily from antibiotic-free layer hens.',
    specifications: { 'Grade': 'Grade A Large', 'Shelf Life': '21 days', 'Packaging': 'Shock-proof eco carton' },
  },
  {
    id: 'prod-mustard-oil',
    name: 'Cold Pressed Mustard Oil 1L (Ghani)',
    nameBn: 'ঘানি ভাঙা খাঁটি সরিষার তেল',
    category: 'Spices & Oils',
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
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    description: 'Traditional wood-cold-pressed raw mustard oil retaining pungent natural aroma and natural antioxidants. Essential for authentic Bangladeshi cooking.',
    specifications: { 'Extraction': 'Traditional Wood Ghani', 'Purity': '100% Unadulterated', 'Packaging': 'Food-grade pet bottle' },
  },
  {
    id: 'prod-atta',
    name: 'Premium Chakki Fresh Whole Wheat Atta 2kg',
    nameBn: 'চাক্কি ফ্রেশ লাল গমের আটা (২ কেজি)',
    category: 'Groceries & Staples',
    subcategory: 'Flour & Atta',
    brand: 'ECOBAZAR Organics',
    origin: 'Bangladesh',
    price: 135,
    originalPrice: 155,
    unit: '2 kg bag',
    rating: 4.9,
    reviews: 178,
    stock: 95,
    badge: '100% WHOLE',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    description: 'Slow-ground whole wheat atta with 100% dietary bran. Makes exceptionally soft, fluffy rotis with rich nutritional goodness.',
    specifications: { 'Grain': 'Select Hard Wheat', 'Preservatives': 'Zero (0%)', 'Fiber': 'High Bran Content' },
  },
  {
    id: 'prod-beef',
    name: 'Fresh Premium Boneless Beef (1kg)',
    nameBn: 'তাজা সলিড গরুর মাংস (১ কেজি)',
    category: 'Meat & Fish',
    subcategory: 'Fresh Meat',
    brand: 'ECOBAZAR Halal Meats',
    origin: 'Pabna, Bangladesh',
    price: 780,
    originalPrice: 850,
    unit: '1 kg vacuum pack',
    rating: 4.9,
    reviews: 140,
    stock: 35,
    badge: '100% HALAL',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
    description: 'Tender, fresh grass-fed boneless beef cut and trimmed in hygienic cold rooms. 100% Halal slaughtered and vacuum packed.',
    specifications: { 'Slaughter': 'Strictly Halal Certified', 'Cut': 'Boneless Cubes', 'Chilled Delivery': '0°C to 4°C' },
  },
  {
    id: 'prod-bread',
    name: 'Multi-Grain Sourdough Bread (400g)',
    nameBn: 'মাল্টি-গ্রেইন সোরডো পাউরুটি',
    category: 'Bakery & Fresh Snacks',
    subcategory: 'Artisan Bread',
    brand: 'Artisan Bakehouse',
    origin: 'Dhaka Bakery Hub',
    price: 160,
    originalPrice: 185,
    unit: '400g loaf',
    rating: 4.7,
    reviews: 88,
    stock: 40,
    badge: 'FRESH BAKE',
    badgeColor: 'orange',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    description: 'Slow-fermented artisan sourdough baked daily with sunflower seeds, flaxseeds, and toasted oats. Naturally low glycemic index.',
    specifications: { 'Fermentation': '24-hour slow proof', 'Additives': 'No artificial enzymes', 'Baked': 'This Morning' },
  },
  {
    id: 'prod-honey',
    name: 'Pure Sundarban Wild Flower Honey (500g)',
    nameBn: 'সুন্দরবনের প্রাকৃতিক খাঁটি মধু',
    category: 'Health & Personal Care',
    subcategory: 'Raw Honey',
    brand: 'Forest Reserve Khalsi',
    origin: 'Sundarbans, Bangladesh',
    price: 490,
    originalPrice: 580,
    unit: '500g glass jar',
    rating: 5.0,
    reviews: 160,
    stock: 55,
    badge: '100% RAW',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    description: 'Unprocessed, wild flower honey ethically harvested by traditional Mouwals of the Sundarbans. Natural immune booster with verified pollen content.',
    specifications: { 'Processing': 'Raw & Unpasteurized', 'Sugar Added': 'Zero (0%)', 'Jar': 'Airtight Glass' },
  },
  {
    id: 'prod-juice',
    name: 'Fresh Squeezed Orange Juice (500ml)',
    nameBn: 'তাজা কমলার রস',
    category: 'Snacks & Beverages',
    subcategory: 'Cold Pressed Juices',
    brand: 'Citrus Grove Cold-Press',
    origin: 'Dhaka, Bangladesh',
    price: 180,
    originalPrice: 210,
    unit: '500ml bottle',
    rating: 4.8,
    reviews: 74,
    stock: 30,
    badge: 'NO ADDED SUGAR',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
    description: '100% pure cold-pressed Valencia orange juice. No added sugar, water, or chemical preservatives. Chilled fresh daily.',
    specifications: { 'Sugar': '0% Added Sugar', 'Shelf Life': '48 hours chilled', 'Packaging': 'BPA-free bottle' },
  },
  {
    id: 'prod-baby-puree',
    name: 'Organic Apple & Carrot Baby Puree (120g)',
    nameBn: 'অর্গানিক আপেল ও গাজর বেবি পিউরি',
    category: 'Baby Food & Care',
    subcategory: 'Organic Purees',
    brand: 'Little Sprouts Organic',
    origin: 'Certified Organic',
    price: 220,
    originalPrice: 250,
    unit: '120g pouch',
    rating: 4.9,
    reviews: 92,
    stock: 50,
    badge: 'PEDIATRIC TESTED',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80',
    description: 'Smooth, naturally sweet organic apple and tender carrot puree for infants 6+ months. Smooth texture, zero sodium, and zero artificial flavors.',
    specifications: { 'Age': '6+ Months', 'Certification': '100% USDA Organic', 'Preservatives': 'None' },
  },
  {
    id: 'prod-peas',
    name: 'Frozen Green Sweet Peas (500g)',
    nameBn: 'হিমায়িত তাজা মিষ্টি মটরশুঁটি',
    category: 'Frozen Foods',
    subcategory: 'Frozen Veggies',
    brand: 'ECOBAZAR Fresh Freeze',
    origin: 'North Bengal, Bangladesh',
    price: 140,
    originalPrice: 165,
    unit: '500g zip-lock bag',
    rating: 4.7,
    reviews: 65,
    stock: 70,
    badge: 'IQF FROZEN',
    badgeColor: 'green',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Individually Quick Frozen (IQF) sweet green peas harvested at peak tenderness. Retains natural chlorophyll color, crisp snap, and vitamins.',
    specifications: { 'Processing': 'IQF Shock-Frozen', 'Preparation': 'Ready to boil / cook', 'Storage': '-18°C Frozen' },
  },
];

const storeBranches: StoreBranch[] = [
  { id: 'b-dhn', name: 'Dhanmondi Flagship Store #01', area: 'Dhanmondi, Dhaka', deliveryTime: '25 Mins', address: 'House 42, Road 27, Dhanmondi, Dhaka' },
  { id: 'b-gls', name: 'Gulshan-2 Superstore #02', area: 'Gulshan-2, Dhaka', deliveryTime: '20 Mins', address: 'Circle-2, Gulshan Avenue, Dhaka' },
  { id: 'b-utr', name: 'Uttara Sector 11 Express #03', area: 'Uttara, Dhaka', deliveryTime: '30 Mins', address: 'Plot 14, Sector 11, Uttara, Dhaka' },
];

const categorySidebarData = [
  { id: 'cat-all', name: 'All Categories', icon: '🛒', count: masterProducts.length },
  { id: 'cat-veg', name: 'Fresh Fruits & Vegetables', icon: '🥬', count: 4, subcategories: ['Fresh Vegetables', 'Fresh Fruits', 'Salad & Greens', 'Root Vegetables'] },
  { id: 'cat-staples', name: 'Groceries & Staples', icon: '🌾', count: 3, subcategories: ['Daily Rice', 'Flour & Atta', 'Lentils & Daal', 'Sugar & Salt'] },
  { id: 'cat-dairy', name: 'Dairy & Eggs', icon: '🥛', count: 2, subcategories: ['Fresh Milk', 'Eggs', 'Butter & Ghee', 'Cheese & Yogurt'] },
  { id: 'cat-snacks', name: 'Snacks & Beverages', icon: '🥤', count: 1, subcategories: ['Cold Pressed Juices', 'Tea & Coffee', 'Biscuits & Cookies'] },
  { id: 'cat-meat', name: 'Meat & Fish', icon: '🥩', count: 1, subcategories: ['Fresh Meat', 'River Fish', 'Poultry Chicken'] },
  { id: 'cat-bakery', name: 'Bakery & Fresh Snacks', icon: '🥐', count: 1, subcategories: ['Artisan Bread', 'Cakes & Pastries', 'Puffs & Buns'] },
  { id: 'cat-rice', name: 'Rice, Pulses & Grains', icon: '🍚', count: 2, subcategories: ['Aromatic Rice', 'Miniket Rice', 'Red Lentils'] },
  { id: 'cat-spices', name: 'Spices & Oils', icon: '🫒', count: 1, subcategories: ['Cooking Oils', 'Whole Spices', 'Ground Powders'] },
  { id: 'cat-frozen', name: 'Frozen Foods', icon: '❄️', count: 1, subcategories: ['Frozen Veggies', 'Ready to Fry', 'Ice Cream'] },
  { id: 'cat-health', name: 'Health & Personal Care', icon: '🧴', count: 1, subcategories: ['Raw Honey', 'Soaps & Sanitizers', 'Oral Care'] },
  { id: 'cat-baby', name: 'Baby Food & Care', icon: '🍼', count: 1, subcategories: ['Organic Purees', 'Baby Diapers', 'Baby Skincare'] },
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
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All Categories');
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [selectedDepartmentTab, setSelectedDepartmentTab] = React.useState<string>('Home');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceFilterMax, setPriceFilterMax] = React.useState<number>(1000);

  // Temporary added feedback mapping
  const [addedFeedback, setAddedFeedback] = React.useState<Record<string, boolean>>({});

  // Rehydrate Cart & Wishlist from localStorage safely on client mount
  React.useEffect(() => {
    try {
      const storedCart = localStorage.getItem('ecobazar_cart_v3');
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        } else {
          // Initialize with 2 default demo items matching screenshot (Tomato + Banana = ৳540 approx or similar)
          setCartItems([
            { product: masterProducts[0], quantity: 2 }, // Tomato: 80 * 2 = 160
            { product: masterProducts[3], quantity: 1 }, // Rice: 280
            { product: masterProducts[1], quantity: 1 }, // Banana: 60 -> Total: 500 + vat
          ]);
        }
      } else {
        setCartItems([
          { product: masterProducts[0], quantity: 2 },
          { product: masterProducts[3], quantity: 1 },
        ]);
      }

      const storedWishlist = localStorage.getItem('ecobazar_wishlist_v3');
      if (storedWishlist) {
        setWishlistMap(JSON.parse(storedWishlist));
      }
    } catch {
      // Fallback
    } finally {
      setIsCartHydrated(true);
    }
  }, []);

  // Save Cart to localStorage whenever it changes
  React.useEffect(() => {
    if (!isCartHydrated) return;
    try {
      localStorage.setItem('ecobazar_cart_v3', JSON.stringify(cartItems));
    } catch {
      // Storage failed
    }
  }, [cartItems, isCartHydrated]);

  // Save Wishlist to localStorage
  React.useEffect(() => {
    if (!isCartHydrated) return;
    try {
      localStorage.setItem('ecobazar_wishlist_v3', JSON.stringify(wishlistMap));
    } catch {
      // Storage failed
    }
  }, [wishlistMap, isCartHydrated]);

  // Derived Cart Totals
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon === 'ECO10' ? Math.round(cartSubtotal * 0.1) : appliedCoupon === 'FREESHIP' ? 0 : 0;
  const deliveryFee = cartSubtotal >= 1000 || appliedCoupon === 'FREESHIP' ? 0 : 50;
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Cart Handlers — NEVER PERMANENTLY DISABLED
  const handleAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.warning('Stock Limit Reached', `Only ${product.stock} units available in ${selectedBranch.name}`);
          return prev;
        }
        return prev.map((entry) =>
          entry.product.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Provide visual flash
    setAddedFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);

    toast.success('Added to Cart', `${product.name} (৳${product.price}) added.`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) => {
          if (entry.product.id === productId) {
            const nextQty = entry.quantity + delta;
            if (nextQty > entry.product.stock) {
              toast.warning('Stock Limit', `Maximum available stock is ${entry.product.stock}`);
              return entry;
            }
            return { ...entry, quantity: Math.max(1, nextQty) };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((entry) => entry.product.id !== productId));
    toast.info('Item Removed', 'Product removed from your shopping cart.');
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const current = wishlistMap[product.id] || false;
    const next = !current;
    setWishlistMap((prev) => ({ ...prev, [product.id]: next }));
    if (next) {
      toast.success('Saved to Wishlist', `${product.name} added to your saved items.`);
    } else {
      toast.info('Removed from Wishlist', `${product.name} removed from your saved items.`);
    }
  };

  const wishlistProducts = masterProducts.filter((p) => wishlistMap[p.id]);

  // Coupon Code Validator
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'ECO10') {
      setAppliedCoupon('ECO10');
      toast.success('Coupon Applied!', '10% discount has been applied to your subtotal.');
      setCouponInput('');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      toast.success('Coupon Applied!', 'Free delivery granted on this order.');
      setCouponInput('');
    } else {
      toast.error('Invalid Voucher', 'Code not recognized. Try "ECO10" or "FREESHIP".');
    }
  };

  // Branch Selection Handler
  const handleSelectBranch = (branch: StoreBranch) => {
    setSelectedBranch(branch);
    setIsBranchModalOpen(false);
    toast.success('Delivery Hub Updated', `Fulfilling orders from: ${branch.name} (${branch.deliveryTime})`);
  };

  // Checkout Handler
  const handlePlaceOrder = () => {
    const orderNum = `ORD-202611-${Math.floor(1000 + Math.random() * 9000)}`;
    setCheckoutSuccessOrder(orderNum);
    setCartItems([]);
    setIsCheckoutModalOpen(false);
    setIsCartDrawerOpen(false);
    toast.success('Order Placed Successfully!', `Order #${orderNum} confirmed. Delivery in ~${selectedBranch.deliveryTime}.`);
  };

  // Category Filtering
  const filteredProducts = masterProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      selectedCategory === 'All Departments' ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameBn.includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = p.price <= priceFilterMax;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-[#17251F] font-sans antialiased selection:bg-[#21A366] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR (Dark Forest Green #123C2D) */}
      {/* ========================================================= */}
      <div style={{ backgroundColor: '#123C2D' }} className="w-full text-white text-xs py-2 px-4 sm:px-8 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-100 font-semibold text-[11px] sm:text-xs">
            <Truck className="h-3.5 w-3.5 text-[#2EBD70]" />
            <span>Free Delivery on orders over <strong>৳1,000</strong></span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-emerald-100/90 font-medium">
            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(true)}
              className="hover:text-white transition flex items-center gap-1"
            >
              <span>Track Order</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              type="button"
              onClick={() => toast.info('Help Center', '24/7 Helpline: +880 9612-000000')}
              className="hover:text-white transition"
            >
              Help
            </button>
            <span className="opacity-40">|</span>
            <button
              type="button"
              onClick={() => toast.info('Contact Us', 'Corporate Office: Dhanmondi 27, Dhaka')}
              className="hover:text-white transition"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER (Logo, Search, Location, Account, Wishlist, Cart) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5ECE7] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Official Brand Logo */}
          <div className="cursor-pointer shrink-0" onClick={() => { setSelectedCategory('All Categories'); setSelectedDepartmentTab('Home'); }}>
            <Logo variant="dark" size="md" />
          </div>

          {/* Search Bar with live autocomplete */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6 relative">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for products, groceries, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-[#E5ECE7] focus:border-[#21A366] text-xs sm:text-sm text-[#17251F] placeholder:text-[#64736B] outline-hidden transition bg-[#F7F9F5]"
              />
              <button
                type="button"
                onClick={() => toast.info('Search Query', `Searching for: "${searchQuery}"`)}
                className="absolute right-1.5 h-8 w-8 rounded-full bg-[#21A366] hover:bg-[#123C2D] text-white flex items-center justify-center transition shadow-xs"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Live Autocomplete Popover */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div
                className="absolute left-0 right-0 top-12 mt-1 bg-white border border-[#E5ECE7] rounded-2xl shadow-xl z-50 p-2 max-h-80 overflow-y-auto animate-in fade-in-0 duration-150 text-left"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-[#64736B] uppercase border-b border-[#E5ECE7]">
                  <span>Product Suggestions</span>
                  <button type="button" onClick={() => setIsSearchFocused(false)} className="text-neutral-400 hover:text-neutral-600">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                {filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#64736B]">No matching items found for "{searchQuery}"</div>
                ) : (
                  filteredProducts.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProductForModal(p);
                        setIsSearchFocused(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-[#F7F9F5] flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-[#17251F]">{p.name}</p>
                          <p className="text-[10px] text-[#64736B]">{p.category} • {p.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-xs text-[#21A366]">৳{p.price}</span>
                        <span className="block text-[9px] text-[#21A366] font-bold">In Stock</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Header Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Location Selector */}
            <button
              type="button"
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[#F7F9F5] border border-transparent hover:border-[#E5ECE7] transition text-left"
            >
              <MapPin className="h-5 w-5 text-[#21A366] shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-black text-[#17251F]">Dhaka</span>
                <span className="text-[10px] text-[#21A366] font-bold underline">Change</span>
              </div>
            </button>

            {/* Account / Login */}
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#F7F9F5] border border-transparent hover:border-[#E5ECE7] transition text-left"
            >
              <User className="h-5 w-5 text-[#64736B] shrink-0" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[10px] text-[#64736B] font-bold uppercase">Account</span>
                <span className="text-xs font-bold text-[#17251F]">Login / Sign In</span>
              </div>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#F7F9F5] border border-transparent hover:border-[#E5ECE7] transition relative text-left"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-[#64736B] shrink-0" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[10px] text-[#64736B] font-bold uppercase">Wishlist</span>
                <span className="text-xs font-bold text-[#17251F]">({wishlistProducts.length})</span>
              </div>
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-[#E8F5E9] hover:bg-[#D8F3DC] border border-[#21A366]/30 transition shadow-xs group"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5 text-[#21A366] group-hover:scale-105 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-[#EF4444] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-[10px] text-[#64736B] font-bold uppercase">Cart</span>
                <span className="text-xs font-black text-[#123C2D]">৳{cartGrandTotal.toLocaleString()}</span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. SECONDARY NAVIGATION / DEPARTMENT BAR */}
        {/* ========================================================= */}
        <div className="bg-white border-t border-[#E5ECE7] px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 h-12">
            {/* All Categories Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setSelectedCategory('All Categories')}
              style={{ backgroundColor: '#123C2D' }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-white font-black text-xs hover:bg-[#0E2E22] transition shadow-xs"
            >
              <Menu className="h-4 w-4 text-[#2EBD70]" />
              <span>All Categories</span>
              <ChevronDown className="h-3.5 w-3.5 text-emerald-300" />
            </button>

            {/* Horizontal Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#64736B]">
              {[
                { id: 'Home', label: 'Home' },
                { id: 'Deals', label: 'Deals' },
                { id: 'New Arrivals', label: 'New Arrivals' },
                { id: 'Offers', label: 'Offers' },
                { id: 'Branches', label: 'Branches' },
                { id: 'About Us', label: 'About Us' },
                { id: 'Contact', label: 'Contact' },
              ].map((link) => {
                const isActive = selectedDepartmentTab === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      setSelectedDepartmentTab(link.id);
                      if (link.id === 'Branches') setIsBranchModalOpen(true);
                      else toast.info(`Navigated`, `Viewing ${link.label}`);
                    }}
                    className={`pb-1 transition border-b-2 ${
                      isActive
                        ? 'text-[#21A366] font-black border-[#21A366]'
                        : 'border-transparent hover:text-[#17251F]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Express Hotline */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#17251F]">
              <Phone className="h-3.5 w-3.5 text-[#21A366]" />
              <span>24/7 Support: <strong>+880 9612-000000</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 4. MAIN HERO SECTION (Exact 3-Box Layout from Screenshot) */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Category Sidebar (always accessible) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-[#E5ECE7] p-3 shadow-xs text-left">
            <div className="space-y-1">
              {categorySidebarData.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const isExpanded = expandedCategory === cat.id;

                return (
                  <div key={cat.id} className="rounded-xl overflow-hidden">
                    <div
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        toast.info('Category Selected', `Showing items in ${cat.name}`);
                      }}
                      className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold cursor-pointer rounded-xl transition ${
                        isSelected
                          ? 'bg-[#E8F5E9] text-[#21A366] font-black'
                          : 'text-[#17251F] hover:bg-[#F7F9F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {cat.subcategories && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedCategory(isExpanded ? null : cat.id);
                            }}
                            className="p-1 hover:bg-neutral-200 rounded text-neutral-400"
                          >
                            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                        <span className="text-[10px] text-[#64736B] font-mono font-medium">({cat.count})</span>
                      </div>
                    </div>

                    {/* Subcategories Expandable */}
                    {isExpanded && cat.subcategories && (
                      <div className="pl-9 pr-3 py-1 space-y-1 bg-[#F7F9F5] text-[11px] text-[#64736B]">
                        {cat.subcategories.map((sub) => (
                          <div
                            key={sub}
                            onClick={() => {
                              setSelectedCategory(sub);
                              toast.info('Subcategory', `Filtered by: ${sub}`);
                            }}
                            className="py-1 hover:text-[#21A366] cursor-pointer font-medium"
                          >
                            • {sub}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-[#E5ECE7]">
              <button
                type="button"
                onClick={() => setSelectedCategory('All Categories')}
                className="w-full text-center text-xs font-black text-[#21A366] hover:underline"
              >
                View All Categories →
              </button>
            </div>
          </aside>

          {/* Center Column: Big Hero Banner ("Fresh Groceries Better Life") */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#123C2D] via-[#1A5C41] to-[#0E3524] text-white p-6 sm:p-10 flex flex-col justify-between shadow-md min-h-[380px]">
            {/* Background Illustration & Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-right opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop&q=80")',
              }}
            />

            <div className="relative z-10 space-y-3 max-w-md text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-black text-[#D8F3DC]">
                <Sparkles className="h-3.5 w-3.5 text-[#F4A340]" />
                <span>Fresh & Healthy</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white">
                Fresh Groceries <br />
                <span className="text-[#2EBD70]">Better Life</span>
              </h1>

              <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                Shop Smart. Live Healthy. Farm-fresh vegetables, grass-fed dairy, and household staples delivered straight to your door across Dhaka.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Categories');
                  const target = document.getElementById('deals-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4A340] hover:bg-[#E29532] text-white font-black text-xs sm:text-sm shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-6 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>
            </div>
          </div>

          {/* Right Column: Two Stacked Promo Cards */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Promo Card 1: 50% OFF Daily Essentials */}
            <div className="flex-1 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] p-5 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-1 relative z-10">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#21A366]">Up to 50% OFF</span>
                <h3 className="text-lg font-black text-[#123C2D] leading-tight">Daily Essentials</h3>
                <p className="text-[11px] text-[#64736B]">Fresh veggies, staples & grains</p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Groceries & Staples');
                    toast.info('Special Deals', 'Showing Daily Essentials with up to 50% discount');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-black shadow-xs transition"
                >
                  Grab Deal →
                </button>
              </div>

              {/* Graphic Icon */}
              <div className="absolute -right-2 -bottom-2 text-6xl opacity-30 select-none pointer-events-none group-hover:scale-110 transition-transform">
                🥦
              </div>
            </div>

            {/* Promo Card 2: Free Delivery On Orders ৳1,000+ */}
            <div className="flex-1 rounded-2xl bg-[#FFF8E1] border border-[#FFE082] p-5 flex flex-col justify-between text-left relative overflow-hidden group">
              <div className="space-y-1 relative z-10">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#F4A340]">Express Courier</span>
                <h3 className="text-lg font-black text-[#B45309] leading-tight">Free Delivery</h3>
                <p className="text-[11px] text-[#78350F]">On Orders ৳1,000+ in Dhaka</p>
              </div>

              <div className="relative z-10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsBranchModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F4A340] hover:bg-[#D97706] text-white text-xs font-black shadow-xs transition"
                >
                  Order Now →
                </button>
              </div>

              {/* Scooter Icon */}
              <div className="absolute -right-2 -bottom-2 text-6xl opacity-30 select-none pointer-events-none group-hover:scale-110 transition-transform">
                🛵
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. 4 CUSTOMER TRUST & DELIVERY BENEFITS BAR */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs text-left">
            <div className="h-11 w-11 rounded-xl bg-[#E8F5E9] text-[#21A366] flex items-center justify-center shrink-0">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">Same Day Delivery</h4>
              <p className="text-[11px] text-[#64736B]">Fast & Reliable across Dhaka</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs text-left">
            <div className="h-11 w-11 rounded-xl bg-[#E8F5E9] text-[#21A366] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">Secure Payment</h4>
              <p className="text-[11px] text-[#64736B]">100% Secure bKash & Cash</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs text-left">
            <div className="h-11 w-11 rounded-xl bg-[#E8F5E9] text-[#21A366] flex items-center justify-center shrink-0">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">Easy Returns</h4>
              <p className="text-[11px] text-[#64736B]">Hassle Free at doorstep</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#E5ECE7] flex items-center gap-3.5 shadow-xs text-left">
            <div className="h-11 w-11 rounded-xl bg-[#E8F5E9] text-[#21A366] flex items-center justify-center shrink-0">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#17251F]">24/7 Support</h4>
              <p className="text-[11px] text-[#64736B]">Dedicated grocery care</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. TODAY'S BEST DEALS SECTION (Exact Match to Reference Cards) */}
      {/* ========================================================= */}
      <section id="deals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-[#17251F] tracking-tight">Today's Best Deals</h2>
            <span className="text-xl">🔥</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategory('All Categories')}
            className="text-xs font-black text-[#21A366] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Product Cards Grid: 6 Cards per row on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {masterProducts.slice(0, 6).map((product) => {
            const inCart = cartItems.find((item) => item.product.id === product.id);
            const isWishlisted = wishlistMap[product.id] || false;
            const isJustAdded = addedFeedback[product.id] || false;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="bg-white rounded-2xl border border-[#E5ECE7] p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-[#21A366] transition cursor-pointer group text-left relative"
              >
                {/* Image & Badges */}
                <div className="relative mb-3">
                  {/* Discount Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-[#EF4444] text-white text-[10px] font-black shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(product, e)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-[#EF4444] shadow-xs transition"
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                  </button>

                  {/* Product Photography */}
                  <div className="h-36 w-full rounded-xl overflow-hidden bg-[#F7F9F5] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-[#17251F] line-clamp-1 group-hover:text-[#21A366] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#64736B] font-medium">{product.unit}</p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-base font-black text-[#17251F]">৳ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#64736B] line-through">৳{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button (NEVER PERMANENTLY DISABLED!) */}
                <div className="mt-3 pt-2 border-t border-[#E5ECE7]">
                  {inCart ? (
                    <div
                      className="w-full flex items-center justify-between bg-[#E8F5E9] border border-[#21A366] rounded-xl px-2 py-1 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQuantity(product.id, -1)}
                        className="p-1 hover:bg-[#D8F3DC] rounded text-[#123C2D] font-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-black text-xs text-[#123C2D]">{inCart.quantity} in cart</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQuantity(product.id, 1)}
                        className="p-1 hover:bg-[#D8F3DC] rounded text-[#123C2D] font-black"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      style={{ backgroundColor: isJustAdded ? '#123C2D' : '#21A366' }}
                      className="w-full py-2 px-3 rounded-xl text-white font-black text-xs hover:bg-[#123C2D] transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#D8F3DC]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <span>Add to Cart</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ALL DEPARTMENTS CATALOG BROWSER & FILTER */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#E5ECE7]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 text-left">
          <div>
            <h2 className="text-2xl font-black text-[#17251F] tracking-tight">
              {selectedCategory}
            </h2>
            <p className="text-xs text-[#64736B]">Showing {sortedProducts.length} verified products available in Dhaka</p>
          </div>

          {/* Quick Sort & Reset Filters */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold bg-white border border-[#E5ECE7] rounded-xl px-3 py-1.5 outline-hidden"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>

            {selectedCategory !== 'All Categories' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('All Categories')}
                className="text-xs font-bold text-[#21A366] hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Filtered Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => {
            const inCart = cartItems.find((item) => item.product.id === product.id);
            const isWishlisted = wishlistMap[product.id] || false;
            const isJustAdded = addedFeedback[product.id] || false;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="bg-white rounded-2xl border border-[#E5ECE7] p-4 flex flex-col justify-between hover:shadow-lg hover:border-[#21A366] transition cursor-pointer group text-left relative"
              >
                {/* Image & Badges */}
                <div className="relative mb-3">
                  {product.badge && (
                    <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-[#21A366] text-white text-[10px] font-black shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(product, e)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-400 hover:text-[#EF4444] shadow-xs transition"
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                  </button>

                  <div className="h-44 w-full rounded-xl overflow-hidden bg-[#F7F9F5] flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-[#F4A340]">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-[#64736B]">({product.reviews})</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#17251F] line-clamp-1 group-hover:text-[#21A366] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#64736B]">{product.brand} • {product.unit}</p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-black text-[#17251F]">৳ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#64736B] line-through">৳{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="mt-3 pt-2 border-t border-[#E5ECE7]">
                  {inCart ? (
                    <div
                      className="w-full flex items-center justify-between bg-[#E8F5E9] border border-[#21A366] rounded-xl px-2 py-1 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQuantity(product.id, -1)}
                        className="p-1 hover:bg-[#D8F3DC] rounded text-[#123C2D] font-black"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-black text-xs text-[#123C2D]">{inCart.quantity} in cart</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQuantity(product.id, 1)}
                        className="p-1 hover:bg-[#D8F3DC] rounded text-[#123C2D] font-black"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      style={{ backgroundColor: isJustAdded ? '#123C2D' : '#21A366' }}
                      className="w-full py-2.5 px-3 rounded-xl text-white font-black text-xs hover:bg-[#123C2D] transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#D8F3DC]" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <span>Add to Cart</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. PROFESSIONAL FOOTER */}
      {/* ========================================================= */}
      <footer style={{ backgroundColor: '#123C2D' }} className="text-white mt-16 pt-12 pb-8 border-t border-emerald-900 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <Logo variant="light" size="md" />
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              ECOBAZAR is Bangladesh's premier multi-branch fresh supermarket and retail operating system. Committed to pure organics, fair farmer prices, and dependable 30-minute delivery.
            </p>
            <p className="text-xs text-emerald-300 font-bold">Helpline: +880 9612-000000</p>
          </div>

          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3">Departments</h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              <li><button type="button" onClick={() => setSelectedCategory('Fresh Fruits & Vegetables')} className="hover:text-white">Fresh Fruits & Vegetables</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Groceries & Staples')} className="hover:text-white">Groceries & Staples</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Dairy & Eggs')} className="hover:text-white">Dairy & Eggs</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Meat & Fish')} className="hover:text-white">Meat & Fish</button></li>
              <li><button type="button" onClick={() => setSelectedCategory('Spices & Oils')} className="hover:text-white">Spices & Oils</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3">Operating Hubs</h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              <li>Dhanmondi Flagship Store #01 (Road 27)</li>
              <li>Gulshan-2 Superstore #02 (Avenue Circle-2)</li>
              <li>Uttara Sector 11 Express #03</li>
              <li className="pt-2 text-[11px] text-[#2EBD70] font-bold">More branches launching soon across Chittagong & Sylhet</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3">Platform Links</h4>
            <div className="space-y-2">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition w-full"
              >
                <Store className="h-4 w-4 text-[#2EBD70]" />
                <span>Admin & POS Dashboard →</span>
              </a>
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition w-full"
              >
                <Truck className="h-4 w-4 text-[#F4A340]" />
                <span>Track Your Grocery Order</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300">
          <p>© 2026 ECOBAZAR Bangladesh Limited. All rights reserved.</p>
          <p>Bin: 001928471-0101 • Mushak 6.3 Registered</p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 9. SLIDE-OUT SHOPPING CART DRAWER */}
      {/* ========================================================= */}
      <Drawer open={isCartDrawerOpen} onOpenChange={setIsCartDrawerOpen} position="right">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#21A366]" />
              <DrawerTitle>Your Shopping Cart ({totalCartCount})</DrawerTitle>
            </div>
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <DrawerDescription>Fulfilling from {selectedBranch.name}</DrawerDescription>
        </DrawerHeader>

        <DrawerBody>
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-full bg-[#E8F5E9] text-[#21A366] flex items-center justify-center">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-sm text-[#17251F]">Your cart is empty</h4>
              <p className="text-xs text-[#64736B]">Explore our fresh vegetables, dairy and daily staples.</p>
              <Button variant="forest" size="sm" onClick={() => setIsCartDrawerOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-[#E5ECE7] text-left">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <img src={product.image} alt={product.name} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#17251F] truncate">{product.name}</p>
                    <p className="text-[10px] text-[#64736B]">{product.unit} • ৳{product.price} each</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-[#E5ECE7] rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() => handleUpdateCartQuantity(product.id, -1)}
                          className="p-1 text-neutral-500 hover:text-[#17251F]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-bold">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateCartQuantity(product.id, 1)}
                          className="p-1 text-neutral-500 hover:text-[#17251F]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-[#21A366]">৳{product.price * quantity}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="p-1.5 text-neutral-400 hover:text-[#EF4444]"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>

        {cartItems.length > 0 && (
          <DrawerFooter className="border-t border-[#E5ECE7] space-y-3">
            {/* Voucher input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Voucher code (ECO10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 h-9 px-3 rounded-xl border border-[#E5ECE7] text-xs uppercase font-mono"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="h-9 px-3 rounded-xl bg-[#21A366] text-white text-xs font-black"
              >
                Apply
              </button>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-[#21A366] font-bold bg-[#E8F5E9] p-2 rounded-lg">
                <span>Coupon ({appliedCoupon}) Applied</span>
                <span>-৳{discountAmount}</span>
              </div>
            )}

            <div className="space-y-1.5 text-xs text-left">
              <div className="flex justify-between text-[#64736B]">
                <span>Subtotal</span>
                <span>৳{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#64736B]">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-[#21A366]">FREE</strong> : `৳${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#17251F] pt-2 border-t border-[#E5ECE7]">
                <span>Total Amount</span>
                <span className="text-[#21A366]">৳{cartGrandTotal.toLocaleString()}</span>
              </div>
            </div>

            <Button
              variant="forest"
              size="lg"
              className="w-full font-black text-sm"
              onClick={() => setIsCheckoutModalOpen(true)}
            >
              Proceed to Checkout (৳{cartGrandTotal.toLocaleString()})
            </Button>
          </DrawerFooter>
        )}
      </Drawer>

      {/* ========================================================= */}
      {/* 10. PRODUCT DETAILS MODAL */}
      {/* ========================================================= */}
      {selectedProductForModal && (
        <Dialog open={!!selectedProductForModal} onOpenChange={() => setSelectedProductForModal(null)} size="lg">
          <DialogHeader>
            <DialogTitle>{selectedProductForModal.name}</DialogTitle>
            <DialogDescription>{selectedProductForModal.nameBn} • {selectedProductForModal.origin}</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="h-64 rounded-2xl overflow-hidden bg-[#F7F9F5]">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#17251F]">৳ {selectedProductForModal.price}</span>
                  {selectedProductForModal.originalPrice && (
                    <span className="text-sm text-[#64736B] line-through">৳{selectedProductForModal.originalPrice}</span>
                  )}
                  <Badge variant="mint" size="sm">In Stock ({selectedProductForModal.stock})</Badge>
                </div>

                <p className="text-xs text-[#64736B] leading-relaxed">
                  {selectedProductForModal.description}
                </p>

                <div className="p-3 rounded-xl bg-[#F7F9F5] border border-[#E5ECE7] space-y-1.5 text-xs">
                  <p className="font-bold text-[#17251F]">Specifications:</p>
                  {Object.entries(selectedProductForModal.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-[11px] text-[#64736B]">
                      <span>{key}:</span>
                      <span className="font-semibold text-[#17251F]">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    variant="forest"
                    size="default"
                    className="w-full font-black"
                    onClick={() => {
                      handleAddToCart(selectedProductForModal);
                      setSelectedProductForModal(null);
                    }}
                  >
                    Add to Cart • ৳{selectedProductForModal.price}
                  </Button>
                </div>
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}

      {/* ========================================================= */}
      {/* 11. WISHLIST DRAWER */}
      {/* ========================================================= */}
      <Drawer open={isWishlistDrawerOpen} onOpenChange={setIsWishlistDrawerOpen} position="right">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#EF4444]" />
              <DrawerTitle>Saved Wishlist ({wishlistProducts.length})</DrawerTitle>
            </div>
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DrawerHeader>
        <DrawerBody>
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Heart className="h-12 w-12 text-neutral-300 mx-auto" />
              <p className="text-xs text-[#64736B]">You have no saved items in your wishlist.</p>
            </div>
          ) : (
            <div className="space-y-3 text-left">
              {wishlistProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-xl border border-[#E5ECE7] flex items-center justify-between gap-3">
                  <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#17251F] truncate">{p.name}</p>
                    <p className="text-xs font-black text-[#21A366]">৳{p.price}</p>
                  </div>
                  <Button
                    variant="forest"
                    size="sm"
                    className="text-[11px] h-8"
                    onClick={() => {
                      handleAddToCart(p);
                      toast.success('Moved to Cart', `${p.name} added.`);
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
      </Drawer>

      {/* ========================================================= */}
      {/* 12. BRANCH SELECTOR MODAL */}
      {/* ========================================================= */}
      <Dialog open={isBranchModalOpen} onOpenChange={setIsBranchModalOpen} size="md">
        <DialogHeader>
          <DialogTitle>Select Your Delivery Hub</DialogTitle>
          <DialogDescription>Choose the nearest ECOBAZAR branch for fastest 30-min delivery.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-2.5 text-left">
            {storeBranches.map((b) => (
              <div
                key={b.id}
                onClick={() => handleSelectBranch(b)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  selectedBranch.id === b.id
                    ? 'border-[#21A366] bg-[#E8F5E9]'
                    : 'border-[#E5ECE7] hover:bg-[#F7F9F5]'
                }`}
              >
                <div>
                  <h4 className="text-xs font-black text-[#17251F]">{b.name}</h4>
                  <p className="text-[11px] text-[#64736B]">{b.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#21A366] block">~{b.deliveryTime}</span>
                  <span className="text-[10px] text-neutral-400">Open Now</span>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>

      {/* ========================================================= */}
      {/* 13. TRACK ORDER MODAL */}
      {/* ========================================================= */}
      <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen} size="md">
        <DialogHeader>
          <DialogTitle>Track Your Grocery Order</DialogTitle>
          <DialogDescription>Live GPS & milestone tracking from dispatch to doorstep.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4 text-left">
            <div className="flex gap-2">
              <input
                type="text"
                value={trackingOrderId}
                onChange={(e) => setTrackingOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-20261116-092)"
                className="flex-1 px-3 py-2 text-xs border rounded-xl outline-hidden font-mono"
              />
              <Button variant="forest" size="sm" onClick={() => toast.info('Status Synced', 'Delivery rider is 1.2 km away.')}>
                Track
              </Button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F9F5] border border-[#E5ECE7] space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#17251F]">Order: {trackingOrderId}</span>
                <Badge variant="warning" size="sm">Out for Delivery</Badge>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs">
                  <div className="h-6 w-6 rounded-full bg-[#21A366] text-white flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span className="font-semibold text-[#17251F]">Order Placed & Confirmed</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="h-6 w-6 rounded-full bg-[#21A366] text-white flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span className="font-semibold text-[#17251F]">Harvested & Packed at Dhanmondi Hub</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="h-6 w-6 rounded-full bg-[#F4A340] text-white flex items-center justify-center font-bold text-[10px]">🛵</div>
                  <span className="font-black text-[#17251F]">Rider En Route (Estimated: 12 Mins)</span>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-50">
                  <div className="h-6 w-6 rounded-full bg-neutral-300 text-white flex items-center justify-center font-bold text-[10px]">4</div>
                  <span>Delivered to Doorstep</span>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>

      {/* ========================================================= */}
      {/* 14. AUTH / OTP LOGIN MODAL */}
      {/* ========================================================= */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} size="sm">
        <DialogHeader>
          <DialogTitle>Customer Login / Sign Up</DialogTitle>
          <DialogDescription>Quick passwordless authentication with your Bangladeshi mobile number.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          {authStep === 'phone' ? (
            <div className="space-y-3 text-left">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={authPhone}
                  onChange={(e) => setAuthPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl outline-hidden font-mono font-bold"
                />
              </div>
              <Button
                variant="forest"
                size="default"
                className="w-full font-black text-xs"
                onClick={() => {
                  setAuthStep('otp');
                  toast.success('OTP Dispatched', 'A 4-digit verification code has been sent.');
                }}
              >
                Send Verification Code
              </Button>
            </div>
          ) : (
            <div className="space-y-3 text-left">
              <p className="text-xs text-[#64736B]">Enter the 4-digit code sent to {authPhone}:</p>
              <input
                type="text"
                placeholder="• • • •"
                maxLength={4}
                className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border rounded-xl outline-hidden"
              />
              <Button
                variant="forest"
                size="default"
                className="w-full font-black text-xs"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  setAuthStep('phone');
                  toast.success('Signed In', 'Welcome back to ECOBAZAR!');
                }}
              >
                Verify & Continue
              </Button>
            </div>
          )}
        </DialogBody>
      </Dialog>

      {/* ========================================================= */}
      {/* 15. CHECKOUT CONFIRMATION MODAL */}
      {/* ========================================================= */}
      <Dialog open={isCheckoutModalOpen} onOpenChange={setIsCheckoutModalOpen} size="md">
        <DialogHeader>
          <DialogTitle>Review & Confirm Order</DialogTitle>
          <DialogDescription>Delivery Address: Road 27, Dhanmondi, Dhaka</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-3 text-left">
            <div className="p-3 rounded-xl bg-[#F7F9F5] border border-[#E5ECE7] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold">৳{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-bold">{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-1 border-t border-[#E5ECE7]">
                <span>Net Payable:</span>
                <span className="text-[#21A366]">৳{cartGrandTotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-[#64736B]">
              Payment Method: <strong>Cash on Delivery / bKash at Doorstep</strong>
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsCheckoutModalOpen(false)}>
            Back
          </Button>
          <Button variant="forest" size="sm" onClick={handlePlaceOrder}>
            Confirm & Place Order
          </Button>
        </DialogFooter>
      </Dialog>
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
