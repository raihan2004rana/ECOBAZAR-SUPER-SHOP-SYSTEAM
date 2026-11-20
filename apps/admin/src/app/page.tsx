'use client';

import * as React from 'react';
import {
  // Navigation & Icons
  LayoutDashboard,
  BarChart3,
  Package,
  FolderTree,
  Boxes,
  CalendarClock,
  ArrowLeftRight,
  Truck,
  ClipboardList,
  PackageCheck,
  ShoppingCart,
  Store,
  RotateCcw,
  Megaphone,
  Percent,
  Tag,
  Flag,
  Users,
  Award,
  CircleDollarSign,
  FileSpreadsheet,
  Building2,
  Briefcase,
  Sparkles,
  BrainCircuit,
  Bell,
  Settings,
  ShieldCheck,
  History,
  // Utility & Interface
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  MonitorCheck,
  Filter,
  Download,
  Plus,
  Minus,
  Trash2,
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  ChevronUp,
  Receipt,
  Printer,
  CreditCard,
  Send,
  Eye,
  Check,
  DollarSign,
  Activity,
  Radio,
  Zap,
  Cpu,
  Server,
  Thermometer,
  Globe,
  Smartphone,
  Laptop,
  Flame,
  UploadCloud,
  Pencil,
  Image as ImageIcon,
  Layers,
  Lock,
  Star,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { AdminSecurityGate } from '../components/admin-security-gate';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  PriceDisplay,
  ToastProvider,
  useToast,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Logo,
} from '@ecobazar/ui';

// ==========================================
// INTERFACES & MODELS
// ==========================================
interface BranchOption {
  id: string;
  name: string;
  code: string;
  address: string;
  posCount: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'default' | 'forest' | 'mint' | 'orange' | 'success' | 'warning' | 'danger' | 'info';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface OrderRecord {
  id: string;
  channel: 'POS_STORE' | 'ONLINE_WEB' | 'ONLINE_APP';
  branch: string;
  customer: string;
  itemsCount: number;
  total: number;
  paymentMethod: 'CASH' | 'BKASH' | 'NAGAD' | 'CARD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  status: 'COMPLETED' | 'PROCESSING' | 'OUT_FOR_DELIVERY';
  createdAt: string;
}

interface TopProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  soldUnits: number;
  revenue: number;
  stock: number;
  price: number;
  image: string;
}

interface NotificationItem {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  branch?: string;
}

interface PosCartItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

// ==========================================
// DEMO FIXTURES (CLEARLY LABELED DEMO DATA)
// ==========================================
const branchOptions: BranchOption[] = [
  { id: 'all', name: 'All Branches (Consolidated View)', code: 'ALL', address: 'Dhaka Metropolitan Region', posCount: 14 },
  { id: 'br-1', name: 'Dhanmondi Branch #01 (Flagship)', code: 'DHN-01', address: 'Road 27, Dhanmondi, Dhaka', posCount: 6 },
  { id: 'br-2', name: 'Gulshan-2 Superstore #02', code: 'GLS-02', address: 'Circle-2, Gulshan, Dhaka', posCount: 5 },
  { id: 'br-3', name: 'Uttara Sector 11 Express #03', code: 'UTR-03', address: 'Sector 11, Uttara, Dhaka', posCount: 3 },
];

const navigationSections: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'INVENTORY',
    items: [
      { id: 'products', label: 'Products', icon: Package, badge: '1,420' },
      { id: 'categories', label: 'Categories', icon: FolderTree },
      { id: 'inventory', label: 'Inventory', icon: Boxes },
      { id: 'expiry', label: 'Expiry Management', icon: CalendarClock, badge: '8 Alert', badgeVariant: 'danger' },
      { id: 'transfers', label: 'Stock Transfers', icon: ArrowLeftRight },
    ],
  },
  {
    title: 'PURCHASING',
    items: [
      { id: 'suppliers', label: 'Suppliers', icon: Truck },
      { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList, badge: '3 Req', badgeVariant: 'warning' },
      { id: 'goods-received', label: 'Goods Received', icon: PackageCheck },
    ],
  },
  {
    title: 'SALES',
    items: [
      { id: 'orders', label: 'Orders', icon: ShoppingCart },
      { id: 'pos', label: 'POS Terminal', icon: Store, badge: 'Live', badgeVariant: 'success' },
      { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
    ],
  },
  {
    title: 'MARKETING',
    items: [
      { id: 'ads', label: 'Advertisements', icon: Megaphone },
      { id: 'promotions', label: 'Promotions', icon: Percent },
      { id: 'coupons', label: 'Coupons', icon: Tag },
      { id: 'campaigns', label: 'Campaigns', icon: Flag },
    ],
  },
  {
    title: 'CUSTOMERS',
    items: [
      { id: 'customers', label: 'Customer Management', icon: Users },
      { id: 'loyalty', label: 'Loyalty Program', icon: Award },
    ],
  },
  {
    title: 'BUSINESS',
    items: [
      { id: 'finance', label: 'Finance & Ledger', icon: CircleDollarSign },
      { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
      { id: 'branches', label: 'Branch Management', icon: Building2 },
      { id: 'employees', label: 'Employees & Staff', icon: Briefcase },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI', badgeVariant: 'mint' },
      { id: 'market-intel', label: 'Market Intelligence', icon: BrainCircuit },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: '4 New' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
      { id: 'audit-logs', label: 'Audit Logs', icon: History },
    ],
  },
];

const demoOrders: OrderRecord[] = [
  {
    id: 'ORD-20261116-092',
    channel: 'POS_STORE',
    branch: 'Dhanmondi #01',
    customer: 'Walk-in Customer (Guest)',
    itemsCount: 6,
    total: 2150,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    status: 'COMPLETED',
    createdAt: '10 mins ago',
  },
  {
    id: 'ORD-20261116-091',
    channel: 'ONLINE_APP',
    branch: 'Gulshan #02',
    customer: 'Tanvir Hossain (+88017...)',
    itemsCount: 11,
    total: 4890,
    paymentMethod: 'BKASH',
    paymentStatus: 'PAID',
    status: 'PROCESSING',
    createdAt: '18 mins ago',
  },
  {
    id: 'ORD-20261116-090',
    channel: 'POS_STORE',
    branch: 'Dhanmondi #01',
    customer: 'Dr. Sabrina Khan (VIP)',
    itemsCount: 4,
    total: 1420,
    paymentMethod: 'CARD',
    paymentStatus: 'PAID',
    status: 'COMPLETED',
    createdAt: '24 mins ago',
  },
  {
    id: 'ORD-20261116-089',
    channel: 'ONLINE_WEB',
    branch: 'Uttara #03',
    customer: 'Farhan Ahmed (+88018...)',
    itemsCount: 8,
    total: 3120,
    paymentMethod: 'NAGAD',
    paymentStatus: 'PAID',
    status: 'OUT_FOR_DELIVERY',
    createdAt: '35 mins ago',
  },
  {
    id: 'ORD-20261116-088',
    channel: 'POS_STORE',
    branch: 'Gulshan #02',
    customer: 'Walk-in Customer (Guest)',
    itemsCount: 2,
    total: 580,
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    status: 'COMPLETED',
    createdAt: '48 mins ago',
  },
];

const demoCatalogProducts: TopProduct[] = [
  {
    id: 'tp-1',
    sku: 'ECO-GR-0021',
    name: 'Aromatic Chinigura Rice 2kg',
    category: 'Rice & Staples',
    soldUnits: 142,
    revenue: 41180,
    stock: 240,
    price: 290,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'tp-2',
    sku: 'ECO-DY-0014',
    name: 'Farm Fresh Brown Eggs (12 pcs)',
    category: 'Dairy & Eggs',
    soldUnits: 198,
    revenue: 28710,
    stock: 120,
    price: 145,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'tp-3',
    sku: 'ECO-OL-0008',
    name: 'Pure Cold Pressed Mustard Oil 1L',
    category: 'Spices & Oils',
    soldUnits: 88,
    revenue: 25080,
    stock: 94,
    price: 285,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'tp-4',
    sku: 'ECO-VG-0003',
    name: 'Organic Red Tomatoes 1kg',
    category: 'Fresh Vegetables',
    soldUnits: 215,
    revenue: 18275,
    stock: 65,
    price: 85,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'tp-5',
    sku: 'ECO-ML-0019',
    name: 'Pasteurized Whole Milk 1000ml',
    category: 'Dairy & Eggs',
    soldUnits: 164,
    revenue: 16400,
    stock: 45,
    price: 100,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'tp-6',
    sku: 'ECO-FL-0005',
    name: 'Premium Chakki Fresh Atta 2kg',
    category: 'Rice & Staples',
    soldUnits: 110,
    revenue: 15400,
    stock: 180,
    price: 140,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&auto=format&fit=crop&q=80',
  },
];

const demoNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'error',
    title: 'Near-Expiry Warning (FEFO)',
    description: '14 units of Farm Fresh Whole Milk expiring within 48 hours at Dhanmondi Branch.',
    time: '8m ago',
    isRead: false,
    branch: 'Dhanmondi',
  },
  {
    id: 'notif-2',
    type: 'warning',
    title: 'Low Stock Alert Triggered',
    description: 'Miniket Rice 25kg stock dropped below threshold (14 left). Automated restock PO draft created.',
    time: '22m ago',
    isRead: false,
    branch: 'Uttara',
  },
  {
    id: 'notif-3',
    type: 'success',
    title: 'High-Value POS Sale Registered',
    description: 'Terminal #02 processed cash invoice #INV-9402 of ৳ 14,250 with manager clearance.',
    time: '1h ago',
    isRead: false,
    branch: 'Gulshan',
  },
  {
    id: 'notif-4',
    type: 'info',
    title: 'Warehouse Transfer Dispatched',
    description: 'Transfer TR-2026-091 from Central Warehouse is in transit to Uttara Sector 11.',
    time: '2h ago',
    isRead: true,
    branch: 'Central Hub',
  },
];

const salesChartData = [
  { day: 'Wed', pos: 124000, online: 32000, total: 156000 },
  { day: 'Thu', pos: 138000, online: 38000, total: 176000 },
  { day: 'Fri (Jummah)', pos: 182000, online: 54000, total: 236000 },
  { day: 'Sat', pos: 168000, online: 46000, total: 214000 },
  { day: 'Sun', pos: 142000, online: 35000, total: 177000 },
  { day: 'Mon', pos: 131000, online: 31000, total: 162000 },
  { day: 'Today', pos: 148500, online: 36000, total: 184500 },
];

// ==========================================
// ADMIN DASHBOARD MAIN SHELL
// ==========================================
interface AdminDashboardShellProps {
  adminUser?: { name: string; role: string; email: string };
  onLogout?: () => void;
}

