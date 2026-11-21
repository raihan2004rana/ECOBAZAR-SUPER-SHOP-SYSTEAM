'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ShoppingBag,
  CreditCard,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  Tag,
  ShieldCheck,
  Award,
  Crown,
  Gift,
  Plus,
  Trash2,
  Edit,
  Printer,
  X,
  Phone,
  Mail,
  Building2,
  Search,
  RotateCcw,
  Percent,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { useUser, CustomerOrder, SavedAddress, CouponOffer } from '../../context/user-context';
import { useCart } from '../../context/cart-context';
import { useLanguage } from '../../context/language-context';
import { storeBranches } from '../../data/catalog';

type ProfileTab = 'overview' | 'orders' | 'membership' | 'offers' | 'addresses' | 'settings';

export default function CustomerProfilePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const {
    user,
    isLoggedIn,
    orders,
    membership,
    lifetimeSpend,
    totalSaved,
    availableCoupons,
    updateProfile,
    addAddress,
    removeAddress,
    setDefaultAddress,
    redeemPoints,
    logout,
    selectedOrderForInvoice,
    setSelectedOrderForInvoice,
  } = useUser();

  const { applyCoupon, reorderProducts, setIsCartDrawerOpen } = useCart();

  const [activeTab, setActiveTab] = React.useState<ProfileTab>('overview');
  const [orderFilter, setOrderFilter] = React.useState<'ALL' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'DELIVERED'>('ALL');
  const [orderSearch, setOrderSearch] = React.useState('');
  const [copiedCoupon, setCopiedCoupon] = React.useState<string | null>(null);
  const [copiedOrderId, setCopiedOrderId] = React.useState<string | null>(null);

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState<'Home' | 'Office' | 'Other'>('Home');
  const [newName, setNewName] = React.useState(user.name);
  const [newPhone, setNewPhone] = React.useState(user.phone);
  const [newAddressText, setNewAddressText] = React.useState('');
  const [newArea, setNewArea] = React.useState('Dhanmondi, Dhaka');
  const [newIsDefault, setNewIsDefault] = React.useState(false);

  // Profile Edit Settings State
  const [settingsName, setSettingsName] = React.useState(user.name);
  const [settingsPhone, setSettingsPhone] = React.useState(user.phone);
  const [settingsEmail, setSettingsEmail] = React.useState(user.email);
  const [settingsBranch, setSettingsBranch] = React.useState(user.preferredBranch);

  // Tracking modal in profile
  const [trackingModalOrder, setTrackingModalOrder] = React.useState<CustomerOrder | null>(null);

  React.useEffect(() => {
    setSettingsName(user.name);
    setSettingsPhone(user.phone);
    setSettingsEmail(user.email);
    setSettingsBranch(user.preferredBranch);
  }, [user]);

  // Filtered orders
  const filteredOrders = React.useMemo(() => {
    return orders.filter((order) => {
      const matchesFilter = orderFilter === 'ALL' || order.status === orderFilter;
      const matchesSearch =
        !orderSearch.trim() ||
        order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.items.some((it) => it.name.toLowerCase().includes(orderSearch.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [orders, orderFilter, orderSearch]);

  // Active / Most recent order for tracker
  const activeOrder = React.useMemo(() => {
    return orders.find((o) => o.status === 'OUT_FOR_DELIVERY' || o.status === 'PROCESSING') || orders[0];
  }, [orders]);

  // Copy coupon handler
  const handleCopyCoupon = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      setTimeout(() => setCopiedCoupon(null), 2500);
    }
  };

  // Copy Order ID
  const handleCopyOrderId = (id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedOrderId(id);
      setTimeout(() => setCopiedOrderId(null), 2500);
    }
  };

  // Apply voucher directly to cart
  const handleApplyCouponToCart = (code: string) => {
    const success = applyCoupon(code);
    if (success) {
      setIsCartDrawerOpen(true);
    }
  };

  // Save new address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressText.trim()) return;
    addAddress({
      label: newLabel,
      recipientName: newName.trim() || user.name,
      phone: newPhone.trim() || user.phone,
      address: newAddressText.trim(),
      area: newArea.trim(),
      isDefault: newIsDefault,
    });
    setIsAddressModalOpen(false);
    setNewAddressText('');
  };

  // Save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: settingsName.trim(),
      phone: settingsPhone.trim(),
      email: settingsEmail.trim(),
      preferredBranch: settingsBranch,
    });
  };

  const statusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('Delivered', 'ডেলিভার্ড')}</span>
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-300 animate-pulse">
            <Truck className="w-3.5 h-3.5" />
            <span>{t('Out for Delivery', 'ডেলিভারির পথে')}</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('Processing', 'প্রসেসিং হচ্ছে')}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-neutral-100 text-neutral-800 border border-neutral-300">
            <Clock className="w-3.5 h-3.5" />
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* ========================================================= */}
        {/* 1. TOP HERO: PROFILE HEADER BANNER                        */}
        {/* ========================================================= */}
        <section className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#21A366]/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Identity Info */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#123C2D] to-[#21A366] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md border-2 border-white">
                  {user.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()
                    : 'RA'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-black text-[#17251F] tracking-tight">{user.name}</h1>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${membership.bgColor} ${membership.color} border ${membership.borderColor} shadow-2xs`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>{membership.title}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#64736B] font-medium">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#21A366]" />
                    <span>{user.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#21A366]" />
                    <span>{user.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#21A366]" />
                    <span>{user.preferredBranch}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E5ECE7] hover:border-[#21A366] text-[#17251F] hover:text-[#21A366] text-xs font-bold transition-colors bg-[#FAFBF9] cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                <span>{t('Edit Profile', 'প্রোফাইল পরিবর্তন')}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('My Orders', 'আমার অর্ডারসমূহ')}</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4 HIGH-IMPACT METRIC CARDS: "A obdi koto ki kinche"       */}
          {/* ========================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#E5ECE7]">
            {/* Stat 1: Total Orders */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E8ECE7] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wide flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#21A366]" />
                <span>{t('Total Orders', 'মোট অর্ডার')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#17251F]">{orders.length}</span>
                <span className="text-xs text-[#64736B] font-bold">{t('Orders', 'টি')}</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1">100% Successful delivery</p>
            </div>

            {/* Stat 2: Lifetime Spend ("a obdi koto ki kinche") */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E8ECE7] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wide flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#21A366]" />
                <span>{t('Lifetime Purchases', 'সর্বমোট কেনাকাটা')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#17251F]">৳{lifetimeSpend.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-[#64736B] font-medium mt-1">
                {t('Total grocery spent till date', 'এ যাবৎ মোট কেনাকাটার পরিমাণ')}
              </p>
            </div>

            {/* Stat 3: Total Saved */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E8ECE7] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wide flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>{t('Total Money Saved', 'মোট সাশ্রয়')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">৳{totalSaved.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                {t('Via promo offers & club perks', 'অফার ও ভাউচারের মাধ্যমে সেভড')}
              </p>
            </div>

            {/* Stat 4: ECO Loyalty Points */}
            <div className="bg-[#FAFBF9] rounded-2xl border border-[#E8ECE7] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-[#64736B] uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{t('ECO Loyalty Points', 'লয়্যালটি পয়েন্ট')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-600">{user.points}</span>
                <span className="text-xs text-[#64736B] font-bold">{t('Pts', 'পয়েন্ট')}</span>
              </div>
              <p className="text-[10px] text-amber-700 font-semibold mt-1">
                = ৳{user.points} {t('Instant Store Credit', 'শপিং ক্রেডিট')}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. NAVIGATION TABS BAR                                    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-[#E5ECE7] p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('Overview', 'একনজরে')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('My Orders', 'আমার অর্ডার')}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/15 font-black">{orders.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('membership')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'membership'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>{t('Membership & Perks', 'মেম্বারশিপ ও সুযোগ-সুবিধা')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('offers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>{t('Offers & Vouchers', 'অফার ও ভাউচার')}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-black">
              {availableCoupons.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t('Delivery Addresses', 'ডেলিভারি ঠিকানা')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#21A366] text-white shadow-xs'
                : 'text-[#64736B] hover:text-[#17251F] hover:bg-[#F7F9F5]'
            }`}
          >
            <Edit className="w-4 h-4" />
            <span>{t('Settings', 'সেটিংস')}</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW                                 */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Active Live Order Delivery Tracker */}
            {activeOrder && (
              <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E5ECE7]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-[#17251F]">
                          {activeOrder.status === 'OUT_FOR_DELIVERY'
                            ? t('Order is on the Way!', 'অর্ডার আপনার ঠিকানার পথে!')
                            : t('Order is being Packed', 'অর্ডার প্যাকিং করা হচ্ছে')}
                        </h3>
                        {statusBadge(activeOrder.status)}
                      </div>
                      <p className="text-xs text-[#64736B] mt-0.5">
                        Order #{activeOrder.id} • Placed {activeOrder.formattedTime || 'recently'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setTrackingModalOrder(activeOrder)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t('Live Tracking', 'লাইভ ট্র্যাক')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedOrderForInvoice(activeOrder)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5ECE7] text-[#17251F] hover:bg-[#F7F9F5] text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{t('Receipt', 'রিসিট')}</span>
                    </button>
                  </div>
                </div>

                {/* Stepper Progress Bar */}
                <div className="py-6 max-w-3xl mx-auto">
                  <div className="grid grid-cols-4 gap-2 relative">
                    <div className="absolute top-4 left-6 right-6 h-1 bg-[#E5ECE7] -z-0" />
                    <div
                      className="absolute top-4 left-6 h-1 bg-[#21A366] -z-0 transition-all duration-500"
                      style={{
                        width:
                          activeOrder.status === 'DELIVERED'
                            ? '100%'
                            : activeOrder.status === 'OUT_FOR_DELIVERY'
                            ? '75%'
                            : '40%',
                      }}
                    />

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#21A366] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-bold text-[#17251F] mt-2">Order Confirmed</span>
                      <span className="text-[9px] text-[#64736B]">Payment Done</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#21A366] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-[11px] font-bold text-[#17251F] mt-2">Quality Packed</span>
                      <span className="text-[9px] text-[#64736B]">Cold-chain Sealed</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                          activeOrder.status === 'OUT_FOR_DELIVERY' || activeOrder.status === 'DELIVERED'
                            ? 'bg-[#21A366] text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-[#17251F] mt-2">Out for Delivery</span>
                      <span className="text-[9px] text-blue-600 font-bold">Rider on bike</span>
                    </div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                          activeOrder.status === 'DELIVERED'
                            ? 'bg-[#21A366] text-white'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-[#17251F] mt-2">Delivered</span>
                      <span className="text-[9px] text-[#64736B]">Doorstep handoff</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAFBF9] rounded-2xl border border-[#E8ECE7] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17251F]">Delivery Address:</span>
                    <span className="text-[#64736B]">{activeOrder.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#17251F] font-bold">
                    <span>
                      Items: <strong className="text-emerald-700">{activeOrder.items.length} items</strong>
                    </span>
                    <span>
                      Total: <strong className="text-emerald-700">৳{activeOrder.grandTotal}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Membership Tier Progress Card */}
            <div className="bg-gradient-to-br from-white to-[#F2FBF6] rounded-3xl border border-[#C4EED6] p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-black text-[#17251F]">
                      {membership.title} ({t('Green Club VIP', 'গ্রিন ক্লাব ভিআইপি')})
                    </h3>
                  </div>
                  <p className="text-xs text-[#64736B] max-w-xl">
                    {membership.nextTier ? (
                      <>
                        {t('Spend', 'আর মাত্র')} <strong>৳{membership.spendNeededForNextTier.toLocaleString()}</strong>{' '}
                        {t(
                          `more to unlock ${membership.nextTier} Elite status with 8% lifetime cashback & zero delivery fees!`,
                          `টাকা কেনাকাটা করলেই আনলক হবে ${membership.nextTier} এলিট স্ট্যাটাস!`
                        )}
                      </>
                    ) : (
                      t('You have reached the highest Platinum VIP tier!', 'আপনি সর্বোচ্চ প্লাটিনাম ভিআইপি মেম্বার!')
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('membership')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  <span>{t('View VIP Privileges', 'মেম্বারশিপ সুবিধা দেখুন')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#17251F]">Current Tier: {membership.title}</span>
                  <span className="text-emerald-700">{membership.progressPercent}% to Next Level</span>
                </div>
                <div className="w-full bg-[#E5ECE7] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#21A366] to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${membership.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Re-Order Favorites */}
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5ECE7]">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#17251F]">
                    {t('Frequently Purchased Groceries', 'পুনরায় অর্ডার করুন (সবচেয়ে বেশি কেনা)')}
                  </h3>
                  <p className="text-xs text-[#64736B] mt-0.5">
                    {t('1-Click add to cart from your regular grocery favorites', '১-ক্লিকে কার্টে যোগ করুন')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-[#21A366] hover:underline"
                >
                  {t('View All Orders →', 'সকল অর্ডার দেখুন →')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {orders[0]?.items?.slice(0, 4).map((item) => (
                  <div
                    key={item.productId}
                    className="p-3.5 rounded-2xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#FAFBF9] hover:bg-white transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#E5ECE7] shrink-0 p-1">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-[#17251F] line-clamp-1">{item.name}</h4>
                        <p className="text-[11px] text-[#64736B]">{item.unit}</p>
                        <p className="text-xs font-black text-emerald-700 mt-1">৳{item.price}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        reorderProducts([
                          {
                            productId: item.productId,
                            name: item.name,
                            price: item.price,
                            quantity: 1,
                            unit: item.unit,
                            image: item.image,
                          },
                        ])
                      }
                      className="mt-3 w-full bg-white hover:bg-[#21A366] text-[#21A366] hover:text-white border border-[#21A366] py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t('Add to Cart', 'কার্টে যোগ')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MY ORDERS LIST                                     */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Status Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {(['ALL', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setOrderFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      orderFilter === st
                        ? 'bg-[#123C2D] text-white shadow-xs'
                        : 'bg-[#F7F9F5] text-[#64736B] hover:text-[#17251F] border border-[#E5ECE7]'
                    }`}
                  >
                    {st === 'ALL'
                      ? t('All Orders', 'সকল অর্ডার')
                      : st === 'PROCESSING'
                      ? t('Processing', 'প্রসেসিং')
                      : st === 'OUT_FOR_DELIVERY'
                      ? t('On The Way', 'ডেলিভারির পথে')
                      : t('Delivered', 'ডেলিভার্ড')}
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={t('Search by Order ID or item...', 'অর্ডার আইডি বা পণ্য খুঁজুন...')}
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366] font-medium"
                />
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E5ECE7] p-12 text-center shadow-xs">
                <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#17251F]">No orders found</h3>
                <p className="text-xs text-[#64736B] mt-1">Try changing your search term or filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-[#E5ECE7] p-5 sm:p-6 shadow-xs hover:border-[#21A366]/40 transition-all space-y-4"
                  >
                    {/* Order Card Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5ECE7]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#64736B] font-bold">Order ID:</span>
                          <span className="text-sm font-black text-[#17251F] font-mono">{order.id}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyOrderId(order.id)}
                            className="p-1 text-neutral-400 hover:text-[#21A366] transition-colors"
                            title="Copy Order ID"
                          >
                            {copiedOrderId === order.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-[#64736B] mt-0.5">
                          Placed: {order.formattedDate} • Fulfilled by {order.branch}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {statusBadge(order.status)}
                        <span className="text-base font-black text-[#17251F]">৳{order.grandTotal}</span>
                      </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-[#FAFBF9] rounded-xl border border-[#E8ECE7]">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 p-1 border border-[#E5ECE7]">
                            <img src={it.image} alt={it.name} className="w-full h-full object-cover rounded-md" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#17251F] truncate">{it.name}</p>
                            <p className="text-[10px] text-[#64736B]">
                              ৳{it.price} × {it.quantity} {it.unit}
                            </p>
                            <p className="text-[11px] font-black text-emerald-700">৳{it.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Card Footer */}
                    <div className="pt-3 border-t border-[#E5ECE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#64736B]">
                        <span>
                          Payment: <strong className="text-[#17251F]">{order.paymentMethod}</strong>
                        </span>
                        {order.discountAmount > 0 && (
                          <span className="text-emerald-700 font-bold">Discount Saved: ৳{order.discountAmount}</span>
                        )}
                        <span>
                          Delivery Fee:{' '}
                          <strong className="text-[#17251F]">{order.deliveryFee === 0 ? 'FREE' : `৳${order.deliveryFee}`}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedOrderForInvoice(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5ECE7] hover:border-[#21A366] text-[#17251F] hover:text-[#21A366] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>{t('Invoice', 'ইনভয়েস')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTrackingModalOrder(order)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>{t('Track', 'ট্র্যাক')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            reorderProducts(
                              order.items.map((it) => ({
                                productId: it.productId,
                                name: it.name,
                                price: it.price,
                                quantity: it.quantity,
                                unit: it.unit,
                                image: it.image,
                              }))
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{t('Re-Order All', 'পুনরায় কিনুন')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: MEMBERSHIP & VIP PRIVILEGES                        */}
        {/* ========================================================= */}
        {activeTab === 'membership' && (
          <div className="space-y-6">
            {/* VIP Tier Overview Box */}
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                    {t('ECOBAZAR Green Club Loyalty', 'ইকোবাজার গ্রিন ক্লাব লয়্যালটি')}
                  </span>
                  <h2 className="text-2xl font-black text-[#17251F]">{membership.title}</h2>
                  <p className="text-xs text-[#64736B]">
                    {t(
                      'Enjoy guaranteed organic purity, VIP express packing, and instant reward point credits.',
                      'প্রতিটি কেনাকাটায় পয়েন্ট, শর্তহীন ফ্রি ডেলিভারি ও বিশেষ উপহার সুবিধা।'
                    )}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F9F5] border border-[#E5ECE7] text-center min-w-[160px]">
                  <p className="text-[11px] font-bold text-[#64736B] uppercase">Reward Points Balance</p>
                  <p className="text-3xl font-black text-amber-600 mt-1">{user.points}</p>
                  <p className="text-[10px] text-emerald-700 font-bold">= ৳{user.points} shopping balance</p>
                </div>
              </div>

              {/* Progress & Next Tier */}
              <div className="p-5 rounded-2xl bg-[#FAFBF9] border border-[#E8ECE7] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#17251F]">Current Tier: {membership.title}</span>
                  <span className="text-emerald-700">
                    {membership.nextTier
                      ? `${membership.progressPercent}% towards ${membership.nextTier}`
                      : 'Max Tier Unlocked'}
                  </span>
                </div>
                <div className="w-full bg-[#E5ECE7] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#21A366] via-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${membership.progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#64736B]">
                  <span>৳{lifetimeSpend.toLocaleString()} Spent</span>
                  <span>Target: ৳{(membership.nextTierSpend || 30000).toLocaleString()}</span>
                </div>
              </div>

              {/* Tiers Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                {/* Bronze */}
                <div className="p-5 rounded-2xl border border-[#E5ECE7] bg-[#FAFBF9] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-[#17251F]">Bronze</h4>
                    <span className="text-[10px] font-bold text-[#64736B]">0 - ৳5,000</span>
                  </div>
                  <ul className="text-xs space-y-2 text-[#64736B]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1.5% Cashback Points</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Free Delivery over ৳999</span>
                    </li>
                  </ul>
                </div>

                {/* Silver */}
                <div className="p-5 rounded-2xl border border-[#E5ECE7] bg-[#FAFBF9] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-[#17251F]">Silver</h4>
                    <span className="text-[10px] font-bold text-[#64736B]">৳5,000+</span>
                  </div>
                  <ul className="text-xs space-y-2 text-[#64736B]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>3% Cashback Points</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Free Delivery over ৳799</span>
                    </li>
                  </ul>
                </div>

                {/* Gold VIP */}
                <div className="p-5 rounded-2xl border-2 border-amber-400 bg-amber-50/40 space-y-3 shadow-xs relative">
                  <span className="absolute -top-2.5 right-4 bg-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    Your Status
                  </span>
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-amber-900">Gold VIP</h4>
                    <span className="text-[10px] font-bold text-amber-700">৳15,000+</span>
                  </div>
                  <ul className="text-xs space-y-2 text-neutral-800">
                    <li className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>5% Instant Cashback Points</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Free Express Delivery over ৳499</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Birthday Gift Hamper</span>
                    </li>
                  </ul>
                </div>

                {/* Platinum */}
                <div className="p-5 rounded-2xl border border-[#E5ECE7] bg-[#FAFBF9] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-purple-900">Platinum Elite</h4>
                    <span className="text-[10px] font-bold text-purple-700">৳30,000+</span>
                  </div>
                  <ul className="text-xs space-y-2 text-[#64736B]">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>8% Lifetime Cashback</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Unlimited Free Express Delivery</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Dedicated VIP Support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Points Converter Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#123C2D] to-[#21A366] text-white flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h4 className="text-lg font-black">{t('Convert Loyalty Points into Voucher', 'পয়েন্ট রিডিম করে ভাউচার পান')}</h4>
                  <p className="text-xs text-emerald-100 mt-1">
                    {t(
                      'Redeem your accumulated points directly for an instant discount coupon on checkout.',
                      'আপনার অর্জিত পয়েন্ট ক্যাশ কুপনে কনভার্ট করে চেকআউটে তাৎক্ষণিক ছাড় নিন।'
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => redeemPoints(200)}
                    disabled={user.points < 200}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      user.points >= 200
                        ? 'bg-amber-400 hover:bg-amber-500 text-neutral-900 cursor-pointer'
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    Redeem 200 Pts (৳200)
                  </button>
                  <button
                    type="button"
                    onClick={() => redeemPoints(500)}
                    disabled={user.points < 500}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      user.points >= 500
                        ? 'bg-white hover:bg-neutral-100 text-[#123C2D] cursor-pointer'
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    Redeem 500 Pts (৳500)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: OFFERS & VOUCHERS ("new ki offer choltese")        */}
        {/* ========================================================= */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5ECE7]">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#17251F]">
                    {t('Active Coupons & Exclusive Vouchers', 'আপনার জন্য স্পেশাল অফার ও কুপন কোড')}
                  </h3>
                  <p className="text-xs text-[#64736B] mt-0.5">
                    {t('Click "Apply to Cart" or copy the coupon code to redeem at checkout.', 'ক্লিক করে সরাসরি কার্টে যুক্ত করুন')}
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold self-start">
                  {availableCoupons.length} Active Vouchers Ready
                </span>
              </div>

              {/* Coupons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="p-5 rounded-2xl border border-[#E5ECE7] hover:border-[#21A366] bg-[#FAFBF9] hover:bg-white transition-all flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {coupon.badge || 'PROMO'}
                        </span>
                        <span className="text-[11px] font-bold text-[#64736B]">Expires in {coupon.expiresInDays}d</span>
                      </div>
                      <h4 className="text-sm font-black text-[#17251F]">{coupon.title}</h4>
                      <p className="text-xs text-[#64736B] leading-relaxed">{coupon.description}</p>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-[#E5ECE7]">
                      {/* Code Badge */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-dashed border-[#21A366]">
                        <span className="font-mono text-xs font-black text-[#21A366] tracking-wider">{coupon.code}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCoupon(coupon.code)}
                          className="text-[11px] font-bold text-neutral-600 hover:text-[#21A366] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCoupon === coupon.code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleApplyCouponToCart(coupon.code)}
                        className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Tag className="w-3.5 h-3.5" />
                        <span>{t('Apply Directly to Cart', 'সরাসরি কার্টে অ্যাপ্লাই করুন')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Store Flash Deals ("new ki offer choltese") */}
            <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5ECE7]">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#17251F]">
                    {t('Live Store Flash Campaigns', 'চলমান সুপারমার্কেট অফার ও উৎসব')}
                  </h3>
                  <p className="text-xs text-[#64736B] mt-0.5">
                    {t('Ongoing promotions running across all branches today', 'সকল ব্রাঞ্চে আজকের বিশেষ লাইভ ডিল')}
                  </p>
                </div>
                <Link
                  href="/deals"
                  className="text-xs font-bold text-[#21A366] hover:underline flex items-center gap-1"
                >
                  <span>{t('All Deals', 'সকল অফার')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    DAILY HARVEST
                  </span>
                  <h4 className="text-sm font-black text-[#17251F]">Sunrise Organic Vegetables 15% Off</h4>
                  <p className="text-xs text-[#64736B]">Directly from Bogura & Rajshahi partner farms picked at dawn.</p>
                  <Link
                    href="/category/fresh-fruits-vegetables"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#21A366] pt-1 hover:underline"
                  >
                    <span>Shop Fresh Harvest →</span>
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    PANTRY SPECIAL
                  </span>
                  <h4 className="text-sm font-black text-[#17251F]">Mustard Oil & Sundarbans Honey Combo</h4>
                  <p className="text-xs text-[#64736B]">Save ৳150 on cold-pressed ghani oil + raw honey duo pack.</p>
                  <Link
                    href="/category/spices-oils"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 pt-1 hover:underline"
                  >
                    <span>Shop Pantry Deals →</span>
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    WEEKEND HARVEST
                  </span>
                  <h4 className="text-sm font-black text-[#17251F]">Fresh River Fish & Prawn Festival</h4>
                  <p className="text-xs text-[#64736B]">Padma River Hilsha & Live Katla with zero formalin guarantee.</p>
                  <Link
                    href="/category/meat-fish"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 pt-1 hover:underline"
                  >
                    <span>Shop River Catch →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SAVED ADDRESSES                                    */}
        {/* ========================================================= */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5ECE7]">
              <div>
                <h3 className="text-lg font-black text-[#17251F]">{t('Delivery Address Book', 'ডেলিভারি ঠিকানা সমূহ')}</h3>
                <p className="text-xs text-[#64736B] mt-0.5">
                  {t('Manage your home, office, and secondary delivery destinations', 'অর্ডারের সময় দ্রুত ডেলিভারির জন্য')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#21A366] hover:bg-[#123C2D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('Add New Address', 'নতুন ঠিকানা যোগ করুন')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    addr.isDefault
                      ? 'border-[#21A366] bg-[#F2FBF6]/60 shadow-xs'
                      : 'border-[#E5ECE7] bg-[#FAFBF9] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black bg-white border border-[#E5ECE7] text-[#17251F]">
                      <MapPin className="w-3.5 h-3.5 text-[#21A366]" />
                      <span>{addr.label}</span>
                    </span>

                    {addr.isDefault && (
                      <span className="text-[10px] font-black uppercase text-[#21A366] bg-emerald-100 px-2 py-0.5 rounded-full">
                        Primary Default
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[#17251F]">{addr.recipientName}</p>
                    <p className="text-[#64736B]">{addr.phone}</p>
                    <p className="text-[#17251F] font-medium leading-relaxed">{addr.address}</p>
                    <p className="text-xs text-[#64736B]">{addr.area}</p>
                  </div>

                  <div className="pt-3 border-t border-[#E5ECE7] flex items-center justify-between text-xs">
                    {!addr.isDefault ? (
                      <button
                        type="button"
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs font-bold text-[#21A366] hover:underline cursor-pointer"
                      >
                        Set as Default
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400 font-medium">Default location</span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeAddress(addr.id)}
                      className="text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SETTINGS                                           */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
            <div className="pb-4 border-b border-[#E5ECE7]">
              <h3 className="text-lg font-black text-[#17251F]">{t('Personal Profile Settings', 'প্রোফাইল তথ্য আপডেট')}</h3>
              <p className="text-xs text-[#64736B] mt-0.5">
                {t('Update your contact details and default supermarket branch', 'নাম, নম্বর ও শাখা আপডেট করুন')}
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={settingsName}
                  onChange={(e) => setSettingsName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1.5">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={settingsPhone}
                  onChange={(e) => setSettingsPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={settingsEmail}
                  onChange={(e) => setSettingsEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#17251F] block mb-1.5">Preferred Supermarket Branch</label>
                <select
                  value={settingsBranch}
                  onChange={(e) => setSettingsBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366] font-medium"
                >
                  {storeBranches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name} ({b.address})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E5ECE7]">
                <button
                  type="button"
                  onClick={logout}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                >
                  {t('Sign Out of Account', 'একাউন্ট থেকে সাইন আউট')}
                </button>

                <button
                  type="submit"
                  className="bg-[#21A366] hover:bg-[#123C2D] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {t('Save Changes', 'পরিবর্তন সংরক্ষণ করুন')}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* 3. DIGITAL INVOICE RECEIPT MODAL                          */}
      {/* ========================================================= */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5ECE7] relative">
            <button
              type="button"
              onClick={() => setSelectedOrderForInvoice(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Receipt Container */}
            <div id="printable-receipt" className="space-y-6">
              {/* Receipt Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#E5ECE7]">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#123C2D] text-white flex items-center justify-center font-black text-sm">
                      EB
                    </div>
                    <span className="font-black text-lg text-[#123C2D] tracking-tight">ECOBAZAR</span>
                  </div>
                  <p className="text-[10px] text-[#64736B] mt-1">Multi-Branch Fresh Supermarket • Dhaka, Bangladesh</p>
                  <p className="text-[10px] text-[#64736B]">Helpline: +880 9612-000000 • VAT Reg: 00291048-0101</p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-[#F2FBF6] text-emerald-800 border border-emerald-200">
                    Official Receipt
                  </span>
                  <p className="text-xs font-mono font-black text-[#17251F] mt-1.5">{selectedOrderForInvoice.id}</p>
                  <p className="text-[10px] text-[#64736B]">{selectedOrderForInvoice.formattedDate}</p>
                </div>
              </div>

              {/* Customer & Branch Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAFBF9] p-4 rounded-2xl border border-[#E8ECE7]">
                <div>
                  <p className="text-[10px] font-bold text-[#64736B] uppercase">Billed & Delivered To:</p>
                  <p className="font-bold text-[#17251F] mt-1">{selectedOrderForInvoice.customerName}</p>
                  <p className="text-[#64736B]">{selectedOrderForInvoice.customerPhone}</p>
                  <p className="text-[#64736B] leading-tight mt-0.5">{selectedOrderForInvoice.deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#64736B] uppercase">Fulfillment Store:</p>
                  <p className="font-bold text-[#17251F] mt-1">{selectedOrderForInvoice.branch}</p>
                  <p className="text-[#64736B]">Payment: {selectedOrderForInvoice.paymentMethod}</p>
                  <p className="text-emerald-700 font-bold mt-1">Status: {selectedOrderForInvoice.status}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 text-[10px] font-black uppercase tracking-wider text-[#64736B] pb-2 border-b border-[#E5ECE7]">
                  <span className="col-span-6">Item Description</span>
                  <span className="col-span-2 text-right">Price</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-2 text-right">Total</span>
                </div>
                {selectedOrderForInvoice.items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 text-xs py-1.5 border-b border-neutral-100 items-center">
                    <div className="col-span-6 pr-2">
                      <p className="font-bold text-[#17251F] truncate">{it.name}</p>
                      <p className="text-[10px] text-[#64736B]">{it.unit}</p>
                    </div>
                    <span className="col-span-2 text-right font-medium text-[#64736B]">৳{it.price}</span>
                    <span className="col-span-2 text-center font-bold text-[#17251F]">{it.quantity}</span>
                    <span className="col-span-2 text-right font-black text-[#17251F]">৳{it.total}</span>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="space-y-1.5 pt-2 text-xs border-t border-[#E5ECE7]">
                <div className="flex justify-between text-[#64736B]">
                  <span>Subtotal</span>
                  <span className="font-bold">৳{selectedOrderForInvoice.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#64736B]">
                  <span>Delivery Fee</span>
                  <span className="font-bold">
                    {selectedOrderForInvoice.deliveryFee === 0 ? 'FREE' : `৳${selectedOrderForInvoice.deliveryFee}`}
                  </span>
                </div>
                {selectedOrderForInvoice.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Voucher Saved</span>
                    <span>-৳{selectedOrderForInvoice.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-[#17251F] pt-2 border-t border-[#E5ECE7]">
                  <span>Grand Total</span>
                  <span className="text-emerald-700">৳{selectedOrderForInvoice.grandTotal}</span>
                </div>
              </div>

              {/* Footer Note */}
              <div className="p-3 bg-[#F7F9F5] rounded-xl text-center text-[10px] text-[#64736B] space-y-0.5">
                <p className="font-bold text-[#17251F]">Thank you for shopping 100% safe & organic at ECOBAZAR!</p>
                <p>Have an issue with your items? Call our doorstep helpline within 24 hours.</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') window.print();
                }}
                className="flex-1 bg-[#123C2D] hover:bg-[#21A366] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save PDF Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrderForInvoice(null)}
                className="px-4 py-2.5 rounded-xl border border-[#E5ECE7] text-xs font-bold text-[#64736B] hover:text-[#17251F] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. LIVE TRACKING MODAL                                    */}
      {/* ========================================================= */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#E5ECE7] relative">
            <button
              type="button"
              onClick={() => setTrackingModalOrder(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5ECE7]">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-[#17251F]">Real-Time Order Tracking</h3>
                <p className="text-xs text-[#64736B] font-mono">#{trackingModalOrder.id}</p>
              </div>
            </div>

            <div className="p-4 bg-[#F2FBF6] rounded-2xl border border-[#C4EED6] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64736B]">Current Status:</span>
                <span className="font-black text-emerald-800 uppercase">{trackingModalOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64736B]">Estimated Delivery:</span>
                <span className="font-black text-[#17251F]">25 - 30 Mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64736B]">Assigned Rider:</span>
                <span className="font-bold text-[#17251F]">Tanvir Hossain (+880 1812-334455)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64736B]">Delivery Location:</span>
                <span className="font-medium text-[#17251F] text-right truncate max-w-[200px]">
                  {trackingModalOrder.deliveryAddress}
                </span>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl text-center text-xs text-[#64736B]">
              Dispatched from <strong>{trackingModalOrder.branch}</strong> with sub-4°C cold-chain sealed storage.
            </div>

            <button
              type="button"
              onClick={() => setTrackingModalOrder(null)}
              className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ADD ADDRESS MODAL                                      */}
      {/* ========================================================= */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E5ECE7] relative">
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-black text-base text-[#17251F]">Add New Delivery Address</h3>
              <p className="text-xs text-[#64736B] mt-0.5">Save a new location for instant 1-click checkout</p>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#17251F] block mb-1">Address Label</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Home', 'Office', 'Other'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setNewLabel(l)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        newLabel === l
                          ? 'bg-[#21A366] text-white border-[#21A366]'
                          : 'bg-[#FAFBF9] text-[#64736B] border-[#E5ECE7]'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#17251F] block mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17251F] block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17251F] block mb-1">Apartment, Flat & Street Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Flat 3A, House 24, Road 11"
                  value={newAddressText}
                  onChange={(e) => setNewAddressText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366]"
                />
              </div>

              <div>
                <label className="font-bold text-[#17251F] block mb-1">Area / Thana (Dhaka)</label>
                <select
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5ECE7] bg-[#FAFBF9] focus:outline-none focus:border-[#21A366]"
                >
                  <option value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</option>
                  <option value="Gulshan-1 & 2, Dhaka">Gulshan-1 & 2, Dhaka</option>
                  <option value="Banani, Dhaka">Banani, Dhaka</option>
                  <option value="Uttara Sector 1-14, Dhaka">Uttara Sector 1-14, Dhaka</option>
                  <option value="Mirpur, Dhaka">Mirpur, Dhaka</option>
                  <option value="Mohammadpur, Dhaka">Mohammadpur, Dhaka</option>
                  <option value="Bashundhara R/A, Dhaka">Bashundhara R/A, Dhaka</option>
                  <option value="Baridhara, Dhaka">Baridhara, Dhaka</option>
                  <option value="Motijheel & Old Dhaka">Motijheel & Old Dhaka</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="make-default"
                  checked={newIsDefault}
                  onChange={(e) => setNewIsDefault(e.target.checked)}
                  className="rounded text-[#21A366] focus:ring-[#21A366]"
                />
                <label htmlFor="make-default" className="text-xs text-[#17251F] font-bold">
                  Set as default delivery address
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5ECE7] text-xs font-bold text-[#64736B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#21A366] hover:bg-[#123C2D] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persistent global drawers & modals */}
      <CartDrawer />
      <WishlistDrawer />
      <Modals />
      <SiteFooter />
    </div>
  );
}
