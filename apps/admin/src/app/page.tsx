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
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  ChevronUp,
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

const demoTopProducts: TopProduct[] = [
  {
    id: 'tp-1',
    sku: 'ECO-GR-0021',
    name: 'Aromatic Chinigura Rice 2kg',
    category: 'Rice & Staples',
    soldUnits: 142,
    revenue: 41180,
    stock: 240,
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
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=160&auto=format&fit=crop&q=80',
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

  // Notifications State
  const [notifications, setNotifications] = React.useState(demoNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-xl bg-primary-green flex items-center justify-center font-black text-white text-xl shadow-md shrink-0">
              E
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-left leading-none truncate">
                <span className="font-black text-lg tracking-tight text-white">
                  ECO<span className="text-emerald-400">BAZAR</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase mt-0.5">
                  Retail OS & POS
                </span>
              </div>
            )}
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
              onClick={() => toast.info('POS Terminal Activated', 'Connecting to Dhanmondi Register #01...')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-md transition"
            >
              <MonitorCheck className="h-4 w-4" />
              <span>Launch POS Terminal</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => toast.info('POS Terminal Activated', 'Connecting to Register...')}
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
          {/* Left: Mobile hamburger & Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center text-xs font-semibold text-neutral-400">
              <span className="hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer">ECOBAZAR</span>
              <span className="mx-2">/</span>
              <span className="hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer capitalize">
                {activeRouteId}
              </span>
              <span className="mx-2">/</span>
              <span className="text-forest-900 dark:text-emerald-400 font-bold">
                {selectedBranch.code}
              </span>
            </nav>
          </div>

          {/* Center/Right: Global Search, Branch Scope, Notifs, Theme, User */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Global Search Button / Trigger */}
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className={`hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg border text-xs text-neutral-400 hover:border-emerald-500 transition ${
                isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search modules, SKUs, invoices...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-[10px] font-mono text-neutral-600 dark:text-neutral-300">
                Ctrl K
              </kbd>
            </button>

            {/* Functional Branch Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition shadow-xs ${
                  isDarkMode
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700'
                    : 'bg-emerald-50/70 border-emerald-200 text-forest-900 hover:bg-emerald-100'
                }`}
              >
                <Store className="h-3.5 w-3.5 text-primary-green shrink-0" />
                <span className="max-w-[140px] sm:max-w-[180px] truncate">{selectedBranch.name}</span>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {isBranchDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-3.5 py-2 border-b border-neutral-100 dark:border-neutral-800">
                    <p className="text-xs font-black uppercase text-neutral-400 tracking-wider">Select Store Branch Scope</p>
                    <p className="text-[11px] text-neutral-500">Filters financial, inventory and POS telemetry</p>
                  </div>
                  <div className="py-1">
                    {branchOptions.map((branch) => {
                      const isSelected = selectedBranch.id === branch.id;
                      return (
                        <button
                          key={branch.id}
                          type="button"
                          onClick={() => handleBranchSelect(branch)}
                          className={`w-full flex items-start gap-2.5 px-3.5 py-2.5 text-left text-xs transition ${
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-primary-green font-bold'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <Building2 className={`h-4 w-4 mt-0.5 shrink-0 ${isSelected ? 'text-primary-green' : 'text-neutral-400'}`} />
                          <div className="flex-1 truncate">
                            <p className="font-bold truncate">{branch.name}</p>
                            <p className="text-[10px] text-neutral-400">{branch.address} • {branch.posCount} POS</p>
                          </div>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary-green shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Center Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}
                className={`relative p-2 rounded-xl border text-neutral-600 dark:text-neutral-300 transition ${
                  isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-200 hover:bg-neutral-50'
                }`}
                aria-label="Open notifications center"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifPanelOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-neutral-900 dark:text-white">Live Notification Center</p>
                      <p className="text-[10px] text-neutral-500">{unreadCount} unread system operational alerts</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] font-bold text-primary-green hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 text-xs text-left transition ${
                          !item.isRead ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {item.type === 'error' ? (
                            <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          ) : item.type === 'warning' ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-neutral-900 dark:text-white text-xs">{item.title}</span>
                              <span className="text-[10px] text-neutral-400">{item.time}</span>
                            </div>
                            <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-0.5 leading-normal">
                              {item.description}
                            </p>
                            {item.branch && (
                              <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                                {item.branch}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-neutral-600 dark:text-neutral-300 transition ${
                isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:bg-neutral-700' : 'bg-white border-neutral-200 hover:bg-neutral-50'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
            </button>

            {/* User Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-800"
              >
                <div className="h-9 w-9 rounded-xl bg-forest-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  MK
                </div>
                <div className="hidden xl:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">Mohammad Karim</span>
                  <span className="text-[10px] text-primary-green font-semibold">Super Admin / Owner</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400 hidden xl:block" />
              </button>

              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800 text-left">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">Mohammad Karim</p>
                    <p className="text-[10px] text-neutral-400">admin@ecobazar.com.bd</p>
                    <Badge variant="forest" size="sm" className="mt-1 text-[9px]">Organization Owner</Badge>
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
        {/* DASHBOARD BODY CONTENT */}
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

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                Executive Overview
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                Live multi-branch operating system metrics • Currently scoped to: <strong className="text-forest-900 dark:text-emerald-400">{selectedBranch.name}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                onClick={() => toast.success('Telemetry Refreshed', 'Consolidated branch data synced.')}
              >
                Refresh
              </Button>
              <Button
                variant="forest"
                size="sm"
                leftIcon={<Download className="h-3.5 w-3.5" />}
                onClick={() => toast.info('Export Started', 'Generating daily executive report PDF...')}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 5 KEY KPI STAT CARDS */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Today's Revenue */}
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Today's Revenue</span>
                <span className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-primary-green flex items-center justify-center font-bold">
                  ৳
                </span>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                  <PriceDisplay amount={metrics.revenue} size="xl" className="font-black text-forest-900 dark:text-emerald-400" />
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-bold">
                  <TrendingUp className="h-3 w-3" />
                  <span>{metrics.revenueChange}</span>
                </div>
              </div>
            </Card>

            {/* 2. Total Orders */}
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Total Orders</span>
                <ShoppingCart className="h-4 w-4 text-blue-500" />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                  {metrics.orders.toLocaleString()}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {metrics.ordersPos} In-Store POS • {metrics.ordersOnline} Online
                </p>
              </div>
            </Card>

            {/* 3. Total Products */}
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Active SKUs</span>
                <Package className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                  {metrics.activeProducts.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-600 font-bold mt-1">
                  100% In-Stock Catalog
                </p>
              </div>
            </Card>

            {/* 4. Low Stock Alerts */}
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition border-amber-200 dark:border-amber-900/50 bg-amber-50/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Low Stock Alerts</span>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-amber-950 dark:text-amber-200 tracking-tight">
                  {metrics.lowStockCount} SKUs
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 font-medium">
                  Requires warehouse dispatch
                </p>
              </div>
            </Card>

            {/* 5. Expiry Alerts */}
            <Card className="p-4 flex flex-col justify-between hover:shadow-md transition border-rose-200 dark:border-rose-900/50 bg-rose-50/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-700 dark:text-rose-400">FEFO Expiry (7d)</span>
                <CalendarClock className="h-4 w-4 text-rose-500" />
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-rose-950 dark:text-rose-200 tracking-tight">
                  {metrics.expiryAlertsCount} Batches
                </div>
                <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-1 font-medium">
                  Markdown action suggested
                </p>
              </div>
            </Card>
          </div>

          {/* ========================================================= */}
          {/* SALES PERFORMANCE CHART & BRANCH TEAMS */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: Sales Chart */}
            <Card className="lg:col-span-8 p-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    7-Day Consolidated Revenue Performance
                  </h3>
                  <p className="text-xs text-neutral-400">Omnichannel sales split: Physical Store POS vs Online Delivery</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="h-3 w-3 rounded-full bg-forest-900 dark:bg-emerald-500" />
                    <span>POS Store</span>
                    <span className="h-3 w-3 rounded-full bg-amber-400 ml-2" />
                    <span>Online Web/App</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Bar Chart */}
              <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2 border-b border-neutral-100 dark:border-neutral-800">
                {salesChartData.map((d, i) => {
                  const maxTotal = 250000;
                  const posHeight = Math.round((d.pos / maxTotal) * 200);
                  const onlineHeight = Math.round((d.online / maxTotal) * 200);

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="text-[10px] font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ৳{Math.round(d.total / 1000)}k
                      </div>
                      <div className="w-full max-w-[36px] flex flex-col-reverse items-center rounded-t-lg overflow-hidden">
                        <div
                          style={{ height: `${posHeight}px` }}
                          className="w-full bg-forest-900 dark:bg-emerald-600 transition-all duration-300 group-hover:brightness-110"
                        />
                        <div
                          style={{ height: `${onlineHeight}px` }}
                          className="w-full bg-amber-400 dark:bg-amber-500 transition-all duration-300"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 truncate max-w-[48px]">
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Right 4 Cols: Branch Performance Comparison */}
            <Card className="lg:col-span-4 p-5 text-left flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Branch Performance
                </h3>
                <p className="text-xs text-neutral-400 mb-4">Direct multi-store metric tally</p>

                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white">Dhanmondi #01 (Flagship)</span>
                      <Badge variant="forest" size="sm">45% Share</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>Today's Sales: <strong>৳ 83,025</strong></span>
                      <span>154 Orders</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white">Gulshan-2 #02</span>
                      <Badge variant="mint" size="sm">35% Share</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>Today's Sales: <strong>৳ 64,575</strong></span>
                      <span>119 Orders</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white">Uttara Sector 11 #03</span>
                      <Badge variant="outline" size="sm">20% Share</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>Today's Sales: <strong>৳ 36,900</strong></span>
                      <span>69 Orders</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-400">Total 3 Operating Stores</span>
                <Button variant="outline" size="sm" onClick={() => setActiveRouteId('branches')}>
                  Manage Branches →
                </Button>
              </div>
            </Card>
          </div>

          {/* ========================================================= */}
          {/* LIVE RECENT TRANSACTIONS TABLE */}
          {/* ========================================================= */}
          <Card className="text-left">
            <CardHeader className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold text-neutral-900 dark:text-white">
                  Live Omnichannel Transactions
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500">
                  Real-time feed of in-store POS receipts & online orders
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setActiveRouteId('orders')}>
                  View All Orders
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/80 text-neutral-500 uppercase font-bold border-y border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Channel</th>
                      <th className="py-3 px-4">Branch</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4 text-center">Items</th>
                      <th className="py-3 px-4 text-right">Total Amount</th>
                      <th className="py-3 px-4 text-center">Payment</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {demoOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                          {ord.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            ord.channel === 'POS_STORE'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          }`}>
                            {ord.channel}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-300">{ord.branch}</td>
                        <td className="py-3.5 px-4 font-medium text-neutral-900 dark:text-white truncate max-w-[160px]">
                          {ord.customer}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono">{ord.itemsCount}</td>
                        <td className="py-3.5 px-4 text-right font-black text-forest-900 dark:text-emerald-400">
                          ৳ {ord.total.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Badge
                            variant={
                              ord.status === 'COMPLETED' ? 'success' : ord.status === 'PROCESSING' ? 'warning' : 'info'
                            }
                            size="sm"
                          >
                            {ord.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right text-neutral-400 text-[11px] whitespace-nowrap">
                          {ord.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ========================================================= */}
          {/* TOP SELLING PRODUCTS & AI INSIGHTS PREVIEW */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Selling Products (7 cols) */}
            <Card className="lg:col-span-7 p-5 text-left">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
                Top Selling SKUs Today
              </h3>
              <p className="text-xs text-neutral-400 mb-4">Fastest moving inventory items across store registers</p>

              <div className="space-y-3">
                {demoTopProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700 shrink-0">
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">{p.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">SKU: {p.sku} • {p.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-forest-900 dark:text-emerald-400">৳ {p.revenue.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400 font-semibold">{p.soldUnits} units sold</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights & Pending Tasks (5 cols) */}
            <div className="lg:col-span-5 space-y-5 text-left">
              {/* AI Insights Box */}
              <div className="rounded-3xl p-5 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 text-white shadow-lg border border-emerald-800/50 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                    ECOBAZAR AI Intelligence
                  </span>
                </div>
                <h4 className="text-base font-black leading-snug">
                  Automated Restock & Margin Insights
                </h4>
                <div className="space-y-2 text-xs text-emerald-100/90">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                    <p className="font-bold text-amber-300">💡 Demand Spike Forecast</p>
                    <p className="text-[11px] mt-0.5">
                      Aromatic Chinigura Rice expected to surge +35% this weekend. Suggested PO: 200 bags to avoid stockout.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                    <p className="font-bold text-emerald-300">⚡ FEFO Markdown Opportunity</p>
                    <p className="text-[11px] mt-0.5">
                      8 batches of farm milk expire in 72 hours. Applying a 15% flash sale will recover ৳ 9,400 in revenue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Operational Checklist */}
              <Card className="p-5 text-left">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">
                  Pending Operational Tasks
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      <span>Cashier Drawer Reconciliation (Reg #03)</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]">Verify</Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Truck className="h-3.5 w-3.5 text-blue-500" />
                      <span>Inspect Bogura Agro Produce Delivery</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-[10px]">Receive</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

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