function AdminDashboardShell({ adminUser, onLogout }: AdminDashboardShellProps = {}) {
  const { toast } = useToast();

  // App Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [activeRouteId, setActiveRouteId] = React.useState('dashboard');
  const [selectedBranch, setSelectedBranch] = React.useState<BranchOption>(branchOptions[0]);

  // Dropdown Panels States
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = React.useState(false);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);

  // Theme State (Light / Dark)
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Operational Checklist states
  const [taskVerificationStatus, setTaskVerificationStatus] = React.useState<'pending' | 'verified'>('pending');
  const [taskReceivingStatus, setTaskReceivingStatus] = React.useState<'pending' | 'received'>('pending');
  const [taskAuditStatus, setTaskAuditStatus] = React.useState<'pending' | 'completed'>('pending');
  const [taskSensorStatus, setTaskSensorStatus] = React.useState<'pending' | 'verified'>('pending');

  // Futuristic Dashboard States
  const [salesChartPeriod, setSalesChartPeriod] = React.useState<'today' | '7d' | '30d' | 'q4'>('7d');
  const [isAiOptimizing, setIsAiOptimizing] = React.useState(false);
  const [aiPlanExecuted, setAiPlanExecuted] = React.useState(false);
  const [liveDhakaClock, setLiveDhakaClock] = React.useState('');

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveDhakaClock(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry refresh loading state
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastRefreshedText, setLastRefreshedText] = React.useState('Just now');

  // Notifications State
  const [notifications, setNotifications] = React.useState(demoNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // POS State
  const [posCart, setPosCart] = React.useState<PosCartItem[]>([
    { id: 'tp-1', name: 'Aromatic Chinigura Rice 2kg', sku: 'ECO-GR-0021', price: 290, quantity: 1 },
    { id: 'tp-4', name: 'Organic Red Tomatoes 1kg', sku: 'ECO-VG-0003', price: 85, quantity: 2 },
  ]);
  const [posBarcodeQuery, setPosBarcodeQuery] = React.useState('');
  const [posTenderModalOpen, setPosTenderModalOpen] = React.useState(false);
  const [posPaymentMethod, setPosPaymentMethod] = React.useState<'CASH' | 'BKASH' | 'CARD'>('CASH');
  const [cashTendered, setCashTendered] = React.useState('1000');
  const [completedReceipt, setCompletedReceipt] = React.useState<{
    invoiceNo: string;
    items: PosCartItem[];
    subtotal: number;
    vat: number;
    total: number;
    tendered: number;
    change: number;
    paymentMethod: string;
    timestamp: string;
  } | null>(null);

  // ==========================================
  // REAL-TIME SALES, ORDERS & REVIEWS STATE
  // ==========================================
  const [liveOrders, setLiveOrders] = React.useState<any[]>([]);
  const [liveSalesProducts, setLiveSalesProducts] = React.useState<any[]>([]);
  const [topSellingProduct, setTopSellingProduct] = React.useState<any | null>(null);
  const [liveGrandRevenue, setLiveGrandRevenue] = React.useState(0);
  const [liveGrandUnits, setLiveGrandUnits] = React.useState(0);
  const [badReviews, setBadReviews] = React.useState<any[]>([]);
  const [badReviewsCount, setBadReviewsCount] = React.useState(0);
  const [isOrdersSyncing, setIsOrdersSyncing] = React.useState(false);
  const [salesSearchQuery, setSalesSearchQuery] = React.useState('');
  const [salesCategoryFilter, setSalesCategoryFilter] = React.useState('all');
  const [salesSortBy, setSalesSortBy] = React.useState<'volume' | 'revenue' | 'rating' | 'stock'>('volume');
  const [salesReportTab, setSalesReportTab] = React.useState<'overview' | 'products' | 'orders' | 'bad-reviews'>('overview');

  // AI Copilot state
  const [aiPromptInput, setAiPromptInput] = React.useState('');
  const [aiResponses, setAiResponses] = React.useState<Array<{ q: string; a: string; time: string; tag: string }>>([
    {
      q: 'Gulshan-2 ব্রাঞ্চের জন্য আগামী শুক্রবারের ফ্রেশ মিল্ক ও মিষ্টি পেয়ারা ডিমান্ড প্রেডিকশন কী?',
      a: 'গত ৩ সপ্তাহের শুক্রবারের সেলস ডাটা ও আবহাওয়ার রিপোর্ট বিশ্লেষণ করে দেখা যাচ্ছে: আগামী শুক্রবারে Gulshan-2 তে ফ্রেশ মিল্কের চাহিদা প্রায় ৪৫% বৃদ্ধি পাবে (প্রত্যাশিত সেলস: ১৪০ লিটার)। ফ্রেশ পেয়ারার বর্তমান ৩ কেজি লাইভ রান রেট অনুযায়ী স্টক অন্তত ৩৫ কেজিতে উন্নীত করার জন্য বগুড়া ও বরিশাল সরবরাহকারীদের সাথে ইনওয়ার্ড পিও (PO) অবিলম্বে প্রস্তুত করার পরামর্শ দেওয়া হলো।',
      time: '10:30 AM',
      tag: 'Demand Surge Forecast',
    },
    {
      q: 'কোন কোন পণ্যের স্টক দ্রুত শেষ হয়ে যাওয়ার ঝুঁকিতে রয়েছে?',
      a: '৩টি পণ্যের স্টক সেফটি বাফারের নিচে নেমে গেছে: ১. তাজা পেয়ারা ১ কেজি (বর্তমান স্টক: ৪৭ কেজি, রান রেট উচ্চ), ২. দেশি খাঁটি ঘি ৫০০ গ্রাম (মজুদ: ৩ জার), ৩. সুগন্ধি চিনিগুঁড়া চাল (মজুদ: ৮ ব্যাগ)। আজকের মধ্যে স্টক ট্রান্সফার বা সরবরাহকারী রিকুইজিশন পাঠান।',
      time: '09:15 AM',
      tag: 'Stock Depletion Warning',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  // Settings State
  const [storeSettings, setStoreSettings] = React.useState({
    storeName: 'ECOBAZAR SUPERMARKET',
    tagline: 'Freshness in Every Choice',
    binNumber: '003891048-0101',
    vatPercent: 5,
    currencySymbol: '৳',
    contactPhone: '+880 9612-000000',
    contactEmail: 'contact@ecobazar.com.bd',
    address: 'Gulshan-2 Superstore, Circle-2, Dhaka',
    enableSmsAlerts: true,
    enableFefoDiscount: true,
  });

  // ==========================================
  // FULL STORE & CATALOG MANAGEMENT STATE
  // ==========================================
  const [products, setProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [heroSlides, setHeroSlides] = React.useState<any[]>([]);
  const [topBanner, setTopBanner] = React.useState<any>({
    enabled: true,
    badgeText: 'VOUCHER SAVINGS',
    title: 'Save 10% on your entire basket with code ECO10',
    subtitle: 'Applies on all fresh produce, groceries, and staples. Free delivery included for orders above ৳1,000.',
    promoCode: 'ECO10',
    discountPercent: 10,
    buttonText: 'Explore All Offers',
    buttonLink: '/offers',
  });
  const [promoBanners, setPromoBanners] = React.useState<any[]>([]);
  const [isCatalogLoading, setIsCatalogLoading] = React.useState(true);

  // Filter & Search states
  const [productSearchQuery, setProductSearchQuery] = React.useState('');
  const [selectedProductCategory, setSelectedProductCategory] = React.useState('all');
  const [selectedProductFlag, setSelectedProductFlag] = React.useState<
    'all' | 'hot-deal' | 'new-arrival' | 'offer' | 'ad' | 'low-stock'
  >('all');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
  const [productModalTab, setProductModalTab] = React.useState<
    'general' | 'pricing' | 'placements' | 'media' | 'details'
  >('general');
  const [isSavingProduct, setIsSavingProduct] = React.useState(false);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);
  const [isDraggingFile, setIsDraggingFile] = React.useState(false);
  const [livePreviewTab, setLivePreviewTab] = React.useState<'card' | 'details'>('card');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Product Form Model & Types
  interface ProductFormData {
    id: string;
    name: string;
    nameBn: string;
    category: string;
    categorySlug: string;
    subcategory: string;
    brand: string;
    origin: string;
    price: number | string;
    originalPrice: number | string;
    unit: string;
    stock: number | string;
    badge: string;
    badgeColor: 'red' | 'green' | 'orange' | 'purple';
    image: string;
    images: string[];
    isHotDeal: boolean;
    isNewArrival: boolean;
    isOffer: boolean;
    isAdvertisement: boolean;
    // Section toggles: controls which sections are shown on the details page
    includeDescription: boolean;
    includeFeatures: boolean;
    includeBenefits: boolean;
    includeHowToUse: boolean;
    includeStorage: boolean;
    description: string;
    keyFeaturesText: string;
    healthBenefitsText: string;
    howToUse: string;
    storageInstructions: string;
    countryOfOrigin: string;
  }

  const blankProductForm: ProductFormData = {
    id: '',
    name: '',
    nameBn: '',
    category: 'Fresh Fruits & Vegetables',
    categorySlug: 'fresh-fruits-vegetables',
    subcategory: '',
    brand: 'ECOBAZAR Organic',
    origin: 'Bangladesh',
    price: '',
    originalPrice: '',
    unit: '1 kg pack',
    stock: 50,
    badge: '',
    badgeColor: 'green',
    image: '',
    images: [],
    isHotDeal: false,
    isNewArrival: true,
    isOffer: false,
    isAdvertisement: false,
    includeDescription: true,
    includeFeatures: true,
    includeBenefits: true,
    includeHowToUse: false, // Default false for produce/fruits/veggies
    includeStorage: true,
    description: '',
    keyFeaturesText: '',
    healthBenefitsText: '',
    howToUse: '',
    storageInstructions: '',
    countryOfOrigin: 'Bangladesh',
  };

  const quickPresets: (Omit<ProductFormData, 'id'> & { label: string })[] = [
    {
      label: '🍯 Pure Sundarban Honey',
      name: 'Sundarban Raw Wild Honey 1kg',
      nameBn: 'সুন্দরবন খাঁটি প্রাকৃতিক চাকের মধু ১ কেজি',
      category: 'Honey & Natural Spreads',
      categorySlug: 'honey-spreads',
      subcategory: 'Sundarban Honey',
      brand: 'ECOBAZAR Organic',
      origin: 'Sundarbans, Bangladesh',
      price: 1200,
      originalPrice: 1450,
      unit: '1 kg jar',
      stock: 85,
      badge: '17% OFF',
      badgeColor: 'red',
      image: '/images/products/sundarban-honey.webp',
      images: ['/images/products/sundarban-honey.webp'],
      isHotDeal: true,
      isNewArrival: true,
      isOffer: false,
      isAdvertisement: true,
      includeDescription: true,
      includeFeatures: true,
      includeBenefits: true,
      includeHowToUse: true,
      includeStorage: true,
      description: 'Ethically hand-harvested from deep mangrove forests of the Sundarbans. 100% raw, unfiltered honey rich in natural active enzymes, pollen, and antimicrobial flavonoids.',
      keyFeaturesText: '100% Pure, raw, unfiltered and unpasteurized\nDirectly harvested by traditional Mouwals in the Sundarbans\nZero added sugar, corn syrup, or preservative chemicals\nLab tested for diastase activity and moisture purity',
      healthBenefitsText: 'Natural cough suppressor and throat soothing agent\nPowerful antioxidant and immune system booster\nHealthy alternative to refined sugar for tea and desserts',
      howToUse: 'Mix 1-2 teaspoons in warm water with fresh lemon every morning on an empty stomach.',
      storageInstructions: 'Store at room temperature in a dry place. Never refrigerate raw honey.',
      countryOfOrigin: 'Bangladesh',
    },
    {
      label: '🌾 Miniket Rice',
      name: 'Premium Miniket Rice (Special Cleaned)',
      nameBn: 'প্রিমিয়াম মিনিকেট চাল (স্পেশাল বাছাইকৃত)',
      category: 'Rice, Flour & Grains',
      categorySlug: 'rice-grains',
      subcategory: 'Miniket Rice',
      brand: 'Kushtia Golden Rice',
      origin: 'Kushtia, Bangladesh',
      price: 360,
      originalPrice: 410,
      unit: '5 kg bag',
      stock: 120,
      badge: 'BEST VALUE',
      badgeColor: 'green',
      image: '/images/products/miniket-chal.jpg',
      images: ['/images/products/miniket-chal.jpg'],
      isHotDeal: true,
      isNewArrival: false,
      isOffer: true,
      isAdvertisement: false,
      includeDescription: true,
      includeFeatures: true,
      includeBenefits: true,
      includeHowToUse: true,
      includeStorage: true,
      description: 'Slender, fragrant, triple-sorted Miniket rice milled from fresh paddy. Fluffs up non-sticky with exceptional culinary texture.',
      keyFeaturesText: '100% stone-free, triple automated optical sorting\nCooks extra-long, non-sticky and fragrant grains\nMilled from single-origin Kushtia farm paddy\nFood-grade breathable woven packaging',
      healthBenefitsText: 'Easily digestible carbohydrates for sustained daily energy\nLow fat and zero cholesterol staple grain\nIdeal for everyday family lunch and dinner',
      howToUse: 'Wash thoroughly 2-3 times before cooking. Boil with 1:2 rice-to-water ratio for 15-18 minutes.',
      storageInstructions: 'Store in an airtight drum or cool container away from moisture and pests.',
      countryOfOrigin: 'Bangladesh',
    },
    {
      label: '🍅 Farm Red Tomato',
      name: 'Farm Fresh Red Salad Tomatoes',
      nameBn: 'ক্ষেতের তাজা লাল টমেটো',
      category: 'Fresh Fruits & Vegetables',
      categorySlug: 'fresh-fruits-vegetables',
      subcategory: 'Fresh Vegetables',
      brand: 'Bogura Farmers Co-op',
      origin: 'Bogura, Bangladesh',
      price: 75,
      originalPrice: 90,
      unit: '1 kg pack',
      stock: 200,
      badge: 'FRESH PICK',
      badgeColor: 'green',
      image: '/images/products/red-tomato.jpg',
      images: ['/images/products/red-tomato.jpg'],
      isHotDeal: true,
      isNewArrival: true,
      isOffer: false,
      isAdvertisement: false,
      includeDescription: true,
      includeFeatures: true,
      includeBenefits: true,
      includeHowToUse: false,
      includeStorage: true,
      description: 'Crisp, juicy vine-ripened tomatoes harvested at peak sweetness from Bogura soils. Unbroken cold transport locks in garden flavor.',
      keyFeaturesText: 'Vine-ripened without harmful calcium carbide or ripening agents\nHand-graded for uniform firmness and skin luster\nDirect farm dispatch within 12 hours of harvest',
      healthBenefitsText: 'Packed with Lycopene, a potent antioxidant for heart and skin health\nRich in Vitamin C, Vitamin K, and Potassium\nNaturally low-calorie and hydrating for daily salads',
      howToUse: '',
      storageInstructions: 'Keep at room temperature until ripe, then store in the vegetable crisper drawer.',
      countryOfOrigin: 'Bangladesh',
    },
    {
      label: '🧈 Pure Deshi Ghee',
      name: 'Pure Deshi Cow Milk Ghee (Bilona Churned)',
      nameBn: 'খাঁটি দেশি গাভীর বিলোনা ঘি',
      category: 'Dairy, Eggs & Butter',
      categorySlug: 'dairy-eggs',
      subcategory: 'Deshi Ghee',
      brand: 'Pabna Heritage Dairy',
      origin: 'Pabna, Bangladesh',
      price: 1350,
      originalPrice: 1550,
      unit: '500 gm jar',
      stock: 45,
      badge: 'PREMIUM',
      badgeColor: 'orange',
      image: '/images/products/deshi-ghee.webp',
      images: ['/images/products/deshi-ghee.webp'],
      isHotDeal: false,
      isNewArrival: true,
      isOffer: true,
      isAdvertisement: true,
      includeDescription: true,
      includeFeatures: true,
      includeBenefits: true,
      includeHowToUse: true,
      includeStorage: true,
      description: 'Traditional bilona churned aromatic ghee made from pure grass-fed Deshi cow milk cultured curd. Golden granulated texture with unforgettable nutty fragrance.',
      keyFeaturesText: 'Traditional Vedic Bilona slow-simmer method from cultured curd\n100% grass-fed Deshi cow whole milk\nNo artificial coloring, essence, or palm oil adulteration\nGlass jar packaging preserves authentic grain texture',
      healthBenefitsText: 'Contains Butyric acid supporting intestinal gut lining\nRich in fat-soluble vitamins A, D, E, and K\nEnhances digestion and nutrient assimilation',
      howToUse: 'Drizzle over steaming hot rice, khichuri, dal, or use for baking and roasting.',
      storageInstructions: 'Store in a cool dry pantry. Use a dry spoon every time.',
      countryOfOrigin: 'Bangladesh',
    },
    {
      label: '🥚 Organic Brown Eggs',
      name: 'Fresh Organic Brown Farm Eggs',
      nameBn: 'ফার্মের তাজা লাল ডিম (১২ পিস)',
      category: 'Dairy, Eggs & Butter',
      categorySlug: 'dairy-eggs',
      subcategory: 'Farm Eggs',
      brand: 'ECOBAZAR Poultry',
      origin: 'Gazipur, Bangladesh',
      price: 145,
      originalPrice: 160,
      unit: '12 pcs pack',
      stock: 180,
      badge: 'DAILY ESSENTIAL',
      badgeColor: 'green',
      image: '/images/products/dozen-egg.webp',
      images: ['/images/products/dozen-egg.webp'],
      isHotDeal: true,
      isNewArrival: false,
      isOffer: true,
      isAdvertisement: false,
      includeDescription: true,
      includeFeatures: true,
      includeBenefits: true,
      includeHowToUse: false,
      includeStorage: true,
      description: 'Farm-fresh graded brown eggs laid by healthy, grain-fed hens. Packed with clean thick egg whites and golden nutrient-rich yolks.',
      keyFeaturesText: 'UV-sanitized and graded for size and weight\nDelivered within 24 hours of farm collection\nShock-absorbent molded paper pulp egg carton',
      healthBenefitsText: 'Complete high-biological-value protein for muscle development\nRich in choline for brain and cognitive health\nEssential vitamins B12, riboflavin, and selenium',
      howToUse: '',
      storageInstructions: 'Refrigerate pointed end down for maximum shelf freshness.',
      countryOfOrigin: 'Bangladesh',
    },
  ];

  const [productForm, setProductForm] = React.useState<ProductFormData>(blankProductForm);

  // Category Edit Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<any | null>(null);
  const [categoryForm, setCategoryForm] = React.useState({
    id: '',
    slug: '',
    name: '',
    nameBn: '',
    tagline: '',
    icon: '🥦',
    bannerImage: '/images/banner-farm-grocery.jpg',
    subcategoriesText: '',
  });

  // Hero Slide Modal State
  const [isSlideModalOpen, setIsSlideModalOpen] = React.useState(false);
  const [editingSlide, setEditingSlide] = React.useState<any | null>(null);
  const [slideForm, setSlideForm] = React.useState({
    id: '',
    badge: '',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    image: '',
    bgGradient: 'from-[#123C2D] via-[#123C2D]/95 to-[#1a4a38]',
    tag: '',
  });

  // Fetch Catalog from /api/catalog
  const fetchCatalog = React.useCallback(async () => {
    try {
      const res = await fetch('/api/catalog');
      if (!res.ok) return;
      const data = await res.json();
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.heroSlides && Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
      if (data.topBanner) setTopBanner(data.topBanner);
      if (data.promoBanners && Array.isArray(data.promoBanners)) setPromoBanners(data.promoBanners);
    } catch (e) {
      console.error('Catalog fetch error:', e);
    } finally {
      setIsCatalogLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  // Fetch live orders, product sales volume & customer reviews
  const fetchLiveOrdersAndSales = React.useCallback(async () => {
    try {
      setIsOrdersSyncing(true);
      const [ordersRes, reviewsRes] = await Promise.all([
        fetch('/api/orders', { cache: 'no-store' }),
        fetch('/api/reviews', { cache: 'no-store' }),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        if (oData.success) {
          setLiveOrders(oData.orders || []);
          setLiveSalesProducts(oData.productsWithSales || []);
          setTopSellingProduct(oData.topSellingProduct || null);
          setLiveGrandRevenue(oData.grandRevenue || 0);
          setLiveGrandUnits(oData.grandUnits || 0);
        }
      }

      if (reviewsRes.ok) {
        const rData = await reviewsRes.json();
        if (rData.success) {
          setBadReviews(rData.badReviews || []);
          setBadReviewsCount(rData.badReviewsCount || 0);
        }
      }
    } catch (err) {
      console.error('Failed to sync live orders & sales:', err);
    } finally {
      setIsOrdersSyncing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLiveOrdersAndSales();
    const interval = setInterval(fetchLiveOrdersAndSales, 3500);
    return () => clearInterval(interval);
  }, [fetchLiveOrdersAndSales]);

  // Export Product Sales Report CSV
  const handleExportSalesReportCSV = () => {
    if (!liveSalesProducts || liveSalesProducts.length === 0) {
      toast.error('No Data', 'No product sales data available to export.');
      return;
    }

    const headers = [
      'Product ID',
      'Product Name',
      'Bengali Name',
      'Category',
      'Unit',
      'Price (BDT)',
      'Total Units Sold',
      'Total Revenue (BDT)',
      'Current Stock',
      'Stock Status',
      'Rating',
      'Reviews Count',
    ];

    const rows = liveSalesProducts.map((p) => [
      `"${p.id}"`,
      `"${p.name?.replace(/"/g, '""') || ''}"`,
      `"${p.nameBn?.replace(/"/g, '""') || ''}"`,
      `"${p.category?.replace(/"/g, '""') || ''}"`,
      `"${p.unit || ''}"`,
      p.price || 0,
      p.totalSold || 0,
      p.totalRevenue || 0,
      p.stock || 0,
      `"${(p.stock || 0) <= 5 ? 'LOW_STOCK' : 'IN_STOCK'}"`,
      p.rating || 5,
      p.reviews || 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `ecobazar-product-sales-report-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Sales Report Downloaded', 'Product-by-product sales audit CSV generated successfully.');
  };

  // Export Customer Orders CSV
  const handleExportOrdersCSV = () => {
    if (!liveOrders || liveOrders.length === 0) {
      toast.error('No Orders', 'No orders available to export.');
      return;
    }

    const headers = [
      'Order ID',
      'Date & Time',
      'Customer Name',
      'Customer Phone',
      'Delivery Address',
      'Delivery Slot',
      'Payment Method',
      'Branch',
      'Items Summary',
      'Items Count',
      'Subtotal (BDT)',
      'Delivery Fee (BDT)',
      'Grand Total (BDT)',
      'Status',
    ];

    const rows = liveOrders.map((o) => {
      const itemsSummary = Array.isArray(o.items)
        ? o.items.map((i: any) => `${i.name} (x${i.quantity || 1})`).join('; ')
        : '';
      return [
        `"${o.id}"`,
        `"${o.formattedDate || ''} ${o.formattedTime || ''}"`,
        `"${o.customerName?.replace(/"/g, '""') || ''}"`,
        `"${o.customerPhone || ''}"`,
        `"${o.deliveryAddress?.replace(/"/g, '""') || ''}"`,
        `"${o.deliveryTimeSlot || ''}"`,
        `"${(o.paymentMethod || '').toUpperCase()}"`,
        `"${o.branch || ''}"`,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        Array.isArray(o.items) ? o.items.length : 0,
        o.subtotal || 0,
        o.deliveryFee || 0,
        o.grandTotal || 0,
        `"${o.status || 'PROCESSING'}"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `ecobazar-customer-orders-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Orders Sheet Downloaded', 'Omnichannel orders ledger exported.');
  };

  // Print Executive Report
  const handlePrintExecutiveReport = () => {
    window.print();
  };

  // Resolve Review
  const handleResolveReview = async (reviewId: string) => {
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status: 'RESOLVED' }),
      });
      setBadReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, status: 'RESOLVED' } : r))
      );
      toast.success('Quality Issue Flag Resolved', 'Customer feedback marked as reviewed & addressed.');
    } catch {
      toast.error('Action Failed', 'Could not update review status.');
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      setLiveOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      toast.success('Order Updated', `Order #${orderId} marked as ${status}`);
    } catch {
      toast.error('Failed', 'Could not update order status.');
    }
  };

  // Ask AI Copilot
  const handleAskAi = (promptText?: string) => {
    const text = promptText || aiPromptInput;
    if (!text.trim()) return;
    setIsAiThinking(true);
    setTimeout(() => {
      setAiResponses((prev) => [
        {
          q: text.trim(),
          a: `ECOBAZAR AI Copilot অ্যানালাইসিস সম্পন্ন করেছে: "${text.trim()}" সংক্রান্ত সমস্ত ব্রাঞ্চের ইনভেন্টরি, সেলস ভেলোসিটি এবং ঢাকা আবহাওয়ার প্রেডিকশন মডেল পর্যালোচনা করা হয়েছে। অপ্টিমাইজেশন সুপারিশ কার্যকর অবস্থায় আছে।`,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          tag: 'Real-Time AI Insight',
        },
        ...prev,
      ]);
      setAiPromptInput('');
      setIsAiThinking(false);
      toast.success('AI Insight Ready', 'Operations intelligence generated.');
    }, 600);
  };

  const [manualImageUrl, setManualImageUrl] = React.useState('');

  // Open Add Product Modal (clean blank start, no canned honey text)
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm(blankProductForm);
    setManualImageUrl('');
    setProductModalTab('general');
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: any) => {
    setEditingProduct(prod);
    const existingImages: string[] = Array.isArray(prod.images) && prod.images.length > 0
      ? prod.images.filter(Boolean)
      : (prod.image ? [prod.image] : []);

    setProductForm({
      id: prod.id,
      name: prod.name || '',
      nameBn: prod.nameBn || '',
      category: prod.category || 'Fresh Fruits & Vegetables',
      categorySlug: prod.categorySlug || 'fresh-fruits-vegetables',
      subcategory: prod.subcategory || '',
      brand: prod.brand || 'ECOBAZAR Organic',
      origin: prod.origin || 'Bangladesh',
      price: prod.price !== undefined ? prod.price : '',
      originalPrice: prod.originalPrice !== undefined ? prod.originalPrice : '',
      unit: prod.unit || '1 kg pack',
      stock: prod.stock !== undefined ? prod.stock : 50,
      badge: prod.badge || '',
      badgeColor: prod.badgeColor || 'green',
      image: existingImages[0] || prod.image || '',
      images: existingImages,
      isHotDeal: !!prod.isHotDeal,
      isNewArrival: !!prod.isNewArrival,
      isOffer: !!prod.isOffer,
      isAdvertisement: !!prod.isAdvertisement,
      includeDescription: !!(prod.description && prod.description.trim()),
      includeFeatures: !!(Array.isArray(prod.keyFeatures) && prod.keyFeatures.length > 0),
      includeBenefits: !!(Array.isArray(prod.healthBenefits) && prod.healthBenefits.length > 0),
      includeHowToUse: !!(prod.howToUse && prod.howToUse.trim()),
      includeStorage: !!(prod.storageInstructions && prod.storageInstructions.trim()),
      description: prod.description || '',
      keyFeaturesText: Array.isArray(prod.keyFeatures) ? prod.keyFeatures.join('\n') : (prod.keyFeatures || ''),
      healthBenefitsText: Array.isArray(prod.healthBenefits) ? prod.healthBenefits.join('\n') : (prod.healthBenefits || ''),
      howToUse: prod.howToUse || '',
      storageInstructions: prod.storageInstructions || '',
      countryOfOrigin: prod.countryOfOrigin || prod.origin || 'Bangladesh',
    });
    setManualImageUrl('');
    setProductModalTab('general');
    setIsProductModalOpen(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = async () => {
    if (!productForm.name.trim()) {
      toast.error('Required', 'Please enter a product name in English.');
      return;
    }
    setIsSavingProduct(true);

    const validImages = productForm.images.filter(Boolean);
    const primaryImage = validImages[0] || productForm.image || '/images/products/sundarban-honey.webp';

    const payload = {
      ...productForm,
      image: primaryImage,
      images: validImages.length > 0 ? validImages : [primaryImage],
      price: Number(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      stock: Number(productForm.stock) || 0,
      description: productForm.includeDescription ? productForm.description.trim() : '',
      keyFeatures: productForm.includeFeatures && productForm.keyFeaturesText.trim()
        ? productForm.keyFeaturesText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      healthBenefits: productForm.includeBenefits && productForm.healthBenefitsText.trim()
        ? productForm.healthBenefitsText
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      howToUse: productForm.includeHowToUse ? productForm.howToUse.trim() : '',
      storageInstructions: productForm.includeStorage ? productForm.storageInstructions.trim() : '',
    };

    try {
      if (editingProduct) {
        const res = await fetch('/api/catalog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update-product', product: payload }),
        });
        if (!res.ok) throw new Error('Failed to update product');
        setProducts((prev) => prev.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)));
        toast.success('Product Updated', `"${payload.name}" updated successfully.`);
      } else {
        const res = await fetch('/api/catalog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'add-product', product: payload }),
        });
        if (!res.ok) throw new Error('Failed to create product');
        const data = await res.json();
        setProducts((prev) => [data.product, ...prev]);
        toast.success('Product Created', `"${payload.name}" added to catalog & live store.`);
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
    } catch (e: any) {
      toast.error('Error', e.message || 'Operation failed');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Toggle Single Flag on Product
  const handleToggleProductFlag = async (id: string, field: string, currentValue: boolean) => {
    const nextValue = !currentValue;
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: nextValue } : p)));

    try {
      const res = await fetch('/api/catalog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-flag', id, field, value: nextValue }),
      });
      if (!res.ok) throw new Error('Toggle failed');

      const label =
        field === 'isHotDeal'
          ? 'Best Deal'
          : field === 'isNewArrival'
          ? 'New Arrival'
          : field === 'isOffer'
          ? 'Special Offer'
          : 'Advertisement';
      toast.success(`${label} Updated`, `Marked as ${nextValue ? 'ACTIVE' : 'INACTIVE'} for store.`);
    } catch {
      toast.error('Sync Error', 'Failed to update flag');
      fetchCatalog();
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/catalog?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Product Deleted', `"${name}" removed from catalog & store.`);
    } catch {
      toast.error('Delete Failed', 'Could not delete product');
      fetchCatalog();
    }
  };

  // Unified Rock-Solid Multi-Image Upload Engine (Supports Multiple Files at Once!)
  const processSelectedFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (fileArray.length === 0) {
      toast.error('Invalid Format', 'Please choose valid image files (JPG, PNG, WEBP, AVIF).');
      return;
    }

    setIsUploadingImage(true);
    let uploadedSuccessCount = 0;

    for (const file of fileArray) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error('File Too Large', `"${file.name}" exceeds 15MB limit.`);
        continue;
      }

      try {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(file);
        });

        // 1. Instant 0ms visual preview on client
        setProductForm((prev) => {
          const nextImages = [...prev.images, base64Data];
          return {
            ...prev,
            images: nextImages,
            image: prev.image || nextImages[0],
          };
        });

        // 2. Persist to server via /api/upload
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64: base64Data,
            filename: file.name,
          }),
        });
        const data = await res.json();
        if (data.url) {
          uploadedSuccessCount++;
          setProductForm((prev) => {
            const replaced = prev.images.map((img) => (img === base64Data ? data.url : img));
            return {
              ...prev,
              images: replaced,
              image: replaced[0] || data.url,
            };
          });
        }
      } catch (err: any) {
        console.error('File upload error for', file.name, err);
      }
    }

    setIsUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (uploadedSuccessCount > 0) {
      toast.success(
        'Gallery Updated',
        `${uploadedSuccessCount} photo${uploadedSuccessCount > 1 ? 's' : ''} added to product gallery.`
      );
    }
  };

  const handleImageFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFiles(e.target.files);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleSetCoverImage = (imgUrl: string) => {
    setProductForm((prev) => {
      const rest = prev.images.filter((img) => img !== imgUrl);
      const updated = [imgUrl, ...rest];
      return {
        ...prev,
        images: updated,
        image: imgUrl,
      };
    });
    toast.success('Cover Image Set', 'Selected photo moved to primary cover position.');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setProductForm((prev) => {
      const updated = prev.images.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        image: updated[0] || '',
      };
    });
  };

  const handleAddManualImageUrl = () => {
    const url = manualImageUrl.trim();
    if (!url) return;
    setProductForm((prev) => {
      const updated = [...prev.images, url];
      return {
        ...prev,
        images: updated,
        image: prev.image || updated[0],
      };
    });
    setManualImageUrl('');
    toast.success('Image Added', 'URL added to product gallery.');
  };

  const handleApplyPreset = (preset: (typeof quickPresets)[0]) => {
    setProductForm({
      id: editingProduct ? editingProduct.id : '',
      name: preset.name,
      nameBn: preset.nameBn,
      category: preset.category,
      categorySlug: preset.categorySlug,
      subcategory: preset.subcategory,
      brand: preset.brand,
      origin: preset.origin,
      price: preset.price,
      originalPrice: preset.originalPrice,
      unit: preset.unit,
      stock: preset.stock,
      badge: preset.badge,
      badgeColor: preset.badgeColor,
      image: preset.image,
      images: preset.images || [preset.image],
      isHotDeal: preset.isHotDeal,
      isNewArrival: preset.isNewArrival,
      isOffer: preset.isOffer,
      isAdvertisement: preset.isAdvertisement,
      includeDescription: preset.includeDescription ?? true,
      includeFeatures: preset.includeFeatures ?? true,
      includeBenefits: preset.includeBenefits ?? true,
      includeHowToUse: preset.includeHowToUse ?? false,
      includeStorage: preset.includeStorage ?? true,
      description: preset.description,
      keyFeaturesText: preset.keyFeaturesText,
      healthBenefitsText: preset.healthBenefitsText,
      howToUse: preset.howToUse,
      storageInstructions: preset.storageInstructions,
      countryOfOrigin: preset.countryOfOrigin,
    });
    toast.success('Preset Applied', `Loaded "${preset.label}" details into form.`);
  };

  // Save Banners & Announcements
  const handleSaveTopBanner = async () => {
    try {
      const res = await fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-banner',
          topBanner,
          heroSlides,
          promoBanners,
        }),
      });
      if (!res.ok) throw new Error('Failed to save announcement bar');
      toast.success('Announcement Bar Saved', 'Top promo voucher updated on store.');
    } catch {
      toast.error('Error', 'Failed to save announcement bar.');
    }
  };

  // Save Category Edit
  const handleSaveCategory = async () => {
    try {
      const subcategories = categoryForm.subcategoriesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...editingCategory,
        name: categoryForm.name,
        nameBn: categoryForm.nameBn,
        tagline: categoryForm.tagline,
        icon: categoryForm.icon,
        bannerImage: categoryForm.bannerImage,
        subcategories: subcategories.length > 0 ? subcategories : editingCategory.subcategories,
      };

      const res = await fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update-category', category: payload }),
      });
      if (!res.ok) throw new Error('Failed to update category');
      setCategories((prev) => prev.map((c) => (c.id === payload.id ? payload : c)));
      setIsCategoryModalOpen(false);
      toast.success('Category Updated', `${payload.name} updated on live store.`);
    } catch {
      toast.error('Error', 'Failed to save category.');
    }
  };

  // Toggle Theme Function
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        toast.info('Theme Changed', 'Switched to Dark Mode theme.');
      } else {
        document.documentElement.classList.remove('dark');
        toast.info('Theme Changed', 'Switched to Light Mode theme.');
      }
      return next;
    });
  };

  // Keyboard shortcut listener for Ctrl+K command palette
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered metrics based on branch scope
  const branchMultiplier = selectedBranch.id === 'all' ? 1 : selectedBranch.id === 'br-1' ? 0.45 : selectedBranch.id === 'br-2' ? 0.35 : 0.2;
  const metrics = {
    revenue: Math.round(184500 * branchMultiplier),
    revenueChange: '+14.2% vs yesterday',
    orders: Math.round(342 * branchMultiplier),
    ordersPos: Math.round(298 * branchMultiplier),
    ordersOnline: Math.round(44 * branchMultiplier),
    activeProducts: Math.round(1420 * (selectedBranch.id === 'all' ? 1 : 0.9)),
    lowStockCount: Math.round(12 * branchMultiplier) || 2,
    expiryAlertsCount: Math.round(8 * branchMultiplier) || 1,
  };

  const handleBranchSelect = (branch: BranchOption) => {
    setSelectedBranch(branch);
    setIsBranchDropdownOpen(false);
    toast.success('Branch Scope Updated', `Viewing analytics for: ${branch.name}`);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.info('Notifications Updated', 'All alerts marked as read.');
  };

  const handleNavigationClick = (item: NavItem) => {
    setActiveRouteId(item.id);
    setIsMobileSidebarOpen(false);
    toast.info(`Navigated to ${item.label}`, `Active module: ${item.label}`);
  };

  // Real CSV Export Handler
  const handleExportCSV = () => {
    try {
      const csvHeader = 'Order_ID,Channel,Branch,Customer,Items_Count,Total_BDT,Payment_Method,Status,Created_At\n';
      const csvRows = demoOrders
        .map(
          (o) =>
            `"${o.id}","${o.channel}","${o.branch}","${o.customer}",${o.itemsCount},${o.total},"${o.paymentMethod}","${o.status}","${o.createdAt}"`
        )
        .join('\n');

      const csvContent = '\uFEFF' + csvHeader + csvRows;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `ecobazar-executive-telemetry-${selectedBranch.code}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Report Downloaded', `Exported executive data to ecobazar-executive-telemetry-${selectedBranch.code}.csv`);
    } catch {
      toast.error('Export Failed', 'Unable to generate CSV report.');
    }
  };

  // Functional Telemetry Refresh
  const handleRefreshTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshedText('Just now');
      toast.success('Telemetry Refreshed', `Synchronized live transactions for ${selectedBranch.name}`);
    }, 600);
  };

  // POS Calculations
  const posSubtotal = posCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const posVat = Math.round(posSubtotal * 0.05); // 5% retail VAT
  const posTotal = posSubtotal + posVat;

  const handleAddPosProduct = (prod: TopProduct) => {
    setPosCart((prev) => {
      const existing = prev.find((item) => item.id === prod.id);
      if (existing) {
        return prev.map((item) => (item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: prod.id, name: prod.name, sku: prod.sku, price: prod.price, quantity: 1 }];
    });
    toast.success('Added to POS Cart', prod.name);
  };

  const handleUpdatePosQuantity = (id: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemovePosItem = (id: string) => {
    setPosCart((prev) => prev.filter((item) => item.id !== id));
    toast.info('Item Removed', 'Product removed from POS register.');
  };

  const handleCompletePosSale = () => {
    const tenderedNum = Number(cashTendered) || posTotal;
    if (posPaymentMethod === 'CASH' && tenderedNum < posTotal) {
      toast.error('Insufficient Cash', `Tendered amount (৳${tenderedNum}) is less than total ৳${posTotal}`);
      return;
    }

    const change = posPaymentMethod === 'CASH' ? tenderedNum - posTotal : 0;
    const invNo = `INV-POS-${Math.floor(100000 + Math.random() * 900000)}`;

    setCompletedReceipt({
      invoiceNo: invNo,
      items: [...posCart],
      subtotal: posSubtotal,
      vat: posVat,
      total: posTotal,
      tendered: tenderedNum,
      change,
      paymentMethod: posPaymentMethod,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });

    setPosCart([]);
    setPosTenderModalOpen(false);
    toast.success('Sale Completed!', `Invoice #${invNo} generated successfully.`);
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-slate-50 text-slate-900'} antialiased font-sans`}>
      {/* ========================================================= */}
      {/* 1. COLLAPSIBLE ENTERPRISE SIDEBAR */}
      {/* ========================================================= */}
      <aside
        style={{ backgroundColor: '#123C2D' }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col text-white transition-all duration-300 ease-in-out shadow-2xl lg:static ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand & Collapse Header */}
        <div className="h-16 px-4 border-b border-emerald-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => setActiveRouteId('dashboard')}>
            <Logo variant="light" size={isSidebarCollapsed ? 'sm' : 'md'} showTagline={!isSidebarCollapsed} />
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/60 transition"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-emerald-300 hover:text-white"
            aria-label="Close mobile sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Sections & Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 select-none scrollbar-thin scrollbar-thumb-emerald-900">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isSidebarCollapsed && (
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400/80 mb-1.5">
                  {section.title}
                </p>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeRouteId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigationClick(item)}
                    className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all group ${
                      isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-3 py-2.5'
                    } ${
                      isActive
                        ? 'bg-primary-green text-white font-black shadow-md shadow-emerald-950/40'
                        : 'text-emerald-100/90 hover:bg-emerald-800/40 hover:text-white'
                    }`}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                      {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isSidebarCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          item.badgeVariant === 'danger'
                            ? 'bg-rose-500 text-white'
                            : item.badgeVariant === 'warning'
                            ? 'bg-amber-400 text-neutral-950'
                            : item.badgeVariant === 'success'
                            ? 'bg-emerald-400 text-emerald-950'
                            : 'bg-emerald-800/80 text-emerald-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Fast POS Launcher */}
        <div className="p-3 border-t border-emerald-900/60 bg-[#0E3225]">
          {!isSidebarCollapsed ? (
            <button
              type="button"
              onClick={() => {
                setActiveRouteId('pos');
                toast.success('POS Register Online', 'Switched to Dhanmondi Register #01');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-md transition"
            >
              <MonitorCheck className="h-4 w-4" />
              <span>Launch POS Terminal</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setActiveRouteId('pos');
                toast.success('POS Register Online', 'Switched to Dhanmondi Register #01');
              }}
              className="w-full p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center justify-center transition"
              title="Launch POS Register"
            >
              <MonitorCheck className="h-5 w-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Backdrop overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* 2. MAIN APPLICATION CONTENT AREA */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* ========================================================= */}
        {/* TOPBAR NAVIGATION */}
        {/* ========================================================= */}
        <header className={`h-16 px-4 sm:px-6 border-b flex items-center justify-between sticky top-0 z-30 transition-colors ${
          isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        }`}>
          {/* Left: Mobile hamburger & Global Search */}
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Open mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Quick Command Search (Ctrl+K) */}
            <div
              onClick={() => setIsCommandPaletteOpen(true)}
              className="w-full max-w-sm flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 transition"
            >
              <Search className="h-4 w-4" />
              <span className="text-xs font-medium flex-1 text-left">Search SKU, orders, modules...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-neutral-700 rounded shadow-xs border border-neutral-200 dark:border-neutral-600">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right: Branch Selector, Notifications, Theme & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
              >
                <Building2 className="h-3.5 w-3.5 text-primary-green" />
                <span className="max-w-[120px] sm:max-w-[180px] truncate">{selectedBranch.name}</span>
                <ChevronDown className="h-3 w-3 text-emerald-600" />
              </button>

              {isBranchDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <p className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                    Switch Operating Branch Scope
                  </p>
                  <div className="space-y-1">
                    {branchOptions.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleBranchSelect(b)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition flex flex-col ${
                          selectedBranch.id === b.id
                            ? 'bg-primary-green text-white font-bold'
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200'
                        }`}
                      >
                        <span className="font-bold">{b.name}</span>
                        <span className={`text-[10px] ${selectedBranch.id === b.id ? 'text-emerald-100' : 'text-neutral-400'}`}>
                          {b.address} • {b.posCount} POS
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle dark/light theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
            </button>

            {/* Notification Center Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-neutral-900" />
                )}
              </button>

              {isNotifPanelOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Live System Alerts</h4>
                      <Badge variant="forest" size="sm">{unreadCount} New</Badge>
                    </div>
                    <button
                      type="button"
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] font-semibold text-primary-green hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto py-2 space-y-2">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border text-left transition ${
                          n.isRead
                            ? 'bg-transparent border-transparent opacity-60'
                            : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">{n.title}</p>
                          <span className="text-[10px] text-neutral-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instant Terminal Lockout Button */}
            <button
              type="button"
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  sessionStorage.removeItem('ecobazar_admin_session');
                  window.location.reload();
                }
              }}
              title="Lock admin session immediately"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 dark:hover:bg-rose-600 dark:hover:text-white border border-rose-200 dark:border-rose-800 text-xs font-bold transition-all shadow-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Terminal</span>
            </button>

            {/* Profile Menu Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <div className="h-8 w-8 rounded-full bg-[#123C2D] text-[#2EBD70] border border-[#2EBD70]/30 flex items-center justify-center font-bold text-xs shadow-xs">
                  {adminUser ? adminUser.name.substring(0, 2).toUpperCase() : 'RR'}
                </div>
                <div className="hidden md:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {adminUser?.name || 'Raihan Hasan Rana'}
                  </span>
                  <span className="text-[10px] text-[#21A366] font-semibold mt-0.5 truncate max-w-[140px]">
                    {adminUser?.role || 'Founder & Super Admin'}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800 text-left">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      {adminUser?.name || 'Raihan Hasan Rana'}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      {adminUser?.email || 'admin@ecobazar.com'}
                    </p>
                    <Badge variant="forest" size="sm" className="mt-1 text-[9px]">
                      {adminUser?.role || 'Founder & CEO'}
                    </Badge>
                  </div>
                  <div className="py-1 text-left text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => { setActiveRouteId('settings'); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                    >
                      <Settings className="h-3.5 w-3.5 text-neutral-400" />
                      <span>Profile & Security</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveRouteId('audit-logs'); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                    >
                      <History className="h-3.5 w-3.5 text-neutral-400" />
                      <span>My Audit Trail</span>
                    </button>
                    <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onLogout) {
                          onLogout();
                        } else {
                          sessionStorage.removeItem('ecobazar_admin_session');
                          window.location.reload();
                        }
                      }}
                      className="w-full px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 text-rose-600 font-bold"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>Lock & Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* DASHBOARD BODY CONTENT (ROUTED BY activeRouteId) */}
        {/* ========================================================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Development Demo Data Disclaimer Banner */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs shadow-xs">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            <div className="flex-1">
              <strong>DEMONSTRATION RUNTIME:</strong> Showing simulated multi-branch retail telemetry, POS transactions, and automated FEFO expiry alerts for development evaluation.
            </div>
            <Badge variant="warning" size="sm">Dev Data Mode</Badge>
          </div>

          {/* ========================================== */}
          {/* VIEW: POS TERMINAL REGISTER */}
          {/* ========================================== */}
          {activeRouteId === 'pos' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-3">
                    <Store className="h-7 w-7 text-primary-green" />
                    Point of Sale (POS) Register
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                    Terminal #01 • Dhanmondi Flagship Store • Cashier: Mohammad Karim
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveRouteId('dashboard')}>
                    ← Back to Dashboard
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Product Selector Grid (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-neutral-900 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
                    <Search className="h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Scan Barcode or Search SKU (e.g. ECO-GR-0021)..."
                      value={posBarcodeQuery}
                      onChange={(e) => setPosBarcodeQuery(e.target.value)}
                      className="w-full text-sm bg-transparent outline-hidden text-neutral-900 dark:text-white placeholder:text-neutral-400"
                    />
                    {posBarcodeQuery && (
                      <button type="button" onClick={() => setPosBarcodeQuery('')} className="text-xs text-neutral-400 hover:text-neutral-600">
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {demoCatalogProducts
                      .filter((p) => !posBarcodeQuery || p.name.toLowerCase().includes(posBarcodeQuery.toLowerCase()) || p.sku.toLowerCase().includes(posBarcodeQuery.toLowerCase()))
                      .map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => handleAddPosProduct(prod)}
                          className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 flex flex-col justify-between hover:border-primary-green hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="h-24 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-2">
                            <img src={prod.image} alt={prod.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{prod.sku}</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                            <span className="font-black text-sm text-forest-900 dark:text-emerald-400">৳{prod.price}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-primary-green">
                              + Add
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right: POS Order Tally & Checkout (5 cols) */}
                <div className="lg:col-span-5">
                  <Card className="p-5 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center gap-2">
                          <Receipt className="h-4 w-4 text-neutral-500" />
                          <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Active Order Tally</h3>
                        </div>
                        <span className="text-xs font-bold text-neutral-400">{posCart.length} Items</span>
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800 my-3">
                        {posCart.length === 0 ? (
                          <div className="py-8 text-center text-xs text-neutral-400">
                            Scan a barcode or click items on the left to add.
                          </div>
                        ) : (
                          posCart.map((item) => (
                            <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{item.name}</p>
                                <p className="text-[10px] text-neutral-400 font-mono">৳{item.price} each</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdatePosQuantity(item.id, -1)}
                                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="px-2 text-xs font-bold">{item.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdatePosQuantity(item.id, 1)}
                                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <span className="font-black text-xs text-forest-900 dark:text-emerald-400 w-14 text-right">
                                  ৳{item.price * item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePosItem(item.id)}
                                  className="text-neutral-300 hover:text-rose-500 p-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>Subtotal</span>
                        <span>৳{posSubtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>Retail VAT (5%)</span>
                        <span>৳{posVat.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-base font-black text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
                        <span>Grand Total</span>
                        <span className="text-xl text-forest-900 dark:text-emerald-400">৳{posTotal.toLocaleString()}</span>
                      </div>

                      <Button
                        variant="forest"
                        size="lg"
                        className="w-full mt-4 font-black"
                        disabled={posCart.length === 0}
                        onClick={() => setPosTenderModalOpen(true)}
                      >
                        Charge ৳{posTotal.toLocaleString()} & Tender
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: PRODUCTS MASTER CATALOG & STORE MANAGER */}
          {/* ========================================== */}
          {activeRouteId === 'products' && (
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>Product Master & Store Manager</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/20">
                      LIVE SYNC
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    {products.length} registered SKUs across {categories.length} departments • Real-time 2-way synchronization active with Customer Web Store
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<RefreshCw className={`h-3.5 w-3.5 ${isCatalogLoading ? 'animate-spin' : ''}`} />}
                    onClick={fetchCatalog}
                  >
                    Sync Live Store
                  </Button>
                  <Button
                    variant="forest"
                    size="sm"
                    leftIcon={<Plus className="h-4 w-4" />}
                    onClick={handleOpenAddProduct}
                    className="font-bold shadow-md shadow-emerald-900/20"
                  >
                    Add New Product
                  </Button>
                </div>
              </div>

              {/* Summary Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 shadow-xs">
                  <span className="text-[11px] font-semibold text-neutral-400 block">Total Catalog</span>
                  <strong className="text-xl font-black text-neutral-900 dark:text-white">{products.length} Items</strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 shadow-xs">
                  <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 block flex items-center gap-1">
                    <Flame className="h-3 w-3 fill-rose-500 text-rose-500" /> Best Deals
                  </span>
                  <strong className="text-xl font-black text-rose-950 dark:text-rose-200">
                    {products.filter((p) => p.isHotDeal).length} Active
                  </strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40 shadow-xs">
                  <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 block flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-cyan-500" /> New Arrivals
                  </span>
                  <strong className="text-xl font-black text-cyan-950 dark:text-cyan-200">
                    {products.filter((p) => p.isNewArrival).length} Active
                  </strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 shadow-xs">
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 block flex items-center gap-1">
                    <Percent className="h-3 w-3 text-amber-500" /> Special Offers
                  </span>
                  <strong className="text-xl font-black text-amber-950 dark:text-amber-200">
                    {products.filter((p) => p.isOffer || (p.badge && p.badge.includes('OFF'))).length} Active
                  </strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 shadow-xs">
                  <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 block flex items-center gap-1">
                    <Megaphone className="h-3 w-3 text-purple-500" /> Frontpage Ads
                  </span>
                  <strong className="text-xl font-black text-purple-950 dark:text-purple-200">
                    {products.filter((p) => p.isAdvertisement || p.isFeatured).length} Active
                  </strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 shadow-xs">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block">Low Stock (&lt;20)</span>
                  <strong className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {products.filter((p) => p.stock < 20).length} SKUs
                  </strong>
                </div>
              </div>

              {/* Toolbar: Search, Category Filter, and Flag Pills */}
              <Card className="p-4 bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search products by English or Bangla name, SKU, or brand..."
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-900 dark:text-white outline-hidden focus:border-emerald-500 transition"
                    />
                    {productSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setProductSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Dropdown Filter */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedProductCategory}
                      onChange={(e) => setSelectedProductCategory(e.target.value)}
                      className="text-xs font-bold rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 px-3 py-2.5 outline-hidden text-neutral-900 dark:text-white"
                    >
                      <option value="all">All Departments ({products.length})</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name} ({products.filter((p) => p.categorySlug === c.slug).length})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Flag Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-100 dark:border-neutral-800 text-xs">
                  <span className="text-[11px] font-bold text-neutral-400">Filter By Status:</span>
                  {[
                    { id: 'all', label: `All (${products.length})` },
                    { id: 'hot-deal', label: `🔥 Best Deals (${products.filter((p) => p.isHotDeal).length})` },
                    { id: 'new-arrival', label: `✨ New Arrivals (${products.filter((p) => p.isNewArrival).length})` },
                    {
                      id: 'offer',
                      label: `🏷️ Offers & Discounts (${products.filter((p) => p.isOffer || (p.badge && p.badge.includes('OFF'))).length})`,
                    },
                    {
                      id: 'ad',
                      label: `📢 Advertisements (${products.filter((p) => p.isAdvertisement || p.isFeatured).length})`,
                    },
                    { id: 'low-stock', label: `⚠️ Low Stock (${products.filter((p) => p.stock < 20).length})` },
                  ].map((flag) => (
                    <button
                      key={flag.id}
                      type="button"
                      onClick={() => setSelectedProductFlag(flag.id as any)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        selectedProductFlag === flag.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                      }`}
                    >
                      {flag.label}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Master Products Table */}
              <Card className="p-0 overflow-hidden bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 uppercase font-bold border-b border-neutral-200 dark:border-neutral-800">
                      <tr>
                        <th className="py-3.5 px-4">Item & Details</th>
                        <th className="py-3.5 px-3">Department</th>
                        <th className="py-3.5 px-3 text-right">Price (৳)</th>
                        <th className="py-3.5 px-3 text-center">Stock</th>
                        <th className="py-3.5 px-4 text-center">
                          Frontpage Placements & Toggles (1-Click)
                        </th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {products
                        .filter((p) => {
                          if (productSearchQuery.trim()) {
                            const q = productSearchQuery.toLowerCase();
                            const matchName = p.name && p.name.toLowerCase().includes(q);
                            const matchNameBn = p.nameBn && p.nameBn.includes(q);
                            const matchSku = p.sku && p.sku.toLowerCase().includes(q);
                            const matchCat = p.category && p.category.toLowerCase().includes(q);
                            if (!matchName && !matchNameBn && !matchSku && !matchCat) return false;
                          }
                          if (selectedProductCategory !== 'all' && p.categorySlug !== selectedProductCategory) {
                            return false;
                          }
                          if (selectedProductFlag === 'hot-deal' && !p.isHotDeal) return false;
                          if (selectedProductFlag === 'new-arrival' && !p.isNewArrival) return false;
                          if (selectedProductFlag === 'offer' && !p.isOffer && !(p.badge && p.badge.includes('OFF')))
                            return false;
                          if (selectedProductFlag === 'ad' && !p.isAdvertisement && !p.isFeatured) return false;
                          if (selectedProductFlag === 'low-stock' && p.stock >= 20) return false;
                          return true;
                        })
                        .map((p) => {
                          const hasDiscount = p.originalPrice && p.originalPrice > p.price;
                          const discountPct = hasDiscount
                            ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                            : 0;

                          return (
                            <tr
                              key={p.id}
                              className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition group"
                            >
                              {/* Product Image & Name */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/80 dark:border-neutral-700">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                                      onError={(e) => {
                                        (e.target as any).src = '/images/products/red-tomato.jpg';
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                                      {p.name}
                                    </p>
                                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                      {p.nameBn || '—'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-neutral-400 font-mono">
                                      <span>ID: {p.id}</span>
                                      <span>•</span>
                                      <span>Unit: {p.unit || '1 pack'}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Department */}
                              <td className="py-3 px-3">
                                <span className="inline-block px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-200">
                                  {p.category}
                                </span>
                                {p.subcategory && (
                                  <span className="block text-[10px] text-neutral-400 mt-0.5 font-medium">
                                    {p.subcategory}
                                  </span>
                                )}
                              </td>

                              {/* Price & Discounts */}
                              <td className="py-3 px-3 text-right">
                                <div className="font-black text-forest-900 dark:text-emerald-400 text-sm">
                                  ৳{p.price}
                                </div>
                                {hasDiscount && (
                                  <div className="flex items-center justify-end gap-1 text-[10px]">
                                    <span className="line-through text-neutral-400">৳{p.originalPrice}</span>
                                    <span className="text-rose-600 font-bold bg-rose-50 dark:bg-rose-950 px-1 rounded">
                                      -{discountPct}%
                                    </span>
                                  </div>
                                )}
                                {p.badge && (
                                  <span className="inline-block text-[9px] font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded mt-0.5">
                                    {p.badge}
                                  </span>
                                )}
                              </td>

                              {/* Stock */}
                              <td className="py-3 px-3 text-center">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                                    p.stock <= 0
                                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                      : p.stock < 20
                                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  }`}
                                >
                                  {p.stock} units
                                </span>
                              </td>

                              {/* 1-Click Interactive Frontpage Placements */}
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap items-center justify-center gap-1.5">
                                  {/* Hot Deal / Best Deal Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleProductFlag(p.id, 'isHotDeal', !!p.isHotDeal)}
                                    title="Click to toggle Best Deal (Home & Deals page)"
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition ${
                                      p.isHotDeal
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-700'
                                    }`}
                                  >
                                    <Flame className={`h-3 w-3 ${p.isHotDeal ? 'fill-white' : ''}`} />
                                    <span>Best Deal</span>
                                  </button>

                                  {/* New Arrival Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleProductFlag(p.id, 'isNewArrival', !!p.isNewArrival)}
                                    title="Click to toggle New Arrival (Home & New Arrivals page)"
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition ${
                                      p.isNewArrival
                                        ? 'bg-cyan-600 text-white shadow-xs'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-700'
                                    }`}
                                  >
                                    <Sparkles className="h-3 w-3" />
                                    <span>New</span>
                                  </button>

                                  {/* Offer / Discount Toggle */}
                                  <button
                                    type="button"
                                    onClick={() => handleToggleProductFlag(p.id, 'isOffer', !!p.isOffer)}
                                    title="Click to toggle Special Offer (Offers page)"
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition ${
                                      p.isOffer || (p.badge && p.badge.includes('OFF'))
                                        ? 'bg-amber-500 text-white shadow-xs'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-700'
                                    }`}
                                  >
                                    <Percent className="h-3 w-3" />
                                    <span>Offer</span>
                                  </button>

                                  {/* Advertisement Banner Toggle */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleToggleProductFlag(p.id, 'isAdvertisement', !!p.isAdvertisement)
                                    }
                                    title="Click to toggle Frontpage Advertisement Banner"
                                    className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition ${
                                      p.isAdvertisement || p.isFeatured
                                        ? 'bg-purple-600 text-white shadow-xs'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:text-neutral-700'
                                    }`}
                                  >
                                    <Megaphone className="h-3 w-3" />
                                    <span>Ad</span>
                                  </button>
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOpenEditProduct(p)}
                                    className="h-8 px-2.5 text-xs font-bold"
                                    leftIcon={<Pencil className="h-3 w-3 text-neutral-500" />}
                                  >
                                    Edit
                                  </Button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProduct(p.id, p.name)}
                                    title="Delete product"
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: ADVERTISEMENTS & FRONT-PAGE BANNERS MANAGER */}
          {/* ========================================== */}
          {activeRouteId === 'ads' && (
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Megaphone className="h-7 w-7 text-primary-green" />
                    <span>Frontpage Advertisements & Banners</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Configure the top voucher announcement bar, hero slider carousels, and promotional banner cards live on the store.
                  </p>
                </div>
                <div>
                  <Button
                    variant="forest"
                    size="sm"
                    leftIcon={<Check className="h-4 w-4" />}
                    onClick={handleSaveTopBanner}
                    className="font-bold shadow-md shadow-emerald-900/20"
                  >
                    Save & Publish to Store
                  </Button>
                </div>
              </div>

              {/* 1. TOP ANNOUNCEMENT & VOUCHER BAR CONTROLLER */}
              <Card className="p-5 bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div>
                    <h3 className="text-base font-black text-neutral-900 dark:text-white flex items-center gap-2">
                      <span>Top Announcement & Voucher Banner Bar</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        Header Sticky
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Displays above the main navigation bar across every page on the store.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={topBanner.enabled}
                      onChange={(e) => setTopBanner((prev: any) => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded text-primary-green focus:ring-emerald-500 h-4 w-4"
                    />
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200">
                      {topBanner.enabled ? 'Active on Store' : 'Hidden'}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={topBanner.badgeText || ''}
                      onChange={(e) => setTopBanner((prev: any) => ({ ...prev, badgeText: e.target.value }))}
                      placeholder="e.g. VOUCHER SAVINGS"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Promo Code
                    </label>
                    <input
                      type="text"
                      value={topBanner.promoCode || ''}
                      onChange={(e) => setTopBanner((prev: any) => ({ ...prev, promoCode: e.target.value }))}
                      placeholder="e.g. ECO10"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono font-bold uppercase outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      value={topBanner.discountPercent || 10}
                      onChange={(e) =>
                        setTopBanner((prev: any) => ({ ...prev, discountPercent: Number(e.target.value) || 0 }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Headline Title
                    </label>
                    <input
                      type="text"
                      value={topBanner.title || ''}
                      onChange={(e) => setTopBanner((prev: any) => ({ ...prev, title: e.target.value }))}
                      placeholder="Save 10% on your entire basket with code ECO10"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-hidden font-bold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Action Button Text & Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={topBanner.buttonText || ''}
                        onChange={(e) => setTopBanner((prev: any) => ({ ...prev, buttonText: e.target.value }))}
                        placeholder="Explore All Offers"
                        className="w-1/2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-hidden"
                      />
                      <input
                        type="text"
                        value={topBanner.buttonLink || ''}
                        onChange={(e) => setTopBanner((prev: any) => ({ ...prev, buttonLink: e.target.value }))}
                        placeholder="/offers"
                        className="w-1/2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* 2. HERO CAROUSEL SLIDES MANAGER */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-neutral-900 dark:text-white">
                      Hero Carousel Slider Banners ({heroSlides.length} Slides)
                    </h3>
                    <p className="text-xs text-neutral-400">
                      The flagship high-impact slides at the top of the customer homepage.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {heroSlides.map((slide, idx) => (
                    <Card
                      key={slide.id || idx}
                      className="p-4 bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-32 w-full rounded-xl overflow-hidden bg-neutral-100 relative mb-3 border border-neutral-200 dark:border-neutral-700">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = '/images/hero-fruits-veggies.jpg';
                            }}
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                            Slide #{idx + 1}
                          </span>
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-black">
                            {slide.badge}
                          </span>
                        </div>

                        <h4 className="font-black text-sm text-neutral-900 dark:text-white line-clamp-1">
                          {slide.title}
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {slide.subtitle}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          CTA: {slide.ctaText}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingSlide(slide);
                            setSlideForm({
                              id: slide.id,
                              badge: slide.badge,
                              title: slide.title,
                              subtitle: slide.subtitle,
                              ctaText: slide.ctaText,
                              ctaLink: slide.ctaLink,
                              image: slide.image,
                              bgGradient: slide.bgGradient || 'from-[#123C2D] via-[#123C2D]/95 to-[#1a4a38]',
                              tag: slide.tag || '',
                            });
                            setIsSlideModalOpen(true);
                          }}
                        >
                          Edit Slide
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 3. FRONTPAGE PROMOTIONAL BANNER CARDS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-neutral-900 dark:text-white">
                      Mid-Page & Promotional Cards
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Promotional banners featured between departments on the store.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {promoBanners.map((promo, idx) => (
                    <Card
                      key={promo.id || idx}
                      className="p-4 bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 flex flex-col sm:flex-row gap-4 items-center"
                    >
                      <div className="h-28 w-28 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 dark:border-neutral-700">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as any).src = '/images/products/sundarban-honey.jpg';
                          }}
                        />
                      </div>
                      <div className="space-y-1.5 flex-1 text-left">
                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                          {promo.tag}
                        </span>
                        <h4 className="font-black text-sm text-neutral-900 dark:text-white">{promo.title}</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                          {promo.subtitle}
                        </p>
                        <span className="text-[11px] text-neutral-400 block font-mono">Link: {promo.link}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: CATEGORIES & DEPARTMENTS MASTER */}
          {/* ========================================== */}
          {activeRouteId === 'categories' && (
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                    <FolderTree className="h-7 w-7 text-primary-green" />
                    <span>Categories & Department Master</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Manage all {categories.length} superstore departments, icons, banner images, and subcategories live on the store.
                  </p>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const prodCount = products.filter((p) => p.categorySlug === cat.slug).length;

                  return (
                    <Card
                      key={cat.id}
                      className="p-5 bg-white dark:bg-[#071F15] border border-neutral-200 dark:border-emerald-500/20 space-y-3 flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-2xl shadow-xs shrink-0">
                            {cat.icon}
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-black text-neutral-700 dark:text-neutral-200">
                            {prodCount} Products
                          </span>
                        </div>

                        <div className="mt-3">
                          <h3 className="font-black text-base text-neutral-900 dark:text-white">{cat.name}</h3>
                          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            {cat.nameBn}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                            {cat.tagline}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {(cat.subcategories || []).slice(0, 4).map((sub: string) => (
                            <span
                              key={sub}
                              className="px-2 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-800 text-[10px] text-neutral-500 font-medium border border-neutral-200/60 dark:border-neutral-700"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-neutral-400">/{cat.slug}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryForm({
                              id: cat.id,
                              slug: cat.slug,
                              name: cat.name,
                              nameBn: cat.nameBn,
                              tagline: cat.tagline,
                              icon: cat.icon,
                              bannerImage: cat.bannerImage || '/images/banner-farm-grocery.jpg',
                              subcategoriesText: (cat.subcategories || []).join('\n'),
                            });
                            setIsCategoryModalOpen(true);
                          }}
                          leftIcon={<Pencil className="h-3 w-3" />}
                        >
                          Edit Department
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: PROMOTIONS & VOUCHERS MANAGER */}
          {/* ========================================== */}
          {(activeRouteId === 'promotions' || activeRouteId === 'coupons') && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                    <Percent className="h-7 w-7 text-primary-green" />
                    <span>Promotions, Vouchers & Coupon Codes</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                    Manage active customer checkout vouchers, cart discounts, and bKash cashback campaigns.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    code: 'ECO10',
                    discount: '10% Discount',
                    criteria: 'Valid on fresh fruits, groceries & staples > ৳1,000',
                    badge: 'ACTIVE ON STORE',
                    color: 'border-emerald-500/30 bg-emerald-50/20',
                  },
                  {
                    code: 'FREESHIP',
                    discount: 'Free Delivery (৳50 Off)',
                    criteria: 'Waives 30-min express cold-chain delivery charge',
                    badge: 'ACTIVE TODAY',
                    color: 'border-blue-500/30 bg-blue-50/20',
                  },
                  {
                    code: 'DHAKA25',
                    discount: '৳100 Cashback',
                    criteria: 'Valid when paying with bKash merchant gateway',
                    badge: 'PROMO PARTNER',
                    color: 'border-rose-500/30 bg-rose-50/20',
                  },
                ].map((c) => (
                  <Card key={c.code} className={`p-5 ${c.color} border space-y-3`}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-lg text-neutral-900 dark:text-white">{c.code}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black">
                        {c.badge}
                      </span>
                    </div>
                    <div className="text-sm font-black text-forest-900 dark:text-emerald-400">{c.discount}</div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{c.criteria}</p>
                    <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs font-bold text-emerald-600">
                      <span>Live on Checkout Drawer</span>
                      <span>✓ Ready</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: FEFO EXPIRY MANAGEMENT */}
          {/* ========================================== */}
          {activeRouteId === 'expiry' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-3">
                    <CalendarClock className="h-7 w-7 text-rose-500" />
                    FEFO Expiry & Markdown Management
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                    First-Expired, First-Out intelligence to eliminate supermarket shrinkage & food waste
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-rose-50/40 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900">
                  <p className="text-xs font-semibold text-rose-600">Urgent: Expiring &lt; 48 Hours</p>
                  <p className="text-2xl font-black text-rose-950 dark:text-rose-100 mt-2">14 Batches</p>
                  <p className="text-[11px] text-rose-500 mt-1">Immediate markdown required</p>
                </Card>
                <Card className="p-4 bg-amber-50/40 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
                  <p className="text-xs font-semibold text-amber-600">Warning: Expiring in 7 Days</p>
                  <p className="text-2xl font-black text-amber-950 dark:text-amber-100 mt-2">32 Batches</p>
                  <p className="text-[11px] text-amber-500 mt-1">Priority placement on shelf</p>
                </Card>
                <Card className="p-4 bg-emerald-50/40 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900">
                  <p className="text-xs font-semibold text-primary-green">Estimated Revenue Saved</p>
                  <p className="text-2xl font-black text-emerald-950 dark:text-emerald-100 mt-2">৳ 48,200</p>
                  <p className="text-[11px] text-emerald-600 mt-1">Recovered via proactive markdowns</p>
                </Card>
              </div>

              <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/80 text-neutral-500 uppercase font-bold border-b border-neutral-200 dark:border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">Batch Code</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Branch</th>
                        <th className="py-3 px-4 text-center">Remaining Units</th>
                        <th className="py-3 px-4 text-center">Expiry Date</th>
                        <th className="py-3 px-4 text-right">Suggested Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition">
                        <td className="py-3 px-4 font-mono font-bold text-rose-600">BTC-202611-09</td>
                        <td className="py-3 px-4 font-bold">Pasteurized Whole Milk 1000ml</td>
                        <td className="py-3 px-4">Dhanmondi #01</td>
                        <td className="py-3 px-4 text-center font-bold">14 packs</td>
                        <td className="py-3 px-4 text-center text-rose-600 font-bold">Nov 18, 2026 (2 days)</td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => toast.success('Flash Markdown Applied', '20% discount activated on POS & Web for Milk BTC-202611-09')}
                          >
                            Apply 20% Markdown
                          </Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition">
                        <td className="py-3 px-4 font-mono font-bold text-amber-600">BTC-202611-14</td>
                        <td className="py-3 px-4 font-bold">Greek Style Sweet Yogurt 500g</td>
                        <td className="py-3 px-4">Gulshan-2 #02</td>
                        <td className="py-3 px-4 text-center font-bold">22 cups</td>
                        <td className="py-3 px-4 text-center text-amber-600 font-bold">Nov 21, 2026 (5 days)</td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.info('Promoted on Shelf', 'Yogurt batch moved to front of chilling cabinet.')}
                          >
                            Prioritize Front Shelf
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: EXECUTIVE DASHBOARD & OVERVIEW */}
          {/* ========================================== */}
          {(activeRouteId === 'dashboard' || activeRouteId === 'analytics') && (
            <div className="space-y-6 text-left">
              {/* ========================================================= */}
              {/* 1. MISSION-CONTROL TELEMETRY HUD BAR */}
              {/* ========================================================= */}
              <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-neutral-900 to-[#071F15] text-white shadow-xl border border-emerald-500/30 relative overflow-hidden">
                {/* Background futuristic tech glow accents */}
                <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Live Node & Status */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-black text-emerald-300">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        LIVE TELEMETRY ACTIVE
                      </div>
                      <span className="text-xs text-neutral-400 font-medium hidden sm:inline">•</span>
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-200/90 font-mono">
                        <Server className="h-3.5 w-3.5 text-emerald-400" />
                        <span>CLOUD RUN DHAKA CLUSTER-01</span>
                      </div>
                      <span className="text-xs text-neutral-400 font-medium hidden sm:inline">•</span>
                      <div className="inline-flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
                        <Zap className="h-3.5 w-3.5 text-cyan-400" />
                        <span>14ms BDIX</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                        Executive Mission Control
                      </h1>
                      <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                        Active Scope: <strong className="text-emerald-400 font-bold">{selectedBranch.name}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Dhaka BST Clock: <strong className="text-white font-mono">{liveDhakaClock || '10:48:30 AM'}</strong></span>
                      <span>•</span>
                      <span>Health: <strong className="text-emerald-300">99.98% SLA Normal</strong></span>
                      <span>•</span>
                      <span>Updated {lastRefreshedText}</span>
                    </p>
                  </div>

                  {/* Right: Quick Launch Operational Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="forest"
                      size="sm"
                      leftIcon={<Store className="h-3.5 w-3.5 text-emerald-300" />}
                      onClick={() => {
                        setActiveRouteId('pos');
                        toast.info('POS Terminal Activated', 'Switched to Rapid Checkout Console');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-lg shadow-emerald-900/40 border border-emerald-400/40 text-xs"
                    >
                      Quick POS (F2)
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Plus className="h-3.5 w-3.5 text-white" />}
                      onClick={handleOpenAddProduct}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold"
                    >
                      Inward Stock
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-3.5 w-3.5 text-white" />}
                      onClick={handleExportCSV}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold"
                    >
                      Audit CSV
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<RefreshCw className={`h-3.5 w-3.5 text-emerald-300 ${isRefreshing ? 'animate-spin' : ''}`} />}
                      onClick={handleRefreshTelemetry}
                      className="bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border-emerald-500/40 text-xs font-bold"
                    >
                      Live Sync
                    </Button>
                  </div>
                </div>
              </div>

              {/* REAL-TIME STOREFRONT SALES TELEMETRY BANNER - ULTRA-HIGH CONTRAST */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#082819] text-white border-2 border-emerald-400 shadow-xl text-left relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-neutral-950 font-black text-[11px] uppercase tracking-wider shadow-sm">
                        ⚡ Real-Time Store Sales
                      </span>
                      <span className="text-sm text-emerald-200 font-bold">
                        লাইভ বিক্রয় ও প্রোডাক্ট পারফরম্যান্স
                      </span>
                    </div>
                    <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
                      ফ্রন্টএন্ড স্টোর থেকে বিক্রি হওয়া মাত্র পণ্যের বিক্রিত পরিমাণ (যেমন: ১ কেজি + ২ কেজি = ৩ কেজি) ও মোট টাকা স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে।
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3.5 py-2 rounded-xl bg-[#04160E] border border-emerald-400/50 text-xs shadow-inner">
                      <span className="text-emerald-300 block text-[10px] font-bold tracking-wide uppercase">মোট বিক্রয়:</span>
                      <strong className="text-emerald-300 font-black text-base">৳{liveGrandRevenue.toLocaleString()}</strong>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-[#04160E] border border-cyan-400/50 text-xs shadow-inner">
                      <span className="text-cyan-300 block text-[10px] font-bold tracking-wide uppercase">মোট বিক্রিত পরিমাণ:</span>
                      <strong className="text-cyan-300 font-black text-base">{liveGrandUnits} kg/units</strong>
                    </div>
                    <div className="px-3.5 py-2 rounded-xl bg-[#04160E] border border-amber-400/50 text-xs shadow-inner">
                      <span className="text-amber-300 block text-[10px] font-bold tracking-wide uppercase">আজকের সেরা পণ্য:</span>
                      <strong className="text-amber-300 font-black text-base">{topSellingProduct?.name || 'Fresh Guava 1kg'}</strong>
                    </div>
                    {badReviewsCount > 0 && (
                      <div className="px-3.5 py-2 rounded-xl bg-[#2C0B0E] border border-rose-400 text-xs shadow-inner">
                        <span className="text-rose-300 block text-[10px] font-bold tracking-wide uppercase">খারাপ রিভিউ এলার্ট:</span>
                        <strong className="text-rose-300 font-black text-base">{badReviewsCount} Flagged</strong>
                      </div>
                    )}
                    <Button
                      variant="forest"
                      size="sm"
                      leftIcon={<BarChart3 className="h-4 w-4" />}
                      onClick={() => setActiveRouteId('orders')}
                      className="font-black text-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md ml-auto lg:ml-0 h-10 px-4"
                    >
                      View Full Live Report & Export 📊
                    </Button>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 2. 4 HOLOGRAPHIC CYBERNETIC KPI CARDS */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* 1. Total Gross Revenue */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md hover:shadow-xl hover:border-emerald-400/60 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Daily Gross Revenue
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base shadow-xs">
                      ৳
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                      <PriceDisplay amount={metrics.revenue} size="xl" className="font-black text-forest-900 dark:text-emerald-300" />
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{metrics.revenueChange}</span>
                    </div>

                    {/* Channel Breakdown pills */}
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 dark:text-neutral-400">POS Walk-in:</span>
                      <strong className="text-neutral-900 dark:text-neutral-200 font-bold">৳{Math.round(metrics.revenue * 0.805).toLocaleString()} (80%)</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-0.5">
                      <span className="text-neutral-500 dark:text-neutral-400">Online Express:</span>
                      <strong className="text-cyan-600 dark:text-cyan-400 font-bold">৳{Math.round(metrics.revenue * 0.195).toLocaleString()} (20%)</strong>
                    </div>

                    {/* Pacing bar */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-semibold mb-1">
                        <span>Pacing: 74% of ৳250k Quota</span>
                        <span>৳250,000 Target</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '74%' }} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 2. Total Order Throughput */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md hover:shadow-xl hover:border-blue-400/60 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Order Throughput
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-xs">
                      <ShoppingCart className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                      {metrics.orders.toLocaleString()} <span className="text-sm font-semibold text-neutral-400">Orders</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <Activity className="h-3.5 w-3.5" />
                      <span>Avg Dispatch: 6.2 mins</span>
                    </div>

                    {/* Breakdown sub-grid */}
                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-3 gap-1 text-center">
                      <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-lg p-1.5">
                        <span className="text-[10px] text-neutral-400 block font-semibold">Done</span>
                        <strong className="text-xs font-black text-emerald-600 dark:text-emerald-400">312</strong>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-lg p-1.5">
                        <span className="text-[10px] text-neutral-400 block font-semibold">In Transit</span>
                        <strong className="text-xs font-black text-cyan-600 dark:text-cyan-400">24</strong>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-lg p-1.5">
                        <span className="text-[10px] text-neutral-400 block font-semibold">Packing</span>
                        <strong className="text-xs font-black text-amber-600 dark:text-amber-400">6</strong>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                      <span>Express Courier Fleet:</span>
                      <span className="text-emerald-500 font-bold">26 E-Bikes Active</span>
                    </div>
                  </div>
                </Card>

                {/* 3. Active SKUs & Inventory Asset */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Active Inventory SKUs
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base shadow-xs">
                      <Package className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                      {metrics.activeProducts.toLocaleString()} <span className="text-sm font-semibold text-neutral-400">SKUs</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>98.4% Shelf Availability</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 dark:text-neutral-400">Asset Valuation:</span>
                        <strong className="text-neutral-900 dark:text-neutral-200 font-bold">৳4.82M Total</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 dark:text-neutral-400">Cold Chain Chillers:</span>
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-bold">
                          <Thermometer className="h-3 w-3" />
                          <span>Sub-4°C OK</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5">
                      <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 4. Telemetry & Risk Matrix */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-rose-200/80 dark:border-rose-900/50 backdrop-blur-md hover:shadow-xl hover:border-rose-400/60 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-rose-600 dark:text-rose-400 uppercase">
                      Risk & Expiry Matrix
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-base shadow-xs">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-rose-900 dark:text-rose-300 tracking-tight">
                      {metrics.expiryAlertsCount} <span className="text-sm font-semibold text-rose-500">FEFO Alerts</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                      <Radio className="h-3.5 w-3.5 animate-pulse" />
                      <span>{metrics.lowStockCount} Low Stock Triggered</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 dark:text-neutral-400">Power & Backup:</span>
                        <strong className="text-emerald-500 font-bold">Grid + Generator OK</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500 dark:text-neutral-400">POS Lane Integrity:</span>
                        <strong className="text-neutral-900 dark:text-neutral-200 font-bold">14/14 Syncing</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRouteId('expiry');
                        toast.info('Expiry Console', 'Navigated to FEFO Batch Clearance');
                      }}
                      className="mt-2 text-[11px] font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                    >
                      Resolve Expiry Batches →
                    </button>
                  </div>
                </Card>
              </div>

              {/* ========================================================= */}
              {/* 3. FUTURISTIC DUAL-CURVE SPLINE SALES CHART & LIVE MATRIX */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left 8 Cols: High-Tech Spline Chart */}
                <Card className="lg:col-span-8 p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white tracking-tight">
                          Omnichannel Revenue Trajectory
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black border border-emerald-500/20">
                          DUAL STREAM
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        In-Store POS counter velocity vs. Online Express delivery streams
                      </p>
                    </div>

                    {/* Period Switcher Pills */}
                    <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700">
                      {(['today', '7d', '30d', 'q4'] as const).map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => {
                            setSalesChartPeriod(period);
                            toast.info('Time Window Updated', `Sales graph adjusted to ${period.toUpperCase()}`);
                          }}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                            salesChartPeriod === period
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                          }`}
                        >
                          {period === 'today' ? 'Today' : period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : 'Q4 2026'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* High-Tech Chart Legend */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold mb-2">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                      <span className="text-neutral-700 dark:text-neutral-200">POS Walk-In (80.5%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                      <span className="text-neutral-700 dark:text-neutral-200">Online Express App/Web (19.5%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="h-0.5 w-4 border-t-2 border-dashed border-neutral-400" />
                      <span>Breakeven Threshold</span>
                    </div>
                  </div>

                  {/* Floating Holographic Jummah Peak Tooltip */}
                  <div className="hidden sm:block absolute top-20 right-16 bg-white/95 dark:bg-neutral-900/95 border border-emerald-400/60 dark:border-emerald-500/40 shadow-xl px-3.5 py-2 rounded-2xl text-left z-10 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Peak Rush Window
                    </div>
                    <div className="text-sm font-black text-neutral-900 dark:text-white">
                      ৳38,200 / hr
                    </div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium block">
                      Friday 4:30 PM (Post-Jummah Surge)
                    </span>
                  </div>

                  {/* Smooth Curved Spline Dual-Curve SVG */}
                  <div className="h-64 sm:h-72 w-full pt-2 relative">
                    <svg viewBox="0 0 540 220" className="w-full h-full overflow-visible">
                      <defs>
                        {/* POS Gradient */}
                        <linearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                        {/* Online Gradient */}
                        <linearGradient id="onlineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="35" y1="30" x2="520" y2="30" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
                      <line x1="35" y1="75" x2="520" y2="75" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
                      <line x1="35" y1="120" x2="520" y2="120" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
                      <line x1="35" y1="165" x2="520" y2="165" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" strokeDasharray="3 3" />
                      <line x1="35" y1="195" x2="520" y2="195" stroke="currentColor" className="text-neutral-300 dark:text-neutral-700" strokeWidth="1" />

                      {/* Breakeven Dotted Line */}
                      <line x1="35" y1="140" x2="520" y2="140" stroke="#F59E0B" strokeDasharray="4 4" strokeWidth="1.2" opacity="0.6" />

                      {/* Y-Axis Labels */}
                      <text x="10" y="34" fontSize="10" fill="#9CA3AF" fontFamily="monospace">200k</text>
                      <text x="10" y="79" fontSize="10" fill="#9CA3AF" fontFamily="monospace">150k</text>
                      <text x="10" y="124" fontSize="10" fill="#9CA3AF" fontFamily="monospace">100k</text>
                      <text x="10" y="169" fontSize="10" fill="#9CA3AF" fontFamily="monospace">50k</text>
                      <text x="10" y="198" fontSize="10" fill="#9CA3AF" fontFamily="monospace">0k</text>

                      {/* POS Area & Curve (Green) */}
                      <path
                        d="M 50 135 Q 120 120, 190 60 T 330 75 T 430 85 T 510 50 L 510 195 L 50 195 Z"
                        fill="url(#posGradient)"
                      />
                      <path
                        d="M 50 135 Q 120 120, 190 60 T 330 75 T 430 85 T 510 50"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Online Area & Curve (Cyan) */}
                      <path
                        d="M 50 170 Q 120 160, 190 140 T 330 130 T 430 150 T 510 135 L 510 195 L 50 195 Z"
                        fill="url(#onlineGradient)"
                      />
                      <path
                        d="M 50 170 Q 120 160, 190 140 T 330 130 T 430 150 T 510 135"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="5 2"
                      />

                      {/* POS Nodes */}
                      <circle cx="50" cy="135" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="190" cy="60" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                      <circle cx="330" cy="75" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="430" cy="85" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                      <circle cx="510" cy="50" r="6" fill="#047857" stroke="#34D399" strokeWidth="3" />

                      {/* Online Nodes */}
                      <circle cx="190" cy="140" r="3.5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="510" cy="135" r="4.5" fill="#0891B2" stroke="#67E8F9" strokeWidth="2" />

                      {/* X-Axis Day Labels */}
                      <text x="50" y="212" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="bold">Wed</text>
                      <text x="120" y="212" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="bold">Thu</text>
                      <text x="190" y="212" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="900">Fri (Jummah)</text>
                      <text x="260" y="212" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="bold">Sat</text>
                      <text x="330" y="212" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="bold">Sun</text>
                      <text x="430" y="212" fontSize="11" fill="#6B7280" textAnchor="middle" fontWeight="bold">Mon</text>
                      <text x="510" y="212" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="900">Today</text>
                    </svg>
                  </div>

                  {/* Bottom Stats Ticker */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <span className="text-[10px] text-neutral-400 block font-semibold">Average Basket</span>
                      <strong className="text-neutral-900 dark:text-white font-black">৳1,240</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <span className="text-[10px] text-neutral-400 block font-semibold">Peak Sales Hour</span>
                      <strong className="text-neutral-900 dark:text-white font-black">4:00 - 7:00 PM</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <span className="text-[10px] text-neutral-400 block font-semibold">Checkout Lanes</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-black">14 POS Online</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/50">
                      <span className="text-[10px] text-neutral-400 block font-semibold">Customer LTV</span>
                      <strong className="text-neutral-900 dark:text-white font-black">৳18,500 / yr</strong>
                    </div>
                  </div>
                </Card>

                {/* Right 4 Cols: Multi-Hub Real-Time Operations Matrix */}
                <Card className="lg:col-span-4 p-5 flex flex-col justify-between bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-base font-black text-neutral-900 dark:text-white tracking-tight">
                          Multi-Hub Operations Matrix
                        </h3>
                        <p className="text-xs text-neutral-400">Live 3 Superstore Cluster Telemetry</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black">
                        3 ONLINE
                      </span>
                    </div>

                    <div className="space-y-4 mt-4">
                      {/* Hub 1: Dhanmondi */}
                      <div className="p-3 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2 hover:border-emerald-400 transition">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-black text-neutral-900 dark:text-white">Dhanmondi #01 Flagship</span>
                            <span className="text-[10px] text-neutral-400 block">Road 7/A • Est. Oct 2021</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-forest-900 dark:text-emerald-400 text-sm">৳83,025</span>
                            <span className="text-[10px] text-emerald-500 font-bold block">45% Volume</span>
                          </div>
                        </div>

                        <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                          <div className="h-full bg-primary-green rounded-full" style={{ width: '45%' }} />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            <MonitorCheck className="h-3 w-3" /> 6 POS Online
                          </span>
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-cyan-500" /> -1.5°C Normal
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-amber-500" /> 8 E-Bikes
                          </span>
                        </div>
                      </div>

                      {/* Hub 2: Gulshan */}
                      <div className="p-3 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2 hover:border-emerald-400 transition">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-black text-neutral-900 dark:text-white">Gulshan-2 #02 Premium</span>
                            <span className="text-[10px] text-neutral-400 block">Road 54 • Est. Mar 2023</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-forest-900 dark:text-emerald-400 text-sm">৳64,575</span>
                            <span className="text-[10px] text-emerald-500 font-bold block">35% Volume</span>
                          </div>
                        </div>

                        <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                          <div className="h-full bg-primary-green rounded-full" style={{ width: '35%' }} />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            <MonitorCheck className="h-3 w-3" /> 5 POS Online
                          </span>
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-cyan-500" /> -2.0°C Normal
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-amber-500" /> 6 E-Bikes
                          </span>
                        </div>
                      </div>

                      {/* Hub 3: Uttara */}
                      <div className="p-3 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2 hover:border-emerald-400 transition">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-black text-neutral-900 dark:text-white">Uttara #03 Express Mega</span>
                            <span className="text-[10px] text-neutral-400 block">Sector 11 • Est. Jan 2024</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-forest-900 dark:text-emerald-400 text-sm">৳36,900</span>
                            <span className="text-[10px] text-emerald-500 font-bold block">20% Volume</span>
                          </div>
                        </div>

                        <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                          <div className="h-full bg-primary-green rounded-full" style={{ width: '20%' }} />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 pt-1">
                          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            <MonitorCheck className="h-3 w-3" /> 3 POS Online
                          </span>
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-cyan-500" /> -1.8°C Normal
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3 text-amber-500" /> 12 E-Bikes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">Dhaka Cluster: 3 Stores</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveRouteId('branches')}
                      className="text-xs font-bold"
                    >
                      Branch Details →
                    </Button>
                  </div>
                </Card>
              </div>

              {/* ========================================================= */}
              {/* 4. ECOBAZAR AI NEURAL HUB (PREDICTIVE INTELLIGENCE) */}
              {/* ========================================================= */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#041E15] via-neutral-900 to-[#022C22] text-white border border-emerald-500/40 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-lg text-emerald-300">
                      <BrainCircuit className="h-6 w-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                          ECOBAZAR AI Neural Hub
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-black text-emerald-300">
                          AUTONOMOUS V2.4
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 font-medium mt-0.5">
                        Real-time algorithmic demand forecasting, FEFO markdown automation, and inter-hub load balancing.
                      </p>
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="forest"
                      size="sm"
                      onClick={() => {
                        setIsAiOptimizing(true);
                        setTimeout(() => {
                          setIsAiOptimizing(false);
                          setAiPlanExecuted(true);
                          toast.success(
                            'AI Optimization Executed',
                            'Automated FEFO markdown deployed to POS & inter-hub transfer scheduled for Uttara.'
                          );
                        }, 800);
                      }}
                      disabled={isAiOptimizing}
                      className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black shadow-lg shadow-emerald-500/25 border border-emerald-300 text-xs px-4 py-2"
                    >
                      {isAiOptimizing ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          Executing Optimization...
                        </span>
                      ) : aiPlanExecuted ? (
                        <span className="flex items-center gap-1.5 text-emerald-950">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-900" />
                          Plan Executed & Synchronized
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" />
                          Execute AI Optimization Plan
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* 3 AI Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 pt-4 border-t border-emerald-500/20 text-xs">
                  {/* Rec 1 */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:bg-white/10 transition">
                    <div className="flex items-center justify-between font-bold text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                        Weather Rain Demand Surge
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-200">+35% Surge</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      Evening showers expected in Gulshan & Uttara corridor. Demand for ginger tea, eggs, and khichuri staples predicted to peak.
                    </p>
                  </div>

                  {/* Rec 2 */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:bg-white/10 transition">
                    <div className="flex items-center justify-between font-bold text-amber-300">
                      <span className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                        FEFO Milk Markdown Trigger
                      </span>
                      <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200">20% Flash</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      14 packs of Whole Milk expiring within 48h at Dhanmondi. 20% price markdown queued on POS & web app to prevent write-off.
                    </p>
                  </div>

                  {/* Rec 3 */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 hover:bg-white/10 transition">
                    <div className="flex items-center justify-between font-bold text-cyan-300">
                      <span className="flex items-center gap-1.5">
                        <ArrowLeftRight className="h-3.5 w-3.5 text-cyan-400" />
                        Inter-Hub Transit Rebalance
                      </span>
                      <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-200">Auto Route</span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-[11px]">
                      Uttara rice inventory at 14 bags. Dhanmondi has 80 units buffer. Automated inter-hub stock transfer draft TR-2026-092 prepared.
                    </p>
                  </div>
                </div>
              </div>

              {/* ========================================================= */}
              {/* 5. LIVE OMNICHANNEL ORDER STREAM & TOP VELOCITY PRODUCTS */}
              {/* ========================================================= */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Col 1 (5 Cols): Live Omnichannel Orders Stream */}
                <Card className="lg:col-span-5 p-5 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-neutral-900 dark:text-white tracking-tight">
                        Live Omnichannel Stream
                      </h3>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveRouteId('orders')}
                      className="text-xs font-bold text-primary-green hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {demoOrders.slice(0, 4).map((order) => (
                      <div
                        key={order.id}
                        className="p-3 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-emerald-400/60 transition space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-neutral-900 dark:text-white">
                              {order.id}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                              order.channel === 'POS_STORE'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                            }`}>
                              {order.channel === 'POS_STORE' ? 'POS Store' : 'App Express'}
                            </span>
                          </div>
                          <span className="font-black text-forest-900 dark:text-emerald-400">
                            ৳{order.total.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                          <span>{order.customer} • {order.itemsCount} items</span>
                          <span className="font-mono font-semibold uppercase">{order.paymentMethod}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-200/40 dark:border-neutral-700/40 text-[10px]">
                          <span className="text-neutral-400">{order.branch}</span>
                          <span className={`font-bold ${
                            order.status === 'COMPLETED'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : order.status === 'PROCESSING'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-cyan-600 dark:text-cyan-400'
                          }`}>
                            ● {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Col 2 (4 Cols): Top Velocity Fast-Moving SKUs */}
                <Card className="lg:col-span-4 p-5 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-black text-neutral-900 dark:text-white tracking-tight">
                      Top Velocity SKUs
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveRouteId('products')}
                      className="text-xs font-bold text-primary-green hover:underline"
                    >
                      Catalog →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {demoCatalogProducts.slice(0, 4).map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-neutral-500 font-bold">
                              ৳{prod.price} <span className="font-normal text-neutral-400">• {prod.soldUnits} sold</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 block">
                            ৳{prod.revenue.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-semibold">
                            {prod.stock} in stock
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Col 3 (3 Cols): Mission Control Operational Checklist */}
                <Card className="lg:col-span-3 p-5 flex flex-col justify-between bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-black text-neutral-900 dark:text-white tracking-tight">
                        Shift Operational Tasks
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        Today
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {/* Task 1 */}
                      <div
                        onClick={() => {
                          setTaskVerificationStatus((prev) => (prev === 'verified' ? 'pending' : 'verified'));
                          toast.success('Checklist Updated', 'Chiller restocking status verified');
                        }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition select-none"
                      >
                        <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          taskVerificationStatus === 'verified' ? 'bg-primary-green border-primary-green text-white' : 'border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {taskVerificationStatus === 'verified' && <Check className="h-3 w-3" />}
                        </div>
                        <span className={taskVerificationStatus === 'verified' ? 'line-through text-neutral-400 font-medium' : 'font-bold text-neutral-700 dark:text-neutral-200'}>
                          Restock Dairy & Cold Storage Chiller
                        </span>
                      </div>

                      {/* Task 2 */}
                      <div
                        onClick={() => {
                          setTaskReceivingStatus((prev) => (prev === 'received' ? 'pending' : 'received'));
                          toast.success('Checklist Updated', 'FEFO expiry batch verified');
                        }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition select-none"
                      >
                        <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          taskReceivingStatus === 'received' ? 'bg-primary-green border-primary-green text-white' : 'border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {taskReceivingStatus === 'received' && <Check className="h-3 w-3" />}
                        </div>
                        <span className={taskReceivingStatus === 'received' ? 'line-through text-neutral-400 font-medium' : 'font-bold text-neutral-700 dark:text-neutral-200'}>
                          Verify FEFO Milk Batch BTC-202611-09
                        </span>
                      </div>

                      {/* Task 3 */}
                      <div
                        onClick={() => {
                          setTaskAuditStatus((prev) => (prev === 'completed' ? 'pending' : 'completed'));
                          toast.success('Checklist Updated', 'POS drawer cash reconciliation checked');
                        }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition select-none"
                      >
                        <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          taskAuditStatus === 'completed' ? 'bg-primary-green border-primary-green text-white' : 'border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {taskAuditStatus === 'completed' && <Check className="h-3 w-3" />}
                        </div>
                        <span className={taskAuditStatus === 'completed' ? 'line-through text-neutral-400 font-medium' : 'font-bold text-neutral-700 dark:text-neutral-200'}>
                          Reconcile POS Cash Register Drawers
                        </span>
                      </div>

                      {/* Task 4 */}
                      <div
                        onClick={() => {
                          setTaskSensorStatus((prev) => (prev === 'verified' ? 'pending' : 'verified'));
                          toast.success('Checklist Updated', 'IoT cold chain temperature telemetry confirmed');
                        }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition select-none"
                      >
                        <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                          taskSensorStatus === 'verified' ? 'bg-primary-green border-primary-green text-white' : 'border-neutral-300 dark:border-neutral-600'
                        }`}>
                          {taskSensorStatus === 'verified' && <Check className="h-3 w-3" />}
                        </div>
                        <span className={taskSensorStatus === 'verified' ? 'line-through text-neutral-400 font-medium' : 'font-bold text-neutral-700 dark:text-neutral-200'}>
                          Inspect Sub-4°C IoT Chillers
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
                    <span className="text-[11px] text-neutral-400 font-medium">
                      All checks logged into central audit trail
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: LIVE SALES & PRODUCT INTELLIGENCE CENTER */}
          {/* ========================================== */}
          {(activeRouteId === 'orders' || activeRouteId === 'reports') && (
            <div className="space-y-6 text-left">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                      <BarChart3 className="h-7 w-7 text-primary-green" />
                      <span>Live Sales & Product Intelligence Center</span>
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-black border border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      LIVE STOREFRONT SYNC
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                    লাইভ সেলস ট্র্যাকিং: ফ্রন্টএন্ড থেকে পণ্য বিক্রি হওয়া মাত্র পণ্যের বিক্রিত পরিমাণ (কেজি/ইউনিট) ও মোট টাকার হিসাব স্বয়ংক্রিয়ভাবে আপডেট হচ্ছে।
                  </p>
                </div>

                {/* Export & Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="forest"
                    size="sm"
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                    onClick={handleExportSalesReportCSV}
                    className="font-bold text-xs shadow-md shadow-emerald-600/20"
                  >
                    Export Product Sales (CSV)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<FileSpreadsheet className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-300" />}
                    onClick={handleExportOrdersCSV}
                    className="font-bold text-xs"
                  >
                    Export Orders Sheet (CSV)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Printer className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-300" />}
                    onClick={handlePrintExecutiveReport}
                    className="font-bold text-xs"
                  >
                    Print Summary
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<RefreshCw className={`h-3.5 w-3.5 text-emerald-600 ${isOrdersSyncing ? 'animate-spin' : ''}`} />}
                    onClick={fetchLiveOrdersAndSales}
                    className="font-bold text-xs"
                  >
                    Sync
                  </Button>
                </div>
              </div>

              {/* 4 Holographic KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {/* 1. Total Store Revenue */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Total Sales Revenue (মোট বিক্রয়)
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-base shadow-xs">
                      ৳
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-forest-900 dark:text-emerald-300 tracking-tight">
                      ৳{liveGrandRevenue.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Live from {liveOrders.length} customer orders</span>
                    </div>
                  </div>
                </Card>

                {/* 2. Total Volume Sold */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Total Volume Sold (মোট বিক্রি)
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shadow-xs">
                      📦
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                      {liveGrandUnits} <span className="text-sm font-bold text-neutral-400">kg/units</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-cyan-600 dark:text-cyan-400 font-bold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Auto-Accumulated live per sale</span>
                    </div>
                  </div>
                </Card>

                {/* 3. Today's Top Selling Product */}
                <Card className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-emerald-500/20 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Top Seller Today (আজকের সেরা)
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shadow-xs">
                      🏆
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                      <img
                        src={topSellingProduct?.image || '/uploads/fresh-guava-mwohtea2.jpg'}
                        alt={topSellingProduct?.name || 'Top Product'}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-neutral-900 dark:text-white line-clamp-1">
                        {topSellingProduct?.name || 'Fresh Guava 1kg'}
                      </div>
                      <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {topSellingProduct?.totalSold || 3} {topSellingProduct?.unit?.includes('kg') ? 'kg' : 'units'} sold • ৳{(topSellingProduct?.totalRevenue || 270).toLocaleString()}
                      </div>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                        #1 Leaderboard
                      </span>
                    </div>
                  </div>
                </Card>

                {/* 4. Bad Reviews Watchlist */}
                <Card
                  onClick={() => setSalesReportTab('bad-reviews')}
                  className="p-4 sm:p-5 relative overflow-hidden bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200/80 dark:border-rose-500/30 backdrop-blur-md cursor-pointer hover:border-rose-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Review Quality Alert (খারাপ রিভিউ)
                    </span>
                    <span className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm shadow-xs">
                      ⚠️
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
                      {badReviewsCount} <span className="text-sm font-bold text-neutral-400">Flagged</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>{badReviewsCount > 0 ? 'Requires immediate QA follow-up' : 'All reviews 4-5 stars'}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Internal Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                {[
                  { id: 'overview', label: '📊 Graphic Leaderboard (গ্রাফে এগিয়ে)', icon: BarChart3 },
                  { id: 'products', label: '📦 Product Sales Master Table (সব প্রোডাক্টের হিসাব)', icon: Package },
                  { id: 'orders', label: `🛒 Storefront Orders Stream (${liveOrders.length})`, icon: ShoppingCart },
                  { id: 'bad-reviews', label: `⚠️ Bad Reviews Watchlist (${badReviewsCount})`, icon: AlertTriangle, badge: badReviewsCount > 0 ? `${badReviewsCount}` : undefined },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSalesReportTab(t.id as any)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      salesReportTab === t.id
                        ? 'bg-primary-green text-white shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: GRAPHIC LEADERBOARD */}
              {salesReportTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Top Products Ranked Bar Chart */}
                    <Card className="lg:col-span-8 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="text-base font-black text-neutral-900 dark:text-white flex items-center gap-2">
                            <span>🏆 Top Selling Products Leaderboard</span>
                            <span className="text-xs font-bold text-primary-green bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                              গ্রাফে কে সবচেয়ে এগিয়ে
                            </span>
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Ranked in real-time by total volume/quantity sold and generated revenue
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {liveSalesProducts
                          .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
                          .slice(0, 6)
                          .map((prod, index) => {
                            const maxSold = Math.max(...liveSalesProducts.map((p) => p.totalSold || 0), 1);
                            const percent = Math.min(100, Math.round(((prod.totalSold || 0) / maxSold) * 100));
                            return (
                              <div
                                key={prod.id}
                                className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 space-y-2 hover:border-emerald-500/60 transition"
                              >
                                <div className="flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                                      index === 0
                                        ? 'bg-amber-400 text-neutral-900 shadow-sm'
                                        : index === 1
                                        ? 'bg-slate-300 text-neutral-900'
                                        : index === 2
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
                                    }`}>
                                      #{index + 1}
                                    </span>
                                    <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300 dark:border-neutral-700">
                                      <img
                                        src={prod.image || '/images/products/sundarban-honey.webp'}
                                        alt={prod.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                                        {prod.name}
                                      </p>
                                      <p className="text-[11px] text-neutral-500">
                                        {prod.nameBn ? `${prod.nameBn} • ` : ''}{prod.unit}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <div className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                                      {prod.totalSold || 0} {prod.unit?.includes('kg') ? 'kg' : 'units'}
                                    </div>
                                    <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                                      ৳{(prod.totalRevenue || 0).toLocaleString()}
                                    </div>
                                  </div>
                                </div>

                                {/* Animated Velocity Progress Bar */}
                                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                      index === 0
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                        : index === 1
                                        ? 'bg-gradient-to-r from-emerald-600 to-green-500'
                                        : 'bg-gradient-to-r from-teal-600 to-cyan-500'
                                    }`}
                                    style={{ width: `${Math.max(percent, 8)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </Card>

                    {/* Right: Quick Insights & Summary */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* Top Product Highlight Card */}
                      <Card className="p-5 bg-gradient-to-br from-emerald-950 via-neutral-900 to-[#071F15] text-white border border-emerald-500/30">
                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                          🥇 #1 BESTSELLER OF THE DAY
                        </span>
                        <div className="mt-3 flex items-center gap-3.5">
                          <div className="h-16 w-16 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-emerald-400/40">
                            <img
                              src={topSellingProduct?.image || '/uploads/fresh-guava-mwohtea2.jpg'}
                              alt={topSellingProduct?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-black text-sm leading-snug line-clamp-2 text-white">
                              {topSellingProduct?.name || 'Fresh Guava 1kg'}
                            </h4>
                            <p className="text-xs text-emerald-300 font-bold mt-1">
                              {topSellingProduct?.totalSold || 3} kg Sold Today
                            </p>
                            <p className="text-xs text-neutral-300 font-mono">
                              Total: ৳{(topSellingProduct?.totalRevenue || 270).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-300">
                          <span>Stock Remaining:</span>
                          <span className="font-bold text-emerald-400">{topSellingProduct?.stock || 47} units</span>
                        </div>
                      </Card>

                      {/* Rapid Actions */}
                      <Card className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                        <h4 className="font-black text-sm text-neutral-900 dark:text-white">
                          Report Actions & Downloads
                        </h4>
                        <p className="text-xs text-neutral-500">
                          সম্পূর্ণ বিক্রয় বিবরণী এক্সেল বা সিএসভি ফাইল হিসেবে ডাউনলোড করুন।
                        </p>
                        <div className="space-y-2 pt-1">
                          <Button
                            variant="forest"
                            size="sm"
                            leftIcon={<Download className="h-3.5 w-3.5" />}
                            onClick={handleExportSalesReportCSV}
                            className="w-full font-bold text-xs"
                          >
                            Download Product Sales CSV
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<FileSpreadsheet className="h-3.5 w-3.5" />}
                            onClick={handleExportOrdersCSV}
                            className="w-full font-bold text-xs"
                          >
                            Download Customer Orders CSV
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCT-BY-PRODUCT COMPLETE MASTER SALES TABLE */}
              {salesReportTab === 'products' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search product by name or category..."
                        value={salesSearchQuery}
                        onChange={(e) => setSalesSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:border-primary-green"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={salesCategoryFilter}
                        onChange={(e) => setSalesCategoryFilter(e.target.value)}
                        className="text-xs py-1.5 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((c) => (
                          <option key={c.id || c.slug} value={c.slug || c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>

                      <select
                        value={salesSortBy}
                        onChange={(e) => setSalesSortBy(e.target.value as any)}
                        className="text-xs py-1.5 px-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-bold"
                      >
                        <option value="volume">Sort by Volume Sold (High to Low)</option>
                        <option value="revenue">Sort by Revenue (High to Low)</option>
                        <option value="stock">Sort by Lowest Stock First</option>
                        <option value="rating">Sort by Rating</option>
                      </select>
                    </div>
                  </div>

                  {/* Master Table */}
                  <Card className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/70 border-b border-neutral-200 dark:border-neutral-700 text-neutral-500 uppercase font-black text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Product</th>
                            <th className="py-3 px-3">Category</th>
                            <th className="py-3 px-3">Unit / Pack</th>
                            <th className="py-3 px-3">Unit Price</th>
                            <th className="py-3 px-3 text-center">কতটুকু বিক্রি হলো (Total Sold)</th>
                            <th className="py-3 px-3 text-right">কত টাকার সেল (Revenue)</th>
                            <th className="py-3 px-3 text-center">স্টক (Stock)</th>
                            <th className="py-3 px-3">রিভিউ রেটিং</th>
                            <th className="py-3 px-4">অবস্থা (Status)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800">
                          {liveSalesProducts
                            .filter((p) => {
                              if (salesSearchQuery.trim()) {
                                const q = salesSearchQuery.toLowerCase();
                                if (!p.name?.toLowerCase().includes(q) && !p.nameBn?.includes(q) && !p.category?.toLowerCase().includes(q)) {
                                  return false;
                                }
                              }
                              if (salesCategoryFilter !== 'all') {
                                if (p.categorySlug !== salesCategoryFilter && p.category !== salesCategoryFilter) {
                                  return false;
                                }
                              }
                              return true;
                            })
                            .sort((a, b) => {
                              if (salesSortBy === 'volume') return (b.totalSold || 0) - (a.totalSold || 0);
                              if (salesSortBy === 'revenue') return (b.totalRevenue || 0) - (a.totalRevenue || 0);
                              if (salesSortBy === 'stock') return (a.stock || 0) - (b.stock || 0);
                              return (b.rating || 0) - (a.rating || 0);
                            })
                            .map((p) => {
                              const isTop = (p.totalSold || 0) > 0 && p.id === topSellingProduct?.id;
                              const isLowStock = (p.stock || 0) <= 5;
                              return (
                                <tr key={p.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition">
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                                        <img
                                          src={p.image || '/images/products/sundarban-honey.webp'}
                                          alt={p.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <p className="font-bold text-neutral-900 dark:text-white line-clamp-1">
                                          {p.name}
                                        </p>
                                        <p className="text-[11px] text-neutral-500">
                                          {p.nameBn || p.id}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300 font-medium">
                                    {p.category}
                                  </td>
                                  <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300 font-bold">
                                    {p.unit}
                                  </td>
                                  <td className="py-3 px-3 font-black text-neutral-900 dark:text-white">
                                    ৳{p.price}
                                  </td>
                                  <td className="py-3 px-3 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs">
                                      {p.totalSold || 0} {p.unit?.includes('kg') ? 'kg' : 'units'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                                    ৳{(p.totalRevenue || 0).toLocaleString()}
                                  </td>
                                  <td className="py-3 px-3 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                      isLowStock
                                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                        : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200'
                                    }`}>
                                      {p.stock || 0} left
                                    </span>
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                                      <span className="text-neutral-900 dark:text-white">{p.rating || 5.0}</span>
                                      <span className="text-[10px] text-neutral-400">({p.reviews || 1})</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4">
                                    {isTop ? (
                                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-900 text-[10px] font-black uppercase">
                                        🏆 #1 Top Seller
                                      </span>
                                    ) : (p.totalSold || 0) > 0 ? (
                                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                                        Active Selling
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-neutral-400 font-medium">
                                        Ready for sale
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              )}

              {/* TAB 3: LIVE STOREFRONT ORDERS STREAM */}
              {salesReportTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-black text-neutral-900 dark:text-white">
                        Customer Orders Stream (লাইভ কাস্টমার অর্ডার সমূহ)
                      </h3>
                      <p className="text-xs text-neutral-500">
                        ওয়েবসাইট থেকে কাস্টমাররা যেসব অর্ডার দিচ্ছেন তা এখানে রিয়েল-টাইমে আসছে।
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-3.5 w-3.5" />}
                      onClick={handleExportOrdersCSV}
                      className="font-bold text-xs"
                    >
                      Export Orders CSV
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {liveOrders.map((o) => (
                      <Card
                        key={o.id}
                        className="p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono font-black text-sm text-neutral-900 dark:text-white">
                              #{o.id}
                            </span>
                            <span className="text-xs text-neutral-400 font-medium">•</span>
                            <span className="text-xs text-neutral-500 font-bold">{o.formattedDate || 'Today'} at {o.formattedTime}</span>
                            <span className="text-xs text-neutral-400 font-medium">•</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              o.paymentMethod === 'cod'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : o.paymentMethod === 'bkash'
                                ? 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
                                : o.paymentMethod === 'nagad'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            }`}>
                              {o.paymentMethod === 'cod' ? 'Cash on Delivery' : o.paymentMethod?.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                              o.status === 'DELIVERED'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : o.status === 'RIDER_ASSIGNED'
                                ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              ● {o.status || 'PROCESSING'}
                            </span>
                            {o.status !== 'DELIVERED' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateOrderStatus(o.id, 'DELIVERED')}
                                className="text-[11px] font-bold py-1 h-7"
                              >
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Customer & Address Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-neutral-400 block font-medium">Customer:</span>
                            <strong className="text-neutral-900 dark:text-white font-bold">{o.customerName}</strong>
                            <p className="text-neutral-500">{o.customerPhone}</p>
                          </div>
                          <div>
                            <span className="text-neutral-400 block font-medium">Delivery Address:</span>
                            <p className="text-neutral-700 dark:text-neutral-300 leading-tight">{o.deliveryAddress}</p>
                            <span className="text-[11px] text-primary-green font-semibold">{o.deliveryTimeSlot}</span>
                          </div>
                          <div>
                            <span className="text-neutral-400 block font-medium">Total Bill:</span>
                            <div className="text-base font-black text-forest-900 dark:text-emerald-400">
                              ৳{o.grandTotal}
                            </div>
                            <span className="text-[11px] text-neutral-400">{o.branch}</span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 space-y-1.5 text-xs">
                          <span className="text-[11px] font-black uppercase text-neutral-500 tracking-wider block mb-1">
                            Items Ordered ({o.items?.length || 0}):
                          </span>
                          {Array.isArray(o.items) && o.items.map((it: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                              <span className="font-medium">
                                • {it.name} <strong className="text-primary-green font-bold">x{it.quantity}</strong> ({it.unit || 'pack'})
                              </span>
                              <span className="font-bold">৳{it.total || (it.price * (it.quantity || 1))}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BAD REVIEWS WATCHLIST */}
              {salesReportTab === 'bad-reviews' && (
                <div className="space-y-4">
                  {/* Warning Banner */}
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-black text-sm text-rose-700 dark:text-rose-400">
                        Customer Quality Watchdog (আজকে কোন প্রোডাক্টে খারাপ রিভিউ আসছে)
                      </h4>
                      <p className="text-xs text-rose-600 dark:text-rose-300 mt-0.5 leading-relaxed font-medium">
                        কাস্টমারদের যেসব রিভিউ ৩ স্টার বা তার কম আসছে, তা এখানে তাৎক্ষণিক সতর্কতা হিসেবে প্রদর্শন করা হচ্ছে। যাতে দ্রুত কাস্টমারের সাথে যোগাযোগ করে কোয়ালিটি বা প্যাকেজিং সমস্যা সমাধান করা যায়।
                      </p>
                    </div>
                  </div>

                  {badReviews.length === 0 ? (
                    <Card className="p-8 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                        ✓
                      </div>
                      <h4 className="font-black text-sm text-neutral-900 dark:text-white">
                        No Bad Reviews Today! 🎉
                      </h4>
                      <p className="text-xs text-neutral-500">
                        All customer ratings today are 4 or 5 stars with high satisfaction.
                      </p>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {badReviews.map((rev) => (
                        <Card
                          key={rev.id}
                          className="p-5 bg-white dark:bg-neutral-900 border-2 border-rose-200 dark:border-rose-900/40 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[10px] font-black uppercase">
                                {rev.severity || 'WARNING'}
                              </span>
                              <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < rev.rating
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-neutral-300 dark:text-neutral-700'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-black text-rose-600 text-xs">
                                {rev.rating} / 5 Stars
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                rev.status === 'RESOLVED'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              }`}>
                                {rev.status || 'UNRESOLVED'}
                              </span>
                              {rev.status !== 'RESOLVED' && (
                                <Button
                                  variant="forest"
                                  size="sm"
                                  onClick={() => handleResolveReview(rev.id)}
                                  className="text-[11px] font-bold py-1 h-7"
                                >
                                  Mark Resolved
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            {rev.productImage && (
                              <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                                <img
                                  src={rev.productImage}
                                  alt={rev.productName}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="space-y-1">
                              <h5 className="font-black text-sm text-neutral-900 dark:text-white">
                                {rev.productName}
                              </h5>
                              <p className="text-xs text-neutral-700 dark:text-neutral-300 italic bg-rose-50 dark:bg-rose-950/20 p-2 rounded-xl border border-rose-200/40">
                                &ldquo;{rev.comment}&rdquo;
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1">
                                <span>Customer: <strong className="text-neutral-700 dark:text-neutral-300">{rev.author}</strong></span>
                                {rev.phone && <span>• Phone: <strong className="text-neutral-700 dark:text-neutral-300">{rev.phone}</strong></span>}
                                <span>• {rev.date}</span>
                                <span>• {rev.location}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: INVENTORY MANAGEMENT */}
          {/* ========================================== */}
          {activeRouteId === 'inventory' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Boxes className="h-7 w-7 text-primary-green" />
                    <span>Warehouse & Stock Inventory Management</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Multi-branch stock monitoring across Dhanmondi, Gulshan-2, and Uttara hubs with automated reorder thresholds.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="forest"
                    size="sm"
                    leftIcon={<Plus className="h-3.5 w-3.5" />}
                    onClick={handleOpenAddProduct}
                    className="font-bold text-xs"
                  >
                    Inward Stock
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                    onClick={handleExportSalesReportCSV}
                    className="font-bold text-xs"
                  >
                    Stock Audit CSV
                  </Button>
                </div>
              </div>

              {/* Inventory Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200 dark:border-emerald-500/20">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">Total Inventory Valuation</span>
                  <div className="text-2xl font-black text-forest-900 dark:text-emerald-300 mt-2">৳2,840,500</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">✓ Fully Insured & Refrigerated</span>
                </Card>
                <Card className="p-4 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200 dark:border-emerald-500/20">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">Active Catalog SKUs</span>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">1,420 Items</div>
                  <span className="text-[10px] text-neutral-400 font-medium mt-1 block">Across 6 Store Departments</span>
                </Card>
                <Card className="p-4 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200 dark:border-rose-500/30">
                  <span className="text-[11px] font-bold text-rose-500 uppercase">Low Stock Alerts</span>
                  <div className="text-2xl font-black text-rose-600 mt-2">14 Items</div>
                  <span className="text-[10px] text-rose-500 font-bold mt-1 block">⚠️ Below Safety Threshold (5 units)</span>
                </Card>
                <Card className="p-4 bg-white/95 dark:bg-[#071F15]/90 border border-neutral-200 dark:border-cyan-500/20">
                  <span className="text-[11px] font-bold text-cyan-600 uppercase">Optimal Buffer Stock</span>
                  <div className="text-2xl font-black text-cyan-700 dark:text-cyan-300 mt-2">1,406 Items</div>
                  <span className="text-[10px] text-cyan-600 font-bold mt-1 block">Sufficient for 14 Days</span>
                </Card>
              </div>

              {/* Inventory Table */}
              <Card className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <h3 className="font-black text-sm text-neutral-900 dark:text-white">Active Stock Level Audit</h3>
                  <span className="text-xs text-neutral-500 font-medium">Consolidated Dhaka Region</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 uppercase font-black text-[10px]">
                      <tr>
                        <th className="py-3 px-4">SKU / Item</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3 text-center">Current Stock</th>
                        <th className="py-3 px-3 text-center">Safety Buffer</th>
                        <th className="py-3 px-3 text-right">Unit Value</th>
                        <th className="py-3 px-3 text-right">Total Valuation</th>
                        <th className="py-3 px-4 text-center">Status & Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {[
                        { sku: 'ECO-FR-0012', name: 'Fresh Guava 1kg (তাজা পেয়ারা)', cat: 'Fresh Fruits', stock: 47, safety: 15, price: 90, status: 'OPTIMAL' },
                        { sku: 'ECO-VG-0003', name: 'Fresh Organic Red Vine Tomatoes', cat: 'Fresh Produce', stock: 84, safety: 20, price: 80, status: 'OPTIMAL' },
                        { sku: 'ECO-GR-0021', name: 'Aromatic Chinigura Rice 2kg', cat: 'Groceries', stock: 12, safety: 10, price: 290, status: 'REORDER_SOON' },
                        { sku: 'ECO-DR-0001', name: 'Farm Fresh Pure Cow Milk 1L', cat: 'Dairy & Eggs', stock: 4, safety: 15, price: 95, status: 'CRITICAL_LOW' },
                        { sku: 'ECO-HN-0002', name: 'Sundarban Raw Wild Forest Honey 500g', cat: 'Groceries', stock: 35, safety: 8, price: 650, status: 'OPTIMAL' },
                      ].map((item) => (
                        <tr key={item.sku} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                          <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white">
                            <div>{item.name}</div>
                            <span className="text-[10px] text-neutral-400 font-mono">{item.sku}</span>
                          </td>
                          <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300 font-medium">{item.cat}</td>
                          <td className="py-3 px-3 text-center font-black text-sm">
                            <span className={item.stock <= 5 ? 'text-rose-600' : 'text-neutral-900 dark:text-white'}>
                              {item.stock} units
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center text-neutral-500 font-mono">{item.safety} units</td>
                          <td className="py-3 px-3 text-right font-bold">৳{item.price}</td>
                          <td className="py-3 px-3 text-right font-black text-emerald-600">৳{(item.stock * item.price).toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              item.status === 'CRITICAL_LOW'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : item.status === 'REORDER_SOON'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}>
                              {item.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: STOCK TRANSFERS */}
          {/* ========================================== */}
          {activeRouteId === 'transfers' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <ArrowLeftRight className="h-7 w-7 text-primary-green" />
                    <span>Inter-Branch Stock Transfers & Logistics</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Multi-hub rebalancing between Dhanmondi Flagship, Gulshan-2 Superstore, and Uttara Express corridor.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('Transfer Ticket Created', 'Draft TR-2026-104 initiated.')}
                  className="font-bold text-xs"
                >
                  Create Transfer
                </Button>
              </div>

              {/* Transfer Cards */}
              <div className="space-y-3">
                {[
                  { id: 'TR-2026-092', from: 'Dhanmondi Flagship #01', to: 'Uttara Sector 11 Express #03', items: 'Aromatic Chinigura Rice (40kg), Pure Milk (25L)', van: 'Cold Van DH-9012', temp: '3.4°C OK', status: 'IN_TRANSIT', eta: '35 Mins' },
                  { id: 'TR-2026-091', from: 'Gulshan-2 Superstore #02', to: 'Dhanmondi Flagship #01', items: 'Fresh Guava (30kg), Organic Tomatoes (50kg)', van: 'Cold Van DH-4412', temp: '3.8°C OK', status: 'DELIVERED', eta: 'Completed' },
                  { id: 'TR-2026-090', from: 'Central Cold Storage Savar', to: 'Gulshan-2 Superstore #02', items: 'Raw Wild Honey (100 Jars), Mustard Oil (80L)', van: 'Bulk Lorry DH-1190', temp: 'Ambient', status: 'PENDING_DISPATCH', eta: 'Tomorrow 08:00 AM' },
                ].map((tr) => (
                  <Card key={tr.id} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-sm text-neutral-900 dark:text-white">#{tr.id}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="font-bold text-primary-green">{tr.from} → {tr.to}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        tr.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : tr.status === 'IN_TRANSIT'
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        ● {tr.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div><span className="text-neutral-400 block text-[11px]">Consignment:</span><strong>{tr.items}</strong></div>
                      <div><span className="text-neutral-400 block text-[11px]">Fleet & IoT Temp:</span><strong>{tr.van} • <span className="text-cyan-600 font-bold">{tr.temp}</span></strong></div>
                      <div><span className="text-neutral-400 block text-[11px]">Transit Timeline:</span><strong>{tr.eta}</strong></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: PURCHASING, SUPPLIERS & PURCHASE ORDERS */}
          {/* ========================================== */}
          {(activeRouteId === 'suppliers' || activeRouteId === 'purchase-orders' || activeRouteId === 'goods-received') && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Truck className="h-7 w-7 text-primary-green" />
                    <span>Procurement, Farm Cooperatives & POs</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Direct rural sourcing from Bogura, Rajshahi, Sirajganj, and Sylhet organic farmer partners.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('New PO Created', 'Draft Purchase Order PO-2026-118 initiated.')}
                  className="font-bold text-xs"
                >
                  Create Purchase Order
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Bogura Organic Cooperative', produce: 'Fresh Farm Produce, Tomatoes & Cauliflower', contact: 'Al-Amin Hossain', phone: '+880 1711-229988', terms: 'Net 15 Days', rating: 4.9, activePOs: 2, balanceDue: 45000 },
                  { name: 'Rajshahi Orchard Growers Ltd', produce: 'Seasonal Fruits, Guava, Mango & Citrus', contact: 'Rafiqul Islam', phone: '+880 1812-776655', terms: 'Cash on Delivery', rating: 4.8, activePOs: 1, balanceDue: 28000 },
                  { name: 'Sirajganj Pure Dairy Agro', produce: 'Fresh Pasteurized Pure Cow Milk & Butter', contact: 'Mizanur Rahman', phone: '+880 1912-334455', terms: 'Weekly Ledger', rating: 5.0, activePOs: 3, balanceDue: 62000 },
                  { name: 'Sundarban Ethic Honey Gatherers', produce: 'Raw Wild Mangrove Honey & Pure Wax', contact: 'Golam Kibria', phone: '+880 1612-998811', terms: 'Advance 50%', rating: 4.95, activePOs: 1, balanceDue: 15000 },
                ].map((sup) => (
                  <Card key={sup.name} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-neutral-900 dark:text-white">{sup.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        ★ {sup.rating} Verified
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 font-medium">{sup.produce}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <div><span className="text-neutral-400 block text-[10px]">Contact Person:</span><strong>{sup.contact} ({sup.phone})</strong></div>
                      <div><span className="text-neutral-400 block text-[10px]">Payment Terms:</span><strong>{sup.terms}</strong></div>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <span className="text-neutral-500">Active POs: <strong>{sup.activePOs}</strong></span>
                      <span className="text-forest-900 dark:text-emerald-400 font-black">Due: ৳{sup.balanceDue.toLocaleString()}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: CUSTOMERS & LOYALTY PROGRAM */}
          {/* ========================================== */}
          {(activeRouteId === 'customers' || activeRouteId === 'loyalty') && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Users className="h-7 w-7 text-primary-green" />
                    <span>Customer Relationship & EcoPoints Loyalty</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Manage 14,800+ registered retail shoppers, VIP tier progression, and automated SMS marketing.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('Customer Profile Added', 'New VIP customer record initiated.')}
                  className="font-bold text-xs"
                >
                  Add Customer
                </Button>
              </div>

              <Card className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 uppercase font-black text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-3">Phone</th>
                        <th className="py-3 px-3">Delivery Zone</th>
                        <th className="py-3 px-3 text-center">Total Orders</th>
                        <th className="py-3 px-3 text-right">Lifetime Spend</th>
                        <th className="py-3 px-3 text-center">EcoPoints</th>
                        <th className="py-3 px-4 text-center">VIP Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {[
                        { name: 'Mohammad Rahim', phone: '+880 1712-345678', zone: 'Gulshan-2, Dhaka', orders: 28, spend: 34800, points: 3480, tier: 'DIAMOND_VIP' },
                        { name: 'Sharmin Akhter', phone: '+880 1819-223344', zone: 'Dhanmondi, Dhaka', orders: 19, spend: 22400, points: 2240, tier: 'GOLD' },
                        { name: 'Tanvir Hossain', phone: '+880 1911-556677', zone: 'Uttara Sector 11', orders: 14, spend: 16800, points: 1680, tier: 'GOLD' },
                        { name: 'Farhana Kabir', phone: '+880 1612-990011', zone: 'Banani DOHS', orders: 9, spend: 11200, points: 1120, tier: 'SILVER' },
                      ].map((cust) => (
                        <tr key={cust.phone} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                          <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white">{cust.name}</td>
                          <td className="py-3 px-3 font-mono text-neutral-600 dark:text-neutral-300">{cust.phone}</td>
                          <td className="py-3 px-3 text-neutral-500 font-medium">{cust.zone}</td>
                          <td className="py-3 px-3 text-center font-bold">{cust.orders}</td>
                          <td className="py-3 px-3 text-right font-black text-emerald-600">৳{cust.spend.toLocaleString()}</td>
                          <td className="py-3 px-3 text-center font-bold text-amber-500">🌟 {cust.points}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black uppercase">
                              {cust.tier.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: FINANCE, DAILY CASH LEDGER & NBR VAT */}
          {/* ========================================== */}
          {activeRouteId === 'finance' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <CircleDollarSign className="h-7 w-7 text-primary-green" />
                    <span>Financial Ledger, Operating P&L & NBR VAT</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Daily cash drawer reconciliation, bKash/Card settlement, and 5% NBR supermarket VAT compliance.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('Financial Audit Exported', 'P&L statement downloaded.')}
                  className="font-bold text-xs"
                >
                  Export P&L (CSV)
                </Button>
              </div>

              {/* Finance Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">Gross Sales Revenue</span>
                  <div className="text-2xl font-black text-forest-900 dark:text-emerald-400 mt-2">৳148,920</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">+12.4% vs Yesterday</span>
                </Card>
                <Card className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">Cost of Goods Sold (COGS)</span>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white mt-2">৳108,400</div>
                  <span className="text-[10px] text-neutral-400 font-medium mt-1 block">Gross Margin: 27.2%</span>
                </Card>
                <Card className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">Net Operating Profit</span>
                  <div className="text-2xl font-black text-emerald-600 mt-2">৳28,520</div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Net Margin: 19.1%</span>
                </Card>
                <Card className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase">NBR 5% VAT Collected</span>
                  <div className="text-2xl font-black text-amber-500 mt-2">৳7,446</div>
                  <span className="text-[10px] text-amber-500 font-bold mt-1 block">NBR BIN: 003891048-0101</span>
                </Card>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: BRANCHES & MULTI-STORE MANAGEMENT */}
          {/* ========================================== */}
          {activeRouteId === 'branches' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Building2 className="h-7 w-7 text-primary-green" />
                    <span>Multi-Branch Hubs & Store Operations</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Live operational telemetry from Dhanmondi #01, Gulshan-2 #02, and Uttara #03 superstores.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('New Branch Form', 'Ready to add new Dhaka location.')}
                  className="font-bold text-xs"
                >
                  Add Branch Hub
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Dhanmondi Branch #01 (Flagship)', code: 'DHN-01', manager: 'Farhan Shakil', pos: 6, footfall: 640, sales: 84200, status: 'OPEN_BUSY' },
                  { name: 'Gulshan-2 Superstore #02', code: 'GLS-02', manager: 'Tanvir Ahmed', pos: 5, footfall: 520, sales: 52400, status: 'OPEN_NORMAL' },
                  { name: 'Uttara Sector 11 Express #03', code: 'UTR-03', manager: 'Nusrat Jahan', pos: 3, footfall: 380, sales: 32320, status: 'OPEN_NORMAL' },
                ].map((b) => (
                  <Card key={b.code} className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-neutral-400">{b.code}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                        ● {b.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h4 className="font-black text-sm text-neutral-900 dark:text-white">{b.name}</h4>
                    <p className="text-xs text-neutral-500">Store Manager: <strong>{b.manager}</strong></p>
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-2 text-center text-xs">
                      <div><span className="text-neutral-400 block text-[10px]">POS Counters</span><strong>{b.pos} Live</strong></div>
                      <div><span className="text-neutral-400 block text-[10px]">Footfall</span><strong>{b.footfall}</strong></div>
                      <div><span className="text-neutral-400 block text-[10px]">Today Sales</span><strong className="text-emerald-600">৳{b.sales.toLocaleString()}</strong></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: STAFF & EMPLOYEES */}
          {/* ========================================== */}
          {activeRouteId === 'employees' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Briefcase className="h-7 w-7 text-primary-green" />
                    <span>Employee Directory, Shifts & Attendance</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Store managers, POS cashiers, warehouse inventory keepers, and cold-chain express riders.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('Staff Onboarding', 'New employee creation form opened.')}
                  className="font-bold text-xs"
                >
                  Onboard Staff
                </Button>
              </div>

              <Card className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 uppercase font-black text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Employee</th>
                        <th className="py-3 px-3">Role</th>
                        <th className="py-3 px-3">Assigned Branch</th>
                        <th className="py-3 px-3">Shift Timing</th>
                        <th className="py-3 px-3">Contact</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {[
                        { name: 'Raihan Hasan Rana', role: 'Executive Store Owner & Director', branch: 'All Branches (HQ)', shift: 'Day General', phone: '+880 1712-000000', status: 'ACTIVE' },
                        { name: 'Farhan Shakil', role: 'Store General Manager', branch: 'Dhanmondi Flagship #01', shift: 'Morning (07:00 - 15:30)', phone: '+880 1711-998877', status: 'ON_DUTY' },
                        { name: 'Tanvir Ahmed', role: 'Head POS Cashier', branch: 'Gulshan-2 Superstore #02', shift: 'Evening (15:00 - 23:30)', phone: '+880 1812-334455', status: 'ON_DUTY' },
                        { name: 'Mahmudul Hasan', role: 'Cold-Chain Delivery Lead', branch: 'Uttara Sector 11 Express #03', shift: 'Express On-Call', phone: '+880 1912-778899', status: 'ON_DUTY' },
                      ].map((emp) => (
                        <tr key={emp.phone} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                          <td className="py-3 px-4 font-bold text-neutral-900 dark:text-white">{emp.name}</td>
                          <td className="py-3 px-3 font-semibold text-primary-green">{emp.role}</td>
                          <td className="py-3 px-3 text-neutral-500">{emp.branch}</td>
                          <td className="py-3 px-3 text-neutral-600 dark:text-neutral-300 font-mono">{emp.shift}</td>
                          <td className="py-3 px-3 font-mono">{emp.phone}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                              ● {emp.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: AI ASSISTANT / COPILOT */}
          {/* ========================================== */}
          {activeRouteId === 'ai-assistant' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Sparkles className="h-7 w-7 text-primary-green animate-pulse" />
                    <span>ECOBAZAR AI Operations Copilot</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Autonomous neural agent for retail demand forecasting, dynamic pricing, and inventory optimization.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs border border-emerald-500/40">
                  AI MODEL GEMINI-2.0 LIVE
                </span>
              </div>

              {/* Quick AI Prompts */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Gulshan-2 ব্রাঞ্চের জন্য আগামী শুক্রবারের ফ্রেশ মিল্ক ও মিষ্টি পেয়ারা ডিমান্ড প্রেডিকশন কী?',
                  'কোন কোন পণ্যের স্টক দ্রুত শেষ হয়ে যাওয়ার ঝুঁকিতে রয়েছে?',
                  'ধামন্ডি স্টোরে যেসব পণ্যের মেয়াদ ৪৮ ঘণ্টার মধ্যে শেষ হবে তাদের ডিসকাউন্ট দিন',
                  'আজকের ঢাকা বৃষ্টির কারণে কোন কোন গ্রোসারি আইটেম সবচেয়ে বেশি বিক্রি হবে?',
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAskAi(prompt)}
                    className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 font-semibold text-left transition border border-transparent hover:border-emerald-500/40"
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask ECOBAZAR AI Copilot anything about sales, stock, forecasting, or Dhaka market rates..."
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-primary-green"
                />
                <Button
                  variant="forest"
                  size="sm"
                  disabled={isAiThinking || !aiPromptInput.trim()}
                  onClick={() => handleAskAi()}
                  className="font-black text-xs px-5"
                >
                  {isAiThinking ? 'Analyzing...' : 'Ask AI'}
                </Button>
              </div>

              {/* AI Responses Log */}
              <div className="space-y-3">
                {aiResponses.map((item, i) => (
                  <Card key={i} className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary-green" />
                        {item.q}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/20 font-medium">
                      {item.a}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: SETTINGS & NBR VAT CONFIG */}
          {/* ========================================== */}
          {activeRouteId === 'settings' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <Settings className="h-7 w-7 text-primary-green" />
                    <span>Supermarket Configuration & NBR VAT Settings</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Store identification, thermal receipt headers, tax brackets, and SMS notification gateways.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  onClick={() => toast.success('Settings Saved', 'Supermarket parameters updated successfully.')}
                  className="font-bold text-xs"
                >
                  Save Changes
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                  <h4 className="font-black text-sm text-neutral-900 dark:text-white">Store Identity & Legal</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Store Legal Name</label>
                      <input
                        type="text"
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">NBR Business Identification Number (BIN)</label>
                      <input
                        type="text"
                        value={storeSettings.binNumber}
                        onChange={(e) => setStoreSettings({ ...storeSettings, binNumber: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Standard Supermarket VAT Rate (%)</label>
                      <input
                        type="number"
                        value={storeSettings.vatPercent}
                        onChange={(e) => setStoreSettings({ ...storeSettings, vatPercent: Number(e.target.value) })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                  <h4 className="font-black text-sm text-neutral-900 dark:text-white">Communication & Automation</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Helpline Phone</label>
                      <input
                        type="text"
                        value={storeSettings.contactPhone}
                        onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Support Email</label>
                      <input
                        type="email"
                        value={storeSettings.contactEmail}
                        onChange={(e) => setStoreSettings({ ...storeSettings, contactEmail: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                      />
                    </div>
                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-neutral-800 dark:text-neutral-200">
                        <input
                          type="checkbox"
                          checked={storeSettings.enableSmsAlerts}
                          onChange={(e) => setStoreSettings({ ...storeSettings, enableSmsAlerts: e.target.checked })}
                          className="rounded text-primary-green focus:ring-primary-green h-4 w-4"
                        />
                        <span>Send Automated SMS Order Tracking to Customers</span>
                      </label>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: AUDIT LOGS & SECURITY TRAIL */}
          {/* ========================================== */}
          {activeRouteId === 'audit-logs' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <History className="h-7 w-7 text-primary-green" />
                    <span>Immutable Audit Log Trail & Security</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    System activity, price changes, cashier tenders, and administrative operations log.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="h-3.5 w-3.5" />}
                  onClick={() => toast.success('Audit Log Exported', 'Security audit trail CSV downloaded.')}
                  className="font-bold text-xs"
                >
                  Export Audit Log
                </Button>
              </div>

              <Card className="overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 uppercase font-black text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-3">Actor / Staff</th>
                        <th className="py-3 px-3">Branch Scope</th>
                        <th className="py-3 px-3">Action Type</th>
                        <th className="py-3 px-4">Event Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {[
                        { time: 'Today, 11:45 AM', actor: 'Store Admin (Raihan Hasan Rana)', branch: 'Central HQ', type: 'PRICE_UPDATE', desc: 'Updated price for Fresh Guava 1kg to ৳90 with 15% OFF badge' },
                        { time: 'Today, 10:45 AM', actor: 'POS Terminal 02', branch: 'Gulshan-2 #02', type: 'SALE_TENDER', desc: 'Processed Cash on Delivery order #ECO-DH-901842 for ৳470' },
                        { time: 'Today, 10:12 AM', actor: 'Customer Web Checkout', branch: 'Dhanmondi #01', type: 'ONLINE_ORDER', desc: 'Received online order #ECO-DH-847291 with bKash digital payment' },
                        { time: 'Today, 09:30 AM', actor: 'Manager (Farhan Shakil)', branch: 'Dhanmondi #01', type: 'STOCK_TRANSFER', desc: 'Approved inter-branch stock dispatch TR-2026-092 to Uttara hub' },
                      ].map((log, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                          <td className="py-3 px-4 font-mono text-neutral-500">{log.time}</td>
                          <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white">{log.actor}</td>
                          <td className="py-3 px-3 text-neutral-500">{log.branch}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px] font-bold">
                              {log.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-700 dark:text-neutral-300 font-medium">{log.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: ROLES & PERMISSIONS */}
          {/* ========================================== */}
          {activeRouteId === 'roles' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <ShieldCheck className="h-7 w-7 text-primary-green" />
                    <span>Role-Based Access Control (RBAC)</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Manage administrative privileges, price modification rights, and cashier register permissions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { role: 'Super Admin', desc: 'Full unrestricted control over all branches, pricing, financials & settings', users: '1 User (Raihan Hasan Rana)' },
                  { role: 'Store Branch Manager', desc: 'Branch inventory, stock transfers, purchase orders & shift scheduling', users: '3 Users (Dhanmondi, Gulshan, Uttara)' },
                  { role: 'Head POS Cashier', desc: 'POS checkout terminal, cash tender, customer return & receipt printing', users: '14 Cashiers across Dhaka' },
                ].map((r) => (
                  <Card key={r.role} className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <h4 className="font-black text-sm text-neutral-900 dark:text-white">{r.role}</h4>
                    <p className="text-xs text-neutral-500">{r.desc}</p>
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-bold text-primary-green">
                      {r.users}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* VIEW: NOTIFICATIONS & MARKET INTEL */}
          {/* ========================================== */}
          {(activeRouteId === 'notifications' || activeRouteId === 'market-intel' || activeRouteId === 'campaigns' || activeRouteId === 'returns') && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight capitalize flex items-center gap-2.5">
                    <Bell className="h-7 w-7 text-primary-green" />
                    <span>{activeRouteId.replace('-', ' ')} Console</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
                    Active operational intelligence and marketing telemetry for ECOBAZAR Dhaka network.
                  </p>
                </div>
                <Button
                  variant="forest"
                  size="sm"
                  onClick={() => toast.success('Operation Executed', `${activeRouteId} refreshed.`)}
                  className="font-bold text-xs"
                >
                  Refresh Feed
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Karwan Bazar & Shyambazar Wholesale Price Index', desc: 'Fresh tomato wholesale prices decreased by 8% today. Retail margin opportunity is now 32%.', badge: 'Market Intel', time: '10 Mins Ago' },
                  { title: 'Sub-4°C Cold Storage IoT Alert: Dhanmondi Chiller #02', desc: 'Temperature calibrated to 3.2°C. Cold-chain unbroken. Dairy and meat stock in pristine freshness.', badge: 'Telemetry OK', time: '25 Mins Ago' },
                  { title: 'Weekend Flash Campaign: Friday Organic Bazar', desc: 'Campaign scheduled to launch tomorrow at 06:00 AM across web store and Dhanmondi/Gulshan branches.', badge: 'Campaign Ready', time: '1 Hour Ago' },
                ].map((item, idx) => (
                  <Card key={idx} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-neutral-900 dark:text-white">{item.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300">{item.desc}</p>
                    <span className="text-[10px] text-neutral-400 font-mono block pt-1">{item.time}</span>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* POS TENDER MODAL */}
      {/* ========================================================= */}
      <Dialog open={posTenderModalOpen} onOpenChange={setPosTenderModalOpen} size="md">
        <DialogHeader>
          <DialogTitle>Complete POS Sale & Tender</DialogTitle>
          <DialogDescription>
            Grand Total to collect: <strong className="text-forest-900 font-black">৳{posTotal.toLocaleString()}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Select Payment Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {(['CASH', 'BKASH', 'CARD'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPosPaymentMethod(method)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      posPaymentMethod === method
                        ? 'bg-forest-900 text-white border-forest-900 shadow-xs'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {posPaymentMethod === 'CASH' && (
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Cash Received from Customer (৳)</label>
                <input
                  type="number"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 outline-hidden font-mono font-bold"
                />
                <div className="mt-2 text-xs flex justify-between font-bold">
                  <span className="text-neutral-500">Change Due:</span>
                  <span className={(Number(cashTendered) || 0) >= posTotal ? 'text-primary-green' : 'text-rose-500'}>
                    ৳{Math.max(0, (Number(cashTendered) || 0) - posTotal).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {posPaymentMethod === 'BKASH' && (
              <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 text-pink-900 text-center space-y-2">
                <p className="text-xs font-bold">Customer scans POS Merchant QR</p>
                <p className="text-[11px]">Merchant Number: <strong>01712-ECOPOS (Dhanmondi)</strong></p>
                <div className="h-28 w-28 mx-auto bg-white p-2 rounded-lg border border-pink-200 flex items-center justify-center font-mono text-[9px] text-neutral-400">
                  [ bKash QR CODE ]
                </div>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setPosTenderModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="forest" size="sm" onClick={handleCompletePosSale}>
            Confirm Payment & Print Receipt
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* THERMAL RECEIPT PREVIEW MODAL */}
      {/* ========================================================= */}
      {completedReceipt && (
        <Dialog open={!!completedReceipt} onOpenChange={() => setCompletedReceipt(null)} size="sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Printer className="h-5 w-5 text-primary-green" />
              Thermal POS Receipt
            </DialogTitle>
            <DialogDescription>Dhanmondi Flagship Superstore #01</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="p-4 bg-neutral-50 border border-dashed border-neutral-300 rounded-xl font-mono text-[11px] text-neutral-800 space-y-2">
              <div className="text-center border-b border-dashed border-neutral-300 pb-2">
                <p className="font-bold text-sm">ECOBAZAR RETAIL</p>
                <p className="text-[10px]">House 42, Road 27, Dhanmondi, Dhaka</p>
                <p className="text-[10px]">BIN: 001928471-0101 • Mushak 6.3</p>
                <p className="text-[10px] mt-1 font-bold">{completedReceipt.invoiceNo}</p>
                <p className="text-[10px] text-neutral-500">{completedReceipt.timestamp}</p>
              </div>

              <div className="space-y-1 py-1 border-b border-dashed border-neutral-300">
                {completedReceipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate max-w-[140px]">{it.name} x{it.quantity}</span>
                    <span>৳{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-right pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{completedReceipt.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (5%):</span>
                  <span>৳{completedReceipt.vat}</span>
                </div>
                <div className="flex justify-between font-bold text-xs pt-1 border-t border-dashed border-neutral-300">
                  <span>NET PAYABLE:</span>
                  <span>৳{completedReceipt.total}</span>
                </div>
                <div className="flex justify-between text-neutral-500 text-[10px]">
                  <span>Paid via {completedReceipt.paymentMethod}:</span>
                  <span>৳{completedReceipt.tendered}</span>
                </div>
                {completedReceipt.change > 0 && (
                  <div className="flex justify-between text-neutral-500 text-[10px]">
                    <span>Change Returned:</span>
                    <span>৳{completedReceipt.change}</span>
                  </div>
                )}
              </div>

              <div className="text-center pt-2 text-[9px] text-neutral-400">
                Thank you for shopping at ECOBAZAR!
                <br />For returns, present receipt within 48 hours.
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast.success('Print Triggered', 'Thermal receipt sent to 80mm ESC/POS printer.');
                setCompletedReceipt(null);
              }}
            >
              Print ESC/POS
            </Button>
            <Button variant="forest" size="sm" onClick={() => setCompletedReceipt(null)}>
              Done
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      {/* ========================================================= */}
      {/* ULTRA-PREMIUM DUAL-COLUMN PRODUCT CREATION & STOREFRONT STUDIO */}
      {/* ========================================================= */}
      <Dialog
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        size="3xl"
        className="max-w-6xl w-full p-0 overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Studio Top Header */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-b border-neutral-200 dark:border-neutral-800 px-6 py-4.5 flex flex-col gap-3">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/25 shrink-0">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-900 dark:text-white flex items-center gap-2 tracking-tight">
                  <span>{editingProduct ? `Edit Live Product: ${editingProduct.name}` : 'Product Creation & Storefront Studio'}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    {editingProduct ? 'Update Mode' : 'Live Sync'}
                  </span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {editingProduct
                    ? `SKU: ${editingProduct.id} • Real-time catalog sync enabled across live storefront`
                    : 'Configure catalog specs, upload imagery, tune prices, and monitor live storefront preview.'}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                Catalog Engine Active
              </span>
            </div>
          </div>

          {/* Quick Presets Bar */}
          {!editingProduct && (
            <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-black uppercase text-neutral-400 dark:text-neutral-500 shrink-0 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" /> 1-Click Presets:
              </span>
              {quickPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 border border-neutral-200/80 dark:border-neutral-700 transition shrink-0 flex items-center gap-1"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dual-Column Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800">
          {/* LEFT COLUMN: Comprehensive Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col overflow-y-auto max-h-[calc(92vh-175px)] p-6 space-y-5 text-xs text-left">
            {/* Tab Navigation Pill Bar */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/60 overflow-x-auto shrink-0">
              {[
                { id: 'general', label: '1. Identity & Dept', icon: Package },
                { id: 'pricing', label: '2. Pricing & Savings', icon: DollarSign },
                { id: 'media', label: '3. Media Center', icon: UploadCloud },
                { id: 'placements', label: '4. Store Placements', icon: Flame },
                { id: 'details', label: '5. Story & Specs', icon: Layers },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = productModalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setProductModalTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition shrink-0 ${
                      isActive
                        ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-neutral-200/60 dark:border-neutral-700'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <IconComponent className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-600' : 'text-neutral-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: IDENTITY & DEPARTMENT */}
            {productModalTab === 'general' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3.5">
                  <h4 className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                    <Package className="h-4 w-4 text-emerald-600" />
                    <span>Product Names & Branding</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Product Name (English) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sundarban Pure Raw Honey 1kg"
                        value={productForm.name}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Product Name (বাংলা / Bangla)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. সুন্দরবন খাঁটি প্রাকৃতিক মধু ১ কেজি"
                        value={productForm.nameBn}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, nameBn: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Brand / Producer
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ECOBAZAR Organic, Bogura Farmers"
                        value={productForm.brand}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, brand: e.target.value }))}
                        className="w-full px-3.5 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Region / Origin
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sundarbans, Bogura, Sylhet"
                        value={productForm.origin}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, origin: e.target.value }))}
                        className="w-full px-3.5 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3.5">
                  <h4 className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-emerald-600" />
                    <span>Category Hierarchy & Packaging</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Department / Category *
                      </label>
                      <select
                        value={productForm.categorySlug}
                        onChange={(e) => {
                          const slug = e.target.value;
                          const cat = categories.find((c) => c.slug === slug);
                          setProductForm((prev) => ({
                            ...prev,
                            categorySlug: slug,
                            category: cat ? cat.name : prev.category,
                          }));
                        }}
                        className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.slug}>
                            {c.icon || '📦'} {c.name} ({c.nameBn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Subcategory
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sundarban Honey, Organic Rice, Farm Eggs"
                        value={productForm.subcategory}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, subcategory: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Packaging Unit
                    </label>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {['1 kg pack', '500 gm jar', '250 gm', '1 L bottle', '12 pcs pack', '5 kg bag'].map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setProductForm((prev) => ({ ...prev, unit: u }))}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                            productForm.unit === u
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-emerald-400'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 1 kg pack, 500 gm jar, 12 pcs"
                      value={productForm.unit}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3.5 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                      Opening Stock Quantity (Units in Warehouse)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, stock: e.target.value }))}
                        className="w-40 px-3.5 py-2 border rounded-xl outline-hidden font-mono font-bold border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      />
                      <span className="text-[11px] font-bold text-neutral-500">
                        {Number(productForm.stock) > 20 ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Healthy stock level
                          </span>
                        ) : Number(productForm.stock) > 0 ? (
                          <span className="text-amber-600 flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5" /> Low stock alert threshold
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" /> Out of stock
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRICING & SAVINGS */}
            {productModalTab === 'pricing' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3.5">
                  <h4 className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span>Price Formulation & Value</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Active Selling Price (৳ BDT) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">
                          ৳
                        </span>
                        <input
                          type="number"
                          placeholder="e.g. 280"
                          value={productForm.price}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                          className="w-full pl-8 pr-3.5 py-2.5 border rounded-xl outline-hidden font-mono font-black text-sm border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        The real-time price charged on storefront cart and checkout.
                      </span>
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Regular / Original Price (৳ BDT)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">
                          ৳
                        </span>
                        <input
                          type="number"
                          placeholder="e.g. 350 (leave empty if no discount)"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm((prev) => ({ ...prev, originalPrice: e.target.value }))}
                          className="w-full pl-8 pr-3.5 py-2.5 border rounded-xl outline-hidden font-mono text-sm border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        Rendered as crossed-out on product card to display customer savings.
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Real-Time Savings Calculator */}
                  {Number(productForm.originalPrice) > Number(productForm.price) && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          Real-time Customer Savings:
                        </span>
                      </div>
                      <strong className="font-black text-emerald-700 dark:text-emerald-400 font-mono text-xs">
                        Save ৳{Number(productForm.originalPrice) - Number(productForm.price)} (
                        {Math.round(
                          ((Number(productForm.originalPrice) - Number(productForm.price)) /
                            Number(productForm.originalPrice)) *
                            100
                        )}
                        % OFF)
                      </strong>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3.5">
                  <h4 className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                    <Tag className="h-4 w-4 text-emerald-600" />
                    <span>Storefront Promotional Badges</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Promo Badge Text (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 20% OFF, BEST VALUE, ORGANIC"
                        value={productForm.badge}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, badge: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                        Badge Color Theme
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                        {[
                          { id: 'red', label: 'Red', bg: 'bg-rose-500' },
                          { id: 'green', label: 'Green', bg: 'bg-emerald-600' },
                          { id: 'orange', label: 'Orange', bg: 'bg-amber-500' },
                          { id: 'purple', label: 'Violet', bg: 'bg-purple-600' },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setProductForm((prev) => ({ ...prev, badgeColor: c.id as any }))}
                            className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                              productForm.badgeColor === c.id
                                ? 'border-neutral-900 dark:border-white ring-2 ring-emerald-500/30 font-black'
                                : 'border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <span className={`h-2.5 w-2.5 rounded-full ${c.bg}`}></span>
                            <span className="text-[10px] font-bold">{c.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MEDIA CENTER (MULTI-IMAGE GALLERY & PC UPLOAD) */}
            {productModalTab === 'media' && (
              <div className="space-y-4">
                {/* 1. Multi-File Drag-and-Drop Uploader */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={handleFileDrop}
                  className={`p-6 rounded-3xl border-2 border-dashed transition-all text-center space-y-3 ${
                    isDraggingFile
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 scale-[1.01]'
                      : 'border-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/20 hover:border-emerald-500'
                  }`}
                >
                  {/* Hidden Native File Input supporting multiple files */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageFileInputChange}
                    className="hidden"
                    disabled={isUploadingImage}
                  />

                  <div className="h-14 w-14 rounded-2xl bg-white dark:bg-neutral-800 shadow-md border border-emerald-200 dark:border-emerald-800 text-emerald-600 flex items-center justify-center mx-auto">
                    {isUploadingImage ? (
                      <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
                    ) : (
                      <UploadCloud className="h-7 w-7 text-emerald-600" />
                    )}
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-neutral-900 dark:text-white">
                      Drag & Drop Product Images Here (Multiple Files Supported)
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Upload multiple angles or packaging photos at once (JPG, PNG, WEBP, AVIF up to 15MB each).
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-md shadow-emerald-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>{isUploadingImage ? 'Uploading Photos...' : 'Browse Computer Images (Multi-select)'}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Uploaded Product Gallery Cards */}
                {productForm.images.length > 0 && (
                  <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-neutral-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-emerald-600" />
                        <span>Product Image Gallery ({productForm.images.length} Photos)</span>
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        First image is the Primary Cover photo.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {productForm.images.map((imgUrl, index) => (
                        <div
                          key={index}
                          className={`relative rounded-2xl border p-2 bg-neutral-50 dark:bg-neutral-800/60 overflow-hidden group transition ${
                            index === 0
                              ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                              : 'border-neutral-200 dark:border-neutral-700 hover:border-emerald-300'
                          }`}
                        >
                          <div className="h-28 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-2">
                            <img src={imgUrl} alt={`Gallery ${index + 1}`} className="h-full w-full object-contain" />
                          </div>

                          {/* Index 0 Cover Badge */}
                          {index === 0 ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                              ⭐ Primary Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(imgUrl)}
                              className="text-[10px] font-bold text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 transition"
                            >
                              Set as Cover
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-3 right-3 h-6 w-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition"
                            title="Remove image"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Add Image via Direct URL */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-2">
                  <label className="font-bold text-neutral-700 dark:text-neutral-200 block">
                    Or Add Image via URL / Public Path
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. /images/products/sundarban-honey.webp or https://..."
                      value={manualImageUrl}
                      onChange={(e) => setManualImageUrl(e.target.value)}
                      className="flex-1 px-3.5 py-2 border rounded-xl outline-hidden font-mono text-xs border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualImageUrl}
                      className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs hover:bg-emerald-600 dark:hover:bg-emerald-500 transition shrink-0"
                    >
                      + Add to Gallery
                    </button>
                  </div>
                </div>

                {/* 4. Preset Produce Gallery (Click adds to images list) */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-2.5">
                  <label className="font-bold text-neutral-700 dark:text-neutral-200 block">
                    Or Pick from Authentic Supermarket Library:
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {[
                      { label: 'Red Tomato', url: '/images/products/red-tomato.jpg' },
                      { label: 'Sagor Banana', url: '/images/products/banena.jpg' },
                      { label: 'Sundarban Honey', url: '/images/products/sundarban-honey.webp' },
                      { label: 'Mustard Oil', url: '/images/products/mustard-oil.webp' },
                      { label: 'Deshi Ghee', url: '/images/products/deshi-ghee.webp' },
                      { label: 'Brown Eggs', url: '/images/products/dozen-egg.webp' },
                      { label: 'Miniket Rice', url: '/images/products/miniket-chal.jpg' },
                      { label: 'Polao Chal', url: '/images/products/polao-chal.jpg' },
                      { label: 'Moshur Daal', url: '/images/products/moshur-dal.jpeg' },
                      { label: 'Rui Fish', url: '/images/products/rui-fish.webp' },
                      { label: 'Bogura Doi', url: '/images/products/bogura-doi.jpg' },
                      { label: 'Deshi Murgi', url: '/images/products/deshi-murgi.jpg' },
                    ].map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setProductForm((prev) => {
                            if (prev.images.includes(preset.url)) return prev;
                            const next = [...prev.images, preset.url];
                            return { ...prev, images: next, image: prev.image || next[0] };
                          });
                          toast.success('Photo Added', `${preset.label} added to gallery.`);
                        }}
                        className="p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-emerald-400 text-center transition"
                      >
                        <div className="h-11 w-full rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-700 mb-1">
                          <img src={preset.url} alt={preset.label} className="h-full w-full object-cover" />
                        </div>
                        <span className="text-[9px] font-bold text-neutral-700 dark:text-neutral-300 line-clamp-1">
                          + {preset.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: STORE PLACEMENTS & MARKETING FLAGS */}
            {productModalTab === 'placements' && (
              <div className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-300 font-medium">
                  Toggle which customer-facing promotional sections of the storefront this product will appear in:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Hot Deal */}
                  <label className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    productForm.isHotDeal
                      ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/30 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-neutral-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={productForm.isHotDeal}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, isHotDeal: e.target.checked }))}
                      className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4 mt-0.5"
                    />
                    <div>
                      <span className="font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                        <Flame className="h-4 w-4 fill-rose-500" />
                        Today&apos;s Best Deals 🔥
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Displayed in the homepage countdown deals carousel and featured at <strong>/deals</strong>.
                      </p>
                    </div>
                  </label>

                  {/* New Arrival */}
                  <label className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    productForm.isNewArrival
                      ? 'border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/30 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-neutral-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={productForm.isNewArrival}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, isNewArrival: e.target.checked }))}
                      className="rounded text-cyan-600 focus:ring-cyan-500 h-4 w-4 mt-0.5"
                    />
                    <div>
                      <span className="font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" />
                        New Arrival Batch ✨
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Highlights fresh restocks on the homepage and at <strong>/new-arrivals</strong>.
                      </p>
                    </div>
                  </label>

                  {/* Special Offer */}
                  <label className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    productForm.isOffer
                      ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/30 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-neutral-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={productForm.isOffer}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, isOffer: e.target.checked }))}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4 mt-0.5"
                    />
                    <div>
                      <span className="font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Percent className="h-4 w-4" />
                        Special Discount Offer 🏷️
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Showcased in the discounted deals catalog and at <strong>/offers</strong>.
                      </p>
                    </div>
                  </label>

                  {/* Frontpage Ad */}
                  <label className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    productForm.isAdvertisement
                      ? 'border-purple-400 bg-purple-50/40 dark:bg-purple-950/30 shadow-xs'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-neutral-300'
                  }`}>
                    <input
                      type="checkbox"
                      checked={productForm.isAdvertisement}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, isAdvertisement: e.target.checked }))}
                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 mt-0.5"
                    />
                    <div>
                      <span className="font-black text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                        <Megaphone className="h-4 w-4" />
                        Frontpage Advertisement 📢
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                        Spotlighted on hero banner carousel and given top search placement.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 5: STORY & SPECS (SELECTIVE DETAILS - CHOOSE WHAT TO SHOW) */}
            {productModalTab === 'details' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                  💡 <strong>Custom Details Controls:</strong> Choose exactly which sections you want for this product. Unchecked or blank sections will be completely omitted from the customer-facing details page.
                </div>

                {/* 1. Description Section */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-600" />
                      <span>1. Product Narrative Description</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.includeDescription}
                        onChange={(e) => setProductForm((p) => ({ ...p, includeDescription: e.target.checked }))}
                        className="rounded text-emerald-600"
                      />
                      <span>Show on Page</span>
                    </label>
                  </div>
                  {productForm.includeDescription && (
                    <textarea
                      rows={3}
                      placeholder="Rich paragraph describing the origin, quality, and freshness..."
                      value={productForm.description}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                  )}
                </div>

                {/* 2. Key Features Section */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>2. Key Features (Bulleted List)</span>
                      </label>
                      <p className="text-[10px] text-neutral-400">Enter 1 feature per line. Rendered with green checkmarks.</p>
                    </div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.includeFeatures}
                        onChange={(e) => setProductForm((p) => ({ ...p, includeFeatures: e.target.checked }))}
                        className="rounded text-emerald-600"
                      />
                      <span>Show on Page</span>
                    </label>
                  </div>
                  {productForm.includeFeatures && (
                    <textarea
                      rows={4}
                      placeholder="100% Organic & Chemical-free&#10;Harvested under fair trade standards&#10;Cold-chain packaging"
                      value={productForm.keyFeaturesText}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, keyFeaturesText: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-[11px]"
                    />
                  )}
                </div>

                {/* 3. Health Benefits Section */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        <span>3. Health & Nutritional Benefits</span>
                      </label>
                      <p className="text-[10px] text-neutral-400">Enter 1 benefit per line (vitamins, immunity, energy, etc.).</p>
                    </div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.includeBenefits}
                        onChange={(e) => setProductForm((p) => ({ ...p, includeBenefits: e.target.checked }))}
                        className="rounded text-emerald-600"
                      />
                      <span>Show on Page</span>
                    </label>
                  </div>
                  {productForm.includeBenefits && (
                    <textarea
                      rows={4}
                      placeholder="Rich in natural Vitamin C and Lycopene&#10;Promotes digestive wellbeing&#10;Low glycemic and heart-healthy"
                      value={productForm.healthBenefitsText}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, healthBenefitsText: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-[11px]"
                    />
                  )}
                </div>

                {/* 4. How to Use Section (OPTIONAL - Turn OFF for Fruits/Vegetables!) */}
                <div className={`p-4 rounded-2xl border transition ${
                  productForm.includeHowToUse
                    ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50'
                } space-y-3`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                        <span>🥣 4. How to Use / Usage Guide</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold">
                          Optional
                        </span>
                      </label>
                      <p className="text-[10px] text-neutral-400">
                        Turn ON for honey, oil, powders. Leave <strong>OFF for fruits & vegetables</strong>.
                      </p>
                    </div>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.includeHowToUse}
                        onChange={(e) => setProductForm((p) => ({ ...p, includeHowToUse: e.target.checked }))}
                        className="rounded text-emerald-600"
                      />
                      <span>{productForm.includeHowToUse ? 'Enabled (Showing)' : 'Disabled (Hidden)'}</span>
                    </label>
                  </div>
                  {productForm.includeHowToUse && (
                    <textarea
                      rows={3}
                      placeholder="e.g. Mix 1-2 teaspoons in warm water with lemon every morning on an empty stomach."
                      value={productForm.howToUse}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, howToUse: e.target.value }))}
                      className="w-full px-3.5 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                  )}
                </div>

                {/* 5. Storage Instructions Section */}
                <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-black text-neutral-900 dark:text-white flex items-center gap-2">
                      <span>📦 5. Storage Instructions</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.includeStorage}
                        onChange={(e) => setProductForm((p) => ({ ...p, includeStorage: e.target.checked }))}
                        className="rounded text-emerald-600"
                      />
                      <span>Show on Page</span>
                    </label>
                  </div>
                  {productForm.includeStorage && (
                    <input
                      type="text"
                      placeholder="e.g. Store at room temperature in a dry place. Keep away from direct sunlight."
                      value={productForm.storageInstructions}
                      onChange={(e) =>
                        setProductForm((prev) => ({ ...prev, storageInstructions: e.target.value }))
                      }
                      className="w-full px-3.5 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Live Storefront Card Preview (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-50 to-neutral-100/70 dark:from-neutral-900/90 dark:to-neutral-950 p-6 flex flex-col justify-between overflow-y-auto max-h-[calc(92vh-175px)] space-y-5 text-left">
            <div>
              {/* Preview Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-emerald-600" />
                  <span className="font-black text-xs text-neutral-900 dark:text-white uppercase tracking-wider">
                    Live Storefront Card Preview
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {productForm.images.length > 0 ? `${productForm.images.length} Photos` : 'Single Cover'}
                </span>
              </div>

              {/* Realistic Customer Store Product Card */}
              <div className="mt-4 mx-auto max-w-sm rounded-3xl border border-neutral-200/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-850 p-4 shadow-xl relative overflow-hidden transition-all">
                {/* Promo Badge on Card */}
                {(productForm.badge || Number(productForm.originalPrice) > Number(productForm.price)) && (
                  <div
                    className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-xs ${
                      productForm.badgeColor === 'green'
                        ? 'bg-emerald-600'
                        : productForm.badgeColor === 'orange'
                        ? 'bg-amber-500'
                        : productForm.badgeColor === 'purple'
                        ? 'bg-purple-600'
                        : 'bg-rose-500'
                    }`}
                  >
                    {productForm.badge ||
                      (Number(productForm.originalPrice) > Number(productForm.price)
                        ? `${Math.round(
                            ((Number(productForm.originalPrice) - Number(productForm.price)) /
                              Number(productForm.originalPrice)) *
                              100
                          )}% OFF`
                        : 'HOT DEAL')}
                  </div>
                )}

                {/* Heart Button */}
                <button
                  type="button"
                  className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 dark:bg-neutral-800/90 shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-rose-500 transition"
                >
                  <Heart className="h-4 w-4" />
                </button>

                {/* Primary Cover Image Container */}
                <div className="h-48 w-full rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 overflow-hidden flex items-center justify-center p-3 mb-2 border border-neutral-100 dark:border-neutral-700/50">
                  {productForm.image || productForm.images[0] ? (
                    <img
                      src={productForm.image || productForm.images[0]}
                      alt={productForm.name || 'Preview'}
                      className="h-full w-full object-contain transition-transform hover:scale-105 duration-300"
                    />
                  ) : (
                    <div className="text-center text-neutral-400">
                      <ImageIcon className="h-10 w-10 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px] font-bold">No Image Selected</span>
                    </div>
                  )}
                </div>

                {/* Multi-Image Thumbnails Preview on Storefront */}
                {productForm.images.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2">
                    {productForm.images.map((thumb, idx) => (
                      <div
                        key={idx}
                        className={`h-10 w-10 rounded-lg overflow-hidden border shrink-0 bg-neutral-100 dark:bg-neutral-800 p-0.5 ${
                          (productForm.image || productForm.images[0]) === thumb
                            ? 'border-emerald-600 ring-1 ring-emerald-500'
                            : 'border-neutral-200 dark:border-neutral-700 opacity-60'
                        }`}
                      >
                        <img src={thumb} alt={`Thumb ${idx + 1}`} className="h-full w-full object-cover rounded-md" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Category & Department */}
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  <span>{productForm.category || 'Category'}</span>
                  <span className="text-neutral-400 font-mono font-normal">
                    {productForm.origin || 'Bangladesh'}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-black text-sm text-neutral-900 dark:text-white line-clamp-1">
                  {productForm.name || 'Untitled Product'}
                </h4>
                {productForm.nameBn && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mb-1 font-medium">
                    {productForm.nameBn}
                  </p>
                )}

                {/* Star Rating & Unit */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200">
                      4.9
                    </span>
                    <span className="text-[10px] text-neutral-400">(24)</span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                    {productForm.unit || '1 unit'}
                  </span>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-forest-900 dark:text-emerald-400 font-mono">
                        ৳{Number(productForm.price) || 0}
                      </span>
                      {Number(productForm.originalPrice) > Number(productForm.price) && (
                        <span className="text-xs text-neutral-400 line-through font-mono">
                          ৳{productForm.originalPrice}
                        </span>
                      )}
                    </div>
                    {Number(productForm.originalPrice) > Number(productForm.price) && (
                      <span className="text-[10px] font-bold text-emerald-600 block">
                        Save ৳{Number(productForm.originalPrice) - Number(productForm.price)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* Active Placement Checklist & Enabled Details */}
              <div className="mt-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 space-y-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-neutral-400 block">
                  Storefront Details Visibility
                </span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                  <span className={productForm.includeDescription ? 'text-emerald-600' : 'text-neutral-400 line-through'}>
                    ✓ Description
                  </span>
                  <span className={productForm.includeFeatures ? 'text-emerald-600' : 'text-neutral-400 line-through'}>
                    ✓ Features List
                  </span>
                  <span className={productForm.includeBenefits ? 'text-emerald-600' : 'text-neutral-400 line-through'}>
                    ✓ Health Benefits
                  </span>
                  <span className={productForm.includeHowToUse ? 'text-emerald-600' : 'text-neutral-400 line-through'}>
                    {productForm.includeHowToUse ? '✓ How to Use' : '✗ How to Use (Off)'}
                  </span>
                  <span className={productForm.includeStorage ? 'text-emerald-600' : 'text-neutral-400 line-through'}>
                    ✓ Storage Advice
                  </span>
                  <span className="text-emerald-600">
                    📸 {productForm.images.length || 1} Photo(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Validation Pill */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px]">
              <span className="text-neutral-500">Status Check:</span>
              {productForm.name.trim() && Number(productForm.price) > 0 ? (
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Live Storefront
                </span>
              ) : (
                <span className="font-bold text-amber-600 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> Name & Price required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Studio Bottom Action Footer */}
        <div className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsProductModalOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400 pl-2">
              <span>Section:</span>
              <strong className="text-neutral-700 dark:text-neutral-300 capitalize font-mono">
                {productModalTab}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Step navigation */}
            {productModalTab !== 'general' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const tabs: any[] = ['general', 'pricing', 'media', 'placements', 'details'];
                  const idx = tabs.indexOf(productModalTab);
                  if (idx > 0) setProductModalTab(tabs[idx - 1]);
                }}
                className="text-xs"
              >
                Previous Step
              </Button>
            )}

            {productModalTab !== 'details' ? (
              <Button
                variant="forest"
                size="sm"
                onClick={() => {
                  const tabs: any[] = ['general', 'pricing', 'media', 'placements', 'details'];
                  const idx = tabs.indexOf(productModalTab);
                  if (idx < tabs.length - 1) setProductModalTab(tabs[idx + 1]);
                }}
                className="text-xs font-bold"
              >
                Next Step
              </Button>
            ) : null}

            {/* Final Save Button */}
            <Button
              variant="forest"
              size="sm"
              onClick={handleSaveProduct}
              disabled={isSavingProduct || !productForm.name.trim()}
              className="font-black px-6 text-xs shadow-md shadow-emerald-600/25"
            >
              {isSavingProduct ? (
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Saving to Live Store...
                </span>
              ) : editingProduct ? (
                'Save & Update Live Product'
              ) : (
                'Create & Publish to Store 🚀'
              )}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* ========================================================= */}
      {/* CATEGORY EDIT MODAL */}
      {/* ========================================================= */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen} size="md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5 text-primary-green" />
            <span>Edit Category: {editingCategory?.name}</span>
          </DialogTitle>
          <DialogDescription>
            Update department name, Bangla translation, tagline, and banner image.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-3.5 text-xs text-left">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Category Name (English)
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Category Name (বাংলা / Bangla)
                </label>
                <input
                  type="text"
                  value={categoryForm.nameBn}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, nameBn: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={categoryForm.tagline}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Icon Emoji
                </label>
                <input
                  type="text"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-center text-lg"
                />
              </div>
              <div className="col-span-2">
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Banner Image URL / Path
                </label>
                <input
                  type="text"
                  value={categoryForm.bannerImage}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, bannerImage: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Subcategories (1 per line)
              </label>
              <textarea
                rows={3}
                value={categoryForm.subcategoriesText}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, subcategoriesText: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsCategoryModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="forest" size="sm" onClick={handleSaveCategory} className="font-bold">
            Save Category
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* HERO SLIDE EDIT MODAL */}
      {/* ========================================================= */}
      <Dialog open={isSlideModalOpen} onOpenChange={setIsSlideModalOpen} size="md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary-green" />
            <span>Edit Hero Slide Banner</span>
          </DialogTitle>
          <DialogDescription>
            Update slide title, promotion badge, CTA button, and banner image.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-3.5 text-xs text-left">
            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Promotion Badge
              </label>
              <input
                type="text"
                value={slideForm.badge}
                onChange={(e) => setSlideForm((prev) => ({ ...prev, badge: e.target.value }))}
                placeholder="e.g. 100% Organic & Chemical-Free"
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Headline Title
              </label>
              <input
                type="text"
                value={slideForm.title}
                onChange={(e) => setSlideForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Fast Fresh Groceries Delivered Daily"
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-black"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={2}
                value={slideForm.subtitle}
                onChange={(e) => setSlideForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                Banner Image URL
              </label>
              <input
                type="text"
                value={slideForm.image}
                onChange={(e) => setSlideForm((prev) => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-[11px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={slideForm.ctaText}
                  onChange={(e) => setSlideForm((prev) => ({ ...prev, ctaText: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-700 dark:text-neutral-200 block mb-1">
                  Target Link
                </label>
                <input
                  type="text"
                  value={slideForm.ctaLink}
                  onChange={(e) => setSlideForm((prev) => ({ ...prev, ctaLink: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-xl outline-hidden border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsSlideModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="forest"
            size="sm"
            onClick={async () => {
              const updated = heroSlides.map((s) => (s.id === slideForm.id ? { ...s, ...slideForm } : s));
              setHeroSlides(updated);
              setIsSlideModalOpen(false);
              try {
                const res = await fetch('/api/catalog', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'update-banner', heroSlides: updated }),
                });
                if (!res.ok) throw new Error('Failed to update banner');
                toast.success('Slide Saved', 'Hero banner updated on customer store.');
              } catch {
                toast.error('Error', 'Failed to save hero slide.');
              }
            }}
            className="font-bold"
          >
            Save Slide
          </Button>
        </DialogFooter>
      </Dialog>

      {/* ========================================================= */}
      {/* GLOBAL COMMAND PALETTE MODAL (CTRL+K) */}
      {/* ========================================================= */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a module name or action (e.g. Products, POS, Expiry, Suppliers)..."
                className="w-full text-sm bg-transparent outline-hidden text-neutral-900 dark:text-white placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 text-left">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Navigation Quick Links</p>
              {navigationSections.flatMap((s) => s.items).slice(0, 10).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveRouteId(item.id);
                      setIsCommandPaletteOpen(false);
                      toast.info('Quick Navigation', `Jumped to: ${item.label}`);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-neutral-400" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">Jump</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminSecurityGate>
        {({ adminUser, onLogout }) => (
          <AdminDashboardShell adminUser={adminUser} onLogout={onLogout} />
        )}
      </AdminSecurityGate>
    </ToastProvider>
  );
}
