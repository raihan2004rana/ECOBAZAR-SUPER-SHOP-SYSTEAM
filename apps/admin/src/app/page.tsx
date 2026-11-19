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
} from 'lucide-react';
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
function AdminDashboardShell() {
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

  // Product Catalog Modal
  const [isAddProductModalOpen, setIsAddProductModalOpen] = React.useState(false);
  const [newProductName, setNewProductName] = React.useState('');
  const [newProductCategory, setNewProductCategory] = React.useState('Fresh Vegetables');
  const [newProductPrice, setNewProductPrice] = React.useState('120');
  const [newProductStock, setNewProductStock] = React.useState('50');

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

            {/* Profile Menu Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <div className="h-8 w-8 rounded-full bg-[#123C2D] text-[#2EBD70] border border-[#2EBD70]/30 flex items-center justify-center font-bold text-xs shadow-xs">
                  RR
                </div>
                <div className="hidden md:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">Raihan Hasan Rana</span>
                  <span className="text-[10px] text-[#21A366] font-semibold mt-0.5">Founder & Super Admin</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800 text-left">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Raihan Hasan Rana</p>
                    <p className="text-[10px] text-neutral-400">raihan@ecobazar.com.bd</p>
                    <Badge variant="forest" size="sm" className="mt-1 text-[9px]">Founder & CEO</Badge>
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
                        toast.info('Session Terminated', 'Logged out of admin dashboard.');
                      }}
                      className="w-full px-4 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 text-rose-600 font-bold"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
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
          {/* VIEW: PRODUCTS CATALOG */}
          {/* ========================================== */}
          {activeRouteId === 'products' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                    Product Master Catalog
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                    1,420 registered SKUs across 8 departments • Managed under ECOBAZAR Master Taxonomy
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="forest" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={() => setIsAddProductModalOpen(true)}>
                    Add New Product
                  </Button>
                </div>
              </div>

              <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-neutral-50 dark:bg-neutral-800/80 text-neutral-500 uppercase font-bold border-b border-neutral-200 dark:border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">Item</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4 text-right">Retail Price</th>
                        <th className="py-3 px-4 text-center">Stock Level</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {demoCatalogProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                            <span className="font-bold text-neutral-900 dark:text-white">{p.name}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-neutral-500">{p.sku}</td>
                          <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-300">{p.category}</td>
                          <td className="py-3.5 px-4 text-right font-black text-forest-900 dark:text-emerald-400">৳{p.price}</td>
                          <td className="py-3.5 px-4 text-center font-mono font-bold">{p.stock} units</td>
                          <td className="py-3.5 px-4 text-center">
                            <Badge variant="success" size="sm">Active</Badge>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast.info('Edit Product', `Editing SKU: ${p.sku}`)}>
                              Edit
                            </Button>
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
                      onClick={() => setIsAddProductModalOpen(true)}
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
          {/* VIEW: GENERIC ENTERPRISE MODULE FALLBACK */}
          {/* ========================================== */}
          {activeRouteId !== 'pos' && activeRouteId !== 'products' && activeRouteId !== 'expiry' && activeRouteId !== 'dashboard' && activeRouteId !== 'analytics' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight capitalize">
                    {activeRouteId.replace('-', ' ')} Module
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                    Enterprise multi-tenant controls for ECOBAZAR Bangladesh operations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveRouteId('dashboard')}>
                    ← Back to Dashboard
                  </Button>
                </div>
              </div>

              <Card className="p-8 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950 text-primary-green flex items-center justify-center shadow-xs">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-white capitalize">
                    {activeRouteId.replace('-', ' ')} Active Management Console
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
                    Connected to Prisma ORM backend on PostgreSQL. Live multi-branch scopes are active for {selectedBranch.name}.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button variant="forest" size="sm" onClick={() => toast.success('Action Registered', `Operation executed in ${activeRouteId} module.`)}>
                    Execute Module Sync
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActiveRouteId('pos')}>
                    Switch to POS Register
                  </Button>
                </div>
              </Card>
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
      {/* ADD PRODUCT MODAL */}
      {/* ========================================================= */}
      <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen} size="md">
        <DialogHeader>
          <DialogTitle>Add New Product to Catalog</DialogTitle>
          <DialogDescription>Create a master SKU with tax category and initial warehouse stock.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-3 text-left">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Product Name</label>
              <input
                type="text"
                placeholder="e.g. Fresh Red Onions 1kg"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-xl outline-hidden"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Category</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl outline-hidden bg-white"
                >
                  <option>Fresh Vegetables</option>
                  <option>Dairy & Eggs</option>
                  <option>Rice & Staples</option>
                  <option>Spices & Oils</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Retail Price (৳)</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-xl outline-hidden font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1">Initial Opening Stock (Units)</label>
              <input
                type="number"
                value={newProductStock}
                onChange={(e) => setNewProductStock(e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-xl outline-hidden font-mono"
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setIsAddProductModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="forest"
            size="sm"
            onClick={() => {
              if (!newProductName.trim()) {
                toast.error('Required', 'Please enter a product name.');
                return;
              }
              demoCatalogProducts.push({
                id: `tp-${Date.now()}`,
                sku: `ECO-NEW-${Math.floor(1000 + Math.random() * 9000)}`,
                name: newProductName,
                category: newProductCategory,
                soldUnits: 0,
                revenue: 0,
                stock: Number(newProductStock) || 50,
                price: Number(newProductPrice) || 100,
                image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80',
              });
              setIsAddProductModalOpen(false);
              setNewProductName('');
              toast.success('Product Created', `${newProductName} added to catalog.`);
            }}
          >
            Save Product
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
      <AdminDashboardShell />
    </ToastProvider>
  );
}
